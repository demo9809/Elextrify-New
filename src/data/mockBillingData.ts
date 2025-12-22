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

// Detailed invoice data for invoice preview
export interface InvoiceLineItem {
  id: string;
  description: string;
  unit: string;
  quantity: number;
  rate: number;
  total: number;
}

export interface InvoiceUsageSummary {
  totalHoursRun: number;
  totalScreensUsed: number;
  regionsCovered: string[];
}

// Subscription Invoice (Platform SaaS billing - what tenant pays to platform)
export interface SubscriptionInvoice {
  invoiceNumber: string;
  tenantName: string;
  billingPeriod: string;
  status: InvoiceStatus;
  invoiceDate: string;
  dueDate: string;
  paidDate?: string;
  
  // Subscription details
  planName: string;
  billingCycle: 'monthly' | 'annual';
  
  // Line items (plan + add-ons)
  baseSubscription: {
    description: string;
    amount: number;
  };
  addOns?: {
    id: string;
    description: string;
    amount: number;
  }[];
  
  // Totals
  subtotal: number;
  discount: number;
  discountDescription?: string;
  tax: number;
  taxRate: number;
  taxDescription?: string;
  grandTotal: number;
  currency: string;
}

export interface DetailedInvoice {
  invoiceNumber: string;
  tenantName: string;
  billingPeriod: string;
  status: InvoiceStatus;
  invoiceDate: string;
  dueDate: string;
  paidDate?: string;
  
  // Usage data (DOOH-specific)
  usageSummary: InvoiceUsageSummary;
  
  // Line items
  lineItems: InvoiceLineItem[];
  
  // Totals
  subtotal: number;
  discount: number;
  discountDescription?: string;
  tax: number;
  taxRate: number;
  taxDescription?: string;
  grandTotal: number;
  currency: string;
}

// Mock function to get detailed invoice data
export const getDetailedInvoice = (invoiceId: string): DetailedInvoice => {
  // Mock detailed data for different invoices
  const detailedInvoices: Record<string, DetailedInvoice> = {
    'inv_1': {
      invoiceNumber: 'INV-2024-12-001',
      tenantName: 'Digital Signage Corp',
      billingPeriod: 'December 1 - December 31, 2024',
      status: 'paid',
      invoiceDate: '2024-12-01T00:00:00Z',
      dueDate: '2024-12-08T00:00:00Z',
      paidDate: '2024-12-02T10:30:00Z',
      
      usageSummary: {
        totalHoursRun: 12480,
        totalScreensUsed: 42,
        regionsCovered: ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad'],
      },
      
      lineItems: [
        {
          id: 'li_1',
          description: 'Campaign Playback - North India',
          unit: 'Hours',
          quantity: 5200,
          rate: 0.012,
          total: 62.40,
        },
        {
          id: 'li_2',
          description: 'Campaign Playback - South India',
          unit: 'Hours',
          quantity: 4800,
          rate: 0.012,
          total: 57.60,
        },
        {
          id: 'li_3',
          description: 'Campaign Playback - West India',
          unit: 'Hours',
          quantity: 2480,
          rate: 0.012,
          total: 29.76,
        },
        {
          id: 'li_4',
          description: 'Platform Subscription Fee - Professional',
          unit: 'Month',
          quantity: 1,
          rate: 99.00,
          total: 99.00,
        },
      ],
      
      subtotal: 248.76,
      discount: 0,
      tax: 0,
      taxRate: 0,
      grandTotal: 149.00,
      currency: 'USD',
    },
    'inv_2': {
      invoiceNumber: 'INV-2024-11-001',
      tenantName: 'Digital Signage Corp',
      billingPeriod: 'November 1 - November 30, 2024',
      status: 'paid',
      invoiceDate: '2024-11-01T00:00:00Z',
      dueDate: '2024-11-08T00:00:00Z',
      paidDate: '2024-11-03T14:20:00Z',
      
      usageSummary: {
        totalHoursRun: 11520,
        totalScreensUsed: 38,
        regionsCovered: ['Delhi', 'Mumbai', 'Bangalore', 'Pune'],
      },
      
      lineItems: [
        {
          id: 'li_1',
          description: 'Campaign Playback - North India',
          unit: 'Hours',
          quantity: 4800,
          rate: 0.012,
          total: 57.60,
        },
        {
          id: 'li_2',
          description: 'Campaign Playback - South India',
          unit: 'Hours',
          quantity: 4320,
          rate: 0.012,
          total: 51.84,
        },
        {
          id: 'li_3',
          description: 'Campaign Playback - West India',
          unit: 'Hours',
          quantity: 2400,
          rate: 0.012,
          total: 28.80,
        },
        {
          id: 'li_4',
          description: 'Platform Subscription Fee - Professional',
          unit: 'Month',
          quantity: 1,
          rate: 99.00,
          total: 99.00,
        },
      ],
      
      subtotal: 237.24,
      discount: 0,
      tax: 0,
      taxRate: 0,
      grandTotal: 149.00,
      currency: 'USD',
    },
  };
  
  // Return detailed data if available, otherwise return a default structure
  return detailedInvoices[invoiceId] || {
    invoiceNumber: 'INV-2024-XX-XXX',
    tenantName: 'Digital Signage Corp',
    billingPeriod: 'Period Not Available',
    status: 'paid',
    invoiceDate: new Date().toISOString(),
    dueDate: new Date().toISOString(),
    
    usageSummary: {
      totalHoursRun: 0,
      totalScreensUsed: 0,
      regionsCovered: [],
    },
    
    lineItems: [],
    
    subtotal: 0,
    discount: 0,
    tax: 0,
    taxRate: 0,
    grandTotal: 0,
    currency: 'USD',
  };
};

// Mock function to get subscription invoice data (platform billing)
export const getSubscriptionInvoice = (invoiceId: string): SubscriptionInvoice => {
  const subscriptionInvoices: Record<string, SubscriptionInvoice> = {
    'inv_1': {
      invoiceNumber: 'SUB-INV-2024-12-001',
      tenantName: 'Digital Signage Corp',
      billingPeriod: 'December 1 - December 31, 2024',
      status: 'paid',
      invoiceDate: '2024-12-01T00:00:00Z',
      dueDate: '2024-12-08T00:00:00Z',
      paidDate: '2024-12-02T10:30:00Z',
      
      planName: 'Professional Plan',
      billingCycle: 'monthly',
      
      baseSubscription: {
        description: 'Professional Plan - Monthly Subscription',
        amount: 149.00,
      },
      addOns: [
        {
          id: 'addon_1',
          description: 'Extra Storage (50GB)',
          amount: 20.00,
        },
        {
          id: 'addon_2',
          description: 'Additional User Seats (5)',
          amount: 25.00,
        },
      ],
      
      subtotal: 194.00,
      discount: 19.40,
      discountDescription: '10% Volume Discount',
      tax: 31.33,
      taxRate: 18,
      taxDescription: 'GST (India)',
      grandTotal: 205.93,
      currency: 'USD',
    },
    'inv_2': {
      invoiceNumber: 'SUB-INV-2024-11-001',
      tenantName: 'Digital Signage Corp',
      billingPeriod: 'November 1 - November 30, 2024',
      status: 'paid',
      invoiceDate: '2024-11-01T00:00:00Z',
      dueDate: '2024-11-08T00:00:00Z',
      paidDate: '2024-11-03T14:20:00Z',
      
      planName: 'Professional Plan',
      billingCycle: 'monthly',
      
      baseSubscription: {
        description: 'Professional Plan - Monthly Subscription',
        amount: 149.00,
      },
      addOns: [
        {
          id: 'addon_1',
          description: 'Extra Storage (50GB)',
          amount: 20.00,
        },
      ],
      
      subtotal: 169.00,
      discount: 0,
      tax: 30.42,
      taxRate: 18,
      taxDescription: 'GST (India)',
      grandTotal: 199.42,
      currency: 'USD',
    },
    'inv_3': {
      invoiceNumber: 'SUB-INV-2024-10-001',
      tenantName: 'Digital Signage Corp',
      billingPeriod: 'October 1 - October 31, 2024',
      status: 'paid',
      invoiceDate: '2024-10-01T00:00:00Z',
      dueDate: '2024-10-08T00:00:00Z',
      paidDate: '2024-10-05T09:15:00Z',
      
      planName: 'Professional Plan',
      billingCycle: 'monthly',
      
      baseSubscription: {
        description: 'Professional Plan - Monthly Subscription',
        amount: 149.00,
      },
      
      subtotal: 149.00,
      discount: 0,
      tax: 26.82,
      taxRate: 18,
      taxDescription: 'GST (India)',
      grandTotal: 175.82,
      currency: 'USD',
    },
    'inv_4': {
      invoiceNumber: 'SUB-INV-2024-09-001',
      tenantName: 'Digital Signage Corp',
      billingPeriod: 'September 1 - September 30, 2024',
      status: 'paid',
      invoiceDate: '2024-09-01T00:00:00Z',
      dueDate: '2024-09-08T00:00:00Z',
      paidDate: '2024-09-04T11:45:00Z',
      
      planName: 'Professional Plan',
      billingCycle: 'monthly',
      
      baseSubscription: {
        description: 'Professional Plan - Monthly Subscription',
        amount: 149.00,
      },
      
      subtotal: 149.00,
      discount: 0,
      tax: 26.82,
      taxRate: 18,
      taxDescription: 'GST (India)',
      grandTotal: 175.82,
      currency: 'USD',
    },
    'inv_5': {
      invoiceNumber: 'SUB-INV-2024-08-001',
      tenantName: 'Digital Signage Corp',
      billingPeriod: 'August 1 - August 31, 2024',
      status: 'paid',
      invoiceDate: '2024-08-01T00:00:00Z',
      dueDate: '2024-08-08T00:00:00Z',
      paidDate: '2024-08-06T16:30:00Z',
      
      planName: 'Professional Plan',
      billingCycle: 'monthly',
      
      baseSubscription: {
        description: 'Professional Plan - Monthly Subscription',
        amount: 149.00,
      },
      
      subtotal: 149.00,
      discount: 0,
      tax: 26.82,
      taxRate: 18,
      taxDescription: 'GST (India)',
      grandTotal: 175.82,
      currency: 'USD',
    },
  };
  
  return subscriptionInvoices[invoiceId] || {
    invoiceNumber: 'SUB-INV-2024-XX-XXX',
    tenantName: 'Digital Signage Corp',
    billingPeriod: 'Period Not Available',
    status: 'paid',
    invoiceDate: new Date().toISOString(),
    dueDate: new Date().toISOString(),
    
    planName: 'Professional Plan',
    billingCycle: 'monthly',
    
    baseSubscription: {
      description: 'Professional Plan - Monthly Subscription',
      amount: 0,
    },
    
    subtotal: 0,
    discount: 0,
    tax: 0,
    taxRate: 0,
    grandTotal: 0,
    currency: 'USD',
  };
};