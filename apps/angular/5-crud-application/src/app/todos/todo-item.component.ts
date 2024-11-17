import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodoItemStore } from './todo-item.store';
import { Todo } from './todo.model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  providers: [TodoItemStore],
  template: `
    <div class="todo-item" [class.error]="store.error()">
      <span class="title">{{ todo().title }}</span>
      <div class="actions">
        <button [disabled]="store.loading()" (click)="store.updateOne(todo())">
          Update
        </button>
        <button [disabled]="store.loading()" (click)="store.removeOne(todo())">
          Delete
        </button>
        @if (store.loading()) {
          <mat-spinner diameter="20" class="action-spinner" />
        }
      </div>

      @if (store.error(); as error) {
        <div class="error-message">{{ error }}</div>
      }
    </div>
  `,
  styles: [
    `
      .todo-item {
        padding: 12px;
        border: 1px solid #ddd;
        margin: 8px 0;
        border-radius: 4px;

        &.error {
          border-color: #f44336;
        }
      }
      .title {
        font-size: 16px;
      }
      .actions {
        display: flex;
        gap: 8px;
        align-items: center;
        margin-top: 8px;
      }
      .error-message {
        color: #f44336;
        font-size: 12px;
        margin-top: 4px;
      }
      .action-spinner {
        margin-left: 8px;
      }
      button {
        padding: 4px 8px;
      }
    `,
  ],
})
export class TodoItemComponent {
  readonly todo = input.required<Todo>();

  protected readonly store = inject(TodoItemStore);
}
