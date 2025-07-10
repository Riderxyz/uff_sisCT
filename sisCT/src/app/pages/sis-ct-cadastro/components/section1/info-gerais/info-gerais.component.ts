import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
} from 'angular-animations';
import {
  Observable,
  Subject,
  catchError,
  debounceTime,
  delay,
  filter,
  map,
  of,
  startWith,
  switchMap,
  tap
} from 'rxjs';
import { InformacaoGeraisInterface } from '../../../../../interface/informacaoGerais.interface';
import { CadastroStep1Id } from '../../../../../interface/subSection.interface';
import { Cnae } from '../../../../../interfaces_crud/cnae.interface';
import { Endereco } from '../../../../../interfaces_crud/endereco.interface';
import { CadastroNacionalService } from '../../../../../services/cadastro-nacional.service';
import { CentralRxJsService } from '../../../../../services/centralRXJS.service';
import { CnaeService } from '../../../../../services/cnae.service';
import { config } from '../../../../../services/config';
import { EnderecoService } from '../../../../../services/endereco.service';
import { QuestionService } from '../../../../../services/question.service';
import { StatusService } from '../../../../../services/status.service';
import { UtilService } from '../../../../../services/util.service';
import { DialogComponent } from '../../../../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-info-gerais',
  templateUrl: './info-gerais.component.html',
  styleUrl: './info-gerais.component.scss',
  animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()],
})
export class InfoGeraisComponent implements AfterViewInit, OnInit {
  readonly questionSrv: QuestionService = inject(QuestionService);
  readonly utilSrv: UtilService = inject(UtilService);
  readonly http: HttpClient = inject(HttpClient);
  readonly dialog: MatDialog = inject(MatDialog);
  readonly centralRxjs: CentralRxJsService = inject(CentralRxJsService);

  // CNAE filter controls
  cnaeFilterPrincipal: FormControl = new FormControl('');
  cnaeFilterSecundario: FormControl = new FormControl('');

  // Filtered CNAEs
  filteredCnaesPrincipal: Observable<Cnae[]>;
  filteredCnaesSecundario: Observable<Cnae[]>;

  // All CNAEs
  cnaes: Cnae[] = [];

  // For cleanup
  private _onDestroy = new Subject<void>();

  // Reference to the secondary CNAE input field
  @ViewChild('atividadeSecundariaInput') atividadeSecundariaInput!: ElementRef<HTMLInputElement>;

  // Form model
  formModel: InformacaoGeraisInterface = {
    registro: {
      cnpj: '',
      nomeFantasia: '',
      razaoSocial: '',
      codigoDeAtividadesEconomicasPrimarias: '',
      codigoDeAtividadesEconomicasSecundarias: [],
      emailInstitucional: '',
      contato: '',
      tipoContato: 'email',
    },
    localizacao: {
      cep: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
      pais: '',
      logradouro: '',
    },
  };

  isFilial = false;
  isLoadingAdress = false;
  cnpjMatriz = '';
  isVerificandoCnpj = false;
  cnpjInvalido = false;

  constructor(
    private cnaeService: CnaeService,
    public cadastroService: CadastroNacionalService,
    private enderecoService: EnderecoService,
    private statusService: StatusService
  ) {
    // Initialize filtered CNAEs
    this.filteredCnaesPrincipal = of([]);
    this.filteredCnaesSecundario = of([]);
  }

  ngOnInit() {
    // Subscribe to the CNAE list
    this.cnaeService.cnaeList$.subscribe(cnaes => {
      this.cnaes = cnaes;
      this.setupCnaeFilters();
    });

    // Load CNAEs if not already loaded
    this.cnaeService.getCnaes().subscribe();

    // Setup input change listeners
    this.cnaeFilterPrincipal.valueChanges.subscribe(value => {
      if (typeof value === 'string') {
        this.validateCnaeInput(value, this.cnaeFilterPrincipal);
      }
    });

    this.cnaeFilterSecundario.valueChanges.subscribe(value => {
      if (typeof value === 'string') {
        this.validateCnaeInput(value, this.cnaeFilterSecundario);
      }
    });

    // Initialize the endereco with the cadastro nacional ID
    const currentCadastro = this.cadastroService.getCurrentCadastro();
    if (currentCadastro && currentCadastro.id) {
      this.enderecoService.loadEnderecoByCadastroNacional(currentCadastro.id);
    }

    this.enderecoService.endereco$.subscribe(endereco => {
      if (endereco.dsLogradouro) this.formModel.localizacao.logradouro = endereco.dsLogradouro;
      if (endereco.nuNumero) this.formModel.localizacao.numero = endereco.nuNumero;
      if (endereco.dsComplemento) this.formModel.localizacao.complemento = endereco.dsComplemento;
      if (endereco.noBairro) this.formModel.localizacao.bairro = endereco.noBairro;
      if (endereco.dsMunicipio) this.formModel.localizacao.cidade = endereco.dsMunicipio;
      if (endereco.coEstado) this.formModel.localizacao.estado = endereco.coEstado;
      if (endereco.dsPais) this.formModel.localizacao.pais = endereco.dsPais;
      if (endereco.nuCep) this.formModel.localizacao.cep = endereco.nuCep;

      this.questionSrv.matriz.seccao1.dados.informacaoGerais = this.formModel;
      this.statusUpdate();
    });

    // Subscribe to cadastro nacional changes
    this.cadastroService.cadastro$.subscribe(cadastro => {
      if (cadastro.nuCnpj) this.formModel.registro.cnpj = cadastro.nuCnpj;
      if (cadastro.noFantasia) this.formModel.registro.nomeFantasia = cadastro.noFantasia;
      if (cadastro.noRazaoSocial) this.formModel.registro.razaoSocial = cadastro.noRazaoSocial;
      if (cadastro.coCnaePrincipal) this.formModel.registro.codigoDeAtividadesEconomicasPrimarias = cadastro.coCnaePrincipal;
      if (cadastro.coCnaeSecundario) this.formModel.registro.codigoDeAtividadesEconomicasSecundarias = cadastro.coCnaeSecundario;

      if (cadastro.coCnaePrincipal) this.cnaeFilterPrincipal.setValue(cadastro.coCnaePrincipal, { emitEvent: false });
      if (cadastro.coCnaeSecundario) this.cnaeFilterSecundario.setValue(cadastro.coCnaeSecundario, { emitEvent: false });

      this.questionSrv.matriz.seccao1.dados.informacaoGerais = this.formModel;
      this.statusUpdate();
    });
  }
  ngAfterViewInit(): void {
    this.formModel = this.questionSrv.matriz.seccao1.dados.informacaoGerais;

    if (this.formModel.localizacao) {
      const enderecoUpdates: Partial<Endereco> = {};

      if (this.formModel.localizacao.logradouro) {
        enderecoUpdates.dsLogradouro = this.formModel.localizacao.logradouro;
      }

      if (this.formModel.localizacao.numero) {
        enderecoUpdates.nuNumero = this.formModel.localizacao.numero;
      }

      if (this.formModel.localizacao.complemento) {
        enderecoUpdates.dsComplemento = this.formModel.localizacao.complemento;
      }

      if (this.formModel.localizacao.bairro) {
        enderecoUpdates.noBairro = this.formModel.localizacao.bairro;
      }

      if (this.formModel.localizacao.cidade) {
        enderecoUpdates.dsMunicipio = this.formModel.localizacao.cidade;
      }

      if (this.formModel.localizacao.estado) {
        enderecoUpdates.coEstado = this.formModel.localizacao.estado;
      }

      if (this.formModel.localizacao.pais) {
        enderecoUpdates.dsPais = this.formModel.localizacao.pais;
      }

      if (this.formModel.localizacao.cep) {
        enderecoUpdates.nuCep = this.formModel.localizacao.cep;
      }

      if (Object.keys(enderecoUpdates).length > 0) {
        this.enderecoService.updateEndereco(enderecoUpdates);
      }
    }
  }

  statusUpdate() {
    this.statusService.update({ secao: 2, campo: 'NU_CNPJ', situacao: this.formModel.registro.cnpj != '' ? true : false, nome: 'CNPJ' });
    this.statusService.update({ secao: 2, campo: 'NO_FANTASIA', situacao: this.formModel.registro.nomeFantasia != '' ? true : false, nome: 'Nome Fantasia' });
    this.statusService.update({ secao: 2, campo: 'CO_CNAE_PRINCIPAL', situacao: this.formModel.registro.codigoDeAtividadesEconomicasPrimarias != '' ? true : false, nome: 'CNAE Principal' });
    this.statusService.update({ secao: 2, campo: 'CO_CNAE_SECUNDARIO', situacao: this.formModel.registro.codigoDeAtividadesEconomicasSecundarias != '' ? true : false, nome: 'CNAE Secundário' });
    this.statusService.update({ secao: 2, campo: 'NO_RAZAO_SOCIAL', situacao: this.formModel.registro.razaoSocial != '' ? true : false, nome: 'Razão Social' });

    this.statusService.update({ secao: 2, campo: 'DS_LOGRADOURO', situacao: this.formModel.localizacao.logradouro != '' ? true : false, nome: 'Logradouro' });
    this.statusService.update({ secao: 2, campo: 'NU_NUMERO', situacao: this.formModel.localizacao.numero != '' ? true : false, nome: 'Número' });
    this.statusService.update({ secao: 2, campo: 'DS_COMPLEMENTO', situacao: this.formModel.localizacao.complemento != '' ? true : false, nome: 'Complemento' });
    this.statusService.update({ secao: 2, campo: 'NO_BAIRRO', situacao: this.formModel.localizacao.bairro != '' ? true : false, nome: 'Bairro' });
    this.statusService.update({ secao: 2, campo: 'DS_CIDADE', situacao: this.formModel.localizacao.cidade != '' ? true : false, nome: 'Cidade' });
    this.statusService.update({ secao: 2, campo: 'CO_ESTADO', situacao: this.formModel.localizacao.estado != '' ? true : false, nome: 'Estado' });
    this.statusService.update({ secao: 2, campo: 'DS_PAIS', situacao: this.formModel.localizacao.pais != '' ? true : false, nome: 'País' });
    this.statusService.update({ secao: 2, campo: 'NU_CEP', situacao: this.formModel.localizacao.cep != '' ? true : false, nome: 'CEP' });
  }

  setupCnaeFilters() {
    this.filteredCnaesPrincipal = this.cnaeFilterPrincipal.valueChanges.pipe(
      startWith(''),
      map(search => this.filterCnaes(search || ''))
    );

    this.filteredCnaesSecundario = this.cnaeFilterSecundario.valueChanges.pipe(
      startWith(''),
      map(search => this.filterCnaes(search || ''))
    );
  }

  filterCnaes(search: string): Cnae[] {
    if (!search) {
      return this.cnaes.slice(0, 100);
    }

    const searchLower = search.toLowerCase();
    return this.cnaes.filter(cnae =>
      cnae.id.includes(search) ||
      cnae.descricao.toLowerCase().includes(searchLower)
    ).slice(0, 100);
  }

  getSecundariosArray(): string[] {
    return [];
  }

  validateCnpj(control: NgModel) {
    const isValid = this.utilSrv.isValidCNPJ(this.formModel.registro.cnpj);
    if (!isValid) {
      control.control.setErrors({ ...control.errors, invalidCnpj: true });
      this.cnpjInvalido = true;
      this.isFilial = false;
      this.cnpjMatriz = '';
    } else {
      this.cnpjInvalido = false;
      if (control.errors?.['invalidCnpj']) {
        const { invalidCnpj, ...otherErrors } = control.errors;
        control.control.setErrors(
          Object.keys(otherErrors).length ? otherErrors : null
        );
      }
      this.verificarFilial(this.formModel.registro.cnpj);

      this.cadastroService.updateCadastro({
        nuCnpj: this.formModel.registro.cnpj
      });
    }

    this.questionSrv.matriz.seccao1.dados.informacaoGerais = this.formModel;
    this.questionSrv.onMatrizDatachange(CadastroStep1Id.InfoGerais);
  }

  verificarFilial(cnpj: string) {
    if (!cnpj || cnpj.length < 14) return;

    this.isVerificandoCnpj = true;
    const cnpjNumerico = cnpj.replace(/[^0-9]/g, '');
    const ordem = cnpjNumerico.substring(8, 12);

    if (ordem !== '0001') {
      this.isFilial = true;
      this.cnpjMatriz = cnpjNumerico.substring(0, 8) + '0001' + cnpjNumerico.substring(12);
      this.cnpjMatriz = this.utilSrv.formatCNPJ(this.cnpjMatriz);
    } else {
      this.isFilial = false;
      this.cnpjMatriz = '';
    }

    this.utilSrv.showInfo(`CNPJ verificado: Esta entidade é uma ${this.isFilial ? 'filial' : 'matriz'}`);

    this.centralRxjs.sendData({
      key: config.senderKeys.filialStatus,
      data: {
        isFilial: this.isFilial,
        cnpjMatriz: this.cnpjMatriz
      }
    });

    setTimeout(() => {
      this.isVerificandoCnpj = false;
    }, 500);
  }

  buscarEntidadeMatriz(cnpjMatriz: string) {
    this.http.get(`/api/entidades/${cnpjMatriz.replace(/[^0-9]/g, '')}`)
      .pipe(
        catchError(error => {
          this.mostrarDialogoMatrizNaoEncontrada();
          return of(null);
        })
      )
      .subscribe(entidade => {
        if (!entidade) {
          this.mostrarDialogoMatrizNaoEncontrada();
        }
      });
  }

  mostrarDialogoMatrizNaoEncontrada() {
    this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        title: 'CNPJ da Matriz não encontrado',
        message: 'O CNPJ da Matriz não foi encontrado ou não está disponível para o seu usuário.',
        confirmText: 'OK'
      }
    });
  }

  getEndereco() {
    of(this.formModel.localizacao.cep)
      .pipe(
        tap(() => (this.isLoadingAdress = true)),
        debounceTime(1500),
        delay(500),
        filter((cep) => !!cep && cep.length === 8),
        switchMap((cep) =>
          this.utilSrv.getAdressByCEP(cep).pipe(
            map((res) => {
              if ((res as any).erro) {
                throw new Error('CEP inválido');
              }
              return res;
            })
          )
        ),
        catchError((err) => {
          this.utilSrv.showError(
            'CEP inválido',
            'Verifique se o CEP digitado está correto',
            5000
          );
          this.isLoadingAdress = false;
          return of(null);
        })
      )
      .subscribe((res) => {
        if (!res) return;

        this.formModel.localizacao.cep = res.cep;
        this.formModel.localizacao.logradouro = res.logradouro;
        this.formModel.localizacao.bairro = res.bairro;
        this.formModel.localizacao.cidade = res.localidade;
        this.formModel.localizacao.estado = res.uf;

        this.enderecoService.updateEndereco({
          nuCep: res.cep,
          dsLogradouro: res.logradouro,
          noBairro: res.bairro,
          dsMunicipio: res.localidade,
          coEstado: res.uf
        });

        this.isLoadingAdress = false;
      });
  }

  onFieldChange(isItCep?: boolean) {
    if (isItCep) {
      this.getEndereco();
    } else {
      this.questionSrv.matriz.seccao1.dados.informacaoGerais = this.formModel;
      this.questionSrv.onMatrizDatachange(CadastroStep1Id.InfoGerais);
      this.updateCadastroNacional();
    }
  }

  updateCadastroNacional() {
    this.cadastroService.updateCadastro({
      nuCnpj: this.formModel.registro.cnpj,
      noFantasia: this.formModel.registro.nomeFantasia,
      noRazaoSocial: this.formModel.registro.razaoSocial,
      coCnaePrincipal: this.formModel.registro.codigoDeAtividadesEconomicasPrimarias,
      coCnaeSecundario: this.formModel.registro.codigoDeAtividadesEconomicasSecundarias as string
    });

    this.updateEnderecoFromForm();
    this.statusUpdate();
  }

  updateEnderecoFromForm() {
    this.enderecoService.updateEndereco({
      dsLogradouro: this.formModel.localizacao.logradouro,
      nuNumero: this.formModel.localizacao.numero,
      dsComplemento: this.formModel.localizacao.complemento,
      noBairro: this.formModel.localizacao.bairro,
      dsMunicipio: this.formModel.localizacao.cidade,
      coEstado: this.formModel.localizacao.estado,
      dsPais: this.formModel.localizacao.pais,
      nuCep: this.formModel.localizacao.cep,
      dtAtualizacao: new Date()
    });
    this.statusUpdate();
  }

  displayCnae(cnaeId: string): string {
    if (!cnaeId) return '';
    const cnae = this.cnaes.find(c => c.id === cnaeId);
    return cnae ? `${cnae.id} - ${cnae.descricao}` : cnaeId;
  }

  validateCnaeInput(value: string, control: FormControl): void {
    if (!value) return;
    const isValid = this.cnaes.some(cnae =>
      cnae.id === value ||
      cnae.id.includes(value) ||
      cnae.descricao.toLowerCase().includes(value.toLowerCase())
    );
    if (!isValid) {
      control.setErrors({ invalidCnae: true });
    }
  }

  onCnaePrincipalSelected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.value;
    if (!value) return;

    this.formModel.registro.codigoDeAtividadesEconomicasPrimarias = value;
    this.cadastroService.updateCadastro({
      coCnaePrincipal: value
    });
    this.onFieldChange();
  }

  onCnaePrincipalBlur(): void {
    const value = this.cnaeFilterPrincipal.value;
    const cnae = this.cnaes.find(c => c.id === value);
    if (cnae) {
      this.formModel.registro.codigoDeAtividadesEconomicasPrimarias = cnae.id;
      this.cadastroService.updateCadastro({
        coCnaePrincipal: cnae.id
      });
      this.onFieldChange();
    }
  }

  getCnaeDescricao(cnaeId: string): string {
    const cnae = this.cnaes.find(c => c.id === cnaeId);
    return cnae ? `${cnae.id} - ${cnae.descricao}` : cnaeId;
  }

  onCnaeSecundarioSelected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.value;
    if (!value) return;

    this.formModel.registro.codigoDeAtividadesEconomicasSecundarias = value;
    this.cadastroService.updateCadastro({
      coCnaeSecundario: value
    });
    this.onFieldChange();
  }

  onCnaeSecundarioBlur(): void {
    const value = this.cnaeFilterSecundario.value;
    const cnae = this.cnaes.find(c => c.id === value);
    if (cnae) {
      this.formModel.registro.codigoDeAtividadesEconomicasSecundarias = cnae.id;
      this.cadastroService.updateCadastro({
        coCnaeSecundario: cnae.id
      });
      this.onFieldChange();
    } else {
      this.cnaeFilterSecundario.setValue(this.formModel.registro.codigoDeAtividadesEconomicasSecundarias);
    }
  }

  adicionarCnaeSecundario(event: MatAutocompleteSelectedEvent): void {
    this.onCnaeSecundarioSelected(event);
  }

  removerCnaeSecundario(cnaeId: string): void {
    // No longer needed as we're not using chips
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}