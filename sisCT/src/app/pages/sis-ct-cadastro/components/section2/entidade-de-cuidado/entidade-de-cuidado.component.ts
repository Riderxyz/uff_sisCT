import { AfterViewInit, Component, inject } from '@angular/core';
import { QuestionService } from '../../../../../services/question.service';
import { UtilService } from '../../../../../services/util.service';

@Component({
  selector: 'app-entidade-de-cuidado',
  templateUrl: './entidade-de-cuidado.component.html',
  styleUrl: './entidade-de-cuidado.component.scss',
})
export class EntidadeDeCuidadoComponent implements AfterViewInit {
  readonly questionSrv: QuestionService = inject(QuestionService);
  readonly utilSrv: UtilService = inject(UtilService);
  constructor() {}

  ngAfterViewInit(): void {}
}
