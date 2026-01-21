import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Plus, 
  BarChart3, 
  Settings, 
  Play,
  TrendingUp,
  Calendar,
  Eye,
  User,
  Image as ImageIcon,
  Video,
  FileImage
} from 'lucide-react';
import {
  mockMachines,
  getAvailabilityForMachine,
  getMachineStatusColor,
  mockSlotConfigurations,
  mockBookings,
} from '../../data/mockAdSlotting';
import { SlotApplicability } from '../../types/adSlotting';
import MachineAnalyticsModal from './MachineAnalyticsModal';
import EditMachineConfigModal from './EditMachineConfigModal';
import AdDetailModal from './AdDetailModal';
import MachineBookingModal from './MachineBookingModal';
import { toast } from 'sonner';

type SubSlotStatus = 'free' | 'booked' | 'filler';

interface SubSlot {
  position: number;
  startTime: string;
  endTime: string;
  status: SubSlotStatus;
  booking?: {
    id: string;
    clientName: string;
    campaignName: string;
    creativeType: 'image' | 'video';
    thumbnailUrl?: string;
  };
}

export default function MachineView() {
  const { machineId } = useParams<{ machineId: string }>();
  const navigate = useNavigate();
  const [activeSlotType, setActiveSlotType] = useState<SlotApplicability>('peak');
  const [selectedSubSlots, setSelectedSubSlots] = useState<number[]>([]);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showEditConfig, setShowEditConfig] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedAdDetail, setSelectedAdDetail] = useState<SubSlot | null>(null);

  // Find the machine
  const machine = mockMachines.find((m) => m.id === machineId);

  if (!machine) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center">
          <div className="text-gray-900 mb-2">Machine not found</div>
          <button
            onClick={() => navigate('/ad-slotting/inventory')}
            className="text-[#D9480F] hover:underline"
          >
            Return to Inventory
          </button>
        </div>
      </div>
    );
  }

  const availability = getAvailabilityForMachine(machine.id);
  const peakConfig = mockSlotConfigurations.find(
    (c) => c.machineId === machine.id && c.applicability === 'peak'
  );
  const normalConfig = mockSlotConfigurations.find(
    (c) => c.machineId === machine.id && c.applicability === 'normal'
  );

  // Get active configuration
  const activeConfig = activeSlotType === 'peak' ? peakConfig : normalConfig;

  // Generate subslots for visualization
  const generateSubSlots = (): SubSlot[] => {
    if (!activeConfig) return [];

    const subSlots: SubSlot[] = [];
    const totalSlots = activeConfig.totalPositions;

    // Get bookings for this machine and slot type
    const activeBookings = mockBookings.filter(
      (b) =>
        b.machineId === machine.id &&
        b.slotTypes.includes(activeSlotType) &&
        (b.status === 'active' || b.status === 'scheduled')
    );

    // Calculate which positions are booked
    const bookedPositions = new Set<number>();
    activeBookings.forEach((booking) => {
      // Simplified: Just mark first N positions as booked
      for (let i = 0; i < booking.positionsBooked; i++) {
        bookedPositions.add(i);
      }
    });

    // Generate time slots
    for (let i = 0; i < totalSlots; i++) {
      const startSeconds = i * activeConfig.subSlotDuration;
      const endSeconds = (i + 1) * activeConfig.subSlotDuration;
      const startTime = formatTime(startSeconds);
      const endTime = formatTime(endSeconds);

      const isBooked = bookedPositions.has(i);
      const bookingForSlot = isBooked ? activeBookings[0] : null;

      subSlots.push({
        position: i + 1,
        startTime,
        endTime,
        status: isBooked ? 'booked' : i >= totalSlots - 2 ? 'filler' : 'free',
        booking: bookingForSlot
          ? {
              id: bookingForSlot.id,
              clientName: bookingForSlot.clientName,
              campaignName: bookingForSlot.mediaAssetName,
              creativeType: i % 3 === 0 ? 'video' : 'image',
            }
          : undefined,
      });
    }

    return subSlots;
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const subSlots = generateSubSlots();

  const toggleSubSlot = (position: number) => {
    setSelectedSubSlots((prev) =>
      prev.includes(position)
        ? prev.filter((p) => p !== position)
        : [...prev, position]
    );
  };

  // Calculate utilization
  const bookedCount = subSlots.filter((s) => s.status === 'booked').length;
  const fillerCount = subSlots.filter((s) => s.status === 'filler').length;
  const freeCount = subSlots.filter((s) => s.status === 'free').length;
  const utilization = subSlots.length > 0 ? ((bookedCount / subSlots.length) * 100).toFixed(1) : '0';

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-8 py-6">
          <button
            onClick={() => navigate('/ad-slotting/inventory')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Inventory</span>
          </button>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-gray-900 mb-2">{machine.name}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {machine.location.city} • {machine.location.venue}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>
                    {machine.operatingHours.start} – {machine.operatingHours.end}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getMachineStatusColor(
                      machine.status
                    )}`}
                  >
                    {machine.status.charAt(0).toUpperCase() + machine.status.slice(1)}
                  </span>
                </div>
              </div>
              {machine.peakWindows.length > 0 && (
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-700">Peak Windows:</span>
                  {machine.peakWindows.map((window) => (
                    <span
                      key={window.id}
                      className="inline-flex items-center px-2 py-1 rounded-md bg-orange-100 text-orange-800 text-xs"
                    >
                      {window.startTime} – {window.endTime}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAnalytics(true)}
                className="flex items-center gap-2 px-4 h-10 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                <BarChart3 className="w-4 h-4" />
                <span>View Analytics</span>
              </button>
              <button
                onClick={() => setShowEditConfig(true)}
                className="flex items-center gap-2 px-4 h-10 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                <Settings className="w-4 h-4" />
                <span>Edit Configuration</span>
              </button>
              <button
                onClick={() => navigate(`/ad-slotting/machines/${machineId}/book`)}
                className="flex items-center gap-2 px-4 h-10 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                <span>Book Ad</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-[1600px] mx-auto space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-sm text-gray-600 mb-1">Slot Utilization</div>
              <div className="text-2xl font-semibold text-gray-900">{utilization}%</div>
              <div className="text-xs text-gray-500 mt-1">
                {bookedCount} of {subSlots.length} booked
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-sm text-gray-600 mb-1">Available Slots</div>
              <div className="text-2xl font-semibold text-green-600">{freeCount}</div>
              <div className="text-xs text-gray-500 mt-1">Ready to book</div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-sm text-gray-600 mb-1">Peak Availability</div>
              <div className="text-2xl font-semibold text-gray-900">
                {availability ? availability.peakAvailability.total - availability.peakAvailability.occupied : 0}
                /
                {availability ? availability.peakAvailability.total : 0}
              </div>
              <div className="text-xs text-gray-500 mt-1">Free positions</div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-sm text-gray-600 mb-1">Normal Availability</div>
              <div className="text-2xl font-semibold text-gray-900">
                {availability ? availability.normalAvailability.total - availability.normalAvailability.occupied : 0}
                /
                {availability ? availability.normalAvailability.total : 0}
              </div>
              <div className="text-xs text-gray-500 mt-1">Free positions</div>
            </div>
          </div>

          {/* Slot Architecture View */}
          <div className="bg-white rounded-lg border border-gray-200">
            {/* Tabs */}
            <div className="border-b border-gray-200 px-6 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-900">Slot Architecture</h2>
                {selectedSubSlots.length > 0 && (
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">
                      {selectedSubSlots.length} slot{selectedSubSlots.length !== 1 ? 's' : ''} selected
                    </span>
                    <button
                      onClick={() => setSelectedSubSlots([])}
                      className="px-3 h-8 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      Clear
                    </button>
                    <button className="flex items-center gap-2 px-4 h-8 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors text-sm font-medium">
                      <Plus className="w-4 h-4" />
                      <span>Book Selected</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="flex gap-1">
                <button
                  onClick={() => setActiveSlotType('peak')}
                  className={`px-6 h-10 border-b-2 transition-colors text-sm font-medium ${
                    activeSlotType === 'peak'
                      ? 'border-[#D9480F] text-[#D9480F]'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Peak Slots
                  {peakConfig && (
                    <span className="ml-2 text-xs">({peakConfig.totalPositions} positions)</span>
                  )}
                </button>
                <button
                  onClick={() => setActiveSlotType('normal')}
                  className={`px-6 h-10 border-b-2 transition-colors text-sm font-medium ${
                    activeSlotType === 'normal'
                      ? 'border-[#D9480F] text-[#D9480F]'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Normal Slots
                  {normalConfig && (
                    <span className="ml-2 text-xs">({normalConfig.totalPositions} positions)</span>
                  )}
                </button>
              </div>
            </div>

            {/* Configuration Info */}
            {activeConfig && (
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <span className="text-gray-600">Loop Duration:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      {activeConfig.loopDuration}s
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Subslot Duration:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      {activeConfig.subSlotDuration}s
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Positions:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      {activeConfig.totalPositions}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Price:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      ${activeSlotType === 'peak' ? activeConfig.pricing.peakPrice : activeConfig.pricing.normalPrice}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Subslot Grid */}
            <div className="p-6">
              {subSlots.length > 0 ? (
                <div className="grid grid-cols-6 gap-3">
                  {subSlots.map((slot) => {
                    const isSelected = selectedSubSlots.includes(slot.position);
                    const isBooked = slot.status === 'booked';
                    const isFiller = slot.status === 'filler';

                    // Use div for booked slots (to avoid nested buttons), button for others
                    const Component = isBooked ? 'div' : 'button';

                    return (
                      <Component
                        key={slot.position}
                        onClick={() => !isBooked && toggleSubSlot(slot.position)}
                        disabled={isBooked ? undefined : false}
                        className={`relative p-4 rounded-lg border-2 transition-all text-left group ${
                          isBooked
                            ? 'border-gray-300 bg-gray-50 cursor-default'
                            : isFiller
                            ? 'border-yellow-300 bg-yellow-50 hover:border-yellow-400 cursor-pointer'
                            : isSelected
                            ? 'border-[#D9480F] bg-[#FEF2F2] cursor-pointer'
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm cursor-pointer'
                        }`}
                      >
                        {/* Position Badge */}
                        <div
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium mb-2 ${
                            isBooked
                              ? 'bg-gray-300 text-gray-700'
                              : isFiller
                              ? 'bg-yellow-300 text-yellow-800'
                              : isSelected
                              ? 'bg-[#D9480F] text-white'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {slot.position}
                        </div>

                        {/* Time Range */}
                        <div className="text-xs text-gray-600 mb-2">
                          {slot.startTime} – {slot.endTime}
                        </div>

                        {/* Status */}
                        {isBooked && slot.booking ? (
                          <div className="space-y-2">
                            <div className="text-xs font-medium text-gray-900 truncate">
                              {slot.booking.clientName}
                            </div>
                            <div className="text-xs text-gray-600 truncate">
                              {slot.booking.campaignName}
                            </div>
                            <div className="flex items-center gap-1">
                              {slot.booking.creativeType === 'video' ? (
                                <Video className="w-3 h-3 text-gray-500" />
                              ) : (
                                <FileImage className="w-3 h-3 text-gray-500" />
                              )}
                              <span className="text-xs text-gray-500 capitalize">
                                {slot.booking.creativeType}
                              </span>
                            </div>

                            {/* Quick Actions on Hover */}
                            <div className="absolute inset-0 bg-gray-900 bg-opacity-90 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3 pointer-events-none group-hover:pointer-events-auto">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedAdDetail(slot);
                                }}
                                className="w-full flex items-center justify-center gap-1 px-2 py-1.5 bg-white text-gray-900 rounded text-xs font-medium hover:bg-gray-100"
                              >
                                <Eye className="w-3 h-3" />
                                View Ad
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Handle view client
                                }}
                                className="w-full flex items-center justify-center gap-1 px-2 py-1.5 bg-white text-gray-900 rounded text-xs font-medium hover:bg-gray-100"
                              >
                                <User className="w-3 h-3" />
                                View Client
                              </button>
                            </div>
                          </div>
                        ) : isFiller ? (
                          <div>
                            <div className="text-xs font-medium text-yellow-800">Filler Ad</div>
                            <div className="text-xs text-yellow-600 mt-1">Default content</div>
                          </div>
                        ) : (
                          <div>
                            <div className="text-xs font-medium text-green-700">Free</div>
                            <div className="text-xs text-gray-500 mt-1">Available to book</div>
                          </div>
                        )}
                      </Component>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  No slot configuration found for this machine
                </div>
              )}
            </div>
          </div>

          {/* Machine Analytics */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-4">Performance Insights</h2>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <TrendingUp className="w-4 h-4" />
                  <span>Slot Utilization Trend</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">This Week</span>
                    <span className="font-medium text-gray-900">{utilization}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Last Week</span>
                    <span className="font-medium text-gray-900">82.3%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Last Month</span>
                    <span className="font-medium text-gray-900">78.5%</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <Play className="w-4 h-4" />
                  <span>Impression Delivery</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Today</span>
                    <span className="font-medium text-gray-900">12,450</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">This Week</span>
                    <span className="font-medium text-gray-900">84,320</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">This Month</span>
                    <span className="font-medium text-gray-900">356,890</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>Peak vs Normal</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Peak Utilization</span>
                    <span className="font-medium text-gray-900">
                      {availability
                        ? ((availability.peakAvailability.occupied / availability.peakAvailability.total) * 100).toFixed(1)
                        : '0'}
                      %
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Normal Utilization</span>
                    <span className="font-medium text-gray-900">
                      {availability
                        ? ((availability.normalAvailability.occupied / availability.normalAvailability.total) * 100).toFixed(1)
                        : '0'}
                      %
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Revenue Split</span>
                    <span className="font-medium text-gray-900">65% / 35%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAnalytics && (
        <MachineAnalyticsModal
          machine={machine}
          onClose={() => setShowAnalytics(false)}
        />
      )}
      
      {showEditConfig && (
        <EditMachineConfigModal
          machine={machine}
          onClose={() => setShowEditConfig(false)}
          onSave={(config) => {
            console.log('Config saved:', config);
            toast.success('Configuration updated successfully');
          }}
        />
      )}
      
      {showBooking && (
        <MachineBookingModal
          machine={machine}
          preselectedSlotType={activeSlotType}
          preselectedPositions={selectedSubSlots}
          availablePositions={subSlots.filter(s => s.status === 'free').map(s => s.position)}
          onClose={() => {
            setShowBooking(false);
            setSelectedSubSlots([]);
          }}
          onBook={(booking) => {
            console.log('Booking created:', booking);
          }}
        />
      )}
      
      {selectedAdDetail && selectedAdDetail.booking && (
        <AdDetailModal
          subslot={selectedAdDetail}
          onClose={() => setSelectedAdDetail(null)}
          onViewCampaign={() => {
            console.log('View campaign');
            toast.info('Navigate to campaign details');
          }}
          onReplaceCreative={() => {
            console.log('Replace creative');
            toast.info('Open creative replacement flow');
          }}
        />
      )}
    </div>
  );
}