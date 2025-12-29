import { useState } from 'react';
import { Calendar, Grid3x3, Settings, BarChart3 } from 'lucide-react';
import { InventoryScheduler } from './InventoryScheduler';
import { SlotConfiguration } from './SlotConfiguration';
import { BookingAnalytics } from './BookingAnalytics';

type ViewMode = 'scheduler' | 'configuration' | 'analytics';

export function AdSlottingHub() {
  const [viewMode, setViewMode] = useState<ViewMode>('scheduler');

  return (
    <div className="h-full flex flex-col bg-[#F9FAFB]">
      {/* View Switcher */}
      <div className="bg-white border-b border-[#E5E7EB] px-8 py-3">
        <div className="flex items-center gap-2 bg-[#F9FAFB] rounded-lg p-1 w-fit">
          <button
            onClick={() => setViewMode('scheduler')}
            className={`px-5 h-10 rounded-lg font-medium transition-all flex items-center gap-2 ${
              viewMode === 'scheduler'
                ? 'bg-white text-[#D9480F] shadow-sm'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Inventory Scheduler</span>
          </button>
          <button
            onClick={() => setViewMode('configuration')}
            className={`px-5 h-10 rounded-lg font-medium transition-all flex items-center gap-2 ${
              viewMode === 'configuration'
                ? 'bg-white text-[#D9480F] shadow-sm'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span className="text-sm">Slot Configuration</span>
          </button>
          <button
            onClick={() => setViewMode('analytics')}
            className={`px-5 h-10 rounded-lg font-medium transition-all flex items-center gap-2 ${
              viewMode === 'analytics'
                ? 'bg-white text-[#D9480F] shadow-sm'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span className="text-sm">Booking Analytics</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {viewMode === 'scheduler' && <InventoryScheduler />}
        {viewMode === 'configuration' && <SlotConfiguration />}
        {viewMode === 'analytics' && <BookingAnalytics />}
      </div>
    </div>
  );
}
