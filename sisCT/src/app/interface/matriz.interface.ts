import { AreaDeAtuacaoInterface } from "./areaDeAtuacao.interface";
import { FonteRecursosInterface } from "./fonteRecursos.interfaces";
import { InformacaoGeraisInterface } from "./informacaoGerais.interface";
import { RepresentanteLegalInterface } from "./representanteLegal.interface";
import { RepresentanteTecnicoInterface } from "./representanteTecnico.interface";

type ModalidadeUniao =
  | 'contrato'
  | 'termoFomento'
  | 'termoColaboracao'
  | 'emendasParlamentares'
  | 'parcerias'
  | 'editaisSelecao'
  | 'outrosEspecificar';

type ModalidadeSimples =
  | 'emendasParlamentares'
  | 'parcerias'
  | 'editaisSelecao';

type TipoReceita =
  | 'mensalidadesPorParteDosAcolhidos'
  | 'campanhasArrecadacao'
  | 'doacoesAssociados'
  | 'vendaProdutos'
  | 'outrosEspecificar';


export interface MatrizInterface {
  seccao1: Seccao1Interface;
  seccao2: Seccao2Interface;
}

export interface Seccao1Interface {
  titulo: string;
  dados: Seccao1Dados;
}

export interface Seccao1Dados {
  areaDeAtuacao: AreaDeAtuacaoInterface;
  informacaoGerais: InformacaoGeraisInterface;
  representanteLegal: RepresentanteLegalInterface;
  representanteTecnico: RepresentanteTecnicoInterface;
  fonteRecursos: FonteRecursosInterface;
}



export interface ModalidadeDeFinanciamentoSimples {
  emendasParlamentares: boolean;
  parcerias: boolean;
  editaisSelecao: boolean;
}

export interface Seccao2Interface {
  titulo: string;
  dados: {
    comunidadeTerapeutica: object; // manter como object até detalhar
  };
}
