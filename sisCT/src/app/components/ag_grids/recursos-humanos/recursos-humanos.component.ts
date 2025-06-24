import { Component } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { MapaDeVagas } from '../../../interfaces_crud/mapa_vagas.interface';

@Component({
  selector: 'app-recursos-humanos',
  templateUrl: './recursos-humanos.component.html',
  styleUrl: './recursos-humanos.component.scss'
})
export class RecursosHumanosComponent {
  rowData: MapaDeVagas[] = [];
  columnDefs: ColDef<MapaDeVagas, any>[] = [];
  gridOptions: GridOptions = {
        rowHeight: 40,
    headerHeight: 80, // Altura maior para cabeçalhos com quebra de linha
    suppressHorizontalScroll: true,
    defaultColDef: {
      resizable: true,
      sortable: false,
      filter: false,
      wrapHeaderText: true,
      autoHeaderHeight: true,
    }
  }
  constructor() { }

}
