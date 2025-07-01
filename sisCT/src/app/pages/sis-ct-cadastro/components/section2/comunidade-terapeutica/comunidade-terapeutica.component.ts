import { AfterViewInit, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdicionarVagaDialogComponent } from '../../../../../components/dialogs/editar-vaga-dialog/editar-vaga-dialog.component';
import {
  ComunidadeTerapeuticaInterface,
} from '../../../../../interface/ComunidadeTerapeutica.interface';
import { MapaDeVagasService } from '../../../../../services/mapa-de-vagas.service';
import { QuestionService } from '../../../../../services/question.service';
import { UtilService } from '../../../../../services/util.service';
@Component({
  selector: 'app-comunidade-terapeutica',
  templateUrl: './comunidade-terapeutica.component.html',
  styleUrl: './comunidade-terapeutica.component.scss',
})
export class ComunidadeTerapeuticaComponent implements AfterViewInit {
  readonly questionSrv: QuestionService = inject(QuestionService);
  readonly utilSrv: UtilService = inject(UtilService);
  readonly mapadevagasSrv: MapaDeVagasService = inject(MapaDeVagasService);

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



  constructor() { }

  ngAfterViewInit(): void { }

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

  onFieldBlur(fieldName: number) {
    console.log(`Blurred field: ${fieldName}`);
    this.mapadevagasSrv.ajustarQuantidadeVagas(fieldName)
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
