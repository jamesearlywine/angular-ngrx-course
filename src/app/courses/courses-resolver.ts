import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { Store, select } from "@ngrx/store";
import { tap, first, finalize, filter } from "rxjs/operators";
import { AppState } from "@app/reducers";
import { loadAllCourses } from "./course.actions";
import { Injectable } from "@angular/core";
import { selectAllCoursesLoaded } from "./courses.selectors";

@Injectable()
export class CoursesResolver implements Resolve<any> {

  isLoading = false;

  constructor(
    private store: Store<AppState>
  ) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(selectAllCoursesLoaded),
      tap(isAllCoursesLoaded => {
        if (!this.isLoading && !isAllCoursesLoaded) {
          this.isLoading = true;
          this.store.dispatch(loadAllCourses());
        }
      }),
      filter(coursesLoaded => coursesLoaded),
      first(),
      finalize(() => this.isLoading = false)
    );
  }
}
