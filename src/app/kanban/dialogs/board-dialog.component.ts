import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-board-dialog',
  template: `
  <h1 mat-dialog-title>Boards</h1>
  <div mat-dialog-content>
    <p>Enter Board Name...</p>
    <mat-form-field>
      <input matInput [(ngModel)]="data.title" placeholder="title">
    </mat-form-field>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()">Cancel</button>
    <button mat-button [mat-dialog-close]="data.title" cdkFocusInitial>Create</button>
  </div>
  `,
  styles: [],
})
export class BoardDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BoardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick() {
    this.dialogRef.close();
  }
}
