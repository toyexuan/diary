import { Component, OnInit } from '@angular/core';
import { DiaryService } from 'src/app/services/diary.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DiaryStruct } from 'src/app/lib/types/diary.types';
import { DataService } from 'src/app/services/data.service';
import { BROADCAST_DATA_TYPE } from 'src/app/lib/types/data.types';
import { PageDefaultBackgroundImageEnum } from 'src/app/lib/images';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {
  public diary: DiaryStruct;

  constructor(
    private diaryService: DiaryService,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.doOnInit();
    });
  }

  private doOnInit() {
    const diaryId = this.route.snapshot.paramMap.get('diaryId');
    this.diaryService.getDiary(diaryId).subscribe(diary => {
      this.diary = diary;
      const images: string | string[] = diary.bgImages
        ? diary.bgImages
        : diary.author === 'he'
        ? PageDefaultBackgroundImageEnum.hisDiary
        : PageDefaultBackgroundImageEnum.herDiary;
      this.dataService.sendMessage<string | string[]>({
        type: BROADCAST_DATA_TYPE.BG_IMAGGE_CHANGE,
        payload: images
      });

      this.userService.getCachedUserProfile().subscribe(user => {
        if (!this.diary || (this.diary.locked && !user.userId)) {
          this.router.navigate(['404']);
          return;
        }
      });

      this.dataService.sendMessage<string>({
        type: BROADCAST_DATA_TYPE.BGM_CHANGE,
        payload: this.diary.bgm || './assets/audio/dawn.ogg'
      });
    });
  }

  formatDate(date: Date) {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  }
}
