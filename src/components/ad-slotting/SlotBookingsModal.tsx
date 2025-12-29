import { X, PlayCircle, Clock, CheckCircle, StopCircle, ChevronRight, Calendar } from 'lucide-react';

interface SlotBooking {
  id: string;
  clientName: string;
  clientId: string;
  contentType: 'media' | 'playlist';
  contentName: string;
  mediaCount?: number;
  mediaName: string;
  mode: 'fixed' | 'stack';
  stackDuration?: number;
  dateRange: { start: string; end: string };
  status: 'active' | 'scheduled' | 'completed' | 'stopped';
  occupancyPercent: number; // How much of this slot this booking uses
  subSlots?: string; // e.g., "Slots 1-3, 7-9"
  pop?: {
    actualPlayTime: number;
    scheduledPlayTime: number;
    impressions: number;
    attentiveness: number;
    walkins: number;
  };
}

interface SlotBookingsModalProps {
  slot: {
    deviceName: string;
    date: string;
    startTime: string;
    endTime: string;
    occupancy: number;
    bookings: SlotBooking[];
  };
  onClose: () => void;
  onBookingSelect: (booking: SlotBooking) => void;
  onBookRemaining?: () => void; // New: Allow booking remaining capacity
}

export function SlotBookingsModal({ slot, onClose, onBookingSelect, onBookRemaining }: SlotBookingsModalProps) {
  const slotInfo = {
    deviceName: slot.deviceName,
    date: slot.date,
    timeSlot: `${slot.startTime} - ${slot.endTime}`,
    totalOccupancy: slot.occupancy,
  };

  const bookings = slot.bookings;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-[#D1FAE5] text-[#16A34A]';
      case 'scheduled':
        return 'bg-[#DBEAFE] text-[#3B82F6]';
      case 'completed':
        return 'bg-[#F3F4F6] text-[#6B7280]';
      case 'stopped':
        return 'bg-[#FEE2E2] text-[#DC2626]';
      default:
        return 'bg-[#F3F4F6] text-[#6B7280]';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <PlayCircle className="w-3 h-3" />;
      case 'scheduled':
        return <Clock className="w-3 h-3" />;
      case 'completed':
        return <CheckCircle className="w-3 h-3" />;
      case 'stopped':
        return <StopCircle className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Running';
      case 'scheduled':
        return 'Scheduled';
      case 'completed':
        return 'Completed';
      case 'stopped':
        return 'Stopped';
      default:
        return status;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose}>
        {/* Right-side Slide-in Panel */}
        <div 
          className="absolute right-0 top-0 h-full w-full max-w-xl bg-white shadow-2xl flex flex-col animate-slide-in-right"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="border-b border-[#E5E7EB] p-4 flex-shrink-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="text-lg font-semibold text-[#111827] mb-1">Slot Bookings</h2>
                <div className="flex flex-col gap-0.5 text-xs text-[#6B7280]">
                  <span><span className="font-medium text-[#111827]">Device:</span> {slotInfo.deviceName}</span>
                  <span><span className="font-medium text-[#111827]">Time:</span> {slotInfo.timeSlot}</span>
                  <span><span className="font-medium text-[#111827]">Date:</span> {slotInfo.date}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center text-[#6B7280] hover:bg-[#F9FAFB] rounded-lg transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Total Occupancy Bar */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-xs font-medium text-[#6B7280]">Total Occupancy: {bookings.length} booking{bookings.length !== 1 ? 's' : ''}</p>
                <p className="text-xs font-semibold text-[#111827]">{slotInfo.totalOccupancy}%</p>
              </div>
              <div className="h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    slotInfo.totalOccupancy >= 100 
                      ? 'bg-[#DC2626]' 
                      : slotInfo.totalOccupancy >= 50 
                      ? 'bg-[#F59E0B]' 
                      : 'bg-[#16A34A]'
                  }`}
                  style={{ width: `${Math.min(slotInfo.totalOccupancy, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Bookings List - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {bookings.map((booking, index) => (
                <button
                  key={booking.id}
                  onClick={() => onBookingSelect(booking)}
                  className="w-full p-3 border border-[#E5E7EB] rounded-lg hover:border-[#D9480F] hover:bg-[#FFF7ED] transition-all text-left group"
                >
                  <div className="flex items-start gap-3">
                    {/* Booking Number */}
                    <div className="w-7 h-7 rounded bg-[#F9FAFB] flex items-center justify-center flex-shrink-0 text-sm font-semibold text-[#111827]">
                      {index + 1}
                    </div>

                    {/* Booking Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-sm font-semibold text-[#111827] truncate">{booking.clientName}</p>
                        <div className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium flex-shrink-0 ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          <span>{getStatusLabel(booking.status)}</span>
                        </div>
                      </div>
                      
                      <p className="text-xs text-[#6B7280] truncate mb-2">{booking.contentName}</p>

                      {/* Compact Occupancy Bar */}
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex-1 h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#D9480F]"
                            style={{ width: `${Math.min(booking.occupancyPercent, 100)}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-semibold text-[#111827] w-8 text-right">
                          {booking.occupancyPercent}%
                        </span>
                      </div>

                      {/* Compact Meta Info */}
                      <div className="flex items-center gap-2 text-[10px] text-[#6B7280]">
                        <span>{booking.mode === 'fixed' ? 'Fixed' : 'Stack'}</span>
                        {booking.pop && (
                          <>
                            <span>•</span>
                            <span className="text-[#16A34A] font-medium">
                              {booking.pop.impressions.toLocaleString()} imp
                            </span>
                          </>
                        )}
                        {booking.subSlots && (
                          <>
                            <span>•</span>
                            <span className="truncate">{booking.subSlots}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Arrow Icon */}
                    <ChevronRight className="w-4 h-4 text-[#6B7280] group-hover:text-[#D9480F] flex-shrink-0 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer - Fixed at bottom */}
          <div className="border-t border-[#E5E7EB] p-4 space-y-3 flex-shrink-0">
            {/* Available Capacity - Compact */}
            {slotInfo.totalOccupancy < 100 && onBookRemaining && (
              <div className="bg-[#D1FAE5] border border-[#16A34A] rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-xs font-semibold text-[#111827]">Available Capacity</p>
                    <p className="text-[10px] text-[#6B7280]">{100 - slotInfo.totalOccupancy}% still available</p>
                  </div>
                  <p className="text-xl font-bold text-[#16A34A]">{100 - slotInfo.totalOccupancy}%</p>
                </div>
                <button
                  onClick={onBookRemaining}
                  className="w-full h-9 bg-[#16A34A] text-white rounded-lg hover:bg-[#15803D] text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Book Remaining Capacity
                </button>
              </div>
            )}

            {/* Fully Occupied - Compact */}
            {slotInfo.totalOccupancy >= 100 && (
              <div className="bg-[#FEE2E2] border border-[#DC2626] rounded-lg p-3">
                <p className="text-xs font-semibold text-[#DC2626]">Slot Fully Occupied</p>
                <p className="text-[10px] text-[#6B7280] mt-0.5">No capacity available for additional bookings.</p>
              </div>
            )}

            {/* Tip - Compact */}
            <div className="bg-[#EFF6FF] border border-[#3B82F6] rounded-lg p-3">
              <p className="text-xs text-[#6B7280]">
                <span className="font-semibold text-[#111827]">Tip:</span> Click any booking to view details or stop the ad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}