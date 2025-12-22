import { useState, useMemo } from 'react';
import { 
  Search, 
  Download, 
  Eye, 
  Mail, 
  ChevronDown,
  ChevronUp,
  Calendar
} from 'lucide-react';
import { mockMediaInvoices, MediaInvoice } from '../../data/mockMediaBilling';

type StatusFilter = 'all' | 'paid' | 'pending' | 'overdue';
type SortField = 'date' | 'amount' | 'dueDate';
type SortDirection = 'asc' | 'desc';

interface MediaBillingInvoicesProps {
  onViewInvoice: (invoice: MediaInvoice) => void;
}

export default function MediaBillingInvoices({ onViewInvoice }: MediaBillingInvoicesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const invoices = mockMediaInvoices;

  // Filtered and sorted invoices
  const filteredInvoices = useMemo(() => {
    let result = [...invoices];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (inv) =>
          inv.invoiceNumber.toLowerCase().includes(query) ||
          inv.clientName.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter((inv) => inv.status === statusFilter);
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      if (sortField === 'date') {
        comparison = new Date(a.issueDate).getTime() - new Date(b.issueDate).getTime();
      } else if (sortField === 'amount') {
        comparison = a.amount - b.amount;
      } else if (sortField === 'dueDate') {
        comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [invoices, searchQuery, statusFilter, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]';
      case 'pending':
        return 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]';
      case 'overdue':
        return 'bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]';
      default:
        return 'bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB]';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleSendReminder = (invoice: MediaInvoice) => {
    // In real app, this would trigger an API call
    alert(`Reminder sent to ${invoice.clientName} for invoice ${invoice.invoiceNumber}`);
  };

  const handleDownloadPDF = (invoice: MediaInvoice) => {
    // In real app, this would download the PDF
    alert(`Downloading PDF for invoice ${invoice.invoiceNumber}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const formatBillingPeriod = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return `${startDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ChevronDown className="w-4 h-4 text-[#9CA3AF]" />;
    }
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-4 h-4 text-[#D9480F]" />
    ) : (
      <ChevronDown className="w-4 h-4 text-[#D9480F]" />
    );
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by invoice number or client..."
            className="w-full h-10 pl-10 pr-4 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:ring-2 focus:ring-[#D9480F]/20 focus:border-[#D9480F] outline-none"
          />
        </div>

        {/* Status Filter Chips */}
        <div className="flex gap-2">
          {(['all', 'paid', 'pending', 'overdue'] as StatusFilter[]).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 h-10 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-[#D9480F] text-white'
                  : 'bg-white border border-[#E5E7EB] text-[#6B7280] hover:border-[#D9480F] hover:text-[#D9480F]'
              }`}
            >
              {status === 'all' ? 'All' : getStatusLabel(status)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-medium text-[#6B7280]">
            <div className="col-span-2">Invoice Number</div>
            <div className="col-span-2">Client</div>
            <div className="col-span-2">Billing Period</div>
            <div 
              className="col-span-1 flex items-center gap-1 cursor-pointer hover:text-[#D9480F]"
              onClick={() => handleSort('amount')}
            >
              Amount
              <SortIcon field="amount" />
            </div>
            <div className="col-span-1">Status</div>
            <div 
              className="col-span-2 flex items-center gap-1 cursor-pointer hover:text-[#D9480F]"
              onClick={() => handleSort('dueDate')}
            >
              Due Date
              <SortIcon field="dueDate" />
            </div>
            <div className="col-span-2 text-right">Actions</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-[#E5E7EB]">
          {filteredInvoices.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="text-sm text-[#6B7280]">
                No invoices found matching your criteria
              </div>
            </div>
          ) : (
            filteredInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className="grid grid-cols-12 gap-4 px-6 py-4 text-sm hover:bg-[#F9FAFB] transition-colors"
              >
                {/* Invoice Number */}
                <div className="col-span-2 font-medium text-[#111827]">
                  {invoice.invoiceNumber}
                </div>

                {/* Client */}
                <div className="col-span-2 text-[#111827]">
                  {invoice.clientName}
                </div>

                {/* Billing Period */}
                <div className="col-span-2 text-[#6B7280] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="text-xs">
                    {formatBillingPeriod(invoice.billingPeriod.start, invoice.billingPeriod.end)}
                  </span>
                </div>

                {/* Amount */}
                <div className="col-span-1 font-semibold text-[#111827]">
                  ₹{Math.round(invoice.amount / 1000)}k
                </div>

                {/* Status */}
                <div className="col-span-1">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      invoice.status
                    )}`}
                  >
                    {getStatusLabel(invoice.status)}
                  </span>
                </div>

                {/* Due Date */}
                <div className="col-span-2 text-[#6B7280]">
                  {formatDate(invoice.dueDate)}
                </div>

                {/* Actions */}
                <div className="col-span-2 flex items-center justify-end gap-2">
                  <button
                    onClick={() => onViewInvoice(invoice)}
                    className="w-8 h-8 flex items-center justify-center text-[#6B7280] hover:text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                    title="View Invoice"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDownloadPDF(invoice)}
                    className="w-8 h-8 flex items-center justify-center text-[#6B7280] hover:text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                    title="Download PDF"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  {(invoice.status === 'pending' || invoice.status === 'overdue') && (
                    <button
                      onClick={() => handleSendReminder(invoice)}
                      className="w-8 h-8 flex items-center justify-center text-[#6B7280] hover:text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                      title="Send Reminder"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Results Summary */}
      {filteredInvoices.length > 0 && (
        <div className="text-sm text-[#6B7280] text-center">
          Showing {filteredInvoices.length} of {invoices.length} invoice
          {invoices.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}
