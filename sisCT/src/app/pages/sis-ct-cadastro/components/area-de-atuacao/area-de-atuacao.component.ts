import { AfterViewInit, Component, inject } from '@angular/core';
import { QuestionService } from '../../../../services/question.service';

@Component({
  selector: 'app-area-de-atuacao',
  templateUrl: './area-de-atuacao.component.html',
  styleUrl: './area-de-atuacao.component.scss',
})
export class AreaDeAtuacaoComponent implements AfterViewInit {
  constructor() {}
  opcoes = [
    {
      label: 'Comunidade Terapêutica – SEÇÃO II – Item 6',
      value: 'comunidadeTerapeutica',
    },
    {
      label:
        'Entidades de cuidado, de prevenção, de apoio, de mútua ajuda, de atendimento psicossocial e de ressocialização de dependentes do álcool e de outras drogas e seus familiares SEÇÃO II – Item 7',
      value: 'entidadesDeCuidado',
    },
  ];

  questionSrv: QuestionService = inject(QuestionService);
  selectedOption: {
    label: string;
    value: string;
  } = { label: '', value: '' };
  ngAfterViewInit(): void {}

  onSelectChange() {
    console.log(this.selectedOption);
    if (this.selectedOption.value === 'comunidadeTerapeutica') {
      this.questionSrv.matriz.seccao1.dados.areaDeAtuacao.comunidadeTerapeutica =
        true;
      this.questionSrv.matriz.seccao1.dados.areaDeAtuacao.entidadeDeCuidado =
        false;
      this.questionSrv.onMatrizDatachange('areas-de-atuacao');
    } else {
      this.questionSrv.matriz.seccao1.dados.areaDeAtuacao.comunidadeTerapeutica =
        false;
      this.questionSrv.matriz.seccao1.dados.areaDeAtuacao.entidadeDeCuidado =
        true;
      this.questionSrv.onMatrizDatachange('areas-de-atuacao');
    }
  }
}
