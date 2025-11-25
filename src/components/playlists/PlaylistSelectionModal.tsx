import { useState } from 'react';
import { 
  X,
  Search,
  Play,
  Clock,
  Film,
  Star,
  Plus,
  CheckCircle,
  Circle
} from 'lucide-react';

interface Playlist {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  duration: number;
  tags: string[];
  recommended?: boolean;
  usedInCampaigns: number;
}

interface PlaylistSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (playlistId: string) => void;
  onCreateNew: () => void;
  selectedPlaylistId?: string;
}

export function PlaylistSelectionModal({
  isOpen,
  onClose,
  onSelect,
  onCreateNew,
  selectedPlaylistId
}: PlaylistSelectionModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'draft'>('all');
  const [tempSelectedId, setTempSelectedId] = useState<string | undefined>(selectedPlaylistId);

  // Mock playlists
  const playlists: Playlist[] = [
    {
      id: '1',
      name: 'Holiday Campaign 2025',
      description: 'Festive content for December promotions',
      itemCount: 8,
      duration: 240,
      tags: ['Holiday', 'Seasonal'],
      recommended: true,
      usedInCampaigns: 3
    },
    {
      id: '2',
      name: 'Product Launch Mix',
      description: 'New product showcase videos',
      itemCount: 5,
      duration: 150,
      tags: ['Product', 'Launch'],
      recommended: true,
      usedInCampaigns: 1
    },
    {
      id: '3',
      name: 'Brand Awareness Loop',
      description: 'General brand building content',
      itemCount: 12,
      duration: 360,
      tags: ['Brand', 'Awareness'],
      usedInCampaigns: 0
    },
    {
      id: '4',
      name: 'Weekend Special Offers',
      description: 'Weekend promotions and deals',
      itemCount: 6,
      duration: 180,
      tags: ['Offers', 'Weekend'],
      usedInCampaigns: 2
    },
    {
      id: '5',
      name: 'Customer Testimonials',
      description: 'Real customer success stories',
      itemCount: 10,
      duration: 300,
      tags: ['Testimonial', 'Social Proof'],
      usedInCampaigns: 4
    }
  ];

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredPlaylists = playlists.filter(playlist => {
    const matchesSearch = playlist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         playlist.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const recommendedPlaylists = filteredPlaylists.filter(p => p.recommended);
  const otherPlaylists = filteredPlaylists.filter(p => !p.recommended);

  const handleSelect = () => {
    if (tempSelectedId) {
      onSelect(tempSelectedId);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="border-b border-[#E5E7EB] px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-[#111827] mb-1">Select Playlist</h2>
              <p className="text-sm text-[#6B7280]">Choose a playlist for your campaign</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center hover:bg-[#F9FAFB] rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-[#6B7280]" />
            </button>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
              <input
                type="text"
                placeholder="Search playlists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              />
            </div>
            <button
              onClick={onCreateNew}
              className="px-4 h-10 bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-[#F3F4F6] transition-colors flex items-center gap-2 text-sm font-medium whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              Create New
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Recommended Section */}
          {recommendedPlaylists.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-4 h-4 text-[#F59E0B]" />
                <h3 className="text-sm font-medium text-[#111827]">Recommended for You</h3>
              </div>
              <div className="space-y-3">
                {recommendedPlaylists.map((playlist) => (
                  <PlaylistCard
                    key={playlist.id}
                    playlist={playlist}
                    isSelected={tempSelectedId === playlist.id}
                    onSelect={() => setTempSelectedId(playlist.id)}
                    formatDuration={formatDuration}
                  />
                ))}
              </div>
            </div>
          )}

          {/* All Playlists */}
          {otherPlaylists.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-[#111827] mb-4">All Playlists</h3>
              <div className="space-y-3">
                {otherPlaylists.map((playlist) => (
                  <PlaylistCard
                    key={playlist.id}
                    playlist={playlist}
                    isSelected={tempSelectedId === playlist.id}
                    onSelect={() => setTempSelectedId(playlist.id)}
                    formatDuration={formatDuration}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredPlaylists.length === 0 && (
            <div className="text-center py-12">
              <Film className="w-12 h-12 text-[#9CA3AF] mx-auto mb-4" />
              <p className="text-[#6B7280] mb-2">No playlists found</p>
              <p className="text-sm text-[#9CA3AF] mb-4">Try a different search or create a new playlist</p>
              <button
                onClick={onCreateNew}
                className="px-4 h-10 bg-[#D9480F] text-white rounded-lg hover:bg-[#C43F0D] transition-colors inline-flex items-center gap-2 font-medium"
              >
                <Plus className="w-4 h-4" />
                Create New Playlist
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#E5E7EB] px-8 py-6 bg-[#F9FAFB]">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#6B7280]">
              {tempSelectedId && (
                <>Selected: {playlists.find(p => p.id === tempSelectedId)?.name}</>
              )}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 h-10 bg-white border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-[#F9FAFB] transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSelect}
                disabled={!tempSelectedId}
                className="px-6 h-10 bg-[#D9480F] text-white rounded-lg hover:bg-[#C43F0D] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Select Playlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PlaylistCardProps {
  playlist: Playlist;
  isSelected: boolean;
  onSelect: () => void;
  formatDuration: (seconds: number) => string;
}

function PlaylistCard({ playlist, isSelected, onSelect, formatDuration }: PlaylistCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left border-2 rounded-xl p-5 transition-all hover:shadow-md ${
        isSelected
          ? 'border-[#D9480F] bg-[#FFF7ED]'
          : 'border-[#E5E7EB] bg-white hover:border-[#9CA3AF]'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Selection Indicator */}
        <div className="flex-shrink-0 mt-1">
          {isSelected ? (
            <div className="w-5 h-5 bg-[#D9480F] rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          ) : (
            <div className="w-5 h-5 border-2 border-[#E5E7EB] rounded-full"></div>
          )}
        </div>

        {/* Thumbnail */}
        <div className="w-20 h-20 bg-gradient-to-br from-[#F9FAFB] to-[#E5E7EB] rounded-lg flex items-center justify-center flex-shrink-0">
          <Film className="w-8 h-8 text-[#9CA3AF]" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0 pr-4">
              <h4 className="font-medium text-[#111827] mb-1 truncate">{playlist.name}</h4>
              <p className="text-sm text-[#6B7280] line-clamp-1">{playlist.description}</p>
            </div>
            {playlist.recommended && (
              <div className="flex items-center gap-1.5 bg-[#FFF7ED] px-2 py-1 rounded-full flex-shrink-0">
                <Star className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" />
                <span className="text-xs font-medium text-[#F59E0B]">Recommended</span>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-[#6B7280]">
            <div className="flex items-center gap-1.5">
              <Film className="w-4 h-4" />
              <span>{playlist.itemCount} items</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{formatDuration(playlist.duration)}</span>
            </div>
            {playlist.usedInCampaigns > 0 && (
              <div className="flex items-center gap-1.5">
                <Play className="w-4 h-4" />
                <span>Used in {playlist.usedInCampaigns} campaigns</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {playlist.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {playlist.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-[#F3F4F6] text-[#6B7280] rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Preview Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            // Handle preview
          }}
          className="w-9 h-9 flex items-center justify-center hover:bg-white rounded-lg transition-colors flex-shrink-0"
        >
          <Play className="w-4 h-4 text-[#6B7280]" />
        </button>
      </div>
    </button>
  );
}
