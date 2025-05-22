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
    'Entidades de cuidado, de prevenção, de apoio, de mútua ajuda, de atendimento psicossocial e de ressocialização de dependentes do álcool e de outras drogas e seus familiares SEÇÃO II – Item 7'
  ];

  questionSrv:QuestionService = inject(QuestionService);
  selectedOption: string = '';
  ngAfterViewInit(): void {

  }


  onSelectChange() {
console.log(this.selectedOption);


  }

}
