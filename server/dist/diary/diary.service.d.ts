import { Model } from 'mongoose';
import { DiaryInterface, AuthorType, DiaryCommentStruct, DiaryStruct } from './diary.schema.interface';
export declare class DiaryService {
    private readonly diaryModel;
    constructor(diaryModel: Model<DiaryInterface>);
    getDiaryList(author: AuthorType): Promise<DiaryInterface[]>;
    getDiary(id: string): Promise<DiaryInterface>;
    postComment(comment: DiaryCommentStruct, id: string): Promise<DiaryInterface>;
    postDiary(diary: DiaryStruct): Promise<DiaryInterface>;
}
