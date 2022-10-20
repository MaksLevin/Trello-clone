import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import { MainBoard } from '@src/app/core/models';

@Component({
  selector: 'app-main-boards',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mainboards.component.html',
  styleUrls: ['./mainboards.component.scss'],
})
export class MainBoardsComponent {
  @Input() boardId!: string;
  @Input() boardTitle!: string;
  @Input() boardDescription!: string | undefined;

  @Output() deleteBoard = new EventEmitter<string>();
  @Output() switchToBoard = new EventEmitter<string>();
  @Output() saveEditableBoardTitle = new EventEmitter<Partial<MainBoard>>();
  @Output() saveEditableBoardDescription = new EventEmitter<Partial<MainBoard>>();

  @ViewChild('inputTitle') inputTitle!: ElementRef<HTMLInputElement>;
  @ViewChild('inputDescription') inputDescription!: ElementRef<HTMLInputElement>;

  isTitleEditMode: boolean = false;
  isDescriptionEditMode: boolean = false;

  constructor() {}

  toggleTitleEditMode(): void {
    this.isTitleEditMode = true;

    setTimeout(() => {
      this.inputTitle.nativeElement.focus();
    }, 0);
  }

  toggleDescriptionEditMode(): void {
    this.isDescriptionEditMode = true;

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
    this.isTitleEditMode = false;

    this.saveEditableBoardTitle.emit({ id, title });
  }

  sendEditableBoardDescription(id: string, description: string | undefined): void {
    this.isDescriptionEditMode = false;

    this.saveEditableBoardDescription.emit({ id, description });
  }

  cancelBoardEdit(): void {
    this.isTitleEditMode = false;
    this.isDescriptionEditMode = false;
  }
}
