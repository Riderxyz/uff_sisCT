import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { MapaDeVagas } from '../../../interfaces_crud/mapa_vagas.interface';
import { MapaDeVagasService } from '../../../services/mapa-de-vagas.service';


@Component({
  selector: 'app-mapa-de-vagas',
  templateUrl: './mapa-de-vagas.component.html',
  styleUrl: './mapa-de-vagas.component.scss'
})
export class MapaDeVagasComponent implements OnInit {
  rowData: MapaDeVagas[] = [];
  columnDefs: ColDef<MapaDeVagas, any>[] = [];
  gridOptions: GridOptions = {
    rowHeight: 40,
    headerHeight: 80, // Altura maior para cabeçalhos com quebra de linha
    suppressHorizontalScroll: true,
    onRowDoubleClicked: (params) => { },
    defaultColDef: {
      resizable: true,
      sortable: false,
      filter: false,
      wrapHeaderText: true,
      autoHeaderHeight: true,
    }
  };

  constructor(private vagasService: MapaDeVagasService) { }
  loadData(): void {
    this.vagasService.vagas$.subscribe(vagas => {
      this.rowData = vagas.filter(v => v.stAtivo === 1);
    });
  }
  ngOnInit(): void {
    this.loadData();
    this.initializeColumns();
  }

  private initializeColumns(): void {
    this.columnDefs = [
      {
        headerName: 'Vaga',
        //field: '',
        valueGetter: (params) => {
          const index = params.node!.rowIndex! + 1;
          const total = this.rowData.length;
          return `${index.toString().padStart(2, '0')}/${total}`;
        },
        width: 80,
        cellStyle: { textAlign: 'center' }
      },
      {
        headerName: 'Disponibilidade',
        field: 'stDisponibilidade',
        cellRenderer: (params: { value: number; }) => params.value === 1 ? 'Ocupado' : 'Vago',
        width: 120,
        cellStyle: { textAlign: 'center' }
      },
      {
        headerName: 'Identificação do acolhido',
        field: 'dsIdentificacaoAcolhido',
        width: 180
      },
      {
        headerName: 'CPF',
        field: 'nuCpf',
        valueFormatter: (params) => params.value ? this.formatCPF(params.value) : '',
        width: 140
      },
      {
        headerName: 'Data de nascimento',
        field: 'dtNascimento',
        width: 150
      },
      {
        headerName: 'Data de ingresso',
        field: 'dtIngresso',
        width: 150
      },
      {
        headerName: 'Data de saída',
        field: 'dtSaida',
        width: 150
      },
      {
        headerName: 'Qtd. de dias<br>no acolhimento',
        valueGetter: (params) => {
          if (!params.data!.dtIngresso) return 0;

          const ingresso = new Date(params.data!.dtIngresso);
          const saida = params.data!.dtSaida ? new Date(params.data!.dtSaida) : new Date();
          const diff = saida.getTime() - ingresso.getTime();
          return Math.floor(diff / (1000 * 60 * 60 * 24));
        },
        width: 120,
        cellStyle: { textAlign: 'center' }
      },
      {
        headerName: 'Público',
        field: 'stPublico',
        cellRenderer: (params: { value: any; }) => {
          switch (params.value) {
            case 0: return 'adulto fem';
            case 1: return 'adulto masc';
            case 2: return 'mãe nutriz';
            default: return '';
          }
        },
        width: 120
      },
      {
        headerName: 'Gratuidade ',
        field: 'stGratuidade',
        cellRenderer: (params: { value: number; }) => {
          return params.value === 1
            ? 'Acolhimento gratuito SEM contraprestação pecuniária do acolhido'
            : 'Acolhimento COM contraprestação pecuniária do acolhido';
        },
        width: 250
      },
      {
        headerName: 'Financiamento',
        field: 'stFinanciamento',
        cellRenderer: (params: { value: any; }) => {
          switch (params.value) {
            case 0: return 'União';
            case 1: return 'Estado';
            case 2: return 'Município';
            case 3: return 'Entidade';
            default: return '';
          }
        },
        width: 180
      },
      {
        headerName: 'Ações',
        cellRenderer: (params: any) => {
          const button = document.createElement('button');
          button.innerHTML = '<i class="material-icons">delete</i>';
          button.style.cursor = 'pointer';
          button.style.border = 'none';
          button.style.background = 'none';
          button.addEventListener('click', () => {
            this.removerVaga(params.data);
          });
          return button;
        },
        width: 100,
        cellStyle: { textAlign: 'center' }
      }
    ];
  }

  private formatCPF(cpf: number): string {
    const cpfStr = cpf.toString().padStart(11, '0');
    return cpfStr.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  private removerVaga(vaga: MapaDeVagas): void {
    const index = this.rowData.findIndex(v => v.pkMapaDeVagas === vaga.pkMapaDeVagas);
    if (index > -1) {
      const vaga = this.rowData[index];
      // this.rowData.splice(index, 1);
      this.vagasService.desativarVaga(vaga.pkMapaDeVagas!)
      this.loadData();
    }
  }
}
