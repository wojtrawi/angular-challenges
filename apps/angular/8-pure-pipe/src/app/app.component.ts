import { Component } from '@angular/core';
import { UtilPipe } from './util.pipe';

@Component({
  standalone: true,
  imports: [UtilPipe],
  selector: 'app-root',
  template: `
    @for (person of persons; track person; let index = $index) {
      <div>
        {{ person | appUtil: index }}
      </div>
    }
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
