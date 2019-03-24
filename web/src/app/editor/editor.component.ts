import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../services/data.service';
import { BROADCAST_DATA_TYPE } from '../lib/types/data.types';
import { PageDefaultBackgroundImageEnum } from '../lib/images';
import { DiaryService } from '../services/diary.service';
import { UserProfile } from '../lib/types/user.types';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  @ViewChild('contentController') contentController: ElementRef<
    HTMLTextAreaElement
  >;

  private user: UserProfile;

  public images: string[];
  public bgm: string;
  public locked: boolean;
  public title: string;
  public content: string;
  constructor(
    private dataService: DataService,
    private diaryService: DiaryService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataService.sendMessage<PageDefaultBackgroundImageEnum>({
      type: BROADCAST_DATA_TYPE.BG_IMAGGE_CHANGE,
      payload: PageDefaultBackgroundImageEnum.editor
    });

    this.userService.getCachedUserProfile().subscribe(user => {
      this.user = user;
      if (!this.user) {
        this.router.navigate(['home']);
      }
    });
  }

  onContentChange() {
    if (
      this.contentController.nativeElement.clientHeight <
      this.contentController.nativeElement.scrollHeight
    ) {
      this.contentController.nativeElement.style.height = `${
        this.contentController.nativeElement.scrollHeight
      }px`;
    }
  }

  onSubmit() {
    if (!this.title || !this.content) {
      return;
    }

    this.diaryService
      .postDiary({
        author: this.user.name,
        createdAt: new Date(),
        title: this.title,
        content: this.content.split('\n'),
        comments: [],
        images: this.images,
        bgm: this.bgm,
        locked: this.locked
      })
      .subscribe(success => {
        if (success) {
          this.router.navigate([this.user.name]);
        }
      });
  }
}
