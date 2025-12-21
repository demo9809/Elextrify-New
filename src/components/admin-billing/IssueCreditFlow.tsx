import { useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  DollarSign,
  Calendar,
  Info,
  Zap,
  RefreshCw,
  Lock,
} from 'lucide-react';
import { toast } from 'sonner';

interface IssueCreditFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

// Mock tenant data with credit balances
const mockTenantsWithCredits = [
  {
    id: 'tn_acme',
    name: 'Acme Corporation',
    plan: 'Professional',
    billingCycle: 'monthly',
    amount: 199,
    currency: 'USD',
    creditBalance: 0,
    nextInvoiceDate: '2025-01-15',
    nextInvoiceAmount: 199,
  },
  {
    id: 'tn_techstart',
    name: 'TechStart Inc.',
    plan: 'Enterprise',
    billingCycle: 'annual',
    amount: 4990,
    currency: 'USD',
    creditBalance: 500,
    nextInvoiceDate: '2025-03-01',
    nextInvoiceAmount: 4990,
  },
  {
    id: 'tn_fitlife',
    name: 'FitLife Gym',
    plan: 'Professional',
    billingCycle: 'monthly',
    amount: 199,
    currency: 'USD',
    creditBalance: 0,
    nextInvoiceDate: '2025-01-10',
    nextInvoiceAmount: 199,
  },
  {
    id: 'tn_brew',
    name: 'Brew Coffee Co.',
    plan: 'Starter',
    billingCycle: 'monthly',
    amount: 99,
    currency: 'USD',
    creditBalance: 300,
    nextInvoiceDate: '2025-01-20',
    nextInvoiceAmount: 99,
  },
  {
    id: 'tn_global',
    name: 'Global Retail Ltd.',
    plan: 'Enterprise',
    billingCycle: 'monthly',
    amount: 499,
    currency: 'USD',
    creditBalance: 0,
    nextInvoiceDate: '2025-01-25',
    nextInvoiceAmount: 499,
  },
];

const reasonOptions = [
  { value: 'service_downtime', label: 'Service downtime / Outage' },
  { value: 'sla_breach', label: 'SLA breach / Performance issue' },
  { value: 'onboarding_bonus', label: 'Onboarding bonus / Welcome credit' },
  { value: 'manual_adjustment', label: 'Manual adjustment / Billing correction' },
  { value: 'customer_satisfaction', label: 'Customer satisfaction / Goodwill gesture' },
  { value: 'migration_support', label: 'Migration support / Transition credit' },
  { value: 'other', label: 'Other (specify below)' },
];

export default function IssueCreditFlow({ isOpen, onClose, onSuccess }: IssueCreditFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  // Form state
  const [selectedTenantId, setSelectedTenantId] = useState('');
  const [creditName, setCreditName] = useState('');
  const [creditAmount, setCreditAmount] = useState('');
  const [usageRule, setUsageRule] = useState<'auto_next' | 'auto_exhaust' | 'manual'>('auto_exhaust');
  const [hasExpiry, setHasExpiry] = useState(true);
  const [expiryDate, setExpiryDate] = useState('');
  const [reasonType, setReasonType] = useState('');
  const [reasonNotes, setReasonNotes] = useState('');
  const [confirmationChecked, setConfirmationChecked] = useState(false);

  const selectedTenant = mockTenantsWithCredits.find((t) => t.id === selectedTenantId);
  const LARGE_CREDIT_WARNING_THRESHOLD = 1000;

  const calculateNewBalance = () => {
    if (!selectedTenant || !creditAmount) return 0;
    return selectedTenant.creditBalance + parseFloat(creditAmount);
  };

  const calculateNextInvoiceImpact = () => {
    if (!selectedTenant || !creditAmount) return { willApply: 0, remaining: 0 };
    
    const creditValue = parseFloat(creditAmount);
    const newTotalBalance = selectedTenant.creditBalance + creditValue;
    const nextInvoice = selectedTenant.nextInvoiceAmount;

    if (usageRule === 'auto_next') {
      const willApply = Math.min(creditValue, nextInvoice);
      const remaining = creditValue - willApply;
      return { willApply, remaining };
    } else if (usageRule === 'auto_exhaust') {
      const willApply = Math.min(newTotalBalance, nextInvoice);
      const remaining = Math.max(0, newTotalBalance - nextInvoice);
      return { willApply, remaining };
    } else {
      return { willApply: 0, remaining: creditValue };
    }
  };

  const validateStep = (step: number): { isValid: boolean; error?: string } => {
    switch (step) {
      case 1:
        if (!selectedTenantId) return { isValid: false, error: 'Please select a tenant' };
        return { isValid: true };

      case 2:
        if (!creditName.trim()) return { isValid: false, error: 'Please enter a credit name' };
        if (!creditAmount || parseFloat(creditAmount) <= 0)
          return { isValid: false, error: 'Please enter a valid credit amount' };
        return { isValid: true };

      case 3:
        return { isValid: true };

      case 4:
        if (hasExpiry && !expiryDate)
          return { isValid: false, error: 'Please select an expiry date or uncheck expiry option' };
        if (hasExpiry && new Date(expiryDate) <= new Date())
          return { isValid: false, error: 'Expiry date must be in the future' };
        return { isValid: true };

      case 5:
        if (!reasonType) return { isValid: false, error: 'Please select a reason' };
        if (reasonType === 'other' && !reasonNotes.trim())
          return { isValid: false, error: 'Please provide additional details for "Other" reason' };
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

  const handleIssueCredit = () => {
    const validation = validateStep(6);
    if (!validation.isValid) {
      toast.error(validation.error || 'Please confirm to proceed');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast.success('Credit Issued Successfully', {
        description: `$${creditAmount} credit has been issued to ${selectedTenant?.name}`,
      });
      onSuccess();
      resetForm();
      onClose();
    }, 500);
  };

  const resetForm = () => {
    setCurrentStep(1);
    setSelectedTenantId('');
    setCreditName('');
    setCreditAmount('');
    setUsageRule('auto_exhaust');
    setHasExpiry(true);
    setExpiryDate('');
    setReasonType('');
    setReasonNotes('');
    setConfirmationChecked(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  const newBalance = calculateNewBalance();
  const { willApply, remaining } = calculateNextInvoiceImpact();
  const isLargeCredit = parseFloat(creditAmount || '0') >= LARGE_CREDIT_WARNING_THRESHOLD;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
          <div>
            <h2 className="font-semibold text-[#111827]">Issue Credit</h2>
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
              className="h-full bg-green-600 transition-all duration-300"
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
                  Choose the tenant to issue credit to
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
                  {mockTenantsWithCredits.map((tenant) => (
                    <option key={tenant.id} value={tenant.id}>
                      {tenant.name} - {tenant.plan} (Balance: ${tenant.creditBalance})
                    </option>
                  ))}
                </select>
              </div>

              {selectedTenant && (
                <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg space-y-3">
                  <h4 className="text-sm font-medium text-[#111827]">Tenant Information</h4>
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
                      <span className="text-[#6B7280]">Current Balance:</span>{' '}
                      <span className="font-medium text-green-600">
                        ${selectedTenant.creditBalance}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#6B7280]">Currency:</span>{' '}
                      <span className="font-medium text-[#111827]">{selectedTenant.currency}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E5E7EB]">
                    <p className="text-xs text-[#6B7280] mb-1">Active Subscription</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#111827]">
                        Next invoice: {new Date(selectedTenant.nextInvoiceDate).toLocaleDateString()}
                      </span>
                      <span className="text-sm font-medium text-[#111827]">
                        ${selectedTenant.nextInvoiceAmount}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Credit Details */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-[#111827] mb-1">Credit Details</h3>
                <p className="text-sm text-[#6B7280] mb-4">Configure the credit parameters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1">
                  Credit Name / Label <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={creditName}
                  onChange={(e) => setCreditName(e.target.value)}
                  placeholder="e.g., Service Downtime Credit - Dec 2024"
                  className="w-full px-4 h-[40px] border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
                />
                <p className="text-xs text-[#6B7280] mt-1">
                  This helps identify the credit in billing history
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1">
                  Credit Amount <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280] text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    value={creditAmount}
                    onChange={(e) => setCreditAmount(e.target.value)}
                    placeholder="500"
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-4 h-[40px] border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
                  />
                </div>
              </div>

              <div className="p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#6B7280]">Currency</span>
                  <span className="text-sm font-medium text-[#111827]">
                    {selectedTenant?.currency || 'USD'} (Auto-detected)
                  </span>
                </div>
              </div>

              {isLargeCredit && (
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-orange-900">Large Credit Amount</p>
                    <p className="text-xs text-orange-700 mt-1">
                      This credit amount is ${LARGE_CREDIT_WARNING_THRESHOLD}+. Please ensure this is
                      correct and has proper authorization.
                    </p>
                  </div>
                </div>
              )}

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-900">
                  <span className="font-medium">Credits are not refunds.</span> They offset future
                  invoices but do not issue cash back to the customer.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Usage Rules */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-[#111827] mb-1">Usage Rules</h3>
                <p className="text-sm text-[#6B7280] mb-4">
                  Define how and when this credit should be applied
                </p>
              </div>

              <div className="space-y-3">
                <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-[#F9FAFB] transition-colors has-[:checked]:border-green-600 has-[:checked]:bg-green-50">
                  <input
                    type="radio"
                    name="usageRule"
                    value="auto_next"
                    checked={usageRule === 'auto_next'}
                    onChange={(e) => setUsageRule(e.target.value as any)}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="w-4 h-4 text-green-600" />
                      <p className="text-sm font-medium text-[#111827]">
                        Auto-apply to next invoice
                      </p>
                    </div>
                    <p className="text-xs text-[#6B7280]">
                      Credit will be automatically applied to the next invoice only. Any remaining
                      balance will stay in the account.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-[#F9FAFB] transition-colors has-[:checked]:border-green-600 has-[:checked]:bg-green-50">
                  <input
                    type="radio"
                    name="usageRule"
                    value="auto_exhaust"
                    checked={usageRule === 'auto_exhaust'}
                    onChange={(e) => setUsageRule(e.target.value as any)}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <RefreshCw className="w-4 h-4 text-green-600" />
                      <p className="text-sm font-medium text-[#111827]">
                        Apply until credit exhausted
                      </p>
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                        Recommended
                      </span>
                    </div>
                    <p className="text-xs text-[#6B7280]">
                      Credit will be automatically applied to all future invoices until the balance
                      reaches zero or expires.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-[#F9FAFB] transition-colors has-[:checked]:border-green-600 has-[:checked]:bg-green-50">
                  <input
                    type="radio"
                    name="usageRule"
                    value="manual"
                    checked={usageRule === 'manual'}
                    onChange={(e) => setUsageRule(e.target.value as any)}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Lock className="w-4 h-4 text-gray-600" />
                      <p className="text-sm font-medium text-[#111827]">Apply manually only</p>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                        Advanced
                      </span>
                    </div>
                    <p className="text-xs text-[#6B7280]">
                      Credit will remain in the account balance but must be manually applied to
                      invoices by an admin.
                    </p>
                  </div>
                </label>
              </div>

              {usageRule === 'manual' && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-yellow-900">Manual Application Required</p>
                    <p className="text-xs text-yellow-700 mt-1">
                      With this option, the credit will not automatically reduce invoices. You or
                      another admin will need to manually apply it when needed.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Expiry */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-[#111827] mb-1">Credit Expiry</h3>
                <p className="text-sm text-[#6B7280] mb-4">
                  Set when this credit should expire (optional but recommended)
                </p>
              </div>

              <label className="flex items-start gap-3 p-4 border border-[#E5E7EB] rounded-lg cursor-pointer hover:bg-[#F9FAFB]">
                <input
                  type="checkbox"
                  checked={hasExpiry}
                  onChange={(e) => setHasExpiry(e.target.checked)}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#111827]">Set expiry date</p>
                  <p className="text-xs text-[#6B7280] mt-1">
                    Credit will be forfeited if not used by this date
                  </p>
                </div>
              </label>

              {hasExpiry && (
                <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
                  <label className="block text-sm font-medium text-[#111827] mb-1">
                    Expiry Date <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 h-[40px] border border-[#E5E7EB] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
                  />
                  <p className="text-xs text-[#6B7280] mt-1">
                    Common practice: 6-12 months from issue date
                  </p>
                </div>
              )}

              {!hasExpiry && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-yellow-900">No Expiry Selected</p>
                    <p className="text-xs text-yellow-700 mt-1">
                      <span className="font-medium">Best practice:</span> Credits usually expire to
                      prevent indefinite liability. Consider setting an expiry date.
                    </p>
                  </div>
                </div>
              )}

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-900">About Credit Expiry</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Expired credits are automatically removed from the tenant's balance. Tenants
                    should be notified before expiry.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Reason & Notes */}
          {currentStep === 5 && (
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
                  placeholder="Provide additional context for this credit issuance..."
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

          {/* Step 6: Confirmation & Preview */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-[#111827] mb-1">Confirmation & Preview</h3>
                <p className="text-sm text-[#6B7280] mb-4">Review before issuing credit</p>
              </div>

              <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg space-y-4">
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Tenant</p>
                  <p className="font-medium text-[#111827]">{selectedTenant?.name}</p>
                </div>

                <div className="border-t border-[#E5E7EB] pt-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#6B7280]">Current Credit Balance</span>
                      <span className="font-medium text-[#111827]">
                        ${selectedTenant?.creditBalance.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#6B7280]">Credit to be Issued</span>
                      <span className="font-medium text-green-600">
                        + ${parseFloat(creditAmount || '0').toFixed(2)}
                      </span>
                    </div>
                    <div className="border-t border-[#E5E7EB] pt-3 flex justify-between items-center">
                      <span className="font-medium text-[#111827]">New Credit Balance</span>
                      <span className="text-xl font-semibold text-green-600">
                        ${newBalance.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#E5E7EB] pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Credit Name</span>
                    <span className="font-medium text-[#111827]">{creditName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Usage Rule</span>
                    <span className="font-medium text-[#111827] capitalize">
                      {usageRule === 'auto_next'
                        ? 'Next Invoice Only'
                        : usageRule === 'auto_exhaust'
                        ? 'Auto-apply until exhausted'
                        : 'Manual application'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Expiry</span>
                    <span className="font-medium text-[#111827]">
                      {hasExpiry && expiryDate
                        ? new Date(expiryDate).toLocaleDateString()
                        : 'No expiry'}
                    </span>
                  </div>
                </div>
              </div>

              {(usageRule === 'auto_next' || usageRule === 'auto_exhaust') && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-medium text-green-900 mb-2">
                    Next Invoice Impact (Est.)
                  </p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-green-700">Invoice Amount:</span>
                      <span className="font-medium text-green-900">
                        ${selectedTenant?.nextInvoiceAmount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Credit Applied:</span>
                      <span className="font-medium text-green-900">- ${willApply.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-green-300">
                      <span className="font-medium text-green-900">Final Amount:</span>
                      <span className="font-semibold text-green-900">
                        ${(selectedTenant!.nextInvoiceAmount - willApply).toFixed(2)}
                      </span>
                    </div>
                    {remaining > 0 && (
                      <p className="text-xs text-green-700 pt-2">
                        Remaining balance: ${remaining.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="p-4 bg-orange-50 border-2 border-orange-300 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-orange-900 mb-2">
                      This affects billing and revenue
                    </p>
                    <ul className="text-sm text-orange-800 space-y-1">
                      <li>• This credit will be added to the tenant's account balance</li>
                      <li>• It will offset future invoices based on usage rules</li>
                      <li>• Revenue reporting will reflect this adjustment</li>
                      <li>• An audit log entry will be created</li>
                    </ul>
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
                    I confirm that I want to issue this credit
                  </p>
                  <p className="text-xs text-[#6B7280] mt-1">
                    I understand this will affect the tenant's balance and create an audit record
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
              className="flex items-center gap-2 px-4 h-[40px] bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleIssueCredit}
              disabled={!confirmationChecked}
              className="flex items-center gap-2 px-6 h-[40px] bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle className="w-4 h-4" />
              Issue Credit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
