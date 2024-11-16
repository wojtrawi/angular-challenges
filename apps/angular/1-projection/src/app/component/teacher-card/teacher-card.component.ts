import { Component, OnInit, inject } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardListItemDirective } from '../../ui/card/card-list-item.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    @let _teachers = teachers();

    <app-card [items]="_teachers" (addOne)="addTeacher()">
      <img src="assets/img/teacher.png" width="200px" />

      <app-list-item
        *appCardListItem="_teachers; let item"
        (deleteOne)="deleteTeacher(item.id)">
        {{ item.firstName }}
      </app-list-item>
    </app-card>
  `,
  styles: [
    `
      :host {
        --app-card-bg: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, CardListItemDirective, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  public readonly teachers = this.store.teachers;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((data) => this.store.addAll(data));
  }

  addTeacher() {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(id: number) {
    this.store.deleteOne(id);
  }
}
