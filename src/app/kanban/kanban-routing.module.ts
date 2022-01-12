import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KanbanModule } from './kanban.module';

const routes: Routes = [
  {
    path: '',
    component: KanbanModule,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KanbanRoutingModule { }
