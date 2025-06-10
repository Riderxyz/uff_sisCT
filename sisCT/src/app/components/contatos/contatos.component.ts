import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { RlContato } from '../../interface/contato.interface';
import { ContatoService } from '../../services/contato.service';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.scss']
})
export class ContatosComponent implements OnInit {
  private gridApi!: GridApi<RlContato>;
  public rowData: RlContato[] = [];
  public contatoForm: FormGroup;

  public columnDefs: ColDef[] = [
    { 
      field: 'PK_TIPO_CONTATO', 
      headerName: 'Tipo', 
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: [1, 2]
      },
      valueFormatter: (params) => {
        return params.value === 1 ? 'Telefone' : 'Email';
      },
      width: 120
    },
    { 
      field: 'CO_CONTATO', 
      headerName: 'Contato', 
      editable: true,
      flex: 1
    },
    {
      headerName: 'Ações',
      cellRenderer: this.acoesCellRenderer,
      cellRendererParams: {
        componentParent: this
      },
      width: 100
    }
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true
  };

  constructor(
    private contatoService: ContatoService,
    private fb: FormBuilder
  ) {
    this.contatoForm = this.fb.group({
      PK_TIPO_CONTATO: [2, Validators.required],
      CO_CONTATO: ['', Validators.required],
      PK_CADASTRO_NACIONAL: [null],
      PK_REPRESENTANTE_LEGAL: [null],
      PK_REPRESENTANTE_TECNICO: [null]
    });
  }

  ngOnInit(): void {
    this.contatoService.getContatos().subscribe(contatos => {
      this.rowData = contatos.filter(c => c.ST_CONTATO_ATIVO === 'S');
    });
  }

  onGridReady(params: GridReadyEvent<RlContato>) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  acoesCellRenderer(params: any) {
    const element = document.createElement('button');
    element.innerHTML = '<i class="fas fa-trash"></i>';
    element.className = 'btn btn-danger btn-sm';
    element.addEventListener('click', () => {
      if (params.context && params.context.componentParent) {
        params.context.componentParent.excluirContato(params.data.PK_RLCONTATO);
      }
    });
    return element;
  }

  adicionarContato() {
    if (this.contatoForm.valid) {
      const novoContato: RlContato = {
        PK_RLCONTATO: 0, // Será gerado pelo serviço
        CO_CONTATO: this.contatoForm.value.CO_CONTATO,
        PK_TIPO_CONTATO: this.contatoForm.value.PK_TIPO_CONTATO,
        ST_CONTATO_ATIVO: 'S',
        DT_ATUALIZACAO: new Date().toISOString(),
        PK_CADASTRO_NACIONAL: this.contatoForm.value.PK_CADASTRO_NACIONAL,
        PK_REPRESENTANTE_LEGAL: this.contatoForm.value.PK_REPRESENTANTE_LEGAL,
        PK_REPRESENTANTE_TECNICO: this.contatoForm.value.PK_REPRESENTANTE_TECNICO
      };

      this.contatoService.adicionarContato(novoContato);
      this.contatoForm.reset({
        PK_TIPO_CONTATO: 2,
        CO_CONTATO: '',
        PK_CADASTRO_NACIONAL: null,
        PK_REPRESENTANTE_LEGAL: null,
        PK_REPRESENTANTE_TECNICO: null
      });
    }
  }

  excluirContato(id: number) {
    this.contatoService.desativarContato(id);
  }

  onCellValueChanged(event: any) {
    const contato: RlContato = event.data;
    this.contatoService.atualizarContato(contato);
  }
}