export type BillingCycle = 'monthly' | 'yearly';
export type SubscriptionStatus = 'trial' | 'active' | 'past-due' | 'suspended' | 'cancelled';
export type InvoiceStatus = 'paid' | 'pending' | 'failed' | 'refunded';

export interface SubscriptionPlan {
  id: string;
  editionId: string;
  editionName: string;
  tierLevel: 'starter' | 'professional' | 'enterprise';
  billingCycle: BillingCycle;
  price: number;
  currency: string;
  nextBillingDate: string;
  status: SubscriptionStatus;
  trialEndsAt?: string;
  cancelledAt?: string;
}

export interface UsageLimit {
  name: string;
  used: number;
  limit: number;
  unit: string;
  icon: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  period: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  issuedDate: string;
  dueDate: string;
  paidDate?: string;
  downloadUrl?: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  cardBrand?: 'visa' | 'mastercard' | 'amex' | 'discover';
  lastFour: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
  billingName: string;
}

export interface BillingData {
  subscription: SubscriptionPlan;
  usage: UsageLimit[];
  invoices: Invoice[];
  paymentMethods: PaymentMethod[];
  autoRetryEnabled: boolean;
  lastPaymentAttempt?: {
    date: string;
    success: boolean;
    message?: string;
  };
}

export const mockBillingData: BillingData = {
  subscription: {
    id: 'sub_1',
    editionId: '2',
    editionName: 'Professional',
    tierLevel: 'professional',
    billingCycle: 'monthly',
    price: 149,
    currency: 'USD',
    nextBillingDate: '2025-01-21T00:00:00Z',
    status: 'active',
  },
  usage: [
    {
      name: 'Screens / Kiosks',
      used: 42,
      limit: 50,
      unit: 'screens',
      icon: 'monitor',
    },
    {
      name: 'Storage',
      used: 85.5,
      limit: 100,
      unit: 'GB',
      icon: 'hard-drive',
    },
    {
      name: 'Playlists',
      used: 28,
      limit: 100,
      unit: 'playlists',
      icon: 'list',
    },
    {
      name: 'Active Campaigns',
      used: 15,
      limit: 50,
      unit: 'campaigns',
      icon: 'target',
    },
    {
      name: 'Users',
      used: 8,
      limit: 10,
      unit: 'users',
      icon: 'users',
    },
  ],
  invoices: [
    {
      id: 'inv_1',
      invoiceNumber: 'INV-2024-12-001',
      period: 'December 2024',
      amount: 149.00,
      currency: 'USD',
      status: 'paid',
      issuedDate: '2024-12-01T00:00:00Z',
      dueDate: '2024-12-08T00:00:00Z',
      paidDate: '2024-12-02T10:30:00Z',
      downloadUrl: '#',
    },
    {
      id: 'inv_2',
      invoiceNumber: 'INV-2024-11-001',
      period: 'November 2024',
      amount: 149.00,
      currency: 'USD',
      status: 'paid',
      issuedDate: '2024-11-01T00:00:00Z',
      dueDate: '2024-11-08T00:00:00Z',
      paidDate: '2024-11-03T14:20:00Z',
      downloadUrl: '#',
    },
    {
      id: 'inv_3',
      invoiceNumber: 'INV-2024-10-001',
      period: 'October 2024',
      amount: 149.00,
      currency: 'USD',
      status: 'paid',
      issuedDate: '2024-10-01T00:00:00Z',
      dueDate: '2024-10-08T00:00:00Z',
      paidDate: '2024-10-05T09:15:00Z',
      downloadUrl: '#',
    },
    {
      id: 'inv_4',
      invoiceNumber: 'INV-2024-09-001',
      period: 'September 2024',
      amount: 149.00,
      currency: 'USD',
      status: 'paid',
      issuedDate: '2024-09-01T00:00:00Z',
      dueDate: '2024-09-08T00:00:00Z',
      paidDate: '2024-09-04T11:45:00Z',
      downloadUrl: '#',
    },
    {
      id: 'inv_5',
      invoiceNumber: 'INV-2024-08-001',
      period: 'August 2024',
      amount: 149.00,
      currency: 'USD',
      status: 'paid',
      issuedDate: '2024-08-01T00:00:00Z',
      dueDate: '2024-08-08T00:00:00Z',
      paidDate: '2024-08-06T16:30:00Z',
      downloadUrl: '#',
    },
  ],
  paymentMethods: [
    {
      id: 'pm_1',
      type: 'card',
      cardBrand: 'visa',
      lastFour: '4242',
      expiryMonth: 12,
      expiryYear: 2026,
      isDefault: true,
      billingName: 'John Smith',
    },
  ],
  autoRetryEnabled: true,
  lastPaymentAttempt: {
    date: '2024-12-02T10:30:00Z',
    success: true,
  },
};

export const getSubscriptionStatusLabel = (status: SubscriptionStatus): string => {
  const labels = {
    trial: 'Trial',
    active: 'Active',
    'past-due': 'Past Due',
    suspended: 'Suspended',
    cancelled: 'Cancelled',
  };
  return labels[status];
};

export const getSubscriptionStatusColor = (status: SubscriptionStatus): string => {
  const colors = {
    trial: 'bg-blue-50 text-blue-700 border-blue-200',
    active: 'bg-green-50 text-green-700 border-green-200',
    'past-due': 'bg-orange-50 text-orange-700 border-orange-200',
    suspended: 'bg-red-50 text-red-700 border-red-200',
    cancelled: 'bg-gray-50 text-gray-700 border-gray-200',
  };
  return colors[status];
};

export const getInvoiceStatusLabel = (status: InvoiceStatus): string => {
  const labels = {
    paid: 'Paid',
    pending: 'Pending',
    failed: 'Failed',
    refunded: 'Refunded',
  };
  return labels[status];
};

export const getInvoiceStatusColor = (status: InvoiceStatus): string => {
  const colors = {
    paid: 'bg-green-50 text-green-700 border-green-200',
    pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    failed: 'bg-red-50 text-red-700 border-red-200',
    refunded: 'bg-gray-50 text-gray-700 border-gray-200',
  };
  return colors[status];
};

export const getUsagePercentage = (used: number, limit: number): number => {
  return Math.min(Math.round((used / limit) * 100), 100);
};

export const getUsageStatus = (percentage: number): 'normal' | 'warning' | 'critical' => {
  if (percentage >= 100) return 'critical';
  if (percentage >= 80) return 'warning';
  return 'normal';
};

export const getUsageColor = (status: 'normal' | 'warning' | 'critical'): string => {
  const colors = {
    normal: 'bg-[#D9480F]',
    warning: 'bg-[#F59E0B]',
    critical: 'bg-[#DC2626]',
  };
  return colors[status];
};

export const formatCurrency = (amount: number, currency: string): string => {
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    AUD: 'A$',
    CAD: 'C$',
    INR: '₹',
  };
  
  return `${symbols[currency] || currency}${amount.toFixed(2)}`;
};

export const getCycleSavings = (monthlyPrice: number): number => {
  const yearlyPrice = monthlyPrice * 12 * 0.8; // 20% discount
  const savings = (monthlyPrice * 12) - yearlyPrice;
  return Math.round(savings);
};
