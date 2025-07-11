
export interface RepresentanteLegalInterface {
  id?: number;
  nome: string;
  terminoMandato: string; // Date format "YYYY-MM-DD"
  papelDiretoria: string;
  outrosPapeis: string;
  dataNascimento: string; // Date format "YYYY-MM-DD"
  cpf: string;
  escolaridade: string;
  profissao: string;
  ativo: string;
  dataAtualizacao?: string; // ISO date format
  cadastroNacionalId: number;
  telefone?: string;
  email?: string;
  cursoProfissao?: string; // Alternative to profissao
  seuPapelnaMatriz?: string; // Alternative to papelDiretoria
}