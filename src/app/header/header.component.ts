import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService } from '@app/core/services';
import { User } from '@app/core/models';
import { userAuthSelector } from '@app/store/user-auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user$: Observable<User> | undefined = this.store.select(userAuthSelector.selectGetUserAuth);

  constructor(private auth: AuthService, private router: Router, private store: Store) {}

  switchToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  async logout(): Promise<void> {
    await this.auth.signOut();
    this.router.navigate(['/login']);
  }
}
