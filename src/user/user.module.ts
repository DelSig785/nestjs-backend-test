import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { HouseModule } from './../house/house.module';
import { HouseEntity } from './../house/entities/house.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, HouseEntity]), HouseModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
