import { useState } from 'react';
import { 
  LayoutGrid, 
  List, 
  Plus, 
  Search, 
  Filter,
  MoreVertical,
  Edit2,
  Copy,
  Archive,
  Trash2,
  Play,
  Clock,
  Film,
  Tag,
  CheckSquare,
  Square,
  ListVideo
} from 'lucide-react';
import { PlaylistEditorRevised } from './PlaylistEditorRevised';

interface Playlist {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'archived';
  itemCount: number;
  duration: number; // in seconds
  tags: string[];
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
  usedInCampaigns: number;
}

interface PlaylistManagerProps {
  onClose?: () => void;
}

export function PlaylistManager({ onClose }: PlaylistManagerProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'active' | 'archived'>('all');
  const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPlaylistId, setEditingPlaylistId] = useState<string | null>(null);

  // Mock data
  const [playlists, setPlaylists] = useState<Playlist[]>([
    {
      id: '1',
      name: 'Holiday Campaign 2025',
      description: 'Festive content for December promotions',
      status: 'active',
      itemCount: 8,
      duration: 240,
      tags: ['Holiday', 'Seasonal'],
      createdAt: '2024-11-20',
      updatedAt: '2024-11-24',
      usedInCampaigns: 3
    },
    {
      id: '2',
      name: 'Product Launch Mix',
      description: 'New product showcase videos',
      status: 'active',
      itemCount: 5,
      duration: 150,
      tags: ['Product', 'Launch'],
      createdAt: '2024-11-18',
      updatedAt: '2024-11-23',
      usedInCampaigns: 1
    },
    {
      id: '3',
      name: 'Brand Awareness Loop',
      description: 'General brand building content',
      status: 'draft',
      itemCount: 12,
      duration: 360,
      tags: ['Brand', 'Awareness'],
      createdAt: '2024-11-15',
      updatedAt: '2024-11-22',
      usedInCampaigns: 0
    },
    {
      id: '4',
      name: 'Summer Sale 2024',
      description: 'Archived summer promotion',
      status: 'archived',
      itemCount: 6,
      duration: 180,
      tags: ['Sale', 'Seasonal'],
      createdAt: '2024-06-01',
      updatedAt: '2024-08-31',
      usedInCampaigns: 5
    }
  ]);

  // Statistics
  const totalPlaylists = playlists.length;
  const activePlaylists = playlists.filter(p => p.status === 'active').length;
  const draftPlaylists = playlists.filter(p => p.status === 'draft').length;
  const totalDuration = playlists.reduce((sum, p) => sum + p.duration, 0);
  const totalItems = playlists.reduce((sum, p) => sum + p.itemCount, 0);

  // Filtered playlists
  const filteredPlaylists = playlists.filter(playlist => {
    const matchesSearch = playlist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         playlist.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || playlist.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectAll = () => {
    if (selectedPlaylists.length === filteredPlaylists.length) {
      setSelectedPlaylists([]);
    } else {
      setSelectedPlaylists(filteredPlaylists.map(p => p.id));
    }
  };

  const handleSelectPlaylist = (id: string) => {
    if (selectedPlaylists.includes(id)) {
      setSelectedPlaylists(selectedPlaylists.filter(pid => pid !== id));
    } else {
      setSelectedPlaylists([...selectedPlaylists, id]);
    }
  };

  const handleCreatePlaylist = () => {
    setEditingPlaylistId(null);
    setShowEditor(true);
  };

  const handleEditPlaylist = (id: string) => {
    setEditingPlaylistId(id);
    setShowEditor(true);
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setEditingPlaylistId(null);
  };

  if (showEditor) {
    return (
      <PlaylistEditorRevised
        playlistId={editingPlaylistId}
        onClose={handleCloseEditor}
        onSave={() => {
          handleCloseEditor();
          // Refresh playlists
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[#111827] mb-2">Playlists</h1>
            <p className="text-[#6B7280]">Manage content playlists for your campaigns</p>
          </div>
          <button
            onClick={handleCreatePlaylist}
            className="px-6 h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C43F0D] transition-colors flex items-center gap-2 font-medium"
          >
            <Plus className="w-5 h-5" />
            Create Playlist
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-4 gap-6">
          {/* Total Playlists */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-[#F3F4F6] rounded-lg flex items-center justify-center">
                <ListVideo className="w-4 h-4 text-[#6B7280]" />
              </div>
              <p className="text-xs text-[#6B7280]">Total Playlists</p>
            </div>
            <p className="text-[#111827] text-2xl font-semibold">{totalPlaylists}</p>
          </div>

          {/* Active Playlists */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-[#DCFCE7] rounded-lg flex items-center justify-center">
                <Play className="w-4 h-4 text-[#16A34A]" />
              </div>
              <p className="text-xs text-[#6B7280]">Active</p>
            </div>
            <p className="text-[#111827] text-2xl font-semibold">{activePlaylists}</p>
          </div>

          {/* Total Duration */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-[#FFF7ED] rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-[#D9480F]" />
              </div>
              <p className="text-xs text-[#6B7280]">Total Duration</p>
            </div>
            <p className="text-[#111827] text-2xl font-semibold">{formatDuration(totalDuration)}</p>
          </div>

          {/* Total Items */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-[#F3E8FF] rounded-lg flex items-center justify-center">
                <Film className="w-4 h-4 text-[#9333EA]" />
              </div>
              <p className="text-xs text-[#6B7280]">Total Items</p>
            </div>
            <p className="text-[#111827] text-2xl font-semibold">{totalItems}</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white border-b border-[#E5E7EB] px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
              <input
                type="text"
                placeholder="Search playlists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="h-10 px-4 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent bg-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>

            {/* Bulk Actions */}
            {selectedPlaylists.length > 0 && (
              <div className="flex items-center gap-2 ml-4 pl-4 border-l border-[#E5E7EB]">
                <span className="text-sm text-[#6B7280]">
                  {selectedPlaylists.length} selected
                </span>
                <button className="px-3 h-8 bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-[#F3F4F6] transition-colors text-sm flex items-center gap-2">
                  <Archive className="w-4 h-4" />
                  Archive
                </button>
                <button className="px-3 h-8 bg-[#FEF2F2] border border-[#FEE2E2] text-[#DC2626] rounded-lg hover:bg-[#FEE2E2] transition-colors text-sm flex items-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-[#F9FAFB] rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
            >
              <LayoutGrid className="w-4 h-4 text-[#6B7280]" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded ${viewMode === 'table' ? 'bg-white shadow-sm' : ''}`}
            >
              <List className="w-4 h-4 text-[#6B7280]" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {viewMode === 'grid' ? (
          <GridView
            playlists={filteredPlaylists}
            selectedPlaylists={selectedPlaylists}
            onSelectPlaylist={handleSelectPlaylist}
            onEditPlaylist={handleEditPlaylist}
            formatDuration={formatDuration}
          />
        ) : (
          <TableView
            playlists={filteredPlaylists}
            selectedPlaylists={selectedPlaylists}
            onSelectAll={handleSelectAll}
            onSelectPlaylist={handleSelectPlaylist}
            onEditPlaylist={handleEditPlaylist}
            formatDuration={formatDuration}
          />
        )}
      </div>
    </div>
  );
}

// Grid View Component
function GridView({ 
  playlists, 
  selectedPlaylists, 
  onSelectPlaylist, 
  onEditPlaylist,
  formatDuration 
}: any) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {playlists.map((playlist: Playlist) => (
        <div
          key={playlist.id}
          className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:shadow-lg transition-shadow group relative"
        >
          {/* Checkbox */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectPlaylist(playlist.id);
            }}
            className="absolute top-4 left-4 z-10 w-6 h-6 bg-white border-2 border-[#E5E7EB] rounded flex items-center justify-center hover:border-[#D9480F] transition-colors"
          >
            {selectedPlaylists.includes(playlist.id) && (
              <div className="w-4 h-4 bg-[#D9480F] rounded-sm flex items-center justify-center">
                <CheckSquare className="w-3 h-3 text-white" />
              </div>
            )}
          </button>

          {/* Thumbnail */}
          <div 
            onClick={() => onEditPlaylist(playlist.id)}
            className="h-48 bg-gradient-to-br from-[#F9FAFB] to-[#E5E7EB] flex items-center justify-center cursor-pointer"
          >
            <Film className="w-16 h-16 text-[#9CA3AF]" />
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 
                  onClick={() => onEditPlaylist(playlist.id)}
                  className="text-[#111827] mb-1 truncate cursor-pointer hover:text-[#D9480F]"
                >
                  {playlist.name}
                </h3>
                <p className="text-sm text-[#6B7280] line-clamp-2">{playlist.description}</p>
              </div>
              <PlaylistStatusBadge status={playlist.status} />
            </div>

            {/* Tags */}
            {playlist.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
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

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#F3F4F6]">
              <div>
                <p className="text-xs text-[#9CA3AF] mb-1">Items</p>
                <p className="text-sm font-semibold text-[#111827]">{playlist.itemCount}</p>
              </div>
              <div>
                <p className="text-xs text-[#9CA3AF] mb-1">Duration</p>
                <p className="text-sm font-semibold text-[#111827]">{formatDuration(playlist.duration)}</p>
              </div>
            </div>

            {/* Used in Campaigns */}
            {playlist.usedInCampaigns > 0 && (
              <div className="mt-3 pt-3 border-t border-[#F3F4F6]">
                <p className="text-xs text-[#6B7280]">
                  Used in {playlist.usedInCampaigns} campaign{playlist.usedInCampaigns > 1 ? 's' : ''}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// Table View Component
function TableView({ 
  playlists, 
  selectedPlaylists, 
  onSelectAll,
  onSelectPlaylist, 
  onEditPlaylist,
  formatDuration 
}: any) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
          <tr>
            <th className="w-12 px-6 py-4">
              <button
                onClick={onSelectAll}
                className="w-5 h-5 border-2 border-[#E5E7EB] rounded flex items-center justify-center hover:border-[#D9480F]"
              >
                {selectedPlaylists.length > 0 && (
                  <div className="w-3 h-3 bg-[#D9480F] rounded-sm"></div>
                )}
              </button>
            </th>
            <th className="text-left px-6 py-4 text-xs font-medium text-[#6B7280]">Name</th>
            <th className="text-left px-6 py-4 text-xs font-medium text-[#6B7280]">Status</th>
            <th className="text-left px-6 py-4 text-xs font-medium text-[#6B7280]">Items</th>
            <th className="text-left px-6 py-4 text-xs font-medium text-[#6B7280]">Duration</th>
            <th className="text-left px-6 py-4 text-xs font-medium text-[#6B7280]">Tags</th>
            <th className="text-left px-6 py-4 text-xs font-medium text-[#6B7280]">Campaigns</th>
            <th className="text-left px-6 py-4 text-xs font-medium text-[#6B7280]">Updated</th>
            <th className="w-12"></th>
          </tr>
        </thead>
        <tbody>
          {playlists.map((playlist: Playlist) => (
            <tr
              key={playlist.id}
              className="border-b border-[#F3F4F6] hover:bg-[#F9FAFB] cursor-pointer"
              onClick={() => onEditPlaylist(playlist.id)}
            >
              <td className="px-6 py-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPlaylist(playlist.id);
                  }}
                  className="w-5 h-5 border-2 border-[#E5E7EB] rounded flex items-center justify-center hover:border-[#D9480F]"
                >
                  {selectedPlaylists.includes(playlist.id) && (
                    <div className="w-3 h-3 bg-[#D9480F] rounded-sm"></div>
                  )}
                </button>
              </td>
              <td className="px-6 py-4">
                <div>
                  <p className="font-medium text-[#111827]">{playlist.name}</p>
                  <p className="text-sm text-[#6B7280]">{playlist.description}</p>
                </div>
              </td>
              <td className="px-6 py-4">
                <PlaylistStatusBadge status={playlist.status} />
              </td>
              <td className="px-6 py-4 text-sm text-[#111827]">{playlist.itemCount}</td>
              <td className="px-6 py-4 text-sm text-[#111827]">{formatDuration(playlist.duration)}</td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1">
                  {playlist.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-[#F3F4F6] text-[#6B7280] rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {playlist.tags.length > 2 && (
                    <span className="px-2 py-1 text-[#9CA3AF] text-xs">
                      +{playlist.tags.length - 2}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-[#111827]">{playlist.usedInCampaigns}</td>
              <td className="px-6 py-4 text-sm text-[#6B7280]">{playlist.updatedAt}</td>
              <td className="px-6 py-4">
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 hover:bg-[#F3F4F6] rounded"
                >
                  <MoreVertical className="w-4 h-4 text-[#6B7280]" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Status Badge Component
function PlaylistStatusBadge({ status }: { status: 'draft' | 'active' | 'archived' }) {
  const styles = {
    active: 'bg-[#DCFCE7] text-[#16A34A] border-[#BBF7D0]',
    draft: 'bg-[#FFF7ED] text-[#D9480F] border-[#FED7AA]',
    archived: 'bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB]'
  };

  const labels = {
    active: 'Active',
    draft: 'Draft',
    archived: 'Archived'
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}