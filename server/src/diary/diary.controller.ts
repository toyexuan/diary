import { Controller, Post, Body } from '@nestjs/common';
import { AuthorType, DiaryCommentStruct, DiaryStruct } from './diary.schema.interface';
import { DiaryService } from './diary.service';

@Controller('diary/api')
export class DiaryController {
  constructor(private diaryService: DiaryService) {}

  @Post('diary-list')
  public async getDiaryListApi(@Body() body: { author: AuthorType }) {
    const diaries = await this.diaryService.getDiaryList(body.author);
    return diaries.map(diary => ({
      _id: diary._id,
      title: diary.title,
      createdAt: diary.createdAt,
      commentsNum: diary.comments.length,
      locked: diary.locked,
    }));
  }

  @Post('get-diary')
  public async getDiry(@Body() body: { _id: string }) {
    const x = await this.diaryService.getDiary(body._id);
    return x;
  }

  @Post('post-comment')
  public async postComment(@Body()
  body: {
    comment: DiaryCommentStruct;
    id: string;
  }) {
    return (
      (await this.diaryService.postComment(body.comment, body.id)) !== undefined
    );
  }

  @Post('post-diary')
  public async postDiary(@Body() body: { diary: DiaryStruct }) {
      return await this.diaryService.postDiary(body.diary);
  }
}
