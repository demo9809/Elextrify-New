import { useState } from 'react';
import { X, Check, TrendingUp, Zap, Building2, Crown } from 'lucide-react';
import { toast } from 'sonner';
import { formatCurrency } from '../../data/mockBillingData';

interface Plan {
  id: string;
  name: string;
  tierLevel: 'starter' | 'professional' | 'enterprise';
  monthlyPrice: number;
  yearlyPrice: number;
  currency: string;
  description: string;
  features: string[];
  limits: {
    screens: number;
    storage: number;
    playlists: number;
    campaigns: number;
    users: number;
  };
  popular?: boolean;
}

const availablePlans: Plan[] = [
  {
    id: '1',
    name: 'Starter',
    tierLevel: 'starter',
    monthlyPrice: 49,
    yearlyPrice: 470,
    currency: 'USD',
    description: 'Perfect for small businesses getting started',
    features: [
      'Basic analytics',
      'Email support',
      'Standard templates',
      '99.5% uptime SLA',
    ],
    limits: {
      screens: 10,
      storage: 25,
      playlists: 25,
      campaigns: 10,
      users: 3,
    },
  },
  {
    id: '2',
    name: 'Professional',
    tierLevel: 'professional',
    monthlyPrice: 149,
    yearlyPrice: 1430,
    currency: 'USD',
    description: 'For growing businesses with advanced needs',
    features: [
      'Advanced analytics',
      'Priority email & chat support',
      'Custom templates',
      'API access',
      '99.9% uptime SLA',
      'White-label options',
    ],
    limits: {
      screens: 50,
      storage: 100,
      playlists: 100,
      campaigns: 50,
      users: 10,
    },
    popular: true,
  },
  {
    id: '3',
    name: 'Enterprise',
    tierLevel: 'enterprise',
    monthlyPrice: 499,
    yearlyPrice: 4790,
    currency: 'USD',
    description: 'Unlimited power for large organizations',
    features: [
      'Enterprise analytics & reporting',
      'Dedicated account manager',
      '24/7 phone support',
      'Full API access',
      'Custom integrations',
      '99.99% uptime SLA',
      'White-label & custom branding',
      'SSO & advanced security',
    ],
    limits: {
      screens: -1, // Unlimited
      storage: 500,
      playlists: -1,
      campaigns: -1,
      users: -1,
    },
  },
];

interface UpgradePlanModalProps {
  currentPlanId: string;
  currentBillingCycle: 'monthly' | 'yearly';
  onClose: () => void;
}

export default function UpgradePlanModal({ currentPlanId, currentBillingCycle, onClose }: UpgradePlanModalProps) {
  const [selectedPlanId, setSelectedPlanId] = useState(currentPlanId);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(currentBillingCycle);

  const currentPlan = availablePlans.find(p => p.id === currentPlanId);
  const selectedPlan = availablePlans.find(p => p.id === selectedPlanId);

  const handleUpgrade = () => {
    if (selectedPlanId === currentPlanId && billingCycle === currentBillingCycle) {
      toast.error('Please select a different plan or billing cycle');
      return;
    }

    const plan = availablePlans.find(p => p.id === selectedPlanId);
    if (!plan) return;

    if (selectedPlanId !== currentPlanId) {
      toast.success(`Successfully upgraded to ${plan.name}!`, {
        description: `Your new plan will be active immediately. Next billing: ${billingCycle === 'monthly' ? formatCurrency(plan.monthlyPrice, plan.currency) : formatCurrency(plan.yearlyPrice, plan.currency)}`,
      });
    } else {
      toast.success(`Billing cycle changed to ${billingCycle}`, {
        description: 'Changes will take effect on your next billing date',
      });
    }
    
    onClose();
  };

  const getIcon = (tierLevel: string) => {
    const icons = {
      starter: Zap,
      professional: Building2,
      enterprise: Crown,
    };
    return icons[tierLevel as keyof typeof icons] || Zap;
  };

  const formatLimit = (value: number): string => {
    return value === -1 ? 'Unlimited' : value.toString();
  };

  const savings = selectedPlan ? Math.round((selectedPlan.monthlyPrice * 12) - selectedPlan.yearlyPrice) : 0;
  const savingsPercentage = selectedPlan ? Math.round((savings / (selectedPlan.monthlyPrice * 12)) * 100) : 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-6xl w-full my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
          <div>
            <h2 className="text-xl font-semibold text-[#111827]">Upgrade Your Plan</h2>
            <p className="text-sm text-[#6B7280] mt-1">
              Choose the plan that's right for your business
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-[#6B7280] hover:bg-[#F9FAFB] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="p-6 border-b border-[#E5E7EB] bg-[#F9FAFB]">
          <div className="flex items-center justify-center gap-3">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-[#111827]' : 'text-[#6B7280]'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                billingCycle === 'yearly' ? 'bg-[#D9480F]' : 'bg-[#E5E7EB]'
              }`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                billingCycle === 'yearly' ? 'translate-x-8' : 'translate-x-1'
              }`} />
            </button>
            <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-[#111827]' : 'text-[#6B7280]'}`}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                Save up to 20%
              </span>
            )}
          </div>
        </div>

        {/* Plans Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {availablePlans.map((plan) => {
              const Icon = getIcon(plan.tierLevel);
              const isCurrentPlan = plan.id === currentPlanId;
              const isSelected = plan.id === selectedPlanId;
              const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
              const planSavings = billingCycle === 'yearly' ? Math.round((plan.monthlyPrice * 12) - plan.yearlyPrice) : 0;

              return (
                <div
                  key={plan.id}
                  className={`relative border-2 rounded-lg p-6 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#D9480F] shadow-lg'
                      : isCurrentPlan
                        ? 'border-blue-300 bg-blue-50'
                        : 'border-[#E5E7EB] hover:border-[#D9480F]'
                  }`}
                  onClick={() => setSelectedPlanId(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 bg-[#D9480F] text-white text-xs font-medium rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {isCurrentPlan && (
                    <div className="absolute -top-3 right-4">
                      <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                        Current Plan
                      </span>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <div className={`w-12 h-12 rounded-lg mx-auto mb-3 flex items-center justify-center ${
                      isSelected ? 'bg-[#D9480F]' : 'bg-[#F9FAFB]'
                    }`}>
                      <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-[#6B7280]'}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-[#111827] mb-2">{plan.name}</h3>
                    <p className="text-sm text-[#6B7280] mb-4">{plan.description}</p>
                    
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-[#111827]">
                        {formatCurrency(price, plan.currency)}
                      </span>
                      <span className="text-[#6B7280]">
                        /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                      </span>
                    </div>
                    {billingCycle === 'yearly' && planSavings > 0 && (
                      <p className="text-xs text-green-600">
                        Save {formatCurrency(planSavings, plan.currency)} per year
                      </p>
                    )}
                  </div>

                  {/* Limits */}
                  <div className="mb-6 pb-6 border-b border-[#E5E7EB]">
                    <p className="text-xs font-medium text-[#6B7280] uppercase mb-3">Limits</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#6B7280]">Screens</span>
                        <span className="font-medium text-[#111827]">{formatLimit(plan.limits.screens)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B7280]">Storage</span>
                        <span className="font-medium text-[#111827]">{formatLimit(plan.limits.storage)} GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B7280]">Playlists</span>
                        <span className="font-medium text-[#111827]">{formatLimit(plan.limits.playlists)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B7280]">Campaigns</span>
                        <span className="font-medium text-[#111827]">{formatLimit(plan.limits.campaigns)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B7280]">Users</span>
                        <span className="font-medium text-[#111827]">{formatLimit(plan.limits.users)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-[#16A34A] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-[#6B7280]">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Select Button */}
                  <button
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`w-full h-[44px] rounded-lg font-medium transition-colors ${
                      isSelected
                        ? 'bg-[#D9480F] text-white'
                        : isCurrentPlan
                          ? 'bg-blue-100 text-blue-700 border border-blue-300'
                          : 'bg-white border-2 border-[#E5E7EB] text-[#6B7280] hover:border-[#D9480F]'
                    }`}
                  >
                    {isCurrentPlan ? 'Current Plan' : isSelected ? 'Selected' : 'Select Plan'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary & Actions */}
        {selectedPlan && (
          <div className="p-6 border-t border-[#E5E7EB] bg-[#F9FAFB]">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-[#111827] mb-3">Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Plan</span>
                    <span className="font-medium text-[#111827]">{selectedPlan.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Billing Cycle</span>
                    <span className="font-medium text-[#111827] capitalize">{billingCycle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Price</span>
                    <span className="font-medium text-[#111827]">
                      {formatCurrency(billingCycle === 'monthly' ? selectedPlan.monthlyPrice : selectedPlan.yearlyPrice, selectedPlan.currency)}
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                  {billingCycle === 'yearly' && savings > 0 && (
                    <div className="flex justify-between pt-2 border-t border-[#E5E7EB]">
                      <span className="text-green-600 font-medium">Annual Savings</span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(savings, selectedPlan.currency)} ({savingsPercentage}%)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 h-[44px] border border-[#E5E7EB] bg-white text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpgrade}
                  className="flex-1 h-[44px] bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <TrendingUp className="w-5 h-5" />
                  Confirm Upgrade
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
