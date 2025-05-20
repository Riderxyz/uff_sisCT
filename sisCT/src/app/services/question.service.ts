import { Injectable } from '@angular/core';
import { config } from '../services/config';

@Injectable({ providedIn: 'root' })
export class QuestionService {
  private _selectedCnpj: string = '';

  matriz = {
    areaDeAtuacao: {
      comunidadeTerapeutica: false,
      entidadeDeCuidado: false,
    },
    informacaoGerais: {
      registro: {
        cnpj: '',
        nomeFantasia: '',
        codigoDeAtivadesEconoimicasPrimarias: '',
        codigoDeAtivadesEconoimicasSecundarias: '',
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
      representanteTecnicoSustituto: {
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
            termoColaboração: false,
            outrosEspecificar: false,
            outrosEspecificarDescricao: '',
            emendasParlamentares: false,
            parcerias: false,
            editaisSeleção: false,
          },
        },
        financiamentoEstadual: {
          possui: false,
          modalidadeDeFinanciamento: {
            emendasParlamentares: false,
            parcerias: false,
            editaisSeleção: false,
          },
        },
        financiamentoMunicipal: {
          possui: false,
          modalidadeDeFinanciamento: {
            emendasParlamentares: false,
            parcerias: false,
            editaisSeleção: false,
          },
        },
      },
      recursosDeOutrasFontes: {
        doaçõesFinanceirasTerceiros: false,
        parceriasPrivadas: false,
        outrosEspecificar: false,
        outrosEspecificarDescricao: '',
        receitasProprias: {
          mensalidadesPorParteDosAcolhidos: false,
          campanhasArrecadação: false,
          doacoesAssociados: false,
          vendaProdutos: false,
          OutrosEspecificar: false,
          OutrosEspecificarDescricao: '',
        },
      },
    },
  };
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
}
