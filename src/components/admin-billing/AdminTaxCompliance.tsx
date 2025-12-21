import { useState } from 'react';
import {
  Globe,
  Shield,
  CheckCircle,
  AlertCircle,
  Info,
  Edit,
  FileText,
} from 'lucide-react';
import { toast } from 'sonner';

// Mock tax rules data
const mockTaxRules = [
  {
    id: 'tax_us',
    region: 'United States',
    country: 'US',
    taxType: 'Sales Tax',
    rate: 0,
    note: 'Varies by state (0-10.5%)',
    status: 'active',
    lastUpdated: '2024-11-15',
  },
  {
    id: 'tax_uk',
    region: 'United Kingdom',
    country: 'UK',
    taxType: 'VAT',
    rate: 20,
    note: 'Standard VAT rate',
    status: 'active',
    lastUpdated: '2024-10-01',
  },
  {
    id: 'tax_eu',
    region: 'European Union',
    country: 'EU',
    taxType: 'VAT',
    rate: 0,
    note: 'Varies by country (17-27%)',
    status: 'active',
    lastUpdated: '2024-09-20',
  },
  {
    id: 'tax_ca',
    region: 'Canada',
    country: 'CA',
    taxType: 'GST/HST',
    rate: 5,
    note: 'Federal GST, provincial rates vary',
    status: 'active',
    lastUpdated: '2024-08-10',
  },
  {
    id: 'tax_au',
    region: 'Australia',
    country: 'AU',
    taxType: 'GST',
    rate: 10,
    note: 'Goods and Services Tax',
    status: 'active',
    lastUpdated: '2024-07-05',
  },
  {
    id: 'tax_in',
    region: 'India',
    country: 'IN',
    taxType: 'GST',
    rate: 18,
    note: 'Standard GST rate for SaaS',
    status: 'active',
    lastUpdated: '2024-11-20',
  },
];

// Mock tenant tax validation data
const mockTenantTaxValidation = [
  {
    id: 'tn_acme',
    tenantName: 'Acme Corporation',
    country: 'US',
    taxIdType: 'EIN',
    taxId: '12-3456789',
    validationStatus: 'verified',
    validatedDate: '2024-10-15',
  },
  {
    id: 'tn_techstart',
    tenantName: 'TechStart Inc.',
    country: 'UK',
    taxIdType: 'VAT',
    taxId: 'GB123456789',
    validationStatus: 'verified',
    validatedDate: '2024-11-01',
  },
  {
    id: 'tn_fitlife',
    tenantName: 'FitLife Gym',
    country: 'CA',
    taxIdType: 'GST',
    taxId: '123456789RT0001',
    validationStatus: 'pending',
    validatedDate: null,
  },
  {
    id: 'tn_brew',
    tenantName: 'Brew Coffee Co.',
    country: 'AU',
    taxIdType: 'ABN',
    taxId: '12345678901',
    validationStatus: 'failed',
    validatedDate: '2024-12-01',
    failureReason: 'Invalid ABN format',
  },
  {
    id: 'tn_global',
    tenantName: 'Global Retail Ltd.',
    country: 'IN',
    taxIdType: 'GSTIN',
    taxId: '27AAPFU0939F1ZV',
    validationStatus: 'verified',
    validatedDate: '2024-11-10',
  },
];

// Mock invoice tax breakdown
const mockInvoiceTaxBreakdown = {
  invoiceNumber: 'INV-2024-001234',
  tenantName: 'Acme Corporation',
  country: 'US',
  state: 'California',
  subtotal: 1200,
  taxRate: 9.5,
  taxAmount: 114,
  total: 1314,
  taxBreakdown: [
    { type: 'State Sales Tax', rate: 7.25, amount: 87 },
    { type: 'Local Sales Tax', rate: 2.25, amount: 27 },
  ],
};

export default function AdminTaxCompliance() {
  const [activeTab, setActiveTab] = useState<'rules' | 'validation' | 'preview'>('rules');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTaxRules = mockTaxRules.filter((rule) =>
    rule.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredValidations = mockTenantTaxValidation.filter((validation) =>
    validation.tenantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditTaxRule = (rule: typeof mockTaxRules[0]) => {
    toast.success(`Edit tax rule for ${rule.region}`, {
      description: 'Finance role required',
    });
  };

  const handleRetryValidation = (tenant: typeof mockTenantTaxValidation[0]) => {
    toast.success(`Retry validation for ${tenant.tenantName}`, {
      description: 'Tax ID will be re-validated',
    });
  };

  const verifiedCount = mockTenantTaxValidation.filter((v) => v.validationStatus === 'verified').length;
  const pendingCount = mockTenantTaxValidation.filter((v) => v.validationStatus === 'pending').length;
  const failedCount = mockTenantTaxValidation.filter((v) => v.validationStatus === 'failed').length;

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-[#111827]">Tax & Compliance</h1>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                  SAAS ADMIN
                </span>
              </div>
              <p className="text-sm text-[#6B7280] mt-1">
                Regional tax configuration and validation status
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-xs text-blue-700 font-medium">Finance Role Required to Edit</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#6B7280]">Tax Regions</p>
                <p className="text-xl font-semibold text-[#111827]">{mockTaxRules.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#6B7280]">Verified</p>
                <p className="text-xl font-semibold text-[#111827]">{verifiedCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#6B7280]">Pending</p>
                <p className="text-xl font-semibold text-[#111827]">{pendingCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#6B7280]">Failed</p>
                <p className="text-xl font-semibold text-[#111827]">{failedCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          <div className="border-b border-[#E5E7EB]">
            <div className="flex">
              <button
                onClick={() => setActiveTab('rules')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'rules'
                    ? 'text-[#D9480F] border-b-2 border-[#D9480F]'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                Tax Rules by Region
              </button>
              <button
                onClick={() => setActiveTab('validation')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'validation'
                    ? 'text-[#D9480F] border-b-2 border-[#D9480F]'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                Tax ID Validation
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'preview'
                    ? 'text-[#D9480F] border-b-2 border-[#D9480F]'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                Invoice Tax Preview
              </button>
            </div>
          </div>

          {/* Tax Rules Tab */}
          {activeTab === 'rules' && (
            <div>
              <div className="p-4 border-b border-[#E5E7EB]">
                <input
                  type="text"
                  placeholder="Search by region or country..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 h-[40px] border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                        Region
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                        Tax Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                        Rate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                        Notes
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                        Last Updated
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-[#6B7280] uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]">
                    {filteredTaxRules.map((rule) => (
                      <tr key={rule.id} className="hover:bg-[#F9FAFB] transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-[#6B7280]" />
                            <div>
                              <p className="font-medium text-[#111827]">{rule.region}</p>
                              <p className="text-xs text-[#6B7280]">{rule.country}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-[#111827]">{rule.taxType}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-[#111827]">
                            {rule.rate > 0 ? `${rule.rate}%` : 'Variable'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-start gap-2">
                            <Info className="w-4 h-4 text-[#6B7280] mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-[#6B7280]">{rule.note}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-[#6B7280]">
                            {new Date(rule.lastUpdated).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end">
                            <button
                              onClick={() => handleEditTaxRule(rule)}
                              className="p-2 text-[#6B7280] hover:text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                              title="Edit (Finance Role Required)"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tax Validation Tab */}
          {activeTab === 'validation' && (
            <div>
              <div className="p-4 border-b border-[#E5E7EB]">
                <input
                  type="text"
                  placeholder="Search by tenant name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 h-[40px] border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
                />
              </div>
              <div className="divide-y divide-[#E5E7EB]">
                {filteredValidations.map((validation) => (
                  <div key={validation.id} className="p-4 hover:bg-[#F9FAFB] transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-medium text-[#111827]">{validation.tenantName}</p>
                          {validation.validationStatus === 'verified' && (
                            <span className="inline-flex items-center px-2 py-1 rounded-md border border-green-200 bg-green-50 text-green-700 text-xs font-medium">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </span>
                          )}
                          {validation.validationStatus === 'pending' && (
                            <span className="inline-flex items-center px-2 py-1 rounded-md border border-orange-200 bg-orange-50 text-orange-700 text-xs font-medium">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Pending
                            </span>
                          )}
                          {validation.validationStatus === 'failed' && (
                            <span className="inline-flex items-center px-2 py-1 rounded-md border border-red-200 bg-red-50 text-red-700 text-xs font-medium">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Failed
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                          <div>
                            <p className="text-xs text-[#6B7280]">Country</p>
                            <p className="text-[#111827]">{validation.country}</p>
                          </div>
                          <div>
                            <p className="text-xs text-[#6B7280]">Tax ID Type</p>
                            <p className="text-[#111827]">{validation.taxIdType}</p>
                          </div>
                          <div>
                            <p className="text-xs text-[#6B7280]">Tax ID</p>
                            <p className="text-[#111827] font-mono">{validation.taxId}</p>
                          </div>
                          <div>
                            <p className="text-xs text-[#6B7280]">Validated</p>
                            <p className="text-[#111827]">
                              {validation.validatedDate
                                ? new Date(validation.validatedDate).toLocaleDateString()
                                : '-'}
                            </p>
                          </div>
                        </div>
                        {validation.failureReason && (
                          <div className="flex items-start gap-2 mt-2 p-2 bg-red-50 rounded-lg">
                            <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                            <p className="text-sm text-red-700">{validation.failureReason}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {validation.validationStatus === 'failed' && (
                          <button
                            onClick={() => handleRetryValidation(validation)}
                            className="px-3 py-2 bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] text-sm font-medium"
                          >
                            Retry
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Invoice Tax Preview Tab */}
          {activeTab === 'preview' && (
            <div className="p-6">
              <div className="max-w-2xl mx-auto">
                <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-6">
                  <div className="flex items-start gap-3 mb-6">
                    <FileText className="w-6 h-6 text-[#6B7280]" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#111827] mb-1">
                        {mockInvoiceTaxBreakdown.invoiceNumber}
                      </h3>
                      <p className="text-sm text-[#6B7280]">
                        {mockInvoiceTaxBreakdown.tenantName}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#6B7280]">Country</span>
                      <span className="font-medium text-[#111827]">
                        {mockInvoiceTaxBreakdown.country}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#6B7280]">State</span>
                      <span className="font-medium text-[#111827]">
                        {mockInvoiceTaxBreakdown.state}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-[#E5E7EB] pt-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-[#6B7280]">Subtotal</span>
                      <span className="text-sm font-medium text-[#111827]">
                        ${mockInvoiceTaxBreakdown.subtotal.toFixed(2)}
                      </span>
                    </div>

                    {mockInvoiceTaxBreakdown.taxBreakdown.map((tax, index) => (
                      <div key={index} className="flex items-center justify-between mb-2">
                        <span className="text-sm text-[#6B7280]">
                          {tax.type} ({tax.rate}%)
                        </span>
                        <span className="text-sm font-medium text-[#111827]">
                          ${tax.amount.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t-2 border-[#E5E7EB] pt-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#111827]">Total</span>
                      <span className="text-xl font-semibold text-[#111827]">
                        ${mockInvoiceTaxBreakdown.total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-blue-700">
                        This is a preview of how tax is calculated and displayed on invoices.
                        Actual tax amounts are calculated in real-time based on current regional rules.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
