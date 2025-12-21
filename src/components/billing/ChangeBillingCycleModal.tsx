import { useState } from 'react';
import { X, Calendar, Check, AlertCircle, TrendingDown } from 'lucide-react';
import { toast } from 'sonner';
import { formatCurrency, getCycleSavings } from '../../data/mockBillingData';

interface ChangeBillingCycleModalProps {
  currentCycle: 'monthly' | 'yearly';
  monthlyPrice: number;
  yearlyPrice: number;
  currency: string;
  planName: string;
  nextBillingDate: string;
  onClose: () => void;
}

export default function ChangeBillingCycleModal({
  currentCycle,
  monthlyPrice,
  yearlyPrice,
  currency,
  planName,
  nextBillingDate,
  onClose,
}: ChangeBillingCycleModalProps) {
  const [selectedCycle, setSelectedCycle] = useState<'monthly' | 'yearly'>(currentCycle);

  const yearlySavings = Math.round((monthlyPrice * 12) - yearlyPrice);
  const savingsPercentage = Math.round((yearlySavings / (monthlyPrice * 12)) * 100);
  const isChanging = selectedCycle !== currentCycle;

  const handleConfirm = () => {
    if (!isChanging) {
      toast.error('Please select a different billing cycle');
      return;
    }

    if (selectedCycle === 'yearly') {
      toast.success('Switched to yearly billing!', {
        description: `You'll save ${formatCurrency(yearlySavings, currency)} per year. Changes take effect on ${new Date(nextBillingDate).toLocaleDateString()}.`,
      });
    } else {
      toast.success('Switched to monthly billing', {
        description: `Changes will take effect on ${new Date(nextBillingDate).toLocaleDateString()}.`,
      });
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
          <div>
            <h2 className="text-xl font-semibold text-[#111827]">Change Billing Cycle</h2>
            <p className="text-sm text-[#6B7280] mt-1">
              Switch between monthly and yearly billing
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-[#6B7280] hover:bg-[#F9FAFB] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Plan Info */}
        <div className="p-6 bg-[#F9FAFB] border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-[#6B7280]" />
            <span className="text-sm text-[#6B7280]">Current Plan</span>
          </div>
          <p className="text-lg font-semibold text-[#111827]">
            {planName} - <span className="capitalize">{currentCycle}</span>
          </p>
          <p className="text-sm text-[#6B7280] mt-1">
            Next billing date: {new Date(nextBillingDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        {/* Billing Options */}
        <div className="p-6 space-y-4">
          {/* Monthly Option */}
          <button
            onClick={() => setSelectedCycle('monthly')}
            className={`w-full border-2 rounded-lg p-5 transition-all text-left ${
              selectedCycle === 'monthly'
                ? 'border-[#D9480F] bg-[#FEF2F2]'
                : 'border-[#E5E7EB] hover:border-[#D9480F]'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-[#111827]">Monthly Billing</h3>
                  {currentCycle === 'monthly' && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#6B7280] mb-3">
                  Pay monthly, cancel anytime with no long-term commitment
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-[#111827]">
                    {formatCurrency(monthlyPrice, currency)}
                  </span>
                  <span className="text-[#6B7280]">/month</span>
                </div>
                <p className="text-xs text-[#6B7280] mt-2">
                  Billed monthly • Total: {formatCurrency(monthlyPrice * 12, currency)}/year
                </p>
              </div>
              {selectedCycle === 'monthly' && (
                <div className="w-6 h-6 rounded-full bg-[#D9480F] flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </button>

          {/* Yearly Option */}
          <button
            onClick={() => setSelectedCycle('yearly')}
            className={`w-full border-2 rounded-lg p-5 transition-all text-left relative ${
              selectedCycle === 'yearly'
                ? 'border-[#D9480F] bg-[#FEF2F2]'
                : 'border-[#E5E7EB] hover:border-[#D9480F]'
            }`}
          >
            {/* Savings Badge */}
            <div className="absolute -top-3 left-4">
              <span className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-full flex items-center gap-1">
                <TrendingDown className="w-3 h-3" />
                Save {savingsPercentage}%
              </span>
            </div>

            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-[#111827]">Yearly Billing</h3>
                  {currentCycle === 'yearly' && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#6B7280] mb-3">
                  Pay annually and save {formatCurrency(yearlySavings, currency)} compared to monthly
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-[#111827]">
                    {formatCurrency(yearlyPrice, currency)}
                  </span>
                  <span className="text-[#6B7280]">/year</span>
                </div>
                <p className="text-xs text-[#6B7280] mt-2">
                  Billed annually • Equivalent to {formatCurrency(Math.round(yearlyPrice / 12), currency)}/month
                </p>
              </div>
              {selectedCycle === 'yearly' && (
                <div className="w-6 h-6 rounded-full bg-[#D9480F] flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* Savings Breakdown */}
            <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-[#6B7280] mb-1">Monthly Plan</p>
                  <p className="font-medium text-[#6B7280] line-through">
                    {formatCurrency(monthlyPrice * 12, currency)}/year
                  </p>
                </div>
                <div>
                  <p className="text-[#6B7280] mb-1">Yearly Plan</p>
                  <p className="font-medium text-green-600">
                    {formatCurrency(yearlyPrice, currency)}/year
                  </p>
                </div>
              </div>
              <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-medium text-green-800">
                  Annual Savings: {formatCurrency(yearlySavings, currency)}
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Info & Actions */}
        <div className="p-6 border-t border-[#E5E7EB] bg-[#F9FAFB]">
          {isChanging && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-900">When does this take effect?</p>
                <p className="text-sm text-blue-800 mt-1">
                  {selectedCycle === 'yearly' 
                    ? `You'll be switched to yearly billing starting ${new Date(nextBillingDate).toLocaleDateString()}. Your next charge will be ${formatCurrency(yearlyPrice, currency)}.`
                    : `You'll be switched to monthly billing starting ${new Date(nextBillingDate).toLocaleDateString()}. You'll continue to have access through your current billing period.`
                  }
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 h-[44px] border border-[#E5E7EB] bg-white text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!isChanging}
              className="flex-1 h-[44px] bg-[#D9480F] hover:bg-[#C23D0D] disabled:bg-[#E5E7EB] disabled:text-[#9CA3AF] text-white rounded-lg transition-colors font-medium"
            >
              {isChanging ? 'Confirm Change' : 'No Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
