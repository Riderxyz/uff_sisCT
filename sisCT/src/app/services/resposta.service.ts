import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RlResposta } from '../interfaces_crud/resposta.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RespostaService {
  private apiUrl = `${environment.apiUrl}/respostas`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<RlResposta[]> {
    return this.http.get<RlResposta[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<RlResposta[]>('getAll', []))
      );
  }

  getById(id: number): Observable<RlResposta> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<RlResposta>(url)
      .pipe(
        catchError(this.handleError<RlResposta>(`getById id=${id}`))
      );
  }

  getByCadastroNacional(cadastroNacionalId: number): Observable<RlResposta[]> {
    const url = `${this.apiUrl}/cadastro/${cadastroNacionalId}`;
    return this.http.get<RlResposta[]>(url)
      .pipe(
        catchError(this.handleError<RlResposta[]>(`getByCadastroNacional id=${cadastroNacionalId}`, []))
      );
  }

  getByPergunta(perguntaId: number): Observable<RlResposta[]> {
    const url = `${this.apiUrl}/pergunta/${perguntaId}`;
    return this.http.get<RlResposta[]>(url)
      .pipe(
        catchError(this.handleError<RlResposta[]>(`getByPergunta id=${perguntaId}`, []))
      );
  }

  create(resposta: RlResposta): Observable<RlResposta> {
    return this.http.post<RlResposta>(this.apiUrl, resposta)
      .pipe(
        catchError(this.handleError<RlResposta>('create'))
      );
  }

  update(resposta: RlResposta): Observable<RlResposta> {
    const url = `${this.apiUrl}/${resposta.PK_RL_RESPOSTA}`;
    return this.http.put<RlResposta>(url, resposta)
      .pipe(
        catchError(this.handleError<RlResposta>('update'))
      );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url)
      .pipe(
        catchError(this.handleError<any>('delete'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}