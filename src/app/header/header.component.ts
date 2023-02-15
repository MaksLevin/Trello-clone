import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable } from 'rxjs';

import { AuthService, UploadImageService } from '@app/core/services';
import { User } from '@app/core/models';
import { userAuthSelector } from '@app/store/user-auth';
import * as authActions from '@app/store/user-auth/user-auth.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user$: Observable<User> | undefined = this.store.select(userAuthSelector.selectGetUserAuth);

  constructor(
    private auth: AuthService,
    private uploadImageService: UploadImageService,
    private router: Router,
    private store: Store
  ) {}

  switchToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  async logout(): Promise<void> {
    await this.auth.signOut();
    this.router.navigate(['/login']);
  }

  async getUploadImage(evt: Event): Promise<void> {
    if (this.user$) {
      const user = await firstValueFrom(this.user$);
      this.store.dispatch(
        authActions.updateProfilePhoto({
          profilePhoto: this.uploadImageService.onImageLoad(evt, user.id) as string,
        })
      );
    }
  }
}
