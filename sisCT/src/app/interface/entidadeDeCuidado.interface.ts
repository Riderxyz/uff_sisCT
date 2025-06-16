export interface EntidadeDeCuidadoInterface {
  acolhimentoProvisorio: boolean;
  comunidadeTerapeutica: boolean;
  caracterizacaoPublicoAlvo:{
    publicoAlvoDaEntidade: {
      adultosMasculino: number;
      adultosFeminino: number;
      criancasEAdolescentes: number;
      idoso: number;
    },
    capacidadeDeAtendimento: string;
    formaDeAcessoPublicoAlvo: {
      
    }
  }

}
