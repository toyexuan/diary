import { Document } from 'mongoose';
interface IUser {
    password?: string;
    dob: string;
    name: 'he' | 'she';
    lastLoginAt: Date;
}
export interface UserInterface extends Document, IUser {
}
export {};
