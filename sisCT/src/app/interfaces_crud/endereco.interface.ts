export interface Endereco {
  id?: number;
  coEstado: string;
  dsMunicipio: string;
  dsLogradouro: string;
  dsComplemento: string;
  noBairro: string;
  nuNumero: string;
  nuCep: string;
  dtAtualizacao: string | Date;
  stAtivo: string;
  cadastroNacionalId: number;
  dsPais?: string; // Optional as it wasn't in the JSON
}