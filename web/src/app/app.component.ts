import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from './services/data.service';
import { BROADCAST_DATA_TYPE } from './lib/types/data.types';
import { pageFading } from './animations/page-fading';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [pageFading]
})
export class AppComponent implements AfterViewInit {
  constructor(
    private dataService: DataService,
    private cd: ChangeDetectorRef
  ) {}

  public audio: string;
  bgViewAnimation = true;
  backgroundImages: string[] = [];

  ngAfterViewInit() {
    this.dataService.currentMessage().subscribe(data => {
      if (data.type === BROADCAST_DATA_TYPE.BG_IMAGGE_CHANGE) {
        this.backgroundImages =
          data.payload instanceof Array ? data.payload : [data.payload];
      }
      if (data.type === BROADCAST_DATA_TYPE.BGM_CHANGE) {
        this.audio = data.payload as string;
      }
      this.cd.detectChanges();
    });
  }
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
    );
  }
}
