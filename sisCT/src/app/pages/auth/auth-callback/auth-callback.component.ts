import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-auth-callback',
  template: `<div class="callback-container">
    <mat-spinner></mat-spinner>
    <p>Processando autenticação...</p>
  </div>`,
  styles: [`
    .callback-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    p {
      margin-top: 20px;
      font-size: 16px;
    }
  `]
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Obtém o código de autorização da URL
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      
      if (code) {
        // Processa o código de autorização
        this.authService.handleAuthCallback(code).subscribe({
          next: () => {
            // Redireciona para a página inicial após autenticação bem-sucedida
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/starter';
            this.router.navigateByUrl(returnUrl);
          },
          error: (error) => {
            console.error('Erro ao processar callback de autenticação:', error);
            this.router.navigate(['/auth'], { 
              queryParams: { error: 'auth_failed' } 
            });
          }
        });
      } else {
        // Se não houver código, redireciona para a página de login
        this.router.navigate(['/auth']);
      }
    });
  }
}