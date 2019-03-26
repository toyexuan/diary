import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { DiaryController } from './diary/diary.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ServerEnvironment, CfgLoader } from './config/loader';
import { UserSchema } from './user/user.schema';
import { AuthService } from './shared/authentication/auth.service';
import { AuthModule } from './shared/authentication/auth.module';
import { UserService } from './user/user.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(new CfgLoader(ServerEnvironment.DEV).load().DB.Url),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UserController, DiaryController],
  providers: [UserService, AuthService],
})
export class AppModule {}
