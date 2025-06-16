import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild, ElementRef, inject } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
} from 'angular-animations';
import {
  Observable,
  ReplaySubject,
  Subject,
  catchError,
  debounceTime,
  delay,
  filter,
  map,
  of,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { Cnae } from '../../../../../interfaces_crud/cnae.interface';
import { InformacaoGeraisInterface } from '../../../../../interface/informacaoGerais.interface';
import { CadastroStep1Id } from '../../../../../interface/subSection.interface';
import { CentralRxJsService } from '../../../../../services/centralRXJS.service';
import { CnaeService } from '../../../../../services/cnae.service';
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
  
  constructor(private cnaeService: CnaeService) {
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
    
    // Initialize the secondary CNAEs as an array if it's not already
    if (!Array.isArray(this.formModel.registro.codigoDeAtividadesEconomicasSecundarias)) {
      this.formModel.registro.codigoDeAtividadesEconomicasSecundarias = [];
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
  
  // Helper method to ensure we always have an array for ngFor
  getSecundariosArray(): string[] {
    if (!this.formModel.registro.codigoDeAtividadesEconomicasSecundarias) {
      this.formModel.registro.codigoDeAtividadesEconomicasSecundarias = [];
    }
    
    if (Array.isArray(this.formModel.registro.codigoDeAtividadesEconomicasSecundarias)) {
      return this.formModel.registro.codigoDeAtividadesEconomicasSecundarias;
    }
    
    // If it's a string, convert to array with one item
    return [this.formModel.registro.codigoDeAtividadesEconomicasSecundarias];
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
        this.formModel.localizacao.cep = res.cep;
        this.formModel.localizacao.logradouro = res.logradouro;
        this.formModel.localizacao.bairro = res.bairro;
        this.formModel.localizacao.cidade = res.localidade;
        this.formModel.localizacao.estado = res.uf;
        this.isLoadingAdress = false;
      });
  }

  onFieldChange(isItCep?: boolean) {
    if (isItCep) {
      this.getEndereco();
    } else {
      this.questionSrv.matriz.seccao1.dados.informacaoGerais = this.formModel;
      this.questionSrv.onMatrizDatachange(CadastroStep1Id.InfoGerais);
    }
  }
  
  // Display function for the autocomplete
  displayCnae(cnaeId: string): string {
    if (!cnaeId) return '';
    
    const cnae = this.cnaes.find(c => c.id === cnaeId);
    return cnae ? `${cnae.id} - ${cnae.descricao}` : cnaeId;
  }
  
  // Get CNAE description by ID
  getCnaeDescricao(cnaeId: string): string {
    const cnae = this.cnaes.find(c => c.id === cnaeId);
    return cnae ? `${cnae.id} - ${cnae.descricao}` : cnaeId;
  }
  
  // Add a secondary CNAE
  adicionarCnaeSecundario(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.value;
    if (!value) return;
    
    // Initialize the array if it's not already
    if (!Array.isArray(this.formModel.registro.codigoDeAtividadesEconomicasSecundarias)) {
      this.formModel.registro.codigoDeAtividadesEconomicasSecundarias = [];
    }
    
    // Add the value if it's not already in the array
    const secundarios = this.formModel.registro.codigoDeAtividadesEconomicasSecundarias as string[];
    if (!secundarios.includes(value)) {
      secundarios.push(value);
      this.onFieldChange();
    }
    
    // Clear the input
    if (this.atividadeSecundariaInput) {
      this.atividadeSecundariaInput.nativeElement.value = '';
    }
    this.cnaeFilterSecundario.setValue('');
  }
  
  // Remove a secondary CNAE
  removerCnaeSecundario(cnaeId: string): void {
    const secundarios = this.getSecundariosArray();
    const index = secundarios.indexOf(cnaeId);
    if (index >= 0) {
      secundarios.splice(index, 1);
      this.formModel.registro.codigoDeAtividadesEconomicasSecundarias = secundarios;
      this.onFieldChange();
    }
  }
}
