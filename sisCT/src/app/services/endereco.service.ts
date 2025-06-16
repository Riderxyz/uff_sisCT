import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Endereco } from '../interfaces_crud/endereco.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  private apiUrl = `${environment.apiUrl}/endereco`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<Endereco[]>('getAll', []))
      );
  }

  getById(id: number): Observable<Endereco> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Endereco>(url)
      .pipe(
        catchError(this.handleError<Endereco>(`getById id=${id}`))
      );
  }

  getByCadastroNacional(cadastroNacionalId: number): Observable<Endereco[]> {
    const url = `${this.apiUrl}/cadastro/${cadastroNacionalId}`;
    return this.http.get<Endereco[]>(url)
      .pipe(
        catchError(this.handleError<Endereco[]>(`getByCadastroNacional id=${cadastroNacionalId}`, []))
      );
  }

  create(endereco: Endereco): Observable<Endereco> {
    return this.http.post<Endereco>(this.apiUrl, endereco)
      .pipe(
        catchError(this.handleError<Endereco>('create'))
      );
  }

  update(endereco: Endereco): Observable<Endereco> {
    const url = `${this.apiUrl}/${endereco.PK_}`;
    return this.http.put<Endereco>(url, endereco)
      .pipe(
        catchError(this.handleError<Endereco>('update'))
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