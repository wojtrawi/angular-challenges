import { Directive, input } from '@angular/core';

export interface CardListItemContext<T> {
  $implicit: T;
  isEven: boolean;
}

@Directive({
  selector: '[appCardListItem]',
  standalone: true,
})
export class CardListItemDirective<T> {
  public readonly appCardListItem = input.required<T[]>();

  static ngTemplateContextGuard<T>(
    dir: CardListItemDirective<T>,
    ctx: unknown,
  ): ctx is CardListItemContext<T> {
    return true;
  }
}
