import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HouseService } from './house.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';

@Controller('houses')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Post()
  create(@Body() createHouseDto: CreateHouseDto, id: number) {
    return this.houseService.create(createHouseDto, id);
  }

  @Get()
  findAll() {
    return this.houseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.houseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHouseDto: UpdateHouseDto) {
    return this.houseService.update(+id, updateHouseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.houseService.remove(+id);
  }
}
