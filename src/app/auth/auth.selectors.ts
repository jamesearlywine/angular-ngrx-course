import {createSelector, createFeatureSelector} from '@ngrx/store'
import * as fromAuth from './auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.AuthState>('auth');
export const isLoggedIn = createSelector(
  selectAuthState,
  auth => auth.loggedIn
);
export const isLoggedOut = createSelector(
  isLoggedIn,
  loggedIn => !loggedIn
);
