import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ContatoDialogData {
  tipo?: string;
  valor?: string;
}

@Component({
  selector: 'app-contato-dialog',
  templateUrl: './contato-dialog.component.html',
})
export class ContatoDialogComponent implements OnInit {
  contato = {
    tipo: 'Email',
    valor: ''
  };

  tiposContato = ['Email', 'Telefone'];
  currentMask: string | null = null;
  placeholder = '';

  constructor(
    public dialogRef: MatDialogRef<ContatoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ContatoDialogData
  ) {
    this.contato.tipo = data?.tipo || 'Email';
    this.contato.valor = data?.valor || '';
  }

  ngOnInit(): void {
    this.onTipoChange(this.contato.tipo);
  }

  onTipoChange(tipo: string): void {
    this.contato.valor = '';

    if (tipo === 'Email') {
      this.currentMask = null;
      this.placeholder = 'exemplo@dominio.com';
    } else if (tipo === 'Telefone') {
      this.currentMask = '(00) 00000-0000';
      this.placeholder = '(00) 00000-0000';
    }
  }

  onSave(): void {
    this.dialogRef.close(this.contato);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
