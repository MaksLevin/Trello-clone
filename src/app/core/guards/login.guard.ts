import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { take, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user.pipe(
      take(1),
      tap((loggedIn) => {
        if (loggedIn) {
          this.router.navigate(['/dashboard']);
        }
      }),
      map((user) => !user)
    );
  }
}
