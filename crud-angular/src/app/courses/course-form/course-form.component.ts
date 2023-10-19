import { Component, OnInit } from '@angular/core';
import { FormBuilder, NonNullableFormBuilder} from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Location} from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form = this.formBiulder.group({
    _id: [''],
    name: [''],
    category: ['']
  });

  constructor (private formBiulder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute){

   }

   ngOnInit(): void {
      const course: Course = this.route.snapshot.data['course'];
      this.form.setValue({
        _id: course._id,
        name: course.name,
        category: course.category
      })
   }

   onSubmit() {
    this.service.save(this.form.value).subscribe(result => this.onSuccess(), error => {
      this.onError()
    })
   }

   onCancel() {
    this.location.back();
   }

   private onSuccess() {
    this.snackBar.open('Curso salvo com sucesso',' ', {duration: 3000});
    this.onCancel();
   }

   onError() {
    this.snackBar.open('Erro ao salvar curso',' ', {duration: 3000})
   }

}
