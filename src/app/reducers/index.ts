import {
  ActionReducerMap,
  MetaReducer,

} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAuth from '@app/auth/auth.reducer';
import { storeFreeze } from 'ngrx-store-freeze';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

export interface AppState {
  auth: fromAuth.AuthState;
  router: RouterReducerState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  router: routerReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [ storeFreeze ] : [];
