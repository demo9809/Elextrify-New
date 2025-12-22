import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  CreditCard,
  Settings,
  Globe,
  ChevronRight,
  RefreshCw,
  AlertCircle,
  UserX,
  UserCheck,
  Calendar,
  Tag,
  Shield,
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
  Area,
  AreaChart,
} from 'recharts';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

type TimeRange = 'monthly' | 'quarterly';
type GrowthView = 'net' | 'gross';
type AlertSeverity = 'critical' | 'warning' | 'info';

interface ExecutiveSnapshot {
  mrr: number;
  mrrTrend: number; // percentage
  arr: number;
  activeTenants: number;
  churnRate: number;
  outstandingPayments: number;
  period: string;
}

interface RevenueDataPoint {
  month: string;
  mrr: number;
  newSubscriptions: number;
  churnedSubscriptions: number;
  netGrowth: number;
  tenantCount: number;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  activeSubscribers: number;
  monthlyRevenue: number;
  growthRate: number; // percentage
  isGrowing: boolean;
}

interface BillingRisk {
  failedPaymentsToday: number;
  retryInProgress: number;
  gracePeriodTenants: number;
  suspendedAccounts: number;
}

interface TrialFunnel {
  activeTrials: number;
  expiringIn7Days: number;
  convertedTrials: number;
  droppedTrials: number;
  conversionRate: number;
}

interface TenantRevenue {
  id: string;
  tenantName: string;
  planName: string;
  monthlyRevenue: number;
  status: 'active' | 'grace-period' | 'suspended';
}

interface GeographyMetric {
  country: string;
  revenue: number;
  taxCollected: number;
  tenantCount: number;
  complianceStatus: 'compliant' | 'warning' | 'critical';
}

interface FinanceAlert {
  id: string;
  severity: AlertSeverity;
  type: 'churn-spike' | 'payment-gateway' | 'revenue-drop' | 'discount-abuse';
  message: string;
  timestamp: string;
  dismissed: boolean;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockExecutiveSnapshot: ExecutiveSnapshot = {
  mrr: 2847500,
  mrrTrend: 8.4,
  arr: 34170000,
  activeTenants: 287,
  churnRate: 3.2,
  outstandingPayments: 145000,
  period: 'December 2024',
};

const mockRevenueData: RevenueDataPoint[] = [
  { month: 'Jul', mrr: 2150000, newSubscriptions: 12, churnedSubscriptions: 8, netGrowth: 4, tenantCount: 245 },
  { month: 'Aug', mrr: 2280000, newSubscriptions: 15, churnedSubscriptions: 6, netGrowth: 9, tenantCount: 254 },
  { month: 'Sep', mrr: 2425000, newSubscriptions: 18, churnedSubscriptions: 7, netGrowth: 11, tenantCount: 265 },
  { month: 'Oct', mrr: 2590000, newSubscriptions: 14, churnedSubscriptions: 9, netGrowth: 5, tenantCount: 270 },
  { month: 'Nov', mrr: 2715000, newSubscriptions: 16, churnedSubscriptions: 5, netGrowth: 11, tenantCount: 281 },
  { month: 'Dec', mrr: 2847500, newSubscriptions: 19, churnedSubscriptions: 7, netGrowth: 12, tenantCount: 287 },
];

const mockSubscriptionPlans: SubscriptionPlan[] = [
  { id: 'plan-1', name: 'Starter Plan', activeSubscribers: 142, monthlyRevenue: 710000, growthRate: 12.5, isGrowing: true },
  { id: 'plan-2', name: 'Professional Plan', activeSubscribers: 98, monthlyRevenue: 1470000, growthRate: 8.2, isGrowing: true },
  { id: 'plan-3', name: 'Enterprise Plan', activeSubscribers: 47, monthlyRevenue: 2350000, growthRate: -2.1, isGrowing: false },
];

const mockBillingRisk: BillingRisk = {
  failedPaymentsToday: 8,
  retryInProgress: 12,
  gracePeriodTenants: 5,
  suspendedAccounts: 3,
};

const mockTrialFunnel: TrialFunnel = {
  activeTrials: 42,
  expiringIn7Days: 14,
  convertedTrials: 28,
  droppedTrials: 9,
  conversionRate: 75.7,
};

const mockTopTenants: TenantRevenue[] = [
  { id: 'tenant-1', tenantName: 'GlobalMedia Corp', planName: 'Enterprise Plan', monthlyRevenue: 49999, status: 'active' },
  { id: 'tenant-2', tenantName: 'UrbanScreens Ltd', planName: 'Enterprise Plan', monthlyRevenue: 49999, status: 'active' },
  { id: 'tenant-3', tenantName: 'RetailDisplay Network', planName: 'Enterprise Plan', monthlyRevenue: 49999, status: 'active' },
  { id: 'tenant-4', tenantName: 'TransitMedia Solutions', planName: 'Professional Plan', monthlyRevenue: 14999, status: 'active' },
  { id: 'tenant-5', tenantName: 'AirportAds Inc', planName: 'Professional Plan', monthlyRevenue: 14999, status: 'grace-period' },
];

const mockGeographyMetrics: GeographyMetric[] = [
  { country: 'India', revenue: 1685000, taxCollected: 303300, tenantCount: 158, complianceStatus: 'compliant' },
  { country: 'United States', revenue: 745000, taxCollected: 74500, tenantCount: 67, complianceStatus: 'compliant' },
  { country: 'United Kingdom', revenue: 285000, taxCollected: 57000, tenantCount: 38, complianceStatus: 'warning' },
  { country: 'UAE', revenue: 132500, taxCollected: 6625, tenantCount: 24, complianceStatus: 'compliant' },
];

const mockFinanceAlerts: FinanceAlert[] = [
  {
    id: 'alert-1',
    severity: 'warning',
    type: 'churn-spike',
    message: 'Churn rate increased to 3.2% (above 3% threshold)',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    dismissed: false,
  },
  {
    id: 'alert-2',
    severity: 'critical',
    type: 'payment-gateway',
    message: '8 payment failures detected today. Stripe retry in progress.',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    dismissed: false,
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function SaaSFinanceDashboard() {
  const navigate = useNavigate();
  const [snapshot, setSnapshot] = useState<ExecutiveSnapshot>(mockExecutiveSnapshot);
  const [revenueData, setRevenueData] = useState<RevenueDataPoint[]>(mockRevenueData);
  const [plans, setPlans] = useState<SubscriptionPlan[]>(mockSubscriptionPlans);
  const [billingRisk, setBillingRisk] = useState<BillingRisk>(mockBillingRisk);
  const [trialFunnel, setTrialFunnel] = useState<TrialFunnel>(mockTrialFunnel);
  const [topTenants, setTopTenants] = useState<TenantRevenue[]>(mockTopTenants);
  const [geographyMetrics, setGeographyMetrics] = useState<GeographyMetric[]>(mockGeographyMetrics);
  const [alerts, setAlerts] = useState<FinanceAlert[]>(mockFinanceAlerts);
  const [timeRange, setTimeRange] = useState<TimeRange>('monthly');
  const [growthView, setGrowthView] = useState<GrowthView>('net');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSync, setLastSync] = useState(new Date());

  // Auto-refresh every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastSync(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastSync(new Date());
      setIsRefreshing(false);
    }, 500);
  };

  const handleKPIClick = (metric: string) => {
    navigate(`/host-admin/tenants?filter=${metric}`);
  };

  const handlePlanClick = (planId: string) => {
    navigate(`/host-admin/tenants?plan=${planId}`);
  };

  const handleTenantClick = (tenantId: string) => {
    navigate(`/host-admin/tenants/${tenantId}`);
  };

  const handlePricingControl = () => {
    navigate('/host-admin/pricing-plans');
  };

  const handleDiscountRules = () => {
    navigate('/host-admin/discount-rules');
  };

  const handleCoupons = () => {
    navigate('/host-admin/coupons');
  };

  const handleTaxRules = () => {
    navigate('/host-admin/tax-rules');
  };

  const handleDismissAlert = (alertId: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === alertId ? { ...a, dismissed: true } : a)));
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

  const getTimeSince = (isoString: string) => {
    const minutes = Math.floor((Date.now() - new Date(isoString).getTime()) / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const getAlertIcon = (severity: AlertSeverity) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="w-4 h-4 text-[#DC2626]" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />;
      case 'info':
        return <AlertCircle className="w-4 h-4 text-[#3B82F6]" />;
    }
  };

  const getAlertColor = (severity: AlertSeverity) => {
    switch (severity) {
      case 'critical':
        return 'border-l-[#DC2626] bg-[#FEF2F2]';
      case 'warning':
        return 'border-l-[#F59E0B] bg-[#FFFBEB]';
      case 'info':
        return 'border-l-[#3B82F6] bg-[#EFF6FF]';
    }
  };

  const getTenantStatusColor = (status: TenantRevenue['status']) => {
    switch (status) {
      case 'active':
        return 'text-[#047857] bg-[#ECFDF5]';
      case 'grace-period':
        return 'text-[#F59E0B] bg-[#FFFBEB]';
      case 'suspended':
        return 'text-[#DC2626] bg-[#FEF2F2]';
    }
  };

  const getComplianceColor = (status: GeographyMetric['complianceStatus']) => {
    switch (status) {
      case 'compliant':
        return 'text-[#047857]';
      case 'warning':
        return 'text-[#F59E0B]';
      case 'critical':
        return 'text-[#DC2626]';
    }
  };

  const activeAlerts = alerts.filter((a) => !a.dismissed);
  const totalRisk = billingRisk.failedPaymentsToday + billingRisk.gracePeriodTenants + billingRisk.suspendedAccounts;

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F9FAFB]">
      {/* ===================================================================== */}
      {/* HEADER BAR */}
      {/* ===================================================================== */}
      <div className="bg-white border-b border-[#E5E7EB] px-8 py-4 flex-shrink-0 sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[#111827] mb-1">SaaS Finance Dashboard</h1>
            <p className="text-sm text-[#6B7280]">
              Platform subscription revenue and business health
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs text-[#6B7280]">Last Updated</div>
              <div className="text-sm font-medium text-[#111827]">
                {getTimeSince(lastSync.toISOString())}
              </div>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-sm font-medium text-[#111827] hover:bg-white disabled:opacity-50 flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* SCROLLABLE CONTENT */}
      {/* ===================================================================== */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-[1600px] mx-auto space-y-6">
          {/* ================================================================= */}
          {/* 10. ALERTS & SYSTEM FINANCE SIGNALS */}
          {/* ================================================================= */}
          {activeAlerts.length > 0 && (
            <div className="space-y-2">
              {activeAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`border-l-4 rounded-lg px-4 py-3 flex items-start justify-between ${getAlertColor(
                    alert.severity
                  )}`}
                >
                  <div className="flex items-start gap-3">
                    {getAlertIcon(alert.severity)}
                    <div>
                      <div className="text-sm font-medium text-[#111827]">{alert.message}</div>
                      <div className="text-xs text-[#6B7280] mt-1">
                        {getTimeSince(alert.timestamp)}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDismissAlert(alert.id)}
                    className="text-xs text-[#6B7280] hover:text-[#111827]"
                  >
                    Dismiss
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ================================================================= */}
          {/* 2. EXECUTIVE FINANCE SNAPSHOT */}
          {/* ================================================================= */}
          <div className="grid grid-cols-5 gap-4">
            {/* MRR */}
            <button
              onClick={() => handleKPIClick('mrr')}
              className="bg-white border-2 border-[#E5E7EB] rounded-lg p-6 text-left hover:border-[#047857] transition-colors"
            >
              <div className="text-xs font-medium text-[#6B7280] mb-2">MRR</div>
              <div className="text-3xl font-semibold text-[#111827] mb-2">
                {formatCurrency(snapshot.mrr)}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span
                  className={`font-medium ${
                    snapshot.mrrTrend >= 0 ? 'text-[#047857]' : 'text-[#DC2626]'
                  }`}
                >
                  {formatPercentage(snapshot.mrrTrend)}
                </span>
                <span className="text-[#6B7280]">vs last month</span>
              </div>
            </button>

            {/* ARR Projection */}
            <button
              onClick={() => handleKPIClick('arr')}
              className="bg-white border-2 border-[#E5E7EB] rounded-lg p-6 text-left hover:border-[#3B82F6] transition-colors"
            >
              <div className="text-xs font-medium text-[#6B7280] mb-2">ARR PROJECTION</div>
              <div className="text-3xl font-semibold text-[#111827] mb-2">
                {formatCurrency(snapshot.arr)}
              </div>
              <div className="text-sm text-[#6B7280]">Annual run rate</div>
            </button>

            {/* Active Tenants */}
            <button
              onClick={() => handleKPIClick('active')}
              className="bg-white border-2 border-[#E5E7EB] rounded-lg p-6 text-left hover:border-[#D9480F] transition-colors"
            >
              <div className="text-xs font-medium text-[#6B7280] mb-2">ACTIVE TENANTS</div>
              <div className="text-3xl font-semibold text-[#111827] mb-2">
                {snapshot.activeTenants}
              </div>
              <div className="text-sm text-[#6B7280]">Paying customers</div>
            </button>

            {/* Churn Rate */}
            <button
              onClick={() => handleKPIClick('churned')}
              className={`bg-white border-2 rounded-lg p-6 text-left transition-colors ${
                snapshot.churnRate > 3
                  ? 'border-[#DC2626] hover:bg-[#FEF2F2]'
                  : 'border-[#E5E7EB] hover:border-[#F59E0B]'
              }`}
            >
              <div className="text-xs font-medium text-[#6B7280] mb-2">CHURN RATE</div>
              <div
                className={`text-3xl font-semibold mb-2 ${
                  snapshot.churnRate > 3 ? 'text-[#DC2626]' : 'text-[#111827]'
                }`}
              >
                {snapshot.churnRate}%
              </div>
              <div className="text-sm text-[#6B7280]">Monthly churn</div>
            </button>

            {/* Outstanding Payments */}
            <button
              onClick={() => handleKPIClick('outstanding')}
              className="bg-white border-2 border-[#F59E0B] rounded-lg p-6 text-left hover:bg-[#FFFBEB] transition-colors"
            >
              <div className="text-xs font-medium text-[#6B7280] mb-2">OUTSTANDING</div>
              <div className="text-3xl font-semibold text-[#F59E0B] mb-2">
                {formatCurrency(snapshot.outstandingPayments)}
              </div>
              <div className="text-sm text-[#6B7280]">Failed renewals</div>
            </button>
          </div>

          {/* ================================================================= */}
          {/* 3. REVENUE TREND & GROWTH INTELLIGENCE */}
          {/* ================================================================= */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg">
            <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
              <h2 className="text-[#111827] font-semibold">MRR Growth & Subscription Dynamics</h2>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-[#F9FAFB] rounded p-1">
                  <button
                    onClick={() => setTimeRange('monthly')}
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      timeRange === 'monthly'
                        ? 'bg-white text-[#111827] shadow-sm'
                        : 'text-[#6B7280]'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setTimeRange('quarterly')}
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      timeRange === 'quarterly'
                        ? 'bg-white text-[#111827] shadow-sm'
                        : 'text-[#6B7280]'
                    }`}
                  >
                    Quarterly
                  </button>
                </div>
                <div className="flex items-center gap-2 bg-[#F9FAFB] rounded p-1">
                  <button
                    onClick={() => setGrowthView('net')}
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      growthView === 'net' ? 'bg-white text-[#111827] shadow-sm' : 'text-[#6B7280]'
                    }`}
                  >
                    Net Growth
                  </button>
                  <button
                    onClick={() => setGrowthView('gross')}
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      growthView === 'gross'
                        ? 'bg-white text-[#111827] shadow-sm'
                        : 'text-[#6B7280]'
                    }`}
                  >
                    Gross Growth
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="mrrGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#047857" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#047857" stopOpacity={0} />
                    </linearGradient>
                  </defs>
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
                      if (name === 'mrr') {
                        return [
                          <div key="tooltip" className="space-y-1">
                            <div className="font-medium text-[#111827]">
                              {formatCurrency(value)}
                            </div>
                            <div className="text-[#047857]">
                              +{props.payload.newSubscriptions} new subscriptions
                            </div>
                            <div className="text-[#DC2626]">
                              -{props.payload.churnedSubscriptions} churned
                            </div>
                            <div className="text-[#6B7280]">
                              Net: {props.payload.netGrowth >= 0 ? '+' : ''}
                              {props.payload.netGrowth} tenants
                            </div>
                          </div>,
                          '',
                        ];
                      }
                      return [value, name];
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="mrr"
                    stroke="#047857"
                    strokeWidth={2}
                    fill="url(#mrrGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ================================================================= */}
          {/* 4. SUBSCRIPTION PLAN PERFORMANCE & 5. BILLING HEALTH */}
          {/* ================================================================= */}
          <div className="grid grid-cols-2 gap-6">
            {/* Subscription Plan Performance */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg">
              <div className="px-6 py-4 border-b border-[#E5E7EB]">
                <h2 className="text-[#111827] font-semibold">Subscription Plan Performance</h2>
              </div>
              <div className="divide-y divide-[#E5E7EB]">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => handlePlanClick(plan.id)}
                    className="w-full px-6 py-4 text-left hover:bg-[#F9FAFB] transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-[#111827]">{plan.name}</div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-medium ${
                            plan.isGrowing ? 'text-[#047857]' : 'text-[#DC2626]'
                          }`}
                        >
                          {formatPercentage(plan.growthRate)}
                        </span>
                        {plan.isGrowing ? (
                          <TrendingUp className="w-4 h-4 text-[#047857]" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-[#DC2626]" />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-[#6B7280]">{plan.activeSubscribers} subscribers</div>
                      <div className="font-semibold text-[#111827]">
                        {formatCurrency(plan.monthlyRevenue)}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="px-6 py-3 border-t border-[#E5E7EB] bg-[#F9FAFB]">
                <button
                  onClick={handlePricingControl}
                  className="text-sm text-[#D9480F] hover:underline flex items-center gap-1"
                >
                  Manage Plans & Pricing
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Billing Health & Risk Monitoring */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg">
              <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
                <h2 className="text-[#111827] font-semibold">Billing Health & Risk</h2>
                {totalRisk > 0 && (
                  <span className="px-2 py-0.5 bg-[#DC2626] text-white text-xs font-medium rounded">
                    {totalRisk} at risk
                  </span>
                )}
              </div>
              <div className="p-6 space-y-3">
                <button
                  onClick={() => handleKPIClick('failed-payments')}
                  className="w-full flex items-center justify-between p-4 border-2 border-[#DC2626] bg-[#FEF2F2] rounded-lg hover:bg-[#FEE2E2] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <XCircle className="w-5 h-5 text-[#DC2626]" />
                    <div className="text-left">
                      <div className="text-sm font-medium text-[#111827]">Failed Payments</div>
                      <div className="text-xs text-[#6B7280]">Today</div>
                    </div>
                  </div>
                  <div className="text-2xl font-semibold text-[#DC2626]">
                    {billingRisk.failedPaymentsToday}
                  </div>
                </button>

                <button
                  onClick={() => handleKPIClick('retry-in-progress')}
                  className="w-full flex items-center justify-between p-4 border border-[#E5E7EB] rounded-lg hover:border-[#F59E0B] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#F59E0B]" />
                    <div className="text-left">
                      <div className="text-sm font-medium text-[#111827]">Retry In Progress</div>
                      <div className="text-xs text-[#6B7280]">Auto-retry scheduled</div>
                    </div>
                  </div>
                  <div className="text-2xl font-semibold text-[#F59E0B]">
                    {billingRisk.retryInProgress}
                  </div>
                </button>

                <button
                  onClick={() => handleKPIClick('grace-period')}
                  className="w-full flex items-center justify-between p-4 border border-[#E5E7EB] rounded-lg hover:border-[#F59E0B] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
                    <div className="text-left">
                      <div className="text-sm font-medium text-[#111827]">Grace Period</div>
                      <div className="text-xs text-[#6B7280]">Payment overdue</div>
                    </div>
                  </div>
                  <div className="text-2xl font-semibold text-[#F59E0B]">
                    {billingRisk.gracePeriodTenants}
                  </div>
                </button>

                <button
                  onClick={() => handleKPIClick('suspended')}
                  className="w-full flex items-center justify-between p-4 border border-[#E5E7EB] rounded-lg hover:border-[#DC2626] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <UserX className="w-5 h-5 text-[#6B7280]" />
                    <div className="text-left">
                      <div className="text-sm font-medium text-[#111827]">Suspended</div>
                      <div className="text-xs text-[#6B7280]">Non-payment</div>
                    </div>
                  </div>
                  <div className="text-2xl font-semibold text-[#111827]">
                    {billingRisk.suspendedAccounts}
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* 6. TRIAL & CONVERSION FUNNEL */}
          {/* ================================================================= */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg">
            <div className="px-6 py-4 border-b border-[#E5E7EB]">
              <h2 className="text-[#111827] font-semibold">Trial & Conversion Funnel</h2>
            </div>
            <div className="p-6 grid grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-xs text-[#6B7280] mb-2">ACTIVE TRIALS</div>
                <div className="text-3xl font-semibold text-[#111827] mb-1">
                  {trialFunnel.activeTrials}
                </div>
                <div className="text-xs text-[#6B7280]">In trial period</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-[#6B7280] mb-2">EXPIRING SOON</div>
                <div className="text-3xl font-semibold text-[#F59E0B] mb-1">
                  {trialFunnel.expiringIn7Days}
                </div>
                <div className="text-xs text-[#6B7280]">Next 7 days</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-[#6B7280] mb-2">CONVERTED</div>
                <div className="text-3xl font-semibold text-[#047857] mb-1">
                  {trialFunnel.convertedTrials}
                </div>
                <div className="text-xs text-[#6B7280]">This month</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-[#6B7280] mb-2">DROPPED</div>
                <div className="text-3xl font-semibold text-[#DC2626] mb-1">
                  {trialFunnel.droppedTrials}
                </div>
                <div className="text-xs text-[#6B7280]">This month</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-[#6B7280] mb-2">CONVERSION RATE</div>
                <div className="text-3xl font-semibold text-[#111827] mb-1">
                  {trialFunnel.conversionRate}%
                </div>
                <div className="text-xs text-[#6B7280]">Trial to paid</div>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* 7. TENANT REVENUE DISTRIBUTION & 9. GEOGRAPHY */}
          {/* ================================================================= */}
          <div className="grid grid-cols-2 gap-6">
            {/* Top Revenue Tenants */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg">
              <div className="px-6 py-4 border-b border-[#E5E7EB]">
                <h2 className="text-[#111827] font-semibold">Top Revenue Tenants</h2>
              </div>
              <div className="divide-y divide-[#E5E7EB]">
                {topTenants.map((tenant, index) => (
                  <button
                    key={tenant.id}
                    onClick={() => handleTenantClick(tenant.id)}
                    className="w-full px-6 py-3 flex items-center justify-between hover:bg-[#F9FAFB] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#F9FAFB] flex items-center justify-center text-xs font-medium text-[#6B7280]">
                        {index + 1}
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-medium text-[#111827]">{tenant.tenantName}</div>
                        <div className="text-xs text-[#6B7280]">{tenant.planName}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${getTenantStatusColor(
                          tenant.status
                        )}`}
                      >
                        {tenant.status.replace('-', ' ').toUpperCase()}
                      </span>
                      <div className="text-sm font-semibold text-[#111827]">
                        {formatCurrency(tenant.monthlyRevenue)}
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#6B7280]" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Geography & Tax Overview */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg">
              <div className="px-6 py-4 border-b border-[#E5E7EB]">
                <h2 className="text-[#111827] font-semibold">Revenue by Geography</h2>
              </div>
              <div className="divide-y divide-[#E5E7EB]">
                {geographyMetrics.map((geo) => (
                  <div key={geo.country} className="px-6 py-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-[#111827]">{geo.country}</div>
                      <div className="flex items-center gap-2">
                        <Shield
                          className={`w-4 h-4 ${getComplianceColor(geo.complianceStatus)}`}
                        />
                        <span className="text-sm font-semibold text-[#111827]">
                          {formatCurrency(geo.revenue)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-[#6B7280]">
                      <span>{geo.tenantCount} tenants</span>
                      <span>Tax: {formatCurrency(geo.taxCollected)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* 8. PRICING & PLAN CONTROL ENTRY POINTS */}
          {/* ================================================================= */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg">
            <div className="px-6 py-4 border-b border-[#E5E7EB]">
              <h2 className="text-[#111827] font-semibold">Pricing & Billing Control</h2>
            </div>
            <div className="p-6 grid grid-cols-4 gap-4">
              <button
                onClick={handlePricingControl}
                className="p-4 border-2 border-[#D9480F] bg-[#FEF3ED] rounded-lg hover:bg-[#FDE8DD] transition-colors text-left"
              >
                <Target className="w-5 h-5 text-[#D9480F] mb-2" />
                <div className="font-medium text-[#111827] mb-1">Manage Plans</div>
                <div className="text-xs text-[#6B7280]">Create and edit subscription plans</div>
              </button>

              <button
                onClick={handleDiscountRules}
                className="p-4 border border-[#E5E7EB] rounded-lg hover:border-[#D9480F] transition-colors text-left"
              >
                <Tag className="w-5 h-5 text-[#6B7280] mb-2" />
                <div className="font-medium text-[#111827] mb-1">Discount Rules</div>
                <div className="text-xs text-[#6B7280]">Volume and promotional discounts</div>
              </button>

              <button
                onClick={handleCoupons}
                className="p-4 border border-[#E5E7EB] rounded-lg hover:border-[#D9480F] transition-colors text-left"
              >
                <CreditCard className="w-5 h-5 text-[#6B7280] mb-2" />
                <div className="font-medium text-[#111827] mb-1">Coupons</div>
                <div className="text-xs text-[#6B7280]">Manage promotional codes</div>
              </button>

              <button
                onClick={handleTaxRules}
                className="p-4 border border-[#E5E7EB] rounded-lg hover:border-[#D9480F] transition-colors text-left"
              >
                <Globe className="w-5 h-5 text-[#6B7280] mb-2" />
                <div className="font-medium text-[#111827] mb-1">Tax & Region</div>
                <div className="text-xs text-[#6B7280]">Regional tax configuration</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
