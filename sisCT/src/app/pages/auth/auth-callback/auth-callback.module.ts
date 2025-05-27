import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthCallbackComponent } from './auth-callback.component';

@NgModule({
  declarations: [
    AuthCallbackComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    RouterModule.forChild([
      { path: '', component: AuthCallbackComponent }
    ])
  ]
})
export class AuthCallbackModule { }