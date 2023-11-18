import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Mushroom} from "../model/mushroom";

@Injectable({
  providedIn: 'root'
})
export class MushroomStoreService {

  mushroomStore$ = new BehaviorSubject<Mushroom[]>([]);

  constructor() {
  }

  public setMushrooms(mushrooms: Mushroom[]) {
    this.mushroomStore$.next(mushrooms);
  }

  public getMushrooms(): Observable<Mushroom[]> {
    return this.mushroomStore$.asObservable();
  }
}
