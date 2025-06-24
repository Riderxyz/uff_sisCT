// enums e tipos auxiliares
export type VinculoEmprego = 'voluntario' | 'empregados' | 'terceirizados' | 'clt';

export type FormaAcesso = 'espontaneamente' | 'encaminhamentoPoliticas';
export type CapacidadeAtendimentoGrupo = 'grupos10' | 'grupos20' | 'grupos30' | 'grupos40' | 'gruposAcima41';

export type EspacoEntidade = 'proprio' | 'cedido' | 'alugado' | 'naoSabeInformar';

export type ConselhoMunicipal =
  | 'assistenciaSocial'
  | 'alcoolDrogas'
  | 'saude'
  | 'assistenciaSocial2'
  | 'naoSabeInformar'
  | 'naoTemConselho';

export type ReconhecimentoTipo = 'uniao' | 'estados' | 'municipios';

export type PeriodicidadeAtividades =
  | '1vezSemana'
  | '1vezQuinzeDias'
  | '1vezMes'
  | '2vezesMes'
  | 'outro';

export type RedesDeApoioChave =
  | 'parceriasNormais'
  | 'encaminhamentosInformais'
  | 'participacaoComites'
  | 'atendimentoDeterminacaoJudicial'
  | 'projetosFinanciadosSetorPublico'
  | 'encaminhamentosOrganizacoesSociedadeCivil'
  | 'outros'
  | 'outrosDescricao';

// Subinterfaces

export interface PublicoAlvo {
  adultoFeminino: number;
  adultoMasculino: number;
  criancasAdolescentes: number;
  idoso: number;
}

export interface ProfissionalInterface {
  id: string;
  nome: string;
  cpf: string;
  dataNascimento: string;
  telefone: string;
  email: string;
  cargo: string;
  formacaoAcademica: string;
  cargaHoraria: string;
  vinculo: VinculoEmprego;
}

export interface AtividadesDesenvolvidas {
  prevencao: boolean;
  apoio: boolean;
  mutuaAjuda: boolean;
  atendimentoPsicossocial: boolean;
  ressocializacao: boolean;
}

export interface PublicoAlvoAtividades {
  feminino: boolean;
  masculino: boolean;
  criancaAdolescente: boolean;
  idosos: boolean;
}

export interface CustosEspecificos {
  materialConsumo: boolean;
  rh: boolean;
  despesasAdministrativas: boolean;
  outros: boolean;
  outrosEspecificar: string;
}

export interface EscolaridadeProfissionais {
  apenasVoluntarios: boolean;
  ensinoFundamental: boolean;
  ensinoMedio: boolean;
  ensinoSuperior: boolean;
}

export interface AcoesPrevencao {
  palestras: boolean;
  rodasConversas: boolean;
  oficinas: boolean;
  atividadesLudicas: boolean;
  atividadesTerapeuticas: boolean;
  atendimentosPsicossociais: boolean;
  eventosSociais: boolean;
  outras: boolean;
  outrasEspecificar: string;
}

export interface TemasTrabalhados {
  direitosSociais: boolean;
  familia: boolean;
  saudeMental: boolean;
  prevencaoUsoAlcoolDrogas: boolean;
  espiritualidade: boolean;
  outros: boolean;
  outrosEspecificar: string;
}

export interface ServicosPsicossociais {
  acolhimento: boolean;
  acompanhamentoIndividual: boolean;
  encaminhamentosRedePublica: boolean;
  outros: boolean;
  outrosEspecificar: string;
}

export interface AcoesRessocializacao {
  capacitacaoProfissional: boolean;
  encaminhamentoEmprego: boolean;
  fortalecimentoVinculosFamiliares: boolean;
  outros: boolean;
  outrosEspecificar: string;
}

export interface TiposParcerias {
  parceriasInstituicoesEnsino: boolean;
  parceriasEmpresasMercadoTrabalho: boolean;
  parceriasOrgaosPublicos: boolean;
  naoPossuiParcerias: boolean;
  apenasFortalecimentoVinculos: boolean;
  outros: boolean;
  outrosEspecificar: string;
}

// Interface principal

export interface EntidadeDeCuidadoInterface {
  publicoAlvo: PublicoAlvo;
  capacidadeAtendimento: CapacidadeAtendimentoGrupo;
  formaAcesso: FormaAcesso;
  outrasPoliticasPublicas_RedesdeApoio: Record<RedesDeApoioChave, boolean | string>;

  espacoEntidade: EspacoEntidade;
  possuiEspacoAtendimentoColetivo: boolean;
  possuiEspacoAtendimentoIndividualizado: boolean;

  possuiQuadroTecnico: boolean;
  profissionaisAtuantes: ProfissionalInterface[];
  quantidadeProfissionaisAtuantes: string;

  possuiInscricaoConselhoMunicipal: boolean;
  conselhoMunicipal: ConselhoMunicipal;
  possuiInscricaoConselhoEstadual: boolean;
  naoTemConselhoEstadual: boolean;
  possuiReconhecimentoAutoridadePublica: boolean;
  reconhecimentoTipo: ReconhecimentoTipo;

  tiposAtividades: AtividadesDesenvolvidas;
  publicoAlvoAtividades: PublicoAlvoAtividades;
  capacidadeAtendimentoAtividades: string;
  servicoGratuito: boolean;
  valorCobrado: string;
  custosEspecificosEntidade: CustosEspecificos;

  profissionaisAtividades: string;
  escolaridadeProfissionais: EscolaridadeProfissionais;

  principaisAcoesRealizadas: AcoesPrevencao;
  principaisTemasTrabalhos: TemasTrabalhados;

  periodicidadeAtividades: PeriodicidadeAtividades;
  outroPeriodicidade: string;
  controleParticipacaoPublicoAlvo: boolean;

  entidadeAdota12Passos: boolean;
  metodologiasApoioRecuperacao: string;
  oferecerGruposApoio12Passos: boolean;
  descricaoFuncionamentoGrupos: string;

  oferecerAtendimentoPsicossocial: boolean;
  profissionalAtendimentoPsicossocial: string;
  servicosAtendimentoPsicossocial: ServicosPsicossociais;
  atendimentoPorProfissionaisContratados: boolean;

  desenvolveAcoesRessocializacao: boolean;
  acoesRessocializacao: AcoesRessocializacao;

  possuiParceriasEmpresasInstituicoes: boolean;
  tiposParceriaRessocializacao: TiposParcerias;
}
