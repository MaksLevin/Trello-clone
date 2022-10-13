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
  templateUrl: './mainBoards.component.html',
  styleUrls: ['./mainBoards.component.scss'],
})
export class MainBoardsComponent {
  @Input() boardId!: string;
  @Input() boardTitle!: string;
  @Input() boardDescription!: string | undefined;

  @Output() deleteBoard = new EventEmitter();
  @Output() saveEditBoard = new EventEmitter();

  @ViewChild('inputTitle') inputTitle!: ElementRef<HTMLInputElement>;
  @ViewChild('inputDescription') inputDescription!: ElementRef<HTMLInputElement>;

  isTitleEditMode: boolean = false;
  isDescriptionEditMode: boolean = false;

  constructor() {}

  toggleTitleEditMode(): void {
    this.isTitleEditMode = true;
    this.isDescriptionEditMode = false;

    setTimeout(() => {
      this.inputTitle.nativeElement.focus();
    }, 0);
  }

  toggleDescriptionEditMode(): void {
    this.isTitleEditMode = false;
    this.isDescriptionEditMode = true;

    setTimeout(() => {
      this.inputDescription.nativeElement.focus();
    }, 0);
  }

  deleteBoardDumb(boardId: string): void {
    this.deleteBoard.emit(boardId);
  }

  saveEditBoardDumb(boardId: string, element: string, elementValue: string | undefined): void {
    this.isTitleEditMode = false;
    this.isDescriptionEditMode = false;

    this.saveEditBoard.emit({ boardId, element, elementValue });
  }

  cancelBoardEdit(): void {
    this.isTitleEditMode = false;
    this.isDescriptionEditMode = false;
  }
}
