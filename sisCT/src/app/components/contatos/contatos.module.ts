import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask } from 'ngx-mask';

import { AgGridModule } from 'ag-grid-angular';

import { ContatosComponent } from './contatos.component';
import { ContatoDialogComponent } from './contato-dialog.component';

@NgModule({
  declarations: [
    ContatosComponent,
    ContatoDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    NgxMaskDirective,
    NgxMaskPipe,
    AgGridModule
  ],
  providers: [
    provideEnvironmentNgxMask()
  ],
  exports: [
    ContatosComponent
  ]
})
export class ContatosModule { }