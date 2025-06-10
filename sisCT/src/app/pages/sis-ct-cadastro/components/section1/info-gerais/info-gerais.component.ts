import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, inject } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
} from 'angular-animations';
import {
  catchError,
  debounceTime,
  delay,
  filter,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { InformacaoGeraisInterface } from '../../../../../interface/informacaoGerais.interface';
import { CadastroStep1Id } from '../../../../../interface/subSection.interface';
import { CentralRxJsService } from '../../../../../services/centralRXJS.service';
import { config } from '../../../../../services/config';
import { QuestionService } from '../../../../../services/question.service';
import { UtilService } from '../../../../../services/util.service';
import { DialogComponent } from '../../../../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-info-gerais',
  templateUrl: './info-gerais.component.html',
  styleUrl: './info-gerais.component.scss',
  animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()],
})
export class InfoGeraisComponent implements AfterViewInit {
  readonly questionSrv: QuestionService = inject(QuestionService);
  readonly utilSrv: UtilService = inject(UtilService);
  readonly http: HttpClient = inject(HttpClient);
  readonly dialog: MatDialog = inject(MatDialog);
  readonly centralRxjs: CentralRxJsService = inject(CentralRxJsService);

  formModel: InformacaoGeraisInterface = {
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
  isFilial = false;
  isLoadingAdress = false;
  cnpjMatriz = '';
  isVerificandoCnpj = false;
  cnpjInvalido = false;

  constructor() { }
  ngAfterViewInit(): void {
    this.formModel = this.questionSrv.matriz.seccao1.dados.informacaoGerais;
    this.formModel.localizacao;
  }

  validateCnpj(control: NgModel) {
    const isValid = this.utilSrv.isValidCNPJ(this.formModel.registro.cnpj);
    if (!isValid) {
      console.log(control.control.value);
      control.control.setErrors({ ...control.errors, invalidCnpj: true });
      this.cnpjInvalido = true;
      this.isFilial = false;
      this.cnpjMatriz = '';
    } else {
      this.cnpjInvalido = false;
      if (control.errors?.['invalidCnpj']) {
        const { invalidCnpj, ...otherErrors } = control.errors;
        control.control.setErrors(
          Object.keys(otherErrors).length ? otherErrors : null
        );
      }
      // Verificar se é filial quando o CNPJ é válido
      this.verificarFilial(this.formModel.registro.cnpj);
    }

    // Salvar as alterações no modelo
    this.questionSrv.matriz.seccao1.dados.informacaoGerais = this.formModel;
    this.questionSrv.onMatrizDatachange(CadastroStep1Id.InfoGerais);
  }

  verificarFilial(cnpj: string) {
    if (!cnpj || cnpj.length < 14) return;

    this.isVerificandoCnpj = true;

    // Lógica para verificar se é filial
    // CNPJs com final diferente de 0001 são filiais
    const cnpjNumerico = cnpj.replace(/[^0-9]/g, '');
    const ordem = cnpjNumerico.substring(8, 12);

    // Se o número de ordem for diferente de 0001, é uma filial
    if (ordem !== '0001') {
      this.isFilial = true;

      // Montar CNPJ da matriz (substituindo o número de ordem por "0001")
      this.cnpjMatriz = cnpjNumerico.substring(0, 8) + '0001' + cnpjNumerico.substring(12);
      this.cnpjMatriz = this.utilSrv.formatCNPJ(this.cnpjMatriz);

      // Buscar entidade matriz
      //this.buscarEntidadeMatriz(this.cnpjMatriz);
    } else {
      this.isFilial = false;
      this.cnpjMatriz = '';
    }

    // Mostrar mensagem de status
    const tipoEntidade = this.isFilial ? 'filial' : 'matriz';
    this.utilSrv.showInfo(`CNPJ verificado: Esta entidade é uma ${tipoEntidade}`);

    // Notificar o componente pai sobre a mudança de status de filial
    this.centralRxjs.sendData({
      key: config.senderKeys.filialStatus,
      data: {
        isFilial: this.isFilial,
        cnpjMatriz: this.cnpjMatriz
      }
    });
    
    console.log('Notificando status de filial:', this.isFilial, this.cnpjMatriz);

    setTimeout(() => {
      this.isVerificandoCnpj = false;
    }, 500);
  }

  buscarEntidadeMatriz(cnpjMatriz: string) {
    // Endpoint simulado para buscar entidade por CNPJ
    this.http.get(`/api/entidades/${cnpjMatriz.replace(/[^0-9]/g, '')}`)
      .pipe(
        catchError(error => {
          // Simular que a entidade não foi encontrada
          this.mostrarDialogoMatrizNaoEncontrada();
          return of(null);
        })
      )
      .subscribe(entidade => {
        if (!entidade) {
          this.mostrarDialogoMatrizNaoEncontrada();
        }
        // Se encontrou a entidade, poderia fazer algo com ela aqui
      });
  }

  mostrarDialogoMatrizNaoEncontrada() {
    this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        title: 'CNPJ da Matriz não encontrado',
        message: 'O CNPJ da Matriz não foi encontrado ou não está disponível para o seu usuário.',
        confirmText: 'OK'
      }
    });
  }

  getEndereco() {
    of(this.formModel.localizacao.cep)
      .pipe(
        tap(() => (this.isLoadingAdress = true)),
        debounceTime(1500),
        delay(500),
        filter((cep) => !!cep && cep.length === 8),
        switchMap((cep) =>
          this.utilSrv.getAdressByCEP(cep).pipe(
            map((res) => {
              if ((res as any).erro) {
                throw new Error('CEP inválido');
              }
              return res;
            })
          )
        ),
        catchError((err) => {
          this.utilSrv.showError(
            'CEP inválido',
            'Verifique se o CEP digitado está correto',
            5000
          );
          this.isLoadingAdress = false;
          return of(null); // retorna observable vazio para completar o fluxo
        })
      )
      .subscribe((res) => {
        if (!res) return;
        this.formModel.localizacao.cep = res.cep;
        this.formModel.localizacao.logradouro = res.logradouro;
        this.formModel.localizacao.bairro = res.bairro;
        this.formModel.localizacao.cidade = res.localidade;
        this.formModel.localizacao.estado = res.uf;
        this.isLoadingAdress = false;
      });
  }

  onFieldChange(isItCep?: boolean) {
    if (isItCep) {
      this.getEndereco();
    } else {
      this.questionSrv.matriz.seccao1.dados.informacaoGerais = this.formModel;
      this.questionSrv.onMatrizDatachange(CadastroStep1Id.InfoGerais);
    }
  }
}
