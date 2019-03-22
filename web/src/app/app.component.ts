import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'diary';
  bgViewAnimation = true;
  backgroundImages = ['./assets/imgs/0.jpg'];
}
