import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Mushroom} from "../model/mushroom";
import {Map} from "leaflet";

@Injectable({
  providedIn: 'root'
})
export class MushroomMapStoreService {

  mushroomStore$= new BehaviorSubject<Mushroom[]>([]);
  mapStore$ = new BehaviorSubject<Map | null>(null);

  constructor() { }

  public setMap(map: Map) {
    this.mapStore$.next(map);
  }

  public getMap(): Observable<Map | null> {
    return this.mapStore$.asObservable();
  }

  public setMushrooms(mushrooms: Mushroom[]) {
    this.mushroomStore$.next(mushrooms);
  }

  public getMushrooms(): Observable<Mushroom[]> {
    return this.mushroomStore$.asObservable();
  }
}
