import {
  Controller,
  Get,
  Response as HttpResponse,
  Request as HttpRequest,
  Post,
  Body,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from '../shared/authentication/auth.service';
import { UserService } from './user.service';

@Controller('user/api')
export class UserController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Get('user-profile')
  public async getUserProfile(@HttpRequest() req: Request) {
    const sign = req.headers.jwt as string;
    if (!sign) {
      return {};
    }

    const user = await this.authService.validateUserByJwt(sign);
    if (!user) {
      return {};
    }

    return {
      name: user.name,
      userId: user._id,
    };
  }

  @Post('user-login')
  public async login(
    @HttpResponse() response: Response,
    @Body() body: { password: string },
  ) {
    await this.userService.createNewUser();
    const user = await this.userService.login(body.password);
    if (!user) {
      response.sendStatus(400);
    } else {
      const signedUser = await this.authService.createJwtToken(body.password);
      response.set('jwt', signedUser.access_token);
      user.lastLoginAt = new Date();
      await user.save();
      const userProfile = {
        name: user.name,
        userId: user._id,
      };

      response.send(userProfile);
    }
  }
}
