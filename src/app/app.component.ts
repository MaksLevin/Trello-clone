import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { userAuthSelector } from './store/user-auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Trello-clone';

  constructor(private store: Store) {}

  isHeaderVisibility$ = this.store
    .select(userAuthSelector.selectGetUserAuthId)
    .pipe((id) => !!id as unknown as Observable<boolean>);
}
