import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import ImpactMetrics from '../components/ImpactMetrics';
import SuccessStories from '../components/SuccessStories';
import DonationDomains from '../components/DonationDomains';
import DisasterAlerts from '../components/DisasterAlerts';
import DonationProcess from '../components/DonationProcess';
import DonationTracking from '../components/DonationTracking';
import ChatUI from '../components/ChatUI';

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <ImpactMetrics />
        <DonationDomains />
        <DonationProcess />
        <DonationTracking />
        <SuccessStories />
        <DisasterAlerts />
      </main>
      <Footer />
      <ChatUI />
    </div>
  );
}

export default HomePage;