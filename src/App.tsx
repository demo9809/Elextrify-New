import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { TopHeader } from './components/TopHeader';
import { GlobalFooter } from './components/GlobalFooter';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LegalEntityProvider } from './contexts/LegalEntityContext';
import LoginScreen from './components/auth/LoginScreen';
import AccessRestricted from './components/auth/AccessRestricted';
import React from 'react';
import { Toaster } from 'sonner@2.0.3';

// Import all page components
import { WelcomeScreen } from './components/welcome/WelcomeScreen';
import DashboardContainer from './components/operational-dashboard/DashboardContainer';
import { CampaignScheduler } from './components/pages/CampaignScheduler';
import SettingsHub from './components/settings/SettingsHub';
import GlobalAlertBanner from './components/GlobalAlertBanner';

type Page = 'welcome' | 'dashboard' | 'campaigns' | 'settings';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { isAuthenticated } = useAuth();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Determine current page from route
  const getCurrentPage = (): Page => {
    const path = location.pathname;
    if (path === '/dashboard') return 'dashboard';
    if (path.includes('/campaigns')) return 'campaigns';
    if (path.includes('/settings')) return 'settings';
    return 'welcome';
  };

  const currentPage = getCurrentPage();

  const handleNavigate = (page: string) => {
    // Map page names to routes
    const routeMap: { [key: string]: string } = {
      welcome: '/',
      dashboard: '/dashboard',
      campaigns: '/campaigns',
      settings: '/settings',
    };
    navigate(routeMap[page] || '/');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Desktop/Tablet Sidebar */}
      <div className="hidden lg:block">
        <Sidebar 
          activePage={currentPage} 
          onNavigate={handleNavigate}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      {/* Mobile Navigation */}
      <MobileNav 
        activePage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main Content */}
      <div 
        className={`flex flex-col min-h-screen transition-all duration-300 pt-14 lg:pt-16 ${
          isSidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-[240px]'
        }`}
      >
        {/* Desktop Header - hidden on mobile */}
        <div className="hidden lg:block">
          <TopHeader 
            isSidebarCollapsed={isSidebarCollapsed} 
            onNavigate={handleNavigate}
          />
        </div>

        {/* Global Alert Banner - Sticky layout component below header */}
        <div className="sticky top-14 lg:top-16 z-30 bg-white">
          <GlobalAlertBanner 
            isSidebarCollapsed={isSidebarCollapsed}
          />
        </div>

        {/* Page Content - Naturally pushed down by banner when visible */}
        <div className="flex-1 pb-12">
          <Routes>
            <Route path="/" element={<WelcomeScreen onNavigate={(route) => navigate(route)} />} />
            <Route path="/dashboard" element={<DashboardContainer />} />
            <Route path="/campaigns" element={<CampaignScheduler />} />
            <Route path="/settings" element={<SettingsHub />} />
          </Routes>
        </div>

        {/* Desktop Footer - hidden on mobile */}
        <div className="hidden lg:block">
          <GlobalFooter 
            onNavigate={handleNavigate}
            isSidebarCollapsed={isSidebarCollapsed}
          />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <LegalEntityProvider>
        <BrowserRouter>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/access-restricted" element={<AccessRestricted />} />
            <Route path="*" element={<AppContent />} />
          </Routes>
        </BrowserRouter>
      </LegalEntityProvider>
    </AuthProvider>
  );
}

export default App;