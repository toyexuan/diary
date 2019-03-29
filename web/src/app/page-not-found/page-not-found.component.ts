import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { BROADCAST_DATA_TYPE } from '../lib/types/data.types';
import { PageDefaultBackgroundImageEnum } from '../lib/images';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.sendMessage<string | string[]>({
      type: BROADCAST_DATA_TYPE.BG_IMAGGE_CHANGE,
      payload: PageDefaultBackgroundImageEnum.pageNotFound
    });
  }
}
