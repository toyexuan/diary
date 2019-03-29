import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  DiaryInterface,
  AuthorType,
  DiaryCommentStruct,
  DiaryStruct,
} from './diary.schema.interface';
import { Types } from 'mongoose';

@Injectable()
export class DiaryService {
  constructor(
    @InjectModel('Diary') private readonly diaryModel: Model<DiaryInterface>,
  ) {}

  public async getDiaryList(author: AuthorType) {
    return await this.diaryModel.find({ author }).exec();
  }

  public async getDiary(id: string) {
    // tslint:disable-next-line:variable-name
    const _id = Types.ObjectId(id);
    return await this.diaryModel.findOne({ _id }).exec();
  }

  public async postComment(comment: DiaryCommentStruct, id: string) {
    // tslint:disable-next-line:variable-name
    const _id = Types.ObjectId(id);
    const diary = await this.diaryModel.findOne({ _id }).exec();

    if (!diary) {
      throw new Error(`Cannot find diary for ${id}`);
    }

    diary.comments.push(comment);
    return await diary.save();
  }

  public async postDiary(diary: DiaryStruct) {
    const { _id } = diary as any;
    if (_id) {
      const existDiary = await this.diaryModel
        .findOne({ _id: Types.ObjectId(_id) })
        .exec();
      if (existDiary) {
        existDiary.content = diary.content;
        existDiary.locked = diary.locked;
        existDiary.title = diary.title;
        existDiary.updatedAt = new Date();

        return await existDiary.save();
      } else {
        throw new HttpException('No diary found', 400);
      }
    } else {
      const d = new this.diaryModel(diary);
      return await d.save();
    }
  }
}
