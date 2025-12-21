import { X, AlertTriangle, Clock } from 'lucide-react';

interface PricingConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isEdit: boolean;
  hasStandardDiscounts: boolean;
  hasSeasonalDiscounts: boolean;
  monthlyPrice: number;
  yearlyPrice: number;
}

export default function PricingConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  isEdit,
  hasStandardDiscounts,
  hasSeasonalDiscounts,
  monthlyPrice,
  yearlyPrice,
}: PricingConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div
            className="relative bg-white rounded-lg shadow-xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-[#D9480F]" />
                </div>
                <h3 className="font-semibold text-[#111827]">
                  {isEdit ? 'Confirm Pricing Changes' : 'Confirm Edition Creation'}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="text-[#6B7280] hover:text-[#111827] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Main Warning */}
              <div className="bg-[#FEF2F2] border border-[#FEE2E2] rounded-lg p-4">
                <p className="text-sm text-[#DC2626] font-medium mb-1">
                  Plan-Level Discounts Affect All New Subscriptions
                </p>
                <p className="text-sm text-[#DC2626]">
                  {isEdit
                    ? 'These pricing changes will impact all future subscriptions for this edition.'
                    : 'This pricing configuration will be applied to all new subscriptions.'}
                </p>
              </div>

              {/* Impact Summary */}
              <div className="space-y-3">
                <h4 className="font-medium text-[#111827] text-sm">Impact Summary:</h4>
                <ul className="space-y-2 text-sm text-[#6B7280]">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D9480F] mt-2" />
                    <span>
                      Base pricing: <strong className="text-[#111827]">${monthlyPrice}/mo</strong> and{' '}
                      <strong className="text-[#111827]">${yearlyPrice}/yr</strong>
                    </span>
                  </li>
                  {hasStandardDiscounts && (
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D9480F] mt-2" />
                      <span>Standard discounts will apply automatically to all new subscriptions</span>
                    </li>
                  )}
                  {hasSeasonalDiscounts && (
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D9480F] mt-2" />
                      <span>Seasonal discounts will activate/expire based on configured dates</span>
                    </li>
                  )}
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D9480F] mt-2" />
                    <span>Existing subscriptions are NOT affected</span>
                  </li>
                </ul>
              </div>

              {/* Timestamp Notice */}
              <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-3 flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#3B82F6] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[#1E40AF]">
                  This change will be logged with a timestamp for audit purposes
                </p>
              </div>

              {/* Confirmation Checkbox */}
              <label className="flex items-start gap-3 p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  id="pricing-confirm"
                  className="w-5 h-5 mt-0.5 rounded border-[#D1D5DB] text-[#D9480F] focus:ring-[#D9480F] focus:ring-offset-0"
                />
                <div>
                  <label htmlFor="pricing-confirm" className="font-medium text-[#111827] text-sm cursor-pointer">
                    I understand this will impact future subscriptions
                  </label>
                  <p className="text-xs text-[#6B7280] mt-1">
                    Pricing changes are part of plan design and affect subscription creation
                  </p>
                </div>
              </label>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-[#E5E7EB] bg-[#F9FAFB]">
              <button
                onClick={onClose}
                className="px-6 h-[44px] border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-white transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const checkbox = document.getElementById('pricing-confirm') as HTMLInputElement;
                  if (checkbox?.checked) {
                    onConfirm();
                  } else {
                    // You could show a toast here
                    alert('Please confirm that you understand the impact');
                  }
                }}
                className="px-6 h-[44px] bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors font-medium"
              >
                {isEdit ? 'Save Changes' : 'Create Edition'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
