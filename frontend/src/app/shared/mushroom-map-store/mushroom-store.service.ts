import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Mushroom} from "../model/mushroom";
import {Map} from "leaflet";

@Injectable({
  providedIn: 'root'
})
export class MushroomStoreService {

  mushroomStore$= new BehaviorSubject<Mushroom[]>([]);

  constructor() { }

  public setMushrooms(mushrooms: Mushroom[]) {
    console.log(mushrooms);
    this.mushroomStore$.next(mushrooms);
  }

  public getMushrooms(): Observable<Mushroom[]> {
    return this.mushroomStore$.asObservable();
  }
}
