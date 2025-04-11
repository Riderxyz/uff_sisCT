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
      questions: [
        {
          type: 'radioBox',
          title: '',
          answers: [
            {
              label:
                'Cuidado, de prevenção, de apoio, de mútua ajuda, de atendimento psicossocial e de ressocialização de dependentes do álcool e de outras drogas e seus familiares',
              value: false,
            },
            {
              label: 'Comunidade Terapêutica',
              value: false,
            },
          ],
        },
      ],
    },
    {
      title: '2. Informações Gerais ',
      subtitle: 'comum às duas áreas de atuação',
      questions: [
        {
          type: 'input',
          title: '2.2 Quanto ao Registro',
          answers: [
            {
              label: 'CNPJ',
              value: '',
            },
            {
              label: 'Quantidade de filiais',
              value: 0,
            },
            {
              label: 'Nome fantasia',
              value: 0,
            },
            {
              label: 'Razão Social',
              value: 0,
            },
            {
              label:
                'Informe o código e descrição das atividades econômicas principal (CNAE) da entidade',
              value: 0,
            },
            {
              label:
                'Informe o código e descrição das atividades econômicas secundárias (CNAE) da entidade',
              value: 0,
            },
          ],
        },
        {
          type: 'input',
          title: '2.3 Quanto à localização',
          answers: [
            {
              label: 'Endereço',
              value: '',
            },
            {
              label: 'Estado',
              value: 0,
            },
            {
              label: 'Municipio',
              value: 0,
            },
            {
              label: 'Telefones (com código de área)',
              mask: '(00) 0000-0000',
              value: 0,
            },
            {
              label: 'E-mail institucional',
              value: 0,
            },
          ],
        },
      ],
    },
    {
      title: '3. Quanto ao Representante legal Preenchimento obrigatório',
      subtitle: 'Preenchimento obrigatório',

      questions: [
        {
          type: 'input',
          answers: [
            {
              label: 'Nome do representante legal',
              value: '',
            },
            {
              label: 'Mandato da mesa diretora:  Término ',
              value: '',
            },
          ],
        },

        {
          type: 'radioBox',
          title: 'Qual o seu papel na composição da mesa diretora da entidade?',
          answers: [
            {
              label: 'Presidente',
              value: false,
            },
            {
              label: 'Vice-Presidente',
              value: false,
            },
            {
              label: 'Conselheiro',
              value: false,
            },
            {
              label: 'Outros',
              value: false,
            },
            {
              label: 'Especificar',
              needText: true,
              value: false,
            },
          ],
        },

        {
          type: 'input',
          title: '',
          answers: [
            {
              label: 'Data de Nascimento',
              value: '',
              mask: '00/00/0000',
            },
            {
              label: 'CPF',
              mask: '000.000.000-00',
              value: '',
            },
            {
              label: 'Telefone',
              mask: '(00) 0000-0000',
              value: 0,
            },
            {
              label: 'Curso/Profissão',
              value: '',
            },
          ],
        },
        {
          type: 'radioBox',
          title: 'Escolaridade',
          answers: [
            {
              label: 'Nível Fundamental',
              value: false,
            },
            {
              label: 'Nível Médio',
              value: false,
            },
            {
              label: 'Graduação',
              value: false,
            },
            {
              label: 'Pós-Graduação',
              value: false,
            },
            {
              label: 'Mestrado',
              value: false,
            },
            {
              label: 'Doutorado',
              value: false,
            },
          ],
        },
      ],
    },
    {
      title: '4. Quanto ao Representante Técnico ',
      subtitle:
        'Preenchimento obrigatório apenas para as CT. Associar essa informação com a área de atuação da entidade. * Não habitar o campo quando a entidade for de “cuidado, de prevenção, de apoio, de mútua ajuda, de atendimento psicossocial e de ressocialização de dependentes do álcool e de outras drogas e seus familiares”',
      questions: [
        {
          type: 'input',
          answers: [
            {
              label: 'Nome do responsável técnico',
              value: '',
            },
            {
              label: 'Data de Nascimento',
              mask: '00/00/0000',
              value: '',
            },
            {
              label: 'CPF',
              mask: '000.000.000-00',
              value: '',
            },
            {
              label: 'Telefone',
              mask: '(00) 0000-0000',
              value: '',
            },
            {
              label: 'E-mail',
              value: '',
            },
            {
              label: 'Curso/Profissão',
              value: '',
            },
          ],
        },

        {
          type: 'radioBox',
          title: 'Escolaridade',
          answers: [
            {
              label: 'Ensino Superior',
              value: false,
            },
            {
              label: 'Pós-Graduação',
              value: false,
            },
            {
              label: 'Mestrado',
              value: false,
            },
            {
              label: 'Doutorado',
              value: false,
            },
          ],
        },

        {
          type: 'radioBox',
          title:
            'O Responsável Técnico possui experiência comprovada na gestão de comunidades terapêuticas  e instituições afins,desempenhando funções como conselheiro, monitor ou equivalente na área de dependência química e participação em cursos de capacitação sobre o tema?',
          answers: [
            {
              label: 'Sim',
              value: false,
            },
            {
              label: 'Não',
              value: false,
            },
          ],
        },
        {
          type: 'input',
          title: 'Dados do Responsável Técnico substituto',
          answers: [
            {
              label: 'Nome Completo',
              value: '',
            },
            {
              label: 'CPF do substituto',
              mask: '000.000.000-00',
              value: '',
            },
            {
              label: 'Telefone',
              mask: '(00) 0000-0000',
              value: '',
            },
            {
              label: 'E-mail',
              value: '',
            },
            {
              label: 'Escolaridade',
              value: '',
            },
          ],
        },
      ],
    },
    {
      title: '5. Fontes de Recursos',
      subtitle: 'comum às duas áreas de atuação – preenchimento obrigatório',
      questions: [
        {
          type: 'input',
          title: 'Dados do Responsável Técnico substituto',
          answers: [
            {
              label: 'Informe a Receita bruta da entidade: R$',
              value: 0,
            },
          ],
        },
        {
          type: 'input',
          title: '5.1 Quanto à Recursos Públicos ',
          answers: [
            {
              label: 'Informe a Receita bruta da entidade: R$',
              value: 0,
            },
          ],
        },
      ],
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
