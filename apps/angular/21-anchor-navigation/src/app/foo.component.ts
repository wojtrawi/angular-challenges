import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavButtonDirective } from './nav-button.component';

@Component({
  standalone: true,
  imports: [NavButtonDirective, RouterLink],
  selector: 'app-foo',
  template: `
    Welcome to foo page
    <a routerLink="home" appNavButton class="fixed left-1/2 top-3">Home Page</a>
    <div class="h-screen bg-blue-200">section 1</div>
    <div class="h-screen bg-red-200">section 2</div>
  `,
})
export class FooComponent {}
