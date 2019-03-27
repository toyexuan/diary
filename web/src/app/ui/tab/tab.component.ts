import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
  faLock,
  IconDefinition,
  faFeatherAlt
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { SiteLogo, HisAvatar, HerAvatar } from 'src/app/lib/images';
import { DataService } from 'src/app/services/data.service';
import { BROADCAST_DATA_TYPE } from 'src/app/lib/types/data.types';
import { UserService } from 'src/app/services/user.service';
import { UserProfile } from 'src/app/lib/types/user.types';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit, AfterViewInit {
  public faLockIcon: IconDefinition = faLock;
  public faEditIcon: IconDefinition = faFeatherAlt;
  public logo = SiteLogo;
  public hisAvatar = HisAvatar;
  public herAvatar = HerAvatar;
  public user: UserProfile;

  constructor(
    private router: Router,
    private dataService: DataService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.doOnInit();
  }

  private doOnInit() {
    this.userService.getCachedUserProfile().subscribe(user => {
      this.user = user.userId ? user : undefined;
    });
  }

  ngAfterViewInit() {
    this.dataService.currentMessage<boolean>().subscribe(response => {
      if (response.type === BROADCAST_DATA_TYPE.USER_LOGGEDIN) {
        this.doOnInit();
      }
    });
  }

  onClickHisDiary() {
    this.router.navigate(['he']);
  }
  onClickHerDiary() {
    this.router.navigate(['she']);
  }
  onClickHome() {
    this.router.navigate(['']);
  }

  onClickLock() {
    this.dataService.sendMessage<boolean>({
      payload: true,
      type: BROADCAST_DATA_TYPE.MODAL_POPUP
    });
  }

  onClickEdit() {
    this.router.navigate(['editor']);
  }
}
