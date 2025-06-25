import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { RecursoHumano } from '../../../interfaces_crud/recursos-humanos.interface';
import { RecursosHumanosService } from '../../../services/recursos-humanos.service';
import { EditRHComponent } from '../../dialogs/edit-rh/edit-rh.component';

@Component({
  selector: 'app-recursos-humanos',
  templateUrl: './recursos-humanos.component.html',
  styleUrl: './recursos-humanos.component.scss'
})
export class RecursosHumanosComponent {
  private gridApi!: GridApi;
  rowData: RecursoHumano[] = [];
  mostrarInativos = false;
  loading = true;

  columnDefs: ColDef<RecursoHumano, any>[] = [];

  gridOptions: GridOptions = {
    rowHeight: 40,
    headerHeight: 80, // Altura maior para cabeçalhos com quebra de linha
    suppressHorizontalScroll: true,
    // onRowDoubleClicked: (params) => { this.abrirDialogoVaga(params.data); },
    getRowStyle: (params) => {
      if (params.data.stAtivo === 0) {
        return { background: 'rgba(255, 0, 0, 0.3)' }; // Vermelho com 30% de opacidade
      } else {
        return { background: 'white' };
      }
    },
    defaultColDef: {
      resizable: true,
      sortable: false,
      filter: false,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellStyle: {
        display: 'flex',
        alignItems: 'center',
        height: '100%' // Garante que o contêiner ocupe toda a altura da célula
      }
    }
  };
  // Configuração das colunas do AG Grid

  private initializeColumns(): void {
    this.columnDefs = [
      { headerName: 'Nome', field: 'dsNome', flex: 20 },
      { headerName: 'CPF', field: 'nuCpf', flex: 10 },
      {
        headerName: 'Nascimento',
        field: 'dtNascimento',
        valueFormatter: params => params.value ? new Date(params.value).toLocaleDateString('pt-BR') : '',
        flex: 10
      },
      { headerName: 'Telefone', field: 'dsTelefone', flex: 10 },
      { headerName: 'E-mail', field: 'dsEmail', flex: 15 },
      { headerName: 'Cargo', field: 'dsCargo', flex: 15 },
      {
        headerName: 'Formação',
        field: 'tpFormacaoAcademica',
        flex: 10,
        valueFormatter: params => {
          const map: Record<string, string> = {
            0: 'Graduação',
            1: 'Pós-graduação',
            2: 'Mestrado',
            3: 'Doutorado'
          };
          return map[params.value] || params.value;
        }
      },
      { headerName: 'Carga Horária', field: 'nuCargaHoraria', flex: 10 },
      {
        headerName: 'Vínculo',
        field: 'tpVinculo',
        flex: 15,
        valueFormatter: params => {
          const map: Record<string, string> = {
            0: 'Voluntário',
            1: 'Empregado',
            2: 'CLT',
            3: 'Terceirizado'
          };
          return map[params.value] || params.value;
        }
      },
    ];
  }

  defaultColDef = {
    sortable: true,
    resizable: true,
    filter: true,
    floatingFilter: true,
  };

  constructor(private recursosService: RecursosHumanosService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.carregarDados();
    this.initializeColumns();
  }

  carregarDados(): void {
    console.log('Carregando dados de recursos humanos...');
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

  abrirDialogoRH(data?: RecursoHumano): void {
    this.recursosService.idAtual = data ? data.pkRecursosHumanos : -1; // Define o ID da vaga atual
    this.dialog.open(EditRHComponent, {
      width: '70vw', // Ajuste conforme necessário
      data: data // Passa os dados da linha para o diálogo
    });
  }
}
