export interface RespostaInterface {
  id?: number;
  codigoResposta: string;
  perguntaId: number;
  cadastroNacionalId: number;
  ativo: string;
  dataUltimaAtualizacao: Date;
}

export interface RespostaLocalInterface {
  id: number;
  co_resposta?: string;
  texto_pergunta?: string;
  chave_pergunta: string;
}