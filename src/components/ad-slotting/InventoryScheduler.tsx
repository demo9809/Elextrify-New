import { useState, useMemo } from 'react';
import { Monitor, Search, SlidersHorizontal, Calendar, LayoutGrid, ChevronLeft, ChevronRight, CheckSquare, Square, Layers } from 'lucide-react';
import { BookingPanel } from './BookingPanel';
import { FilterPanel } from './FilterPanel';
import { SmartFilterPanel } from './SmartFilterPanel';
import { CalendarView } from './CalendarView';
import { BookingDetailsPanel } from './BookingDetailsPanel';
import { SlotBookingsModal } from './SlotBookingsModal';
import { MultiDeviceBookingPanel } from './MultiDeviceBookingPanel';
import { SchedulerEmptyState } from './SchedulerEmptyState';

interface SlotConfiguration {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  masterSlotDuration: number; // seconds (e.g., 120s)
  subSlotDuration: number; // seconds (e.g., 10s)
  subSlotsPerCycle: number; // e.g., 12
  peakPrice: number;
  nonPeakPrice: number;
  appliedDeviceCount: number;
}

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
  occupancyPercent: number;
  subSlots?: string;
  pop?: {
    actualPlayTime: number;
    scheduledPlayTime: number;
    impressions: number;
    attentiveness: number;
    walkins: number;
  };
}

interface TimeSlot {
  id: string;
  deviceId: string;
  deviceName: string;
  date: string;
  hour: number;
  startTime: string;
  endTime: string;
  duration: number; // seconds
  status: 'open' | 'occupied' | 'partially-occupied';
  pricingTier: 'peak' | 'non-peak';
  price: number;
  occupancy: number; // percentage
  bookings: SlotBooking[]; // Changed from single booking to array
}

interface Device {
  id: string;
  name: string;
  location: string;
  venueType: string;
  status: 'online' | 'offline' | 'syncing';
  slotConfigId: string; // Reference to slot configuration
}

// Slot Configurations (Templates that can be applied to multiple devices)
const SLOT_CONFIGURATIONS: SlotConfiguration[] = [
  {
    id: 'mall-standard-loop',
    name: 'Mall Standard Loop',
    status: 'active',
    masterSlotDuration: 120,
    subSlotDuration: 10,
    subSlotsPerCycle: 12,
    peakPrice: 15,
    nonPeakPrice: 8,
    appliedDeviceCount: 8,
  },
  {
    id: 'airport-premium',
    name: 'Airport Premium',
    status: 'active',
    masterSlotDuration: 60,
    subSlotDuration: 5,
    subSlotsPerCycle: 12,
    peakPrice: 25,
    nonPeakPrice: 15,
    appliedDeviceCount: 3,
  },
  {
    id: 'transit-quick-rotation',
    name: 'Transit Quick Rotation',
    status: 'active',
    masterSlotDuration: 120,
    subSlotDuration: 30,
    subSlotsPerCycle: 4,
    peakPrice: 12,
    nonPeakPrice: 6,
    appliedDeviceCount: 5,
  },
  {
    id: 'gym-long-form',
    name: 'Gym Long Form',
    status: 'active',
    masterSlotDuration: 120,
    subSlotDuration: 60,
    subSlotsPerCycle: 2,
    peakPrice: 10,
    nonPeakPrice: 5,
    appliedDeviceCount: 4,
  },
  {
    id: 'retail-flex',
    name: 'Retail Flex',
    status: 'active',
    masterSlotDuration: 60,
    subSlotDuration: 15,
    subSlotsPerCycle: 4,
    peakPrice: 8,
    nonPeakPrice: 4,
    appliedDeviceCount: 6,
  },
];

const MOCK_DEVICES: Device[] = [
  // Mall Standard Loop devices (8 devices)
  { id: 'd1', name: 'Mall Central - Screen A', location: 'NYC, NY', venueType: 'Mall', status: 'online', slotConfigId: 'mall-standard-loop' },
  { id: 'd2', name: 'Mall Central - Screen B', location: 'NYC, NY', venueType: 'Mall', status: 'online', slotConfigId: 'mall-standard-loop' },
  { id: 'd3', name: 'Westfield Mall Main', location: 'LA, CA', venueType: 'Mall', status: 'online', slotConfigId: 'mall-standard-loop' },
  { id: 'd4', name: 'Galleria Entrance', location: 'Houston, TX', venueType: 'Mall', status: 'online', slotConfigId: 'mall-standard-loop' },
  { id: 'd5', name: 'Mall of America - East', location: 'Minneapolis, MN', venueType: 'Mall', status: 'online', slotConfigId: 'mall-standard-loop' },
  { id: 'd6', name: 'Mall of America - West', location: 'Minneapolis, MN', venueType: 'Mall', status: 'syncing', slotConfigId: 'mall-standard-loop' },
  { id: 'd7', name: 'Shopping Plaza Screen', location: 'Chicago, IL', venueType: 'Mall', status: 'online', slotConfigId: 'mall-standard-loop' },
  { id: 'd8', name: 'Downtown Mall Display', location: 'Seattle, WA', venueType: 'Mall', status: 'offline', slotConfigId: 'mall-standard-loop' },
  
  // Airport Premium devices (3 devices)
  { id: 'd9', name: 'LAX Terminal 1 Gate A', location: 'LAX, CA', venueType: 'Airport', status: 'online', slotConfigId: 'airport-premium' },
  { id: 'd10', name: 'LAX Terminal 2 Gate B', location: 'LAX, CA', venueType: 'Airport', status: 'online', slotConfigId: 'airport-premium' },
  { id: 'd11', name: 'JFK International Arrivals', location: 'NYC, NY', venueType: 'Airport', status: 'online', slotConfigId: 'airport-premium' },
  
  // Transit Quick Rotation devices (5 devices)
  { id: 'd12', name: 'Grand Central Station Main', location: 'NYC, NY', venueType: 'Transit', status: 'online', slotConfigId: 'transit-quick-rotation' },
  { id: 'd13', name: 'Penn Station Platform', location: 'NYC, NY', venueType: 'Transit', status: 'online', slotConfigId: 'transit-quick-rotation' },
  { id: 'd14', name: 'Union Station Entrance', location: 'Chicago, IL', venueType: 'Transit', status: 'online', slotConfigId: 'transit-quick-rotation' },
  { id: 'd15', name: 'Metro Station Downtown', location: 'LA, CA', venueType: 'Transit', status: 'syncing', slotConfigId: 'transit-quick-rotation' },
  { id: 'd16', name: 'Bus Terminal Main', location: 'Boston, MA', venueType: 'Transit', status: 'online', slotConfigId: 'transit-quick-rotation' },
  
  // Gym Long Form devices (4 devices)
  { id: 'd17', name: 'FitLife Gym Entrance', location: 'Miami, FL', venueType: 'Gym', status: 'online', slotConfigId: 'gym-long-form' },
  { id: 'd18', name: 'CrossFit Box Main Screen', location: 'Austin, TX', venueType: 'Gym', status: 'online', slotConfigId: 'gym-long-form' },
  { id: 'd19', name: '24 Hour Fitness Lobby', location: 'San Diego, CA', venueType: 'Gym', status: 'online', slotConfigId: 'gym-long-form' },
  { id: 'd20', name: 'Yoga Studio Display', location: 'Portland, OR', venueType: 'Gym', status: 'online', slotConfigId: 'gym-long-form' },
  
  // Retail Flex devices (6 devices)
  { id: 'd21', name: 'Target Store Front', location: 'NYC, NY', venueType: 'Retail', status: 'online', slotConfigId: 'retail-flex' },
  { id: 'd22', name: 'Best Buy Electronics', location: 'LA, CA', venueType: 'Retail', status: 'online', slotConfigId: 'retail-flex' },
  { id: 'd23', name: 'Walmart Entrance', location: 'Dallas, TX', venueType: 'Retail', status: 'online', slotConfigId: 'retail-flex' },
  { id: 'd24', name: 'CVS Pharmacy Display', location: 'Chicago, IL', venueType: 'Retail', status: 'online', slotConfigId: 'retail-flex' },
  { id: 'd25', name: 'Apple Store Window', location: 'San Francisco, CA', venueType: 'Retail', status: 'syncing', slotConfigId: 'retail-flex' },
  { id: 'd26', name: 'Nike Flagship Screen', location: 'NYC, NY', venueType: 'Retail', status: 'online', slotConfigId: 'retail-flex' },
];

export function InventoryScheduler() {
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [bookingSlot, setBookingSlot] = useState<TimeSlot | null>(null);
  const [viewBookingSlot, setViewBookingSlot] = useState<TimeSlot | null>(null);
  const [slotBookingsModal, setSlotBookingsModal] = useState<TimeSlot | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<SlotBooking | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<any>({}); // Start with empty filters
  const [bookings, setBookings] = useState<Map<string, SlotBooking[]>>(new Map()); // Store bookings by slotId
  
  // Multi-device booking state
  const [multiDeviceMode, setMultiDeviceMode] = useState(false);
  const [selectedDevices, setSelectedDevices] = useState<Set<string>>(new Set());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{ hour: number } | null>(null);

  // Track if screens have been loaded
  const [screensLoaded, setScreensLoaded] = useState(false);

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    // When filters are applied and user clicks "Load Screens", set screensLoaded to true
    // This will be triggered from the SmartFilterPanel
    if (Object.keys(newFilters).length > 0) {
      setScreensLoaded(true);
    }
  };

  const handleCalendarSlotClick = (date: string, deviceId: string) => {
    // Navigate to day view for the selected date and device
    setSelectedDate(new Date(date));
    setSelectedDevice(deviceId);
    setViewMode('day');
  };

  // Generate time slots for the grid
  const timeSlots = useMemo(() => {
    const slots: TimeSlot[] = [];
    const devices = MOCK_DEVICES.filter(d => d.status !== 'offline');

    // Sample bookings with different statuses
    const sampleBookings = [
      {
        id: 'b1',
        clientName: 'Acme Corporation',
        clientId: 'c1',
        contentType: 'playlist' as const,
        contentName: 'Holiday Sale Campaign 2025',
        mediaCount: 5,
        mediaName: 'Holiday Sale Mix',
        mode: 'fixed' as const,
        dateRange: { start: '2024-12-20', end: '2025-01-10' },
        status: 'active' as const,
        pop: {
          actualPlayTime: 2850,
          scheduledPlayTime: 3600,
          impressions: 2340,
          attentiveness: 87,
          walkins: 156,
        },
      },
      {
        id: 'b2',
        clientName: 'Brew Coffee Co.',
        clientId: 'c2',
        contentType: 'media' as const,
        contentName: 'Morning Coffee Promo',
        mediaCount: 1,
        mediaName: 'Coffee Promo - 30s',
        mode: 'stack' as const,
        stackDuration: 900,
        dateRange: { start: '2024-12-28', end: '2025-01-15' },
        status: 'scheduled' as const,
        pop: {
          actualPlayTime: 750,
          scheduledPlayTime: 900,
          impressions: 890,
          attentiveness: 72,
          walkins: 45,
        },
      },
      {
        id: 'b3',
        clientName: 'FitLife Gym',
        clientId: 'c3',
        contentType: 'playlist' as const,
        contentName: 'New Year Fitness Challenge',
        mediaCount: 3,
        mediaName: 'Fitness Mix',
        mode: 'fixed' as const,
        dateRange: { start: '2024-12-15', end: '2024-12-27' },
        status: 'completed' as const,
        pop: {
          actualPlayTime: 3600,
          scheduledPlayTime: 3600,
          impressions: 4520,
          attentiveness: 91,
          walkins: 203,
        },
      },
      {
        id: 'b4',
        clientName: 'TechStart Inc.',
        clientId: 'c4',
        contentType: 'media' as const,
        contentName: 'Product Launch (STOPPED)',
        mediaCount: 1,
        mediaName: 'Product Launch - 45s',
        mode: 'fixed' as const,
        dateRange: { start: '2024-12-20', end: '2025-01-05' },
        status: 'stopped' as const,
        pop: {
          actualPlayTime: 1200,
          scheduledPlayTime: 3600,
          impressions: 450,
          attentiveness: 65,
          walkins: 23,
        },
      },
    ];

    devices.forEach((device, deviceIdx) => {
      for (let hour = 6; hour < 22; hour++) {
        const slotId = `${device.id}-${selectedDate.toISOString().split('T')[0]}-${hour}`;
        
        // Create varied booking patterns with MULTIPLE bookings per slot
        const slotBookings: typeof sampleBookings = [];
        let totalOccupancy = 0;
        
        // Pattern 1: Morning slots (8-10) - Multiple active bookings (up to 3 clients!)
        if (hour >= 8 && hour < 10 && deviceIdx % 2 === 0) {
          slotBookings.push({ ...sampleBookings[0], occupancyPercent: 60, subSlots: 'Slots 1-7' });
          slotBookings.push({ ...sampleBookings[1], id: 'b2-alt', occupancyPercent: 40, subSlots: 'Slots 8-12' });
          totalOccupancy = 100;
        }
        // Pattern 2: Midday slots (12-14) - Single booking with partial occupancy
        else if (hour >= 12 && hour < 14 && deviceIdx % 3 === 0) {
          slotBookings.push({ ...sampleBookings[1], occupancyPercent: 75, subSlots: 'Slots 1-9' });
          totalOccupancy = 75;
        }
        // Pattern 3: Evening peak (17-19) - Heavy multi-client (3 clients!)
        else if (hour >= 17 && hour < 19) {
          if (deviceIdx % 2 === 0) {
            slotBookings.push({ ...sampleBookings[0], occupancyPercent: 50, subSlots: 'Slots 1-6' });
            slotBookings.push({ ...sampleBookings[2], id: 'b3-alt', occupancyPercent: 30, subSlots: 'Slots 7-9' });
            slotBookings.push({ ...sampleBookings[1], id: 'b2-alt2', occupancyPercent: 20, subSlots: 'Slots 10-12' });
            totalOccupancy = 100;
          } else if (deviceIdx === 1) {
            slotBookings.push({ ...sampleBookings[2], occupancyPercent: 100, subSlots: 'All Slots' });
            totalOccupancy = 100;
          }
        }
        // Pattern 4: Late afternoon (15-16) - Stopped booking (single, low occupancy)
        else if (hour >= 15 && hour < 16 && deviceIdx === 2) {
          slotBookings.push({ ...sampleBookings[3], occupancyPercent: 30, subSlots: 'Slots 1-4 (Stopped)' });
          totalOccupancy = 30;
        }
        // Pattern 5: Random partial occupancy with 1-2 bookings
        else if (Math.random() > 0.7 && deviceIdx % 4 !== 0) {
          const randomBooking = sampleBookings[Math.floor(Math.random() * sampleBookings.length)];
          const occupancy = Math.floor(Math.random() * 40) + 15; // 15-55%
          slotBookings.push({ ...randomBooking, id: `${randomBooking.id}-rand`, occupancyPercent: occupancy, subSlots: 'Random Slots' });
          
          // 30% chance of a second booking
          if (Math.random() > 0.7) {
            const secondBooking = sampleBookings[Math.floor(Math.random() * sampleBookings.length)];
            const secondOccupancy = Math.min(Math.floor(Math.random() * 30) + 10, 100 - occupancy);
            slotBookings.push({ ...secondBooking, id: `${secondBooking.id}-rand2`, occupancyPercent: secondOccupancy, subSlots: 'Random Slots' });
            totalOccupancy = occupancy + secondOccupancy;
          } else {
            totalOccupancy = occupancy;
          }
        }
        
        let status: 'open' | 'occupied' | 'partially-occupied' = 'open';
        if (totalOccupancy >= 100) status = 'occupied';
        else if (totalOccupancy > 0) status = 'partially-occupied';

        // Peak hours: 8-10 AM, 5-8 PM
        const isPeak = (hour >= 8 && hour < 10) || (hour >= 17 && hour < 20);

        slots.push({
          id: slotId,
          deviceId: device.id,
          deviceName: device.name,
          date: selectedDate.toISOString().split('T')[0],
          hour,
          startTime: `${hour.toString().padStart(2, '0')}:00`,
          endTime: `${(hour + 1).toString().padStart(2, '0')}:00`,
          duration: 3600,
          status,
          pricingTier: isPeak ? 'peak' : 'non-peak',
          price: isPeak ? 50 : 25,
          occupancy: totalOccupancy,
          bookings: slotBookings, // Changed from single booking to array
        });
      }
    });

    return slots;
  }, [selectedDate]);

  const filteredDevices = useMemo(() => {
    let devices = MOCK_DEVICES;
    
    // Filter by venue types
    if (filters.venueTypes && filters.venueTypes.length > 0) {
      devices = devices.filter(d => {
        const venueTypeLower = d.venueType.toLowerCase();
        return filters.venueTypes.some((filterType: string) => {
          // Map filter IDs to device venue types
          const venueMap: { [key: string]: string[] } = {
            'mall': ['mall'],
            'airport': ['airport'],
            'transit': ['transit'],
            'gym': ['gym'],
            'retail': ['retail'],
            'restaurant': ['restaurant']
          };
          const matchTypes = venueMap[filterType] || [];
          return matchTypes.some(type => venueTypeLower.includes(type));
        });
      });
    }
    
    // Filter by slot configuration
    if (filters.slotConfig && filters.slotConfig !== 'all') {
      devices = devices.filter(d => d.slotConfigId === filters.slotConfig);
    }
    
    // Note: Location tier, foot traffic, and audience interests would require
    // additional metadata on devices in a real implementation
    // For now, we're filtering by venue type and slot config
    
    return devices;
  }, [filters]);

  const hours = Array.from({ length: 16 }, (_, i) => i + 6); // 6 AM to 10 PM

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    setSelectedDate(newDate);
  };

  const handleSlotClick = (slot: TimeSlot, device: Device) => {
    if (multiDeviceMode) {
      // In multi-device mode, select time slot and open multi-device panel
      setSelectedTimeSlot({ hour: slot.hour });
      // Auto-select this device's slot config group
      const devicesInSameConfig = filteredDevices.filter(d => 
        d.slotConfigId === device.slotConfigId && d.status !== 'offline'
      );
      setSelectedDevices(new Set(devicesInSameConfig.map(d => d.id)));
    } else {
      // Normal single-device mode
      if (slot.status === 'open') {
        // Empty slot - go straight to booking
        setBookingSlot(slot);
      } else {
        // Any occupied slot (partial or full) - show modal
        // This allows viewing existing bookings AND booking remaining capacity
        setSlotBookingsModal(slot);
      }
    }
  };

  return (
    <>
      <div className="h-full flex flex-col bg-[#F9FAFB]">
        {/* Minimal Header - Single Row Controls */}
        <div className="bg-white border-b border-[#E5E7EB] px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left: View Mode */}
            <div className="flex items-center gap-2 bg-[#F9FAFB] rounded-lg p-1">
              <button
                onClick={() => setViewMode('day')}
                className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-colors ${
                  viewMode === 'day'
                    ? 'bg-white text-[#D9480F] shadow-sm'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span>Day</span>
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-colors ${
                  viewMode === 'week'
                    ? 'bg-white text-[#D9480F] shadow-sm'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Week</span>
              </button>
              <button
                onClick={() => setViewMode('month')}
                className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-colors ${
                  viewMode === 'month'
                    ? 'bg-white text-[#D9480F] shadow-sm'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Month</span>
              </button>
            </div>

            {/* Center: Date Navigation (Day View Only) */}
            {viewMode === 'day' && (
              <div className="flex items-center gap-2 bg-[#F9FAFB] rounded-lg p-1">
                <button
                  onClick={() => navigateDate('prev')}
                  className="h-9 w-9 flex items-center justify-center rounded hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-[#6B7280]" />
                </button>
                <input
                  type="date"
                  value={selectedDate.toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  className="h-9 px-3 bg-transparent border-none text-sm font-medium text-[#111827] cursor-pointer"
                />
                <button
                  onClick={() => navigateDate('next')}
                  className="h-9 w-9 flex items-center justify-center rounded hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-[#6B7280]" />
                </button>
                <div className="h-6 w-px bg-[#E5E7EB] mx-1" />
                <button
                  onClick={() => setSelectedDate(new Date())}
                  className="h-9 px-3 rounded hover:bg-white transition-colors text-sm font-medium text-[#6B7280]"
                >
                  Today
                </button>
              </div>
            )}

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Multi-Device Mode Toggle */}
              <button
                onClick={() => {
                  setMultiDeviceMode(!multiDeviceMode);
                  if (!multiDeviceMode) {
                    setSelectedDevices(new Set());
                    setSelectedTimeSlot(null);
                  }
                }}
                className={`h-10 px-4 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                  multiDeviceMode
                    ? 'bg-[#D9480F] text-white hover:bg-[#C13C09]'
                    : 'bg-[#F9FAFB] text-[#111827] hover:bg-[#F3F4F6] border border-[#E5E7EB]'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Multi-Device Mode</span>
                {multiDeviceMode && selectedDevices.size > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-white text-[#D9480F] rounded-full text-xs font-semibold">
                    {selectedDevices.size}
                  </span>
                )}
              </button>
              
              {/* Filters Button */}
              <button
                onClick={() => setFilterOpen(true)}
                className="h-10 px-4 bg-[#F9FAFB] text-[#111827] rounded-lg hover:bg-[#F3F4F6] text-sm font-medium flex items-center gap-2 border border-[#E5E7EB]"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* View Content */}
        {viewMode === 'day' ? (
          <>
            {/* Conditional: Show Empty State OR Scheduler Grid */}
            {!screensLoaded ? (
              <SchedulerEmptyState onOpenFilters={() => setFilterOpen(true)} />
            ) : (
              <>
                {/* Scheduler Grid */}
                <div className="flex-1 overflow-auto">
                  <div className="min-w-max">
                    {/* Time Header */}
                    <div className="sticky top-0 z-10 bg-white border-b border-[#E5E7EB]">
                      <div className="flex">
                        <div className="w-64 flex-shrink-0 border-r border-[#E5E7EB] p-4">
                          <p className="text-xs font-semibold text-[#6B7280] uppercase">Device / Time</p>
                        </div>
                        {hours.map(hour => (
                          <div key={hour} className="w-32 flex-shrink-0 border-r border-[#E5E7EB] p-4 text-center">
                            <p className="text-xs font-semibold text-[#6B7280]">
                              {hour.toString().padStart(2, '0')}:00
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Device Rows */}
                    {filteredDevices.map(device => {
                      const deviceSlots = timeSlots.filter(s => s.deviceId === device.id);
                      
                      return (
                        <div key={device.id} className="border-b border-[#E5E7EB] hover:bg-[#FAFAFA]">
                          <div className="flex">
                            {/* Device Info */}
                            <div className="w-64 flex-shrink-0 border-r border-[#E5E7EB] p-4">
                              <div className="flex items-start gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                  device.status === 'online' 
                                    ? 'bg-[#D1FAE5]' 
                                    : device.status === 'syncing'
                                    ? 'bg-[#FEF3C7]'
                                    : 'bg-[#FEE2E2]'
                                }`}>
                                  <Monitor className={`w-5 h-5 ${
                                    device.status === 'online' 
                                      ? 'text-[#16A34A]' 
                                      : device.status === 'syncing'
                                      ? 'text-[#F59E0B]'
                                      : 'text-[#DC2626]'
                                  }`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-[#111827] truncate">{device.name}</p>
                                  <p className="text-xs text-[#6B7280] truncate">{device.location}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-medium ${
                                      device.status === 'online'
                                        ? 'bg-[#D1FAE5] text-[#16A34A]'
                                        : device.status === 'syncing'
                                        ? 'bg-[#FEF3C7] text-[#F59E0B]'
                                        : 'bg-[#FEE2E2] text-[#DC2626]'
                                    }`}>
                                      {device.status}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Time Slots */}
                            {hours.map(hour => {
                              const slot = deviceSlots.find(s => s.hour === hour);
                              if (!slot) return <div key={hour} className="w-32 border-r border-[#E5E7EB]" />;

                              return (
                                <button
                                  key={slot.id}
                                  onClick={() => handleSlotClick(slot, device)}
                                  disabled={device.status === 'offline'}
                                  className={`w-32 border-r border-[#E5E7EB] p-2 transition-all relative group ${
                                    device.status === 'offline'
                                      ? 'cursor-not-allowed opacity-50'
                                      : 'hover:shadow-lg hover:z-10 cursor-pointer'
                                  } ${
                                    slot.status === 'open'
                                      ? 'bg-[#D1FAE5] hover:bg-[#A7F3D0]'
                                      : slot.status === 'partially-occupied'
                                      ? 'bg-[#FEF3C7] hover:bg-[#FDE68A]'
                                      : 'bg-[#FEE2E2] hover:bg-[#FECACA]'
                                  }`}
                                >
                                  <div className="text-left">
                                    {/* Pricing Tier Badge */}
                                    {slot.pricingTier === 'peak' && (
                                      <span className="inline-block px-1.5 py-0.5 bg-[#D9480F] text-white text-[9px] font-medium rounded mb-1">
                                        PEAK
                                      </span>
                                    )}
                                    
                                    {/* Price */}
                                    <p className="text-xs font-semibold text-[#111827] mb-1">
                                      ${slot.price}
                                    </p>

                                    {/* Status */}
                                    {slot.status === 'open' ? (
                                      <p className="text-[10px] text-[#16A34A] font-medium">Open</p>
                                    ) : (
                                      <>
                                        <p className="text-[10px] text-[#6B7280] truncate">
                                          {slot.bookings[0]?.clientName}
                                        </p>
                                        <p className="text-[9px] text-[#9CA3AF] truncate">
                                          {slot.bookings[0]?.mode === 'fixed' ? 'Fixed' : 'Stack'}
                                        </p>
                                      </>
                                    )}

                                    {/* Occupancy Bar */}
                                    {slot.occupancy > 0 && (
                                      <div className="mt-1 h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
                                        <div
                                          className="h-full bg-[#DC2626]"
                                          style={{ width: `${slot.occupancy}%` }}
                                        />
                                      </div>
                                    )}
                                  </div>

                                  {/* Hover Tooltip */}
                                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-[#111827] text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-20 pointer-events-none shadow-xl">
                                    <div className="space-y-1">
                                      <p className="font-semibold">{slot.startTime} - {slot.endTime}</p>
                                      <p>Price: ${slot.price} {slot.pricingTier === 'peak' ? '(Peak)' : ''}</p>
                                      {slot.bookings[0] ? (
                                        <>
                                          <p>Client: {slot.bookings[0].clientName}</p>
                                          <p>Mode: {slot.bookings[0].mode === 'fixed' ? 'Fixed Target' : 'Stack/Random'}</p>
                                          <p>Occupancy: {slot.occupancy}%</p>
                                        </>
                                      ) : (
                                        <p className="text-[#16A34A]">Click to book</p>
                                      )}
                                    </div>
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#111827]" />
                                  </div>
                                </button>
                              );
                            })}
                          </div>
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
                      <span className="text-sm text-[#6B7280]">Open Slot</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-[#FEF3C7] border-2 border-[#F59E0B] rounded" />
                      <span className="text-sm text-[#6B7280]">Partially Occupied</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-[#FEE2E2] border-2 border-[#DC2626] rounded" />
                      <span className="text-sm text-[#6B7280]">Fully Occupied</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="px-2 py-1 bg-[#D9480F] text-white text-xs font-medium rounded">PEAK</div>
                      <span className="text-sm text-[#6B7280]">Peak Hours (Higher Rate)</span>
                    </div>
                  </div>
                </div>

                {/* Booking Panel */}
                {bookingSlot && (
                  <BookingPanel
                    slot={bookingSlot}
                    onClose={() => setBookingSlot(null)}
                    onBook={(booking) => {
                      console.log('Booking created:', booking);
                      setBookingSlot(null);
                    }}
                  />
                )}

                {/* Multi-Device Booking Panel */}
                {multiDeviceMode && selectedTimeSlot && selectedDevices.size > 0 && (
                  <MultiDeviceBookingPanel
                    devices={filteredDevices.filter(d => selectedDevices.has(d.id))}
                    timeSlot={{
                      hour: selectedTimeSlot.hour,
                      date: selectedDate.toISOString().split('T')[0],
                    }}
                    onClose={() => {
                      setSelectedTimeSlot(null);
                      setSelectedDevices(new Set());
                    }}
                    onBook={(booking) => {
                      console.log('Multi-device booking created:', booking);
                      // In real app, this would create bookings for all selected devices
                      setSelectedTimeSlot(null);
                      setSelectedDevices(new Set());
                      setMultiDeviceMode(false);
                    }}
                  />
                )}

                {/* Booking Details Panel */}
                {viewBookingSlot && (
                  <BookingDetailsPanel
                    booking={{
                      id: viewBookingSlot.bookings[0]?.id || 'unknown',
                      clientName: viewBookingSlot.bookings[0]?.clientName || 'Unknown Client',
                      clientId: viewBookingSlot.bookings[0]?.clientId || 'unknown',
                      contentType: viewBookingSlot.bookings[0]?.contentType || 'unknown',
                      contentName: viewBookingSlot.bookings[0]?.contentName || 'Unknown Content',
                      mediaCount: viewBookingSlot.bookings[0]?.mediaCount,
                      deviceName: viewBookingSlot.deviceName || 'Unknown Device',
                      deviceId: viewBookingSlot.deviceId || 'unknown',
                      date: viewBookingSlot.date || selectedDate.toISOString().split('T')[0],
                      timeSlot: `${viewBookingSlot.startTime} - ${viewBookingSlot.endTime}` || 'Unknown Time',
                      playbackMode: viewBookingSlot.bookings[0]?.mode || 'unknown',
                      stackDuration: viewBookingSlot.bookings[0]?.stackDuration,
                      dateRange: viewBookingSlot.bookings[0]?.dateRange || { start: 'unknown', end: 'unknown' },
                      occupancy: 0,
                      status: viewBookingSlot.bookings[0]?.status || 'unknown',
                      pop: viewBookingSlot.bookings[0]?.pop,
                    }}
                    onClose={() => setViewBookingSlot(null)}
                    onEmergencyStop={(bookingId) => {
                      console.log('Emergency stop booking:', bookingId);
                      // In real app, this would call API to stop the ad immediately
                      // and send command to hardware devices
                    }}
                  />
                )}

                {/* Slot Bookings Modal */}
                {slotBookingsModal && (
                  <SlotBookingsModal
                    slot={slotBookingsModal}
                    onClose={() => setSlotBookingsModal(null)}
                    onBookingSelect={(booking) => {
                      // Store the booking and show details panel
                      setSelectedBooking(booking);
                      setSlotBookingsModal(null);
                    }}
                    onBookRemaining={() => {
                      // Open booking panel for remaining capacity
                      setBookingSlot(slotBookingsModal);
                      setSlotBookingsModal(null);
                    }}
                  />
                )}

                {/* Selected Booking Details Panel (from modal) */}
                {selectedBooking && slotBookingsModal === null && (
                  <BookingDetailsPanel
                    booking={{
                      id: selectedBooking.id,
                      clientName: selectedBooking.clientName,
                      clientId: selectedBooking.clientId,
                      contentType: selectedBooking.contentType,
                      contentName: selectedBooking.contentName,
                      mediaCount: selectedBooking.mediaCount,
                      deviceName: 'Device Name', // This would come from the slot
                      deviceId: 'device-id',
                      date: new Date().toISOString().split('T')[0],
                      timeSlot: '00:00 - 01:00',
                      playbackMode: selectedBooking.mode,
                      stackDuration: selectedBooking.stackDuration,
                      dateRange: selectedBooking.dateRange,
                      occupancy: selectedBooking.occupancyPercent,
                      status: selectedBooking.status,
                      pop: selectedBooking.pop,
                    }}
                    onClose={() => setSelectedBooking(null)}
                    onEmergencyStop={(bookingId) => {
                      console.log('Emergency stop booking:', bookingId);
                      setSelectedBooking(null);
                    }}
                  />
                )}
              </>
            )}
          </>
        ) : (
          <CalendarView
            viewType={viewMode}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            onSlotClick={handleCalendarSlotClick}
          />
        )}
      </div>

      {/* SmartFilterPanel - Rendered outside main container for proper fixed positioning */}
      {filterOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => {
              console.log('Backdrop clicked, closing filter');
              setFilterOpen(false);
            }}
          />
          
          {/* Slide-in Panel */}
          <div className="fixed right-0 top-0 h-full z-50 animate-slide-in-right">
            <SmartFilterPanel
              onClose={() => {
                console.log('Close button clicked');
                setFilterOpen(false);
              }}
              onFiltersChange={handleFiltersChange}
            />
          </div>
        </>
      )}
    </>
  );
}

function StatCard({ label, value, status }: { label: string; value: string | number; status: string }) {
  const colors = {
    success: 'text-[#16A34A]',
    warning: 'text-[#F59E0B]',
    primary: 'text-[#D9480F]',
    info: 'text-[#3B82F6]',
  };

  return (
    <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4">
      <p className="text-xs text-[#6B7280] mb-2">{label}</p>
      <p className={`text-2xl font-semibold ${colors[status as keyof typeof colors]}`}>{value}</p>
    </div>
  );
}