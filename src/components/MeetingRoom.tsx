import React from 'react';
import { Mic, MicOff, Video, VideoOff, Phone } from 'lucide-react';

export function MeetingRoom() {
  const [isMuted, setIsMuted] = React.useState(false);
  const [isVideoOff, setIsVideoOff] = React.useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="flex-1 grid grid-cols-2 gap-4 p-4">
        <div className="bg-gray-800 rounded-lg flex items-center justify-center">
          <span className="text-white">Local Video</span>
        </div>
        <div className="bg-gray-800 rounded-lg flex items-center justify-center">
          <span className="text-white">Remote Video</span>
        </div>
      </div>
      
      <div className="bg-gray-800 p-4 flex items-center justify-center space-x-4">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-4 rounded-full bg-gray-700 hover:bg-gray-600"
        >
          {isMuted ? <MicOff className="text-red-500" /> : <Mic className="text-white" />}
        </button>
        <button
          onClick={() => setIsVideoOff(!isVideoOff)}
          className="p-4 rounded-full bg-gray-700 hover:bg-gray-600"
        >
          {isVideoOff ? <VideoOff className="text-red-500" /> : <Video className="text-white" />}
        </button>
        <button className="p-4 rounded-full bg-red-600 hover:bg-red-700">
          <Phone className="text-white" />
        </button>
      </div>
    </div>
  );
}