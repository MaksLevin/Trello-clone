import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import { MainBoard } from '@app/core/models';

@Component({
  selector: 'app-main-boards',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './main-boards.component.html',
  styleUrls: ['./main-boards.component.scss'],
})
export class MainBoardsComponent {
  @Input() boardId!: string;
  @Input() boardTitle!: string;
  @Input() boardDescription!: string | undefined;
  @Input() isTitleEditMode!: boolean;
  @Input() isDescriptionEditMode!: boolean;

  @Output() deleteBoard = new EventEmitter<string>();
  @Output() switchToBoard = new EventEmitter<string>();
  @Output() setTitleEditMode = new EventEmitter<string>();
  @Output() setDescriptionEditMode = new EventEmitter<string>();
  @Output() saveEditableBoardTitle = new EventEmitter<Partial<MainBoard>>();
  @Output() saveEditableBoardDescription = new EventEmitter<Partial<MainBoard>>();

  @ViewChild('inputTitle') inputTitle!: ElementRef<HTMLInputElement>;
  @ViewChild('inputDescription') inputDescription!: ElementRef<HTMLInputElement>;

  toggleTitleEditMode(boardId: string): void {
    this.setTitleEditMode.emit(boardId);

    setTimeout(() => {
      this.inputTitle.nativeElement.focus();
    }, 0);
  }

  toggleDescriptionEditMode(boardId: string): void {
    this.setDescriptionEditMode.emit(boardId);

    setTimeout(() => {
      this.inputDescription.nativeElement.focus();
    }, 0);
  }

  getDeletedBoardId(boardId: string): void {
    this.deleteBoard.emit(boardId);
  }

  openBoardId(boardId: string): void {
    this.switchToBoard.emit(boardId);
  }

  sendEditableBoardTitle(id: string, title: string): void {
    this.setTitleEditMode.emit('');

    this.saveEditableBoardTitle.emit({ id, title });
  }

  sendEditableBoardDescription(id: string, description: string | undefined): void {
    this.setDescriptionEditMode.emit('');

    this.saveEditableBoardDescription.emit({ id, description });
  }

  cancelBoardEdit(): void {
    this.isTitleEditMode ? this.setTitleEditMode.emit('') : this.setDescriptionEditMode.emit('');
  }
}
