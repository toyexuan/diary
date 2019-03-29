import { NestMiddleware, ExpressMiddleware } from '@nestjs/common';
export declare class CacheMiddleware implements NestMiddleware {
    resolve(time: number | string): ExpressMiddleware;
}
