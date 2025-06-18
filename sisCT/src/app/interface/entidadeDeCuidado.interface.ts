// Interface para tipagem do formulário
export interface EntidadeDeCuidadoInterface {
  // 7. Entidades de cuidado
  // 7.1 Caracterização do público-alvo
  publicoAlvo: {
    adultoFeminino: number;
    adultoMasculino: number;
    criancasAdolescentes: number;
    idoso: number;
  };

  // Capacidade de atendimento
  capacidadeAtendimento:
    | 'grupos10'
    | 'grupos20'
    | 'grupos30'
    | 'grupos40'
    | 'gruposAcima41';

  // Forma de acesso
  formaAcesso: 'espontaneamente' | 'encaminhamentoPoliticas';
  outrasPoliticasPublicas_RedesdeApoio: {
    parceriasNormais: boolean;
    encaminhamentosInformais: boolean;
    participacaoComites: boolean;
    atendimentoDeterminacaoJudicial: boolean;
    projetosFinanciadosSetorPublico: boolean;
    encaminhamentosOrganizacoesSociedadeCivil: boolean;
    outros: boolean;
    outrosDescricao: string;
  };

  // 7.2 Estrutura física
  espacoEntidade: 'proprio' | 'cedido' | 'alugado' | 'naoSabeInformar';
  possuiEspacoAtendimentoColetivo: boolean;
  possuiEspacoAtendimentoIndividualizado: boolean;

  // 7.3 Recursos Humanos
  possuiQuadroTecnico: boolean;
  // Tabela de profissionais
  profissionaisAtuantes: {
    nome: string;
    cpf: string;
    dataNascimento: string;
    telefone: string;
    email: string;
    cargo: string;
    formacaoAcademica: string;
    cargaHoraria: string;
    vinculo: 'voluntario' | 'empregados' | 'terceirizados' | 'clt';
  };
  quantidadeProfissionaisAtuantes: string;



  // 7.4 Reconhecimento da entidade
  possuiInscricaoConselhoMunicipal: boolean;
  conselhoMunicipal:
    | 'assistenciaSocial'
    | 'alcoolDrogas'
    | 'saude'
    | 'assistenciaSocial2'
    | 'naoSabeInformar'
    | 'naoTemConselho';
  possuiInscricaoConselhoEstadual: boolean;
  naoTemConselhoEstadual: boolean;
  possuiReconhecimentoAutoridadePublica: boolean;
  reconhecimentoTipo: 'uniao' | 'estados' | 'municipios';

  // 7.5 Atividades desenvolvidas
  tiposAtividades: {
    prevencao: boolean;
    apoio: boolean;
    mutuaAjuda: boolean;
    atendimentoPsicossocial: boolean;
    ressocializacao: boolean;
  };

  publicoAlvoAtividades: {
    feminino: boolean;
    masculino: boolean;
    criancaAdolescente: boolean;
    idosos: boolean;
  };

  capacidadeAtendimentoAtividades: string;
  servicoGratuito: boolean;
  valorCobrado: string;
  custosEspecificosEntidade: {
    materialConsumo: boolean;
    rh: boolean;
    despesasAdministrativas: boolean;
    outros: boolean;
    outrosEspecificar: string;
  };

  profissionaisAtividades: string;
  escolaridadeProfissionais: {
    apenasVoluntarios: boolean;
    ensinoFundamental: boolean;
    ensinoMedio: boolean;
    ensinoSuperior: boolean;
  };

  // Prevenção
  principaisAcoesRealizadas: {
    palestras: boolean;
    rodasConversas: boolean;
    oficinas: boolean;
    atividadesLudicas: boolean;
    atividadesTerapeuticas: boolean;
    atendimentosPsicossociais: boolean;
    eventosSociais: boolean;
    outras: boolean;
    outrasEspecificar: string;
  };

  principaisTemasTrabalhos: {
    direitosSociais: boolean;
    familia: boolean;
    saudeMental: boolean;
    prevencaoUsoAlcoolDrogas: boolean;
    espiritualidade: boolean;
    outros: boolean;
    outrosEspecificar: string;
  };

  periodicidadeAtividades:
    | '1vezSemana'
    | '1vezQuinzeDias'
    | '1vezMes'
    | '2vezesMes'
    | 'outro';
  outroPeriodicidade: string;

  controleParticipacaoPublicoAlvo: boolean;

  // Apoio e Mútua Ajuda
  entidadeAdota12Passos: boolean;
  metodologiasApoioRecuperacao: string;
  oferecerGruposApoio12Passos: boolean;
  descricaoFuncionamentoGrupos: string;

  // Atendimento Psicossocial
  oferecerAtendimentoPsicossocial: boolean;
  profissionalAtendimentoPsicossocial: string;
  servicosAtendimentoPsicossocial: {
    acolhimento: boolean;
    acompanhamentoIndividual: boolean;
    encaminhamentosRedePublica: boolean;
    outros: boolean;
    outrosEspecificar: string;
  };

  atendimentoPorProfissionaisContratados: boolean;

  // Ressocialização
  desenvolveAcoesRessocializacao: boolean;
  acoesRessocializacao: {
    capacitacaoProfissional: boolean;
    encaminhamentoEmprego: boolean;
    fortalecimentoVinculosFamiliares: boolean;
    outros: boolean;
    outrosEspecificar: string;
  };

  possuiParceriasEmpresasInstituicoes: boolean;
  tiposParceriaRessocializacao: {
    parceriasInstituicoesEnsino: boolean;
    parceriasEmpresasMercadoTrabalho: boolean;
    parceriasOrgaosPublicos: boolean;
    naoPossuiParcerias: boolean;
    apenasFortalecimentoVinculos: boolean;
    outros: boolean;
    outrosEspecificar: string;
  };
}
