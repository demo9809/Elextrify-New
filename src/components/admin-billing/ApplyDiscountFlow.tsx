import { useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Percent,
  DollarSign,
  Calendar,
  FileText,
  Eye,
  Info,
} from 'lucide-react';
import { toast } from 'sonner';

interface ApplyDiscountFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

// Mock tenant data with subscription info
const mockTenantsWithSubscriptions = [
  {
    id: 'tn_acme',
    name: 'Acme Corporation',
    plan: 'Professional',
    billingCycle: 'monthly',
    amount: 199,
    nextInvoiceDate: '2025-01-15',
    hasActiveDiscount: true,
    activeDiscountValue: '20%',
  },
  {
    id: 'tn_techstart',
    name: 'TechStart Inc.',
    plan: 'Enterprise',
    billingCycle: 'annual',
    amount: 4990,
    nextInvoiceDate: '2025-03-01',
    hasActiveDiscount: false,
  },
  {
    id: 'tn_fitlife',
    name: 'FitLife Gym',
    plan: 'Professional',
    billingCycle: 'monthly',
    amount: 199,
    nextInvoiceDate: '2025-01-10',
    hasActiveDiscount: false,
  },
  {
    id: 'tn_brew',
    name: 'Brew Coffee Co.',
    plan: 'Starter',
    billingCycle: 'monthly',
    amount: 99,
    nextInvoiceDate: '2025-01-20',
    hasActiveDiscount: false,
  },
  {
    id: 'tn_global',
    name: 'Global Retail Ltd.',
    plan: 'Enterprise',
    billingCycle: 'monthly',
    amount: 499,
    nextInvoiceDate: '2025-01-25',
    hasActiveDiscount: false,
  },
];

const reasonOptions = [
  { value: 'loyalty', label: 'Loyalty / Long-term customer' },
  { value: 'contract_negotiation', label: 'Contract negotiation' },
  { value: 'support_resolution', label: 'Support resolution / Service issue' },
  { value: 'manual_adjustment', label: 'Manual adjustment' },
  { value: 'promotional', label: 'Promotional discount' },
  { value: 'other', label: 'Other (specify below)' },
];

export default function ApplyDiscountFlow({ isOpen, onClose, onSuccess }: ApplyDiscountFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  // Form state
  const [selectedTenantId, setSelectedTenantId] = useState('');
  const [discountName, setDiscountName] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState('');
  const [appliesTo, setAppliesTo] = useState<'subscription' | 'next_invoice' | 'billing_cycle'>('subscription');
  const [durationType, setDurationType] = useState<'one_time' | 'fixed_period' | 'until_cancelled'>('fixed_period');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reasonType, setReasonType] = useState('');
  const [reasonNotes, setReasonNotes] = useState('');
  const [confirmationChecked, setConfirmationChecked] = useState(false);

  const selectedTenant = mockTenantsWithSubscriptions.find((t) => t.id === selectedTenantId);

  const calculateDiscount = () => {
    if (!selectedTenant || !discountValue) return { original: 0, discount: 0, final: 0 };

    const original = selectedTenant.amount;
    let discountAmount = 0;

    if (discountType === 'percentage') {
      discountAmount = (original * parseFloat(discountValue)) / 100;
    } else {
      discountAmount = parseFloat(discountValue);
    }

    const final = Math.max(0, original - discountAmount);

    return { original, discount: discountAmount, final };
  };

  const validateStep = (step: number): { isValid: boolean; error?: string } => {
    switch (step) {
      case 1:
        if (!selectedTenantId) return { isValid: false, error: 'Please select a tenant' };
        return { isValid: true };

      case 2:
        if (!discountName.trim()) return { isValid: false, error: 'Please enter a discount name' };
        if (!discountValue || parseFloat(discountValue) <= 0)
          return { isValid: false, error: 'Please enter a valid discount value' };
        if (discountType === 'percentage' && parseFloat(discountValue) > 50)
          return { isValid: false, error: 'Percentage discount cannot exceed 50%' };
        if (discountType === 'fixed' && selectedTenant && parseFloat(discountValue) > selectedTenant.amount)
          return { isValid: false, error: 'Flat discount cannot exceed invoice amount' };
        return { isValid: true };

      case 3:
        if (durationType === 'fixed_period') {
          if (!startDate) return { isValid: false, error: 'Please select a start date' };
          if (!endDate) return { isValid: false, error: 'Please select an end date' };
          if (new Date(endDate) <= new Date(startDate))
            return { isValid: false, error: 'End date must be after start date' };
        }
        if (durationType === 'one_time' && appliesTo === 'subscription')
          return { isValid: false, error: 'One-time discounts must apply to next invoice only' };
        return { isValid: true };

      case 4:
        if (!reasonType) return { isValid: false, error: 'Please select a reason' };
        if (reasonType === 'other' && !reasonNotes.trim())
          return { isValid: false, error: 'Please provide additional details for "Other" reason' };
        return { isValid: true };

      case 5:
        return { isValid: true };

      case 6:
        if (!confirmationChecked) return { isValid: false, error: 'Please confirm to proceed' };
        return { isValid: true };

      default:
        return { isValid: true };
    }
  };

  const handleNext = () => {
    const validation = validateStep(currentStep);
    if (!validation.isValid) {
      toast.error(validation.error || 'Please complete all required fields');
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleApplyDiscount = () => {
    const validation = validateStep(6);
    if (!validation.isValid) {
      toast.error(validation.error || 'Please confirm to proceed');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast.success('Discount Applied Successfully', {
        description: `${discountName} has been applied to ${selectedTenant?.name}`,
      });
      onSuccess();
      resetForm();
      onClose();
    }, 500);
  };

  const resetForm = () => {
    setCurrentStep(1);
    setSelectedTenantId('');
    setDiscountName('');
    setDiscountType('percentage');
    setDiscountValue('');
    setAppliesTo('subscription');
    setDurationType('fixed_period');
    setStartDate('');
    setEndDate('');
    setReasonType('');
    setReasonNotes('');
    setConfirmationChecked(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  const { original, discount, final } = calculateDiscount();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
          <div>
            <h2 className="font-semibold text-[#111827]">Apply Discount</h2>
            <p className="text-sm text-[#6B7280] mt-1">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1 text-[#6B7280] hover:text-[#111827] rounded-lg hover:bg-[#F9FAFB]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#D9480F] transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step 1: Select Tenant */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-[#111827] mb-1">Select Tenant</h3>
                <p className="text-sm text-[#6B7280] mb-4">
                  Choose the tenant to apply this discount to
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1">
                  Tenant <span className="text-red-600">*</span>
                </label>
                <select
                  value={selectedTenantId}
                  onChange={(e) => setSelectedTenantId(e.target.value)}
                  className="w-full h-[40px] px-3 border border-[#E5E7EB] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
                >
                  <option value="">Choose a tenant...</option>
                  {mockTenantsWithSubscriptions.map((tenant) => (
                    <option key={tenant.id} value={tenant.id}>
                      {tenant.name} - {tenant.plan} ({tenant.billingCycle})
                    </option>
                  ))}
                </select>
              </div>

              {selectedTenant && (
                <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg space-y-2">
                  <h4 className="text-sm font-medium text-[#111827]">Current Subscription</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-[#6B7280]">Plan:</span>{' '}
                      <span className="font-medium text-[#111827]">{selectedTenant.plan}</span>
                    </div>
                    <div>
                      <span className="text-[#6B7280]">Billing:</span>{' '}
                      <span className="font-medium text-[#111827] capitalize">
                        {selectedTenant.billingCycle}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#6B7280]">Amount:</span>{' '}
                      <span className="font-medium text-[#111827]">${selectedTenant.amount}</span>
                    </div>
                    <div>
                      <span className="text-[#6B7280]">Next Invoice:</span>{' '}
                      <span className="font-medium text-[#111827]">
                        {new Date(selectedTenant.nextInvoiceDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {selectedTenant.hasActiveDiscount && (
                    <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-orange-900">Active Discount Exists</p>
                        <p className="text-xs text-orange-700 mt-1">
                          This tenant already has an active discount of {selectedTenant.activeDiscountValue}.
                          Applying a new discount will replace the existing one.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 2: Discount Details */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-[#111827] mb-1">Discount Details</h3>
                <p className="text-sm text-[#6B7280] mb-4">Configure the discount parameters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1">
                  Discount Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={discountName}
                  onChange={(e) => setDiscountName(e.target.value)}
                  placeholder="e.g., Q1 2025 Loyalty Discount"
                  className="w-full px-4 h-[40px] border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Discount Type <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setDiscountType('percentage')}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      discountType === 'percentage'
                        ? 'border-[#D9480F] bg-[#FEF2F2]'
                        : 'border-[#E5E7EB] hover:border-[#D9480F]'
                    }`}
                  >
                    <Percent className="w-5 h-5 text-[#D9480F] mb-2" />
                    <p className="text-sm font-medium text-[#111827]">Percentage (%)</p>
                    <p className="text-xs text-[#6B7280] mt-1">Discount based on percentage</p>
                  </button>
                  <button
                    onClick={() => setDiscountType('fixed')}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      discountType === 'fixed'
                        ? 'border-[#D9480F] bg-[#FEF2F2]'
                        : 'border-[#E5E7EB] hover:border-[#D9480F]'
                    }`}
                  >
                    <DollarSign className="w-5 h-5 text-[#D9480F] mb-2" />
                    <p className="text-sm font-medium text-[#111827]">Flat Amount ($)</p>
                    <p className="text-xs text-[#6B7280] mt-1">Fixed dollar discount</p>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1">
                  Discount Value <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280] text-sm">
                    {discountType === 'percentage' ? '%' : '$'}
                  </span>
                  <input
                    type="number"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    placeholder={discountType === 'percentage' ? '15' : '50'}
                    min="0"
                    max={discountType === 'percentage' ? '50' : undefined}
                    className="w-full pl-8 pr-4 h-[40px] border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
                  />
                </div>
                <p className="text-xs text-[#6B7280] mt-1">
                  {discountType === 'percentage'
                    ? 'Maximum 50% allowed'
                    : `Cannot exceed $${selectedTenant?.amount || 0}`}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Applies To <span className="text-red-600">*</span>
                </label>
                <div className="space-y-2">
                  <label className="flex items-start gap-3 p-3 border border-[#E5E7EB] rounded-lg cursor-pointer hover:bg-[#F9FAFB]">
                    <input
                      type="radio"
                      name="appliesTo"
                      value="subscription"
                      checked={appliesTo === 'subscription'}
                      onChange={(e) => setAppliesTo(e.target.value as any)}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#111827]">Subscription (Recurring)</p>
                      <p className="text-xs text-[#6B7280]">
                        Applied to all future invoices until expiry
                      </p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 p-3 border border-[#E5E7EB] rounded-lg cursor-pointer hover:bg-[#F9FAFB]">
                    <input
                      type="radio"
                      name="appliesTo"
                      value="next_invoice"
                      checked={appliesTo === 'next_invoice'}
                      onChange={(e) => setAppliesTo(e.target.value as any)}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#111827]">Next Invoice Only</p>
                      <p className="text-xs text-[#6B7280]">One-time discount on next billing</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 p-3 border border-[#E5E7EB] rounded-lg cursor-pointer hover:bg-[#F9FAFB]">
                    <input
                      type="radio"
                      name="appliesTo"
                      value="billing_cycle"
                      checked={appliesTo === 'billing_cycle'}
                      onChange={(e) => setAppliesTo(e.target.value as any)}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#111827]">Entire Billing Cycle</p>
                      <p className="text-xs text-[#6B7280]">Applied to current cycle only</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Duration & Expiry */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-[#111827] mb-1">Duration & Expiry</h3>
                <p className="text-sm text-[#6B7280] mb-4">
                  Set how long this discount will remain active
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Duration Type <span className="text-red-600">*</span>
                </label>
                <div className="space-y-2">
                  <label className="flex items-start gap-3 p-3 border border-[#E5E7EB] rounded-lg cursor-pointer hover:bg-[#F9FAFB]">
                    <input
                      type="radio"
                      name="durationType"
                      value="one_time"
                      checked={durationType === 'one_time'}
                      onChange={(e) => setDurationType(e.target.value as any)}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#111827]">One-time</p>
                      <p className="text-xs text-[#6B7280]">
                        Single application (must apply to next invoice only)
                      </p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 p-3 border border-[#E5E7EB] rounded-lg cursor-pointer hover:bg-[#F9FAFB]">
                    <input
                      type="radio"
                      name="durationType"
                      value="fixed_period"
                      checked={durationType === 'fixed_period'}
                      onChange={(e) => setDurationType(e.target.value as any)}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#111827]">Fixed Period</p>
                      <p className="text-xs text-[#6B7280]">Set start and end dates</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 p-3 border border-[#E5E7EB] rounded-lg cursor-pointer hover:bg-[#F9FAFB]">
                    <input
                      type="radio"
                      name="durationType"
                      value="until_cancelled"
                      checked={durationType === 'until_cancelled'}
                      onChange={(e) => setDurationType(e.target.value as any)}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#111827]">Until Cancelled</p>
                      <p className="text-xs text-[#6B7280]">Remains active until manually removed</p>
                    </div>
                  </label>
                </div>
              </div>

              {durationType === 'fixed_period' && (
                <div className="grid grid-cols-2 gap-4 p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-1">
                      Start Date <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 h-[40px] border border-[#E5E7EB] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-1">
                      End Date <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate || new Date().toISOString().split('T')[0]}
                      className="w-full px-3 h-[40px] border border-[#E5E7EB] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
                    />
                  </div>
                </div>
              )}

              {durationType === 'one_time' && appliesTo !== 'next_invoice' && (
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-orange-900">
                    One-time discounts must apply to "Next Invoice Only". Please go back and update
                    the application scope.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Reason & Notes */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-[#111827] mb-1">Reason & Notes</h3>
                <p className="text-sm text-[#6B7280] mb-4">
                  Required for audit trail and compliance
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1">
                  Reason <span className="text-red-600">*</span>
                </label>
                <select
                  value={reasonType}
                  onChange={(e) => setReasonType(e.target.value)}
                  className="w-full h-[40px] px-3 border border-[#E5E7EB] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
                >
                  <option value="">Select a reason...</option>
                  {reasonOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1">
                  Additional Notes {reasonType === 'other' && <span className="text-red-600">*</span>}
                </label>
                <textarea
                  value={reasonNotes}
                  onChange={(e) => setReasonNotes(e.target.value)}
                  placeholder="Provide additional context for this discount..."
                  rows={4}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D9480F] resize-none"
                />
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-900">Audit Trail</p>
                  <p className="text-xs text-blue-700 mt-1">
                    This information will be logged and visible in the billing audit log for compliance
                    and tracking purposes.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Impact Preview */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-[#111827] mb-1">Impact Preview</h3>
                <p className="text-sm text-[#6B7280] mb-4">
                  Review the financial impact before applying
                </p>
              </div>

              <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg space-y-4">
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Tenant</p>
                  <p className="font-medium text-[#111827]">{selectedTenant?.name}</p>
                </div>

                <div className="border-t border-[#E5E7EB] pt-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#6B7280]">Original Amount</span>
                      <span className="font-medium text-[#111827]">${original.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#6B7280]">Discount Applied</span>
                      <span className="font-medium text-orange-600">
                        - ${discount.toFixed(2)}
                        {discountType === 'percentage' && ` (${discountValue}%)`}
                      </span>
                    </div>
                    <div className="border-t border-[#E5E7EB] pt-3 flex justify-between items-center">
                      <span className="font-medium text-[#111827]">Final Billed Amount</span>
                      <span className="text-xl font-semibold text-green-600">
                        ${final.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#E5E7EB] pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Discount Name</span>
                    <span className="font-medium text-[#111827]">{discountName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Applies To</span>
                    <span className="font-medium text-[#111827] capitalize">
                      {appliesTo.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Duration</span>
                    <span className="font-medium text-[#111827] capitalize">
                      {durationType === 'fixed_period'
                        ? `${new Date(startDate).toLocaleDateString()} - ${new Date(
                            endDate
                          ).toLocaleDateString()}`
                        : durationType.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Effective Date</span>
                    <span className="font-medium text-[#111827]">
                      {appliesTo === 'next_invoice'
                        ? new Date(selectedTenant?.nextInvoiceDate || '').toLocaleDateString()
                        : 'Immediate'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="text-sm font-medium text-green-900">Ready to Apply</p>
                </div>
                <p className="text-xs text-green-700">
                  All validations passed. Review the details above and proceed to confirmation.
                </p>
              </div>
            </div>
          )}

          {/* Step 6: Confirmation */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-[#111827] mb-1">Confirmation</h3>
                <p className="text-sm text-[#6B7280] mb-4">
                  Final confirmation before applying discount
                </p>
              </div>

              <div className="p-4 bg-orange-50 border-2 border-orange-300 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-orange-900 mb-2">
                      This affects billing and revenue
                    </p>
                    <ul className="text-sm text-orange-800 space-y-1">
                      <li>• This discount will modify the tenant's billing immediately</li>
                      <li>• Revenue reporting will reflect this adjustment</li>
                      <li>• An audit log entry will be created</li>
                      <li>
                        • {selectedTenant?.hasActiveDiscount && 'Existing discount will be replaced'}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg space-y-3">
                <h4 className="text-sm font-medium text-[#111827]">Summary</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-[#6B7280]">Tenant:</span>{' '}
                    <span className="font-medium text-[#111827]">{selectedTenant?.name}</span>
                  </div>
                  <div>
                    <span className="text-[#6B7280]">Discount:</span>{' '}
                    <span className="font-medium text-[#111827]">{discountName}</span>
                  </div>
                  <div>
                    <span className="text-[#6B7280]">Value:</span>{' '}
                    <span className="font-medium text-[#111827]">
                      {discountType === 'percentage' ? `${discountValue}%` : `$${discountValue}`}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#6B7280]">Savings:</span>{' '}
                    <span className="font-medium text-orange-600">${discount.toFixed(2)}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[#6B7280]">Reason:</span>{' '}
                    <span className="font-medium text-[#111827]">
                      {reasonOptions.find((r) => r.value === reasonType)?.label}
                    </span>
                  </div>
                </div>
              </div>

              <label className="flex items-start gap-3 p-4 border-2 border-[#E5E7EB] rounded-lg cursor-pointer hover:bg-[#F9FAFB]">
                <input
                  type="checkbox"
                  checked={confirmationChecked}
                  onChange={(e) => setConfirmationChecked(e.target.checked)}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#111827]">
                    I confirm that I want to apply this discount
                  </p>
                  <p className="text-xs text-[#6B7280] mt-1">
                    I understand this will affect the tenant's billing and create an audit record
                  </p>
                </div>
              </label>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-[#E5E7EB]">
          <button
            onClick={currentStep === 1 ? handleClose : handleBack}
            className="flex items-center gap-2 px-4 h-[40px] border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] text-sm font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </button>

          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-4 h-[40px] bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] text-sm font-medium"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleApplyDiscount}
              disabled={!confirmationChecked}
              className="flex items-center gap-2 px-6 h-[40px] bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle className="w-4 h-4" />
              Apply Discount
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
