import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';

import { take, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { userAuthSelector } from '@app/store/user-auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(userAuthSelector.selectGetUserAuthId).pipe(
      take(1),
      tap((loggedIn) => {
        if (!loggedIn) {
          this.router.navigate(['/login']);
        }
      }),
      map((user) => {
        if (!!user) {
          return true;
        }
        return false;
      })
    );
  }
}
