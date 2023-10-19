import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crud-angular';

  @Output() add = new EventEmitter(false);

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onAdd() {
    this.router.navigate(['courses/new'], {relativeTo: this.route});
  }
  onHome() {
    this.router.navigate([''])
  }

}
