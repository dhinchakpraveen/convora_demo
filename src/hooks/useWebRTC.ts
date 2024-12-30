import { useState, useEffect, useCallback } from 'react';
import { WebRTCClient } from '../services/webrtc';
import { RecordingService } from '../services/recording';

export function useWebRTC(roomId: string) {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const webrtc = new WebRTCClient(roomId);
  const recordingService = new RecordingService();

  useEffect(() => {
    webrtc.on('remoteStream', (stream: MediaStream) => {
      setRemoteStream(stream);
    });

    webrtc.on('recordingComplete', async (blob: Blob) => {
      try {
        const url = await recordingService.uploadRecording(blob);
        console.log('Recording uploaded:', url);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to upload recording'));
      }
    });

    return () => {
      webrtc.disconnect();
    };
  }, [roomId]);

  const startCall = useCallback(async () => {
    try {
      const stream = await webrtc.initializeMedia();
      setLocalStream(stream);
      await webrtc.createOffer();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to start call'));
    }
  }, []);

  const startRecording = useCallback(() => {
    try {
      webrtc.startRecording();
      setIsRecording(true);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to start recording'));
    }
  }, []);

  const stopRecording = useCallback(() => {
    webrtc.stopRecording();
    setIsRecording(false);
  }, []);

  return {
    localStream,
    remoteStream,
    isRecording,
    error,
    startCall,
    startRecording,
    stopRecording
  };
}