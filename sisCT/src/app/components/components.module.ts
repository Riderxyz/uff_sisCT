import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast/toast.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { PerguntaComponent } from './multipla_escolha/pergunta.component';
import { FormsModule } from '@angular/forms';
const materialModules = [
  MatCheckboxModule,
  MatRadioModule,
  MatRippleModule,
  MatFormFieldModule,
  MatListModule,
];
@NgModule({
  declarations: [PerguntaComponent, ToastComponent],
  imports: [CommonModule, FormsModule, ...materialModules],
  exports: [ToastComponent, PerguntaComponent],
  providers: [],
})
export class ComponentModule {}
