import { useState } from 'react';
import { X, AlertCircle, Search, Square, CheckCircle, AlertTriangle } from 'lucide-react';

interface EmergencyRecallPanelProps {
  onClose: () => void;
}

// Mock active bookings
const MOCK_ACTIVE_BOOKINGS = [
  {
    id: 'b1',
    clientName: 'Acme Corporation',
    mediaName: 'Holiday Sale 2025',
    kioskName: 'Mall Central - Screen A',
    status: 'playing' as const,
    startTime: '09:00',
    endTime: '09:30',
  },
  {
    id: 'b2',
    clientName: 'Brew Coffee Co.',
    mediaName: 'Morning Coffee Special',
    kioskName: 'Airport Terminal 1',
    status: 'scheduled' as const,
    startTime: '10:00',
    endTime: '10:15',
  },
  {
    id: 'b3',
    clientName: 'FitLife Gym',
    mediaName: 'Gym Membership Promo',
    kioskName: 'Transit Hub Main',
    status: 'playing' as const,
    startTime: '08:45',
    endTime: '09:15',
  },
  {
    id: 'b4',
    clientName: 'TechStart Inc.',
    mediaName: 'Product Launch Teaser',
    kioskName: 'Retail Store Display',
    status: 'scheduled' as const,
    startTime: '11:00',
    endTime: '11:45',
  },
];

export function EmergencyRecallPanel({ onClose }: EmergencyRecallPanelProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBookings, setSelectedBookings] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [recalledBookings, setRecalledBookings] = useState<string[]>([]);

  const filteredBookings = MOCK_ACTIVE_BOOKINGS.filter(booking =>
    booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.mediaName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.kioskName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRecall = () => {
    // Simulate recall action
    setRecalledBookings([...recalledBookings, ...selectedBookings]);
    setSelectedBookings([]);
    setShowConfirmation(false);
    
    // Auto-close after 2 seconds
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const toggleBookingSelection = (bookingId: string) => {
    setSelectedBookings(prev =>
      prev.includes(bookingId)
        ? prev.filter(id => id !== bookingId)
        : [...prev, bookingId]
    );
  };

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#DC2626] rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-[#111827] mb-3">
              Confirm Emergency Recall
            </h2>
            <p className="text-[#6B7280] mb-8">
              You are about to recall <strong>{selectedBookings.length}</strong> active booking(s).
              This action will immediately stop playback on the hardware and cannot be undone.
            </p>

            <div className="bg-[#FEF2F2] border border-[#FEE2E2] rounded-xl p-4 mb-8">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#DC2626] mt-0.5" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-[#DC2626] mb-1">Warning</p>
                  <p className="text-sm text-[#6B7280]">
                    Recalled ads will be stopped immediately. Please ensure you have authorization
                    to perform this action. All affected clients will be notified.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center">
              <button
                onClick={() => setShowConfirmation(false)}
                className="h-11 px-6 bg-[#F9FAFB] text-[#111827] rounded-lg hover:bg-[#F3F4F6] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRecall}
                className="h-11 px-6 bg-[#DC2626] text-white rounded-lg hover:bg-[#B91C1C] transition-colors flex items-center gap-2"
              >
                <Square className="w-4 h-4" />
                Confirm Recall
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (recalledBookings.length > 0 && selectedBookings.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#16A34A] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-[#111827] mb-3">
              Recall Successful
            </h2>
            <p className="text-[#6B7280] mb-8">
              {recalledBookings.length} booking(s) have been successfully recalled.
              Hardware devices have been notified to stop playback immediately.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#FEF2F2] rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-[#DC2626]" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[#111827]">Emergency Recall</h2>
                <p className="text-sm text-[#6B7280]">Immediately stop ads from playing</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#F9FAFB] transition-colors"
            >
              <X className="w-6 h-6 text-[#6B7280]" />
            </button>
          </div>

          {/* Warning Banner */}
          <div className="bg-[#FEF2F2] border border-[#FEE2E2] rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#DC2626] mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[#DC2626] mb-1">
                  Danger Zone - Use with Caution
                </p>
                <p className="text-sm text-[#6B7280]">
                  Emergency Recall immediately stops content playback on hardware devices.
                  Use this for regulatory compliance, content violations, or urgent client requests only.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="p-6 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
              <input
                type="text"
                placeholder="Search by client, media, or kiosk name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-11 pl-11 pr-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#6B7280]">
                {selectedBookings.length} selected
              </span>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-3">
            {filteredBookings.map(booking => {
              const isSelected = selectedBookings.includes(booking.id);
              const isRecalled = recalledBookings.includes(booking.id);

              return (
                <button
                  key={booking.id}
                  onClick={() => !isRecalled && toggleBookingSelection(booking.id)}
                  disabled={isRecalled}
                  className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                    isRecalled
                      ? 'border-[#E5E7EB] bg-[#FAFAFA] opacity-50 cursor-not-allowed'
                      : isSelected
                      ? 'border-[#DC2626] bg-[#FEF2F2]'
                      : 'border-[#E5E7EB] hover:border-[#DC2626]/30 hover:bg-[#F9FAFB]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Checkbox */}
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      isRecalled
                        ? 'border-[#9CA3AF] bg-[#E5E7EB]'
                        : isSelected
                        ? 'border-[#DC2626] bg-[#DC2626]'
                        : 'border-[#D1D5DB]'
                    }`}>
                      {isRecalled ? (
                        <Square className="w-3 h-3 text-white" />
                      ) : isSelected ? (
                        <CheckCircle className="w-3 h-3 text-white" />
                      ) : null}
                    </div>

                    {/* Booking Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-semibold text-[#111827]">{booking.mediaName}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'playing'
                            ? 'bg-[#D1FAE5] text-[#16A34A]'
                            : 'bg-[#DBEAFE] text-[#3B82F6]'
                        }`}>
                          {booking.status === 'playing' ? '● Playing Now' : 'Scheduled'}
                        </span>
                        {isRecalled && (
                          <span className="px-2 py-1 bg-[#FEE2E2] text-[#DC2626] rounded-full text-xs font-medium">
                            Recalled
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-6 text-sm text-[#6B7280]">
                        <span>Client: {booking.clientName}</span>
                        <span>Kiosk: {booking.kioskName}</span>
                        <span>Time: {booking.startTime} - {booking.endTime}</span>
                      </div>
                    </div>

                    {/* Urgency Indicator */}
                    {booking.status === 'playing' && !isRecalled && (
                      <div className="flex items-center gap-2 px-3 py-2 bg-[#FEF2F2] rounded-lg">
                        <div className="w-2 h-2 bg-[#DC2626] rounded-full animate-pulse" />
                        <span className="text-xs font-medium text-[#DC2626]">Live</span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {filteredBookings.length === 0 && (
            <div className="py-12 text-center">
              <AlertCircle className="w-12 h-12 text-[#9CA3AF] mx-auto mb-4" />
              <p className="text-[#6B7280]">No active bookings found</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#E5E7EB] flex items-center justify-between">
          <button
            onClick={onClose}
            className="h-11 px-6 bg-[#F9FAFB] text-[#111827] rounded-lg hover:bg-[#F3F4F6] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => setShowConfirmation(true)}
            disabled={selectedBookings.length === 0}
            className="h-11 px-6 bg-[#DC2626] text-white rounded-lg hover:bg-[#B91C1C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Square className="w-4 h-4" />
            Recall {selectedBookings.length > 0 && `(${selectedBookings.length})`}
          </button>
        </div>
      </div>
    </div>
  );
}
