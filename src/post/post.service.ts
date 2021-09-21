import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';
import { SearchPostDto } from './dto/search-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity) public postsRepo: Repository<PostEntity>) {}
  
    create(createPostDto: CreatePostDto) {
    return this.postsRepo.save(createPostDto)
  }

  findAll() {
    return this.postsRepo.find({
      order: {
        createdAt: 'DESC'
      }
    });
  }

  async popular() {
    const qb = this.postsRepo.createQueryBuilder();
    
    qb.orderBy('views', 'DESC');
    qb.limit(5);

    const [items, total] = await qb.getManyAndCount();
    return {
      items, total
    }
  }

  async search(searchPostDto: SearchPostDto) {
    const qb = this.postsRepo.createQueryBuilder('p');
    
    qb.limit(searchPostDto.limit || 0);
    qb.take(searchPostDto.take || 10);

      if (searchPostDto.views) {
        qb.orderBy('views', searchPostDto.views);
      }
      if (searchPostDto.body) {
        qb.andWhere(`p.body ILIKE :body`)
      }

      if (searchPostDto.title) {
        qb.andWhere(`p.title ILIKE :title`)
      }

      if (searchPostDto.tag) {
        qb.andWhere(`p.tags ILIKE :tag`)
      }

      qb.setParameters({
        title: `%${searchPostDto.title}%`,
        body: `%${searchPostDto.body}%`,
        tag: `%${searchPostDto.tag}%`,
        views: searchPostDto.views || 'DESC'
      })

      const [items, total] = await qb.getManyAndCount();
      return { items, total }
    
  }

  async findOne(id: number) {
    // const find = await this.postsRepo.findOne(+id);
    const qb = await this.postsRepo.createQueryBuilder('posts');
    await qb.whereInIds(id)
      .update()
      .set({
        views: () => 'views + 1',
      })
      .execute();
      
      return this.postsRepo.findOne(id);
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const find = this.postsRepo.findOne(+id);

    if (!find) {
      throw new NotFoundException('Post not found')
    }
    return this.postsRepo.update(id, updatePostDto)
  }

  async remove(id: number) {
    const find = this.postsRepo.findOne(+id);

    if (!find) {
      throw new NotFoundException('Post not found')
    }
    return this.postsRepo.delete(id)
  }
}
