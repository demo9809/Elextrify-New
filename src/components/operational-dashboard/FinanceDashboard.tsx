import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileText,
  CheckCircle,
  AlertCircle,
  Calendar,
  Download,
  Plus,
  Eye,
  ChevronRight,
  Building2,
  CreditCard,
  BarChart3,
  Users,
  Target,
  Info,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

type TimePeriod = 'current-month' | 'last-month' | 'current-quarter' | 'current-year';
type TrendComparison = 'mom' | 'yoy';
type InvoiceStatus = 'paid' | 'pending' | 'overdue';
type AgingBucket = '0-15' | '16-30' | '31-60' | '60+';

interface FinancialSnapshot {
  totalRevenue: number;
  revenueDelta: number; // percentage
  outstandingReceivables: number;
  overdueAmount: number;
  collectedPayments: number;
  paymentTrend: number; // percentage
  invoicesGenerated: number;
  period: string;
}

interface RevenueDataPoint {
  month: string;
  revenue: number;
  invoiceCount: number;
  avgInvoiceValue: number;
}

interface InvoiceHealthBreakdown {
  paid: number;
  pending: number;
  overdue: number;
}

interface AgingData {
  bucket: AgingBucket;
  label: string;
  amount: number;
  count: number;
}

interface TopContributor {
  id: string;
  name: string;
  revenue: number;
  invoiceCount: number;
  contributionPercentage: number;
}

interface PlatformSubscription {
  planName: string;
  billingCycle: string;
  nextRenewalDate: string;
  paymentMethodStatus: 'active' | 'expiring-soon' | 'failed';
  monthlyAmount: number;
}

interface LegalEntityContext {
  legalEntityId: string;
  legalEntityName: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockLegalEntityContext: LegalEntityContext = {
  legalEntityId: 'le-001',
  legalEntityName: 'TechCorp South',
};

const mockFinancialSnapshot: FinancialSnapshot = {
  totalRevenue: 1847500,
  revenueDelta: 12.5,
  outstandingReceivables: 425000,
  overdueAmount: 87500,
  collectedPayments: 1422500,
  paymentTrend: 8.2,
  invoicesGenerated: 47,
  period: 'December 2024',
};

const mockRevenueData: RevenueDataPoint[] = [
  { month: 'Jul', revenue: 1250000, invoiceCount: 38, avgInvoiceValue: 32895 },
  { month: 'Aug', revenue: 1420000, invoiceCount: 42, avgInvoiceValue: 33810 },
  { month: 'Sep', revenue: 1680000, invoiceCount: 45, avgInvoiceValue: 37333 },
  { month: 'Oct', revenue: 1520000, invoiceCount: 41, avgInvoiceValue: 37073 },
  { month: 'Nov', revenue: 1642000, invoiceCount: 44, avgInvoiceValue: 37318 },
  { month: 'Dec', revenue: 1847500, invoiceCount: 47, avgInvoiceValue: 39309 },
];

const mockInvoiceHealth: InvoiceHealthBreakdown = {
  paid: 142,
  pending: 28,
  overdue: 12,
};

const mockAgingData: AgingData[] = [
  { bucket: '0-15', label: '0-15 days', amount: 215000, count: 18 },
  { bucket: '16-30', label: '16-30 days', amount: 122500, count: 7 },
  { bucket: '31-60', label: '31-60 days', amount: 52500, count: 4 },
  { bucket: '60+', label: '60+ days', amount: 35000, count: 3 },
];

const mockTopClients: TopContributor[] = [
  { id: 'client-1', name: 'Acme Corporation', revenue: 485000, invoiceCount: 12, contributionPercentage: 26.2 },
  { id: 'client-2', name: 'Brew Coffee Co.', revenue: 312000, invoiceCount: 8, contributionPercentage: 16.9 },
  { id: 'client-3', name: 'FitLife Gym Chain', revenue: 278500, invoiceCount: 9, contributionPercentage: 15.1 },
  { id: 'client-4', name: 'TechStart Inc.', revenue: 195000, invoiceCount: 5, contributionPercentage: 10.6 },
  { id: 'client-5', name: 'Metro Transit Authority', revenue: 167000, invoiceCount: 6, contributionPercentage: 9.0 },
];

const mockTopCampaigns: TopContributor[] = [
  { id: 'campaign-1', name: 'Diwali 2025 Mega Sale', revenue: 425000, invoiceCount: 15, contributionPercentage: 23.0 },
  { id: 'campaign-2', name: 'Holiday Shopping Campaign', revenue: 358000, invoiceCount: 12, contributionPercentage: 19.4 },
  { id: 'campaign-3', name: 'New Year Brand Push', revenue: 287500, invoiceCount: 10, contributionPercentage: 15.6 },
  { id: 'campaign-4', name: 'Spring Collection Launch', revenue: 215000, invoiceCount: 8, contributionPercentage: 11.6 },
  { id: 'campaign-5', name: 'Q4 Brand Awareness', revenue: 168000, invoiceCount: 7, contributionPercentage: 9.1 },
];

const mockPlatformSubscription: PlatformSubscription = {
  planName: 'Enterprise Plan',
  billingCycle: 'Annual',
  nextRenewalDate: '2025-03-15',
  paymentMethodStatus: 'active',
  monthlyAmount: 49999,
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function FinanceDashboard() {
  const navigate = useNavigate();
  const [snapshot, setSnapshot] = useState<FinancialSnapshot>(mockFinancialSnapshot);
  const [revenueData, setRevenueData] = useState<RevenueDataPoint[]>(mockRevenueData);
  const [invoiceHealth, setInvoiceHealth] = useState<InvoiceHealthBreakdown>(mockInvoiceHealth);
  const [agingData, setAgingData] = useState<AgingData[]>(mockAgingData);
  const [topClients, setTopClients] = useState<TopContributor[]>(mockTopClients);
  const [topCampaigns, setTopCampaigns] = useState<TopContributor[]>(mockTopCampaigns);
  const [platformSubscription, setPlatformSubscription] = useState<PlatformSubscription>(mockPlatformSubscription);
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('current-month');
  const [trendComparison, setTrendComparison] = useState<TrendComparison>('mom');
  const [showAllClients, setShowAllClients] = useState(false);
  const [showAllCampaigns, setShowAllCampaigns] = useState(false);

  const handleKPIClick = (filter: InvoiceStatus) => {
    navigate(`/media-billing?status=${filter}`);
  };

  const handleAgingBucketClick = (bucket: AgingBucket) => {
    navigate(`/media-billing?aging=${bucket}`);
  };

  const handleClientClick = (clientId: string) => {
    navigate(`/customers/${clientId}?tab=billing`);
  };

  const handleCampaignClick = (campaignId: string) => {
    navigate(`/campaigns/${campaignId}?tab=billing`);
  };

  const handleCreateInvoice = () => {
    navigate('/media-billing?action=create-invoice');
  };

  const handleReviewPendingBilling = () => {
    navigate('/media-billing?status=pending');
  };

  const handleExportReport = () => {
    console.log('Exporting finance report...');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const displayedClients = showAllClients ? topClients : topClients.slice(0, 5);
  const displayedCampaigns = showAllCampaigns ? topCampaigns : topCampaigns.slice(0, 5);

  const totalInvoices = invoiceHealth.paid + invoiceHealth.pending + invoiceHealth.overdue;

  // Empty state check
  const hasFinancialData = snapshot.totalRevenue > 0 || snapshot.invoicesGenerated > 0;

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F9FAFB]">
      {/* ===================================================================== */}
      {/* LEGAL ENTITY CONTEXT BAR */}
      {/* ===================================================================== */}
      <div className="bg-white border-b border-[#E5E7EB] px-8 py-2 flex items-center justify-between flex-shrink-0 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Building2 className="w-4 h-4 text-[#6B7280]" />
          <span className="text-sm font-medium text-[#111827]">
            {mockLegalEntityContext.legalEntityName}
          </span>
          <span className="text-xs text-[#6B7280]">
            All financial data scoped to selected entity
          </span>
        </div>
        <div className="text-xs text-[#6B7280]">
          Billing Period: <span className="font-medium text-[#111827]">{snapshot.period}</span>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* SCROLLABLE CONTENT */}
      {/* ===================================================================== */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-[1600px] mx-auto space-y-6">
          {!hasFinancialData ? (
            // ================================================================
            // EMPTY STATE
            // ================================================================
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-12 text-center">
              <BarChart3 className="w-16 h-16 text-[#6B7280] mx-auto mb-4" />
              <h3 className="text-[#111827] font-semibold mb-2">No Financial Data Yet</h3>
              <p className="text-sm text-[#6B7280] max-w-md mx-auto mb-6">
                Your finance dashboard will populate once you start creating campaigns and
                generating invoices for your clients.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => navigate('/campaigns')}
                  className="px-4 py-2 bg-[#D9480F] text-white rounded hover:bg-[#C13D0C] text-sm font-medium"
                >
                  Create Your First Campaign
                </button>
                <button
                  onClick={() => navigate('/media-billing')}
                  className="px-4 py-2 bg-white border border-[#E5E7EB] text-[#111827] rounded hover:bg-[#F9FAFB] text-sm font-medium"
                >
                  View Media Billing
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* ============================================================= */}
              {/* 2. FINANCIAL SNAPSHOT HEADER */}
              {/* ============================================================= */}
              <div className="grid grid-cols-4 gap-4">
                {/* Total Revenue */}
                <button
                  onClick={() => handleKPIClick('paid')}
                  className="bg-white border-2 border-[#E5E7EB] rounded-lg p-6 text-left hover:border-[#047857] transition-colors group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs font-medium text-[#6B7280]">TOTAL REVENUE</div>
                    <TrendingUp className="w-4 h-4 text-[#047857]" />
                  </div>
                  <div className="text-3xl font-semibold text-[#111827] mb-2">
                    {formatCurrency(snapshot.totalRevenue)}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span
                      className={`font-medium ${
                        snapshot.revenueDelta >= 0 ? 'text-[#047857]' : 'text-[#DC2626]'
                      }`}
                    >
                      {formatPercentage(snapshot.revenueDelta)}
                    </span>
                    <span className="text-[#6B7280]">vs previous period</span>
                  </div>
                </button>

                {/* Outstanding Receivables */}
                <button
                  onClick={() => handleKPIClick('pending')}
                  className="bg-white border-2 border-[#E5E7EB] rounded-lg p-6 text-left hover:border-[#F59E0B] transition-colors group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs font-medium text-[#6B7280]">OUTSTANDING RECEIVABLES</div>
                    <AlertCircle className="w-4 h-4 text-[#F59E0B]" />
                  </div>
                  <div className="text-3xl font-semibold text-[#111827] mb-2">
                    {formatCurrency(snapshot.outstandingReceivables)}
                  </div>
                  {snapshot.overdueAmount > 0 && (
                    <div className="text-sm">
                      <span className="text-[#DC2626] font-medium">
                        {formatCurrency(snapshot.overdueAmount)}
                      </span>
                      <span className="text-[#6B7280]"> overdue</span>
                    </div>
                  )}
                </button>

                {/* Collected Payments */}
                <button
                  onClick={() => handleKPIClick('paid')}
                  className="bg-white border-2 border-[#E5E7EB] rounded-lg p-6 text-left hover:border-[#047857] transition-colors group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs font-medium text-[#6B7280]">COLLECTED PAYMENTS</div>
                    <CheckCircle className="w-4 h-4 text-[#047857]" />
                  </div>
                  <div className="text-3xl font-semibold text-[#111827] mb-2">
                    {formatCurrency(snapshot.collectedPayments)}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span
                      className={`font-medium ${
                        snapshot.paymentTrend >= 0 ? 'text-[#047857]' : 'text-[#DC2626]'
                      }`}
                    >
                      {formatPercentage(snapshot.paymentTrend)}
                    </span>
                    <span className="text-[#6B7280]">payment trend</span>
                  </div>
                </button>

                {/* Invoices Generated */}
                <button
                  onClick={() => navigate('/media-billing')}
                  className="bg-white border-2 border-[#E5E7EB] rounded-lg p-6 text-left hover:border-[#D9480F] transition-colors group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs font-medium text-[#6B7280]">INVOICES GENERATED</div>
                    <FileText className="w-4 h-4 text-[#6B7280]" />
                  </div>
                  <div className="text-3xl font-semibold text-[#111827] mb-2">
                    {snapshot.invoicesGenerated}
                  </div>
                  <div className="text-sm text-[#6B7280]">This period</div>
                </button>
              </div>

              {/* ============================================================= */}
              {/* 3. REVENUE TREND ANALYSIS */}
              {/* ============================================================= */}
              <div className="bg-white border border-[#E5E7EB] rounded-lg">
                <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
                  <h2 className="text-[#111827] font-semibold">Revenue Trend</h2>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-[#F9FAFB] rounded p-1">
                      <button
                        onClick={() => setTrendComparison('mom')}
                        className={`px-3 py-1 rounded text-xs font-medium ${
                          trendComparison === 'mom'
                            ? 'bg-white text-[#111827] shadow-sm'
                            : 'text-[#6B7280]'
                        }`}
                      >
                        MoM
                      </button>
                      <button
                        onClick={() => setTrendComparison('yoy')}
                        className={`px-3 py-1 rounded text-xs font-medium ${
                          trendComparison === 'yoy'
                            ? 'bg-white text-[#111827] shadow-sm'
                            : 'text-[#6B7280]'
                        }`}
                      >
                        YoY
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis
                        dataKey="month"
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                        axisLine={{ stroke: '#E5E7EB' }}
                      />
                      <YAxis
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                        axisLine={{ stroke: '#E5E7EB' }}
                        tickFormatter={(value) => `₹${(value / 1000000).toFixed(1)}M`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px',
                          fontSize: '12px',
                        }}
                        formatter={(value: any, name: string, props: any) => {
                          if (name === 'revenue') {
                            return [
                              <div key="tooltip" className="space-y-1">
                                <div className="font-medium text-[#111827]">
                                  {formatCurrency(value)}
                                </div>
                                <div className="text-[#6B7280]">
                                  {props.payload.invoiceCount} invoices
                                </div>
                                <div className="text-[#6B7280]">
                                  Avg: {formatCurrency(props.payload.avgInvoiceValue)}
                                </div>
                              </div>,
                              '',
                            ];
                          }
                          return [value, name];
                        }}
                        labelStyle={{ color: '#111827', fontWeight: 600 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#D9480F"
                        strokeWidth={2}
                        dot={{ fill: '#D9480F', r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* ============================================================= */}
              {/* 4. INVOICE HEALTH & AGING */}
              {/* ============================================================= */}
              <div className="grid grid-cols-2 gap-6">
                {/* Invoice Status Breakdown */}
                <div className="bg-white border border-[#E5E7EB] rounded-lg">
                  <div className="px-6 py-4 border-b border-[#E5E7EB]">
                    <h2 className="text-[#111827] font-semibold">Invoice Status</h2>
                  </div>
                  <div className="p-6 space-y-3">
                    <button
                      onClick={() => handleKPIClick('paid')}
                      className="w-full flex items-center justify-between p-4 border border-[#E5E7EB] rounded-lg hover:border-[#047857] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-[#047857]" />
                        <span className="text-sm font-medium text-[#111827]">Paid</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-semibold text-[#047857]">
                          {invoiceHealth.paid}
                        </div>
                        <div className="text-xs text-[#6B7280]">
                          {((invoiceHealth.paid / totalInvoices) * 100).toFixed(1)}% of total
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleKPIClick('pending')}
                      className="w-full flex items-center justify-between p-4 border border-[#E5E7EB] rounded-lg hover:border-[#F59E0B] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                        <span className="text-sm font-medium text-[#111827]">Pending</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-semibold text-[#F59E0B]">
                          {invoiceHealth.pending}
                        </div>
                        <div className="text-xs text-[#6B7280]">
                          {((invoiceHealth.pending / totalInvoices) * 100).toFixed(1)}% of total
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleKPIClick('overdue')}
                      className="w-full flex items-center justify-between p-4 border-2 border-[#DC2626] bg-[#FEF2F2] rounded-lg hover:bg-[#FEE2E2] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-[#DC2626]" />
                        <span className="text-sm font-medium text-[#111827]">Overdue</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-semibold text-[#DC2626]">
                          {invoiceHealth.overdue}
                        </div>
                        <div className="text-xs text-[#6B7280]">
                          Requires attention
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Aging Buckets */}
                <div className="bg-white border border-[#E5E7EB] rounded-lg">
                  <div className="px-6 py-4 border-b border-[#E5E7EB]">
                    <h2 className="text-[#111827] font-semibold">Receivables Aging</h2>
                  </div>
                  <div className="p-6 space-y-3">
                    {agingData.map((bucket, index) => (
                      <button
                        key={bucket.bucket}
                        onClick={() => handleAgingBucketClick(bucket.bucket)}
                        className={`w-full flex items-center justify-between p-4 border rounded-lg transition-colors ${
                          index >= 2
                            ? 'border-[#DC2626] bg-[#FEF2F2] hover:bg-[#FEE2E2]'
                            : 'border-[#E5E7EB] hover:border-[#D9480F]'
                        }`}
                      >
                        <div>
                          <div className="text-sm font-medium text-[#111827] mb-1">
                            {bucket.label}
                          </div>
                          <div className="text-xs text-[#6B7280]">{bucket.count} invoices</div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`text-lg font-semibold ${
                              index >= 2 ? 'text-[#DC2626]' : 'text-[#111827]'
                            }`}
                          >
                            {formatCurrency(bucket.amount)}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* ============================================================= */}
              {/* 5. TOP REVENUE CONTRIBUTORS */}
              {/* ============================================================= */}
              <div className="grid grid-cols-2 gap-6">
                {/* Top Clients */}
                <div className="bg-white border border-[#E5E7EB] rounded-lg">
                  <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#6B7280]" />
                      <h2 className="text-[#111827] font-semibold">Top Clients by Revenue</h2>
                    </div>
                    {topClients.length > 5 && (
                      <button
                        onClick={() => setShowAllClients(!showAllClients)}
                        className="text-xs text-[#D9480F] hover:underline"
                      >
                        {showAllClients ? 'Show Less' : 'Show All'}
                      </button>
                    )}
                  </div>
                  <div className="divide-y divide-[#E5E7EB]">
                    {displayedClients.map((client, index) => (
                      <button
                        key={client.id}
                        onClick={() => handleClientClick(client.id)}
                        className="w-full px-6 py-3 flex items-center justify-between hover:bg-[#F9FAFB] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#F9FAFB] flex items-center justify-center text-xs font-medium text-[#6B7280]">
                            {index + 1}
                          </div>
                          <div className="text-left">
                            <div className="text-sm font-medium text-[#111827]">{client.name}</div>
                            <div className="text-xs text-[#6B7280]">
                              {client.invoiceCount} invoices · {client.contributionPercentage}% of revenue
                            </div>
                          </div>
                        </div>
                        <div className="text-right flex items-center gap-2">
                          <div className="text-sm font-semibold text-[#111827]">
                            {formatCurrency(client.revenue)}
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#6B7280]" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Top Campaigns */}
                <div className="bg-white border border-[#E5E7EB] rounded-lg">
                  <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-[#6B7280]" />
                      <h2 className="text-[#111827] font-semibold">Top Campaigns by Billing</h2>
                    </div>
                    {topCampaigns.length > 5 && (
                      <button
                        onClick={() => setShowAllCampaigns(!showAllCampaigns)}
                        className="text-xs text-[#D9480F] hover:underline"
                      >
                        {showAllCampaigns ? 'Show Less' : 'Show All'}
                      </button>
                    )}
                  </div>
                  <div className="divide-y divide-[#E5E7EB]">
                    {displayedCampaigns.map((campaign, index) => (
                      <button
                        key={campaign.id}
                        onClick={() => handleCampaignClick(campaign.id)}
                        className="w-full px-6 py-3 flex items-center justify-between hover:bg-[#F9FAFB] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#F9FAFB] flex items-center justify-center text-xs font-medium text-[#6B7280]">
                            {index + 1}
                          </div>
                          <div className="text-left">
                            <div className="text-sm font-medium text-[#111827]">{campaign.name}</div>
                            <div className="text-xs text-[#6B7280]">
                              {campaign.invoiceCount} invoices · {campaign.contributionPercentage}% of revenue
                            </div>
                          </div>
                        </div>
                        <div className="text-right flex items-center gap-2">
                          <div className="text-sm font-semibold text-[#111827]">
                            {formatCurrency(campaign.revenue)}
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#6B7280]" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* ============================================================= */}
              {/* 6. BILLING ACTIONS PANEL */}
              {/* ============================================================= */}
              <div className="bg-white border border-[#E5E7EB] rounded-lg">
                <div className="px-6 py-4 border-b border-[#E5E7EB]">
                  <h2 className="text-[#111827] font-semibold">Quick Actions</h2>
                </div>
                <div className="p-6 grid grid-cols-3 gap-4">
                  <button
                    onClick={handleCreateInvoice}
                    className="p-4 border-2 border-[#D9480F] bg-[#FEF3ED] rounded-lg hover:bg-[#FDE8DD] transition-colors text-left"
                  >
                    <Plus className="w-5 h-5 text-[#D9480F] mb-2" />
                    <div className="font-medium text-[#111827] mb-1">Create Manual Invoice</div>
                    <div className="text-xs text-[#6B7280]">
                      Generate a custom invoice for a client
                    </div>
                  </button>

                  <button
                    onClick={handleReviewPendingBilling}
                    className="p-4 border border-[#E5E7EB] rounded-lg hover:border-[#D9480F] transition-colors text-left"
                  >
                    <Eye className="w-5 h-5 text-[#6B7280] mb-2" />
                    <div className="font-medium text-[#111827] mb-1">Review Pending Billing</div>
                    <div className="text-xs text-[#6B7280]">
                      View and manage pending invoices
                    </div>
                  </button>

                  <button
                    onClick={handleExportReport}
                    className="p-4 border border-[#E5E7EB] rounded-lg hover:border-[#D9480F] transition-colors text-left"
                  >
                    <Download className="w-5 h-5 text-[#6B7280] mb-2" />
                    <div className="font-medium text-[#111827] mb-1">Export Finance Report</div>
                    <div className="text-xs text-[#6B7280]">
                      Download financial data as CSV/PDF
                    </div>
                  </button>
                </div>
              </div>

              {/* ============================================================= */}
              {/* 7. PLATFORM SUBSCRIPTION SUMMARY (CLEARLY SEPARATED) */}
              {/* ============================================================= */}
              <div className="bg-gradient-to-br from-[#F9FAFB] to-[#F3F4F6] border-2 border-[#E5E7EB] rounded-lg">
                <div className="px-6 py-4 border-b border-[#E5E7EB] bg-white/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#6B7280]" />
                    <h2 className="text-[#111827] font-semibold">Platform Subscription</h2>
                  </div>
                  <span className="text-xs text-[#6B7280] flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    Not included in customer billing
                  </span>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-4 gap-6">
                    <div>
                      <div className="text-xs text-[#6B7280] mb-1">Current Plan</div>
                      <div className="text-sm font-semibold text-[#111827]">
                        {platformSubscription.planName}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-[#6B7280] mb-1">Billing Cycle</div>
                      <div className="text-sm font-semibold text-[#111827]">
                        {platformSubscription.billingCycle}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-[#6B7280] mb-1">Next Renewal</div>
                      <div className="text-sm font-semibold text-[#111827]">
                        {new Date(platformSubscription.nextRenewalDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-[#6B7280] mb-1">Payment Status</div>
                      <div className="flex items-center gap-2">
                        {platformSubscription.paymentMethodStatus === 'active' && (
                          <CheckCircle className="w-4 h-4 text-[#047857]" />
                        )}
                        <span className="text-sm font-semibold text-[#047857]">Active</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
                    <button
                      onClick={() => navigate('/billing')}
                      className="text-sm text-[#D9480F] hover:underline flex items-center gap-1"
                    >
                      Manage Subscription
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}