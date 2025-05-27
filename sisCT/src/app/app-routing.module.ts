import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'auth/callback',
    loadChildren: () =>
      import('./pages/auth/auth-callback/auth-callback.module').then((m) => m.AuthCallbackModule),
  },
  {
    path: 'starter',
    loadChildren: () =>
      import('./pages/starter/starter.module').then((m) => m.StarterModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sisCtCadastro',
    loadChildren: () =>
      import('./pages/sis-ct-cadastro/sis-ct-cadastro.module').then(
        (m) => m.SisCtCadastroModule
      ),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
