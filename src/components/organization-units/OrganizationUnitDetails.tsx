import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  Edit,
  MoreVertical,
  Trash2,
  Shield,
  Users,
  Target,
  Film,
  List,
  Monitor,
  FileText,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import {
  mockOrganizationUnits,
  getBreadcrumbPath,
  getUnitTypeLabel,
  getUnitTypeColor,
  getStatusColor,
  getAccessLevelColor,
  type OrganizationUnit
} from '../../data/mockOrganizationUnits';

export default function OrganizationUnitDetails() {
  const navigate = useNavigate();
  const { unitId } = useParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'media' | 'playlists' | 'users' | 'billing'>('overview');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const unit = mockOrganizationUnits.find(u => u.id === unitId);

  if (!unit) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-16 h-16 text-[#9CA3AF] mx-auto mb-4" />
          <h2 className="font-semibold text-[#111827] mb-2">Organization Unit Not Found</h2>
          <p className="text-sm text-[#6B7280] mb-4">The requested organization unit could not be found.</p>
          <button
            onClick={() => navigate('/organization-units')}
            className="px-4 h-[44px] bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors"
          >
            Back to Organization Units
          </button>
        </div>
      </div>
    );
  }

  const breadcrumbs = getBreadcrumbPath(unitId!, mockOrganizationUnits);
  const hasActiveResources = unit.totalCampaigns > 0 || unit.totalMedia > 0 || unit.totalPlaylists > 0 || unit.totalKiosks > 0;

  const handleDelete = () => {
    if (hasActiveResources) {
      toast.error('Cannot delete unit with active resources', {
        description: 'Please reassign or remove all resources first',
      });
      return;
    }
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    toast.success('Organization unit deleted successfully');
    setShowDeleteModal(false);
    navigate('/organization-units');
  };

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: FileText },
    { id: 'campaigns' as const, label: 'Campaigns', icon: Target, count: unit.totalCampaigns },
    { id: 'media' as const, label: 'Media', icon: Film, count: unit.totalMedia },
    { id: 'playlists' as const, label: 'Playlists', icon: List, count: unit.totalPlaylists },
    { id: 'users' as const, label: 'Users', icon: Users, count: unit.totalUsers },
  ];

  if (unit.unitType === 'legal-entity' && unit.billingInformation) {
    tabs.push({ id: 'billing' as const, label: 'Billing', icon: Shield });
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate('/organization-units')}
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-[#F9FAFB] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-[#6B7280] mb-1">
                {breadcrumbs.map((crumb, index) => (
                  <div key={crumb.id} className="flex items-center gap-2">
                    {index > 0 && <span>/</span>}
                    <span className={index === breadcrumbs.length - 1 ? 'text-[#111827] font-medium' : ''}>
                      {crumb.name}
                    </span>
                  </div>
                ))}
              </div>
              <h1 className="text-[#111827]">{unit.name}</h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/organization-units/${unitId}/edit`)}
                className="flex items-center gap-2 px-4 h-[44px] bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors text-sm font-medium"
              >
                <Edit className="w-4 h-4" />
                <span className="hidden sm:inline">Edit</span>
              </button>
              <div className="relative">
                <button
                  onClick={handleDelete}
                  className="w-[44px] h-[44px] flex items-center justify-center border border-[#E5E7EB] bg-white text-[#DC2626] rounded-lg hover:bg-[#FEF2F2] transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Status Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium ${getUnitTypeColor(unit.unitType)}`}>
              {getUnitTypeLabel(unit.unitType)}
            </span>
            <span className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium ${getStatusColor(unit.status)}`}>
              {unit.status === 'active' ? 'Active' : 'Inactive'}
            </span>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
            <div className="p-4 bg-[#F9FAFB] rounded-lg">
              <p className="text-xs text-[#6B7280] mb-1">Campaigns</p>
              <p className="text-2xl font-semibold text-[#111827]">{unit.totalCampaigns}</p>
            </div>
            <div className="p-4 bg-[#F9FAFB] rounded-lg">
              <p className="text-xs text-[#6B7280] mb-1">Media</p>
              <p className="text-2xl font-semibold text-[#111827]">{unit.totalMedia}</p>
            </div>
            <div className="p-4 bg-[#F9FAFB] rounded-lg">
              <p className="text-xs text-[#6B7280] mb-1">Playlists</p>
              <p className="text-2xl font-semibold text-[#111827]">{unit.totalPlaylists}</p>
            </div>
            <div className="p-4 bg-[#F9FAFB] rounded-lg">
              <p className="text-xs text-[#6B7280] mb-1">Kiosks</p>
              <p className="text-2xl font-semibold text-[#111827]">{unit.totalKiosks}</p>
            </div>
            <div className="p-4 bg-[#F9FAFB] rounded-lg">
              <p className="text-xs text-[#6B7280] mb-1">Users</p>
              <p className="text-2xl font-semibold text-[#111827]">{unit.totalUsers}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 h-[40px] rounded-t-lg transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-[#F9FAFB] text-[#D9480F] border-b-2 border-[#D9480F]'
                      : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                  {'count' in tab && tab.count !== undefined && (
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      activeTab === tab.id ? 'bg-[#D9480F] text-white' : 'bg-[#E5E7EB] text-[#6B7280]'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Configuration */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
              <h3 className="font-semibold text-[#111827] mb-4">Configuration</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">Timezone</p>
                  <p className="font-medium text-[#111827]">{unit.timezone}</p>
                </div>
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">Currency</p>
                  <p className="font-medium text-[#111827]">{unit.currency}</p>
                </div>
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">Created Date</p>
                  <p className="font-medium text-[#111827]">
                    {new Date(unit.createdDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">Created By</p>
                  <p className="font-medium text-[#111827]">{unit.createdBy}</p>
                </div>
              </div>
            </div>

            {/* Recent Activity Placeholder */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
              <h3 className="font-semibold text-[#111827] mb-4">Recent Activity</h3>
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-[#9CA3AF] mx-auto mb-3" />
                <p className="text-sm text-[#6B7280]">No recent activity to display</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#111827]">Assigned Users</h3>
              <button
                onClick={() => navigate(`/organization-units/${unitId}/access`)}
                className="px-4 h-[40px] bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors text-sm font-medium"
              >
                Manage Access
              </button>
            </div>

            <div className="space-y-2">
              {unit.userAssignments.length > 0 ? (
                unit.userAssignments.map((assignment) => (
                  <div
                    key={assignment.userId}
                    className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-[#111827]">{assignment.userName}</p>
                      <p className="text-sm text-[#6B7280]">{assignment.userEmail}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-md border text-xs font-medium ${getAccessLevelColor(assignment.accessLevel)}`}>
                      {assignment.accessLevel === 'admin' ? 'Administrator' : assignment.accessLevel === 'manage' ? 'Manage' : 'View Only'}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-[#9CA3AF] mx-auto mb-3" />
                  <p className="text-sm text-[#6B7280]">No users assigned to this unit</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'billing' && unit.unitType === 'legal-entity' && unit.billingInformation && (
          <div className="space-y-6">
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-[#D9480F]" />
                <h3 className="font-semibold text-[#111827]">Legal, Billing & Tax Information</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">Legal Entity Name</p>
                  <p className="font-medium text-[#111827]">{unit.billingInformation.legalCompanyName}</p>
                </div>
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">PAN Number</p>
                  <p className="font-medium text-[#111827] font-mono">{unit.billingInformation.taxId}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm text-[#6B7280] mb-1">Registered Address</p>
                  <p className="font-medium text-[#111827]">{unit.billingInformation.billingAddress}</p>
                </div>
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">Invoice Email</p>
                  <p className="font-medium text-[#111827]">{unit.billingInformation.invoiceEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">State</p>
                  <p className="font-medium text-[#111827]">
                    {unit.billingInformation.region}, {unit.billingInformation.country}
                  </p>
                </div>
              </div>
            </div>

            {/* GST Compliance Information */}
            {unit.billingInformation.gstData && (
              <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-[#D9480F]" />
                  <h3 className="font-semibold text-[#111827]">Tax & GST Compliance</h3>
                </div>
                
                {unit.billingInformation.gstData.isGSTRegistered ? (
                  <div className="space-y-4">
                    {/* GST Status Badge */}
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-md bg-[#D1FAE5] border border-[#6EE7B7] text-[#16A34A] text-sm font-medium">
                        GST Registered
                      </span>
                    </div>

                    {/* GST Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-[#6B7280] mb-1">GSTIN</p>
                        <p className="font-medium text-[#111827] font-mono">{unit.billingInformation.gstData.gstin}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#6B7280] mb-1">State of Registration</p>
                        <p className="font-medium text-[#111827]">
                          {unit.billingInformation.gstData.stateName} ({unit.billingInformation.gstData.stateCode})
                        </p>
                      </div>
                      {unit.billingInformation.gstData.gstRegistrationDate && (
                        <div>
                          <p className="text-sm text-[#6B7280] mb-1">Registration Date</p>
                          <p className="font-medium text-[#111827]">
                            {new Date(unit.billingInformation.gstData.gstRegistrationDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-[#6B7280] mb-1">Tax Type</p>
                        <p className="font-medium text-[#111827]">CGST + SGST / IGST</p>
                      </div>
                    </div>

                    {/* Additional GST Details */}
                    {(unit.billingInformation.gstData.compositionScheme || unit.billingInformation.gstData.reverseChargeApplicable) && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {unit.billingInformation.gstData.compositionScheme && (
                          <span className="inline-flex items-center px-2 py-1 rounded-md bg-[#DBEAFE] border border-[#93C5FD] text-[#1E40AF] text-xs font-medium">
                            Composition Scheme
                          </span>
                        )}
                        {unit.billingInformation.gstData.reverseChargeApplicable && (
                          <span className="inline-flex items-center px-2 py-1 rounded-md bg-[#DBEAFE] border border-[#93C5FD] text-[#1E40AF] text-xs font-medium">
                            Reverse Charge Applicable
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-md bg-[#FEE2E2] border border-[#FCA5A5] text-[#DC2626] text-sm font-medium">
                      Non-GST Entity
                    </span>
                    <p className="text-sm text-[#6B7280]">This entity is not registered under GST</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Placeholder for other tabs */}
        {(activeTab === 'campaigns' || activeTab === 'media' || activeTab === 'playlists') && (
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-[#9CA3AF] mx-auto mb-4" />
              <h3 className="font-semibold text-[#111827] mb-2">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} View
              </h3>
              <p className="text-sm text-[#6B7280]">
                Filtered {activeTab} for this organization unit will appear here
              </p>
            </div>
          </div>
        )}

        {/* Warning for deletion */}
        {hasActiveResources && (
          <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-[#DC2626] mb-1">Cannot Delete This Unit</p>
              <p className="text-sm text-[#991B1B]">
                This unit has active resources (campaigns, media, playlists, or kiosks). 
                Please reassign or remove all resources before deleting.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#FEF2F2] flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-[#DC2626]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#111827]">Delete Organization Unit</h3>
                <p className="text-sm text-[#6B7280]">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-sm text-[#6B7280] mb-6">
              Are you sure you want to delete "{unit.name}"? This will permanently remove the organization unit.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 h-[44px] border border-[#E5E7EB] bg-white text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 h-[44px] bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-lg transition-colors font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}