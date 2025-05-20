import { Component, inject, Inject } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilService } from '../../../services/util.service';

@Component({
  selector: 'app-cnpj-dialog',
  standalone: false,
  templateUrl: './cnpj-dialog.component.html',
  styleUrl: './cnpj-dialog.component.scss',
})
export class CnpjDialogComponent {
  cnpj = '';
  utilSrv = inject(UtilService);
  constructor(
    public dialogRef: MatDialogRef<CnpjDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cnpj: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  validateCnpj(control: NgModel) {

    const isValid = this.utilSrv.isValidCNPJ(this.cnpj);
    if (!isValid) {
      console.log(control.control.value);
      control.control.setErrors({ ...control.errors, invalidCnpj: true });
    } else {
      if (control.errors?.['invalidCnpj']) {
        const { invalidCnpj, ...otherErrors } = control.errors;
        control.control.setErrors(
          Object.keys(otherErrors).length ? otherErrors : null
        );
      }
    }
  }

  onSubmit(): void {
    this.utilSrv.showInfo(
      'CNPJ válido!',
      'Migrando para a pagina de cadastro',
      5000
    );
    this.dialogRef.close(this.cnpj);
  }
}
