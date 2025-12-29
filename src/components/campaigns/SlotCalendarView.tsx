import { useMemo } from 'react';
import { Monitor, Zap, Clock, DollarSign } from 'lucide-react';
import { TimeSlot, Kiosk } from './SlotScheduler';

interface SlotCalendarViewProps {
  slots: TimeSlot[];
  kiosks: Kiosk[];
  viewMode: 'week' | 'day' | 'list';
  onSlotClick: (slot: TimeSlot) => void;
  onSlotBook: (slot: TimeSlot) => void;
}

export function SlotCalendarView({
  slots,
  kiosks,
  viewMode,
  onSlotClick,
  onSlotBook
}: SlotCalendarViewProps) {
  if (viewMode === 'list') {
    return <ListView slots={slots} onSlotClick={onSlotClick} onSlotBook={onSlotBook} />;
  }

  return <WeekGridView slots={slots} kiosks={kiosks} onSlotClick={onSlotClick} onSlotBook={onSlotBook} />;
}

// Week Grid View (Google Calendar Style)
function WeekGridView({
  slots,
  kiosks,
  onSlotClick,
  onSlotBook
}: Omit<SlotCalendarViewProps, 'viewMode'>) {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: 12 }, (_, i) => i + 9); // 9 AM - 9 PM

  // Group slots by kiosk and time
  const slotsByKioskAndTime = useMemo(() => {
    const grouped: Record<string, Record<string, TimeSlot>> = {};
    
    slots.forEach(slot => {
      if (!grouped[slot.kioskId]) {
        grouped[slot.kioskId] = {};
      }
      const key = `${new Date(slot.date).getDay()}-${slot.startTime}`;
      grouped[slot.kioskId][key] = slot;
    });
    
    return grouped;
  }, [slots]);

  return (
    <div className="h-full overflow-auto p-8">
      <div className="min-w-[1200px]">
        {kiosks.map(kiosk => (
          <div key={kiosk.id} className="mb-8">
            {/* Kiosk Header */}
            <div className="bg-white border border-[#E5E7EB] rounded-t-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#F9FAFB] rounded-lg flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-[#6B7280]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#111827]">{kiosk.name}</h3>
                  <p className="text-xs text-[#6B7280]">{kiosk.location} • {kiosk.venueType}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  kiosk.status === 'online'
                    ? 'bg-[#D1FAE5] text-[#16A34A]'
                    : 'bg-[#FEE2E2] text-[#DC2626]'
                }`}>
                  {kiosk.status === 'online' ? '● Online' : '● Offline'}
                </span>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="bg-white border border-[#E5E7EB] border-t-0 rounded-b-xl overflow-hidden">
              {/* Day Headers */}
              <div className="grid grid-cols-8 border-b border-[#E5E7EB]">
                <div className="p-3 bg-[#F9FAFB] border-r border-[#E5E7EB]">
                  <p className="text-xs font-medium text-[#6B7280]">Time</p>
                </div>
                {daysOfWeek.map(day => (
                  <div key={day} className="p-3 bg-[#F9FAFB] border-r border-[#E5E7EB] last:border-r-0">
                    <p className="text-xs font-medium text-[#111827] text-center">{day}</p>
                  </div>
                ))}
              </div>

              {/* Time Slots */}
              {hours.map(hour => (
                <div key={hour} className="grid grid-cols-8 border-b border-[#E5E7EB] last:border-b-0">
                  {/* Hour Label */}
                  <div className="p-3 bg-[#FAFAFA] border-r border-[#E5E7EB] flex items-center">
                    <p className="text-xs font-medium text-[#6B7280]">
                      {hour === 12 ? '12' : hour > 12 ? hour - 12 : hour}:00 {hour >= 12 ? 'PM' : 'AM'}
                    </p>
                  </div>

                  {/* Day Slots */}
                  {daysOfWeek.map((day, dayIndex) => {
                    const key = `${dayIndex + 1}-${hour.toString().padStart(2, '0')}:00`;
                    const slot = slotsByKioskAndTime[kiosk.id]?.[key];

                    if (!slot) {
                      return (
                        <div
                          key={`${day}-${hour}`}
                          className="p-2 border-r border-[#E5E7EB] last:border-r-0 min-h-[80px] bg-[#FAFAFA]"
                        />
                      );
                    }

                    return (
                      <SlotCell
                        key={slot.id}
                        slot={slot}
                        onClick={() => onSlotClick(slot)}
                        onBook={() => onSlotBook(slot)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Slot Cell Component
interface SlotCellProps {
  slot: TimeSlot;
  onClick: () => void;
  onBook: () => void;
}

function SlotCell({ slot, onClick, onBook }: SlotCellProps) {
  const getStatusColor = () => {
    switch (slot.status) {
      case 'booked':
        return 'bg-[#D1FAE5] border-[#16A34A] hover:bg-[#BBF7D0]';
      case 'partially-booked':
        return 'bg-[#FEF3C7] border-[#F59E0B] hover:bg-[#FDE68A]';
      case 'free':
        return 'bg-white border-[#E5E7EB] hover:bg-[#F9FAFB]';
      default:
        return 'bg-white border-[#E5E7EB]';
    }
  };

  const getStatusIcon = () => {
    switch (slot.status) {
      case 'booked':
        return <Zap className="w-3 h-3 text-[#16A34A]" />;
      case 'partially-booked':
        return <Clock className="w-3 h-3 text-[#F59E0B]" />;
      default:
        return null;
    }
  };

  const bookedPercentage = useMemo(() => {
    if (slot.bookings.length === 0) return 0;
    
    const totalBookedTime = slot.bookings.reduce((sum, b) => {
      if (b.scheduleType === 'fixed' && b.exactStartTime && b.exactEndTime) {
        const [startH, startM] = b.exactStartTime.split(':').map(Number);
        const [endH, endM] = b.exactEndTime.split(':').map(Number);
        return sum + ((endH * 60 + endM) - (startH * 60 + startM)) * 60;
      }
      return sum + (b.totalPlayTime || 0);
    }, 0);
    
    return Math.min(100, (totalBookedTime / slot.duration) * 100);
  }, [slot]);

  return (
    <div
      onClick={onClick}
      className={`p-2 border-r border-[#E5E7EB] last:border-r-0 min-h-[80px] transition-all group relative cursor-pointer ${getStatusColor()}`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            {getStatusIcon()}
            {slot.pricingTier === 'peak' && (
              <span className="px-1.5 py-0.5 bg-[#D9480F] text-white text-[10px] font-medium rounded">
                PEAK
              </span>
            )}
          </div>
          <p className="text-xs font-medium text-[#6B7280]">
            ${slot.basePrice}
          </p>
        </div>

        {/* Bookings */}
        {slot.bookings.length > 0 ? (
          <div className="flex-1 space-y-1">
            {slot.bookings.slice(0, 2).map(booking => (
              <div
                key={booking.id}
                className="px-2 py-1 bg-white/80 rounded text-left"
              >
                <p className="text-[10px] font-medium text-[#111827] truncate">
                  {booking.clientName}
                </p>
                <p className="text-[9px] text-[#6B7280] truncate">
                  {booking.mediaName}
                </p>
              </div>
            ))}
            {slot.bookings.length > 2 && (
              <p className="text-[10px] text-[#6B7280] text-center">
                +{slot.bookings.length - 2} more
              </p>
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBook();
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 bg-[#D9480F] text-white text-xs font-medium rounded hover:bg-[#C13F0D]"
            >
              Book Slot
            </button>
          </div>
        )}

        {/* Progress Bar */}
        {bookedPercentage > 0 && (
          <div className="mt-2 h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${
                bookedPercentage >= 100 ? 'bg-[#16A34A]' : 'bg-[#F59E0B]'
              }`}
              style={{ width: `${bookedPercentage}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// List View
function ListView({
  slots,
  onSlotClick,
  onSlotBook
}: Omit<SlotCalendarViewProps, 'viewMode' | 'kiosks'>) {
  return (
    <div className="p-8">
      <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-7 gap-4 p-4 bg-[#F9FAFB] border-b border-[#E5E7EB]">
          <p className="text-xs font-semibold text-[#6B7280]">Kiosk</p>
          <p className="text-xs font-semibold text-[#6B7280]">Date</p>
          <p className="text-xs font-semibold text-[#6B7280]">Time</p>
          <p className="text-xs font-semibold text-[#6B7280]">Status</p>
          <p className="text-xs font-semibold text-[#6B7280]">Bookings</p>
          <p className="text-xs font-semibold text-[#6B7280]">Revenue</p>
          <p className="text-xs font-semibold text-[#6B7280]">Actions</p>
        </div>

        {/* Rows */}
        <div className="divide-y divide-[#E5E7EB]">
          {slots.slice(0, 50).map(slot => (
            <button
              key={slot.id}
              onClick={() => onSlotClick(slot)}
              className="grid grid-cols-7 gap-4 p-4 hover:bg-[#F9FAFB] transition-colors text-left w-full"
            >
              <div>
                <p className="text-sm text-[#111827]">{slot.kioskName}</p>
              </div>
              <div>
                <p className="text-sm text-[#111827]">
                  {new Date(slot.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
              </div>
              <div>
                <p className="text-sm text-[#111827]">
                  {slot.startTime} - {slot.endTime}
                </p>
              </div>
              <div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  slot.status === 'booked'
                    ? 'bg-[#D1FAE5] text-[#16A34A]'
                    : slot.status === 'partially-booked'
                    ? 'bg-[#FEF3C7] text-[#F59E0B]'
                    : 'bg-[#F3F4F6] text-[#6B7280]'
                }`}>
                  {slot.status === 'booked' ? 'Booked' : slot.status === 'partially-booked' ? 'Partial' : 'Free'}
                </span>
              </div>
              <div>
                <p className="text-sm text-[#111827]">
                  {slot.bookings.length} {slot.bookings.length === 1 ? 'booking' : 'bookings'}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-[#111827]">
                  ${slot.basePrice}
                  {slot.pricingTier === 'peak' && (
                    <span className="ml-2 text-xs text-[#D9480F]">Peak</span>
                  )}
                </p>
              </div>
              <div onClick={(e) => e.stopPropagation()}>
                {slot.status === 'free' ? (
                  <button
                    onClick={() => onSlotBook(slot)}
                    className="px-3 py-1 bg-[#D9480F] text-white text-xs font-medium rounded hover:bg-[#C13F0D] transition-colors"
                  >
                    Book
                  </button>
                ) : (
                  <button className="px-3 py-1 bg-[#F9FAFB] text-[#6B7280] text-xs font-medium rounded hover:bg-[#F3F4F6] transition-colors">
                    View
                  </button>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}