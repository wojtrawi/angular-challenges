import { Injectable, signal } from '@angular/core';
import { Teacher } from '../model/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore {
  private _teachers = signal<Teacher[]>([]);
  public readonly teachers = this._teachers.asReadonly();

  addAll(teachers: Teacher[]) {
    this._teachers.set(teachers);
  }

  addOne(teacher: Teacher) {
    this._teachers.update((teachers) => [...teachers, teacher]);
  }

  deleteOne(id: number) {
    this._teachers.update((teachers) =>
      teachers.filter((teacher) => teacher.id !== id),
    );
  }
}
