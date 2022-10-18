import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() listId!: string;
  @Input() listTitle!: string;

  @Output() deleteList = new EventEmitter();
  @Output() saveEditableListTitle = new EventEmitter();

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
