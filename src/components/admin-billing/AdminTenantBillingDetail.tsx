import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Download,
  RefreshCw,
  Ban,
  Play,
  DollarSign,
  Edit,
  Trash2,
  Clock,
  Activity,
  Receipt,
  TrendingUp,
  FileText,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  mockAdminBillingData,
  formatCurrency,
  getStatusColor,
  getStatusLabel,
} from '../../data/mockAdminBillingData';

export default function AdminTenantBillingDetail() {
  const { tenantId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'invoices'>('overview');
  const [showChangeEditionModal, setShowChangeEditionModal] = useState(false);
  const [showApplyCreditModal, setShowApplyCreditModal] = useState(false);
  const [showGrantFreeModal, setShowGrantFreeModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);

  const tenant = mockAdminBillingData.tenantBillings.find((t) => t.tenantId === tenantId);
  const tenantInvoices = mockAdminBillingData.invoices.filter((inv) => inv.tenantId === tenantId);
  const tenantAuditLogs = mockAdminBillingData.auditLogs.filter((log) => log.tenantId === tenantId);

  if (!tenant) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#6B7280]">Tenant not found</p>
          <button
            onClick={() => navigate('/admin/billing')}
            className="mt-4 text-[#D9480F] hover:text-[#C23D0D]"
          >
            Back to Billing
          </button>
        </div>
      </div>
    );
  }

  const handleRetryPayment = () => {
    toast.success('Payment retry initiated', {
      description: 'The payment will be processed within a few minutes.',
    });
  };

  const handleChangeEdition = () => {
    setShowChangeEditionModal(true);
  };

  const handlePauseBilling = () => {
    toast.success('Billing paused', {
      description: 'No charges will be made until billing is resumed.',
    });
  };

  const handleGrantFree = () => {
    setShowGrantFreeModal(true);
  };

  const handleApplyCredit = () => {
    setShowApplyCreditModal(true);
  };

  const handleSuspend = () => {
    setShowSuspendModal(true);
  };

  const handleCancel = () => {
    toast.error('Cancellation requires confirmation dialog');
  };

  // Calculate stats for overview
  const totalInvoices = tenantInvoices.length;
  const totalPaid = tenantInvoices
    .filter((inv) => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);
  const totalOverdue = tenantInvoices
    .filter((inv) => inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate('/admin/billing')}
            className="flex items-center gap-2 text-[#6B7280] hover:text-[#111827] mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Billing</span>
          </button>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-[#111827]">{tenant.tenantName}</h1>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium ${getStatusColor(
                    tenant.status
                  )}`}
                >
                  {getStatusLabel(tenant.status)}
                </span>
              </div>
              <p className="text-sm text-[#6B7280]">
                Tenant ID: {tenant.tenantId} • Subscribed since{' '}
                {new Date(tenant.subscriptionStartDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto space-y-6">
        {/* Billing & Subscription Section with Icon */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          {/* Section Header with Icon */}
          <div className="px-6 py-4 border-b border-[#E5E7EB] bg-gradient-to-r from-[#FEF2F2] to-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#D9480F] flex items-center justify-center">
                <Receipt className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-[#111827]">Billing & Subscription</h2>
                <p className="text-xs text-[#6B7280]">Manage tenant billing and subscription details</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-[#E5E7EB]">
            <div className="flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'overview'
                    ? 'text-[#D9480F] border-b-2 border-[#D9480F]'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab('invoices')}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'invoices'
                    ? 'text-[#D9480F] border-b-2 border-[#D9480F]'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                <FileText className="w-4 h-4" />
                Invoices ({tenantInvoices.length})
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-blue-700">Total Invoices</p>
                        <p className="text-xl font-semibold text-blue-900">{totalInvoices}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-green-700">Total Paid</p>
                        <p className="text-xl font-semibold text-green-900">
                          {formatCurrency(totalPaid, tenant.currency)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-600 flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-orange-700">Total Overdue</p>
                        <p className="text-xl font-semibold text-orange-900">
                          {formatCurrency(totalOverdue, tenant.currency)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subscription Details */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-[#111827]">Subscription Details</h3>
                    <button
                      onClick={handleChangeEdition}
                      className="flex items-center gap-2 px-3 h-[36px] text-sm text-[#D9480F] hover:text-[#C23D0D] font-medium"
                    >
                      <Edit className="w-4 h-4" />
                      Change Edition
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <p className="text-xs text-[#6B7280] mb-2">Current Edition</p>
                      <p className="text-lg font-semibold text-[#111827]">{tenant.edition}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#6B7280] mb-2">Billing Cycle</p>
                      <p className="text-lg font-semibold text-[#111827] capitalize">
                        {tenant.billingCycle}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#6B7280] mb-2">Amount</p>
                      <p className="text-lg font-semibold text-[#111827]">
                        {formatCurrency(tenant.amount, tenant.currency)}
                        <span className="text-sm font-normal text-[#6B7280]">
                          /{tenant.billingCycle === 'monthly' ? 'mo' : 'yr'}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#6B7280] mb-2">Auto Renew</p>
                      <p className="text-lg font-semibold text-[#111827]">
                        {tenant.autoRenew ? (
                          <span className="text-green-600">Enabled</span>
                        ) : (
                          <span className="text-red-600">Disabled</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 pt-6 border-t border-[#E5E7EB]">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-[#6B7280]" />
                      <div>
                        <p className="text-xs text-[#6B7280]">Start Date</p>
                        <p className="font-medium text-[#111827]">
                          {new Date(tenant.subscriptionStartDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-[#6B7280]" />
                      <div>
                        <p className="text-xs text-[#6B7280]">Next Invoice</p>
                        <p className="font-medium text-[#111827]">
                          {new Date(tenant.nextInvoiceDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                    {tenant.paymentMethod && (
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-[#6B7280]" />
                        <div>
                          <p className="text-xs text-[#6B7280]">Payment Method</p>
                          <p className="font-medium text-[#111827]">{tenant.paymentMethod}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Admin Controls */}
                <div className="pt-6 border-t border-[#E5E7EB]">
                  <h3 className="font-medium text-[#111827] mb-4">Admin Controls</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {tenant.status === 'past-due' && (
                      <button
                        onClick={handleRetryPayment}
                        className="flex flex-col items-center gap-2 p-4 border border-[#E5E7EB] rounded-lg hover:border-[#D9480F] hover:bg-[#FEF2F2] transition-colors group"
                      >
                        <RefreshCw className="w-5 h-5 text-[#6B7280] group-hover:text-[#D9480F]" />
                        <span className="text-xs font-medium text-[#6B7280] group-hover:text-[#D9480F]">
                          Retry Payment
                        </span>
                      </button>
                    )}
                    <button
                      onClick={handleApplyCredit}
                      className="flex flex-col items-center gap-2 p-4 border border-[#E5E7EB] rounded-lg hover:border-[#D9480F] hover:bg-[#FEF2F2] transition-colors group"
                    >
                      <DollarSign className="w-5 h-5 text-[#6B7280] group-hover:text-[#D9480F]" />
                      <span className="text-xs font-medium text-[#6B7280] group-hover:text-[#D9480F]">
                        Apply Credit
                      </span>
                    </button>
                    <button
                      onClick={handlePauseBilling}
                      className="flex flex-col items-center gap-2 p-4 border border-[#E5E7EB] rounded-lg hover:border-[#D9480F] hover:bg-[#FEF2F2] transition-colors group"
                    >
                      <Clock className="w-5 h-5 text-[#6B7280] group-hover:text-[#D9480F]" />
                      <span className="text-xs font-medium text-[#6B7280] group-hover:text-[#D9480F]">
                        Pause Billing
                      </span>
                    </button>
                    <button
                      onClick={handleGrantFree}
                      className="flex flex-col items-center gap-2 p-4 border border-[#E5E7EB] rounded-lg hover:border-[#D9480F] hover:bg-[#FEF2F2] transition-colors group"
                    >
                      <Play className="w-5 h-5 text-[#6B7280] group-hover:text-[#D9480F]" />
                      <span className="text-xs font-medium text-[#6B7280] group-hover:text-[#D9480F]">
                        Grant Free Period
                      </span>
                    </button>
                    {tenant.status !== 'suspended' && (
                      <button
                        onClick={handleSuspend}
                        className="flex flex-col items-center gap-2 p-4 border border-[#E5E7EB] rounded-lg hover:border-red-300 hover:bg-[#FEF2F2] transition-colors group"
                      >
                        <Ban className="w-5 h-5 text-[#6B7280] group-hover:text-[#DC2626]" />
                        <span className="text-xs font-medium text-[#6B7280] group-hover:text-[#DC2626]">
                          Suspend
                        </span>
                      </button>
                    )}
                    <button
                      onClick={handleCancel}
                      className="flex flex-col items-center gap-2 p-4 border border-[#E5E7EB] rounded-lg hover:border-red-300 hover:bg-[#FEF2F2] transition-colors group"
                    >
                      <Trash2 className="w-5 h-5 text-[#6B7280] group-hover:text-[#DC2626]" />
                      <span className="text-xs font-medium text-[#6B7280] group-hover:text-[#DC2626]">
                        Cancel
                      </span>
                    </button>
                  </div>
                </div>

                {/* Recent Activity / Audit Log Preview */}
                <div className="pt-6 border-t border-[#E5E7EB]">
                  <h3 className="font-medium text-[#111827] mb-4">Recent Activity</h3>
                  {tenantAuditLogs.slice(0, 3).length > 0 ? (
                    <div className="space-y-3">
                      {tenantAuditLogs.slice(0, 3).map((log) => (
                        <div
                          key={log.id}
                          className="flex items-start gap-3 p-3 bg-[#F9FAFB] rounded-lg"
                        >
                          <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                            <Activity className="w-4 h-4 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-1">
                              <p className="text-sm font-medium text-[#111827]">{log.action}</p>
                              <p className="text-xs text-[#6B7280]">
                                {new Date(log.timestamp).toLocaleDateString()}
                              </p>
                            </div>
                            <p className="text-xs text-[#6B7280]">{log.details}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-[#6B7280]">No recent activity</p>
                  )}
                </div>
              </div>
            )}

            {/* Invoices Tab */}
            {activeTab === 'invoices' && (
              <div className="space-y-4">
                {tenantInvoices.length > 0 ? (
                  tenantInvoices.map((invoice) => (
                    <div key={invoice.id} className="border border-[#E5E7EB] rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="font-medium text-[#111827]">{invoice.invoiceNumber}</p>
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-md border text-xs font-medium ${getStatusColor(
                                invoice.status
                              )}`}
                            >
                              {getStatusLabel(invoice.status)}
                            </span>
                          </div>
                          <p className="text-sm text-[#6B7280]">
                            Issued: {new Date(invoice.issuedDate).toLocaleDateString()} • Due:{' '}
                            {new Date(invoice.dueDate).toLocaleDateString()}
                            {invoice.paidDate &&
                              ` • Paid: ${new Date(invoice.paidDate).toLocaleDateString()}`}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-[#111827]">
                            {formatCurrency(invoice.amount, invoice.currency)}
                          </p>
                          <button className="mt-2 text-sm text-[#D9480F] hover:text-[#C23D0D] flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                        </div>
                      </div>

                      {/* Line Items */}
                      <div className="mb-4 p-3 bg-[#F9FAFB] rounded-lg">
                        {invoice.lineItems.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between text-sm py-1"
                          >
                            <span className="text-[#6B7280]">{item.description}</span>
                            <span className="font-medium text-[#111827]">
                              {formatCurrency(item.amount, invoice.currency)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Payment Attempts */}
                      {invoice.paymentAttempts.length > 0 && (
                        <div>
                          <p className="text-xs font-medium text-[#6B7280] uppercase mb-2">
                            Payment Attempts ({invoice.paymentAttempts.length})
                          </p>
                          <div className="space-y-2">
                            {invoice.paymentAttempts.map((attempt) => (
                              <div
                                key={attempt.id}
                                className="flex items-center justify-between text-sm p-2 bg-[#F9FAFB] rounded"
                              >
                                <div className="flex items-center gap-2">
                                  {attempt.status === 'success' ? (
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <AlertCircle className="w-4 h-4 text-red-600" />
                                  )}
                                  <span className="text-[#6B7280]">
                                    {new Date(attempt.attemptDate).toLocaleString()}
                                  </span>
                                  {attempt.failureReason && (
                                    <span className="text-xs text-red-600">
                                      • {attempt.failureReason}
                                    </span>
                                  )}
                                </div>
                                <span
                                  className={`text-xs font-medium ${
                                    attempt.status === 'success'
                                      ? 'text-green-600'
                                      : 'text-red-600'
                                  }`}
                                >
                                  {formatCurrency(attempt.amount, attempt.currency)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center border border-[#E5E7EB] rounded-lg">
                    <FileText className="w-12 h-12 text-[#9CA3AF] mx-auto mb-3" />
                    <p className="text-[#6B7280]">No invoices found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
