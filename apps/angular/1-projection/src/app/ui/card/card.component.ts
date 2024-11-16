import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  contentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import {
  CardListItemContext,
  CardListItemDirective,
} from './card-list-item.directive';

@Component({
  selector: 'app-card',
  template: `
    <div class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4">
      <ng-content></ng-content>

      <section>
        @for (item of items(); track item.id; let isEven = $even) {
          <ng-container
            *ngTemplateOutlet="
              listItemTemplateRef();
              context: { $implicit: item, isEven }
            "></ng-container>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addOne.emit()">
        Add
      </button>
    </div>
  `,
  styles: [
    `
      div {
        background-color: var(--app-card-bg, transparent);
      }
    `,
  ],
  standalone: true,
  imports: [NgTemplateOutlet],
})
export class CardComponent<T extends { id: number }> {
  public readonly items = input.required<T[]>();
  public readonly listItemTemplateRef = contentChild.required<
    CardListItemDirective<T>,
    TemplateRef<CardListItemContext<T>>
  >(CardListItemDirective, { read: TemplateRef });

  public readonly addOne = output<void>();
}
