import { Component, inject } from '@angular/core';
import { ProfissionalInterface } from '../../../interface/entidadeDeCuidado.interface';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-adicionar-profissional-dialog',
  templateUrl: './adicionar-profissional-dialog.component.html',
  styleUrl: './adicionar-profissional-dialog.component.scss'
})
export class AdicionarProfissionalDialogComponent {
  profissional: ProfissionalInterface = {
    nome: '',
    cpf: '',
    dataNascimento: '',
    telefone: '',
    email: '',
    cargo: '',
    formacaoAcademica: '',
    cargaHoraria: '',
    vinculo: 'voluntario',
  };
  private dialogRef: MatDialogRef<AdicionarProfissionalDialogComponent> = inject(MatDialogRef);
constructor() {}

  /**
   * Submits the form and closes the dialog with the profissional object
   * if the form is valid.
   * @param form The form to be submitted
   */

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.dialogRef.close(this.profissional);
    }
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
