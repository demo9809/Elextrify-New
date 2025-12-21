import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft,
  Package,
  Edit,
  Copy,
  Archive,
  DollarSign,
  Users,
  Monitor,
  HardDrive,
  List,
  Target,
  Building2,
  CheckCircle2,
  X,
  Shield,
  Zap,
  Gauge,
  Clock
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { 
  mockEditions,
  getTierLabel,
  getTierColor,
  getStatusLabel,
  getStatusColor,
  calculateYearlyDiscount,
  getEnforcementLabel,
  formatLimit,
  getCurrencySymbol,
  type Edition 
} from '../../data/mockEditions';

export default function EditionDetails() {
  const { editionId } = useParams();
  const navigate = useNavigate();
  
  const edition = mockEditions.find(e => e.id === editionId);
  const [showDeprecateModal, setShowDeprecateModal] = useState(false);

  if (!edition) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-[#F9FAFB] p-8">
        <Package className="w-16 h-16 text-[#9CA3AF] mb-4" />
        <h2 className="text-xl font-semibold text-[#111827] mb-2">Edition Not Found</h2>
        <p className="text-[#6B7280] mb-6">The edition you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/editions')}
          className="flex items-center gap-2 px-6 h-[44px] bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Editions</span>
        </button>
      </div>
    );
  }

  const yearlyDiscount = calculateYearlyDiscount(edition.monthlyPrice, edition.yearlyPrice);

  const handleDuplicate = () => {
    navigate(`/editions/new?duplicate=${edition.id}`);
  };

  const handleDeprecate = () => {
    if (edition.tenantsUsingCount > 0) {
      toast.error('Cannot deprecate edition', {
        description: 'This edition is currently in use by active tenants',
      });
      return;
    }
    setShowDeprecateModal(true);
  };

  const confirmDeprecate = () => {
    toast.success('Edition deprecated successfully', {
      description: 'This edition is no longer available for new tenant assignments',
    });
    setShowDeprecateModal(false);
    // Navigate back after deprecation
    setTimeout(() => {
      navigate('/editions');
    }, 1500);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const enabledFeatures = Object.entries(edition.featureAccess)
    .filter(([_, enabled]) => enabled)
    .map(([key]) => key);

  const disabledFeatures = Object.entries(edition.featureAccess)
    .filter(([_, enabled]) => !enabled)
    .map(([key]) => key);

  const featureLabels: Record<string, string> = {
    mediaUpload: 'Media Upload',
    playlists: 'Playlists',
    campaignScheduling: 'Campaign Scheduling',
    html5Content: 'HTML5 Content',
    proofOfPlayReports: 'Proof-of-Play Reports',
    apiAccess: 'API Access',
    advancedAnalytics: 'Advanced Analytics',
    multiOrgUnits: 'Multi Organization Units',
    whiteLabeling: 'White Labeling',
    prioritySupport: 'Priority Support',
  };

  return (
    <div className="flex flex-col h-full bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate('/editions')}
            className="flex items-center gap-2 text-[#6B7280] hover:text-[#111827] transition-colors w-fit"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Editions</span>
          </button>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#D9480F] to-[#C23D0D] flex items-center justify-center flex-shrink-0">
                <Package className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-[#111827] mb-2">{edition.name}</h1>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium ${getTierColor(edition.tierLevel)}`}>
                    {getTierLabel(edition.tierLevel)}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium ${getStatusColor(edition.status)}`}>
                    {getStatusLabel(edition.status)}
                  </span>
                </div>
                <p className="text-sm text-[#6B7280]">
                  {edition.customerDescription}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => navigate(`/editions/${edition.id}/edit`)}
                className="flex items-center justify-center gap-2 px-4 h-[44px] bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors font-medium"
              >
                <Edit className="w-5 h-5" />
                <span>Edit Edition</span>
              </button>
              <button
                onClick={handleDuplicate}
                className="flex items-center justify-center gap-2 px-4 h-[44px] border border-[#E5E7EB] bg-white text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors"
              >
                <Copy className="w-5 h-5" />
                <span>Duplicate</span>
              </button>
              {edition.status === 'active' && (
                <button
                  onClick={handleDeprecate}
                  className="flex items-center justify-center gap-2 px-4 h-[44px] border border-[#DC2626] bg-white text-[#DC2626] rounded-lg hover:bg-[#FEF2F2] transition-colors"
                >
                  <Archive className="w-5 h-5" />
                  <span>Deprecate</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Pricing Overview */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-[#111827]">Pricing Configuration</h3>
                <p className="text-sm text-[#6B7280]">Monthly and yearly pricing details</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-[#F9FAFB] rounded-lg">
                <p className="text-sm text-[#6B7280] mb-1">Monthly Price</p>
                <p className="text-2xl font-semibold text-[#111827]">{getCurrencySymbol(edition.currency)}{edition.monthlyPrice}</p>
                <p className="text-xs text-[#6B7280] mt-1">per month</p>
              </div>
              <div className="p-4 bg-[#F9FAFB] rounded-lg">
                <p className="text-sm text-[#6B7280] mb-1">Yearly Price</p>
                <p className="text-2xl font-semibold text-[#111827]">{getCurrencySymbol(edition.currency)}{edition.yearlyPrice}</p>
                <p className="text-xs text-[#16A34A] mt-1">{yearlyDiscount}% discount</p>
              </div>
              <div className="p-4 bg-[#F9FAFB] rounded-lg">
                <p className="text-sm text-[#6B7280] mb-1">Currency</p>
                <p className="text-xl font-semibold text-[#111827]">{edition.currency}</p>
              </div>
              <div className="p-4 bg-[#F9FAFB] rounded-lg">
                <p className="text-sm text-[#6B7280] mb-1">Tax Behavior</p>
                <p className="text-xl font-semibold text-[#111827] capitalize">{edition.taxBehavior}</p>
              </div>
            </div>
          </div>

          {/* Usage Limits */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Gauge className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-[#111827]">Usage Limits</h3>
                <p className="text-sm text-[#6B7280]">Maximum allowed resources per tenant</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 border border-[#E5E7EB] rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                  <Monitor className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-[#6B7280]">Max Screens</p>
                  <p className="font-semibold text-[#111827]">{formatLimit(edition.usageLimits.maxScreens)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 border border-[#E5E7EB] rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                  <HardDrive className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-[#6B7280]">Max Storage</p>
                  <p className="font-semibold text-[#111827]">
                    {edition.usageLimits.maxStorageGB === 'unlimited' ? 'Unlimited' : `${edition.usageLimits.maxStorageGB} GB`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 border border-[#E5E7EB] rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center flex-shrink-0">
                  <List className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <p className="text-sm text-[#6B7280]">Max Playlists</p>
                  <p className="font-semibold text-[#111827]">{formatLimit(edition.usageLimits.maxPlaylists)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 border border-[#E5E7EB] rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-[#6B7280]">Max Campaigns</p>
                  <p className="font-semibold text-[#111827]">{formatLimit(edition.usageLimits.maxCampaigns)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 border border-[#E5E7EB] rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-[#6B7280]">Max Users</p>
                  <p className="font-semibold text-[#111827]">{formatLimit(edition.usageLimits.maxUsers)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 border border-[#E5E7EB] rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-[#6B7280]">Max Org Units</p>
                  <p className="font-semibold text-[#111827]">{formatLimit(edition.usageLimits.maxOrganizationUnits)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Access */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-[#111827]">Feature Access</h3>
                <p className="text-sm text-[#6B7280]">Enabled and disabled features</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Enabled Features */}
              <div>
                <h4 className="font-medium text-[#111827] mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                  <span>Enabled Features ({enabledFeatures.length})</span>
                </h4>
                <div className="space-y-2">
                  {enabledFeatures.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 p-2 bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                      <span className="text-sm text-[#166534]">{featureLabels[feature]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disabled Features */}
              <div>
                <h4 className="font-medium text-[#111827] mb-3 flex items-center gap-2">
                  <X className="w-5 h-5 text-[#DC2626]" />
                  <span>Disabled Features ({disabledFeatures.length})</span>
                </h4>
                <div className="space-y-2">
                  {disabledFeatures.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 p-2 bg-[#FEF2F2] border border-[#FECACA] rounded-lg">
                      <X className="w-4 h-4 text-[#DC2626] flex-shrink-0" />
                      <span className="text-sm text-[#991B1B]">{featureLabels[feature]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Enforcement Rules */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                <Shield className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-[#111827]">Enforcement Rules</h3>
                <p className="text-sm text-[#6B7280]">Behavior when limits are exceeded</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-[#E5E7EB] rounded-lg">
                <p className="text-sm font-medium text-[#111827] mb-2">Screen Limit Enforcement</p>
                <p className="text-lg font-semibold text-[#D9480F]">{getEnforcementLabel(edition.enforcementRules.screenLimitBehavior)}</p>
              </div>

              <div className="p-4 border border-[#E5E7EB] rounded-lg">
                <p className="text-sm font-medium text-[#111827] mb-2">Storage Limit Enforcement</p>
                <p className="text-lg font-semibold text-[#D9480F]">{getEnforcementLabel(edition.enforcementRules.storageLimitBehavior)}</p>
              </div>

              <div className="p-4 border border-[#E5E7EB] rounded-lg">
                <p className="text-sm font-medium text-[#111827] mb-2">User Limit Enforcement</p>
                <p className="text-lg font-semibold text-[#D9480F]">{getEnforcementLabel(edition.enforcementRules.userLimitBehavior)}</p>
              </div>

              {edition.enforcementRules.gracePeriodDays && (
                <div className="p-4 border border-[#E5E7EB] rounded-lg">
                  <p className="text-sm font-medium text-[#111827] mb-2">Grace Period Duration</p>
                  <p className="text-lg font-semibold text-[#D9480F]">{edition.enforcementRules.gracePeriodDays} days</p>
                </div>
              )}
            </div>
          </div>

          {/* Tenants Using This Edition */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#111827]">Active Tenants</h3>
                  <p className="text-sm text-[#6B7280]">Tenants currently using this edition</p>
                </div>
              </div>
              <span className="text-3xl font-semibold text-[#D9480F]">{edition.tenantsUsingCount}</span>
            </div>

            {edition.tenantsUsingCount > 0 ? (
              <button
                onClick={() => navigate(`/tenants?edition=${edition.id}`)}
                className="w-full flex items-center justify-center gap-2 px-4 h-[44px] border border-[#E5E7EB] bg-white text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors"
              >
                <Users className="w-5 h-5" />
                <span>View All Tenants</span>
              </button>
            ) : (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-[#9CA3AF] mx-auto mb-3" />
                <p className="text-sm text-[#6B7280]">No tenants are currently using this edition</p>
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                <Clock className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-[#111827]">Metadata</h3>
                <p className="text-sm text-[#6B7280]">Edition history and tracking</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-[#6B7280] mb-1">Created Date</p>
                <p className="font-medium text-[#111827]">{formatDate(edition.createdDate)}</p>
              </div>
              <div>
                <p className="text-sm text-[#6B7280] mb-1">Last Modified</p>
                <p className="font-medium text-[#111827]">{formatDate(edition.lastModified)}</p>
              </div>
              <div>
                <p className="text-sm text-[#6B7280] mb-1">Last Modified By</p>
                <p className="font-medium text-[#111827]">{edition.lastModifiedBy}</p>
              </div>
              {edition.internalDescription && (
                <div className="sm:col-span-2">
                  <p className="text-sm text-[#6B7280] mb-1">Internal Description</p>
                  <p className="text-[#111827]">{edition.internalDescription}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Deprecate Confirmation Modal */}
      {showDeprecateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowDeprecateModal(false)}
          />
          <div 
            className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-semibold text-[#111827] mb-2">Deprecate Edition</h3>
            <p className="text-[#6B7280] mb-6">
              Are you sure you want to deprecate <span className="font-medium">{edition.name}</span>? 
              This edition will no longer be available for assignment to new tenants, but existing tenants will retain access.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeprecateModal(false)}
                className="px-4 h-[44px] border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeprecate}
                className="px-4 h-[44px] bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-lg transition-colors"
              >
                Deprecate Edition
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}