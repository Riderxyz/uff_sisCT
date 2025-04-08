import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'sisCtCadastro' },
  {
    path: 'starter',
    loadChildren: () =>
      import('./pages/starter/starter.module').then((m) => m.StarterModule),
  },
  {
    path: 'sisCtCadastro',
    loadChildren: () =>
      import('./pages/sis-ct-cadastro/sis-ct-cadastro.module').then(
        (m) => m.SisCtCadastroModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
