import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RepresentanteTecnicoInterface } from '../interface/representanteTecnico.interface';
import { RepresentanteTecnico } from '../interfaces_crud/representante-tecnico.interface';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class RepresentanteTecnicoCrudService {
  private apiUrl = `${this.environmentService.apiUrl}/representante-tecnico`;

  // BehaviorSubject to store and share the current representante tecnico
  private representanteTecnicoSubject = new BehaviorSubject<RepresentanteTecnicoInterface>({
    nome: 'Nilton Cesar',
    cpf: '',
    dataDeNascimento: '',
    escolaridade: '',
    cursoProfissao: '',
    telefone: '',
    email: '',
    possuiExperienciaComprovada: false
  });

  // Observable to expose the representante tecnico instance
  public representanteTecnico$ = this.representanteTecnicoSubject.asObservable();

  constructor(private http: HttpClient, private environmentService: EnvironmentService) { }

  getAll(): Observable<RepresentanteTecnico[]> {
    return this.http.get<RepresentanteTecnico[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<RepresentanteTecnico[]>('getAll', []))
      );
  }

  getById(id: number): Observable<RepresentanteTecnico> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<RepresentanteTecnico>(url)
      .pipe(
        catchError(this.handleError<RepresentanteTecnico>(`getById id=${id}`))
      );
  }

  getByCadastroNacional(cadastroNacionalId: number): Observable<RepresentanteTecnico[]> {
    const url = `${this.apiUrl}/cadastro/${cadastroNacionalId}`;
    return this.http.get<RepresentanteTecnico[]>(url)
      .pipe(
        catchError(this.handleError<RepresentanteTecnico[]>(`getByCadastroNacional id=${cadastroNacionalId}`, []))
      );
  }

  create(representanteTecnico: RepresentanteTecnico): Observable<RepresentanteTecnico> {
    return this.http.post<RepresentanteTecnico>(this.apiUrl, representanteTecnico)
      .pipe(
        catchError(this.handleError<RepresentanteTecnico>('create'))
      );
  }

  update(representanteTecnico: RepresentanteTecnico): Observable<RepresentanteTecnico> {
    const url = `${this.apiUrl}/${representanteTecnico.pkRepresentanteTecnico}`;
    return this.http.put<RepresentanteTecnico>(url, representanteTecnico)
      .pipe(
        catchError(this.handleError<RepresentanteTecnico>('update'))
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

  // Get the current representante tecnico instance
  getCurrentRepresentanteTecnico(): RepresentanteTecnicoInterface {
    return this.representanteTecnicoSubject.getValue();
  }

  // Update the current representante tecnico instance
  updateRepresentanteTecnico(representante: Partial<RepresentanteTecnicoInterface>): void {
    const current = this.representanteTecnicoSubject.getValue();
    this.representanteTecnicoSubject.next({ ...current, ...representante });
  }

  // Reset the representante tecnico instance to default values
  resetRepresentanteTecnico(): void {
    this.representanteTecnicoSubject.next({
      nome: '',
      cpf: '',
      dataDeNascimento: '',
      escolaridade: '',
      cursoProfissao: '',
      telefone: '',
      email: '',
      possuiExperienciaComprovada: false
    });
  }
}