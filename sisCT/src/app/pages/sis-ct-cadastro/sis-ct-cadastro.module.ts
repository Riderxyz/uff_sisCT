import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatTabsModule} from '@angular/material/tabs';

import { SisCtCadastroRoutingModule } from './sis-ct-cadastro-routing.module';
import { SisCtCadastroComponent } from './sis-ct-cadastro.component';
import { ComponentModule } from '../../components/components.module';


@NgModule({
  declarations: [
    SisCtCadastroComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    ComponentModule,
    SisCtCadastroRoutingModule
  ]
})
export class SisCtCadastroModule { }
