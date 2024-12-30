import { EventEmitter } from 'events';

export class WebRTCClient extends EventEmitter {
  private peerConnection: RTCPeerConnection | null = null;
  private socket: WebSocket | null = null;
  private localStream: MediaStream | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private chunks: Blob[] = [];

  constructor(private roomId: string) {
    super();
    this.initWebSocket();
    this.initPeerConnection();
  }

  private initPeerConnection() {
    this.peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.sendSignalingMessage({
          type: 'ice-candidate',
          candidate: event.candidate
        });
      }
    };

    this.peerConnection.ontrack = (event) => {
      this.emit('remoteStream', event.streams[0]);
    };
  }

  private initWebSocket() {
    this.socket = new WebSocket(`ws://localhost:8000/ws/signaling/${this.roomId}`);
    this.socket.onmessage = this.handleSignalingMessage.bind(this);
  }

  async initializeMedia() {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      this.localStream.getTracks().forEach(track => {
        this.peerConnection?.addTrack(track, this.localStream!);
      });

      return this.localStream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      throw error;
    }
  }

  async startRecording() {
    if (!this.localStream) throw new Error('No media stream available');

    this.chunks = [];
    this.mediaRecorder = new MediaRecorder(this.localStream);

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.chunks.push(event.data);
      }
    };

    this.mediaRecorder.onstop = () => {
      const blob = new Blob(this.chunks, { type: 'video/webm' });
      this.emit('recordingComplete', blob);
    };

    this.mediaRecorder.start();
  }

  stopRecording() {
    this.mediaRecorder?.stop();
  }

  private async handleSignalingMessage(event: MessageEvent) {
    const message = JSON.parse(event.data);
    
    switch (message.type) {
      case 'offer':
        await this.handleOffer(message.offer);
        break;
      case 'answer':
        await this.handleAnswer(message.answer);
        break;
      case 'ice-candidate':
        await this.handleIceCandidate(message.candidate);
        break;
    }
  }

  private async handleOffer(offer: RTCSessionDescriptionInit) {
    await this.peerConnection?.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await this.peerConnection?.createAnswer();
    await this.peerConnection?.setLocalDescription(answer);
    
    this.sendSignalingMessage({
      type: 'answer',
      answer
    });
  }

  private async handleAnswer(answer: RTCSessionDescriptionInit) {
    await this.peerConnection?.setRemoteDescription(new RTCSessionDescription(answer));
  }

  private async handleIceCandidate(candidate: RTCIceCandidateInit) {
    await this.peerConnection?.addIceCandidate(new RTCIceCandidate(candidate));
  }

  private sendSignalingMessage(message: any) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    }
  }

  async createOffer() {
    const offer = await this.peerConnection?.createOffer();
    await this.peerConnection?.setLocalDescription(offer);
    
    this.sendSignalingMessage({
      type: 'offer',
      offer
    });
  }

  disconnect() {
    this.localStream?.getTracks().forEach(track => track.stop());
    this.peerConnection?.close();
    this.socket?.close();
    this.mediaRecorder?.stop();
  }
}