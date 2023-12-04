import {Component, OnInit} from '@angular/core';
import {MushroomHuntingListGatewayService, StrippedMushroomHunting} from "../mushroom-hunting-list-gateway.service";
import {finalize} from "rxjs";
import {Router} from "@angular/router";
import {MushroomHuntingStoreService} from "../../shared/hunting-map-store/mushroom-hunting-store.service";

@Component({
  selector: 'app-mushroom-hunting-list',
  templateUrl: './mushroom-hunting-list.component.html',
  styleUrls: ['./mushroom-hunting-list.component.css']
})
export class MushroomHuntingListComponent implements OnInit {

  mushroomHuntingList: StrippedMushroomHunting[] = [];
  loadingMushroomHuntingList = false;
  displayedColumns: string[] = ['position', 'name', 'weight'];
  shouldShowMore = false;

  constructor(private mushroomHuntingListGateway: MushroomHuntingListGatewayService,
              private mushroomHuntingStore: MushroomHuntingStoreService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.initMushroomHuntingList();
  }

  initMushroomHuntingList() {
    this.loadingMushroomHuntingList = true;
    this.mushroomHuntingListGateway.fetchMushroomHuntingList()
      .pipe(finalize(() => this.loadingMushroomHuntingList = false))
      .subscribe((mushroomHuntingList: StrippedMushroomHunting[]) => {
        if (mushroomHuntingList) {
          this.mushroomHuntingList = mushroomHuntingList;
          this.mushroomHuntingStore.setHunting(mushroomHuntingList);
        }
      });
  }

  getMushroomHuntingList(): StrippedMushroomHunting[] {
    return this.mushroomHuntingList;
  }

  getFirstSixIfShouldNotShowMore(): StrippedMushroomHunting[] {
    return this.shouldShowMore ? this.getMushroomHuntingList() : this.getMushroomHuntingList().slice(0, 2);
  }

  shouldShowShowMoreButton(): boolean {
    return this.getMushroomHuntingList().length > 2;
  }

  toggleShowMore() {
    this.shouldShowMore = !this.shouldShowMore;
  }

  showMoreButtonLabel(): string {
    return this.shouldShowMore ? "Pokaż mniej" : "Pokaż więcej";
  }

  showMoreButtonIcon(): string {
    return this.shouldShowMore ? "expand_less" : "expand_more";
  }

  onHuntingSelected(mushroomHunting: StrippedMushroomHunting) {
    this.router.navigate(["/finished-mushroom-hunting/" + mushroomHunting.id]).then();
  }
}
