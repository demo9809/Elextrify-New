import { useState } from 'react';
import { 
  Search, 
  Filter, 
  LayoutGrid, 
  Grid3x3, 
  Plus,
  MoreVertical,
  Archive,
  Trash2,
  Download,
  Users,
  Building2,
  TrendingUp,
  Image as ImageIcon,
  Video,
  FolderOpen,
  Calendar
} from 'lucide-react';
import { ClientDetails } from './ClientDetails';
import { CreateClient } from './CreateClient';

type ViewMode = 'grid' | 'list';
type ClientStatus = 'all' | 'active' | 'archived';

interface Client {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  status: 'active' | 'archived';
  campaignsCount: number;
  mediaCount: number;
  playlistsCount: number;
  lastUpdated: string;
  tags: string[];
  notes?: string;
}

export function ClientManager() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<ClientStatus>('all');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showCreateClient, setShowCreateClient] = useState(false);

  // Mock data
  const mockClients: Client[] = [
    {
      id: 'client-1',
      name: 'Acme Corporation',
      logo: undefined,
      industry: 'Retail',
      contactPerson: 'John Smith',
      contactEmail: 'john@acme.com',
      contactPhone: '+1 (555) 123-4567',
      status: 'active',
      campaignsCount: 12,
      mediaCount: 48,
      playlistsCount: 8,
      lastUpdated: '2025-01-15T10:30:00Z',
      tags: ['Premium', 'Enterprise']
    },
    {
      id: 'client-2',
      name: 'Brew Coffee Co.',
      logo: undefined,
      industry: 'Food & Beverage',
      contactPerson: 'Sarah Johnson',
      contactEmail: 'sarah@brewcoffee.com',
      contactPhone: '+1 (555) 234-5678',
      status: 'active',
      campaignsCount: 5,
      mediaCount: 24,
      playlistsCount: 4,
      lastUpdated: '2025-01-18T14:20:00Z',
      tags: ['Small Business']
    },
    {
      id: 'client-3',
      name: 'FitLife Gym',
      logo: undefined,
      industry: 'Fitness & Wellness',
      contactPerson: 'Mike Brown',
      contactEmail: 'mike@fitlife.com',
      contactPhone: '+1 (555) 345-6789',
      status: 'active',
      campaignsCount: 8,
      mediaCount: 32,
      playlistsCount: 6,
      lastUpdated: '2025-01-20T09:15:00Z',
      tags: ['Mid-Market']
    },
    {
      id: 'client-4',
      name: 'TechStart Inc.',
      logo: undefined,
      industry: 'Technology',
      contactPerson: 'Emily Davis',
      contactEmail: 'emily@techstart.com',
      contactPhone: '+1 (555) 456-7890',
      status: 'active',
      campaignsCount: 15,
      mediaCount: 64,
      playlistsCount: 10,
      lastUpdated: '2025-01-22T16:45:00Z',
      tags: ['Enterprise', 'Tech']
    },
    {
      id: 'client-5',
      name: 'Urban Fashion',
      logo: undefined,
      industry: 'Fashion & Apparel',
      contactPerson: 'Lisa Martinez',
      contactEmail: 'lisa@urbanfashion.com',
      contactPhone: '+1 (555) 567-8901',
      status: 'archived',
      campaignsCount: 3,
      mediaCount: 16,
      playlistsCount: 2,
      lastUpdated: '2024-12-10T11:30:00Z',
      tags: ['Small Business']
    }
  ];

  const industries = ['Retail', 'Food & Beverage', 'Fitness & Wellness', 'Technology', 'Fashion & Apparel', 'Healthcare', 'Education', 'Finance'];
  const allTags = ['Premium', 'Enterprise', 'Mid-Market', 'Small Business', 'Tech', 'Seasonal'];

  const filteredClients = mockClients.filter(client => {
    const matchesStatus = selectedStatus === 'all' || client.status === selectedStatus;
    const matchesIndustry = selectedIndustry === 'all' || client.industry === selectedIndustry;
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => client.tags.includes(tag));
    
    return matchesStatus && matchesIndustry && matchesSearch && matchesTags;
  });

  const stats = {
    total: mockClients.length,
    active: mockClients.filter(c => c.status === 'active').length,
    archived: mockClients.filter(c => c.status === 'archived').length,
    totalCampaigns: mockClients.reduce((sum, c) => sum + c.campaignsCount, 0),
    totalMedia: mockClients.reduce((sum, c) => sum + c.mediaCount, 0),
    totalPlaylists: mockClients.reduce((sum, c) => sum + c.playlistsCount, 0)
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredClients.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredClients.map(c => c.id));
    }
  };

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleBulkArchive = () => {
    console.log('Archiving:', selectedItems);
    setSelectedItems([]);
    setShowBulkActions(false);
  };

  const handleBulkDelete = () => {
    console.log('Deleting:', selectedItems);
    setSelectedItems([]);
    setShowBulkActions(false);
  };

  const hasActiveFilters = selectedStatus !== 'all' || selectedIndustry !== 'all' || selectedTags.length > 0;

  if (selectedClient) {
    return <ClientDetails client={selectedClient} onClose={() => setSelectedClient(null)} />;
  }

  if (showCreateClient) {
    return <CreateClient onClose={() => setShowCreateClient(false)} onSuccess={() => setShowCreateClient(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-[#111827] mb-2">Customers</h1>
            <p className="text-[#6B7280] text-sm md:text-base">
              Manage your clients and their campaigns, media, and playlists
            </p>
          </div>
          <button
            onClick={() => setShowCreateClient(true)}
            className="flex items-center justify-center gap-2 px-4 md:px-6 h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] transition-colors w-full md:w-auto"
          >
            <Plus className="w-5 h-5" />
            Create Client
          </button>
        </div>

        {/* Insights Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-8">
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 md:p-6 h-[100px] md:h-[120px] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs md:text-sm text-[#6B7280]">Total Clients</p>
              <div className="w-7 h-7 md:w-8 md:h-8 bg-[#F9FAFB] rounded-lg flex items-center justify-center">
                <Users className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#6B7280]" />
              </div>
            </div>
            <p className="text-xl md:text-2xl font-semibold text-[#111827]">{stats.total}</p>
          </div>

          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 md:p-6 h-[100px] md:h-[120px] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs md:text-sm text-[#6B7280]">Active</p>
              <div className="w-7 h-7 md:w-8 md:h-8 bg-[#ECFDF5] rounded-lg flex items-center justify-center">
                <TrendingUp className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#10B981]" />
              </div>
            </div>
            <p className="text-xl md:text-2xl font-semibold text-[#111827]">{stats.active}</p>
          </div>

          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 md:p-6 h-[100px] md:h-[120px] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs md:text-sm text-[#6B7280]">Campaigns</p>
              <div className="w-7 h-7 md:w-8 md:h-8 bg-[#EFF6FF] rounded-lg flex items-center justify-center">
                <TrendingUp className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#3B82F6]" />
              </div>
            </div>
            <p className="text-xl md:text-2xl font-semibold text-[#111827]">{stats.totalCampaigns}</p>
          </div>

          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 md:p-6 h-[100px] md:h-[120px] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs md:text-sm text-[#6B7280]">Media Files</p>
              <div className="w-7 h-7 md:w-8 md:h-8 bg-[#F3F0FF] rounded-lg flex items-center justify-center">
                <ImageIcon className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#8B5CF6]" />
              </div>
            </div>
            <p className="text-xl md:text-2xl font-semibold text-[#111827]">{stats.totalMedia}</p>
          </div>

          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 md:p-6 h-[100px] md:h-[120px] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs md:text-sm text-[#6B7280]">Playlists</p>
              <div className="w-7 h-7 md:w-8 md:h-8 bg-[#FDF2F8] rounded-lg flex items-center justify-center">
                <FolderOpen className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#EC4899]" />
              </div>
            </div>
            <p className="text-xl md:text-2xl font-semibold text-[#111827]">{stats.totalPlaylists}</p>
          </div>

          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 md:p-6 h-[100px] md:h-[120px] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs md:text-sm text-[#6B7280]">Archived</p>
              <div className="w-7 h-7 md:w-8 md:h-8 bg-[#F9FAFB] rounded-lg flex items-center justify-center">
                <Archive className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#6B7280]" />
              </div>
            </div>
            <p className="text-xl md:text-2xl font-semibold text-[#111827]">{stats.archived}</p>
          </div>
        </div>

        {/* Main Container */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
          {/* Search and Actions Bar */}
          <div className="px-4 md:px-6 py-3 md:py-4 border-b border-[#E5E7EB] flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
            {/* Search */}
            <div className="flex-1 max-w-full md:max-w-[320px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <input
                  type="text"
                  placeholder="Search clients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 md:h-10 pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              {/* Filters Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`relative flex items-center gap-2 h-10 px-3 md:px-4 bg-white border rounded-lg text-sm transition-colors flex-1 md:flex-none justify-center ${
                  hasActiveFilters
                    ? 'border-[#D9480F] text-[#D9480F] bg-[#FEF2F2]'
                    : 'border-[#E5E7EB] text-[#111827] hover:bg-[#F9FAFB]'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span className="hidden md:inline">Filters</span>
                {hasActiveFilters && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D9480F] text-white text-xs rounded-full flex items-center justify-center">
                    {(selectedStatus !== 'all' ? 1 : 0) + (selectedIndustry !== 'all' ? 1 : 0) + selectedTags.length}
                  </span>
                )}
              </button>

              {/* View Toggle - Hidden on mobile */}
              <div className="hidden md:flex items-center gap-1 border border-[#E5E7EB] rounded-lg p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`w-9 h-9 flex items-center justify-center rounded-md transition-colors ${
                    viewMode === 'list'
                      ? 'bg-[#FEF2F2] text-[#D9480F]'
                      : 'text-[#6B7280] hover:bg-[#F9FAFB]'
                  }`}
                  title="List view"
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`w-9 h-9 flex items-center justify-center rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-[#FEF2F2] text-[#D9480F]'
                      : 'text-[#6B7280] hover:bg-[#F9FAFB]'
                  }`}
                  title="Grid view"
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="px-6 py-4 border-b border-[#E5E7EB] bg-[#F9FAFB]">
              <div className="grid grid-cols-3 gap-6">
                {/* Status Filter */}
                <div>
                  <label className="block text-xs font-medium text-[#6B7280] mb-2">Status</label>
                  <div className="flex flex-wrap gap-2">
                    {(['all', 'active', 'archived'] as ClientStatus[]).map(status => (
                      <button
                        key={status}
                        onClick={() => setSelectedStatus(status)}
                        className={`px-3 h-8 rounded-lg text-sm font-medium transition-colors ${
                          selectedStatus === status
                            ? 'bg-[#D9480F] text-white'
                            : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:border-[#D9480F]'
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Industry Filter */}
                <div>
                  <label className="block text-xs font-medium text-[#6B7280] mb-2">Industry</label>
                  <select
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="w-full h-9 px-3 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  >
                    <option value="all">All Industries</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>

                {/* Tag Filter */}
                <div>
                  <label className="block text-xs font-medium text-[#6B7280] mb-2">
                    Filter by Tags
                  </label>
                  <div className="space-y-2">
                    {selectedTags.length > 0 && (
                      <div className="flex flex-wrap gap-2 p-3 bg-white border border-[#E5E7EB] rounded-lg">
                        {selectedTags.map(tag => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-[#D9480F] text-white text-xs font-medium rounded"
                          >
                            {tag}
                            <button
                              onClick={() => setSelectedTags(prev => prev.filter(t => t !== tag))}
                              className="hover:bg-white/20 rounded"
                            >
                              <span className="text-xs">×</span>
                            </button>
                          </span>
                        ))}
                        <button
                          onClick={() => setSelectedTags([])}
                          className="text-xs text-[#6B7280] hover:text-[#111827]"
                        >
                          Clear all
                        </button>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2">
                      {allTags.slice(0, 4).map(tag => (
                        <button
                          key={tag}
                          onClick={() => {
                            setSelectedTags(prev =>
                              prev.includes(tag) ? prev : [...prev, tag]
                            );
                          }}
                          disabled={selectedTags.includes(tag)}
                          className={`px-3 h-8 rounded-lg text-sm font-medium transition-colors ${
                            selectedTags.includes(tag)
                              ? 'bg-[#F9FAFB] text-[#9CA3AF] cursor-not-allowed'
                              : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:border-[#D9480F] hover:text-[#D9480F]'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          {viewMode === 'grid' ? (
            <div className="p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredClients.map(client => (
                  <div
                    key={client.id}
                    className="bg-white border border-[#E5E7EB] rounded-xl p-4 md:p-6 hover:border-[#D9480F] hover:shadow-md transition-all cursor-pointer relative group"
                    onClick={() => setSelectedClient(client)}
                  >
                    {/* Checkbox - Hidden on mobile */}
                    <div className="absolute top-4 left-4 hidden md:block">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(client.id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleSelectItem(client.id);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-4 h-4 rounded border-[#E5E7EB] text-[#D9480F] focus:ring-[#D9480F]"
                      />
                    </div>

                    {/* Logo */}
                    <div className="flex justify-center mb-3 md:mb-4">
                      <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#D9480F] to-[#C23D0D] rounded-full flex items-center justify-center">
                        <span className="text-xl md:text-2xl font-bold text-white">
                          {client.name.charAt(0)}
                        </span>
                      </div>
                    </div>

                    {/* Client Info */}
                    <div className="text-center mb-3 md:mb-4">
                      <h3 className="font-semibold text-[#111827] mb-1 text-sm md:text-base">{client.name}</h3>
                      <p className="text-xs text-[#6B7280] mb-2">{client.industry}</p>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        client.status === 'active'
                          ? 'bg-[#ECFDF5] text-[#10B981]'
                          : 'bg-[#F9FAFB] text-[#6B7280]'
                      }`}>
                        {client.status === 'active' ? 'Active' : 'Archived'}
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 md:gap-3 mb-3 md:mb-4">
                      <div className="text-center">
                        <p className="text-base md:text-lg font-semibold text-[#111827]">{client.campaignsCount}</p>
                        <p className="text-xs text-[#6B7280]">Campaigns</p>
                      </div>
                      <div className="text-center">
                        <p className="text-base md:text-lg font-semibold text-[#111827]">{client.mediaCount}</p>
                        <p className="text-xs text-[#6B7280]">Media</p>
                      </div>
                      <div className="text-center">
                        <p className="text-base md:text-lg font-semibold text-[#111827]">{client.playlistsCount}</p>
                        <p className="text-xs text-[#6B7280]">Playlists</p>
                      </div>
                    </div>

                    {/* Contact & Tags */}
                    <div className="pt-3 md:pt-4 border-t border-[#E5E7EB]">
                      <p className="text-xs text-[#6B7280] mb-1">Contact</p>
                      <p className="text-sm font-medium text-[#111827] mb-2 md:mb-3 truncate">{client.contactPerson}</p>
                      
                      {client.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {client.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="px-2 py-1 bg-[#F9FAFB] text-[#6B7280] rounded text-xs">
                              {tag}
                            </span>
                          ))}
                          {client.tags.length > 2 && (
                            <span className="px-2 py-1 bg-[#F9FAFB] text-[#6B7280] rounded text-xs">
                              +{client.tags.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {filteredClients.length === 0 && (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-[#F9FAFB] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-[#9CA3AF]" />
                    </div>
                    <h3 className="font-semibold text-[#111827] mb-2">No clients found</h3>
                    <p className="text-sm text-[#6B7280] mb-4">Try adjusting your filters or create a new client</p>
                    <button
                      onClick={() => setShowCreateClient(true)}
                      className="h-10 px-6 bg-[#D9480F] text-white rounded-lg hover:bg-[#C43F0D] transition-colors font-medium"
                    >
                      Create Client
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Table Header */}
              <div className="px-6 py-3 bg-[#F9FAFB] border-b border-[#E5E7EB]">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-1 flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === filteredClients.length && filteredClients.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded border-[#E5E7EB] text-[#D9480F] focus:ring-[#D9480F]"
                    />
                  </div>
                  <div className="col-span-3 text-xs text-[#6B7280]">Client</div>
                  <div className="col-span-2 text-xs text-[#6B7280]">Industry</div>
                  <div className="col-span-2 text-xs text-[#6B7280]">Contact</div>
                  <div className="col-span-1 text-xs text-[#6B7280] text-center">Campaigns</div>
                  <div className="col-span-1 text-xs text-[#6B7280] text-center">Media</div>
                  <div className="col-span-1 text-xs text-[#6B7280]">Status</div>
                  <div className="col-span-1 text-xs text-[#6B7280] text-right">Actions</div>
                </div>
              </div>

              {/* Table Body */}
              <div>
                {filteredClients.map(client => (
                  <div
                    key={client.id}
                    className="px-6 py-4 border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors cursor-pointer"
                    onClick={() => setSelectedClient(client)}
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Checkbox */}
                      <div className="col-span-1">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(client.id)}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleSelectItem(client.id);
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className="w-4 h-4 rounded border-[#E5E7EB] text-[#D9480F] focus:ring-[#D9480F]"
                        />
                      </div>

                      {/* Client */}
                      <div className="col-span-3 flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#D9480F] to-[#C23D0D] rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-white">
                            {client.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#111827]">{client.name}</p>
                          <p className="text-xs text-[#6B7280]">
                            Updated {new Date(client.lastUpdated).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Industry */}
                      <div className="col-span-2">
                        <p className="text-sm text-[#111827]">{client.industry}</p>
                      </div>

                      {/* Contact */}
                      <div className="col-span-2">
                        <p className="text-sm text-[#111827]">{client.contactPerson}</p>
                        <p className="text-xs text-[#6B7280]">{client.contactEmail}</p>
                      </div>

                      {/* Campaigns */}
                      <div className="col-span-1 text-center">
                        <span className="text-sm font-medium text-[#111827]">{client.campaignsCount}</span>
                      </div>

                      {/* Media */}
                      <div className="col-span-1 text-center">
                        <span className="text-sm font-medium text-[#111827]">{client.mediaCount}</span>
                      </div>

                      {/* Status */}
                      <div className="col-span-1">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          client.status === 'active'
                            ? 'bg-[#ECFDF5] text-[#10B981]'
                            : 'bg-[#F9FAFB] text-[#6B7280]'
                        }`}>
                          {client.status === 'active' ? 'Active' : 'Archived'}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="col-span-1 flex justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedClient(client);
                          }}
                          className="w-8 h-8 hover:bg-[#F9FAFB] rounded-lg flex items-center justify-center transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-[#6B7280]" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredClients.length === 0 && (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-[#F9FAFB] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-[#9CA3AF]" />
                    </div>
                    <h3 className="font-semibold text-[#111827] mb-2">No clients found</h3>
                    <p className="text-sm text-[#6B7280] mb-4">Try adjusting your filters or create a new client</p>
                    <button
                      onClick={() => setShowCreateClient(true)}
                      className="h-10 px-6 bg-[#D9480F] text-white rounded-lg hover:bg-[#C43F0D] transition-colors font-medium"
                    >
                      Create Client
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}