import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface } from 'src/user/user.schema.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
  ) {}

  private readonly secretOrKey = 'secret';
  private readonly expiresIn = '30d';

  async createJwtToken(data) {
    const token = jwt.sign(data, this.secretOrKey, {
      expiresIn: this.expiresIn,
    });
    return {
      expires_in: this.expiresIn,
      access_token: token,
    };
  }

  async validateUserByLocal({ dob }): Promise<boolean> {
    const user = await this.userModel.findOne({ dob }).exec();
    return !!user;
  }

  async validateUserByJwt(signedUser: string): Promise<UserInterface> {
    const dob = jwt.verify(signedUser, this.secretOrKey) as string;
    const user = await this.userModel.findOne({ dob }).exec();
    return user;
  }
}
