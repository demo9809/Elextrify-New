import { useState, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Monitor,
  Clock,
  DollarSign,
  Zap,
  Square,
  Search,
  Filter
} from 'lucide-react';

interface TimeSlot {
  id: string;
  kioskId: string;
  kioskName: string;
  date: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  duration: number;
  status: 'free' | 'booked' | 'partially-booked';
  pricingTier: 'peak' | 'non-peak';
  basePrice: number;
  bookedMinutes: number;
  availableMinutes: number;
  bookings: any[];
}

interface Kiosk {
  id: string;
  name: string;
  location: string;
  venueType: string;
  status: 'online' | 'offline';
}

// Mock data
const MOCK_KIOSKS: Kiosk[] = [
  { id: 'k1', name: 'Mall Central - Screen A', location: 'NYC, NY', venueType: 'Mall', status: 'online' },
  { id: 'k2', name: 'Airport Terminal 1', location: 'LAX, CA', venueType: 'Airport', status: 'online' },
  { id: 'k3', name: 'Transit Hub Main', location: 'Chicago, IL', venueType: 'Transit', status: 'online' },
  { id: 'k4', name: 'Retail Store Display', location: 'NYC, NY', venueType: 'Retail', status: 'offline' },
  { id: 'k5', name: 'Gym Entrance Screen', location: 'Miami, FL', venueType: 'Gym', status: 'online' },
];

type ViewMode = 'week' | 'day';

interface AvailabilityCalendarProps {
  onBookSlot?: (slots: TimeSlot[]) => void;
}

export function AvailabilityCalendar({ onBookSlot }: AvailabilityCalendarProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedKiosks, setSelectedKiosks] = useState<string[]>(MOCK_KIOSKS.map(k => k.id));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  // Generate time slots
  const timeSlots = useMemo(() => {
    const slots: TimeSlot[] = [];
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());

    const days = viewMode === 'week' ? 7 : 1;
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    selectedKiosks.forEach(kioskId => {
      const kiosk = MOCK_KIOSKS.find(k => k.id === kioskId);
      if (!kiosk) return;

      for (let day = 0; day < days; day++) {
        const currentDate = new Date(startOfWeek);
        currentDate.setDate(startOfWeek.getDate() + day);
        
        // Generate hourly slots from 9 AM to 9 PM
        for (let hour = 9; hour < 21; hour++) {
          const slotId = `${kioskId}-${currentDate.toISOString().split('T')[0]}-${hour}`;
          
          // Simulate some bookings (random for demo)
          const isBooked = Math.random() > 0.7;
          const bookedMinutes = isBooked ? Math.floor(Math.random() * 60) : 0;
          const availableMinutes = 60 - bookedMinutes;
          
          let status: 'free' | 'booked' | 'partially-booked' = 'free';
          if (bookedMinutes >= 60) status = 'booked';
          else if (bookedMinutes > 0) status = 'partially-booked';

          // Peak hours: 8-10 AM, 5-8 PM
          const isPeak = (hour >= 8 && hour < 10) || (hour >= 17 && hour < 20);

          slots.push({
            id: slotId,
            kioskId: kiosk.id,
            kioskName: kiosk.name,
            date: currentDate.toISOString().split('T')[0],
            dayOfWeek: dayNames[currentDate.getDay()],
            startTime: `${hour.toString().padStart(2, '0')}:00`,
            endTime: `${(hour + 1).toString().padStart(2, '0')}:00`,
            duration: 3600,
            status,
            pricingTier: isPeak ? 'peak' : 'non-peak',
            basePrice: isPeak ? 150 : 75,
            bookedMinutes,
            availableMinutes,
            bookings: [],
          });
        }
      }
    });

    return slots;
  }, [selectedDate, selectedKiosks, viewMode]);

  // Filter slots
  const filteredSlots = useMemo(() => {
    if (!searchTerm) return timeSlots;
    return timeSlots.filter(slot =>
      slot.kioskName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [timeSlots, searchTerm]);

  // Group by kiosk and date
  const groupedSlots = useMemo(() => {
    const groups: Record<string, Record<string, TimeSlot[]>> = {};
    
    filteredSlots.forEach(slot => {
      if (!groups[slot.kioskId]) {
        groups[slot.kioskId] = {};
      }
      if (!groups[slot.kioskId][slot.date]) {
        groups[slot.kioskId][slot.date] = [];
      }
      groups[slot.kioskId][slot.date].push(slot);
    });

    return groups;
  }, [filteredSlots]);

  // Get unique dates
  const uniqueDates = useMemo(() => {
    return [...new Set(filteredSlots.map(s => s.date))].sort();
  }, [filteredSlots]);

  // Calculate stats
  const stats = useMemo(() => {
    const total = filteredSlots.length;
    const free = filteredSlots.filter(s => s.status === 'free').length;
    const booked = filteredSlots.filter(s => s.status === 'booked').length;
    const partial = filteredSlots.filter(s => s.status === 'partially-booked').length;
    const revenue = filteredSlots.filter(s => s.status === 'booked').reduce((sum, s) => sum + s.basePrice, 0);

    return { total, free, booked, partial, revenue };
  }, [filteredSlots]);

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    const offset = viewMode === 'week' ? 7 : 1;
    newDate.setDate(newDate.getDate() + (direction === 'next' ? offset : -offset));
    setSelectedDate(newDate);
  };

  const toggleSlotSelection = (slotId: string) => {
    setSelectedSlots(prev =>
      prev.includes(slotId) ? prev.filter(id => id !== slotId) : [...prev, slotId]
    );
  };

  const handleBookSelected = () => {
    const slots = filteredSlots.filter(s => selectedSlots.includes(s.id));
    onBookSlot?.(slots);
    setSelectedSlots([]);
  };

  return (
    <div className="h-full flex flex-col bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-[#111827] mb-2">Slot Availability</h2>
            <p className="text-[#6B7280]">
              Browse available time slots across screens to find optimal booking windows
            </p>
          </div>
          {selectedSlots.length > 0 && (
            <button
              onClick={handleBookSelected}
              className="h-11 px-5 bg-[#D9480F] text-white rounded-lg hover:bg-[#C13F0D] transition-colors"
            >
              Book {selectedSlots.length} Selected Slots
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-4">
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-[#6B7280]" />
              <p className="text-xs text-[#6B7280]">Total Slots</p>
            </div>
            <p className="text-xl font-semibold text-[#111827]">{stats.total}</p>
          </div>
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Square className="w-4 h-4 text-[#16A34A]" />
              <p className="text-xs text-[#6B7280]">Free</p>
            </div>
            <p className="text-xl font-semibold text-[#16A34A]">{stats.free}</p>
          </div>
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-[#F59E0B]" />
              <p className="text-xs text-[#6B7280]">Partial</p>
            </div>
            <p className="text-xl font-semibold text-[#F59E0B]">{stats.partial}</p>
          </div>
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-[#DC2626]" />
              <p className="text-xs text-[#6B7280]">Booked</p>
            </div>
            <p className="text-xl font-semibold text-[#DC2626]">{stats.booked}</p>
          </div>
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4 text-[#D9480F]" />
              <p className="text-xs text-[#6B7280]">Revenue</p>
            </div>
            <p className="text-xl font-semibold text-[#D9480F]">${stats.revenue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white border-b border-[#E5E7EB] px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Date Navigation */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#F9FAFB] rounded-lg p-1">
              <button
                onClick={() => navigateWeek('prev')}
                className="h-9 w-9 flex items-center justify-center rounded hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-[#6B7280]" />
              </button>
              <div className="px-4 py-2 min-w-[200px] text-center">
                <p className="text-sm font-medium text-[#111827]">
                  {viewMode === 'week'
                    ? `Week of ${selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                    : selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <button
                onClick={() => navigateWeek('next')}
                className="h-9 w-9 flex items-center justify-center rounded hover:bg-white transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-[#6B7280]" />
              </button>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-[#F9FAFB] rounded-lg p-1">
              <button
                onClick={() => setViewMode('week')}
                className={`px-4 h-9 rounded text-sm font-medium transition-colors ${
                  viewMode === 'week'
                    ? 'bg-white text-[#D9480F] shadow-sm'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                Week View
              </button>
              <button
                onClick={() => setViewMode('day')}
                className={`px-4 h-9 rounded text-sm font-medium transition-colors ${
                  viewMode === 'day'
                    ? 'bg-white text-[#D9480F] shadow-sm'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                Day View
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
              <input
                type="text"
                placeholder="Search screens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 pl-10 pr-4 w-64 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 overflow-auto p-8">
        <div className="space-y-6">
          {Object.entries(groupedSlots).map(([kioskId, dateSlots]) => {
            const kiosk = MOCK_KIOSKS.find(k => k.id === kioskId);
            if (!kiosk) return null;

            return (
              <div key={kioskId} className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
                {/* Kiosk Header */}
                <div className="bg-[#F9FAFB] border-b border-[#E5E7EB] p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                      <Monitor className="w-5 h-5 text-[#6B7280]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#111827]">{kiosk.name}</h3>
                      <p className="text-xs text-[#6B7280]">{kiosk.location} • {kiosk.venueType}</p>
                    </div>
                  </div>
                </div>

                {/* Dates */}
                {uniqueDates.map(date => {
                  const slots = dateSlots[date] || [];
                  if (slots.length === 0) return null;

                  const dateObj = new Date(date);
                  const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dateObj.getDay()];

                  return (
                    <div key={date} className="border-b border-[#E5E7EB] last:border-b-0">
                      {/* Date Header */}
                      <div className="bg-[#FAFAFA] px-4 py-2 border-b border-[#E5E7EB]">
                        <p className="text-sm font-medium text-[#111827]">
                          {dayName}, {dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>

                      {/* Time Slots Grid */}
                      <div className="p-4 grid grid-cols-12 gap-2">
                        {slots.map(slot => {
                          const isSelected = selectedSlots.includes(slot.id);
                          return (
                            <button
                              key={slot.id}
                              onClick={() => slot.status !== 'booked' && toggleSlotSelection(slot.id)}
                              disabled={slot.status === 'booked'}
                              className={`relative h-16 rounded-lg border-2 transition-all ${
                                slot.status === 'booked'
                                  ? 'bg-[#FEE2E2] border-[#DC2626] cursor-not-allowed opacity-50'
                                  : isSelected
                                  ? 'bg-[#FFF7ED] border-[#D9480F] shadow-lg'
                                  : slot.status === 'partially-booked'
                                  ? 'bg-[#FEF3C7] border-[#F59E0B] hover:border-[#D9480F]'
                                  : 'bg-[#D1FAE5] border-[#16A34A] hover:border-[#D9480F]'
                              }`}
                            >
                              <div className="p-2 text-left h-full flex flex-col justify-between">
                                <div>
                                  <p className="text-xs font-semibold text-[#111827]">{slot.startTime}</p>
                                  {slot.pricingTier === 'peak' && (
                                    <span className="inline-block mt-1 px-1.5 py-0.5 bg-[#D9480F] text-white text-[9px] font-medium rounded">
                                      PEAK
                                    </span>
                                  )}
                                </div>
                                <div className="text-right">
                                  <p className="text-[10px] font-medium text-[#111827]">${slot.basePrice}</p>
                                  {slot.status === 'partially-booked' && (
                                    <p className="text-[9px] text-[#6B7280]">{slot.availableMinutes}m free</p>
                                  )}
                                </div>
                              </div>
                              
                              {/* Status indicator */}
                              <div className={`absolute top-1 right-1 w-2 h-2 rounded-full ${
                                slot.status === 'free' ? 'bg-[#16A34A]' : 
                                slot.status === 'partially-booked' ? 'bg-[#F59E0B]' : 
                                'bg-[#DC2626]'
                              }`} />
                              
                              {isSelected && (
                                <div className="absolute inset-0 flex items-center justify-center bg-[#D9480F]/10 rounded-lg">
                                  <div className="w-6 h-6 bg-[#D9480F] rounded-full flex items-center justify-center">
                                    <Zap className="w-4 h-4 text-white" />
                                  </div>
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white border-t border-[#E5E7EB] px-8 py-4">
        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#D1FAE5] border-2 border-[#16A34A] rounded" />
            <span className="text-sm text-[#6B7280]">Free Slot</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#FEF3C7] border-2 border-[#F59E0B] rounded" />
            <span className="text-sm text-[#6B7280]">Partially Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#FEE2E2] border-2 border-[#DC2626] rounded" />
            <span className="text-sm text-[#6B7280]">Fully Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-2 py-1 bg-[#D9480F] text-white text-xs font-medium rounded">PEAK</div>
            <span className="text-sm text-[#6B7280]">Peak Hours (Higher Rate)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
