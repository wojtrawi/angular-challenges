import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavButtonDirective } from './nav-button.component';

@Component({
  standalone: true,
  imports: [NavButtonDirective, RouterLink],
  selector: 'app-home',
  template: `
    <a routerLink="/foo" appNavButton class="fixed left-1/2 top-3">Foo Page</a>
    <div id="top" class="h-screen bg-gray-500">
      Empty
      <a routerLink="." fragment="bottom" appNavButton>Scroll Bottom</a>
    </div>
    <div id="bottom" class="h-screen bg-blue-300">
      I want to scroll each
      <a routerLink="." fragment="top" appNavButton>Scroll Top</a>
    </div>
  `,
})
export class HomeComponent {}
