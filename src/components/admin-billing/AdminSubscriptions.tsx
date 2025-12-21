import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Eye,
  Edit,
  Pause,
  Play,
  Ban,
  ArrowDownCircle,
  Calendar,
  DollarSign,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  mockAdminBillingData,
  formatCurrency,
  getStatusColor,
  getStatusLabel,
  type TenantBilling,
} from '../../data/mockAdminBillingData';

export default function AdminSubscriptions() {
  const navigate = useNavigate();
  const [billingData] = useState(mockAdminBillingData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editionFilter, setEditionFilter] = useState<string>('all');

  const { tenantBillings } = billingData;

  // Filter subscriptions
  const filteredSubscriptions = tenantBillings.filter((tenant) => {
    const matchesSearch =
      tenant.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.tenantId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tenant.status === statusFilter;
    const matchesEdition = editionFilter === 'all' || tenant.edition === editionFilter;
    return matchesSearch && matchesStatus && matchesEdition;
  });

  const handleChangePlan = (tenant: TenantBilling) => {
    toast.success(`Change plan modal would open for ${tenant.tenantName}`);
  };

  const handleScheduleDowngrade = (tenant: TenantBilling) => {
    toast.success(`Schedule downgrade modal would open for ${tenant.tenantName}`, {
      description: 'Downgrade will take effect at the end of current billing period',
    });
  };

  const handlePause = (tenant: TenantBilling) => {
    toast.success(`Pausing subscription for ${tenant.tenantName}`, {
      description: 'No charges will be made until resumed',
    });
  };

  const handleResume = (tenant: TenantBilling) => {
    toast.success(`Resuming subscription for ${tenant.tenantName}`, {
      description: 'Billing will continue on next cycle',
    });
  };

  const handleCancel = (tenant: TenantBilling) => {
    toast.error(`Cancellation confirmation required for ${tenant.tenantName}`);
  };

  // Calculate MRR per tenant
  const calculateMRR = (tenant: TenantBilling): number => {
    if (tenant.billingCycle === 'monthly') {
      return tenant.amount;
    }
    return Math.round(tenant.amount / 12);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[#111827]">Subscription Management</h1>
        <p className="text-sm text-[#6B7280] mt-1">
          Operational control over all tenant subscriptions
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
        <div className="flex flex-wrap gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search by tenant name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 h-[40px] border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
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

          {/* Edition Filter */}
          <select
            value={editionFilter}
            onChange={(e) => setEditionFilter(e.target.value)}
            className="h-[40px] px-3 pr-8 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
          >
            <option value="all">All Editions</option>
            <option value="Starter">Starter</option>
            <option value="Professional">Professional</option>
            <option value="Enterprise">Enterprise</option>
          </select>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E5E7EB]">
          <p className="text-sm text-[#6B7280]">
            Showing {filteredSubscriptions.length} of {tenantBillings.length} subscriptions
          </p>
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
                  Start Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Renewal Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Current MRR
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[#6B7280] uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filteredSubscriptions.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-[#111827]">{tenant.tenantName}</p>
                      <p className="text-xs text-[#6B7280]">{tenant.tenantId}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-[#111827]">{tenant.edition}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#6B7280] capitalize">{tenant.billingCycle}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#6B7280]">
                      {new Date(tenant.subscriptionStartDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
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
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-md border text-xs font-medium ${getStatusColor(
                        tenant.status
                      )}`}
                    >
                      {getStatusLabel(tenant.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-[#111827]">
                      {formatCurrency(calculateMRR(tenant), tenant.currency)}
                    </p>
                    <p className="text-xs text-[#6B7280]">/month</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate(`/admin/billing/${tenant.tenantId}`)}
                        className="p-2 text-[#6B7280] hover:text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleChangePlan(tenant)}
                        className="p-2 text-[#6B7280] hover:text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                        title="Change Plan"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleScheduleDowngrade(tenant)}
                        className="p-2 text-[#6B7280] hover:text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                        title="Schedule Downgrade"
                      >
                        <ArrowDownCircle className="w-4 h-4" />
                      </button>
                      {tenant.status === 'active' ? (
                        <button
                          onClick={() => handlePause(tenant)}
                          className="p-2 text-[#6B7280] hover:text-orange-600 hover:bg-[#FFF7ED] rounded-lg transition-colors"
                          title="Pause Subscription"
                        >
                          <Pause className="w-4 h-4" />
                        </button>
                      ) : tenant.status === 'suspended' ? (
                        <button
                          onClick={() => handleResume(tenant)}
                          className="p-2 text-[#6B7280] hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Resume Subscription"
                        >
                          <Play className="w-4 h-4" />
                        </button>
                      ) : null}
                      <button
                        onClick={() => handleCancel(tenant)}
                        className="p-2 text-[#6B7280] hover:text-[#DC2626] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                        title="Cancel Subscription"
                      >
                        <Ban className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden divide-y divide-[#E5E7EB]">
          {filteredSubscriptions.map((tenant) => (
            <div key={tenant.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="font-medium text-[#111827] mb-1">{tenant.tenantName}</p>
                  <p className="text-xs text-[#6B7280] mb-2">{tenant.tenantId}</p>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-md border text-xs font-medium ${getStatusColor(
                      tenant.status
                    )}`}
                  >
                    {getStatusLabel(tenant.status)}
                  </span>
                </div>
                <button
                  onClick={() => navigate(`/admin/billing/${tenant.tenantId}`)}
                  className="p-2 text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Edition</p>
                  <p className="font-medium text-[#111827]">{tenant.edition}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">MRR</p>
                  <p className="font-medium text-[#111827]">
                    {formatCurrency(calculateMRR(tenant), tenant.currency)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Start Date</p>
                  <p className="text-[#111827]">
                    {new Date(tenant.subscriptionStartDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Renewal</p>
                  <p className="text-[#111827]">
                    {new Date(tenant.nextInvoiceDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-[#E5E7EB]">
                <button
                  onClick={() => handleChangePlan(tenant)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] text-sm"
                >
                  <Edit className="w-4 h-4" />
                  Change
                </button>
                {tenant.status === 'active' ? (
                  <button
                    onClick={() => handlePause(tenant)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] text-sm"
                  >
                    <Pause className="w-4 h-4" />
                    Pause
                  </button>
                ) : (
                  <button
                    onClick={() => handleResume(tenant)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] text-sm"
                  >
                    <Play className="w-4 h-4" />
                    Resume
                  </button>
                )}
                <button
                  onClick={() => handleCancel(tenant)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-[#E5E7EB] text-red-600 rounded-lg hover:bg-[#FEF2F2] text-sm"
                >
                  <Ban className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredSubscriptions.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-[#6B7280]">No subscriptions found matching your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}