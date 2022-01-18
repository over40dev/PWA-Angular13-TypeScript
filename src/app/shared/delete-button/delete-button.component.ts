import { Component, Output, EventEmitter } from '@angular/core';

/**
 * The delete button component is just UI (dumb component), meaning it only emits an event with the user’s delete intention. The parent component handles the actual database write.
 */
@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss'],
})
export class DeleteButtonComponent {
  canDelete: boolean = false;

  @Output() delete = new EventEmitter<boolean>();

  constructor() {}

  prepareForDelete() {
    this.canDelete = true;
  }

  cancel() {
    this.canDelete = false;
  }

  deleteBoard() {
    this.delete.emit(true);
    this.canDelete = false;
  }
}
