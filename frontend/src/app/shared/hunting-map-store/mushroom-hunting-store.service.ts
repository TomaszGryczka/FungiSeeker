import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {StrippedMushroomHunting} from "../../mushroom-hunting-list/mushroom-hunting-list-gateway.service";

@Injectable({
  providedIn: 'root'
})
export class MushroomHuntingStoreService {

  mushroomHuntingStore$ = new BehaviorSubject<StrippedMushroomHunting[]>([]);

  constructor() {
  }

  public setHunting(hunting: StrippedMushroomHunting[]) {
    this.mushroomHuntingStore$.next(hunting);
  }

  public getHunting(): Observable<StrippedMushroomHunting[]> {
    return this.mushroomHuntingStore$.asObservable();
  }
}
