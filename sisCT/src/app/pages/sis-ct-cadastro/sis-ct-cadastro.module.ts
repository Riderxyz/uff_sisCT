import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SisCtCadastroRoutingModule } from './sis-ct-cadastro-routing.module';
import { SisCtCadastroComponent } from './sis-ct-cadastro.component';


@NgModule({
  declarations: [
    SisCtCadastroComponent
  ],
  imports: [
    CommonModule,
    SisCtCadastroRoutingModule
  ]
})
export class SisCtCadastroModule { }
