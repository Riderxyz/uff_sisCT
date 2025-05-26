import { AfterViewInit, Component, inject } from '@angular/core';
import {
  FonteRecursos,
  RepresentanteLegal,
} from '../../../../interface/matriz.interface';
import { QuestionService } from '../../../../services/question.service';
import { UtilService } from '../../../../services/util.service';
import { CadastroStep1Id } from '../../../../interface/subSection.interface';

@Component({
  selector: 'app-fonte-recursos',
  templateUrl: './fonte-recursos.component.html',
  styleUrl: './fonte-recursos.component.scss',
})
export class FonteRecursosComponent implements AfterViewInit {
  readonly questionSrv: QuestionService = inject(QuestionService);
  readonly utilSrv: UtilService = inject(UtilService);
  formModel: FonteRecursos = {
    receitaBruta: 0,
    recursoPublicos: {
      financiamentoComAUniao: {
        possui: false,
        modalidades: [],
        outrosEspecificarDescricao: '',
      },
      financiamentoEstadual: {
        possui: false,
        modalidadeDeFinanciamento: []
      },
      financiamentoMunicipal: {
        possui: false,
        modalidadeDeFinanciamento: []
      },
    },
    recursosDeOutrasFontes: {
      receitasProprias: {
        modalidades: [],
        outrosEspecificarDescricao: '',
      },
      doacoesFinanceirasTerceiros: false,
      outrosEspecificar: false,
      outrosEspecificarDescricao: '',
      parceriasPrivadas: false,
    },
  };















    usaReceitasProprias = false;

  uniaoTipos = [
    { key: 'contrato', label: 'Contrato' },
    { key: 'termoFomento', label: 'Termo de Fomento' },
    { key: 'termoColaboracao', label: 'Termo de Colaboração' },
    { key: 'emendasParlamentares', label: 'Emendas Parlamentares' },
    { key: 'parcerias', label: 'Parcerias' },
    { key: 'editaisSelecao', label: 'Editais de Seleção' },
    { key: 'outrosEspecificar', label: 'Outros' }
  ];

  simplesTipos = [
    { key: 'emendasParlamentares', label: 'Emendas Parlamentares' },
    { key: 'parcerias', label: 'Parcerias' },
    { key: 'editaisSelecao', label: 'Editais de Seleção' }
  ];

  receitasTipos = [
    { key: 'mensalidadesPorParteDosAcolhidos', label: 'Mensalidades dos acolhidos/famílias' },
    { key: 'campanhasArrecadacao', label: 'Campanhas de arrecadação' },
    { key: 'doacoesAssociados', label: 'Doações dos associados' },
    { key: 'vendaProdutos', label: 'Venda de produtos' },
    { key: 'outrosEspecificar', label: 'Outros' }
  ];
  constructor() {}

  ngAfterViewInit(): void {}

  onFieldChange() {
    this.questionSrv.matriz.seccao1.dados.fonteRecursos = this.formModel;
    this.questionSrv.onMatrizDatachange(CadastroStep1Id.FonteRecursos);
  }
}
