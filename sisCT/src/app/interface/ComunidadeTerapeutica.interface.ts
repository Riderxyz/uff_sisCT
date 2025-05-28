export interface ComunidadeTerapeuticaInterface {
  comunidadeTerapeutica: ComunidadeTerapeuticaInt;
  capacidadeAtendimento: CapacidadeAtendimento;
  reconhecimentoMunicipio: ReconhecimentoMunicipio;
}

export interface ComunidadeTerapeuticaInt {
  possuiLicencaSanitaria: boolean;
  validadeLicenca: string;
  prazoProjeto: number;
  matrizPossuiCEBAS: boolean;
  periodoCEBAS?: {
    inicio: string;
    termino: string;
  };
  requerimentoDEPAD: boolean;
  anoProtocolo?: number;
  numeroProtocolo?: string;
  atendeLegislacao: boolean;
}

export interface CapacidadeAtendimento {
  totalVagas: number;
  publico: {
    adultoFeminino: number;
    maesNutrizes: number;
    adultoMasculino: number;
  };
}

export interface ReconhecimentoMunicipio {
  conselhoMunicipal: string;
  outroConselhoMunicipal?: string;
  conselhoEstadual?: string;
  reconhecimentoPublico: 'Uniao' | 'Estados' | 'DF e municipios' | null;
}
