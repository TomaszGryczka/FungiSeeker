import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MushroomHunting} from "../../shared/model/mushrom-hunting";
import {UserGatewayService} from "../../shared/user/user-gateway.service";
import {MushroomHuntingStatus} from "../../shared/model/mushroom-hunting-status";
import {MushroomHuntingVisibility} from "../../shared/model/mushroom-hunting-visibility";

@Component({
  selector: 'app-mushroom-hunting-statistics-modal',
  templateUrl: './mushroom-hunting-statistics-modal.component.html',
  styleUrls: ['./mushroom-hunting-statistics-modal.component.css']
})
export class MushroomHuntingStatisticsModalComponent implements OnInit {

  isLoading = false;
  userName = '';

  constructor(public dialogRef: MatDialogRef<MushroomHuntingStatisticsModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: MushroomHunting,
              private userGateway: UserGatewayService) {
  }

  ngOnInit(): void {
    this.fetchUserName();
  }

  fetchUserName(): void {
    this.isLoading = true;
    this.userGateway.fetchAllUsers().subscribe(users => {
      if (users) {
        this.userName = users.find(user => user.id === this.data.userId)?.name || '';
        if (!this.userName) {
          this.userGateway.getMe().subscribe(me => {
            this.userName = me.name;
          });
        }
      }
      this.isLoading = false;
    });
  }

  mushroomHuntingStatusLabel(): string {
    if (this.data?.status === MushroomHuntingStatus.ACTIVE) {
      return "AKTYWNA";
    } else {
      return "ZAKOŃCZONA";
    }
  }

  mushroomHuntingVisibilityLabel(): string {
    if (this.data?.visibility === MushroomHuntingVisibility.PUBLIC) {
      return "PUBLICZNE";
    } else if (this.data?.visibility === MushroomHuntingVisibility.PRIVATE) {
      return "PRYWATNE";
    } else {
      return "UDOSTĘPNIONE";
    }
  }

  getDate(date: string | undefined): string {
    return date ? new Date(date).toLocaleString('pl-PL') : "";
  }

}
