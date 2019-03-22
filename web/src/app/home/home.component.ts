import { Component, OnInit } from '@angular/core';
import { homeData } from '../lib/static/home';
import { DataService } from '../services/data.service';
import { BROADCAST_DATA_TYPE } from '../lib/types/data.types';
import { PageDefaultImageEnum } from '../lib/background-images';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public fadingTime = 2;
  public maxHeight = 20;
  public content = homeData.content;
  public scollerBodyVariant = ['medium'];
  public audio = './assets/audio/distant.ogg';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.sendMessage<string | string[]>({
      type: BROADCAST_DATA_TYPE.BG_IMAGGE_CHANGE,
      payload: [PageDefaultImageEnum.home]
    });
  }
}
