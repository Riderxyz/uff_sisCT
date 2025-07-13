import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Endereco } from '../interfaces_crud/endereco.interface';
import { EnvironmentService } from './environment.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  readonly utilSrv: UtilService = inject(UtilService);
  private apiUrl: string;

  // BehaviorSubject with the new interface
  private enderecoSubject = new BehaviorSubject<Endereco>({
    id: undefined,
    coEstado: '',
    dsLogradouro: '',
    dsComplemento: '',
    noBairro: '',
    nuNumero: '0',
    nuCep: '0',
    dtAtualizacao: new Date(),
    stAtivo: '1',
    cadastroNacionalId: 0,
    dsMunicipio: '',
    dsPais: ''
  });

  enderecoAtual: Endereco = this.enderecoSubject.getValue();

  public endereco$ = this.enderecoSubject.asObservable();

  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService
  ) {
    this.apiUrl = `${this.environmentService.apiUrl}/endereco`;

    // Keep enderecoAtual synchronized with enderecoSubject
    this.enderecoSubject.subscribe(endereco => {
      this.enderecoAtual = endereco;
    });
  }

  getCurrentEndereco(): Endereco {
    return this.enderecoSubject.getValue();
  }

  updateEndereco(): void {
    this.enderecoAtual.nuCep = this.enderecoAtual.nuCep || '0';
    this.enderecoAtual.nuNumero = this.enderecoAtual.nuNumero || '0';
    this.enderecoAtual.dtAtualizacao = new Date();
    this.enderecoAtual.stAtivo = 'S';
    const { id, ...enderecoSemId } = this.enderecoAtual;
    try {
      if (this.enderecoAtual.id === undefined || this.enderecoAtual.id === 0) {

        this.http.post<Endereco>(this.utilSrv.getApiBaseUrl('enderecos'), enderecoSemId)
          .subscribe(endereco => {
            this.enderecoSubject.next(endereco);
            console.log('Endereco criado:', endereco);
          })
      } else {
        const url = `${this.utilSrv.getApiBaseUrl('enderecos')}/${this.enderecoAtual.id}`;
        this.http.put<Endereco>(url, this.enderecoAtual)
          .subscribe(endereco => {
            this.enderecoSubject.next(endereco);
            console.log('Endereco atualizado:', endereco);
          })
      }
    } catch (error) {
      this.utilSrv.showError('Erro ao atualizar endereco', 'Por favor, tente novamente mais tarde.');
      console.error('Erro ao atualizar endereco:', error);
    }
  }

  loadEnderecoByCadastroNacional(cadastroNacionalId: number): void {
    if (!cadastroNacionalId) return;

    this.updateEndereco();

    this.getByCadastroNacional(cadastroNacionalId)
      .subscribe(enderecos => {
        if (enderecos && enderecos.length > 0) {
          const existingEndereco = enderecos[0];
          this.updateEndereco();
        }
      });
  }

  resetEndereco(): void {
    this.enderecoSubject.next({
      id: undefined,
      coEstado: '',
      dsMunicipio: '',
      dsLogradouro: '',
      dsComplemento: '',
      noBairro: '',
      nuNumero: '',
      nuCep: '',
      dtAtualizacao: new Date(),
      stAtivo: '1',
      cadastroNacionalId: 0,
      dsPais: '',
    });
  }

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
    const url = `${this.apiUrl}/${endereco.id}`;
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