import { Injectable } from "@angular/core";
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { take, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import * as authSelectors from './auth.selectors';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public store: Store<fromAuth.AuthState>,
    public router: Router
  ) {}

  canActivate(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.select(authSelectors.isLoggedIn)
      .pipe(
        tap(isLoggedIn => {
          if (!isLoggedIn) {
            const canActivate = this.router.navigateByUrl('/login');
          }
        })
      )
      .pipe(take(1))
    ;
  }
}
