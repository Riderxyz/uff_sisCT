import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CnpjDialogComponent } from './cnpj-dialog/cnpj-dialog.component';


@Component({
  selector: 'app-starter',
  standalone: false,
  templateUrl: './starter.component.html',
  styleUrl: './starter.component.scss'
})
export class StarterComponent {

  private dialog: MatDialog = inject(MatDialog);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  private router: Router = inject(Router);

  constructor() {}
  openSisCtCadastro() {
    const dialogRef = this.dialog.open(CnpjDialogComponent, {
      width: '400px',
      data: { cnpj: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.validateCnpj(result)) {
        this.router.navigate(['/sisCtCadastro']);
      } else if (result) {
        this.snackBar.open('CNPJ inválido!', 'Fechar', {
          duration: 3000
        });
      }
    });
  }

  openSisCtConsulta() {
    console.log('Em desenvolvimento');
    this.snackBar.open('Funcionalidade em desenvolvimento', 'Fechar', {
      duration: 3000
    });
  }

  private validateCnpj(cnpj: string): boolean {
    // Implementação básica de validação de CNPJ
    // Você pode substituir por uma validação mais robusta
    const cleaned = cnpj.replace(/\D/g, '');
    return cleaned.length === 14;
  }
}
}
