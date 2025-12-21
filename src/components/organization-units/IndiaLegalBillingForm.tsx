import { useState } from 'react';
import { Shield, Building2, MapPin, FileText, Landmark, Eye, EyeOff, AlertCircle } from 'lucide-react';
import GSTComplianceSection, { type GSTData } from './GSTComplianceSection';

// Indian States and UTs
const INDIAN_STATES = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

export type BusinessType = 'proprietorship' | 'partnership' | 'llp' | 'private-limited' | 'public-limited' | 'trust-ngo';

export interface IndiaLegalBillingData {
  // Legal Entity Information
  legalEntityName: string;
  tradeName: string;
  businessType: BusinessType | '';
  panNumber: string;
  
  // Registered Address
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  
  // Invoice Configuration
  invoiceEmail: string;
  invoicePrefix: string;
  invoiceStartNumber: string;
  invoiceLanguage: 'english' | 'english-india';
  
  // Bank & Payment Details
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  
  // GST Compliance
  gstData: GSTData;
}

interface IndiaLegalBillingFormProps {
  data: IndiaLegalBillingData;
  onChange: (data: IndiaLegalBillingData) => void;
  errors?: Record<string, string>;
}

export default function IndiaLegalBillingForm({ data, onChange, errors = {} }: IndiaLegalBillingFormProps) {
  const [showPAN, setShowPAN] = useState(false);
  const [showAccountNumber, setShowAccountNumber] = useState(false);

  // Validate PAN format (10 characters: 5 letters + 4 digits + 1 letter)
  const validatePAN = (pan: string): boolean => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  // Validate Pincode (6 digits)
  const validatePincode = (pincode: string): boolean => {
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    return pincodeRegex.test(pincode);
  };

  // Validate IFSC (11 characters: 4 letters + 7 alphanumeric)
  const validateIFSC = (ifsc: string): boolean => {
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    return ifscRegex.test(ifsc);
  };

  const handlePANChange = (value: string) => {
    const upperValue = value.toUpperCase();
    onChange({ ...data, panNumber: upperValue });
  };

  const handleIFSCChange = (value: string) => {
    const upperValue = value.toUpperCase();
    onChange({ ...data, ifscCode: upperValue });
  };

  const handlePincodeChange = (value: string) => {
    // Only allow digits
    const numericValue = value.replace(/\D/g, '').slice(0, 6);
    onChange({ ...data, pincode: numericValue });
  };

  const businessTypeLabels: Record<BusinessType, string> = {
    'proprietorship': 'Proprietorship',
    'partnership': 'Partnership',
    'llp': 'Limited Liability Partnership (LLP)',
    'private-limited': 'Private Limited Company',
    'public-limited': 'Public Limited Company',
    'trust-ngo': 'Trust / NGO',
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-5 h-5 text-[#D9480F]" />
          <h2 className="font-semibold text-[#111827]">Legal, Billing & Tax Information</h2>
        </div>
        <p className="text-sm text-[#6B7280]">
          Configure entity details as per Indian business and tax standards
        </p>
      </div>

      {/* GST & Tax Compliance - MOVED TO TOP */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
        <GSTComplianceSection
          data={data.gstData}
          onChange={(newGSTData) => onChange({ ...data, gstData: newGSTData })}
          errors={errors}
        />
      </div>

      {/* Legal Entity Information */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="w-5 h-5 text-[#D9480F]" />
          <h3 className="font-semibold text-[#111827]">Legal Entity Information</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Legal Entity Name (as per GST) <span className="text-[#DC2626]">*</span>
            </label>
            <input
              type="text"
              value={data.legalEntityName}
              onChange={(e) => onChange({ ...data, legalEntityName: e.target.value })}
              placeholder="e.g., ABC Digital Solutions Private Limited"
              className={`w-full h-[44px] px-4 border ${
                errors.legalEntityName ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
              } rounded-lg text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent`}
            />
            {errors.legalEntityName && (
              <p className="mt-1 text-sm text-[#DC2626] flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.legalEntityName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Trade Name (Optional)
            </label>
            <input
              type="text"
              value={data.tradeName}
              onChange={(e) => onChange({ ...data, tradeName: e.target.value })}
              placeholder="e.g., ABC Digital"
              className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            />
            <p className="mt-1 text-sm text-[#6B7280]">Brand name or DBA (Doing Business As)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Business Type <span className="text-[#DC2626]">*</span>
            </label>
            <select
              value={data.businessType}
              onChange={(e) => onChange({ ...data, businessType: e.target.value as BusinessType })}
              className={`w-full h-[44px] px-4 border ${
                errors.businessType ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
              } rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent`}
            >
              <option value="">Select business type</option>
              <option value="proprietorship">Proprietorship</option>
              <option value="partnership">Partnership</option>
              <option value="llp">Limited Liability Partnership (LLP)</option>
              <option value="private-limited">Private Limited Company</option>
              <option value="public-limited">Public Limited Company</option>
              <option value="trust-ngo">Trust / NGO</option>
            </select>
            {errors.businessType && (
              <p className="mt-1 text-sm text-[#DC2626]">{errors.businessType}</p>
            )}
          </div>
        </div>
      </div>

      {/* Registered Address */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-[#D9480F]" />
          <h3 className="font-semibold text-[#111827]">Registered Address</h3>
        </div>
        <p className="text-sm text-[#6B7280] mb-4">Used for invoices and tax determination</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Address Line 1 <span className="text-[#DC2626]">*</span>
            </label>
            <input
              type="text"
              value={data.addressLine1}
              onChange={(e) => onChange({ ...data, addressLine1: e.target.value })}
              placeholder="Building/Flat No., Street Name"
              className={`w-full h-[44px] px-4 border ${
                errors.addressLine1 ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
              } rounded-lg text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent`}
            />
            {errors.addressLine1 && (
              <p className="mt-1 text-sm text-[#DC2626]">{errors.addressLine1}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Address Line 2
            </label>
            <input
              type="text"
              value={data.addressLine2}
              onChange={(e) => onChange({ ...data, addressLine2: e.target.value })}
              placeholder="Area, Landmark (optional)"
              className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-2">
                City <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="text"
                value={data.city}
                onChange={(e) => onChange({ ...data, city: e.target.value })}
                placeholder="e.g., Mumbai"
                className={`w-full h-[44px] px-4 border ${
                  errors.city ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                } rounded-lg text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent`}
              />
              {errors.city && (
                <p className="mt-1 text-sm text-[#DC2626]">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111827] mb-2">
                State <span className="text-[#DC2626]">*</span>
              </label>
              <select
                value={data.state}
                onChange={(e) => onChange({ ...data, state: e.target.value })}
                className={`w-full h-[44px] px-4 border ${
                  errors.state ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                } rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent`}
              >
                <option value="">Select state</option>
                {INDIAN_STATES.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              {errors.state && (
                <p className="mt-1 text-sm text-[#DC2626]">{errors.state}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111827] mb-2">
                Pincode <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="text"
                value={data.pincode}
                onChange={(e) => handlePincodeChange(e.target.value)}
                placeholder="400001"
                maxLength={6}
                className={`w-full h-[44px] px-4 border ${
                  errors.pincode ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                } rounded-lg text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent font-mono`}
              />
              {errors.pincode && (
                <p className="mt-1 text-sm text-[#DC2626]">{errors.pincode}</p>
              )}
              {data.pincode && !errors.pincode && validatePincode(data.pincode) && (
                <p className="mt-1 text-sm text-[#16A34A]">✓ Valid pincode</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-[#FFFBEB] border border-[#FEF3C7] rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
          <div className="text-sm text-[#92400E]">
            <p className="font-medium mb-1">Configuration Only</p>
            <p>
              This module does NOT handle GST filing, tax payments, or generate accounting reports. 
              Legal and tax details configured here affect invoicing only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}