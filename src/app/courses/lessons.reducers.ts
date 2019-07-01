import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Lesson } from './model/lesson';
import { CourseActions, CourseActionTypes } from './course.actions';
import { Statement } from '@angular/compiler';


export interface LessonsState extends EntityState<Lesson> {
  loading: boolean;
}

function sortByCourseAndSeqNo(l1: Lesson, l2: Lesson) {
  const compare = l1.courseId - l2.courseId;

  if (compare !== 0) {
    return compare;
  } else {
    return l1.seqNo - l2.seqNo;
  }
}

export const lessonsAdapter: EntityAdapter<Lesson> = createEntityAdapter<Lesson>({
  sortComparer: sortByCourseAndSeqNo
});
const initialLessonsState: LessonsState = lessonsAdapter.getInitialState({
  loading: false
});

export function lessonsReducer(state: LessonsState = initialLessonsState, action: CourseActions ): LessonsState {
  switch (action.type) {
    case CourseActionTypes.LessonsPageRequested: {
      return {
        ...state,
        loading: true
      };
    }
    case CourseActionTypes.LessonsPageLoaded: {
      return lessonsAdapter.addMany(
        action.payload.lessons,
        {
          ...state,
          loading: false
        }
      );
    }
    case CourseActionTypes.LessonsPageCancelled: {
      return {
        ...state,
        loading: false
      };
    }

    default: {
      return state;
    }
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = lessonsAdapter.getSelectors();
