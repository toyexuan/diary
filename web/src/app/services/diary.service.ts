import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, of, throwError, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import {
  AuthorType,
  DiaryStruct,
  DiaryList,
  DiaryCommentStruct
} from '../lib/types/diary.types';
import { config, ServiceFlavor } from '../config/client_config';
import { diaries } from '../lib/static/diary';
@Injectable({
  providedIn: 'root'
})
export class DiaryService {
  constructor(private httpService: Http) {}

  private readonly POST_GET_DIARY_LIST_API = 'diary/api/diary-list';
  private readonly POST_GET_DIARY_API = 'diary/api/get-diary';
  private readonly POST_DIARY_COMMENT_API = 'diary/api/post-comment';
  private readonly POST_DIARY_API = 'diary/api/post-diary';

  public getDiaryList(author: AuthorType): Observable<DiaryList[]> {
    switch (config.flavor) {
      case ServiceFlavor.LOCAL: {
        return of(
          diaries
            .filter(d => d.author === author)
            .map(d => ({
              id: d.id,
              title: d.title,
              createdAt: d.createdAt,
              commentsNum: d.comments.length,
              locked: d.locked
            }))
        );
      }
      case ServiceFlavor.PROD: {
        return this.httpService.post(this.POST_GET_DIARY_LIST_API, { author }).pipe(
          map(data => {
            return data.json();
          }),
          catchError(error => throwError(`Error when get diary list: ${error}`))
        );
      }
    }
  }

  public getDiary(id: string): Observable<DiaryStruct | undefined> {
    switch (config.flavor) {
      case ServiceFlavor.LOCAL: {
        return of(diaries.find(d => d.id === id));
      }
      case ServiceFlavor.PROD: {
        return this.httpService.post(this.POST_GET_DIARY_API, { id }).pipe(
          map(data => {
            return data.json();
          }),
          catchError(error => throwError(`Error when get diary: ${error}`))
        );
      }
    }
  }

  public postComment(comment: DiaryCommentStruct): Observable<boolean> {
    switch (config.flavor) {
      case ServiceFlavor.LOCAL: {
        return of(true);
      }
      case ServiceFlavor.PROD: {
        return this.httpService.post(this.POST_DIARY_COMMENT_API, { comment }).pipe(
          map(data => {
            return data.json();
          }),
          catchError(error => throwError(`Error when post comment: ${error}`))
        );
      }
    }
  }

  public postDiary(diary: DiaryStruct): Observable<boolean> {
    switch (config.flavor) {
      case ServiceFlavor.LOCAL: {
        return of(true);
      }
      case ServiceFlavor.PROD: {
        return this.httpService.post(this.POST_DIARY_API, { diary }).pipe(
          map(data => {
            return data.json();
          }),
          catchError(error => throwError(`Error when post a diary: ${error}`))
        );
      }
    }
  }
}
