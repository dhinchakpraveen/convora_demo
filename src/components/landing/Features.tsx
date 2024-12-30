import React from 'react';
import { Video, Share2, Compass, Users } from 'lucide-react';
import { BetaAccessButton } from './BetaAccessButton';

const features = [
  {
    icon: <Video className="w-8 h-8" />,
    title: 'AI-Enhanced Video Calls',
    description: 'Host video calls that are automatically recorded and edited into professional-grade podcasts.'
  },
  {
    icon: <Share2 className="w-8 h-8" />,
    title: 'Short-Form Content Creation',
    description: 'Generate AI-curated short clips from your conversations to share as reels, stories, or posts.'
  },
  {
    icon: <Compass className="w-8 h-8" />,
    title: 'Feed and Discovery',
    description: 'Explore a personalized feed of short videos and discover full-length conversations or podcasts.'
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Exclusive Community',
    description: 'Join a thriving invite-only community where authentic voices and meaningful conversations thrive.'
  }
];

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Why Choose Convora?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="inline-block p-3 bg-blue-100 rounded-full text-blue-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <BetaAccessButton text="Be Part of the Beta Experience" />
        </div>
      </div>
    </section>
  );
}