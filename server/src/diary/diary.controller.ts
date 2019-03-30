import { Controller, Post, Body, Response as HttpResponse, Request as HttpRequest } from '@nestjs/common';
import { AuthorType, DiaryCommentStruct, DiaryStruct } from './diary.schema.interface';
import { DiaryService } from './diary.service';
import { Request, Response } from 'express';
import { AuthService } from '../shared/authentication/auth.service';

@Controller('diary/api')
export class DiaryController {
  constructor(private diaryService: DiaryService, private authService: AuthService) {}

  @Post('diary-list')
  public async getDiaryListApi(@Body() body: { author: AuthorType }) {
    const diaries = await this.diaryService.getDiaryList(body.author);
    return diaries.map(diary => ({
      _id: diary._id,
      title: diary.title,
      createdAt: diary.createdAt,
      commentsNum: diary.comments.length,
      locked: diary.locked,
      author: diary.author,
    }));
  }

  @Post('get-diary')
  public async getDiry(@HttpResponse() res: Response, @HttpRequest() req: Request, @Body() body: { _id: string }) {
    const diary = await this.diaryService.getDiary(body._id);
    if (diary.locked) {
      const valid = await this.authService.validateUserByJwt(req.headers.jwt as string);
      if (valid) {
        return diary;
      } else {
        res.sendStatus(400);
      }
    }
    return diary;
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
