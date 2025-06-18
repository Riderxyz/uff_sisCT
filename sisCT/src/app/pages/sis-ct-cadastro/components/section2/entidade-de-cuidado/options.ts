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
  formaAcessoEmCasoDeEmcaminhamento: [
     {
      value: 'articulacaoPoliticas',
      label:
        'Como se dá a articulação com outras políticas públicas e rede de apoio',
    },
    {
      value: 'parceriasFormais',
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
  ]
};
