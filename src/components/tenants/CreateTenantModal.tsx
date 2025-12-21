import { useState } from 'react';
import { X, Building2, Mail, Globe, Clock, Database, ChevronDown, ChevronUp, AlertTriangle, Eye, EyeOff, Copy, Shield, DollarSign, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { TenantEdition } from '../../data/mockTenants';

interface CreateTenantModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

type DatabaseType = 'shared' | 'dedicated';

export default function CreateTenantModal({ onClose, onSuccess }: CreateTenantModalProps) {
  const [formData, setFormData] = useState({
    companyName: '',
    primaryAdminEmail: '',
    edition: 'professional' as TenantEdition,
    isTrial: false,
    region: 'North America',
    timezone: 'America/New_York',
    // Database Configuration
    databaseType: 'shared' as DatabaseType,
    connectionString: '',
    databaseName: '',
    databaseRegion: '',
    readReplicaEnabled: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showAdvancedDb, setShowAdvancedDb] = useState(false);
  const [showConnectionString, setShowConnectionString] = useState(false);
  const [architectureConfirmed, setArchitectureConfirmed] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.primaryAdminEmail.trim()) {
      newErrors.primaryAdminEmail = 'Admin email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.primaryAdminEmail)) {
      newErrors.primaryAdminEmail = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Generate tenant ID (mock)
    const tenantId = `TNT-2024-${String(Math.floor(Math.random() * 999) + 100).padStart(3, '0')}`;

    // Simulate API call
    setTimeout(() => {
      toast.success('Tenant created successfully', {
        description: `Tenant ID: ${tenantId}. Login credentials have been sent to ${formData.primaryAdminEmail}`,
        duration: 5000,
      });
      onSuccess();
    }, 500);
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <>
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
        />

        {/* Modal Content */}
        <div 
          className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FEF2F2] flex items-center justify-center">
                <Building2 className="w-5 h-5 text-[#D9480F]" />
              </div>
              <div>
                <h2 className="text-[#111827] font-semibold text-xl">Create New Tenant</h2>
                <p className="text-sm text-[#6B7280]">Manually create a new tenant company</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-[#6B7280] hover:bg-[#F9FAFB] rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Company Name <span className="text-[#DC2626]">*</span>
                </label>
                <div className="relative">
                  <Building2 className="w-5 h-5 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleChange('companyName', e.target.value)}
                    placeholder="e.g., Acme Corporation"
                    className={`w-full h-[44px] pl-10 pr-4 border rounded-lg text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent ${
                      errors.companyName ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                    }`}
                  />
                </div>
                {errors.companyName && (
                  <p className="mt-1 text-sm text-[#DC2626]">{errors.companyName}</p>
                )}
              </div>

              {/* Primary Admin Email */}
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Primary Admin Email <span className="text-[#DC2626]">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={formData.primaryAdminEmail}
                    onChange={(e) => handleChange('primaryAdminEmail', e.target.value)}
                    placeholder="admin@company.com"
                    className={`w-full h-[44px] pl-10 pr-4 border rounded-lg text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent ${
                      errors.primaryAdminEmail ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                    }`}
                  />
                </div>
                {errors.primaryAdminEmail && (
                  <p className="mt-1 text-sm text-[#DC2626]">{errors.primaryAdminEmail}</p>
                )}
                <p className="mt-1 text-sm text-[#6B7280]">
                  Login credentials will be sent to this email
                </p>
              </div>

              {/* Edition Selection */}
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-3">
                  Edition / Package <span className="text-[#DC2626]">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { value: 'starter', label: 'Starter', desc: 'For small businesses' },
                    { value: 'professional', label: 'Professional', desc: 'For growing teams' },
                    { value: 'enterprise', label: 'Enterprise', desc: 'For large organizations' },
                    { value: 'custom', label: 'Custom', desc: 'Custom pricing plan' },
                  ].map((edition) => (
                    <button
                      key={edition.value}
                      type="button"
                      onClick={() => handleChange('edition', edition.value)}
                      className={`p-4 border-2 rounded-lg text-left transition-all ${
                        formData.edition === edition.value
                          ? 'border-[#D9480F] bg-[#FEF2F2]'
                          : 'border-[#E5E7EB] hover:border-[#D9480F] hover:bg-[#F9FAFB]'
                      }`}
                    >
                      <p className={`font-medium mb-1 ${
                        formData.edition === edition.value ? 'text-[#D9480F]' : 'text-[#111827]'
                      }`}>
                        {edition.label}
                      </p>
                      <p className="text-sm text-[#6B7280]">{edition.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Trial Toggle */}
              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[#111827] mb-1">Trial Account</p>
                    <p className="text-sm text-[#6B7280]">
                      {formData.isTrial 
                        ? '14-day trial period with full access' 
                        : 'Paid account with immediate billing'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleChange('isTrial', !formData.isTrial)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      formData.isTrial ? 'bg-[#D9480F]' : 'bg-[#D1D5DB]'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.isTrial ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Region */}
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Default Region
                </label>
                <div className="relative">
                  <Globe className="w-5 h-5 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={formData.region}
                    onChange={(e) => handleChange('region', e.target.value)}
                    className="w-full h-[44px] pl-10 pr-4 border border-[#E5E7EB] rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent appearance-none"
                  >
                    <option value="North America">North America</option>
                    <option value="Europe">Europe</option>
                    <option value="Asia Pacific">Asia Pacific</option>
                    <option value="Latin America">Latin America</option>
                    <option value="Middle East">Middle East</option>
                    <option value="Africa">Africa</option>
                  </select>
                </div>
              </div>

              {/* Timezone */}
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Default Timezone
                </label>
                <div className="relative">
                  <Clock className="w-5 h-5 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={formData.timezone}
                    onChange={(e) => handleChange('timezone', e.target.value)}
                    className="w-full h-[44px] pl-10 pr-4 border border-[#E5E7EB] rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent appearance-none"
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="Europe/London">London (GMT)</option>
                    <option value="Europe/Paris">Paris (CET)</option>
                    <option value="Asia/Tokyo">Tokyo (JST)</option>
                    <option value="Asia/Dubai">Dubai (GST)</option>
                    <option value="Australia/Sydney">Sydney (AEDT)</option>
                  </select>
                </div>
              </div>

              {/* Database Configuration - ADVANCED SECTION */}
              <div className="border-t border-[#E5E7EB] pt-6">
                <button
                  type="button"
                  onClick={() => setShowAdvancedDb(!showAdvancedDb)}
                  className="w-full flex items-center justify-between p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg hover:bg-[#F3F4F6] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Database className="w-5 h-5 text-[#6B7280]" />
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[#111827]">Database Configuration</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#FEF2F2] border border-[#FEE2E2] text-[#D9480F] text-xs font-medium">
                          <Shield className="w-3 h-3 mr-1" />
                          Advanced
                        </span>
                      </div>
                      <p className="text-sm text-[#6B7280] mt-1">
                        Configure multi-database architecture and isolation settings
                      </p>
                    </div>
                  </div>
                  {showAdvancedDb ? (
                    <ChevronUp className="w-5 h-5 text-[#6B7280]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#6B7280]" />
                  )}
                </button>

                {showAdvancedDb && (
                  <div className="mt-4 space-y-6 p-4 border border-[#E5E7EB] rounded-lg bg-white">
                    {/* Database Type Selector */}
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-2">
                        Database Type <span className="text-[#DC2626]">*</span>
                      </label>
                      <p className="text-sm text-[#6B7280] mb-3">
                        Choose how this tenant's data is stored and isolated
                      </p>
                      <div className="grid grid-cols-1 gap-3">
                        {/* Shared Database Option */}
                        <button
                          type="button"
                          onClick={() => {
                            handleChange('databaseType', 'shared');
                            setArchitectureConfirmed(false);
                          }}
                          className={`p-4 border-2 rounded-lg text-left transition-all ${
                            formData.databaseType === 'shared'
                              ? 'border-[#16A34A] bg-[#F0FDF4]'
                              : 'border-[#E5E7EB] hover:border-[#16A34A] hover:bg-[#F9FAFB]'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`font-medium ${
                                  formData.databaseType === 'shared' ? 'text-[#16A34A]' : 'text-[#111827]'
                                }`}>
                                  Shared Database
                                </span>
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#F0FDF4] border border-[#BBF7D0] text-[#16A34A] text-xs font-medium">
                                  Recommended
                                </span>
                              </div>
                              <p className="text-sm text-[#6B7280] mb-2">
                                Tenant data will be logically isolated within the shared system database
                              </p>
                              <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                                <span className="flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3 text-[#16A34A]" />
                                  Cost efficient
                                </span>
                                <span className="flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3 text-[#16A34A]" />
                                  Fast provisioning
                                </span>
                                <span className="flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3 text-[#16A34A]" />
                                  Managed backups
                                </span>
                              </div>
                            </div>
                          </div>
                        </button>

                        {/* Dedicated Database Option */}
                        <button
                          type="button"
                          onClick={() => {
                            handleChange('databaseType', 'dedicated');
                            setArchitectureConfirmed(false);
                          }}
                          className={`p-4 border-2 rounded-lg text-left transition-all ${
                            formData.databaseType === 'dedicated'
                              ? 'border-[#D9480F] bg-[#FEF2F2]'
                              : 'border-[#E5E7EB] hover:border-[#D9480F] hover:bg-[#F9FAFB]'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`font-medium ${
                                  formData.databaseType === 'dedicated' ? 'text-[#D9480F]' : 'text-[#111827]'
                                }`}>
                                  Dedicated Database
                                </span>
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#FEF2F2] border border-[#FEE2E2] text-[#D9480F] text-xs font-medium">
                                  Infrastructure Level
                                </span>
                              </div>
                              <p className="text-sm text-[#6B7280] mb-2">
                                Complete database isolation with dedicated infrastructure resources
                              </p>
                              <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                                <span className="flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3 text-[#D9480F]" />
                                  Maximum isolation
                                </span>
                                <span className="flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3 text-[#D9480F]" />
                                  Custom performance
                                </span>
                                <span className="flex items-center gap-1">
                                  <DollarSign className="w-3 h-3 text-[#F59E0B]" />
                                  Additional cost
                                </span>
                              </div>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Shared Database Info */}
                    {formData.databaseType === 'shared' && (
                      <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-4">
                        <div className="flex gap-3">
                          <Database className="w-5 h-5 text-[#3B82F6] flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-[#1E40AF] mb-1">Standard Isolation</p>
                            <p className="text-sm text-[#1E40AF]">
                              Tenant data will be logically isolated within the shared system database. 
                              This approach provides secure multi-tenancy with row-level security and 
                              automatic maintenance.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Dedicated Database Configuration */}
                    {formData.databaseType === 'dedicated' && (
                      <div className="space-y-4">
                        {/* Warning Banner */}
                        <div className="bg-[#FEF2F2] border border-[#FEE2E2] rounded-lg p-4">
                          <div className="flex gap-3">
                            <AlertTriangle className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-[#DC2626] mb-1">Infrastructure Impact</p>
                              <p className="text-sm text-[#DC2626]">
                                This setting affects data isolation, infrastructure cost, and performance. 
                                Database type cannot be changed after tenant activation without migration.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Cost Indicator */}
                        <div className="bg-[#FFFBEB] border border-[#FEF3C7] rounded-lg p-4">
                          <div className="flex gap-3">
                            <DollarSign className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-[#92400E] mb-1">Billing Impact</p>
                              <p className="text-sm text-[#92400E]">
                                Dedicated database incurs additional infrastructure cost. Estimated: 
                                <span className="font-medium"> $200-500/month</span> depending on region and configuration.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Connection String */}
                        <div>
                          <label className="block text-sm font-medium text-[#111827] mb-2">
                            Database Connection String <span className="text-[#DC2626]">*</span>
                          </label>
                          <div className="relative">
                            <Database className="w-5 h-5 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2 z-10" />
                            <input
                              type={showConnectionString ? "text" : "password"}
                              value={formData.connectionString}
                              onChange={(e) => handleChange('connectionString', e.target.value)}
                              placeholder="postgresql://user:password@host:5432/database"
                              className={`w-full h-[44px] pl-10 pr-24 border rounded-lg text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent font-mono text-sm ${
                                errors.connectionString ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                              }`}
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => setShowConnectionString(!showConnectionString)}
                                className="w-8 h-8 flex items-center justify-center text-[#6B7280] hover:bg-[#F9FAFB] rounded transition-colors"
                                title={showConnectionString ? "Hide connection string" : "Show connection string"}
                              >
                                {showConnectionString ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  if (formData.connectionString) {
                                    navigator.clipboard.writeText(formData.connectionString);
                                    toast.success('Connection string copied to clipboard');
                                  }
                                }}
                                className="w-8 h-8 flex items-center justify-center text-[#6B7280] hover:bg-[#F9FAFB] rounded transition-colors"
                                title="Copy connection string"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          {errors.connectionString && (
                            <p className="mt-1 text-sm text-[#DC2626]">{errors.connectionString}</p>
                          )}
                          <p className="mt-1 text-sm text-[#6B7280]">
                            <Shield className="w-3 h-3 inline mr-1" />
                            Secured with encryption at rest and in transit
                          </p>
                        </div>

                        {/* Optional Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Database Name */}
                          <div>
                            <label className="block text-sm font-medium text-[#111827] mb-2">
                              Database Name
                              <span className="ml-1 text-xs text-[#6B7280] font-normal">(Optional)</span>
                            </label>
                            <input
                              type="text"
                              value={formData.databaseName}
                              onChange={(e) => handleChange('databaseName', e.target.value)}
                              placeholder="e.g., tenant_acme_db"
                              className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                            />
                          </div>

                          {/* Database Region */}
                          <div>
                            <label className="block text-sm font-medium text-[#111827] mb-2">
                              Region / Location
                              <span className="ml-1 text-xs text-[#6B7280] font-normal">(Optional)</span>
                            </label>
                            <div className="relative">
                              <Globe className="w-5 h-5 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
                              <select
                                value={formData.databaseRegion}
                                onChange={(e) => handleChange('databaseRegion', e.target.value)}
                                className="w-full h-[44px] pl-10 pr-4 border border-[#E5E7EB] rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent appearance-none"
                              >
                                <option value="">Select region...</option>
                                <option value="us-east-1">US East (N. Virginia)</option>
                                <option value="us-west-2">US West (Oregon)</option>
                                <option value="eu-west-1">EU (Ireland)</option>
                                <option value="eu-central-1">EU (Frankfurt)</option>
                                <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
                                <option value="ap-northeast-1">Asia Pacific (Tokyo)</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Read Replica Toggle */}
                        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="font-medium text-[#111827] mb-1">Read Replica</p>
                              <p className="text-sm text-[#6B7280]">
                                Enable read replica for improved read performance and high availability
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleChange('readReplicaEnabled', !formData.readReplicaEnabled)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                formData.readReplicaEnabled ? 'bg-[#D9480F]' : 'bg-[#D1D5DB]'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  formData.readReplicaEnabled ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        </div>

                        {/* Confirmation Checkbox */}
                        <div className="bg-[#FEF2F2] border-2 border-[#FEE2E2] rounded-lg p-4">
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={architectureConfirmed}
                              onChange={(e) => setArchitectureConfirmed(e.target.checked)}
                              className="w-5 h-5 mt-0.5 rounded border-[#FEE2E2] text-[#D9480F] focus:ring-[#D9480F] focus:ring-offset-0"
                            />
                            <div>
                              <p className="font-medium text-[#DC2626] mb-1">
                                Architecture Confirmation Required
                              </p>
                              <p className="text-sm text-[#DC2626]">
                                I understand this impacts system architecture, billing costs, and cannot be changed 
                                after tenant activation without a complex migration process.
                              </p>
                            </div>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Info Box */}
              <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-4">
                <h4 className="font-medium text-[#1E40AF] mb-2">What happens next?</h4>
                <ul className="space-y-1 text-sm text-[#1E40AF]">
                  <li>• System will auto-generate a unique Tenant ID</li>
                  <li>• Primary admin user account will be created</li>
                  <li>• Default Admin role will be assigned</li>
                  <li>• Login credentials will be emailed to the admin</li>
                  <li>• Admin will be required to reset password on first login</li>
                  {formData.databaseType === 'dedicated' && (
                    <li>• Dedicated database infrastructure will be provisioned (5-10 minutes)</li>
                  )}
                </ul>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E5E7EB]">
            <button
              type="button"
              onClick={onClose}
              className="px-6 h-[44px] border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={formData.databaseType === 'dedicated' && !architectureConfirmed}
              className="px-6 h-[44px] bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Tenant
            </button>
          </div>
        </div>
      </div>
    </>
  );
}