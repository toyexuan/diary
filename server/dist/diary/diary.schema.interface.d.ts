import { Document } from 'mongoose';
export declare type AuthorType = 'he' | 'she';
export interface DiaryStruct {
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
export interface DiaryInterface extends Document, DiaryStruct {
}
