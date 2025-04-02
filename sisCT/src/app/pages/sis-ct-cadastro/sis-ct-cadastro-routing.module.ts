import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SisCtCadastroComponent } from './sis-ct-cadastro.component';

const routes: Routes = [{ path: '', component: SisCtCadastroComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SisCtCadastroRoutingModule { }
