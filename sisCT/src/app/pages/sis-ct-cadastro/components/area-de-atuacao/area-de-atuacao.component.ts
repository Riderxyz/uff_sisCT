import { AfterViewInit, Component, inject } from '@angular/core';
import { QuestionService } from '../../../../services/question.service';

@Component({
  selector: 'app-area-de-atuacao',
  templateUrl: './area-de-atuacao.component.html',
  styleUrl: './area-de-atuacao.component.scss'
})
export class AreaDeAtuacaoComponent implements AfterViewInit {
  constructor() { }
  opcoes: string[] = [
    'Comunidade Terapêutica – SEÇÃO II – Item 6',
  ];

  questionSrv:QuestionService = inject(QuestionService);
  selectedOption: string = '';
  ngAfterViewInit(): void {

    this.questionSrv.matriz.areaDeAtuacao
  }


  onSelectChange() {

  }

}
