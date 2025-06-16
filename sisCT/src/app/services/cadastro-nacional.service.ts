import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CadastroNacional } from '../interfaces_crud/cadastro-nacional.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CadastroNacionalService {
  private apiUrl = `${environment.apiUrl}/cadastro-nacional`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<CadastroNacional[]> {
    return this.http.get<CadastroNacional[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<CadastroNacional[]>('getAll', []))
      );
  }

  getById(id: number): Observable<CadastroNacional> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<CadastroNacional>(url)
      .pipe(
        catchError(this.handleError<CadastroNacional>(`getById id=${id}`))
      );
  }

  create(cadastroNacional: CadastroNacional): Observable<CadastroNacional> {
    return this.http.post<CadastroNacional>(this.apiUrl, cadastroNacional)
      .pipe(
        catchError(this.handleError<CadastroNacional>('create'))
      );
  }

  update(cadastroNacional: CadastroNacional): Observable<CadastroNacional> {
    const url = `${this.apiUrl}/${cadastroNacional.PK_CADASTRO_NACIONAL}`;
    return this.http.put<CadastroNacional>(url, cadastroNacional)
      .pipe(
        catchError(this.handleError<CadastroNacional>('update'))
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