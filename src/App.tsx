import { useState } from 'react';
import { CampaignScheduler } from './components/pages/CampaignScheduler';
import { TerminalManagement } from './components/terminal/TerminalManagement';
import { WelcomeScreen } from './components/welcome/WelcomeScreen';
import { PlaylistManager } from './components/playlists/PlaylistManager';
import { MediaManager } from './components/media/MediaManager';
import { ClientManager } from './components/clients/ClientManager';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { TopHeader } from './components/TopHeader';

type Page = 'welcome' | 'campaigns' | 'terminals' | 'playlists' | 'media' | 'customers';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('welcome');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleNavigate = (route: string) => {
    // Map routes to pages
    if (route.includes('campaign')) {
      setCurrentPage('campaigns');
    } else if (route.includes('terminal') || route.includes('kiosk')) {
      setCurrentPage('terminals');
    } else if (route.includes('playlist')) {
      setCurrentPage('playlists');
    } else if (route.includes('media')) {
      setCurrentPage('media');
    } else if (route.includes('customer') || route.includes('client')) {
      setCurrentPage('customers');
    }
    // Add more route mappings as needed
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Desktop/Tablet Sidebar */}
      <div className="hidden lg:block">
        <Sidebar 
          activePage={currentPage} 
          onNavigate={(page) => setCurrentPage(page as Page)}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      {/* Mobile Navigation */}
      <MobileNav 
        activePage={currentPage}
        onNavigate={(page) => setCurrentPage(page as Page)}
      />

      {/* Main Content */}
      <div 
        className={`flex flex-col min-h-screen transition-all duration-300 pt-14 lg:pt-0 ${
          isSidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-[240px]'
        }`}
      >
        {/* Desktop Header - hidden on mobile */}
        <div className="hidden lg:block">
          <TopHeader />
        </div>

        <div className="flex-1">
          {currentPage === 'welcome' && (
            <WelcomeScreen onNavigate={handleNavigate} />
          )}
          {currentPage === 'campaigns' && <CampaignScheduler />}
          {currentPage === 'terminals' && <TerminalManagement />}
          {currentPage === 'playlists' && <PlaylistManager />}
          {currentPage === 'media' && <MediaManager />}
          {currentPage === 'customers' && <ClientManager />}
        </div>
      </div>
    </div>
  );
}

export default App;