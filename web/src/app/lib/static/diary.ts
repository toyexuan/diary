import { DiaryStruct } from '../types/diary.types';

export const diary: DiaryStruct[] = [
  {
    id: Date.now(),
    author: 'he',
    title: '这是第一条日记',
    comments: [
      {
        author: 'she',
        content: '这是一条评论',
        createdAt: new Date()
      }
    ],
    content: ['第一条日记', '试一试效果'],
    createdAt: new Date()
  }
];
