import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Download,
  Eye,
  Mail,
  CreditCard,
  CheckCircle,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  mockAdminBillingData,
  formatCurrency,
  getStatusColor,
  getStatusLabel,
  type Invoice,
} from '../../data/mockAdminBillingData';

export default function AdminInvoices() {
  const navigate = useNavigate();
  const [billingData] = useState(mockAdminBillingData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const { invoices, tenantBillings } = billingData;

  // Get tenant name for invoice
  const getTenantName = (tenantId: string): string => {
    const tenant = tenantBillings.find((t) => t.tenantId === tenantId);
    return tenant?.tenantName || 'Unknown';
  };

  // Filter invoices
  const filteredInvoices = invoices.filter((invoice) => {
    const tenantName = getTenantName(invoice.tenantId);
    const matchesSearch =
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.tenantId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleResendInvoice = (invoice: Invoice) => {
    toast.success(`Invoice ${invoice.invoiceNumber} resent`, {
      description: `Email sent to ${getTenantName(invoice.tenantId)}`,
    });
  };

  const handleApplyCreditNote = (invoice: Invoice) => {
    toast.success(`Credit note modal would open for ${invoice.invoiceNumber}`);
  };

  const handleMarkAsPaid = (invoice: Invoice) => {
    toast.error('Mark as paid requires confirmation and audit trail', {
      description: 'This action is restricted and requires super admin approval',
    });
  };

  const handleViewDetails = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleDownloadPDF = (invoice: Invoice) => {
    toast.success(`Downloading ${invoice.invoiceNumber}.pdf`);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[#111827]">Invoice Management</h1>
        <p className="text-sm text-[#6B7280] mt-1">
          Financial traceability and invoice operations
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
        <div className="flex flex-wrap gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search by invoice # or tenant..."
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
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
            <option value="void">Void</option>
          </select>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E5E7EB]">
          <p className="text-sm text-[#6B7280]">
            Showing {filteredInvoices.length} of {invoices.length} invoices
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Invoice #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Tenant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Issued Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Paid Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[#6B7280] uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#6B7280]" />
                      <span className="font-medium text-[#111827]">{invoice.invoiceNumber}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-[#111827]">{getTenantName(invoice.tenantId)}</p>
                    <p className="text-xs text-[#6B7280]">{invoice.tenantId}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-[#111827]">
                      {formatCurrency(invoice.amount, invoice.currency)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-md border text-xs font-medium ${getStatusColor(
                        invoice.status
                      )}`}
                    >
                      {getStatusLabel(invoice.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#6B7280]">
                      {new Date(invoice.issuedDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#6B7280]">
                      {new Date(invoice.dueDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#6B7280]">
                      {invoice.paidDate
                        ? new Date(invoice.paidDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleViewDetails(invoice)}
                        className="p-2 text-[#6B7280] hover:text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownloadPDF(invoice)}
                        className="p-2 text-[#6B7280] hover:text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                        title="Download PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleResendInvoice(invoice)}
                        className="p-2 text-[#6B7280] hover:text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                        title="Resend Invoice"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                      {invoice.status === 'paid' && (
                        <button
                          onClick={() => handleApplyCreditNote(invoice)}
                          className="p-2 text-[#6B7280] hover:text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                          title="Apply Credit Note"
                        >
                          <CreditCard className="w-4 h-4" />
                        </button>
                      )}
                      {invoice.status === 'pending' && (
                        <button
                          onClick={() => handleMarkAsPaid(invoice)}
                          className="p-2 text-[#6B7280] hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Mark as Paid (Restricted)"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
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
          {filteredInvoices.map((invoice) => (
            <div key={invoice.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-[#6B7280]" />
                    <p className="font-medium text-[#111827]">{invoice.invoiceNumber}</p>
                  </div>
                  <p className="text-sm text-[#6B7280] mb-2">{getTenantName(invoice.tenantId)}</p>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-md border text-xs font-medium ${getStatusColor(
                      invoice.status
                    )}`}
                  >
                    {getStatusLabel(invoice.status)}
                  </span>
                </div>
                <div className="text-right">
                  <p className="font-medium text-[#111827]">
                    {formatCurrency(invoice.amount, invoice.currency)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Issued</p>
                  <p className="text-[#111827]">
                    {new Date(invoice.issuedDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Due</p>
                  <p className="text-[#111827]">
                    {new Date(invoice.dueDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-[#E5E7EB]">
                <button
                  onClick={() => handleViewDetails(invoice)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] text-sm"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button
                  onClick={() => handleDownloadPDF(invoice)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] text-sm"
                >
                  <Download className="w-4 h-4" />
                  PDF
                </button>
                <button
                  onClick={() => handleResendInvoice(invoice)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] text-sm"
                >
                  <Mail className="w-4 h-4" />
                  Resend
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredInvoices.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-[#6B7280]">No invoices found matching your filters</p>
          </div>
        )}
      </div>

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#E5E7EB]">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-[#111827] mb-1">
                    {selectedInvoice.invoiceNumber}
                  </h3>
                  <p className="text-sm text-[#6B7280]">
                    {getTenantName(selectedInvoice.tenantId)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="text-[#6B7280] hover:text-[#111827]"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Line Items */}
              <div>
                <h4 className="text-sm font-medium text-[#111827] mb-3">Line Items</h4>
                <div className="space-y-2">
                  {selectedInvoice.lineItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#111827]">{item.description}</p>
                        <p className="text-xs text-[#6B7280]">
                          Qty: {item.quantity} × {formatCurrency(item.unitPrice, selectedInvoice.currency)}
                        </p>
                      </div>
                      <span className="font-medium text-[#111827]">
                        {formatCurrency(item.amount, selectedInvoice.currency)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Attempts */}
              {selectedInvoice.paymentAttempts.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-[#111827] mb-3">Payment Attempts</h4>
                  <div className="space-y-2">
                    {selectedInvoice.paymentAttempts.map((attempt) => (
                      <div key={attempt.id} className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg">
                        <div className="flex items-center gap-2">
                          {attempt.status === 'success' ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-red-600" />
                          )}
                          <div>
                            <p className="text-sm text-[#111827]">
                              {new Date(attempt.attemptDate).toLocaleString()}
                            </p>
                            {attempt.failureReason && (
                              <p className="text-xs text-red-600">{attempt.failureReason}</p>
                            )}
                          </div>
                        </div>
                        <span className={`text-sm font-medium ${
                          attempt.status === 'success' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {formatCurrency(attempt.amount, attempt.currency)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-[#E5E7EB] flex gap-3">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="flex-1 h-[40px] border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB]"
              >
                Close
              </button>
              <button
                onClick={() => handleDownloadPDF(selectedInvoice)}
                className="flex-1 h-[40px] bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D]"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}