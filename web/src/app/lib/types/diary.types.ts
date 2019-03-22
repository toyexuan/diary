export type AuthorType = 'he' | 'she';

export interface DiaryStruct {
  id: string;
  author: AuthorType;
  title: string;
  content: string[];
  createdAt: Date;
  updatedAt?: Date;
  comments: DiaryCommentStruct[];
  images?: string[];
}

export interface DiaryCommentStruct {
  author: AuthorType;
  content: string;
  createdAt: Date;
}

export interface DiaryList {
  id: string;
  title: string;
  createdAt: Date;
  commentsNum: number;
}
