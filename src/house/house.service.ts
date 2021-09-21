import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { HouseEntity } from './entities/house.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { FileService } from 'src/files/files.service';

@Injectable()
export class HouseService {
  constructor(
    @InjectRepository(HouseEntity) public readonly housesRepo: Repository<HouseEntity>,
    @InjectRepository(UserEntity) public usersRepo: Repository<UserEntity>,
    private fileService: FileService
    ) {}

    async create(createHouseDto: CreateHouseDto, id: number) {
      let house = new HouseEntity()
      house.userId = createHouseDto.userId;
      house.address = createHouseDto.address;
      house.cost = createHouseDto.cost;
      
      

      // const user = await this.usersRepo.findOne({where: {id}});
      // if (!user) {
      //   throw new HttpException('You can not add house without userID', HttpStatus.BAD_REQUEST)
      // }
      const newHouse = await this.housesRepo.save(house)
      return newHouse;
    }

    async findAll() {
      return await this.housesRepo.find()
    }


  async findOne(id: number) {
      return await this.housesRepo.findOne(id);
  }

  async update(id: number, updateHouseDto: UpdateHouseDto) {
    const house = await this.housesRepo.findOne({where: { id }});

    try {
        const updateHouse = Object.assign(house, {...updateHouseDto});
        house.userId = updateHouseDto.userId;
        house.address = updateHouseDto.address;
        house.cost = updateHouseDto.cost;
        return await this.housesRepo.save(updateHouse);
    } catch (err) {
      throw new HttpException('Can not be updated', HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: number) {
    try {
      const house = await this.housesRepo.findOne({ where: { id }});
      await this.housesRepo.delete(house)
    } catch (err) {
      throw new HttpException('You can not delete this house', HttpStatus.BAD_REQUEST)
    }
  }
}
