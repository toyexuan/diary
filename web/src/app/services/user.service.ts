import { Injectable } from '@angular/core';
import { config, ServiceFlavor } from '../config/client_config';
import { UserProfile } from '../lib/types/user.types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {}

  public async getUserProfile(): Promise<UserProfile> {
    switch (config.flavor) {
      case ServiceFlavor.LOCAL: {
        return {
          name: 'he',
          userId: 'mockId'
        };
      }
      case ServiceFlavor.PROD: {
      }
    }
  }

  public async login(pass: string): Promise<boolean> {
    switch (config.flavor) {
      case ServiceFlavor.LOCAL: {
        return true;
      }
      case ServiceFlavor.PROD: {
      }
    }
  }
}
