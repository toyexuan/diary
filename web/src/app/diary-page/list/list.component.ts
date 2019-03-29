import { Component, OnInit } from '@angular/core';
import { faLock, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';

import { DiaryService } from 'src/app/services/diary.service';
import { DiaryList, AuthorType } from 'src/app/lib/types/diary.types';
import { UserProfile } from 'src/app/lib/types/user.types';
import { DataService } from 'src/app/services/data.service';
import { BROADCAST_DATA_TYPE } from 'src/app/lib/types/data.types';
import { PageDefaultBackgroundImageEnum } from 'src/app/lib/images';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public diaryList: DiaryList[] = [];
  public userProfile: UserProfile;
  public faLockIcon = faLock;
  public faEditIcon = faEdit;

  constructor(
    private diaryService: DiaryService,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  public author: AuthorType;
  public audio: string;

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.doOnInit();
    });
  }

  private async doOnInit() {
    this.author = this.route.snapshot.paramMap.get('author') as AuthorType;
    if (this.author !== 'he' && this.author !== 'she') {
      return this.router.navigate(['404']);
    }
    this.diaryService.getDiaryList(this.author).subscribe(response => {
      this.diaryList = response;
    });

    this.dataService.sendMessage<string | string[]>({
      type: BROADCAST_DATA_TYPE.BG_IMAGGE_CHANGE,
      payload: [PageDefaultBackgroundImageEnum.list]
    });
  }

  formatDate(date: Date) {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  }

  onEdit(_id: string) {
    this.router.navigate(['editor'], { queryParams: { d: _id } });
  }

  gotoDiary(_id: string) {
    this.router.navigate([`diary/${_id}`]);
  }
}
