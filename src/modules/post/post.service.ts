import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../user/entities/user.entity';


@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}


  async createPost(
    createPostDto: CreatePostDto,
    createdBy: string,
  ) {
    /*const user = await this.userRepository.findOne({ where: { id: createdBy } });
    if (!user) {
      throw new UnauthorizedException('Invalid user');
    }*/

    const post = this.postRepository.create({
      post: createPostDto.post,
      createdBy:createdBy ,
    });

    return this.postRepository.save(post);
  }

  async getAllPosts(): Promise<Post[]> {
    return this.postRepository.find();
  }
}
