import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Course} from "../model/course";
import {CoursesService} from "../services/courses.service";
import {debounceTime, distinctUntilChanged, startWith, tap, delay} from 'rxjs/operators';
import {merge, fromEvent, Observable} from "rxjs";
import {LessonsDataSource} from "../services/lessons.datasource";
import { Store } from '@ngrx/store';
import { AppState } from '@app/reducers';
import { PageQuery, LessonsPageRequested, CourseRequested } from '../course.actions';
import * as fromCourses from '../course.selectors';

@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit, AfterViewInit {

    course: Course;
    dataSource: LessonsDataSource;
    displayedColumns= ["seqNo", "description", "duration"];
    initialPage: PageQuery;
    loading$: Observable<boolean>;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


    constructor(
      private route: ActivatedRoute,
      private store: Store<AppState>
    ) {}

    ngOnInit() {
      this.loading$ = this.store.select(fromCourses.selectLessonsLoading);

      this.course = this.route.snapshot.data["course"];
      this.dataSource = new LessonsDataSource(this.store);

      this.initialPage = {
        pageIndex: 0,
        pageSize: 3
      };

      this.dataSource.loadLessons(this.course.id, this.initialPage);
    }

    ngAfterViewInit() {
      this.paginator.page
        .pipe(
          tap(() => this.loadLessonsPage())
        )
        .subscribe()
      ;
    }

    loadLessonsPage() {
      const newPage = {
        pageIndex: this.paginator.pageIndex,
        pageSize: this.paginator.pageSize
      };

      this.dataSource.loadLessons(this.course.id, newPage);
    }


}
