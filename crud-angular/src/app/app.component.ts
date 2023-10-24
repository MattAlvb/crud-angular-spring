import { Component, EventEmitter, HostBinding, Output, signal} from '@angular/core';



import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'crud-angular';

  isDark : boolean = false;

  @HostBinding('class')
  get themeMode() {
    return this.isDark ? 'theme-dark' : 'theme-light'
  }

  darkMode = signal<boolean>(
    JSON.parse(window.localStorage.getItem('darkMode') ?? 'false')
  );

  @Output() add = new EventEmitter(false);

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  onAdd() {
    this.router.navigate(['courses/new'], {relativeTo: this.route});
  }
  onHome() {
    this.router.navigate([''])
  }

  changeTheme() {
    this.isDark = !this.isDark;
  }
}
