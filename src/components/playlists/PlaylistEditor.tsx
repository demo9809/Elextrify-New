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
  Filter,
  Plus,
  AlertCircle,
  CheckCircle,
  Shuffle,
  Repeat,
  Upload
} from 'lucide-react';

interface MediaItem {
  id: string;
  name: string;
  type: 'image' | 'video';
  duration: number; // seconds
  thumbnail?: string;
  fileSize: string;
  resolution: string;
  tags: string[];
}

interface TimelineItem extends MediaItem {
  timelineId: string;
  customDuration?: number;
}

interface PlaylistEditorProps {
  playlistId: string | null;
  onClose: () => void;
  onSave: () => void;
}

export function PlaylistEditor({ playlistId, onClose, onSave }: PlaylistEditorProps) {
  const isNewPlaylist = !playlistId;

  // Playlist settings
  const [playlistName, setPlaylistName] = useState(isNewPlaylist ? '' : 'Holiday Campaign 2025');
  const [description, setDescription] = useState(isNewPlaylist ? '' : 'Festive content for December promotions');
  const [tags, setTags] = useState<string[]>(isNewPlaylist ? [] : ['Holiday', 'Seasonal']);
  const [status, setStatus] = useState<'draft' | 'active'>('draft');
  const [loopEnabled, setLoopEnabled] = useState(true);
  const [shuffleEnabled, setShuffleEnabled] = useState(false);
  const [transitionDuration, setTransitionDuration] = useState(1);

  // Timeline
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>(
    isNewPlaylist ? [] : [
      {
        id: 'm1',
        timelineId: 't1',
        name: 'Holiday Promo 1.mp4',
        type: 'video',
        duration: 30,
        fileSize: '24 MB',
        resolution: '1920x1080',
        tags: ['Promo']
      },
      {
        id: 'm2',
        timelineId: 't2',
        name: 'Special Offer.jpg',
        type: 'image',
        duration: 15,
        customDuration: 10,
        fileSize: '2.4 MB',
        resolution: '1920x1080',
        tags: ['Offer']
      }
    ]
  );

  // Media library
  const [mediaLibrary] = useState<MediaItem[]>([
    {
      id: 'm1',
      name: 'Holiday Promo 1.mp4',
      type: 'video',
      duration: 30,
      fileSize: '24 MB',
      resolution: '1920x1080',
      tags: ['Promo', 'Holiday']
    },
    {
      id: 'm2',
      name: 'Special Offer.jpg',
      type: 'image',
      duration: 15,
      fileSize: '2.4 MB',
      resolution: '1920x1080',
      tags: ['Offer']
    },
    {
      id: 'm3',
      name: 'Product Showcase.mp4',
      type: 'video',
      duration: 25,
      fileSize: '18 MB',
      resolution: '1920x1080',
      tags: ['Product']
    },
    {
      id: 'm4',
      name: 'Brand Logo.jpg',
      type: 'image',
      duration: 10,
      fileSize: '1.8 MB',
      resolution: '1920x1080',
      tags: ['Brand']
    },
    {
      id: 'm5',
      name: 'Customer Testimonial.mp4',
      type: 'video',
      duration: 45,
      fileSize: '32 MB',
      resolution: '1920x1080',
      tags: ['Testimonial']
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
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
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
                {status === 'active' ? 'Publish' : 'Save Draft'}
              </button>
            </div>
          </div>
        </div>

        {/* Playlist Settings */}
        <div className="bg-white border-b border-[#E5E7EB] px-8 py-6">
          <div className="grid grid-cols-2 gap-6">
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
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description"
                className="w-full h-10 px-4 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6 mt-4">
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'draft' | 'active')}
                className="w-full h-10 px-4 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent bg-white"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
              </select>
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 h-10 cursor-pointer">
                <input
                  type="checkbox"
                  checked={loopEnabled}
                  onChange={(e) => setLoopEnabled(e.target.checked)}
                  className="w-4 h-4 text-[#D9480F] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#D9480F]"
                />
                <div className="flex items-center gap-2">
                  <Repeat className="w-4 h-4 text-[#6B7280]" />
                  <span className="text-sm text-[#111827]">Loop playlist</span>
                </div>
              </label>
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 h-10 cursor-pointer">
                <input
                  type="checkbox"
                  checked={shuffleEnabled}
                  onChange={(e) => setShuffleEnabled(e.target.checked)}
                  className="w-4 h-4 text-[#D9480F] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#D9480F]"
                />
                <div className="flex items-center gap-2">
                  <Shuffle className="w-4 h-4 text-[#6B7280]" />
                  <span className="text-sm text-[#111827]">Shuffle</span>
                </div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111827] mb-2">
                Transition (sec)
              </label>
              <input
                type="number"
                value={transitionDuration}
                onChange={(e) => setTransitionDuration(Number(e.target.value))}
                min="0"
                max="5"
                className="w-full h-10 px-4 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="flex-1 p-8">
          <div className="mb-4">
            <h3 className="text-[#111827] mb-1">Timeline</h3>
            <p className="text-sm text-[#6B7280]">Drag media from the library to build your sequence</p>
          </div>

          <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDropOnTimeline(e)}
            className="bg-white border-2 border-dashed border-[#E5E7EB] rounded-xl p-6 min-h-[400px]"
          >
            {timelineItems.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <Film className="w-12 h-12 text-[#9CA3AF] mx-auto mb-4" />
                  <p className="text-[#6B7280] mb-2">No items in timeline</p>
                  <p className="text-sm text-[#9CA3AF]">Drag media from the library to start building</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {timelineItems.map((item, index) => (
                  <div
                    key={item.timelineId}
                    draggable
                    onDragStart={() => handleDragStartFromTimeline(index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDropOnTimeline(e, index)}
                    className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4 flex items-center gap-4 hover:border-[#D9480F] transition-colors cursor-move group"
                  >
                    <GripVertical className="w-5 h-5 text-[#9CA3AF] flex-shrink-0" />
                    
                    <div className="w-8 h-8 bg-[#E5E7EB] rounded flex items-center justify-center flex-shrink-0">
                      {item.type === 'video' ? (
                        <Film className="w-4 h-4 text-[#6B7280]" />
                      ) : (
                        <ImageIcon className="w-4 h-4 text-[#6B7280]" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#111827] truncate">{item.name}</p>
                      <p className="text-xs text-[#9CA3AF]">{item.resolution} • {item.fileSize}</p>
                    </div>

                    <div className="flex items-center gap-2">
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

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleDuplicateItem(item.timelineId)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-white rounded transition-colors"
                      >
                        <Copy className="w-4 h-4 text-[#6B7280]" />
                      </button>
                      <button
                        onClick={() => handleRemoveFromTimeline(item.timelineId)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-white rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-[#DC2626]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Validation */}
          {!isValid && (
            <div className="mt-4 bg-[#FEF2F2] border border-[#FEE2E2] rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[#DC2626]">Validation Required</p>
                <ul className="mt-1 text-sm text-[#DC2626] list-disc list-inside">
                  {!playlistName.trim() && <li>Playlist name is required</li>}
                  {timelineItems.length === 0 && <li>Add at least one media item</li>}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Media Library Sidebar */}
      <div className="w-[380px] bg-white border-l border-[#E5E7EB] flex flex-col">
        {/* Library Header */}
        <div className="border-b border-[#E5E7EB] p-6">
          <h3 className="text-[#111827] mb-1">Media Library</h3>
          <p className="text-sm text-[#6B7280]">Drag items to timeline</p>
        </div>

        {/* Search & Filter */}
        <div className="border-b border-[#E5E7EB] p-4 space-y-3">
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

          <div className="flex gap-2">
            <button
              onClick={() => setMediaTypeFilter('all')}
              className={`flex-1 h-8 px-3 rounded-lg text-xs font-medium transition-colors ${
                mediaTypeFilter === 'all'
                  ? 'bg-[#D9480F] text-white'
                  : 'bg-[#F9FAFB] text-[#6B7280] hover:bg-[#F3F4F6]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setMediaTypeFilter('video')}
              className={`flex-1 h-8 px-3 rounded-lg text-xs font-medium transition-colors ${
                mediaTypeFilter === 'video'
                  ? 'bg-[#D9480F] text-white'
                  : 'bg-[#F9FAFB] text-[#6B7280] hover:bg-[#F3F4F6]'
              }`}
            >
              Videos
            </button>
            <button
              onClick={() => setMediaTypeFilter('image')}
              className={`flex-1 h-8 px-3 rounded-lg text-xs font-medium transition-colors ${
                mediaTypeFilter === 'image'
                  ? 'bg-[#D9480F] text-white'
                  : 'bg-[#F9FAFB] text-[#6B7280] hover:bg-[#F3F4F6]'
              }`}
            >
              Images
            </button>
          </div>

          <button className="w-full h-9 bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-[#F3F4F6] transition-colors flex items-center justify-center gap-2 text-sm font-medium">
            <Upload className="w-4 h-4" />
            Upload Media
          </button>
        </div>

        {/* Media Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={() => handleDragStartFromLibrary(item)}
              className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3 cursor-move hover:border-[#D9480F] hover:bg-white transition-all"
            >
              <div className="flex items-start gap-3 mb-2">
                <div className="w-10 h-10 bg-[#E5E7EB] rounded flex items-center justify-center flex-shrink-0">
                  {item.type === 'video' ? (
                    <Film className="w-5 h-5 text-[#6B7280]" />
                  ) : (
                    <ImageIcon className="w-5 h-5 text-[#6B7280]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#111827] truncate">{item.name}</p>
                  <p className="text-xs text-[#9CA3AF] mt-0.5">{item.resolution}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-[#6B7280]">
                <span>{item.fileSize}</span>
                <span>{item.duration}s</span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="border-t border-[#E5E7EB] p-6 bg-[#F9FAFB]">
          <h4 className="text-sm font-medium text-[#111827] mb-4">Playlist Summary</h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6B7280]">Total Items</span>
              <span className="text-sm font-semibold text-[#111827]">{totalItems}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6B7280]">Total Duration</span>
              <span className="text-sm font-semibold text-[#111827]">{formatDuration(totalDuration)}</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB]">
              <span className="text-sm text-[#6B7280]">Status</span>
              {isValid ? (
                <div className="flex items-center gap-1.5 text-[#16A34A]">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Ready</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-[#DC2626]">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Invalid</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
