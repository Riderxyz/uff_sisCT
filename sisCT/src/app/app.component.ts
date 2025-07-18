import { Component, inject, OnInit } from '@angular/core';
import { ToastService } from './services/toast.service';
import { CentralRxJsService } from './services/centralRXJS.service';
import { config } from './services/config';
import {
  collapseOnLeaveAnimation,
  expandOnEnterAnimation,
} from 'angular-animations';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
  animations: [expandOnEnterAnimation(), collapseOnLeaveAnimation()],
})
export class AppComponent implements OnInit {
  title = 'sisCT';
  toastSrv: ToastService = inject(ToastService);
  showMenu = false;
  showHeader = false;
  private centralRxjs = inject(CentralRxJsService);
  private router = inject(Router);
  constructor() {}
  ngOnInit(): void {
    this.centralRxjs.dataToReceive.subscribe((data) => {
      if (data.key === config.senderKeys.openMenu) {
        this.showMenu = !this.showMenu;
      } else if (data.key === config.senderKeys.closeMenu) {
        this.showMenu = false;
      }
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // this.currentRoute = event.urlAfterRedirects; // Captura a URL final
        console.log('Rota atual:', event.urlAfterRedirects);

        if (event.urlAfterRedirects !== '/starter') {
          this.showHeader = true;
        } else {
          this.showHeader = false;
        }
      });
  }

  showTestingToast() {
    /* this.toastSrv.showError('qwqw', 'isso é um teste', 600000);
    this.toastSrv.showWarn('qwqw', 'isso é um teste', 600000);*/
}
}
