import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarterRoutingModule } from './starter-routing.module';
import { StarterComponent } from './starter.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { provideEnvironmentNgxMask,  NgxMaskDirective, NgxMaskPipe} from 'ngx-mask';


const MaterialModules = [
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatIconModule,
  NgxMaskDirective, NgxMaskPipe
]
@NgModule({
  declarations: [
    StarterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ...MaterialModules,
    StarterRoutingModule,
  ]
})
export class StarterModule { }
