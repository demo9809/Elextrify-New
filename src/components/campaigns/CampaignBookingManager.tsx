import { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Filter,
  Calendar,
  BarChart3,
  Clock,
  DollarSign,
  Users,
  Edit,
  Trash2,
  Copy,
  Play,
  Pause,
  AlertCircle,
  List,
  Grid3x3
} from 'lucide-react';
import { CreateBookingWizard } from './CreateBookingWizard';
import { BookingDetailsPanel } from './BookingDetailsPanel';
import { AvailabilityCalendar } from './AvailabilityCalendar';

// Campaign Booking = A client's ad running across multiple screens
export interface CampaignBooking {
  id: string;
  clientId: string;
  clientName: string;
  campaignName: string;
  mediaId: string;
  mediaName: string;
  mediaType: 'image' | 'video';
  mediaDuration: number;
  
  // Multi-screen targeting
  targetKiosks: string[]; // Array of kiosk IDs
  targetLocations: string[]; // e.g., ["NYC", "LA"]
  targetVenues: string[]; // e.g., ["Mall", "Airport"]
  
  // Schedule
  scheduleType: 'fixed' | 'random-frequency';
  startDate: string;
  endDate: string;
  daysOfWeek: number[]; // 0-6
  timeSlots: TimeSlotConfig[];
  
  // Status
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed';
  
  // Stats
  totalImpressions?: number;
  totalSpend?: number;
  avgAttentiveness?: number;
  
  createdAt: string;
  updatedAt: string;
}

export interface TimeSlotConfig {
  startTime: string; // "09:00"
  endTime: string; // "10:00"
  
  // For fixed
  exactTimes?: boolean;
  
  // For random frequency
  totalPlayTime?: number; // seconds within this slot
}

// Mock data
const MOCK_BOOKINGS: CampaignBooking[] = [
  {
    id: 'cb1',
    clientId: 'c1',
    clientName: 'Acme Corporation',
    campaignName: 'Holiday Sale 2025',
    mediaId: 'm1',
    mediaName: 'Holiday Sale Video',
    mediaType: 'video',
    mediaDuration: 30,
    targetKiosks: ['k1', 'k2', 'k3'],
    targetLocations: ['NYC', 'LA'],
    targetVenues: ['Mall', 'Airport'],
    scheduleType: 'fixed',
    startDate: '2025-01-20',
    endDate: '2025-02-15',
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
    timeSlots: [
      { startTime: '09:00', endTime: '12:00', exactTimes: true },
      { startTime: '17:00', endTime: '20:00', exactTimes: true },
    ],
    status: 'active',
    totalImpressions: 45230,
    totalSpend: 12450,
    avgAttentiveness: 67,
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
  },
  {
    id: 'cb2',
    clientId: 'c2',
    clientName: 'Brew Coffee Co.',
    campaignName: 'Morning Special',
    mediaId: 'm2',
    mediaName: 'Coffee Banner',
    mediaType: 'image',
    mediaDuration: 15,
    targetKiosks: ['k1', 'k5'],
    targetLocations: ['NYC', 'Miami'],
    targetVenues: ['Mall', 'Gym'],
    scheduleType: 'random-frequency',
    startDate: '2025-01-10',
    endDate: '2025-03-31',
    daysOfWeek: [1, 2, 3, 4, 5],
    timeSlots: [
      { startTime: '07:00', endTime: '10:00', totalPlayTime: 600 },
    ],
    status: 'active',
    totalImpressions: 12890,
    totalSpend: 3200,
    avgAttentiveness: 72,
    createdAt: '2025-01-10T08:00:00Z',
    updatedAt: '2025-01-10T08:00:00Z',
  },
];

type FilterTab = 'all' | 'active' | 'scheduled' | 'paused' | 'completed' | 'drafts';

export function CampaignBookingManager() {
  const [showCreateWizard, setShowCreateWizard] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<CampaignBooking | null>(null);
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [bookings, setBookings] = useState<CampaignBooking[]>(MOCK_BOOKINGS);

  // Filter bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter(booking => {
      // Tab filter
      if (activeTab !== 'all' && booking.status !== activeTab) return false;
      
      // Search filter
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        return (
          booking.clientName.toLowerCase().includes(search) ||
          booking.campaignName.toLowerCase().includes(search) ||
          booking.mediaName.toLowerCase().includes(search) ||
          booking.targetLocations.some(loc => loc.toLowerCase().includes(search))
        );
      }
      
      return true;
    });
  }, [bookings, activeTab, searchTerm]);

  // Calculate stats
  const stats = useMemo(() => {
    const active = bookings.filter(b => b.status === 'active').length;
    const totalScreens = bookings.reduce((sum, b) => sum + b.targetKiosks.length, 0);
    const totalSpend = bookings.reduce((sum, b) => sum + (b.totalSpend || 0), 0);
    const totalImpressions = bookings.reduce((sum, b) => sum + (b.totalImpressions || 0), 0);

    return { active, totalScreens, totalSpend, totalImpressions };
  }, [bookings]);

  const handleDuplicate = (booking: CampaignBooking) => {
    const newBooking = {
      ...booking,
      id: `cb-${Date.now()}`,
      campaignName: `${booking.campaignName} (Copy)`,
      status: 'draft' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setBookings([...bookings, newBooking]);
  };

  const handleDelete = (bookingId: string) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      setBookings(bookings.filter(b => b.id !== bookingId));
    }
  };

  const handleStatusChange = (bookingId: string, newStatus: CampaignBooking['status']) => {
    setBookings(bookings.map(b => 
      b.id === bookingId ? { ...b, status: newStatus, updatedAt: new Date().toISOString() } : b
    ));
  };

  return (
    <div className="h-full flex flex-col bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[#111827] mb-2">Campaign Bookings</h1>
            <p className="text-[#6B7280]">
              Manage multi-screen ad placements and schedules
            </p>
          </div>
          <button
            onClick={() => setShowCreateWizard(true)}
            className="h-11 px-5 bg-[#D9480F] text-white rounded-lg hover:bg-[#C13F0D] transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">New Campaign Booking</span>
          </button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-4 gap-4">
          <StatCard
            icon={BarChart3}
            label="Active Campaigns"
            value={stats.active}
            color="text-[#16A34A]"
          />
          <StatCard
            icon={Calendar}
            label="Total Screens"
            value={stats.totalScreens}
            color="text-[#3B82F6]"
          />
          <StatCard
            icon={Users}
            label="Total Impressions"
            value={stats.totalImpressions.toLocaleString()}
            color="text-[#9333EA]"
          />
          <StatCard
            icon={DollarSign}
            label="Total Spend"
            value={`$${stats.totalSpend.toLocaleString()}`}
            color="text-[#D9480F]"
          />
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b border-[#E5E7EB] px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Tabs */}
          <div className="flex items-center gap-1 bg-[#F9FAFB] rounded-lg p-1">
            {(['all', 'active', 'scheduled', 'paused', 'completed', 'drafts'] as FilterTab[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 h-9 rounded text-sm font-medium transition-colors capitalize ${
                  activeTab === tab
                    ? 'bg-white text-[#D9480F] shadow-sm'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                {tab}
                {tab !== 'all' && (
                  <span className="ml-2 text-xs">
                    ({bookings.filter(b => b.status === tab).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 pl-10 pr-4 w-80 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm"
              />
            </div>
            <button className="h-9 px-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg hover:bg-[#F3F4F6] transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="space-y-4">
          {filteredBookings.map(booking => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onEdit={() => setSelectedBooking(booking)}
              onDuplicate={() => handleDuplicate(booking)}
              onDelete={() => handleDelete(booking.id)}
              onStatusChange={(status) => handleStatusChange(booking.id, status)}
              onClick={() => setSelectedBooking(booking)}
            />
          ))}

          {filteredBookings.length === 0 && (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-[#F9FAFB] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-[#9CA3AF]" />
              </div>
              <h3 className="font-semibold text-[#111827] mb-2">No bookings found</h3>
              <p className="text-sm text-[#6B7280] mb-6">
                {searchTerm
                  ? 'Try adjusting your search terms'
                  : 'Create your first campaign booking to get started'}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => setShowCreateWizard(true)}
                  className="h-11 px-6 bg-[#D9480F] text-white rounded-lg hover:bg-[#C13F0D] transition-colors"
                >
                  Create Booking
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Create Wizard Modal */}
      {showCreateWizard && (
        <CreateBookingWizard
          onClose={() => setShowCreateWizard(false)}
          onSave={(booking) => {
            setBookings([...bookings, booking]);
            setShowCreateWizard(false);
          }}
        />
      )}

      {/* Booking Details Panel */}
      {selectedBooking && (
        <BookingDetailsPanel
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onEdit={() => {
            // Open edit mode
            setSelectedBooking(null);
          }}
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

interface BookingCardProps {
  booking: CampaignBooking;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onStatusChange: (status: CampaignBooking['status']) => void;
  onClick: () => void;
}

function BookingCard({ booking, onEdit, onDuplicate, onDelete, onStatusChange, onClick }: BookingCardProps) {
  const getStatusBadge = () => {
    const configs = {
      active: { bg: 'bg-[#D1FAE5]', text: 'text-[#16A34A]', label: '● Active' },
      scheduled: { bg: 'bg-[#DBEAFE]', text: 'text-[#3B82F6]', label: 'Scheduled' },
      paused: { bg: 'bg-[#FEF3C7]', text: 'text-[#F59E0B]', label: 'Paused' },
      completed: { bg: 'bg-[#F3F4F6]', text: 'text-[#6B7280]', label: 'Completed' },
      draft: { bg: 'bg-[#F3F4F6]', text: 'text-[#6B7280]', label: 'Draft' },
    };
    const config = configs[booking.status];
    return (
      <span className={`px-3 py-1 ${config.bg} ${config.text} rounded-full text-sm font-medium`}>
        {config.label}
      </span>
    );
  };

  return (
    <div
      onClick={onClick}
      className="bg-white border border-[#E5E7EB] rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-[#111827]">{booking.campaignName}</h3>
            {getStatusBadge()}
          </div>
          <div className="flex items-center gap-4 text-sm text-[#6B7280]">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {booking.clientName}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
          {booking.status === 'active' && (
            <button
              onClick={() => onStatusChange('paused')}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#FEF3C7] transition-colors"
              title="Pause"
            >
              <Pause className="w-4 h-4 text-[#F59E0B]" />
            </button>
          )}
          {booking.status === 'paused' && (
            <button
              onClick={() => onStatusChange('active')}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#D1FAE5] transition-colors"
              title="Resume"
            >
              <Play className="w-4 h-4 text-[#16A34A]" />
            </button>
          )}
          <button
            onClick={onEdit}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#F9FAFB] transition-colors"
            title="Edit"
          >
            <Edit className="w-4 h-4 text-[#6B7280]" />
          </button>
          <button
            onClick={onDuplicate}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#F9FAFB] transition-colors"
            title="Duplicate"
          >
            <Copy className="w-4 h-4 text-[#6B7280]" />
          </button>
          <button
            onClick={onDelete}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#FEE2E2] transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4 text-[#DC2626]" />
          </button>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-4 gap-6 mb-4">
        <div>
          <p className="text-xs text-[#6B7280] mb-1">Screens</p>
          <p className="text-sm font-semibold text-[#111827]">
            {booking.targetKiosks.length} kiosks
          </p>
          <p className="text-xs text-[#9CA3AF]">
            {booking.targetVenues.join(', ')}
          </p>
        </div>
        <div>
          <p className="text-xs text-[#6B7280] mb-1">Locations</p>
          <p className="text-sm font-semibold text-[#111827]">
            {booking.targetLocations.length} cities
          </p>
          <p className="text-xs text-[#9CA3AF]">
            {booking.targetLocations.join(', ')}
          </p>
        </div>
        <div>
          <p className="text-xs text-[#6B7280] mb-1">Schedule</p>
          <p className="text-sm font-semibold text-[#111827]">
            {booking.scheduleType === 'fixed' ? 'Fixed Times' : 'Random Freq'}
          </p>
          <p className="text-xs text-[#9CA3AF]">
            {booking.timeSlots.length} time slot{booking.timeSlots.length > 1 ? 's' : ''}
          </p>
        </div>
        <div>
          <p className="text-xs text-[#6B7280] mb-1">Performance</p>
          <p className="text-sm font-semibold text-[#111827]">
            {booking.totalImpressions?.toLocaleString() || 0}
          </p>
          <p className="text-xs text-[#9CA3AF]">
            {booking.avgAttentiveness}% attention
          </p>
        </div>
      </div>

      {/* Time Slots Preview */}
      <div className="flex items-center gap-2 flex-wrap">
        {booking.timeSlots.slice(0, 3).map((slot, idx) => (
          <div key={idx} className="px-3 py-1.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-xs">
            <Clock className="w-3 h-3 inline mr-1 text-[#6B7280]" />
            {slot.startTime} - {slot.endTime}
          </div>
        ))}
        {booking.timeSlots.length > 3 && (
          <div className="px-3 py-1.5 text-xs text-[#6B7280]">
            +{booking.timeSlots.length - 3} more
          </div>
        )}
      </div>
    </div>
  );
}