import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ContatoDialogData {
    tipo?: string;
    valor?: string;
}

@Component({
    selector: 'app-contato-dialog',
    templateUrl: './contato-dialog.component.html',
    // styleUrls: ['./contato-dialog.component.css'] // Adicione se precisar de estilos específicos
})
export class ContatoDialogComponent implements OnInit {
    contatoForm: FormGroup;
    tiposContato = ['Email', 'Telefone'];
    currentMask: string | null = null;
    placeholder = '';

    constructor(
        public dialogRef: MatDialogRef<ContatoDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ContatoDialogData,
        private fb: FormBuilder
    ) {
        this.contatoForm = this.fb.group({
            tipo: [data?.tipo || 'Email', Validators.required],
            valor: [data?.valor || '', Validators.required]
        });
    }

    ngOnInit(): void {
        this.onTipoChange(this.contatoForm.get('tipo')?.value);
        this.contatoForm.get('tipo')?.valueChanges.subscribe(tipo => {
            this.onTipoChange(tipo);
        });
    }

    onTipoChange(tipo: string): void {
        const valorControl = this.contatoForm.get('valor');
        if (!valorControl) return;

        valorControl.clearValidators();
        valorControl.setValue('');

        if (tipo === 'Email') {
            this.currentMask = null;
            this.placeholder = 'exemplo@dominio.com';
            valorControl.setValidators([Validators.required, Validators.email]);
        } else if (tipo === 'Telefone') {
            this.currentMask = '(00) 00000-0000';
            this.placeholder = '(00) 00000-0000';
            valorControl.setValidators([Validators.required]); // Adicione validadores de telefone se necessário
        }
        valorControl.updateValueAndValidity();
    }

    onSave(): void {
        if (this.contatoForm.valid) {
            this.dialogRef.close(this.contatoForm.value);
        }
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}