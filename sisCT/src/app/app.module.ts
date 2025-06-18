import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentModule } from './components/components.module';
import { TesteMultiplaEscolhaComponent } from './teste-multipla-escolha/teste-multipla-escolha.component';
import { AgGridModule } from 'ag-grid-angular';
import { ModuleRegistry, AllCommunityModule,  provideGlobalGridOptions,
  themeMaterial, } from 'ag-grid-community';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { provideEnvironmentNgxMask } from 'ngx-mask';
// Registrar os módulos do AG Grid
ModuleRegistry.registerModules([AllCommunityModule]);
provideGlobalGridOptions({ theme: themeMaterial });
@NgModule({
  declarations: [
    AppComponent,
    TesteMultiplaEscolhaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSidenavModule,
    ComponentModule,
    AgGridModule
  ],
  providers: [
        provideNativeDateAdapter(),
    {provide: MAT_DATE_LOCALE, useValue: 'pt-br'},
    provideEnvironmentNgxMask(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
