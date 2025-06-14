import { Component, inject, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
} from 'angular-animations';
import { CentralRxJsService } from '../../services/centralRXJS.service';
import { config } from '../../services/config';
import {
  SubSection,
  CadastroStep1Id,
  CadastroStep2Id,
} from '../../interface/subSection.interface';
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
export class SisCtCadastroComponent {
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
      component: ComunidadeTerapeuticaComponent,
      showSavingIcon: false,
    },
    {
      id: CadastroStep2Id.EntidadesCuidado,
      header: '7. Entidades de Cuidado',
      component: EntidadeDeCuidadoComponent,
      showSavingIcon: false,
    },
  ];

  private readonly centralRxjs = inject(CentralRxJsService);
  constructor() {
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
}
