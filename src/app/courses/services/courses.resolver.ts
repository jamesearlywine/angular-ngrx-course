import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of, Observable } from 'rxjs';
import { CourseEntityService } from './course-entity.service';
import { map } from 'rxjs/operators';

@Injectable()
export class CoursesResolver implements Resolve<boolean> {

  constructor(
    private coursesService: CourseEntityService
  ) {}


  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.coursesService.getAll().pipe(
      map(courses => !!courses)
    );
  }

}
