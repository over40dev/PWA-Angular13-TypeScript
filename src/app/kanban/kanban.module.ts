import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatDialogModule } from "@angular/material/dialog";
import { KanbanRoutingModule } from './kanban-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BoardListComponent } from './board-list/board-list.component';
import { BoardComponent } from './board/board.component';
import { BoardDialogComponent } from './dialogs/board-dialog.component';


@NgModule({
  declarations: [
    BoardListComponent,
    BoardComponent,
    BoardDialogComponent
  ],
  imports: [
    CommonModule,
    KanbanRoutingModule,
    FormsModule,
    SharedModule,
    DragDropModule,
    MatButtonToggleModule,
    MatDialogModule,
  ]
})
export class KanbanModule { }
