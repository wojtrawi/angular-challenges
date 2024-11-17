import { inject } from '@angular/core';
import { randText } from '@ngneat/falso';
import { tapResponse } from '@ngrx/operators';
import { signalStore, withMethods } from '@ngrx/signals';
import { EntityId } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map, mergeMap, Observable, OperatorFunction, pipe, tap } from 'rxjs';
import { withCallState } from './call-state';
import { TodoListStore } from './todo-list.store';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

export const TodoItemStore = signalStore(
  withCallState(),
  withMethods((store) => ({
    _entityRequest<TEntity extends { id: EntityId }, TResponse>(
      requestFactory: (entity: TEntity) => Observable<TResponse>,
      onSuccess: (response: TResponse) => void,
    ): OperatorFunction<TEntity, TResponse> {
      return pipe(
        tap(() => store._setLoading()),
        mergeMap((entity) =>
          requestFactory(entity).pipe(
            tapResponse({
              next: (entity) => {
                onSuccess(entity);
                store._setLoaded();
              },
              error: () => store._setError('Request failed'),
            }),
          ),
        ),
      );
    },
  })),
  withMethods(
    (
      store,
      todoListStore = inject(TodoListStore),
      todoService = inject(TodoService),
    ) => ({
      updateOne: rxMethod<Todo>(
        store._entityRequest(
          (todo) => todoService.updateOne({ ...todo, title: randText() }),
          (todo) => todoListStore.updateOne(todo),
        ),
      ),
      removeOne: rxMethod<Todo>(
        store._entityRequest(
          (todo) => todoService.deleteOne(todo.id).pipe(map(() => todo)),
          (todo) => todoListStore.removeOne(todo.id),
        ),
      ),
    }),
  ),
);
