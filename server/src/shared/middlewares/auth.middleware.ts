import { Injectable, NestMiddleware, HttpException } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';
import { AuthService } from 'dist/shared/authentication/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const sign = req.headers.jwt as string;
    const user = await this.authService.validateUserByJwt(sign);
    if (!user) {
      return res.sendStatus(400);
    }
    next();
  }
}
