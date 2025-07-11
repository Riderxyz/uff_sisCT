export interface RepresentanteTecnico {
  id?: number; // Equivalente a pkRepresentanteTecnico
  nome?: string; // Equivalente a noNome
  dataNascimento: string | Date; // Equivalente a dtNascimento (no JSON é string, mas pode ser Date)
  cpf: string; // Equivalente a nuCpf
  email?: string; // Equivalente a dsEmail
  telefone?: string; // Equivalente a nuTelefone
  escolaridade?: string; // Equivalente a tpEscolaridade
  profissao?: string; // Equivalente a dsProfissao
  possuiExperiencia?: string; // Equivalente a stPossuiExperiencia (mas no JSON é string, não number)
  principal: number; // Equivalente a pkPrincipal
  ativo?: string; // Equivalente a stAtivo
  dataAtualizacao?: string | Date; // Equivalente a dtAtualizacao (no JSON é string, mas pode ser Date)
  cadastroNacionalId: number; // Equivalente a pkCadastroNacional
}