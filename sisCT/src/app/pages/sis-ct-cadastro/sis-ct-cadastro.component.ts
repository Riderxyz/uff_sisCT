import { Component } from '@angular/core';
import { Pergunta } from '../../components/multipla_escolha/pergunta.model';

@Component({
  selector: 'app-sis-ct-cadastro',
  standalone: false,
  templateUrl: './sis-ct-cadastro.component.html',
  styleUrl: './sis-ct-cadastro.component.scss'
})
export class SisCtCadastroComponent {
perguntaSelecionadaId: string = 'PERGUNTA_2';

  // No seu componente pai
  listaDePerguntas: Pergunta[] = [
    {
      nome: 'Quais linguagens você conhece?',
      id: 'PERGUNTA_1',
      direcao: 'V',
      respostas: [
        { descricao: 'JavaScrwewqrewrewipt', id: 1, selecionado: false },
        { descricao: 'TypeScriptX', id: 2, selecionado: false },
        { descricao: 'Python', id: 3, selecionado: false },
        { descricao: 'Java', id: 4, selecionado: false },
      ],
    },
    {
      nome: 'Quais frameworks front-end você usa?',
      id: 'PERGUNTA_2',
      direcao: 'V',
      respostas: [
        { descricao: 'Angular', id: 1, selecionado: false },
        { descricao: 'React', id: 2, selecionado: false },
        { descricao: 'Vue', id: 3, selecionado: false },
      ],
    },
  ];

  constructor() {
    // Inicialização do componente, se necessário
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
