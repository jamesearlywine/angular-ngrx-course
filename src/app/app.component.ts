import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "@app/reducers";
import {Observable} from "rxjs";
import { Logout } from './auth/auth.actions';
import { map } from 'rxjs/operators';
import * as authSelectors from './auth/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;

    constructor(
      private store: Store<AppState>
    ) {

    }

    ngOnInit() {
      this.isLoggedIn$ = this.store.select(authSelectors.isLoggedIn);
      this.isLoggedOut$ = this.store.select(authSelectors.isLoggedOut);
    }

    logout() {
      this.store.dispatch(new Logout());
    }


}
