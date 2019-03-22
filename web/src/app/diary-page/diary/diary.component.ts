import { Component, OnInit } from '@angular/core';
import { DiaryService } from 'src/app/services/diary.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DiaryStruct } from 'src/app/lib/types/diary.types';
import { DataService } from 'src/app/services/data.service';
import { BROADCAST_DATA_TYPE } from 'src/app/lib/types/data.types';
import { PageDefaultImageEnum } from 'src/app/lib/background-images';
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

  private async doOnInit() {
    const diaryId = this.route.snapshot.paramMap.get('diaryId');
    this.diary = await this.diaryService.getDiary(diaryId);
    if (!this.diary) {
      this.router.navigate(['404']);
      return;
    }

    this.dataService.sendMessage<string | string[]>({
      type: BROADCAST_DATA_TYPE.BG_IMAGGE_CHANGE,
      payload: [
        (await this.userService.getUserProfile()).name === 'he'
          ? PageDefaultImageEnum.hisDiary
          : PageDefaultImageEnum.herDiary
      ]
    });
  }

  formatDate(date: Date) {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  }
}
