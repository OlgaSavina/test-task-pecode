import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createToken(email: string): Promise<string> {
    return this.jwtService.sign({ email });
  }

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

      await this.userRepository.save({
        name: registerUserDto.name,
        email: registerUserDto.email,
        hashedPassword: await argon2.hash(registerUserDto.password),
      });

      const token = await this.createToken(registerUserDto.email);

      return {
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

  async getOneById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('Not found');
    }
    return user;
  }
  catch(error) {
    throw error;
  }

  async findOneById(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException('Not found');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}
