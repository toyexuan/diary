import { Component, OnInit, Input } from '@angular/core';
import { DiaryCommentStruct, AuthorType } from 'src/app/lib/types/diary.types';
import { HisAvatar, HerAvatar } from 'src/app/lib/images';
import { UserService } from 'src/app/services/user.service';
import { UserProfile } from 'src/app/lib/types/user.types';
import { DiaryService } from 'src/app/services/diary.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comments: DiaryCommentStruct[] = [];
  @Input() manualDisplay = false;
  @Input() show = false;

  public newComment: string;
  public author: UserProfile;

  constructor(
    private userService: UserService,
    private diaryService: DiaryService
  ) {}

  ngOnInit() {
    this.userService.getCachedUserProfile().subscribe(userProfile => {
      this.author = userProfile;
    });
  }

  getAuthorImage(author: AuthorType) {
    if (author === 'he') {
      return HisAvatar;
    } else if (author === 'she') {
      return HerAvatar;
    }
  }

  formatDate(date: Date = new Date()) {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  }

  postComment() {
    const comment = {
      author: this.author.name,
      createdAt: new Date(),
      content: this.newComment.split('\n')
    };
    this.diaryService.postComment(comment).subscribe(response => {
      if (response) {
        this.comments.push(comment);
      }
    });
    this.newComment = '';
  }
}
