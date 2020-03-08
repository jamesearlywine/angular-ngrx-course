


import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Course} from "../model/course";
import {Observable} from "rxjs";
import {CoursesService} from "./courses.service";
import { AppState } from "@app/reducers";
import { Store } from "@ngrx/store";
import { tap, first, finalize } from "rxjs/operators";
import { loadAllCourses } from "../course.actions";



@Injectable()
export class CourseResolver implements Resolve<Course> {

    loading = false;

    constructor(
      private store: Store<AppState>
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.store.pipe(
          tap(() => {
            this.loading = true;
            this.store.dispatch(loadAllCourses());
          }),
          first(),
          finalize(() => this.loading = false)
        );
    }

}

