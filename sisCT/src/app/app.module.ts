import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentModule } from './components/components.module';
import { PerguntaComponent } from './components/multipla_escolha/pergunta.component';
import { TesteMultiplaEscolhaComponent } from './teste-multipla-escolha/teste-multipla-escolha.component';

// Removed direct import of PerguntaComponent as it is now handled by ComponentModule

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    TesteMultiplaEscolhaComponent, PerguntaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ComponentModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
