import { Plus, Edit, X, Calendar, AlertTriangle, Info } from 'lucide-react';

interface SeasonalDiscount {
  id: string;
  name: string;
  appliesTo: 'monthly' | 'yearly' | 'both';
  discountType: 'percent' | 'flat';
  discountValue: number;
  startDate: string;
  endDate: string;
  active: boolean;
}

interface SeasonalDiscountSectionProps {
  seasonalDiscounts: SeasonalDiscount[];
  onAdd: () => void;
  onEdit: (discount: SeasonalDiscount) => void;
  onDelete: (id: string) => void;
}

export default function SeasonalDiscountSection({
  seasonalDiscounts,
  onAdd,
  onEdit,
  onDelete,
}: SeasonalDiscountSectionProps) {
  return (
    <div className="border-t border-[#E5E7EB] pt-6">
      <div className="flex items-start justify-between mb-4 gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-[#111827]">Seasonal / Promotional Discounts</h4>
            {seasonalDiscounts.some(d => d.active) && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#16A34A] text-white text-xs font-medium">
                ACTIVE
              </span>
            )}
          </div>
          <p className="text-sm text-[#6B7280]">
            Time-limited discounts with auto-expiration (e.g., Black Friday, Holiday Sales)
          </p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-2 px-4 h-[40px] bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors font-medium text-sm whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Add Seasonal Discount</span>
        </button>
      </div>

      {/* Seasonal Discount List */}
      {seasonalDiscounts.length > 0 ? (
        <div className="space-y-3">
          {seasonalDiscounts.map((discount) => (
            <div
              key={discount.id}
              className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h5 className="font-medium text-[#111827]">{discount.name}</h5>
                    {discount.active && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#DCFCE7] border border-[#BBF7D0] text-[#16A34A] text-xs font-medium">
                        Active Now
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-[#6B7280]">Discount: </span>
                      <span className="font-medium text-[#111827]">
                        {discount.discountType === 'percent' ? `${discount.discountValue}%` : `$${discount.discountValue}`}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#6B7280]">Applies To: </span>
                      <span className="font-medium text-[#111827] capitalize">{discount.appliesTo}</span>
                    </div>
                    <div>
                      <span className="text-[#6B7280]">Start: </span>
                      <span className="font-medium text-[#111827]">{new Date(discount.startDate).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-[#6B7280]">End: </span>
                      <span className="font-medium text-[#111827]">{new Date(discount.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    type="button"
                    onClick={() => onEdit(discount)}
                    className="p-2 text-[#6B7280] hover:bg-white rounded transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(discount.id)}
                    className="p-2 text-[#DC2626] hover:bg-white rounded transition-colors"
                    title="Delete"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-[#6B7280]">
          <Calendar className="w-12 h-12 mx-auto mb-3 text-[#D1D5DB]" />
          <p className="text-sm">No seasonal discounts configured</p>
        </div>
      )}

      {/* Reminder Note */}
      <div className="mt-4 bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-[#1E40AF] flex-shrink-0 mt-0.5" />
          <div className="text-sm text-[#1E40AF]">
            <p className="font-medium mb-1">Seasonal Discount Rules</p>
            <ul className="space-y-1">
              <li>• Only ONE seasonal discount can be active at a time</li>
              <li>• Seasonal discounts override plan-level discounts during the active period</li>
              <li>• Changes apply to new subscriptions only, not existing ones</li>
              <li>• For tenant-specific discounts, use Billing Admin → Discounts & Credits</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
