import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { BoardsService } from '@app/core/services';
import { List } from '../core/models/listModel';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  mainBoardId!: string;
  routeSubscription: Subscription;
  listForm!: FormGroup;
  lists$!: Observable<List[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private boardService: BoardsService
  ) {
    this.routeSubscription = this.route.params.subscribe(
      (params) => (this.mainBoardId = params['id'])
    );
  }

  switchToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  deleteList(listId: string): Promise<void> {
    return this.boardService.deleteList(listId);
  }

  saveEditableListTitle({
    listId,
    titleValue,
  }: {
    listId: string;
    titleValue: string;
  }): Promise<void> {
    return this.boardService.updateListTitle(listId, titleValue);
  }

  async createNewList(): Promise<void> {
    const pushId = this.boardService.getPushId();

    const list: List = {
      id: pushId,
      mainBoardId: this.mainBoardId,
      title: this.listForm.get('title')!.value,
      createdOn: new Date(),
    };

    await this.boardService.createNewList(list, pushId);

    this.listForm.reset();
  }

  async getLists(): Promise<void> {
    this.lists$ = this.boardService.getLists(this.mainBoardId);
  }

  ngOnInit(): void {
    this.initMainBoardsForm();
    this.getLists();
  }

  private initMainBoardsForm(): void {
    this.listForm = new FormGroup(
      {
        title: new FormControl('', [Validators.required]),
      },
      { updateOn: 'blur' }
    );
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
