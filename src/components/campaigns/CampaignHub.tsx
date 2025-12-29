import { useState } from 'react';
import { List, Calendar } from 'lucide-react';
import { CampaignBookingManager } from './CampaignBookingManager';
import { AvailabilityCalendar } from './AvailabilityCalendar';

type ViewMode = 'bookings' | 'availability';

export function CampaignHub() {
  const [viewMode, setViewMode] = useState<ViewMode>('bookings');

  return (
    <div className="h-full flex flex-col bg-[#F9FAFB]">
      {/* View Switcher */}
      <div className="bg-white border-b border-[#E5E7EB] px-8 py-3">
        <div className="flex items-center gap-2 bg-[#F9FAFB] rounded-lg p-1 w-fit">
          <button
            onClick={() => setViewMode('bookings')}
            className={`px-5 h-10 rounded-lg font-medium transition-all flex items-center gap-2 ${
              viewMode === 'bookings'
                ? 'bg-white text-[#D9480F] shadow-sm'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            <List className="w-4 h-4" />
            <span className="text-sm">My Bookings</span>
          </button>
          <button
            onClick={() => setViewMode('availability')}
            className={`px-5 h-10 rounded-lg font-medium transition-all flex items-center gap-2 ${
              viewMode === 'availability'
                ? 'bg-white text-[#D9480F] shadow-sm'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Find Available Slots</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {viewMode === 'bookings' ? (
          <CampaignBookingManager />
        ) : (
          <AvailabilityCalendar
            onBookSlot={(slots) => {
              // Switch to bookings view and open wizard with selected slots
              console.log('Book slots:', slots);
              setViewMode('bookings');
            }}
          />
        )}
      </div>
    </div>
  );
}
