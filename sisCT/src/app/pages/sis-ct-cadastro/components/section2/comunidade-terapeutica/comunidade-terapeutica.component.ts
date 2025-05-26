import { AfterViewInit, Component, inject } from '@angular/core';
import { QuestionService } from '../../../../../services/question.service';
import { UtilService } from '../../../../../services/util.service';

@Component({
  selector: 'app-comunidade-terapeutica',
  templateUrl: './comunidade-terapeutica.component.html',
  styleUrl: './comunidade-terapeutica.component.scss',
})
export class ComunidadeTerapeuticaComponent implements AfterViewInit {
    readonly questionSrv: QuestionService = inject(QuestionService);
  readonly utilSrv: UtilService = inject(UtilService);
  constructor() {}

  ngAfterViewInit(): void {}
}
