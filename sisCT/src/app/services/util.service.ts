import { inject, Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
@Injectable({providedIn: 'root'})
export class UtilService {

  public dialog: MatDialog= inject(MatDialog);

    private snackBar: MatSnackBar = inject(MatSnackBar);
    private bottomSheet: MatBottomSheet = inject(MatBottomSheet);
  constructor() { }



  showConfirmDialog(message: string, title: string, accept: () => void, reject: () => void) {

  }



    /**
   * Exibe uma mensagem rápida (snackbar)
   * @param message Mensagem a ser exibida
   * @param action Texto da ação (opcional)
   * @param duration Duração em milissegundos (padrão: 3000)
   */
    showSnackbar(
      message: string,
      action: string = '',
      duration: number = 3000
    ): MatSnackBarRef<SimpleSnackBar> {
      return this.snackBar.open(message, action, {
        duration,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['custom-snackbar']
      });
    }



    isValidCNPJ(cnpj: string): boolean {
      // Remove caracteres não numéricos
      cnpj = cnpj.replace(/[^\d]/g, '');

      // Verifica se tem 14 dígitos e não é uma sequência de dígitos iguais
      if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
        return false;
      }

      // Validação do primeiro dígito verificador
      let length = 12;
      let numbers = cnpj.substring(0, length);
      let digits = cnpj.substring(length);
      let sum = 0;
      let pos = length - 7;

      for (let i = length; i >= 1; i--) {
        sum += parseInt(numbers.charAt(length - i)) * pos--;
        if (pos < 2) pos = 9;
      }

      let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
      if (result !== parseInt(digits.charAt(0))) {
        return false;
      }

      // Validação do segundo dígito verificador
      length = 13;
      numbers = cnpj.substring(0, length);
      sum = 0;
      pos = length - 7;

      for (let i = length; i >= 1; i--) {
        sum += parseInt(numbers.charAt(length - i)) * pos--;
        if (pos < 2) pos = 9;
      }

      result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
      if (result !== parseInt(digits.charAt(1))) {
        return false;
      }

      return true;
    }

    /**
     * Formata um CNPJ
     * @param cnpj CNPJ a ser formatado (com ou sem formatação)
     * @returns CNPJ formatado (00.000.000/0000-00) ou string vazia se inválido
     */
    formatCNPJ(cnpj: string): string {
      // Remove caracteres não numéricos
      cnpj = cnpj.replace(/[^\d]/g, '');

      // Verifica se tem 14 dígitos
      if (cnpj.length !== 14) {
        return cnpj; // Retorna o valor original se não puder ser formatado
      }

      // Aplica a formatação
      return cnpj.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        '$1.$2.$3/$4-$5'
      );
    }
}
