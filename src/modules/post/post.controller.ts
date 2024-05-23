import { Controller, Post, UseGuards, Request, Body,Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { PostService } from "./post.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { Post as PostEnitity } from './entities/post.entity';
import { CreatePostDto } from "./dto/create-post.dto";


@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({
    summary: 'Endpoint to create post',
  })
  @ApiBody({ type: CreatePostDto })
  @ApiBearerAuth()
  async createPost(@Request() req, @Body() createPostDto: CreatePostDto) {
    const createdBy = req.user.id; 
    return this.postService.createPost(createPostDto, createdBy);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({
    summary: 'Endpoint to get all posts',
  })
  @ApiBearerAuth()
  async getAllPosts(): Promise<PostEnitity[]> {
    return this.postService.getAllPosts();
  }
}