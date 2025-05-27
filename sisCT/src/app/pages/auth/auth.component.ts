import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  loginWithGovBr() {
    this.loading = true;
    this.error = '';
    
    this.authService.loginWithGovBr()
      .subscribe({
        next: () => {
          this.router.navigate(['/starter']);
        },
        error: (err) => {
          this.loading = false;
          this.error = 'Falha na autenticação. Por favor, tente novamente.';
          console.error('Erro de autenticação:', err);
        }
      });
  }
}