import { Component, OnInit } from '@angular/core';
import { homeData } from '../lib/static/home';
import { DataService } from '../services/data.service';
import { BROADCAST_DATA_TYPE } from '../lib/types/data.types';
import { PageDefaultBackgroundImageEnum } from '../lib/images';

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

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.sendMessage<string | string[]>({
      type: BROADCAST_DATA_TYPE.BG_IMAGGE_CHANGE,
      payload: [PageDefaultBackgroundImageEnum.home]
    });
    this.dataService.sendMessage<string>({
      type: BROADCAST_DATA_TYPE.BGM_CHANGE,
      payload: './assets/audio/distant.ogg'
    });
  }
}
