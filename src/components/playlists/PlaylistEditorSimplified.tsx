import { useState } from 'react';
import { 
  X,
  Save,
  Play,
  ArrowLeft,
  GripVertical,
  Trash2,
  Copy,
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
  ChevronDown,
  ChevronUp
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

interface PlaylistEditorSimplifiedProps {
  playlistId: string | null;
  onClose: () => void;
  onSave: () => void;
}

export function PlaylistEditorSimplified({ playlistId, onClose, onSave }: PlaylistEditorSimplifiedProps) {
  const isNewPlaylist = !playlistId;

  // Playlist settings
  const [playlistName, setPlaylistName] = useState(isNewPlaylist ? '' : 'Holiday Campaign 2025');
  const [description, setDescription] = useState(isNewPlaylist ? '' : 'Festive content for December promotions');
  const [status, setStatus] = useState<'draft' | 'active'>('draft');
  const [loopEnabled, setLoopEnabled] = useState(true);
  const [shuffleEnabled, setShuffleEnabled] = useState(false);

  // Timeline
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
    }
  ]);

  const [draggedItem, setDraggedItem] = useState<MediaItem | null>(null);
  const [draggedTimelineIndex, setDraggedTimelineIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mediaTypeFilter, setMediaTypeFilter] = useState<'all' | 'image' | 'video'>('all');
  const [showMediaLibrary, setShowMediaLibrary] = useState(true);

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
  const handleDragStartFromLibrary = (item: MediaItem) => {
    setDraggedItem(item);
  };

  const handleDragStartFromTimeline = (index: number) => {
    setDraggedTimelineIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
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

  const handleRemoveFromTimeline = (timelineId: string) => {
    setTimelineItems(timelineItems.filter(item => item.timelineId !== timelineId));
  };

  const handleDuplicateItem = (timelineId: string) => {
    const itemIndex = timelineItems.findIndex(item => item.timelineId === timelineId);
    if (itemIndex !== -1) {
      const original = timelineItems[itemIndex];
      const duplicate: TimelineItem = {
        ...original,
        timelineId: `t${Date.now()}`
      };
      const newTimeline = [...timelineItems];
      newTimeline.splice(itemIndex + 1, 0, duplicate);
      setTimelineItems(newTimeline);
    }
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
    const notInTimeline = !timelineItems.some(ti => ti.id === item.id);
    return matchesSearch && matchesType && notInTimeline;
  });

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center hover:bg-[#F9FAFB] rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#6B7280]" />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-[#111827]">{isNewPlaylist ? 'New Playlist' : playlistName}</h2>
                {!isNewPlaylist && (
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${
                    status === 'active' 
                      ? 'bg-[#DCFCE7] text-[#16A34A] border-[#BBF7D0]' 
                      : 'bg-[#FFF7ED] text-[#D9480F] border-[#FED7AA]'
                  }`}>
                    {status === 'active' ? 'Active' : 'Draft'}
                  </span>
                )}
              </div>
              <p className="text-sm text-[#6B7280] mt-0.5">
                {isValid ? '✓ Ready to save' : 'Add playlist details and media'}
              </p>
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

      {/* Content Area */}
      <div className="p-8">
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column: Details */}
          <div className="col-span-2 space-y-6">
            {/* Playlist Details Card */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
              <h3 className="text-[#111827] mb-4">Playlist Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Playlist Name *
                  </label>
                  <input
                    type="text"
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                    placeholder="Enter playlist name"
                    className="w-full h-10 px-4 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Description (Optional)
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of this playlist"
                    className="w-full h-10 px-4 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Timeline Card */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-[#111827] mb-1">Timeline</h3>
                  <p className="text-sm text-[#6B7280]">
                    {totalItems} items • {formatDuration(totalDuration)} total
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 text-sm text-[#6B7280] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={loopEnabled}
                      onChange={(e) => setLoopEnabled(e.target.checked)}
                      className="w-4 h-4 text-[#D9480F] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#D9480F]"
                    />
                    <Repeat className="w-4 h-4" />
                    Loop
                  </label>
                  <label className="flex items-center gap-2 text-sm text-[#6B7280] cursor-pointer ml-4">
                    <input
                      type="checkbox"
                      checked={shuffleEnabled}
                      onChange={(e) => setShuffleEnabled(e.target.checked)}
                      className="w-4 h-4 text-[#D9480F] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#D9480F]"
                    />
                    <Shuffle className="w-4 h-4" />
                    Shuffle
                  </label>
                </div>
              </div>

              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDropOnTimeline(e)}
                className="space-y-3 min-h-[300px]"
              >
                {timelineItems.length === 0 ? (
                  <div className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-12 text-center">
                    <Film className="w-12 h-12 text-[#9CA3AF] mx-auto mb-4" />
                    <p className="text-[#6B7280] mb-2">No items in timeline</p>
                    <p className="text-sm text-[#9CA3AF]">Drag media from below to start building</p>
                  </div>
                ) : (
                  timelineItems.map((item, index) => (
                    <div
                      key={item.timelineId}
                      draggable
                      onDragStart={() => handleDragStartFromTimeline(index)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDropOnTimeline(e, index)}
                      className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4 flex items-center gap-4 hover:border-[#D9480F] transition-colors cursor-move group"
                    >
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <GripVertical className="w-5 h-5 text-[#9CA3AF]" />
                        <div className="w-8 h-8 bg-white border border-[#E5E7EB] rounded flex items-center justify-center">
                          <span className="text-xs font-semibold text-[#6B7280]">{index + 1}</span>
                        </div>
                      </div>

                      <div className="w-12 h-12 bg-[#E5E7EB] rounded flex items-center justify-center flex-shrink-0">
                        {item.type === 'video' ? (
                          <Video className="w-6 h-6 text-[#6B7280]" />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-[#6B7280]" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-[#111827] truncate">{item.name}</p>
                        <p className="text-xs text-[#9CA3AF]">{item.resolution} • {item.fileSize}</p>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Clock className="w-4 h-4 text-[#6B7280]" />
                        <input
                          type="number"
                          value={item.customDuration || item.duration}
                          onChange={(e) => handleUpdateDuration(item.timelineId, Number(e.target.value))}
                          className="w-16 h-8 px-2 border border-[#E5E7EB] rounded text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                          min="1"
                        />
                        <span className="text-sm text-[#6B7280]">sec</span>
                      </div>

                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                        <button
                          onClick={() => handleDuplicateItem(item.timelineId)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-white rounded transition-colors"
                          title="Duplicate"
                        >
                          <Copy className="w-4 h-4 text-[#6B7280]" />
                        </button>
                        <button
                          onClick={() => handleRemoveFromTimeline(item.timelineId)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-white rounded transition-colors"
                          title="Remove"
                        >
                          <Trash2 className="w-4 h-4 text-[#DC2626]" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Media Library Card */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl">
              <button
                onClick={() => setShowMediaLibrary(!showMediaLibrary)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <div>
                  <h3 className="text-[#111827] mb-1">Media Library</h3>
                  <p className="text-sm text-[#6B7280]">{filteredMedia.length} items available</p>
                </div>
                {showMediaLibrary ? (
                  <ChevronUp className="w-5 h-5 text-[#6B7280]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#6B7280]" />
                )}
              </button>

              {showMediaLibrary && (
                <>
                  <div className="border-t border-[#E5E7EB] px-6 py-4 space-y-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                      <input
                        type="text"
                        placeholder="Search media..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-9 pl-9 pr-3 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setMediaTypeFilter('all')}
                          className={`px-3 h-8 rounded-lg text-xs font-medium transition-colors ${
                            mediaTypeFilter === 'all'
                              ? 'bg-[#D9480F] text-white'
                              : 'bg-[#F9FAFB] text-[#6B7280] hover:bg-[#F3F4F6]'
                          }`}
                        >
                          All
                        </button>
                        <button
                          onClick={() => setMediaTypeFilter('video')}
                          className={`px-3 h-8 rounded-lg text-xs font-medium transition-colors ${
                            mediaTypeFilter === 'video'
                              ? 'bg-[#D9480F] text-white'
                              : 'bg-[#F9FAFB] text-[#6B7280] hover:bg-[#F3F4F6]'
                          }`}
                        >
                          Videos
                        </button>
                        <button
                          onClick={() => setMediaTypeFilter('image')}
                          className={`px-3 h-8 rounded-lg text-xs font-medium transition-colors ${
                            mediaTypeFilter === 'image'
                              ? 'bg-[#D9480F] text-white'
                              : 'bg-[#F9FAFB] text-[#6B7280] hover:bg-[#F3F4F6]'
                          }`}
                        >
                          Images
                        </button>
                      </div>

                      <button className="px-3 h-8 bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-[#F3F4F6] transition-colors flex items-center gap-2 text-xs font-medium">
                        <Upload className="w-3.5 h-3.5" />
                        Upload
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-[#E5E7EB] p-6">
                    <div className="grid grid-cols-3 gap-3">
                      {filteredMedia.map((item) => (
                        <div
                          key={item.id}
                          draggable
                          onDragStart={() => handleDragStartFromLibrary(item)}
                          className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3 cursor-move hover:border-[#D9480F] hover:bg-white transition-all"
                        >
                          <div className="w-full aspect-video bg-[#E5E7EB] rounded mb-2 flex items-center justify-center">
                            {item.type === 'video' ? (
                              <Video className="w-8 h-8 text-[#6B7280]" />
                            ) : (
                              <ImageIcon className="w-8 h-8 text-[#6B7280]" />
                            )}
                          </div>
                          <p className="text-sm font-medium text-[#111827] truncate mb-1">{item.name}</p>
                          <div className="flex items-center justify-between text-xs text-[#6B7280]">
                            <span>{item.fileSize}</span>
                            <span>{item.duration}s</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {filteredMedia.length === 0 && (
                      <div className="text-center py-8">
                        <Film className="w-10 h-10 text-[#9CA3AF] mx-auto mb-3" />
                        <p className="text-sm text-[#6B7280]">No media found</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Summary */}
          <div className="space-y-6">
            {/* Summary Card */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 sticky top-8">
              <h3 className="text-[#111827] mb-4">Summary</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-[#F3F4F6]">
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

                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B7280]">Total Items</span>
                  <span className="text-sm font-semibold text-[#111827]">{totalItems}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B7280]">Total Duration</span>
                  <span className="text-sm font-semibold text-[#111827]">{formatDuration(totalDuration)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B7280]">Images</span>
                  <span className="text-sm font-semibold text-[#111827]">
                    {timelineItems.filter(i => i.type === 'image').length}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B7280]">Videos</span>
                  <span className="text-sm font-semibold text-[#111827]">
                    {timelineItems.filter(i => i.type === 'video').length}
                  </span>
                </div>
              </div>

              {/* Playback Settings */}
              <div className="mt-6 pt-6 border-t border-[#E5E7EB]">
                <h4 className="text-sm font-medium text-[#111827] mb-3">Playback Settings</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6B7280]">Loop Playlist</span>
                    <span className="font-medium text-[#111827]">{loopEnabled ? 'On' : 'Off'}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6B7280]">Shuffle Mode</span>
                    <span className="font-medium text-[#111827]">{shuffleEnabled ? 'On' : 'Off'}</span>
                  </div>
                </div>
              </div>

              {/* Validation Errors */}
              {!isValid && (
                <div className="mt-6 pt-6 border-t border-[#E5E7EB]">
                  <div className="bg-[#FEF2F2] border border-[#FEE2E2] rounded-lg p-3">
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
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
