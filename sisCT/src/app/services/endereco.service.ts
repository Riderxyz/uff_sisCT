import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Endereco } from '../interfaces_crud/endereco.interface';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  private apiUrl: string;

  // BehaviorSubject to store and share the current endereco
  private enderecoSubject = new BehaviorSubject<Endereco>({
    PK_ENDERECO: undefined,
    CO_ESTADO: '',
    DS_LOGRADOURO: 'teste',
    DS_COMPLEMENTO: '',
    NO_BAIRRO: '',
    NU_NUMERO: '',
    NU_CEP: '2155050',
    DT_ATUALIZACAO: new Date(),
    ST_ATIVO: '1',
    PK_CADASTRO_NACIONAL: 0,
    DS_CIDADE: '',
    DS_PAIS: '',
  });

  // Observable to expose the endereco instance
  public endereco$ = this.enderecoSubject.asObservable();

  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService
  ) {
    this.apiUrl = `${this.environmentService.apiUrl}/endereco`;
  }

  // Get the current endereco instance
  getCurrentEndereco(): Endereco {
    return this.enderecoSubject.getValue();
  }

  // Update the current endereco instance
  updateEndereco(endereco: Partial<Endereco>): void {
    const current = this.enderecoSubject.getValue();
    this.enderecoSubject.next({ ...current, ...endereco });

    // If we have a valid cadastro nacional ID, update or create the endereco
    const updatedEndereco = this.enderecoSubject.getValue();
    if (updatedEndereco.PK_CADASTRO_NACIONAL) {
      if (updatedEndereco.PK_ENDERECO) {
        this.update(updatedEndereco).subscribe();
      } else {
        this.create(updatedEndereco).subscribe(
          (result) => {
            if (result && result.PK_ENDERECO) {
              this.updateEndereco({ PK_ENDERECO: result.PK_ENDERECO });
            }
          }
        );
      }
    }
  }

  // Load endereco for a specific cadastro nacional
  loadEnderecoByCadastroNacional(cadastroNacionalId: number): void {
    if (!cadastroNacionalId) return;

    // Update the cadastro nacional ID in the current endereco
    this.updateEndereco({ PK_CADASTRO_NACIONAL: cadastroNacionalId });

    // Try to load existing endereco for this cadastro
    this.getByCadastroNacional(cadastroNacionalId)
      .subscribe(enderecos => {
        if (enderecos && enderecos.length > 0) {
          // Use the first endereco found
          const existingEndereco = enderecos[0];
          this.updateEndereco(existingEndereco);
        }
      });
  }

  // Reset the endereco instance to default values
  resetEndereco(): void {
    this.enderecoSubject.next({
      PK_ENDERECO: undefined,
      CO_ESTADO: '',
      DS_CIDADE: '',
      DS_LOGRADOURO: '',
      DS_COMPLEMENTO: '',
      NO_BAIRRO: '',
      NU_NUMERO: '',
      NU_CEP: '',
      DT_ATUALIZACAO: new Date(),
      ST_ATIVO: '1',
      PK_CADASTRO_NACIONAL: 0,
      DS_PAIS: '',
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
    const url = `${this.apiUrl}/${endereco.PK_ENDERECO}`;
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