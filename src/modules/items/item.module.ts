import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { WsModule } from '../ws/ws.module';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), WsModule],
  providers: [ItemService, WsModule],
  controllers: [ItemController],
  exports: [ItemService],
})
export class ItemModule {
}
