import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodoItemComponent } from './todo-item.component';
import { TodoListStore } from './todo-list.store';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, TodoItemComponent],
  providers: [TodoListStore],
  selector: 'app-todo-list',
  template: `
    @if (store.loading()) {
      <mat-spinner diameter="30" class="spinner"></mat-spinner>
    }

    <div class="todo-list">
      @for (todo of store.entities(); track todo.id) {
        <app-todo-item [todo]="todo" />
      }
    </div>
  `,
  styles: [
    `
      .spinner {
        position: fixed;
        top: 12px;
        left: 50%;
      }
      .todo-list {
        max-width: 600px;
        margin: 0 auto;
        padding: 16px;
      }
    `,
  ],
})
export class TodoListComponent implements OnInit {
  protected readonly store = inject(TodoListStore);

  ngOnInit(): void {
    this.store.getAll();
  }
}
