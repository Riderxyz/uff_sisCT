import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RepresentanteLegalInterface } from '../interface/representanteLegal.interface';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class RepresentanteLegalService {
  private apiUrl: string;
  
  // BehaviorSubject to store and share the current representante legal
  private representanteSubject = new BehaviorSubject<RepresentanteLegalInterface>({
    nome: '',
    anoDeTerminoDeMandato: '',
    cpf: '',
    dataDeNascimento: '',
    escolaridade: '',
    cursoProfissao: '',
    telefone: '',
    seuPapelnaMatriz: '',
    email: ''
  });
  
  // Observable to expose the representante legal instance
  public representante$ = this.representanteSubject.asObservable();

  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService
  ) {
    this.apiUrl = `${this.environmentService.apiUrl}/representante-legal`;
  }
  
  // Get the current representante legal instance
  getCurrentRepresentante(): RepresentanteLegalInterface {
    return this.representanteSubject.getValue();
  }
  
  // Update the current representante legal instance
  updateRepresentante(representante: Partial<RepresentanteLegalInterface>): void {
    const current = this.representanteSubject.getValue();
    this.representanteSubject.next({ ...current, ...representante });
  }
  
  // Reset the representante legal instance to default values
  resetRepresentante(): void {
    this.representanteSubject.next({
      nome: '',
      anoDeTerminoDeMandato: '',
      cpf: '',
      dataDeNascimento: '',
      escolaridade: '',
      cursoProfissao: '',
      telefone: '',
      seuPapelnaMatriz: '',
      email: ''
    });
  }

  // CRUD operations
  getAll(): Observable<RepresentanteLegalInterface[]> {
    return this.http.get<RepresentanteLegalInterface[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<RepresentanteLegalInterface[]>('getAll', []))
      );
  }

  getById(id: number): Observable<RepresentanteLegalInterface> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<RepresentanteLegalInterface>(url)
      .pipe(
        catchError(this.handleError<RepresentanteLegalInterface>(`getById id=${id}`))
      );
  }

  create(representante: RepresentanteLegalInterface): Observable<RepresentanteLegalInterface> {
    return this.http.post<RepresentanteLegalInterface>(this.apiUrl, representante)
      .pipe(
        catchError(this.handleError<RepresentanteLegalInterface>('create'))
      );
  }

  update(id: number, representante: RepresentanteLegalInterface): Observable<RepresentanteLegalInterface> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<RepresentanteLegalInterface>(url, representante)
      .pipe(
        catchError(this.handleError<RepresentanteLegalInterface>('update'))
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