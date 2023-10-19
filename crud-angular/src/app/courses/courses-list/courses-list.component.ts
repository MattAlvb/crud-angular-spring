import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../model/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {

  @Input() courses: Course[] = [];
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  readonly displayedColumns = ['name', 'category', 'actions'];

  constructor(

  ) { }

  onEdit(course: Course) {
    this.edit.emit(course);
  }
  onDelete(course: Course) {
    this.remove.emit(course);
  }
}
