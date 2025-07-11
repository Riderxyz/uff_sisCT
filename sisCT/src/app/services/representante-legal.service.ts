import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RepresentanteLegalInterface } from '../interface/representanteLegal.interface';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class RepresentanteLegalService {
  private apiUrl: string;
  representanteAtual!: RepresentanteLegalInterface;
  // Updated BehaviorSubject with new interface structure
  representanteSubject = new BehaviorSubject<RepresentanteLegalInterface>({
    id: undefined,
    nome: 'Nilton',
    terminoMandato: '',
    papelDiretoria: '',
    outrosPapeis: '',
    dataNascimento: '',
    cpf: '',
    escolaridade: '',
    profissao: '',
    ativo: 'S',
    dataAtualizacao: new Date().toISOString(),
    cadastroNacionalId: 0,
    telefone: '',
    email: '',
    cursoProfissao: '',
    seuPapelnaMatriz: ''
  });

  public representante$ = this.representanteSubject.asObservable();

  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService
  ) {
    this.apiUrl = `${this.environmentService.apiUrl}/representante-legal`;

    // Initialize representanteAtual with the initial value
    this.representanteAtual = this.representanteSubject.getValue();

    // Keep representanteAtual synchronized with BehaviorSubject
    this.representanteSubject.subscribe(representante => {
      // this.representanteAtual = representante;
    });
  }

  getCurrentRepresentante(): RepresentanteLegalInterface {
    this.representanteAtual = this.representanteSubject.getValue();
    this.representanteAtual.nome = 'mmmmm';
    return this.representanteAtual;// this.representanteSubject.getValue();
  }

  updateRepresentante(): void {
    const current = this.representanteSubject.getValue();
    this.representanteAtual = current;
    //this.representanteSubject.next({ ...current, ...representante });
    // AQUI VOU CHAMAR O METODO DE UPDATE NO BACKEND
  }

  resetRepresentante(): void {
    this.representanteSubject.next({
      id: undefined,
      nome: 'NILTON',
      terminoMandato: '2015',
      papelDiretoria: '',
      outrosPapeis: '',
      dataNascimento: '',
      cpf: '',
      escolaridade: '',
      profissao: '',
      ativo: 'S',
      dataAtualizacao: new Date().toISOString(),
      cadastroNacionalId: 0,
      telefone: '',
      email: '',
      cursoProfissao: '',
      seuPapelnaMatriz: ''
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

  getByCadastroNacional(cadastroNacionalId: number): Observable<RepresentanteLegalInterface[]> {
    const url = `${this.apiUrl}/cadastro/${cadastroNacionalId}`;
    return this.http.get<RepresentanteLegalInterface[]>(url)
      .pipe(
        catchError(this.handleError<RepresentanteLegalInterface[]>(`getByCadastroNacional id=${cadastroNacionalId}`, []))
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