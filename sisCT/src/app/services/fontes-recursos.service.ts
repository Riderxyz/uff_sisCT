import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FontesRecursos } from '../interfaces_crud/fontes-recursos.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FontesRecursosService {
  private apiUrl = `${environment.apiUrl}/fontes-recursos`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<FontesRecursos[]> {
    return this.http.get<FontesRecursos[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<FontesRecursos[]>('getAll', []))
      );
  }

  getById(id: number): Observable<FontesRecursos> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<FontesRecursos>(url)
      .pipe(
        catchError(this.handleError<FontesRecursos>(`getById id=${id}`))
      );
  }

  getByCadastroNacional(cadastroNacionalId: number): Observable<FontesRecursos[]> {
    const url = `${this.apiUrl}/cadastro/${cadastroNacionalId}`;
    return this.http.get<FontesRecursos[]>(url)
      .pipe(
        catchError(this.handleError<FontesRecursos[]>(`getByCadastroNacional id=${cadastroNacionalId}`, []))
      );
  }

  create(fontesRecursos: FontesRecursos): Observable<FontesRecursos> {
    return this.http.post<FontesRecursos>(this.apiUrl, fontesRecursos)
      .pipe(
        catchError(this.handleError<FontesRecursos>('create'))
      );
  }

  update(fontesRecursos: FontesRecursos): Observable<FontesRecursos> {
    const url = `${this.apiUrl}/${fontesRecursos.PK_FONTES_RECURSOS}`;
    return this.http.put<FontesRecursos>(url, fontesRecursos)
      .pipe(
        catchError(this.handleError<FontesRecursos>('update'))
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