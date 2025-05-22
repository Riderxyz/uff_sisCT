import { AfterViewInit, Component, inject } from '@angular/core';
import { QuestionService } from '../../../../services/question.service';
import { InformacaoGerais } from '../../../../interface/matriz.interface';
import { NgModel } from '@angular/forms';
import { UtilService } from '../../../../services/util.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-info-gerais',
  templateUrl: './info-gerais.component.html',
  styleUrl: './info-gerais.component.scss',
})
export class InfoGeraisComponent implements AfterViewInit {
  questionSrv: QuestionService = inject(QuestionService);
  utilSrv: UtilService = inject(UtilService);
  formModel: InformacaoGerais = {
    registro: {
      cnpj: '',
      nomeFantasia: '',
      razaoSocial: '',
      codigoDeAtividadesEconomicasPrimarias: '',
      codigoDeAtividadesEconomicasSecundarias: '',
      emailInstitucional: '',
      contato: '',
      tipoContato: 'email',
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
  isLoadingAdress = false;
  constructor() {}
  ngAfterViewInit(): void {
    this.formModel = this.questionSrv.matriz.seccao1.dados.informacaoGerais;
  }

  validateCnpj(control: NgModel) {
    const isValid = this.utilSrv.isValidCNPJ(this.formModel.registro.cnpj);
    if (!isValid) {
      console.log(control.control.value);
      control.control.setErrors({ ...control.errors, invalidCnpj: true });
    } else {
      if (control.errors?.['invalidCnpj']) {
        const { invalidCnpj, ...otherErrors } = control.errors;
        control.control.setErrors(
          Object.keys(otherErrors).length ? otherErrors : null
        );
      }
    }
  }

  getEndereco() {
    this.isLoadingAdress = true;
    this.utilSrv
      .getAdressByCEP(this.formModel.localizacao.cep)
      .pipe(debounceTime(1000))
      .subscribe({
        next: (res) => {
          this.formModel.localizacao.cep = res.cep;
          this.formModel.localizacao.logradouro = res.logradouro;
          this.formModel.localizacao.bairro = res.bairro;
          this.formModel.localizacao.cidade = res.localidade;
          this.formModel.localizacao.estado = res.uf;
          this.isLoadingAdress = false;
        },
        error: () => {
          this.isLoadingAdress = false;
        },
      });
  }
}
