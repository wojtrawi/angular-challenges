import { Component, OnInit, inject } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardListItemDirective } from '../../ui/card/card-list-item.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    @let _students = students();

    <app-card [items]="_students" (addOne)="addStudent()">
      <img src="assets/img/student.webp" width="200px" />

      <app-list-item
        *appCardListItem="_students; let item"
        (deleteOne)="deleteStudent(item.id)">
        {{ item.firstName }}
      </app-list-item>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      :host {
        --app-card-bg: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, CardListItemDirective, ListItemComponent],
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  students = this.store.students;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((data) => this.store.addAll(data));
  }

  addStudent() {
    this.store.addOne(randStudent());
  }

  deleteStudent(id: number) {
    this.store.deleteOne(id);
  }
}
