import { AfterViewInit, Component, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { RepresentanteTecnicoInterface } from '../../../../../interface/representanteTecnico.interface';
import { CadastroStep1Id } from '../../../../../interface/subSection.interface';
import { QuestionService } from '../../../../../services/question.service';
import { RepresentanteTecnicoCrudService } from '../../../../../services/representante-tecnico.service';
import { UtilService } from '../../../../../services/util.service';


@Component({
  selector: 'app-responsavel-tecnico',
  templateUrl: './responsavel-tecnico.component.html',
  styleUrl: './responsavel-tecnico.component.scss',
})
export class ResponsavelTecnicoComponent implements AfterViewInit, OnDestroy {
  readonly questionSrv: QuestionService = inject(QuestionService);
  readonly utilSrv: UtilService = inject(UtilService);
  readonly representanteTecnicoSrv: RepresentanteTecnicoCrudService = inject(RepresentanteTecnicoCrudService);

  // Use the default instance from the service's BehaviorSubject
  formModel: RepresentanteTecnicoInterface;

  private subscription: Subscription = new Subscription();

  constructor() {
    // Initialize formModel with the service instance
    this.formModel = this.representanteTecnicoSrv.getCurrentRepresentanteTecnico();
  }
  
  ngAfterViewInit(): void {
    // Check if questionSrv has data and update the service if needed
    const questionData = this.questionSrv.matriz.seccao1.dados.representanteTecnico;
    if (questionData && Object.keys(questionData).length > 0) {
      this.representanteTecnicoSrv.updateRepresentanteTecnico(questionData);
    }

    // Subscribe to changes from the service
    this.subscription = this.representanteTecnicoSrv.representanteTecnico$.subscribe(data => {
      this.formModel = data;
      // Update the question service data as well
      this.questionSrv.matriz.seccao1.dados.representanteTecnico = data;
    });
  }

  ngOnDestroy(): void {
    // Clean up subscription when component is destroyed
    this.subscription.unsubscribe();
  }

  onFieldChange() {
    // Update both the question service and the representante tecnico service
    this.questionSrv.matriz.seccao1.dados.representanteTecnico = this.formModel;
    this.representanteTecnicoSrv.updateRepresentanteTecnico(this.formModel);
    this.questionSrv.onMatrizDatachange(CadastroStep1Id.ResponsavelTecnico);
  }
}
