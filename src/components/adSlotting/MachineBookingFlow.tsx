import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Upload,
  Video,
  FileImage,
  AlertCircle,
  Info,
  Search,
  Plus,
  ChevronDown,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { SlotApplicability } from '../../types/adSlotting';
import { mockMachines, mockSlotConfigurations, mockMachineGroups } from '../../data/mockAdSlotting';
import { toast } from 'sonner@2.0.3';

interface MediaAsset {
  id: string;
  name: string;
  type: 'image' | 'video';
  duration: number;
  resolution: string;
  format: string;
  validated: boolean;
  clientId: string;
}

const mockMediaLibrary: MediaAsset[] = [
  {
    id: 'media-001',
    name: 'Nike_Spring_30s.mp4',
    type: 'video',
    duration: 30,
    resolution: '1920x1080',
    format: 'MP4',
    validated: true,
    clientId: 'cl-001',
  },
  {
    id: 'media-002',
    name: 'Nike_Summer_15s.mp4',
    type: 'video',
    duration: 15,
    resolution: '1920x1080',
    format: 'MP4',
    validated: true,
    clientId: 'cl-001',
  },
  {
    id: 'media-003',
    name: 'Nike_Product_10s.mp4',
    type: 'video',
    duration: 10,
    resolution: '1920x1080',
    format: 'MP4',
    validated: true,
    clientId: 'cl-001',
  },
  {
    id: 'media-004',
    name: 'Coca_Cola_Brand_20s.mp4',
    type: 'video',
    duration: 20,
    resolution: '1920x1080',
    format: 'MP4',
    validated: true,
    clientId: 'cl-002',
  },
  {
    id: 'media-005',
    name: 'Coca_Cola_Refresh_15s.mp4',
    type: 'video',
    duration: 15,
    resolution: '1920x1080',
    format: 'MP4',
    validated: true,
    clientId: 'cl-002',
  },
  {
    id: 'media-006',
    name: 'Samsung_Launch_Static.jpg',
    type: 'image',
    duration: 10,
    resolution: '1920x1080',
    format: 'JPG',
    validated: true,
    clientId: 'cl-003',
  },
  {
    id: 'media-007',
    name: 'Samsung_Galaxy_30s.mp4',
    type: 'video',
    duration: 30,
    resolution: '1920x1080',
    format: 'MP4',
    validated: true,
    clientId: 'cl-003',
  },
  {
    id: 'media-008',
    name: 'Apple_iPhone_15s.mp4',
    type: 'video',
    duration: 15,
    resolution: '1920x1080',
    format: 'MP4',
    validated: true,
    clientId: 'cl-004',
  },
];

interface Client {
  id: string;
  name: string;
}

const mockClients: Client[] = [
  { id: 'cl-001', name: 'Nike Sports' },
  { id: 'cl-002', name: 'Coca-Cola' },
  { id: 'cl-003', name: 'Samsung Electronics' },
  { id: 'cl-004', name: 'Apple Inc.' },
];

const CAMPAIGN_DURATION_PRESETS = [
  { value: 30, label: '30 days' },
  { value: 90, label: '90 days' },
  { value: 365, label: '1 year' },
];

interface SubSlot {
  position: number;
  startTime: string;
  endTime: string;
  duration: number;
  status: 'free' | 'booked' | 'filler';
  price: number;
  booking?: {
    clientName: string;
    mediaName: string;
  };
}

export default function MachineBookingFlow() {
  const { machineId } = useParams<{ machineId: string }>();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Client & Media Selection
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<MediaAsset | null>(null);
  const [clientSearch, setClientSearch] = useState('');
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [mediaSearch, setMediaSearch] = useState('');

  // Step 2: Slot Selection
  const [slotType, setSlotType] = useState<SlotApplicability>('peak');
  const [selectedSlotGroup, setSelectedSlotGroup] = useState<number[]>([]);
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);
  const [selectionError, setSelectionError] = useState<string | null>(null);

  // Step 3: Duration Selection
  const [durationType, setDurationType] = useState<'preset' | 'custom'>('preset');
  const [campaignDuration, setCampaignDuration] = useState(30);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const machine = mockMachines.find((m) => m.id === machineId);
  
  // Find the group this machine belongs to
  const machineGroup = machine ? mockMachineGroups.find((g) => g.machineIds.includes(machine.id)) : null;

  if (!machine) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
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

  const activeConfig = mockSlotConfigurations.find(
    (c) => c.machineId === machine.id && c.applicability === slotType
  );

  const generateSubSlots = (): SubSlot[] => {
    if (!activeConfig) return [];

    const subSlots: SubSlot[] = [];
    const totalSlots = activeConfig.totalPositions;
    const price = slotType === 'peak' ? activeConfig.pricing.peakPrice || 500 : activeConfig.pricing.normalPrice || 300;

    const bookedPositions = new Set([1, 2, 7, 8, 9]);

    for (let i = 0; i < totalSlots; i++) {
      const position = i + 1;
      const startSeconds = i * activeConfig.subSlotDuration;
      const endSeconds = (i + 1) * activeConfig.subSlotDuration;
      const startTime = formatTime(startSeconds);
      const endTime = formatTime(endSeconds);

      const isBooked = bookedPositions.has(position);

      subSlots.push({
        position,
        startTime,
        endTime,
        duration: activeConfig.subSlotDuration,
        status: isBooked ? 'booked' : position === totalSlots ? 'filler' : 'free',
        price,
        booking: isBooked
          ? {
              clientName: position <= 2 ? 'Coca-Cola' : 'Apple Inc.',
              mediaName: position <= 2 ? 'Summer Refresh' : 'iPhone 16 Launch',
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

  const requiredSlotCount = selectedMedia && activeConfig
    ? Math.ceil(selectedMedia.duration / activeConfig.subSlotDuration)
    : 0;

  const canStartSelection = (position: number): boolean => {
    if (!selectedMedia || requiredSlotCount === 0) return false;
    
    const slot = subSlots.find((s) => s.position === position);
    if (!slot || slot.status !== 'free') return false;

    for (let i = 0; i < requiredSlotCount; i++) {
      const nextSlot = subSlots.find((s) => s.position === position + i);
      if (!nextSlot || nextSlot.status !== 'free') {
        return false;
      }
    }
    return true;
  };

  const getPreviewSelection = (startPosition: number): number[] => {
    if (!canStartSelection(startPosition)) return [];
    
    const preview: number[] = [];
    for (let i = 0; i < requiredSlotCount; i++) {
      preview.push(startPosition + i);
    }
    return preview;
  };

  const handleSlotClick = (position: number) => {
    setSelectionError(null);
    
    if (!canStartSelection(position)) {
      const slot = subSlots.find((s) => s.position === position);
      if (!slot || slot.status !== 'free') {
        setSelectionError(`Slot #${position} is ${slot?.status === 'booked' ? `booked by ${slot.booking?.clientName}` : 'not available'}.`);
        return;
      }

      for (let i = 0; i < requiredSlotCount; i++) {
        const checkPosition = position + i;
        const checkSlot = subSlots.find((s) => s.position === checkPosition);
        if (!checkSlot || checkSlot.status !== 'free') {
          const blockingClient = checkSlot?.booking?.clientName;
          setSelectionError(
            checkSlot?.status === 'booked'
              ? `Slot #${checkPosition} is booked by ${blockingClient}. This breaks the ${selectedMedia?.duration}s sequence.`
              : `Slots #${checkPosition} and beyond are unavailable. Select another nearby free slot.`
          );
          return;
        }
      }
    }

    const newSelection = getPreviewSelection(position);
    setSelectedSlotGroup(newSelection);
    setSelectionError(null);
  };

  const findValidSlotGroups = (): number[][] => {
    if (!selectedMedia || requiredSlotCount === 0) return [];

    const validGroups: number[][] = [];
    const freeSlots = subSlots.filter((s) => s.status === 'free');

    for (let i = 0; i <= freeSlots.length - requiredSlotCount; i++) {
      const group: number[] = [];
      let isConsecutive = true;

      for (let j = 0; j < requiredSlotCount; j++) {
        const currentSlot = freeSlots[i + j];
        if (!currentSlot || (j > 0 && currentSlot.position !== freeSlots[i + j - 1].position + 1)) {
          isConsecutive = false;
          break;
        }
        group.push(currentSlot.position);
      }

      if (isConsecutive && group.length === requiredSlotCount) {
        validGroups.push(group);
      }
    }

    return validGroups;
  };

  const validSlotGroups = findValidSlotGroups();

  const totalCost = selectedSlotGroup.length > 0 && activeConfig
    ? selectedSlotGroup.length * (slotType === 'peak' ? activeConfig.pricing.peakPrice || 500 : activeConfig.pricing.normalPrice || 300)
    : 0;

  const calculateCampaignDays = () => {
    if (durationType === 'preset') {
      return campaignDuration;
    } else if (startDate && endDate) {
      return Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const campaignDays = calculateCampaignDays();

  const filteredMedia = mockMediaLibrary.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(mediaSearch.toLowerCase());
    const matchesClient = selectedClient ? m.clientId === selectedClient.id : true;
    return matchesSearch && matchesClient;
  });

  const filteredClients = mockClients.filter((c) =>
    c.name.toLowerCase().includes(clientSearch.toLowerCase())
  );

  const canProceedFromStep1 = selectedClient !== null && selectedMedia !== null;
  const canProceedFromStep2 = selectedSlotGroup.length === requiredSlotCount;
  const canProceedFromStep3 = durationType === 'preset' || (startDate !== '' && endDate !== '' && new Date(endDate) > new Date(startDate));
  const canSubmit = canProceedFromStep1 && canProceedFromStep2 && canProceedFromStep3;

  const handleSubmit = () => {
    if (!canSubmit) {
      toast.error('Please complete all required steps');
      return;
    }

    const booking = {
      machineId: machine.id,
      machineName: machine.name,
      mediaId: selectedMedia!.id,
      mediaName: selectedMedia!.name,
      mediaDuration: selectedMedia!.duration,
      slotType,
      positions: selectedSlotGroup,
      clientId: selectedClient!.id,
      clientName: selectedClient!.name,
      durationType,
      campaignDuration: durationType === 'preset' ? campaignDuration : undefined,
      startDate: durationType === 'custom' ? startDate : undefined,
      endDate: durationType === 'custom' ? endDate : undefined,
      campaignDays,
      totalCost,
    };

    console.log('Booking created:', booking);
    toast.success('Booking created successfully');
    navigate(`/ad-slotting/machines/${machineId}`);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left: Machine Context */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <button
            onClick={() => {
              if (machineGroup) {
                navigate(`/ad-slotting/groups/${machineGroup.id}`);
              } else {
                navigate('/ad-slotting/inventory');
              }
            }}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Group</span>
          </button>
          <h2 className="text-gray-900 mb-2">{machineGroup?.name || machine.name}</h2>
          <p className="text-sm text-gray-600">
            {machine.location.city} • {machine.location.venue}
          </p>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-6">
          {/* Progress Steps */}
          <div>
            <div className="text-xs font-medium text-gray-700 mb-3">Booking Progress</div>
            <div className="space-y-3">
              <div className={`flex items-center gap-3 ${currentStep >= 1 ? 'text-gray-900' : 'text-gray-400'}`}>
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                    canProceedFromStep1
                      ? 'bg-green-100 text-green-700'
                      : currentStep === 1
                      ? 'bg-[#D9480F] text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {canProceedFromStep1 ? <Check className="w-3 h-3" /> : '1'}
                </div>
                <span className="text-sm font-medium">Select Media</span>
              </div>
              <div className={`flex items-center gap-3 ${currentStep >= 2 ? 'text-gray-900' : 'text-gray-400'}`}>
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                    canProceedFromStep2
                      ? 'bg-green-100 text-green-700'
                      : currentStep === 2
                      ? 'bg-[#D9480F] text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {canProceedFromStep2 ? <Check className="w-3 h-3" /> : '2'}
                </div>
                <span className="text-sm font-medium">Choose Slots</span>
              </div>
              <div className={`flex items-center gap-3 ${currentStep >= 3 ? 'text-gray-900' : 'text-gray-400'}`}>
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                    canProceedFromStep3
                      ? 'bg-green-100 text-green-700'
                      : currentStep === 3
                      ? 'bg-[#D9480F] text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {canProceedFromStep3 ? <Check className="w-3 h-3" /> : '3'}
                </div>
                <span className="text-sm font-medium">Select Duration</span>
              </div>
              <div className={`flex items-center gap-3 ${currentStep >= 4 ? 'text-gray-900' : 'text-gray-400'}`}>
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                    currentStep === 4 ? 'bg-[#D9480F] text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  4
                </div>
                <span className="text-sm font-medium">Review & Confirm</span>
              </div>
            </div>
          </div>

          {/* Group Booking Info */}
          {machineGroup && (
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex gap-2">
                <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-medium text-blue-900 mb-1">
                    Group-Based Booking
                  </div>
                  <div className="text-xs text-blue-700">
                    This ad will play on all {machineGroup.machineIds.length} devices in "{machineGroup.name}".
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Live Preview */}
          {selectedMedia && (
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="text-xs font-medium text-gray-700 mb-3">Live Preview</div>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-600 mb-1">Media</div>
                  <div className="flex items-center gap-2">
                    {selectedMedia.type === 'video' ? (
                      <Video className="w-4 h-4 text-gray-500" />
                    ) : (
                      <FileImage className="w-4 h-4 text-gray-500" />
                    )}
                    <span className="text-sm font-medium text-gray-900">{selectedMedia.name}</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">{selectedMedia.duration}s duration</div>
                </div>

                {requiredSlotCount > 0 && (
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Required Slots</div>
                    <div className="text-sm font-medium text-gray-900">
                      {requiredSlotCount} × {activeConfig?.subSlotDuration}s subslots
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {selectedMedia.duration}s ÷ {activeConfig?.subSlotDuration}s = {requiredSlotCount} slots
                    </div>
                  </div>
                )}

                {selectedSlotGroup.length > 0 && (
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Selected Positions</div>
                    <div className="text-sm font-medium text-gray-900">
                      {subSlots.find((s) => s.position === selectedSlotGroup[0])?.startTime} –{' '}
                      {subSlots.find((s) => s.position === selectedSlotGroup[selectedSlotGroup.length - 1])?.endTime}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Positions: {selectedSlotGroup.join(', ')}</div>
                  </div>
                )}

                {campaignDays > 0 && (
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Campaign Duration</div>
                    <div className="text-sm font-medium text-gray-900">
                      {durationType === 'preset' ? `${campaignDuration} days` : `${campaignDays} days`}
                    </div>
                    {durationType === 'custom' && startDate && endDate && (
                      <div className="text-xs text-gray-500 mt-1">
                        {startDate} to {endDate}
                      </div>
                    )}
                  </div>
                )}

                {totalCost > 0 && campaignDays > 0 && (
                  <div className="pt-3 border-t border-gray-300">
                    <div className="text-xs text-gray-600 mb-1">Estimated Total Cost</div>
                    <div className="text-xl font-semibold text-[#D9480F]">${(totalCost * campaignDays).toLocaleString()}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      ${totalCost} × {campaignDays} days
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: Booking Steps */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <h1 className="text-gray-900 mb-1">
            {currentStep === 1 && 'Step 1: Select Media'}
            {currentStep === 2 && 'Step 2: Choose Slot Positions'}
            {currentStep === 3 && 'Step 3: Select Campaign Duration'}
            {currentStep === 4 && 'Step 4: Review & Confirm Booking'}
          </h1>
          <p className="text-sm text-gray-600">
            {currentStep === 1 && 'Choose the client and creative you want to display'}
            {currentStep === 2 && 'Click any valid free slot to auto-select the sequence'}
            {currentStep === 3 && 'Set how long your campaign will run'}
            {currentStep === 4 && 'Review all details before confirming'}
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-5xl mx-auto pb-24">
            {/* Step 1: Media Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* Client Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Client <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => setShowClientDropdown(!showClientDropdown)}
                      className="w-full flex items-center justify-between px-4 h-12 border border-gray-300 rounded-lg text-sm hover:border-gray-400 transition-colors text-left"
                    >
                      <span className={selectedClient ? 'text-gray-900' : 'text-gray-500'}>
                        {selectedClient ? selectedClient.name : 'Choose a client...'}
                      </span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>

                    {showClientDropdown && (
                      <div className="absolute z-10 top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                        <div className="p-2 border-b border-gray-200">
                          <input
                            type="text"
                            value={clientSearch}
                            onChange={(e) => setClientSearch(e.target.value)}
                            placeholder="Search clients..."
                            className="w-full px-3 h-8 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                            autoFocus
                          />
                        </div>
                        <div className="p-1">
                          <button
                            onClick={() => {
                              toast.info('Create new client functionality');
                              setShowClientDropdown(false);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm text-[#D9480F] hover:bg-gray-50 rounded"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Create New Client</span>
                          </button>
                          {filteredClients.map((client) => (
                            <button
                              key={client.id}
                              onClick={() => {
                                setSelectedClient(client);
                                setSelectedMedia(null);
                                setShowClientDropdown(false);
                                setClientSearch('');
                              }}
                              className="w-full px-3 py-2 text-left text-sm text-gray-900 hover:bg-gray-50 rounded"
                            >
                              {client.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {selectedClient && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-green-900 mb-1">Client Selected</div>
                      <div className="text-sm text-green-800">
                        Showing media for <strong>{selectedClient.name}</strong>.
                      </div>
                    </div>
                  </div>
                )}

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={mediaSearch}
                    onChange={(e) => setMediaSearch(e.target.value)}
                    placeholder={selectedClient ? `Search ${selectedClient.name} media...` : "Search media library..."}
                    disabled={!selectedClient}
                    className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#D9480F] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                {!selectedClient && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900">
                      Please select a client first. Media library will be filtered to show only assets belonging to the selected client.
                    </div>
                  </div>
                )}

                {/* Upload Option */}
                {selectedClient && (
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors">
                    <Upload className="w-5 h-5" />
                    <span className="text-sm font-medium">Upload New Media for {selectedClient.name}</span>
                  </button>
                )}

                {/* Media Grid */}
                {selectedClient && filteredMedia.length > 0 ? (
                  <div className="grid grid-cols-3 gap-4">
                    {filteredMedia.map((media) => (
                      <button
                        key={media.id}
                        onClick={() => setSelectedMedia(media)}
                        className={`relative p-4 rounded-lg border-2 transition-all text-left ${
                          selectedMedia?.id === media.id
                            ? 'border-[#D9480F] bg-[#FEF2F2]'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        {selectedMedia?.id === media.id && (
                          <div className="absolute top-3 right-3 w-6 h-6 bg-[#D9480F] rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}

                        <div className="aspect-video bg-gray-100 rounded mb-3 flex items-center justify-center">
                          {media.type === 'video' ? (
                            <Video className="w-8 h-8 text-gray-400" />
                          ) : (
                            <FileImage className="w-8 h-8 text-gray-400" />
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="text-sm font-medium text-gray-900 truncate">{media.name}</div>
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                              {media.type.charAt(0).toUpperCase() + media.type.slice(1)}
                            </span>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">
                              {media.duration}s
                            </span>
                          </div>
                          <div className="text-xs text-gray-600">{media.resolution} • {media.format}</div>
                          {media.validated && (
                            <div className="flex items-center gap-1 text-xs text-green-600">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Validated</span>
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : selectedClient && filteredMedia.length === 0 ? (
                  <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                    <FileImage className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <div className="text-sm font-medium text-gray-900 mb-1">No media found</div>
                    <div className="text-sm text-gray-600">
                      {mediaSearch 
                        ? `No media matching "${mediaSearch}" for ${selectedClient.name}`
                        : `No media uploaded for ${selectedClient.name} yet`}
                    </div>
                  </div>
                ) : null}
              </div>
            )}

            {/* Step 2: Slot Selection */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {!selectedMedia ? (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-yellow-900">
                      Please select media first to enable slot selection.
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Slot Type Toggle */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Slot Type</label>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setSlotType('peak');
                            setSelectedSlotGroup([]);
                            setSelectionError(null);
                          }}
                          className={`flex-1 px-4 py-3 rounded-lg border-2 transition-colors text-left ${
                            slotType === 'peak'
                              ? 'border-[#D9480F] bg-[#FEF2F2]'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="font-medium text-gray-900">Peak Slots</div>
                          <div className="text-sm text-gray-600 mt-1">
                            ${mockSlotConfigurations.find((c) => c.machineId === machineId && c.applicability === 'peak')?.pricing.peakPrice || 500} per position
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSlotType('normal');
                            setSelectedSlotGroup([]);
                            setSelectionError(null);
                          }}
                          className={`flex-1 px-4 py-3 rounded-lg border-2 transition-colors text-left ${
                            slotType === 'normal'
                              ? 'border-[#D9480F] bg-[#FEF2F2]'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="font-medium text-gray-900">Normal Slots</div>
                          <div className="text-sm text-gray-600 mt-1">
                            ${mockSlotConfigurations.find((c) => c.machineId === machineId && c.applicability === 'normal')?.pricing.normalPrice || 300} per position
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Duration Calculation */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="w-full">
                          <div className="text-sm font-medium text-blue-900 mb-1">Slot Requirement</div>
                          <div className="text-sm text-blue-800 mb-2">
                            Your {selectedMedia.duration}s media requires{' '}
                            <strong>{requiredSlotCount} consecutive {activeConfig?.subSlotDuration}s subslots</strong>.
                            Click any valid starting slot to auto-select the sequence.
                          </div>
                          <div className="text-xs text-blue-700">
                            Calculation: {selectedMedia.duration}s ÷ {activeConfig?.subSlotDuration}s = {requiredSlotCount} subslots
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Selection Summary */}
                    {selectedSlotGroup.length > 0 && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="text-sm font-medium text-green-900 mb-1">Slots Selected</div>
                              <div className="text-sm text-green-800">
                                {selectedMedia.duration}s media • {requiredSlotCount} consecutive slots • Positions {selectedSlotGroup.join(', ')}
                              </div>
                              <div className="text-xs text-green-700 mt-1">
                                {subSlots.find((s) => s.position === selectedSlotGroup[0])?.startTime} –{' '}
                                {subSlots.find((s) => s.position === selectedSlotGroup[selectedSlotGroup.length - 1])?.endTime}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-base font-semibold text-green-900">
                              ${totalCost.toLocaleString()}/day
                            </div>
                            <div className="text-xs text-green-700">
                              {requiredSlotCount} × ${activeConfig?.pricing.peakPrice || activeConfig?.pricing.normalPrice}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Error Message */}
                    {selectionError && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-red-900 mb-1">Invalid Selection</div>
                          <div className="text-sm text-red-800">{selectionError}</div>
                        </div>
                      </div>
                    )}

                    {/* Interactive Slot Grid */}
                    {validSlotGroups.length > 0 ? (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Click a Free Slot to Begin
                        </label>
                        <div className="text-xs text-gray-600 mb-3">
                          Valid starting slots are highlighted in green. Hover to preview your selection.
                        </div>

                        <div className="grid grid-cols-6 gap-3">
                          {subSlots.map((slot) => {
                            const isSelected = selectedSlotGroup.includes(slot.position);
                            const isHoveredPreview = hoveredSlot !== null && getPreviewSelection(hoveredSlot).includes(slot.position);
                            const canStart = canStartSelection(slot.position);
                            const isBooked = slot.status === 'booked';
                            const isFiller = slot.status === 'filler';
                            const isFree = slot.status === 'free';
                            const isClickable = isFree;

                            return (
                              <button
                                key={slot.position}
                                onClick={() => isClickable && handleSlotClick(slot.position)}
                                onMouseEnter={() => isFree && setHoveredSlot(slot.position)}
                                onMouseLeave={() => setHoveredSlot(null)}
                                disabled={!isClickable}
                                className={`relative p-3 rounded-lg text-left transition-all ${
                                  isSelected
                                    ? 'border-2 border-[#D9480F] bg-[#D9480F] text-white shadow-lg'
                                    : isHoveredPreview
                                    ? 'border-2 border-[#D9480F] border-dashed bg-[#FEF2F2] text-[#D9480F]'
                                    : canStart
                                    ? 'border-2 border-green-300 bg-green-50 text-green-900 hover:border-green-400 cursor-pointer'
                                    : isBooked
                                    ? 'border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed'
                                    : isFiller
                                    ? 'border border-yellow-300 bg-yellow-50 text-yellow-700 cursor-not-allowed'
                                    : 'border border-gray-200 bg-white text-gray-400 cursor-not-allowed'
                                }`}
                                title={
                                  isBooked
                                    ? `Booked by ${slot.booking?.clientName}`
                                    : isFiller
                                    ? 'Filler slot'
                                    : canStart
                                    ? 'Click to select this starting position'
                                    : isFree
                                    ? 'Cannot start a valid sequence from here'
                                    : ''
                                }
                              >
                                <div className={`text-xs font-medium mb-1 ${isSelected ? 'text-white' : ''}`}>
                                  #{slot.position}
                                </div>

                                <div className={`text-xs opacity-90 mb-1 ${isSelected ? 'text-white' : ''}`}>
                                  {slot.startTime}
                                </div>

                                {isBooked && (
                                  <div className="text-xs font-medium truncate mt-1">
                                    {slot.booking?.clientName}
                                  </div>
                                )}
                                {isFiller && (
                                  <div className="text-xs font-medium mt-1">
                                    Filler
                                  </div>
                                )}
                                {canStart && !isSelected && !isHoveredPreview && (
                                  <div className="text-xs font-medium text-green-700 mt-1">
                                    ✓ Valid
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Legend */}
                        <div className="mt-4 flex items-center gap-6 text-xs">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded border-2 border-[#D9480F] bg-[#D9480F]" />
                            <span className="text-gray-600">Selected</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded border-2 border-green-300 bg-green-50" />
                            <span className="text-gray-600">Valid Start</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded border border-gray-200 bg-white" />
                            <span className="text-gray-600">Free (Invalid)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded border border-gray-300 bg-gray-100" />
                            <span className="text-gray-600">Booked</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded border border-yellow-300 bg-yellow-50" />
                            <span className="text-gray-600">Filler</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-red-900 mb-1">No Available Consecutive Slots</div>
                          <div className="text-sm text-red-800">
                            There are no {requiredSlotCount} consecutive free slots available for your {selectedMedia.duration}s media.
                            Only fragmented slots remain.
                          </div>
                          <div className="text-xs text-red-700 mt-2">
                            Consider: Using shorter media, selecting Normal slots instead, or waiting for slots to become available.
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Context Preview */}
                    {selectedSlotGroup.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Ad Sequence Context</label>
                        <div className="grid grid-cols-3 gap-3">
                          {(() => {
                            const beforeSlot = subSlots.find((s) => s.position === selectedSlotGroup[0] - 1);
                            const afterSlot = subSlots.find((s) => s.position === selectedSlotGroup[selectedSlotGroup.length - 1] + 1);
                            
                            return (
                              <>
                                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                  <div className="text-xs text-gray-600 mb-2">Before Your Ad</div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {beforeSlot?.status === 'booked'
                                      ? beforeSlot.booking?.clientName
                                      : beforeSlot?.status === 'filler'
                                      ? 'Filler Ad'
                                      : beforeSlot?.status === 'free'
                                      ? 'Free Slot'
                                      : 'Loop Start'}
                                  </div>
                                  {beforeSlot && (
                                    <div className="text-xs text-gray-500 mt-1">
                                      Slot #{beforeSlot.position}
                                    </div>
                                  )}
                                </div>

                                <div className="bg-[#D9480F] bg-opacity-10 rounded-lg p-3 border-2 border-[#D9480F]">
                                  <div className="text-xs text-[#D9480F] mb-2">Your Ad</div>
                                  <div className="text-sm font-medium text-[rgb(255,255,255)] truncate">{selectedMedia.name}</div>
                                  <div className="text-xs text-[rgb(219,232,255)] mt-1">
                                    {selectedMedia.duration}s • Positions {selectedSlotGroup.join(', ')}
                                  </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                  <div className="text-xs text-gray-600 mb-2">After Your Ad</div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {afterSlot?.status === 'booked'
                                      ? afterSlot.booking?.clientName
                                      : afterSlot?.status === 'filler'
                                      ? 'Filler Ad'
                                      : afterSlot?.status === 'free'
                                      ? 'Free Slot'
                                      : 'Loop End'}
                                  </div>
                                  {afterSlot && (
                                    <div className="text-xs text-gray-500 mt-1">
                                      Slot #{afterSlot.position}
                                    </div>
                                  )}
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Step 3: Duration Selection */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    Select how long you want your campaign to run on this machine.
                  </div>
                </div>

                {/* Duration Type Toggle */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Campaign Duration <span className="text-red-500">*</span>
                  </label>
                  
                  <div className="flex gap-3 mb-4">
                    <button
                      onClick={() => setDurationType('preset')}
                      className={`flex-1 h-12 rounded-lg border-2 transition-all font-medium flex items-center justify-center gap-2 ${
                        durationType === 'preset'
                          ? 'border-[#D9480F] bg-orange-50 text-[#D9480F]'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      Quick Select
                    </button>
                    <button
                      onClick={() => setDurationType('custom')}
                      className={`flex-1 h-12 rounded-lg border-2 transition-all font-medium flex items-center justify-center gap-2 ${
                        durationType === 'custom'
                          ? 'border-[#D9480F] bg-orange-50 text-[#D9480F]'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <Calendar className="w-4 h-4" />
                      Custom Dates
                    </button>
                  </div>

                  {/* Preset Duration Options */}
                  {durationType === 'preset' && (
                    <div className="grid grid-cols-3 gap-4">
                      {CAMPAIGN_DURATION_PRESETS.map((duration) => (
                        <button
                          key={duration.value}
                          onClick={() => setCampaignDuration(duration.value)}
                          className={`h-20 rounded-lg border-2 transition-all font-medium flex flex-col items-center justify-center ${
                            campaignDuration === duration.value
                              ? 'border-[#D9480F] bg-orange-50 text-[#D9480F]'
                              : 'border-gray-300 text-gray-700 hover:border-gray-400'
                          }`}
                        >
                          <div className="text-2xl font-semibold mb-1">
                            {duration.value === 365 ? '1' : duration.value}
                          </div>
                          <div className="text-sm">
                            {duration.value === 365 ? 'year' : 'days'}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Custom Date Range */}
                  {durationType === 'custom' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
                          Start Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
                          End Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          min={startDate || new Date().toISOString().split('T')[0]}
                          className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                        />
                      </div>
                      {startDate && endDate && new Date(endDate) > new Date(startDate) && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="text-sm font-medium text-green-900 mb-1">Campaign Duration Calculated</div>
                              <div className="text-sm text-green-800">
                                Your campaign will run for <span className="font-semibold">
                                  {Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                                </span>
                              </div>
                              <div className="text-xs text-green-700 mt-1">
                                From {new Date(startDate).toLocaleDateString()} to {new Date(endDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Cost Preview */}
                {totalCost > 0 && campaignDays > 0 && (
                  <div className="bg-white border-2 border-[#D9480F] rounded-lg p-6">
                    <div className="text-sm font-medium text-gray-700 mb-4">Campaign Cost Estimate</div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Daily Rate</span>
                        <span className="font-medium text-gray-900">${totalCost.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Campaign Duration</span>
                        <span className="font-medium text-gray-900">× {campaignDays} days</span>
                      </div>
                      <div className="pt-3 border-t border-gray-300 flex items-center justify-between">
                        <span className="text-base font-medium text-gray-900">Total Campaign Cost</span>
                        <span className="text-2xl font-semibold text-[#D9480F]">
                          ${(totalCost * campaignDays).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">
                        {requiredSlotCount} slots × ${activeConfig?.pricing.peakPrice || activeConfig?.pricing.normalPrice} × {campaignDays} days
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Review & Confirm */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h3 className="text-gray-900">Booking Summary</h3>
                  </div>

                  <div className="p-6 space-y-6">
                    <div>
                      <div className="text-xs font-medium text-gray-700 mb-2">Media</div>
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-12 bg-gray-100 rounded flex items-center justify-center">
                          {selectedMedia?.type === 'video' ? (
                            <Video className="w-5 h-5 text-gray-400" />
                          ) : (
                            <FileImage className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{selectedMedia?.name}</div>
                          <div className="text-xs text-gray-600">
                            {selectedMedia?.type.charAt(0).toUpperCase()}{selectedMedia?.type.slice(1)} • {selectedMedia?.duration}s • {selectedMedia?.resolution}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-medium text-gray-700 mb-2">Slot Allocation</div>
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Slot Type</span>
                            <span className="font-medium text-gray-900 capitalize">{slotType}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Positions</span>
                            <span className="font-medium text-gray-900">{selectedSlotGroup.join(', ')}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Time Range</span>
                            <span className="font-medium text-gray-900">
                              {subSlots.find((s) => s.position === selectedSlotGroup[0])?.startTime} –{' '}
                              {subSlots.find((s) => s.position === selectedSlotGroup[selectedSlotGroup.length - 1])?.endTime}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Subslots Required</span>
                            <span className="font-medium text-gray-900">
                              {requiredSlotCount} × {activeConfig?.subSlotDuration}s
                            </span>
                          </div>
                          <div className="pt-2 border-t border-gray-300 text-xs text-gray-600">
                            Logic: {selectedMedia?.duration}s media ÷ {activeConfig?.subSlotDuration}s subslots = {requiredSlotCount} positions
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-medium text-gray-700 mb-2">Campaign Duration</div>
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Duration Type</span>
                            <span className="font-medium text-gray-900 capitalize">{durationType === 'preset' ? 'Quick Select' : 'Custom Dates'}</span>
                          </div>
                          {durationType === 'preset' ? (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Campaign Length</span>
                              <span className="font-medium text-gray-900">{campaignDuration} days</span>
                            </div>
                          ) : (
                            <>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Start Date</span>
                                <span className="font-medium text-gray-900">{startDate}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">End Date</span>
                                <span className="font-medium text-gray-900">{endDate}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Total Days</span>
                                <span className="font-medium text-gray-900">{campaignDays} days</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-medium text-gray-700 mb-2">Client & Target Group</div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Client</span>
                          <span className="font-medium text-gray-900">{selectedClient?.name}</span>
                        </div>
                        {machineGroup && (
                          <>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Machine Group</span>
                              <span className="font-medium text-gray-900">{machineGroup.name}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Devices in Group</span>
                              <span className="font-medium text-gray-900">{machineGroup.machineIds.length} devices</span>
                            </div>
                          </>
                        )}
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Location</span>
                          <span className="font-medium text-gray-900">{machine.location.city} • {machine.location.venue}</span>
                        </div>
                      </div>
                      {machineGroup && (
                        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex gap-2">
                            <Info className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div className="text-xs text-blue-700">
                              This ad will play on all {machineGroup.machineIds.length} devices in this group at the same time.
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="text-xs font-medium text-gray-700 mb-2">Cost Breakdown</div>
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Price per Subslot</span>
                            <span className="font-medium text-gray-900">
                              ${activeConfig?.pricing.peakPrice || activeConfig?.pricing.normalPrice}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Number of Subslots</span>
                            <span className="font-medium text-gray-900">× {requiredSlotCount}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Daily Cost</span>
                            <span className="font-medium text-gray-900">${totalCost.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Campaign Duration</span>
                            <span className="font-medium text-gray-900">× {campaignDays} days</span>
                          </div>
                          <div className="pt-3 mt-3 border-t border-gray-300 flex items-center justify-between">
                            <span className="text-base font-medium text-gray-900">Total Campaign Cost</span>
                            <span className="text-2xl font-semibold text-[#D9480F]">
                              ${(totalCost * campaignDays).toLocaleString()}
                            </span>
                          </div>
                          <div className="text-xs text-gray-600 text-right">
                            ${activeConfig?.pricing.peakPrice || activeConfig?.pricing.normalPrice} × {requiredSlotCount} slots × {campaignDays} days
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    By confirming this booking, your {selectedMedia?.duration}s ad will play on{' '}
                    <strong>{machine.name}</strong> in positions <strong>{selectedSlotGroup.join(', ')}</strong> during{' '}
                    <strong>{slotType}</strong> hours for <strong>{campaignDays} days</strong>.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Navigation - Sticky */}
        <div className="sticky bottom-0 z-20 bg-white border-t border-gray-200 px-8 py-4 flex items-center justify-between shadow-lg">
          <button
            onClick={() => {
              if (currentStep > 1) setCurrentStep(currentStep - 1);
            }}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-4 h-10 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-3">
            {currentStep < 4 ? (
              <button
                onClick={() => {
                  if (currentStep === 1 && !canProceedFromStep1) {
                    toast.error('Please select a client and media to continue');
                    return;
                  }
                  if (currentStep === 2 && !canProceedFromStep2) {
                    toast.error('Please select slot positions to continue');
                    return;
                  }
                  if (currentStep === 3 && !canProceedFromStep3) {
                    if (durationType === 'custom' && (!startDate || !endDate)) {
                      toast.error('Please select start and end dates');
                      return;
                    }
                    if (durationType === 'custom' && new Date(endDate) <= new Date(startDate)) {
                      toast.error('End date must be after start date');
                      return;
                    }
                    toast.error('Please complete the duration selection');
                    return;
                  }
                  setCurrentStep(currentStep + 1);
                }}
                className="flex items-center gap-2 px-6 h-10 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors font-medium shadow-md"
              >
                <span>Next Step</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-6 h-10 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors font-medium shadow-md"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm Booking</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
