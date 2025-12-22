import { useState, useEffect } from 'react';
import { Activity, TrendingUp } from 'lucide-react';
import OperationalDashboard from './OperationalDashboard';
import FinanceDashboard from './FinanceDashboard';

type DashboardView = 'operational' | 'finance';

export default function DashboardContainer() {
  // Persist last selected view in sessionStorage
  const [activeView, setActiveView] = useState<DashboardView>(() => {
    const saved = sessionStorage.getItem('dashboard-view');
    return (saved as DashboardView) || 'operational';
  });

  // Save view preference
  useEffect(() => {
    sessionStorage.setItem('dashboard-view', activeView);
  }, [activeView]);

  const views = [
    {
      id: 'operational' as DashboardView,
      label: 'Operational',
      icon: Activity,
      description: 'Network health and real-time status',
    },
    {
      id: 'finance' as DashboardView,
      label: 'Finance',
      icon: TrendingUp,
      description: 'Revenue, billing, and financial metrics',
    },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F9FAFB]">
      {/* Dashboard View Switcher */}
      <div className="bg-white border-b border-[#E5E7EB] px-8 py-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-[#111827] mb-1">Dashboard</h1>
            <p className="text-sm text-[#6B7280]">
              {views.find((v) => v.id === activeView)?.description}
            </p>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex gap-1 bg-[#F9FAFB] p-1 rounded-lg inline-flex">
          {views.map((view) => {
            const Icon = view.icon;
            const isActive = activeView === view.id;

            return (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all
                  ${
                    isActive
                      ? 'bg-white text-[#D9480F] shadow-sm'
                      : 'text-[#6B7280] hover:text-[#111827]'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span>{view.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Dashboard View */}
      <div className="flex-1 overflow-hidden">
        {activeView === 'operational' && <OperationalDashboard />}
        {activeView === 'finance' && <FinanceDashboard />}
      </div>
    </div>
  );
}