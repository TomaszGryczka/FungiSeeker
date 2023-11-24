import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {finalize, map, Observable, startWith} from "rxjs";
import {AppUser, UserGatewayService} from "./user-gateway.service";

@Component({
  selector: 'app-user-multi-select',
  templateUrl: './user-multi-select.component.html',
  styleUrls: ['./user-multi-select.component.css']
})
export class UserMultiSelectComponent implements OnInit {

  @Output()
  selectedUsersEvent = new EventEmitter<AppUser[]>();

  @ViewChild("userInput")
  userInput?: ElementRef<HTMLInputElement>;
  userCtrl = new FormControl("");

  allUsers: AppUser[] = [];
  allUsersLoaded = false;
  selectedUsers: AppUser[] = [];
  filteredUsers?: Observable<AppUser[]>;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private userGateway: UserGatewayService) {
  }

  ngOnInit(): void {
    this.userGateway.fetchAllUsers()
      .pipe(finalize(() => this.allUsersLoaded = true))
      .subscribe(users => {
        this.allUsers = users
        this.filteredUsers = this.userCtrl.valueChanges.pipe(
          startWith(null),
          map((user: string | null) => (user ? this.filter(user) : this.allUsers.slice())),
        );
      });
  }

  add(event: MatChipInputEvent): void {
    // TODO: do nothing
  }

  remove(user: any): void {
    const index = this.selectedUsers.indexOf(user);

    if (index >= 0) {
      this.selectedUsers.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedUsers.push(event.option.value);
    if (this.userInput) {
      this.userInput.nativeElement.value = '';
    }
    this.userCtrl.setValue(null);
    this.selectedUsersEvent.emit(this.selectedUsers);
  }

  private filter(value: string | AppUser): AppUser[] {
    // TODO: This is a workaround for the fact that the autocomplete component
    //  does not support custom objects as values. It only supports strings.
    const filterValue = value && (value as AppUser).name ? "" : (value as string).toLowerCase();

    return this.allUsers
      .filter(user => this.getUserFullName(user).toLowerCase().includes(filterValue));
  }

  isUserSelectDisabled(user: AppUser): boolean {
    return this.selectedUsers.includes(user);
  }

  getUserFullName(user: AppUser): string {
    return user.nickname;
  }
}
