import { io, Socket } from 'socket.io-client';
import * as mediasoupClient from 'mediasoup-client';

export class WebRTCClient {
  private socket: Socket;
  private device: mediasoupClient.Device;
  private producerTransport: mediasoupClient.types.Transport;
  private consumerTransport: mediasoupClient.types.Transport;
  private producer: mediasoupClient.types.Producer;
  private consumer: mediasoupClient.types.Consumer;

  constructor(private roomId: string) {
    this.socket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000');
    this.device = new mediasoupClient.Device();
  }

  async join() {
    await this.socket.emit('join-room', this.roomId);
    const routerRtpCapabilities = await this.socket.emit('get-rtp-capabilities');
    await this.device.load({ routerRtpCapabilities });
  }

  async publish(track: MediaStreamTrack) {
    const transportInfo = await this.socket.emit('create-producer-transport');
    this.producerTransport = this.device.createSendTransport(transportInfo);

    this.producerTransport.on('connect', async ({ dtlsParameters }, callback) => {
      await this.socket.emit('transport-connect', {
        transportId: this.producerTransport.id,
        dtlsParameters,
      });
      callback();
    });

    this.producerTransport.on('produce', async ({ kind, rtpParameters }, callback) => {
      const { id } = await this.socket.emit('transport-produce', {
        transportId: this.producerTransport.id,
        kind,
        rtpParameters,
      });
      callback({ id });
    });

    this.producer = await this.producerTransport.produce({ track });
  }

  async consume(producerId: string) {
    const { transport, consumer: consumerInfo } = await this.socket.emit(
      'transport-consume',
      {
        producerId,
        rtpCapabilities: this.device.rtpCapabilities,
      }
    );

    this.consumerTransport = this.device.createRecvTransport(transport);
    this.consumer = await this.consumerTransport.consume(consumerInfo);
    return this.consumer;
  }

  close() {
    this.producer?.close();
    this.consumer?.close();
    this.producerTransport?.close();
    this.consumerTransport?.close();
    this.socket.disconnect();
  }
}