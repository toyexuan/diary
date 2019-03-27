import { DiaryStruct } from '../types/diary.types';

export const diaries: DiaryStruct[] = [
  {
    _id: '1234567',
    author: 'he',
    title: '这是第一条日记',
    locked: true,
    comments: [
      {
        author: 'she',
        content: ['这是一条评论'],
        createdAt: new Date()
      },
      {
        author: 'he',
        content: ['这是两条评论'],
        createdAt: new Date()
      },
    ],
    content: ['第一条日记', '试一试效果'],
    createdAt: new Date()
  },
  {
    _id: '123427',
    author: 'he',
    title: '这是第2条日记',
    comments: [
    ],
    content: ['第2条日记', '试一试效果'],
    createdAt: new Date()
  },
];
