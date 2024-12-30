import React from 'react';
import { Video, Wand2, Share } from 'lucide-react';

const steps = [
  {
    icon: <Video className="w-8 h-8" />,
    title: 'Start a Call',
    description: 'Start a video call with your friends, colleagues, or community.'
  },
  {
    icon: <Wand2 className="w-8 h-8" />,
    title: 'AI Magic',
    description: 'Our AI captures, edits, and repurposes your conversation into short clips and podcasts.'
  },
  {
    icon: <Share className="w-8 h-8" />,
    title: 'Share Content',
    description: 'Share short clips in the feed or allow others to discover your full conversation.'
  }
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">
          From Conversations to Content, Seamlessly
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="inline-block p-4 bg-white rounded-full shadow-md text-blue-600 mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-gray-300"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}