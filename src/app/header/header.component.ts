import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService } from '@app/core/services/auth.service';
import { IUser } from '@app/core/models/user';
import { selectGetUserAuth } from '@app/store/user-auth/user-auth.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user: Observable<IUser> | undefined = this.store.select(selectGetUserAuth);

  constructor(
    private auth: AuthService,
    private router: Router,
    private store: Store
  ) {}

  async logout(): Promise<void> {
    await this.auth.signOut();
    this.router.navigate(['/login']);
  }
}
