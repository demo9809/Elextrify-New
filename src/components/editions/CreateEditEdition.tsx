import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { 
  ArrowLeft,
  Package,
  Save,
  X,
  Info,
  DollarSign,
  Gauge,
  Zap,
  Shield,
  HelpCircle,
  Globe
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import {
  mockEditions,
  calculateYearlyDiscount,
  getEnforcementLabel,
  getEnforcementDescription,
  type TierLevel,
  type EditionStatus,
  type EnforcementBehavior
} from '../../data/mockEditions';

export default function CreateEditEdition() {
  const { editionId } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!editionId;
  
  const existingEdition = isEditMode ? mockEditions.find(e => e.id === editionId) : null;

  const [activeSection, setActiveSection] = useState(1);
  
  const [formData, setFormData] = useState({
    // Section 1: Basic Information
    name: existingEdition?.name || '',
    tierLevel: (existingEdition?.tierLevel || 'standard') as TierLevel,
    internalDescription: existingEdition?.internalDescription || '',
    customerDescription: existingEdition?.customerDescription || '',
    status: (existingEdition?.status || 'active') as EditionStatus,
    
    // Section 2: Pricing
    monthlyPrice: existingEdition?.monthlyPrice || 0,
    yearlyPrice: existingEdition?.yearlyPrice || 0,
    currency: existingEdition?.currency || 'USD',
    taxBehavior: (existingEdition?.taxBehavior || 'exclusive') as 'exclusive' | 'inclusive',
    
    // Section 3: Usage Limits
    maxScreens: existingEdition?.usageLimits.maxScreens || 10,
    maxScreensUnlimited: existingEdition?.usageLimits.maxScreens === 'unlimited',
    maxStorageGB: existingEdition?.usageLimits.maxStorageGB || 50,
    maxStorageUnlimited: existingEdition?.usageLimits.maxStorageGB === 'unlimited',
    maxPlaylists: existingEdition?.usageLimits.maxPlaylists || 20,
    maxPlaylistsUnlimited: existingEdition?.usageLimits.maxPlaylists === 'unlimited',
    maxCampaigns: existingEdition?.usageLimits.maxCampaigns || 10,
    maxCampaignsUnlimited: existingEdition?.usageLimits.maxCampaigns === 'unlimited',
    maxUsers: existingEdition?.usageLimits.maxUsers || 5,
    maxUsersUnlimited: existingEdition?.usageLimits.maxUsers === 'unlimited',
    maxOrganizationUnits: existingEdition?.usageLimits.maxOrganizationUnits || 1,
    maxOrgUnitsUnlimited: existingEdition?.usageLimits.maxOrganizationUnits === 'unlimited',
    
    // Section 4: Feature Access
    mediaUpload: existingEdition?.featureAccess.mediaUpload ?? true,
    playlists: existingEdition?.featureAccess.playlists ?? true,
    campaignScheduling: existingEdition?.featureAccess.campaignScheduling ?? true,
    html5Content: existingEdition?.featureAccess.html5Content ?? false,
    proofOfPlayReports: existingEdition?.featureAccess.proofOfPlayReports ?? false,
    apiAccess: existingEdition?.featureAccess.apiAccess ?? false,
    advancedAnalytics: existingEdition?.featureAccess.advancedAnalytics ?? false,
    multiOrgUnits: existingEdition?.featureAccess.multiOrgUnits ?? false,
    whiteLabeling: existingEdition?.featureAccess.whiteLabeling ?? false,
    prioritySupport: existingEdition?.featureAccess.prioritySupport ?? false,
    
    // Section 5: Enforcement Rules
    screenLimitBehavior: (existingEdition?.enforcementRules.screenLimitBehavior || 'hard-block') as EnforcementBehavior,
    storageLimitBehavior: (existingEdition?.enforcementRules.storageLimitBehavior || 'soft-warning') as EnforcementBehavior,
    userLimitBehavior: (existingEdition?.enforcementRules.userLimitBehavior || 'hard-block') as EnforcementBehavior,
    gracePeriodDays: existingEdition?.enforcementRules.gracePeriodDays || 7,
  });

  const handleSave = () => {
    // Validate form
    if (!formData.name.trim()) {
      toast.error('Edition name is required');
      setActiveSection(1);
      return;
    }

    if (formData.monthlyPrice <= 0 || formData.yearlyPrice <= 0) {
      toast.error('Pricing must be greater than 0');
      setActiveSection(2);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast.success(isEditMode ? 'Edition updated successfully' : 'Edition created successfully');
      navigate('/editions');
    }, 500);
  };

  const yearlyDiscount = calculateYearlyDiscount(formData.monthlyPrice, formData.yearlyPrice);
  const calculatedYearlyPrice = formData.monthlyPrice * 12;

  const sections = [
    { id: 1, title: 'Basic Information', icon: Package },
    { id: 2, title: 'Pricing Configuration', icon: DollarSign },
    { id: 3, title: 'Usage Limits', icon: Gauge },
    { id: 4, title: 'Feature Access', icon: Zap },
    { id: 5, title: 'Enforcement Rules', icon: Shield },
  ];

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

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-[#111827] mb-2">{isEditMode ? 'Edit Edition' : 'Create New Edition'}</h1>
              <p className="text-[#6B7280]">
                {isEditMode ? 'Update edition settings and capabilities' : 'Define a new SaaS package with features and limits'}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/editions')}
                className="px-6 h-[44px] border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 h-[44px] bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors font-medium"
              >
                <Save className="w-5 h-5" />
                <span>{isEditMode ? 'Save Changes' : 'Create Edition'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="bg-white border-b border-[#E5E7EB] px-4 sm:px-6 lg:px-8 py-4 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                  activeSection === section.id
                    ? 'bg-[#FEF2F2] text-[#D9480F] font-medium'
                    : 'text-[#6B7280] hover:bg-[#F9FAFB]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{section.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-5xl">
          {/* Section 1: Basic Information */}
          {activeSection === 1 && (
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-[#111827] mb-1">Basic Information</h3>
                <p className="text-sm text-[#6B7280]">Core details about this edition</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Edition Name <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Professional"
                    className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Tier Level <span className="text-[#DC2626]">*</span>
                  </label>
                  <select
                    value={formData.tierLevel}
                    onChange={(e) => setFormData({ ...formData, tierLevel: e.target.value as TierLevel })}
                    className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  >
                    <option value="basic">Basic</option>
                    <option value="standard">Standard</option>
                    <option value="ultimate">Ultimate</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Status <span className="text-[#DC2626]">*</span>
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as EditionStatus })}
                    className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="deprecated">Deprecated</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Customer-Facing Description <span className="text-[#DC2626]">*</span>
                  </label>
                  <textarea
                    value={formData.customerDescription}
                    onChange={(e) => setFormData({ ...formData, customerDescription: e.target.value })}
                    placeholder="Description shown to customers"
                    rows={3}
                    className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent resize-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Internal Description (Admin Only)
                  </label>
                  <textarea
                    value={formData.internalDescription}
                    onChange={(e) => setFormData({ ...formData, internalDescription: e.target.value })}
                    placeholder="Internal notes and details"
                    rows={2}
                    className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Pricing Configuration */}
          {activeSection === 2 && (
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-[#111827] mb-1">Pricing Configuration</h3>
                <p className="text-sm text-[#6B7280]">Set monthly and yearly pricing</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Monthly Price <span className="text-[#DC2626]">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="w-5 h-5 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="number"
                      value={formData.monthlyPrice}
                      onChange={(e) => setFormData({ ...formData, monthlyPrice: parseFloat(e.target.value) || 0 })}
                      min="0"
                      step="0.01"
                      className="w-full h-[44px] pl-10 pr-4 border border-[#E5E7EB] rounded-lg text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                    />
                  </div>
                  <p className="mt-1 text-sm text-[#6B7280]">Per month billing</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Yearly Price <span className="text-[#DC2626]">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="w-5 h-5 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="number"
                      value={formData.yearlyPrice}
                      onChange={(e) => setFormData({ ...formData, yearlyPrice: parseFloat(e.target.value) || 0 })}
                      min="0"
                      step="0.01"
                      className="w-full h-[44px] pl-10 pr-4 border border-[#E5E7EB] rounded-lg text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                    />
                  </div>
                  <p className="mt-1 text-sm text-[#6B7280]">Annual billing amount</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Currency
                  </label>
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  >
                    <option value="USD">USD - US Dollar ($)</option>
                    <option value="EUR">EUR - Euro (€)</option>
                    <option value="GBP">GBP - British Pound (£)</option>
                    <option value="JPY">JPY - Japanese Yen (¥)</option>
                    <option value="AUD">AUD - Australian Dollar (A$)</option>
                    <option value="CAD">CAD - Canadian Dollar (C$)</option>
                    <option value="INR">INR - Indian Rupee (₹)</option>
                  </select>
                  <p className="mt-1 text-sm text-[#6B7280]">All prices for this edition will be in {formData.currency}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Tax Behavior
                  </label>
                  <select
                    value={formData.taxBehavior}
                    onChange={(e) => setFormData({ ...formData, taxBehavior: e.target.value as 'exclusive' | 'inclusive' })}
                    className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  >
                    <option value="exclusive">Tax Exclusive</option>
                    <option value="inclusive">Tax Inclusive</option>
                  </select>
                </div>
              </div>

              {/* Pricing Preview */}
              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                <h4 className="font-medium text-[#111827] mb-3">Pricing Preview</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-[#6B7280] mb-1">Monthly Total (12 months)</p>
                    <p className="text-lg font-semibold text-[#111827]">${calculatedYearlyPrice.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B7280] mb-1">Yearly Price</p>
                    <p className="text-lg font-semibold text-[#111827]">${formData.yearlyPrice.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B7280] mb-1">Yearly Discount</p>
                    <p className="text-lg font-semibold text-[#16A34A]">{yearlyDiscount}%</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Usage Limits */}
          {activeSection === 3 && (
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-[#111827] mb-1">Usage Limits (Hard Gates)</h3>
                <p className="text-sm text-[#6B7280]">Define maximum allowed resources per tenant</p>
              </div>

              <div className="space-y-4">
                {/* Max Screens */}
                <div className="flex items-start gap-4 p-4 border border-[#E5E7EB] rounded-lg">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-[#111827] mb-1">
                      Max Screens / Devices
                    </label>
                    <input
                      type="number"
                      value={formData.maxScreensUnlimited ? '' : formData.maxScreens}
                      onChange={(e) => setFormData({ ...formData, maxScreens: parseInt(e.target.value) || 0 })}
                      disabled={formData.maxScreensUnlimited}
                      min="0"
                      className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF]"
                    />
                  </div>
                  <label className="flex items-center gap-2 pt-10 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.maxScreensUnlimited}
                      onChange={(e) => setFormData({ ...formData, maxScreensUnlimited: e.target.checked })}
                      className="w-4 h-4 rounded border-[#D1D5DB] text-[#D9480F] focus:ring-[#D9480F] focus:ring-offset-0"
                    />
                    <span className="text-sm text-[#6B7280]">Unlimited</span>
                  </label>
                </div>

                {/* Max Storage */}
                <div className="flex items-start gap-4 p-4 border border-[#E5E7EB] rounded-lg">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-[#111827] mb-1">
                      Max Media Storage (GB)
                    </label>
                    <input
                      type="number"
                      value={formData.maxStorageUnlimited ? '' : formData.maxStorageGB}
                      onChange={(e) => setFormData({ ...formData, maxStorageGB: parseInt(e.target.value) || 0 })}
                      disabled={formData.maxStorageUnlimited}
                      min="0"
                      className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF]"
                    />
                  </div>
                  <label className="flex items-center gap-2 pt-10 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.maxStorageUnlimited}
                      onChange={(e) => setFormData({ ...formData, maxStorageUnlimited: e.target.checked })}
                      className="w-4 h-4 rounded border-[#D1D5DB] text-[#D9480F] focus:ring-[#D9480F] focus:ring-offset-0"
                    />
                    <span className="text-sm text-[#6B7280]">Unlimited</span>
                  </label>
                </div>

                {/* Max Playlists */}
                <div className="flex items-start gap-4 p-4 border border-[#E5E7EB] rounded-lg">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-[#111827] mb-1">
                      Max Playlists
                    </label>
                    <input
                      type="number"
                      value={formData.maxPlaylistsUnlimited ? '' : formData.maxPlaylists}
                      onChange={(e) => setFormData({ ...formData, maxPlaylists: parseInt(e.target.value) || 0 })}
                      disabled={formData.maxPlaylistsUnlimited}
                      min="0"
                      className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF]"
                    />
                  </div>
                  <label className="flex items-center gap-2 pt-10 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.maxPlaylistsUnlimited}
                      onChange={(e) => setFormData({ ...formData, maxPlaylistsUnlimited: e.target.checked })}
                      className="w-4 h-4 rounded border-[#D1D5DB] text-[#D9480F] focus:ring-[#D9480F] focus:ring-offset-0"
                    />
                    <span className="text-sm text-[#6B7280]">Unlimited</span>
                  </label>
                </div>

                {/* Max Campaigns */}
                <div className="flex items-start gap-4 p-4 border border-[#E5E7EB] rounded-lg">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-[#111827] mb-1">
                      Max Campaigns
                    </label>
                    <input
                      type="number"
                      value={formData.maxCampaignsUnlimited ? '' : formData.maxCampaigns}
                      onChange={(e) => setFormData({ ...formData, maxCampaigns: parseInt(e.target.value) || 0 })}
                      disabled={formData.maxCampaignsUnlimited}
                      min="0"
                      className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF]"
                    />
                  </div>
                  <label className="flex items-center gap-2 pt-10 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.maxCampaignsUnlimited}
                      onChange={(e) => setFormData({ ...formData, maxCampaignsUnlimited: e.target.checked })}
                      className="w-4 h-4 rounded border-[#D1D5DB] text-[#D9480F] focus:ring-[#D9480F] focus:ring-offset-0"
                    />
                    <span className="text-sm text-[#6B7280]">Unlimited</span>
                  </label>
                </div>

                {/* Max Users */}
                <div className="flex items-start gap-4 p-4 border border-[#E5E7EB] rounded-lg">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-[#111827] mb-1">
                      Max Users
                    </label>
                    <input
                      type="number"
                      value={formData.maxUsersUnlimited ? '' : formData.maxUsers}
                      onChange={(e) => setFormData({ ...formData, maxUsers: parseInt(e.target.value) || 0 })}
                      disabled={formData.maxUsersUnlimited}
                      min="0"
                      className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF]"
                    />
                  </div>
                  <label className="flex items-center gap-2 pt-10 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.maxUsersUnlimited}
                      onChange={(e) => setFormData({ ...formData, maxUsersUnlimited: e.target.checked })}
                      className="w-4 h-4 rounded border-[#D1D5DB] text-[#D9480F] focus:ring-[#D9480F] focus:ring-offset-0"
                    />
                    <span className="text-sm text-[#6B7280]">Unlimited</span>
                  </label>
                </div>

                {/* Max Organization Units */}
                <div className="flex items-start gap-4 p-4 border border-[#E5E7EB] rounded-lg">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-[#111827] mb-1">
                      Max Organization Units
                    </label>
                    <input
                      type="number"
                      value={formData.maxOrgUnitsUnlimited ? '' : formData.maxOrganizationUnits}
                      onChange={(e) => setFormData({ ...formData, maxOrganizationUnits: parseInt(e.target.value) || 0 })}
                      disabled={formData.maxOrgUnitsUnlimited}
                      min="0"
                      className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF]"
                    />
                  </div>
                  <label className="flex items-center gap-2 pt-10 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.maxOrgUnitsUnlimited}
                      onChange={(e) => setFormData({ ...formData, maxOrgUnitsUnlimited: e.target.checked })}
                      className="w-4 h-4 rounded border-[#D1D5DB] text-[#D9480F] focus:ring-[#D9480F] focus:ring-offset-0"
                    />
                    <span className="text-sm text-[#6B7280]">Unlimited</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Feature Access */}
          {activeSection === 4 && (
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-[#111827] mb-1">Feature Access (Soft Gates)</h3>
                <p className="text-sm text-[#6B7280]">Control which features are available to tenants</p>
              </div>

              <div className="space-y-6">
                {/* Core Features */}
                <div>
                  <h4 className="font-medium text-[#111827] mb-3">Core Features</h4>
                  <div className="space-y-3">
                    {[
                      { key: 'mediaUpload', label: 'Media Upload', desc: 'Upload and manage media files' },
                      { key: 'playlists', label: 'Playlists', desc: 'Create and manage content playlists' },
                      { key: 'campaignScheduling', label: 'Campaign Scheduling', desc: 'Schedule campaigns with date/time rules' },
                    ].map((feature) => (
                      <label key={feature.key} className="flex items-start gap-3 p-3 border border-[#E5E7EB] rounded-lg cursor-pointer hover:bg-[#F9FAFB] transition-colors">
                        <input
                          type="checkbox"
                          checked={formData[feature.key as keyof typeof formData] as boolean}
                          onChange={(e) => setFormData({ ...formData, [feature.key]: e.target.checked })}
                          className="w-5 h-5 mt-0.5 rounded border-[#D1D5DB] text-[#D9480F] focus:ring-[#D9480F] focus:ring-offset-0"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-[#111827]">{feature.label}</p>
                          <p className="text-sm text-[#6B7280]">{feature.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Advanced Features */}
                <div>
                  <h4 className="font-medium text-[#111827] mb-3">Advanced Features</h4>
                  <div className="space-y-3">
                    {[
                      { key: 'html5Content', label: 'HTML5 Content', desc: 'Support for custom HTML5 widgets' },
                      { key: 'proofOfPlayReports', label: 'Proof-of-Play Reports', desc: 'Detailed playback verification reports' },
                      { key: 'apiAccess', label: 'API Access', desc: 'Access to REST API for integrations' },
                      { key: 'advancedAnalytics', label: 'Advanced Analytics', desc: 'In-depth analytics and insights' },
                      { key: 'multiOrgUnits', label: 'Multi Organization Units', desc: 'Manage multiple organizational units' },
                      { key: 'whiteLabeling', label: 'White Labeling', desc: 'Custom branding and white-label options' },
                      { key: 'prioritySupport', label: 'Priority Support', desc: 'Priority customer support access' },
                    ].map((feature) => (
                      <label key={feature.key} className="flex items-start gap-3 p-3 border border-[#E5E7EB] rounded-lg cursor-pointer hover:bg-[#F9FAFB] transition-colors">
                        <input
                          type="checkbox"
                          checked={formData[feature.key as keyof typeof formData] as boolean}
                          onChange={(e) => setFormData({ ...formData, [feature.key]: e.target.checked })}
                          className="w-5 h-5 mt-0.5 rounded border-[#D1D5DB] text-[#D9480F] focus:ring-[#D9480F] focus:ring-offset-0"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-[#111827]">{feature.label}</p>
                          <p className="text-sm text-[#6B7280]">{feature.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 5: Enforcement Rules */}
          {activeSection === 5 && (
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-[#111827] mb-1">Enforcement Rules</h3>
                <p className="text-sm text-[#6B7280]">Define what happens when tenants exceed limits</p>
              </div>

              <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-4 flex items-start gap-3">
                <Info className="w-5 h-5 text-[#1E40AF] flex-shrink-0 mt-0.5" />
                <div className="text-sm text-[#1E40AF]">
                  <p className="font-medium mb-1">Enforcement Behavior Explained</p>
                  <ul className="space-y-1 text-sm">
                    <li>• <strong>Hard Block:</strong> Tenant cannot exceed limit - operations are blocked immediately</li>
                    <li>• <strong>Soft Warning:</strong> Tenant receives warnings but can temporarily exceed the limit</li>
                    <li>• <strong>Grace Period:</strong> Tenant gets specified days to reduce usage before being blocked</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                {/* Screen Limit Enforcement */}
                <div className="p-4 border border-[#E5E7EB] rounded-lg">
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Screen Limit Enforcement
                  </label>
                  <select
                    value={formData.screenLimitBehavior}
                    onChange={(e) => setFormData({ ...formData, screenLimitBehavior: e.target.value as EnforcementBehavior })}
                    className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  >
                    <option value="hard-block">Hard Block</option>
                    <option value="soft-warning">Soft Warning</option>
                    <option value="grace-period">Grace Period</option>
                  </select>
                  <p className="mt-2 text-sm text-[#6B7280]">
                    {getEnforcementDescription(formData.screenLimitBehavior)}
                  </p>
                </div>

                {/* Storage Limit Enforcement */}
                <div className="p-4 border border-[#E5E7EB] rounded-lg">
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Storage Limit Enforcement
                  </label>
                  <select
                    value={formData.storageLimitBehavior}
                    onChange={(e) => setFormData({ ...formData, storageLimitBehavior: e.target.value as EnforcementBehavior })}
                    className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  >
                    <option value="hard-block">Hard Block</option>
                    <option value="soft-warning">Soft Warning</option>
                    <option value="grace-period">Grace Period</option>
                  </select>
                  <p className="mt-2 text-sm text-[#6B7280]">
                    {getEnforcementDescription(formData.storageLimitBehavior)}
                  </p>
                </div>

                {/* User Limit Enforcement */}
                <div className="p-4 border border-[#E5E7EB] rounded-lg">
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    User Limit Enforcement
                  </label>
                  <select
                    value={formData.userLimitBehavior}
                    onChange={(e) => setFormData({ ...formData, userLimitBehavior: e.target.value as EnforcementBehavior })}
                    className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  >
                    <option value="hard-block">Hard Block</option>
                    <option value="soft-warning">Soft Warning</option>
                    <option value="grace-period">Grace Period</option>
                  </select>
                  <p className="mt-2 text-sm text-[#6B7280]">
                    {getEnforcementDescription(formData.userLimitBehavior)}
                  </p>
                </div>

                {/* Grace Period Days */}
                {(formData.screenLimitBehavior === 'grace-period' || 
                  formData.storageLimitBehavior === 'grace-period' || 
                  formData.userLimitBehavior === 'grace-period') && (
                  <div className="p-4 bg-[#FEF3C7] border border-[#FDE68A] rounded-lg">
                    <label className="block text-sm font-medium text-[#92400E] mb-2">
                      Grace Period Duration (Days)
                    </label>
                    <input
                      type="number"
                      value={formData.gracePeriodDays}
                      onChange={(e) => setFormData({ ...formData, gracePeriodDays: parseInt(e.target.value) || 7 })}
                      min="1"
                      max="90"
                      className="w-full h-[44px] px-4 border border-[#FDE68A] rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
                    />
                    <p className="mt-2 text-sm text-[#92400E]">
                      Number of days tenant can exceed limits before being blocked
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}