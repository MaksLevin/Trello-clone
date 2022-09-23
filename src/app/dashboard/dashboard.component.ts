import { Component, OnInit } from '@angular/core';
import { IUser } from '@app/core/models/user';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectGetUserAuthBoard } from '@app/store/user-auth/user-auth.selector';
import { IMainBoard } from '@app/core/models/mainBoard';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  boards: Observable<any> | undefined = this.store.select(
    selectGetUserAuthBoard
  );
  mainBoardsForm!: FormGroup;

  constructor(private store: Store) {}

  async createNewBoard(): Promise<void> {
    const mainBoard: IMainBoard = {
      boards: [
        {
          id: '',
          title: this.mainBoardsForm.get('title')!.value,
          description: this.mainBoardsForm.get('description')!.value,
          createdOn: new Date(),
        },
      ],
    };
  }

  ngOnInit(): void {
    this.initMainBoardsForm();
  }

  private initMainBoardsForm(): void {
    this.mainBoardsForm = new FormGroup(
      {
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
      },
      { updateOn: 'blur' }
    );
  }
}
