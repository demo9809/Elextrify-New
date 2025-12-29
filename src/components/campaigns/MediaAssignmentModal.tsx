import { useState } from 'react';
import { X, Search, Image, Video, Clock, Zap, Target, Calendar } from 'lucide-react';
import { TimeSlot, SlotBooking } from './SlotScheduler';

interface MediaAssignmentModalProps {
  slot: TimeSlot;
  onClose: () => void;
  onAssign: (booking: SlotBooking) => void;
}

// Mock media library
const MOCK_MEDIA = [
  { id: 'm1', name: 'Holiday Sale 2025', type: 'video' as const, duration: 30, thumbnail: '', clientId: 'c1', clientName: 'Acme Corporation' },
  { id: 'm2', name: 'Morning Coffee Special', type: 'image' as const, duration: 15, thumbnail: '', clientId: 'c2', clientName: 'Brew Coffee Co.' },
  { id: 'm3', name: 'Gym Membership Promo', type: 'video' as const, duration: 20, thumbnail: '', clientId: 'c3', clientName: 'FitLife Gym' },
  { id: 'm4', name: 'Product Launch Teaser', type: 'video' as const, duration: 45, thumbnail: '', clientId: 'c1', clientName: 'Acme Corporation' },
  { id: 'm5', name: 'Brand Awareness Banner', type: 'image' as const, duration: 10, thumbnail: '', clientId: 'c4', clientName: 'TechStart Inc.' },
];

const MOCK_CLIENTS = [
  { id: 'c1', name: 'Acme Corporation' },
  { id: 'c2', name: 'Brew Coffee Co.' },
  { id: 'c3', name: 'FitLife Gym' },
  { id: 'c4', name: 'TechStart Inc.' },
];

export function MediaAssignmentModal({ slot, onClose, onAssign }: MediaAssignmentModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [selectedMedia, setSelectedMedia] = useState<string>('');
  const [scheduleType, setScheduleType] = useState<'fixed' | 'random-frequency'>('fixed');
  
  // Fixed schedule
  const [exactStartTime, setExactStartTime] = useState('');
  const [exactEndTime, setExactEndTime] = useState('');
  
  // Random frequency schedule
  const [windowStart, setWindowStart] = useState('');
  const [windowEnd, setWindowEnd] = useState('');
  const [totalPlayTime, setTotalPlayTime] = useState(300); // 5 minutes default
  
  const [priority, setPriority] = useState(5);

  const selectedMediaObj = MOCK_MEDIA.find(m => m.id === selectedMedia);
  const selectedClientObj = MOCK_CLIENTS.find(c => c.id === selectedClient);

  const handleAssign = () => {
    if (!selectedMedia || !selectedClient) return;

    const booking: SlotBooking = {
      id: `booking-${Date.now()}`,
      slotId: slot.id,
      clientId: selectedClient,
      clientName: selectedClientObj?.name || '',
      mediaId: selectedMedia,
      mediaName: selectedMediaObj?.name || '',
      mediaThumbnail: selectedMediaObj?.thumbnail || '',
      mediaType: selectedMediaObj?.type || 'image',
      mediaDuration: selectedMediaObj?.duration || 0,
      scheduleType,
      exactStartTime: scheduleType === 'fixed' ? exactStartTime : undefined,
      exactEndTime: scheduleType === 'fixed' ? exactEndTime : undefined,
      windowStart: scheduleType === 'random-frequency' ? windowStart : undefined,
      windowEnd: scheduleType === 'random-frequency' ? windowEnd : undefined,
      totalPlayTime: scheduleType === 'random-frequency' ? totalPlayTime : undefined,
      status: 'scheduled',
      priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onAssign(booking);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-[#111827]">Book Slot - Quick Assignment</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#F9FAFB] transition-colors"
            >
              <X className="w-6 h-6 text-[#6B7280]" />
            </button>
          </div>

          {/* Slot Info */}
          <div className="flex items-center gap-4 p-4 bg-[#F9FAFB] rounded-xl">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#6B7280]" />
              <span className="text-sm text-[#6B7280]">
                {new Date(slot.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#6B7280]" />
              <span className="text-sm text-[#6B7280]">
                {slot.startTime} - {slot.endTime}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-[#6B7280]" />
              <span className="text-sm text-[#6B7280]">{slot.kioskName}</span>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-4 mt-6">
            <StepIndicator number={1} label="Select Client" active={step >= 1} completed={step > 1} />
            <div className="flex-1 h-px bg-[#E5E7EB]" />
            <StepIndicator number={2} label="Choose Media" active={step >= 2} completed={step > 2} />
            <div className="flex-1 h-px bg-[#E5E7EB]" />
            <StepIndicator number={3} label="Configure Schedule" active={step >= 3} completed={false} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 1 && (
            <div>
              <h3 className="text-lg font-semibold text-[#111827] mb-4">Select Client</h3>
              <p className="text-sm text-[#6B7280] mb-6">Choose which client this booking is for</p>

              <div className="grid grid-cols-2 gap-4">
                {MOCK_CLIENTS.map(client => (
                  <button
                    key={client.id}
                    onClick={() => setSelectedClient(client.id)}
                    className={`p-6 border-2 rounded-xl text-left transition-all ${
                      selectedClient === client.id
                        ? 'border-[#D9480F] bg-[#FFF7ED]'
                        : 'border-[#E5E7EB] hover:border-[#D9480F]/30 hover:bg-[#F9FAFB]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        selectedClient === client.id ? 'bg-[#D9480F]' : 'bg-[#F9FAFB]'
                      }`}>
                        <span className={`text-lg font-bold ${
                          selectedClient === client.id ? 'text-white' : 'text-[#6B7280]'
                        }`}>
                          {client.name[0]}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-[#111827]">{client.name}</p>
                        <p className="text-xs text-[#6B7280] mt-1">
                          {MOCK_MEDIA.filter(m => m.clientId === client.id).length} media files
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#111827]">Choose Media</h3>
                  <p className="text-sm text-[#6B7280] mt-1">
                    Showing media for {selectedClientObj?.name}
                  </p>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                  <input
                    type="text"
                    placeholder="Search media..."
                    className="h-10 pl-10 pr-4 w-64 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {MOCK_MEDIA.filter(m => m.clientId === selectedClient).map(media => (
                  <button
                    key={media.id}
                    onClick={() => setSelectedMedia(media.id)}
                    className={`border-2 rounded-xl overflow-hidden text-left transition-all ${
                      selectedMedia === media.id
                        ? 'border-[#D9480F] shadow-lg'
                        : 'border-[#E5E7EB] hover:border-[#D9480F]/30 hover:shadow-md'
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="aspect-video bg-gradient-to-br from-[#F9FAFB] to-[#E5E7EB] flex items-center justify-center">
                      {media.type === 'video' ? (
                        <Video className="w-12 h-12 text-[#9CA3AF]" />
                      ) : (
                        <Image className="w-12 h-12 text-[#9CA3AF]" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <p className="font-semibold text-[#111827] mb-2 text-sm">{media.name}</p>
                      <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                        <span className="flex items-center gap-1">
                          {media.type === 'video' ? <Video className="w-3 h-3" /> : <Image className="w-3 h-3" />}
                          {media.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {media.duration}s
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#111827] mb-2">Configure Schedule</h3>
                <p className="text-sm text-[#6B7280]">Define when and how this ad will play</p>
              </div>

              {/* Schedule Type Selection */}
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-3">Scheduling Mode</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setScheduleType('fixed')}
                    className={`p-6 border-2 rounded-xl text-left transition-all ${
                      scheduleType === 'fixed'
                        ? 'border-[#D9480F] bg-[#FFF7ED]'
                        : 'border-[#E5E7EB] hover:border-[#D9480F]/30'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        scheduleType === 'fixed' ? 'bg-[#D9480F]' : 'bg-[#F9FAFB]'
                      }`}>
                        <Clock className={`w-5 h-5 ${scheduleType === 'fixed' ? 'text-white' : 'text-[#6B7280]'}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-[#111827]">Fixed Time</p>
                        <p className="text-xs text-[#6B7280]">Exact start and end time</p>
                      </div>
                    </div>
                    <p className="text-sm text-[#6B7280]">
                      Play exactly from 09:30 to 09:45
                    </p>
                  </button>

                  <button
                    onClick={() => setScheduleType('random-frequency')}
                    className={`p-6 border-2 rounded-xl text-left transition-all ${
                      scheduleType === 'random-frequency'
                        ? 'border-[#D9480F] bg-[#FFF7ED]'
                        : 'border-[#E5E7EB] hover:border-[#D9480F]/30'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        scheduleType === 'random-frequency' ? 'bg-[#D9480F]' : 'bg-[#F9FAFB]'
                      }`}>
                        <Zap className={`w-5 h-5 ${scheduleType === 'random-frequency' ? 'text-white' : 'text-[#6B7280]'}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-[#111827]">Random Frequency</p>
                        <p className="text-xs text-[#6B7280]">Window-based distribution</p>
                      </div>
                    </div>
                    <p className="text-sm text-[#6B7280]">
                      Play 5 min total between 09:30-11:00
                    </p>
                  </button>
                </div>
              </div>

              {/* Fixed Time Configuration */}
              {scheduleType === 'fixed' && (
                <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-6 space-y-4">
                  <h4 className="font-semibold text-[#111827]">Fixed Schedule Settings</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-2">Start Time</label>
                      <input
                        type="time"
                        value={exactStartTime}
                        onChange={(e) => setExactStartTime(e.target.value)}
                        className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-2">End Time</label>
                      <input
                        type="time"
                        value={exactEndTime}
                        onChange={(e) => setExactEndTime(e.target.value)}
                        className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Random Frequency Configuration */}
              {scheduleType === 'random-frequency' && (
                <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-6 space-y-4">
                  <h4 className="font-semibold text-[#111827]">Random Frequency Settings</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-2">Window Start</label>
                      <input
                        type="time"
                        value={windowStart}
                        onChange={(e) => setWindowStart(e.target.value)}
                        className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-2">Window End</label>
                      <input
                        type="time"
                        value={windowEnd}
                        onChange={(e) => setWindowEnd(e.target.value)}
                        className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Total Play Time: {Math.floor(totalPlayTime / 60)} min {totalPlayTime % 60} sec
                    </label>
                    <input
                      type="range"
                      min="60"
                      max="1800"
                      step="30"
                      value={totalPlayTime}
                      onChange={(e) => setTotalPlayTime(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              )}

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-3">
                  Priority Level: {priority}/10
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={priority}
                  onChange={(e) => setPriority(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-[#6B7280] mt-2">
                  Higher priority ads play more frequently when multiple bookings share a slot
                </p>
              </div>
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
          <div className="flex items-center gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep((step - 1) as 1 | 2)}
                className="h-11 px-6 bg-[#F9FAFB] text-[#111827] rounded-lg hover:bg-[#F3F4F6] transition-colors"
              >
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                onClick={() => setStep((step + 1) as 2 | 3)}
                disabled={step === 1 ? !selectedClient : !selectedMedia}
                className="h-11 px-6 bg-[#D9480F] text-white rounded-lg hover:bg-[#C13F0D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleAssign}
                className="h-11 px-6 bg-[#D9480F] text-white rounded-lg hover:bg-[#C13F0D] transition-colors"
              >
                Confirm Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface StepIndicatorProps {
  number: number;
  label: string;
  active: boolean;
  completed: boolean;
}

function StepIndicator({ number, label, active, completed }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
        completed
          ? 'bg-[#16A34A] text-white'
          : active
          ? 'bg-[#D9480F] text-white'
          : 'bg-[#E5E7EB] text-[#9CA3AF]'
      }`}>
        {number}
      </div>
      <span className={`text-sm font-medium ${active ? 'text-[#111827]' : 'text-[#9CA3AF]'}`}>
        {label}
      </span>
    </div>
  );
}
