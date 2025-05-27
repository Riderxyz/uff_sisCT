import { Component, inject, OnInit } from '@angular/core';
import { QuestionService } from '../../../services/question.service';
import { UtilService } from '../../../services/util.service';

@Component({
  selector: 'app-termos-de-uso-dialog',
  templateUrl: './termos-de-uso-dialog.component.html',
  styleUrl: './termos-de-uso-dialog.component.scss',
})
export class TermosDeUsoDialogComponent implements OnInit {

  hasUserAccepted: boolean = false;
  private readonly utilSrv: UtilService = inject(UtilService);
  constructor() {}

  ngOnInit(): void {}


  onAcceptTerms() {
    this.utilSrv.userHasAceptedTerms();
  }
}
