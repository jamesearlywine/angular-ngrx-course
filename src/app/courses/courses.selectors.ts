import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState, selectAll } from './course.reducers';
import { COURSE_CONSTANTS } from './COURSE-CONSTANTS';

export const selectCoursesState = createFeatureSelector<CoursesState>('courses');

export const selectAllCourses = createSelector(
  selectCoursesState,
  selectAll
);

export const selectBeginnerCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.category === COURSE_CONSTANTS.CATEGORIES.BEGINNER)
);

export const selectAdvancedCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.category === COURSE_CONSTANTS.CATEGORIES.ADVANCED)
);

export const selectPromoTotal = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.promo).length
);

export const selectAllCoursesLoaded = createSelector(
  selectCoursesState,
  state => state.allCoursesLoaded
);
