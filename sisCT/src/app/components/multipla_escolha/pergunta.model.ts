export interface Resposta {
  descricao: string;
  id: number;
  selecionado: boolean;
}

export interface Pergunta {
  nome: string;
  id: string;
  direcao: 'V' | 'H';
  respostas: Resposta[];
}
