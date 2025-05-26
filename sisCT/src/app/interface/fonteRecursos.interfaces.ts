// fonte-recursos.interface.ts

export interface FonteRecursosInterface {
  receitaBruta: number | null;
  recursosPublicos: RecursosPublicos;
  outrasFontes: OutrasFontes;
}

export interface RecursosPublicos {
  uniao: FinanciamentoFonte;
  estadual: FinanciamentoFonte;
  municipal: FinanciamentoFonte;
}

export interface FinanciamentoFonte {
  possui: boolean;
  modalidades: ModalidadeFinanciamento[];
}

export type ModalidadeFinanciamento = 'Contrato' | 'Termo de Fomento' | 'Termo de Colaboração' | 'Outros' | 'Emendas Parlamentares' | 'Parcerias' | 'Editais de seleção';
export type NivelFonte = 'uniao' | 'estadual' | 'municipal';
export interface OutrasFontes {
  doacoesFinanceirasTerceiros: boolean;
  parceriasPrivadas: boolean;
  receitasProprias: ReceitaPropria[];
  outros?: string;
}

export type ReceitaPropria = 'Mensalidades' | 'Campanhas' | 'DoacoesAssociados' | 'VendaProdutos' | 'Outros';
