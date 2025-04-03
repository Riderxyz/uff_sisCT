import { Component, OnInit, inject } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-starter',
  standalone: false,
  templateUrl: './starter.component.html',
  styleUrl: './starter.component.scss',
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(180deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class StarterComponent implements OnInit {

  utilSrv = inject(UtilService)
  flip: string = 'inactive';

  constructor() { }

  ngOnInit() {

    // this.toastSrv.showError('qwqw', 'isso é um teste', 600000);
    // this.toastSrv.showWarn('qwqw', 'isso é um teste', 600000);
  }

  onCtCadastro() {
  }

  onCtContratos() {

    this.utilSrv.showInfo('Ainda em desenvolvimento', '', 5000);
  }

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }




}
