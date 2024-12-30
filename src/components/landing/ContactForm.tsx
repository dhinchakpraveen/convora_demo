import React, { useState } from 'react';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form will be handled by Netlify
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center p-6 bg-green-50 rounded-lg">
        <h3 className="text-xl font-semibold text-green-800 mb-2">Thank You!</h3>
        <p className="text-green-700">We'll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-4"
    >
      <input type="hidden" name="form-name" value="contact" />
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-white mb-1">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          required
          rows={4}
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
          placeholder="Tell us about your interest in Convora..."
        />
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
      >
        Send Message
      </button>
    </form>
  );
}