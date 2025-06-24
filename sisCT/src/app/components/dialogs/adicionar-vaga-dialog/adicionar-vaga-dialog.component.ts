import { Component, inject } from '@angular/core';
import { MapasVagas } from '../../../interface/ComunidadeTerapeutica.interface';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-adicionar-vaga-dialog',
  templateUrl: './adicionar-vaga-dialog.component.html',
  styleUrl: './adicionar-vaga-dialog.component.scss'
})
export class AdicionarVagaDialogComponent {

  mapa: MapasVagas = {
    vaga: '',
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


