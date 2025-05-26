import { AfterViewInit, Component, inject } from '@angular/core';
import { QuestionService } from '../../../../services/question.service';
import { UtilService } from '../../../../services/util.service';
import { CadastroStep1Id } from '../../../../interface/subSection.interface';
import { RepresentanteLegalInterface } from '../../../../interface/representanteLegal.interface';

@Component({
  selector: 'app-representate-legal-matriz',
  templateUrl: './representate-legal-matriz.component.html',
  styleUrl: './representate-legal-matriz.component.scss',
})
export class RepresentateLegalMatrizComponent implements AfterViewInit {
  readonly questionSrv: QuestionService = inject(QuestionService);
  readonly utilSrv: UtilService = inject(UtilService);
  formModel: RepresentanteLegalInterface = {
    nome: '',
    anoDeTerminoDeMandato: '',
    seuPapelnaMatriz: '',
    cpf: '',
    dataDeNascimento: '',
    escolaridade: '',
    cursoProfissao: '',
    telefone: '',
    email: '',
  };
  isLoadingAdress = false;
  minimumYear = new Date().getFullYear();
  constructor() {}

  ngAfterViewInit(): void {
    console.log(this.minimumYear);

    this.formModel = this.questionSrv.matriz.seccao1.dados.representanteLegal;
  }

  onFieldChange(isItCep?: boolean) {
    if (isItCep) {
      //this.getEndereco();
    } else {
      this.questionSrv.matriz.seccao1.dados.representanteLegal = this.formModel;
      this.questionSrv.onMatrizDatachange(CadastroStep1Id.RepresentanteLegal);
    }
  }
}
