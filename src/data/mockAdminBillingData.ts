export interface RevenueMetrics {
  mrr: number;
  arr: number;
  activeSubscriptions: number;
  trials: number;
  churnRate: number;
  periodStart: string;
  periodEnd: string;
}

export interface TenantBilling {
  id: string;
  tenantName: string;
  tenantId: string;
  edition: string;
  editionId: string;
  billingCycle: 'monthly' | 'yearly';
  amount: number;
  currency: string;
  status: 'active' | 'trial' | 'past-due' | 'suspended' | 'cancelled';
  lastPaymentDate?: string;
  nextInvoiceDate: string;
  subscriptionStartDate: string;
  autoRenew: boolean;
  paymentMethod?: string;
  trialEndsAt?: string;
}

export interface PaymentAttempt {
  id: string;
  invoiceId: string;
  attemptDate: string;
  amount: number;
  currency: string;
  status: 'success' | 'failed' | 'pending';
  failureReason?: string;
  paymentMethod?: string;
  gatewayResponse?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  tenantId: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'failed' | 'refunded' | 'void';
  issuedDate: string;
  dueDate: string;
  paidDate?: string;
  lineItems: InvoiceLineItem[];
  paymentAttempts: PaymentAttempt[];
  notes?: string;
}

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  type: 'subscription' | 'overage' | 'credit' | 'discount';
}

export interface BillingAuditLog {
  id: string;
  timestamp: string;
  action: string;
  performedBy: string;
  performedByRole: 'super-admin' | 'finance';
  tenantId: string;
  tenantName: string;
  previousValue?: string;
  newValue?: string;
  details: string;
  ipAddress: string;
}

export interface AdminBillingData {
  revenueMetrics: RevenueMetrics;
  tenantBillings: TenantBilling[];
  invoices: Invoice[];
  auditLogs: BillingAuditLog[];
}

export const mockAdminBillingData: AdminBillingData = {
  revenueMetrics: {
    mrr: 12450,
    arr: 149400,
    activeSubscriptions: 48,
    trials: 12,
    churnRate: 3.2,
    periodStart: '2024-12-01T00:00:00Z',
    periodEnd: '2024-12-31T23:59:59Z',
  },
  tenantBillings: [
    {
      id: 'tb1',
      tenantName: 'Acme Corporation',
      tenantId: 't1',
      edition: 'Enterprise',
      editionId: '3',
      billingCycle: 'yearly',
      amount: 4790,
      currency: 'USD',
      status: 'active',
      lastPaymentDate: '2024-11-15T10:30:00Z',
      nextInvoiceDate: '2025-11-15T00:00:00Z',
      subscriptionStartDate: '2023-11-15T00:00:00Z',
      autoRenew: true,
      paymentMethod: 'VISA ••••4242',
    },
    {
      id: 'tb2',
      tenantName: 'TechStart Inc.',
      tenantId: 't2',
      edition: 'Professional',
      editionId: '2',
      billingCycle: 'monthly',
      amount: 149,
      currency: 'USD',
      status: 'active',
      lastPaymentDate: '2024-12-01T08:15:00Z',
      nextInvoiceDate: '2025-01-01T00:00:00Z',
      subscriptionStartDate: '2024-06-01T00:00:00Z',
      autoRenew: true,
      paymentMethod: 'MC ••••8888',
    },
    {
      id: 'tb3',
      tenantName: 'Global Retail Co.',
      tenantId: 't3',
      edition: 'Enterprise',
      editionId: '3',
      billingCycle: 'monthly',
      amount: 499,
      currency: 'USD',
      status: 'active',
      lastPaymentDate: '2024-12-05T14:22:00Z',
      nextInvoiceDate: '2025-01-05T00:00:00Z',
      subscriptionStartDate: '2024-01-05T00:00:00Z',
      autoRenew: true,
      paymentMethod: 'AMEX ••••1005',
    },
    {
      id: 'tb4',
      tenantName: 'Startup Labs',
      tenantId: 't4',
      edition: 'Starter',
      editionId: '1',
      billingCycle: 'monthly',
      amount: 49,
      currency: 'USD',
      status: 'trial',
      nextInvoiceDate: '2025-01-15T00:00:00Z',
      subscriptionStartDate: '2024-12-01T00:00:00Z',
      autoRenew: true,
      trialEndsAt: '2025-01-01T00:00:00Z',
    },
    {
      id: 'tb5',
      tenantName: 'Digital Marketing Pro',
      tenantId: 't5',
      edition: 'Professional',
      editionId: '2',
      billingCycle: 'yearly',
      amount: 1430,
      currency: 'USD',
      status: 'active',
      lastPaymentDate: '2024-09-20T11:45:00Z',
      nextInvoiceDate: '2025-09-20T00:00:00Z',
      subscriptionStartDate: '2023-09-20T00:00:00Z',
      autoRenew: true,
      paymentMethod: 'VISA ••••5678',
    },
    {
      id: 'tb6',
      tenantName: 'Beta Testing Corp',
      tenantId: 't6',
      edition: 'Professional',
      editionId: '2',
      billingCycle: 'monthly',
      amount: 149,
      currency: 'USD',
      status: 'past-due',
      lastPaymentDate: '2024-10-12T09:30:00Z',
      nextInvoiceDate: '2024-12-12T00:00:00Z',
      subscriptionStartDate: '2024-03-12T00:00:00Z',
      autoRenew: true,
      paymentMethod: 'VISA ••••9999',
    },
    {
      id: 'tb7',
      tenantName: 'Innovation Hub',
      tenantId: 't7',
      edition: 'Starter',
      editionId: '1',
      billingCycle: 'monthly',
      amount: 49,
      currency: 'USD',
      status: 'suspended',
      lastPaymentDate: '2024-08-05T16:20:00Z',
      nextInvoiceDate: '2024-11-05T00:00:00Z',
      subscriptionStartDate: '2024-02-05T00:00:00Z',
      autoRenew: false,
      paymentMethod: 'MC ••••3333',
    },
  ],
  invoices: [
    {
      id: 'inv1',
      invoiceNumber: 'INV-2024-001',
      tenantId: 't1',
      amount: 4790.00,
      currency: 'USD',
      status: 'paid',
      issuedDate: '2024-11-01T00:00:00Z',
      dueDate: '2024-11-15T00:00:00Z',
      paidDate: '2024-11-15T10:30:00Z',
      lineItems: [
        {
          description: 'Enterprise Plan - Yearly',
          quantity: 1,
          unitPrice: 4790,
          amount: 4790,
          type: 'subscription',
        },
      ],
      paymentAttempts: [
        {
          id: 'pa1',
          invoiceId: 'inv1',
          attemptDate: '2024-11-15T10:30:00Z',
          amount: 4790,
          currency: 'USD',
          status: 'success',
          paymentMethod: 'VISA ••••4242',
        },
      ],
    },
    {
      id: 'inv2',
      invoiceNumber: 'INV-2024-002',
      tenantId: 't6',
      amount: 149.00,
      currency: 'USD',
      status: 'failed',
      issuedDate: '2024-11-01T00:00:00Z',
      dueDate: '2024-11-12T00:00:00Z',
      lineItems: [
        {
          description: 'Professional Plan - Monthly',
          quantity: 1,
          unitPrice: 149,
          amount: 149,
          type: 'subscription',
        },
      ],
      paymentAttempts: [
        {
          id: 'pa2',
          invoiceId: 'inv2',
          attemptDate: '2024-11-12T00:00:00Z',
          amount: 149,
          currency: 'USD',
          status: 'failed',
          failureReason: 'Insufficient funds',
          paymentMethod: 'VISA ••••9999',
          gatewayResponse: 'decline_insufficient_funds',
        },
        {
          id: 'pa3',
          invoiceId: 'inv2',
          attemptDate: '2024-11-19T00:00:00Z',
          amount: 149,
          currency: 'USD',
          status: 'failed',
          failureReason: 'Card expired',
          paymentMethod: 'VISA ••••9999',
          gatewayResponse: 'decline_card_expired',
        },
      ],
    },
  ],
  auditLogs: [
    {
      id: 'log1',
      timestamp: '2024-12-20T15:30:00Z',
      action: 'Subscription Suspended',
      performedBy: 'admin@platform.com',
      performedByRole: 'super-admin',
      tenantId: 't7',
      tenantName: 'Innovation Hub',
      previousValue: 'active',
      newValue: 'suspended',
      details: 'Suspended due to repeated payment failures',
      ipAddress: '192.168.1.100',
    },
    {
      id: 'log2',
      timestamp: '2024-12-19T10:15:00Z',
      action: 'Payment Retry Triggered',
      performedBy: 'finance@platform.com',
      performedByRole: 'finance',
      tenantId: 't6',
      tenantName: 'Beta Testing Corp',
      details: 'Manual payment retry for invoice INV-2024-002',
      ipAddress: '192.168.1.101',
    },
    {
      id: 'log3',
      timestamp: '2024-12-18T14:22:00Z',
      action: 'Edition Changed',
      performedBy: 'admin@platform.com',
      performedByRole: 'super-admin',
      tenantId: 't2',
      tenantName: 'TechStart Inc.',
      previousValue: 'Starter',
      newValue: 'Professional',
      details: 'Upgraded from Starter to Professional plan',
      ipAddress: '192.168.1.100',
    },
    {
      id: 'log4',
      timestamp: '2024-12-17T09:45:00Z',
      action: 'Credit Applied',
      performedBy: 'admin@platform.com',
      performedByRole: 'super-admin',
      tenantId: 't3',
      tenantName: 'Global Retail Co.',
      details: 'Applied $50 credit for service disruption',
      ipAddress: '192.168.1.100',
    },
    {
      id: 'log5',
      timestamp: '2024-12-16T11:30:00Z',
      action: 'Free Period Granted',
      performedBy: 'admin@platform.com',
      performedByRole: 'super-admin',
      tenantId: 't4',
      tenantName: 'Startup Labs',
      details: 'Extended trial period by 30 days',
      ipAddress: '192.168.1.100',
    },
  ],
};

export const formatCurrency = (amount: number, currency: string): string => {
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
  };
  
  return `${symbols[currency] || currency}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    active: 'bg-green-50 text-green-700 border-green-200',
    trial: 'bg-blue-50 text-blue-700 border-blue-200',
    'past-due': 'bg-orange-50 text-orange-700 border-orange-200',
    suspended: 'bg-red-50 text-red-700 border-red-200',
    cancelled: 'bg-gray-50 text-gray-700 border-gray-200',
    paid: 'bg-green-50 text-green-700 border-green-200',
    pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    failed: 'bg-red-50 text-red-700 border-red-200',
    refunded: 'bg-gray-50 text-gray-700 border-gray-200',
    void: 'bg-gray-50 text-gray-700 border-gray-200',
    success: 'bg-green-50 text-green-700 border-green-200',
  };
  return colors[status] || 'bg-gray-50 text-gray-700 border-gray-200';
};

export const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    'active': 'Active',
    'trial': 'Trial',
    'past-due': 'Past Due',
    'suspended': 'Suspended',
    'cancelled': 'Cancelled',
    'paid': 'Paid',
    'pending': 'Pending',
    'failed': 'Failed',
    'refunded': 'Refunded',
    'void': 'Void',
    'success': 'Success',
  };
  return labels[status] || status;
};
