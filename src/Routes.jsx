import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import WireTransferModal from './pages/wire-transfer-modal';
import TechnicalAssistantChat from './pages/technical-assistant-chat';
import LandingPage from './pages/landing-page';
import PortfolioManagement from './pages/portfolio-management';
import DashboardHome from './pages/dashboard-home';
import AIRecommendationsChat from './pages/ai-recommendations-chat';
import Login from './pages/Login';
import Signup from './pages/Signup';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/wire-transfer-modal" element={<WireTransferModal />} />
        <Route path="/technical-assistant-chat" element={<TechnicalAssistantChat />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/portfolio-management" element={<PortfolioManagement />} />
        <Route path="/dashboard-home" element={<DashboardHome />} />
        <Route path="/ai-recommendations-chat" element={<AIRecommendationsChat />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;