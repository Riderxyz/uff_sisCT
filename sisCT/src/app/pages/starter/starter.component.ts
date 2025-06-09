import { Component, OnInit, inject } from '@angular/core';
import { UtilService } from '../../services/util.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CnpjDialogComponent } from '../../components/dialogs/cnpj-dialog/cnpj-dialog.component';
import { QuestionService } from '../../services/question.service';
import { TermosDeUsoDialogComponent } from '../../components/dialogs/termos-de-uso-dialog/termos-de-uso-dialog.component';
import { config } from '../../services/config';

@Component({
  selector: 'app-starter',
  standalone: false,
  templateUrl: './starter.component.html',
  styleUrl: './starter.component.scss',
})
export class StarterComponent implements OnInit {
  private readonly utilSrv = inject(UtilService);
  private readonly questionSrv = inject(QuestionService);
  private dialog: MatDialog = inject(MatDialog);
  private router: Router = inject(Router);

  constructor() {}

  ngOnInit() {
    const termsAcceptedRaw = localStorage.getItem(
      config.localStorageKeys.termsOfServiceAccepted
    );
    let hasUserAccepted: boolean = termsAcceptedRaw
      ? JSON.parse(termsAcceptedRaw)
      : false;
    if (!hasUserAccepted) {
      const dialogRef = this.dialog.open(TermosDeUsoDialogComponent, {
        width: '50vw',
      });

      dialogRef.afterClosed().subscribe((result: string) => {
        this.router.navigate(['/sisCtCadastro']);
      });
    } else {
      this.router.navigate(['/sisCtCadastro']);
    }
  }

  openSisCtCadastro() {
    this.router.navigate(['/sisCtCadastro']);
    /*  const dialogRef = this.dialog.open(CnpjDialogComponent, {
      width: '400px',
      data: { cnpj: '' },
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result && this.validateCnpj(result)) {
        this.questionSrv.selectedCnpj = result;
        this.router.navigate(['/sisCtCadastro']);
      }
    }); */
  }

}
