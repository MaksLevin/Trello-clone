import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { List } from '@app/core/models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() listId!: string;
  @Input() listTitle!: string;
  @Input() isTitleEditMode!: boolean;

  @Output() deleteList = new EventEmitter<string>();
  @Output() saveEditableListTitle = new EventEmitter<Partial<List>>();
  @Output() setTitleEditMode = new EventEmitter<string>();

  @ViewChild('inputTitle') inputTitle!: ElementRef<HTMLInputElement>;

  toggleTitleEditMode(listId: string): void {
    this.setTitleEditMode.emit(listId);

    setTimeout(() => {
      this.inputTitle.nativeElement.focus();
    }, 0);
  }

  sendEditableListTitle(id: string, title: string): void {
    this.setTitleEditMode.emit('');

    this.saveEditableListTitle.emit({ id, title });
  }

  deleteListDumb(listId: string): void {
    this.deleteList.emit(listId);
  }

  cancelListEdit(): void {
    this.setTitleEditMode.emit('');
  }
}
