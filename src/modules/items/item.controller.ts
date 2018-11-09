import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemDto, UpdateItemIdo } from './item.dto';

@Controller('items')
export class ItemController {

  constructor(
    private readonly itemService: ItemService,
  ) {
  }

  @Get()
  async list() {
    return this.itemService.findAll();
  }

  @Post()
  async create(@Body() ItemDTO: ItemDto) {
    return this.itemService.create(ItemDTO);
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return this.itemService.delete(id);
  }

  @Put()
  update(@Body() UpdateItemDTO: UpdateItemIdo) {
    return this.itemService.update(UpdateItemDTO);
  }

}
