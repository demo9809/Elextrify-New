import { useState } from 'react';
import {
  CreditCard,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Download,
  Monitor,
  HardDrive,
  List,
  Target,
  Users,
  Lock,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';
import {
  mockBillingData,
  getSubscriptionStatusLabel,
  getSubscriptionStatusColor,
  getInvoiceStatusLabel,
  getInvoiceStatusColor,
  getUsagePercentage,
  getUsageStatus,
  getUsageColor,
  formatCurrency,
  getCycleSavings,
  type BillingData,
  type UsageLimit
} from '../../data/mockBillingData';
import UpgradePlanModal from './UpgradePlanModal';
import ChangeBillingCycleModal from './ChangeBillingCycleModal';
import UpdatePaymentMethodModal from './UpdatePaymentMethodModal';

export default function TenantBilling() {
  const [billingData] = useState<BillingData>(mockBillingData);
  const [showChangePlanModal, setShowChangePlanModal] = useState(false);
  const [showChangeCycleModal, setShowChangeCycleModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isAdmin] = useState(true); // In real app, this comes from user context

  const { subscription, usage, invoices, paymentMethods } = billingData;
  const primaryPaymentMethod = paymentMethods.find(pm => pm.isDefault);

  const getIcon = (iconName: string) => {
    const icons = {
      monitor: Monitor,
      'hard-drive': HardDrive,
      list: List,
      target: Target,
      users: Users,
    };
    return icons[iconName as keyof typeof icons] || Monitor;
  };

  const handleUpgradePlan = () => {
    if (!isAdmin) {
      toast.error('Only administrators can upgrade the plan');
      return;
    }
    setShowChangePlanModal(true);
  };

  const handleChangeCycle = () => {
    if (!isAdmin) {
      toast.error('Only administrators can change the billing cycle');
      return;
    }
    setShowChangeCycleModal(true);
  };

  const handleUpdatePayment = () => {
    if (!isAdmin) {
      toast.error('Only administrators can update payment methods');
      return;
    }
    setShowPaymentModal(true);
  };

  const handleDownloadInvoice = (invoiceNumber: string) => {
    toast.success(`Downloading invoice ${invoiceNumber}...`);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[#111827]">Billing & Subscription</h1>
              <p className="text-sm text-[#6B7280] mt-1">
                Manage your subscription, view invoices, and track usage
              </p>
            </div>
            {!isAdmin && (
              <div className="flex items-center gap-2 px-3 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
                <Lock className="w-4 h-4 text-[#6B7280]" />
                <span className="text-sm text-[#6B7280]">View Only</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto space-y-6">
        {/* Subscription Overview */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="font-semibold text-[#111827] mb-1">Current Subscription</h2>
              <p className="text-sm text-[#6B7280]">
                Your plan and billing information
              </p>
            </div>
            <span className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium ${getSubscriptionStatusColor(subscription.status)}`}>
              {getSubscriptionStatusLabel(subscription.status)}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <p className="text-sm text-[#6B7280] mb-1">Current Plan</p>
                <p className="text-2xl font-semibold text-[#111827]">{subscription.editionName}</p>
              </div>
              
              <div>
                <p className="text-sm text-[#6B7280] mb-1">Billing Cycle</p>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-[#111827] capitalize">{subscription.billingCycle}</p>
                  {subscription.billingCycle === 'monthly' && (
                    <span className="text-sm text-[#16A34A]">
                      Save {formatCurrency(getCycleSavings(subscription.price), subscription.currency)} with yearly
                    </span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm text-[#6B7280] mb-1">Price</p>
                <p className="text-2xl font-semibold text-[#111827]">
                  {formatCurrency(subscription.price, subscription.currency)}
                  <span className="text-sm font-normal text-[#6B7280]">
                    /{subscription.billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <p className="text-sm text-[#6B7280] mb-1">Next Billing Date</p>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#6B7280]" />
                  <p className="font-medium text-[#111827]">
                    {new Date(subscription.nextBillingDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              {primaryPaymentMethod && (
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">Payment Method</p>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#6B7280]" />
                    <p className="font-medium text-[#111827]">
                      {primaryPaymentMethod.cardBrand?.toUpperCase()} •••• {primaryPaymentMethod.lastFour}
                    </p>
                  </div>
                </div>
              )}

              {subscription.status === 'trial' && subscription.trialEndsAt && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900 font-medium">
                    Trial ends {new Date(subscription.trialEndsAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-[#E5E7EB]">
            <button
              onClick={handleUpgradePlan}
              disabled={!isAdmin}
              className="flex items-center justify-center gap-2 px-4 h-[44px] bg-[#D9480F] hover:bg-[#C23D0D] disabled:bg-[#E5E7EB] disabled:text-[#9CA3AF] text-white rounded-lg transition-colors text-sm font-medium"
            >
              <TrendingUp className="w-4 h-4" />
              Upgrade Plan
            </button>
            <button
              onClick={handleChangeCycle}
              disabled={!isAdmin}
              className="flex items-center justify-center gap-2 px-4 h-[44px] border border-[#E5E7EB] bg-white hover:bg-[#F9FAFB] disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF] text-[#6B7280] rounded-lg transition-colors text-sm font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              Change Billing Cycle
            </button>
            <button
              onClick={handleUpdatePayment}
              disabled={!isAdmin}
              className="flex items-center justify-center gap-2 px-4 h-[44px] border border-[#E5E7EB] bg-white hover:bg-[#F9FAFB] disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF] text-[#6B7280] rounded-lg transition-colors text-sm font-medium"
            >
              <CreditCard className="w-4 h-4" />
              Update Payment Method
            </button>
          </div>
        </div>

        {/* Usage & Limits */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
          <div className="mb-6">
            <h2 className="font-semibold text-[#111827] mb-1">Usage & Limits</h2>
            <p className="text-sm text-[#6B7280]">
              Track your usage against plan limits
            </p>
          </div>

          <div className="space-y-6">
            {usage.map((item) => {
              const percentage = getUsagePercentage(item.used, item.limit);
              const status = getUsageStatus(percentage);
              const Icon = getIcon(item.icon);

              return (
                <div key={item.name}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-[#6B7280]" />
                      <span className="font-medium text-[#111827]">{item.name}</span>
                    </div>
                    <div className="text-sm">
                      <span className={`font-medium ${
                        status === 'critical' ? 'text-[#DC2626]' :
                        status === 'warning' ? 'text-[#F59E0B]' :
                        'text-[#111827]'
                      }`}>
                        {item.used}
                      </span>
                      <span className="text-[#6B7280]"> / {item.limit} {item.unit}</span>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${getUsageColor(status)}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>

                  {status === 'warning' && (
                    <div className="flex items-center gap-1 mt-2">
                      <AlertCircle className="w-4 h-4 text-[#F59E0B]" />
                      <p className="text-xs text-[#F59E0B]">
                        You're approaching your limit
                      </p>
                    </div>
                  )}

                  {status === 'critical' && (
                    <div className="flex items-center justify-between mt-2 p-2 bg-[#FEF2F2] border border-[#FECACA] rounded-lg">
                      <div className="flex items-center gap-1">
                        <AlertCircle className="w-4 h-4 text-[#DC2626]" />
                        <p className="text-xs text-[#DC2626] font-medium">
                          Limit reached - Upgrade to add more
                        </p>
                      </div>
                      <button
                        onClick={handleUpgradePlan}
                        className="text-xs text-[#D9480F] hover:text-[#C23D0D] font-medium"
                      >
                        Upgrade
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Invoice History */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E5E7EB]">
            <h2 className="font-semibold text-[#111827]">Invoice History</h2>
            <p className="text-sm text-[#6B7280] mt-1">
              View and download your past invoices
            </p>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                    Invoice
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                    Period
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                    Date Paid
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-[#111827]">{invoice.invoiceNumber}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-[#6B7280]">{invoice.period}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-[#111827]">
                        {formatCurrency(invoice.amount, invoice.currency)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium ${getInvoiceStatusColor(invoice.status)}`}>
                        {getInvoiceStatusLabel(invoice.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-[#6B7280]">
                        {invoice.paidDate
                          ? new Date(invoice.paidDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })
                          : '-'}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDownloadInvoice(invoice.invoiceNumber)}
                        className="inline-flex items-center gap-1 px-3 h-[32px] text-sm text-[#D9480F] hover:text-[#C23D0D] font-medium"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden divide-y divide-[#E5E7EB]">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium text-[#111827] mb-1">{invoice.invoiceNumber}</p>
                    <p className="text-sm text-[#6B7280]">{invoice.period}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium ${getInvoiceStatusColor(invoice.status)}`}>
                    {getInvoiceStatusLabel(invoice.status)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#6B7280] mb-1">Amount</p>
                    <p className="font-medium text-[#111827]">
                      {formatCurrency(invoice.amount, invoice.currency)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDownloadInvoice(invoice.invoiceNumber)}
                    className="flex items-center gap-1 px-3 h-[36px] text-sm text-[#D9480F] hover:text-[#C23D0D] font-medium border border-[#E5E7EB] rounded-lg"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        {primaryPaymentMethod && (
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-semibold text-[#111827] mb-1">Payment Method</h2>
                <p className="text-sm text-[#6B7280]">
                  Manage how you pay for your subscription
                </p>
              </div>
              {billingData.autoRetryEnabled && (
                <div className="flex items-center gap-1 px-2 py-1 bg-green-50 border border-green-200 rounded-md">
                  <CheckCircle className="w-3 h-3 text-green-700" />
                  <span className="text-xs text-green-700">Auto-retry enabled</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-[#6B7280]" />
                </div>
                <div>
                  <p className="font-medium text-[#111827]">
                    {primaryPaymentMethod.cardBrand?.toUpperCase()} •••• {primaryPaymentMethod.lastFour}
                  </p>
                  <p className="text-sm text-[#6B7280]">
                    Expires {primaryPaymentMethod.expiryMonth}/{primaryPaymentMethod.expiryYear}
                  </p>
                  <p className="text-xs text-[#6B7280] mt-0.5">
                    {primaryPaymentMethod.billingName}
                  </p>
                </div>
              </div>

              <button
                onClick={handleUpdatePayment}
                disabled={!isAdmin}
                className="px-4 h-[40px] border border-[#E5E7EB] bg-white hover:bg-[#F9FAFB] disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF] text-[#6B7280] rounded-lg transition-colors text-sm font-medium"
              >
                Update
              </button>
            </div>

            {billingData.lastPaymentAttempt && !billingData.lastPaymentAttempt.success && (
              <div className="mt-4 p-3 bg-[#FEF2F2] border border-[#FECACA] rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-[#DC2626] mb-1">Payment Failed</p>
                  <p className="text-sm text-[#991B1B]">
                    {billingData.lastPaymentAttempt.message || 'Your last payment attempt was unsuccessful. Please update your payment method.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {showChangePlanModal && (
        <UpgradePlanModal
          currentPlanId={subscription.editionId}
          currentBillingCycle={subscription.billingCycle}
          onClose={() => setShowChangePlanModal(false)}
        />
      )}
      {showChangeCycleModal && (
        <ChangeBillingCycleModal
          currentCycle={subscription.billingCycle}
          monthlyPrice={subscription.billingCycle === 'monthly' ? subscription.price : 149}
          yearlyPrice={subscription.billingCycle === 'yearly' ? subscription.price : 1430}
          currency={subscription.currency}
          planName={subscription.editionName}
          nextBillingDate={subscription.nextBillingDate}
          onClose={() => setShowChangeCycleModal(false)}
        />
      )}
      {showPaymentModal && (
        <UpdatePaymentMethodModal
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  );
}