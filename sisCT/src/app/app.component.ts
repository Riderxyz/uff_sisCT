import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showHeader = true;
  showSidebar = true;
  showFooter = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Não mostrar header, sidebar e footer na página de autenticação
      this.showHeader = !event.url.includes('/auth');
      this.showSidebar = !event.url.includes('/auth');
      this.showFooter = !event.url.includes('/auth');
    });
  }
}