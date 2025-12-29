import { useState, useMemo } from 'react';
import { X, ChevronRight, Check, Users, Image as ImageIcon, Video, Monitor, MapPin, Building2, Calendar, Clock, Zap } from 'lucide-react';
import { CampaignBooking, TimeSlotConfig } from './CampaignBookingManager';

interface CreateBookingWizardProps {
  onClose: () => void;
  onSave: (booking: CampaignBooking) => void;
}

// Mock data
const MOCK_CLIENTS = [
  { id: 'c1', name: 'Acme Corporation' },
  { id: 'c2', name: 'Brew Coffee Co.' },
  { id: 'c3', name: 'FitLife Gym' },
  { id: 'c4', name: 'TechStart Inc.' },
];

const MOCK_MEDIA = [
  { id: 'm1', name: 'Holiday Sale Video', type: 'video' as const, duration: 30, clientId: 'c1' },
  { id: 'm2', name: 'Coffee Banner', type: 'image' as const, duration: 15, clientId: 'c2' },
  { id: 'm3', name: 'Gym Promo', type: 'video' as const, duration: 20, clientId: 'c3' },
];

const MOCK_KIOSKS = [
  { id: 'k1', name: 'Mall Central - Screen A', location: 'NYC, NY', venue: 'Mall', status: 'online' },
  { id: 'k2', name: 'Airport Terminal 1', location: 'LAX, CA', venue: 'Airport', status: 'online' },
  { id: 'k3', name: 'Transit Hub Main', location: 'Chicago, IL', venue: 'Transit', status: 'online' },
  { id: 'k4', name: 'Retail Store Display', location: 'NYC, NY', venue: 'Retail', status: 'offline' },
  { id: 'k5', name: 'Gym Entrance Screen', location: 'Miami, FL', venue: 'Gym', status: 'online' },
  { id: 'k6', name: 'Mall West Wing', location: 'NYC, NY', venue: 'Mall', status: 'online' },
  { id: 'k7', name: 'Airport Arrivals', location: 'LAX, CA', venue: 'Airport', status: 'online' },
];

export function CreateBookingWizard({ onClose, onSave }: CreateBookingWizardProps) {
  const [step, setStep] = useState(1);
  
  // Step 1: Client & Media
  const [campaignName, setCampaignName] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedMedia, setSelectedMedia] = useState('');
  
  // Step 2: Screen Selection
  const [selectedKiosks, setSelectedKiosks] = useState<string[]>([]);
  const [locationFilter, setLocationFilter] = useState<string[]>([]);
  const [venueFilter, setVenueFilter] = useState<string[]>([]);
  
  // Step 3: Schedule
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlotConfig[]>([]);
  const [scheduleType, setScheduleType] = useState<'fixed' | 'random-frequency'>('fixed');

  const selectedMediaObj = MOCK_MEDIA.find(m => m.id === selectedMedia);
  const selectedClientObj = MOCK_CLIENTS.find(c => c.id === selectedClient);

  // Get unique locations and venues
  const locations = useMemo(() => [...new Set(MOCK_KIOSKS.map(k => k.location))], []);
  const venues = useMemo(() => [...new Set(MOCK_KIOSKS.map(k => k.venue))], []);

  // Filter kiosks based on selections
  const filteredKiosks = useMemo(() => {
    return MOCK_KIOSKS.filter(kiosk => {
      if (locationFilter.length > 0 && !locationFilter.includes(kiosk.location)) return false;
      if (venueFilter.length > 0 && !venueFilter.includes(kiosk.venue)) return false;
      return true;
    });
  }, [locationFilter, venueFilter]);

  const toggleKiosk = (kioskId: string) => {
    setSelectedKiosks(prev =>
      prev.includes(kioskId) ? prev.filter(id => id !== kioskId) : [...prev, kioskId]
    );
  };

  const toggleDay = (day: number) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const selectAllInLocation = (location: string) => {
    const kiosksInLocation = MOCK_KIOSKS.filter(k => k.location === location).map(k => k.id);
    setSelectedKiosks(prev => {
      const allSelected = kiosksInLocation.every(id => prev.includes(id));
      if (allSelected) {
        return prev.filter(id => !kiosksInLocation.includes(id));
      } else {
        return [...new Set([...prev, ...kiosksInLocation])];
      }
    });
  };

  const selectAllInVenue = (venue: string) => {
    const kiosksInVenue = MOCK_KIOSKS.filter(k => k.venue === venue).map(k => k.id);
    setSelectedKiosks(prev => {
      const allSelected = kiosksInVenue.every(id => prev.includes(id));
      if (allSelected) {
        return prev.filter(id => !kiosksInVenue.includes(id));
      } else {
        return [...new Set([...prev, ...kiosksInVenue])];
      }
    });
  };

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, { startTime: '09:00', endTime: '10:00' }]);
  };

  const updateTimeSlot = (index: number, updates: Partial<TimeSlotConfig>) => {
    setTimeSlots(timeSlots.map((slot, i) => i === index ? { ...slot, ...updates } : slot));
  };

  const removeTimeSlot = (index: number) => {
    setTimeSlots(timeSlots.filter((_, i) => i !== index));
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return campaignName && selectedClient && selectedMedia;
      case 2:
        return selectedKiosks.length > 0;
      case 3:
        return startDate && endDate && selectedDays.length > 0 && timeSlots.length > 0;
      default:
        return false;
    }
  };

  const handleSave = () => {
    const booking: CampaignBooking = {
      id: `cb-${Date.now()}`,
      clientId: selectedClient,
      clientName: selectedClientObj?.name || '',
      campaignName,
      mediaId: selectedMedia,
      mediaName: selectedMediaObj?.name || '',
      mediaType: selectedMediaObj?.type || 'image',
      mediaDuration: selectedMediaObj?.duration || 0,
      targetKiosks: selectedKiosks,
      targetLocations: [...new Set(MOCK_KIOSKS.filter(k => selectedKiosks.includes(k.id)).map(k => k.location))],
      targetVenues: [...new Set(MOCK_KIOSKS.filter(k => selectedKiosks.includes(k.id)).map(k => k.venue))],
      scheduleType,
      startDate,
      endDate,
      daysOfWeek: selectedDays,
      timeSlots,
      status: 'scheduled',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(booking);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-[#111827]">Create Campaign Booking</h2>
            <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#F9FAFB]">
              <X className="w-6 h-6 text-[#6B7280]" />
            </button>
          </div>

          {/* Step Indicators */}
          <div className="flex items-center gap-4">
            <StepIndicator number={1} label="Client & Media" active={step >= 1} completed={step > 1} />
            <div className="flex-1 h-px bg-[#E5E7EB]" />
            <StepIndicator number={2} label="Select Screens" active={step >= 2} completed={step > 2} />
            <div className="flex-1 h-px bg-[#E5E7EB]" />
            <StepIndicator number={3} label="Schedule" active={step >= 3} completed={false} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Step 1: Client & Media */}
          {step === 1 && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-3">Campaign Name</label>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="e.g., Summer Sale 2025"
                  className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-3">Select Client</label>
                <div className="grid grid-cols-2 gap-4">
                  {MOCK_CLIENTS.map(client => (
                    <button
                      key={client.id}
                      onClick={() => setSelectedClient(client.id)}
                      className={`p-6 border-2 rounded-xl text-left transition-all ${
                        selectedClient === client.id
                          ? 'border-[#D9480F] bg-[#FFF7ED]'
                          : 'border-[#E5E7EB] hover:border-[#D9480F]/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          selectedClient === client.id ? 'bg-[#D9480F]' : 'bg-[#F9FAFB]'
                        }`}>
                          <Users className={`w-6 h-6 ${selectedClient === client.id ? 'text-white' : 'text-[#6B7280]'}`} />
                        </div>
                        <p className="font-semibold text-[#111827]">{client.name}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {selectedClient && (
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-3">Select Media</label>
                  <div className="grid grid-cols-3 gap-4">
                    {MOCK_MEDIA.filter(m => m.clientId === selectedClient).map(media => (
                      <button
                        key={media.id}
                        onClick={() => setSelectedMedia(media.id)}
                        className={`border-2 rounded-xl overflow-hidden text-left transition-all ${
                          selectedMedia === media.id
                            ? 'border-[#D9480F] shadow-lg'
                            : 'border-[#E5E7EB] hover:border-[#D9480F]/30'
                        }`}
                      >
                        <div className="aspect-video bg-gradient-to-br from-[#F9FAFB] to-[#E5E7EB] flex items-center justify-center">
                          {media.type === 'video' ? (
                            <Video className="w-12 h-12 text-[#9CA3AF]" />
                          ) : (
                            <ImageIcon className="w-12 h-12 text-[#9CA3AF]" />
                          )}
                        </div>
                        <div className="p-4">
                          <p className="font-semibold text-[#111827] mb-2">{media.name}</p>
                          <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                            <span>{media.type}</span>
                            <span>•</span>
                            <span>{media.duration}s</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Screen Selection */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-[#FFF7ED] border border-[#FDBA74] rounded-xl p-4">
                <p className="text-sm text-[#D9480F]">
                  <strong>Multi-Screen Selection:</strong> Select multiple screens across different locations and venues. Your ad will run on all selected screens simultaneously.
                </p>
              </div>

              {/* Quick Selection */}
              <div className="bg-[#F9FAFB] rounded-xl p-6">
                <h3 className="font-semibold text-[#111827] mb-4">Quick Selection</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-[#6B7280] mb-2">Select all screens in a location:</p>
                    <div className="flex flex-wrap gap-2">
                      {locations.map(location => (
                        <button
                          key={location}
                          onClick={() => selectAllInLocation(location)}
                          className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg hover:border-[#D9480F] transition-colors text-sm"
                        >
                          <MapPin className="w-4 h-4 inline mr-2" />
                          {location}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B7280] mb-2">Select all screens in a venue type:</p>
                    <div className="flex flex-wrap gap-2">
                      {venues.map(venue => (
                        <button
                          key={venue}
                          onClick={() => selectAllInVenue(venue)}
                          className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg hover:border-[#D9480F] transition-colors text-sm"
                        >
                          <Building2 className="w-4 h-4 inline mr-2" />
                          All {venue}s
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Individual Selection */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-[#111827]">
                    Available Screens ({selectedKiosks.length} selected)
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {filteredKiosks.map(kiosk => {
                    const isSelected = selectedKiosks.includes(kiosk.id);
                    return (
                      <button
                        key={kiosk.id}
                        onClick={() => toggleKiosk(kiosk.id)}
                        disabled={kiosk.status === 'offline'}
                        className={`p-4 border-2 rounded-xl text-left transition-all ${
                          kiosk.status === 'offline'
                            ? 'border-[#E5E7EB] bg-[#FAFAFA] opacity-50 cursor-not-allowed'
                            : isSelected
                            ? 'border-[#D9480F] bg-[#FFF7ED]'
                            : 'border-[#E5E7EB] hover:border-[#D9480F]/30'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-1 ${
                            isSelected ? 'border-[#D9480F] bg-[#D9480F]' : 'border-[#D1D5DB]'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-[#111827] mb-1">{kiosk.name}</p>
                            <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {kiosk.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Building2 className="w-3 h-3" />
                                {kiosk.venue}
                              </span>
                              <span className={`px-2 py-0.5 rounded-full ${
                                kiosk.status === 'online'
                                  ? 'bg-[#D1FAE5] text-[#16A34A]'
                                  : 'bg-[#FEE2E2] text-[#DC2626]'
                              }`}>
                                {kiosk.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Schedule */}
          {step === 3 && (
            <div className="space-y-6 max-w-4xl mx-auto">
              {/* Date Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-lg"
                  />
                </div>
              </div>

              {/* Days of Week */}
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-3">Days of Week</label>
                <div className="flex gap-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
                    <button
                      key={day}
                      onClick={() => toggleDay(idx)}
                      className={`flex-1 h-11 rounded-lg font-medium transition-all ${
                        selectedDays.includes(idx)
                          ? 'bg-[#D9480F] text-white'
                          : 'bg-[#F9FAFB] text-[#6B7280] hover:bg-[#F3F4F6]'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Schedule Type */}
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-3">Schedule Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setScheduleType('fixed')}
                    className={`p-6 border-2 rounded-xl text-left ${
                      scheduleType === 'fixed'
                        ? 'border-[#D9480F] bg-[#FFF7ED]'
                        : 'border-[#E5E7EB]'
                    }`}
                  >
                    <Clock className="w-8 h-8 text-[#D9480F] mb-3" />
                    <h4 className="font-semibold text-[#111827] mb-1">Fixed Times</h4>
                    <p className="text-sm text-[#6B7280]">Play at specific times every day</p>
                  </button>
                  <button
                    onClick={() => setScheduleType('random-frequency')}
                    className={`p-6 border-2 rounded-xl text-left ${
                      scheduleType === 'random-frequency'
                        ? 'border-[#D9480F] bg-[#FFF7ED]'
                        : 'border-[#E5E7EB]'
                    }`}
                  >
                    <Zap className="w-8 h-8 text-[#D9480F] mb-3" />
                    <h4 className="font-semibold text-[#111827] mb-1">Random Frequency</h4>
                    <p className="text-sm text-[#6B7280]">Distribute throughout time windows</p>
                  </button>
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-[#111827]">Time Slots</label>
                  <button
                    onClick={addTimeSlot}
                    className="px-3 py-1.5 bg-[#D9480F] text-white text-sm rounded-lg hover:bg-[#C13F0D]"
                  >
                    + Add Slot
                  </button>
                </div>
                <div className="space-y-3">
                  {timeSlots.map((slot, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 bg-[#F9FAFB] rounded-lg">
                      <input
                        type="time"
                        value={slot.startTime}
                        onChange={(e) => updateTimeSlot(idx, { startTime: e.target.value })}
                        className="h-9 px-3 bg-white border border-[#E5E7EB] rounded-lg"
                      />
                      <span className="text-[#6B7280]">to</span>
                      <input
                        type="time"
                        value={slot.endTime}
                        onChange={(e) => updateTimeSlot(idx, { endTime: e.target.value })}
                        className="h-9 px-3 bg-white border border-[#E5E7EB] rounded-lg"
                      />
                      <button
                        onClick={() => removeTimeSlot(idx)}
                        className="ml-auto px-3 py-1.5 text-sm text-[#DC2626] hover:bg-[#FEE2E2] rounded-lg"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  {timeSlots.length === 0 && (
                    <p className="text-sm text-[#9CA3AF] text-center py-8">No time slots added yet</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#E5E7EB] flex items-center justify-between">
          <button onClick={onClose} className="h-11 px-6 bg-[#F9FAFB] text-[#111827] rounded-lg hover:bg-[#F3F4F6]">
            Cancel
          </button>
          <div className="flex items-center gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="h-11 px-6 bg-[#F9FAFB] text-[#111827] rounded-lg hover:bg-[#F3F4F6]"
              >
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="h-11 px-6 bg-[#D9480F] text-white rounded-lg hover:bg-[#C13F0D] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSave}
                disabled={!canProceed()}
                className="h-11 px-6 bg-[#D9480F] text-white rounded-lg hover:bg-[#C13F0D] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Booking
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
        completed ? 'bg-[#16A34A] text-white' : active ? 'bg-[#D9480F] text-white' : 'bg-[#E5E7EB] text-[#9CA3AF]'
      }`}>
        {completed ? <Check className="w-4 h-4" /> : number}
      </div>
      <span className={`text-sm font-medium ${active ? 'text-[#111827]' : 'text-[#9CA3AF]'}`}>{label}</span>
    </div>
  );
}
