import React from 'react';
import { Video, Library, Settings, User2 } from 'lucide-react';

export function Navigation() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Video className="w-6 h-6 text-indigo-600" />
              <span className="font-bold text-xl">VideoHub</span>
            </div>
            <div className="hidden md:flex space-x-4">
              <NavLink icon={<Video />} label="Meetings" />
              <NavLink icon={<Library />} label="Recordings" />
              <NavLink icon={<Settings />} label="Settings" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="btn-primary">New Meeting</button>
            <User2 className="w-8 h-8 text-gray-600" />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <a href="#" className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600">
      {icon}
      <span>{label}</span>
    </a>
  );
}