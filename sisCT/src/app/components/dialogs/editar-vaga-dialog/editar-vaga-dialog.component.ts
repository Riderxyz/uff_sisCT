import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MapaDeVagas } from '../../../interfaces_crud/mapa_vagas.interface';
@Component({
  selector: 'app-adicionar-vaga-dialog',
  templateUrl: './editar-vaga-dialog.component.html',
  styleUrl: './editar-vaga-dialog.component.scss'
})
export class AdicionarVagaDialogComponent {

  mapa: any = {

    disponibilidade: false,
    acolhidoIdentificacao: '',
    cpf: '',
    dataNascimento: '',
    dataIngresso: '',
    dataSaida: '',
    qtdDiasAcolhimento: 0,
    publico: 'adultoFeminino',
    gratuidade: 'Acolhimentogratuito SEM contraprestaçãopecuniária do acolhido',
    financiamento: 'União',
  };

  private dialogRef: MatDialogRef<AdicionarVagaDialogComponent> = inject(MatDialogRef)
  constructor() { }


  onSubmit(form: NgForm) {
    if (form.valid) {
      this.dialogRef.close(this.mapa);
    }
  }

  onCancel() {
    this.dialogRef.close(null);
  }

}


