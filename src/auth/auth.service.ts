import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateAuthTokenDto } from './dto/index';

@Injectable()
export class AuthService {

  constructor(private _userService: UserService) {}

  async createToken(payload: CreateAuthTokenDto) {
    const expiresIn = 60 * 60, // 60 minutes
      secretOrKey = 'secretKey';

    const user = await this._userService.findOne(payload);
    const userPayload = {
      userId: user.id,
      roles: user.roles,
    };

    const token = jwt.sign(userPayload, secretOrKey, { expiresIn });
    return {
      expires_in: expiresIn,
      access_token: token,
    };
  }

  async validateUser(signedUser): Promise<any> {

    // Strategy 1: Stateless auth
    // return true;

    // Strategy 2:
    // TODO: Validate from Key-Value store
    // (https://dev.to/yos/stateless-authentication-with-json-web-tokens--km3)
    // - Invalidate All user tokens
    // - Invalidate a token
    // - Check blacklisted user

    // Strategy 3: Validate user through DB request
    let user;

    try {
      user = await this._userService.findById(signedUser.userId);
    } catch (e) {
      console.error('validateUser: ', e);
      return null;
    }

    return user;
  }
}
