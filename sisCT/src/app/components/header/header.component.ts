import { Component, inject, OnInit } from '@angular/core';
import { CentralRxJsService } from '../../services/centralRXJS.service';
import { config } from '../../services/config';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  private centralRxjs = inject(CentralRxJsService);
  authService = inject(AuthService);
  
  constructor() { }

  ngOnInit() {
  }

  openMenu(){
    console.log(1234);
    this.centralRxjs.sendData({ key: config.senderKeys.openMenu, data: { open: true } });
  }
  
  logout() {
    this.authService.logout();
  }
}