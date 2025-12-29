import { X, Calendar, Clock, Monitor, MapPin, Building2, BarChart3, Eye, TrendingUp, AlertCircle } from 'lucide-react';
import { CampaignBooking } from './CampaignBookingManager';

interface BookingDetailsPanelProps {
  booking: CampaignBooking;
  onClose: () => void;
  onEdit: () => void;
}

const MOCK_KIOSKS = [
  { id: 'k1', name: 'Mall Central - Screen A', location: 'NYC, NY' },
  { id: 'k2', name: 'Airport Terminal 1', location: 'LAX, CA' },
  { id: 'k3', name: 'Transit Hub Main', location: 'Chicago, IL' },
  { id: 'k5', name: 'Gym Entrance Screen', location: 'Miami, FL' },
];

export function BookingDetailsPanel({ booking, onClose, onEdit }: BookingDetailsPanelProps) {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const selectedDayNames = booking.daysOfWeek.map(d => dayNames[d]).join(', ');

  return (
    <div className="fixed inset-y-0 right-0 w-[600px] bg-white border-l border-[#E5E7EB] shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-[#E5E7EB]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[#111827]">Booking Details</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F9FAFB]">
            <X className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
            booking.status === 'active'
              ? 'bg-[#D1FAE5] text-[#16A34A]'
              : booking.status === 'scheduled'
              ? 'bg-[#DBEAFE] text-[#3B82F6]'
              : 'bg-[#F3F4F6] text-[#6B7280]'
          }`}>
            {booking.status === 'active' ? '● Active' : booking.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Campaign Info */}
        <div>
          <h3 className="text-sm font-semibold text-[#111827] mb-3">Campaign Information</h3>
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4 space-y-3">
            <div className="flex items-start justify-between">
              <p className="text-sm text-[#6B7280]">Campaign Name</p>
              <p className="text-sm font-medium text-[#111827] text-right">{booking.campaignName}</p>
            </div>
            <div className="flex items-start justify-between">
              <p className="text-sm text-[#6B7280]">Client</p>
              <p className="text-sm font-medium text-[#111827]">{booking.clientName}</p>
            </div>
            <div className="flex items-start justify-between">
              <p className="text-sm text-[#6B7280]">Media</p>
              <p className="text-sm font-medium text-[#111827]">{booking.mediaName}</p>
            </div>
            <div className="flex items-start justify-between">
              <p className="text-sm text-[#6B7280]">Type</p>
              <p className="text-sm font-medium text-[#111827] capitalize">{booking.mediaType} • {booking.mediaDuration}s</p>
            </div>
          </div>
        </div>

        {/* Performance Stats */}
        {booking.status === 'active' && (
          <div>
            <h3 className="text-sm font-semibold text-[#111827] mb-3">Performance</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-4 h-4 text-[#6B7280]" />
                  <p className="text-xs text-[#6B7280]">Impressions</p>
                </div>
                <p className="text-xl font-semibold text-[#111827]">
                  {booking.totalImpressions?.toLocaleString() || 0}
                </p>
              </div>
              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-[#6B7280]" />
                  <p className="text-xs text-[#6B7280]">Attention</p>
                </div>
                <p className="text-xl font-semibold text-[#111827]">
                  {booking.avgAttentiveness}%
                </p>
              </div>
              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4 col-span-2">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-[#6B7280]" />
                  <p className="text-xs text-[#6B7280]">Total Spend</p>
                </div>
                <p className="text-xl font-semibold text-[#111827]">
                  ${booking.totalSpend?.toLocaleString() || 0}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Target Screens */}
        <div>
          <h3 className="text-sm font-semibold text-[#111827] mb-3">
            Target Screens ({booking.targetKiosks.length})
          </h3>
          <div className="space-y-2">
            {MOCK_KIOSKS.filter(k => booking.targetKiosks.includes(k.id)).map(kiosk => (
              <div key={kiosk.id} className="flex items-center gap-3 p-3 bg-[#F9FAFB] rounded-lg">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <Monitor className="w-4 h-4 text-[#6B7280]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#111827]">{kiosk.name}</p>
                  <p className="text-xs text-[#6B7280]">{kiosk.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Targeting Summary */}
        <div>
          <h3 className="text-sm font-semibold text-[#111827] mb-3">Targeting</h3>
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[#6B7280]" />
              <div className="flex-1">
                <p className="text-xs text-[#6B7280] mb-1">Locations</p>
                <p className="text-sm text-[#111827]">{booking.targetLocations.join(', ')}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Building2 className="w-4 h-4 text-[#6B7280]" />
              <div className="flex-1">
                <p className="text-xs text-[#6B7280] mb-1">Venue Types</p>
                <p className="text-sm text-[#111827]">{booking.targetVenues.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div>
          <h3 className="text-sm font-semibold text-[#111827] mb-3">Schedule</h3>
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-[#6B7280]" />
              <div className="flex-1">
                <p className="text-xs text-[#6B7280] mb-1">Date Range</p>
                <p className="text-sm text-[#111827]">
                  {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-[#6B7280]" />
              <div className="flex-1">
                <p className="text-xs text-[#6B7280] mb-1">Days</p>
                <p className="text-sm text-[#111827]">{selectedDayNames}</p>
              </div>
            </div>
            <div className="pt-3 border-t border-[#E5E7EB]">
              <p className="text-xs text-[#6B7280] mb-2">Time Slots</p>
              <div className="space-y-2">
                {booking.timeSlots.map((slot, idx) => (
                  <div key={idx} className="flex items-center justify-between px-3 py-2 bg-white rounded-lg">
                    <span className="text-sm text-[#111827]">
                      {slot.startTime} - {slot.endTime}
                    </span>
                    <span className="text-xs text-[#6B7280]">
                      {booking.scheduleType === 'fixed' ? 'Fixed' : 'Random'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-[#E5E7EB]">
        <button
          onClick={onEdit}
          className="w-full h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C13F0D] transition-colors"
        >
          Edit Booking
        </button>
      </div>
    </div>
  );
}
