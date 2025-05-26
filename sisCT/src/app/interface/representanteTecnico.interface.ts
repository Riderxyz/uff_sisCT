export interface RepresentanteTecnicoInterface {
  nome: string;
  cpf: string;
  dataDeNascimento: string;
  escolaridade: string;
  cursoProfissao: string;
  telefone: string;
  email: string;
  possuiExperienciaComprovada: boolean;
  representanteTecnicoSubstituto?: RepresentanteTecnicoSubstitutoInterface;
}

export interface RepresentanteTecnicoSubstitutoInterface {
  nome: string;
  cpf: string;
  dataDeNascimento: string;
  escolaridade: string;
  cursoProfissao: string;
  telefone: string;
  email: string;
  possuiExperienciaComprovada: boolean;
}
