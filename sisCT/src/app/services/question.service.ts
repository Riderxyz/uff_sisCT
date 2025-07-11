import { inject, Injectable } from '@angular/core';
import { MatrizInterface } from '../interface/matriz.interface';
import { config } from '../services/config';
import { CentralRxJsService } from './centralRXJS.service';
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
          seuPapelnaMatriz: '',
          terminoMandato: '',
          cpf: '',
          dataNascimento: '',
          escolaridade: '',
          cursoProfissao: '',
          telefone: '',
          email: '',
          papelDiretoria: '',
          outrosPapeis: '',
          profissao: '',
          ativo: '',
          cadastroNacionalId: 0
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
          possuiResponsavelTecnicoSubstituto: false,
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
          recursosPublicos: {
            uniao: { possui: false, modalidades: [] },
            estadual: { possui: false, modalidades: [] },
            municipal: { possui: false, modalidades: [] },
          },
          outrasFontes: {
            doacoesFinanceirasTerceiros: false,
            parceriasPrivadas: false,
            receitasProprias: [],
            outros: '',
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
  private readonly centralRxjsSrv = inject(CentralRxJsService);
  constructor() { }

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

  onMatrizDatachange(subsection: string) {
    this.centralRxjsSrv.sendData({
      key: config.senderKeys.matrizChange,
      data: { matriz: this.matriz, subsection: subsection },
    });
    localStorage.setItem('matriz', JSON.stringify(this.matriz));

    setTimeout(() => {
      this.centralRxjsSrv.sendData({
        key: config.senderKeys.matrizChange,
        data: { matriz: this.matriz, subsection: subsection },
      });
    }, 1500);
  }
}
