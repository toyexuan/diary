import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface } from './user.schema.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
  ) {}

  public async login(dob: string) {
    return await this.userModel.findOne({ dob }).exec();
  }

  public async createNewUser() {
    const s = await this.userModel.find({
      dob: { $in: ['1988-07-25', '1994-11-22'] },
    }).exec();

    if (s.length === 2) {
      return;
    }

    const u = new this.userModel({
      dob: '1988-07-25',
      name: 'he',
    });
    await u.save();

    const m = new this.userModel({
      dob: '1994-11-22',
      name: 'she',
    });
    await m.save();
  }
}
