import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Plus,
  Percent,
  DollarSign,
  Calendar,
  Eye,
  Trash2,
  AlertCircle,
  CheckCircle,
  X,
} from 'lucide-react';
import { toast } from 'sonner';
import ApplyDiscountFlow from './ApplyDiscountFlow';
import IssueCreditFlow from './IssueCreditFlow';

// Mock discount data
const mockDiscounts = [
  {
    id: 'disc_001',
    tenantId: 'tn_acme',
    tenantName: 'Acme Corporation',
    type: 'percentage',
    value: 20,
    description: 'Q4 Loyalty Discount',
    status: 'active',
    appliedDate: '2024-10-01',
    expiryDate: '2024-12-31',
    totalSavings: 2400,
  },
  {
    id: 'disc_002',
    tenantId: 'tn_techstart',
    tenantName: 'TechStart Inc.',
    type: 'fixed',
    value: 500,
    description: 'Migration Credit',
    status: 'active',
    appliedDate: '2024-11-15',
    expiryDate: '2025-02-15',
    totalSavings: 1500,
  },
  {
    id: 'disc_003',
    tenantId: 'tn_fitlife',
    tenantName: 'FitLife Gym',
    type: 'percentage',
    value: 15,
    description: 'Annual Contract Discount',
    status: 'active',
    appliedDate: '2024-09-01',
    expiryDate: '2025-09-01',
    totalSavings: 1800,
  },
  {
    id: 'disc_004',
    tenantId: 'tn_brew',
    tenantName: 'Brew Coffee Co.',
    type: 'percentage',
    value: 10,
    description: 'Early Adopter',
    status: 'expired',
    appliedDate: '2024-01-01',
    expiryDate: '2024-06-30',
    totalSavings: 900,
  },
];

// Mock credit data
const mockCredits = [
  {
    id: 'cred_001',
    tenantId: 'tn_acme',
    tenantName: 'Acme Corporation',
    balance: 1200,
    issued: 2000,
    used: 800,
    issuedDate: '2024-11-01',
    expiryDate: '2025-11-01',
    reason: 'Service Downtime Compensation',
    status: 'active',
  },
  {
    id: 'cred_002',
    tenantId: 'tn_techstart',
    tenantName: 'TechStart Inc.',
    balance: 500,
    issued: 500,
    used: 0,
    issuedDate: '2024-12-01',
    expiryDate: '2025-06-01',
    reason: 'Onboarding Bonus',
    status: 'active',
  },
  {
    id: 'cred_003',
    tenantId: 'tn_fitlife',
    tenantName: 'FitLife Gym',
    balance: 0,
    issued: 1000,
    used: 1000,
    issuedDate: '2024-08-01',
    expiryDate: '2025-02-01',
    reason: 'Feature Beta Participation',
    status: 'depleted',
  },
  {
    id: 'cred_004',
    tenantId: 'tn_brew',
    tenantName: 'Brew Coffee Co.',
    balance: 300,
    issued: 800,
    used: 500,
    issuedDate: '2024-10-15',
    expiryDate: '2025-04-15',
    reason: 'Bug Report Reward',
    status: 'active',
  },
];

export default function AdminDiscountsCredits() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'discounts' | 'credits'>('discounts');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showApplyDiscountFlow, setShowApplyDiscountFlow] = useState(false);
  const [showIssueCreditFlow, setShowIssueCreditFlow] = useState(false);

  const filteredDiscounts = mockDiscounts.filter((discount) => {
    const matchesSearch =
      discount.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discount.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || discount.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredCredits = mockCredits.filter((credit) => {
    const matchesSearch = credit.tenantName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || credit.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApplyDiscount = () => {
    setShowApplyDiscountFlow(true);
  };

  const handleDiscountSuccess = () => {
    // Refresh data or update state
    console.log('Discount applied successfully');
  };

  const handleIssueCredit = () => {
    setShowIssueCreditFlow(true);
  };

  const handleCreditSuccess = () => {
    // Refresh data or update state
    console.log('Credit issued successfully');
  };

  const handleRevokeDiscount = (discount: typeof mockDiscounts[0]) => {
    toast.success(`Revoke discount for ${discount.tenantName}?`, {
      description: 'This action requires confirmation',
    });
  };

  const handleRevokeCredit = (credit: typeof mockCredits[0]) => {
    toast.success(`Revoke remaining credit for ${credit.tenantName}?`, {
      description: 'Unused balance will be forfeited',
    });
  };

  const totalActiveDiscounts = mockDiscounts.filter((d) => d.status === 'active').length;
  const totalDiscountSavings = mockDiscounts
    .filter((d) => d.status === 'active')
    .reduce((sum, d) => sum + d.totalSavings, 0);

  const totalActiveCredits = mockCredits.filter((c) => c.status === 'active').length;
  const totalCreditBalance = mockCredits
    .filter((c) => c.status === 'active')
    .reduce((sum, c) => sum + c.balance, 0);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-[#111827]">Discounts & Credits</h1>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                  SAAS ADMIN
                </span>
              </div>
              <p className="text-sm text-[#6B7280] mt-1">
                Controlled flexibility for pricing adjustments and account credits
              </p>
            </div>
            <div className="flex items-center gap-3">
              {activeTab === 'discounts' ? (
                <button
                  onClick={handleApplyDiscount}
                  className="flex items-center gap-2 px-4 h-[40px] bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] transition-colors text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Apply Discount
                </button>
              ) : (
                <button
                  onClick={handleIssueCredit}
                  className="flex items-center gap-2 px-4 h-[40px] bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] transition-colors text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Issue Credit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <Percent className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#6B7280]">Active Discounts</p>
                <p className="text-xl font-semibold text-[#111827]">{totalActiveDiscounts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#6B7280]">Total Savings</p>
                <p className="text-xl font-semibold text-[#111827]">
                  ${(totalDiscountSavings / 1000).toFixed(1)}k
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#6B7280]">Active Credits</p>
                <p className="text-xl font-semibold text-[#111827]">{totalActiveCredits}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#6B7280]">Credit Balance</p>
                <p className="text-xl font-semibold text-[#111827]">
                  ${(totalCreditBalance / 1000).toFixed(1)}k
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          <div className="border-b border-[#E5E7EB]">
            <div className="flex">
              <button
                onClick={() => setActiveTab('discounts')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'discounts'
                    ? 'text-[#D9480F] border-b-2 border-[#D9480F]'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                Discounts ({mockDiscounts.length})
              </button>
              <button
                onClick={() => setActiveTab('credits')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'credits'
                    ? 'text-[#D9480F] border-b-2 border-[#D9480F]'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                Credits ({mockCredits.length})
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="p-4 border-b border-[#E5E7EB]">
            <div className="flex flex-wrap gap-3">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                <input
                  type="text"
                  placeholder="Search by tenant..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 h-[40px] border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-[40px] px-3 pr-8 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="depleted">Depleted</option>
              </select>
            </div>
          </div>

          {/* Discounts Tab */}
          {activeTab === 'discounts' && (
            <div className="divide-y divide-[#E5E7EB]">
              {filteredDiscounts.map((discount) => (
                <div key={discount.id} className="p-4 hover:bg-[#F9FAFB] transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-[#111827]">{discount.tenantName}</p>
                        {discount.status === 'active' ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-md border border-green-200 bg-green-50 text-green-700 text-xs font-medium">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-md border border-gray-200 bg-gray-50 text-gray-600 text-xs font-medium">
                            Expired
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[#6B7280] mb-2">{discount.description}</p>
                      <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                        <div className="flex items-center gap-1">
                          <Percent className="w-3 h-3" />
                          {discount.type === 'percentage'
                            ? `${discount.value}% off`
                            : `$${discount.value} off`}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Expires {new Date(discount.expiryDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          ${discount.totalSavings.toLocaleString()} saved
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 text-[#6B7280] hover:text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {discount.status === 'active' && (
                        <button
                          onClick={() => handleRevokeDiscount(discount)}
                          className="p-2 text-[#6B7280] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Revoke Discount"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {filteredDiscounts.length === 0 && (
                <div className="p-12 text-center">
                  <p className="text-[#6B7280]">No discounts found</p>
                </div>
              )}
            </div>
          )}

          {/* Credits Tab */}
          {activeTab === 'credits' && (
            <div className="divide-y divide-[#E5E7EB]">
              {filteredCredits.map((credit) => (
                <div key={credit.id} className="p-4 hover:bg-[#F9FAFB] transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-[#111827]">{credit.tenantName}</p>
                        {credit.status === 'active' ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-md border border-green-200 bg-green-50 text-green-700 text-xs font-medium">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-md border border-gray-200 bg-gray-50 text-gray-600 text-xs font-medium">
                            Depleted
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[#6B7280] mb-2">{credit.reason}</p>
                      <div className="flex items-center gap-4 mb-3">
                        <div className="text-xs">
                          <span className="text-[#6B7280]">Balance: </span>
                          <span className="font-medium text-[#111827]">${credit.balance}</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-[#6B7280]">Issued: </span>
                          <span className="font-medium text-[#111827]">${credit.issued}</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-[#6B7280]">Used: </span>
                          <span className="font-medium text-[#111827]">${credit.used}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Expires {new Date(credit.expiryDate).toLocaleDateString()}
                        </div>
                      </div>
                      {/* Usage Bar */}
                      <div className="mt-3">
                        <div className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-600 transition-all"
                            style={{ width: `${(credit.used / credit.issued) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 text-[#6B7280] hover:text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                        title="View Usage"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {credit.status === 'active' && credit.balance > 0 && (
                        <button
                          onClick={() => handleRevokeCredit(credit)}
                          className="p-2 text-[#6B7280] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Revoke Credit"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {filteredCredits.length === 0 && (
                <div className="p-12 text-center">
                  <p className="text-[#6B7280]">No credits found</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Apply Discount Flow */}
      <ApplyDiscountFlow
        isOpen={showApplyDiscountFlow}
        onClose={() => setShowApplyDiscountFlow(false)}
        onSuccess={handleDiscountSuccess}
      />

      {/* Issue Credit Flow */}
      <IssueCreditFlow
        isOpen={showIssueCreditFlow}
        onClose={() => setShowIssueCreditFlow(false)}
        onSuccess={handleCreditSuccess}
      />
    </div>
  );
}