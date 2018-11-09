import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { Repository } from 'typeorm';
import { ItemDto, UpdateItemIdo } from './item.dto';
import { WsGateway } from '../ws/ws.gateway';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    private readonly ws: WsGateway,
  ) {
  }

  async findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  async create(item: ItemDto): Promise<Item> {
    let dbRecord = new Item();
    dbRecord.name = item.name;
    dbRecord.description = item.description;
    dbRecord.created_at = Math.floor(Date.now() / 1000);
    dbRecord = await this.itemRepository.save(dbRecord);
    this.ws.emitNewItem(dbRecord);
    return dbRecord;
  }

  async delete(itemId: number): Promise<boolean> {
    const item = await this.itemRepository.findOne(itemId);
    if (!item) {
      return false;
    }
    this.ws.emitDeleteItem(itemId);
    await this.itemRepository.delete(item);
    return true;
  }

  async update(item: UpdateItemIdo): Promise<Item> {
    const dbRecord = await this.itemRepository.findOne(item.id);
    if (!dbRecord) throw new HttpException('Update error. Item with current id not found', HttpStatus.BAD_REQUEST);
    dbRecord.name = item.name;
    dbRecord.description = item.description;
    await this.itemRepository.update({
      id: dbRecord.id,
    }, dbRecord);
    this.ws.emitUpdateItem(dbRecord);
    return dbRecord;
  }
}
