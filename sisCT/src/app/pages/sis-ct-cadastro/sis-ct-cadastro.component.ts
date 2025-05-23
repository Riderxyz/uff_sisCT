import { Component, inject, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
} from 'angular-animations';
import { CentralRxJsService } from '../../services/centralRXJS.service';
import { config } from '../../services/config';
import {
SubSection, CadastroStep1Id, CadastroStep2Id } from '../../interface/subSection.interface';
import { AreaDeAtuacaoComponent } from './components/area-de-atuacao/area-de-atuacao.component';
import { InfoGeraisComponent } from './components/info-gerais/info-gerais.component';
import { ResponsavelTecnicoComponent } from './components/responsavel-tecnico/responsavel-tecnico.component';
import { RepresentateLegalMatrizComponent } from './components/representate-legal-matriz/representate-legal-matriz.component';
import { FonteRecursosComponent } from './components/fonte-recursos/fonte-recursos.component';




@Component({
  selector: 'app-sis-ct-cadastro',
  standalone: false,
  templateUrl: './sis-ct-cadastro.component.html',
  styleUrl: './sis-ct-cadastro.component.scss',
  animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()],
})
export class SisCtCadastroComponent {
  perguntaSelecionadaId: string = 'PERGUNTA_2';

  @ViewChild('stepper') stepper!: MatStepper;

 readonly paginasSection1: SubSection[] = [
    {
      id: CadastroStep1Id.AreaDeAtuacao,
      header: '1. Áreas de Atuação',
      component: AreaDeAtuacaoComponent,
      showSavingIcon: false,
    },
    {
      id: CadastroStep1Id.InfoGerais,
      header: '2. Informações Gerais',
      component: InfoGeraisComponent,
      showSavingIcon: false,
    },
    {
      id: CadastroStep1Id.RepresentanteLegal,
      header: '3. Representante Legal',
      component: RepresentateLegalMatrizComponent,
      showSavingIcon: false,
    },
    {
      id: CadastroStep1Id.ResponsavelTecnico,
      header: '4. Responsável Técnico',
      component: ResponsavelTecnicoComponent,
      showSavingIcon: false,
    },
      {
      id: CadastroStep1Id.FonteRecursos,
      header: '5. Fonte de Recursos',
      component: FonteRecursosComponent,
      showSavingIcon: false,
    },
  ];

  readonly paginaSection2: SubSection[] = [
    {
      id: CadastroStep2Id.ComunidadeTerap,
      header: '6. Comunidade Terapêutica',
      component: ResponsavelTecnicoComponent,
      showSavingIcon: false,
    },
    {
      id: CadastroStep2Id.EntidadesCuidado,
      header: '7. Entidades de Cuidado',
      component: ResponsavelTecnicoComponent,
      showSavingIcon: false,
    },
  ];

  private readonly centralRxjs = inject(CentralRxJsService);
  constructor() {
    this.centralRxjs.dataToReceive.subscribe(({ key, data }) => {
      if (key === config.senderKeys.matrizChange) {
        const section =
          this.paginasSection1.find(p => p.id === data.subsection) ??
          this.paginaSection2.find(p => p.id === data.subsection);

        if (section) section.showSavingIcon = !section.showSavingIcon;
      }
    });
  }

  onRespostaSelecionada(event: {
    perguntaId: string;
    respostaId: number;
    selecionado: boolean;
  }) {
    console.log('Resposta selecionada:', event);
    // Atualize seu estado aqui conforme necessário
  }
}
