import { Middleware, NestMiddleware, ExpressMiddleware, HttpException } from '@nestjs/common';

@Middleware()
export class CacheMiddleware implements NestMiddleware {
  resolve(time: number | string): ExpressMiddleware {
    return (req, res, next) => {
      if (time <= 0 || !time) {
        res.setHeader('Cache-Control', 'no-cache, no-store');
      } else if (typeof time === 'number') {
        res.set('Cache-Control', `public, max-age:${time}`);
      } else if (typeof time === 'string') {
        try {
          let units = parseInt(time);
          if (time.endsWith('s')) time = units;
          else if (time.endsWith('m')) time = units * 60;
          else if (time.endsWith('h')) time = units * 3600;
          else if (time.endsWith('d')) time = units * 3600 * 24;
          else if (time.endsWith('w')) time = units * 3600 * 24 * 7;
          else if (time.endsWith('y')) time = units * 3600 * 24 * 365;
          else time = 0;
        }
        catch (e) {
          throw new HttpException('Invaliid cache control: time syntax error', 501);
        }
        res.set('Cache-Control', `public, max-age:${time}`);
      }
      next();
    };
  }
}