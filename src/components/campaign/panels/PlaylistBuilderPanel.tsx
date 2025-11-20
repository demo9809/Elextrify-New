import { useState } from 'react';
import { X, Plus, Trash2, GripVertical, Film } from 'lucide-react';

interface PlaylistBuilderPanelProps {
  isOpen: boolean;
  onClose: () => void;
  clientId: string;
  clientName: string;
  onSave: (playlistId: string, playlistName: string) => void;
}

const MOCK_MEDIA = [
  { id: 'm1', name: 'Product Shot 1.jpg', type: 'image', duration: 10 },
  { id: 'm2', name: 'Holiday Video.mp4', type: 'video', duration: 15 },
  { id: 'm3', name: 'Brand Logo.png', type: 'image', duration: 5 },
];

interface PlaylistItem {
  id: string;
  mediaId: string;
  mediaName: string;
  duration: number;
}

export function PlaylistBuilderPanel({ isOpen, onClose, clientId, clientName, onSave }: PlaylistBuilderPanelProps) {
  const [playlistName, setPlaylistName] = useState('');
  const [items, setItems] = useState<PlaylistItem[]>([]);
  const [showMediaPicker, setShowMediaPicker] = useState(false);

  const handleAddMedia = (media: typeof MOCK_MEDIA[0]) => {
    const newItem: PlaylistItem = {
      id: `item-${Date.now()}`,
      mediaId: media.id,
      mediaName: media.name,
      duration: media.duration,
    };
    setItems([...items, newItem]);
    setShowMediaPicker(false);
  };

  const handleRemoveItem = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const handleSave = () => {
    if (!playlistName.trim() || items.length === 0) return;
    
    const playlistId = `pl-${Date.now()}`;
    onSave(playlistId, playlistName);
    
    // Reset
    setPlaylistName('');
    setItems([]);
  };

  const totalDuration = items.reduce((acc, item) => acc + item.duration, 0);
  const canSave = playlistName.trim() && items.length > 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-end">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Panel - 80% width */}
      <div className="relative w-[80%] max-w-[1152px] h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#E5E7EB]">
          <div>
            <h3 className="text-[#111827] mb-1">Create Playlist</h3>
            <p className="text-sm text-[#6B7280]">
              Build a playlist for <span className="text-[#D9480F]">{clientName}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#F9FAFB] transition-colors"
          >
            <X className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[800px]">
            {/* Playlist Name */}
            <div className="mb-6">
              <label className="block text-sm text-[#111827] mb-2">
                Playlist Name <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="text"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                placeholder="e.g., Holiday Campaign 2025"
                className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-md text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              />
            </div>

            {/* Playlist Items */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm text-[#111827]">
                  Playlist Items <span className="text-[#DC2626]">*</span>
                </label>
                <button
                  onClick={() => setShowMediaPicker(!showMediaPicker)}
                  className="flex items-center gap-2 px-4 h-9 bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Media
                </button>
              </div>

              {/* Media Picker Dropdown */}
              {showMediaPicker && (
                <div className="mb-4 p-4 bg-white border border-[#E5E7EB] rounded-lg">
                  <p className="text-sm text-[#6B7280] mb-3">Select media to add:</p>
                  <div className="space-y-2">
                    {MOCK_MEDIA.map(media => (
                      <button
                        key={media.id}
                        onClick={() => handleAddMedia(media)}
                        className="w-full p-3 bg-[#F9FAFB] hover:bg-[#F0F9FF] rounded-lg transition-colors text-left flex items-center gap-3"
                      >
                        <Film className="w-5 h-5 text-[#6B7280]" />
                        <div className="flex-1">
                          <p className="text-sm text-[#111827]">{media.name}</p>
                          <p className="text-xs text-[#6B7280]">{media.duration}s</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Items List */}
              {items.length === 0 ? (
                <div className="p-8 bg-[#F9FAFB] border-2 border-dashed border-[#E5E7EB] rounded-lg text-center">
                  <Film className="w-12 h-12 text-[#E5E7EB] mx-auto mb-3" />
                  <p className="text-sm text-[#6B7280]">
                    No media items yet. Click "Add Media" to get started.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {items.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-4 bg-white border border-[#E5E7EB] rounded-lg hover:border-[#D9480F]/30 transition-colors"
                    >
                      <GripVertical className="w-5 h-5 text-[#9CA3AF] cursor-move" />
                      
                      <div className="w-8 h-8 bg-gradient-to-br from-[#F9FAFB] to-[#E5E7EB] rounded flex items-center justify-center flex-shrink-0">
                        <Film className="w-4 h-4 text-[#9CA3AF]" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#111827] truncate">{item.mediaName}</p>
                        <p className="text-xs text-[#6B7280]">Duration: {item.duration}s</p>
                      </div>

                      <span className="text-xs text-[#9CA3AF] flex-shrink-0">
                        #{index + 1}
                      </span>

                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#FEE2E2] text-[#6B7280] hover:text-[#DC2626] transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {items.length > 0 && (
                <div className="mt-4 p-4 bg-[#F0F9FF] border border-[#BAE6FD] rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#0369A1]">{items.length} items</span>
                    <span className="text-[#0369A1]">Total duration: {totalDuration}s</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-[#E5E7EB] flex items-center justify-end gap-3 bg-white">
          <button
            onClick={onClose}
            className="px-6 h-11 rounded-lg border border-[#E5E7EB] text-[#111827] hover:bg-[#F9FAFB] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!canSave}
            className={`px-6 h-11 rounded-lg transition-colors ${
              canSave
                ? 'bg-[#D9480F] text-white hover:bg-[#C23D0D]'
                : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
            }`}
          >
            Save Playlist
          </button>
        </div>
      </div>
    </div>
  );
}
