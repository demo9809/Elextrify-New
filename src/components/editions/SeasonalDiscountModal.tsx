import { X, AlertTriangle } from 'lucide-react';

type DiscountType = 'percent' | 'flat';

interface SeasonalFormData {
  name: string;
  appliesTo: 'monthly' | 'yearly' | 'both';
  discountType: DiscountType;
  discountValue: number;
  startDate: string;
  endDate: string;
}

interface SeasonalDiscountModalProps {
  isOpen: boolean;
  formData: SeasonalFormData;
  isEdit: boolean;
  onChange: (data: SeasonalFormData) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function SeasonalDiscountModal({
  isOpen,
  formData,
  isEdit,
  onChange,
  onSave,
  onCancel,
}: SeasonalDiscountModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onCancel}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E5E7EB] px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-[#111827]">
              {isEdit ? 'Edit Seasonal Discount' : 'New Seasonal Discount'}
            </h3>
            <p className="text-sm text-[#6B7280] mt-1">
              Configure time-limited promotional pricing (e.g., Black Friday, Summer Sale)
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="p-1 text-[#6B7280] hover:bg-[#F9FAFB] rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Discount Name */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Discount Name <span className="text-[#DC2626]">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => onChange({ ...formData, name: e.target.value })}
              placeholder="e.g., Black Friday 2025"
              className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            />
          </div>

          {/* Applies To */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Applies To <span className="text-[#DC2626]">*</span>
            </label>
            <select
              value={formData.appliesTo}
              onChange={(e) => onChange({ ...formData, appliesTo: e.target.value as 'monthly' | 'yearly' | 'both' })}
              className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            >
              <option value="both">Both Monthly & Yearly</option>
              <option value="monthly">Monthly Only</option>
              <option value="yearly">Yearly Only</option>
            </select>
          </div>

          {/* Discount Value */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Discount Value <span className="text-[#DC2626]">*</span>
            </label>
            <div className="flex items-center gap-3">
              <select
                value={formData.discountType}
                onChange={(e) => onChange({ ...formData, discountType: e.target.value as DiscountType })}
                className="w-32 h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              >
                <option value="percent">Percent (%)</option>
                <option value="flat">Flat ($)</option>
              </select>
              <input
                type="number"
                value={formData.discountValue}
                onChange={(e) => onChange({ ...formData, discountValue: parseFloat(e.target.value) || 0 })}
                min="0"
                step="0.01"
                placeholder="0.00"
                className="flex-1 h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              />
            </div>
            <p className="mt-1 text-sm text-[#6B7280]">
              {formData.discountType === 'percent' 
                ? 'Percentage off the base price (e.g., 25 for 25% off)' 
                : 'Fixed dollar amount off the base price'}
            </p>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Active Period <span className="text-[#DC2626]">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => onChange({ ...formData, startDate: e.target.value })}
                  className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                />
                <p className="mt-1 text-sm text-[#6B7280]">Start date</p>
              </div>
              <div>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => onChange({ ...formData, endDate: e.target.value })}
                  className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                />
                <p className="mt-1 text-sm text-[#6B7280]">End date (inclusive)</p>
              </div>
            </div>
            <p className="mt-2 text-sm text-[#6B7280]">
              Discount will automatically activate on start date and deactivate after end date
            </p>
          </div>

          {/* Warning */}
          <div className="bg-[#FFFBEB] border border-[#FEF3C7] rounded-lg p-3">
            <p className="text-sm text-[#92400E]">
              <AlertTriangle className="w-4 h-4 inline mr-1" />
              Only one seasonal discount can be active at a time. Overlapping dates are not allowed.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[#F9FAFB] border-t border-[#E5E7EB] px-6 py-4 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 h-[44px] border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-white transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            className="flex-1 h-[44px] bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors font-medium"
          >
            {isEdit ? 'Update Discount' : 'Add Discount'}
          </button>
        </div>
      </div>
    </div>
  );
}