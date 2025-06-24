import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AllCommunityModule, ColDef, GridApi, GridReadyEvent, ModuleRegistry } from 'ag-grid-community';

import { RlContato } from '../../interfaces_crud/contato.interface';
import { ContatoService } from '../../services/contato.service';
import { ContatoDialogComponent } from '../dialogs/contato-dialog/contato-dialog.component';

interface Contato {
  tipo: string;
  valor: string;
}

// Registrar os módulos do AG Grid
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContatosComponent implements OnInit {
  private gridApi!: GridApi<RlContato>;
  public rowData: RlContato[] = [];
  public contatoForm: FormGroup;

  constructor(
    private contatoService: ContatoService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.contatoForm = this.fb.group({
      PK_TIPO_CONTATO: [2, Validators.required],
      CO_CONTATO: ['', Validators.required],
      PK_CADASTRO_NACIONAL: [null],
      PK_REPRESENTANTE_LEGAL: [null],
      PK_REPRESENTANTE_TECNICO: [null]
    });
  }


  contatos: Contato[] = []; // Array para armazenar os contatos adicionados

  abrirPopupNovoContato(): void {
    const dialogRef = this.dialog.open(ContatoDialogComponent, {
      width: '450px', // Ajuste a largura conforme necessário
      data: {} // Pode passar dados iniciais aqui se for editar um contato
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // result é o objeto {tipo: '...', valor: '...'} retornado pelo dialog
        this.contatos.push(result);
        // Aqui você pode adicionar lógica para salvar o contato, por exemplo, emitir um evento ou chamar um serviço
        console.log('Contato salvo:', result);
      }
    });
  }



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
      cellRenderer: (params: any) => {
        const element = document.createElement('button');
        element.innerHTML = '<i class="fas fa-trash"></i>';
        element.className = 'btn btn-danger btn-sm';
        element.style.backgroundColor = '#dc3545';
        element.style.color = 'white';
        element.style.border = 'none';
        element.style.borderRadius = '4px';
        element.style.padding = '4px 8px';
        element.style.cursor = 'pointer';
        element.addEventListener('click', () => {
          this.excluirContato(params.data.PK_RLCONTATO);
        });
        return element;
      },
      width: 100
    }
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true
  };



  ngOnInit(): void {
    // Gerar dados de exemplo para teste
    this.contatoService.getContatos().subscribe(contatos => {
      this.rowData = contatos.filter(c => c.ST_CONTATO_ATIVO === 'S');

      // Se não houver dados, adicionar alguns para teste
      if (this.rowData.length === 0) {
        this.adicionarContatosTeste();
      }
    });
  }

  private adicionarContatosTeste(): void {
    const contatos: RlContato[] = [
      {
        PK_RLCONTATO: 1,
        CO_CONTATO: 'exemplo@email.com',
        PK_TIPO_CONTATO: 2,
        ST_CONTATO_ATIVO: 'S',
        DT_ATUALIZACAO: new Date(),
        PK_CADASTRO_NACIONAL: 12345,
        PK_REPRESENTANTE_LEGAL: -1,
        PK_REPRESENTANTE_TECNICO: -1
      },
      {
        PK_RLCONTATO: 2,
        CO_CONTATO: '(21) 98765-4321',
        PK_TIPO_CONTATO: 1,
        ST_CONTATO_ATIVO: 'S',
        DT_ATUALIZACAO: new Date(),
        PK_CADASTRO_NACIONAL: -1,
        PK_REPRESENTANTE_LEGAL: 67890,
        PK_REPRESENTANTE_TECNICO: -1
      }
    ];

    contatos.forEach(contato => {
      this.contatoService.adicionarContato(contato);
    });
  }

  onGridReady(params: GridReadyEvent<RlContato>) {
    this.gridApi = params.api;
    setTimeout(() => {
      this.gridApi.sizeColumnsToFit();
    }, 100);
  }

  adicionarContato() {
    if (this.contatoForm.valid) {
      const novoContato: RlContato = {
        PK_RLCONTATO: 0, // Será gerado pelo serviço
        CO_CONTATO: this.contatoForm.value.CO_CONTATO,
        PK_TIPO_CONTATO: this.contatoForm.value.PK_TIPO_CONTATO,
        ST_CONTATO_ATIVO: 'S',
        DT_ATUALIZACAO: new Date(),
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
