import { Component, OnInit, inject } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardListItemDirective } from '../../ui/card/card-list-item.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    @let _cities = cities();

    <app-card [items]="_cities" (addOne)="addCity()">
      <img src="assets/img/city.png" width="200px" />

      <app-list-item
        *appCardListItem="_cities; let item"
        (deleteOne)="deleteCity(item.id)">
        {{ item.name }}
      </app-list-item>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, CardListItemDirective, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  cities = this.store.cities;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((data) => this.store.addAll(data));
  }

  addCity() {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
