import { useState } from 'react';
import { CampaignScheduler } from './components/pages/CampaignScheduler';
import { TerminalManagement } from './components/terminal/TerminalManagement';
import { WelcomeScreen } from './components/welcome/WelcomeScreen';
import { PlaylistManager } from './components/playlists/PlaylistManager';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';

type Page = 'welcome' | 'campaigns' | 'terminals' | 'playlists';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('welcome');

  const handleNavigate = (route: string) => {
    // Map routes to pages
    if (route.includes('campaign')) {
      setCurrentPage('campaigns');
    } else if (route.includes('terminal') || route.includes('kiosk')) {
      setCurrentPage('terminals');
    } else if (route.includes('playlist')) {
      setCurrentPage('playlists');
    }
    // Add more route mappings as needed
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Sidebar activePage={currentPage} onNavigate={(page) => setCurrentPage(page as Page)} />
      <div className="ml-[240px] flex flex-col min-h-screen">
        <TopHeader />
        <div className="flex-1">
          {currentPage === 'welcome' && (
            <WelcomeScreen onNavigate={handleNavigate} />
          )}
          {currentPage === 'campaigns' && <CampaignScheduler />}
          {currentPage === 'terminals' && <TerminalManagement />}
          {currentPage === 'playlists' && <PlaylistManager />}
        </div>
      </div>
    </div>
  );
}

export default App;