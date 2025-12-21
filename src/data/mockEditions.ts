export type TierLevel = 'basic' | 'standard' | 'ultimate' | 'custom';
export type EditionStatus = 'active' | 'deprecated';
export type EnforcementBehavior = 'hard-block' | 'soft-warning' | 'grace-period';

export interface UsageLimits {
  maxScreens: number | 'unlimited';
  maxStorageGB: number | 'unlimited';
  maxPlaylists: number | 'unlimited';
  maxCampaigns: number | 'unlimited';
  maxUsers: number | 'unlimited';
  maxOrganizationUnits: number | 'unlimited';
}

export interface FeatureAccess {
  mediaUpload: boolean;
  playlists: boolean;
  campaignScheduling: boolean;
  html5Content: boolean;
  proofOfPlayReports: boolean;
  apiAccess: boolean;
  advancedAnalytics: boolean;
  multiOrgUnits: boolean;
  whiteLabeling: boolean;
  prioritySupport: boolean;
}

export interface EnforcementRules {
  screenLimitBehavior: EnforcementBehavior;
  storageLimitBehavior: EnforcementBehavior;
  userLimitBehavior: EnforcementBehavior;
  gracePeriodDays?: number;
}

export interface Edition {
  id: string;
  name: string;
  tierLevel: TierLevel;
  status: EditionStatus;
  internalDescription: string;
  customerDescription: string;
  monthlyPrice: number;
  yearlyPrice: number;
  currency: string;
  taxBehavior: 'exclusive' | 'inclusive';
  usageLimits: UsageLimits;
  featureAccess: FeatureAccess;
  enforcementRules: EnforcementRules;
  tenantsUsingCount: number;
  createdDate: string;
  lastModified: string;
  lastModifiedBy: string;
}

export const mockEditions: Edition[] = [
  {
    id: '1',
    name: 'Starter',
    tierLevel: 'basic',
    status: 'active',
    internalDescription: 'Entry-level package for small businesses testing DOOH',
    customerDescription: 'Perfect for small businesses getting started with digital signage',
    monthlyPrice: 49,
    yearlyPrice: 490,
    currency: 'USD',
    taxBehavior: 'exclusive',
    usageLimits: {
      maxScreens: 5,
      maxStorageGB: 10,
      maxPlaylists: 10,
      maxCampaigns: 5,
      maxUsers: 3,
      maxOrganizationUnits: 1,
    },
    featureAccess: {
      mediaUpload: true,
      playlists: true,
      campaignScheduling: true,
      html5Content: false,
      proofOfPlayReports: false,
      apiAccess: false,
      advancedAnalytics: false,
      multiOrgUnits: false,
      whiteLabeling: false,
      prioritySupport: false,
    },
    enforcementRules: {
      screenLimitBehavior: 'hard-block',
      storageLimitBehavior: 'soft-warning',
      userLimitBehavior: 'hard-block',
      gracePeriodDays: 7,
    },
    tenantsUsingCount: 12,
    createdDate: '2023-01-15T10:00:00Z',
    lastModified: '2024-06-10T14:30:00Z',
    lastModifiedBy: 'Admin User',
  },
  {
    id: '2',
    name: 'Professional',
    tierLevel: 'standard',
    status: 'active',
    internalDescription: 'Mid-tier for growing businesses with moderate screen deployments',
    customerDescription: 'Ideal for growing teams managing multiple locations',
    monthlyPrice: 149,
    yearlyPrice: 1490,
    currency: 'USD',
    taxBehavior: 'exclusive',
    usageLimits: {
      maxScreens: 50,
      maxStorageGB: 100,
      maxPlaylists: 50,
      maxCampaigns: 25,
      maxUsers: 15,
      maxOrganizationUnits: 5,
    },
    featureAccess: {
      mediaUpload: true,
      playlists: true,
      campaignScheduling: true,
      html5Content: true,
      proofOfPlayReports: true,
      apiAccess: true,
      advancedAnalytics: false,
      multiOrgUnits: true,
      whiteLabeling: false,
      prioritySupport: false,
    },
    enforcementRules: {
      screenLimitBehavior: 'soft-warning',
      storageLimitBehavior: 'soft-warning',
      userLimitBehavior: 'hard-block',
      gracePeriodDays: 14,
    },
    tenantsUsingCount: 28,
    createdDate: '2023-01-15T10:00:00Z',
    lastModified: '2024-08-22T11:15:00Z',
    lastModifiedBy: 'Admin User',
  },
  {
    id: '3',
    name: 'Enterprise',
    tierLevel: 'ultimate',
    status: 'active',
    internalDescription: 'Premium tier for large organizations with extensive networks',
    customerDescription: 'Complete solution for large-scale digital signage networks',
    monthlyPrice: 499,
    yearlyPrice: 4990,
    currency: 'USD',
    taxBehavior: 'exclusive',
    usageLimits: {
      maxScreens: 500,
      maxStorageGB: 1000,
      maxPlaylists: 'unlimited',
      maxCampaigns: 'unlimited',
      maxUsers: 100,
      maxOrganizationUnits: 'unlimited',
    },
    featureAccess: {
      mediaUpload: true,
      playlists: true,
      campaignScheduling: true,
      html5Content: true,
      proofOfPlayReports: true,
      apiAccess: true,
      advancedAnalytics: true,
      multiOrgUnits: true,
      whiteLabeling: true,
      prioritySupport: true,
    },
    enforcementRules: {
      screenLimitBehavior: 'soft-warning',
      storageLimitBehavior: 'grace-period',
      userLimitBehavior: 'soft-warning',
      gracePeriodDays: 30,
    },
    tenantsUsingCount: 8,
    createdDate: '2023-01-15T10:00:00Z',
    lastModified: '2024-11-05T09:20:00Z',
    lastModifiedBy: 'Admin User',
  },
  {
    id: '4',
    name: 'Legacy Basic',
    tierLevel: 'basic',
    status: 'deprecated',
    internalDescription: 'Old basic tier - deprecated in favor of Starter',
    customerDescription: 'Basic package for small deployments',
    monthlyPrice: 29,
    yearlyPrice: 290,
    currency: 'USD',
    taxBehavior: 'exclusive',
    usageLimits: {
      maxScreens: 3,
      maxStorageGB: 5,
      maxPlaylists: 5,
      maxCampaigns: 3,
      maxUsers: 2,
      maxOrganizationUnits: 1,
    },
    featureAccess: {
      mediaUpload: true,
      playlists: true,
      campaignScheduling: false,
      html5Content: false,
      proofOfPlayReports: false,
      apiAccess: false,
      advancedAnalytics: false,
      multiOrgUnits: false,
      whiteLabeling: false,
      prioritySupport: false,
    },
    enforcementRules: {
      screenLimitBehavior: 'hard-block',
      storageLimitBehavior: 'hard-block',
      userLimitBehavior: 'hard-block',
    },
    tenantsUsingCount: 3,
    createdDate: '2022-06-10T08:00:00Z',
    lastModified: '2023-12-01T16:00:00Z',
    lastModifiedBy: 'Admin User',
  },
  {
    id: '5',
    name: 'Custom Enterprise Plus',
    tierLevel: 'custom',
    status: 'active',
    internalDescription: 'Bespoke package for RetailMax Group with custom limits',
    customerDescription: 'Customized enterprise solution tailored to your needs',
    monthlyPrice: 1299,
    yearlyPrice: 12990,
    currency: 'USD',
    taxBehavior: 'exclusive',
    usageLimits: {
      maxScreens: 1000,
      maxStorageGB: 5000,
      maxPlaylists: 'unlimited',
      maxCampaigns: 'unlimited',
      maxUsers: 'unlimited',
      maxOrganizationUnits: 'unlimited',
    },
    featureAccess: {
      mediaUpload: true,
      playlists: true,
      campaignScheduling: true,
      html5Content: true,
      proofOfPlayReports: true,
      apiAccess: true,
      advancedAnalytics: true,
      multiOrgUnits: true,
      whiteLabeling: true,
      prioritySupport: true,
    },
    enforcementRules: {
      screenLimitBehavior: 'soft-warning',
      storageLimitBehavior: 'grace-period',
      userLimitBehavior: 'soft-warning',
      gracePeriodDays: 60,
    },
    tenantsUsingCount: 1,
    createdDate: '2023-11-01T14:00:00Z',
    lastModified: '2024-10-15T10:45:00Z',
    lastModifiedBy: 'Admin User',
  },
];

export const getTierLabel = (tier: TierLevel): string => {
  const labels = {
    basic: 'Basic',
    standard: 'Standard',
    ultimate: 'Ultimate',
    custom: 'Custom',
  };
  return labels[tier];
};

export const getTierColor = (tier: TierLevel): string => {
  const colors = {
    basic: 'bg-blue-50 text-blue-700 border-blue-200',
    standard: 'bg-purple-50 text-purple-700 border-purple-200',
    ultimate: 'bg-orange-50 text-orange-700 border-orange-200',
    custom: 'bg-gray-50 text-gray-700 border-gray-200',
  };
  return colors[tier];
};

export const getStatusLabel = (status: EditionStatus): string => {
  const labels = {
    active: 'Active',
    deprecated: 'Deprecated',
  };
  return labels[status];
};

export const getStatusColor = (status: EditionStatus): string => {
  const colors = {
    active: 'bg-green-50 text-green-700 border-green-200',
    deprecated: 'bg-gray-50 text-gray-700 border-gray-200',
  };
  return colors[status];
};

export const getEnforcementLabel = (behavior: EnforcementBehavior): string => {
  const labels = {
    'hard-block': 'Hard Block',
    'soft-warning': 'Soft Warning',
    'grace-period': 'Grace Period',
  };
  return labels[behavior];
};

export const getEnforcementDescription = (behavior: EnforcementBehavior): string => {
  const descriptions = {
    'hard-block': 'Tenant cannot exceed this limit - operations will be blocked',
    'soft-warning': 'Tenant will be warned but can temporarily exceed this limit',
    'grace-period': 'Tenant gets X days to reduce usage before being blocked',
  };
  return descriptions[behavior];
};

export const calculateYearlyDiscount = (monthlyPrice: number, yearlyPrice: number): number => {
  const monthlyTotal = monthlyPrice * 12;
  const discount = ((monthlyTotal - yearlyPrice) / monthlyTotal) * 100;
  return Math.round(discount);
};

export const formatLimit = (limit: number | 'unlimited'): string => {
  return limit === 'unlimited' ? 'Unlimited' : limit.toString();
};

export const getCurrencySymbol = (currency: string): string => {
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    AUD: 'A$',
    CAD: 'C$',
    INR: '₹',
  };
  return symbols[currency] || currency;
};

export const getCurrencyLabel = (currency: string): string => {
  const labels: Record<string, string> = {
    USD: 'US Dollar',
    EUR: 'Euro',
    GBP: 'British Pound',
    JPY: 'Japanese Yen',
    AUD: 'Australian Dollar',
    CAD: 'Canadian Dollar',
    INR: 'Indian Rupee',
  };
  return labels[currency] || currency;
};