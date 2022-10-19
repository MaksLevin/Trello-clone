import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { EditableList } from '@src/app/core/models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() listId!: string;
  @Input() listTitle!: string;

  @Output() deleteList = new EventEmitter<string>();
  @Output() saveEditableListTitle = new EventEmitter<EditableList>();

  @ViewChild('inputTitle') inputTitle!: ElementRef<HTMLInputElement>;

  isTitleEditMode: boolean = false;

  constructor() {}

  toggleTitleEditMode(): void {
    this.isTitleEditMode = true;

    setTimeout(() => {
      this.inputTitle.nativeElement.focus();
    }, 0);
  }

  sendEditableListTitle(listId: string, titleValue: string): void {
    this.isTitleEditMode = false;

    this.saveEditableListTitle.emit({ listId, titleValue });
  }

  deleteListDumb(listId: string): void {
    this.deleteList.emit(listId);
  }

  cancelListEdit(): void {
    this.isTitleEditMode = false;
  }
}
