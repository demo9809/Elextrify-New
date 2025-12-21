import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Building2, 
  Filter,
  MoreVertical,
  Eye,
  Ban,
  Archive,
  Trash2,
  UserCog,
  Package,
  Plus,
  X,
  Shield
} from 'lucide-react';
import { 
  mockTenants, 
  getEditionLabel, 
  getEditionColor, 
  getStatusLabel, 
  getStatusColor,
  getBillingStatusLabel,
  getBillingStatusColor,
  type Tenant,
  type TenantStatus,
  type TenantEdition 
} from '../../data/mockTenants';
import CreateTenantModal from './CreateTenantModal';

export default function TenantManagement() {
  const navigate = useNavigate();
  const [tenants] = useState<Tenant[]>(mockTenants);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TenantStatus | 'all'>('all');
  const [editionFilter, setEditionFilter] = useState<TenantEdition | 'all'>('all');
  const [trialFilter, setTrialFilter] = useState<'all' | 'trial' | 'paid'>('all');
  const [selectedTenants, setSelectedTenants] = useState<Set<string>>(new Set());
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = 
      tenant.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.tenantId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.primaryAdminEmail.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || tenant.status === statusFilter;
    const matchesEdition = editionFilter === 'all' || tenant.edition === editionFilter;
    const matchesTrial = 
      trialFilter === 'all' || 
      (trialFilter === 'trial' && tenant.isTrial) ||
      (trialFilter === 'paid' && !tenant.isTrial);
    
    return matchesSearch && matchesStatus && matchesEdition && matchesTrial;
  });

  const toggleTenantSelection = (tenantId: string) => {
    const newSelection = new Set(selectedTenants);
    if (newSelection.has(tenantId)) {
      newSelection.delete(tenantId);
    } else {
      newSelection.add(tenantId);
    }
    setSelectedTenants(newSelection);
  };

  const toggleSelectAll = () => {
    if (selectedTenants.size === filteredTenants.length) {
      setSelectedTenants(new Set());
    } else {
      setSelectedTenants(new Set(filteredTenants.map(t => t.id)));
    }
  };

  const handleTenantClick = (tenantId: string) => {
    navigate(`/tenants/${tenantId}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const hasActiveFilters = statusFilter !== 'all' || editionFilter !== 'all' || trialFilter !== 'all';

  const clearFilters = () => {
    setStatusFilter('all');
    setEditionFilter('all');
    setTrialFilter('all');
  };

  return (
    <div className="flex flex-col h-full bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#FEF2F2] border border-[#FEE2E2] text-[#D9480F] text-xs font-medium">
                  <Shield className="w-3 h-3 mr-1" />
                  Infrastructure & Billing Control
                </span>
              </div>
              <h1 className="text-[#111827] mb-2">Tenant Management</h1>
              <p className="text-[#6B7280]">
                Manage multi-database architecture, tenant isolation, and infrastructure settings
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 h-[44px] bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>Create Tenant</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b border-[#E5E7EB] px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by company name, tenant ID, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[44px] pl-10 pr-4 border border-[#E5E7EB] rounded-lg text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            />
          </div>

          {/* Filter Toggle Button - Mobile */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="sm:hidden flex items-center justify-center gap-2 px-4 h-[44px] border border-[#E5E7EB] bg-white text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors"
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-[#D9480F] rounded-full"></span>
            )}
          </button>

          {/* Filter Dropdowns - Desktop */}
          <div className="hidden sm:flex items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as TenantStatus | 'all')}
              className="h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="trial">Trial</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="expired">Expired</option>
              <option value="archived">Archived</option>
            </select>

            <select
              value={editionFilter}
              onChange={(e) => setEditionFilter(e.target.value as TenantEdition | 'all')}
              className="h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            >
              <option value="all">All Editions</option>
              <option value="starter">Starter</option>
              <option value="professional">Professional</option>
              <option value="enterprise">Enterprise</option>
              <option value="custom">Custom</option>
            </select>

            <select
              value={trialFilter}
              onChange={(e) => setTrialFilter(e.target.value as 'all' | 'trial' | 'paid')}
              className="h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="trial">Trial Only</option>
              <option value="paid">Paid Only</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 h-[44px] text-[#6B7280] hover:text-[#D9480F] transition-colors"
              >
                <X className="w-4 h-4" />
                <span className="text-sm">Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Filters */}
        {showFilters && (
          <div className="sm:hidden mt-3 pt-3 border-t border-[#E5E7EB] space-y-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as TenantStatus | 'all')}
              className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="trial">Trial</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="expired">Expired</option>
              <option value="archived">Archived</option>
            </select>

            <select
              value={editionFilter}
              onChange={(e) => setEditionFilter(e.target.value as TenantEdition | 'all')}
              className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            >
              <option value="all">All Editions</option>
              <option value="starter">Starter</option>
              <option value="professional">Professional</option>
              <option value="enterprise">Enterprise</option>
              <option value="custom">Custom</option>
            </select>

            <select
              value={trialFilter}
              onChange={(e) => setTrialFilter(e.target.value as 'all' | 'trial' | 'paid')}
              className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="trial">Trial Only</option>
              <option value="paid">Paid Only</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="w-full flex items-center justify-center gap-2 px-4 h-[44px] text-[#6B7280] hover:text-[#D9480F] border border-[#E5E7EB] rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Clear Filters</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedTenants.size > 0 && (
        <div className="bg-[#FEF2F2] border-b border-[#FEE2E2] px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-[#111827]">
              <span className="font-medium">{selectedTenants.size}</span> tenant{selectedTenants.size > 1 ? 's' : ''} selected
            </p>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 h-[36px] bg-white border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors text-sm">
                <Ban className="w-4 h-4" />
                <span className="hidden sm:inline">Suspend</span>
              </button>
              <button className="flex items-center gap-2 px-4 h-[36px] bg-white border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors text-sm">
                <Archive className="w-4 h-4" />
                <span className="hidden sm:inline">Archive</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="px-4 sm:px-6 lg:px-8 py-3 border-b border-[#E5E7EB] bg-white">
        <p className="text-sm text-[#6B7280]">
          Showing <span className="font-medium text-[#111827]">{filteredTenants.length}</span> of{' '}
          <span className="font-medium text-[#111827]">{tenants.length}</span> tenants
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block flex-1 overflow-auto">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                <tr>
                  <th className="w-12 px-6 py-3">
                    <input
                      type="checkbox"
                      checked={selectedTenants.size === filteredTenants.length && filteredTenants.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-[#D1D5DB] text-[#D9480F] focus:ring-[#D9480F] focus:ring-offset-0"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                    Company Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                    Tenant ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                    Edition
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                    Users
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                    Screens
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                    Billing
                  </th>
                  <th className="w-12 px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#E5E7EB]">
                {filteredTenants.map((tenant) => (
                  <tr
                    key={tenant.id}
                    className="hover:bg-[#F9FAFB] cursor-pointer transition-colors"
                    onClick={(e) => {
                      if ((e.target as HTMLElement).closest('input, button')) return;
                      handleTenantClick(tenant.id);
                    }}
                  >
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedTenants.has(tenant.id)}
                        onChange={() => toggleTenantSelection(tenant.id)}
                        className="w-4 h-4 rounded border-[#D1D5DB] text-[#D9480F] focus:ring-[#D9480F] focus:ring-offset-0"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D9480F] to-[#C23D0D] flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-[#111827]">{tenant.companyName}</p>
                          <p className="text-sm text-[#6B7280]">{tenant.primaryAdminEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-[#6B7280]">{tenant.tenantId}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium ${getEditionColor(tenant.edition)}`}>
                        {getEditionLabel(tenant.edition)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium ${getStatusColor(tenant.status)}`}>
                        {getStatusLabel(tenant.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#111827]">
                      {tenant.totalUsers}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#111827]">
                      {tenant.totalScreens}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#6B7280]">
                      {formatDate(tenant.createdDate)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium ${getBillingStatusColor(tenant.billingStatus)}`}>
                        {getBillingStatusLabel(tenant.billingStatus)}
                      </span>
                    </td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="relative">
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === tenant.id ? null : tenant.id)}
                          className="w-8 h-8 flex items-center justify-center text-[#6B7280] hover:bg-[#F9FAFB] rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        
                        {activeDropdown === tenant.id && (
                          <>
                            <div 
                              className="fixed inset-0 z-10" 
                              onClick={() => setActiveDropdown(null)}
                            />
                            <div className="absolute right-0 mt-1 w-48 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-20 py-1">
                              <button
                                onClick={() => handleTenantClick(tenant.id)}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#111827] hover:bg-[#F9FAFB] transition-colors"
                              >
                                <Eye className="w-4 h-4 text-[#6B7280]" />
                                <span>View Details</span>
                              </button>
                              <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#111827] hover:bg-[#F9FAFB] transition-colors">
                                <UserCog className="w-4 h-4 text-[#6B7280]" />
                                <span>Impersonate</span>
                              </button>
                              <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#111827] hover:bg-[#F9FAFB] transition-colors">
                                <Package className="w-4 h-4 text-[#6B7280]" />
                                <span>Change Package</span>
                              </button>
                              <div className="border-t border-[#E5E7EB] my-1" />
                              <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#DC2626] hover:bg-[#FEF2F2] transition-colors">
                                <Ban className="w-4 h-4" />
                                <span>Suspend Tenant</span>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Mobile Card List */}
      <div className="lg:hidden flex-1 overflow-auto px-4 py-4 space-y-4">
        {filteredTenants.map((tenant) => (
          <div
            key={tenant.id}
            onClick={() => handleTenantClick(tenant.id)}
            className="bg-white border border-[#E5E7EB] rounded-lg p-4 cursor-pointer hover:border-[#D9480F] transition-colors"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <input
                  type="checkbox"
                  checked={selectedTenants.has(tenant.id)}
                  onChange={() => toggleTenantSelection(tenant.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-4 h-4 mt-1 rounded border-[#D1D5DB] text-[#D9480F] focus:ring-[#D9480F] focus:ring-offset-0 flex-shrink-0"
                />
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D9480F] to-[#C23D0D] flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[#111827] truncate">{tenant.companyName}</p>
                  <p className="text-sm text-[#6B7280] font-mono">{tenant.tenantId}</p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdown(activeDropdown === tenant.id ? null : tenant.id);
                }}
                className="w-8 h-8 flex items-center justify-center text-[#6B7280] hover:bg-[#F9FAFB] rounded-lg transition-colors flex-shrink-0"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium ${getEditionColor(tenant.edition)}`}>
                {getEditionLabel(tenant.edition)}
              </span>
              <span className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium ${getStatusColor(tenant.status)}`}>
                {getStatusLabel(tenant.status)}
              </span>
              <span className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium ${getBillingStatusColor(tenant.billingStatus)}`}>
                {getBillingStatusLabel(tenant.billingStatus)}
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E5E7EB]">
              <div>
                <p className="text-xs text-[#6B7280] mb-1">Users</p>
                <p className="font-medium text-[#111827]">{tenant.totalUsers}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] mb-1">Screens</p>
                <p className="font-medium text-[#111827]">{tenant.totalScreens}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] mb-1">Campaigns</p>
                <p className="font-medium text-[#111827]">{tenant.activeCampaigns}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] mb-1">Created</p>
                <p className="font-medium text-[#111827]">{formatDate(tenant.createdDate)}</p>
              </div>
            </div>

            {/* Dropdown Menu */}
            {activeDropdown === tenant.id && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDropdown(null);
                  }}
                />
                <div className="absolute right-4 mt-1 w-48 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-20 py-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTenantClick(tenant.id);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#111827] hover:bg-[#F9FAFB] transition-colors"
                  >
                    <Eye className="w-4 h-4 text-[#6B7280]" />
                    <span>View Details</span>
                  </button>
                  <button 
                    onClick={(e) => e.stopPropagation()}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#111827] hover:bg-[#F9FAFB] transition-colors"
                  >
                    <UserCog className="w-4 h-4 text-[#6B7280]" />
                    <span>Impersonate</span>
                  </button>
                  <button 
                    onClick={(e) => e.stopPropagation()}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#111827] hover:bg-[#F9FAFB] transition-colors"
                  >
                    <Package className="w-4 h-4 text-[#6B7280]" />
                    <span>Change Package</span>
                  </button>
                  <div className="border-t border-[#E5E7EB] my-1" />
                  <button 
                    onClick={(e) => e.stopPropagation()}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#DC2626] hover:bg-[#FEF2F2] transition-colors"
                  >
                    <Ban className="w-4 h-4" />
                    <span>Suspend Tenant</span>
                  </button>
                </div>
              </>
            )}
          </div>
        ))}

        {/* Empty State */}
        {filteredTenants.length === 0 && (
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-8 text-center">
            <Building2 className="w-12 h-12 text-[#9CA3AF] mx-auto mb-3" />
            <h3 className="text-[#111827] font-medium mb-1">No tenants found</h3>
            <p className="text-sm text-[#6B7280]">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* Create Tenant Modal */}
      {showCreateModal && (
        <CreateTenantModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            // Refresh tenants list
          }}
        />
      )}
    </div>
  );
}