import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Board } from '../board.model';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  // the ! after the property name tells TS we will have a value 
  @Input() board!: Board;
  defaultLabelColor = 'gray';

  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
  }

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
}
