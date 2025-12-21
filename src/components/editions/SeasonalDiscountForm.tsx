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

interface SeasonalDiscountFormProps {
  formData: SeasonalFormData;
  isEdit: boolean;
  onChange: (data: SeasonalFormData) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function SeasonalDiscountForm({
  formData,
  isEdit,
  onChange,
  onSave,
  onCancel,
}: SeasonalDiscountFormProps) {
  return (
    <div className="mt-4 p-4 bg-white border-2 border-[#D9480F] rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h5 className="font-medium text-[#111827]">
          {isEdit ? 'Edit Seasonal Discount' : 'New Seasonal Discount'}
        </h5>
        <button
          type="button"
          onClick={onCancel}
          className="p-1 text-[#6B7280] hover:bg-[#F9FAFB] rounded transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
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
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Start Date <span className="text-[#DC2626]">*</span>
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => onChange({ ...formData, startDate: e.target.value })}
              className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              End Date <span className="text-[#DC2626]">*</span>
            </label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => onChange({ ...formData, endDate: e.target.value })}
              className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            />
          </div>
        </div>

        {/* Warning */}
        <div className="bg-[#FFFBEB] border border-[#FEF3C7] rounded-lg p-3">
          <p className="text-sm text-[#92400E]">
            <AlertTriangle className="w-4 h-4 inline mr-1" />
            Only one seasonal discount can be active at a time. Overlapping dates are not allowed.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 h-[44px] border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors font-medium"
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
