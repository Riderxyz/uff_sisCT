export interface RepresentanteTecnico {
  pkRepresentanteTecnico?: number;
  noNome?: string;
  dtNascimento: Date;
  nuCpf: string;
  tpEscolaridade?: string;
  dsProfissao?: string;
  stPossuiExperiencia?: number;
  pkPrincipal?: number;
  stAtivo?: string;
  dtAtualizacao?: Date;
  pkCadastroNacional: number;
}