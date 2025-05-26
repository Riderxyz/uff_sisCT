import { AfterViewInit, Component, inject } from '@angular/core';
import { FonteRecursosInterface, NivelFonte } from '../../../../../interface/fonteRecursos.interfaces';
import { CadastroStep1Id } from '../../../../../interface/subSection.interface';
import { QuestionService } from '../../../../../services/question.service';
import { UtilService } from '../../../../../services/util.service';


@Component({
  selector: 'app-fonte-recursos',
  templateUrl: './fonte-recursos.component.html',
  styleUrl: './fonte-recursos.component.scss',
})
export class FonteRecursosComponent implements AfterViewInit {
  readonly questionSrv: QuestionService = inject(QuestionService);
  readonly utilSrv: UtilService = inject(UtilService);
  formModel:  FonteRecursosInterface = {
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
  constructor() {}

  ngAfterViewInit(): void {}

  onFieldChange() {
    this.questionSrv.matriz.seccao1.dados.fonteRecursos = this.formModel;
    this.questionSrv.onMatrizDatachange(CadastroStep1Id.FonteRecursos);
  }
}
