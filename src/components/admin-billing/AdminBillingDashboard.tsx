import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DollarSign,
  TrendingUp,
  Users,
  Clock,
  TrendingDown,
  MoreVertical,
  Eye,
  RefreshCw,
  CreditCard,
  Ban,
  Calendar,
  Filter,
  Search,
  Download,
  ChevronDown
} from 'lucide-react';
import { toast } from 'sonner';
import {
  mockAdminBillingData,
  formatCurrency,
  getStatusColor,
  getStatusLabel,
  type TenantBilling,
} from '../../data/mockAdminBillingData';

export default function AdminBillingDashboard() {
  const navigate = useNavigate();
  const [billingData] = useState(mockAdminBillingData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedTenant, setSelectedTenant] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<string>('30-days');
  const [comparisonEnabled, setComparisonEnabled] = useState(false);

  const { revenueMetrics, tenantBillings } = billingData;

  // Filter tenants
  const filteredTenants = tenantBillings.filter((tenant) => {
    const matchesSearch = tenant.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.tenantId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tenant.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (tenantId: string) => {
    navigate(`/admin/billing/${tenantId}`);
  };

  const handleRetryPayment = (tenant: TenantBilling) => {
    toast.success(`Payment retry initiated for ${tenant.tenantName}`, {
      description: 'The payment will be retried within the next few minutes.',
    });
  };

  const handleApplyCredit = (tenant: TenantBilling) => {
    toast.success(`Credit application modal would open for ${tenant.tenantName}`);
  };

  const handleSuspend = (tenant: TenantBilling) => {
    toast.success(`Suspension confirmation would open for ${tenant.tenantName}`);
  };

  const metrics = [
    {
      label: 'MRR',
      value: formatCurrency(revenueMetrics.mrr, 'USD'),
      change: '+12.5%',
      trend: 'up' as const,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'ARR',
      value: formatCurrency(revenueMetrics.arr, 'USD'),
      change: '+18.2%',
      trend: 'up' as const,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Active Subscriptions',
      value: revenueMetrics.activeSubscriptions.toString(),
      change: '+8',
      trend: 'up' as const,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'Trials',
      value: revenueMetrics.trials.toString(),
      change: '+3',
      trend: 'up' as const,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      label: 'Churn Rate',
      value: `${revenueMetrics.churnRate}%`,
      change: '-0.8%',
      trend: 'down' as const,
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-[#111827]">Billing Overview</h1>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                  SAAS ADMIN
                </span>
              </div>
              <p className="text-sm text-[#6B7280] mt-1">
                High-level revenue metrics and tenant subscription summary
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => toast.success('Export would download CSV')}
                className="flex items-center gap-2 px-4 h-[40px] border border-[#E5E7EB] bg-white text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="flex items-center gap-2 px-4 h-[40px] border border-[#E5E7EB] bg-white text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors text-sm font-medium">
                <Calendar className="w-4 h-4" />
                Last 30 Days
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto space-y-6">
        {/* Revenue Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className="bg-white border border-[#E5E7EB] rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg ${metric.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${metric.color}`} />
                  </div>
                  <span className={`text-xs font-medium ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </span>
                </div>
                <p className="text-xs text-[#6B7280] mb-1">{metric.label}</p>
                <p className="text-xl font-semibold text-[#111827]">{metric.value}</p>
              </div>
            );
          })}
        </div>

        {/* Tenant Billing Table */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="font-semibold text-[#111827]">Tenant Subscriptions</h2>
              <p className="text-sm text-[#6B7280] mt-1">
                {filteredTenants.length} of {tenantBillings.length} tenants
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                <input
                  type="text"
                  placeholder="Search tenants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 h-[40px] w-64 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-[40px] px-3 pr-8 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="trial">Trial</option>
                <option value="past-due">Past Due</option>
                <option value="suspended">Suspended</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                    Tenant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                    Edition
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                    Cycle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                    Last Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                    Next Invoice
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-[#6B7280] uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {filteredTenants.map((tenant) => (
                  <tr key={tenant.id} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-[#111827]">{tenant.tenantName}</p>
                        <p className="text-xs text-[#6B7280]">{tenant.tenantId}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[#111827]">{tenant.edition}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[#6B7280] capitalize">{tenant.billingCycle}</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-[#111827]">
                        {formatCurrency(tenant.amount, tenant.currency)}
                      </p>
                      <p className="text-xs text-[#6B7280]">
                        /{tenant.billingCycle === 'monthly' ? 'mo' : 'yr'}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md border text-xs font-medium ${getStatusColor(tenant.status)}`}>
                        {getStatusLabel(tenant.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[#6B7280]">
                        {tenant.lastPaymentDate
                          ? new Date(tenant.lastPaymentDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[#6B7280]">
                        {new Date(tenant.nextInvoiceDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleViewDetails(tenant.tenantId)}
                          className="p-2 text-[#6B7280] hover:text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {tenant.status === 'past-due' && (
                          <button
                            onClick={() => handleRetryPayment(tenant)}
                            className="p-2 text-[#6B7280] hover:text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                            title="Retry Payment"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleApplyCredit(tenant)}
                          className="p-2 text-[#6B7280] hover:text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                          title="Apply Credit"
                        >
                          <CreditCard className="w-4 h-4" />
                        </button>
                        {tenant.status !== 'suspended' && (
                          <button
                            onClick={() => handleSuspend(tenant)}
                            className="p-2 text-[#6B7280] hover:text-[#DC2626] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                            title="Suspend"
                          >
                            <Ban className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden divide-y divide-[#E5E7EB]">
            {filteredTenants.map((tenant) => (
              <div key={tenant.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="font-medium text-[#111827] mb-1">{tenant.tenantName}</p>
                    <p className="text-xs text-[#6B7280] mb-2">{tenant.tenantId}</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-md border text-xs font-medium ${getStatusColor(tenant.status)}`}>
                      {getStatusLabel(tenant.status)}
                    </span>
                  </div>
                  <button
                    onClick={() => handleViewDetails(tenant.tenantId)}
                    className="p-2 text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-[#6B7280] mb-1">Edition</p>
                    <p className="font-medium text-[#111827]">{tenant.edition}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7280] mb-1">Amount</p>
                    <p className="font-medium text-[#111827]">
                      {formatCurrency(tenant.amount, tenant.currency)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7280] mb-1">Cycle</p>
                    <p className="text-[#111827] capitalize">{tenant.billingCycle}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7280] mb-1">Next Invoice</p>
                    <p className="text-[#111827]">
                      {new Date(tenant.nextInvoiceDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTenants.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-[#6B7280]">No tenants found matching your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}