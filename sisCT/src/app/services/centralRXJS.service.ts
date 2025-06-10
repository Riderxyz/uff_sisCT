import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

export interface SenderRXJS {
  key: string;
  data?: any;
}

@Injectable({
  providedIn: 'root' // Garante singleton sem necessidade de providers
})
export class CentralRxJsService {
  private readonly inputStream = new ReplaySubject<SenderRXJS>(1); // Mantém apenas o último valor

  constructor() {}

  /** Envia um novo valor para os assinantes */
  sendData(keyOrValue: string | SenderRXJS, data?: any): void {
    if (typeof keyOrValue === 'string') {
      this.inputStream.next({ key: keyOrValue, data });
    } else {
      this.inputStream.next(keyOrValue);
    }
  }

  /** Observable para componentes assinarem e receberem os dados */
  get dataToReceive(): Observable<SenderRXJS> {
    return this.inputStream.asObservable();
  }
}
