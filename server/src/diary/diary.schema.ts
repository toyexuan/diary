import { Schema } from 'mongoose';

export const DiarySchema = new Schema({
  author: String,
  title: String,
  content: [String],
  createdAt: Date,
  updatedAt: Date,
  comments: [
    {
      author: String,
      content: [String],
      createdAt: Date,
    },
  ],
  bgImages: [String],
  bgm: String,
  locked: Boolean,
});
