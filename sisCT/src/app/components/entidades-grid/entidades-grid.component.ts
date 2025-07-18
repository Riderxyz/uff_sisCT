import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { CadastroNacionalService } from '../../services/cadastro-nacional.service';
import { UsuarioService } from '../../services/usuario.service';
import { CadastroNacional } from '../../interfaces_crud/cadastro-nacional.interface';
import { CentralRxJsService } from '../../services/centralRXJS.service';
import { config } from '../../services/config';

@Component({
  selector: 'app-entidades-grid',
  templateUrl: './entidades-grid.component.html',
  styleUrls: ['./entidades-grid.component.scss']
})
export class EntidadesGridComponent implements OnInit {
  // AG Grid
  columnDefs: ColDef[] = [
    { field: 'nuCnpj', headerName: 'CNPJ', flex: 1, editable: false },
    { field: 'noRazaoSocial', headerName: 'Razão Social', flex: 2, editable: false }
  ];
  
  // Grid default options
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    editable: false
  };
  
  rowData: CadastroNacional[] = [];
  
  // Grid API
  gridApi: any;
  gridColumnApi: any;
  
  constructor(
    private cadastroNacionalService: CadastroNacionalService,
    private usuarioService: UsuarioService,
    private centralRxjs: CentralRxJsService
  ) {}
  
  ngOnInit(): void {
    this.loadEntidades();
  }
  
  loadEntidades(): void {
    const currentUser = this.usuarioService.getCurrentUsuario();
    if (currentUser && currentUser.id) {
      this.cadastroNacionalService.getEntidadesByUser(currentUser.id)
        .subscribe({
          next: (entidades) => {
            this.rowData = entidades;
          },
          error: (error) => {
            console.error('Erro ao carregar entidades:', error);
          }
        });
    }
  }
  
  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    
    // Auto-size columns after data is loaded
    if (this.gridApi) {
      this.gridApi.sizeColumnsToFit();
    }
    
    // Set row selection mode
    this.gridApi.setRowSelection('single');
  }
  
  onRowDoubleClicked(event: any): void {
    const entidade = event.data;
    if (entidade && entidade.id) {
      this.cadastroNacionalService.loadEntidade(entidade.id, entidade.nuCnpj)
        .then(success => {
          if (success) {
            // Close the drawer
            this.centralRxjs.sendData(config.senderKeys.closeMenu);
            
            // Navigate to cadastro page or perform other actions if needed
            console.log('Entidade carregada com sucesso');
          }
        });
    }
  }
}