import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from './services/data.service';
import { BROADCAST_DATA_TYPE } from './lib/types/data.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  constructor(
    private dataService: DataService,
    private cd: ChangeDetectorRef
  ) {}

  title = 'diary';
  bgViewAnimation = true;
  backgroundImages = [];

  ngAfterViewInit() {
    this.dataService.currentMessage<string | string[]>().subscribe(data => {
      if (data.type === BROADCAST_DATA_TYPE.BG_IMAGGE_CHANGE) {
        this.backgroundImages =
          data.payload instanceof Array ? data.payload : [data.payload];
        this.cd.detectChanges();
      }
    });
  }
}
