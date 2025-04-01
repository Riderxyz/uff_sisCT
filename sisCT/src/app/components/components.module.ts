import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast/toast.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';

const materialModules = [
  MatCheckboxModule,
  MatRadioModule,
  MatRippleModule,
  MatFormFieldModule]
@NgModule({
  declarations: [
    ToastComponent
  ],
  imports: [ CommonModule ],
  exports: [ToastComponent],
  providers: [],
})
export class ComponentModule {}
