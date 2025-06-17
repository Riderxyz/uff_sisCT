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
import { EnderecoService } from '../../../../../services/endereco.service';
import { config } from '../../../../../services/config';
import { QuestionService } from '../../../../../services/question.service';
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

  // Endereco object for the form
  endereco: Endereco = {
    NU_NUMERO: '',
    NU_CEP: '',
    PK_CADASTRO_NACIONAL: 0
  };

  constructor(
    private cnaeService: CnaeService, 
    public cadastroService: CadastroNacionalService,
    private enderecoService: EnderecoService
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
        // User is typing, not selecting from dropdown
        this.validateCnaeInput(value, this.cnaeFilterPrincipal);
      }
    });

    this.cnaeFilterSecundario.valueChanges.subscribe(value => {
      if (typeof value === 'string') {
        // User is typing, not selecting from dropdown
        this.validateCnaeInput(value, this.cnaeFilterSecundario);
      }
    });
    
    // Initialize the endereco object with the cadastro nacional ID
    const currentCadastro = this.cadastroService.getCurrentCadastro();
    if (currentCadastro && currentCadastro.PK_CADASTRO_NACIONAL) {
      this.endereco.PK_CADASTRO_NACIONAL = currentCadastro.PK_CADASTRO_NACIONAL;
    }
  }

  setupCnaeFilters() {
    // Filter for primary CNAE
    this.filteredCnaesPrincipal = this.cnaeFilterPrincipal.valueChanges.pipe(
      startWith(''),
      map(search => this.filterCnaes(search || ''))
    );

    // Filter for secondary CNAE
    this.filteredCnaesSecundario = this.cnaeFilterSecundario.valueChanges.pipe(
      startWith(''),
      map(search => this.filterCnaes(search || ''))
    );
  }

  // This method is no longer needed but kept for compatibility
  getSecundariosArray(): string[] {
    return [];
  }

  filterCnaes(search: string): Cnae[] {
    if (!search) {
      return this.cnaes.slice(0, 100); // Return first 100 for performance
    }

    const searchLower = search.toLowerCase();
    return this.cnaes.filter(cnae =>
      cnae.id.includes(search) ||
      cnae.descricao.toLowerCase().includes(searchLower)
    ).slice(0, 100); // Limit results for performance
  }

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

  ngAfterViewInit(): void {
    this.formModel = this.questionSrv.matriz.seccao1.dados.informacaoGerais;
    this.formModel.localizacao;
  }

  validateCnpj(control: NgModel) {
    const isValid = this.utilSrv.isValidCNPJ(this.formModel.registro.cnpj);
    if (!isValid) {
      console.log(control.control.value);
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
      // Verificar se é filial quando o CNPJ é válido
      this.verificarFilial(this.formModel.registro.cnpj);
      
      // Update the cadastro nacional with the CNPJ
      this.cadastroService.updateCadastro({
        NU_CNPJ: this.formModel.registro.cnpj
      });
    }

    // Salvar as alterações no modelo
    this.questionSrv.matriz.seccao1.dados.informacaoGerais = this.formModel;
    this.questionSrv.onMatrizDatachange(CadastroStep1Id.InfoGerais);
  }

  verificarFilial(cnpj: string) {
    if (!cnpj || cnpj.length < 14) return;

    this.isVerificandoCnpj = true;

    // Lógica para verificar se é filial
    // CNPJs com final diferente de 0001 são filiais
    const cnpjNumerico = cnpj.replace(/[^0-9]/g, '');
    const ordem = cnpjNumerico.substring(8, 12);

    // Se o número de ordem for diferente de 0001, é uma filial
    if (ordem !== '0001') {
      this.isFilial = true;

      // Montar CNPJ da matriz (substituindo o número de ordem por "0001")
      this.cnpjMatriz = cnpjNumerico.substring(0, 8) + '0001' + cnpjNumerico.substring(12);
      this.cnpjMatriz = this.utilSrv.formatCNPJ(this.cnpjMatriz);

      // Buscar entidade matriz
      //this.buscarEntidadeMatriz(this.cnpjMatriz);
    } else {
      this.isFilial = false;
      this.cnpjMatriz = '';
    }

    // Mostrar mensagem de status
    const tipoEntidade = this.isFilial ? 'filial' : 'matriz';
    this.utilSrv.showInfo(`CNPJ verificado: Esta entidade é uma ${tipoEntidade}`);

    // Notificar o componente pai sobre a mudança de status de filial
    this.centralRxjs.sendData({
      key: config.senderKeys.filialStatus,
      data: {
        isFilial: this.isFilial,
        cnpjMatriz: this.cnpjMatriz
      }
    });

    console.log('Notificando status de filial:', this.isFilial, this.cnpjMatriz);

    setTimeout(() => {
      this.isVerificandoCnpj = false;
    }, 500);
  }

  buscarEntidadeMatriz(cnpjMatriz: string) {
    // Endpoint simulado para buscar entidade por CNPJ
    this.http.get(`/api/entidades/${cnpjMatriz.replace(/[^0-9]/g, '')}`)
      .pipe(
        catchError(error => {
          // Simular que a entidade não foi encontrada
          this.mostrarDialogoMatrizNaoEncontrada();
          return of(null);
        })
      )
      .subscribe(entidade => {
        if (!entidade) {
          this.mostrarDialogoMatrizNaoEncontrada();
        }
        // Se encontrou a entidade, poderia fazer algo com ela aqui
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
          return of(null); // retorna observable vazio para completar o fluxo
        })
      )
      .subscribe((res) => {
        if (!res) return;
        
        // Update the form model
        this.formModel.localizacao.cep = res.cep;
        this.formModel.localizacao.logradouro = res.logradouro;
        this.formModel.localizacao.bairro = res.bairro;
        this.formModel.localizacao.cidade = res.localidade;
        this.formModel.localizacao.estado = res.uf;
        
        // Update the endereco object
        this.endereco.NU_CEP = res.cep;
        this.endereco.DS_LOGRADOURO = res.logradouro;
        this.endereco.NO_BAIRRO = res.bairro;
        this.endereco.DS_CIDADE = res.localidade;
        this.endereco.CO_ESTADO = res.uf;
        
        // Update the endereco service
        this.updateEndereco();
        
        this.isLoadingAdress = false;
      });
  }

  onFieldChange(isItCep?: boolean) {
    if (isItCep) {
      this.getEndereco();
    } else {
      // Update the local model
      this.questionSrv.matriz.seccao1.dados.informacaoGerais = this.formModel;
      this.questionSrv.onMatrizDatachange(CadastroStep1Id.InfoGerais);
      
      // Update the cadastro nacional service
      this.updateCadastroNacional();
    }
  }
  
  // Update the cadastro nacional object with form values
  updateCadastroNacional() {
    this.cadastroService.updateCadastro({
      // Basic info
      NU_CNPJ: this.formModel.registro.cnpj,
      NO_FANTASIA: this.formModel.registro.nomeFantasia,
      NO_RAZAO_SOCIAL: this.formModel.registro.razaoSocial,
      
      // CNAE codes
      CO_CNAE_PRINCIPAL: this.formModel.registro.codigoDeAtividadesEconomicasPrimarias,
      CO_CNAE_SECUNDARIO: this.formModel.registro.codigoDeAtividadesEconomicasSecundarias as string,
      
      // Location data
      DS_LOGRADOURO: this.formModel.localizacao.logradouro,
      NU_NUMERO: this.formModel.localizacao.numero,
      DS_COMPLEMENTO: this.formModel.localizacao.complemento,
      NO_BAIRRO: this.formModel.localizacao.bairro,
      DS_CIDADE: this.formModel.localizacao.cidade,
      CO_ESTADO: this.formModel.localizacao.estado,
      DS_PAIS: this.formModel.localizacao.pais,
      NU_CEP: this.formModel.localizacao.cep
    });
  }

  // Display function for the autocomplete
  displayCnae(cnaeId: string): string {
    if (!cnaeId) return '';

    const cnae = this.cnaes.find(c => c.id === cnaeId);
    return cnae ? `${cnae.id} - ${cnae.descricao}` : cnaeId;
  }

  // Validate CNAE input to ensure only valid options are accepted
  validateCnaeInput(value: string, control: FormControl): void {
    if (!value) return;

    // Check if the value is a valid CNAE ID
    const isValid = this.cnaes.some(cnae =>
      cnae.id === value ||
      cnae.id.includes(value) ||
      cnae.descricao.toLowerCase().includes(value.toLowerCase())
    );

    if (!isValid) {
      // If not valid, mark the control as having an error
      control.setErrors({ invalidCnae: true });
    }
  }

  // Handle primary CNAE selection
  onCnaePrincipalSelected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.value;
    if (!value) return;

    // Update the form model
    this.formModel.registro.codigoDeAtividadesEconomicasPrimarias = value;
    
    // Update the cadastro nacional
    this.cadastroService.updateCadastro({
      CO_CNAE_PRINCIPAL: value
    });
    
    this.onFieldChange();
  }

  // Handle primary CNAE blur event
  onCnaePrincipalBlur(): void {
    const value = this.cnaeFilterPrincipal.value;

    // If the value is a valid CNAE ID, update the form model
    const cnae = this.cnaes.find(c => c.id === value);
    if (cnae) {
      this.formModel.registro.codigoDeAtividadesEconomicasPrimarias = cnae.id;
      
      // Update the cadastro nacional
      this.cadastroService.updateCadastro({
        CO_CNAE_PRINCIPAL: cnae.id
      });
      
      this.onFieldChange();
    } else {
      // If not valid, reset to the current form model value
      //    this.cnaeFilterPrincipal.setValue(this.formModel.registro.codigoDeAtividadesEconomicasPrimarias);
    }
  }

  // Get CNAE description by ID
  getCnaeDescricao(cnaeId: string): string {
    const cnae = this.cnaes.find(c => c.id === cnaeId);
    return cnae ? `${cnae.id} - ${cnae.descricao}` : cnaeId;
  }

  // Handle secondary CNAE selection
  onCnaeSecundarioSelected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.value;
    if (!value) return;

    // Update the form model with a single value
    this.formModel.registro.codigoDeAtividadesEconomicasSecundarias = value;
    
    // Update the cadastro nacional
    this.cadastroService.updateCadastro({
      CO_CNAE_SECUNDARIO: value
    });
    
    this.onFieldChange();
  }

  // Handle secondary CNAE blur event
  onCnaeSecundarioBlur(): void {
    const value = this.cnaeFilterSecundario.value;

    // If the value is a valid CNAE ID, update the form model
    const cnae = this.cnaes.find(c => c.id === value);
    if (cnae) {
      this.formModel.registro.codigoDeAtividadesEconomicasSecundarias = cnae.id;
      
      // Update the cadastro nacional
      this.cadastroService.updateCadastro({
        CO_CNAE_SECUNDARIO: cnae.id
      });
      
      this.onFieldChange();
    } else {
      // If not valid, reset to the current form model value
      this.cnaeFilterSecundario.setValue(this.formModel.registro.codigoDeAtividadesEconomicasSecundarias);
    }
  }

  // These methods are no longer needed but kept for compatibility
  adicionarCnaeSecundario(event: MatAutocompleteSelectedEvent): void {
    this.onCnaeSecundarioSelected(event);
  }

  removerCnaeSecundario(cnaeId: string): void {
    // No longer needed as we're not using chips
  }
}
