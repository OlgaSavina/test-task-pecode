import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as argon2 from 'argon2';

import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

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

  async login(user: User) {
    try {
      return {
        token: this.jwtService.sign({
          id: user.id,
          email: user.email,
        }),
      };
    } catch (error) {
      throw new BadRequestException('Login failed');
    }
  }
}
