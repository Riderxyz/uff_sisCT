import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';


import { ToastComponent } from './toast/toast.component';
import { PerguntaComponent } from './multipla_escolha/pergunta.component';
import { HeaderComponent } from './header/header.component';



const materialModules = [
  MatCheckboxModule,
  MatRadioModule,
  MatRippleModule,
  MatFormFieldModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
];
@NgModule({
  declarations: [PerguntaComponent, ToastComponent, HeaderComponent],
  imports: [CommonModule, FormsModule, ...materialModules],
  exports: [ToastComponent, PerguntaComponent, HeaderComponent],
  providers: [],
})
export class ComponentModule {}
