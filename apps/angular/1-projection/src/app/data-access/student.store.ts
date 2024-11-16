import { Injectable, signal } from '@angular/core';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentStore {
  private _students = signal<Student[]>([]);
  public readonly students = this._students.asReadonly();

  addAll(students: Student[]) {
    this._students.set(students);
  }

  addOne(student: Student) {
    this._students.update((students) => [...students, student]);
  }

  deleteOne(id: number) {
    this._students.update((students) =>
      students.filter((student) => student.id !== id),
    );
  }
}
