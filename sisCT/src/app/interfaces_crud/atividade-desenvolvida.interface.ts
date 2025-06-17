export interface AtividadeDesenvolvida {
  PK_ATIVIDADE_DESENVOLVIDA?: number;
  DS_ATIVIDADE_DESENVOLVIDA?: string;
  ST_ATIVO?: number;
  DT_ULTIMA_ATUALIZACAO?: Date;
}

export interface RlAtividadeDesenvolvida {
  PK_CADASTRO_NACIONAL: number;
  PK_ATIVIDADE_DESENVOLVIDA: number;
  NU_CAPACIDADE?: number;
  ST_GRATUITO?: number;
  NU_PERCENTUAL?: number;
  DS_OUTROS_ASPECTOS?: string;
  ST_APENAS_VOLUNTARIOS?: number;
  TP_FORMACAO?: string;
  ST_ATIVO?: number;
  DT_ULTIMA_ATUALIZACAO?: Date;
}