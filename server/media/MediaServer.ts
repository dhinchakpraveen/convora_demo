import * as mediasoup from 'mediasoup';
import { config } from '../config';
import { Room } from './Room';

export class MediaServer {
  private worker: mediasoup.types.Worker;
  private rooms: Map<string, Room> = new Map();

  async init() {
    this.worker = await mediasoup.createWorker({
      rtcMinPort: config.mediasoup.worker.rtcMinPort,
      rtcMaxPort: config.mediasoup.worker.rtcMaxPort,
    });

    console.log('MediaSoup worker created');
  }

  async createRoom(roomId: string) {
    const router = await this.worker.createRouter({
      mediaCodecs: config.mediasoup.router.mediaCodecs,
    });

    const room = new Room(router);
    this.rooms.set(roomId, room);
    return room;
  }

  getRoom(roomId: string) {
    return this.rooms.get(roomId);
  }

  removeRoom(roomId: string) {
    const room = this.rooms.get(roomId);
    if (room) {
      room.router.close();
      this.rooms.delete(roomId);
    }
  }
}