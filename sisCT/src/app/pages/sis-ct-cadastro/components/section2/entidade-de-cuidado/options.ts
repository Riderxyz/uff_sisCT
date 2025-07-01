import { ProfissionalInterface } from './../../../../../interface/entidadeDeCuidado.interface';
import { ColDef } from 'ag-grid-community';
import { RedesDeApoioChave } from '../../../../../interface/entidadeDeCuidado.interface';

export const entidadeCuidadoFormOptions = {
  capacidadeAtendimento: [
    {
      value: 'grupos10',
      label: 'Grupos de 10 pessoas',
    },
    {
      value: 'grupos20',
      label: 'Grupos de 20 pessoas',
    },
    {
      value: 'grupos30',
      label: 'Grupos de 30 pessoas',
    },
    {
      value: 'grupos40',
      label: 'Grupos de 40 pessoas',
    },
    {
      value: 'gruposAcima41',
      label: 'Grupos acima de 41 pessoas',
    },
  ],

  formaAcesso: [
    {
      value: 'espontaneamente',
      label: 'Espontaneamente',
    },
    {
      value: 'encaminhamentoPoliticas',
      label:
        'Encaminhados por outras políticas (saúde, assistência social, educação, outros)',
    },
  ],
  formaAcesso_outrasPoliticasPublicas_RedesdeApoio: [
    {
      value: 'parceriasNormais',
      label: 'Parcerias formais',
    },
    {
      value: 'encaminhamentosInformais',
      label:
        'Encaminhamentos informais (Exemplo: rede de contatos, troca de informações entre profissionais)',
    },
    {
      value: 'participacaoComites',
      label:
        'Participação em comitês ou fóruns intersetoriais (Exemplo: Comitê Intersetorial de Políticas sobre Drogas, Fórum de Assistência Social e de Saúde)',
    },
    {
      value: 'atendimentoDeterminacaoJudicial',
      label:
        'Atendimento de usuários a partir de determinação judicial ou Ministério Público (Exemplo: medidas socioeducativas, alternativas penais.)',
    },
    ,
    {
      value: 'projetosFinanciadosSetorPublico',
      label:
        'Projetos ou programas específicos financiados pelo setor público (Exemplo: Programas municipais ou federais de atenção à dependência química, acolhimento institucional)',
    },
    ,
    {
      value: 'encaminhamentosOrganizacoesSociedadeCivil',
      label:
        'Encaminhamentos por organizações da sociedade civil (Exemplo: outras entidades, igrejas)',
    },
    {
      value: 'outros',
      label: 'Outro Especificar',
    },
  ] as {
    value: RedesDeApoioChave;
    label: string;
  }[],
  profissionaisColDefs: [
    {
      field: 'nome',
      headerName: 'nome',
      sortable: true,
      filter: true,
      width: 200,
    },
    {
      field: 'cpf',
      headerName: 'cpf',
      sortable: true,
      filter: true,
      width: 60,
    },
    {
      field: 'dataNascimento',
      headerName: 'Data de Nascimento',
      sortable: true,
      filter: true,
      width: 100,
    },

    {
      field: 'telefone',
      headerName: 'telefone',
      sortable: true,
      filter: true,
      width: 60,
    },
    {
      field: 'email',
      headerName: 'email',
      sortable: true,
      filter: true,
      width: 100,
    },
    {
      field: 'cargo',
      headerName: 'Função/Cargo',
      sortable: true,
      filter: true,
      width: 100,
    },
    {
      field: 'formacaoAcademica',
      headerName: 'Formação Acadêmica',
      sortable: true,
      filter: true,
      width: 100,
    },
    {
      field: 'cargaHoraria',
      headerName: 'Carga Horária',
      sortable: true,
      filter: true,
      width: 100,
    },
    {
      field: 'vinculo',
      headerName: 'Vínculo',
      sortable: true,
      filter: true,
      width: 100,
    },
  ] as ColDef<ProfissionalInterface, any>[],
};

/*
parceriasNormais
encaminhamentosInformais
participacaoComites
atendimentoDeterminacaoJudicial
projetosFinanciadosSetorPublico
encaminhamentosOrganizacoesSociedadeCivil
 */
