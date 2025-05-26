import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-termos-de-uso-dialog',
  templateUrl: './termos-de-uso-dialog.component.html',
  styleUrl: './termos-de-uso-dialog.component.scss',
})
export class TermosDeUsoDialogComponent implements OnInit {

  hasUserAccepted: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
