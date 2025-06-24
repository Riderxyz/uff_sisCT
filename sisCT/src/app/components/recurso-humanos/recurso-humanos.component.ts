import { OnInit } from '@angular/core';
import { ColDef,  GridApi, GridReadyEvent } from 'ag-grid-community';
import { RecursoHumano } from '../../interfaces_crud/recursos-humanos.interface';
import { RecursosHumanosService } from '../../services/recursos-humanos.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-recurso-humanos',
  templateUrl: './recurso-humanos.component.html',
  styleUrl: './recurso-humanos.component.scss'
})
export class RecursoHumanosComponent implements OnInit {
  private gridApi!: GridApi;
  rowData: RecursoHumano[] = [];
  mostrarInativos = false;
  loading = true;

  // Configuração das colunas do AG Grid
  columnDefs: ColDef[] = [
    { headerName: 'ID', field: 'pkRecursosHumanos', width: 80, filter: 'agNumberColumnFilter' },
    { headerName: 'Nome', field: 'dsNome', filter: 'agTextColumnFilter' },
    { headerName: 'CPF', field: 'nuCpf', width: 150 },
    {
      headerName: 'Nascimento',
      field: 'dtNascimento',
      valueFormatter: params => params.value ? new Date(params.value).toLocaleDateString('pt-BR') : '',
      width: 120
    },
    { headerName: 'Telefone', field: 'dsTelefone', width: 150 },
    { headerName: 'E-mail', field: 'dsEmail', width: 200 },
    { headerName: 'Cargo', field: 'dsCargo', width: 180 },
    {
      headerName: 'Formação',
      field: 'tpFormacaoAcademica',
      width: 120,
      valueFormatter: params => {
        const map: Record<string, string> = {
          'G': 'Graduação',
          'P': 'Pós-graduação',
          'M': 'Mestrado',
          'D': 'Doutorado'
        };
        return map[params.value] || params.value;
      }
    },
    { headerName: 'Carga Horária', field: 'nuCargaHoraria', width: 140 },
    {
      headerName: 'Vínculo',
      field: 'tpVinculo',
      width: 150,
      valueFormatter: params => {
        const map: Record<string, string> = {
          'V': 'Voluntário',
          'E': 'Empregado',
          'C': 'CLT',
          'T': 'Terceirizado'
        };
        return map[params.value] || params.value;
      }
    },
    {
      headerName: 'Ativo',
      field: 'stAtivo',
      width: 100,
      cellRenderer: (params: { value: any; }) => params.value ? 'Sim' : 'Não',
      cellClass: params => params.value ? 'ativo' : 'inativo'
    }
  ];

  defaultColDef = {
    sortable: true,
    resizable: true,
    filter: true,
    floatingFilter: true,
  };

  constructor(private recursosService: RecursosHumanosService) { }

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.loading = true;
    this.recursosService.listar(this.mostrarInativos).subscribe({
      next: (data) => {
        this.rowData = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  toggleMostrarInativos(): void {
    this.mostrarInativos = !this.mostrarInativos;
    this.carregarDados();
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
  }
}