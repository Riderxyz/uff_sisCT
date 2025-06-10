import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AgGridModule } from 'ag-grid-angular';

import { ContatosComponent } from './contatos.component';

@NgModule({
  declarations: [
    ContatosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    AgGridModule
  ],
  exports: [
    ContatosComponent
  ]
})
export class ContatosModule { }