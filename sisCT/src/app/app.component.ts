import { Component, inject } from '@angular/core';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sisCT';
  toastSrv:ToastService = inject(ToastService);
  constructor() {

  }


  showTestingToast() {
    this.toastSrv.showError('qwqw', 'isso é um teste', 600000);
this.toastSrv.showSuccess('qwqw', 'isso é um teste', 600000)
  }
}
