import { useNavigate } from 'react-router';
import { 
  CreditCard, 
  BookOpen, 
  Zap,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowLeft,
  Lock,
  MessageSquare,
  Mail,
  BarChart3,
  Cloud
} from 'lucide-react';

export default function ThirdPartyIntegrations() {
  const navigate = useNavigate();
  
  // TODO: Replace with actual user role from auth context
  const userRole = 'saas-admin'; // 'user' | 'tenant-admin' | 'host-admin' | 'saas-admin'
  
  // Check if user has permission to access system integrations
  const canAccessIntegrations = userRole === 'saas-admin' || userRole === 'host-admin';
  
  if (!canAccessIntegrations) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto mt-16">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <Lock className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-red-900 font-medium mb-2">Access Denied</h3>
                <p className="text-red-700">
                  You don't have access to this area. Third-party integrations are only accessible to platform administrators.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mock connection statuses (TODO: Replace with actual API data)
  const integrationStatus = {
    razorpay: { connected: true, lastSync: '2025-12-21 14:30', hasError: false },
    stripe: { connected: false, lastSync: null, hasError: false },
    'zoho-books': { connected: true, lastSync: '2025-12-21 12:15', hasError: false },
    tally: { connected: false, lastSync: null, hasError: false },
    quickbooks: { connected: false, lastSync: null, hasError: false },
    webhooks: { connected: true, lastSync: '2025-12-21 15:00', hasError: true },
  };

  const paymentGateways = [
    {
      id: 'razorpay',
      name: 'Razorpay',
      description: 'India\'s leading payment gateway for subscriptions, invoices, and instant refunds',
      icon: CreditCard,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      route: '/settings/system/integrations/razorpay',
      status: integrationStatus.razorpay,
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Global payment processing with support for subscriptions and multi-currency',
      icon: CreditCard,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
      route: '/settings/system/integrations/stripe',
      status: integrationStatus.stripe,
      comingSoon: true,
    },
  ];

  const accountingPlatforms = [
    {
      id: 'zoho-books',
      name: 'Zoho Books',
      description: 'Auto-sync invoices, payments, and tax records with Zoho Books',
      icon: BookOpen,
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-600',
      route: '/settings/system/integrations/zoho-books',
      status: integrationStatus['zoho-books'],
    },
    {
      id: 'tally',
      name: 'Tally',
      description: 'Sync invoices and payments with Tally accounting software',
      icon: BookOpen,
      iconBg: 'bg-red-50',
      iconColor: 'text-red-600',
      route: '/settings/system/integrations/tally',
      status: integrationStatus.tally,
      comingSoon: true,
    },
    {
      id: 'quickbooks',
      name: 'QuickBooks',
      description: 'Integrate with QuickBooks for automated bookkeeping and reconciliation',
      icon: BookOpen,
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600',
      route: '/settings/system/integrations/quickbooks',
      status: integrationStatus.quickbooks,
      comingSoon: true,
    },
  ];

  const automationTools = [
    {
      id: 'webhooks',
      name: 'Webhooks & Custom API',
      description: 'Push real-time data to external systems via webhooks or custom API endpoints',
      icon: Zap,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
      route: '/settings/system/integrations/webhooks',
      status: integrationStatus.webhooks,
    },
  ];

  const renderIntegrationCard = (integration: any) => (
    <div
      key={integration.id}
      className="relative bg-white border border-[#E5E7EB] rounded-lg p-6 hover:border-[#D9480F] transition-all"
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`w-10 h-10 rounded-lg ${integration.iconBg} flex items-center justify-center flex-shrink-0`}>
          <integration.icon className={`w-5 h-5 ${integration.iconColor}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-1">
            <h3 className="text-[#111827] font-medium">{integration.name}</h3>
            
            {integration.comingSoon ? (
              <span className="px-2 py-1 bg-[#F3F4F6] text-[#6B7280] text-xs font-medium rounded">
                Coming Soon
              </span>
            ) : (
              <>
                {integration.status?.connected && !integration.status?.hasError && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Connected
                  </span>
                )}
                {integration.status?.hasError && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-700 text-xs font-medium rounded">
                    <XCircle className="w-3.5 h-3.5" />
                    Error
                  </span>
                )}
              </>
            )}
          </div>
          
          <p className="text-[#6B7280] text-sm leading-relaxed mb-3">
            {integration.description}
          </p>

          {/* Last Sync Info */}
          {integration.status?.lastSync && !integration.comingSoon && (
            <p className="text-xs text-[#9CA3AF] mb-3">
              Last sync: {integration.status.lastSync}
            </p>
          )}

          {/* Actions */}
          {!integration.comingSoon && (
            <button
              onClick={() => navigate(integration.route)}
              className="text-sm text-[#D9480F] hover:text-[#C23D0D] font-medium transition-colors"
            >
              View Activity
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/settings/system')}
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#111827] mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to System Settings</span>
        </button>
        
        <h1 className="text-[#111827] mb-2">Third-Party Integrations</h1>
        <p className="text-[#6B7280]">
          Connect external services for payments, accounting, and automation
        </p>
      </div>

      {/* Warning Notice */}
      <div className="mb-8 bg-[#FFFBEB] border border-[#FCD34D] rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#D97706] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[#92400E] font-medium text-sm mb-1">System-Level Configuration</p>
            <p className="text-[#92400E] text-sm leading-relaxed">
              These integrations affect billing, payments, and compliance across all tenants. Only connect verified accounts and ensure credentials are kept secure.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Gateways Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded bg-blue-50 flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h2 className="text-[#111827] font-medium">Payment Gateways</h2>
          </div>
        </div>
        <p className="text-[#6B7280] text-sm mb-4">
          Process payments, subscriptions, and refunds
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {paymentGateways.map(renderIntegrationCard)}
        </div>
      </div>

      {/* Accounting & Bookkeeping Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded bg-green-50 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <h2 className="text-[#111827] font-medium">Accounting & Bookkeeping</h2>
          </div>
        </div>
        <p className="text-[#6B7280] text-sm mb-4">
          Sync invoices, payments, and financial records
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {accountingPlatforms.map(renderIntegrationCard)}
        </div>
      </div>

      {/* Automation & Data Sync Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded bg-purple-50 flex items-center justify-center">
            <Zap className="w-4 h-4 text-purple-600" />
          </div>
          <div>
            <h2 className="text-[#111827] font-medium">Automation & Data Sync</h2>
          </div>
        </div>
        <p className="text-[#6B7280] text-sm mb-4">
          Push data to external systems in real-time
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {automationTools.map(renderIntegrationCard)}
        </div>
      </div>
    </div>
  );
}