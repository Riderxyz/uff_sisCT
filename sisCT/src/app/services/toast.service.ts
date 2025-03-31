import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export enum ToastSeverity {
  SUCCESS = 'success',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

export interface ToastMessage {
  severity: ToastSeverity;
  summary: string;
  detail?: string;
  life?: number;
  sticky?: boolean;
  key?: string;
  closable?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<ToastMessage>();
  public toast$: Observable<ToastMessage> = this.toastSubject.asObservable();

  constructor() {}

  /**
   * Exibe uma mensagem toast
   * @param message Objeto com as propriedades da mensagem
   */
  show(message: ToastMessage): void {
    // Definindo valores padrão
    const defaultMessage: ToastMessage = {
      ...message,
      closable: message.closable !== undefined ? message.closable : true,
      life: message.life !== undefined ? message.life : this.getDefaultLifeByType(message.severity)
    };
    
    this.toastSubject.next(defaultMessage);
  }

  /**
   * Exibe um toast de sucesso
   * @param summary Título da mensagem
   * @param detail Detalhe da mensagem (opcional)
   * @param life Duração em ms (padrão: 3000)
   */
  showSuccess(summary: string, detail?: string, life?: number): void {
    this.show({
      severity: ToastSeverity.SUCCESS,
      summary,
      detail,
      life
    });
  }

  /**
   * Exibe um toast informativo
   * @param summary Título da mensagem
   * @param detail Detalhe da mensagem (opcional)
   * @param life Duração em ms (padrão: 3000)
   */
  showInfo(summary: string, detail?: string, life?: number): void {
    this.show({
      severity: ToastSeverity.INFO,
      summary,
      detail,
      life
    });
  }

  /**
   * Exibe um toast de alerta
   * @param summary Título da mensagem
   * @param detail Detalhe da mensagem (opcional)
   * @param life Duração em ms (padrão: 4000)
   */
  showWarn(summary: string, detail?: string, life?: number): void {
    this.show({
      severity: ToastSeverity.WARN,
      summary,
      detail,
      life
    });
  }

  /**
   * Exibe um toast de erro
   * @param summary Título da mensagem
   * @param detail Detalhe da mensagem (opcional)
   * @param life Duração em ms (padrão: 5000)
   */
  showError(summary: string, detail?: string, life?: number): void {
    this.show({
      severity: ToastSeverity.ERROR,
      summary,
      detail,
      life
    });
  }

  /**
   * Obtém a duração padrão do toast com base no tipo
   * @param severity Tipo de severidade do toast
   * @returns Duração em ms
   */
  private getDefaultLifeByType(severity: ToastSeverity): number {
    switch (severity) {
      case ToastSeverity.SUCCESS:
        return 3000;
      case ToastSeverity.INFO:
        return 3000;
      case ToastSeverity.WARN:
        return 4000;
      case ToastSeverity.ERROR:
        return 5000;
      default:
        return 3000;
    }
  }

  /**
   * Limpa todos os toasts de uma determinada key
   * @param key Chave dos toasts a serem limpos
   */
  clear(key?: string): void {
    // Emite um evento especial para limpar os toasts
    // Esta implementação seria complementada no componente
    this.toastSubject.next({
      severity: ToastSeverity.INFO,
      summary: 'clear',
      key
    });
  }
}