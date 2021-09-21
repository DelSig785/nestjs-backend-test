import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { PostEntity } from './post/entities/post.entity';
import { CommentModule } from './comment/comment.module';
import { CommentEntity } from './comment/entities/comment.entity';
import { HouseModule } from './house/house.module';
import { HouseEntity } from './house/entities/house.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Ds3578$',
    database: 'nest-backend',
    entities: [UserEntity, PostEntity, CommentEntity, HouseEntity],
    synchronize: false }), UserModule, PostModule, CommentModule, HouseModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
