import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RlContato } from '../interfaces_crud/contato.interface';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private apiUrl: string;
  private contatos: RlContato[] = [];
  
  // Default contato instance for forms
  private contatoSubject = new BehaviorSubject<RlContato>({
    PK_TIPO_CONTATO: 2, // Default to email
    PK_CADASTRO_NACIONAL: 0,
    PK_REPRESENTANTE_LEGAL: 0,
    PK_REPRESENTANTE_TECNICO: 0,
    CO_CONTATO: '',
    ST_CONTATO_ATIVO: 'S'
  });
  
  // Observable to expose the contato instance
  public contato$ = this.contatoSubject.asObservable();

  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService
  ) { 
    this.apiUrl = `${this.environmentService.apiUrl}/contatos`;
  }
  
  // Get the current contato instance
  getCurrentContato(): RlContato {
    return this.contatoSubject.getValue();
  }
  
  // Update the current contato instance
  updateCurrentContato(contato: Partial<RlContato>): void {
    const current = this.contatoSubject.getValue();
    this.contatoSubject.next({ ...current, ...contato });
  }
  
  // Reset the contato instance to default values
  resetCurrentContato(): void {
    this.contatoSubject.next({
      PK_TIPO_CONTATO: 2,
      PK_CADASTRO_NACIONAL: 0,
      PK_REPRESENTANTE_LEGAL: 0,
      PK_REPRESENTANTE_TECNICO: 0,
      CO_CONTATO: '',
      ST_CONTATO_ATIVO: 'S'
    });
  }

  getContatos(): Observable<RlContato[]> {
    // For demo purposes, return local data if available
    if (this.contatos.length > 0) {
      return of(this.contatos);
    }

    return this.http.get<RlContato[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<RlContato[]>('getContatos', []))
      );
  }

  getContatoById(id: number): Observable<RlContato> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<RlContato>(url)
      .pipe(
        catchError(this.handleError<RlContato>(`getContatoById id=${id}`))
      );
  }

  getContatosByCadastroNacional(cadastroNacionalId: number): Observable<RlContato[]> {
    const url = `${this.apiUrl}/cadastro/${cadastroNacionalId}`;
    return this.http.get<RlContato[]>(url)
      .pipe(
        catchError(this.handleError<RlContato[]>(`getContatosByCadastroNacional id=${cadastroNacionalId}`, []))
      );
  }

  adicionarContato(contato: RlContato): Observable<RlContato> {
    // For demo purposes
    if (!contato.PK_RLCONTATO) {
      contato.PK_RLCONTATO = this.contatos.length > 0 ?
        Math.max(...this.contatos.map(c => c.PK_RLCONTATO || 0)) + 1 : 1;
    }

    this.contatos.push({ ...contato });
    return of(contato);

    // Actual implementation would use HTTP
    // return this.http.post<RlContato>(this.apiUrl, contato)
    //   .pipe(
    //     catchError(this.handleError<RlContato>('adicionarContato'))
    //   );
  }

  atualizarContato(contato: RlContato): Observable<RlContato> {
    // For demo purposes
    const index = this.contatos.findIndex(c => c.PK_RLCONTATO === contato.PK_RLCONTATO);
    if (index !== -1) {
      this.contatos[index] = { ...contato };
      return of(contato);
    }

    // Actual implementation would use HTTP
    // const url = `${this.apiUrl}/${contato.PK_RLCONTATO}`;
    // return this.http.put<RlContato>(url, contato)
    //   .pipe(
    //     catchError(this.handleError<RlContato>('atualizarContato'))
    //   );
    return of(contato);
  }

  desativarContato(id: number): Observable<any> {
    // For demo purposes
    const index = this.contatos.findIndex(c => c.PK_RLCONTATO === id);
    if (index !== -1) {
      this.contatos[index].ST_CONTATO_ATIVO = 'N';
      this.contatos = this.contatos.filter(c => c.PK_RLCONTATO !== id);
      return of({ success: true });
    }

    // Actual implementation would use HTTP
    // const url = `${this.apiUrl}/${id}`;
    // return this.http.delete<any>(url)
    //   .pipe(
    //     catchError(this.handleError<any>('desativarContato'))
    //   );
    return of({ success: false });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}