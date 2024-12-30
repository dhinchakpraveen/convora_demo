import React from 'react';
import { Clock, FileText } from 'lucide-react';
import type { Recording } from '../types';

const mockRecordings: Recording[] = [
  {
    id: '1',
    title: 'Team Weekly Sync',
    date: '2024-03-15',
    duration: 3600,
    thumbnail: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e',
    transcript: 'Meeting transcript...',
    summary: 'Discussed Q1 goals and project timeline...'
  },
  {
    id: '2',
    title: 'Client Presentation',
    date: '2024-03-14',
    duration: 1800,
    thumbnail: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678',
    transcript: 'Presentation transcript...',
    summary: 'Presented new feature proposals...'
  }
];

export function RecordingsList() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {mockRecordings.map((recording) => (
        <div key={recording.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={recording.thumbnail}
            alt={recording.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-semibold text-lg">{recording.title}</h3>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {Math.floor(recording.duration / 60)} mins
              </div>
              <div className="flex items-center">
                <FileText className="w-4 h-4 mr-1" />
                Transcript
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}