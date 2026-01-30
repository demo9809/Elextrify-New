import { useState, Fragment } from 'react';
import { useNavigate } from 'react-router';
import {
  Play,
  Pause,
  StopCircle,
  Search,
  Filter,
  X,
  AlertTriangle,
  Video,
  Image as ImageIcon,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  MapPin,
  Clock,
  Calendar,
  Eye,
  MoreVertical,
  Activity,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

type AdStatus = 'running' | 'scheduled' | 'paused' | 'completed' | 'conflict';
type MediaType = 'video' | 'image';
type SlotType = 'peak' | 'normal';

interface AdInstance {
  id: string;
  clientId: string;
  clientName: string;
  clientBadge?: string;
  creativeId: string;
  creativeName: string;
  creativeThumbnail?: string;
  mediaType: MediaType;
  duration: number;
  machineId: string;
  machineName: string;
  groupId: string;
  groupName: string;
  locationCity: string;
  locationVenue: string;
  slotType: SlotType;
  slotPositions: number[];
  timeWindowStart: string;
  timeWindowEnd: string;
  startDate: string;
  endDate: string;
  status: AdStatus;
  playCount: number;
  lastPlayed?: string;
  deliveryHealth: 'healthy' | 'warning' | 'critical';
  conflictReason?: string;
  durationMismatch?: boolean;
  machineOffline?: boolean;
  slotConflict?: boolean;
  beforeAd?: { clientName: string; creativeName: string };
  afterAd?: { clientName: string; creativeName: string };
}

const mockAdInstances: AdInstance[] = [
  {
    id: 'ad-001',
    clientId: 'cl-001',
    clientName: 'Nike Sports',
    clientBadge: 'Premium',
    creativeId: 'cr-001',
    creativeName: 'Nike_Spring_30s.mp4',
    mediaType: 'video',
    duration: 30,
    machineId: 'mach-001',
    machineName: 'Mall_Kiosk_01',
    groupId: 'grp-001',
    groupName: 'Central Mall Kiosks',
    locationCity: 'New York',
    locationVenue: 'Central Mall',
    slotType: 'peak',
    slotPositions: [3, 4, 5],
    timeWindowStart: '09:00',
    timeWindowEnd: '12:00',
    startDate: '2025-01-15',
    endDate: '2025-03-31',
    status: 'running',
    playCount: 1247,
    lastPlayed: '2025-01-21T10:45:00',
    deliveryHealth: 'healthy',
    beforeAd: { clientName: 'Coca-Cola', creativeName: 'Summer Refresh' },
    afterAd: { clientName: 'Samsung', creativeName: 'Galaxy Launch' },
  },
  {
    id: 'ad-002',
    clientId: 'cl-001',
    clientName: 'Nike Sports',
    clientBadge: 'Premium',
    creativeId: 'cr-001',
    creativeName: 'Nike_Spring_30s.mp4',
    mediaType: 'video',
    duration: 30,
    machineId: 'mach-002',
    machineName: 'Airport_Screen_A1',
    groupId: 'grp-002',
    groupName: 'LAX Terminal 3 Screens',
    locationCity: 'Los Angeles',
    locationVenue: 'LAX Terminal 3',
    slotType: 'peak',
    slotPositions: [1, 2, 3],
    timeWindowStart: '06:00',
    timeWindowEnd: '22:00',
    startDate: '2025-01-15',
    endDate: '2025-03-31',
    status: 'running',
    playCount: 3421,
    lastPlayed: '2025-01-21T11:15:00',
    deliveryHealth: 'healthy',
  },
  {
    id: 'ad-003',
    clientId: 'cl-002',
    clientName: 'Coca-Cola',
    creativeId: 'cr-002',
    creativeName: 'Coca_Cola_Brand_20s.mp4',
    mediaType: 'video',
    duration: 20,
    machineId: 'mach-001',
    machineName: 'Mall_Kiosk_01',
    groupId: 'grp-001',
    groupName: 'Central Mall Kiosks',
    locationCity: 'New York',
    locationVenue: 'Central Mall',
    slotType: 'normal',
    slotPositions: [6, 7],
    timeWindowStart: '12:00',
    timeWindowEnd: '18:00',
    startDate: '2025-01-10',
    endDate: '2025-02-28',
    status: 'running',
    playCount: 892,
    lastPlayed: '2025-01-21T14:30:00',
    deliveryHealth: 'warning',
  },
  {
    id: 'ad-004',
    clientId: 'cl-003',
    clientName: 'Samsung Electronics',
    creativeId: 'cr-003',
    creativeName: 'Samsung_Galaxy_30s.mp4',
    mediaType: 'video',
    duration: 30,
    machineId: 'mach-003',
    machineName: 'Gym_Display_01',
    groupId: 'grp-003',
    groupName: 'FitLife Downtown Displays',
    locationCity: 'Chicago',
    locationVenue: 'FitLife Downtown',
    slotType: 'peak',
    slotPositions: [4, 5, 6],
    timeWindowStart: '17:00',
    timeWindowEnd: '21:00',
    startDate: '2025-01-20',
    endDate: '2025-04-15',
    status: 'running',
    playCount: 156,
    lastPlayed: '2025-01-21T18:22:00',
    deliveryHealth: 'healthy',
  },
  {
    id: 'ad-005',
    clientId: 'cl-004',
    clientName: 'Apple Inc.',
    creativeId: 'cr-004',
    creativeName: 'Apple_iPhone_15s.mp4',
    mediaType: 'video',
    duration: 15,
    machineId: 'mach-001',
    machineName: 'Mall_Kiosk_01',
    groupId: 'grp-001',
    groupName: 'Central Mall Kiosks',
    locationCity: 'New York',
    locationVenue: 'Central Mall',
    slotType: 'peak',
    slotPositions: [7, 8],
    timeWindowStart: '09:00',
    timeWindowEnd: '12:00',
    startDate: '2025-01-18',
    endDate: '2025-03-15',
    status: 'conflict',
    playCount: 0,
    deliveryHealth: 'critical',
    conflictReason: 'Slot position 8 overlaps with existing booking from Coca-Cola',
    slotConflict: true,
  },
  {
    id: 'ad-006',
    clientId: 'cl-002',
    clientName: 'Coca-Cola',
    creativeId: 'cr-005',
    creativeName: 'Refresh_Summer_Static.jpg',
    mediaType: 'image',
    duration: 10,
    machineId: 'mach-004',
    machineName: 'Transit_Hub_Screen_B2',
    groupId: 'grp-004',
    groupName: 'South Station Screens',
    locationCity: 'Boston',
    locationVenue: 'South Station',
    slotType: 'normal',
    slotPositions: [3],
    timeWindowStart: '00:00',
    timeWindowEnd: '23:59',
    startDate: '2025-01-22',
    endDate: '2025-02-01',
    status: 'scheduled',
    playCount: 0,
    deliveryHealth: 'healthy',
  },
  {
    id: 'ad-007',
    clientId: 'cl-001',
    clientName: 'Nike Sports',
    clientBadge: 'Premium',
    creativeId: 'cr-006',
    creativeName: 'Nike_Product_10s.mp4',
    mediaType: 'video',
    duration: 10,
    machineId: 'mach-005',
    machineName: 'Retail_Display_Main',
    groupId: 'grp-005',
    groupName: 'Union Square Store Displays',
    locationCity: 'San Francisco',
    locationVenue: 'Union Square Store',
    slotType: 'peak',
    slotPositions: [2],
    timeWindowStart: '10:00',
    timeWindowEnd: '20:00',
    startDate: '2025-01-15',
    endDate: '2025-03-31',
    status: 'paused',
    playCount: 542,
    lastPlayed: '2025-01-19T15:10:00',
    deliveryHealth: 'warning',
  },
  {
    id: 'ad-008',
    clientId: 'cl-003',
    clientName: 'Samsung Electronics',
    creativeId: 'cr-007',
    creativeName: 'Samsung_Launch_35s.mp4',
    mediaType: 'video',
    duration: 35,
    machineId: 'mach-002',
    machineName: 'Airport_Screen_A1',
    groupId: 'grp-002',
    groupName: 'LAX Terminal 3 Screens',
    locationCity: 'Los Angeles',
    locationVenue: 'LAX Terminal 3',
    slotType: 'normal',
    slotPositions: [5, 6, 7, 8],
    timeWindowStart: '22:00',
    timeWindowEnd: '06:00',
    startDate: '2025-01-12',
    endDate: '2025-02-28',
    status: 'conflict',
    playCount: 12,
    lastPlayed: '2025-01-20T23:45:00',
    deliveryHealth: 'critical',
    conflictReason: 'Duration 35s does not align with 10s slot structure. System cannot guarantee precise playback timing.',
    durationMismatch: true,
  },
  {
    id: 'ad-009',
    clientId: 'cl-004',
    clientName: 'Apple Inc.',
    creativeId: 'cr-008',
    creativeName: 'Apple_Watch_20s.mp4',
    mediaType: 'video',
    duration: 20,
    machineId: 'mach-006',
    machineName: 'Shopping_Center_Pillar',
    groupId: 'grp-006',
    groupName: 'Westlake Center Pillars',
    locationCity: 'Seattle',
    locationVenue: 'Westlake Center',
    slotType: 'peak',
    slotPositions: [1, 2],
    timeWindowStart: '11:00',
    timeWindowEnd: '14:00',
    startDate: '2024-12-01',
    endDate: '2025-01-15',
    status: 'completed',
    playCount: 2891,
    lastPlayed: '2025-01-15T13:55:00',
    deliveryHealth: 'healthy',
  },
  {
    id: 'ad-010',
    clientId: 'cl-002',
    clientName: 'Coca-Cola',
    creativeId: 'cr-002',
    creativeName: 'Coca_Cola_Brand_20s.mp4',
    mediaType: 'video',
    duration: 20,
    machineId: 'mach-007',
    machineName: 'Metro_Station_Display',
    groupId: 'grp-007',
    groupName: 'Metro Center Displays',
    locationCity: 'Washington DC',
    locationVenue: 'Metro Center',
    slotType: 'normal',
    slotPositions: [4, 5],
    timeWindowStart: '00:00',
    timeWindowEnd: '23:59',
    startDate: '2025-01-10',
    endDate: '2025-03-31',
    status: 'conflict',
    playCount: 0,
    deliveryHealth: 'critical',
    conflictReason: 'Machine offline - last sync 3 hours ago. Ad cannot play until machine is back online.',
    machineOffline: true,
  },
];

// Emergency Stop Modal Component
function EmergencyStopModal({ 
  ad, 
  onClose, 
  onConfirm 
}: { 
  ad: AdInstance; 
  onClose: () => void; 
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-[#DC2626]" />
            </div>
            <h2 className="text-lg font-semibold text-[#111827]">Emergency Stop</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#F9FAFB] rounded transition-colors"
          >
            <X className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          <p className="text-sm text-[#111827] mb-4">
            Are you sure you want to immediately stop this ad? This action will:
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-2 text-sm text-[#6B7280]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#6B7280] mt-1.5 flex-shrink-0" />
              <span>Halt playback instantly on the hardware</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-[#6B7280]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#6B7280] mt-1.5 flex-shrink-0" />
              <span>Remove ad from the current loop rotation</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-[#6B7280]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#6B7280] mt-1.5 flex-shrink-0" />
              <span>Log the emergency stop event</span>
            </li>
          </ul>

          {/* Ad Details */}
          <div className="bg-[#F9FAFB] rounded-lg p-3 border border-[#E5E7EB]">
            <div className="text-xs font-medium text-[#6B7280] mb-2">Stopping Ad:</div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#6B7280]">Client</span>
                <span className="text-xs font-medium text-[#111827]">{ad.clientName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#6B7280]">Creative</span>
                <span className="text-xs font-medium text-[#111827]">{ad.creativeName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#6B7280]">Machine</span>
                <span className="text-xs font-medium text-[#111827]">{ad.machineName}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-[#F9FAFB] border-t border-[#E5E7EB] rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 h-10 bg-white border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 h-10 bg-[#DC2626] text-white rounded-lg hover:bg-[#B91C1C] transition-colors font-medium"
          >
            Emergency Stop
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdsManager() {
  const navigate = useNavigate();

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [emergencyStopAd, setEmergencyStopAd] = useState<AdInstance | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterClient, setFilterClient] = useState<string>('');
  const [filterMachine, setFilterMachine] = useState<string>('');
  const [filterGroup, setFilterGroup] = useState<string>('');
  const [filterSlotType, setFilterSlotType] = useState<SlotType | ''>('');
  const [filterMediaType, setFilterMediaType] = useState<MediaType | ''>('');
  const [filterStatus, setFilterStatus] = useState<AdStatus | ''>('');

  // Filtered data
  const filteredAds = mockAdInstances.filter((ad) => {
    const matchesSearch = 
      ad.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.creativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.machineName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesClient = !filterClient || ad.clientName === filterClient;
    const matchesMachine = !filterMachine || ad.machineName === filterMachine;
    const matchesGroup = !filterGroup || ad.groupName === filterGroup;
    const matchesSlotType = !filterSlotType || ad.slotType === filterSlotType;
    const matchesMediaType = !filterMediaType || ad.mediaType === filterMediaType;
    const matchesStatus = !filterStatus || ad.status === filterStatus;

    return matchesSearch && matchesClient && matchesMachine && matchesGroup && 
           matchesSlotType && matchesMediaType && matchesStatus;
  });

  const uniqueClients = Array.from(new Set(mockAdInstances.map((ad) => ad.clientName)));
  const uniqueMachines = Array.from(new Set(mockAdInstances.map((ad) => ad.machineName)));
  const uniqueGroups = Array.from(new Set(mockAdInstances.map((ad) => ad.groupName)));

  const activeFilterCount = [filterClient, filterMachine, filterGroup, filterSlotType, filterMediaType, filterStatus]
    .filter(Boolean).length;

  const handleSelectAll = () => {
    if (selectedRows.length === filteredAds.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredAds.map((ad) => ad.id));
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleRowExpanded = (id: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleViewAd = (adId: string) => {
    navigate(`/ad-slotting/ads/${adId}`);
  };

  const handlePauseResume = (ad: AdInstance) => {
    const action = ad.status === 'paused' ? 'resumed' : 'paused';
    toast.success(`Ad ${action} successfully`);
  };

  const handleEmergencyStop = (ad: AdInstance) => {
    setEmergencyStopAd(ad);
  };

  const confirmEmergencyStop = () => {
    if (emergencyStopAd) {
      toast.success('Ad stopped immediately');
      setEmergencyStopAd(null);
    }
  };

  const getStatusColor = (status: AdStatus) => {
    switch (status) {
      case 'running': return 'text-[#16A34A] bg-green-50 border-green-200';
      case 'scheduled': return 'text-[#3B82F6] bg-blue-50 border-blue-200';
      case 'paused': return 'text-[#F59E0B] bg-yellow-50 border-yellow-200';
      case 'completed': return 'text-[#6B7280] bg-gray-50 border-[#E5E7EB]';
      case 'conflict': return 'text-[#DC2626] bg-red-50 border-red-200';
      default: return 'text-[#6B7280] bg-gray-50 border-[#E5E7EB]';
    }
  };

  const formatLastPlayed = (timestamp?: string) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return `${Math.floor(diffMins / 1440)}d ago`;
  };

  const handleBulkPause = () => {
    toast.success(`${selectedRows.length} ads paused`);
    setSelectedRows([]);
  };

  const handleBulkResume = () => {
    toast.success(`${selectedRows.length} ads resumed`);
    setSelectedRows([]);
  };

  const clearFilters = () => {
    setFilterClient('');
    setFilterMachine('');
    setFilterGroup('');
    setFilterSlotType('');
    setFilterMediaType('');
    setFilterStatus('');
  };

  return (
    <div className="flex flex-col h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[32px] leading-[38px] font-semibold text-[#111827] mb-2">Ads Manager</h1>
            <p className="text-sm text-[#6B7280]">
              {filteredAds.length} ad instance{filteredAds.length !== 1 ? 's' : ''} • Real-time hardware state
            </p>
          </div>
          {selectedRows.length > 0 && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#6B7280]">{selectedRows.length} selected</span>
              <button
                onClick={handleBulkPause}
                className="flex items-center gap-2 px-4 h-11 bg-white border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-[#F9FAFB] transition-colors font-medium"
              >
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </button>
              <button
                onClick={handleBulkResume}
                className="flex items-center gap-2 px-4 h-11 bg-white border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-[#F9FAFB] transition-colors font-medium"
              >
                <Play className="w-4 h-4" />
                <span>Resume</span>
              </button>
              <button
                onClick={() => setSelectedRows([])}
                className="flex items-center justify-center w-11 h-11 bg-white border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-[#F9FAFB] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client, creative, or machine..."
              className="w-full h-11 pl-10 pr-4 border border-[#E5E7EB] rounded-md text-sm focus:ring-2 focus:ring-[#D9480F] focus:border-transparent bg-white"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 h-11 rounded-lg font-medium transition-colors ${
              showFilters
                ? 'bg-[#D9480F] text-white'
                : 'bg-white border border-[#E5E7EB] text-[#111827] hover:bg-[#F9FAFB]'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-white text-[#D9480F] text-xs font-semibold">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-6 p-6 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
            <div className="grid grid-cols-6 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">Client</label>
                <select
                  value={filterClient}
                  onChange={(e) => setFilterClient(e.target.value)}
                  className="w-full h-11 px-3 border border-[#E5E7EB] rounded-md text-sm focus:ring-2 focus:ring-[#D9480F] focus:border-transparent bg-white"
                >
                  <option value="">All</option>
                  {uniqueClients.map((client) => (
                    <option key={client} value={client}>{client}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">Machine</label>
                <select
                  value={filterMachine}
                  onChange={(e) => setFilterMachine(e.target.value)}
                  className="w-full h-11 px-3 border border-[#E5E7EB] rounded-md text-sm focus:ring-2 focus:ring-[#D9480F] focus:border-transparent bg-white"
                >
                  <option value="">All</option>
                  {uniqueMachines.map((machine) => (
                    <option key={machine} value={machine}>{machine}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">Group</label>
                <select
                  value={filterGroup}
                  onChange={(e) => setFilterGroup(e.target.value)}
                  className="w-full h-11 px-3 border border-[#E5E7EB] rounded-md text-sm focus:ring-2 focus:ring-[#D9480F] focus:border-transparent bg-white"
                >
                  <option value="">All</option>
                  {uniqueGroups.map((group) => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">Slot Type</label>
                <select
                  value={filterSlotType}
                  onChange={(e) => setFilterSlotType(e.target.value as SlotType | '')}
                  className="w-full h-11 px-3 border border-[#E5E7EB] rounded-md text-sm focus:ring-2 focus:ring-[#D9480F] focus:border-transparent bg-white"
                >
                  <option value="">All</option>
                  <option value="peak">Peak</option>
                  <option value="normal">Normal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">Media</label>
                <select
                  value={filterMediaType}
                  onChange={(e) => setFilterMediaType(e.target.value as MediaType | '')}
                  className="w-full h-11 px-3 border border-[#E5E7EB] rounded-md text-sm focus:ring-2 focus:ring-[#D9480F] focus:border-transparent bg-white"
                >
                  <option value="">All</option>
                  <option value="video">Video</option>
                  <option value="image">Image</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as AdStatus | '')}
                  className="w-full h-11 px-3 border border-[#E5E7EB] rounded-md text-sm focus:ring-2 focus:ring-[#D9480F] focus:border-transparent bg-white"
                >
                  <option value="">All</option>
                  <option value="running">Running</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="paused">Paused</option>
                  <option value="completed">Completed</option>
                  <option value="conflict">Conflict</option>
                </select>
              </div>
            </div>
            {activeFilterCount > 0 && (
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-[#6B7280]">{activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active</span>
                <button
                  onClick={clearFilters}
                  className="text-sm text-[#D9480F] hover:underline font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Table Container with Padding */}
      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
              <tr>
                <th className="w-12 px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === filteredAds.length && filteredAds.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-[#D9480F] border-[#E5E7EB] rounded focus:ring-[#D9480F]"
                  />
                </th>
                <th className="w-8 px-3 py-3"></th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">Creative</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">Machine</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">Slot</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">Performance</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[#6B7280] uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#E5E7EB]">
              {filteredAds.map((ad) => {
                const isExpanded = expandedRows.has(ad.id);
                const isSelected = selectedRows.includes(ad.id);

                return (
                  <Fragment key={ad.id}>
                    {/* Main Row */}
                    <tr
                      onClick={() => handleViewAd(ad.id)}
                      className={`hover:bg-[#F9FAFB] transition-colors cursor-pointer ${
                        isSelected ? 'bg-blue-50' : ''
                      } ${ad.status === 'conflict' ? 'border-l-4 border-l-[#DC2626]' : ''}`}
                    >
                      {/* Checkbox */}
                      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectRow(ad.id)}
                          className="w-4 h-4 text-[#D9480F] border-[#E5E7EB] rounded focus:ring-[#D9480F]"
                        />
                      </td>

                      {/* Expand Toggle */}
                      <td className="px-3 py-4" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => toggleRowExpanded(ad.id)}
                          className="p-0.5 hover:bg-gray-200 rounded transition-colors"
                        >
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-[#6B7280]" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-[#6B7280]" />
                          )}
                        </button>
                      </td>

                      {/* Client */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium text-[#111827]">{ad.clientName}</div>
                          {ad.clientBadge && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-700">
                              {ad.clientBadge}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Creative */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-8 bg-[#F9FAFB] rounded flex items-center justify-center flex-shrink-0">
                            {ad.mediaType === 'video' ? (
                              <Video className="w-4 h-4 text-[#6B7280]" />
                            ) : (
                              <ImageIcon className="w-4 h-4 text-[#6B7280]" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-[#111827] truncate max-w-xs">
                              {ad.creativeName}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Duration */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-sm font-medium ${ad.durationMismatch ? 'text-[#DC2626]' : 'text-[#111827]'}`}>
                            {ad.duration}s
                          </span>
                          {ad.durationMismatch && (
                            <AlertTriangle className="w-4 h-4 text-[#DC2626]" />
                          )}
                        </div>
                      </td>

                      {/* Machine */}
                      <td className="px-6 py-4">
                        <div className="group relative">
                          <div className="text-sm font-medium text-[#111827]">{ad.machineName}</div>
                          {ad.machineOffline && (
                            <div className="text-xs text-[#DC2626] mt-0.5">Offline</div>
                          )}
                          {/* Hover tooltip */}
                          <div className="absolute left-0 top-full mt-1 hidden group-hover:block z-20 bg-[#111827] text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                            {ad.locationCity} • {ad.locationVenue}
                          </div>
                        </div>
                      </td>

                      {/* Slot Type */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                          ad.slotType === 'peak'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-gray-100 text-[#6B7280]'
                        }`}>
                          {ad.slotType === 'peak' ? 'Peak' : 'Normal'}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getStatusColor(ad.status)}`}>
                          {ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}
                        </span>
                      </td>

                      {/* Performance */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            ad.deliveryHealth === 'healthy' ? 'bg-[#16A34A]' :
                            ad.deliveryHealth === 'warning' ? 'bg-[#F59E0B]' : 'bg-[#DC2626]'
                          }`} />
                          <span className="text-sm font-medium text-[#111827]">{ad.playCount.toLocaleString()}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleViewAd(ad.id)}
                            className="p-1.5 text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB] rounded transition-colors"
                            title="View Ad"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handlePauseResume(ad)}
                            className="p-1.5 text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB] rounded transition-colors"
                            title={ad.status === 'paused' ? 'Resume' : 'Pause'}
                            disabled={ad.status === 'conflict' || ad.status === 'completed'}
                          >
                            {ad.status === 'paused' ? (
                              <Play className="w-4 h-4" />
                            ) : (
                              <Pause className="w-4 h-4" />
                            )}
                          </button>
                          {ad.status === 'running' && (
                            <button
                              onClick={() => handleEmergencyStop(ad)}
                              className="p-1.5 text-[#DC2626] hover:text-[#DC2626] hover:bg-red-50 rounded transition-colors"
                              title="Emergency Stop"
                            >
                              <StopCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>

                    {/* Expanded Details Row */}
                    {isExpanded && (
                      <tr className="bg-[#F9FAFB]">
                        <td colSpan={10} className="px-6 py-3">
                          <div className="pl-14">
                            {/* Compact Grid */}
                            <div className="grid grid-cols-4 gap-3">
                              {/* Location */}
                              <div className="bg-white rounded-md border border-[#E5E7EB] p-3">
                                <div className="flex items-center gap-1.5 mb-2">
                                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                                  <span className="text-xs font-semibold text-[#111827]">Location</span>
                                </div>
                                <div className="text-xs font-medium text-[#111827]">{ad.locationCity}</div>
                                <div className="text-xs text-[#6B7280]">{ad.locationVenue}</div>
                              </div>

                              {/* Schedule */}
                              <div className="bg-white rounded-md border border-[#E5E7EB] p-3">
                                <div className="flex items-center gap-1.5 mb-2">
                                  <Calendar className="w-3.5 h-3.5 text-purple-600" />
                                  <span className="text-xs font-semibold text-[#111827]">Schedule</span>
                                </div>
                                <div className="flex items-center gap-1 mb-1">
                                  <Clock className="w-3 h-3 text-[#6B7280]" />
                                  <span className="text-xs font-mono text-[#111827]">{ad.timeWindowStart} – {ad.timeWindowEnd}</span>
                                </div>
                                <div className="text-xs text-[#6B7280]">{ad.startDate} to {ad.endDate}</div>
                              </div>

                              {/* Slot Config */}
                              <div className="bg-white rounded-md border border-[#E5E7EB] p-3">
                                <div className="flex items-center gap-1.5 mb-2">
                                  <span className="text-xs font-bold text-orange-600">#</span>
                                  <span className="text-xs font-semibold text-[#111827]">Slot Config</span>
                                </div>
                                <div className="text-xs font-mono font-medium text-[#111827] mb-1">
                                  {ad.slotPositions.length === 1
                                    ? `Position ${ad.slotPositions[0]}`
                                    : `Pos ${ad.slotPositions[0]}–${ad.slotPositions[ad.slotPositions.length - 1]}`}
                                </div>
                                <div className="text-xs text-[#6B7280]">
                                  {ad.slotPositions.length * 10}s in 120s loop
                                </div>
                              </div>

                              {/* Performance */}
                              <div className="bg-white rounded-md border border-[#E5E7EB] p-3">
                                <div className="flex items-center gap-1.5 mb-2">
                                  <Activity className="w-3.5 h-3.5 text-green-600" />
                                  <span className="text-xs font-semibold text-[#111827]">Performance</span>
                                </div>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs text-[#6B7280]">Plays</span>
                                  <span className="text-xs font-bold text-[#111827]">{ad.playCount.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-[#6B7280]">Last</span>
                                  <span className="text-xs text-[#111827]">{formatLastPlayed(ad.lastPlayed)}</span>
                                </div>
                              </div>
                            </div>

                            {/* Playback Sequence - Only if available */}
                            {ad.beforeAd && ad.afterAd && (
                              <div className="mt-3 bg-white rounded-md border border-[#E5E7EB] p-3">
                                <div className="flex items-center gap-1.5 mb-2">
                                  <Play className="w-3.5 h-3.5 text-green-600" />
                                  <span className="text-xs font-semibold text-[#111827]">Playback Sequence</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  {/* Before */}
                                  <div className="flex-1 bg-[#F9FAFB] rounded px-2 py-1.5 border border-[#E5E7EB]">
                                    <div className="text-xs text-[#6B7280] mb-0.5">1. Before</div>
                                    <div className="text-xs font-medium text-[#111827] truncate">{ad.beforeAd.clientName}</div>
                                  </div>
                                  {/* Current */}
                                  <div className="flex-1 bg-orange-50 rounded px-2 py-1.5 border-2 border-[#D9480F]">
                                    <div className="text-xs text-[#D9480F] font-semibold mb-0.5">2. Your Ad</div>
                                    <div className="text-xs font-medium text-[#111827] truncate">{ad.clientName}</div>
                                  </div>
                                  {/* After */}
                                  <div className="flex-1 bg-[#F9FAFB] rounded px-2 py-1.5 border border-[#E5E7EB]">
                                    <div className="text-xs text-[#6B7280] mb-0.5">3. After</div>
                                    <div className="text-xs font-medium text-[#111827] truncate">{ad.afterAd.clientName}</div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Error/Conflict - Only if exists */}
                            {ad.conflictReason && (
                              <div className="mt-3 bg-red-50 rounded-md border border-red-200 p-3">
                                <div className="flex items-start gap-2">
                                  <AlertTriangle className="w-3.5 h-3.5 text-[#DC2626] flex-shrink-0 mt-0.5" />
                                  <div>
                                    <div className="text-xs font-semibold text-[#DC2626] mb-1">Issue Detected</div>
                                    <p className="text-xs text-[#DC2626] leading-relaxed">{ad.conflictReason}</p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Quick Actions */}
                            <div className="mt-3 flex items-center gap-2">
                              <button
                                onClick={() => handleViewAd(ad.id)}
                                className="flex items-center gap-1.5 px-3 h-8 bg-[#D9480F] text-white rounded-md hover:bg-[#C13F0D] transition-colors text-xs font-medium"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>Full Details</span>
                              </button>
                              <button
                                onClick={() => handlePauseResume(ad)}
                                disabled={ad.status === 'conflict' || ad.status === 'completed'}
                                className="flex items-center gap-1.5 px-3 h-8 bg-white border border-[#E5E7EB] text-[#111827] rounded-md hover:bg-[#F9FAFB] transition-colors text-xs font-medium disabled:opacity-50"
                              >
                                {ad.status === 'paused' ? (
                                  <>
                                    <Play className="w-3.5 h-3.5" />
                                    <span>Resume</span>
                                  </>
                                ) : (
                                  <>
                                    <Pause className="w-3.5 h-3.5" />
                                    <span>Pause</span>
                                  </>
                                )}
                              </button>
                              {ad.status === 'running' && (
                                <button
                                  onClick={() => handleEmergencyStop(ad)}
                                  className="flex items-center gap-1.5 px-3 h-8 bg-red-50 border border-red-200 text-[#DC2626] rounded-md hover:bg-red-100 transition-colors text-xs font-medium"
                                >
                                  <StopCircle className="w-3.5 h-3.5" />
                                  <span>Emergency Stop</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>

          {/* Empty State */}
          {filteredAds.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <Search className="w-12 h-12 text-[#6B7280] mb-4" />
              <h3 className="text-[#111827] font-medium mb-2">No ad instances found</h3>
              <p className="text-sm text-[#6B7280] text-center max-w-md">
                {searchQuery || activeFilterCount > 0
                  ? 'Try adjusting your search or filters to find what you\'re looking for.'
                  : 'No ads are currently scheduled or running.'}
              </p>
              {(searchQuery || activeFilterCount > 0) && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    clearFilters();
                  }}
                  className="mt-4 text-sm text-[#D9480F] hover:underline font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Emergency Stop Modal */}
      {emergencyStopAd && (
        <EmergencyStopModal
          ad={emergencyStopAd}
          onClose={() => setEmergencyStopAd(null)}
          onConfirm={confirmEmergencyStop}
        />
      )}
    </div>
  );
}