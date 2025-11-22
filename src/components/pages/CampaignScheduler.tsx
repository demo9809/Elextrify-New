import { useState } from 'react';
import { Plus, Search, Filter, Download, Grid3x3, LayoutGrid, Play, Edit, Trash2, MoreVertical, Pause, Calendar } from 'lucide-react';
import { NewCampaignWizard, CampaignData } from '../campaign/NewCampaignWizard';
import { FilterModal, FilterState } from '../campaign/FilterModal';

interface Campaign extends CampaignData {
  id: string;
  status: 'active' | 'paused' | 'draft' | 'scheduled' | 'completed';
  adGroupsCount: number;
  adGroupsDescription: string;
  impressions?: number;
  createdAt: string;
}

const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-1',
    clientId: 'client-1',
    clientName: 'Acme Corporation',
    campaignName: 'Acme Corporation - November 2025 Campaign',
    venueTypes: ['mall', 'airport'],
    kioskIds: ['k1', 'k2', 'k5', 'k6', 'k7', 'k8', 'k9', 'k10'],
    events: [],
    status: 'scheduled',
    adGroupsCount: 2,
    adGroupsDescription: 'Weekday Morning Ads, Weekend Schedule',
    createdAt: '2025-11-01',
  },
  {
    id: 'camp-2',
    clientId: 'client-1',
    clientName: 'Acme Corporation',
    campaignName: 'Diwali 2025 Offer',
    venueTypes: ['mall', 'airport'],
    kioskIds: ['k1', 'k2', 'k5', 'k6', 'k7', 'k8', 'k9', 'k10'],
    events: [],
    status: 'active',
    adGroupsCount: 2,
    adGroupsDescription: 'Sunday Schedule, Weekday Schedule',
    impressions: 12547,
    createdAt: '2025-10-15',
  },
  {
    id: 'camp-3',
    clientId: 'client-2',
    clientName: 'Brew Coffee Co.',
    campaignName: 'Holiday Season Special',
    venueTypes: ['mall', 'retail'],
    kioskIds: ['k3', 'k4', 'k11'],
    events: [],
    status: 'completed',
    adGroupsCount: 1,
    adGroupsDescription: 'All Day Campaign',
    impressions: 8432,
    createdAt: '2025-09-20',
  },
  {
    id: 'camp-4',
    clientId: 'client-3',
    clientName: 'FitLife Gym',
    campaignName: 'New Year Fitness Campaign',
    venueTypes: ['gym', 'mall'],
    kioskIds: ['k12', 'k13', 'k14'],
    events: [],
    status: 'scheduled',
    adGroupsCount: 3,
    adGroupsDescription: 'Morning, Afternoon, Evening',
    createdAt: '2025-11-10',
  },
  {
    id: 'camp-5',
    clientId: 'client-4',
    clientName: 'TechStart Inc.',
    campaignName: 'Product Launch 2025',
    venueTypes: ['airport', 'transit'],
    kioskIds: ['k15', 'k16'],
    events: [],
    status: 'draft',
    adGroupsCount: 0,
    adGroupsDescription: 'Not configured',
    createdAt: '2025-11-15',
  },
];

type TabType = 'all' | 'active' | 'scheduled' | 'completed' | 'drafts';
type ViewType = 'list' | 'grid';

export function CampaignScheduler() {
  const [showWizard, setShowWizard] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>(MOCK_CAMPAIGNS);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [viewType, setViewType] = useState<ViewType>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    clients: [],
    statuses: [],
    dateRange: null,
    venueTypes: [],
  });

  const handleSaveCampaign = (campaignData: CampaignData, isDraft: boolean) => {
    if (editingCampaign) {
      // Update existing campaign
      const updatedCampaign: Campaign = {
        ...editingCampaign,
        ...campaignData,
        status: isDraft ? 'draft' : editingCampaign.status,
      };
      setCampaigns(campaigns.map(c => c.id === editingCampaign.id ? updatedCampaign : c));
      setEditingCampaign(undefined);
    } else {
      // Create new campaign
      const newCampaign: Campaign = {
        ...campaignData,
        id: `camp-${Date.now()}`,
        status: isDraft ? 'draft' : 'scheduled',
        adGroupsCount: (campaignData.events || []).length,
        adGroupsDescription: 'New schedule',
        createdAt: new Date().toISOString(),
      };
      setCampaigns([newCampaign, ...campaigns]);
    }
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setShowWizard(true);
  };

  const handleDeleteCampaign = (campaignId: string) => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(campaigns.filter(c => c.id !== campaignId));
    }
  };

  const handleTogglePause = (campaignId: string) => {
    setCampaigns(campaigns.map(c => {
      if (c.id === campaignId) {
        return {
          ...c,
          status: c.status === 'active' ? 'paused' : 'active'
        };
      }
      return c;
    }));
  };

  const handleCloseWizard = () => {
    setShowWizard(false);
    setEditingCampaign(undefined);
  };

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'active':
        return 'bg-[#DCFCE7] text-[#166534]';
      case 'paused':
        return 'bg-[#FEF9C3] text-[#854D0E]';
      case 'draft':
        return 'bg-[#F3F4F6] text-[#374151]';
      case 'scheduled':
        return 'bg-[#DBEAFE] text-[#1E40AF]';
      case 'completed':
        return 'bg-[#F3F4F6] text-[#6B7280]';
      default:
        return 'bg-[#F3F4F6] text-[#6B7280]';
    }
  };

  const getStatusLabel = (status: Campaign['status']) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Apply all filters
  const filteredCampaigns = campaigns.filter(campaign => {
    // Tab filter
    if (activeTab !== 'all' && campaign.status !== activeTab) return false;

    // Search filter
    if (searchQuery && !campaign.campaignName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !campaign.clientName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Client filter
    if (filters.clients.length > 0 && !filters.clients.includes(campaign.clientName)) {
      return false;
    }

    // Status filter
    if (filters.statuses.length > 0) {
      const statusCapitalized = campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1);
      if (!filters.statuses.includes(statusCapitalized)) {
        return false;
      }
    }

    // Venue type filter
    if (filters.venueTypes.length > 0) {
      const hasMatchingVenue = campaign.venueTypes.some(vt => 
        filters.venueTypes.some(fv => vt.toLowerCase().includes(fv.toLowerCase()))
      );
      if (!hasMatchingVenue) return false;
    }

    return true;
  });

  // Get counts for each tab
  const getCounts = () => {
    return {
      all: campaigns.length,
      active: campaigns.filter(c => c.status === 'active').length,
      scheduled: campaigns.filter(c => c.status === 'scheduled').length,
      completed: campaigns.filter(c => c.status === 'completed').length,
      drafts: campaigns.filter(c => c.status === 'draft').length,
    };
  };

  const counts = getCounts();

  const tabs: { id: TabType; label: string; count: number }[] = [
    { id: 'all', label: 'All Campaigns', count: counts.all },
    { id: 'active', label: 'Active', count: counts.active },
    { id: 'scheduled', label: 'Scheduled', count: counts.scheduled },
    { id: 'completed', label: 'Completed', count: counts.completed },
    { id: 'drafts', label: 'Drafts', count: counts.drafts },
  ];

  const hasActiveFilters = filters.clients.length > 0 || 
                          filters.statuses.length > 0 || 
                          filters.venueTypes.length > 0 || 
                          filters.dateRange !== null;

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-[#111827] mb-2">Campaign Scheduler</h1>
            <p className="text-[#6B7280]">
              Manage your DOOH advertising campaigns with multiple ad groups
            </p>
          </div>
          <button
            onClick={() => setShowWizard(true)}
            className="flex items-center gap-2 px-6 h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Campaign
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
          {/* Search and Actions Bar */}
          <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center gap-4">
            {/* Search */}
            <div className="flex-1 max-w-[320px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters Button */}
            <button 
              onClick={() => setShowFilterModal(true)}
              className={`relative flex items-center gap-2 h-10 px-4 bg-white border rounded-lg text-sm transition-colors ${
                hasActiveFilters 
                  ? 'border-[#D9480F] text-[#D9480F] bg-[#FEF2F2]' 
                  : 'border-[#E5E7EB] text-[#111827] hover:bg-[#F9FAFB]'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D9480F] text-white text-xs rounded-full flex items-center justify-center">
                  {filters.clients.length + filters.statuses.length + filters.venueTypes.length + (filters.dateRange ? 1 : 0)}
                </span>
              )}
            </button>

            <div className="flex-1"></div>

            {/* Export Button */}
            <button className="flex items-center gap-2 h-10 px-4 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#D9480F] hover:bg-[#FEF2F2] transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>

            {/* View Toggle */}
            <div className="flex items-center gap-1 border border-[#E5E7EB] rounded-lg p-1">
              <button 
                onClick={() => setViewType('list')}
                className={`w-9 h-9 flex items-center justify-center rounded-md transition-colors ${
                  viewType === 'list' 
                    ? 'bg-[#FEF2F2] text-[#D9480F]' 
                    : 'text-[#6B7280] hover:bg-[#F9FAFB]'
                }`}
                title="List view"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewType('grid')}
                className={`w-9 h-9 flex items-center justify-center rounded-md transition-colors ${
                  viewType === 'grid' 
                    ? 'bg-[#FEF2F2] text-[#D9480F]' 
                    : 'text-[#6B7280] hover:bg-[#F9FAFB]'
                }`}
                title="Grid view"
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-6 border-b border-[#E5E7EB] flex items-center gap-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative py-4 text-sm font-medium transition-colors
                  ${activeTab === tab.id 
                    ? 'text-[#D9480F]' 
                    : 'text-[#6B7280] hover:text-[#111827]'
                  }
                `}
              >
                {tab.label}
                <span className={`ml-2 ${activeTab === tab.id ? 'text-[#D9480F]' : 'text-[#9CA3AF]'}`}>
                  ({tab.count})
                </span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D9480F]"></div>
                )}
              </button>
            ))}
          </div>

          {/* Content - List or Grid View */}
          {viewType === 'list' ? (
            <>
              {/* Table Header */}
              <div className="px-6 py-3 bg-[#F9FAFB] border-b border-[#E5E7EB]">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-4 text-xs text-[#6B7280]">Campaign</div>
                  <div className="col-span-2 text-xs text-[#6B7280]">Status</div>
                  <div className="col-span-3 text-xs text-[#6B7280]">Ad Groups</div>
                  <div className="col-span-2 text-xs text-[#6B7280]">Impressions</div>
                  <div className="col-span-1 text-xs text-[#6B7280] text-right">Actions</div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-[#E5E7EB]">
                {filteredCampaigns.length === 0 ? (
                  <div className="px-6 py-12 text-center">
                    <Calendar className="w-12 h-12 text-[#E5E7EB] mx-auto mb-3" />
                    <p className="text-[#6B7280] mb-2">No campaigns found</p>
                    <p className="text-sm text-[#9CA3AF]">
                      {searchQuery || hasActiveFilters
                        ? 'Try adjusting your search or filters'
                        : activeTab === 'all' 
                          ? 'Create your first campaign to get started' 
                          : `No ${activeTab} campaigns`
                      }
                    </p>
                  </div>
                ) : (
                  filteredCampaigns.map(campaign => (
                    <div key={campaign.id} className="px-6 py-4 hover:bg-[#F9FAFB] transition-colors">
                      <div className="grid grid-cols-12 gap-4 items-center">
                        {/* Campaign Name */}
                        <div className="col-span-4">
                          <p className="text-sm text-[#111827] font-medium mb-1">
                            {campaign.campaignName}
                          </p>
                          <p className="text-xs text-[#6B7280]">
                            Client : {campaign.clientName}
                          </p>
                        </div>

                        {/* Status */}
                        <div className="col-span-2">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                            {getStatusLabel(campaign.status)}
                          </span>
                        </div>

                        {/* Ad Groups */}
                        <div className="col-span-3">
                          <p className="text-sm text-[#111827] mb-1">
                            {campaign.adGroupsCount} ad group{campaign.adGroupsCount !== 1 ? 's' : ''}
                          </p>
                          <p className="text-xs text-[#6B7280]">
                            {campaign.adGroupsDescription}
                          </p>
                        </div>

                        {/* Impressions */}
                        <div className="col-span-2">
                          <p className="text-sm text-[#111827]">
                            {campaign.impressions?.toLocaleString() || '—'}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="col-span-1 flex items-center justify-end gap-1">
                          <button
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F0F9FF] text-[#6B7280] hover:text-[#D9480F] transition-colors"
                            title={campaign.status === 'active' ? 'Pause' : 'Resume'}
                            onClick={() => handleTogglePause(campaign.id)}
                          >
                            {campaign.status === 'active' ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F0F9FF] text-[#6B7280] hover:text-[#D9480F] transition-colors"
                            title="Edit"
                            onClick={() => handleEditCampaign(campaign)}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#FEE2E2] text-[#6B7280] hover:text-[#DC2626] transition-colors"
                            title="Delete"
                            onClick={() => handleDeleteCampaign(campaign.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F0F9FF] text-[#6B7280] transition-colors"
                            title="More"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          ) : (
            /* Grid View */
            <div className="p-6">
              {filteredCampaigns.length === 0 ? (
                <div className="py-12 text-center">
                  <Calendar className="w-12 h-12 text-[#E5E7EB] mx-auto mb-3" />
                  <p className="text-[#6B7280] mb-2">No campaigns found</p>
                  <p className="text-sm text-[#9CA3AF]">
                    {searchQuery || hasActiveFilters
                      ? 'Try adjusting your search or filters'
                      : activeTab === 'all' 
                        ? 'Create your first campaign to get started' 
                        : `No ${activeTab} campaigns`
                    }
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCampaigns.map(campaign => (
                    <div 
                      key={campaign.id} 
                      className="bg-white border border-[#E5E7EB] rounded-xl p-6 hover:shadow-lg transition-shadow"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="text-[#111827] font-medium mb-1 line-clamp-2">
                            {campaign.campaignName}
                          </h4>
                          <p className="text-xs text-[#6B7280]">
                            {campaign.clientName}
                          </p>
                        </div>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F9FAFB] text-[#6B7280] transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Status Badge */}
                      <div className="mb-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                          {getStatusLabel(campaign.status)}
                        </span>
                      </div>

                      {/* Stats */}
                      <div className="space-y-3 mb-4 pb-4 border-b border-[#E5E7EB]">
                        <div>
                          <p className="text-xs text-[#6B7280] mb-1">Ad Groups</p>
                          <p className="text-sm text-[#111827] font-medium">
                            {campaign.adGroupsCount} group{campaign.adGroupsCount !== 1 ? 's' : ''}
                          </p>
                          <p className="text-xs text-[#6B7280] mt-0.5">
                            {campaign.adGroupsDescription}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-[#6B7280] mb-1">Impressions</p>
                          <p className="text-sm text-[#111827] font-medium">
                            {campaign.impressions?.toLocaleString() || '—'}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleTogglePause(campaign.id)}
                          className="flex-1 flex items-center justify-center gap-2 h-9 px-3 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#6B7280] hover:text-[#D9480F] hover:border-[#D9480F] transition-colors"
                        >
                          {campaign.status === 'active' ? (
                            <>
                              <Pause className="w-4 h-4" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4" />
                              Resume
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => handleEditCampaign(campaign)}
                          className="flex-1 flex items-center justify-center gap-2 h-9 px-3 bg-[#D9480F] text-white rounded-lg text-sm hover:bg-[#C23D0D] transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCampaign(campaign.id)}
                          className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-[#E5E7EB] text-[#DC2626] hover:bg-[#FEE2E2] transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* New Campaign Wizard */}
      <NewCampaignWizard
        isOpen={showWizard}
        onClose={handleCloseWizard}
        onSave={handleSaveCampaign}
        editingCampaign={editingCampaign}
      />

      {/* Filter Modal */}
      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        filters={filters}
        onApply={handleApplyFilters}
      />
    </div>
  );
}
