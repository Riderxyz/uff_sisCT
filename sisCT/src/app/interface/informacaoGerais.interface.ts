
export interface InformacaoGeraisInterface {
  registro: RegistroInterface;
  localizacao: LocalizacaoInterface;
}

export interface RegistroInterface {
  cnpj: string;
  nomeFantasia: string;
  codigoDeAtividadesEconomicasPrimarias: string;
  codigoDeAtividadesEconomicasSecundarias: string[] | string;
  emailInstitucional:string;
  contato: string;
  tipoContato: 'email' | 'telefone';
  razaoSocial: string;
}

export interface LocalizacaoInterface {
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  pais: string;
}
