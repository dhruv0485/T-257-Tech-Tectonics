import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DonationDomainsPage from './pages/DonationDomainsPage';
import DonationTrackingPage from './pages/DonationTrackingPage';
import DisasterAlertsPage from './pages/DisasterAlertsPage';
import ReportsAnalyticsPage from './pages/ReportsAnalyticsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutUsPage from './pages/AboutUsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/donation-domains" element={<DonationDomainsPage />} />
        <Route path="/donation-tracking" element={<DonationTrackingPage />} />
        <Route path="/disaster-alerts" element={<DisasterAlertsPage />} />
        <Route path="/reports-analytics" element={<ReportsAnalyticsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
      </Routes>
    </Router>
  );
}

export default App;