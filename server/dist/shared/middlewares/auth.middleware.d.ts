import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';
import { AuthService } from 'dist/shared/authentication/auth.service';
export declare class AuthMiddleware implements NestMiddleware {
    private authService;
    constructor(authService: AuthService);
    use(req: Request, res: Response, next: NextFunction): Promise<import("express-serve-static-core").Response>;
}
