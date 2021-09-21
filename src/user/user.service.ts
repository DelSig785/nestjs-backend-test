import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { HouseEntity } from 'src/house/entities/house.entity';

@Injectable()
export class UserService {
  constructor(
  @InjectRepository(UserEntity) public usersRepo: Repository<UserEntity>,
  @InjectRepository(HouseEntity) public housesRepo: Repository<HouseEntity>) {}

  async create(createUserDto: CreateUserDto) {
    // const {username, salary} = createUserDto;
    const newUser = new UserEntity();
    newUser.fullName = createUserDto.fullName;
    newUser.email = createUserDto.email;
    newUser.password = createUserDto.password;
    newUser.salary = createUserDto.salary;

    const savedUser = await this.usersRepo.save(newUser);
    return savedUser;
  }

  async findAll() {
    const users = await this.usersRepo.find({relations: ['houses']}); //{ relations: ['houses']}
    // const houses = await this.housesRepo.find({})
    return users;
  }

  async findOne(id: number) {
    const user = await this.usersRepo.findOne(id);
    if (!user) {
      throw new HttpException(
          'User with given id not found',
          HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepo.findOne(id)
    try {
        const updatedUser = Object.assign(user, {...updateUserDto});
        updatedUser.fullName = updateUserDto.fullName
        updatedUser.email = updateUserDto.email;
        updatedUser.password = updateUserDto.password;
        updatedUser.salary = updateUserDto.salary;

        // const vowelRegex = "a", "i", "e", "o", "u" //aieouAIEOU
        const vowelRegex = '^[aieouAIEOU].*'
        // const newSalary = updateUserDto.salary
        const matched = user.fullName.match(vowelRegex)
        if (user.salary % 123 > 1 && matched) {
          return updateUserDto.salary * 2
        }

        return await this.usersRepo.save(updatedUser);
    } catch (err) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
  }

  async remove(id: number) {
    return this.usersRepo.delete(id)
  }
}
