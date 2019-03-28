import { Injectable, NestMiddleware, HttpException } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const sign = req.headers.jwt as string;
    if (!sign) {
        return res.sendStatus(400);
    }
    next();
  }
}
