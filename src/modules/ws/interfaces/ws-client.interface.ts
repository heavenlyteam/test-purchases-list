interface Broadcast {
  emit(event: string, payload: any);
}

export interface WsClientInterface {
  id: string;
  emit(event: string, payload: any);
  broadcast: Broadcast;
  disconnect();
}
