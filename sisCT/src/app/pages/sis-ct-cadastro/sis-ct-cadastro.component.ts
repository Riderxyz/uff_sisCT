import { Component } from '@angular/core';
import { Pergunta } from '../../components/multipla_escolha/pergunta.model';

@Component({
  selector: 'app-sis-ct-cadastro',
  standalone: false,
  templateUrl: './sis-ct-cadastro.component.html',
  styleUrl: './sis-ct-cadastro.component.scss',
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

  subsectionArrForSection1 = [
    {
      title: '1. Áreas de Atuação',
      subtitle: 'Preenchimento obrigatório',
    },
    {
      title: '2. Informações Gerais ',
      subtitle: 'comum às duas áreas de atuação',
    },
    {
      title: '3. Quanto ao Representante legal Preenchimento obrigatório',
      subtitle: 'Preenchimento obrigatório',
    },
    {
      title: '4. Quanto ao Representante Técnico ',
      subtitle:
        'Preenchimento obrigatório apenas para as CT. Associar essa informação com a área de atuação da entidade. * Não habitar o campo quando a entidade for de “cuidado, de prevenção, de apoio, de mútua ajuda, de atendimento psicossocial e de ressocialização de dependentes do álcool e de outras drogas e seus familiares”',
    },
    {
      title: '5. Fontes de Recursos',
      subtitle: 'comum às duas áreas de atuação – preenchimento obrigatório',
    },
  ];

  subsectionArrForSection2 = [
    {
      title: '6. Comunidade Terapêutica',
      subtitle:
        'O campo estará disponível apenas se a entidade marcar “área de atuação” uma CT.  Preenchimento obrigatório',
    },
    {
      title:
        '7. Entidades de cuidado, de prevenção, de apoio, de mútua ajuda, de atendimento psicossocial e de ressocialização de dependentes do álcool e de outras drogas e seus familiares',
      subtitle:
        'O campo estará disponível apenas se a entidade marcar “área de atuação” uma CT.  Preenchimento obrigatório',
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
