import React from 'react';
import { BetaAccessButton } from './BetaAccessButton';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          Turn Conversations Into Impactful Content
        </h1>
        <p className="text-xl mb-12 max-w-2xl mx-auto">
          Host video calls, record effortlessly, and let AI transform them into podcasts 
          and engaging short videos.
        </p>
        <div className="space-y-4">
          <BetaAccessButton />
          <p className="text-sm text-blue-100">
            Convora is currently invite-only. Apply now to join the waitlist.
          </p>
        </div>
      </div>
    </header>
  );
}