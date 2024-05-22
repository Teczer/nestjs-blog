import { Injectable } from '@nestjs/common';
import { AddPostDto } from './dtos/addPostDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async postAddPost(body: AddPostDto, user: User) {
    const post = this.postRepository.create(body);
    post.user = user;

    await this.postRepository.save(post);
    return 'Created Article !';
  }

  async getAllPosts() {
    const posts = await this.postRepository.find({
      order: { created_at: 'DESC' },
    });

    return posts;
  }

  async getDetailPost(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id } });
    return post;
  }
}
