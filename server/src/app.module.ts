import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './user/user.controller';
import { DiaryController } from './diary/diary.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ServerEnvironment, CfgLoader } from './config/loader';
import { UserSchema } from './user/user.schema';
import { AuthService } from './shared/authentication/auth.service';
import { AuthModule } from './shared/authentication/auth.module';
import { UserService } from './user/user.service';
import { DiaryService } from './diary/diary.service';
import { DiarySchema } from './diary/diary.schema';
import { CacheMiddleware } from './shared/middlewares/cache.middleware';
import { AuthMiddleware } from './shared/middlewares/auth.middleware';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(new CfgLoader(ServerEnvironment.DEV).load().DB.Url),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Diary', schema: DiarySchema }]),
  ],
  controllers: [UserController, DiaryController],
  providers: [UserService, AuthService, DiaryService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(CacheMiddleware)
      .forRoutes(UserController)
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'diary/api/post-comment', method: RequestMethod.POST },
        { path: 'diary/api/post-diary', method: RequestMethod.POST },
      );
  }
}
