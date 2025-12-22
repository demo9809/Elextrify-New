// Mock Data for Operational Dashboard

export interface NetworkHealth {
  totalScreens: number;
  onlineScreens: number;
  offlineScreens: number;
  degradedScreens: number;
  lastUpdated: string;
}

export interface CriticalAlert {
  id: string;
  severity: 'critical' | 'warning';
  type: 'offline' | 'playback-failure' | 'content-sync' | 'heartbeat-lost';
  screenName: string;
  screenId: string;
  unitName: string;
  detectedAt: string;
  minutesSinceDetected: number;
  actionLink: string;
}

export interface CampaignPlaybackStatus {
  campaignId: string;
  campaignName: string;
  clientName: string;
  screensAssigned: number;
  lastSuccessfulPoP: string;
  health: 'healthy' | 'degraded' | 'failed';
  issueCount: number;
}

export interface ScreenSnapshot {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'degraded';
  unitName: string;
  category: 'recently-added' | 'repeated-failures' | 'inactive';
  metadata: string;
}

export const mockNetworkHealth: NetworkHealth = {
  totalScreens: 127,
  onlineScreens: 119,
  offlineScreens: 5,
  degradedScreens: 3,
  lastUpdated: new Date().toISOString(),
};

export const mockCriticalAlerts: CriticalAlert[] = [
  {
    id: 'alert-001',
    severity: 'critical',
    type: 'offline',
    screenName: 'Phoenix Mall - L1 Entrance',
    screenId: 'screen-045',
    unitName: 'Mumbai Metro',
    detectedAt: new Date(Date.now() - 45 * 60000).toISOString(), // 45 minutes ago
    minutesSinceDetected: 45,
    actionLink: '/terminals/screen-045',
  },
  {
    id: 'alert-002',
    severity: 'critical',
    type: 'heartbeat-lost',
    screenName: 'Airport T2 - Gate 5',
    screenId: 'screen-089',
    unitName: 'Delhi NCR',
    detectedAt: new Date(Date.now() - 32 * 60000).toISOString(),
    minutesSinceDetected: 32,
    actionLink: '/terminals/screen-089',
  },
  {
    id: 'alert-003',
    severity: 'warning',
    type: 'playback-failure',
    screenName: 'Central Station - Platform 3',
    screenId: 'screen-102',
    unitName: 'Mumbai Metro',
    detectedAt: new Date(Date.now() - 18 * 60000).toISOString(),
    minutesSinceDetected: 18,
    actionLink: '/terminals/screen-102',
  },
  {
    id: 'alert-004',
    severity: 'warning',
    type: 'content-sync',
    screenName: 'Retail Hub - Main Display',
    screenId: 'screen-067',
    unitName: 'Bangalore South',
    detectedAt: new Date(Date.now() - 12 * 60000).toISOString(),
    minutesSinceDetected: 12,
    actionLink: '/terminals/screen-067',
  },
];

export const mockCampaignPlaybackStatus: CampaignPlaybackStatus[] = [
  {
    campaignId: 'camp-001',
    campaignName: 'Diwali 2025 Offer',
    clientName: 'Acme Corporation',
    screensAssigned: 15,
    lastSuccessfulPoP: new Date(Date.now() - 5 * 60000).toISOString(), // 5 minutes ago
    health: 'healthy',
    issueCount: 0,
  },
  {
    campaignId: 'camp-002',
    campaignName: 'Product Launch 2025',
    clientName: 'TechStart Inc.',
    screensAssigned: 8,
    lastSuccessfulPoP: new Date(Date.now() - 3 * 60000).toISOString(),
    health: 'healthy',
    issueCount: 0,
  },
  {
    campaignId: 'camp-003',
    campaignName: 'Holiday Sale Campaign',
    clientName: 'RetailHub',
    screensAssigned: 10,
    lastSuccessfulPoP: new Date(Date.now() - 35 * 60000).toISOString(), // 35 minutes ago
    health: 'degraded',
    issueCount: 2,
  },
  {
    campaignId: 'camp-004',
    campaignName: 'Spring Collection Launch',
    clientName: 'Acme Corporation',
    screensAssigned: 20,
    lastSuccessfulPoP: new Date(Date.now() - 2 * 60000).toISOString(),
    health: 'healthy',
    issueCount: 0,
  },
];

export const mockScreenSnapshots: ScreenSnapshot[] = [
  {
    id: 'screen-125',
    name: 'New Junction Mall - Atrium',
    location: 'Mumbai, Maharashtra',
    status: 'online',
    unitName: 'Mumbai Metro',
    category: 'recently-added',
    metadata: 'Added 2 days ago',
  },
  {
    id: 'screen-126',
    name: 'Tech Park - Lobby',
    location: 'Bangalore, Karnataka',
    status: 'online',
    unitName: 'Bangalore South',
    category: 'recently-added',
    metadata: 'Added 1 day ago',
  },
  {
    id: 'screen-087',
    name: 'Metro Station - Concourse',
    location: 'Delhi, Delhi',
    status: 'degraded',
    unitName: 'Delhi NCR',
    category: 'repeated-failures',
    metadata: '3 failures in 24h',
  },
  {
    id: 'screen-054',
    name: 'Retail Plaza - Entrance',
    location: 'Pune, Maharashtra',
    status: 'offline',
    unitName: 'Pune West',
    category: 'inactive',
    metadata: 'Offline for 3 days',
  },
];

export interface OrganizationUnitContext {
  currentUnitId: string;
  currentUnitName: string;
  availableUnits: Array<{
    id: string;
    name: string;
    type: 'legal-entity' | 'operational-unit';
  }>;
}

export const mockOrgUnitContext: OrganizationUnitContext = {
  currentUnitId: 'unit-mumbai',
  currentUnitName: 'Mumbai Metro',
  availableUnits: [
    { id: 'legal-entity-1', name: 'Elextrify India Pvt Ltd', type: 'legal-entity' },
    { id: 'unit-mumbai', name: 'Mumbai Metro', type: 'operational-unit' },
    { id: 'unit-delhi', name: 'Delhi NCR', type: 'operational-unit' },
    { id: 'unit-bangalore', name: 'Bangalore South', type: 'operational-unit' },
  ],
};
