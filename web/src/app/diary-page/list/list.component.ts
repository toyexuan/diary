import { Component, OnInit } from '@angular/core';
import { DiaryService } from 'src/app/services/diary.service';
import { DiaryList, AuthorType } from 'src/app/lib/types/diary.types';
import { UserProfile } from 'src/app/lib/types/user.types';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { BROADCAST_DATA_TYPE } from 'src/app/lib/types/data.types';
import { PageDefaultImageEnum } from 'src/app/lib/background-images';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public diaryList: DiaryList[] = [];
  public userProfile: UserProfile;

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

  private async doOnInit () {
    this.author = this.route.snapshot.paramMap.get('author') as AuthorType;
    if (this.author !== 'he' && this.author !== 'she') {
      return this.router.navigate(['404']);
    }
    this.diaryList = await this.diaryService.getDiaryList(this.author);

    this.dataService.sendMessage<string | string[]>({
      type: BROADCAST_DATA_TYPE.BG_IMAGGE_CHANGE,
      payload: [PageDefaultImageEnum.list]
    });
  }

  formatDate(date: Date) {
    return `${date.getFullYear()}年${date.getMonth() +
      1}月${date.getDate()}日`;
  }

  gotoDiary(id: string) {
    this.router.navigate([`diary/${id}`]);
  }
}
