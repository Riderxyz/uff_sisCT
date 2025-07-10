export interface CadastroNacional {
  id: number;
  dsOutroConselhoMunicipal: string;
  dsEmailInstitucional: string;
  dsInscricaoConselhoEstadual: string;
  dtValidadeLicensa: string; // ou Date se você converter para objeto Date
  noFantasia: string;
  noRazaoSocial: string;
  nuCnpj: string;
  nuCpfOwner: string;
  dsAtividadeFilial: string;
  coCnaePrincipal: string;
  coCnaeSecundario: string;
  vlReceitaBruta: number;
  coOutrasFontes: number;
  dsOutrasReceitas: string;
  dsOutros: string;
  nuPrazoProjeto: number;
  dtInicioCebas: string; // ou Date
  dtTerminoCebas: string; // ou Date
  nuAnoProtocoloCebas: number;
  nuProtocoloCebas: string;
  nuCapacidadeTotal: number;
  nuCapacidadeFeminino: number;
  nuCapacidadeMaes: number;
  nuCapacidadeMasculino: number;
  nuCapacidadeIdosos: number;
  dsArticulacaoPolitica: string;
  dsAcoesRealizadas: string;
  dsTemasTrabalhados: string;
  dsPeridiocidadeAtividade: string;
  ds12Passos: string;
  dsDependentesQuimicos: string;
  dsGruposApoio: string;
  dsOutraMetodologia: string;
  dsServicosPsicossocial: string;
  dsProfissionaisPsicossocial: string;
  dsAcoesRessocializacao: string;
  dsParceriasRessocializacao: string;
  dtAcordo: string; // ou Date
  stAceite: string;
  stAreaAtuacao: string;
  stAreaCertificavel: string;
  stPossuiFinanciamentoEstadual: string;
  stPossuiFinanciamentoEstado: string;
  stPossuiFinanciamentoMunicipio: string;
  stPossuiLicencaSanitaria: string;
  stPossuiCebas: string;
  stPossuiReqCebasDepad: string;
  stCumpreConad: string;
  stPossuiInscrMunicipal: string;
  stPossuiInscrEstadual: string;
  stPossuiReconhecimentoPublico: string;
  stPeriodicidadeCapacitacao: string;
  stCapacidadeAtendimento: string;
  stFormaAcesso: string;
  stEstruturaFisica: string;
  stEspacoColetivo: string;
  stEspacoIndividual: string;
  stPeriodicidadePrevencao: string;
  stParticipacaoPrevencao: string;
  stDozePassos: string;
  stApoioDozePassos: string;
  stAtendimentoPsicossocial: string;
  stRessocializacao: string;
  stParceriaRessocializacao: string;
  stStatusCadastro: string;
  stAtivo: string;
  dtUltimaAtualizacao: string; // ou Date
}
