import { Component, inject, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
} from 'angular-animations';
import { CentralRxJsService } from '../../services/centralRXJS.service';
import { config } from '../../services/config';

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

  paginasSection1 = [
    {
      id: 'areas-de-atuacao',
      header: '1. Áreas de Atuação',
      component: 'app-area-de-atuacao',
      showSavingIcon: false,
    },
    {
      id: 'informacoes-gerais',
      header: '2. Informações Gerais',
      component: 'app-info-gerais',
      showSavingIcon: false,
    },
    {
      id: 'representante-legal',
      header: '3. Quanto ao Representante legal da matriz',
      component: 'app-representante-legal',
      showSavingIcon: false,
    },
       {
      id: 'reponsavel-tecnico',
      header: '4. Quanto ao Responsável Técnico da matriz',
      component: 'app-responsavel-tecnico',
      showSavingIcon: false,
    },
  ];
  paginaSection2 = [
    {
      id: 'comunidade-terapeutica',
      header: '6. Comunidade Terapeutica',
      component: 'app-comunidade-terapeutica',
      showSavingIcon: false,
    },
    {
      id: 'entidades-de-cuidado',
      header: '7. Entidades de cuidado',
      component: 'app-entidades-de-cuidado',
      showSavingIcon: false,
    },
  ];
  private readonly centralRxjs = inject(CentralRxJsService);
  constructor() {
    this.centralRxjs.dataToReceive.subscribe((data) => {
      if (data.key === config.senderKeys.matrizChange) {
        switch (data.data.subsection) {
          case 'areas-de-atuacao':
            this.paginasSection1[0].showSavingIcon =
              !this.paginasSection1[0].showSavingIcon;
            break;
          case 'informacoes-gerais':
            this.paginasSection1[1].showSavingIcon =
              !this.paginasSection1[1].showSavingIcon;
            break;

          case 'representante-legal':
            this.paginasSection1[2].showSavingIcon =
              !this.paginasSection1[2].showSavingIcon;
            break;
        }
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
