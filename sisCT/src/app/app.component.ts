import { Component, inject, OnInit } from '@angular/core';
import { ToastService } from './services/toast.service';
import { CentralRxJsService } from './services/centralRXJS.service';
import { config } from './services/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'sisCT';
  toastSrv: ToastService = inject(ToastService);
  showMenu = false;
  private centralRxjs = inject(CentralRxJsService);
  constructor() {}
  ngOnInit(): void {
    this.centralRxjs.dataToReceive.subscribe((data) => {
      if (data.key === config.senderKeys.openMenu) {
        this.showMenu = !this.showMenu;
      }
    });
  }

  showTestingToast() {
    this.toastSrv.showError('qwqw', 'isso é um teste', 600000);
    this.toastSrv.showWarn('qwqw', 'isso é um teste', 600000);
  }
}
