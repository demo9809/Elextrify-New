import { X, Download, Printer, Mail } from 'lucide-react';
import { toast } from 'sonner';
import {
  mockMediaInvoices,
  getMediaInvoiceStatusLabel,
  getMediaInvoiceStatusColor,
  formatCurrency,
  formatDate,
} from '../../data/mockMediaBillingData';

interface MediaInvoicePreviewProps {
  invoiceId: string;
  onClose: () => void;
}

export default function MediaInvoicePreview({ invoiceId, onClose }: MediaInvoicePreviewProps) {
  const invoice = mockMediaInvoices.find((inv) => inv.id === invoiceId);

  if (!invoice) {
    return null;
  }

  const handleDownload = () => {
    toast.success(`Downloading invoice ${invoice.invoiceNumber}...`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    toast.success(`Invoice ${invoice.invoiceNumber} sent to ${invoice.clientName}`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-[#111827]">Media Usage Invoice</h2>
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#FEF2F2] border border-[#FECACA] text-xs font-medium text-[#DC2626]">
                Customer Billing
              </span>
            </div>
            <p className="text-sm text-[#6B7280] mt-1">{invoice.invoiceNumber}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F9FAFB] transition-colors"
          >
            <X className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>

        {/* Invoice Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-3xl mx-auto bg-white border border-[#E5E7EB] rounded-lg p-8">
            {/* Invoice Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-[#111827] mb-2">MEDIA USAGE INVOICE</h1>
                <p className="text-sm text-[#DC2626] font-medium mb-2">What you charge your customers</p>
                <div className="text-sm text-[#6B7280]">
                  <div>{invoice.invoiceNumber}</div>
                  <div>Issued: {formatDate(invoice.issuedDate)}</div>
                  <div>Due: {formatDate(invoice.dueDate)}</div>
                </div>
              </div>
              <div>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium ${getMediaInvoiceStatusColor(
                    invoice.status
                  )}`}
                >
                  {getMediaInvoiceStatusLabel(invoice.status)}
                </span>
              </div>
            </div>

            {/* From/To */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <div className="text-xs font-semibold text-[#6B7280] uppercase mb-2">
                  From
                </div>
                <div className="text-sm text-[#111827]">
                  <div className="font-semibold">Your Company Name</div>
                  <div>123 Business Street</div>
                  <div>Mumbai, Maharashtra 400001</div>
                  <div>India</div>
                  <div className="mt-2">
                    <div>GST: 27AABCU9603R1ZX</div>
                    <div>PAN: AABCU9603R</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-[#6B7280] uppercase mb-2">
                  Bill To
                </div>
                <div className="text-sm text-[#111827]">
                  <div className="font-semibold">{invoice.clientName}</div>
                  <div className="mt-2">
                    {invoice.gstNumber && <div>GST: {invoice.gstNumber}</div>}
                    {invoice.panNumber && <div>PAN: {invoice.panNumber}</div>}
                  </div>
                </div>
              </div>
            </div>

            {/* Period */}
            <div className="bg-[#F9FAFB] rounded-lg p-4 mb-6">
              <div className="text-sm">
                <span className="font-semibold text-[#111827]">Billing Period:</span>{' '}
                <span className="text-[#6B7280]">{invoice.period}</span>
              </div>
            </div>

            {/* Campaign Line Items */}
            <div className="mb-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E5E7EB]">
                    <th className="text-left py-3 text-xs font-semibold text-[#6B7280] uppercase">
                      Campaign
                    </th>
                    <th className="text-right py-3 text-xs font-semibold text-[#6B7280] uppercase">
                      Hours
                    </th>
                    <th className="text-right py-3 text-xs font-semibold text-[#6B7280] uppercase">
                      Screens
                    </th>
                    <th className="text-right py-3 text-xs font-semibold text-[#6B7280] uppercase">
                      Rate/Hr
                    </th>
                    <th className="text-right py-3 text-xs font-semibold text-[#6B7280] uppercase">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.campaigns.map((campaign, idx) => (
                    <tr key={idx} className="border-b border-[#E5E7EB]">
                      <td className="py-4">
                        <div className="font-medium text-[#111827] mb-1">
                          {campaign.campaignName}
                        </div>
                        <div className="text-xs text-[#6B7280]">
                          Regions: {campaign.regions.join(', ')}
                        </div>
                      </td>
                      <td className="text-right text-sm text-[#111827]">
                        {campaign.hoursRun}
                      </td>
                      <td className="text-right text-sm text-[#111827]">
                        {campaign.screensUsed}
                      </td>
                      <td className="text-right text-sm text-[#111827]">
                        {formatCurrency(campaign.ratePerHour, invoice.currency)}
                      </td>
                      <td className="text-right text-sm font-medium text-[#111827]">
                        {formatCurrency(campaign.totalAmount, invoice.currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-80">
                <div className="flex justify-between py-2 text-sm">
                  <span className="text-[#6B7280]">Subtotal</span>
                  <span className="font-medium text-[#111827]">
                    {formatCurrency(invoice.subtotal, invoice.currency)}
                  </span>
                </div>
                <div className="flex justify-between py-2 text-sm">
                  <span className="text-[#6B7280]">GST ({invoice.taxRate}%)</span>
                  <span className="font-medium text-[#111827]">
                    {formatCurrency(invoice.tax, invoice.currency)}
                  </span>
                </div>
                <div className="border-t border-[#E5E7EB] mt-2 pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#111827]">Total</span>
                    <span className="text-xl font-bold text-[#111827]">
                      {formatCurrency(invoice.total, invoice.currency)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            {invoice.paidDate && (
              <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-sm text-green-800">
                  <span className="font-semibold">Paid on:</span> {formatDate(invoice.paidDate)}
                </div>
              </div>
            )}

            {/* Footer Notes */}
            <div className="mt-8 pt-6 border-t border-[#E5E7EB]">
              <div className="text-xs text-[#6B7280]">
                <p className="mb-2">
                  <strong>Payment Terms:</strong> Payment is due within 15 days of invoice date.
                </p>
                <p>
                  <strong>Note:</strong> This invoice is for campaign delivery services. Platform
                  subscription fees are billed separately. For questions, please contact
                  billing@yourcompany.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-[#E5E7EB] bg-[#F9FAFB]">
          <button
            onClick={handleEmail}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] text-[#111827] rounded-lg hover:border-[#16A34A] transition-colors text-sm font-medium"
          >
            <Mail className="w-4 h-4" />
            Email to Client
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] text-[#111827] rounded-lg hover:border-[#16A34A] transition-colors text-sm font-medium"
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-[#16A34A] text-white rounded-lg hover:bg-[#15803D] transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}