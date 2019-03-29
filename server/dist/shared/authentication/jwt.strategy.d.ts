import { Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
export declare class JwtStrategy extends Strategy {
    private readonly authService;
    constructor(authService: AuthService);
    verify(req: any, payload: any, done: any): Promise<any>;
}
