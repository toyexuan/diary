import { Injectable } from '@angular/core';
import { Observable, of, throwError, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import {
  AuthorType,
  DiaryStruct,
  DiaryList,
  DiaryCommentStruct
} from '../lib/types/diary.types';
import { config, ServiceFlavor } from '../config/client_config';
import { diary } from '../lib/static/diary';
@Injectable({
  providedIn: 'root'
})
export class DiaryService {
  constructor() {}

  public getDiaryList(author: AuthorType): Observable<DiaryList[]> {
    switch (config.flavor) {
      case ServiceFlavor.LOCAL: {
        return of(
          diary
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
        // TODO: add prod service here
      }
    }
  }

  public getDiary(id: string): Observable<DiaryStruct | undefined> {
    switch (config.flavor) {
      case ServiceFlavor.LOCAL: {
        return of(diary.find(d => d.id === id));
      }
      case ServiceFlavor.PROD: {
        // TODO: add prod service here
      }
    }
  }

  public postComment(comment: DiaryCommentStruct): Observable<boolean> {
    switch (config.flavor) {
      case ServiceFlavor.LOCAL: {
        return of(true);
      }
      case ServiceFlavor.PROD: {
      }
    }
  }

  public postDiary(d: DiaryStruct): Observable<boolean> {
    switch (config.flavor) {
      case ServiceFlavor.LOCAL: {
        return of(true);
      }
      case ServiceFlavor.PROD: {
      }
    }
  }
}
