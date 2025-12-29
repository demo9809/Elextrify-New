import { useState, useEffect } from 'react';
import { X, Calendar, Clock, DollarSign, Zap, Target, AlertCircle, CheckCircle, Film, Image as ImageIcon, PlaySquare, Settings, Check } from 'lucide-react';

interface TimeSlot {
  id: string;
  deviceId: string;
  deviceName: string;
  date: string;
  hour: number;
  startTime: string;
  endTime: string;
  duration: number;
  pricingTier: 'peak' | 'non-peak';
  price: number;
}

interface BookingPanelProps {
  slot: TimeSlot;
  onClose: () => void;
  onBook: (booking: any) => void;
  multiDeviceCount?: number; // Optional: if booking for multiple devices
}

type PlaybackMode = 'fixed' | 'stack';

// Mock data with client associations
const MOCK_CLIENTS = [
  { id: 'c1', name: 'Acme Corporation' },
  { id: 'c2', name: 'Brew Coffee Co.' },
  { id: 'c3', name: 'FitLife Gym' },
  { id: 'c4', name: 'TechStart Inc.' },
];

const MOCK_MEDIA = [
  { id: 'm1', name: 'Holiday Sale 2025 - 30s', duration: 30, type: 'Video', clientId: 'c1', clientName: 'Acme Corporation' },
  { id: 'm2', name: 'Product Launch - 15s', duration: 15, type: 'Video', clientId: 'c1', clientName: 'Acme Corporation' },
  { id: 'm3', name: 'Brand Awareness Loop', duration: 10, type: 'Image', clientId: 'c2', clientName: 'Brew Coffee Co.' },
  { id: 'm4', name: 'Coffee Promo - 20s', duration: 20, type: 'Video', clientId: 'c2', clientName: 'Brew Coffee Co.' },
  { id: 'm5', name: 'Gym Membership Ad - 45s', duration: 45, type: 'Video', clientId: 'c3', clientName: 'FitLife Gym' },
];

const MOCK_PLAYLISTS = [
  { 
    id: 'p1', 
    name: 'Acme Holiday Campaign', 
    itemCount: 3, 
    duration: 90,
    mediaIds: ['m1', 'm2'],
    clientId: 'c1',
    clientName: 'Acme Corporation'
  },
  { 
    id: 'p2', 
    name: 'Coffee Morning Mix', 
    itemCount: 2, 
    duration: 60,
    mediaIds: ['m3', 'm4'],
    clientId: 'c2',
    clientName: 'Brew Coffee Co.'
  },
  { 
    id: 'p3', 
    name: 'Mixed Client Playlist', 
    itemCount: 4, 
    duration: 120,
    mediaIds: ['m1', 'm3', 'm5'],
    clientId: null, // Multi-client playlist
    clientName: null
  },
];

// Mock slot configurations - Must match the ones in InventoryScheduler
const SLOT_CONFIGURATIONS = [
  { id: 'mall-standard-loop', name: 'Mall Standard Loop', masterSlot: '120s', subSlot: '10s (12 slots)', subSlotCount: 12, subSlotDuration: 10, peakPrice: 15, nonPeakPrice: 8 },
  { id: 'airport-premium', name: 'Airport Premium', masterSlot: '60s', subSlot: '5s (12 slots)', subSlotCount: 12, subSlotDuration: 5, peakPrice: 25, nonPeakPrice: 15 },
  { id: 'transit-quick-rotation', name: 'Transit Quick Rotation', masterSlot: '120s', subSlot: '30s (4 slots)', subSlotCount: 4, subSlotDuration: 30, peakPrice: 12, nonPeakPrice: 6 },
  { id: 'gym-long-form', name: 'Gym Long Form', masterSlot: '120s', subSlot: '60s (2 slots)', subSlotCount: 2, subSlotDuration: 60, peakPrice: 10, nonPeakPrice: 5 },
  { id: 'retail-flex', name: 'Retail Flex', masterSlot: '60s', subSlot: '15s (4 slots)', subSlotCount: 4, subSlotDuration: 15, peakPrice: 8, nonPeakPrice: 4 },
];

export function BookingPanel({ slot, onClose, onBook, multiDeviceCount }: BookingPanelProps) {
  const [step, setStep] = useState<'config' | 'content' | 'subslots' | 'schedule' | 'confirm'>('config');
  
  // Step 1: Slot Configuration
  const [selectedConfig, setSelectedConfig] = useState('');
  
  // Step 2: Content Selection
  const [contentType, setContentType] = useState<'media' | 'playlist'>('media');
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const [detectedClient, setDetectedClient] = useState<{ id: string; name: string } | null>(null);
  const [clientError, setClientError] = useState('');
  
  // Step 3: Sub-slot Selection
  const [selectedSubSlots, setSelectedSubSlots] = useState<number[]>([]);
  
  // Step 4: Playback Mode & Schedule
  const [playbackMode, setPlaybackMode] = useState<PlaybackMode>('fixed');
  const [dateRange, setDateRange] = useState({ start: slot.date, end: slot.date });
  const [stackDuration, setStackDuration] = useState(300); // seconds for stack mode

  // Auto-detect client when media/playlist is selected
  useEffect(() => {
    setClientError('');
    
    if (contentType === 'playlist' && selectedPlaylist) {
      const playlist = MOCK_PLAYLISTS.find(p => p.id === selectedPlaylist);
      if (!playlist) return;
      
      if (!playlist.clientId) {
        // Multi-client playlist error
        setClientError('This playlist contains media from multiple clients. Please select a playlist with media from a single client only.');
        setDetectedClient(null);
      } else {
        setDetectedClient({ id: playlist.clientId, name: playlist.clientName! });
      }
    } else if (contentType === 'media' && selectedMedia.length > 0) {
      const mediaItems = MOCK_MEDIA.filter(m => selectedMedia.includes(m.id));
      const uniqueClients = [...new Set(mediaItems.map(m => m.clientId))];
      
      if (uniqueClients.length > 1) {
        setClientError('You have selected media from multiple clients. Please select media from a single client only.');
        setDetectedClient(null);
      } else if (uniqueClients.length === 1) {
        const clientId = uniqueClients[0];
        const media = mediaItems[0];
        setDetectedClient({ id: clientId, name: media.clientName });
      }
    } else {
      setDetectedClient(null);
    }
  }, [contentType, selectedMedia, selectedPlaylist]);

  const selectedSlotConfig = SLOT_CONFIGURATIONS.find(sc => sc.id === selectedConfig);

  const toggleMediaSelection = (mediaId: string) => {
    setSelectedMedia(prev =>
      prev.includes(mediaId)
        ? prev.filter(id => id !== mediaId)
        : [...prev, mediaId]
    );
  };

  const toggleSubSlot = (index: number) => {
    setSelectedSubSlots(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index].sort((a, b) => a - b)
    );
  };

  const handleBook = () => {
    if (!detectedClient) return;
    
    const booking = {
      slotId: slot.id,
      deviceId: slot.deviceId,
      configurationId: selectedConfig,
      subSlots: selectedSubSlots,
      clientId: detectedClient.id,
      clientName: detectedClient.name,
      contentType,
      contentId: contentType === 'media' ? selectedMedia : selectedPlaylist,
      playbackMode,
      dateRange,
      stackDuration: playbackMode === 'stack' ? stackDuration : undefined,
    };
    onBook(booking);
  };

  const canProceedFromConfig = selectedConfig !== '';
  const canProceedFromContent = (contentType === 'media' ? selectedMedia.length > 0 : selectedPlaylist !== '') && detectedClient && !clientError;
  const canProceedFromSubSlots = selectedSubSlots.length > 0;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 w-[680px] bg-white z-50 shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="border-b border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-[#111827]">
                {multiDeviceCount ? `Multi-Device Booking (${multiDeviceCount} devices)` : 'New Booking'}
              </h2>
              {multiDeviceCount && (
                <p className="text-sm text-[#6B7280] mt-1">
                  This booking will be applied to all selected devices simultaneously
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center text-[#6B7280] hover:bg-[#F9FAFB] rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Slot Info */}
          {!multiDeviceCount && (
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Device</p>
                  <p className="text-sm font-medium text-[#111827]">{slot.deviceName}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Time Slot</p>
                  <p className="text-sm font-medium text-[#111827]">
                    {slot.startTime} - {slot.endTime}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Pricing</p>
                  <p className="text-sm font-medium text-[#111827]">
                    ${slot.price} <span className="text-xs text-[#6B7280]">({slot.pricingTier})</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Multi-Device Info */}
          {multiDeviceCount && (
            <div className="bg-[#FFF7ED] border border-[#FDBA74] rounded-lg p-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Devices</p>
                  <p className="text-sm font-semibold text-[#D9480F]">{multiDeviceCount} devices</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Time Slot</p>
                  <p className="text-sm font-medium text-[#111827]">
                    {slot.startTime} - {slot.endTime}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Price per Device</p>
                  <p className="text-sm font-medium text-[#111827]">
                    ${slot.price} <span className="text-xs text-[#6B7280]">({slot.pricingTier})</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Progress Steps */}
          <div className="flex items-center gap-2 mt-4">
            {[
              { id: 'config', label: '1. Configuration' },
              { id: 'content', label: '2. Content' },
              { id: 'subslots', label: '3. Sub-Slots' },
              { id: 'schedule', label: '4. Schedule' },
              { id: 'confirm', label: '5. Confirm' },
            ].map((s, idx) => (
              <div key={s.id} className="flex items-center flex-1">
                <div className={`flex-1 h-1 rounded-full ${
                  step === s.id 
                    ? 'bg-[#D9480F]'
                    : ['config', 'content', 'subslots', 'schedule', 'confirm'].indexOf(step) > idx
                    ? 'bg-[#16A34A]'
                    : 'bg-[#E5E7EB]'
                }`} />
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step 1: Slot Configuration */}
          {step === 'config' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#111827] mb-2">Select Slot Configuration</h3>
                <p className="text-sm text-[#6B7280]">
                  Choose how this hour should be divided into bookable sub-slots
                </p>
              </div>

              <div className="space-y-4">
                {SLOT_CONFIGURATIONS.map(config => (
                  <button
                    key={config.id}
                    onClick={() => setSelectedConfig(config.id)}
                    className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                      selectedConfig === config.id
                        ? 'border-[#D9480F] bg-[#FFF7ED]'
                        : 'border-[#E5E7EB] hover:border-[#D9480F]/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <p className="text-base font-semibold text-[#111827] mb-1">{config.name}</p>
                        <p className="text-sm text-[#6B7280]">
                          {config.subSlotCount} sub-slots × {config.subSlotDuration} seconds each
                        </p>
                      </div>
                      {selectedConfig === config.id && (
                        <CheckCircle className="w-5 h-5 text-[#D9480F] flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-4 pt-3 border-t border-[#E5E7EB]">
                      <div>
                        <p className="text-xs text-[#6B7280]">Peak Price</p>
                        <p className="text-sm font-semibold text-[#111827]">${config.peakPrice}/slot</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#6B7280]">Non-Peak Price</p>
                        <p className="text-sm font-semibold text-[#111827]">${config.nonPeakPrice}/slot</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="bg-[#EFF6FF] border border-[#3B82F6] rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-[#3B82F6] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[#111827] mb-1">What is Slot Configuration?</p>
                    <p className="text-sm text-[#6B7280]">
                      Slot configuration defines how the master hour (60 minutes) is divided into smaller bookable units. 
                      For example, "12 x 5min" means advertisers can book specific 5-minute windows within the hour.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Content Selection */}
          {step === 'content' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#111827] mb-2">Select Content</h3>
                <p className="text-sm text-[#6B7280]">
                  Choose media or playlist to display. Client will be auto-detected.
                </p>
              </div>

              {/* Content Type Toggle */}
              <div className="flex items-center gap-2 bg-[#F9FAFB] rounded-lg p-1">
                <button
                  onClick={() => setContentType('media')}
                  className={`flex-1 px-4 py-2 rounded text-sm font-medium transition-colors ${
                    contentType === 'media'
                      ? 'bg-white text-[#D9480F] shadow-sm'
                      : 'text-[#6B7280]'
                  }`}
                >
                  Direct Media
                </button>
                <button
                  onClick={() => setContentType('playlist')}
                  className={`flex-1 px-4 py-2 rounded text-sm font-medium transition-colors ${
                    contentType === 'playlist'
                      ? 'bg-white text-[#D9480F] shadow-sm'
                      : 'text-[#6B7280]'
                  }`}
                >
                  Playlist
                </button>
              </div>

              {/* Client Auto-Detection Status */}
              {detectedClient && (
                <div className="bg-[#D1FAE5] border border-[#16A34A] rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#16A34A] flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-[#111827]">Client Auto-Detected</p>
                      <p className="text-sm text-[#6B7280] mt-1">
                        This booking will be for: <span className="font-semibold text-[#111827]">{detectedClient.name}</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Multi-client Error */}
              {clientError && (
                <div className="bg-[#FEE2E2] border border-[#DC2626] rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-[#111827]">Multi-Client Content Error</p>
                      <p className="text-sm text-[#6B7280] mt-1">{clientError}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Media Selection */}
              {contentType === 'media' && (
                <div className="space-y-3">
                  {MOCK_MEDIA.map(media => (
                    <button
                      key={media.id}
                      onClick={() => toggleMediaSelection(media.id)}
                      className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                        selectedMedia.includes(media.id)
                          ? 'border-[#D9480F] bg-[#FFF7ED]'
                          : 'border-[#E5E7EB] hover:border-[#D9480F]/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          media.type === 'Video' ? 'bg-[#DBEAFE]' : 'bg-[#FEF3C7]'
                        }`}>
                          {media.type === 'Video' ? (
                            <Film className="w-5 h-5 text-[#3B82F6]" />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-[#F59E0B]" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[#111827] mb-1">{media.name}</p>
                          <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                            <span>{media.type}</span>
                            <span>•</span>
                            <span>{media.duration}s</span>
                            <span>•</span>
                            <span className="font-medium">{media.clientName}</span>
                          </div>
                        </div>
                        {selectedMedia.includes(media.id) && (
                          <CheckCircle className="w-5 h-5 text-[#D9480F] flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Playlist Selection */}
              {contentType === 'playlist' && (
                <div className="space-y-3">
                  {MOCK_PLAYLISTS.map(playlist => (
                    <button
                      key={playlist.id}
                      onClick={() => setSelectedPlaylist(playlist.id)}
                      className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                        selectedPlaylist === playlist.id
                          ? 'border-[#D9480F] bg-[#FFF7ED]'
                          : 'border-[#E5E7EB] hover:border-[#D9480F]/50'
                      } ${!playlist.clientId ? 'opacity-50' : ''}`}
                      disabled={!playlist.clientId}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#EDE9FE] flex items-center justify-center flex-shrink-0">
                          <PlaySquare className="w-5 h-5 text-[#8B5CF6]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[#111827] mb-1">{playlist.name}</p>
                          <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                            <span>{playlist.itemCount} items</span>
                            <span>•</span>
                            <span>{Math.floor(playlist.duration / 60)}m {playlist.duration % 60}s</span>
                            {playlist.clientName && (
                              <>
                                <span>•</span>
                                <span className="font-medium">{playlist.clientName}</span>
                              </>
                            )}
                            {!playlist.clientId && (
                              <>
                                <span>•</span>
                                <span className="text-[#DC2626] font-medium">Mixed Clients</span>
                              </>
                            )}
                          </div>
                        </div>
                        {selectedPlaylist === playlist.id && (
                          <CheckCircle className="w-5 h-5 text-[#D9480F] flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Sub-Slot Selection */}
          {step === 'subslots' && selectedSlotConfig && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#111827] mb-2">Select Sub-Slots</h3>
                <p className="text-sm text-[#6B7280]">
                  Choose which {selectedSlotConfig.subSlotDuration}-minute slots to book within this hour
                </p>
              </div>

              {/* Quick Select */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedSubSlots(Array.from({ length: selectedSlotConfig.subSlotCount }, (_, i) => i))}
                  className="px-3 py-1.5 bg-[#F9FAFB] text-[#111827] rounded-lg hover:bg-[#F3F4F6] text-sm font-medium"
                >
                  Select All
                </button>
                <button
                  onClick={() => setSelectedSubSlots([])}
                  className="px-3 py-1.5 bg-[#F9FAFB] text-[#111827] rounded-lg hover:bg-[#F3F4F6] text-sm font-medium"
                >
                  Clear All
                </button>
                <div className="flex-1" />
                <p className="text-sm text-[#6B7280]">
                  {selectedSubSlots.length} of {selectedSlotConfig.subSlotCount} selected
                </p>
              </div>

              {/* Sub-Slot Grid */}
              <div className="grid grid-cols-6 gap-2">
                {Array.from({ length: selectedSlotConfig.subSlotCount }, (_, i) => {
                  const minutes = i * selectedSlotConfig.subSlotDuration;
                  const startHour = slot.hour;
                  const startMin = minutes;
                  const endMin = startMin + selectedSlotConfig.subSlotDuration;
                  
                  return (
                    <button
                      key={i}
                      onClick={() => toggleSubSlot(i)}
                      className={`p-3 border-2 rounded-lg text-center transition-all ${
                        selectedSubSlots.includes(i)
                          ? 'border-[#D9480F] bg-[#FFF7ED]'
                          : 'border-[#E5E7EB] hover:border-[#D9480F]/50'
                      }`}
                    >
                      <p className="text-xs font-semibold text-[#111827] mb-1">Slot {i + 1}</p>
                      <p className="text-[10px] text-[#6B7280]">
                        {startHour}:{startMin.toString().padStart(2, '0')}
                      </p>
                      {selectedSubSlots.includes(i) && (
                        <CheckCircle className="w-4 h-4 text-[#D9480F] mx-auto mt-1" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Price Calculation */}
              {selectedSubSlots.length > 0 && (
                <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#6B7280]">Total Price</p>
                    <p className="text-lg font-semibold text-[#111827]">
                      ${selectedSubSlots.length * (slot.pricingTier === 'peak' ? selectedSlotConfig.peakPrice : selectedSlotConfig.nonPeakPrice)}
                    </p>
                  </div>
                  <p className="text-xs text-[#6B7280] mt-2">
                    {selectedSubSlots.length} sub-slots × ${slot.pricingTier === 'peak' ? selectedSlotConfig.peakPrice : selectedSlotConfig.nonPeakPrice} per slot
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Schedule & Mode */}
          {step === 'schedule' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#111827] mb-2">Playback Mode & Schedule</h3>
                <p className="text-sm text-[#6B7280]">
                  Define how and when your content should play
                </p>
              </div>

              {/* Playback Mode */}
              <div>
                <label className="text-sm font-medium text-[#111827] mb-3 block">Playback Mode</label>
                <div className="space-y-3">
                  <button
                    onClick={() => setPlaybackMode('fixed')}
                    className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                      playbackMode === 'fixed'
                        ? 'border-[#D9480F] bg-[#FFF7ED]'
                        : 'border-[#E5E7EB] hover:border-[#D9480F]/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold text-[#111827] mb-1">Fixed Target</p>
                        <p className="text-xs text-[#6B7280]">
                          Content plays for the entire duration of selected sub-slots
                        </p>
                      </div>
                      {playbackMode === 'fixed' && (
                        <CheckCircle className="w-5 h-5 text-[#D9480F] flex-shrink-0" />
                      )}
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setPlaybackMode('stack')}
                    className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                      playbackMode === 'stack'
                        ? 'border-[#D9480F] bg-[#FFF7ED]'
                        : 'border-[#E5E7EB] hover:border-[#D9480F]/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold text-[#111827] mb-1">Stack / Random</p>
                        <p className="text-xs text-[#6B7280]">
                          Content plays for a specific total duration, distributed randomly
                        </p>
                      </div>
                      {playbackMode === 'stack' && (
                        <CheckCircle className="w-5 h-5 text-[#D9480F] flex-shrink-0" />
                      )}
                    </div>
                  </button>
                </div>
              </div>

              {/* Stack Duration */}
              {playbackMode === 'stack' && (
                <div>
                  <label className="text-sm font-medium text-[#111827] mb-2 block">
                    Total Play Duration (seconds)
                  </label>
                  <input
                    type="number"
                    value={stackDuration}
                    onChange={(e) => setStackDuration(parseInt(e.target.value))}
                    className="w-full h-11 px-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm"
                    min={1}
                    max={3600}
                  />
                  <p className="text-xs text-[#6B7280] mt-2">
                    Content will play for {stackDuration}s total, distributed randomly within selected sub-slots
                  </p>
                </div>
              )}

              {/* Date Range */}
              <div>
                <label className="text-sm font-medium text-[#111827] mb-2 block">Date Range</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[#6B7280] mb-1 block">Start Date</label>
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                      className="w-full h-11 px-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#6B7280] mb-1 block">End Date</label>
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                      className="w-full h-11 px-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Confirm */}
          {step === 'confirm' && detectedClient && selectedSlotConfig && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#111827] mb-2">Confirm Booking</h3>
                <p className="text-sm text-[#6B7280]">
                  Review your booking details before confirming
                </p>
              </div>

              <div className="space-y-4">
                {/* Client */}
                <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                  <p className="text-xs text-[#6B7280] mb-1">Client (Auto-Detected)</p>
                  <p className="text-sm font-semibold text-[#111827]">{detectedClient.name}</p>
                </div>

                {/* Configuration */}
                <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                  <p className="text-xs text-[#6B7280] mb-1">Slot Configuration</p>
                  <p className="text-sm font-semibold text-[#111827]">{selectedSlotConfig.name}</p>
                  <p className="text-xs text-[#6B7280] mt-1">
                    {selectedSubSlots.length} sub-slots selected
                  </p>
                </div>

                {/* Content */}
                <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                  <p className="text-xs text-[#6B7280] mb-1">Content</p>
                  <p className="text-sm font-semibold text-[#111827]">
                    {contentType === 'playlist'
                      ? MOCK_PLAYLISTS.find(p => p.id === selectedPlaylist)?.name
                      : `${selectedMedia.length} media item(s)`
                    }
                  </p>
                </div>

                {/* Schedule */}
                <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                  <p className="text-xs text-[#6B7280] mb-1">Schedule</p>
                  <p className="text-sm font-semibold text-[#111827]">
                    {playbackMode === 'fixed' ? 'Fixed Target' : `Stack (${stackDuration}s)`}
                  </p>
                  <p className="text-xs text-[#6B7280] mt-1">
                    {dateRange.start} to {dateRange.end}
                  </p>
                </div>

                {/* Total Price */}
                <div className="bg-[#D1FAE5] border border-[#16A34A] rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-[#111827]">Total Price</p>
                    <p className="text-xl font-semibold text-[#111827]">
                      ${selectedSubSlots.length * (slot.pricingTier === 'peak' ? selectedSlotConfig.peakPrice : selectedSlotConfig.nonPeakPrice)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#E5E7EB] p-6">
          <div className="flex items-center gap-3">
            {step !== 'config' && (
              <button
                onClick={() => {
                  const steps: Array<'config' | 'content' | 'subslots' | 'schedule' | 'confirm'> = ['config', 'content', 'subslots', 'schedule', 'confirm'];
                  const currentIndex = steps.indexOf(step);
                  if (currentIndex > 0) setStep(steps[currentIndex - 1]);
                }}
                className="px-6 py-3 bg-[#F9FAFB] text-[#111827] rounded-lg hover:bg-[#F3F4F6] font-medium transition-colors"
              >
                Back
              </button>
            )}
            
            <div className="flex-1" />
            
            {step === 'confirm' ? (
              <button
                onClick={handleBook}
                className="px-6 py-3 bg-[#D9480F] text-white rounded-lg hover:bg-[#C13C09] font-medium transition-colors"
              >
                Confirm Booking
              </button>
            ) : (
              <button
                onClick={() => {
                  const steps: Array<'config' | 'content' | 'subslots' | 'schedule' | 'confirm'> = ['config', 'content', 'subslots', 'schedule', 'confirm'];
                  const currentIndex = steps.indexOf(step);
                  if (currentIndex < steps.length - 1) setStep(steps[currentIndex + 1]);
                }}
                disabled={
                  (step === 'config' && !canProceedFromConfig) ||
                  (step === 'content' && !canProceedFromContent) ||
                  (step === 'subslots' && !canProceedFromSubSlots)
                }
                className="px-6 py-3 bg-[#D9480F] text-white rounded-lg hover:bg-[#C13C09] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}