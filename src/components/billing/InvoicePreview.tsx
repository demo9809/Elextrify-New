import { X, Download, FileSpreadsheet, Printer, MapPin } from 'lucide-react';
import { formatCurrency, getInvoiceStatusLabel, getInvoiceStatusColor, getDetailedInvoice } from '../../data/mockBillingData';

interface InvoicePreviewProps {
  invoiceId: string;
  onClose: () => void;
}

export default function InvoicePreview({ invoiceId, onClose }: InvoicePreviewProps) {
  const invoice = getDetailedInvoice(invoiceId);

  const handleDownloadPDF = () => {
    console.log('Downloading PDF for invoice:', invoice.invoiceNumber);
    // In real implementation, this would trigger PDF generation/download
  };

  const handleExport = () => {
    console.log('Exporting invoice:', invoice.invoiceNumber);
    // In real implementation, this would export to CSV/XLS
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB] bg-white">
            <div>
              <h2 className="font-semibold text-[#111827]">Invoice Preview</h2>
              <p className="text-sm text-[#6B7280] mt-1">{invoice.invoiceNumber}</p>
            </div>
            
            {/* Document Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-4 h-[36px] bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 h-[36px] border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#111827] rounded-lg transition-colors text-sm font-medium"
              >
                <FileSpreadsheet className="w-4 h-4" />
                Export
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 h-[36px] border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#111827] rounded-lg transition-colors text-sm font-medium"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[#F9FAFB] rounded-lg transition-colors ml-2"
              >
                <X className="w-5 h-5 text-[#6B7280]" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-[#F9FAFB]">
            <div className="max-w-3xl mx-auto bg-white border border-[#E5E7EB] rounded-lg p-8 print:border-0 print:shadow-none">
              {/* Invoice Header Info */}
              <div className="pb-6 border-b border-[#E5E7EB]">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-semibold text-[#111827] mb-1">INVOICE</h1>
                    <p className="text-sm text-[#6B7280]">{invoice.invoiceNumber}</p>
                  </div>
                  <div>
                    <span
                      className={`inline-flex items-center px-3 py-1.5 rounded-md border text-sm font-medium ${getInvoiceStatusColor(
                        invoice.status
                      )}`}
                    >
                      {getInvoiceStatusLabel(invoice.status)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xs font-medium text-[#6B7280] uppercase tracking-wider mb-2">
                      Bill To
                    </h3>
                    <p className="font-medium text-[#111827]">{invoice.tenantName}</p>
                  </div>
                  <div className="text-right">
                    <div className="mb-3">
                      <p className="text-xs text-[#6B7280] mb-1">Invoice Date</p>
                      <p className="text-sm font-medium text-[#111827]">
                        {new Date(invoice.invoiceDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="mb-3">
                      <p className="text-xs text-[#6B7280] mb-1">Due Date</p>
                      <p className="text-sm font-medium text-[#111827]">
                        {new Date(invoice.dueDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    {invoice.paidDate && (
                      <div>
                        <p className="text-xs text-[#6B7280] mb-1">Paid On</p>
                        <p className="text-sm font-medium text-[#16A34A]">
                          {new Date(invoice.paidDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-xs text-[#6B7280] mb-1">Billing Period</p>
                  <p className="text-sm font-medium text-[#111827]">{invoice.billingPeriod}</p>
                </div>
              </div>

              {/* Usage Summary (DOOH-specific) */}
              <div className="py-6 border-b border-[#E5E7EB]">
                <h3 className="font-semibold text-[#111827] mb-1">Usage Summary</h3>
                <p className="text-sm text-[#6B7280] mb-4">
                  Usage is calculated based on actual content playtime
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                    <p className="text-xs text-[#6B7280] mb-1">Total Hours Run</p>
                    <p className="text-2xl font-semibold text-[#111827]">
                      {invoice.usageSummary.totalHoursRun.toLocaleString()}
                    </p>
                    <p className="text-xs text-[#6B7280] mt-1">hours</p>
                  </div>

                  <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                    <p className="text-xs text-[#6B7280] mb-1">Total Screens Used</p>
                    <p className="text-2xl font-semibold text-[#111827]">
                      {invoice.usageSummary.totalScreensUsed}
                    </p>
                    <p className="text-xs text-[#6B7280] mt-1">kiosks</p>
                  </div>

                  <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                    <p className="text-xs text-[#6B7280] mb-2 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      Regions Covered
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {invoice.usageSummary.regionsCovered.map((region, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-md bg-white border border-[#E5E7EB] text-xs text-[#111827]"
                        >
                          {region}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Line Items */}
              <div className="py-6 border-b border-[#E5E7EB]">
                <h3 className="font-semibold text-[#111827] mb-4">Invoice Details</h3>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#E5E7EB]">
                        <th className="pb-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                          Description
                        </th>
                        <th className="pb-3 text-center text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                          Unit
                        </th>
                        <th className="pb-3 text-right text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="pb-3 text-right text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                          Rate
                        </th>
                        <th className="pb-3 text-right text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoice.lineItems.map((item) => (
                        <tr key={item.id} className="border-b border-[#E5E7EB]">
                          <td className="py-3 text-sm text-[#111827]">{item.description}</td>
                          <td className="py-3 text-sm text-[#6B7280] text-center">{item.unit}</td>
                          <td className="py-3 text-sm text-[#111827] text-right">
                            {item.quantity.toLocaleString()}
                          </td>
                          <td className="py-3 text-sm text-[#6B7280] text-right">
                            {formatCurrency(item.rate, invoice.currency)}
                          </td>
                          <td className="py-3 text-sm font-medium text-[#111827] text-right">
                            {formatCurrency(item.total, invoice.currency)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Totals Section */}
              <div className="py-6">
                <div className="max-w-sm ml-auto space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6B7280]">Subtotal</span>
                    <span className="font-medium text-[#111827]">
                      {formatCurrency(invoice.subtotal, invoice.currency)}
                    </span>
                  </div>

                  {invoice.discount > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#6B7280]">
                        Discount {invoice.discountDescription && `(${invoice.discountDescription})`}
                      </span>
                      <span className="font-medium text-[#16A34A]">
                        -{formatCurrency(invoice.discount, invoice.currency)}
                      </span>
                    </div>
                  )}

                  {invoice.tax > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#6B7280]">
                        {invoice.taxDescription || 'Tax'} ({invoice.taxRate}%)
                      </span>
                      <span className="font-medium text-[#111827]">
                        {formatCurrency(invoice.tax, invoice.currency)}
                      </span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-[#E5E7EB]">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#111827]">Total Amount</span>
                      <span className="text-2xl font-semibold text-[#111827]">
                        {formatCurrency(invoice.grandTotal, invoice.currency)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Note */}
              <div className="pt-6 border-t border-[#E5E7EB]">
                <p className="text-xs text-[#6B7280]">
                  Thank you for your business. For questions about this invoice, please contact support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}