import { useState, useMemo } from 'react';
import { 
  Calendar, 
  Monitor, 
  Plus, 
  Filter, 
  Search,
  ChevronLeft,
  ChevronRight,
  Grid3x3,
  List,
  AlertCircle,
  Zap,
  Clock,
  DollarSign,
  Users,
  Play,
  Square
} from 'lucide-react';
import { SlotCalendarView } from './SlotCalendarView';
import { SlotDetailsPanel } from './SlotDetailsPanel';
import { MediaAssignmentModal } from './MediaAssignmentModal';
import { EmergencyRecallPanel } from './EmergencyRecallPanel';

// Types based on Slot-First Architecture
export interface TimeSlot {
  id: string;
  kioskId: string;
  kioskName: string;
  date: string; // ISO date
  startTime: string; // "09:00"
  endTime: string; // "10:00"
  duration: number; // in seconds
  status: 'free' | 'booked' | 'partially-booked';
  pricingTier: 'peak' | 'non-peak';
  basePrice: number;
  
  // Bookings within this slot
  bookings: SlotBooking[];
}

export interface SlotBooking {
  id: string;
  slotId: string;
  clientId: string;
  clientName: string;
  mediaId: string;
  mediaName: string;
  mediaThumbnail: string;
  mediaType: 'image' | 'video';
  mediaDuration: number; // seconds
  
  // Scheduling mode
  scheduleType: 'fixed' | 'random-frequency';
  
  // For fixed schedules
  exactStartTime?: string; // "09:30"
  exactEndTime?: string; // "09:45"
  
  // For random frequency
  windowStart?: string; // "09:30"
  windowEnd?: string; // "11:00"
  totalPlayTime?: number; // seconds to play within window
  
  // Status
  status: 'scheduled' | 'playing' | 'completed' | 'recalled';
  priority: number; // 1-10 for multi-client rotation
  
  // PoP Data
  actualPlayTime?: number; // seconds actually played
  impressions?: number;
  walkIns?: number;
  attentiveness?: number; // percentage
  
  createdAt: string;
  updatedAt: string;
}

export interface Kiosk {
  id: string;
  name: string;
  location: string;
  venueType: string;
  status: 'online' | 'offline' | 'maintenance';
  timezone: string;
}

// Mock data
const MOCK_KIOSKS: Kiosk[] = [
  { id: 'k1', name: 'Mall Central - Screen A', location: 'NYC, NY', venueType: 'Mall', status: 'online', timezone: 'America/New_York' },
  { id: 'k2', name: 'Airport Terminal 1', location: 'LAX, CA', venueType: 'Airport', status: 'online', timezone: 'America/Los_Angeles' },
  { id: 'k3', name: 'Transit Hub Main', location: 'Chicago, IL', venueType: 'Transit', status: 'online', timezone: 'America/Chicago' },
  { id: 'k4', name: 'Retail Store Display', location: 'NYC, NY', venueType: 'Retail', status: 'offline', timezone: 'America/New_York' },
  { id: 'k5', name: 'Gym Entrance Screen', location: 'Miami, FL', venueType: 'Gym', status: 'online', timezone: 'America/New_York' },
];

const MOCK_BOOKINGS: SlotBooking[] = [
  {
    id: 'b1',
    slotId: 's1-mon-09',
    clientId: 'c1',
    clientName: 'Acme Corporation',
    mediaId: 'm1',
    mediaName: 'Holiday Sale 2025',
    mediaThumbnail: '/placeholder-media.jpg',
    mediaType: 'video',
    mediaDuration: 30,
    scheduleType: 'fixed',
    exactStartTime: '09:00',
    exactEndTime: '09:30',
    status: 'scheduled',
    priority: 1,
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
  },
  {
    id: 'b2',
    slotId: 's1-mon-09',
    clientId: 'c2',
    clientName: 'Brew Coffee Co.',
    mediaId: 'm2',
    mediaName: 'Morning Coffee Special',
    mediaThumbnail: '/placeholder-media.jpg',
    mediaType: 'image',
    mediaDuration: 15,
    scheduleType: 'random-frequency',
    windowStart: '09:30',
    windowEnd: '10:00',
    totalPlayTime: 300, // 5 minutes total
    status: 'scheduled',
    priority: 2,
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
  },
];

type ViewMode = 'week' | 'day' | 'list';

export function SlotScheduler() {
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [selectedKiosks, setSelectedKiosks] = useState<string[]>(MOCK_KIOSKS.map(k => k.id));
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [showMediaAssignment, setShowMediaAssignment] = useState(false);
  const [showEmergencyRecall, setShowEmergencyRecall] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'free' | 'booked'>('all');

  // Generate time slots for the week
  const timeSlots = useMemo(() => {
    const slots: TimeSlot[] = [];
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    selectedKiosks.forEach(kioskId => {
      const kiosk = MOCK_KIOSKS.find(k => k.id === kioskId);
      if (!kiosk) return;
      
      daysOfWeek.forEach((day, dayIndex) => {
        // Generate hourly slots (9 AM - 9 PM = 12 hours)
        for (let hour = 9; hour < 21; hour++) {
          const slotId = `${kioskId}-${day.toLowerCase()}-${hour.toString().padStart(2, '0')}`;
          const bookingsForSlot = MOCK_BOOKINGS.filter(b => b.slotId === slotId);
          
          // Determine slot status
          let status: 'free' | 'booked' | 'partially-booked' = 'free';
          if (bookingsForSlot.length > 0) {
            const totalBookedTime = bookingsForSlot.reduce((sum, b) => {
              if (b.scheduleType === 'fixed' && b.exactStartTime && b.exactEndTime) {
                const [startH, startM] = b.exactStartTime.split(':').map(Number);
                const [endH, endM] = b.exactEndTime.split(':').map(Number);
                return sum + ((endH * 60 + endM) - (startH * 60 + startM)) * 60;
              }
              return sum + (b.totalPlayTime || 0);
            }, 0);
            
            status = totalBookedTime >= 3600 ? 'booked' : 'partially-booked';
          }
          
          // Peak hours: 8-10 AM, 5-8 PM
          const isPeak = (hour >= 8 && hour < 10) || (hour >= 17 && hour < 20);
          
          slots.push({
            id: slotId,
            kioskId: kiosk.id,
            kioskName: kiosk.name,
            date: new Date(selectedWeek.getFullYear(), selectedWeek.getMonth(), selectedWeek.getDate() + dayIndex).toISOString(),
            startTime: `${hour.toString().padStart(2, '0')}:00`,
            endTime: `${(hour + 1).toString().padStart(2, '0')}:00`,
            duration: 3600,
            status,
            pricingTier: isPeak ? 'peak' : 'non-peak',
            basePrice: isPeak ? 150 : 75,
            bookings: bookingsForSlot,
          });
        }
      });
    });
    
    return slots;
  }, [selectedKiosks, selectedWeek]);

  // Filter slots
  const filteredSlots = useMemo(() => {
    return timeSlots.filter(slot => {
      if (filterStatus !== 'all' && slot.status !== filterStatus) return false;
      if (searchTerm && !slot.kioskName.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    });
  }, [timeSlots, filterStatus, searchTerm]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalSlots = filteredSlots.length;
    const bookedSlots = filteredSlots.filter(s => s.status === 'booked').length;
    const partiallyBooked = filteredSlots.filter(s => s.status === 'partially-booked').length;
    const freeSlots = filteredSlots.filter(s => s.status === 'free').length;
    const occupancyRate = totalSlots > 0 ? ((bookedSlots + partiallyBooked * 0.5) / totalSlots * 100).toFixed(1) : 0;
    
    const potentialRevenue = filteredSlots.reduce((sum, slot) => {
      return sum + (slot.status === 'booked' ? slot.basePrice : 0);
    }, 0);

    const activeBookings = filteredSlots.reduce((sum, slot) => sum + slot.bookings.length, 0);
    const uniqueClients = new Set(filteredSlots.flatMap(s => s.bookings.map(b => b.clientId))).size;

    return {
      totalSlots,
      bookedSlots,
      partiallyBooked,
      freeSlots,
      occupancyRate,
      potentialRevenue,
      activeBookings,
      uniqueClients,
    };
  }, [filteredSlots]);

  const handleSlotClick = (slot: TimeSlot) => {
    setSelectedSlot(slot);
  };

  const handleBookSlot = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setShowMediaAssignment(true);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedWeek);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setSelectedWeek(newDate);
  };

  return (
    <div className="h-full flex flex-col bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[#111827] mb-2">Slot Scheduler</h1>
            <p className="text-[#6B7280]">
              Manage hardware slot occupancy and direct media bookings
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowEmergencyRecall(true)}
              className="h-11 px-4 bg-[#DC2626] text-white rounded-lg hover:bg-[#B91C1C] transition-colors flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Emergency Recall</span>
            </button>
            <button className="h-11 px-5 bg-[#D9480F] text-white rounded-lg hover:bg-[#C13F0D] transition-colors flex items-center gap-2">
              <Plus className="w-5 h-5" />
              <span className="text-sm font-medium">Quick Book Slot</span>
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-6 gap-4">
          <StatCard
            icon={Grid3x3}
            label="Total Slots"
            value={stats.totalSlots}
            color="text-[#6B7280]"
          />
          <StatCard
            icon={Zap}
            label="Booked"
            value={stats.bookedSlots}
            color="text-[#16A34A]"
          />
          <StatCard
            icon={Clock}
            label="Partially Booked"
            value={stats.partiallyBooked}
            color="text-[#F59E0B]"
          />
          <StatCard
            icon={Square}
            label="Free Slots"
            value={stats.freeSlots}
            color="text-[#9CA3AF]"
          />
          <StatCard
            icon={DollarSign}
            label="Potential Revenue"
            value={`$${stats.potentialRevenue.toLocaleString()}`}
            color="text-[#D9480F]"
          />
          <StatCard
            icon={Users}
            label="Active Clients"
            value={stats.uniqueClients}
            color="text-[#3B82F6]"
          />
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-white border-b border-[#E5E7EB] px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Week Navigation */}
            <div className="flex items-center gap-2 bg-[#F9FAFB] rounded-lg p-1">
              <button
                onClick={() => navigateWeek('prev')}
                className="h-9 w-9 flex items-center justify-center rounded hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-[#6B7280]" />
              </button>
              <div className="px-4 py-2">
                <p className="text-sm font-medium text-[#111827]">
                  Week of {selectedWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <button
                onClick={() => navigateWeek('next')}
                className="h-9 w-9 flex items-center justify-center rounded hover:bg-white transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-[#6B7280]" />
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-[#F9FAFB] rounded-lg p-1">
              <button
                onClick={() => setViewMode('week')}
                className={`h-9 px-4 rounded text-sm font-medium transition-colors ${
                  viewMode === 'week'
                    ? 'bg-white text-[#D9480F] shadow-sm'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                Week View
              </button>
              <button
                onClick={() => setViewMode('day')}
                className={`h-9 px-4 rounded text-sm font-medium transition-colors ${
                  viewMode === 'day'
                    ? 'bg-white text-[#D9480F] shadow-sm'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                Day View
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`h-9 px-4 rounded text-sm font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-[#D9480F] shadow-sm'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                List View
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
              <input
                type="text"
                placeholder="Search kiosks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 pl-9 pr-4 w-64 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F]/20 focus:border-[#D9480F]"
              />
            </div>

            {/* Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="h-9 px-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F]/20 focus:border-[#D9480F]"
            >
              <option value="all">All Slots</option>
              <option value="free">Free Only</option>
              <option value="booked">Booked Only</option>
            </select>

            <button className="h-9 px-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm font-medium text-[#111827] hover:bg-[#F3F4F6] transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <SlotCalendarView
          slots={filteredSlots}
          kiosks={MOCK_KIOSKS.filter(k => selectedKiosks.includes(k.id))}
          viewMode={viewMode}
          onSlotClick={handleSlotClick}
          onSlotBook={handleBookSlot}
        />
      </div>

      {/* Side Panel - Slot Details */}
      {selectedSlot && (
        <SlotDetailsPanel
          slot={selectedSlot}
          onClose={() => setSelectedSlot(null)}
          onBook={() => setShowMediaAssignment(true)}
        />
      )}

      {/* Media Assignment Modal */}
      {showMediaAssignment && selectedSlot && (
        <MediaAssignmentModal
          slot={selectedSlot}
          onClose={() => setShowMediaAssignment(false)}
          onAssign={(booking) => {
            // Handle booking assignment
            setShowMediaAssignment(false);
            setSelectedSlot(null);
          }}
        />
      )}

      {/* Emergency Recall Panel */}
      {showEmergencyRecall && (
        <EmergencyRecallPanel
          onClose={() => setShowEmergencyRecall(false)}
        />
      )}
    </div>
  );
}

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
}

function StatCard({ icon: Icon, label, value, color }: StatCardProps) {
  return (
    <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-[#6B7280] mb-1">{label}</p>
          <p className="text-lg font-semibold text-[#111827]">{value}</p>
        </div>
      </div>
    </div>
  );
}
