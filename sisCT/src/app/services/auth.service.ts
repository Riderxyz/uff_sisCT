import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  // Configurações do gov.br obtidas do ambiente
  private govBrConfig = environment.govBrAuth;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Verifica se há um usuário salvo no localStorage ao iniciar o serviço
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  // Getter para obter o usuário atual
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  // Método para iniciar o fluxo de login com gov.br
  loginWithGovBr(): Observable<any> {
    // Construção da URL de autorização do gov.br
    const authUrl = `${this.govBrConfig.authUrl}?response_type=${this.govBrConfig.responseType}&client_id=${this.govBrConfig.clientId}&scope=${this.govBrConfig.scope}&redirect_uri=${encodeURIComponent(this.govBrConfig.redirectUri)}`;
    
    // Em produção, redirecionaríamos o usuário para esta URL
    window.location.href = authUrl;
    
    // Retornamos um observable vazio já que o redirecionamento ocorrerá
    return of(null);
  }

  // Método para processar o callback do gov.br após autenticação
  handleAuthCallback(code: string): Observable<User> {
    // Em um cenário real, trocaríamos o código por um token de acesso
    // Aqui estamos apenas simulando o processo para desenvolvimento
    
    // Para desenvolvimento/demonstração, simulamos um usuário autenticado
    if (environment.production) {
      // Em produção, faríamos a chamada real para a API
      return this.http.post<any>(`${environment.apiUrl}/auth/govbr/callback`, { code }).pipe(
        map(response => {
          const user: User = {
            id: response.id,
            name: response.name,
            email: response.email,
            token: response.token
          };
          
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }),
        catchError(error => {
          return throwError(() => error);
        })
      );
    } else {
      // Para desenvolvimento, simulamos um usuário autenticado
      return of({
        id: '12345',
        name: 'Usuário Teste',
        email: 'usuario@teste.gov.br',
        token: 'mock-jwt-token'
      }).pipe(
        tap(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        })
      );
    }
  }

  // Método para verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }

  // Método para logout
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth']);
  }
}