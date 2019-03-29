import { Response } from 'express';
import { AuthService } from 'src/shared/authentication/auth.service';
import { UserService } from './user.service';
export declare class UserController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UserService);
    getUserProfile(headers: any): Promise<{
        name: "he" | "she";
        userId: any;
    }>;
    login(response: Response, body: {
        password: string;
    }): Promise<void>;
}
