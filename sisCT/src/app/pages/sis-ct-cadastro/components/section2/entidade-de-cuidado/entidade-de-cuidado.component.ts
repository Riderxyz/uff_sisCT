import { AfterViewInit, Component, inject } from '@angular/core';
import { QuestionService } from '../../../../../services/question.service';
import { UtilService } from '../../../../../services/util.service';
import { EntidadeDeCuidadoInterface, ProfissionalInterface } from '../../../../../interface/entidadeDeCuidado.interface';
import { entidadeCuidadoFormOptions } from './options';
import { AllCommunityModule, ColDef, GridApi, GridOptions, GridReadyEvent, ModuleRegistry } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { ContatoDialogComponent } from '../../../../../components/contatos/contato-dialog.component';
import { AdicionarProfissionalDialogComponent } from '../../../../../components/dialogs/adicionar-profissional-dialog/adicionar-profissional-dialog.component';
@Component({
  selector: 'app-entidade-de-cuidado',
  templateUrl: './entidade-de-cuidado.component.html',
  styleUrl: './entidade-de-cuidado.component.scss',
})
export class EntidadeDeCuidadoComponent implements AfterViewInit {
  readonly questionSrv: QuestionService = inject(QuestionService);
  readonly utilSrv: UtilService = inject(UtilService);
readonly dialog: MatDialog = inject(MatDialog);
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
  profissionaisAtuantes: [],
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


  profissionaisTabelaGridOptions: GridOptions = {
columnDefs: this.entidadeCuidadoFormOptionsObj.profissionaisColDefs,
  defaultColDef: {
        editable: false,
        sortable: true,
        resizable: true,
        filter: true,
      },

  }

  constructor() {}

  ngAfterViewInit(): void {
    this.profissionaisTabelaGridOptions
  }

    adicionarProfissional() {
const dialogRef = this.dialog.open(AdicionarProfissionalDialogComponent, {
      width: '60rem', // Ajuste a largura conforme necessário
      data: {} // Pode passar dados iniciais aqui se for editar um contato
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.formModel.profissionaisAtuantes.push(result);
        console.log('Profissional salvo:', result);
      }
    });
  }

  editarProfisional(profissional: ProfissionalInterface) {
    const dialogRef = this.dialog.open(AdicionarProfissionalDialogComponent, {
      width: '60rem', // Ajuste a largura conforme necessário
      data: {} // Pode passar dados iniciais aqui se for editar um contato
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.formModel.profissionaisAtuantes.push(result);
        console.log('Profissional salvo:', result);
      }
    });
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
