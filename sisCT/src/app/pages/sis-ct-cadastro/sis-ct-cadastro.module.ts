import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { SisCtCadastroRoutingModule } from './sis-ct-cadastro-routing.module';
import { SisCtCadastroComponent } from './sis-ct-cadastro.component';
import { ComponentModule } from '../../components/components.module';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

const MaterialModules = [
  MatTabsModule,
  MatExpansionModule,
  MatStepperModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule,
];

@NgModule({
  declarations: [SisCtCadastroComponent],
  imports: [
    CommonModule,
    ...MaterialModules,
    FormsModule,
    ComponentModule,
    SisCtCadastroRoutingModule,
  ],
})
export class SisCtCadastroModule {}
