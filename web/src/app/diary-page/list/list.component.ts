import { Component, OnInit } from '@angular/core';
import { DiaryService } from 'src/app/diary.service';
import { DiaryList } from 'src/app/lib/types/diary.types';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public diaryList: DiaryList[] = [];
  constructor(
    private diaryService: DiaryService,
  ) { }

  ngOnInit() {
    this.diaryList = this.diaryService.getDiaryList('he');
  }

}
