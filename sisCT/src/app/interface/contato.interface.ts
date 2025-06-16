export interface RlContato {
  PK_RLCONTATO: number;
  CO_CONTATO: string;
  PK_TIPO_CONTATO: number;
  ST_CONTATO_ATIVO: string;
  DT_ATUALIZACAO: string;
  PK_CADASTRO_NACIONAL?: number | null;
  PK_REPRESENTANTE_LEGAL?: number | null;
  PK_REPRESENTANTE_TECNICO?: number | null;
}