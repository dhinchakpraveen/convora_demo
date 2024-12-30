import React from 'react';
import { Header } from './components/landing/Header';
import { Features } from './components/landing/Features';
import { HowItWorks } from './components/landing/HowItWorks';
import { BetaAccess } from './components/landing/BetaAccess';
import { Footer } from './components/landing/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Features />
      <HowItWorks />
      <BetaAccess />
      <Footer />
    </div>
  );
}

export default App;