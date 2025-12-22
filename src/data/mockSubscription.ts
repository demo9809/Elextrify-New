export type SubscriptionStatus = 'active' | 'near_expiry' | 'expired' | 'payment_failed' | 'suspended';
export type SubscriptionPlan = 'starter' | 'professional' | 'enterprise';

export interface SubscriptionInfo {
  id: string;
  tenantId: string;
  planName: string;
  planType: SubscriptionPlan;
  status: SubscriptionStatus;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  nextBillingDate: string;
  amount: number;
  currency: string;
  autoRenew: boolean;
  paymentMethod?: {
    type: 'card' | 'bank';
    last4: string;
    brand?: string;
  };
  metadata?: {
    lastPaymentDate?: string;
    lastPaymentStatus?: 'success' | 'failed';
    failureReason?: string;
  };
}

// Helper: Calculate days until expiry
export const getDaysUntilExpiry = (expiryDate: string): number => {
  const now = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Helper: Determine if indicator should be shown
export const shouldShowIndicator = (subscription: SubscriptionInfo, threshold: number = 14): boolean => {
  if (subscription.status === 'expired' || 
      subscription.status === 'payment_failed' || 
      subscription.status === 'suspended') {
    return true;
  }

  if (subscription.status === 'near_expiry') {
    return true;
  }

  // Check if approaching expiry
  const daysLeft = getDaysUntilExpiry(subscription.nextBillingDate);
  return daysLeft <= threshold && daysLeft >= 0;
};

// Helper: Get status message
export const getStatusMessage = (subscription: SubscriptionInfo): string => {
  const daysLeft = getDaysUntilExpiry(subscription.nextBillingDate);

  switch (subscription.status) {
    case 'expired':
      return 'Subscription expired – renewal required';
    case 'payment_failed':
      return 'Payment failed – please update your payment method';
    case 'suspended':
      return 'Subscription suspended – contact support';
    case 'near_expiry':
      if (daysLeft === 0) return 'Renews today';
      if (daysLeft === 1) return 'Renews tomorrow';
      return `Renews in ${daysLeft} days`;
    case 'active':
      if (daysLeft <= 14) {
        if (daysLeft === 0) return 'Renews today';
        if (daysLeft === 1) return 'Renews tomorrow';
        return `Renews in ${daysLeft} days`;
      }
      return `Active until ${new Date(subscription.nextBillingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    default:
      return 'Active';
  }
};

// Helper: Get indicator color
export const getIndicatorColor = (subscription: SubscriptionInfo): { bg: string; border: string; text: string } => {
  const daysLeft = getDaysUntilExpiry(subscription.nextBillingDate);

  if (subscription.status === 'expired' || subscription.status === 'suspended') {
    return {
      bg: '#FEF2F2',
      border: '#FCA5A5',
      text: '#DC2626',
    };
  }

  if (subscription.status === 'payment_failed') {
    return {
      bg: '#FEF2F2',
      border: '#FCA5A5',
      text: '#DC2626',
    };
  }

  if (daysLeft <= 7) {
    return {
      bg: '#FEF3C7',
      border: '#FCD34D',
      text: '#F59E0B',
    };
  }

  // 8-14 days: subtle warning
  return {
    bg: '#FEF3C7',
    border: '#FCD34D',
    text: '#D97706',
  };
};

// Mock subscription data - Different scenarios
export const mockSubscriptionActive: SubscriptionInfo = {
  id: 'sub_active_001',
  tenantId: 'tenant_001',
  planName: 'Professional',
  planType: 'professional',
  status: 'active',
  currentPeriodStart: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  currentPeriodEnd: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000).toISOString(),
  nextBillingDate: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000).toISOString(),
  amount: 149.00,
  currency: 'USD',
  autoRenew: true,
  paymentMethod: {
    type: 'card',
    last4: '4242',
    brand: 'Visa',
  },
};

export const mockSubscriptionNearExpiry: SubscriptionInfo = {
  id: 'sub_expiring_001',
  tenantId: 'tenant_001',
  planName: 'Professional',
  planType: 'professional',
  status: 'near_expiry',
  currentPeriodStart: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  currentPeriodEnd: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
  nextBillingDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
  amount: 149.00,
  currency: 'USD',
  autoRenew: true,
  paymentMethod: {
    type: 'card',
    last4: '4242',
    brand: 'Visa',
  },
};

export const mockSubscriptionExpired: SubscriptionInfo = {
  id: 'sub_expired_001',
  tenantId: 'tenant_001',
  planName: 'Professional',
  planType: 'professional',
  status: 'expired',
  currentPeriodStart: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
  currentPeriodEnd: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  nextBillingDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  amount: 149.00,
  currency: 'USD',
  autoRenew: false,
  paymentMethod: {
    type: 'card',
    last4: '4242',
    brand: 'Visa',
  },
};

export const mockSubscriptionPaymentFailed: SubscriptionInfo = {
  id: 'sub_failed_001',
  tenantId: 'tenant_001',
  planName: 'Professional',
  planType: 'professional',
  status: 'payment_failed',
  currentPeriodStart: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  currentPeriodEnd: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
  nextBillingDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
  amount: 149.00,
  currency: 'USD',
  autoRenew: true,
  paymentMethod: {
    type: 'card',
    last4: '4242',
    brand: 'Visa',
  },
  metadata: {
    lastPaymentDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    lastPaymentStatus: 'failed',
    failureReason: 'Insufficient funds',
  },
};

// Default export - Change this to test different states
export const mockSubscription: SubscriptionInfo = mockSubscriptionNearExpiry;
