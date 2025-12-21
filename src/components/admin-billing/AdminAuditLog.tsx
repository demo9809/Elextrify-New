import { useState } from 'react';
import {
  Search,
  Filter,
  Calendar,
  Download,
  Activity,
  User,
  DollarSign,
  CreditCard,
  Percent,
  Ban,
  CheckCircle,
  Edit,
  Trash2,
  RefreshCw,
} from 'lucide-react';

// Mock audit log data
const mockAuditLogs = [
  {
    id: 'audit_001',
    timestamp: '2024-12-21T14:32:00',
    actor: 'admin@elextrify.com',
    actorName: 'Sarah Johnson',
    action: 'subscription_changed',
    actionLabel: 'Subscription Changed',
    tenantId: 'tn_acme',
    tenantName: 'Acme Corporation',
    before: { edition: 'Starter', billingCycle: 'monthly' },
    after: { edition: 'Professional', billingCycle: 'monthly' },
    metadata: { reason: 'Customer upgrade request' },
  },
  {
    id: 'audit_002',
    timestamp: '2024-12-21T13:15:00',
    actor: 'admin@elextrify.com',
    actorName: 'Sarah Johnson',
    action: 'credit_issued',
    actionLabel: 'Credit Issued',
    tenantId: 'tn_techstart',
    tenantName: 'TechStart Inc.',
    before: { creditBalance: 0 },
    after: { creditBalance: 500 },
    metadata: { amount: 500, reason: 'Onboarding bonus' },
  },
  {
    id: 'audit_003',
    timestamp: '2024-12-21T11:45:00',
    actor: 'finance@elextrify.com',
    actorName: 'Michael Chen',
    action: 'invoice_manual_paid',
    actionLabel: 'Invoice Manually Marked Paid',
    tenantId: 'tn_fitlife',
    tenantName: 'FitLife Gym',
    before: { status: 'pending' },
    after: { status: 'paid' },
    metadata: { invoiceNumber: 'INV-2024-001234', amount: 1200 },
  },
  {
    id: 'audit_004',
    timestamp: '2024-12-21T10:20:00',
    actor: 'admin@elextrify.com',
    actorName: 'Sarah Johnson',
    action: 'discount_applied',
    actionLabel: 'Discount Applied',
    tenantId: 'tn_brew',
    tenantName: 'Brew Coffee Co.',
    before: { discount: null },
    after: { discount: { type: 'percentage', value: 15 } },
    metadata: { description: 'Loyalty discount', expiryDate: '2025-06-30' },
  },
  {
    id: 'audit_005',
    timestamp: '2024-12-21T09:10:00',
    actor: 'support@elextrify.com',
    actorName: 'Emma Davis',
    action: 'payment_retry',
    actionLabel: 'Payment Retry Triggered',
    tenantId: 'tn_acme',
    tenantName: 'Acme Corporation',
    before: { status: 'failed' },
    after: { status: 'processing' },
    metadata: { invoiceNumber: 'INV-2024-001235', amount: 2400 },
  },
  {
    id: 'audit_006',
    timestamp: '2024-12-20T16:30:00',
    actor: 'admin@elextrify.com',
    actorName: 'Sarah Johnson',
    action: 'subscription_suspended',
    actionLabel: 'Subscription Suspended',
    tenantId: 'tn_global',
    tenantName: 'Global Retail Ltd.',
    before: { status: 'active' },
    after: { status: 'suspended' },
    metadata: { reason: 'Payment failure - 3 attempts' },
  },
  {
    id: 'audit_007',
    timestamp: '2024-12-20T14:15:00',
    actor: 'finance@elextrify.com',
    actorName: 'Michael Chen',
    action: 'discount_revoked',
    actionLabel: 'Discount Revoked',
    tenantId: 'tn_techstart',
    tenantName: 'TechStart Inc.',
    before: { discount: { type: 'percentage', value: 20 } },
    after: { discount: null },
    metadata: { reason: 'Promotion ended' },
  },
  {
    id: 'audit_008',
    timestamp: '2024-12-20T11:00:00',
    actor: 'admin@elextrify.com',
    actorName: 'Sarah Johnson',
    action: 'billing_cycle_changed',
    actionLabel: 'Billing Cycle Changed',
    tenantId: 'tn_fitlife',
    tenantName: 'FitLife Gym',
    before: { billingCycle: 'monthly', amount: 199 },
    after: { billingCycle: 'annual', amount: 1990 },
    metadata: { effectiveDate: '2024-12-31' },
  },
  {
    id: 'audit_009',
    timestamp: '2024-12-20T09:30:00',
    actor: 'admin@elextrify.com',
    actorName: 'Sarah Johnson',
    action: 'subscription_cancelled',
    actionLabel: 'Subscription Cancelled',
    tenantId: 'tn_oldclient',
    tenantName: 'Old Client Inc.',
    before: { status: 'active' },
    after: { status: 'cancelled' },
    metadata: { reason: 'Customer request', effectiveDate: '2024-12-31' },
  },
  {
    id: 'audit_010',
    timestamp: '2024-12-19T15:45:00',
    actor: 'finance@elextrify.com',
    actorName: 'Michael Chen',
    action: 'credit_note_applied',
    actionLabel: 'Credit Note Applied',
    tenantId: 'tn_acme',
    tenantName: 'Acme Corporation',
    before: null,
    after: null,
    metadata: { invoiceNumber: 'INV-2024-001200', creditAmount: 300, reason: 'Partial refund' },
  },
];

const actionTypeColors: Record<string, { bg: string; text: string; icon: any }> = {
  subscription_changed: { bg: 'bg-blue-50', text: 'text-blue-700', icon: Edit },
  subscription_suspended: { bg: 'bg-orange-50', text: 'text-orange-700', icon: Ban },
  subscription_cancelled: { bg: 'bg-red-50', text: 'text-red-700', icon: Trash2 },
  credit_issued: { bg: 'bg-green-50', text: 'text-green-700', icon: DollarSign },
  discount_applied: { bg: 'bg-purple-50', text: 'text-purple-700', icon: Percent },
  discount_revoked: { bg: 'bg-gray-50', text: 'text-gray-700', icon: Trash2 },
  invoice_manual_paid: { bg: 'bg-green-50', text: 'text-green-700', icon: CheckCircle },
  payment_retry: { bg: 'bg-orange-50', text: 'text-orange-700', icon: RefreshCw },
  billing_cycle_changed: { bg: 'bg-blue-50', text: 'text-blue-700', icon: Calendar },
  credit_note_applied: { bg: 'bg-yellow-50', text: 'text-yellow-700', icon: CreditCard },
};

export default function AdminAuditLog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [tenantFilter, setTenantFilter] = useState('');
  const [dateRange, setDateRange] = useState('7-days');

  const filteredLogs = mockAuditLogs.filter((log) => {
    const matchesSearch =
      log.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.actorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.actionLabel.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    const matchesTenant = !tenantFilter || log.tenantId === tenantFilter;
    return matchesSearch && matchesAction && matchesTenant;
  });

  const uniqueActionTypes = Array.from(new Set(mockAuditLogs.map((log) => log.action)));
  const uniqueTenants = Array.from(
    new Set(mockAuditLogs.map((log) => ({ id: log.tenantId, name: log.tenantName })))
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-[#111827]">Billing Audit Log</h1>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                  SAAS ADMIN
                </span>
              </div>
              <p className="text-sm text-[#6B7280] mt-1">
                Complete audit trail of all billing actions and changes
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
                <option value="24-hours">Last 24 Hours</option>
                <option value="7-days">Last 7 Days</option>
                <option value="30-days">Last 30 Days</option>
                <option value="90-days">Last 90 Days</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#6B7280]">Total Events</p>
                <p className="text-xl font-semibold text-[#111827]">{mockAuditLogs.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <User className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#6B7280]">Active Admins</p>
                <p className="text-xl font-semibold text-[#111827]">
                  {new Set(mockAuditLogs.map((log) => log.actor)).size}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#6B7280]">Affected Tenants</p>
                <p className="text-xl font-semibold text-[#111827]">
                  {new Set(mockAuditLogs.map((log) => log.tenantId)).size}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                <Edit className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#6B7280]">Action Types</p>
                <p className="text-xl font-semibold text-[#111827]">{uniqueActionTypes.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
          <div className="flex flex-wrap gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
              <input
                type="text"
                placeholder="Search by tenant, admin, or action..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 h-[40px] border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              />
            </div>

            {/* Action Type Filter */}
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="h-[40px] px-3 pr-8 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
            >
              <option value="all">All Actions</option>
              <option value="subscription_changed">Subscription Changes</option>
              <option value="credit_issued">Credits Issued</option>
              <option value="discount_applied">Discounts Applied</option>
              <option value="payment_retry">Payment Retries</option>
              <option value="invoice_manual_paid">Manual Payments</option>
            </select>

            {/* Tenant Filter */}
            <select
              value={tenantFilter}
              onChange={(e) => setTenantFilter(e.target.value)}
              className="h-[40px] px-3 pr-8 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
            >
              <option value="">All Tenants</option>
              {uniqueTenants.map((tenant) => (
                <option key={tenant.id} value={tenant.id}>
                  {tenant.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Audit Log Timeline */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E5E7EB]">
            <p className="text-sm text-[#6B7280]">
              Showing {filteredLogs.length} of {mockAuditLogs.length} events
            </p>
          </div>

          <div className="divide-y divide-[#E5E7EB]">
            {filteredLogs.map((log) => {
              const colorConfig = actionTypeColors[log.action] || {
                bg: 'bg-gray-50',
                text: 'text-gray-700',
                icon: Activity,
              };
              const Icon = colorConfig.icon;

              return (
                <div key={log.id} className="p-6 hover:bg-[#F9FAFB] transition-colors">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-lg ${colorConfig.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${colorConfig.text}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="font-medium text-[#111827] mb-1">{log.actionLabel}</p>
                          <p className="text-sm text-[#6B7280]">
                            {log.tenantName} • {log.tenantId}
                          </p>
                        </div>
                        <span className="text-xs text-[#6B7280] whitespace-nowrap ml-4">
                          {new Date(log.timestamp).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>

                      {/* Before/After */}
                      {log.before && log.after && (
                        <div className="grid grid-cols-2 gap-4 mb-3 p-3 bg-[#F9FAFB] rounded-lg">
                          <div>
                            <p className="text-xs text-[#6B7280] mb-1">Before</p>
                            <pre className="text-xs font-mono text-[#111827] overflow-x-auto">
                              {JSON.stringify(log.before, null, 2)}
                            </pre>
                          </div>
                          <div>
                            <p className="text-xs text-[#6B7280] mb-1">After</p>
                            <pre className="text-xs font-mono text-[#111827] overflow-x-auto">
                              {JSON.stringify(log.after, null, 2)}
                            </pre>
                          </div>
                        </div>
                      )}

                      {/* Metadata */}
                      {log.metadata && Object.keys(log.metadata).length > 0 && (
                        <div className="mb-3">
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(log.metadata).map(([key, value]) => (
                              <span
                                key={key}
                                className="inline-flex items-center px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs"
                              >
                                <span className="text-[#6B7280]">{key}:</span>
                                <span className="ml-1 font-medium text-[#111827]">
                                  {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                </span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Actor */}
                      <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                        <User className="w-3 h-3" />
                        <span>
                          {log.actorName} ({log.actor})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredLogs.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-[#6B7280]">No audit events found matching your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
