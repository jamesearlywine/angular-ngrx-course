import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import * as moment from "moment";
import { Course } from "../model/course";
import { CoursesService } from "../services/courses.service";
import { Store } from "@ngrx/store";
import { AppState } from "@app/reducers";
import { Update } from "@ngrx/entity";
import { courseUpdated } from "../course.actions";

@Component({
  selector: "course-dialog",
  templateUrl: "./course-dialog.component.html",
  styleUrls: ["./course-dialog.component.css"]
})
export class CourseDialogComponent implements OnInit {
  courseId: number;
  course: Course;

  form: FormGroup;
  description: string;

  constructor(
    private coursesService: CoursesService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: {course: Course, mode: string, dialogTitle: string},
    private store: Store<AppState>
  ) {
    this.course = data.course;

    this.courseId = this.course.id;

    this.description = this.course.description;

    this.form = fb.group({
      description: [this.course.description, Validators.required],
      category: [this.course.category, Validators.required],
      longDescription: [this.course.longDescription, Validators.required],
      promo: [this.course.promo, []]
    });
  }

  ngOnInit() {}

  save() {

    const course: Course = {
      ...this.course,
      ...this.form.value
    };

    const update: Update<Course> = {
      id: course.id,
      changes: course
    };

    this.store.dispatch(courseUpdated({update}));
    this.close();
  }

  close() {
    this.dialogRef.close();
  }
}
