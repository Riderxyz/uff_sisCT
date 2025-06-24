import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { AllCommunityModule, ModuleRegistry, provideGlobalGridOptions, themeMaterial } from 'ag-grid-community';
import { SisCtCadastroComponent } from './sis-ct-cadastro.component';
ModuleRegistry.registerModules([AllCommunityModule]);
provideGlobalGridOptions({ theme: themeMaterial });
const routes: Routes = [{ path: '', component: SisCtCadastroComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), AgGridModule],
  exports: [RouterModule]
})
export class SisCtCadastroRoutingModule { }
