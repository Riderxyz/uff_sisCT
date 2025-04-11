import { Injectable } from '@angular/core';
import { config } from '../services/config';

@Injectable({ providedIn: 'root' })
export class QuestionService {
  private _selectedCnpj: string = '';
  constructor() {}

  get selectedCnpj(): string {
    if (!this._selectedCnpj) {
      this._selectedCnpj =
        localStorage.getItem(config.localStorageKeys.selectedCnpj) || '';
    }
    if (this._selectedCnpj) {
      return this._selectedCnpj;
    }
    return this._selectedCnpj;
  }

  set selectedCnpj(value: string) {
    localStorage.setItem(config.localStorageKeys.selectedCnpj, value);
    this._selectedCnpj = value;
  }
}
