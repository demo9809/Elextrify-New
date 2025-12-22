import { X, Download, Printer, Send, FileText } from 'lucide-react';
import { MediaInvoice } from '../../data/mockMediaBilling';

interface InvoiceDetailViewProps {
  invoice: MediaInvoice | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function InvoiceDetailView({ invoice, isOpen, onClose }: InvoiceDetailViewProps) {
  if (!isOpen || !invoice) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleDownload = () => {
    alert(`Downloading PDF for ${invoice.invoiceNumber}`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSendToClient = () => {
    alert(`Sending invoice ${invoice.invoiceNumber} to ${invoice.clientName}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="border-b border-[#E5E7EB] px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-[#D9480F]" />
            <div>
              <h2 className="text-[#111827]">Invoice Details</h2>
              <p className="text-sm text-[#6B7280] mt-0.5">{invoice.invoiceNumber}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Actions Bar */}
        <div className="border-b border-[#E5E7EB] px-6 py-3 flex items-center gap-2 flex-shrink-0 bg-[#F9FAFB]">
          <button
            onClick={handleDownload}
            className="h-9 px-4 flex items-center gap-2 bg-white border border-[#E5E7EB] text-[#374151] rounded-lg hover:bg-[#F9FAFB] transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          <button
            onClick={handlePrint}
            className="h-9 px-4 flex items-center gap-2 bg-white border border-[#E5E7EB] text-[#374151] rounded-lg hover:bg-[#F9FAFB] transition-colors text-sm"
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button
            onClick={handleSendToClient}
            className="h-9 px-4 flex items-center gap-2 bg-[#D9480F] text-white rounded-lg hover:bg-[#C13D0C] transition-colors text-sm"
          >
            <Send className="w-4 h-4" />
            Send to Client
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Invoice Header */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-8">
            {/* Top Section: Legal Entity & Invoice Info */}
            <div className="flex items-start justify-between mb-8 pb-6 border-b border-[#E5E7EB]">
              {/* Legal Entity */}
              <div>
                <h3 className="text-xl font-semibold text-[#111827] mb-2">
                  {invoice.legalEntityName}
                </h3>
                <div className="text-sm text-[#6B7280] space-y-1">
                  <div>GST: {invoice.legalEntityGST}</div>
                  <div>Address Line 1</div>
                  <div>City, State - 400001</div>
                  <div>India</div>
                </div>
              </div>

              {/* Invoice Number & Date */}
              <div className="text-right">
                <div className="text-sm text-[#6B7280] mb-1">Invoice Number</div>
                <div className="text-2xl font-bold text-[#111827] mb-4">
                  {invoice.invoiceNumber}
                </div>
                <div className="text-sm space-y-1">
                  <div>
                    <span className="text-[#6B7280]">Issue Date: </span>
                    <span className="text-[#111827] font-medium">
                      {formatDate(invoice.issueDate)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#6B7280]">Due Date: </span>
                    <span className="text-[#111827] font-medium">
                      {formatDate(invoice.dueDate)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bill To & Billing Period */}
            <div className="grid grid-cols-2 gap-8 mb-8 pb-6 border-b border-[#E5E7EB]">
              {/* Bill To */}
              <div>
                <div className="text-xs font-semibold text-[#6B7280] uppercase mb-2">Bill To</div>
                <div className="text-[#111827] font-semibold mb-2">{invoice.clientName}</div>
                <div className="text-sm text-[#6B7280] space-y-1">
                  {invoice.clientGST && <div>GST: {invoice.clientGST}</div>}
                  <div>Client Address Line 1</div>
                  <div>City, State - 400001</div>
                  <div>India</div>
                </div>
              </div>

              {/* Billing Period */}
              <div>
                <div className="text-xs font-semibold text-[#6B7280] uppercase mb-2">
                  Billing Period
                </div>
                <div className="text-[#111827] font-medium">
                  {formatDate(invoice.billingPeriod.start)} -{' '}
                  {formatDate(invoice.billingPeriod.end)}
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="mb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-[#E5E7EB]">
                    <th className="text-left py-3 text-[#6B7280] font-semibold uppercase text-xs">
                      Campaign
                    </th>
                    <th className="text-right py-3 text-[#6B7280] font-semibold uppercase text-xs">
                      Scheduled Hours
                    </th>
                    <th className="text-right py-3 text-[#6B7280] font-semibold uppercase text-xs">
                      Actual PoP Hours
                    </th>
                    <th className="text-right py-3 text-[#6B7280] font-semibold uppercase text-xs">
                      Peak Slots
                    </th>
                    <th className="text-right py-3 text-[#6B7280] font-semibold uppercase text-xs">
                      Non-Peak Slots
                    </th>
                    <th className="text-right py-3 text-[#6B7280] font-semibold uppercase text-xs">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.lineItems.map((item, index) => (
                    <tr key={index} className="border-b border-[#F3F4F6]">
                      <td className="py-4">
                        <div className="font-medium text-[#111827]">{item.campaignName}</div>
                        <div className="text-xs text-[#6B7280] mt-1">
                          {item.screens} screens • {item.regions.join(', ')}
                        </div>
                      </td>
                      <td className="text-right py-4 text-[#6B7280]">{item.scheduledHours}h</td>
                      <td className="text-right py-4 font-medium text-[#111827]">
                        {item.actualPopHours}h
                      </td>
                      <td className="text-right py-4 text-[#6B7280]">
                        <div>{item.peakSlots}</div>
                        <div className="text-xs">@₹{item.peakRate.toLocaleString('en-IN')}</div>
                      </td>
                      <td className="text-right py-4 text-[#6B7280]">
                        <div>{item.nonPeakSlots}</div>
                        <div className="text-xs">@₹{item.nonPeakRate.toLocaleString('en-IN')}</div>
                      </td>
                      <td className="text-right py-4 font-semibold text-[#111827]">
                        {formatCurrency(item.lineTotal)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals Section */}
            <div className="flex justify-end">
              <div className="w-80 space-y-2">
                <div className="flex items-center justify-between py-2 text-sm">
                  <span className="text-[#6B7280]">Subtotal</span>
                  <span className="font-medium text-[#111827]">
                    {formatCurrency(invoice.subtotal)}
                  </span>
                </div>

                {invoice.discount && (
                  <div className="flex items-center justify-between py-2 text-sm border-t border-[#F3F4F6]">
                    <div>
                      <div className="text-[#6B7280]">
                        Discount
                        {invoice.discount.type === 'percentage' && ` (${invoice.discount.value}%)`}
                      </div>
                      <div className="text-xs text-[#9CA3AF] italic">{invoice.discount.reason}</div>
                    </div>
                    <span className="font-medium text-[#DC2626]">
                      -{formatCurrency(
                        invoice.discount.type === 'percentage'
                          ? (invoice.subtotal * invoice.discount.value) / 100
                          : invoice.discount.value
                      )}
                    </span>
                  </div>
                )}

                {invoice.tax && (
                  <>
                    <div className="flex items-center justify-between py-2 text-sm border-t border-[#F3F4F6]">
                      <span className="text-[#6B7280]">CGST (9%)</span>
                      <span className="font-medium text-[#111827]">
                        {formatCurrency(invoice.tax.cgst)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 text-sm">
                      <span className="text-[#6B7280]">SGST (9%)</span>
                      <span className="font-medium text-[#111827]">
                        {formatCurrency(invoice.tax.sgst)}
                      </span>
                    </div>
                  </>
                )}

                <div className="flex items-center justify-between py-3 border-t-2 border-[#E5E7EB]">
                  <span className="text-lg font-semibold text-[#111827]">Total Amount</span>
                  <span className="text-2xl font-bold text-[#111827]">
                    {formatCurrency(invoice.total)}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="flex justify-end pt-2">
                  <span
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${
                      invoice.status === 'paid'
                        ? 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]'
                        : invoice.status === 'pending'
                        ? 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
                        : 'bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]'
                    }`}
                  >
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Notes */}
            <div className="mt-8 pt-6 border-t border-[#E5E7EB] text-xs text-[#6B7280]">
              <div className="mb-2">
                <span className="font-semibold text-[#374151]">Payment Terms:</span> Net 15 days
                from invoice date
              </div>
              <div className="mb-2">
                <span className="font-semibold text-[#374151]">Note:</span> This is a
                system-generated invoice based on actual Proof of Play data.
              </div>
              <div>
                <span className="font-semibold text-[#374151]">Questions?</span> Contact
                billing@elextrify.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
