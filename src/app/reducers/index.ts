import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { User } from '@app/model/user.model';
import { AuthActionTypes } from '@app/auth/auth.actions';
import * as fromAuth from '@app/auth/auth.reducer';
import { storeFreeze } from 'ngrx-store-freeze';
import { Params, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { RouterStateSerializer } from '@ngrx/router-store';

export interface AppState {
  auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [ storeFreeze ] : [];
