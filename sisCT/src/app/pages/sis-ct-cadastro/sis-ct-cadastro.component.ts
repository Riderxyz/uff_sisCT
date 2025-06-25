import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
} from 'angular-animations';
import { Subscription } from 'rxjs';
import {
  CadastroStep1Id,
  CadastroStep2Id,
  SubSection,
} from '../../interface/subSection.interface';
import { CadastroNacionalService } from '../../services/cadastro-nacional.service';
import { CentralRxJsService } from '../../services/centralRXJS.service';
import { config } from '../../services/config';
import { StatusService } from '../../services/status.service';
import { AreaDeAtuacaoComponent } from './components/section1/area-de-atuacao/area-de-atuacao.component';
import { FonteRecursosComponent } from './components/section1/fonte-recursos/fonte-recursos.component';
import { InfoGeraisComponent } from './components/section1/info-gerais/info-gerais.component';
import { RepresentateLegalMatrizComponent } from './components/section1/representate-legal-matriz/representate-legal-matriz.component';
import { ResponsavelTecnicoComponent } from './components/section1/responsavel-tecnico/responsavel-tecnico.component';
import { ComunidadeTerapeuticaComponent } from './components/section2/comunidade-terapeutica/comunidade-terapeutica.component';
import { EntidadeDeCuidadoComponent } from './components/section2/entidade-de-cuidado/entidade-de-cuidado.component';

@Component({
  selector: 'app-sis-ct-cadastro',
  standalone: false,
  templateUrl: './sis-ct-cadastro.component.html',
  styleUrl: './sis-ct-cadastro.component.scss',
  animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()],
})


export class SisCtCadastroComponent implements OnInit, OnDestroy {
  perguntaSelecionadaId: string = 'PERGUNTA_2';
  secaoILabel: string = 'Seção I: Dados da Matriz';
  isFilial: boolean = false;
  cnpjMatriz: string = '';

  @ViewChild('stepper') stepper!: MatStepper;

  readonly paginasSection1: SubSection[] = [
    {
      id: CadastroStep1Id.AreaDeAtuacao,
      header: '1. Áreas de Atuação',
      component: AreaDeAtuacaoComponent,
      showSavingIcon: false,
      secao: 1,
    },
    {
      id: CadastroStep1Id.InfoGerais,
      header: '2. Informações Gerais',
      component: InfoGeraisComponent,
      showSavingIcon: false,
      secao: 2
    },
    {
      id: CadastroStep1Id.RepresentanteLegal,
      header: '3. Representante Legal',
      component: RepresentateLegalMatrizComponent,
      showSavingIcon: false,
      secao: 3
    },
    {
      id: CadastroStep1Id.ResponsavelTecnico,
      header: '4. Responsável Técnico',
      component: ResponsavelTecnicoComponent,
      showSavingIcon: false,
      secao: 4
    },
    {
      id: CadastroStep1Id.FonteRecursos,
      header: '5. Fonte de Recursos',
      component: FonteRecursosComponent,
      showSavingIcon: false,
      secao: 5
    },
  ];

  readonly paginaSection2: SubSection[] = [
    {
      id: CadastroStep2Id.ComunidadeTerap,
      header: '6. Comunidade Terapêutica',
      component: ComunidadeTerapeuticaComponent,
      showSavingIcon: false,
      secao: 1,
    },
    {
      id: CadastroStep2Id.EntidadesCuidado,
      header: '7. Entidades de Cuidado',
      component: EntidadeDeCuidadoComponent,
      showSavingIcon: false,
      secao: 2
    },
  ];

  private readonly centralRxjs = inject(CentralRxJsService);
  private statusSubscription?: Subscription;

  constructor(public statusService: StatusService, public cadastroNacionalService: CadastroNacionalService) {
    this.centralRxjs.dataToReceive.subscribe(({ key, data }) => {
      console.log('Recebido evento:', key, data);


      if (key === config.senderKeys.matrizChange) {
        const section =
          this.paginasSection1.find((p) => p.id === data.subsection) ??
          this.paginaSection2.find((p) => p.id === data.subsection);

        if (section) section.showSavingIcon = !section.showSavingIcon;
      }

      // Atualizar o label da Seção I quando o status de filial mudar
      if (key === config.senderKeys.filialStatus) {
        console.log('Atualizando status de filial:', data);
        this.isFilial = data.isFilial;
        this.cnpjMatriz = data.cnpjMatriz || '';
        this.atualizarLabelSecaoI();
      }
    });
  }

  ngOnInit() {
    this.statusSubscription = this.statusService.status$.subscribe(() => {
      // Force change detection when status changes
      // console.log('Status changed');
    });
  }

  ngOnDestroy() {
    this.statusSubscription?.unsubscribe();
  }


  atualizarLabelSecaoI() {
    if (this.isFilial && this.cnpjMatriz) {
      this.secaoILabel = `Seção I: Filial da matriz ${this.cnpjMatriz}`;
    } else {
      this.secaoILabel = 'Seção I: Dados da Matriz';
    }
    console.log('Label atualizado:', this.secaoILabel);
  }

  onRespostaSelecionada(event: {
    perguntaId: string;
    respostaId: number;
    selecionado: boolean;
  }) {
    console.log('Resposta selecionada:', event);
    // Atualize seu estado aqui conforme necessário
  }

  shouldShowPanel(id: CadastroStep1Id | CadastroStep2Id): boolean {
    const obj = this.cadastroNacionalService.getCurrentCadastro();
    if (obj.ST_AREA_ATUACAO === 0) {
      return id === CadastroStep2Id.ComunidadeTerap;
    } else if (obj.ST_AREA_ATUACAO === 1) {
      return id === CadastroStep2Id.EntidadesCuidado
    } else return false;
  }
}
