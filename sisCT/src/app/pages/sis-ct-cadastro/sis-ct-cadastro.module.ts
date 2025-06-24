import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { ComponentModule } from '../../components/components.module';
import { ContatosModule } from '../../components/contatos/contatos.module';

import { SisCtCadastroComponent } from './sis-ct-cadastro.component';


import { AreaDeAtuacaoComponent } from './components/section1/area-de-atuacao/area-de-atuacao.component';
import { FonteRecursosComponent } from './components/section1/fonte-recursos/fonte-recursos.component';
import { InfoGeraisComponent } from './components/section1/info-gerais/info-gerais.component';
import { RepresentateLegalMatrizComponent } from './components/section1/representate-legal-matriz/representate-legal-matriz.component';
import { ResponsavelTecnicoComponent } from './components/section1/responsavel-tecnico/responsavel-tecnico.component';
import { ComunidadeTerapeuticaComponent } from './components/section2/comunidade-terapeutica/comunidade-terapeutica.component';
import { EntidadeDeCuidadoComponent } from './components/section2/entidade-de-cuidado/entidade-de-cuidado.component';



import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { SisCtCadastroRoutingModule } from './sis-ct-cadastro-routing.module';

const MaterialModules = [
  MatTabsModule,
  MatExpansionModule,
  MatStepperModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatRadioModule,
  MatListModule,
  MatAutocompleteModule,
  MatChipsModule,
  MatIconModule,
];

@NgModule({
  declarations: [
    SisCtCadastroComponent,
    AreaDeAtuacaoComponent,
    InfoGeraisComponent,
    RepresentateLegalMatrizComponent,
    ResponsavelTecnicoComponent,
    FonteRecursosComponent,
    ComunidadeTerapeuticaComponent,
    EntidadeDeCuidadoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...MaterialModules,
    NgxMaskDirective, NgxMaskPipe,
    ComponentModule,
    ContatosModule,
    SisCtCadastroRoutingModule,
  ],
  providers: [
  ]
})
export class SisCtCadastroModule { }