import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTabsModule } from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {  MatRadioModule } from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatListModule} from '@angular/material/list';
import { ComponentModule } from '../../components/components.module';

import { SisCtCadastroComponent } from './sis-ct-cadastro.component';
import { AreaDeAtuacaoComponent } from './components/area-de-atuacao/area-de-atuacao.component';
import { InfoGeraisComponent } from './components/info-gerais/info-gerais.component';
import { SisCtCadastroRoutingModule } from './sis-ct-cadastro-routing.module';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { RepresentateLegalMatrizComponent } from './components/representate-legal-matriz/representate-legal-matriz.component';
import { ResponsavelTecnicoComponent } from './components/responsavel-tecnico/responsavel-tecnico.component';
import { FonteRecursosComponent } from './components/fonte-recursos/fonte-recursos.component';


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
];

@NgModule({
  declarations: [
    SisCtCadastroComponent,
    AreaDeAtuacaoComponent,
    InfoGeraisComponent,
    RepresentateLegalMatrizComponent,
    ResponsavelTecnicoComponent,
    FonteRecursosComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...MaterialModules,
      NgxMaskDirective, NgxMaskPipe,
    ComponentModule,
    SisCtCadastroRoutingModule,
  ],
  providers:[
  ]
})
export class SisCtCadastroModule {}
