import { inject, Injectable } from '@angular/core';
import { config } from '../services/config';
import { MatrizInterface } from '../interface/matriz.interface';
import { UtilService } from './util.service';

@Injectable({ providedIn: 'root' })
export class QuestionService {
  private _selectedCnpj: string = '';
  isSavingLocally: boolean = false;
  matriz: MatrizInterface = {
    seccao1: {
      titulo: 'Seção I: Dados da Matriz',
      dados: {
        areaDeAtuacao: {
          comunidadeTerapeutica: false,
          entidadeDeCuidado: false,
        },
        informacaoGerais: {
          registro: {
            cnpj: '',
            emailInstitucional: '',
            contato: '',
            tipoContato: 'email',
            nomeFantasia: '',
            codigoDeAtividadesEconomicasPrimarias: '',
            codigoDeAtividadesEconomicasSecundarias: '',
            razaoSocial: '',
          },
          localizacao: {
            cep: '',
            logradouro: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            estado: '',
            pais: '',
          },
        },
        representanteLegal: {
          nome: '',

          anoDeTerminoDeMandato: '',
          cpf: '',
          dataDeNascimento: '',
          escolaridade: '',
          cursoProfissao: '',
          telefone: '',
          email: '',
        },
        representanteTecnico: {
          nome: '',
          cpf: '',
          dataDeNascimento: '',
          escolaridade: '',
          cursoProfissao: '',
          telefone: '',
          email: '',
          possuiExperienciaComprovada: false,
          representanteTecnicoSubstituto: {
            nome: '',
            cpf: '',
            dataDeNascimento: '',
            escolaridade: '',
            cursoProfissao: '',
            telefone: '',
            email: '',
            possuiExperienciaComprovada: false,
          },
        },
        fonteRecursos: {
          receitaBruta: 0,
          recursoPublicos: {
            financiamentoComAUniao: {
              possui: false,
              modalidadeDeFinanciamento: {
                contrato: false,
                termoFomento: false,
                termoColaboracao: false,
                outrosEspecificar: false,
                outrosEspecificarDescricao: '',
                emendasParlamentares: false,
                parcerias: false,
                editaisSelecao: false,
              },
            },
            financiamentoEstadual: {
              possui: false,
              modalidadeDeFinanciamento: {
                emendasParlamentares: false,
                parcerias: false,
                editaisSelecao: false,
              },
            },
            financiamentoMunicipal: {
              possui: false,
              modalidadeDeFinanciamento: {
                emendasParlamentares: false,
                parcerias: false,
                editaisSelecao: false,
              },
            },
          },
          recursosDeOutrasFontes: {
            doacoesFinanceirasTerceiros: false,
            parceriasPrivadas: false,
            outrosEspecificar: false,
            outrosEspecificarDescricao: '',
            receitasProprias: {
              mensalidadesPorParteDosAcolhidos: false,
              campanhasArrecadacao: false,
              doacoesAssociados: false,
              vendaProdutos: false,
              outrosEspecificar: false,
              outrosEspecificarDescricao: '',
            },
          },
        },
      },
    },

    seccao2: {
      titulo: 'Seção II: Dados Específicos por area de atuação da matriz',
      dados: {
        comunidadeTerapeutica: {},
      },
    },
  };
  private readonly utilSrv = inject(UtilService);
  constructor() {}

  get selectedCnpj(): string {
    if (!this._selectedCnpj) {
      this._selectedCnpj =
        localStorage.getItem(config.localStorageKeys.selectedCnpj) || '';
    }
    if (this._selectedCnpj) {
      return this._selectedCnpj;
    }
    return this._selectedCnpj;
  }

  set selectedCnpj(value: string) {
    localStorage.setItem(config.localStorageKeys.selectedCnpj, value);
    this._selectedCnpj = value;
  }

  onMatrizDatachange() {
    this.isSavingLocally = true;
    localStorage.setItem('matriz', JSON.stringify(this.matriz));
   // this.utilSrv.showSuccess('Matriz atualizada com sucesso!');
    setTimeout(() => {
      this.isSavingLocally = false;
    }, 1500);
  }
}
