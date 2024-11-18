import { Directive } from '@angular/core';
@Directive({
  selector: '[appNavButton]',
  standalone: true,
  host: {
    class: 'block w-fit border border-red-500 rounded-md p-4 m-2',
  },
})
export class NavButtonDirective {}
