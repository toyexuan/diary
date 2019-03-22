import { Injectable } from '@angular/core';
import { AuthorType, DiaryStruct, DiaryList } from './lib/types/diary.types';
import { config, ServiceFlavor } from './config/client_config';
import { diary } from './lib/static/diary';
@Injectable({
  providedIn: 'root'
})
export class DiaryService {
  constructor() {}

  public getDiaryList(author: AuthorType): DiaryList[] {
    switch (config.flavor) {
      case ServiceFlavor.LOCAL: {
        return diary
          .filter(d => d.author === author)
          .map(d => ({
            title: d.title,
            createdAt: d.createdAt,
            commentsNum: d.comments.length
          }));
      }
      case ServiceFlavor.PROD: {
        // TODO: add prod service here
      }
    }
  }

  public getDiary(id: number): DiaryStruct | undefined {
    switch (config.flavor) {
      case ServiceFlavor.LOCAL: {
        return diary.find(d => d.id === id);
      }
      case ServiceFlavor.PROD: {
        // TODO: add prod service here
      }
    }
  }
}
