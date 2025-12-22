export type NotificationCategory = 'billing' | 'campaigns' | 'devices' | 'system' | 'security';
export type NotificationPriority = 'low' | 'medium' | 'high' | 'critical';
export type NotificationSeverity = 'info' | 'warning' | 'critical';

export interface Notification {
  id: string;
  category: NotificationCategory;
  title: string;
  description: string;
  fullDescription?: string;
  timestamp: string;
  isRead: boolean;
  isArchived: boolean;
  isCleared: boolean;
  priority: NotificationPriority;
  severity: NotificationSeverity;
  actionUrl?: string;
  source?: string;
  metadata?: {
    entityId?: string;
    entityName?: string;
    entityType?: string;
  };
}

// Global system alerts (banner notifications)
export interface GlobalAlert {
  id: string;
  type: 'maintenance' | 'feature' | 'warning' | 'critical';
  severity: 'info' | 'warning' | 'critical';
  message: string;
  ctaText?: string;
  ctaUrl?: string;
  isVisible: boolean;
  isDismissible: boolean;
  dismissedBy: string[]; // User IDs who dismissed it
  validFrom: string;
  validUntil?: string;
  roleVisibility: 'all' | 'tenant_admin' | 'saas_admin';
}

export const mockGlobalAlerts: GlobalAlert[] = [
  {
    id: 'alert_1',
    type: 'maintenance',
    severity: 'warning',
    message: 'Scheduled maintenance on Jan 25, 2025 from 2:00 AM - 4:00 AM IST. Services may be temporarily unavailable.',
    ctaText: 'View Details',
    ctaUrl: '/maintenance',
    isVisible: true,
    isDismissible: true,
    dismissedBy: [],
    validFrom: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    roleVisibility: 'all',
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif_1',
    category: 'billing',
    title: 'Payment Successful',
    description: 'Your monthly subscription payment of $149.00 has been processed successfully.',
    fullDescription: 'Your monthly subscription payment of $149.00 has been processed successfully. The invoice INV-2024-12-001 is now available for download in your billing section.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    isRead: false,
    isArchived: false,
    isCleared: false,
    priority: 'medium',
    severity: 'info',
    actionUrl: '/billing',
    source: 'Billing System',
    metadata: {
      entityId: 'inv_1',
      entityName: 'INV-2024-12-001',
      entityType: 'invoice',
    },
  },
  {
    id: 'notif_2',
    category: 'campaigns',
    title: 'Campaign Started Successfully',
    description: 'Your campaign "Diwali 2025 Offer" is now live across 15 kiosks.',
    fullDescription: 'Your campaign "Diwali 2025 Offer" is now live across 15 kiosks in Delhi, Mumbai, and Bangalore. Content is being displayed according to your scheduled times.',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 minutes ago
    isRead: false,
    isArchived: false,
    isCleared: false,
    priority: 'high',
    severity: 'info',
    actionUrl: '/campaigns',
    source: 'Campaign Manager',
    metadata: {
      entityId: 'camp_1',
      entityName: 'Diwali 2025 Offer',
      entityType: 'campaign',
    },
  },
  {
    id: 'notif_3',
    category: 'devices',
    title: 'Kiosk Offline Alert',
    description: '3 kiosks in Mumbai region have gone offline. Your campaigns may not be displaying.',
    fullDescription: '3 kiosks in Mumbai region (Phoenix Mall - KSK-101, Infiniti Mall - KSK-102, Oberoi Mall - KSK-103) have gone offline and are not responding. Your campaigns may not be displaying on these screens. Please check device connectivity or contact support.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    isRead: false,
    isArchived: false,
    isCleared: false,
    priority: 'critical',
    severity: 'critical',
    actionUrl: '/terminals',
    source: 'Device Monitor',
    metadata: {
      entityType: 'device',
    },
  },
  {
    id: 'notif_4',
    category: 'security',
    title: 'New Login from Unknown Device',
    description: 'A new login was detected from Chrome on Windows in Mumbai, India.',
    fullDescription: 'A new login was detected from Chrome on Windows in Mumbai, India at 2:30 PM today. If this was not you, please secure your account immediately by changing your password.',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    isRead: true,
    isArchived: false,
    isCleared: false,
    priority: 'high',
    severity: 'warning',
    actionUrl: '/settings/security',
    source: 'Security Monitor',
  },
  {
    id: 'notif_5',
    category: 'billing',
    title: 'Subscription Upgraded Successfully',
    description: 'Your subscription was upgraded to Professional plan. Billing will reflect this change from next cycle.',
    fullDescription: 'Your subscription was upgraded from Starter to Professional plan. The new features are now available for use. Billing will reflect this change from your next billing cycle starting January 21, 2025.',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    isRead: true,
    isArchived: false,
    isCleared: false,
    priority: 'medium',
    severity: 'info',
    actionUrl: '/billing',
    source: 'Billing System',
  },
  {
    id: 'notif_6',
    category: 'campaigns',
    title: 'Campaign Performance Alert',
    description: 'Your campaign "Winter Sale" has reached 80% of its scheduled playtime.',
    fullDescription: 'Your campaign "Winter Sale" has reached 80% of its scheduled playtime. It will automatically end on December 25, 2024. Consider extending the campaign if you want to continue showing this content.',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    isRead: true,
    isArchived: false,
    isCleared: false,
    priority: 'low',
    severity: 'info',
    actionUrl: '/campaigns',
    source: 'Campaign Manager',
    metadata: {
      entityId: 'camp_2',
      entityName: 'Winter Sale',
      entityType: 'campaign',
    },
  },
  {
    id: 'notif_7',
    category: 'system',
    title: 'Storage Limit Warning',
    description: 'Your media library is using 85GB of your 100GB storage limit.',
    fullDescription: 'Your media library is using 85GB of your 100GB storage limit. Consider deleting unused media files or upgrading your plan to get more storage space.',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    isRead: true,
    isArchived: false,
    isCleared: false,
    priority: 'medium',
    severity: 'warning',
    actionUrl: '/media',
    source: 'System Monitor',
  },
  {
    id: 'notif_8',
    category: 'devices',
    title: 'Kiosk Back Online',
    description: 'Phoenix Mall kiosk (KSK-101) is back online and displaying content.',
    fullDescription: 'Phoenix Mall kiosk (KSK-101) in Mumbai is back online and displaying content. All campaigns scheduled for this device have resumed normal operation.',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    isRead: true,
    isArchived: false,
    isCleared: false,
    priority: 'low',
    severity: 'info',
    actionUrl: '/terminals',
    source: 'Device Monitor',
    metadata: {
      entityId: 'ksk_101',
      entityName: 'Phoenix Mall - KSK-101',
      entityType: 'device',
    },
  },
  {
    id: 'notif_9',
    category: 'billing',
    title: 'Invoice Available',
    description: 'Your invoice for November 2024 is ready for download.',
    fullDescription: 'Your invoice INV-2024-11-001 for November 2024 billing period is ready for download. The amount of $149.00 was successfully charged to your card ending in 4242.',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    isRead: true,
    isArchived: false,
    isCleared: false,
    priority: 'low',
    severity: 'info',
    actionUrl: '/billing',
    source: 'Billing System',
    metadata: {
      entityId: 'inv_2',
      entityName: 'INV-2024-11-001',
      entityType: 'invoice',
    },
  },
  {
    id: 'notif_10',
    category: 'system',
    title: 'New Features Available',
    description: 'We\'ve added advanced targeting options to the campaign editor.',
    fullDescription: 'We\'ve added advanced targeting options to the campaign editor. You can now target campaigns based on venue types, regions, and custom audience segments. Check out the documentation to learn more.',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    isRead: true,
    isArchived: false,
    isCleared: false,
    priority: 'low',
    severity: 'info',
    actionUrl: '/documentation',
    source: 'Product Updates',
  },
];

// Helper functions
export const getUnreadCount = (notifications: Notification[]): number => {
  return notifications.filter((n) => !n.isRead).length;
};

export const getCategoryColor = (category: NotificationCategory): string => {
  const colors = {
    billing: '#D9480F',
    campaigns: '#16A34A',
    devices: '#3B82F6',
    system: '#6B7280',
    security: '#DC2626',
  };
  return colors[category];
};

export const getCategoryLabel = (category: NotificationCategory): string => {
  const labels = {
    billing: 'Billing',
    campaigns: 'Campaigns',
    devices: 'Devices',
    system: 'System',
    security: 'Security',
  };
  return labels[category];
};

export const formatRelativeTime = (timestamp: string): string => {
  const now = Date.now();
  const time = new Date(timestamp).getTime();
  const diff = now - time;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (weeks < 4) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const getSeverityColor = (severity: NotificationSeverity): string => {
  const colors = {
    info: '#3B82F6',
    warning: '#F59E0B',
    critical: '#DC2626',
  };
  return colors[severity];
};

export const getSeverityBgColor = (severity: NotificationSeverity): string => {
  const colors = {
    info: '#EFF6FF',
    warning: '#FEF3C7',
    critical: '#FEF2F2',
  };
  return colors[severity];
};

export const getSeverityBorderColor = (severity: NotificationSeverity): string => {
  const colors = {
    info: '#DBEAFE',
    warning: '#FDE68A',
    critical: '#FECACA',
  };
  return colors[severity];
};