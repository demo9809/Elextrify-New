import { useState } from 'react';
import { X, Clock, Zap, Users, Play, Trash2, Plus, Film, Image as ImageIcon, Calculator, Calendar, Pause, Edit2 } from 'lucide-react';

interface AdInSlot {
  id: string;
  brandName: string;
  adName: string;
  contentType: 'playlist' | 'media';
  contentName: string;
  adDuration: number;
  playsPerHour: number;
  totalSecondsPerHour: number;
  isOwnAd: boolean;
  sequence: number;
  paused?: boolean; // Pause state
}

interface TimeSlot {
  day: number;
  hour: number;
  ads: AdInSlot[];
}

interface SlotDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSlots: Set<string>; // e.g., Set(['1-9', '1-10', '2-9'])
  getSlot: (day: number, hour: number) => TimeSlot | undefined;
  getAvailableCapacity: (day: number, hour: number) => number;
  onAddAd: (selectedSlotKeys: Set<string>, ad: AdInSlot) => void;
  onDeleteAd: (day: number, hour: number, adId: string) => void;
  onTogglePauseAd: (day: number, hour: number, adId: string) => void; // Add pause toggle
}

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DAYS_OF_WEEK_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const PEAK_HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17];
const SLOT_CAPACITY_SECONDS = 3600;

// Mock playlists with durations
const MOCK_PLAYLISTS = [
  { id: 'pl1', name: 'Holiday Campaign 2025', duration: 30, itemCount: 5 },
  { id: 'pl2', name: 'Product Launch Mix', duration: 45, itemCount: 3 },
  { id: 'pl3', name: 'Brand Awareness', duration: 15, itemCount: 2 },
  { id: 'pl4', name: 'Summer Collection', duration: 60, itemCount: 8 },
];

// Mock media files with durations
const MOCK_MEDIA = [
  { id: 'm1', name: 'Diwali_Offer_2025.mp4', duration: 15, type: 'video' },
  { id: 'm2', name: 'Product_Hero_Banner.jpg', duration: 10, type: 'image' },
  { id: 'm3', name: 'Sale_Announcement.mp4', duration: 20, type: 'video' },
  { id: 'm4', name: 'Store_Location.png', duration: 8, type: 'image' },
];

export function SlotDetailModal({ 
  isOpen, 
  onClose, 
  selectedSlots,
  getSlot,
  getAvailableCapacity,
  onAddAd,
  onDeleteAd,
  onTogglePauseAd
}: SlotDetailModalProps) {
  const [showAddAdForm, setShowAddAdForm] = useState(false);
  const [contentType, setContentType] = useState<'playlist' | 'media'>('playlist');
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const [selectedMedia, setSelectedMedia] = useState('');
  const [playsPerHour, setPlaysPerHour] = useState(10);
  
  // Date range state
  const [startDate, setStartDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth.toISOString().split('T')[0];
  });

  // View mode: 'create' or specific slot like '1-9'
  const [viewMode, setViewMode] = useState<'create' | string>(() => {
    // Initialize view mode based on selected slots
    if (selectedSlots.size === 1) {
      const slotKey = Array.from(selectedSlots)[0];
      const [day, hour] = slotKey.split('-').map(Number);
      const slot = getSlot(day, hour);
      
      // If single slot with ads, show slot detail view
      if (slot && slot.ads.length > 0) {
        return slotKey;
      }
    }
    // Otherwise, show create form
    return 'create';
  });
  
  // Edit mode state
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingAd, setEditingAd] = useState<{ ad: AdInSlot; day: number; hour: number } | null>(null);

  // Reset state when modal closes
  const handleClose = () => {
    setShowAddAdForm(false);
    setContentType('playlist');
    setSelectedPlaylist('');
    setSelectedMedia('');
    setPlaysPerHour(10);
    setIsEditMode(false);
    setEditingAd(null);
    
    // Reset view mode based on selected slots
    if (selectedSlots.size === 1) {
      const slotKey = Array.from(selectedSlots)[0];
      const [day, hour] = slotKey.split('-').map(Number);
      const slot = getSlot(day, hour);
      if (slot && slot.ads.length > 0) {
        setViewMode(slotKey);
      } else {
        setViewMode('create');
      }
    } else {
      setViewMode('create');
    }
    
    onClose();
  };

  if (!isOpen) return null;

  const formatHour = (hour: number): string => {
    if (hour === 0) return '12:00 AM';
    if (hour === 12) return '12:00 PM';
    if (hour < 12) return `${hour}:00 AM`;
    return `${hour - 12}:00 PM`;
  };

  const formatDuration = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
  };

  // Parse selected slots
  const selectedSlotsArray = Array.from(selectedSlots).map(key => {
    const [day, hour] = key.split('-').map(Number);
    return { day, hour, key };
  }).sort((a, b) => a.day - b.day || a.hour - b.hour);

  // Get slot details for viewing
  const getViewSlot = () => {
    if (viewMode === 'create') return null;
    const [day, hour] = viewMode.split('-').map(Number);
    return { day, hour, slot: getSlot(day, hour) };
  };

  const viewSlotData = getViewSlot();

  // Calculate minimum available capacity across all selected slots
  const minAvailableCapacity = Math.min(
    ...selectedSlotsArray.map(({ day, hour }) => getAvailableCapacity(day, hour))
  );

  // Get selected content duration
  const getContentDuration = (): number => {
    if (contentType === 'playlist') {
      const playlist = MOCK_PLAYLISTS.find(p => p.id === selectedPlaylist);
      return playlist?.duration || 0;
    } else {
      const media = MOCK_MEDIA.find(m => m.id === selectedMedia);
      return media?.duration || 0;
    }
  };

  const getContentName = (): string => {
    if (contentType === 'playlist') {
      const playlist = MOCK_PLAYLISTS.find(p => p.id === selectedPlaylist);
      return playlist?.name || '';
    } else {
      const media = MOCK_MEDIA.find(m => m.id === selectedMedia);
      return media?.name || '';
    }
  };

  const adDuration = getContentDuration();
  const totalSecondsPerHour = adDuration * playsPerHour;
  const percentageOfHour = totalSecondsPerHour > 0 ? ((totalSecondsPerHour / SLOT_CAPACITY_SECONDS) * 100).toFixed(1) : '0';
  const canAddAd = totalSecondsPerHour > 0 && totalSecondsPerHour <= minAvailableCapacity;

  // Calculate date range
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  const daysDuration = Math.ceil((endDateObj.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  const handleStartEdit = (ad: AdInSlot, day: number, hour: number) => {
    // Pre-fill form with existing ad data
    setContentType(ad.contentType);
    
    if (ad.contentType === 'playlist') {
      // Find matching playlist by name
      const playlist = MOCK_PLAYLISTS.find(p => p.name === ad.contentName);
      setSelectedPlaylist(playlist?.id || '');
      setSelectedMedia('');
    } else {
      // Find matching media by name
      const media = MOCK_MEDIA.find(m => m.name === ad.contentName);
      setSelectedMedia(media?.id || '');
      setSelectedPlaylist('');
    }
    
    setPlaysPerHour(ad.playsPerHour);
    setIsEditMode(true);
    setEditingAd({ ad, day, hour });
    setShowAddAdForm(true);
    setViewMode('create');
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditingAd(null);
    setShowAddAdForm(false);
    setSelectedPlaylist('');
    setSelectedMedia('');
    setPlaysPerHour(10);
  };

  const handleUpdateAd = () => {
    if (!canAddAd || !editingAd) {
      alert(`Not enough capacity in the slot. Maximum available: ${formatDuration(minAvailableCapacity)}`);
      return;
    }

    if (adDuration === 0) {
      alert('Please select a playlist or media file.');
      return;
    }

    // First delete the old ad
    onDeleteAd(editingAd.day, editingAd.hour, editingAd.ad.id);

    // Then add the updated ad to the same slot
    const updatedAd: AdInSlot = {
      id: editingAd.ad.id, // Keep same ID
      brandName: 'Your Brand',
      adName: 'Updated Campaign',
      contentType,
      contentName: getContentName(),
      adDuration,
      playsPerHour,
      totalSecondsPerHour,
      isOwnAd: true,
      sequence: editingAd.ad.sequence,
    };

    onAddAd(new Set([`${editingAd.day}-${editingAd.hour}`]), updatedAd);
    
    // Reset state
    handleCancelEdit();
    
    // Show success message
    alert('Ad updated successfully!');
  };

  const handleAddNewAd = () => {
    if (!canAddAd) {
      alert(`Not enough capacity in one or more slots. Maximum available: ${formatDuration(minAvailableCapacity)}`);
      return;
    }

    if (adDuration === 0) {
      alert('Please select a playlist or media file.');
      return;
    }

    const newAd: AdInSlot = {
      id: `ad-${Date.now()}`,
      brandName: 'Your Brand',
      adName: 'New Campaign',
      contentType,
      contentName: getContentName(),
      adDuration,
      playsPerHour,
      totalSecondsPerHour,
      isOwnAd: true,
      sequence: 1, // Will be updated based on existing ads in each slot
    };

    onAddAd(selectedSlots, newAd);
    setShowAddAdForm(false);
    setSelectedPlaylist('');
    setSelectedMedia('');
    setPlaysPerHour(10);
    handleClose();
  };

  const handleDelete = (day: number, hour: number, adId: string) => {
    if (confirm(`Delete this ad from the slot?`)) {
      onDeleteAd(day, hour, adId);
      // Refresh view
      if (viewMode !== 'create') {
        const slot = getSlot(day, hour);
        if (!slot || slot.ads.length === 0) {
          setViewMode('create');
        }
      }
    }
  };

  const handleTogglePause = (day: number, hour: number, adId: string) => {
    onTogglePauseAd(day, hour, adId);
    // Refresh view
    if (viewMode !== 'create') {
      const slot = getSlot(day, hour);
      if (!slot || slot.ads.length === 0) {
        setViewMode('create');
      }
    }
  };

  // Group selected slots by day for display
  const slotsByDay = selectedSlotsArray.reduce((acc, { day, hour, key }) => {
    if (!acc[day]) acc[day] = [];
    acc[day].push({ hour, key });
    return acc;
  }, {} as Record<number, Array<{ hour: number; key: string }>>);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-[900px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E5E7EB] p-6 z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-[#111827] mb-2">
                {viewMode === 'create' 
                  ? `Schedule Ad - ${selectedSlots.size} Slot${selectedSlots.size !== 1 ? 's' : ''} Selected`
                  : `View Slot Details`
                }
              </h3>
              
              {viewMode === 'create' && (
                <div className="text-sm text-[#6B7280]">
                  Your ad will run on all selected time slots during the date range
                </div>
              )}
            </div>
            
            <button
              onClick={handleClose}
              className="p-1 rounded hover:bg-[#F9FAFB] text-[#6B7280] hover:text-[#111827] ml-4"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Navigation Tabs */}
          <div className="mb-6 flex items-center gap-2 border-b border-[#E5E7EB]">
            <button
              onClick={() => setViewMode('create')}
              className={`px-4 py-2 text-sm border-b-2 transition-colors ${
                viewMode === 'create'
                  ? 'border-[#3B82F6] text-[#3B82F6]'
                  : 'border-transparent text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              Schedule New Ad
            </button>
            {selectedSlotsArray.map(({ day, hour, key }) => {
              const slot = getSlot(day, hour);
              if (!slot || slot.ads.length === 0) return null;
              
              return (
                <button
                  key={key}
                  onClick={() => setViewMode(key)}
                  className={`px-3 py-2 text-xs border-b-2 transition-colors ${
                    viewMode === key
                      ? 'border-[#3B82F6] text-[#3B82F6]'
                      : 'border-transparent text-[#6B7280] hover:text-[#111827]'
                  }`}
                >
                  {DAYS_OF_WEEK_SHORT[day]} {formatHour(hour).replace(':00', '')}
                </button>
              );
            })}
          </div>

          {/* Create New Ad View */}
          {viewMode === 'create' && (
            <>
              {/* Selected Slots Summary */}
              <div className="mb-6 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                <h4 className="text-sm text-[#111827] mb-3">Selected Time Slots ({selectedSlots.size})</h4>
                <div className="grid grid-cols-7 gap-2">
                  {Object.entries(slotsByDay).map(([dayStr, hours]) => {
                    const day = parseInt(dayStr);
                    return (
                      <div key={day} className="bg-white rounded-lg p-2 border border-[#E5E7EB]">
                        <div className="text-xs text-[#6B7280] mb-1">{DAYS_OF_WEEK_SHORT[day]}</div>
                        <div className="space-y-1">
                          {hours.map(({ hour }) => (
                            <div key={hour} className="text-xs text-[#111827] flex items-center gap-1">
                              <Clock className="w-3 h-3 text-[#9CA3AF]" />
                              {formatHour(hour).replace(':00', '')}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-3 text-xs text-[#6B7280]">
                  Min. available capacity: <strong className="text-[#111827]">{formatDuration(minAvailableCapacity)}</strong> per slot
                </div>
              </div>

              {/* Add Ad Form */}
              {!showAddAdForm ? (
                <button
                  onClick={() => setShowAddAdForm(true)}
                  className="w-full px-4 py-3 border-2 border-dashed border-[#E5E7EB] rounded-lg text-[#6B7280] hover:border-[#3B82F6] hover:text-[#3B82F6] transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  <span className="text-sm">Configure Your Ad</span>
                </button>
              ) : (
                <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-6">
                  <h4 className="text-sm text-[#111827] mb-4">Configure Your Ad</h4>
                  
                  <div className="space-y-4">
                    {/* Date Range */}
                    <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="w-4 h-4 text-[#3B82F6]" />
                        <label className="text-sm text-[#111827]">
                          Campaign Date Range <span className="text-[#DC2626]">*</span>
                        </label>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-[#6B7280] mb-1">Start Date</label>
                          <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-md text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-[#6B7280] mb-1">End Date</label>
                          <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            min={startDate}
                            className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-md text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-[#6B7280]">
                        Campaign runs for <strong className="text-[#111827]">{daysDuration} day{daysDuration !== 1 ? 's' : ''}</strong>
                      </div>
                    </div>

                    {/* Content Type Toggle */}
                    <div>
                      <label className="block text-sm text-[#111827] mb-2">
                        Content Type <span className="text-[#DC2626]">*</span>
                      </label>
                      <div className="inline-flex rounded-lg border border-[#E5E7EB] bg-white p-1">
                        <button
                          onClick={() => {
                            setContentType('playlist');
                            setSelectedMedia('');
                          }}
                          className={`
                            px-4 py-2 rounded-md text-sm transition-all flex items-center gap-2
                            ${contentType === 'playlist' 
                              ? 'bg-[#3B82F6] text-white' 
                              : 'text-[#6B7280] hover:text-[#111827]'
                            }
                          `}
                        >
                          <Film className="w-4 h-4" />
                          Playlist
                        </button>
                        <button
                          onClick={() => {
                            setContentType('media');
                            setSelectedPlaylist('');
                          }}
                          className={`
                            px-4 py-2 rounded-md text-sm transition-all flex items-center gap-2
                            ${contentType === 'media' 
                              ? 'bg-[#3B82F6] text-white' 
                              : 'text-[#6B7280] hover:text-[#111827]'
                            }
                          `}
                        >
                          <ImageIcon className="w-4 h-4" />
                          Direct Media
                        </button>
                      </div>
                    </div>

                    {/* Playlist Selection */}
                    {contentType === 'playlist' && (
                      <div>
                        <label className="block text-sm text-[#111827] mb-2">
                          Select Playlist <span className="text-[#DC2626]">*</span>
                        </label>
                        <select
                          value={selectedPlaylist}
                          onChange={(e) => setSelectedPlaylist(e.target.value)}
                          className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-md text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                        >
                          <option value="">Choose a playlist...</option>
                          {MOCK_PLAYLISTS.map(pl => (
                            <option key={pl.id} value={pl.id}>
                              {pl.name} ({formatDuration(pl.duration)} • {pl.itemCount} items)
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Media Selection */}
                    {contentType === 'media' && (
                      <div>
                        <label className="block text-sm text-[#111827] mb-2">
                          Select Media <span className="text-[#DC2626]">*</span>
                        </label>
                        <select
                          value={selectedMedia}
                          onChange={(e) => setSelectedMedia(e.target.value)}
                          className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-md text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                        >
                          <option value="">Choose a media file...</option>
                          {MOCK_MEDIA.map(media => (
                            <option key={media.id} value={media.id}>
                              {media.name} ({formatDuration(media.duration)} • {media.type})
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Plays Per Hour */}
                    {adDuration > 0 && (
                      <div>
                        <label className="block text-sm text-[#111827] mb-2">
                          Plays Per Hour <span className="text-[#DC2626]">*</span>
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="360"
                          value={playsPerHour}
                          onChange={(e) => setPlaysPerHour(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-md text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                          placeholder="e.g., 10"
                        />
                        <p className="text-xs text-[#6B7280] mt-1">
                          How many times your ad should play each hour
                        </p>
                      </div>
                    )}

                    {/* Schedule Calculation */}
                    {adDuration > 0 && playsPerHour > 0 && (
                      <div className="bg-[#F0F9FF] border border-[#BAE6FD] rounded-lg p-4">
                        <div className="flex items-start gap-2 mb-3">
                          <Calculator className="w-4 h-4 text-[#0369A1] mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="text-xs text-[#0369A1] mb-2">Schedule Calculation</div>
                            <div className="text-sm text-[#075985] mb-1">
                              <strong>{formatDuration(adDuration)}</strong> ad × <strong>{playsPerHour}</strong> plays/hr = <strong>{formatDuration(totalSecondsPerHour)}</strong> per hour
                            </div>
                            <div className="text-sm text-[#075985] mb-1">
                              Uses <strong>{percentageOfHour}%</strong> of each selected hour
                            </div>
                            <div className="text-sm text-[#075985]">
                              Total impressions: <strong>{selectedSlots.size * playsPerHour * daysDuration}</strong> plays over {daysDuration} days
                            </div>
                            {totalSecondsPerHour > minAvailableCapacity && (
                              <div className="text-sm text-[#DC2626] mt-2 font-medium">
                                ⚠️ Exceeds available capacity by {formatDuration(totalSecondsPerHour - minAvailableCapacity)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={() => {
                          setShowAddAdForm(false);
                          setSelectedPlaylist('');
                          setSelectedMedia('');
                          setPlaysPerHour(10);
                        }}
                        className="flex-1 px-4 h-11 rounded-md bg-white border border-[#E5E7EB] text-[#111827] hover:bg-[#F9FAFB] transition-colors"
                      >
                        Cancel
                      </button>
                      {isEditMode ? (
                        <button
                          onClick={handleUpdateAd}
                          disabled={!canAddAd}
                          className={`
                            flex-1 px-4 h-11 rounded-md transition-colors
                            ${canAddAd
                              ? 'bg-[#D9480F] text-white hover:bg-[#C1410E]'
                              : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                            }
                          `}
                        >
                          Update Ad
                        </button>
                      ) : (
                        <button
                          onClick={handleAddNewAd}
                          disabled={!canAddAd}
                          className={`
                            flex-1 px-4 h-11 rounded-md transition-colors
                            ${canAddAd
                              ? 'bg-[#D9480F] text-white hover:bg-[#C1410E]'
                              : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                            }
                          `}
                        >
                          Schedule Ad
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* View Existing Slot Details */}
          {viewMode !== 'create' && viewSlotData && (
            <div>
              <div className="mb-4">
                <h4 className="text-sm text-[#111827] mb-1">
                  {DAYS_OF_WEEK[viewSlotData.day]} - {formatHour(viewSlotData.hour)}
                </h4>
                <div className="text-xs text-[#6B7280]">
                  {viewSlotData.slot?.ads.length || 0} paid ad{viewSlotData.slot?.ads.length !== 1 ? 's' : ''} in rotation
                </div>
              </div>

              {/* Rotation Timeline */}
              <div className="space-y-2">
                {/* Paid Ads */}
                {viewSlotData.slot && viewSlotData.slot.ads.length > 0 && viewSlotData.slot.ads.map((ad, index) => (
                  <div key={`${viewSlotData.day}-${viewSlotData.hour}-${ad.id}-${index}`}>
                    <div
                      className={`
                        p-4 rounded-lg border-2 transition-all
                        ${ad.isOwnAd 
                          ? 'border-[#3B82F6] bg-[#EFF6FF]' 
                          : 'border-[#E5E7EB] bg-white'
                        }
                      `}
                    >
                      <div className="flex items-start gap-3">
                        {/* Sequence Number */}
                        <div className={`
                          w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0
                          ${ad.isOwnAd ? 'bg-[#3B82F6] text-white' : 'bg-[#E5E7EB] text-[#6B7280]'}
                        `}>
                          {index + 1}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-sm ${ad.isOwnAd ? 'text-[#3B82F6]' : 'text-[#111827]'}`}>
                              {ad.brandName}
                            </span>
                            {ad.isOwnAd && (
                              <span className="px-2 py-0.5 bg-[#3B82F6] text-white text-[10px] rounded">
                                THIS CAMPAIGN
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            {ad.contentType === 'playlist' ? (
                              <Film className="w-3 h-3 text-[#6B7280]" />
                            ) : (
                              <ImageIcon className="w-3 h-3 text-[#6B7280]" />
                            )}
                            <span className="text-xs text-[#6B7280]">{ad.contentName}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-3 text-xs">
                            <div>
                              <div className="text-[#9CA3AF]">Duration</div>
                              <div className="text-[#111827] font-medium">{formatDuration(ad.adDuration)}</div>
                            </div>
                            <div>
                              <div className="text-[#9CA3AF]">Plays/Hour</div>
                              <div className="text-[#111827] font-medium">{ad.playsPerHour}×</div>
                            </div>
                            <div>
                              <div className="text-[#9CA3AF]">Total Time</div>
                              <div className="text-[#111827] font-medium">{formatDuration(ad.totalSecondsPerHour)}</div>
                            </div>
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                            <div className="flex-1 bg-[#E5E7EB] rounded-full h-1.5 overflow-hidden">
                              <div 
                                className={ad.isOwnAd ? 'bg-[#3B82F6] h-full' : 'bg-[#9CA3AF] h-full'}
                                style={{ width: `${(ad.totalSecondsPerHour / SLOT_CAPACITY_SECONDS) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs text-[#6B7280]">
                              {((ad.totalSecondsPerHour / SLOT_CAPACITY_SECONDS) * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>

                        {ad.isOwnAd && (
                          <>
                            <button
                              onClick={() => handleDelete(viewSlotData.day, viewSlotData.hour, ad.id)}
                              className="p-2 rounded hover:bg-[#FEE2E2] text-[#DC2626] transition-colors"
                              title="Delete your ad"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleTogglePause(viewSlotData.day, viewSlotData.hour, ad.id)}
                              className={`p-2 rounded transition-colors ${
                                ad.paused 
                                  ? 'hover:bg-[#DCFCE7] text-[#16A34A]' 
                                  : 'hover:bg-[#FEF3C7] text-[#F59E0B]'
                              }`}
                              title={ad.paused ? "Resume ad" : "Pause ad"}
                            >
                              {ad.paused ? (
                                <Play className="w-4 h-4" />
                              ) : (
                                <Pause className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              onClick={() => handleStartEdit(ad, viewSlotData.day, viewSlotData.hour)}
                              className="p-2 rounded hover:bg-[#F0F9FF] text-[#0369A1] transition-colors"
                              title="Edit ad"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Arrow between ads */}
                    {index < (viewSlotData.slot?.ads.length || 0) - 1 && (
                      <div className="flex items-center justify-center py-1">
                        <div className="text-xs text-[#9CA3AF]">↓ then rotates to</div>
                      </div>
                    )}
                  </div>
                ))}

                {/* House Ads in Rotation */}
                {(() => {
                  const slot = viewSlotData.slot;
                  const usedCapacity = slot ? slot.ads.reduce((sum, ad) => sum + ad.totalSecondsPerHour, 0) : 0;
                  const houseAdSeconds = SLOT_CAPACITY_SECONDS - usedCapacity;
                  const houseAdDuration = 10; // 10 seconds per house ad
                  const houseAdPlays = Math.floor(houseAdSeconds / houseAdDuration);
                  const houseAdPercentage = ((houseAdSeconds / SLOT_CAPACITY_SECONDS) * 100).toFixed(1);

                  if (houseAdSeconds <= 0) return null;

                  return (
                    <>
                      {/* Arrow before house ads */}
                      {slot && slot.ads.length > 0 && (
                        <div className="flex items-center justify-center py-1">
                          <div className="text-xs text-[#9CA3AF]">↓ then rotates to</div>
                        </div>
                      )}

                      {/* House Ad Card */}
                      <div className="p-4 rounded-lg border-2 border-dashed border-[#E5E7EB] bg-[#FAFAFA]">
                        <div className="flex items-start gap-3">
                          {/* Sequence Number */}
                          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 bg-[#F3F4F6] text-[#9CA3AF]">
                            H
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm text-[#6B7280]">House Ads (Platform Fill)</span>
                              <span className="px-2 py-0.5 bg-[#F3F4F6] text-[#6B7280] text-[10px] rounded">
                                AUTO-FILL
                              </span>
                            </div>
                            <div className="text-xs text-[#9CA3AF] mb-3">
                              "Advertise Here" promotional messages fill unused time
                            </div>
                            
                            <div className="grid grid-cols-3 gap-3 text-xs mb-3">
                              <div>
                                <div className="text-[#9CA3AF]">Duration</div>
                                <div className="text-[#111827] font-medium">{houseAdDuration}s</div>
                              </div>
                              <div>
                                <div className="text-[#9CA3AF]">Plays/Hour</div>
                                <div className="text-[#111827] font-medium">{houseAdPlays}×</div>
                              </div>
                              <div>
                                <div className="text-[#9CA3AF]">Total Time</div>
                                <div className="text-[#111827] font-medium">{formatDuration(houseAdSeconds)}</div>
                              </div>
                            </div>

                            <div className="mb-2 flex items-center gap-2">
                              <div className="flex-1 bg-[#E5E7EB] rounded-full h-1.5 overflow-hidden">
                                <div 
                                  className="bg-[#9CA3AF] h-full"
                                  style={{ width: `${houseAdPercentage}%` }}
                                />
                              </div>
                              <span className="text-xs text-[#6B7280]">
                                {houseAdPercentage}%
                              </span>
                            </div>

                            {/* Preview */}
                            <div className="bg-white border border-[#E5E7EB] rounded p-3 text-center">
                              <div className="text-xs text-[#9CA3AF] mb-1">Preview Message:</div>
                              <div className="text-sm text-[#6B7280] mb-1">📢 "Advertise Your Brand Here"</div>
                              <div className="text-xs text-[#9CA3AF]">Reach thousands daily • Contact: sales@dooh.com</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Loop indicator */}
                      <div className="flex items-center justify-center py-1">
                        <div className="text-xs text-[#9CA3AF]">↻ rotation loops back to start</div>
                      </div>
                    </>
                  );
                })()}

                {/* Empty state */}
                {(!viewSlotData.slot || viewSlotData.slot.ads.length === 0) && (
                  <>
                    {/* 100% House Ads */}
                    <div className="p-4 rounded-lg border-2 border-dashed border-[#E5E7EB] bg-[#FAFAFA]">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 bg-[#F3F4F6] text-[#9CA3AF]">
                          H
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm text-[#6B7280]">House Ads (Platform Fill)</span>
                            <span className="px-2 py-0.5 bg-[#F3F4F6] text-[#6B7280] text-[10px] rounded">
                              100% FILL
                            </span>
                          </div>
                          <div className="text-xs text-[#9CA3AF] mb-3">
                            No paid ads - showing promotional messages continuously
                          </div>
                          
                          <div className="grid grid-cols-3 gap-3 text-xs mb-3">
                            <div>
                              <div className="text-[#9CA3AF]">Duration</div>
                              <div className="text-[#111827] font-medium">10s</div>
                            </div>
                            <div>
                              <div className="text-[#9CA3AF]">Plays/Hour</div>
                              <div className="text-[#111827] font-medium">360×</div>
                            </div>
                            <div>
                              <div className="text-[#9CA3AF]">Total Time</div>
                              <div className="text-[#111827] font-medium">60m</div>
                            </div>
                          </div>

                          <div className="bg-white border border-[#E5E7EB] rounded p-3 text-center">
                            <div className="text-xs text-[#9CA3AF] mb-1">Preview Message:</div>
                            <div className="text-sm text-[#6B7280] mb-1">📢 "Advertise Your Brand Here"</div>
                            <div className="text-xs text-[#9CA3AF]">Reach thousands daily • Contact: sales@dooh.com</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center py-1">
                      <div className="text-xs text-[#9CA3AF]">↻ loops continuously</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}