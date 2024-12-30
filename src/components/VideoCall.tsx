import React, { useRef, useEffect } from 'react';
import { useWebRTC } from '../hooks/useWebRTC';
import { Video, Mic, MicOff, VideoOff, Phone, Record } from 'lucide-react';

interface VideoCallProps {
  roomId: string;
}

export function VideoCall({ roomId }: VideoCallProps) {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  
  const {
    localStream,
    remoteStream,
    isRecording,
    error,
    startCall,
    startRecording,
    stopRecording
  } = useWebRTC(roomId);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="flex-1 grid grid-cols-2 gap-4 p-4">
        <div className="relative bg-gray-800 rounded-lg overflow-hidden">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
            You
          </div>
        </div>
        <div className="relative bg-gray-800 rounded-lg overflow-hidden">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
            Remote
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 p-4 flex items-center justify-center space-x-4">
        <button
          onClick={startCall}
          className="p-4 rounded-full bg-green-600 hover:bg-green-700"
        >
          <Phone className="text-white" />
        </button>
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`p-4 rounded-full ${
            isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          <Record className={`${isRecording ? 'animate-pulse' : ''} text-white`} />
        </button>
      </div>
    </div>
  );
}