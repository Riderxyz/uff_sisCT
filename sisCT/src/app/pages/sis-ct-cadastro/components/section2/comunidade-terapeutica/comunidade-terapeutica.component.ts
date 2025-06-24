import { AfterViewInit, Component, inject } from '@angular/core';
import { QuestionService } from '../../../../../services/question.service';
import { UtilService } from '../../../../../services/util.service';
import {
  ComunidadeTerapeuticaInterface,
  MapasVagas,
} from '../../../../../interface/ComunidadeTerapeutica.interface';
import {
  AllCommunityModule,
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ModuleRegistry,
} from 'ag-grid-community';
import { AdicionarProfissionalDialogComponent } from '../../../../../components/dialogs/adicionar-profissional-dialog/adicionar-profissional-dialog.component';
import { AdicionarVagaDialogComponent } from '../../../../../components/dialogs/adicionar-vaga-dialog/adicionar-vaga-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-comunidade-terapeutica',
  templateUrl: './comunidade-terapeutica.component.html',
  styleUrl: './comunidade-terapeutica.component.scss',
})
export class ComunidadeTerapeuticaComponent implements AfterViewInit {
  readonly questionSrv: QuestionService = inject(QuestionService);
  readonly utilSrv: UtilService = inject(UtilService);

  readonly dialog: MatDialog = inject(MatDialog);
  formModel: ComunidadeTerapeuticaInterface = {
    comunidadeTerapeutica: {
      possuiLicencaSanitaria: false,
      validadeLicenca: '',
      prazoProjeto: 0,
      matrizPossuiCEBAS: false,
      requerimentoDEPAD: false,
      atendeLegislacao: false,

      periodoCEBAS: {
        inicio: '',
        termino: '',
      },
    },
    capacidadeAtendimento: {
      totalVagas: 0,
      publico: {
        adultoFeminino: 0,
        maesNutrizes: 0,
        adultoMasculino: 0,
      },
    },
    mapaVagas: [],
    reconhecimentoMunicipio: {
      conselhoMunicipal: '',
      reconhecimentoPublico: null,
    },
  };

  mapaVagasColDefs: ColDef<MapasVagas, any>[] = [
    {
      field: 'vaga',
      headerName: 'Vagas',
      sortable: true,
      filter: true,
      width: 200,
    },

    {
      field: 'disponibilidade',
      headerName: 'Disponibilidade',
      sortable: true,
      filter: true,
      width: 60,
    },
    {
      field: 'acolhidoIdentificacao',
      headerName: 'Identificação do acolhido',
      sortable: true,
      filter: true,
      width: 100,
    },
    {
      field: 'cpf',
      headerName: 'cpf',
      sortable: true,
      filter: true,
      width: 60,
    },
    {
      field: 'dataNascimento',
      headerName: 'Data de Nascimento',
      sortable: true,
      filter: true,
      width: 100,
    },

    {
      field: 'dataIngresso',
      headerName: 'Data de Ingresso',
      sortable: true,
      filter: true,
      width: 100,
    },
    {
      field: 'dataSaida',
      headerName: 'Data de Saida',
      sortable: true,
      filter: true,
      width: 100,
    },
    {
      field: 'qtdDiasAcolhimento',
      headerName: 'Qtd. de dias no acolhimento',
      sortable: true,
      filter: true,
      width: 100,
    },
    {
      field: 'publico',
      headerName: 'Público',
      sortable: true,
      filter: true,
      width: 100,
    },
    {
      field: 'gratuidade',
      headerName: 'Gratuidade',
      sortable: true,
      filter: true,
      width: 100,
    },

    {
      field: 'financiamento',
      headerName: 'Financiamento',
      sortable: true,
      filter: true,
      width: 100,
    },
  ];
  mapaVagasGridOptions: GridOptions = {
    columnDefs: this.mapaVagasColDefs,
    rowData: this.formModel.mapaVagas,
  };
  constructor() {}

  ngAfterViewInit(): void {}

  onSanitaryChange() {
    console.log(
      'Sanitary checkbox changed:',
      this.formModel.comunidadeTerapeutica.possuiLicencaSanitaria
    );
  }

  onCEBASChange() {
    if (!this.formModel.comunidadeTerapeutica.matrizPossuiCEBAS) {
      this.formModel.comunidadeTerapeutica.periodoCEBAS = undefined;
    } else {
      this.formModel.comunidadeTerapeutica.periodoCEBAS = {
        inicio: '',
        termino: '',
      };
    }
  }

  onFieldBlur(fieldName: string) {
    console.log(`Blurred field: ${fieldName}`);
  }

  onFieldChange(fieldName: string) {
    console.log(`Changed value of: ${fieldName}`);
  }

  adicionarVagaAoMapa() {
    const dialogRef = this.dialog.open(AdicionarVagaDialogComponent, {
      width: '60rem', // Ajuste a largura conforme necessário
      data: {}, // Pode passar dados iniciais aqui se for editar um contato
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.formModel.mapaVagas.push(result);
        console.log('Profissional salvo:', result);
      }
    });
  }
}
