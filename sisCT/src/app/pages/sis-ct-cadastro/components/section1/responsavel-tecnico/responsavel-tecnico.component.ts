import { AfterViewInit, Component, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuestionService } from '../../../../../services/question.service';
import { RepresentanteTecnicoService } from '../../../../../services/representante-tecnico.service';
import { UtilService } from '../../../../../services/util.service';


@Component({
  selector: 'app-responsavel-tecnico',
  templateUrl: './responsavel-tecnico.component.html',
  styleUrl: './responsavel-tecnico.component.scss',
})
export class ResponsavelTecnicoComponent implements AfterViewInit, OnDestroy {
  readonly questionSrv: QuestionService = inject(QuestionService);
  readonly utilSrv: UtilService = inject(UtilService);
  readonly representanteService: RepresentanteTecnicoService = inject(RepresentanteTecnicoService);

  // Use the default instance from the service's BehaviorSubject
  // formModel: RepresentanteTecnicoInterface;

  private subscription: Subscription = new Subscription();

  constructor() {
    // Initialize formModel with the service instance
    // this.formModel = this.representanteService.getCurrentRepresentanteTecnico();
  }

  ngAfterViewInit(): void {
    // Check if questionSrv has data and update the service if needed
    const questionData = this.questionSrv.matriz.seccao1.dados.representanteTecnico;
    // if (questionData && Object.keys(questionData).length > 0) {
    //   this.representanteService.updateRepresentanteTecnico(questionData);
    // }

    // Subscribe to changes from the service
    this.subscription = this.representanteService.representanteTecnico$.subscribe(data => {
      // this.formModel = data;
      // Update the question service data as well
      // this.questionSrv.matriz.seccao1.dados.representanteTecnico = data;
    });
  }

  ngOnDestroy(): void {
    // Clean up subscription when component is destroyed
    this.subscription.unsubscribe();
  }

  onFieldChange() {
    // Update both the question service and the representante tecnico service
    this.representanteService.updateRepresentanteTecnico();
  }
}
