import { useState } from 'react';
import { 
  X,
  Save,
  Play,
  ArrowLeft,
  GripVertical,
  Trash2,
  Clock,
  Film,
  Image as ImageIcon,
  Search,
  Plus,
  AlertCircle,
  CheckCircle,
  Shuffle,
  Repeat,
  Upload,
  Video,
  MoreVertical
} from 'lucide-react';

interface MediaItem {
  id: string;
  name: string;
  type: 'image' | 'video';
  duration: number;
  thumbnail?: string;
  fileSize: string;
  resolution: string;
}

interface TimelineItem extends MediaItem {
  timelineId: string;
  customDuration?: number;
}

interface PlaylistEditorRevisedProps {
  playlistId: string | null;
  onClose: () => void;
  onSave: () => void;
}

export function PlaylistEditorRevised({ playlistId, onClose, onSave }: PlaylistEditorRevisedProps) {
  const isNewPlaylist = !playlistId;

  // Playlist settings
  const [playlistName, setPlaylistName] = useState(isNewPlaylist ? '' : 'Holiday Campaign 2025');
  const [description, setDescription] = useState(isNewPlaylist ? '' : 'Festive content for December promotions');
  const [status, setStatus] = useState<'draft' | 'active'>('draft');
  const [loopEnabled, setLoopEnabled] = useState(true);
  const [shuffleEnabled, setShuffleEnabled] = useState(false);
  const [transitionDuration, setTransitionDuration] = useState(1);

  // Timeline - Start with some items for demo
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>(
    isNewPlaylist ? [] : [
      {
        id: 'm1',
        timelineId: 't1',
        name: 'Festival Banner 1',
        type: 'image',
        duration: 8,
        fileSize: '2.4 MB',
        resolution: '1920x1080'
      },
      {
        id: 'm2',
        timelineId: 't2',
        name: 'Product Showcase',
        type: 'video',
        duration: 15,
        fileSize: '18 MB',
        resolution: '1920x1080'
      },
      {
        id: 'm3',
        timelineId: 't3',
        name: 'Discount Offer',
        type: 'image',
        duration: 10,
        fileSize: '1.8 MB',
        resolution: '1920x1080'
      }
    ]
  );

  // Media library
  const [mediaLibrary] = useState<MediaItem[]>([
    {
      id: 'm1',
      name: 'Festival Banner 1',
      type: 'image',
      duration: 8,
      fileSize: '2.4 MB',
      resolution: '1920x1080'
    },
    {
      id: 'm2',
      name: 'Product Showcase',
      type: 'video',
      duration: 15,
      fileSize: '18 MB',
      resolution: '1920x1080'
    },
    {
      id: 'm3',
      name: 'Discount Offer',
      type: 'image',
      duration: 10,
      fileSize: '1.8 MB',
      resolution: '1920x1080'
    },
    {
      id: 'm4',
      name: 'Brand Story Video',
      type: 'video',
      duration: 30,
      fileSize: '25 MB',
      resolution: '1920x1080'
    },
    {
      id: 'm5',
      name: 'Store Location Map',
      type: 'image',
      duration: 12,
      fileSize: '3.2 MB',
      resolution: '1920x1080'
    },
    {
      id: 'm6',
      name: 'Customer Testimonial',
      type: 'video',
      duration: 20,
      fileSize: '22 MB',
      resolution: '1920x1080'
    },
    {
      id: 'm7',
      name: 'New Product Teaser',
      type: 'video',
      duration: 25,
      fileSize: '20 MB',
      resolution: '1920x1080'
    },
    {
      id: 'm8',
      name: 'Seasonal Greeting',
      type: 'image',
      duration: 10,
      fileSize: '2.8 MB',
      resolution: '1920x1080'
    }
  ]);

  const [draggedItem, setDraggedItem] = useState<MediaItem | null>(null);
  const [draggedTimelineIndex, setDraggedTimelineIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mediaTypeFilter, setMediaTypeFilter] = useState<'all' | 'image' | 'video'>('all');

  // Calculations
  const totalDuration = timelineItems.reduce((sum, item) => sum + (item.customDuration || item.duration), 0);
  const totalItems = timelineItems.length;

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Validation
  const isValid = playlistName.trim() !== '' && timelineItems.length > 0;

  // Drag and Drop Handlers
  const handleDragStartFromLibrary = (item: MediaItem, e: React.DragEvent) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragStartFromTimeline = (index: number, e: React.DragEvent) => {
    setDraggedTimelineIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = draggedItem ? 'copy' : 'move';
  };

  const handleDropOnTimeline = (e: React.DragEvent, dropIndex?: number) => {
    e.preventDefault();
    
    if (draggedItem) {
      // Add from library
      const newItem: TimelineItem = {
        ...draggedItem,
        timelineId: `t${Date.now()}`
      };
      
      if (dropIndex !== undefined) {
        const newTimeline = [...timelineItems];
        newTimeline.splice(dropIndex, 0, newItem);
        setTimelineItems(newTimeline);
      } else {
        setTimelineItems([...timelineItems, newItem]);
      }
    } else if (draggedTimelineIndex !== null && dropIndex !== undefined) {
      // Reorder within timeline
      const newTimeline = [...timelineItems];
      const [removed] = newTimeline.splice(draggedTimelineIndex, 1);
      newTimeline.splice(dropIndex, 0, removed);
      setTimelineItems(newTimeline);
    }
    
    setDraggedItem(null);
    setDraggedTimelineIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDraggedTimelineIndex(null);
  };

  const handleRemoveFromTimeline = (timelineId: string) => {
    setTimelineItems(timelineItems.filter(item => item.timelineId !== timelineId));
  };

  const handleUpdateDuration = (timelineId: string, duration: number) => {
    setTimelineItems(timelineItems.map(item => 
      item.timelineId === timelineId ? { ...item, customDuration: duration } : item
    ));
  };

  const handleSave = () => {
    if (isValid) {
      onSave();
    }
  };

  // Filter media
  const filteredMedia = mediaLibrary.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = mediaTypeFilter === 'all' || item.type === mediaTypeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-8 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center hover:bg-[#F9FAFB] rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#6B7280]" />
            </button>
            <div>
              <h2 className="text-[#111827]">{isNewPlaylist ? 'New Playlist' : 'Edit Playlist'}</h2>
              <p className="text-sm text-[#6B7280]">Build your content sequence</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 h-10 bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-[#F3F4F6] transition-colors flex items-center gap-2 text-sm font-medium">
              <Play className="w-4 h-4" />
              Preview
            </button>
            <button
              onClick={handleSave}
              disabled={!isValid}
              className="px-6 h-10 bg-[#D9480F] text-white rounded-lg hover:bg-[#C43F0D] transition-colors flex items-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              {status === 'active' ? 'Update' : 'Save Draft'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - 2 Column Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Form & Settings */}
        <div className="w-[380px] bg-white border-r border-[#E5E7EB] flex-shrink-0 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Playlist Details */}
            <div>
              <h3 className="text-sm font-medium text-[#111827] mb-4">Playlist Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#6B7280] mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                    placeholder="Enter playlist name"
                    className="w-full h-10 px-3 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#6B7280] mb-2">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description"
                    rows={3}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Transition Options */}
            <div>
              <h3 className="text-sm font-medium text-[#111827] mb-4">Transition Options</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-[#6B7280] mb-2">
                    Gap between videos (seconds)
                  </label>
                  <input
                    type="number"
                    value={transitionDuration}
                    onChange={(e) => setTransitionDuration(Number(e.target.value))}
                    min="0"
                    max="10"
                    className="w-full h-9 px-3 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Playback Options */}
            <div>
              <h3 className="text-sm font-medium text-[#111827] mb-4">Playback Options</h3>
              
              <div className="space-y-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-[#111827]">Sync Playback</span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={loopEnabled}
                      onChange={(e) => setLoopEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#E5E7EB] rounded-full peer peer-checked:bg-[#D9480F] peer-focus:ring-2 peer-focus:ring-[#D9480F] transition-colors"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                  </div>
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-[#111827]">Random Playback</span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={shuffleEnabled}
                      onChange={(e) => setShuffleEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#E5E7EB] rounded-full peer peer-checked:bg-[#D9480F] peer-focus:ring-2 peer-focus:ring-[#D9480F] transition-colors"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                  </div>
                </label>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="pt-6 border-t border-[#E5E7EB]">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B7280]">Total Items</span>
                  <span className="text-sm font-semibold text-[#111827]">{totalItems}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B7280]">Total Duration</span>
                  <span className="text-sm font-semibold text-[#111827]">{formatDuration(totalDuration)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B7280]">Status</span>
                  {isValid ? (
                    <div className="flex items-center gap-1.5 text-[#16A34A]">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Ready</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-[#F59E0B]">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Incomplete</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Validation Errors */}
              {!isValid && (
                <div className="mt-4 bg-[#FEF2F2] border border-[#FEE2E2] rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-[#DC2626] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-[#DC2626] mb-1">Required</p>
                      <ul className="text-xs text-[#DC2626] space-y-1">
                        {!playlistName.trim() && <li>• Playlist name</li>}
                        {timelineItems.length === 0 && <li>• At least 1 media item</li>}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Timeline + Library */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Timeline Section */}
          <div className="bg-white border-b border-[#E5E7EB] p-6 flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-medium text-[#111827]">Playlist Timeline</h3>
                <p className="text-xs text-[#6B7280] mt-1">Drag to reorder • Click duration to edit playback time</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="px-3 h-8 bg-[#D9480F] text-white rounded-lg hover:bg-[#C43F0D] transition-colors flex items-center gap-2 text-sm font-medium">
                  <Upload className="w-4 h-4" />
                  Upload Media
                </button>
                <div className="flex items-center gap-2 px-3 h-8 bg-[#F9FAFB] rounded-lg">
                  <Clock className="w-4 h-4 text-[#6B7280]" />
                  <span className="text-sm text-[#6B7280]">
                    Total: <span className="font-semibold text-[#111827]">{formatDuration(totalDuration)}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Horizontal Timeline */}
            <div className="relative">
              <div 
                onDragOver={handleDragOver}
                onDrop={(e) => handleDropOnTimeline(e)}
                className="flex gap-4 overflow-x-auto pb-4 min-h-[220px]"
                style={{ scrollbarWidth: 'thin' }}
              >
                {/* Existing Timeline Items */}
                {timelineItems.map((item, index) => (
                  <TimelineCard
                    key={item.timelineId}
                    item={item}
                    index={index}
                    onDragStart={handleDragStartFromTimeline}
                    onDragOver={handleDragOver}
                    onDrop={handleDropOnTimeline}
                    onDragEnd={handleDragEnd}
                    onRemove={handleRemoveFromTimeline}
                    onUpdateDuration={handleUpdateDuration}
                  />
                ))}

                {/* Empty Placeholder Slots - Always show at least 5 total slots */}
                {Array.from({ length: Math.max(5 - timelineItems.length, 2) }).map((_, index) => (
                  <div
                    key={`empty-${index}`}
                    className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-3 flex-shrink-0 w-[180px] bg-white hover:border-[#D9480F] hover:bg-[#FFF7ED] transition-all"
                  >
                    <div className="w-full aspect-video bg-[#F9FAFB] rounded-lg mb-3 flex items-center justify-center border border-dashed border-[#E5E7EB]">
                      <Plus className="w-10 h-10 text-[#D1D5DB]" />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-medium text-[#9CA3AF] mb-1">Slot {timelineItems.length + index + 1}</p>
                      <p className="text-xs text-[#D1D5DB]">Drag media here</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Library Section */}
          <div className="flex-1 bg-[#F9FAFB] overflow-hidden flex flex-col">
            <div className="bg-white border-b border-[#E5E7EB] px-6 py-4 flex-shrink-0">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-sm font-medium text-[#111827]">Library</h3>
                
                <div className="flex items-center gap-3 flex-1 max-w-2xl">
                  {/* Tab Filters */}
                  <div className="flex gap-1 bg-[#F9FAFB] rounded-lg p-1">
                    <button
                      onClick={() => setMediaTypeFilter('all')}
                      className={`px-3 h-7 rounded text-xs font-medium transition-colors ${
                        mediaTypeFilter === 'all'
                          ? 'bg-white text-[#111827] shadow-sm'
                          : 'text-[#6B7280] hover:text-[#111827]'
                      }`}
                    >
                      All Media
                    </button>
                    <button
                      onClick={() => setMediaTypeFilter('image')}
                      className={`px-3 h-7 rounded text-xs font-medium transition-colors ${
                        mediaTypeFilter === 'image'
                          ? 'bg-white text-[#111827] shadow-sm'
                          : 'text-[#6B7280] hover:text-[#111827]'
                      }`}
                    >
                      Images
                    </button>
                    <button
                      onClick={() => setMediaTypeFilter('video')}
                      className={`px-3 h-7 rounded text-xs font-medium transition-colors ${
                        mediaTypeFilter === 'video'
                          ? 'bg-white text-[#111827] shadow-sm'
                          : 'text-[#6B7280] hover:text-[#111827]'
                      }`}
                    >
                      Videos
                    </button>
                  </div>

                  {/* Search */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-8 pl-9 pr-3 border border-[#E5E7EB] rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                    />
                  </div>
                </div>

                <span className="text-xs text-[#6B7280]">{filteredMedia.length} items</span>
              </div>
            </div>

            {/* Media Grid */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-6 gap-4">
                {filteredMedia.map((item) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStartFromLibrary(item, e)}
                    onDragEnd={handleDragEnd}
                    className="bg-white border border-[#E5E7EB] rounded-lg p-3 cursor-grab hover:border-[#D9480F] hover:shadow-md transition-all active:cursor-grabbing"
                  >
                    <div className="w-full aspect-video bg-[#F9FAFB] rounded mb-2 flex items-center justify-center">
                      {item.type === 'video' ? (
                        <Video className="w-6 h-6 text-[#6B7280]" />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-[#6B7280]" />
                      )}
                    </div>
                    <p className="text-xs font-medium text-[#111827] truncate mb-1" title={item.name}>
                      {item.name}
                    </p>
                    <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
                      <span>{item.fileSize}</span>
                      <span>{item.duration}s</span>
                    </div>
                  </div>
                ))}
              </div>

              {filteredMedia.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Film className="w-12 h-12 text-[#9CA3AF] mx-auto mb-4" />
                    <p className="text-sm text-[#6B7280]">No media found</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Timeline Card Component
interface TimelineCardProps {
  item: TimelineItem;
  index: number;
  onDragStart: (index: number, e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, dropIndex?: number) => void;
  onDragEnd: () => void;
  onRemove: (timelineId: string) => void;
  onUpdateDuration: (timelineId: string, duration: number) => void;
}

function TimelineCard({ item, index, onDragStart, onDragOver, onDrop, onDragEnd, onRemove, onUpdateDuration }: TimelineCardProps) {
  const [isEditingDuration, setIsEditingDuration] = useState(false);
  const currentDuration = item.customDuration || item.duration;
  const hasCustomDuration = item.customDuration !== undefined && item.customDuration !== item.duration;

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(index, e)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, index)}
      onDragEnd={onDragEnd}
      className="bg-white border-2 border-[#E5E7EB] rounded-xl p-3 flex-shrink-0 w-[180px] hover:border-[#D9480F] hover:shadow-lg transition-all cursor-move group relative"
    >
      {/* Thumbnail */}
      <div className="w-full aspect-video bg-gradient-to-br from-[#F9FAFB] to-[#E5E7EB] rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
        {item.type === 'video' ? (
          <Video className="w-10 h-10 text-[#6B7280]" />
        ) : (
          <ImageIcon className="w-10 h-10 text-[#6B7280]" />
        )}
        {/* Type Badge */}
        <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 text-white rounded text-xs font-medium">
          {item.type === 'video' ? 'Video' : 'Image'}
        </div>
        {/* Remove Button - Inside card, top right */}
        <button
          onClick={() => onRemove(item.timelineId)}
          className="absolute top-2 right-2 w-6 h-6 bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#6B7280] hover:text-[#DC2626] rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
          title="Remove from timeline"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Info */}
      <p className="text-xs font-semibold text-[#111827] truncate mb-1" title={item.name}>
        {item.name}
      </p>
      <p className="text-xs text-[#9CA3AF] mb-3">{item.fileSize}</p>

      {/* Duration Editor */}
      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-2">
        <label className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-[#6B7280]">Display Time</span>
          {hasCustomDuration && (
            <span className="text-xs text-[#D9480F] font-medium">Custom</span>
          )}
        </label>
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-1.5 bg-white border border-[#E5E7EB] rounded-lg px-2 h-8 hover:border-[#D9480F] transition-colors">
            <Clock className="w-3.5 h-3.5 text-[#6B7280] flex-shrink-0" />
            <input
              type="number"
              value={currentDuration}
              onChange={(e) => {
                const newDuration = Number(e.target.value);
                if (newDuration > 0) {
                  onUpdateDuration(item.timelineId, newDuration);
                }
              }}
              onFocus={() => setIsEditingDuration(true)}
              onBlur={() => setIsEditingDuration(false)}
              className="flex-1 text-sm font-semibold text-[#111827] text-center focus:outline-none bg-transparent"
              min="1"
              max="300"
              onClick={(e) => {
                e.stopPropagation();
                (e.target as HTMLInputElement).select();
              }}
            />
            <span className="text-xs font-medium text-[#6B7280] flex-shrink-0">sec</span>
          </div>
        </div>
        {item.duration !== currentDuration && (
          <p className="text-xs text-[#9CA3AF] mt-1">
            Original: {item.duration}s
          </p>
        )}
      </div>
    </div>
  );
}