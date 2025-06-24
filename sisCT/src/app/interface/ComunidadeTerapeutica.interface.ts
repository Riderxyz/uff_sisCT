import { MapaDeVagas } from "../interfaces_crud/mapa_vagas.interface";

export interface ComunidadeTerapeuticaInterface {
  comunidadeTerapeutica: ComunidadeTerapeuticaInt;
  capacidadeAtendimento: CapacidadeAtendimento;
  mapaVagas: MapaDeVagas[];
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

/* export interface MapasVagas {
  vaga: string;
  disponibilidade: boolean;
  acolhidoIdentificacao: string;
  cpf: string;
  dataNascimento: string;
  dataIngresso: string;
  dataSaida: string;
  qtdDiasAcolhimento: number;
  publico: 'adultoFeminino' | 'maesNutrizesadulto' | 'adultoMasculino'
  gratuidade: 'Acolhimentogratuito SEM contraprestaçãopecuniária do acolhido' | 'Acolhimento Gratuito COM contraprestaçãopecuniária do acolhido';
  financiamento: 'União' | 'Estados' | 'Municipios' | 'Entidade';
}
 */
