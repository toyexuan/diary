import { Component, OnInit } from '@angular/core';
import { homeData } from '../static/home';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public fadingTime = 2;
  public maxHeight = 20;
  public content = homeData.content;
  public scollerBodyVariant = ['large'];

  constructor() {
    console.log(this.content);
   }

  ngOnInit() {
  }

}
