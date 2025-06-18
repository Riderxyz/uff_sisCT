import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AtividadeDesenvolvida, RlAtividadeDesenvolvida } from '../interfaces_crud/atividade-desenvolvida.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AtividadeDesenvolvidaService {
  private apiUrl = `${environment.apiUrl}/atividades-desenvolvidas`;
  private relApiUrl = `${environment.apiUrl}/rel-atividades`;

  constructor(private http: HttpClient) { }

  // Atividades Desenvolvidas
  getAllAtividades(): Observable<AtividadeDesenvolvida[]> {
    return this.http.get<AtividadeDesenvolvida[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<AtividadeDesenvolvida[]>('getAllAtividades', []))
      );
  }

  getAtividadeById(id: number): Observable<AtividadeDesenvolvida> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<AtividadeDesenvolvida>(url)
      .pipe(
        catchError(this.handleError<AtividadeDesenvolvida>(`getAtividadeById id=${id}`))
      );
  }

  createAtividade(atividade: AtividadeDesenvolvida): Observable<AtividadeDesenvolvida> {
    return this.http.post<AtividadeDesenvolvida>(this.apiUrl, atividade)
      .pipe(
        catchError(this.handleError<AtividadeDesenvolvida>('createAtividade'))
      );
  }

  updateAtividade(atividade: AtividadeDesenvolvida): Observable<AtividadeDesenvolvida> {
    const url = `${this.apiUrl}/${atividade.PK_ATIVIDADE_DESENVOLVIDA}`;
    return this.http.put<AtividadeDesenvolvida>(url, atividade)
      .pipe(
        catchError(this.handleError<AtividadeDesenvolvida>('updateAtividade'))
      );
  }

  deleteAtividade(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url)
      .pipe(
        catchError(this.handleError<any>('deleteAtividade'))
      );
  }

  // Relacionamento Atividades Desenvolvidas
  getRelAtividadesByCadastro(cadastroId: number): Observable<RlAtividadeDesenvolvida[]> {
    const url = `${this.relApiUrl}/cadastro/${cadastroId}`;
    return this.http.get<RlAtividadeDesenvolvida[]>(url)
      .pipe(
        catchError(this.handleError<RlAtividadeDesenvolvida[]>(`getRelAtividadesByCadastro id=${cadastroId}`, []))
      );
  }

  createRelAtividade(relAtividade: RlAtividadeDesenvolvida): Observable<RlAtividadeDesenvolvida> {
    return this.http.post<RlAtividadeDesenvolvida>(this.relApiUrl, relAtividade)
      .pipe(
        catchError(this.handleError<RlAtividadeDesenvolvida>('createRelAtividade'))
      );
  }

  updateRelAtividade(relAtividade: RlAtividadeDesenvolvida): Observable<RlAtividadeDesenvolvida> {
    const url = `${this.relApiUrl}/${relAtividade.PK_CADASTRO_NACIONAL}/${relAtividade.PK_ATIVIDADE_DESENVOLVIDA}`;
    return this.http.put<RlAtividadeDesenvolvida>(url, relAtividade)
      .pipe(
        catchError(this.handleError<RlAtividadeDesenvolvida>('updateRelAtividade'))
      );
  }

  deleteRelAtividade(cadastroId: number, atividadeId: number): Observable<any> {
    const url = `${this.relApiUrl}/${cadastroId}/${atividadeId}`;
    return this.http.delete<any>(url)
      .pipe(
        catchError(this.handleError<any>('deleteRelAtividade'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}