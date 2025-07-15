import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RepresentanteTecnico } from '../interfaces_crud/representante-tecnico.interface';
import { EnvironmentService } from './environment.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class RepresentanteTecnicoService {
  readonly utilSrv: UtilService = inject(UtilService);
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

    // Keep representanteTecnicoAtual synchronized with BehaviorSubject
    this.representanteTecnicoSubject.subscribe(representante => {
      this.representanteTecnicoAtual[0] = representante;
    });
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
  updateRepresentanteTecnico(index: number): void {
    this.representanteTecnicoAtual[index].ativo = 'S';
    this.representanteTecnicoAtual[index].dataAtualizacao = new Date().toISOString();
    this.representanteTecnicoAtual[index].cadastroNacionalId = this.representanteTecnicoAtual[index].cadastroNacionalId || 0;
    this.representanteTecnicoAtual[index].dataNascimento = this.representanteTecnicoAtual[index].dataNascimento || new Date('1900-01-01').toISOString();
    this.representanteTecnicoAtual[index].cpf = this.representanteTecnicoAtual[index].cpf || '0';
    if (index === 1) {
      const firstId = this.representanteTecnicoAtual[0]?.id;
      this.representanteTecnicoAtual[1].principal =
        firstId === 0 || firstId == null ? 0 : firstId;
    }

    const { id, ...representanteSemId } = this.representanteTecnicoAtual[index];
    try {
      if (this.representanteTecnicoAtual[index].id === undefined || this.representanteTecnicoAtual[index].id === 0) {
        try {
          this.http.post<RepresentanteTecnico>(this.utilSrv.getApiBaseUrl('representantes-tecnicos'), representanteSemId)
            .subscribe(representante => {
              this.representanteTecnicoSubject.next(representante);
              console.log('Representante técnico criado:', representante);
            })
        } catch (error) {
          console.log(error);
        }
      } else {
        const url = `${this.utilSrv.getApiBaseUrl('representantes-tecnicos')}`;
        try {
          this.http.put<RepresentanteTecnico>(url, this.representanteTecnicoAtual[index])
            .subscribe(representante => {
              this.representanteTecnicoSubject.next(representante);
              console.log('Representante técnico atualizado:', representante);
            })
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      this.utilSrv.showError('Erro ao atualizar representante técnico', 'Por favor, tente novamente mais tarde.');
      console.error('Erro ao atualizar representante técnico:', error);
    }
    // }
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