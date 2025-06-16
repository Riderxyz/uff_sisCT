import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'starter',
    loadChildren: () => import('./pages/starter/starter.module').then(m => m.StarterModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./pages/sis-ct-cadastro/sis-ct-cadastro.module').then(m => m.SisCtCadastroModule)
  },
  {
    path: 'sisCtCadastro',
    redirectTo: 'cadastro',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: '/starter',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }