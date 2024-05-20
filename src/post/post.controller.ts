import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  Session,
} from '@nestjs/common';
import { AddPostDto } from './dtos/addPostDto';
import { PostService } from './post.service';
import { User } from 'src/user/user.entity';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get('/add')
  @Render('post/addPost')
  getAddPost() {}

  @Post('/add')
  @Redirect('/')
  async postAddPost(
    @Body() body: AddPostDto,
    @Session() session: Record<string, any>,
  ) {
    const currentUser: User = session.user;
    return await this.postService.postAddPost(body, currentUser);
  }
}
