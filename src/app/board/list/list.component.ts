import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { List } from '@src/app/core/models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() listId!: string;
  @Input() listTitle!: string;

  @Output() deleteList = new EventEmitter<string>();
  @Output() saveEditableListTitle = new EventEmitter<Partial<List>>();

  @ViewChild('inputTitle') inputTitle!: ElementRef<HTMLInputElement>;

  isTitleEditMode: boolean = false;

  constructor() {}

  toggleTitleEditMode(): void {
    this.isTitleEditMode = true;

    setTimeout(() => {
      this.inputTitle.nativeElement.focus();
    }, 0);
  }

  sendEditableListTitle(id: string, title: string): void {
    this.isTitleEditMode = false;

    this.saveEditableListTitle.emit({ id, title });
  }

  deleteListDumb(listId: string): void {
    this.deleteList.emit(listId);
  }

  cancelListEdit(): void {
    this.isTitleEditMode = false;
  }
}
