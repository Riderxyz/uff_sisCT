import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  provideEnvironmentNgxMask,
  NgxMaskDirective,
  NgxMaskPipe,
} from 'ngx-mask';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './dialogs/loader/loader.component';
import { ToastComponent } from './toast/toast.component';
import { ConfirmDialogComponent } from './dialogs/ConfirmDialog/ConfirmDialog.component';
import { CnpjDialogComponent } from './dialogs/cnpj-dialog/cnpj-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { TermosDeUsoDialogComponent } from './dialogs/termos-de-uso-dialog/termos-de-uso-dialog.component';

const materialModules = [
  MatCheckboxModule,
  MatRadioModule,
  MatRippleModule,
  MatFormFieldModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
];

const dialogsComponents = [
  LoaderComponent,
  ConfirmDialogComponent,
  ToastComponent,
  CnpjDialogComponent,
  TermosDeUsoDialogComponent,
];

const ngxMasks = [NgxMaskDirective, NgxMaskPipe];
@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ...dialogsComponents,
  ],
  imports: [CommonModule, FormsModule, ...materialModules, ...ngxMasks],
  exports: [
    ToastComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
  ],
  providers: [],
})
export class ComponentModule {}
