import {
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ConnectionInterface } from './interfaces/connection.interface';
import { WsClientInterface } from './interfaces/ws-client.interface';
import { Item } from '../items/item.entity';
import { Component, Injectable } from '@nestjs/common';

@WebSocketGateway('/ws')
@Injectable()
export class WsGateway {
  @WebSocketServer() server;
  protected connections: Array<ConnectionInterface> = [];

  handleConnection(client: WsClientInterface) {
    this.connections.push({
      socket: client,
    });
  }

  handleDisconnect(client: WsClientInterface, reason) {
    this.removeFromConnections(client);
  }

  protected removeFromConnections(client: WsClientInterface) {
    this.connections.map((item, index) => {
      if (client.id === item.socket.id) this.connections.splice(index, 1);
      return client;
    });
  }

  public emitNewItem(item: Item) {
    this.broadcast('create_item', item);
  }

  public emitDeleteItem(itemId: number) {
    this.broadcast('delete_item', {
      item_id: itemId,
    });
  }

  public emitUpdateItem(item: Item) {
    this.broadcast('update_item', item);
  }

  protected broadcast(event: string, payload) {
    this.connections.map((item) => {
      item.socket.emit(event, payload);
    });
  }
}
