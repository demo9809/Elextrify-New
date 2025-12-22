import { useState } from 'react';
import { 
  TrendingUp, 
  Clock, 
  AlertCircle, 
  FileText,
  ArrowUpRight,
  Calendar
} from 'lucide-react';
import { mockBillingKPIs, mockTopClients } from '../../data/mockMediaBilling';

export default function MediaBillingOverview() {
  const [dateRange, setDateRange] = useState('current-month');

  const kpis = mockBillingKPIs;
  const topClients = mockTopClients;

  return (
    <div className="space-y-6">
      {/* Date Range Selector */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[#111827] mb-1">Financial Overview</h3>
          <p className="text-sm text-[#6B7280]">
            High-level view of customer billing performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#6B7280]" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="h-10 px-3 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:ring-2 focus:ring-[#D9480F]/20 focus:border-[#D9480F] outline-none bg-white"
          >
            <option value="current-month">Current Month</option>
            <option value="last-month">Last Month</option>
            <option value="current-quarter">Current Quarter</option>
            <option value="last-quarter">Last Quarter</option>
            <option value="current-year">Current Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-[#ECFDF5] rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#047857]" />
            </div>
            <span className="text-xs text-[#047857] bg-[#ECFDF5] px-2 py-1 rounded-full">
              +12.5%
            </span>
          </div>
          <div className="text-[#6B7280] text-sm mb-1">Total Revenue</div>
          <div className="text-[#111827] text-2xl font-semibold">
            ₹{kpis.totalRevenue.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-[#6B7280] mt-2">
            {kpis.paidInvoices} of {kpis.totalInvoices} invoices paid
          </div>
        </div>

        {/* Pending Amount */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-[#FEF3C7] rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#F59E0B]" />
            </div>
          </div>
          <div className="text-[#6B7280] text-sm mb-1">Pending Amount</div>
          <div className="text-[#111827] text-2xl font-semibold">
            ₹{kpis.pendingAmount.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-[#6B7280] mt-2">
            {kpis.pendingInvoices} pending invoices
          </div>
        </div>

        {/* Overdue Amount */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-[#FEE2E2] rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-[#DC2626]" />
            </div>
          </div>
          <div className="text-[#6B7280] text-sm mb-1">Overdue Amount</div>
          <div className="text-[#111827] text-2xl font-semibold">
            ₹{kpis.overdueAmount.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-[#6B7280] mt-2">
            {kpis.overdueInvoices} overdue invoices
          </div>
        </div>

        {/* Total Invoices */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-[#F3F4F6] rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#6B7280]" />
            </div>
          </div>
          <div className="text-[#6B7280] text-sm mb-1">Total Invoices</div>
          <div className="text-[#111827] text-2xl font-semibold">
            {kpis.totalInvoices}
          </div>
          <div className="text-xs text-[#6B7280] mt-2">
            This billing period
          </div>
        </div>
      </div>

      {/* Top Clients */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg">
        <div className="border-b border-[#E5E7EB] px-6 py-4">
          <h4 className="text-[#111827] font-medium">Top Clients by Revenue</h4>
          <p className="text-sm text-[#6B7280] mt-1">
            Clients ranked by total billing amount
          </p>
        </div>
        <div className="divide-y divide-[#E5E7EB]">
          {topClients.map((client, index) => (
            <div
              key={client.clientId}
              className="px-6 py-4 flex items-center justify-between hover:bg-[#F9FAFB] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-[#F3F4F6] rounded-full flex items-center justify-center text-sm font-medium text-[#6B7280]">
                  {index + 1}
                </div>
                <div>
                  <div className="text-sm font-medium text-[#111827]">
                    {client.clientName}
                  </div>
                  <div className="text-xs text-[#6B7280] mt-0.5">
                    {client.invoiceCount} invoice{client.invoiceCount !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-semibold text-[#111827]">
                    ₹{client.totalRevenue.toLocaleString('en-IN')}
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#6B7280]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-4 flex items-start gap-3">
        <div className="w-5 h-5 bg-[#3B82F6] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-white text-xs font-semibold">i</span>
        </div>
        <div>
          <div className="text-sm font-medium text-[#1E40AF] mb-1">
            Quick Navigation Tips
          </div>
          <div className="text-sm text-[#1E3A8A]">
            Click on any KPI card to filter the Invoices tab. Click on a client name to view their invoice history.
          </div>
        </div>
      </div>
    </div>
  );
}
