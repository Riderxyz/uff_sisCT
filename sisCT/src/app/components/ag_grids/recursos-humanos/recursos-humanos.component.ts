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
      {
        headerName: 'Ações',
        // field: 'acoes',
        flex: 10,
        sortable: false,
        filter: false,

        cellRenderer: (params: any) => {
          const container = document.createElement('div');
          container.style.display = 'flex';
          container.style.gap = '8px';
          container.style.alignItems = 'center';
          container.style.justifyContent = 'center';
          container.style.height = '100%';

          // Botão de Edição
          const editButton = document.createElement('button');
          editButton.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
          <path d="m18.5 2.5 a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
      `;
          editButton.className = 'btn-action btn-edit';
          editButton.style.cssText = `
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 6px 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s;
      `;
          editButton.addEventListener('mouseenter', () => {
            editButton.style.backgroundColor = '#0056b3';
          });
          editButton.addEventListener('mouseleave', () => {
            editButton.style.backgroundColor = '#007bff';
          });
          editButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.editarRegistro(params.data);
          });

          // Botão de Exclusão
          const deleteButton = document.createElement('button');
          deleteButton.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="3,6 5,6 21,6"/>
          <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
          <line x1="10" y1="11" x2="10" y2="17"/>
          <line x1="14" y1="11" x2="14" y2="17"/>
        </svg>
      `;
          deleteButton.className = 'btn-action btn-delete';
          deleteButton.style.cssText = `
        background: #dc3545;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 6px 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s;
      `;
          deleteButton.addEventListener('mouseenter', () => {
            deleteButton.style.backgroundColor = '#c82333';
          });
          deleteButton.addEventListener('mouseleave', () => {
            deleteButton.style.backgroundColor = '#dc3545';
          });
          deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.excluirRegistro(params.data);
          });

          container.appendChild(editButton);
          container.appendChild(deleteButton);

          return container;
        }
      }
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

  editarRegistro(data: RecursoHumano): void {
    this.recursosService.idAtual = data ? data.pkRecursosHumanos : -1; // Define o ID da vaga atual
    this.dialog.open(EditRHComponent, {
      width: '70vw', // Ajuste conforme necessário
      data: data // Passa os dados da linha para o diálogo
    });
    //   this.rh = data
    // Implementar lógica de edição
    console.log('Editando registro:', data);
    // Exemplo: abrir modal de edição ou navegar para página de edição
    // this.router.navigate(['/editar', data.id]);
    // ou
    // this.openEditModal(data);
  }

  excluirRegistro(data: any): void {
    // Implementar lógica de exclusão
    console.log('Excluindo registro:', data);
    // Exemplo: mostrar confirmação e excluir
    // if (confirm('Tem certeza que deseja excluir este registro?')) {
    //   this.service.excluir(data.id).subscribe(() => {
    //     this.gridApi.applyTransaction({ remove: [data] });
    //   });
    // }
  }
}
