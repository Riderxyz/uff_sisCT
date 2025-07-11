import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RepresentanteTecnico } from '../interfaces_crud/representante-tecnico.interface';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class RepresentanteTecnicoService {
  private apiUrl = `${this.environmentService.apiUrl}/representante-tecnico`;
  representanteTecnicoAtual: RepresentanteTecnico[] = [];
  // BehaviorSubject to store and share the current representante tecnico
  private representanteTecnicoSubject = new BehaviorSubject<RepresentanteTecnico>({
    id: 0,
    nome: '',
    dataNascimento: '',
    cpf: '',
    escolaridade: '',
    profissao: '',
    possuiExperiencia: '',
    principal: 0,
    ativo: '',
    dataAtualizacao: '',
    cadastroNacionalId: 0
  });

  // Observable to expose the representante tecnico instance
  public representanteTecnico$ = this.representanteTecnicoSubject.asObservable();

  constructor(private http: HttpClient, private environmentService: EnvironmentService) {
    this.representanteTecnicoAtual[0] = this.representanteTecnicoSubject.getValue();
    this.representanteTecnicoAtual[0].nome = 'Nilton';
    this.representanteTecnicoAtual[1] = this.representanteTecnicoSubject.getValue();
  }

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

  update(): Observable<RepresentanteTecnico> {
    const url = `${this.apiUrl}/${this.representanteTecnicoAtual[0].id}`;
    const ret = this.http.put<RepresentanteTecnico>(url, this.representanteTecnicoAtual[0])
      .pipe(
        catchError(this.handleError<RepresentanteTecnico>('update'))
      );

    if (this.representanteTecnicoAtual[1].id !== 0) {
      this.http.put<RepresentanteTecnico>(url, this.representanteTecnicoAtual[1])
        .pipe(
          catchError(this.handleError<RepresentanteTecnico>('update'))
        );

    }
    return ret;
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
  getCurrentRepresentanteTecnico(): RepresentanteTecnico {
    return this.representanteTecnicoSubject.getValue();
  }

  // Update the current representante tecnico instance
  updateRepresentanteTecnico(): void {
    const current = this.representanteTecnicoSubject.getValue();
    this.representanteTecnicoSubject.next({ ...current, ...this.representanteTecnicoAtual[0] });
    if (this.representanteTecnicoAtual[1].id !== 0) {
      this.representanteTecnicoSubject.next({ ...current, ...this.representanteTecnicoAtual[1] });
    }
  }

  resetRepresentanteTecnico(): void {
    this.representanteTecnicoSubject.next({
      id: 0,
      nome: '',
      dataNascimento: '',
      cpf: '',
      escolaridade: '',
      profissao: '',
      possuiExperiencia: '',
      principal: 0,
      ativo: '',
      dataAtualizacao: '',
      cadastroNacionalId: 0
    });
  }
}