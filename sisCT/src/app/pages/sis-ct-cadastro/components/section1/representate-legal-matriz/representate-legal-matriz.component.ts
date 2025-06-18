import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { RepresentanteLegalInterface } from '../../../../../interface/representanteLegal.interface';
import { CadastroStep1Id } from '../../../../../interface/subSection.interface';
import { QuestionService } from '../../../../../services/question.service';
import { RepresentanteLegalService } from '../../../../../services/representante-legal.service';
import { UtilService } from '../../../../../services/util.service';
@Component({
  selector: 'app-representate-legal-matriz',
  templateUrl: './representate-legal-matriz.component.html',
  styleUrl: './representate-legal-matriz.component.scss',
})
export class RepresentateLegalMatrizComponent implements AfterViewInit, OnInit {

  readonly questionSrv: QuestionService = inject(QuestionService);
  readonly utilSrv: UtilService = inject(UtilService);
  readonly representanteService = inject(RepresentanteLegalService);

  // Use the representante legal from the service directly
  get representante(): RepresentanteLegalInterface {
    return this.representanteService.getCurrentRepresentante();
  }

  isLoadingAdress = false;
  minimumYear = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
    // Subscribe to representante legal changes to update the question service
    this.representanteService.representante$.subscribe(representante => {
      // Update the question service model
      this.questionSrv.matriz.seccao1.dados.representanteLegal = representante;
    });
  }

  ngAfterViewInit(): void {
    console.log(this.minimumYear);

    const savedData = this.questionSrv.matriz.seccao1.dados.representanteLegal;

    // Update the representante legal service with saved values
    if (savedData) {
      this.representanteService.updateRepresentante(savedData);
    }
  }

  onFieldChange(isItCep?: boolean) {
    if (isItCep) {
      //this.getEndereco();
    } else {
      // Update the question service model
      this.questionSrv.matriz.seccao1.dados.representanteLegal = this.representante;
      this.questionSrv.onMatrizDatachange(CadastroStep1Id.RepresentanteLegal);

      // No need to update the service as the two-way binding in the template
      // will automatically update the service when the form changes
    }
  }
}
