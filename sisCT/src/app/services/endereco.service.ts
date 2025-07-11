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

  // BehaviorSubject with the new interface
  private enderecoSubject = new BehaviorSubject<Endereco>({
    id: undefined,
    coEstado: '',
    dsLogradouro: 'teste',
    dsComplemento: '',
    noBairro: '',
    nuNumero: '',
    nuCep: '2155050',
    dtAtualizacao: new Date(),
    stAtivo: '1',
    cadastroNacionalId: 0,
    dsMunicipio: '',
    dsPais: '',
  });

  public endereco$ = this.enderecoSubject.asObservable();

  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService
  ) {
    this.apiUrl = `${this.environmentService.apiUrl}/endereco`;
  }

  getCurrentEndereco(): Endereco {
    return this.enderecoSubject.getValue();
  }

  updateEndereco(endereco: Partial<Endereco>): void {
    const current = this.enderecoSubject.getValue();
    this.enderecoSubject.next({ ...current, ...endereco });

    const updatedEndereco = this.enderecoSubject.getValue();
    if (updatedEndereco.cadastroNacionalId) {
      if (updatedEndereco.id) {
        this.update(updatedEndereco).subscribe();
      } else {
        this.create(updatedEndereco).subscribe(
          (result) => {
            if (result && result.id) {
              this.updateEndereco({ id: result.id });
            }
          }
        );
      }
    }
  }

  loadEnderecoByCadastroNacional(cadastroNacionalId: number): void {
    if (!cadastroNacionalId) return;

    this.updateEndereco({ cadastroNacionalId });

    this.getByCadastroNacional(cadastroNacionalId)
      .subscribe(enderecos => {
        if (enderecos && enderecos.length > 0) {
          const existingEndereco = enderecos[0];
          this.updateEndereco(existingEndereco);
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