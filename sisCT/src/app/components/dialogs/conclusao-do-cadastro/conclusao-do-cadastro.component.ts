import { Component, inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-conclusao-do-cadastro',
  templateUrl: './conclusao-do-cadastro.component.html',
  styleUrl: './conclusao-do-cadastro.component.scss'
})
export class ConclusaoDoCadastroDialogComponent implements OnInit {
   nome: string = '';
  cpf: string = '';
  status: string | null = null;

  private dialogRef: MatDialogRef<ConclusaoDoCadastroDialogComponent> = inject(MatDialogRef);
  constructor() {}

  ngOnInit(): void {
    // Initialization logic can go here
  }


    formValido(): boolean {
    return this.nome.trim() !== '' && this.cpf.trim() !== '' && !!this.status;
  }


  concluir() {
    if (this.formValido()) {
      // Aqui você pode enviar os dados para o backend ou emitir para o componente pai
      this.dialogRef.close({
        nome: this.nome,
        cpf: this.cpf,
        status: this.status,
      });
    }
  }
}
