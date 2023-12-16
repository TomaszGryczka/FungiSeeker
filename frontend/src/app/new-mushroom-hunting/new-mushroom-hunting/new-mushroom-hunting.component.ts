import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormControlName, FormGroup, Validators} from "@angular/forms";
import {NewMushroomHuntingGatewayService} from "../new-mushroom-hunting-gateway.service";
import {Router} from "@angular/router";
import {finalize} from "rxjs";

@Component({
  selector: 'app-new-mushroom-hunting',
  templateUrl: './new-mushroom-hunting.component.html',
  styleUrls: ['./new-mushroom-hunting.component.css']
})
export class NewMushroomHuntingComponent {

  form: FormGroup;
  creatingMushroomHunting = false;

  constructor(private formBuilder: FormBuilder,
              private newMushroomHuntingGateway: NewMushroomHuntingGatewayService,
              private router: Router) {
    this.form = this.formBuilder.group({
      mushroomHuntingName: new FormControl("", [Validators.required]),
      mushroomHuntingDescription: new FormControl("", [])
    });
  }

  startNewMushroomHunting() {
    this.creatingMushroomHunting = true;

    const name = this.form.get("mushroomHuntingName")?.value;
    const description = this.form.get("mushroomHuntingDescription")?.value;

    this.newMushroomHuntingGateway.startNewMushroomHunting(name, description)
      .pipe(finalize(() => this.creatingMushroomHunting = false))
      .subscribe((resp) => {
        if (resp) {
          this.router.navigate(["/mushroom-hunting"]).then(() => {});
        } else {
          console.error("Could not create mushroom hunting.");
        }
      });
  }

  isCreateMushroomHuntingDisabled(): boolean {
    return this.form.invalid || this.creatingMushroomHunting;
  }
}
