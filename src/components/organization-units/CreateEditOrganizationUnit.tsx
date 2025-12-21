import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  Save,
  X,
  AlertCircle,
  Shield,
  MapPin,
  Briefcase,
  Layers
} from 'lucide-react';
import { toast } from 'sonner';
import {
  mockOrganizationUnits,
  getUnitTypeLabel,
  wouldCreateCircularReference,
  type OrganizationUnit,
  type UnitType,
  type UnitStatus
} from '../../data/mockOrganizationUnits';
import GSTComplianceSection, { type GSTData } from './GSTComplianceSection';
import IndiaLegalBillingForm, { type IndiaLegalBillingData } from './IndiaLegalBillingForm';

export default function CreateEditOrganizationUnit() {
  const navigate = useNavigate();
  const { unitId } = useParams();
  const isEditing = !!unitId;

  const [formData, setFormData] = useState({
    name: '',
    parentId: '',
    unitType: 'department' as UnitType,
    status: 'active' as UnitStatus,
    timezone: 'Asia/Kolkata',
    currency: 'INR',
    // Legal Entity Information (India-specific)
    legalEntityName: '',
    tradeName: '',
    businessType: '' as 'proprietorship' | 'partnership' | 'llp' | 'private-limited' | 'public-limited' | 'trust-ngo' | '',
    panNumber: '',
    // Registered Address (India-specific)
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    // Invoice Configuration
    invoicePrefix: '',
    invoiceStartNumber: '1001',
    invoiceLanguage: 'english-india' as 'english' | 'english-india',
    // Bank & Payment Details
    bankName: '',
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    // Legacy fields (kept for backward compatibility)
    legalCompanyName: '',
    billingAddress: '',
    taxId: '',
    invoiceEmail: '',
    country: 'India',
    region: '',
    // GST Compliance data
    gstData: {
      isGSTRegistered: false,
      gstin: '',
      stateCode: '',
      stateName: '',
      gstRegistrationDate: '',
      compositionScheme: false,
      reverseChargeApplicable: false,
    } as GSTData,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEditing) {
      const unit = mockOrganizationUnits.find(u => u.id === unitId);
      if (unit) {
        setFormData({
          name: unit.name,
          parentId: unit.parentId || '',
          unitType: unit.unitType,
          status: unit.status,
          timezone: unit.timezone,
          currency: unit.currency,
          // India-specific fields
          legalEntityName: unit.billingInformation?.legalCompanyName || '',
          tradeName: '',
          businessType: '' as any,
          panNumber: unit.billingInformation?.taxId || '',
          addressLine1: unit.billingInformation?.billingAddress?.split(',')[0] || '',
          addressLine2: '',
          city: '',
          state: unit.billingInformation?.region || '',
          pincode: '',
          invoicePrefix: '',
          invoiceStartNumber: '1001',
          invoiceLanguage: 'english-india' as 'english' | 'english-india',
          bankName: '',
          accountHolderName: '',
          accountNumber: '',
          ifscCode: '',
          // Legacy fields
          legalCompanyName: unit.billingInformation?.legalCompanyName || '',
          billingAddress: unit.billingInformation?.billingAddress || '',
          taxId: unit.billingInformation?.taxId || '',
          invoiceEmail: unit.billingInformation?.invoiceEmail || '',
          country: unit.billingInformation?.country || 'India',
          region: unit.billingInformation?.region || '',
          gstData: {
            isGSTRegistered: unit.billingInformation?.gstData?.isGSTRegistered || false,
            gstin: unit.billingInformation?.gstData?.gstin || '',
            stateCode: unit.billingInformation?.gstData?.stateCode || '',
            stateName: unit.billingInformation?.gstData?.stateName || '',
            gstRegistrationDate: unit.billingInformation?.gstData?.gstRegistrationDate || '',
            compositionScheme: unit.billingInformation?.gstData?.compositionScheme || false,
            reverseChargeApplicable: unit.billingInformation?.gstData?.reverseChargeApplicable || false,
          } as GSTData,
        });
      }
    }
  }, [isEditing, unitId]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Organization unit name is required';
    }

    if (formData.parentId && wouldCreateCircularReference(unitId || '', formData.parentId, mockOrganizationUnits)) {
      newErrors.parentId = 'This would create a circular reference in the hierarchy';
    }

    if (formData.unitType === 'legal-entity') {
      // India-specific validation
      if (!formData.legalEntityName.trim()) {
        newErrors.legalEntityName = 'Legal entity name is required';
      }
      if (!formData.businessType) {
        newErrors.businessType = 'Business type is required';
      }
      
      // Address validation
      if (!formData.addressLine1.trim()) {
        newErrors.addressLine1 = 'Address is required';
      }
      if (!formData.city.trim()) {
        newErrors.city = 'City is required';
      }
      if (!formData.state.trim()) {
        newErrors.state = 'State is required';
      }
      if (!formData.pincode.trim()) {
        newErrors.pincode = 'Pincode is required';
      } else {
        // Validate pincode format
        const pincodeRegex = /^[1-9][0-9]{5}$/;
        if (!pincodeRegex.test(formData.pincode)) {
          newErrors.pincode = 'Invalid pincode format (6 digits)';
        }
      }
      
      // GST validation
      if (formData.gstData.isGSTRegistered) {
        if (!formData.gstData.gstin.trim()) {
          newErrors.gstin = 'GSTIN is required when GST is enabled';
        } else {
          // Validate GSTIN format
          const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
          if (!gstinRegex.test(formData.gstData.gstin)) {
            newErrors.gstin = 'Invalid GSTIN format (15 characters required)';
          }
        }
        if (!formData.gstData.stateCode) {
          newErrors.stateCode = 'State of registration is required when GST is enabled';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      toast.error('Please fix the errors before saving');
      return;
    }

    if (isEditing) {
      toast.success('Organization unit updated successfully');
    } else {
      toast.success('Organization unit created successfully');
    }
    
    navigate('/organization-units');
  };

  const availableParents = mockOrganizationUnits.filter(u => u.id !== unitId);

  const getParentBreadcrumb = () => {
    if (!formData.parentId) return 'Root Level';
    
    const parent = mockOrganizationUnits.find(u => u.id === formData.parentId);
    if (!parent) return 'Root Level';
    
    const breadcrumbs = [parent.name];
    let currentParent = parent;
    
    while (currentParent.parentId) {
      const nextParent = mockOrganizationUnits.find(u => u.id === currentParent.parentId);
      if (!nextParent) break;
      breadcrumbs.unshift(nextParent.name);
      currentParent = nextParent;
    }
    
    return breadcrumbs.join(' > ');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/organization-units')}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-[#F9FAFB] transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-[#111827] flex items-center gap-3">
                  <Building2 className="w-6 h-6 text-[#D9480F]" />
                  {isEditing ? 'Edit Organization Unit' : 'New Organization Unit'}
                </h1>
                <p className="text-sm text-[#6B7280] mt-1">
                  {isEditing ? 'Update organization unit information' : 'Create a new organization unit'}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate('/organization-units')}
                className="flex items-center gap-2 px-4 h-[44px] border border-[#E5E7EB] bg-white text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors text-sm font-medium"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Cancel</span>
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-4 h-[44px] bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors text-sm font-medium"
              >
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">{isEditing ? 'Update Unit' : 'Create Unit'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-4xl mx-auto space-y-6">
        {/* Basic Information */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
          <h2 className="font-semibold text-[#111827] mb-4">Basic Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-2">
                Organization Unit Name <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., North America Region"
                className={`w-full h-[44px] px-4 border ${
                  errors.name ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                } rounded-lg text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-[#DC2626] flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111827] mb-2">
                Parent Organization Unit
              </label>
              <select
                value={formData.parentId}
                onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                className={`w-full h-[44px] px-4 border ${
                  errors.parentId ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                } rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent`}
              >
                <option value="">Root Level (No Parent)</option>
                {availableParents.map(unit => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name} ({getUnitTypeLabel(unit.unitType)})
                  </option>
                ))}
              </select>
              {errors.parentId && (
                <p className="mt-1 text-sm text-[#DC2626] flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.parentId}
                </p>
              )}
              {formData.parentId && (
                <p className="mt-1 text-sm text-[#6B7280]">
                  Will be placed under: {getParentBreadcrumb()}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111827] mb-2">
                Unit Type <span className="text-[#DC2626]">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(['legal-entity', 'regional-office', 'sub-agency', 'department'] as UnitType[]).map((type) => {
                  const icons = {
                    'legal-entity': Shield,
                    'regional-office': MapPin,
                    'sub-agency': Briefcase,
                    'department': Layers,
                  };
                  const Icon = icons[type];
                  
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, unitType: type })}
                      className={`p-4 border-2 rounded-lg transition-all text-left ${
                        formData.unitType === type
                          ? 'border-[#D9480F] bg-[#FEF2F2]'
                          : 'border-[#E5E7EB] hover:border-[#D9480F] hover:bg-[#F9FAFB]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          formData.unitType === type ? 'bg-[#D9480F]' : 'bg-[#F9FAFB]'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            formData.unitType === type ? 'text-white' : 'text-[#6B7280]'
                          }`} />
                        </div>
                        <div>
                          <p className={`font-medium ${
                            formData.unitType === type ? 'text-[#D9480F]' : 'text-[#111827]'
                          }`}>
                            {getUnitTypeLabel(type)}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111827] mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as UnitStatus })}
                className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Configuration */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
          <h2 className="font-semibold text-[#111827] mb-4">Configuration</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-2">
                Timezone
              </label>
              <select
                value={formData.timezone}
                onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              >
                <option value="Asia/Kolkata">Asia/Kolkata (IST) - India</option>
                <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                <option value="Asia/Singapore">Asia/Singapore (SGT)</option>
                <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                <option value="America/New_York">America/New York (EST)</option>
                <option value="America/Chicago">America/Chicago (CST)</option>
                <option value="America/Denver">America/Denver (MST)</option>
                <option value="America/Los_Angeles">America/Los Angeles (PST)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
                <option value="Europe/Paris">Europe/Paris (CET)</option>
                <option value="Europe/Berlin">Europe/Berlin (CET)</option>
                <option value="Australia/Sydney">Australia/Sydney (AEDT)</option>
              </select>
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
                <option value="INR">INR - Indian Rupee (₹)</option>
                <option value="USD">USD - US Dollar ($)</option>
                <option value="EUR">EUR - Euro (€)</option>
                <option value="GBP">GBP - British Pound (£)</option>
                <option value="JPY">JPY - Japanese Yen (¥)</option>
                <option value="AUD">AUD - Australian Dollar (A$)</option>
                <option value="CAD">CAD - Canadian Dollar (C$)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Legal, Billing & Tax Information (only for legal entities - India-specific) */}
        {formData.unitType === 'legal-entity' && (
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
            <IndiaLegalBillingForm
              data={{
                legalEntityName: formData.legalEntityName,
                tradeName: formData.tradeName,
                businessType: formData.businessType,
                panNumber: formData.panNumber,
                addressLine1: formData.addressLine1,
                addressLine2: formData.addressLine2,
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode,
                invoiceEmail: formData.invoiceEmail,
                invoicePrefix: formData.invoicePrefix,
                invoiceStartNumber: formData.invoiceStartNumber,
                invoiceLanguage: formData.invoiceLanguage,
                bankName: formData.bankName,
                accountHolderName: formData.accountHolderName,
                accountNumber: formData.accountNumber,
                ifscCode: formData.ifscCode,
                gstData: formData.gstData,
              }}
              onChange={(newData) => setFormData({ 
                ...formData,
                legalEntityName: newData.legalEntityName,
                tradeName: newData.tradeName,
                businessType: newData.businessType,
                panNumber: newData.panNumber,
                addressLine1: newData.addressLine1,
                addressLine2: newData.addressLine2,
                city: newData.city,
                state: newData.state,
                pincode: newData.pincode,
                invoiceEmail: newData.invoiceEmail,
                invoicePrefix: newData.invoicePrefix,
                invoiceStartNumber: newData.invoiceStartNumber,
                invoiceLanguage: newData.invoiceLanguage,
                bankName: newData.bankName,
                accountHolderName: newData.accountHolderName,
                accountNumber: newData.accountNumber,
                ifscCode: newData.ifscCode,
                gstData: newData.gstData,
              })}
              errors={errors}
            />
          </div>
        )}
      </div>
    </div>
  );
}