import { Course } from "./model/course";
import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { CourseActions } from "./action-types";


export interface CoursesState extends EntityState<Course> {

}

export const adapter = createEntityAdapter<Course>();

export const initialCoursesState = adapter.getInitialState();

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CourseActions.allCoursesLoaded,
    (state, action) => adapter.addAll(action.courses, state)
  )
);



