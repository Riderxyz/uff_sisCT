import { Component, inject, OnInit } from '@angular/core';
import { CentralRxJsService } from '../../services/centralRXJS.service';
import { config } from '../../services/config';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  private centralRxjs = inject(CentralRxJsService);
  constructor() { }

  ngOnInit() {
  }


  openMenu(){
    console.log(1234);

    this.centralRxjs.sendData({ key: config.senderKeys.openMenu, data: { open: true } });
  }
}
