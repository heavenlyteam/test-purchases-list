import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WsModule } from './modules/ws/ws.module';
import { ItemModule } from './modules/items/item.module';
import { Connection } from 'typeorm';
import { ItemController } from './modules/items/item.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    WsModule,
    ItemModule,
  ],
  controllers: [AppController, ItemController],
  providers: [AppService, ItemModule, WsModule],
})
export class AppModule {
  constructor(private readonly connection: Connection) {
  }
}
