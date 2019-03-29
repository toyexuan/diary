export type AuthorType = 'he' | 'she';

export interface DiaryStruct {
  _id?: string;
  author: AuthorType;
  title: string;
  content: string[];
  createdAt: Date;
  updatedAt?: Date;
  comments: DiaryCommentStruct[];
  bgImages?: string[];
  bgm?: string;
  locked?: boolean;
}

export interface DiaryCommentStruct {
  author: AuthorType;
  content: string[];
  createdAt: Date;
}

export interface DiaryList {
  _id: string;
  title: string;
  author: AuthorType;
  createdAt: Date;
  commentsNum: number;
  locked?: boolean;
}
