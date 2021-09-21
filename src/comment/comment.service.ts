import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity) public commentsRepo: Repository<CommentEntity>) {}

  create(createCommentDto: CreateCommentDto) {
    return this.commentsRepo.save({
      text: createCommentDto.text,
      post: { id: createCommentDto.postId }
    });
  }

  findAll() {
    return this.commentsRepo.find();
  }

  findOne(id: number) {
    return this.commentsRepo.findOne(id);
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.commentsRepo.update(id, updateCommentDto)
  }

  remove(id: number) {
    return this.commentsRepo.delete(id);
  }
}
