import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { Store } from "@ngrx/store";
import { tap, first, finalize } from "rxjs/operators";
import { AppState } from "@app/reducers";
import { loadAllCourses } from "./course.actions";
import { Injectable } from "@angular/core";

@Injectable()
export class CoursesResolver implements Resolve<any> {

  loading = false;

  constructor(
    private store: Store<AppState>
  ) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      tap(() => {
        if (!this.loading) {
          this.loading = true;
          this.store.dispatch(loadAllCourses());
        }
      }),
      first(),
      finalize(() => this.loading = false)
    );
  }
}
