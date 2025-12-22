import { X, Download, FileSpreadsheet, Printer, Package } from 'lucide-react';
import { formatCurrency, getInvoiceStatusLabel, getInvoiceStatusColor, getSubscriptionInvoice, type SubscriptionInvoice } from '../../data/mockBillingData';

interface SubscriptionInvoicePreviewProps {
  invoiceId: string;
  onClose: () => void;
}

export default function SubscriptionInvoicePreview({ invoiceId, onClose }: SubscriptionInvoicePreviewProps) {
  const invoice: SubscriptionInvoice = getSubscriptionInvoice(invoiceId);

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
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-[#111827]">Subscription Invoice</h2>
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#EFF6FF] border border-[#DBEAFE] text-xs font-medium text-[#1D4ED8]">
                  Platform Billing
                </span>
              </div>
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
                    <h1 className="text-2xl font-semibold text-[#111827] mb-1">SUBSCRIPTION INVOICE</h1>
                    <p className="text-sm text-[#6B7280]">{invoice.invoiceNumber}</p>
                    <p className="text-sm text-[#D9480F] font-medium mt-1">What you pay to the platform</p>
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

              {/* Plan Summary */}
              <div className="py-6 border-b border-[#E5E7EB]">
                <div className="flex items-start gap-4 p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-[#FEF2F2] flex items-center justify-center flex-shrink-0">
                    <Package className="w-5 h-5 text-[#D9480F]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#111827] mb-1">{invoice.planName}</h3>
                    <p className="text-sm text-[#6B7280]">
                      Billed {invoice.billingCycle === 'monthly' ? 'Monthly' : 'Annually'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#6B7280]">Base Price</p>
                    <p className="text-xl font-semibold text-[#111827]">
                      {formatCurrency(invoice.baseSubscription.amount, invoice.currency)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Line Items */}
              <div className="py-6 border-b border-[#E5E7EB]">
                <h3 className="font-semibold text-[#111827] mb-4">Breakdown</h3>

                <div className="space-y-3">
                  {/* Base Subscription */}
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-[#111827]">{invoice.baseSubscription.description}</span>
                    <span className="text-sm font-medium text-[#111827]">
                      {formatCurrency(invoice.baseSubscription.amount, invoice.currency)}
                    </span>
                  </div>

                  {/* Add-ons */}
                  {invoice.addOns && invoice.addOns.length > 0 && (
                    <>
                      <div className="pt-2 pb-1">
                        <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wider">Add-ons</p>
                      </div>
                      {invoice.addOns.map((addon) => (
                        <div key={addon.id} className="flex items-center justify-between py-2 pl-4">
                          <span className="text-sm text-[#6B7280]">{addon.description}</span>
                          <span className="text-sm font-medium text-[#111827]">
                            {formatCurrency(addon.amount, invoice.currency)}
                          </span>
                        </div>
                      ))}
                    </>
                  )}
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
                      <span className="font-semibold text-[#111827]">Total Payable</span>
                      <span className="text-2xl font-semibold text-[#111827]">
                        {formatCurrency(invoice.grandTotal, invoice.currency)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Note */}
              <div className="pt-6 border-t border-[#E5E7EB]">
                <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                  <p className="text-xs text-[#6B7280] mb-1 font-medium">Note:</p>
                  <p className="text-xs text-[#6B7280]">
                    This is your platform subscription invoice. This covers your access to the Elextrify platform, including features, storage, and user seats. For customer delivery billing, please see Media Billing → Customer Invoices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
