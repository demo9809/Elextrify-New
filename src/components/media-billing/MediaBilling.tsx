import { useState } from 'react';
import { Plus, Info } from 'lucide-react';
import MediaBillingOverview from './MediaBillingOverview';
import MediaBillingInvoices from './MediaBillingInvoices';
import CreateInvoiceWizard from './CreateInvoiceWizard';
import InvoiceDetailView from './InvoiceDetailView';
import { MediaInvoice } from '../../data/mockMediaBilling';
import { toast } from 'sonner@2.0.3';

type TabView = 'overview' | 'invoices' | 'create';

export default function MediaBilling() {
  const [activeTab, setActiveTab] = useState<TabView>('overview');
  const [isCreateWizardOpen, setIsCreateWizardOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<MediaInvoice | null>(null);
  const [isInvoiceDetailOpen, setIsInvoiceDetailOpen] = useState(false);

  const handleCreateInvoice = (invoiceData: any) => {
    console.log('Creating invoice:', invoiceData);
    toast.success('Invoice generated successfully!', {
      description: `Invoice for ${invoiceData.clientName} has been created.`,
    });
    setActiveTab('invoices');
  };

  const handleViewInvoice = (invoice: MediaInvoice) => {
    setSelectedInvoice(invoice);
    setIsInvoiceDetailOpen(true);
  };

  const handleCreateClick = () => {
    setIsCreateWizardOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Page Header */}
      <div className="border-b border-[#E5E7EB] bg-white px-8 py-6 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-[#111827] mb-2">Media Billing</h1>
            <p className="text-sm text-[#6B7280]">
              Customer delivery charges and campaign-based invoices
            </p>
          </div>
          <button
            onClick={handleCreateClick}
            className="h-11 px-5 bg-[#D9480F] text-white rounded-lg hover:bg-[#C13D0C] transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Invoice
          </button>
        </div>

        {/* Info Banner */}
        <div className="flex items-start gap-2 p-3 bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg">
          <Info className="w-4 h-4 text-[#3B82F6] flex-shrink-0 mt-0.5" />
          <div className="text-sm text-[#1E3A8A]">
            <span className="font-medium">Media Billing handles customer delivery charges and campaign-based invoices only.</span>
            {' '}For platform subscription billing, visit Billing & Subscription in Administration.
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-[#E5E7EB] bg-white px-8 flex-shrink-0">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-3 text-sm font-medium transition-colors relative ${
              activeTab === 'overview'
                ? 'text-[#D9480F]'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Overview
            {activeTab === 'overview' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D9480F]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-5 py-3 text-sm font-medium transition-colors relative ${
              activeTab === 'invoices'
                ? 'text-[#D9480F]'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Invoices
            {activeTab === 'invoices' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D9480F]" />
            )}
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto bg-[#F9FAFB] px-8 py-6">
        {activeTab === 'overview' && <MediaBillingOverview />}
        {activeTab === 'invoices' && <MediaBillingInvoices onViewInvoice={handleViewInvoice} />}
      </div>

      {/* Create Invoice Wizard */}
      <CreateInvoiceWizard
        isOpen={isCreateWizardOpen}
        onClose={() => setIsCreateWizardOpen(false)}
        onCreate={handleCreateInvoice}
      />

      {/* Invoice Detail View */}
      <InvoiceDetailView
        invoice={selectedInvoice}
        isOpen={isInvoiceDetailOpen}
        onClose={() => {
          setIsInvoiceDetailOpen(false);
          setSelectedInvoice(null);
        }}
      />
    </div>
  );
}
