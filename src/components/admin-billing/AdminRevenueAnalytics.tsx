import { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
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
  Legend,
  Area,
  AreaChart,
} from 'recharts';

// Mock data for charts
const mrrTrendData = [
  { month: 'Jan', mrr: 45000, newMrr: 8000, churned: 2000, expansion: 3000 },
  { month: 'Feb', mrr: 52000, newMrr: 9000, churned: 2500, expansion: 3500 },
  { month: 'Mar', mrr: 58000, newMrr: 10000, churned: 3000, expansion: 4000 },
  { month: 'Apr', mrr: 65000, newMrr: 11000, churned: 2800, expansion: 4200 },
  { month: 'May', mrr: 72000, newMrr: 12000, churned: 3200, expansion: 4800 },
  { month: 'Jun', mrr: 80000, newMrr: 13000, churned: 3500, expansion: 5200 },
  { month: 'Jul', mrr: 88000, newMrr: 14000, churned: 4000, expansion: 5600 },
  { month: 'Aug', mrr: 95000, newMrr: 15000, churned: 4200, expansion: 6000 },
  { month: 'Sep', mrr: 103000, newMrr: 16000, churned: 4500, expansion: 6500 },
  { month: 'Oct', mrr: 112000, newMrr: 17000, churned: 4800, expansion: 7000 },
  { month: 'Nov', mrr: 120000, newMrr: 18000, churned: 5000, expansion: 7500 },
  { month: 'Dec', mrr: 128000, newMrr: 19000, churned: 5200, expansion: 8000 },
];

const netMrrMovementData = [
  { month: 'Jan', new: 8000, expansion: 3000, contraction: -1500, churned: -2000 },
  { month: 'Feb', new: 9000, expansion: 3500, contraction: -1800, churned: -2500 },
  { month: 'Mar', new: 10000, expansion: 4000, contraction: -2000, churned: -3000 },
  { month: 'Apr', new: 11000, expansion: 4200, contraction: -2200, churned: -2800 },
  { month: 'May', new: 12000, expansion: 4800, contraction: -2400, churned: -3200 },
  { month: 'Jun', new: 13000, expansion: 5200, contraction: -2600, churned: -3500 },
  { month: 'Jul', new: 14000, expansion: 5600, contraction: -2800, churned: -4000 },
  { month: 'Aug', new: 15000, expansion: 6000, contraction: -3000, churned: -4200 },
  { month: 'Sep', new: 16000, expansion: 6500, contraction: -3200, churned: -4500 },
  { month: 'Oct', new: 17000, expansion: 7000, contraction: -3400, churned: -4800 },
  { month: 'Nov', new: 18000, expansion: 7500, contraction: -3600, churned: -5000 },
  { month: 'Dec', new: 19000, expansion: 8000, contraction: -3800, churned: -5200 },
];

const churnBreakdownData = [
  { reason: 'Price Too High', count: 12, mrr: 4800 },
  { reason: 'Feature Gaps', count: 8, mrr: 3200 },
  { reason: 'Poor Support', count: 5, mrr: 2000 },
  { reason: 'Product Complexity', count: 6, mrr: 2400 },
  { reason: 'Payment Failed', count: 15, mrr: 6000 },
  { reason: 'Competitor Switch', count: 9, mrr: 3600 },
  { reason: 'Business Closed', count: 4, mrr: 1600 },
];

export default function AdminRevenueAnalytics() {
  const [dateRange, setDateRange] = useState('12-months');

  // Calculate metrics
  const currentMRR = mrrTrendData[mrrTrendData.length - 1].mrr;
  const previousMRR = mrrTrendData[mrrTrendData.length - 2].mrr;
  const mrrGrowth = ((currentMRR - previousMRR) / previousMRR * 100).toFixed(1);

  const currentARR = currentMRR * 12;
  const previousARR = previousMRR * 12;
  const arrGrowth = ((currentARR - previousARR) / previousARR * 100).toFixed(1);

  const totalNewMRR = mrrTrendData[mrrTrendData.length - 1].newMrr;
  const totalExpansion = mrrTrendData[mrrTrendData.length - 1].expansion;
  const totalContraction = 3800;
  const totalChurned = mrrTrendData[mrrTrendData.length - 1].churned;

  const netMRRMovement = totalNewMRR + totalExpansion - totalContraction - totalChurned;

  const expansionRate = ((totalExpansion / currentMRR) * 100).toFixed(1);
  const contractionRate = ((totalContraction / currentMRR) * 100).toFixed(1);

  const totalChurnedCustomers = churnBreakdownData.reduce((sum, item) => sum + item.count, 0);
  const totalChurnedMRR = churnBreakdownData.reduce((sum, item) => sum + item.mrr, 0);
  const churnRate = ((totalChurnedMRR / currentMRR) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-[#111827]">Revenue Analytics</h1>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                  SAAS ADMIN
                </span>
              </div>
              <p className="text-sm text-[#6B7280] mt-1">
                Strategic visibility into MRR, ARR, expansion, and churn
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 h-[40px] border border-[#E5E7EB] bg-white text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors text-sm font-medium">
                <Download className="w-4 h-4" />
                Export
              </button>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="h-[40px] px-3 pr-8 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
              >
                <option value="3-months">Last 3 Months</option>
                <option value="6-months">Last 6 Months</option>
                <option value="12-months">Last 12 Months</option>
                <option value="24-months">Last 24 Months</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-xs font-medium">+{mrrGrowth}%</span>
              </div>
            </div>
            <p className="text-xs text-[#6B7280] mb-1">Current MRR</p>
            <p className="text-2xl font-semibold text-[#111827]">
              ${(currentMRR / 1000).toFixed(0)}k
            </p>
            <p className="text-xs text-[#6B7280] mt-1">
              +${((currentMRR - previousMRR) / 1000).toFixed(1)}k this month
            </p>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex items-center gap-1 text-blue-600">
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-xs font-medium">+{arrGrowth}%</span>
              </div>
            </div>
            <p className="text-xs text-[#6B7280] mb-1">ARR</p>
            <p className="text-2xl font-semibold text-[#111827]">
              ${(currentARR / 1000000).toFixed(2)}M
            </p>
            <p className="text-xs text-[#6B7280] mt-1">
              Annual run rate
            </p>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <span className="text-xs font-medium">Positive</span>
              </div>
            </div>
            <p className="text-xs text-[#6B7280] mb-1">Net MRR Movement</p>
            <p className="text-2xl font-semibold text-[#111827]">
              +${(netMRRMovement / 1000).toFixed(1)}k
            </p>
            <p className="text-xs text-[#6B7280] mt-1">
              This month
            </p>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex items-center gap-1 text-red-600">
                <span className="text-xs font-medium">{churnRate}%</span>
              </div>
            </div>
            <p className="text-xs text-[#6B7280] mb-1">Churn Rate</p>
            <p className="text-2xl font-semibold text-[#111827]">
              {totalChurnedCustomers}
            </p>
            <p className="text-xs text-[#6B7280] mt-1">
              customers lost this month
            </p>
          </div>
        </div>

        {/* MRR Trend Chart */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
          <div className="mb-4">
            <h2 className="font-semibold text-[#111827]">MRR Trend</h2>
            <p className="text-sm text-[#6B7280] mt-1">
              Monthly recurring revenue over time
            </p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mrrTrendData}>
                <defs>
                  <linearGradient id="colorMrr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D9480F" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#D9480F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'MRR']}
                />
                <Area
                  type="monotone"
                  dataKey="mrr"
                  stroke="#D9480F"
                  strokeWidth={2}
                  fill="url(#colorMrr)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Net MRR Movement */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
          <div className="mb-4">
            <h2 className="font-semibold text-[#111827]">Net MRR Movement</h2>
            <p className="text-sm text-[#6B7280] mt-1">
              Breakdown of new, expansion, contraction, and churned MRR
            </p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={netMrrMovementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                  formatter={(value: number) => `$${Math.abs(value).toLocaleString()}`}
                />
                <Legend />
                <Bar dataKey="new" fill="#16A34A" name="New MRR" stackId="a" />
                <Bar dataKey="expansion" fill="#3B82F6" name="Expansion" stackId="a" />
                <Bar dataKey="contraction" fill="#F59E0B" name="Contraction" stackId="a" />
                <Bar dataKey="churned" fill="#DC2626" name="Churned" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expansion vs Contraction + Churn Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Expansion vs Contraction */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
            <div className="mb-4">
              <h2 className="font-semibold text-[#111827]">Expansion vs Contraction</h2>
              <p className="text-sm text-[#6B7280] mt-1">
                Current month performance
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#111827]">Expansion MRR</p>
                    <p className="text-xs text-[#6B7280]">{expansionRate}% of total MRR</p>
                  </div>
                </div>
                <p className="text-xl font-semibold text-green-600">
                  +${(totalExpansion / 1000).toFixed(1)}k
                </p>
              </div>

              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-600 flex items-center justify-center">
                    <ArrowDownRight className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#111827]">Contraction MRR</p>
                    <p className="text-xs text-[#6B7280]">{contractionRate}% of total MRR</p>
                  </div>
                </div>
                <p className="text-xl font-semibold text-orange-600">
                  -${(totalContraction / 1000).toFixed(1)}k
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5E7EB]">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-[#6B7280]">Net Impact</p>
                  <p className="text-xl font-semibold text-[#111827]">
                    +${((totalExpansion - totalContraction) / 1000).toFixed(1)}k
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Churn Breakdown */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
            <div className="mb-4">
              <h2 className="font-semibold text-[#111827]">Churn Breakdown</h2>
              <p className="text-sm text-[#6B7280] mt-1">
                Top reasons for customer churn
              </p>
            </div>
            <div className="space-y-3">
              {churnBreakdownData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#111827]">{item.reason}</p>
                    <p className="text-xs text-[#6B7280]">{item.count} customers</p>
                  </div>
                  <p className="text-sm font-medium text-red-600">
                    -${(item.mrr / 1000).toFixed(1)}k
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-[#6B7280]">Total Churned MRR</p>
                <p className="text-xl font-semibold text-red-600">
                  -${(totalChurnedMRR / 1000).toFixed(1)}k
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
