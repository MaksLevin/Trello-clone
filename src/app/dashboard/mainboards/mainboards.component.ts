import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

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

  @Output() deleteBoard = new EventEmitter();
  @Output() switchToBoard = new EventEmitter();
  @Output() saveEditableBoardTitle = new EventEmitter();
  @Output() saveEditableBoardDescription = new EventEmitter();

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

  getDeletedBoardID(boardId: string): void {
    this.deleteBoard.emit(boardId);
  }

  getReferredBoardId(boardId: string): void {
    this.switchToBoard.emit(boardId);
  }

  sendEditableBoardTitle(boardId: string, titleValue: string): void {
    this.isTitleEditMode = false;

    this.saveEditableBoardTitle.emit({ boardId, titleValue });
  }

  sendEditableBoardDescription(boardId: string, descriptionValue: string | undefined): void {
    this.isDescriptionEditMode = false;

    this.saveEditableBoardDescription.emit({ boardId, descriptionValue });
  }

  cancelBoardEdit(): void {
    this.isTitleEditMode = false;
    this.isDescriptionEditMode = false;
  }
}
