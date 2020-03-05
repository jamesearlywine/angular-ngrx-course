import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CourseActions } from "./action-types";
import { CoursesService } from "./services/courses.service";
import { allCoursesLoaded } from "./course.actions";
import { concatMap, map } from "rxjs/operators";

@Injectable()
export class CoursesEffects {

  loadCourses$ = createEffect(
    () => this.actions$.pipe(
      ofType(CourseActions.loadAllCourses),
      concatMap(action => this.coursesService.findAllCourses()),
      map(courses => allCoursesLoaded({courses}))
    )
  );

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService
  ) {}

}
