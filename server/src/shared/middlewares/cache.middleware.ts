import { Injectable, NestMiddleware, HttpException } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';

@Injectable()
export class CacheMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.setHeader('Cache-Control', 'no-cache, no-store');
    // if (time <= 0 || !time) {
    //   res.setHeader('Cache-Control', 'no-cache, no-store');
    // } else if (typeof time === 'number') {
    //   res.set('Cache-Control', `public, max-age:${time}`);
    // } else if (typeof time === 'string') {
    //   try {
    //     const units = parseInt(time, 10);
    //     if (time.endsWith('s')) {
    //       time = units;
    //     } else if (time.endsWith('m')) {
    //       time = units * 60;
    //     } else if (time.endsWith('h')) {
    //       time = units * 3600;
    //     } else if (time.endsWith('d')) {
    //       time = units * 3600 * 24;
    //     } else if (time.endsWith('w')) {
    //       time = units * 3600 * 24 * 7;
    //     } else if (time.endsWith('y')) {
    //       time = units * 3600 * 24 * 365;
    //     } else {
    //       time = 0;
    //     }
    //   } catch (e) {
    //     throw new HttpException(
    //       'Invaliid cache control: time syntax error',
    //       501,
    //     );
    //   }
    //   res.set('Cache-Control', `public, max-age:${time}`);
    // }
    next();
  }
}
