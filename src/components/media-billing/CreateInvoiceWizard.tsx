import { useState, useMemo } from 'react';
import {
  X,
  Users,
  Calendar,
  Monitor,
  Calculator,
  CheckCircle2,
  AlertCircle,
  Check,
  Search,
  Info,
} from 'lucide-react';
import { mockClients } from '../../data/mockAccessScopes';
import { mockCampaignPoP, CampaignPoP } from '../../data/mockMediaBilling';

interface CreateInvoiceWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (invoiceData: any) => void;
}

interface InvoiceLineItemDraft {
  campaignId: string;
  campaignName: string;
  scheduledHours: number;
  actualPopHours: number;
  screens: number;
  regions: string[];
  peakSlots: number;
  nonPeakSlots: number;
  peakRate: number;
  nonPeakRate: number;
  lineTotal: number;
}

export default function CreateInvoiceWizard({
  isOpen,
  onClose,
  onCreate,
}: CreateInvoiceWizardProps) {
  // Wizard State
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Client Selection
  const [selectedClientId, setSelectedClientId] = useState('');
  const [billingPeriodStart, setBillingPeriodStart] = useState('');
  const [billingPeriodEnd, setBillingPeriodEnd] = useState('');
  const [clientSearch, setClientSearch] = useState('');

  // Step 2: Campaign & PoP Review
  const [selectedCampaigns, setSelectedCampaigns] = useState<Set<string>>(new Set());

  // Step 3: Slot-Based Calculation (auto-calculated from campaigns)
  const [lineItems, setLineItems] = useState<InvoiceLineItemDraft[]>([]);

  // Step 4: Adjustments
  const [discountType, setDiscountType] = useState<'none' | 'percentage' | 'fixed'>('none');
  const [discountValue, setDiscountValue] = useState(0);
  const [discountReason, setDiscountReason] = useState('');
  const [applyTax, setApplyTax] = useState(true);

  // Validation
  const [duplicateWarning, setDuplicateWarning] = useState('');

  const clients = mockClients;

  // Filtered clients
  const filteredClients = useMemo(() => {
    if (!clientSearch) return clients;
    const query = clientSearch.toLowerCase();
    return clients.filter((c) => c.name.toLowerCase().includes(query));
  }, [clients, clientSearch]);

  // Get campaigns for selected client and period
  const availableCampaigns = useMemo(() => {
    if (!selectedClientId || !billingPeriodStart || !billingPeriodEnd) return [];

    return mockCampaignPoP.filter((campaign) => {
      if (campaign.clientId !== selectedClientId) return false;
      if (campaign.status !== 'completed') return false;

      // Check if campaign overlaps with billing period
      const campaignStart = new Date(campaign.scheduledStart);
      const campaignEnd = new Date(campaign.scheduledEnd);
      const periodStart = new Date(billingPeriodStart);
      const periodEnd = new Date(billingPeriodEnd);

      return campaignStart <= periodEnd && campaignEnd >= periodStart;
    });
  }, [selectedClientId, billingPeriodStart, billingPeriodEnd]);

  // Calculate totals
  const subtotal = useMemo(() => {
    return lineItems.reduce((sum, item) => sum + item.lineTotal, 0);
  }, [lineItems]);

  const discountAmount = useMemo(() => {
    if (discountType === 'none') return 0;
    if (discountType === 'fixed') return discountValue;
    if (discountType === 'percentage') return (subtotal * discountValue) / 100;
    return 0;
  }, [discountType, discountValue, subtotal]);

  const subtotalAfterDiscount = subtotal - discountAmount;

  const taxAmount = useMemo(() => {
    if (!applyTax) return 0;
    // 18% GST (9% CGST + 9% SGST)
    return subtotalAfterDiscount * 0.18;
  }, [applyTax, subtotalAfterDiscount]);

  const total = subtotalAfterDiscount + taxAmount;

  // Reset wizard
  const resetWizard = () => {
    setCurrentStep(1);
    setSelectedClientId('');
    setBillingPeriodStart('');
    setBillingPeriodEnd('');
    setClientSearch('');
    setSelectedCampaigns(new Set());
    setLineItems([]);
    setDiscountType('none');
    setDiscountValue(0);
    setDiscountReason('');
    setApplyTax(true);
    setDuplicateWarning('');
  };

  const handleClose = () => {
    resetWizard();
    onClose();
  };

  // Step validation
  const canProceedFromStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(selectedClientId && billingPeriodStart && billingPeriodEnd);
      case 2:
        return selectedCampaigns.size > 0;
      case 3:
        return lineItems.length > 0;
      case 4:
        if (discountType !== 'none' && discountValue > 0 && !discountReason) {
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!canProceedFromStep(currentStep)) return;

    // Moving from Step 2 to Step 3: Generate line items
    if (currentStep === 2) {
      const items: InvoiceLineItemDraft[] = [];
      selectedCampaigns.forEach((campaignId) => {
        const campaign = availableCampaigns.find((c) => c.campaignId === campaignId);
        if (campaign) {
          const lineTotal =
            campaign.peakSlots * campaign.peakRate +
            campaign.nonPeakSlots * campaign.nonPeakRate;
          items.push({
            campaignId: campaign.campaignId,
            campaignName: campaign.campaignName,
            scheduledHours: campaign.scheduledHours,
            actualPopHours: campaign.actualPopHours,
            screens: campaign.screens,
            regions: campaign.regions,
            peakSlots: campaign.peakSlots,
            nonPeakSlots: campaign.nonPeakSlots,
            peakRate: campaign.peakRate,
            nonPeakRate: campaign.nonPeakRate,
            lineTotal,
          });
        }
      });
      setLineItems(items);
    }

    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    const selectedClient = clients.find((c) => c.id === selectedClientId);
    
    const invoiceData = {
      clientId: selectedClientId,
      clientName: selectedClient?.name || '',
      billingPeriod: {
        start: billingPeriodStart,
        end: billingPeriodEnd,
      },
      lineItems,
      subtotal,
      discount:
        discountType !== 'none'
          ? {
              type: discountType,
              value: discountValue,
              reason: discountReason,
            }
          : undefined,
      tax: applyTax
        ? {
            cgst: taxAmount / 2,
            sgst: taxAmount / 2,
            igst: 0,
          }
        : undefined,
      total,
    };

    onCreate(invoiceData);
    handleClose();
  };

  const toggleCampaign = (campaignId: string) => {
    const newSelected = new Set(selectedCampaigns);
    if (newSelected.has(campaignId)) {
      newSelected.delete(campaignId);
    } else {
      newSelected.add(campaignId);
    }
    setSelectedCampaigns(newSelected);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="border-b border-[#E5E7EB] px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-[#111827] mb-1">Create Invoice</h2>
            <p className="text-sm text-[#6B7280]">
              Step {currentStep} of 5:{' '}
              {currentStep === 1
                ? 'Client Selection'
                : currentStep === 2
                ? 'Campaign & PoP Review'
                : currentStep === 3
                ? 'Slot-Based Calculation'
                : currentStep === 4
                ? 'Adjustments'
                : 'Final Review'}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Stepper */}
        <div className="border-b border-[#E5E7EB] px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      step < currentStep
                        ? 'bg-[#16A34A] text-white'
                        : step === currentStep
                        ? 'bg-[#D9480F] text-white'
                        : 'bg-[#E5E7EB] text-[#9CA3AF]'
                    }`}
                  >
                    {step < currentStep ? <Check className="w-4 h-4" /> : step}
                  </div>
                  <div
                    className={`text-xs mt-1 ${
                      step === currentStep ? 'text-[#D9480F]' : 'text-[#6B7280]'
                    }`}
                  >
                    {step === 1
                      ? 'Client'
                      : step === 2
                      ? 'Campaigns'
                      : step === 3
                      ? 'Calculate'
                      : step === 4
                      ? 'Adjust'
                      : 'Review'}
                  </div>
                </div>
                {step < 5 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 ${
                      step < currentStep ? 'bg-[#16A34A]' : 'bg-[#E5E7EB]'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Step 1: Client Selection */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#FEF2F2] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-[#D9480F]" />
                </div>
                <h3 className="text-[#111827] mb-2">Select Customer & Billing Period</h3>
                <p className="text-sm text-[#6B7280]">
                  Choose the client and time period for this invoice
                </p>
              </div>

              {/* Client Selection */}
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">
                  Customer <span className="text-[#DC2626]">*</span>
                </label>
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                  <input
                    type="text"
                    value={clientSearch}
                    onChange={(e) => setClientSearch(e.target.value)}
                    placeholder="Search clients..."
                    className="w-full h-12 pl-10 pr-4 border border-[#E5E7EB] rounded-lg text-[#111827] placeholder:text-[#9CA3AF] focus:ring-2 focus:ring-[#D9480F]/20 focus:border-[#D9480F] outline-none"
                  />
                </div>
                <div className="border border-[#E5E7EB] rounded-lg max-h-48 overflow-y-auto">
                  {filteredClients.map((client) => (
                    <label
                      key={client.id}
                      className="flex items-center gap-3 px-4 py-3 border-b border-[#E5E7EB] last:border-0 hover:bg-[#F9FAFB] cursor-pointer transition-colors"
                    >
                      <input
                        type="radio"
                        name="client"
                        checked={selectedClientId === client.id}
                        onChange={() => setSelectedClientId(client.id)}
                        className="w-4 h-4 text-[#D9480F] border-[#E5E7EB] focus:ring-2 focus:ring-[#D9480F]/20"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-[#111827]">{client.name}</div>
                        <div className="text-xs text-[#6B7280] mt-0.5">{client.industry}</div>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          client.status === 'active'
                            ? 'bg-[#ECFDF5] text-[#047857]'
                            : 'bg-[#F3F4F6] text-[#6B7280]'
                        }`}
                      >
                        {client.status}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Billing Period */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">
                    Period Start <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="date"
                    value={billingPeriodStart}
                    onChange={(e) => setBillingPeriodStart(e.target.value)}
                    className="w-full h-12 px-4 border border-[#E5E7EB] rounded-lg text-[#111827] focus:ring-2 focus:ring-[#D9480F]/20 focus:border-[#D9480F] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">
                    Period End <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="date"
                    value={billingPeriodEnd}
                    onChange={(e) => setBillingPeriodEnd(e.target.value)}
                    min={billingPeriodStart}
                    className="w-full h-12 px-4 border border-[#E5E7EB] rounded-lg text-[#111827] focus:ring-2 focus:ring-[#D9480F]/20 focus:border-[#D9480F] outline-none"
                  />
                </div>
              </div>

              {duplicateWarning && (
                <div className="flex items-start gap-2 p-4 bg-[#FEF3C7] border border-[#FDE68A] rounded-lg">
                  <AlertCircle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-[#92400E]">{duplicateWarning}</div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Campaign & PoP Review */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#FEF2F2] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Monitor className="w-8 h-8 text-[#D9480F]" />
                </div>
                <h3 className="text-[#111827] mb-2">Select Campaigns for Billing</h3>
                <p className="text-sm text-[#6B7280]">
                  Review campaigns with completed Proof of Play data
                </p>
              </div>

              {/* PoP Warning */}
              <div className="flex items-start gap-2 p-4 bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg">
                <Info className="w-5 h-5 text-[#3B82F6] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-[#1E40AF] mb-1">
                    Billing Based on Actual PoP Only
                  </div>
                  <div className="text-sm text-[#1E3A8A]">
                    Invoice amounts are calculated using actual Proof of Play hours, not scheduled
                    hours.
                  </div>
                </div>
              </div>

              {availableCampaigns.length === 0 ? (
                <div className="text-center py-12 border border-[#E5E7EB] rounded-lg">
                  <Calendar className="w-12 h-12 text-[#9CA3AF] mx-auto mb-3" />
                  <div className="text-sm text-[#6B7280]">
                    No completed campaigns found for the selected period
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {availableCampaigns.map((campaign) => (
                    <label
                      key={campaign.campaignId}
                      className={`block border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedCampaigns.has(campaign.campaignId)
                          ? 'border-[#D9480F] bg-[#FEF2F2] ring-2 ring-[#D9480F]/20'
                          : 'border-[#E5E7EB] hover:border-[#D9480F]/50 hover:bg-[#F9FAFB]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={selectedCampaigns.has(campaign.campaignId)}
                          onChange={() => toggleCampaign(campaign.campaignId)}
                          className="mt-0.5 w-4 h-4 text-[#D9480F] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#D9480F]/20"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-[#111827] mb-2">
                            {campaign.campaignName}
                          </div>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="text-[#6B7280]">Scheduled: </span>
                              <span className="text-[#111827]">{campaign.scheduledHours}h</span>
                            </div>
                            <div>
                              <span className="text-[#6B7280]">Actual PoP: </span>
                              <span className="text-[#111827] font-semibold">
                                {campaign.actualPopHours}h
                              </span>
                            </div>
                            <div>
                              <span className="text-[#6B7280]">Screens: </span>
                              <span className="text-[#111827]">{campaign.screens}</span>
                            </div>
                            <div>
                              <span className="text-[#6B7280]">Regions: </span>
                              <span className="text-[#111827]">
                                {campaign.regions.join(', ')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Slot-Based Calculation */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#FEF2F2] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8 text-[#D9480F]" />
                </div>
                <h3 className="text-[#111827] mb-2">Slot-Based Calculation</h3>
                <p className="text-sm text-[#6B7280]">Review pricing breakdown per campaign</p>
              </div>

              <div className="space-y-4">
                {lineItems.map((item, index) => (
                  <div
                    key={item.campaignId}
                    className="border border-[#E5E7EB] rounded-lg p-4 bg-white"
                  >
                    <div className="font-medium text-[#111827] mb-3">{item.campaignName}</div>

                    {/* Slot Breakdown */}
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div className="bg-[#F9FAFB] rounded-lg p-3">
                        <div className="text-xs text-[#6B7280] mb-1">Peak Slots</div>
                        <div className="text-sm font-medium text-[#111827]">
                          {item.peakSlots} × ₹{item.peakRate.toLocaleString('en-IN')} = ₹
                          {(item.peakSlots * item.peakRate).toLocaleString('en-IN')}
                        </div>
                      </div>
                      <div className="bg-[#F9FAFB] rounded-lg p-3">
                        <div className="text-xs text-[#6B7280] mb-1">Non-Peak Slots</div>
                        <div className="text-sm font-medium text-[#111827]">
                          {item.nonPeakSlots} × ₹{item.nonPeakRate.toLocaleString('en-IN')} = ₹
                          {(item.nonPeakSlots * item.nonPeakRate).toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>

                    {/* Formula */}
                    <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-3 text-sm">
                      <div className="text-[#1E40AF] mb-1">
                        <span className="font-medium">Formula:</span> Actual PoP Hours × Slot Rate =
                        Line Total
                      </div>
                      <div className="text-[#111827] font-semibold">
                        Line Total: ₹{item.lineTotal.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Subtotal */}
                <div className="border-t-2 border-[#E5E7EB] pt-4">
                  <div className="flex items-center justify-between text-lg">
                    <span className="font-medium text-[#111827]">Subtotal</span>
                    <span className="font-semibold text-[#111827]">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Adjustments */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#FEF2F2] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8 text-[#D9480F]" />
                </div>
                <h3 className="text-[#111827] mb-2">Adjustments & Tax</h3>
                <p className="text-sm text-[#6B7280]">
                  Apply discounts or adjustments if needed
                </p>
              </div>

              {/* Discount Section */}
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-3">Discount</label>
                <div className="flex gap-3 mb-3">
                  <label className="flex-1 flex items-center gap-2 p-3 border border-[#E5E7EB] rounded-lg cursor-pointer hover:bg-[#F9FAFB] transition-colors">
                    <input
                      type="radio"
                      name="discountType"
                      checked={discountType === 'none'}
                      onChange={() => setDiscountType('none')}
                      className="w-4 h-4 text-[#D9480F] border-[#E5E7EB] focus:ring-2 focus:ring-[#D9480F]/20"
                    />
                    <span className="text-sm text-[#111827]">No Discount</span>
                  </label>
                  <label className="flex-1 flex items-center gap-2 p-3 border border-[#E5E7EB] rounded-lg cursor-pointer hover:bg-[#F9FAFB] transition-colors">
                    <input
                      type="radio"
                      name="discountType"
                      checked={discountType === 'percentage'}
                      onChange={() => setDiscountType('percentage')}
                      className="w-4 h-4 text-[#D9480F] border-[#E5E7EB] focus:ring-2 focus:ring-[#D9480F]/20"
                    />
                    <span className="text-sm text-[#111827]">Percentage (%)</span>
                  </label>
                  <label className="flex-1 flex items-center gap-2 p-3 border border-[#E5E7EB] rounded-lg cursor-pointer hover:bg-[#F9FAFB] transition-colors">
                    <input
                      type="radio"
                      name="discountType"
                      checked={discountType === 'fixed'}
                      onChange={() => setDiscountType('fixed')}
                      className="w-4 h-4 text-[#D9480F] border-[#E5E7EB] focus:ring-2 focus:ring-[#D9480F]/20"
                    />
                    <span className="text-sm text-[#111827]">Fixed Amount (₹)</span>
                  </label>
                </div>

                {discountType !== 'none' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2">
                        Discount Value <span className="text-[#DC2626]">*</span>
                      </label>
                      <input
                        type="number"
                        value={discountValue}
                        onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
                        min="0"
                        step={discountType === 'percentage' ? '1' : '100'}
                        placeholder={discountType === 'percentage' ? '10' : '5000'}
                        className="w-full h-12 px-4 border border-[#E5E7EB] rounded-lg text-[#111827] placeholder:text-[#9CA3AF] focus:ring-2 focus:ring-[#D9480F]/20 focus:border-[#D9480F] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2">
                        Reason for Discount <span className="text-[#DC2626]">*</span>
                      </label>
                      <textarea
                        value={discountReason}
                        onChange={(e) => setDiscountReason(e.target.value)}
                        placeholder="e.g., Long-term client discount, promotional offer..."
                        rows={3}
                        className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg text-[#111827] placeholder:text-[#9CA3AF] focus:ring-2 focus:ring-[#D9480F]/20 focus:border-[#D9480F] outline-none resize-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Tax Section */}
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={applyTax}
                    onChange={(e) => setApplyTax(e.target.checked)}
                    className="w-4 h-4 text-[#D9480F] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#D9480F]/20"
                  />
                  <span className="text-sm font-medium text-[#374151]">Apply GST (18%)</span>
                </label>
                <p className="text-xs text-[#6B7280] mt-1 ml-6">
                  Tax calculation based on legal entity GST configuration
                </p>
              </div>

              {/* Preview Calculation */}
              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6B7280]">Subtotal</span>
                  <span className="text-[#111827]">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountType !== 'none' && discountValue > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6B7280]">
                      Discount
                      {discountType === 'percentage' && ` (${discountValue}%)`}
                    </span>
                    <span className="text-[#DC2626]">
                      -₹{discountAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
                {applyTax && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6B7280]">GST (18%)</span>
                    <span className="text-[#111827]">₹{taxAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="border-t border-[#E5E7EB] pt-2 flex items-center justify-between">
                  <span className="font-medium text-[#111827]">Total</span>
                  <span className="text-lg font-semibold text-[#111827]">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Final Review */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#FEF2F2] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-[#D9480F]" />
                </div>
                <h3 className="text-[#111827] mb-2">Review & Generate Invoice</h3>
                <p className="text-sm text-[#6B7280]">
                  Verify all details before generating the invoice
                </p>
              </div>

              {/* Invoice Summary */}
              <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 space-y-4">
                {/* Client Info */}
                <div>
                  <div className="text-xs font-medium text-[#6B7280] mb-1">Customer</div>
                  <div className="text-[#111827] font-medium">
                    {clients.find((c) => c.id === selectedClientId)?.name}
                  </div>
                </div>

                {/* Billing Period */}
                <div>
                  <div className="text-xs font-medium text-[#6B7280] mb-1">Billing Period</div>
                  <div className="text-[#111827]">
                    {formatDate(billingPeriodStart)} - {formatDate(billingPeriodEnd)}
                  </div>
                </div>

                {/* Campaign Breakdown */}
                <div>
                  <div className="text-xs font-medium text-[#6B7280] mb-2">
                    Campaign Breakdown ({lineItems.length})
                  </div>
                  <div className="space-y-2">
                    {lineItems.map((item) => (
                      <div
                        key={item.campaignId}
                        className="flex items-center justify-between text-sm py-2 border-b border-[#F3F4F6] last:border-0"
                      >
                        <span className="text-[#111827]">{item.campaignName}</span>
                        <span className="font-medium text-[#111827]">
                          ₹{item.lineTotal.toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <div className="border-t-2 border-[#E5E7EB] pt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6B7280]">Subtotal</span>
                    <span className="text-[#111827]">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {discountType !== 'none' && discountValue > 0 && (
                    <>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#6B7280]">
                          Discount
                          {discountType === 'percentage' && ` (${discountValue}%)`}
                        </span>
                        <span className="text-[#DC2626]">
                          -₹{discountAmount.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="text-xs text-[#6B7280] italic">
                        Reason: {discountReason}
                      </div>
                    </>
                  )}
                  {applyTax && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#6B7280]">GST (18%)</span>
                      <span className="text-[#111827]">₹{taxAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="border-t border-[#E5E7EB] pt-2 flex items-center justify-between">
                    <span className="text-lg font-medium text-[#111827]">Total Amount</span>
                    <span className="text-2xl font-semibold text-[#111827]">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Immutability Warning */}
              <div className="flex items-start gap-2 p-4 bg-[#FEF3C7] border border-[#FDE68A] rounded-lg">
                <AlertCircle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-[#92400E] mb-1">
                    Invoice is Immutable Once Generated
                  </div>
                  <div className="text-sm text-[#92400E]">
                    After generation, invoices cannot be edited. Any corrections will require a
                    credit note.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#E5E7EB] px-6 py-4 flex items-center justify-between flex-shrink-0">
          <button
            onClick={currentStep === 1 ? handleClose : handleBack}
            className="h-11 px-6 border border-[#E5E7EB] text-[#374151] rounded-lg hover:bg-[#F9FAFB] transition-colors"
          >
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </button>

          {currentStep < 5 ? (
            <button
              onClick={handleNext}
              disabled={!canProceedFromStep(currentStep)}
              className="h-11 px-6 bg-[#D9480F] text-white rounded-lg hover:bg-[#C13D0C] transition-colors disabled:bg-[#E5E7EB] disabled:text-[#9CA3AF] disabled:cursor-not-allowed"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="h-11 px-6 bg-[#D9480F] text-white rounded-lg hover:bg-[#C13D0C] transition-colors"
            >
              Generate Invoice
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
