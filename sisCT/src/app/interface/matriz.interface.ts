export interface MatrizInterface {
  seccao1: Seccao1Interface;
  seccao2: Seccao2Interface;
}

export interface Seccao1Interface {
  titulo: string;
  dados: Seccao1Dados;
}

export interface Seccao1Dados {
  areaDeAtuacao: AreaDeAtuacao;
  informacaoGerais: InformacaoGerais;
  representanteLegal: RepresentanteLegal;
  representanteTecnico: RepresentanteTecnico;
  fonteRecursos: FonteRecursos;
}

export interface AreaDeAtuacao {
  comunidadeTerapeutica: boolean;
  entidadeDeCuidado: boolean;
}

export interface InformacaoGerais {
  registro: Registro;
  localizacao: Localizacao;
}

export interface Registro {
  cnpj: string;
  nomeFantasia: string;
  codigoDeAtividadesEconomicasPrimarias: string;
  codigoDeAtividadesEconomicasSecundarias: string;
  emailInstitucional:string;
  contato: string;
  tipoContato: 'email' | 'telefone';
  razaoSocial: string;
}

export interface Localizacao {
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  pais: string;
}

export interface RepresentanteLegal {
  nome: string;
  anoDeTerminoDeMandato: string;
  cpf: string;
  dataDeNascimento: string;
  escolaridade: string;
  cursoProfissao: string;
  telefone: string;
  email: string;
}

export interface RepresentanteTecnico {
  nome: string;
  cpf: string;
  dataDeNascimento: string;
  escolaridade: string;
  cursoProfissao: string;
  telefone: string;
  email: string;
  possuiExperienciaComprovada: boolean;
  representanteTecnicoSubstituto: RepresentanteTecnicoSubstituto;
}

export interface RepresentanteTecnicoSubstituto {
  nome: string;
  cpf: string;
  dataDeNascimento: string;
  escolaridade: string;
  cursoProfissao: string;
  telefone: string;
  email: string;
  possuiExperienciaComprovada: boolean;
}

export interface FonteRecursos {
  receitaBruta: number;
  recursoPublicos: RecursoPublicos;
  recursosDeOutrasFontes: RecursosDeOutrasFontes;
}

export interface RecursoPublicos {
  financiamentoComAUniao: FinanciamentoComAUniao;
  financiamentoEstadual: FinanciamentoEstadualMunicipal;
  financiamentoMunicipal: FinanciamentoEstadualMunicipal;
}

export interface FinanciamentoComAUniao {
  possui: boolean;
  modalidadeDeFinanciamento: ModalidadeDeFinanciamentoComAUniao;
}

export interface ModalidadeDeFinanciamentoComAUniao {
  contrato: boolean;
  termoFomento: boolean;
  termoColaboracao: boolean;
  outrosEspecificar: boolean;
  outrosEspecificarDescricao: string;
  emendasParlamentares: boolean;
  parcerias: boolean;
  editaisSelecao: boolean;
}

export interface FinanciamentoEstadualMunicipal {
  possui: boolean;
  modalidadeDeFinanciamento: ModalidadeDeFinanciamentoSimples;
}

export interface ModalidadeDeFinanciamentoSimples {
  emendasParlamentares: boolean;
  parcerias: boolean;
  editaisSelecao: boolean;
}

export interface RecursosDeOutrasFontes {
  doacoesFinanceirasTerceiros: boolean;
  parceriasPrivadas: boolean;
  outrosEspecificar: boolean;
  outrosEspecificarDescricao: string;
  receitasProprias: ReceitasProprias;
}

export interface ReceitasProprias {
  mensalidadesPorParteDosAcolhidos: boolean;
  campanhasArrecadacao: boolean;
  doacoesAssociados: boolean;
  vendaProdutos: boolean;
  outrosEspecificar: boolean;
  outrosEspecificarDescricao: string;
}

export interface Seccao2Interface {
  titulo: string;
  dados: {
    comunidadeTerapeutica: object; // manter como object até detalhar
  };
}
