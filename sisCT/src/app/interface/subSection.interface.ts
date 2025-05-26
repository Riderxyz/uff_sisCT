import { Type } from '@angular/core';

export interface SubSection {
  id: CadastroStep1Id | CadastroStep2Id;
  header: string;
  component: Type<any>;
  showSavingIcon: boolean;
}
export enum CadastroStep1Id {
  AreaDeAtuacao = 'areas-de-atuacao',
  InfoGerais = 'informacoes-gerais',
  RepresentanteLegal = 'representante-legal',
  ResponsavelTecnico = 'responsavel-tecnico',
  FonteRecursos = 'fonte-recursos',
}

export enum CadastroStep2Id {
  ComunidadeTerap = 'comunidade-terapeutica',
  EntidadesCuidado = 'entidades-de-cuidado',
}
