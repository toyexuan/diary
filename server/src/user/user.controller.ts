import {
  Controller,
  Get,
  Headers as HttpHeaders,
  Response as HttpResponse,
  Post,
  Body,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/shared/authentication/auth.service';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Get('api/user-profile')
  public async getUserProfile(@HttpHeaders() headers) {
    const sign = headers.get('Jwt');
    if (!sign) {
      return;
    }

    const user = await this.authService.validateUserByJwt(sign);
    if (!user) {
      return;
    }

    return {
      name: user.name,
      userId: user._id,
    };
  }

  @Post('/api/user-login')
  public async login(
    @HttpResponse() response: Response,
    @Body() body: { password: string },
  ) {
    const user = await this.userService.login(body.password);
    if (!user) {
      response.sendStatus(400);
    } else {
      const signedUser = await this.authService.createJwtToken(body.password);
      response.set('Jwt', signedUser.access_token);
      const userProfile = {
        name: user.name,
        userId: user._id,
      };

      response.send(userProfile);
    }
  }
}
