import { AfterViewInit, Component, inject } from '@angular/core';
import { RepresentanteTecnicoInterface } from '../../../../../interface/representanteTecnico.interface';
import { CadastroStep1Id } from '../../../../../interface/subSection.interface';
import { QuestionService } from '../../../../../services/question.service';
import { UtilService } from '../../../../../services/util.service';


@Component({
  selector: 'app-responsavel-tecnico',
  templateUrl: './responsavel-tecnico.component.html',
  styleUrl: './responsavel-tecnico.component.scss',
})
export class ResponsavelTecnicoComponent implements AfterViewInit {
  readonly questionSrv: QuestionService = inject(QuestionService);
  readonly utilSrv: UtilService = inject(UtilService);
  formModel: RepresentanteTecnicoInterface = {
    nome: '',
    cpf: '',
    dataDeNascimento: '',
    escolaridade: '',
    cursoProfissao: '',
    telefone: '',
    email: '',
    possuiExperienciaComprovada: false,
  };
  constructor() {}
  ngAfterViewInit(): void {
    this.formModel = this.questionSrv.matriz.seccao1.dados.representanteTecnico;
  }

  onFieldChange() {
    this.questionSrv.matriz.seccao1.dados.representanteTecnico = this.formModel;
    this.questionSrv.onMatrizDatachange(CadastroStep1Id.ResponsavelTecnico);
  }
}
