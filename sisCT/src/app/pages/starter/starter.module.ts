import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarterRoutingModule } from './starter-routing.module';
import { StarterComponent } from './starter.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    StarterComponent
  ],
  imports: [
    CommonModule,



    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,


    StarterRoutingModule
  ]
})
export class StarterModule { }
