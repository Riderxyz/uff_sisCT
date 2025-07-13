import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RepresentanteLegalInterface } from '../interface/representanteLegal.interface';
import { EnvironmentService } from './environment.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class RepresentanteLegalService {
  readonly utilSrv: UtilService = inject(UtilService);
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
      this.representanteAtual = representante;
    });
  }

  getCurrentRepresentante(): RepresentanteLegalInterface {
    this.representanteAtual = this.representanteSubject.getValue();
    this.representanteAtual.nome = 'mmmmm';
    return this.representanteAtual;// this.representanteSubject.getValue();
  }

  updateRepresentante(): void {
    this.representanteAtual.ativo = this.representanteAtual.ativo === 'S' ? 'S' : 'N';
    this.representanteAtual.dataAtualizacao = new Date().toISOString();
    this.representanteAtual.terminoMandato = this.representanteAtual.terminoMandato ? this.representanteAtual.terminoMandato + '-01-01' : '';
    this.representanteAtual.cadastroNacionalId = this.representanteAtual.cadastroNacionalId || 0;
    if (this.representanteAtual.cadastroNacionalId != 0) {
      const { id, ...representanteSemId } = this.representanteAtual;
      try {
        if (this.representanteAtual.id === undefined || this.representanteAtual.id === 0) {
          this.http.post<RepresentanteLegalInterface>(this.utilSrv.getApiBaseUrl('representantes-legais'), representanteSemId)
            .subscribe(representante => {
              this.representanteSubject.next(representante);
              console.log('Representante criado:', representante);
            })
        } else {
          const url = `${this.utilSrv.getApiBaseUrl('representantes-legais')}`;
          this.http.put<RepresentanteLegalInterface>(url, this.representanteAtual)
            .subscribe({
              next: (representante) => {
                this.representanteSubject.next(representante);
                console.log('Representante atualizado:', representante);
              },
              error: (err) => {
                console.error('Erro ao atualizar representante:', err);
                // Você pode adicionar mais tratamento de erro aqui, como exibir uma mensagem para o usuário
                // Exemplo:
                // this.snackBar.open('Erro ao atualizar representante', 'Fechar', { duration: 5000 });
              }
            });
        }
      } catch (error) {
        this.utilSrv.showError('Erro ao atualizar representante', 'Por favor, tente novamente mais tarde.');
        console.error('Erro ao atualizar representante:', error);
      }
    }
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