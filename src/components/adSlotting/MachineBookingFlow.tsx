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
  Clock,
  Image as ImageIcon,
} from 'lucide-react';
import { SlotApplicability } from '../../types/adSlotting';
import { mockMachines, mockSlotConfigurations, mockMachineGroups } from '../../data/mockAdSlotting';
import { toast } from 'sonner@2.0.3';
import { SlotGrid } from './Step2SlotSelection';

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
  { value: 1, label: '1 day' },
  { value: 7, label: '7 days' },
  { value: 14, label: '14 days' },
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

  // Step 2: Slot Selection - Support both Peak and Normal
  const [selectedPeakSlots, setSelectedPeakSlots] = useState<number[]>([]);
  const [selectedNormalSlots, setSelectedNormalSlots] = useState<number[]>([]);
  const [hoveredPeakSlot, setHoveredPeakSlot] = useState<number | null>(null);
  const [hoveredNormalSlot, setHoveredNormalSlot] = useState<number | null>(null);
  const [peakSelectionError, setPeakSelectionError] = useState<string | null>(null);
  const [normalSelectionError, setNormalSelectionError] = useState<string | null>(null);

  // Step 3: Duration Selection
  const [durationType, setDurationType] = useState<'preset' | 'custom'>('preset');
  const [campaignDuration, setCampaignDuration] = useState(30);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [presetStartDate, setPresetStartDate] = useState(''); // Start date for preset mode

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

  const peakConfig = mockSlotConfigurations.find(
    (c) => c.machineId === machine.id && c.applicability === 'peak'
  );

  const normalConfig = mockSlotConfigurations.find(
    (c) => c.machineId === machine.id && c.applicability === 'normal'
  );

  const generateSubSlots = (config: typeof peakConfig, slotType: SlotApplicability): SubSlot[] => {
    if (!config) return [];

    const subSlots: SubSlot[] = [];
    const totalSlots = config.totalPositions;
    const price = slotType === 'peak' ? config.pricing.peakPrice || 500 : config.pricing.normalPrice || 300;

    const bookedPositions = new Set([1, 2, 7, 8, 9]);

    for (let i = 0; i < totalSlots; i++) {
      const position = i + 1;
      const startSeconds = i * config.subSlotDuration;
      const endSeconds = (i + 1) * config.subSlotDuration;
      const startTime = formatTime(startSeconds);
      const endTime = formatTime(endSeconds);

      const isBooked = bookedPositions.has(position);

      subSlots.push({
        position,
        startTime,
        endTime,
        duration: config.subSlotDuration,
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

  const peakSubSlots = generateSubSlots(peakConfig, 'peak');
  const normalSubSlots = generateSubSlots(normalConfig, 'normal');

  const requiredSlotCount = selectedMedia && peakConfig
    ? Math.ceil(selectedMedia.duration / peakConfig.subSlotDuration)
    : 0;

  const canStartSelection = (position: number, subSlots: SubSlot[]): boolean => {
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

  const getPreviewSelection = (startPosition: number, subSlots: SubSlot[]): number[] => {
    if (!canStartSelection(startPosition, subSlots)) return [];
    
    const preview: number[] = [];
    for (let i = 0; i < requiredSlotCount; i++) {
      preview.push(startPosition + i);
    }
    return preview;
  };

  const handlePeakSlotClick = (position: number) => {
    setPeakSelectionError(null);
    
    if (!canStartSelection(position, peakSubSlots)) {
      const slot = peakSubSlots.find((s) => s.position === position);
      if (!slot || slot.status !== 'free') {
        setPeakSelectionError(`Slot #${position} is ${slot?.status === 'booked' ? `booked by ${slot.booking?.clientName}` : 'not available'}.`);
        return;
      }

      for (let i = 0; i < requiredSlotCount; i++) {
        const checkPosition = position + i;
        const checkSlot = peakSubSlots.find((s) => s.position === checkPosition);
        if (!checkSlot || checkSlot.status !== 'free') {
          const blockingClient = checkSlot?.booking?.clientName;
          setPeakSelectionError(
            checkSlot?.status === 'booked'
              ? `Slot #${checkPosition} is booked by ${blockingClient}. This breaks the ${selectedMedia?.duration}s sequence.`
              : `Slots #${checkPosition} and beyond are unavailable. Select another nearby free slot.`
          );
          return;
        }
      }
    }

    const newSelection = getPreviewSelection(position, peakSubSlots);
    setSelectedPeakSlots(newSelection);
    setPeakSelectionError(null);
  };

  const handleNormalSlotClick = (position: number) => {
    setNormalSelectionError(null);
    
    if (!canStartSelection(position, normalSubSlots)) {
      const slot = normalSubSlots.find((s) => s.position === position);
      if (!slot || slot.status !== 'free') {
        setNormalSelectionError(`Slot #${position} is ${slot?.status === 'booked' ? `booked by ${slot.booking?.clientName}` : 'not available'}.`);
        return;
      }

      for (let i = 0; i < requiredSlotCount; i++) {
        const checkPosition = position + i;
        const checkSlot = normalSubSlots.find((s) => s.position === checkPosition);
        if (!checkSlot || checkSlot.status !== 'free') {
          const blockingClient = checkSlot?.booking?.clientName;
          setNormalSelectionError(
            checkSlot?.status === 'booked'
              ? `Slot #${checkPosition} is booked by ${blockingClient}. This breaks the ${selectedMedia?.duration}s sequence.`
              : `Slots #${checkPosition} and beyond are unavailable. Select another nearby free slot.`
          );
          return;
        }
      }
    }

    const newSelection = getPreviewSelection(position, normalSubSlots);
    setSelectedNormalSlots(newSelection);
    setNormalSelectionError(null);
  };

  const findValidSlotGroups = (subSlots: SubSlot[]): number[][] => {
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

  const validPeakSlotGroups = findValidSlotGroups(peakSubSlots);
  const validNormalSlotGroups = findValidSlotGroups(normalSubSlots);

  const peakCost = selectedPeakSlots.length > 0 && peakConfig
    ? selectedPeakSlots.length * (peakConfig.pricing.peakPrice || 500)
    : 0;
  
  const normalCost = selectedNormalSlots.length > 0 && normalConfig
    ? selectedNormalSlots.length * (normalConfig.pricing.normalPrice || 300)
    : 0;

  const totalCost = peakCost + normalCost;

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
  const canProceedFromStep2 = selectedPeakSlots.length > 0 || selectedNormalSlots.length > 0;
  const canProceedFromStep3 = durationType === 'preset' 
    ? presetStartDate !== '' 
    : (startDate !== '' && endDate !== '' && new Date(endDate) > new Date(startDate));
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
      peakSlots: selectedPeakSlots,
      normalSlots: selectedNormalSlots,
      clientId: selectedClient!.id,
      clientName: selectedClient!.name,
      durationType,
      campaignDuration: durationType === 'preset' ? campaignDuration : undefined,
      startDate: durationType === 'preset' ? presetStartDate : startDate,
      endDate: durationType === 'preset' 
        ? new Date(new Date(presetStartDate).getTime() + campaignDuration * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        : endDate,
      campaignDays,
      totalCost,
      peakCost,
      normalCost,
    };

    console.log('Booking created:', booking);
    toast.success('Booking created successfully');
    navigate(`/ad-slotting/groups/${machineGroup?.id}`);
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
                      {requiredSlotCount} × {peakConfig?.subSlotDuration}s subslots
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {selectedMedia.duration}s ÷ {peakConfig?.subSlotDuration}s = {requiredSlotCount} slots
                    </div>
                  </div>
                )}

                {selectedPeakSlots.length > 0 && (
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Peak Slots Selected</div>
                    <div className="text-sm font-medium text-gray-900">
                      #{selectedPeakSlots[0]} - #{selectedPeakSlots[selectedPeakSlots.length - 1]}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {selectedPeakSlots.length} slots × ${peakConfig?.pricing.peakPrice} = ${peakCost}/day
                    </div>
                  </div>
                )}

                {selectedNormalSlots.length > 0 && (
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Normal Slots Selected</div>
                    <div className="text-sm font-medium text-gray-900">
                      #{selectedNormalSlots[0]} - #{selectedNormalSlots[selectedNormalSlots.length - 1]}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {selectedNormalSlots.length} slots × ${normalConfig?.pricing.normalPrice} = ${normalCost}/day
                    </div>
                  </div>
                )}

                {((durationType === 'preset' && presetStartDate) || (durationType === 'custom' && campaignDays > 0)) && (
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Campaign Duration</div>
                    <div className="text-sm font-medium text-gray-900">
                      {durationType === 'preset' ? `${campaignDuration} days` : `${campaignDays} days`}
                    </div>
                    {durationType === 'preset' && presetStartDate && (
                      <div className="text-xs text-gray-500 mt-1">
                        {presetStartDate} to {new Date(new Date(presetStartDate).getTime() + campaignDuration * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                      </div>
                    )}
                    {durationType === 'custom' && startDate && endDate && (
                      <div className="text-xs text-gray-500 mt-1">
                        {startDate} to {endDate}
                      </div>
                    )}
                  </div>
                )}

                {totalCost > 0 && ((durationType === 'preset' && presetStartDate) || (durationType === 'custom' && campaignDays > 0)) && (
                  <div className="pt-3 border-t border-gray-300">
                    <div className="text-xs text-gray-600 mb-1">Estimated Total Cost</div>
                    <div className="text-xl font-semibold text-[#D9480F]">${(totalCost * (durationType === 'preset' ? campaignDuration : campaignDays)).toLocaleString()}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      ${totalCost} × {durationType === 'preset' ? campaignDuration : campaignDays} days
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
            {/* Step 1: Media Selection - REDESIGNED */}
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* Client Selection Card */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-gray-900 font-medium mb-1">Select Client</h3>
                      <p className="text-sm text-gray-600">Choose which client this campaign is for</p>
                    </div>
                    {selectedClient && (
                      <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-900">Client Selected</span>
                      </div>
                    )}
                  </div>

                  <div className="relative max-w-2xl">
                    <button
                      onClick={() => setShowClientDropdown(!showClientDropdown)}
                      className="w-full flex items-center justify-between px-5 h-14 border-2 border-gray-300 rounded-lg text-base hover:border-[#D9480F] transition-colors text-left bg-white shadow-sm"
                    >
                      <span className={selectedClient ? 'text-gray-900 font-medium' : 'text-gray-500'}>
                        {selectedClient ? selectedClient.name : 'Select a client...'}
                      </span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showClientDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    {showClientDropdown && (
                      <div className="absolute z-10 top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-xl max-h-80 overflow-hidden">
                        <div className="p-3 border-b border-gray-200 bg-gray-50">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              value={clientSearch}
                              onChange={(e) => setClientSearch(e.target.value)}
                              placeholder="Search clients..."
                              className="w-full h-10 pl-9 pr-4 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                              autoFocus
                            />
                          </div>
                        </div>
                        <div className="p-2 max-h-64 overflow-auto">
                          <button
                            onClick={() => {
                              toast.info('Create new client functionality');
                              setShowClientDropdown(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium text-[#D9480F] hover:bg-orange-50 rounded-lg transition-colors mb-2"
                          >
                            <Plus className="w-5 h-5" />
                            <span>Create New Client</span>
                          </button>
                          <div className="border-t border-gray-200 pt-2 mt-2">
                            {filteredClients.map((client) => (
                              <button
                                key={client.id}
                                onClick={() => {
                                  setSelectedClient(client);
                                  setSelectedMedia(null);
                                  setShowClientDropdown(false);
                                  setClientSearch('');
                                }}
                                className="w-full px-4 py-3 text-left text-sm text-gray-900 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-between group"
                              >
                                <span className="font-medium">{client.name}</span>
                                <span className="text-xs text-gray-500">{client.industry}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Media Selection Section */}
                {!selectedClient ? (
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-8 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Info className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-gray-900 font-medium mb-2">Select a Client First</h3>
                    <p className="text-sm text-gray-600 max-w-md mx-auto">
                      Please choose a client from the dropdown above. The media library will be automatically filtered to show only assets belonging to that client.
                    </p>
                  </div>
                ) : (
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    {/* Media Header */}
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-gray-900 font-medium mb-1">Select Media</h3>
                          <p className="text-sm text-gray-600">
                            Showing {filteredMedia.length} asset{filteredMedia.length !== 1 ? 's' : ''} for <span className="font-medium text-gray-900">{selectedClient.name}</span>
                          </p>
                        </div>
                        <button 
                          onClick={() => toast.info('Upload media functionality')}
                          className="flex items-center gap-2 px-5 h-10 bg-[#D9480F] text-white rounded-lg hover:bg-[#C13F0D] transition-colors shadow-sm"
                        >
                          <Upload className="w-4 h-4" />
                          <span className="text-sm font-medium">Upload Media</span>
                        </button>
                      </div>
                    </div>

                    {/* Search Bar */}
                    <div className="p-6 border-b border-gray-200 bg-white">
                      <div className="relative max-w-2xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={mediaSearch}
                          onChange={(e) => setMediaSearch(e.target.value)}
                          placeholder={`Search in ${selectedClient.name}'s media library...`}
                          className="w-full h-12 pl-12 pr-4 border-2 border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#D9480F] focus:border-[#D9480F] shadow-sm"
                        />
                      </div>
                    </div>

                    {/* Media Grid */}
                    <div className="p-6">
                      {filteredMedia.length > 0 ? (
                        <div className="grid grid-cols-4 gap-4">
                          {filteredMedia.map((media) => (
                            <button
                              key={media.id}
                              onClick={() => setSelectedMedia(media)}
                              className={`group relative rounded-lg border-2 transition-all text-left overflow-hidden ${
                                selectedMedia?.id === media.id
                                  ? 'border-[#D9480F] bg-orange-50 shadow-lg scale-105'
                                  : 'border-gray-200 hover:border-[#D9480F] hover:shadow-md bg-white'
                              }`}
                            >
                              {/* Thumbnail */}
                              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                                {media.type === 'video' ? (
                                  <Video className="w-12 h-12 text-gray-400 group-hover:scale-110 transition-transform" />
                                ) : (
                                  <FileImage className="w-12 h-12 text-gray-400 group-hover:scale-110 transition-transform" />
                                )}
                                
                                {/* Selection Badge */}
                                {selectedMedia?.id === media.id && (
                                  <div className="absolute top-3 right-3 w-7 h-7 bg-[#D9480F] rounded-full flex items-center justify-center shadow-lg">
                                    <Check className="w-4 h-4 text-white" />
                                  </div>
                                )}
                              </div>

                              {/* Info */}
                              <div className="p-4 space-y-2">
                                <div className="text-sm font-medium text-gray-900 truncate" title={media.name}>
                                  {media.name}
                                </div>
                                
                                {/* Tags */}
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                                    {media.type === 'video' ? (
                                      <Video className="w-3 h-3" />
                                    ) : (
                                      <ImageIcon className="w-3 h-3" />
                                    )}
                                    {media.type.charAt(0).toUpperCase() + media.type.slice(1)}
                                  </span>
                                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-700">
                                    <Clock className="w-3 h-3" />
                                    {media.duration}s
                                  </span>
                                </div>

                                {/* Details */}
                                <div className="text-xs text-gray-500 pt-1 border-t border-gray-200">
                                  {media.resolution} • {media.format}
                                </div>

                                {/* Validated Badge */}
                                {media.validated && (
                                  <div className="flex items-center gap-1.5 text-xs text-green-600 pt-1">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span className="font-medium">Validated</span>
                                  </div>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileImage className="w-8 h-8 text-gray-400" />
                          </div>
                          <h4 className="text-gray-900 font-medium mb-2">No Media Found</h4>
                          <p className="text-sm text-gray-600 mb-4">
                            {mediaSearch 
                              ? `No media matching "${mediaSearch}" for ${selectedClient.name}`
                              : `No media has been uploaded for ${selectedClient.name} yet`}
                          </p>
                          <button 
                            onClick={() => toast.info('Upload media functionality')}
                            className="inline-flex items-center gap-2 px-5 h-10 bg-[#D9480F] text-white rounded-lg hover:bg-[#C13F0D] transition-colors"
                          >
                            <Upload className="w-4 h-4" />
                            <span className="text-sm font-medium">Upload First Media</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
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
                    {/* Duration Calculation Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="w-full">
                          <div className="text-sm font-medium text-blue-900 mb-1">Slot Requirement</div>
                          <div className="text-sm text-blue-800 mb-2">
                            Your {selectedMedia.duration}s media requires{' '}
                            <strong>{requiredSlotCount} consecutive {peakConfig?.subSlotDuration}s subslots</strong>.
                            You can select slots from both Peak and Normal categories below.
                          </div>
                          <div className="text-xs text-blue-700">
                            Calculation: {selectedMedia.duration}s ÷ {peakConfig?.subSlotDuration}s = {requiredSlotCount} subslots
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Total Cost Summary */}
                    {(selectedPeakSlots.length > 0 || selectedNormalSlots.length > 0) && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="text-sm font-medium text-green-900 mb-1">Total Selection</div>
                              <div className="text-sm text-green-800">
                                {selectedPeakSlots.length > 0 && `${selectedPeakSlots.length} Peak slots`}
                                {selectedPeakSlots.length > 0 && selectedNormalSlots.length > 0 && ' + '}
                                {selectedNormalSlots.length > 0 && `${selectedNormalSlots.length} Normal slots`}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-base font-semibold text-green-900">
                              ${totalCost.toLocaleString()}/day
                            </div>
                            <div className="text-xs text-green-700">
                              {peakCost > 0 && `$${peakCost} peak`}
                              {peakCost > 0 && normalCost > 0 && ' + '}
                              {normalCost > 0 && `$${normalCost} normal`}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Duration Calculation */}
                    {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="w-full">
                          <div className="text-sm font-medium text-blue-900 mb-1">Slot Requirement</div>
                          <div className="text-sm text-blue-800 mb-2">
                            Your {selectedMedia.duration}s media requires{' '}
                            <strong>{requiredSlotCount} consecutive {peakConfig?.subSlotDuration}s subslots</strong>.
                            Click any valid starting slot to auto-select the sequence.
                          </div>
                          <div className="text-xs text-blue-700">
                            Calculation: {selectedMedia.duration}s ÷ {peakConfig?.subSlotDuration}s = {requiredSlotCount} subslots
                          </div>
                        </div>
                      </div>
                    </div> */}


                    {/* Peak Slots Grid */}
                    <div className="bg-white border border-gray-200 rounded-lg p-5">
                      <SlotGrid
                        title="Peak Slots"
                        pricePerSlot={peakConfig?.pricing.peakPrice || 500}
                        subSlots={peakSubSlots}
                        selectedSlots={selectedPeakSlots}
                        hoveredSlot={hoveredPeakSlot}
                        requiredSlotCount={requiredSlotCount}
                        selectionError={peakSelectionError}
                        validSlotGroups={validPeakSlotGroups}
                        onSlotClick={handlePeakSlotClick}
                        onSlotHover={setHoveredPeakSlot}
                        canStartSelection={canStartSelection}
                        getPreviewSelection={getPreviewSelection}
                      />
                    </div>

                    {/* Normal Slots Grid */}
                    <div className="bg-white border border-gray-200 rounded-lg p-5">
                      <SlotGrid
                        title="Normal Slots"
                        pricePerSlot={normalConfig?.pricing.normalPrice || 300}
                        subSlots={normalSubSlots}
                        selectedSlots={selectedNormalSlots}
                        hoveredSlot={hoveredNormalSlot}
                        requiredSlotCount={requiredSlotCount}
                        selectionError={normalSelectionError}
                        validSlotGroups={validNormalSlotGroups}
                        onSlotClick={handleNormalSlotClick}
                        onSlotHover={setHoveredNormalSlot}
                        canStartSelection={canStartSelection}
                        getPreviewSelection={getPreviewSelection}
                      />
                    </div>

                    {/* Legend */}
                    <div className="flex items-center justify-center gap-6 text-xs pt-4 border-t border-gray-200">
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
                  </>
                )}
              </div>
            )}

            {/* Step 3: Duration Selection */}
            {currentStep === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Duration Selection */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Duration Type Toggle */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Campaign Duration <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setDurationType('preset')}
                        className={`flex-1 h-11 rounded-lg border transition-all text-sm font-medium flex items-center justify-center gap-2 ${
                          durationType === 'preset'
                            ? 'border-[#D9480F] bg-orange-50 text-[#D9480F]'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        Quick Select
                      </button>
                      <button
                        onClick={() => setDurationType('custom')}
                        className={`flex-1 h-11 rounded-lg border transition-all text-sm font-medium flex items-center justify-center gap-2 ${
                          durationType === 'custom'
                            ? 'border-[#D9480F] bg-orange-50 text-[#D9480F]'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <Calendar className="w-4 h-4" />
                        Custom Dates
                      </button>
                    </div>
                  </div>

                  {/* Preset Duration Options */}
                  {durationType === 'preset' && (
                    <div className="space-y-4">
                      {/* Start Date for Preset Mode */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Campaign Start Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          value={presetStartDate}
                          onChange={(e) => setPresetStartDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full h-11 px-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                        />
                        {presetStartDate && (
                          <p className="text-xs text-gray-500 mt-1">
                            Campaign will end on {new Date(new Date(presetStartDate).getTime() + campaignDuration * 24 * 60 * 60 * 1000).toLocaleDateString()}
                          </p>
                        )}
                      </div>

                      {/* Duration Selection Grid */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select Duration
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          {CAMPAIGN_DURATION_PRESETS.map((duration) => (
                            <button
                              key={duration.value}
                              onClick={() => setCampaignDuration(duration.value)}
                              className={`h-20 rounded-lg border transition-all duration-200 flex flex-col items-center justify-center ${
                                campaignDuration === duration.value
                                  ? 'border-[#D9480F] bg-orange-50 text-[#D9480F] shadow-md ring-1 ring-[#D9480F] ring-opacity-20'
                                  : 'border-gray-200 bg-white text-gray-700 hover:border-[#D9480F] hover:border-opacity-30 hover:shadow-sm'
                              }`}
                            >
                              <div className={`text-xl font-bold mb-0.5 ${
                                campaignDuration === duration.value ? 'text-[#D9480F]' : 'text-gray-900'
                              }`}>
                                {duration.value === 365 ? '1' : duration.value}
                              </div>
                              <div className={`text-xs font-medium uppercase tracking-wide ${
                                campaignDuration === duration.value ? 'text-[#D9480F]' : 'text-gray-500'
                              }`}>
                                {duration.value === 365 ? 'Year' : duration.value === 1 ? 'Day' : 'Days'}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Info Box for Preset Mode */}
                      {presetStartDate && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="text-sm font-medium text-green-900 mb-1">
                              Campaign Duration Set
                            </div>
                            <div className="text-sm text-green-800">
                              Your campaign will run for <strong>{campaignDuration} days</strong> starting from{' '}
                              <strong>{new Date(presetStartDate).toLocaleDateString()}</strong> and ending on{' '}
                              <strong>{new Date(new Date(presetStartDate).getTime() + campaignDuration * 24 * 60 * 60 * 1000).toLocaleDateString()}</strong>.
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Custom Date Range */}
                  {durationType === 'custom' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Start Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full h-11 px-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          End Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          min={startDate || new Date().toISOString().split('T')[0]}
                          className="w-full h-11 px-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                        />
                      </div>
                      {startDate && endDate && new Date(endDate) > new Date(startDate) && (
                        <div className="col-span-2 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="text-sm font-medium text-green-900">
                              <span className="font-bold">
                                {Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                              </span>
                              {' '}campaign duration
                            </div>
                            <div className="text-xs text-green-700 mt-0.5">
                              {new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} – {new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Right Column: Cost Estimate - Sticky Sidebar */}
                {totalCost > 0 && campaignDays > 0 && (
                  <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-[#D9480F] rounded-lg p-6 sticky top-6 shadow-sm">
                      <div className="text-sm font-medium text-gray-700 mb-4">Campaign Cost</div>
                      
                      <div className="space-y-4">
                        {/* Total Cost - Prominent */}
                        <div className="text-center py-4">
                          <div className="text-4xl font-bold text-[#D9480F] mb-1">
                            ${(totalCost * campaignDays).toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-600 uppercase tracking-wide">
                            Total Campaign Cost
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-orange-200"></div>

                        {/* Breakdown */}
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">Daily Rate</span>
                            <span className="font-semibold text-gray-900">${totalCost.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">Duration</span>
                            <span className="font-semibold text-gray-900">{campaignDays} {campaignDays === 1 ? 'day' : 'days'}</span>
                          </div>
                          
                          {/* Slot Breakdown - Show both Peak and Normal if applicable */}
                          {selectedPeakSlots.length > 0 && selectedNormalSlots.length > 0 ? (
                            <>
                              <div className="pt-2 border-t border-orange-100">
                                <div className="text-xs font-medium text-gray-600 mb-2">Slot Breakdown</div>
                                <div className="space-y-1.5">
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-600">Peak Slots</span>
                                    <span className="font-medium text-gray-900">{selectedPeakSlots.length} × ${peakConfig?.pricing.peakPrice}</span>
                                  </div>
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-600">Normal Slots</span>
                                    <span className="font-medium text-gray-900">{selectedNormalSlots.length} × ${normalConfig?.pricing.normalPrice}</span>
                                  </div>
                                  <div className="flex items-center justify-between text-sm pt-1.5 border-t border-orange-100">
                                    <span className="text-gray-700">Total Slots</span>
                                    <span className="font-semibold text-gray-900">{selectedPeakSlots.length + selectedNormalSlots.length} slots</span>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-700">Slots Booked</span>
                              <span className="font-semibold text-gray-900">
                                {selectedPeakSlots.length + selectedNormalSlots.length} {selectedPeakSlots.length + selectedNormalSlots.length === 1 ? 'slot' : 'slots'}
                                {selectedPeakSlots.length > 0 && ' (Peak)'}
                                {selectedNormalSlots.length > 0 && ' (Normal)'}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Formula */}
                        <div className="bg-white bg-opacity-70 rounded-lg p-3 text-center">
                          <div className="text-xs text-gray-600">
                            {totalCost}/day × {campaignDays} day{campaignDays !== 1 ? 's' : ''}
                          </div>
                        </div>
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
                        <div className="space-y-3">
                          {/* Peak Slots */}
                          {selectedPeakSlots.length > 0 && (
                            <div className="pb-3 border-b border-gray-200">
                              <div className="flex items-center justify-between text-sm mb-2">
                                <span className="text-gray-600 font-medium">Peak Slots</span>
                                <span className="font-semibold text-orange-600">{selectedPeakSlots.length} slots</span>
                              </div>
                              <div className="space-y-1.5 text-xs">
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-600">Positions</span>
                                  <span className="font-medium text-gray-900">
                                    #{selectedPeakSlots[0]} - #{selectedPeakSlots[selectedPeakSlots.length - 1]}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-600">Time Range</span>
                                  <span className="font-medium text-gray-900">
                                    {peakSubSlots.find((s) => s.position === selectedPeakSlots[0])?.startTime} –{' '}
                                    {peakSubSlots.find((s) => s.position === selectedPeakSlots[selectedPeakSlots.length - 1])?.endTime}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-600">Price per slot</span>
                                  <span className="font-medium text-gray-900">${peakConfig?.pricing.peakPrice}</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Normal Slots */}
                          {selectedNormalSlots.length > 0 && (
                            <div className={selectedPeakSlots.length > 0 ? '' : 'pb-3 border-b border-gray-200'}>
                              <div className="flex items-center justify-between text-sm mb-2">
                                <span className="text-gray-600 font-medium">Normal Slots</span>
                                <span className="font-semibold text-blue-600">{selectedNormalSlots.length} slots</span>
                              </div>
                              <div className="space-y-1.5 text-xs">
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-600">Positions</span>
                                  <span className="font-medium text-gray-900">
                                    #{selectedNormalSlots[0]} - #{selectedNormalSlots[selectedNormalSlots.length - 1]}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-600">Time Range</span>
                                  <span className="font-medium text-gray-900">
                                    {normalSubSlots.find((s) => s.position === selectedNormalSlots[0])?.startTime} –{' '}
                                    {normalSubSlots.find((s) => s.position === selectedNormalSlots[selectedNormalSlots.length - 1])?.endTime}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-600">Price per slot</span>
                                  <span className="font-medium text-gray-900">${normalConfig?.pricing.normalPrice}</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Total Summary */}
                          <div className="pt-2 text-xs text-gray-600">
                            <div className="flex items-center justify-between">
                              <span>Total Subslots Required</span>
                              <span className="font-medium text-gray-900">{requiredSlotCount}</span>
                            </div>
                            <div className="mt-1 text-gray-500">
                              Logic: {selectedMedia?.duration}s media ÷ {peakConfig?.subSlotDuration || normalConfig?.subSlotDuration}s subslots = {requiredSlotCount} positions
                            </div>
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
                            <>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Campaign Length</span>
                                <span className="font-medium text-gray-900">{campaignDuration} days</span>
                              </div>
                              {presetStartDate && (
                                <>
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Start Date</span>
                                    <span className="font-medium text-gray-900">{presetStartDate}</span>
                                  </div>
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">End Date</span>
                                    <span className="font-medium text-gray-900">
                                      {new Date(new Date(presetStartDate).getTime() + campaignDuration * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                                    </span>
                                  </div>
                                </>
                              )}
                            </>
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
                            <span className="text-gray-600">Daily Cost</span>
                            <span className="font-medium text-gray-900">
                              ${totalCost}
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
                            ${totalCost} per day × {campaignDays} days
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
                    <strong>{machine.name}</strong> in{' '}
                    {selectedPeakSlots.length > 0 && <><strong>{selectedPeakSlots.length} peak slots</strong>{selectedNormalSlots.length > 0 && ' and '}</>}
                    {selectedNormalSlots.length > 0 && <><strong>{selectedNormalSlots.length} normal slots</strong></>}
                    {' '}for <strong>{campaignDays} days</strong>.
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
