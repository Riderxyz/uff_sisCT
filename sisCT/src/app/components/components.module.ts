import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  NgxMaskDirective,
  NgxMaskPipe,
  provideEnvironmentNgxMask,
} from 'ngx-mask';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { MatInputModule } from '@angular/material/input';
import { AgGridModule } from 'ag-grid-angular';
import { ConfirmDialogComponent } from './dialogs/ConfirmDialog/ConfirmDialog.component';
import { CnpjDialogComponent } from './dialogs/cnpj-dialog/cnpj-dialog.component';
import { LoaderComponent } from './dialogs/loader/loader.component';
import { TermosDeUsoDialogComponent } from './dialogs/termos-de-uso-dialog/termos-de-uso-dialog.component';
import { ContatosModule } from './contatos/contatos.module';
import { AdicionarProfissionalDialogComponent } from './dialogs/adicionar-profissional-dialog/adicionar-profissional-dialog.component';
import { AdicionarVagaDialogComponent } from './dialogs/adicionar-vaga-dialog/adicionar-vaga-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToastComponent } from './toast/toast.component';
import { MapaDeVagasComponent } from './mapa-de-vagas/mapa-de-vagas.component';

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
  MatAutocompleteModule,
  MatChipsModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatCheckboxModule, AgGridModule,
];

const dialogsComponents = [
  LoaderComponent,
  ConfirmDialogComponent,
  ToastComponent,
  CnpjDialogComponent,
  TermosDeUsoDialogComponent,
  AdicionarProfissionalDialogComponent,
  AdicionarVagaDialogComponent
];

const ngxMasks = [NgxMaskDirective, NgxMaskPipe];
@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    MapaDeVagasComponent,
    FooterComponent,
    ...dialogsComponents,
  ],
  imports: [CommonModule, FormsModule, RouterModule, ...materialModules, ...ngxMasks, ContatosModule],
  exports: [
    ToastComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ContatosModule,
  ],
  providers: [provideEnvironmentNgxMask()],
})
export class ComponentModule { }
