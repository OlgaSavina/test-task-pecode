import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    try {
      const existUser = await this.userRepository.findOne({
        where: {
          email: registerUserDto.email,
        },
      });

      if (existUser) {
        throw new BadRequestException('This email already exists');
      }

      const user = await this.userRepository.save({
        name: registerUserDto.name,
        email: registerUserDto.email,
        hashedPassword: await argon2.hash(registerUserDto.password),
      });

      const token = this.jwtService.sign({ email: registerUserDto.email });
      return {
        user: { email: user.email, id: user.id },
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(email: string): Promise<User> {
    try {
      return await this.userRepository.findOne({
        where: {
          email,
        },
      });
    } catch (error) {
      throw new Error(`Error finding user: ${error.message}`);
    }
  }
}
