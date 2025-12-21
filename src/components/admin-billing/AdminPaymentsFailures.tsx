import { useState } from 'react';
import {
  Search,
  RefreshCw,
  Mail,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calendar,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  mockAdminBillingData,
  formatCurrency,
  type PaymentAttempt,
} from '../../data/mockAdminBillingData';

export default function AdminPaymentsFailures() {
  const [billingData] = useState(mockAdminBillingData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('failed');

  const { invoices, tenantBillings } = billingData;

  // Extract all payment attempts
  const allPaymentAttempts: Array<PaymentAttempt & { invoiceNumber: string; tenantId: string; tenantName: string }> = [];
  
  invoices.forEach((invoice) => {
    const tenant = tenantBillings.find((t) => t.tenantId === invoice.tenantId);
    invoice.paymentAttempts.forEach((attempt) => {
      allPaymentAttempts.push({
        ...attempt,
        invoiceNumber: invoice.invoiceNumber,
        tenantId: invoice.tenantId,
        tenantName: tenant?.tenantName || 'Unknown',
      });
    });
  });

  // Filter payments
  const filteredPayments = allPaymentAttempts.filter((payment) => {
    const matchesSearch =
      payment.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Sort by date (most recent first)
  const sortedPayments = [...filteredPayments].sort(
    (a, b) => new Date(b.attemptDate).getTime() - new Date(a.attemptDate).getTime()
  );

  const handleTriggerRetry = (payment: typeof sortedPayments[0]) => {
    toast.success(`Payment retry triggered for ${payment.tenantName}`, {
      description: 'Payment will be processed within the next few minutes',
    });
  };

  const handleContactTenant = (payment: typeof sortedPayments[0]) => {
    toast.success(`Email template opened for ${payment.tenantName}`, {
      description: 'Pre-filled with payment failure details',
    });
  };

  const handleExtendGrace = (payment: typeof sortedPayments[0]) => {
    toast.success(`Grace period extended for ${payment.tenantName}`, {
      description: 'Access will remain active for 7 more days',
    });
  };

  const getFailureReasonLabel = (reason?: string): string => {
    if (!reason) return 'Unknown';
    const labels: Record<string, string> = {
      decline_insufficient_funds: 'Insufficient Funds',
      decline_card_expired: 'Card Expired',
      decline_card_invalid: 'Invalid Card',
      decline_processing_error: 'Processing Error',
      decline_generic: 'Declined',
    };
    return labels[reason] || reason;
  };

  const failedPayments = allPaymentAttempts.filter((p) => p.status === 'failed');
  const totalFailedAmount = failedPayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[#111827]">Payments & Failures</h1>
        <p className="text-sm text-[#6B7280] mt-1">
          Revenue recovery and payment retry management
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-[#6B7280]">Failed Payments</p>
              <p className="text-xl font-semibold text-[#111827]">{failedPayments.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-[#6B7280]">At Risk Revenue</p>
              <p className="text-xl font-semibold text-[#111827]">
                {formatCurrency(totalFailedAmount, 'USD')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-[#6B7280]">Auto-Retry Schedule</p>
              <p className="text-xl font-semibold text-[#111827]">48h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
        <div className="flex flex-wrap gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search by tenant or invoice..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 h-[40px] border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-[40px] px-3 pr-8 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="failed">Failed</option>
            <option value="pending">Pending</option>
            <option value="success">Success</option>
          </select>
        </div>
      </div>

      {/* Payment Attempts Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E5E7EB]">
          <p className="text-sm text-[#6B7280]">
            Showing {sortedPayments.length} payment attempts
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Tenant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Failure Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Attempt Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[#6B7280] uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {sortedPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-[#111827]">{payment.tenantName}</p>
                    <p className="text-xs text-[#6B7280]">{payment.tenantId}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#111827]">{payment.invoiceNumber}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-[#111827]">
                      {formatCurrency(payment.amount, payment.currency)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {payment.status === 'success' && (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Success</span>
                      </div>
                    )}
                    {payment.status === 'failed' && (
                      <div className="flex items-center gap-2 text-red-600">
                        <XCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Failed</span>
                      </div>
                    )}
                    {payment.status === 'pending' && (
                      <div className="flex items-center gap-2 text-orange-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">Pending</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-red-600">
                      {payment.failureReason ? getFailureReasonLabel(payment.failureReason) : '-'}
                    </span>
                    {payment.gatewayResponse && (
                      <p className="text-xs text-[#9CA3AF] mt-1">{payment.gatewayResponse}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#6B7280]">
                      {new Date(payment.attemptDate).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#6B7280]">{payment.paymentMethod || '-'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {payment.status === 'failed' && (
                        <>
                          <button
                            onClick={() => handleTriggerRetry(payment)}
                            className="p-2 text-[#6B7280] hover:text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                            title="Trigger Manual Retry"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleContactTenant(payment)}
                            className="p-2 text-[#6B7280] hover:text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                            title="Contact Tenant"
                          >
                            <Mail className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleExtendGrace(payment)}
                            className="p-2 text-[#6B7280] hover:text-orange-600 hover:bg-[#FFF7ED] rounded-lg transition-colors"
                            title="Extend Grace Period"
                          >
                            <Calendar className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden divide-y divide-[#E5E7EB]">
          {sortedPayments.map((payment) => (
            <div key={payment.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="font-medium text-[#111827] mb-1">{payment.tenantName}</p>
                  <p className="text-xs text-[#6B7280] mb-2">{payment.invoiceNumber}</p>
                  {payment.status === 'failed' && (
                    <div className="flex items-center gap-2 text-red-600 mb-2">
                      <XCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {getFailureReasonLabel(payment.failureReason)}
                      </span>
                    </div>
                  )}
                </div>
                <span className="font-medium text-[#111827]">
                  {formatCurrency(payment.amount, payment.currency)}
                </span>
              </div>

              <div className="text-sm mb-3">
                <p className="text-xs text-[#6B7280]">
                  {new Date(payment.attemptDate).toLocaleString()}
                </p>
              </div>

              {payment.status === 'failed' && (
                <div className="flex items-center gap-2 pt-3 border-t border-[#E5E7EB]">
                  <button
                    onClick={() => handleTriggerRetry(payment)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] text-sm"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Retry
                  </button>
                  <button
                    onClick={() => handleContactTenant(payment)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    Contact
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {sortedPayments.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-[#6B7280]">No payment attempts found matching your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}