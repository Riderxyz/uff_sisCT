export interface RespostaInterface {
  PK_RL_RESPOSTA?: number;
  CO_RESPOSTA?: string;
  PK_PERGUNTAS: number;
  PK_CADASTRO_NACIONAL: number;
  ST_ATIVO?: number;
  DT_ULTIMA_ATUALIZACAO?: Date;
}

export interface RespostaLocalInterface {
  id: number;
  co_resposta?: string;
  texto_pergunta?: string;
  chave_pergunta: string;
}