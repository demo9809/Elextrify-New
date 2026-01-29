import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { 
  ArrowLeft, 
  MapPin, 
  Monitor, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
  Video,
  TrendingUp,
  Settings,
  Plus,
} from 'lucide-react';
import {
  mockMachines,
  mockMachineGroups,
  getAvailabilityForMachine,
  getMachineStatusColor,
} from '../../data/mockAdSlotting';
import { Machine } from '../../types/adSlotting';
import { format } from 'date-fns';
import CreateBookingModal from './CreateBookingModal';
import SlotPreviewModal from './SlotPreviewModal';
import AnalyticsModal from './AnalyticsModal';

export default function GroupDetailPage() {
  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId: string }>();
  const [activeTab, setActiveTab] = useState<'peak' | 'normal'>('peak');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showSlotPreviewModal, setShowSlotPreviewModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [selectedSlotPosition, setSelectedSlotPosition] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);

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
    if (!slot.booked) {
      setSelectedSlotPosition(slot.position);
      setShowBookingModal(true);
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
    <div className="p-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/ad-slotting/inventory')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-base">Back to Inventory</span>
      </button>

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
              <div className="px-3 py-1 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="text-sm font-medium text-blue-700">Shared Slot Configuration</span>
              </div>
              <button
                onClick={handleViewAnalytics}
                className="flex items-center gap-2 px-4 h-11 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-base font-normal"
              >
                <TrendingUp className="w-4 h-4" />
                <span>View Analytics</span>
              </button>
              <button
                onClick={handleEditConfiguration}
                className="flex items-center gap-2 px-4 h-11 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-base font-normal"
              >
                <Settings className="w-4 h-4" />
                <span>Edit Configuration</span>
              </button>
              <button
                onClick={() => {
                  setSelectedSlotPosition(null);
                  setShowBookingModal(true);
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Covered Locations */}
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <MapPin className="w-4 h-4" />
                <span>Covered Locations</span>
              </div>
              <div className="text-base font-semibold text-gray-900">{locations.length} {locations.length === 1 ? 'location' : 'locations'}</div>
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

            {/* Peak Windows */}
            {hasPeakWindows && representativeMachine && (
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <Clock className="w-4 h-4" />
                  <span>Peak Windows</span>
                </div>
                <div className="text-base font-semibold text-gray-900">
                  {representativeMachine.peakWindows.length} {representativeMachine.peakWindows.length === 1 ? 'window' : 'windows'}
                </div>
              </div>
            )}
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

      {/* Devices in this Group (Informational Only) */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Devices in this Group</h2>
          <p className="text-sm text-gray-600">
            Operational visibility only. All devices share the group's slot configuration above.
          </p>
        </div>

        {/* Devices Table */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
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
      </div>

      {/* Create Booking Modal */}
      {showBookingModal && representativeMachine && (
        <CreateBookingModal
          machine={representativeMachine}
          onClose={() => {
            setShowBookingModal(false);
            setSelectedSlotPosition(null);
          }}
        />
      )}

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
    </div>
  );
}