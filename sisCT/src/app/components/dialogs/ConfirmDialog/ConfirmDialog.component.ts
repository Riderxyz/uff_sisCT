import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogData } from '../../../interface/confirmDialogData.interface';

@Component({
  selector: 'app-ConfirmDialog',
  templateUrl: './ConfirmDialog.component.html',
  standalone: false,
  styleUrls: ['./ConfirmDialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) { }

  ngOnInit() {
  }

}
