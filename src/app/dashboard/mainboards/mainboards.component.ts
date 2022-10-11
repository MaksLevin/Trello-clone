import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mainboards',
  templateUrl: './mainboards.component.html',
  styleUrls: ['./mainboards.component.scss'],
})
export class MainboardsComponent {
  editBoardId!: string | undefined;

  @Input() board!: any;
  @Input() titleBoard!: FormControl;
  @Input() descriptionBoard!: FormControl;

  @Output() deleteBoard = new EventEmitter<string>();
  @Output() saveEditBoard = new EventEmitter();
  @Output() cancelEditBoard = new EventEmitter();

  isEdit(boardId: string): boolean {
    return this.editBoardId === boardId;
  }

  editBoard(boardId: string): void {
    this.editBoardId = boardId;
  }

  deleteBoardDumb(boardId: string): void {
    this.deleteBoard.emit(boardId);
  }

  saveEditBoardDumb(idBoard: string, title: string, description: string | undefined): void {
    this.editBoardId = undefined;
    this.saveEditBoard.emit({ idBoard, title, description });
  }

  cancelEditBoardDumb(idBoard: string, title: string, description: string | undefined): void {
    this.editBoardId = undefined;
    this.cancelEditBoard.emit({ idBoard, title, description });
  }
  constructor() {}
}
