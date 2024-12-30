import React from 'react';
import { BetaAccessButton } from './BetaAccessButton';
import { ContactForm } from './ContactForm';

export function BetaAccess() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-500 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Join Our Beta Program</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Convora is launching with an exclusive invite-only model to foster a close-knit, 
          vibrant community of creators and visionaries. Want to be part of this revolution? 
          Apply for beta access today.
        </p>
        <ContactForm />
      </div>
    </section>
  );
}