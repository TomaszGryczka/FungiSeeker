import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-loading-app',
  templateUrl: './loading-app.component.html',
  styleUrls: ['./loading-app.component.css']
})
export class LoadingAppComponent {

  @Input()
  diameter = 70;

}
