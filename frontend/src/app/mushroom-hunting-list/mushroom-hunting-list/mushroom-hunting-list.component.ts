import {Component, OnInit} from '@angular/core';
import {MushroomHuntingListGatewayService, StrippedMushroomHunting} from "../mushroom-hunting-list-gateway.service";
import {finalize} from "rxjs";

@Component({
  selector: 'app-mushroom-hunting-list',
  templateUrl: './mushroom-hunting-list.component.html',
  styleUrls: ['./mushroom-hunting-list.component.css']
})
export class MushroomHuntingListComponent implements OnInit {

  mushroomHuntingList: StrippedMushroomHunting[] = [];
  loadingMushroomHuntingList = false;


  constructor(private mushroomHuntingListGateway: MushroomHuntingListGatewayService) {
  }

  ngOnInit(): void {
    this.initMushroomHuntingList();
  }

  initMushroomHuntingList() {
    this.mushroomHuntingListGateway.fetchMushroomHuntingList()
      .pipe(finalize(() => this.loadingMushroomHuntingList = false))
      .subscribe((mushroomHuntingList: StrippedMushroomHunting[]) => {
        console.log(mushroomHuntingList);
        if (!mushroomHuntingList) {
          this.mushroomHuntingList = mushroomHuntingList;
        }
      });
  }
}
