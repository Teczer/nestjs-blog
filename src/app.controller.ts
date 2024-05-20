import { Controller, Get, Render } from '@nestjs/common';
import { PostService } from './post/post.service';

@Controller()
export class AppController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @Render('home')
  async getHome() {
    const posts = await this.postService.getAllPosts();
    return { posts };
  }
}
