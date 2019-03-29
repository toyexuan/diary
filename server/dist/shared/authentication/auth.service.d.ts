import { Model } from 'mongoose';
import { UserInterface } from 'src/user/user.schema.interface';
export declare class AuthService {
    private readonly userModel;
    constructor(userModel: Model<UserInterface>);
    private readonly secretOrKey;
    private readonly expiresIn;
    createJwtToken(data: any): Promise<{
        expires_in: string;
        access_token: string;
    }>;
    validateUserByLocal({ dob }: {
        dob: any;
    }): Promise<boolean>;
    validateUserByJwt(signedUser: string): Promise<UserInterface>;
}
