import * as mediasoup from 'mediasoup';
import { config } from '../config';

export class Room {
  router: mediasoup.types.Router;
  peers: Map<string, any> = new Map();

  constructor(router: mediasoup.types.Router) {
    this.router = router;
  }

  async createWebRtcTransport() {
    const transport = await this.router.createWebRtcTransport(
      config.mediasoup.webRtcTransport
    );

    return {
      id: transport.id,
      iceParameters: transport.iceParameters,
      iceCandidates: transport.iceCandidates,
      dtlsParameters: transport.dtlsParameters,
    };
  }

  async connectTransport(transportId: string, dtlsParameters: mediasoup.types.DtlsParameters) {
    const transport = this.router.transports.get(transportId);
    if (!transport) throw new Error(`Transport not found: ${transportId}`);
    await transport.connect({ dtlsParameters });
  }

  async createProducer(transportId: string, kind: string, rtpParameters: mediasoup.types.RtpParameters) {
    const transport = this.router.transports.get(transportId);
    if (!transport) throw new Error(`Transport not found: ${transportId}`);
    return await transport.produce({ kind, rtpParameters });
  }

  async createConsumer(producerId: string, rtpCapabilities: mediasoup.types.RtpCapabilities) {
    if (!this.router.canConsume({ producerId, rtpCapabilities })) {
      throw new Error('Cannot consume');
    }

    const transport = await this.createWebRtcTransport();
    const consumer = await this.router.createConsumer({
      producerId,
      rtpCapabilities,
    });

    return {
      transport,
      consumer: {
        id: consumer.id,
        kind: consumer.kind,
        rtpParameters: consumer.rtpParameters,
        type: consumer.type,
        producerId: consumer.producerId,
      },
    };
  }
}