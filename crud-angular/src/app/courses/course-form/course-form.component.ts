import { Component, OnInit } from '@angular/core';
import { FormBuilder, NonNullableFormBuilder, Validators} from '@angular/forms';
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
    name: ['', [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)]],
    category: ['',[Validators.required]]
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

   getErrorMessage(fieldName: string ){
    const field = this.form.get(fieldName);

    if (field?.hasError('minlength')) {
      const requeridLength = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho mínimo precisa ser de ${requeridLength} caracteres`;
    }
    if (field?.hasError('maxlength')) {
      const requeridLength = field.errors ? field.errors['maxlength']['requiredLength'] : 200;
      return `Tamanho máximo  excedido de ${requeridLength} caracteres`;
    }

    return 'Campo Inválido'
  }

}
