import { Module } from '@nestjs/common';
import { HouseService } from './house.service';
import { HouseController } from './house.controller';
import { HouseEntity } from './entities/house.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { FileService } from 'src/files/files.service';

@Module({
  imports: [TypeOrmModule.forFeature([HouseEntity, UserEntity]), HouseModule],
  controllers: [HouseController],
  providers: [HouseService, FileService]
})
export class HouseModule {}
