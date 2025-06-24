import { AfterViewInit, Component, inject } from '@angular/core';
import { QuestionService } from '../../../../../services/question.service';
import { UtilService } from '../../../../../services/util.service';
import { ComunidadeTerapeuticaInterface } from '../../../../../interface/ComunidadeTerapeutica.interface';
import { AllCommunityModule, ColDef, GridApi, GridReadyEvent, ModuleRegistry } from 'ag-grid-community';
@Component({
  selector: 'app-comunidade-terapeutica',
  templateUrl: './comunidade-terapeutica.component.html',
  styleUrl: './comunidade-terapeutica.component.scss',
})
export class ComunidadeTerapeuticaComponent implements AfterViewInit {
  readonly questionSrv: QuestionService = inject(QuestionService);
  readonly utilSrv: UtilService = inject(UtilService);
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
    reconhecimentoMunicipio: {
      conselhoMunicipal: '',
      reconhecimentoPublico: null,
    },
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
}
