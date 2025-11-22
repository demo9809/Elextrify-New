import { useState } from 'react';
import { CampaignScheduler } from './components/pages/CampaignScheduler';
import { TerminalManagement } from './components/terminal/TerminalManagement';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';

type Page = 'campaigns' | 'terminals';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('campaigns');

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Sidebar activePage={currentPage} onNavigate={(page) => setCurrentPage(page as Page)} />
      <div className="ml-[240px] flex flex-col min-h-screen">
        <TopHeader />
        <div className="flex-1">
          {currentPage === 'campaigns' && <CampaignScheduler />}
          {currentPage === 'terminals' && <TerminalManagement />}
        </div>
      </div>
    </div>
  );
}

export default App;