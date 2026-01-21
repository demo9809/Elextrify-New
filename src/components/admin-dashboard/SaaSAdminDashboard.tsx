import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  AlertTriangle,
  XCircle,
  Clock,
  CreditCard,
  ChevronRight,
  RefreshCw,
  AlertCircle,
  Server,
  Activity,
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
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface PlatformKPI {
  totalTenants: number;
  tenantsTrend: number;
  activeSubscriptions: number;
  subscriptionsTrend: number;
  mrr: number;
  mrrTrend: number;
  trialsInProgress: number;
  trialsTrend: number;
  failedPayments: number;
  billingIssues: number;
}

interface MRRDataPoint {
  month: string;
  mrr: number;
  newMRR: number;
  churnedMRR: number;
}

interface PlanDistribution {
  planName: string;
  subscribers: number;
  revenue: number;
  percentage: number;
}

interface ConversionMetric {
  activeTrials: number;
  convertedThisMonth: number;
  droppedThisMonth: number;
  conversionRate: number;
  avgTimeToConvert: number;
}

interface ChurnMetric {
  churnRate: number;
  churnedTenants: number;
  revenueAtRisk: number;
  topReasons: { reason: string; count: number }[];
}

interface RenewalData {
  upcomingRenewals: number;
  totalValue: number;
  atRisk: number;
  confirmed: number;
}

interface PlatformAlert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  category: 'system' | 'payment' | 'security' | 'maintenance';
  message: string;
  timestamp: string;
  actionUrl?: string;
}

interface HealthMetric {
  metric: string;
  status: 'healthy' | 'warning' | 'critical';
  value: string;
  trend?: number;
}

interface HighRiskTenant {
  id: string;
  name: string;
  risk: 'payment-failure' | 'expired-subscription' | 'grace-period' | 'high-usage';
  mrr: number;
  daysOverdue?: number;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockKPIs: PlatformKPI = {
  totalTenants: 287,
  tenantsTrend: 8.4,
  activeSubscriptions: 287,
  subscriptionsTrend: 8.4,
  mrr: 2847500,
  mrrTrend: 12.3,
  trialsInProgress: 42,
  trialsTrend: -5.2,
  failedPayments: 8,
  billingIssues: 13,
};

const mockMRRData: MRRDataPoint[] = [
  { month: 'Jul', mrr: 2150000, newMRR: 180000, churnedMRR: 45000 },
  { month: 'Aug', mrr: 2280000, newMRR: 195000, churnedMRR: 38000 },
  { month: 'Sep', mrr: 2425000, newMRR: 210000, churnedMRR: 42000 },
  { month: 'Oct', mrr: 2590000, newMRR: 225000, churnedMRR: 51000 },
  { month: 'Nov', mrr: 2715000, newMRR: 198000, churnedMRR: 35000 },
  { month: 'Dec', mrr: 2847500, newMRR: 245000, churnedMRR: 48000 },
];

const mockPlanDistribution: PlanDistribution[] = [
  { planName: 'Starter', subscribers: 142, revenue: 710000, percentage: 49.5 },
  { planName: 'Professional', subscribers: 98, revenue: 1470000, percentage: 34.1 },
  { planName: 'Enterprise', subscribers: 47, revenue: 2350000, percentage: 16.4 },
];

const mockConversion: ConversionMetric = {
  activeTrials: 42,
  convertedThisMonth: 28,
  droppedThisMonth: 9,
  conversionRate: 75.7,
  avgTimeToConvert: 18.5,
};

const mockChurn: ChurnMetric = {
  churnRate: 3.2,
  churnedTenants: 9,
  revenueAtRisk: 135000,
  topReasons: [
    { reason: 'Cost too high', count: 4 },
    { reason: 'Missing features', count: 3 },
    { reason: 'Poor support', count: 2 },
  ],
};

const mockRenewals: RenewalData = {
  upcomingRenewals: 67,
  totalValue: 1245000,
  atRisk: 12,
  confirmed: 38,
};

const mockAlerts: PlatformAlert[] = [
  {
    id: 'alert-1',
    severity: 'critical',
    category: 'payment',
    message: '8 payment failures detected in the last 24 hours. Automated retry in progress.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    actionUrl: '/admin/billing/payments',
  },
  {
    id: 'alert-2',
    severity: 'warning',
    category: 'system',
    message: 'Churn rate increased to 3.2% (above 3.0% threshold). Investigate retention strategies.',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: 'alert-3',
    severity: 'warning',
    category: 'maintenance',
    message: 'Scheduled maintenance window: Jan 15, 2025 02:00-04:00 UTC.',
    timestamp: new Date(Date.now() - 14400000).toISOString(),
  },
];

const mockHealthMetrics: HealthMetric[] = [
  { metric: 'API Uptime', status: 'healthy', value: '99.98%', trend: 0.01 },
  { metric: 'Payment Gateway', status: 'warning', value: '97.2%', trend: -1.8 },
  { metric: 'Database Performance', status: 'healthy', value: '45ms avg', trend: -5 },
  { metric: 'CDN Availability', status: 'healthy', value: '100%' },
];

const mockHighRiskTenants: HighRiskTenant[] = [
  { id: '1', name: 'GlobalMedia Corp', risk: 'payment-failure', mrr: 49999, daysOverdue: 7 },
  { id: '2', name: 'AirportAds Inc', risk: 'grace-period', mrr: 14999, daysOverdue: 3 },
  { id: '3', name: 'RetailDisplay Network', risk: 'expired-subscription', mrr: 49999 },
  { id: '4', name: 'TransitMedia Solutions', risk: 'high-usage', mrr: 14999 },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function SaaSAdminDashboard() {
  const navigate = useNavigate();
  const [kpis, setKPIs] = useState<PlatformKPI>(mockKPIs);
  const [mrrData, setMRRData] = useState<MRRDataPoint[]>(mockMRRData);
  const [planDistribution, setPlanDistribution] = useState<PlanDistribution[]>(mockPlanDistribution);
  const [conversion, setConversion] = useState<ConversionMetric>(mockConversion);
  const [churn, setChurn] = useState<ChurnMetric>(mockChurn);
  const [renewals, setRenewals] = useState<RenewalData>(mockRenewals);
  const [alerts, setAlerts] = useState<PlatformAlert[]>(mockAlerts);
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>(mockHealthMetrics);
  const [highRiskTenants, setHighRiskTenants] = useState<HighRiskTenant[]>(mockHighRiskTenants);
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

  const getAlertIcon = (severity: PlatformAlert['severity']) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="w-4 h-4 text-[#DC2626]" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />;
      case 'info':
        return <AlertCircle className="w-4 h-4 text-[#3B82F6]" />;
    }
  };

  const getAlertColor = (severity: PlatformAlert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'border-l-[#DC2626] bg-[#FEF2F2]';
      case 'warning':
        return 'border-l-[#F59E0B] bg-[#FFFBEB]';
      case 'info':
        return 'border-l-[#3B82F6] bg-[#EFF6FF]';
    }
  };

  const getHealthStatusColor = (status: HealthMetric['status']) => {
    switch (status) {
      case 'healthy':
        return 'text-[#16A34A]';
      case 'warning':
        return 'text-[#F59E0B]';
      case 'critical':
        return 'text-[#DC2626]';
    }
  };

  const getRiskBadgeColor = (risk: HighRiskTenant['risk']) => {
    switch (risk) {
      case 'payment-failure':
        return 'bg-[#FEE2E2] text-[#991B1B]';
      case 'expired-subscription':
        return 'bg-[#FEE2E2] text-[#991B1B]';
      case 'grace-period':
        return 'bg-[#FEF3C7] text-[#92400E]';
      case 'high-usage':
        return 'bg-[#DBEAFE] text-[#1E40AF]';
    }
  };

  const COLORS = ['#D9480F', '#3B82F6', '#16A34A'];

  const activeAlerts = alerts.filter((a) => a.severity === 'critical' || a.severity === 'warning');
  const criticalHealthMetrics = healthMetrics.filter((h) => h.status !== 'healthy');

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F9FAFB]">
      {/* HEADER BAR */}
      <div className="bg-white border-b border-[#E5E7EB] px-8 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[#111827] mb-1">Platform Dashboard</h1>
            <p className="text-sm text-[#6B7280]">
              Executive overview of platform health, revenue, and growth
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
              className="px-4 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm font-medium text-[#111827] hover:bg-white disabled:opacity-50 flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-[1600px] mx-auto space-y-6">
          
          {/* PLATFORM ALERTS */}
          {activeAlerts.length > 0 && (
            <div className="space-y-2">
              {activeAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`border-l-4 rounded-lg px-4 py-3 flex items-start justify-between ${getAlertColor(alert.severity)}`}
                >
                  <div className="flex items-start gap-3 flex-1">
                    {getAlertIcon(alert.severity)}
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="text-sm font-medium text-[#111827]">{alert.message}</div>
                      </div>
                      <div className="text-xs text-[#6B7280] mt-1">
                        {alert.category.toUpperCase()} · {getTimeSince(alert.timestamp)}
                      </div>
                    </div>
                  </div>
                  {alert.actionUrl && (
                    <button
                      onClick={() => navigate(alert.actionUrl!)}
                      className="text-xs font-medium text-[#D9480F] hover:underline flex items-center gap-1"
                    >
                      View Details
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* CORE KPI ROW */}
          <div className="grid grid-cols-5 gap-4">
            <KPICard
              label="Total Tenants"
              value={kpis.totalTenants.toLocaleString()}
              trend={kpis.tenantsTrend}
              icon={Users}
              onClick={() => navigate('/tenants')}
            />
            <KPICard
              label="Active Subscriptions"
              value={kpis.activeSubscriptions.toLocaleString()}
              trend={kpis.subscriptionsTrend}
              icon={CreditCard}
              onClick={() => navigate('/admin/billing/subscriptions')}
            />
            <KPICard
              label="Monthly Recurring Revenue"
              value={formatCurrency(kpis.mrr)}
              trend={kpis.mrrTrend}
              icon={DollarSign}
              onClick={() => navigate('/admin/billing/revenue')}
            />
            <KPICard
              label="Trials in Progress"
              value={kpis.trialsInProgress.toLocaleString()}
              trend={kpis.trialsTrend}
              icon={Clock}
              onClick={() => navigate('/admin/billing/subscriptions?filter=trial')}
            />
            <KPICard
              label="Failed Payments"
              value={kpis.failedPayments.toLocaleString()}
              badge={kpis.billingIssues > 0 ? `${kpis.billingIssues} issues` : undefined}
              icon={AlertTriangle}
              critical
              onClick={() => navigate('/admin/billing/payments')}
            />
          </div>

          {/* FINANCIAL & SUBSCRIPTION OVERVIEW */}
          <div className="grid grid-cols-12 gap-6">
            
            {/* MRR Trend */}
            <div className="col-span-8 bg-white border border-[#E5E7EB] rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-[#111827] mb-1">MRR Growth Trend</h3>
                  <p className="text-sm text-[#6B7280]">Monthly recurring revenue over the last 6 months</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-semibold text-[#111827]">{formatCurrency(kpis.mrr)}</div>
                  <div className={`text-sm font-medium ${kpis.mrrTrend > 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                    {formatPercentage(kpis.mrrTrend)} vs last month
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={mrrData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#6B7280" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} tickFormatter={(value) => `₹${(value / 1000000).toFixed(1)}M`} />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }}
                  />
                  <Line type="monotone" dataKey="mrr" stroke="#D9480F" strokeWidth={2} dot={{ fill: '#D9480F', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Subscription Plan Distribution */}
            <div className="col-span-4 bg-white border border-[#E5E7EB] rounded-xl p-6">
              <h3 className="text-[#111827] mb-1">Subscription Distribution</h3>
              <p className="text-sm text-[#6B7280] mb-6">Active subscribers by plan</p>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={planDistribution}
                    dataKey="subscribers"
                    nameKey="planName"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ percentage }) => `${percentage.toFixed(1)}%`}
                  >
                    {planDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {planDistribution.map((plan, index) => (
                  <div key={plan.planName} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-sm`} style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      <span className="text-[#6B7280]">{plan.planName}</span>
                    </div>
                    <span className="font-medium text-[#111827]">{plan.subscribers}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CONVERSION, CHURN, AND RENEWALS */}
          <div className="grid grid-cols-3 gap-6">
            
            {/* Trial Conversion */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
              <h3 className="text-[#111827] mb-1">Trial Conversion</h3>
              <p className="text-sm text-[#6B7280] mb-6">Trial to paid subscription metrics</p>
              <div className="space-y-4">
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-sm text-[#6B7280]">Conversion Rate</span>
                    <span className="text-2xl font-semibold text-[#111827]">{conversion.conversionRate}%</span>
                  </div>
                  <div className="h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                    <div className="h-full bg-[#16A34A]" style={{ width: `${conversion.conversionRate}%` }}></div>
                  </div>
                </div>
                <div className="pt-4 border-t border-[#E5E7EB] grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-[#6B7280]">Active Trials</div>
                    <div className="text-xl font-semibold text-[#111827]">{conversion.activeTrials}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#6B7280]">Avg Days to Convert</div>
                    <div className="text-xl font-semibold text-[#111827]">{conversion.avgTimeToConvert}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-[#6B7280]">Converted</div>
                    <div className="text-lg font-semibold text-[#16A34A]">{conversion.convertedThisMonth}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#6B7280]">Dropped</div>
                    <div className="text-lg font-semibold text-[#DC2626]">{conversion.droppedThisMonth}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Churn Indicators */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
              <h3 className="text-[#111827] mb-1">Churn Analysis</h3>
              <p className="text-sm text-[#6B7280] mb-6">Revenue and customer retention risk</p>
              <div className="space-y-4">
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-sm text-[#6B7280]">Churn Rate</span>
                    <span className={`text-2xl font-semibold ${churn.churnRate > 3 ? 'text-[#DC2626]' : 'text-[#111827]'}`}>
                      {churn.churnRate}%
                    </span>
                  </div>
                  {churn.churnRate > 3 && (
                    <div className="text-xs text-[#DC2626]">Above 3% threshold</div>
                  )}
                </div>
                <div className="pt-4 border-t border-[#E5E7EB] grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-[#6B7280]">Churned Tenants</div>
                    <div className="text-xl font-semibold text-[#111827]">{churn.churnedTenants}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#6B7280]">Revenue at Risk</div>
                    <div className="text-xl font-semibold text-[#111827]">{formatCurrency(churn.revenueAtRisk)}</div>
                  </div>
                </div>
                <div className="pt-4 border-t border-[#E5E7EB]">
                  <div className="text-xs text-[#6B7280] mb-2">Top Churn Reasons</div>
                  <div className="space-y-2">
                    {churn.topReasons.map((reason, index) => (
                      <div key={index} className="flex items-center justify-between text-xs">
                        <span className="text-[#111827]">{reason.reason}</span>
                        <span className="text-[#6B7280]">{reason.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Renewals */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
              <h3 className="text-[#111827] mb-1">Upcoming Renewals</h3>
              <p className="text-sm text-[#6B7280] mb-6">Next 30 days renewal pipeline</p>
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-[#6B7280] mb-1">Total Value</div>
                  <div className="text-2xl font-semibold text-[#111827]">{formatCurrency(renewals.totalValue)}</div>
                </div>
                <div className="pt-4 border-t border-[#E5E7EB] grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-[#6B7280]">Total Renewals</div>
                    <div className="text-xl font-semibold text-[#111827]">{renewals.upcomingRenewals}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#6B7280]">Confirmed</div>
                    <div className="text-xl font-semibold text-[#16A34A]">{renewals.confirmed}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-[#6B7280]">At Risk</div>
                    <div className="text-lg font-semibold text-[#F59E0B]">{renewals.atRisk}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#6B7280]">Risk Rate</div>
                    <div className="text-lg font-semibold text-[#111827]">
                      {((renewals.atRisk / renewals.upcomingRenewals) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/admin/billing/subscriptions?filter=renewal')}
                  className="w-full mt-4 px-4 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm font-medium text-[#111827] hover:bg-white flex items-center justify-center gap-2"
                >
                  View All Renewals
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* PLATFORM HEALTH & RISK SIGNALS */}
          <div className="grid grid-cols-12 gap-6">
            
            {/* System Health */}
            <div className="col-span-5 bg-white border border-[#E5E7EB] rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-[#111827] mb-1">Platform Health</h3>
                  <p className="text-sm text-[#6B7280]">System and infrastructure status</p>
                </div>
                <Server className="w-5 h-5 text-[#6B7280]" />
              </div>
              <div className="space-y-4">
                {healthMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-[#F3F4F6] last:border-0">
                    <div className="flex items-center gap-3">
                      <Activity className={`w-4 h-4 ${getHealthStatusColor(metric.status)}`} />
                      <span className="text-sm text-[#111827]">{metric.metric}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-medium ${getHealthStatusColor(metric.status)}`}>
                        {metric.value}
                      </span>
                      {metric.trend !== undefined && (
                        <span className={`text-xs ${metric.trend > 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                          {metric.trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {criticalHealthMetrics.length > 0 && (
                <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
                  <div className="text-xs text-[#F59E0B] flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    {criticalHealthMetrics.length} system(s) require attention
                  </div>
                </div>
              )}
            </div>

            {/* High-Risk Tenants */}
            <div className="col-span-7 bg-white border border-[#E5E7EB] rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-[#111827] mb-1">High-Risk Tenants</h3>
                  <p className="text-sm text-[#6B7280]">Accounts requiring immediate attention</p>
                </div>
                <button
                  onClick={() => navigate('/tenants?filter=at-risk')}
                  className="text-sm font-medium text-[#D9480F] hover:underline flex items-center gap-1"
                >
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {highRiskTenants.map((tenant) => (
                  <div
                    key={tenant.id}
                    className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg hover:bg-[#F3F4F6] cursor-pointer transition-colors"
                    onClick={() => navigate(`/tenants/${tenant.id}`)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-[#111827]">{tenant.name}</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${getRiskBadgeColor(tenant.risk)}`}>
                          {tenant.risk.replace('-', ' ')}
                        </span>
                      </div>
                      <div className="text-xs text-[#6B7280]">
                        {formatCurrency(tenant.mrr)} MRR
                        {tenant.daysOverdue && ` · ${tenant.daysOverdue} days overdue`}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#9CA3AF]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// KPI CARD COMPONENT
// ============================================================================

interface KPICardProps {
  label: string;
  value: string;
  trend?: number;
  badge?: string;
  icon: React.ElementType;
  critical?: boolean;
  onClick: () => void;
}

function KPICard({ label, value, trend, badge, icon: Icon, critical, onClick }: KPICardProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white border border-[#E5E7EB] rounded-xl p-6 text-left hover:shadow-lg transition-all group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          critical ? 'bg-[#FEF2F2]' : 'bg-[#F9FAFB]'
        }`}>
          <Icon className={`w-5 h-5 ${critical ? 'text-[#DC2626]' : 'text-[#6B7280]'}`} />
        </div>
        {badge && (
          <span className="px-2 py-1 bg-[#FEF2F2] text-[#DC2626] text-xs font-medium rounded">
            {badge}
          </span>
        )}
      </div>
      <div className="mb-1">
        <div className="text-sm text-[#6B7280] mb-1">{label}</div>
        <div className="text-2xl font-semibold text-[#111827]">{value}</div>
      </div>
      {trend !== undefined && (
        <div className={`flex items-center gap-1 text-sm font-medium ${
          trend > 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'
        }`}>
          {trend > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {Math.abs(trend).toFixed(1)}%
        </div>
      )}
    </button>
  );
}