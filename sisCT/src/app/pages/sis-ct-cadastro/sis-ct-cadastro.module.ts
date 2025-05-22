import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTabsModule } from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioButton } from '@angular/material/radio';
import { ComponentModule } from '../../components/components.module';

import { SisCtCadastroComponent } from './sis-ct-cadastro.component';
import { AreaDeAtuacaoComponent } from './components/area-de-atuacao/area-de-atuacao.component';
import { InfoGeraisComponent } from './components/info-gerais/info-gerais.component';
import { SisCtCadastroRoutingModule } from './sis-ct-cadastro-routing.module';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';


const MaterialModules = [
  MatTabsModule,
  MatExpansionModule,
  MatStepperModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule,
  MatRadioButton,
];

@NgModule({
  declarations: [
    SisCtCadastroComponent,
    AreaDeAtuacaoComponent,
    InfoGeraisComponent,
  ],
  imports: [
    CommonModule,
    ...MaterialModules,
      NgxMaskDirective, NgxMaskPipe,
    FormsModule,
    ComponentModule,
    SisCtCadastroRoutingModule,
  ],
  providers:[
  ]
})
export class SisCtCadastroModule {}
