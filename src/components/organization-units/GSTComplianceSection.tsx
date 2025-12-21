import { useState } from 'react';
import { Info, Shield, AlertTriangle, Check, Eye, EyeOff } from 'lucide-react';

// Indian States and UTs
const INDIAN_STATES = [
  { code: '01', name: 'Jammu and Kashmir' },
  { code: '02', name: 'Himachal Pradesh' },
  { code: '03', name: 'Punjab' },
  { code: '04', name: 'Chandigarh' },
  { code: '05', name: 'Uttarakhand' },
  { code: '06', name: 'Haryana' },
  { code: '07', name: 'Delhi' },
  { code: '08', name: 'Rajasthan' },
  { code: '09', name: 'Uttar Pradesh' },
  { code: '10', name: 'Bihar' },
  { code: '11', name: 'Sikkim' },
  { code: '12', name: 'Arunachal Pradesh' },
  { code: '13', name: 'Nagaland' },
  { code: '14', name: 'Manipur' },
  { code: '15', name: 'Mizoram' },
  { code: '16', name: 'Tripura' },
  { code: '17', name: 'Meghalaya' },
  { code: '18', name: 'Assam' },
  { code: '19', name: 'West Bengal' },
  { code: '20', name: 'Jharkhand' },
  { code: '21', name: 'Odisha' },
  { code: '22', name: 'Chhattisgarh' },
  { code: '23', name: 'Madhya Pradesh' },
  { code: '24', name: 'Gujarat' },
  { code: '26', name: 'Dadra and Nagar Haveli and Daman and Diu' },
  { code: '27', name: 'Maharashtra' },
  { code: '29', name: 'Karnataka' },
  { code: '30', name: 'Goa' },
  { code: '31', name: 'Lakshadweep' },
  { code: '32', name: 'Kerala' },
  { code: '33', name: 'Tamil Nadu' },
  { code: '34', name: 'Puducherry' },
  { code: '35', name: 'Andaman and Nicobar Islands' },
  { code: '36', name: 'Telangana' },
  { code: '37', name: 'Andhra Pradesh' },
  { code: '38', name: 'Ladakh' },
];

export interface GSTData {
  isGSTRegistered: boolean;
  gstin: string;
  stateCode: string;
  stateName: string;
  gstRegistrationDate: string;
  compositionScheme: boolean;
  reverseChargeApplicable: boolean;
}

interface GSTComplianceSectionProps {
  data: GSTData;
  onChange: (data: GSTData) => void;
  errors?: Record<string, string>;
}

export default function GSTComplianceSection({ data, onChange, errors = {} }: GSTComplianceSectionProps) {
  const [showGSTIN, setShowGSTIN] = useState(false);
  const [showChangeWarning, setShowChangeWarning] = useState(false);
  const [pendingToggle, setPendingToggle] = useState<boolean | null>(null);

  // Validate GSTIN format (15 characters: 2 digits state code + 10 char PAN + 1 entity code + 1 Z + 1 checksum)
  const validateGSTIN = (gstin: string): boolean => {
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstinRegex.test(gstin);
  };

  const handleGSTINChange = (value: string) => {
    const upperValue = value.toUpperCase();
    onChange({ ...data, gstin: upperValue });
    
    // Auto-extract state code if valid format
    if (upperValue.length >= 2) {
      const stateCode = upperValue.substring(0, 2);
      const state = INDIAN_STATES.find(s => s.code === stateCode);
      if (state && !data.stateName) {
        onChange({ 
          ...data, 
          gstin: upperValue,
          stateCode: state.code,
          stateName: state.name
        });
      }
    }
  };

  const handleToggleChange = (newValue: boolean) => {
    if (data.isGSTRegistered !== newValue) {
      setPendingToggle(newValue);
      setShowChangeWarning(true);
    }
  };

  const confirmToggleChange = () => {
    if (pendingToggle !== null) {
      onChange({
        ...data,
        isGSTRegistered: pendingToggle,
        // Clear GST fields if turning off
        ...(pendingToggle === false && {
          gstin: '',
          stateCode: '',
          stateName: '',
          gstRegistrationDate: '',
          compositionScheme: false,
          reverseChargeApplicable: false,
        })
      });
      setShowChangeWarning(false);
      setPendingToggle(null);
    }
  };

  const cancelToggleChange = () => {
    setShowChangeWarning(false);
    setPendingToggle(null);
  };

  // Calculate tax type based on state
  const getTaxType = () => {
    if (!data.isGSTRegistered) return 'None';
    if (!data.stateName) return 'Not configured';
    // In reality, this would compare customer state vs organization state
    return 'CGST + SGST / IGST (based on customer location)';
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 text-[#D9480F]" />
        <h3 className="font-semibold text-[#111827]">Tax & GST Compliance</h3>
      </div>
      <p className="text-sm text-[#6B7280]">
        Configure India-specific GST settings for tax-compliant invoicing
      </p>

      {/* GST Registration Toggle */}
      <div className="bg-white border-2 border-[#E5E7EB] rounded-lg p-4 hover:border-[#D9480F] transition-colors">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-[#111827] mb-1">
              Is this legal entity registered under GST?
            </label>
            <p className="text-sm text-[#6B7280]">
              GST is required for tax-compliant invoices in India
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleToggleChange(false)}
              className={`px-4 h-[36px] rounded-lg border transition-all font-medium ${
                !data.isGSTRegistered
                  ? 'bg-[#DC2626] border-[#DC2626] text-white shadow-md'
                  : 'bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#DC2626] hover:text-[#DC2626]'
              }`}
            >
              No
            </button>
            <button
              type="button"
              onClick={() => handleToggleChange(true)}
              className={`px-4 h-[36px] rounded-lg border transition-all font-medium ${
                data.isGSTRegistered
                  ? 'bg-[#16A34A] border-[#16A34A] text-white shadow-md'
                  : 'bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#16A34A] hover:text-[#16A34A]'
              }`}
            >
              Yes
            </button>
          </div>
        </div>

        {/* Status Badge */}
        {!data.isGSTRegistered && (
          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-1 rounded-md bg-[#FEE2E2] border border-[#FCA5A5] text-[#DC2626] text-xs font-medium">
              Non-GST Entity
            </span>
            <p className="text-xs text-[#6B7280]">This entity will be billed without GST</p>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showChangeWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={cancelToggleChange} />
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-[#F59E0B] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-[#111827] mb-1">Confirm GST Setting Change</h3>
                <p className="text-sm text-[#6B7280]">
                  Changing GST settings affects future invoices. This change will be logged for audit purposes.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={cancelToggleChange}
                className="flex-1 h-[44px] border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmToggleChange}
                className="flex-1 h-[44px] bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors"
              >
                Confirm Change
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GST Registration Details (shown when GST is enabled) */}
      {data.isGSTRegistered && (
        <div className="space-y-6">
          {/* GSTIN Input */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              GSTIN (Goods and Services Tax Identification Number) <span className="text-[#DC2626]">*</span>
            </label>
            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  type={showGSTIN ? 'text' : 'password'}
                  value={data.gstin}
                  onChange={(e) => handleGSTINChange(e.target.value)}
                  placeholder="22AAAAA0000A1Z5"
                  maxLength={15}
                  className={`w-full h-[44px] px-4 border ${
                    errors.gstin ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                  } rounded-lg text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent font-mono`}
                />
                {errors.gstin && (
                  <p className="mt-1 text-sm text-[#DC2626]">{errors.gstin}</p>
                )}
                {data.gstin && !errors.gstin && validateGSTIN(data.gstin) && (
                  <p className="mt-1 text-sm text-[#16A34A] flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    Valid GSTIN format
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowGSTIN(!showGSTIN)}
                className="px-3 h-[44px] border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors"
                title={showGSTIN ? 'Hide GSTIN' : 'Show GSTIN'}
              >
                {showGSTIN ? <EyeOff className="w-5 h-5 text-[#6B7280]" /> : <Eye className="w-5 h-5 text-[#6B7280]" />}
              </button>
            </div>
            <p className="mt-1 text-sm text-[#6B7280]">
              15-character GST identification number
            </p>
          </div>

          {/* Place of Supply */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              State / UT of Registration (Place of Supply) <span className="text-[#DC2626]">*</span>
            </label>
            <select
              value={data.stateCode}
              onChange={(e) => {
                const state = INDIAN_STATES.find(s => s.code === e.target.value);
                onChange({
                  ...data,
                  stateCode: e.target.value,
                  stateName: state?.name || ''
                });
              }}
              className={`w-full h-[44px] px-4 border ${
                errors.stateCode ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
              } rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent`}
            >
              <option value="">Select state / UT</option>
              {INDIAN_STATES.map(state => (
                <option key={state.code} value={state.code}>
                  {state.code} - {state.name}
                </option>
              ))}
            </select>
            {errors.stateCode && (
              <p className="mt-1 text-sm text-[#DC2626]">{errors.stateCode}</p>
            )}
            <p className="mt-1 text-sm text-[#6B7280]">
              Used to determine applicable GST type on invoices (CGST/SGST vs IGST)
            </p>
          </div>

          {/* GST Registration Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-2">
                GST Registration Date
              </label>
              <input
                type="date"
                value={data.gstRegistrationDate}
                onChange={(e) => onChange({ ...data, gstRegistrationDate: e.target.value })}
                className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-4 pt-8">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.compositionScheme}
                  onChange={(e) => onChange({ ...data, compositionScheme: e.target.checked })}
                  className="w-4 h-4 text-[#D9480F] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#D9480F]"
                />
                <span className="text-sm text-[#111827] flex items-center gap-1">
                  Composition Scheme
                  <button
                    type="button"
                    className="text-[#6B7280] hover:text-[#111827]"
                    title="Lower tax rate for small businesses with limited input tax credit"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={data.reverseChargeApplicable}
                onChange={(e) => onChange({ ...data, reverseChargeApplicable: e.target.checked })}
                className="w-4 h-4 text-[#D9480F] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#D9480F]"
              />
              <span className="text-sm text-[#111827] flex items-center gap-1">
                Reverse Charge Applicable
                <button
                  type="button"
                  className="text-[#6B7280] hover:text-[#111827]"
                  title="Recipient pays GST instead of supplier in certain scenarios"
                >
                  <Info className="w-4 h-4" />
                </button>
              </span>
            </label>
          </div>

          {/* Invoice Tax Behavior Preview */}
          <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-4">
            <h4 className="text-sm font-medium text-[#1E40AF] mb-3 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Invoice Tax Behavior
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#1E40AF]">GST Applied:</span>
                <span className="font-medium text-[#1E40AF]">Yes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#1E40AF]">Tax Type:</span>
                <span className="font-medium text-[#1E40AF]">{getTaxType()}</span>
              </div>
              {data.compositionScheme && (
                <div className="flex justify-between">
                  <span className="text-[#1E40AF]">Scheme:</span>
                  <span className="font-medium text-[#1E40AF]">Composition</span>
                </div>
              )}
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-[#FFFBEB] border border-[#FEF3C7] rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
              <div className="text-sm text-[#92400E]">
                <p className="font-medium mb-1">Configuration Only</p>
                <p>This module does NOT file GST returns, handle tax payments, or generate GSTR reports. It only configures invoice tax behavior.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}