import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RlTipo } from '../interfaces_crud/tipo.interface';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class TipoService {
  private apiUrl: string;
  
  // Default tipo instance for forms
  private tipoSubject = new BehaviorSubject<RlTipo>({
    PK_CADASTRO_NACIONAL: 0,
    PK_TIPO: 1,
    CO_SELECIONADO: 'S',
    ST_ATIVO: 1
  });
  
  // Observable to expose the tipo instance
  public tipo$ = this.tipoSubject.asObservable();
  
  // Sample data for areas de atuação
  private tiposDisponiveis: RlTipo[] = [
    { PK_CADASTRO_NACIONAL: 0, PK_TIPO: 1, CO_SELECIONADO: 'N', ST_ATIVO: 1 },
    { PK_CADASTRO_NACIONAL: 0, PK_TIPO: 2, CO_SELECIONADO: 'N', ST_ATIVO: 1 },
    { PK_CADASTRO_NACIONAL: 0, PK_TIPO: 3, CO_SELECIONADO: 'N', ST_ATIVO: 1 }
  ];

  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService
  ) { 
    this.apiUrl = `${this.environmentService.apiUrl}/tipos`;
  }
  
  // Get the current tipo instance
  getCurrentTipo(): RlTipo {
    return this.tipoSubject.getValue();
  }
  
  // Update the current tipo instance
  updateCurrentTipo(tipo: Partial<RlTipo>): void {
    const current = this.tipoSubject.getValue();
    this.tipoSubject.next({ ...current, ...tipo });
  }
  
  // Reset the tipo instance to default values
  resetCurrentTipo(): void {
    this.tipoSubject.next({
      PK_CADASTRO_NACIONAL: 0,
      PK_TIPO: 1,
      CO_SELECIONADO: 'S',
      ST_ATIVO: 1
    });
  }
  
  // Get all available tipos (areas de atuação)
  getTiposDisponiveis(): RlTipo[] {
    return [...this.tiposDisponiveis];
  }
  
  // Select a tipo by its ID
  selecionarTipo(tipoId: number): void {
    // Reset all tipos to unselected
    this.tiposDisponiveis.forEach(t => t.CO_SELECIONADO = 'N');
    
    // Find and select the requested tipo
    const tipo = this.tiposDisponiveis.find(t => t.PK_TIPO === tipoId);
    if (tipo) {
      tipo.CO_SELECIONADO = 'S';
      this.tipoSubject.next({...tipo});
    }
  }

  getTiposByCadastro(cadastroId: number): Observable<RlTipo[]> {
    // For demo purposes, return local data
    const tiposForCadastro = this.tiposDisponiveis.map(t => ({
      ...t,
      PK_CADASTRO_NACIONAL: cadastroId
    }));
    return of(tiposForCadastro);
    
    // Actual implementation would use HTTP
    // const url = `${this.apiUrl}/cadastro/${cadastroId}`;
    // return this.http.get<RlTipo[]>(url)
    //   .pipe(
    //     catchError(this.handleError<RlTipo[]>(`getTiposByCadastro id=${cadastroId}`, []))
    //   );
  }

  createTipo(tipo: RlTipo): Observable<RlTipo> {
    // For demo purposes
    return of(tipo);
    
    // Actual implementation would use HTTP
    // return this.http.post<RlTipo>(this.apiUrl, tipo)
    //   .pipe(
    //     catchError(this.handleError<RlTipo>('createTipo'))
    //   );
  }

  updateTipo(tipo: RlTipo): Observable<RlTipo> {
    // For demo purposes
    return of(tipo);
    
    // Actual implementation would use HTTP
    // const url = `${this.apiUrl}/${tipo.PK_CADASTRO_NACIONAL}/${tipo.PK_TIPO}`;
    // return this.http.put<RlTipo>(url, tipo)
    //   .pipe(
    //     catchError(this.handleError<RlTipo>('updateTipo'))
    //   );
  }

  deleteTipo(cadastroId: number, tipoId: number): Observable<any> {
    // For demo purposes
    return of({ success: true });
    
    // Actual implementation would use HTTP
    // const url = `${this.apiUrl}/${cadastroId}/${tipoId}`;
    // return this.http.delete<any>(url)
    //   .pipe(
    //     catchError(this.handleError<any>('deleteTipo'))
    //   );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}