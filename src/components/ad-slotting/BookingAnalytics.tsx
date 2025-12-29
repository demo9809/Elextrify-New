import { useState } from 'react';
import { TrendingUp, DollarSign, Clock, Target, Calendar, Users, BarChart3 } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const REVENUE_DATA = [
  { month: 'Jan', revenue: 32000, bookings: 85 },
  { month: 'Feb', revenue: 38000, bookings: 92 },
  { month: 'Mar', revenue: 35000, bookings: 88 },
  { month: 'Apr', revenue: 41000, bookings: 105 },
  { month: 'May', revenue: 39000, bookings: 98 },
  { month: 'Jun', revenue: 42350, bookings: 127 },
];

const OCCUPANCY_DATA = [
  { day: 'Mon', peak: 85, nonPeak: 62 },
  { day: 'Tue', peak: 78, nonPeak: 58 },
  { day: 'Wed', peak: 82, nonPeak: 65 },
  { day: 'Thu', peak: 88, nonPeak: 70 },
  { day: 'Fri', peak: 92, nonPeak: 75 },
  { day: 'Sat', peak: 95, nonPeak: 88 },
  { day: 'Sun', peak: 90, nonPeak: 82 },
];

const VENUE_DISTRIBUTION = [
  { name: 'Malls', value: 35, color: '#D9480F' },
  { name: 'Airports', value: 25, color: '#3B82F6' },
  { name: 'Transit', value: 20, color: '#16A34A' },
  { name: 'Gyms', value: 12, color: '#F59E0B' },
  { name: 'Retail', value: 8, color: '#8B5CF6' },
];

const TOP_CLIENTS = [
  { name: 'Acme Corporation', bookings: 32, revenue: 8500, occupancy: 85 },
  { name: 'Brew Coffee Co.', bookings: 28, revenue: 7200, occupancy: 78 },
  { name: 'FitLife Gym', bookings: 24, revenue: 6400, occupancy: 72 },
  { name: 'TechStart Inc.', bookings: 21, revenue: 5800, occupancy: 68 },
  { name: 'Fashion Forward', bookings: 18, revenue: 4900, occupancy: 65 },
];

export function BookingAnalytics() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('month');

  return (
    <div className="h-full flex flex-col bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#111827] mb-2">Booking Analytics</h1>
            <p className="text-[#6B7280]">
              Inventory occupancy, revenue performance, and booking trends
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#F9FAFB] rounded-lg p-1">
            <button
              onClick={() => setTimeRange('week')}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                timeRange === 'week'
                  ? 'bg-white text-[#D9480F] shadow-sm'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                timeRange === 'month'
                  ? 'bg-white text-[#D9480F] shadow-sm'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setTimeRange('quarter')}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                timeRange === 'quarter'
                  ? 'bg-white text-[#D9480F] shadow-sm'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              Quarter
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* KPIs */}
          <div className="grid grid-cols-4 gap-6">
            <MetricCard
              icon={Target}
              label="Occupancy Rate"
              value="68%"
              change="+5.2%"
              trend="up"
            />
            <MetricCard
              icon={DollarSign}
              label="Revenue (This Month)"
              value="$42,350"
              change="+12.8%"
              trend="up"
            />
            <MetricCard
              icon={Clock}
              label="Avg Booking Duration"
              value="4.2 days"
              change="-0.3 days"
              trend="down"
            />
            <MetricCard
              icon={TrendingUp}
              label="Active Bookings"
              value="127"
              change="+18"
              trend="up"
            />
          </div>

          {/* Revenue & Bookings Trend */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-[#111827]">Revenue & Bookings Trend</h3>
                <p className="text-sm text-[#6B7280] mt-1">Monthly performance over the last 6 months</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#D9480F] rounded" />
                  <span className="text-sm text-[#6B7280]">Revenue</span>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <div className="w-3 h-3 bg-[#3B82F6] rounded" />
                  <span className="text-sm text-[#6B7280]">Bookings</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={REVENUE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" style={{ fontSize: 12 }} />
                <YAxis yAxisId="left" stroke="#6B7280" style={{ fontSize: 12 }} />
                <YAxis yAxisId="right" orientation="right" stroke="#6B7280" style={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: 12
                  }}
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#D9480F" 
                  strokeWidth={3}
                  dot={{ fill: '#D9480F', r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="bookings" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Occupancy & Venue Distribution */}
          <div className="grid grid-cols-2 gap-6">
            {/* Peak vs Non-Peak Occupancy */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#111827]">Peak vs Non-Peak Occupancy</h3>
                <p className="text-sm text-[#6B7280] mt-1">Weekly occupancy by pricing tier</p>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={OCCUPANCY_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="day" stroke="#6B7280" style={{ fontSize: 12 }} />
                  <YAxis stroke="#6B7280" style={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: 12
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="peak" fill="#D9480F" name="Peak Hours" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="nonPeak" fill="#3B82F6" name="Non-Peak Hours" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Venue Distribution */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#111827]">Venue Distribution</h3>
                <p className="text-sm text-[#6B7280] mt-1">Bookings by venue type</p>
              </div>
              <div className="flex items-center gap-6">
                <ResponsiveContainer width="60%" height={280}>
                  <PieChart>
                    <Pie
                      data={VENUE_DISTRIBUTION}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {VENUE_DISTRIBUTION.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#FFFFFF', 
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        fontSize: 12
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-3">
                  {VENUE_DISTRIBUTION.map((venue) => (
                    <div key={venue.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: venue.color }}
                        />
                        <span className="text-sm text-[#6B7280]">{venue.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-[#111827]">{venue.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Top Clients */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-[#111827]">Top Performing Clients</h3>
                <p className="text-sm text-[#6B7280] mt-1">Ranked by total bookings this month</p>
              </div>
            </div>
            <div className="overflow-hidden border border-[#E5E7EB] rounded-lg">
              <table className="w-full">
                <thead className="bg-[#F9FAFB]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase">Rank</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase">Bookings</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase">Revenue</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase">Occupancy</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase">Performance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {TOP_CLIENTS.map((client, index) => (
                    <tr key={client.name} className="hover:bg-[#F9FAFB] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F9FAFB] border border-[#E5E7EB]">
                          <span className="text-sm font-semibold text-[#111827]">#{index + 1}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-[#111827]">{client.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-[#111827]">{client.bookings}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-[#16A34A]">${client.revenue.toLocaleString()}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-[#E5E7EB] rounded-full overflow-hidden max-w-[100px]">
                            <div 
                              className="h-full bg-[#D9480F]"
                              style={{ width: `${client.occupancy}%` }}
                            />
                          </div>
                          <span className="text-sm text-[#6B7280]">{client.occupancy}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          index === 0 
                            ? 'bg-[#D1FAE5] text-[#16A34A]'
                            : index < 3
                            ? 'bg-[#DBEAFE] text-[#3B82F6]'
                            : 'bg-[#F3F4F6] text-[#6B7280]'
                        }`}>
                          {index === 0 ? (
                            <>
                              <TrendingUp className="w-3 h-3" />
                              Excellent
                            </>
                          ) : index < 3 ? (
                            <>
                              <TrendingUp className="w-3 h-3" />
                              Good
                            </>
                          ) : (
                            <>
                              <BarChart3 className="w-3 h-3" />
                              Average
                            </>
                          )}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ 
  icon: Icon, 
  label, 
  value, 
  change, 
  trend 
}: { 
  icon: any; 
  label: string; 
  value: string; 
  change: string; 
  trend: 'up' | 'down'; 
}) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-[#FFF7ED] flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#D9480F]" />
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded ${
          trend === 'up' 
            ? 'bg-[#D1FAE5] text-[#16A34A]' 
            : 'bg-[#FEE2E2] text-[#DC2626]'
        }`}>
          {change}
        </span>
      </div>
      <p className="text-2xl font-semibold text-[#111827] mb-1">{value}</p>
      <p className="text-sm text-[#6B7280]">{label}</p>
    </div>
  );
}
