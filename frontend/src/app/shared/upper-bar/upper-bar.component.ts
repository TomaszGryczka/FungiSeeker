import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-upper-bar',
  templateUrl: './upper-bar.component.html',
  styleUrls: ['./upper-bar.component.css']
})
export class UpperBarComponent {

  @Input()
  shouldShowBackButton: boolean = false;

  @Input()
  barTitle: string = '';

  goBack() {
    window.history.back();
  }
}
