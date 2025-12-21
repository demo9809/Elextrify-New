import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Package,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Copy,
  Archive,
  Plus,
  X,
  ArrowUpDown
} from 'lucide-react';
import { 
  mockEditions,
  getTierLabel,
  getTierColor,
  getStatusLabel,
  getStatusColor,
  calculateYearlyDiscount,
  getCurrencySymbol,
  type Edition,
  type TierLevel,
  type EditionStatus
} from '../../data/mockEditions';

export default function EditionManagement() {
  const navigate = useNavigate();
  const [editions] = useState<Edition[]>(mockEditions);
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState<TierLevel | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<EditionStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'tier'>('name');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredEditions = editions.filter(edition => {
    const matchesSearch = 
      edition.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      edition.customerDescription.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTier = tierFilter === 'all' || edition.tierLevel === tierFilter;
    const matchesStatus = statusFilter === 'all' || edition.status === statusFilter;
    
    return matchesSearch && matchesTier && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'price') return a.monthlyPrice - b.monthlyPrice;
    if (sortBy === 'tier') {
      const tierOrder = { basic: 1, standard: 2, ultimate: 3, custom: 4 };
      return tierOrder[a.tierLevel] - tierOrder[b.tierLevel];
    }
    return 0;
  });

  const handleEditionClick = (editionId: string) => {
    navigate(`/editions/${editionId}`);
  };

  const handleDuplicateEdition = (editionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/editions/new?duplicate=${editionId}`);
    setActiveDropdown(null);
  };

  const hasActiveFilters = tierFilter !== 'all' || statusFilter !== 'all';

  const clearFilters = () => {
    setTierFilter('all');
    setStatusFilter('all');
  };

  return (
    <div className="flex flex-col h-full bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-[#111827] mb-2">Edition Management</h1>
            <p className="text-[#6B7280]">
              Manage SaaS packages, pricing tiers, and feature access
            </p>
          </div>
          <button
            onClick={() => navigate('/editions/new')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 h-[44px] bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Edition</span>
          </button>
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
              placeholder="Search by edition name or description..."
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
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value as TierLevel | 'all')}
              className="h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            >
              <option value="all">All Tiers</option>
              <option value="basic">Basic</option>
              <option value="standard">Standard</option>
              <option value="ultimate">Ultimate</option>
              <option value="custom">Custom</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as EditionStatus | 'all')}
              className="h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="deprecated">Deprecated</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'tier')}
              className="h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="tier">Sort by Tier</option>
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
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value as TierLevel | 'all')}
              className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            >
              <option value="all">All Tiers</option>
              <option value="basic">Basic</option>
              <option value="standard">Standard</option>
              <option value="ultimate">Ultimate</option>
              <option value="custom">Custom</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as EditionStatus | 'all')}
              className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="deprecated">Deprecated</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'tier')}
              className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="tier">Sort by Tier</option>
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

      {/* Results Count */}
      <div className="px-4 sm:px-6 lg:px-8 py-3 border-b border-[#E5E7EB] bg-white">
        <p className="text-sm text-[#6B7280]">
          Showing <span className="font-medium text-[#111827]">{filteredEditions.length}</span> of{' '}
          <span className="font-medium text-[#111827]">{editions.length}</span> editions
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block flex-1 overflow-auto">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                    Edition Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                    Tier Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                    Monthly Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                    Yearly Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                    Screen Limit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                    Storage Limit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                    Tenants Using
                  </th>
                  <th className="w-12 px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#E5E7EB]">
                {filteredEditions.map((edition) => {
                  const discount = calculateYearlyDiscount(edition.monthlyPrice, edition.yearlyPrice);
                  
                  return (
                    <tr
                      key={edition.id}
                      className="hover:bg-[#F9FAFB] cursor-pointer transition-colors"
                      onClick={() => handleEditionClick(edition.id)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D9480F] to-[#C23D0D] flex items-center justify-center flex-shrink-0">
                            <Package className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-[#111827]">{edition.name}</p>
                            <p className="text-sm text-[#6B7280] line-clamp-1">{edition.customerDescription}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium ${getTierColor(edition.tierLevel)}`}>
                          {getTierLabel(edition.tierLevel)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-[#111827]">{getCurrencySymbol(edition.currency)}{edition.monthlyPrice}</p>
                        <p className="text-xs text-[#6B7280]">per month</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-[#111827]">{getCurrencySymbol(edition.currency)}{edition.yearlyPrice}</p>
                        <p className="text-xs text-[#16A34A]">{discount}% discount</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#111827]">
                        {edition.usageLimits.maxScreens === 'unlimited' ? 'Unlimited' : edition.usageLimits.maxScreens}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#111827]">
                        {edition.usageLimits.maxStorageGB === 'unlimited' ? 'Unlimited' : `${edition.usageLimits.maxStorageGB} GB`}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium ${getStatusColor(edition.status)}`}>
                          {getStatusLabel(edition.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-[#111827]">{edition.tenantsUsingCount}</span>
                      </td>
                      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <div className="relative">
                          <button
                            onClick={() => setActiveDropdown(activeDropdown === edition.id ? null : edition.id)}
                            className="w-8 h-8 flex items-center justify-center text-[#6B7280] hover:bg-[#F9FAFB] rounded-lg transition-colors"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                          
                          {activeDropdown === edition.id && (
                            <>
                              <div 
                                className="fixed inset-0 z-10" 
                                onClick={() => setActiveDropdown(null)}
                              />
                              <div className="absolute right-0 mt-1 w-48 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-20 py-1">
                                <button
                                  onClick={() => handleEditionClick(edition.id)}
                                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#111827] hover:bg-[#F9FAFB] transition-colors"
                                >
                                  <Eye className="w-4 h-4 text-[#6B7280]" />
                                  <span>View Details</span>
                                </button>
                                <button
                                  onClick={() => navigate(`/editions/${edition.id}/edit`)}
                                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#111827] hover:bg-[#F9FAFB] transition-colors"
                                >
                                  <Edit className="w-4 h-4 text-[#6B7280]" />
                                  <span>Edit Edition</span>
                                </button>
                                <button
                                  onClick={(e) => handleDuplicateEdition(edition.id, e)}
                                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#111827] hover:bg-[#F9FAFB] transition-colors"
                                >
                                  <Copy className="w-4 h-4 text-[#6B7280]" />
                                  <span>Duplicate</span>
                                </button>
                                {edition.status === 'active' && (
                                  <>
                                    <div className="border-t border-[#E5E7EB] my-1" />
                                    <button
                                      disabled={edition.tenantsUsingCount > 0}
                                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#6B7280] hover:bg-[#F9FAFB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                      title={edition.tenantsUsingCount > 0 ? 'Cannot deprecate - edition is in use' : ''}
                                    >
                                      <Archive className="w-4 h-4" />
                                      <span>Deprecate</span>
                                    </button>
                                  </>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Mobile Card List */}
      <div className="lg:hidden flex-1 overflow-auto px-4 py-4 space-y-4">
        {filteredEditions.map((edition) => {
          const discount = calculateYearlyDiscount(edition.monthlyPrice, edition.yearlyPrice);
          
          return (
            <div
              key={edition.id}
              onClick={() => handleEditionClick(edition.id)}
              className="bg-white border border-[#E5E7EB] rounded-lg p-4 cursor-pointer hover:border-[#D9480F] transition-colors"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D9480F] to-[#C23D0D] flex items-center justify-center flex-shrink-0">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#111827] truncate">{edition.name}</p>
                    <p className="text-sm text-[#6B7280] line-clamp-1">{edition.customerDescription}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDropdown(activeDropdown === edition.id ? null : edition.id);
                  }}
                  className="w-8 h-8 flex items-center justify-center text-[#6B7280] hover:bg-[#F9FAFB] rounded-lg transition-colors flex-shrink-0"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium ${getTierColor(edition.tierLevel)}`}>
                  {getTierLabel(edition.tierLevel)}
                </span>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium ${getStatusColor(edition.status)}`}>
                  {getStatusLabel(edition.status)}
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E5E7EB]">
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Monthly Price</p>
                  <p className="font-medium text-[#111827]">{getCurrencySymbol(edition.currency)}{edition.monthlyPrice}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Yearly Price</p>
                  <p className="font-medium text-[#111827]">{getCurrencySymbol(edition.currency)}{edition.yearlyPrice}</p>
                  <p className="text-xs text-[#16A34A]">{discount}% off</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Screen Limit</p>
                  <p className="font-medium text-[#111827]">
                    {edition.usageLimits.maxScreens === 'unlimited' ? 'Unlimited' : edition.usageLimits.maxScreens}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Tenants Using</p>
                  <p className="font-medium text-[#111827]">{edition.tenantsUsingCount}</p>
                </div>
              </div>

              {/* Dropdown Menu */}
              {activeDropdown === edition.id && (
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
                        handleEditionClick(edition.id);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#111827] hover:bg-[#F9FAFB] transition-colors"
                    >
                      <Eye className="w-4 h-4 text-[#6B7280]" />
                      <span>View Details</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/editions/${edition.id}/edit`);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#111827] hover:bg-[#F9FAFB] transition-colors"
                    >
                      <Edit className="w-4 h-4 text-[#6B7280]" />
                      <span>Edit Edition</span>
                    </button>
                    <button
                      onClick={(e) => handleDuplicateEdition(edition.id, e)}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#111827] hover:bg-[#F9FAFB] transition-colors"
                    >
                      <Copy className="w-4 h-4 text-[#6B7280]" />
                      <span>Duplicate</span>
                    </button>
                    {edition.status === 'active' && (
                      <>
                        <div className="border-t border-[#E5E7EB] my-1" />
                        <button
                          onClick={(e) => e.stopPropagation()}
                          disabled={edition.tenantsUsingCount > 0}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#6B7280] hover:bg-[#F9FAFB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Archive className="w-4 h-4" />
                          <span>Deprecate</span>
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}

        {/* Empty State */}
        {filteredEditions.length === 0 && (
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-8 text-center">
            <Package className="w-12 h-12 text-[#9CA3AF] mx-auto mb-3" />
            <h3 className="text-[#111827] font-medium mb-1">No editions found</h3>
            <p className="text-sm text-[#6B7280]">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}