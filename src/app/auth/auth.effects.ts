import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Login, AuthActionTypes, Logout } from './auth.actions';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { defer, of } from 'rxjs';



@Injectable()
export class AuthEffects {

  @Effect({dispatch: false})
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LoginAction),
    tap(action => {
      if (action.payload.user) {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      }
    })
  );

  @Effect({dispatch: false})
  logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.LogoutAction),
    tap(action => {
      localStorage.removeItem("user");
      this.router.navigateByUrl("/login");
    })
  );

  @Effect({dispatch: true})
  init$ = defer(() => {
    const userData = localStorage.getItem("user");

    return userData
      ? of(new Login(JSON.parse(userData)))
      : of(new Logout())
    ;
  });

  constructor(
    private actions$: Actions,
    private router: Router
  ) {

  }
}
