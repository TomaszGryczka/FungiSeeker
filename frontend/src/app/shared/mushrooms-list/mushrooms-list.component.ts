import {Component, Input} from '@angular/core';
import {Mushroom} from "../model/mushroom";

@Component({
  selector: 'app-mushrooms-list',
  templateUrl: './mushrooms-list.component.html',
  styleUrls: ['./mushrooms-list.component.css']
})
export class MushroomsListComponent {

  @Input()
  mushrooms: Mushroom[] = [
    {
      id: 1,
      name: "Pieczarka",
      description: "Pieczarka leśna",
      imageUrl: "https://fungiseekerblobstorage.blob.core.windows.net/icons-auth0/muchomor-czerw.webp",
      mushroomHuntingId: 1,
      latitude: 51.109,
      longitude: 17.032,
      isEdible: true
    },
    {
      id: 2,
      name: "Kania",
      description: "Kania leśna",
      imageUrl: "https://fungiseekerblobstorage.blob.core.windows.net/icons-auth0/miejscowka.webp",
      mushroomHuntingId: 1,
      latitude: 51.109,
      longitude: 17.032,
      isEdible: false
    }
  ];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  constructor() {
  }
}
