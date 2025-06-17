import { AfterViewInit, Component, inject } from '@angular/core';
import { QuestionService } from '../../../../../services/question.service';
import { UtilService } from '../../../../../services/util.service';
import { EntidadeDeCuidadoInterface } from '../../../../../interface/entidadeDeCuidado.interface';

@Component({
  selector: 'app-entidade-de-cuidado',
  templateUrl: './entidade-de-cuidado.component.html',
  styleUrl: './entidade-de-cuidado.component.scss',
})
export class EntidadeDeCuidadoComponent implements AfterViewInit {
  readonly questionSrv: QuestionService = inject(QuestionService);
  readonly utilSrv: UtilService = inject(UtilService);

   formModel: EntidadeDeCuidadoInterface = {
    // 7. Entidades de cuidado
    entidadeRealizaAcolhimento: false,
    entidadeRealizaAcolhimentoProvisorio: false,
    entidadeTemCapacidadeTerapeutica: false,

    // 7.1 Caracterização do público-alvo
    publicoAlvo: {
      adultoFeminino: 0,
      adultoMasculino: 0,
      criancasAdolescentes: 0,
      idoso: 0
    },

    capacidadeAtendimento: 'grupos10',
    formaAcesso: 'espontaneamente',

    tiposAtendimento: {
      atendimentoDeterminacaoJudicial: false,
      projetosFinanciadosSetorPublico: false,
      encaminhamentosOrganizacoesSociedadeCivil: false,
      outroEspecificar: ''
    },

    // 7.2 Estrutura física
    espacoEntidade: 'proprio',
    possuiEspacoAtendimentoColetivo: false,
    possuiEspacoAtendimentoIndividualizado: false,

    // 7.3 Recursos Humanos
    possuiQuadroTecnico: false,
    profissionaisAtuantes: '',
    quantidadeProfissionaisAtuantes: '',
    tipoProfissionaisVinculo: '',

    profissionais: [],

    // 7.4 Reconhecimento da entidade
    possuiInscricaoConselhoMunicipal: false,
    conselhoMunicipal: 'assistenciaSocial',
    possuiInscricaoConselhoEstadual: false,
    naoTemConselhoEstadual: false,
    possuiReconhecimentoAutoridadePublica: false,
    reconhecimentoTipo: 'uniao',

    // 7.5 Atividades desenvolvidas
    tiposAtividades: {
      prevencao: false,
      apoio: false,
      mutuaAjuda: false,
      atendimentoPsicossocial: false,
      ressocializacao: false
    },

    publicoAlvoAtividades: {
      feminino: false,
      masculino: false,
      criancaAdolescente: false,
      idosos: false
    },

    capacidadeAtendimentoAtividades: '',
    servicoGratuito: false,
    valorCobrado: '',

    custosEspecificosEntidade: {
      materialConsumo: false,
      rh: false,
      despesasAdministrativas: false,
      outros: false,
      outrosEspecificar: ''
    },

    profissionaisAtividades: '',
    escolaridadeProfissionais: {
      apenasVoluntarios: false,
      ensinoFundamental: false,
      ensinoMedio: false,
      ensinoSuperior: false
    },

    // Prevenção
    principaisAcoesRealizadas: {
      palestras: false,
      rodasConversas: false,
      oficinas: false,
      atividadesLudicas: false,
      atividadesTerapeuticas: false,
      atendimentosPsicossociais: false,
      eventosSociais: false,
      outras: false,
      outrasEspecificar: ''
    },

    principaisTemasTrabalhos: {
      direitosSociais: false,
      familia: false,
      saudeMental: false,
      prevencaoUsoAlcoolDrogas: false,
      espiritualidade: false,
      outros: false,
      outrosEspecificar: ''
    },

    periodicidadeAtividades: '1vezSemana',
    outroPeriodicidade: '',
    controleParticipacaoPublicoAlvo: false,

    // Apoio e Mútua Ajuda
    entidadeAdota12Passos: false,
    metodologiasApoioRecuperacao: '',
    oferecerGruposApoio12Passos: false,
    descricaoFuncionamentoGrupos: '',

    // Atendimento Psicossocial
    oferecerAtendimentoPsicossocial: false,
    profissionalAtendimentoPsicossocial: '',
    servicosAtendimentoPsicossocial: {
      acolhimento: false,
      acompanhamentoIndividual: false,
      encaminhamentosRedePublica: false,
      outros: false,
      outrosEspecificar: ''
    },

    atendimentoPorProfissionaisContratados: false,

    // Ressocialização
    desenvolveAcoesRessocializacao: false,
    acoesRessocializacao: {
      capacitacaoProfissional: false,
      encaminhamentoEmprego: false,
      fortalecimentoVinculosFamiliares: false,
      outros: false,
      outrosEspecificar: ''
    },

    possuiParceriasEmpresasInstituicoes: false,
    tiposParceriaRessocializacao: {
      parceriasInstituicoesEnsino: false,
      parceriasEmpresasMercadoTrabalho: false,
      parceriasOrgaosPublicos: false,
      naoPossuiParcerias: false,
      apenasFortalecimentoVinculos: false,
      outros: false,
      outrosEspecificar: ''
    }
  };
  constructor() {}

  ngAfterViewInit(): void {}

    adicionarProfissional() {
    this.formModel.profissionais.push({
      nome: '',
      profissao: '',
      cargaHoraria: '',
      tipoVinculo: 'voluntario'
    });
  }

  // Método para remover profissional
  removerProfissional(index: number) {
    this.formModel.profissionais.splice(index, 1);
  }

  // Método para submeter o formulário
  onSubmit() {
    console.log('Dados do formulário:', this.formModel);
    // Aqui você pode implementar a lógica de envio
  }
}
