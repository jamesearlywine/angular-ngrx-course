


import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of} from "rxjs";
import {Lesson} from "../model/lesson";
import {CoursesService} from "./courses.service";
import {catchError, finalize, tap} from 'rxjs/operators';
import { AppState } from "@app/reducers";
import { Store, Action } from "@ngrx/store";
import { PageQuery, LessonsPageRequested } from "../course.actions";
import * as fromCourses from '../course.selectors';



export class LessonsDataSource implements DataSource<Lesson> {

    private lessonsSubject = new BehaviorSubject<Lesson[]>([]);

    constructor(
      private store: Store<AppState>
    ) {

    }

    loadLessons(courseId: number, pageQuery: PageQuery) {
      this.store
        .select(fromCourses.selectLessonsPage(courseId, pageQuery))
        .pipe(
          tap(lessons => {
            if (lessons.length > 0) {
              this.lessonsSubject.next(lessons);
            } else {
              this.store.dispatch(new LessonsPageRequested({courseId, page: pageQuery}));
            }
          }),
          catchError(err => of([]))
        )
        .subscribe(

        )
      ;
    }

    connect(collectionViewer: CollectionViewer): Observable<Lesson[]> {
        console.log("Connecting data source");
        return this.lessonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.lessonsSubject.complete();
    }

}

