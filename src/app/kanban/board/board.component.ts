import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Board, Task } from '../board.model';
import { BoardService } from '../board.service';
import { TaskDialogComponent } from '../dialogs/task-dialog.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  // the ! after the property name tells TS we will have a value
  @Input() board!: Board;
  defaultLabelColor = 'purple';

  constructor(private boardService: BoardService, private dialog: MatDialog) {}

  ngOnInit(): void {}

  taskDrop(event: CdkDragDrop<string[]>) {
    const { id, tasks } = this.board;
    /*
      Since 'id' and 'tasks' are typed as 'Optional' on 'Board' Interface
      we must ensure they exist before we use values
    */
    if (id && tasks) {
      moveItemInArray(tasks, event.previousIndex, event.currentIndex);
      this.boardService.updateTasks(id, tasks);
    }
  }

  openTaskDialog(task?: Task, index?: number) {
    const newTask = { label: this.defaultLabelColor };
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: task
        ? { task: { ...task }, isNew: false, boardId: this.board.id, index }
        : { task: newTask, isNew: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      const { id, tasks = [] } = this.board;
      if (result && id) {
        if (result.isNew) {
          this.boardService.updateTasks(id, [...tasks, result.task]);
        } else {
          tasks.splice(result.index, 1, result.task);
          this.boardService.updateTasks(id, tasks);
        }
      }
    });
  }
}
