import { useState } from 'react';
import { Plus, Calendar, Play, Pause, Edit, Trash2, MoreVertical } from 'lucide-react';
import { NewCampaignWizard, CampaignData } from '../campaign/NewCampaignWizard';

interface Campaign extends CampaignData {
  id: string;
  status: 'active' | 'paused' | 'draft' | 'scheduled';
  impressions?: number;
  createdAt: string;
}

const MOCK_SAMPLE_CAMPAIGN: Campaign = {
  id: 'camp-1',
  clientId: 'client-1',
  clientName: 'Acme Corporation',
  campaignName: 'Diwali 2025 Offer',
  venueTypes: ['mall', 'airport'],
  kioskIds: ['k1', 'k2', 'k5', 'k6', 'k7', 'k8', 'k9', 'k10'],
  events: [],
  status: 'active',
  impressions: 12547,
  createdAt: '2025-11-01',
};

export function CampaignScheduler() {
  const [showWizard, setShowWizard] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([MOCK_SAMPLE_CAMPAIGN]);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | undefined>(undefined);

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
      default:
        return 'bg-[#F3F4F6] text-[#6B7280]';
    }
  };

  const getStatusLabel = (status: Campaign['status']) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-[#111827]">Campaign Scheduler</h1>
            <button
              onClick={() => setShowWizard(true)}
              className="flex items-center gap-2 px-6 h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] transition-colors"
            >
              <Plus className="w-5 h-5" />
              New Campaign
            </button>
          </div>
          <p className="text-[#6B7280]">
            Manage your DOOH advertising campaigns with multiple ad groups
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-[#E5E7EB]">
            <p className="text-sm text-[#6B7280] mb-1">Total Campaigns</p>
            <p className="text-2xl text-[#111827]">{campaigns.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-[#E5E7EB]">
            <p className="text-sm text-[#6B7280] mb-1">Active</p>
            <p className="text-2xl text-[#111827]">
              {campaigns.filter(c => c.status === 'active').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-[#E5E7EB]">
            <p className="text-sm text-[#6B7280] mb-1">Scheduled</p>
            <p className="text-2xl text-[#111827]">
              {campaigns.filter(c => c.status === 'scheduled').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-[#E5E7EB]">
            <p className="text-sm text-[#6B7280] mb-1">Total Impressions</p>
            <p className="text-2xl text-[#111827]">
              {campaigns.reduce((sum, c) => sum + (c.impressions || 0), 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Campaigns Table */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
          {/* Table Header */}
          <div className="px-6 py-4 bg-[#F9FAFB] border-b border-[#E5E7EB]">
            <h3 className="text-[#111827]">All Campaigns</h3>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E5E7EB]">
                  <th className="px-6 py-3 text-left text-xs text-[#6B7280]">Campaign</th>
                  <th className="px-6 py-3 text-left text-xs text-[#6B7280]">Client</th>
                  <th className="px-6 py-3 text-left text-xs text-[#6B7280]">Status</th>
                  <th className="px-6 py-3 text-left text-xs text-[#6B7280]">Ad Groups</th>
                  <th className="px-6 py-3 text-left text-xs text-[#6B7280]">Impressions</th>
                  <th className="px-6 py-3 text-right text-xs text-[#6B7280]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {campaigns.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <Calendar className="w-12 h-12 text-[#E5E7EB] mx-auto mb-3" />
                      <p className="text-[#6B7280] mb-2">No campaigns yet</p>
                      <p className="text-sm text-[#9CA3AF]">Create your first campaign to get started</p>
                    </td>
                  </tr>
                ) : (
                  campaigns.map(campaign => (
                    <tr key={campaign.id} className="hover:bg-[#F9FAFB] transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm text-[#111827]">{campaign.campaignName}</p>
                        <p className="text-xs text-[#6B7280] mt-0.5">
                          {campaign.kioskIds.length} kiosk{campaign.kioskIds.length !== 1 ? 's' : ''} targeted
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-sm text-[#111827]">{campaign.clientName}</p>
                      </td>

                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(campaign.status)}`}>
                          {getStatusLabel(campaign.status)}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-sm text-[#111827]">
                          {(campaign.events || []).length} slot{(campaign.events || []).length !== 1 ? 's' : ''}
                        </p>
                        {(campaign.venueTypes || []).length > 0 && (
                          <p className="text-xs text-[#6B7280] mt-0.5">
                            {campaign.venueTypes.slice(0, 2).join(', ')}
                            {campaign.venueTypes.length > 2 && ` +${campaign.venueTypes.length - 2}`}
                          </p>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-sm text-[#111827]">
                          {campaign.impressions?.toLocaleString() || '—'}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
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
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* New Campaign Wizard */}
      <NewCampaignWizard
        isOpen={showWizard}
        onClose={handleCloseWizard}
        onSave={handleSaveCampaign}
        editingCampaign={editingCampaign}
      />
    </div>
  );
}