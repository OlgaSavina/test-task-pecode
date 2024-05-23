import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import * as argon2 from 'argon2';

import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(authDto: AuthDto) {
    try {
      console.log(authDto);
      const user = await this.validateUser(authDto.email, authDto.password);

      if (!user) {
        throw new UnauthorizedException();
      }

      const token = await this.userService.createToken(authDto.email);

      return {
        token,
      };
    } catch (error) {
      throw new BadRequestException('Login failed');
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    try {
      const user = await this.userService.findOne(email);

      if (!user) {
        throw new BadRequestException('User not found');
      }

      const passwordIsMatch = await argon2.verify(
        user.hashedPassword,
        password,
      );

      if (user && passwordIsMatch) {
        return user;
      }

      throw new BadRequestException('Email or password are incorrect');
    } catch (error) {
      throw new BadRequestException('Validation failed');
    }
  }
}
