import { Component } from '@angular/core';
import { TodoListComponent } from './todos/todo-list.component';

@Component({
  standalone: true,
  imports: [TodoListComponent],
  selector: 'app-root',
  template: `
    <app-todo-list />
  `,
})
export class AppComponent {}
