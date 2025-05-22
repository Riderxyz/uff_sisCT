import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentModule } from './components/components.module';
import { TesteMultiplaEscolhaComponent } from './teste-multipla-escolha/teste-multipla-escolha.component';

// Removed direct import of PerguntaComponent as it is now handled by ComponentModule

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import { provideEnvironmentNgxMask,  NgxMaskDirective, NgxMaskPipe} from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TesteMultiplaEscolhaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ComponentModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDialogModule,
    HttpClientModule,
    NgxMaskDirective, NgxMaskPipe
  ],
  providers: [
    provideEnvironmentNgxMask(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
