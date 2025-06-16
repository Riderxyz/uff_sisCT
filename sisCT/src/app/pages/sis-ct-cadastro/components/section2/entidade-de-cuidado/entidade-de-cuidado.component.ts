import { AfterViewInit, Component, inject } from '@angular/core';
import { QuestionService } from '../../../../../services/question.service';
import { UtilService } from '../../../../../services/util.service';
import { EntidadeDeCuidadoInterface } from '../../../../../interface/entidadeDeCuidado.interface';

@Component({
  selector: 'app-entidade-de-cuidado',
  templateUrl: './entidade-de-cuidado.component.html',
  styleUrl: './entidade-de-cuidado.component.scss',
})
export class EntidadeDeCuidadoComponent implements AfterViewInit {
  readonly questionSrv: QuestionService = inject(QuestionService);
  readonly utilSrv: UtilService = inject(UtilService);

   formModel: EntidadeDeCuidadoInterface = {
     acolhimentoProvisorio: false,
     caracterizacaoPublicoAlvo: {
    publicoAlvoDaEntidade: {
      adultosMasculino: 0,
      adultosFeminino: 0,
      criancasEAdolescentes: 0,
      idoso: 0,
    },
    capacidadeDeAtendimento: '',
    formaDeAcessoPublicoAlvo: {},
     },
     comunidadeTerapeutica: false
   }
  constructor() {}

  ngAfterViewInit(): void {}
}
