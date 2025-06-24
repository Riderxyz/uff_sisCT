import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { RepresentanteLegalInterface } from '../../../../../interface/representanteLegal.interface';
import { CadastroStep1Id } from '../../../../../interface/subSection.interface';
import { CentralRxJsService } from '../../../../../services/centralRXJS.service';
import { QuestionService } from '../../../../../services/question.service';
import { RepresentanteLegalService } from '../../../../../services/representante-legal.service';
import { StatusService } from '../../../../../services/status.service';
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
  readonly statusService = inject(StatusService);

  // Use the representante legal from the service directly
  get representante(): RepresentanteLegalInterface {
    return this.representanteService.getCurrentRepresentante();
  }

  isLoadingAdress = false;
  minimumYear = new Date().getFullYear();
  private readonly centralRxjs = inject(CentralRxJsService);
  private statusSubscription?: Subscription;

  constructor() { }

  ngOnInit(): void {
    // Subscribe to representante legal changes to update the question service
    this.representanteService.representante$.subscribe(representante => {
      // Update the question service model
      this.questionSrv.matriz.seccao1.dados.representanteLegal = representante;
    });

    this.statusSubscription = this.statusService.status$.subscribe(() => {
      // Force change detection when status changes
      console.log('Status changed');
    });
    this.statusUpdate();
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
    
    this.statusUpdate();
  }

  statusUpdate() {
    this.statusService.update({ secao: 3, campo: 'NOME', situacao: this.representanteService.getCurrentRepresentante().nome != '' ? true : false, nome: 'Nome do Representante legal' });
    this.statusService.update({ secao: 3, campo: 'TERMINO', situacao: this.representanteService.getCurrentRepresentante().anoDeTerminoDeMandato != '' ? true : false, nome: 'Nome do Representante legal' });
    this.statusService.update({ secao: 3, campo: 'CPF', situacao: this.representanteService.getCurrentRepresentante().cpf != '' ? true : false, nome: 'Nome do Representante legal' });
    this.statusService.update({ secao: 3, campo: 'CURSO_PROFISSAO', situacao: this.representanteService.getCurrentRepresentante().cursoProfissao != '' ? true : false, nome: 'Nome do Representante legal' });
    this.statusService.update({ secao: 3, campo: 'DT_NASCIMENTO', situacao: this.representanteService.getCurrentRepresentante().dataDeNascimento != '' ? true : false, nome: 'Nome do Representante legal' });
    this.statusService.update({ secao: 3, campo: 'EMAIL', situacao: this.representanteService.getCurrentRepresentante().email != '' ? true : false, nome: 'Nome do Representante legal' });
    this.statusService.update({ secao: 3, campo: 'ESCOLARIDADE', situacao: this.representanteService.getCurrentRepresentante().escolaridade != '' ? true : false, nome: 'Nome do Representante legal' });
    this.statusService.update({ secao: 3, campo: 'PAPEL_MATRIZ', situacao: this.representanteService.getCurrentRepresentante().seuPapelnaMatriz != '' ? true : false, nome: 'Nome do Representante legal' });
    this.statusService.update({ secao: 3, campo: 'TELEFONE', situacao: this.representanteService.getCurrentRepresentante().telefone != '' ? true : false, nome: 'Nome do Representante legal' });
  }
}
