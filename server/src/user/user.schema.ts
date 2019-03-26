import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  password: String,
  dob: String,
  name: String,
  lastLoginAt: Date,
});
