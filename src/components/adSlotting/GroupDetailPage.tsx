import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  ArrowLeft,
  Settings,
  Plus,
  AlertCircle,
  MapPin,
  Monitor,
  Clock,
  TrendingUp,
  Video,
  Image as ImageIcon,
  CheckCircle2,
  Loader2,
  Calendar,
  ChevronRight,
  Filter,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  mockMachineGroups,
  mockMachines,
  getAvailabilityForMachine,
} from '../../data/mockAdSlotting';
import { Machine } from '../../types/adSlotting';
import { format } from 'date-fns';
import SlotPreviewModal from './SlotPreviewModal';
import AnalyticsModal from './AnalyticsModal';
import AvailabilityTimelineTab from './AvailabilityTimelineTab';

// Helper function to get machine status color
const getMachineStatusColor = (status: string) => {
  switch (status) {
    case 'online':
      return 'bg-green-100 text-green-800';
    case 'offline':
      return 'bg-gray-100 text-gray-800';
    case 'syncing':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function GroupDetailPage() {
  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId: string }>();
  const [activeTab, setActiveTab] = useState<'peak' | 'normal'>('peak');
  const [showSlotPreviewModal, setShowSlotPreviewModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showTimelineModal, setShowTimelineModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  
  // New state for timeline tab
  const [timelineRange, setTimelineRange] = useState<'7days' | '30days' | 'custom'>('7days');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [showContinuousOnly, setShowContinuousOnly] = useState(false);
  const [filterSlotType, setFilterSlotType] = useState<'all' | 'peak' | 'normal'>('all');
  
  // New state for devices section collapse
  const [devicesExpanded, setDevicesExpanded] = useState(false);
  
  // New state for slot cards collapse in Operational view
  const [slotsExpanded, setSlotsExpanded] = useState(false);

  // Find the group
  const group = mockMachineGroups.find(g => g.id === groupId);

  if (!group) {
    return (
      <div className="p-8">
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Group Not Found</h2>
          <p className="text-gray-600 mb-6">The group you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/ad-slotting/inventory')}
            className="px-4 py-2 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors"
          >
            Back to Inventory
          </button>
        </div>
      </div>
    );
  }

  // Get machines for this group
  const machines = mockMachines.filter(m => group.machineIds.includes(m.id));

  // Get group-level data (all devices share the same configuration)
  const representativeMachine = machines[0];
  const availability = representativeMachine ? getAvailabilityForMachine(representativeMachine.id) : null;

  // Get unique locations
  const locations = [...new Set(machines.map(m => `${m.location.city} • ${m.location.venue}`))];

  // Check if group has peak windows
  const hasPeakWindows = representativeMachine?.peakWindows && representativeMachine.peakWindows.length > 0;

  // Mock slot data (in real app, this would come from API)
  const mockPeakSlots = [
    {
      position: 1,
      timeRange: '0:00 – 0:10',
      client: 'Nike Sports',
      campaign: 'Nike Spring Campaign',
      mediaType: 'Video',
      duration: '10s',
      booked: true,
    },
    {
      position: 2,
      timeRange: '0:10 – 0:20',
      client: 'Nike Sports',
      campaign: 'Nike Spring Campaign',
      mediaType: 'Image',
      duration: '10s',
      booked: true,
    },
    {
      position: 3,
      timeRange: '0:20 – 0:30',
      client: 'Nike Sports',
      campaign: 'Nike Spring Campaign',
      mediaType: 'Video',
      duration: '10s',
      booked: true,
    },
    {
      position: 4,
      timeRange: '0:30 – 0:40',
      client: 'Nike Sports',
      campaign: 'Nike Spring Campaign',
      mediaType: 'Video',
      duration: '10s',
      booked: true,
    },
    {
      position: 5,
      timeRange: '0:40 – 0:50',
      client: 'Nike Sports',
      campaign: 'Nike Spring Campaign',
      mediaType: 'Image',
      duration: '10s',
      booked: true,
    },
    {
      position: 6,
      timeRange: '0:50 – 1:00',
      client: 'Nike Sports',
      campaign: 'Nike Spring Campaign',
      mediaType: 'Image',
      duration: '10s',
      booked: true,
    },
  ];

  const mockNormalSlots = [
    {
      position: 1,
      timeRange: '0:00 – 0:10',
      client: 'Available',
      campaign: '—',
      mediaType: '—',
      duration: '10s',
      booked: false,
    },
    {
      position: 2,
      timeRange: '0:10 – 0:20',
      client: 'Coca-Cola',
      campaign: 'Summer Refresh',
      mediaType: 'Video',
      duration: '10s',
      booked: true,
    },
    {
      position: 3,
      timeRange: '0:20 – 0:30',
      client: 'Available',
      campaign: '—',
      mediaType: '—',
      duration: '10s',
      booked: false,
    },
    {
      position: 4,
      timeRange: '0:30 – 0:40',
      client: 'Available',
      campaign: '—',
      mediaType: '—',
      duration: '10s',
      booked: false,
    },
    {
      position: 5,
      timeRange: '0:40 – 0:50',
      client: 'Available',
      campaign: '—',
      mediaType: '—',
      duration: '10s',
      booked: false,
    },
    {
      position: 6,
      timeRange: '0:50 – 1:00',
      client: 'Coca-Cola',
      campaign: 'Summer Refresh',
      mediaType: 'Image',
      duration: '10s',
      booked: true,
    },
  ];

  const currentSlots = activeTab === 'peak' ? mockPeakSlots : mockNormalSlots;

  const handleSlotClick = (slot: typeof mockPeakSlots[0]) => {
    if (!slot.booked && representativeMachine) {
      // Navigate to full-page booking flow
      navigate(`/ad-slotting/machines/${representativeMachine.id}/book`);
    } else {
      setSelectedSlot(slot);
      setShowSlotPreviewModal(true);
    }
  };

  const handleEditConfiguration = () => {
    // Navigate to slot configuration page
    navigate('/ad-slotting/slot-config');
  };

  const handleViewAnalytics = () => {
    // Show analytics modal instead of navigating
    setShowAnalyticsModal(true);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Sticky Header with Back Button - Positioned Below Main Nav */}
      <div className="sticky top-14 z-40 bg-white border-b border-[#E5E7EB] px-8 py-4 shadow-sm">
        <button
          onClick={() => navigate('/ad-slotting/inventory')}
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#111827] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-base font-medium">Back to Inventory</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="p-8">
      {/* Group Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex flex-col gap-6">
          {/* Title and Actions Row */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">{group.name}</h1>
                {group.description && (
                  <p className="text-base text-gray-600">{group.description}</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowTimelineModal(true)}
                className="flex items-center gap-2 px-4 h-11 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-base font-normal"
              >
                <Calendar className="w-4 h-4" />
                <span>Availability Timeline</span>
              </button>
              <button
                onClick={handleViewAnalytics}
                className="flex items-center gap-2 px-4 h-11 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-base font-normal"
              >
                <TrendingUp className="w-4 h-4" />
                <span>View Analytics</span>
              </button>
              <button
                onClick={() => {
                  if (representativeMachine) {
                    navigate(`/ad-slotting/machines/${representativeMachine.id}/book`);
                  }
                }}
                className="flex items-center gap-2 px-4 h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors text-base font-normal"
              >
                <Plus className="w-4 h-4" />
                <span>Book Ad</span>
              </button>
            </div>
          </div>

          {/* Critical Information Banner */}
          {/* <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-amber-900 mb-1">
                  Group-Based Booking
                </div>
                <div className="text-sm text-amber-700">
                  All ads booked at group level play across all devices in this group. Devices cannot be booked independently.
                </div>
              </div>
            </div>
          </div> */}

          {/* Group Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Coverage - Enhanced with Location Names */}
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <MapPin className="w-4 h-4" />
                <span>Coverage</span>
              </div>
              {locations.length === 1 ? (
                <div className="text-base font-semibold text-gray-900">{locations[0]}</div>
              ) : (
                <div className="text-base font-semibold text-gray-900" title={locations.join(', ')}>
                  {locations.length} locations · {locations[0].split(' • ')[1] || locations[0]}
                </div>
              )}
            </div>

            {/* Total Devices */}
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <Monitor className="w-4 h-4" />
                <span>Total Devices</span>
              </div>
              <div className="text-base font-semibold text-gray-900">
                {machines.length} {machines.length === 1 ? 'device' : 'devices'}
              </div>
            </div>

            {/* Operating Hours */}
            {representativeMachine && (
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <Clock className="w-4 h-4" />
                  <span>Operating Hours</span>
                </div>
                <div className="text-base font-semibold text-gray-900">
                  {representativeMachine.operatingHours.start} – {representativeMachine.operatingHours.end}
                </div>
              </div>
            )}

            {/* Peak Windows - Inline Grid Item */}
            {hasPeakWindows && representativeMachine && (
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <Clock className="w-4 h-4" />
                  <span>Peak Windows</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {representativeMachine.peakWindows.map((window, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-amber-100 text-amber-800"
                    >
                      {window.start} – {window.end}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Status Badge */}
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Status</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Online
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slot Architecture (Group-Level) */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Slot Architecture</h2>
          <p className="text-sm text-gray-600">
            This slot configuration applies to all {machines.length} devices in this group. Booking a slot reserves it across all devices.
          </p>
        </div>

        {/* Availability Stats */}
        {availability && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
              <div className="text-sm text-gray-600 mb-1">Slot Utilization</div>
              <div className="text-2xl font-semibold text-gray-900">
                {availability.peakAvailability.total > 0 
                  ? Math.round(((availability.peakAvailability.occupied + availability.normalAvailability.occupied) / 
                    (availability.peakAvailability.total + availability.normalAvailability.total)) * 100)
                  : 0}%
              </div>
              <div className="text-xs text-gray-600">
                {availability.peakAvailability.occupied + availability.normalAvailability.occupied} of {availability.peakAvailability.total + availability.normalAvailability.total} booked
              </div>
            </div>

            <div className="bg-green-50 rounded-lg border border-green-200 p-4">
              <div className="text-sm text-gray-600 mb-1">Available Slots</div>
              <div className="text-2xl font-semibold text-green-700">
                {(availability.peakAvailability.total - availability.peakAvailability.occupied) + 
                 (availability.normalAvailability.total - availability.normalAvailability.occupied)}
              </div>
              <div className="text-xs text-gray-600">Ready to book</div>
            </div>

            {hasPeakWindows && (
              <div className="bg-amber-50 rounded-lg border border-amber-200 p-4">
                <div className="text-sm text-gray-600 mb-1">Peak Availability</div>
                <div className="text-2xl font-semibold text-amber-700">
                  {availability.peakAvailability.total - availability.peakAvailability.occupied}/{availability.peakAvailability.total}
                </div>
                <div className="text-xs text-gray-600">Free positions</div>
              </div>
            )}

            <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
              <div className="text-sm text-gray-600 mb-1">Normal Availability</div>
              <div className="text-2xl font-semibold text-blue-700">
                {availability.normalAvailability.total - availability.normalAvailability.occupied}/{availability.normalAvailability.total}
              </div>
              <div className="text-xs text-gray-600">Free positions</div>
            </div>
          </div>
        )}
      </div>

      {/* Today's Slot Allocation Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        {/* Today's Slot Allocation Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Today's Slot Allocation</h3>
        </div>

        {/* Tabs */}
        {hasPeakWindows && (
          <div className="flex gap-2 border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('peak')}
              className={`px-4 py-2 text-base font-medium border-b-2 transition-colors ${
                activeTab === 'peak'
                  ? 'border-[#D9480F] text-[#D9480F]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Peak Slots ({availability?.peakAvailability.total || 0} positions)
            </button>
            <button
              onClick={() => setActiveTab('normal')}
              className={`px-4 py-2 text-base font-medium border-b-2 transition-colors ${
                activeTab === 'normal'
                  ? 'border-[#D9480F] text-[#D9480F]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Normal Slots ({availability?.normalAvailability.total || 0} positions)
            </button>
          </div>
        )}

        {/* Slot Configuration Details */}
        {activeTab === 'peak' && hasPeakWindows && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex flex-wrap gap-6 text-sm">
              <div>
                <span className="text-gray-600">Loop Duration: </span>
                <span className="font-semibold text-gray-900">60s</span>
              </div>
              <div>
                <span className="text-gray-600">Subslot Duration: </span>
                <span className="font-semibold text-gray-900">10s</span>
              </div>
              <div>
                <span className="text-gray-600">Total Positions: </span>
                <span className="font-semibold text-gray-900">{availability?.peakAvailability.total || 0}</span>
              </div>
              <div>
                <span className="text-gray-600">Price: </span>
                <span className="font-semibold text-gray-900">$500</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'normal' && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex flex-wrap gap-6 text-sm">
              <div>
                <span className="text-gray-600">Loop Duration: </span>
                <span className="font-semibold text-gray-900">60s</span>
              </div>
              <div>
                <span className="text-gray-600">Subslot Duration: </span>
                <span className="font-semibold text-gray-900">10s</span>
              </div>
              <div>
                <span className="text-gray-600">Total Positions: </span>
                <span className="font-semibold text-gray-900">{availability?.normalAvailability.total || 0}</span>
              </div>
              <div>
                <span className="text-gray-600">Price: </span>
                <span className="font-semibold text-gray-900">$300</span>
              </div>
            </div>
          </div>
        )}

        {/* Slot Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {currentSlots.map((slot) => (
            <div
              key={slot.position}
              onClick={() => handleSlotClick(slot)}
              className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                slot.booked
                  ? 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:shadow-md'
                  : 'border-green-300 bg-green-50 hover:border-green-400 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white border-2 border-gray-300">
                  <span className="text-xs font-semibold text-gray-900">{slot.position}</span>
                </div>
                <span className="text-xs font-medium text-gray-600">{slot.timeRange}</span>
              </div>

              <div className="space-y-1.5">
                <div>
                  <div className="text-xs text-gray-600">Client</div>
                  <div className={`text-xs font-medium ${slot.booked ? 'text-gray-900' : 'text-green-700'}`}>
                    {slot.client}
                  </div>
                </div>

                {slot.booked && (
                  <>
                    <div>
                      <div className="text-xs text-gray-600">Campaign</div>
                      <div className="text-xs font-medium text-gray-900 truncate" title={slot.campaign}>
                        {slot.campaign}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {slot.mediaType === 'Video' ? (
                        <Video className="w-3 h-3 text-gray-600" />
                      ) : (
                        <ImageIcon className="w-3 h-3 text-gray-600" />
                      )}
                      <span className="text-xs text-gray-600">{slot.mediaType}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Devices in this Group (Informational Only) - Collapsible */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {/* Header with Expand/Collapse - Enhanced Attractive Design */}
        <button
          onClick={() => setDevicesExpanded(!devicesExpanded)}
          className="w-full flex items-center justify-between gap-4 px-4 py-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all group"
        >
          <div className="flex items-center gap-4">
            {/* Icon with Badge */}
            <div className="relative">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 group-hover:bg-blue-100 transition-colors">
                <Monitor className="w-6 h-6" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#D9480F] text-white text-xs font-semibold rounded-full flex items-center justify-center">
                {machines.length}
              </div>
            </div>

            {/* Title and Summary */}
            <div className="text-left">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">Devices in this Group</h2>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-gray-600">
                  {machines.length} {machines.length === 1 ? 'device' : 'devices'}
                </span>
                <span className="text-gray-400">•</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-green-700 font-medium">
                    {machines.filter(m => m.status === 'online').length} online
                  </span>
                </div>
                {machines.filter(m => m.status === 'offline').length > 0 && (
                  <>
                    <span className="text-gray-400">•</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                      <span className="text-gray-600 font-medium">
                        {machines.filter(m => m.status === 'offline').length} offline
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Expand/Collapse Control */}
          <div className="flex items-center gap-2 text-gray-600 group-hover:text-[#D9480F] transition-colors">
            <span className="text-sm font-medium">
              {devicesExpanded ? 'Hide' : 'View'}
            </span>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 group-hover:bg-[#D9480F] group-hover:text-white transition-all">
              {devicesExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </div>
        </button>

        {/* Expandable Device Table */}
        {devicesExpanded && (
          <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gray-50 border-b border-gray-200">
              <div className="hidden lg:grid lg:grid-cols-12 gap-4 px-6 py-4">
                <div className="col-span-4 text-sm font-medium text-gray-900">Device Name</div>
                <div className="col-span-3 text-sm font-medium text-gray-900">Location</div>
                <div className="col-span-2 text-sm font-medium text-gray-900 text-center">Status</div>
                <div className="col-span-2 text-sm font-medium text-gray-900">Last Sync</div>
                <div className="col-span-1 text-sm font-medium text-gray-900 text-center">Health</div>
              </div>
            </div>

            {/* Body */}
            <div className="divide-y divide-gray-200">
              {machines.map((machine: Machine) => (
                <div
                  key={machine.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  {/* Mobile Layout */}
                  <div className="lg:hidden space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="font-medium text-gray-900 text-base">{machine.name}</div>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getMachineStatusColor(
                          machine.status
                        )}`}
                      >
                        {machine.status.charAt(0).toUpperCase() + machine.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {machine.location.city} • {machine.location.venue}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Last sync: {format(new Date(), 'MMM dd, HH:mm')}</span>
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden lg:contents">
                    <div className="col-span-4 flex items-center">
                      <div className="font-medium text-gray-900 text-base">{machine.name}</div>
                    </div>

                    <div className="col-span-3 flex items-center">
                      <div className="text-sm text-gray-600">
                        {machine.location.city} • {machine.location.venue}
                      </div>
                    </div>

                    <div className="col-span-2 flex items-center justify-center">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getMachineStatusColor(
                          machine.status
                        )}`}
                      >
                        {machine.status === 'online' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {machine.status === 'syncing' && <Loader2 className="w-3 h-3 mr-1 animate-spin" />}
                        {machine.status === 'offline' && <AlertCircle className="w-3 h-3 mr-1" />}
                        {machine.status.charAt(0).toUpperCase() + machine.status.slice(1)}
                      </span>
                    </div>

                    <div className="col-span-2 flex items-center">
                      <span className="text-sm text-gray-600">{format(new Date(), 'MMM dd, HH:mm')}</span>
                    </div>

                    <div className="col-span-1 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Slot Preview Modal */}
      {showSlotPreviewModal && selectedSlot && (
        <SlotPreviewModal
          slot={selectedSlot}
          onClose={() => {
            setShowSlotPreviewModal(false);
            setSelectedSlot(null);
          }}
        />
      )}

      {/* Analytics Modal */}
      {showAnalyticsModal && (
        <AnalyticsModal
          groupName={group.name}
          location={locations[0] || 'New York • Times Square Mall'}
          onClose={() => {
            setShowAnalyticsModal(false);
          }}
        />
      )}

      {/* Availability Timeline Modal */}
      {showTimelineModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Availability Timeline</h2>
                <p className="text-sm text-gray-600 mt-1">{group.name}</p>
              </div>
              <button
                onClick={() => setShowTimelineModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <AvailabilityTimelineTab
                totalPeakSlots={availability?.peakAvailability.total || 6}
                totalNormalSlots={availability?.normalAvailability.total || 6}
                hasPeakWindows={hasPeakWindows}
              />
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}