import { AfterViewInit, Component, inject } from '@angular/core';
import { QuestionService } from '../../../../services/question.service';
import { InformacaoGerais } from '../../../../interface/matriz.interface';

@Component({
  selector: 'app-info-gerais',
  templateUrl: './info-gerais.component.html',
  styleUrl: './info-gerais.component.scss',
})
export class InfoGeraisComponent implements AfterViewInit {
  questionSrv: QuestionService = inject(QuestionService);
  formModel: InformacaoGerais = {
    registro: {
      cnpj: '',
      nomeFantasia: '',
      razaoSocial: '',
      codigoDeAtividadesEconomicasPrimarias: '',
      codigoDeAtividadesEconomicasSecundarias: '',
    },
    localizacao: {
      cep: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
      pais: '',
      logradouro: '',
    },
  };
  constructor() {}
  ngAfterViewInit(): void {
    this.formModel = this.questionSrv.matriz.seccao1.dados.informacaoGerais;
  }
}
