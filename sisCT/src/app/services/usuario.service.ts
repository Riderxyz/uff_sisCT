// src/app/services/usuario.service.ts

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Usuario } from '../interfaces_crud/usuario.interface';
import { EnvironmentService } from './environment.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  readonly utilSrv: UtilService = inject(UtilService);
  private apiUrl: string;

  // BehaviorSubject to store and share the current usuario
  public usuarioSubject = new BehaviorSubject<Usuario>({
    "id": "TESTE1",
    "dsNometabelaOrigem": "",
    "stDepad": "N",
    "stAtivo": "S",
    "dtUltimaAtualizacao": ""
  });
  usuarioAtual: Usuario = this.usuarioSubject.getValue();

  // Observable to expose the usuario instance
  public usuario$ = this.usuarioSubject.asObservable();

  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService
  ) {
    this.apiUrl = `${this.environmentService.apiUrl}/usuario`;

    // Keep usuarioAtual synchronized with usuarioSubject
    this.usuarioSubject.subscribe(usuario => {
      this.usuarioAtual = usuario;
    });
  }

  // Get the current usuario instance
  getCurrentUsuario(): Usuario {
    return this.usuarioSubject.getValue();
  }

  // Update the current usuario instance
  updateUsuario(): Promise<boolean> {
    const url = this.usuarioAtual.id
      ? `${this.utilSrv.getApiBaseUrl('usuario')}/${this.usuarioAtual.id}`
      : this.utilSrv.getApiBaseUrl('usuario');

    return new Promise<boolean>((resolve) => {
      const request = this.usuarioAtual.id
        ? this.http.put<Usuario>(url, this.usuarioAtual)
        : this.http.post<Usuario>(url, this.usuarioAtual);

      request.subscribe({
        next: (usuario) => {
          this.usuarioSubject.next(usuario);
          console.log('Usuário atualizado:', usuario);
          resolve(true);
        },
        error: (error) => {
          this.utilSrv.showError('Erro ao atualizar usuário', 'Por favor, tente novamente mais tarde.');
          console.error('Erro ao atualizar usuário:', error);
          resolve(false);
        }
      });
    });
  }

  // Reset the usuario instance to default values
  resetUsuario(): void {
    const resetValues: Partial<Usuario> = {
      id: "",
      dsNometabelaOrigem: "",
      stDepad: "N",
      stAtivo: "S",
      dtUltimaAtualizacao: new Date().toISOString()
    };
    this.usuarioSubject.next({ ...this.usuarioSubject.getValue(), ...resetValues });
  }

  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<Usuario[]>('getAll', []))
      );
  }

  getById(id: string): Observable<Usuario> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Usuario>(url)
      .pipe(
        catchError(this.handleError<Usuario>(`getById id=${id}`))
      );
  }

  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario)
      .pipe(
        catchError(this.handleError<Usuario>('create'))
      );
  }

  update(usuario: Usuario): Observable<Usuario> {
    const url = `${this.apiUrl}/${usuario.id}`;
    return this.http.put<Usuario>(url, usuario)
      .pipe(
        catchError(this.handleError<Usuario>('update'))
      );
  }

  delete(id: string): Observable<any> {
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