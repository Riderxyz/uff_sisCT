import { AfterViewInit, Component, inject } from '@angular/core';
import { QuestionService } from '../../../../../services/question.service';
import { UtilService } from '../../../../../services/util.service';
import { EntidadeDeCuidadoInterface } from '../../../../../interface/entidadeDeCuidado.interface';
import { entidadeCuidadoFormOptions } from './options';

@Component({
  selector: 'app-entidade-de-cuidado',
  templateUrl: './entidade-de-cuidado.component.html',
  styleUrl: './entidade-de-cuidado.component.scss',
})
export class EntidadeDeCuidadoComponent implements AfterViewInit {
  readonly questionSrv: QuestionService = inject(QuestionService);
  readonly utilSrv: UtilService = inject(UtilService);

   formModel: EntidadeDeCuidadoInterface = {
  publicoAlvo: {
    adultoFeminino: 0,
    adultoMasculino: 0,
    criancasAdolescentes: 0,
    idoso: 0,
  },

  capacidadeAtendimento: 'grupos10',

  formaAcesso: 'espontaneamente',
  outrasPoliticasPublicas_RedesdeApoio: {
    parceriasNormais: false,
    encaminhamentosInformais: false,
    participacaoComites: false,
    atendimentoDeterminacaoJudicial: false,
    projetosFinanciadosSetorPublico: false,
    encaminhamentosOrganizacoesSociedadeCivil: false,
    outros: false,
    outrosDescricao: '',
  },

  espacoEntidade: 'naoSabeInformar',
  possuiEspacoAtendimentoColetivo: false,
  possuiEspacoAtendimentoIndividualizado: false,

  possuiQuadroTecnico: false,
  profissionaisAtuantes: {
    nome: '',
    cpf: '',
    dataNascimento: '',
    telefone: '',
    email: '',
    cargo: '',
    formacaoAcademica: '',
    cargaHoraria: '',
    vinculo: 'voluntario',
  },
  quantidadeProfissionaisAtuantes: '',

  possuiInscricaoConselhoMunicipal: false,
  conselhoMunicipal: 'naoSabeInformar',
  possuiInscricaoConselhoEstadual: false,
  naoTemConselhoEstadual: false,
  possuiReconhecimentoAutoridadePublica: false,
  reconhecimentoTipo: 'municipios',

  tiposAtividades: {
    prevencao: false,
    apoio: false,
    mutuaAjuda: false,
    atendimentoPsicossocial: false,
    ressocializacao: false,
  },

  publicoAlvoAtividades: {
    feminino: false,
    masculino: false,
    criancaAdolescente: false,
    idosos: false,
  },

  capacidadeAtendimentoAtividades: '',
  servicoGratuito: false,
  valorCobrado: '',
  custosEspecificosEntidade: {
    materialConsumo: false,
    rh: false,
    despesasAdministrativas: false,
    outros: false,
    outrosEspecificar: '',
  },

  profissionaisAtividades: '',
  escolaridadeProfissionais: {
    apenasVoluntarios: false,
    ensinoFundamental: false,
    ensinoMedio: false,
    ensinoSuperior: false,
  },

  principaisAcoesRealizadas: {
    palestras: false,
    rodasConversas: false,
    oficinas: false,
    atividadesLudicas: false,
    atividadesTerapeuticas: false,
    atendimentosPsicossociais: false,
    eventosSociais: false,
    outras: false,
    outrasEspecificar: '',
  },

  principaisTemasTrabalhos: {
    direitosSociais: false,
    familia: false,
    saudeMental: false,
    prevencaoUsoAlcoolDrogas: false,
    espiritualidade: false,
    outros: false,
    outrosEspecificar: '',
  },

  periodicidadeAtividades: '1vezSemana',
  outroPeriodicidade: '',

  controleParticipacaoPublicoAlvo: false,

  entidadeAdota12Passos: false,
  metodologiasApoioRecuperacao: '',
  oferecerGruposApoio12Passos: false,
  descricaoFuncionamentoGrupos: '',

  oferecerAtendimentoPsicossocial: false,
  profissionalAtendimentoPsicossocial: '',
  servicosAtendimentoPsicossocial: {
    acolhimento: false,
    acompanhamentoIndividual: false,
    encaminhamentosRedePublica: false,
    outros: false,
    outrosEspecificar: '',
  },

  atendimentoPorProfissionaisContratados: false,

  desenvolveAcoesRessocializacao: false,
  acoesRessocializacao: {
    capacitacaoProfissional: false,
    encaminhamentoEmprego: false,
    fortalecimentoVinculosFamiliares: false,
    outros: false,
    outrosEspecificar: '',
  },

  possuiParceriasEmpresasInstituicoes: false,
  tiposParceriaRessocializacao: {
    parceriasInstituicoesEnsino: false,
    parceriasEmpresasMercadoTrabalho: false,
    parceriasOrgaosPublicos: false,
    naoPossuiParcerias: false,
    apenasFortalecimentoVinculos: false,
    outros: false,
    outrosEspecificar: '',
  },
};

  entidadeCuidadoFormOptionsObj = entidadeCuidadoFormOptions;
  constructor() {}

  ngAfterViewInit(): void {}

    adicionarProfissional() {
/*     this.formModel.profissionais.push({
      nome: '',
      profissao: '',
      cargaHoraria: '',
      tipoVinculo: 'voluntario'
    }); */
  }

  // Método para remover profissional
  removerProfissional(index: number) {
    //this.formModel.profissionais.splice(index, 1);
  }

  // Método para submeter o formulário
  onSubmit() {
    console.log('Dados do formulário:', this.formModel);
    // Aqui você pode implementar a lógica de envio
  }
}
