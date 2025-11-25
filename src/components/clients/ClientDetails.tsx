import { useState } from 'react';
import { 
  X, 
  Edit, 
  Building2, 
  Mail, 
  Phone, 
  Calendar,
  TrendingUp,
  Image as ImageIcon,
  FolderOpen,
  Monitor,
  BarChart3,
  Activity,
  FileText,
  Tag as TagIcon,
  Archive,
  Trash2,
  AlertCircle
} from 'lucide-react';

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

interface ClientDetailsProps {
  client: Client;
  onClose: () => void;
}

type TabId = 'overview' | 'campaigns' | 'media' | 'playlists' | 'reports';

export function ClientDetails({ client, onClose }: ClientDetailsProps) {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const tabs = [
    { id: 'overview' as TabId, label: 'Overview', icon: FileText },
    { id: 'campaigns' as TabId, label: 'Campaigns', icon: TrendingUp, count: client.campaignsCount },
    { id: 'media' as TabId, label: 'Media', icon: ImageIcon, count: client.mediaCount },
    { id: 'playlists' as TabId, label: 'Playlists', icon: FolderOpen, count: client.playlistsCount },
    { id: 'reports' as TabId, label: 'Reports', icon: BarChart3 }
  ];

  // Mock data for campaigns
  const campaigns = [
    { id: 'c1', name: 'Holiday 2025 Sale', status: 'active', startDate: '2025-01-01', endDate: '2025-03-31', adGroups: 3 },
    { id: 'c2', name: 'Spring Collection Launch', status: 'scheduled', startDate: '2025-02-15', endDate: '2025-04-30', adGroups: 2 },
    { id: 'c3', name: 'Summer Clearance', status: 'draft', startDate: '2025-05-01', endDate: '2025-06-30', adGroups: 1 }
  ];

  // Mock data for media
  const media = [
    { id: 'm1', name: 'Summer Sale Banner', type: 'image', size: '2.4 MB', uploaded: '2025-01-15' },
    { id: 'm2', name: 'Product Showcase Video', type: 'video', size: '12.8 MB', uploaded: '2025-01-18' },
    { id: 'm3', name: 'Background Music', type: 'audio', size: '4.2 MB', uploaded: '2025-01-20' }
  ];

  // Mock data for playlists
  const playlists = [
    { id: 'p1', name: 'Main Store Loop', items: 8, duration: '4:30', updated: '2025-01-22' },
    { id: 'p2', name: 'Weekend Special', items: 5, duration: '2:45', updated: '2025-01-20' },
    { id: 'p3', name: 'Evening Content', items: 6, duration: '3:15', updated: '2025-01-18' }
  ];

  // Mock activity log
  const activityLog = [
    { id: 'a1', action: 'Campaign "Holiday 2025 Sale" launched', timestamp: '2025-01-22T10:30:00Z', user: 'Admin' },
    { id: 'a2', action: 'Media "Product Showcase Video" uploaded', timestamp: '2025-01-18T14:20:00Z', user: 'Admin' },
    { id: 'a3', action: 'Playlist "Main Store Loop" updated', timestamp: '2025-01-15T09:15:00Z', user: 'Admin' }
  ];

  const handleArchive = () => {
    console.log('Archiving client:', client.id);
    onClose();
  };

  const handleDelete = () => {
    console.log('Deleting client:', client.id);
    setShowDeleteModal(false);
    onClose();
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="p-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4">
              {/* Logo */}
              <div className="w-20 h-20 bg-gradient-to-br from-[#D9480F] to-[#C23D0D] rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-3xl font-bold text-white">
                  {client.name.charAt(0)}
                </span>
              </div>

              {/* Client Info */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-[#111827]">{client.name}</h1>
                  <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    client.status === 'active'
                      ? 'bg-[#ECFDF5] text-[#10B981]'
                      : 'bg-[#F9FAFB] text-[#6B7280]'
                  }`}>
                    {client.status === 'active' ? 'Active' : 'Archived'}
                  </span>
                </div>
                <p className="text-[#6B7280] mb-4">{client.industry}</p>

                {/* Contact Info */}
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#9CA3AF]" />
                    <span className="text-[#6B7280]">{client.contactPerson}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#9CA3AF]" />
                    <span className="text-[#6B7280]">{client.contactEmail}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#9CA3AF]" />
                    <span className="text-[#6B7280]">{client.contactPhone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#9CA3AF]" />
                    <span className="text-[#6B7280]">
                      Updated {new Date(client.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 h-10 bg-white border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-[#F9FAFB] transition-colors text-sm font-medium">
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button 
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center gap-2 px-4 h-10 bg-white border border-[#DC2626] text-[#DC2626] rounded-lg hover:bg-[#FEF2F2] transition-colors text-sm font-medium">
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-[#F9FAFB] hover:bg-[#F3F4F6] rounded-lg flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-[#6B7280]" />
              </button>
            </div>
          </div>

          {/* Tags */}
          {client.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {client.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-[#F9FAFB] text-[#6B7280] rounded-lg text-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-5 gap-6 mb-6">
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-[#6B7280]">Total Campaigns</p>
              <TrendingUp className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <p className="text-3xl font-semibold text-[#111827] mb-1">{client.campaignsCount}</p>
            <p className="text-xs text-[#10B981]">+2 this month</p>
          </div>

          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-[#6B7280]">Media Files</p>
              <ImageIcon className="w-5 h-5 text-[#8B5CF6]" />
            </div>
            <p className="text-3xl font-semibold text-[#111827] mb-1">{client.mediaCount}</p>
            <p className="text-xs text-[#6B7280]">64.2 MB total</p>
          </div>

          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-[#6B7280]">Playlists</p>
              <FolderOpen className="w-5 h-5 text-[#EC4899]" />
            </div>
            <p className="text-3xl font-semibold text-[#111827] mb-1">{client.playlistsCount}</p>
            <p className="text-xs text-[#6B7280]">3 updated recently</p>
          </div>

          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-[#6B7280]">Total Kiosks</p>
              <Monitor className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <p className="text-3xl font-semibold text-[#111827] mb-1">24</p>
            <p className="text-xs text-[#10B981]">All online</p>
          </div>

          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-[#6B7280]">Impressions</p>
              <Activity className="w-5 h-5 text-[#10B981]" />
            </div>
            <p className="text-3xl font-semibold text-[#111827] mb-1">1.2M</p>
            <p className="text-xs text-[#10B981]">+18% vs last month</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-[#E5E7EB] px-6">
            <div className="flex gap-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#D9480F] text-[#D9480F]'
                      : 'border-transparent text-[#6B7280] hover:text-[#111827]'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  {tab.count !== undefined && (
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      activeTab === tab.id
                        ? 'bg-[#FEF2F2] text-[#D9480F]'
                        : 'bg-[#F9FAFB] text-[#6B7280]'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Recent Activity */}
                <div>
                  <h3 className="font-semibold text-[#111827] mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {activityLog.map(activity => (
                      <div key={activity.id} className="flex items-start gap-3 p-4 bg-[#F9FAFB] rounded-lg">
                        <div className="w-8 h-8 bg-[#D9480F] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Activity className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-[#111827] font-medium mb-1">{activity.action}</p>
                          <p className="text-xs text-[#6B7280]">
                            {new Date(activity.timestamp).toLocaleString()} by {activity.user}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {client.notes && (
                  <div>
                    <h3 className="font-semibold text-[#111827] mb-4">Notes</h3>
                    <div className="p-4 bg-[#F9FAFB] rounded-lg">
                      <p className="text-sm text-[#6B7280]">{client.notes}</p>
                    </div>
                  </div>
                )}

                {/* Recent Campaigns */}
                <div>
                  <h3 className="font-semibold text-[#111827] mb-4">Recent Campaigns</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {campaigns.slice(0, 2).map(campaign => (
                      <div key={campaign.id} className="border border-[#E5E7EB] rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-[#111827]">{campaign.name}</h4>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            campaign.status === 'active' ? 'bg-[#ECFDF5] text-[#10B981]' :
                            campaign.status === 'scheduled' ? 'bg-[#EFF6FF] text-[#3B82F6]' :
                            'bg-[#F9FAFB] text-[#6B7280]'
                          }`}>
                            {campaign.status}
                          </span>
                        </div>
                        <p className="text-xs text-[#6B7280] mb-2">
                          {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-[#6B7280]">{campaign.adGroups} Ad Groups</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'campaigns' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-[#111827]">All Campaigns ({campaigns.length})</h3>
                  <button className="flex items-center gap-2 px-4 h-9 bg-[#D9480F] text-white rounded-lg hover:bg-[#C43F0D] transition-colors text-sm font-medium">
                    <TrendingUp className="w-4 h-4" />
                    New Campaign
                  </button>
                </div>

                <div className="space-y-3">
                  {campaigns.map(campaign => (
                    <div key={campaign.id} className="border border-[#E5E7EB] rounded-lg p-4 hover:border-[#D9480F] hover:shadow-sm transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-medium text-[#111827]">{campaign.name}</h4>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              campaign.status === 'active' ? 'bg-[#ECFDF5] text-[#10B981]' :
                              campaign.status === 'scheduled' ? 'bg-[#EFF6FF] text-[#3B82F6]' :
                              'bg-[#F9FAFB] text-[#6B7280]'
                            }`}>
                              {campaign.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-[#6B7280]">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                            </span>
                            <span>{campaign.adGroups} Ad Groups</span>
                          </div>
                        </div>
                        <button className="px-4 h-9 bg-white border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-[#F9FAFB] transition-colors text-sm font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'media' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-[#111827]">All Media ({media.length})</h3>
                  <button className="flex items-center gap-2 px-4 h-9 bg-[#D9480F] text-white rounded-lg hover:bg-[#C43F0D] transition-colors text-sm font-medium">
                    <ImageIcon className="w-4 h-4" />
                    Upload Media
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {media.map(item => (
                    <div key={item.id} className="border border-[#E5E7EB] rounded-lg overflow-hidden hover:border-[#D9480F] hover:shadow-sm transition-all">
                      <div className="aspect-video bg-gradient-to-br from-[#F9FAFB] to-[#E5E7EB] flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-[#9CA3AF]" />
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium text-[#111827] text-sm mb-1 truncate">{item.name}</h4>
                        <p className="text-xs text-[#6B7280] mb-2">{item.type} • {item.size}</p>
                        <p className="text-xs text-[#9CA3AF]">Uploaded {new Date(item.uploaded).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'playlists' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-[#111827]">All Playlists ({playlists.length})</h3>
                  <button className="flex items-center gap-2 px-4 h-9 bg-[#D9480F] text-white rounded-lg hover:bg-[#C43F0D] transition-colors text-sm font-medium">
                    <FolderOpen className="w-4 h-4" />
                    Create Playlist
                  </button>
                </div>

                <div className="space-y-3">
                  {playlists.map(playlist => (
                    <div key={playlist.id} className="border border-[#E5E7EB] rounded-lg p-4 hover:border-[#D9480F] hover:shadow-sm transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-[#111827] mb-2">{playlist.name}</h4>
                          <div className="flex items-center gap-6 text-sm text-[#6B7280]">
                            <span>{playlist.items} items</span>
                            <span>Duration: {playlist.duration}</span>
                            <span>Updated {new Date(playlist.updated).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <button className="px-4 h-9 bg-white border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-[#F9FAFB] transition-colors text-sm font-medium">
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reports' && (
              <div>
                <h3 className="font-semibold text-[#111827] mb-6">Performance Reports</h3>
                
                {/* Date Range Selector */}
                <div className="flex items-center gap-3 mb-6">
                  <input
                    type="date"
                    className="h-10 px-4 bg-white border border-[#E5E7EB] rounded-lg text-sm"
                  />
                  <span className="text-sm text-[#6B7280]">to</span>
                  <input
                    type="date"
                    className="h-10 px-4 bg-white border border-[#E5E7EB] rounded-lg text-sm"
                  />
                  <button className="px-4 h-10 bg-[#D9480F] text-white rounded-lg hover:bg-[#C43F0D] transition-colors text-sm font-medium">
                    Apply
                  </button>
                  <button className="px-4 h-10 bg-white border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-[#F9FAFB] transition-colors text-sm font-medium">
                    Export Report
                  </button>
                </div>

                {/* Report Stats */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="bg-[#F9FAFB] rounded-lg p-4">
                    <p className="text-sm text-[#6B7280] mb-2">Total Impressions</p>
                    <p className="text-2xl font-semibold text-[#111827]">1.2M</p>
                    <p className="text-xs text-[#10B981] mt-1">+18% vs last period</p>
                  </div>
                  <div className="bg-[#F9FAFB] rounded-lg p-4">
                    <p className="text-sm text-[#6B7280] mb-2">Avg. Play Time</p>
                    <p className="text-2xl font-semibold text-[#111827]">3:24</p>
                    <p className="text-xs text-[#10B981] mt-1">+5% vs last period</p>
                  </div>
                  <div className="bg-[#F9FAFB] rounded-lg p-4">
                    <p className="text-sm text-[#6B7280] mb-2">Completion Rate</p>
                    <p className="text-2xl font-semibold text-[#111827]">89%</p>
                    <p className="text-xs text-[#10B981] mt-1">+2% vs last period</p>
                  </div>
                  <div className="bg-[#F9FAFB] rounded-lg p-4">
                    <p className="text-sm text-[#6B7280] mb-2">Active Screens</p>
                    <p className="text-2xl font-semibold text-[#111827]">24</p>
                    <p className="text-xs text-[#6B7280] mt-1">All online</p>
                  </div>
                </div>

                {/* Chart Placeholder */}
                <div className="border border-[#E5E7EB] rounded-lg p-6 bg-[#F9FAFB]">
                  <div className="h-64 flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-[#9CA3AF] mx-auto mb-3" />
                      <p className="text-sm text-[#6B7280]">Performance chart will appear here</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="w-12 h-12 bg-[#FEF2F2] rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="text-xl font-semibold text-[#111827] text-center mb-2">
                Delete Client?
              </h3>
              <p className="text-sm text-[#6B7280] text-center mb-6">
                This will permanently delete "{client.name}" and all associated data. This action cannot be undone.
              </p>
              
              {/* Dependencies Warning */}
              <div className="bg-[#FFF7ED] border border-[#FDBA74] rounded-lg p-4 mb-6">
                <p className="text-sm font-medium text-[#111827] mb-2">This client has:</p>
                <ul className="text-sm text-[#6B7280] space-y-1">
                  <li>• {client.campaignsCount} active campaigns</li>
                  <li>• {client.mediaCount} media files</li>
                  <li>• {client.playlistsCount} playlists</li>
                </ul>
                <p className="text-xs text-[#F59E0B] mt-2">
                  All of this data will be permanently deleted.
                </p>
              </div>

              {/* Confirmation Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Type "{client.name}" to confirm:
                </label>
                <input
                  type="text"
                  placeholder={client.name}
                  className="w-full h-10 px-4 bg-white border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 h-11 px-6 bg-white border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-[#F9FAFB] transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 h-11 px-6 bg-[#DC2626] text-white rounded-lg hover:bg-[#B91C1C] transition-colors font-medium"
                >
                  Delete Permanently
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
