import { Model } from 'mongoose';
import { UserInterface } from './user.schema.interface';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<UserInterface>);
    login(dob: string): Promise<UserInterface>;
}
