import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-task-dialog',
  template: `
    <h1 mat-dialog-title>Task</h1>
    <div mat-dialog-content class="content">
      <mat-form-field>
        <textarea
          matInput
          placeholder="Task description"
          [(ngModel)]="data.task.description"
        ></textarea>
      </mat-form-field>
      <br />
      <mat-button-toggle-group
        #group="matButtonToggleGroup"
        [(ngModel)]="data.task.label"
      >
        <mat-button-toggle *ngFor="let opt of labelOptions" [value]="opt">
          <mat-icon [ngClass]="opt">{{
            opt === 'gray' ? 'check_circle' : 'lens'
          }}</mat-icon>
        </mat-button-toggle>
      </mat-button-toggle-group>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="data" cdkFocusInitial>
        {{ data.isNew ? 'Add Task' : 'Update Task' }}
      </button>
      <app-delete-button *ngIf="!data.isNew" (delete)="deleteTask()">
      </app-delete-button>
    </div>
  `,
  styleUrls: ['./dialog.scss'],
})
export class TaskDialogComponent {
  labelOptions = ['purple', 'blue', 'green', 'yellow', 'red', 'gray'];

  @Output() delete = new EventEmitter<boolean>();

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    private boardService: BoardService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick() {
    this.dialogRef.close();
  }

  deleteTask() {
    this.boardService.removeTask(this.data.boardId, this.data.task);
  }
}
