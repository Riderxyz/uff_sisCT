import { AfterViewInit, Component, inject } from '@angular/core';
import { FonteRecursosInterface, NivelFonte } from '../../../../../interface/fonteRecursos.interfaces';
import { CadastroStep1Id } from '../../../../../interface/subSection.interface';
import { CadastroNacionalService } from '../../../../../services/cadastro-nacional.service';
import { QuestionService } from '../../../../../services/question.service';
import { StatusService } from '../../../../../services/status.service';
import { UtilService } from '../../../../../services/util.service';


@Component({
  selector: 'app-fonte-recursos',
  templateUrl: './fonte-recursos.component.html',
  styleUrl: './fonte-recursos.component.scss',
})
export class FonteRecursosComponent implements AfterViewInit {
  readonly questionSrv: QuestionService = inject(QuestionService);
  readonly utilSrv: UtilService = inject(UtilService);
  formModel: FonteRecursosInterface = {
    receitaBruta: null,
    recursosPublicos: {
      uniao: { possui: false, modalidades: [] },
      estadual: { possui: false, modalidades: [] },
      municipal: { possui: false, modalidades: [] },
    },
    outrasFontes: {
      doacoesFinanceirasTerceiros: false,
      parceriasPrivadas: false,
      receitasProprias: [],
      outros: '',
    },
  };

  selectedModalidades = 2;
  selectReceitasProprias = 2;

  niveisFonte: NivelFonte[] = ['uniao', 'estadual', 'municipal'];
  modalidades = [
    'Contrato',
    'Termo de Fomento',
    'Termo de Colaboração',
    'Outros',
    'Emendas Parlamentares',
    'Parcerias',
    'Editais de seleção',
  ];

  receitasProprias = [
    { label: 'Mensalidades por parte dos acolhidos/famílias', value: 'Mensalidades' },
    { label: 'Campanhas de arrecadação', value: 'Campanhas' },
    { label: 'Doações dos associados', value: 'DoacoesAssociados' },
    { label: 'Venda de produtos', value: 'VendaProdutos' },
    { label: 'Outros', value: 'Outros' },
  ];
  constructor(
    public cadastroService: CadastroNacionalService,
    private statusService: StatusService
  ) { }


  ngOnInit(): void {
    // Get current value from service
    const currentCadastro = this.cadastroService.getCurrentCadastro();
    const currentAreaAtuacao = currentCadastro?.stAreaAtuacao;

    // if (currentAreaAtuacao) {
    //   this.selectedOption = this.opcoes.find(opt => opt.value === currentAreaAtuacao) || null;
    // }

    // // Subscribe to changes in the cadastro
    // this.cadastroService.cadastro$.subscribe(cadastro => {
    //   if (cadastro?.stAreaAtuacao) {
    //     this.selectedOption = this.opcoes.find(opt => opt.value === cadastro.stAreaAtuacao) || null;
    //   }
    // });

    // this.updateStatusService();
  }

  ngAfterViewInit(): void { }

  onFieldChange() {
    this.questionSrv.matriz.seccao1.dados.fonteRecursos = this.formModel;
    this.questionSrv.onMatrizDatachange(CadastroStep1Id.FonteRecursos);
  }
}
