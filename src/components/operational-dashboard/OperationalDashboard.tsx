import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RefreshCw,
  ChevronDown,
  Eye,
  Check,
  Monitor,
  AlertCircle,
  ChevronRight,
  Filter,
  MapPin,
  Building2,
  Power,
  RefreshCcw,
  ExternalLink,
  Zap,
  Thermometer,
  Activity,
  PlayCircle,
  PauseCircle,
  Play,
  TrendingUp,
} from 'lucide-react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

type NetworkHealthStatus = 'healthy' | 'degraded' | 'critical';
type AlertSeverity = 'critical' | 'high' | 'medium';
type IssueType = 'offline' | 'heartbeat-lost' | 'playback-failure' | 'sync-pending';
type PlaybackStatus = 'active' | 'paused' | 'failed' | 'completed';

interface NetworkHealth {
  status: NetworkHealthStatus;
  availability: number;
  totalScreens: number;
  onlineScreens: number;
  offlineScreens: number;
  degradedScreens: number;
  lastUpdated: string;
}

interface OperationalMetrics {
  totalScreens: number;
  online: number;
  offline: number;
  degraded: number;
}

interface CriticalAlert {
  id: string;
  severity: AlertSeverity;
  issueType: IssueType;
  screenName: string;
  screenId: string;
  location: string;
  detectedAt: string;
  acknowledged: boolean;
}

interface LocationHealthCluster {
  id: string;
  locationName: string;
  region: string;
  healthPercentage: number;
  totalScreens: number;
  online: number;
  degraded: number;
  offline: number;
}

interface DeviceTelemetry {
  screenId: string;
  screenName: string;
  voltage: number; // 0-100
  temperature: number; // Celsius
  syncHealth: 'healthy' | 'warning' | 'critical';
  lastReport: string;
}

interface PlaybackEvent {
  id: string;
  campaignName: string;
  screenId: string;
  screenName: string;
  timeWindow: string;
  status: PlaybackStatus;
  timestamp: string;
}

interface RegionPerformance {
  id: string;
  regionName: string;
  totalScreens: number;
  activeCampaigns: number;
  playVolume: number; // Total plays today
  health: NetworkHealthStatus;
}

interface LegalEntityContext {
  legalEntityName: string;
  orgUnitName: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockLegalEntityContext: LegalEntityContext = {
  legalEntityName: 'TechCorp South',
  orgUnitName: 'Mumbai Metro',
};

const mockNetworkHealth: NetworkHealth = {
  status: 'degraded',
  availability: 94.2,
  totalScreens: 247,
  onlineScreens: 233,
  offlineScreens: 8,
  degradedScreens: 6,
  lastUpdated: new Date().toISOString(),
};

const mockMetrics: OperationalMetrics = {
  totalScreens: 247,
  online: 233,
  offline: 8,
  degraded: 6,
};

const mockAlerts: CriticalAlert[] = [
  {
    id: 'alert-1',
    severity: 'critical',
    issueType: 'offline',
    screenName: 'Mall-Phoenix-L1-North',
    screenId: 'SCR-1024',
    location: 'Phoenix Mall, Mumbai',
    detectedAt: new Date(Date.now() - 3600000).toISOString(),
    acknowledged: false,
  },
  {
    id: 'alert-2',
    severity: 'critical',
    issueType: 'offline',
    screenName: 'Airport-Terminal2-Gate5',
    screenId: 'SCR-2041',
    location: 'Delhi Airport, Terminal 2',
    detectedAt: new Date(Date.now() - 7200000).toISOString(),
    acknowledged: false,
  },
  {
    id: 'alert-3',
    severity: 'high',
    issueType: 'playback-failure',
    screenName: 'Retail-Bangalore-MG-01',
    screenId: 'SCR-3015',
    location: 'MG Road Store, Bangalore',
    detectedAt: new Date(Date.now() - 1800000).toISOString(),
    acknowledged: false,
  },
  {
    id: 'alert-4',
    severity: 'high',
    issueType: 'heartbeat-lost',
    screenName: 'Gym-Gurgaon-Main',
    screenId: 'SCR-4102',
    location: 'FitLife Gym, Gurgaon',
    detectedAt: new Date(Date.now() - 900000).toISOString(),
    acknowledged: false,
  },
  {
    id: 'alert-5',
    severity: 'medium',
    issueType: 'sync-pending',
    screenName: 'Transit-Hub-Chennai-01',
    screenId: 'SCR-5230',
    location: 'Chennai Metro Station',
    detectedAt: new Date(Date.now() - 600000).toISOString(),
    acknowledged: false,
  },
];

const mockLocationClusters: LocationHealthCluster[] = [
  {
    id: 'loc-1',
    locationName: 'Mumbai Metropolitan Area',
    region: 'West India',
    healthPercentage: 96,
    totalScreens: 82,
    online: 79,
    degraded: 2,
    offline: 1,
  },
  {
    id: 'loc-2',
    locationName: 'Delhi NCR',
    region: 'North India',
    healthPercentage: 91,
    totalScreens: 71,
    online: 65,
    degraded: 3,
    offline: 3,
  },
  {
    id: 'loc-3',
    locationName: 'Bangalore Urban',
    region: 'South India',
    healthPercentage: 95,
    totalScreens: 58,
    online: 55,
    degraded: 2,
    offline: 1,
  },
  {
    id: 'loc-4',
    locationName: 'Chennai Zone',
    region: 'South India',
    healthPercentage: 93,
    totalScreens: 36,
    online: 34,
    degraded: 1,
    offline: 1,
  },
];

const mockTelemetry: DeviceTelemetry[] = [
  {
    screenId: 'SCR-1024',
    screenName: 'Mall-Phoenix-L1-North',
    voltage: 78,
    temperature: 68,
    syncHealth: 'critical',
    lastReport: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    screenId: 'SCR-3015',
    screenName: 'Retail-Bangalore-MG-01',
    voltage: 85,
    temperature: 72,
    syncHealth: 'warning',
    lastReport: new Date(Date.now() - 1800000).toISOString(),
  },
];

const mockPlaybackEvents: PlaybackEvent[] = [
  {
    id: 'pb-1',
    campaignName: 'Diwali 2025 Offer',
    screenId: 'SCR-3015',
    screenName: 'Retail-Bangalore-MG-01',
    timeWindow: '09:00 - 12:00',
    status: 'failed',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: 'pb-2',
    campaignName: 'Holiday Sale 2025',
    screenId: 'SCR-2041',
    screenName: 'Airport-Terminal2-Gate5',
    timeWindow: '06:00 - 18:00',
    status: 'paused',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'pb-3',
    campaignName: 'Brand Awareness Mix',
    screenId: 'SCR-4102',
    screenName: 'Gym-Gurgaon-Main',
    timeWindow: '08:00 - 20:00',
    status: 'failed',
    timestamp: new Date(Date.now() - 900000).toISOString(),
  },
];

const mockRegionPerformance: RegionPerformance[] = [
  {
    id: 'reg-1',
    regionName: 'West India',
    totalScreens: 82,
    activeCampaigns: 12,
    playVolume: 1847,
    health: 'healthy',
  },
  {
    id: 'reg-2',
    regionName: 'North India',
    totalScreens: 71,
    activeCampaigns: 9,
    playVolume: 1523,
    health: 'degraded',
  },
  {
    id: 'reg-3',
    regionName: 'South India',
    totalScreens: 94,
    activeCampaigns: 15,
    playVolume: 2104,
    health: 'healthy',
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function OperationalDashboard() {
  const navigate = useNavigate();
  const [networkHealth, setNetworkHealth] = useState<NetworkHealth>(mockNetworkHealth);
  const [metrics, setMetrics] = useState<OperationalMetrics>(mockMetrics);
  const [alerts, setAlerts] = useState<CriticalAlert[]>(mockAlerts);
  const [locationClusters, setLocationClusters] = useState<LocationHealthCluster[]>(mockLocationClusters);
  const [telemetry, setTelemetry] = useState<DeviceTelemetry[]>(mockTelemetry);
  const [playbackEvents, setPlaybackEvents] = useState<PlaybackEvent[]>(mockPlaybackEvents);
  const [regionPerformance, setRegionPerformance] = useState<RegionPerformance[]>(mockRegionPerformance);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSync, setLastSync] = useState(new Date());
  const [showAllPlayback, setShowAllPlayback] = useState(false);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastSync(new Date());
      setNetworkHealth((prev) => ({
        ...prev,
        lastUpdated: new Date().toISOString(),
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastSync(new Date());
      setNetworkHealth((prev) => ({
        ...prev,
        lastUpdated: new Date().toISOString(),
      }));
      setIsRefreshing(false);
    }, 500);
  };

  const handleMetricClick = (filter: string) => {
    navigate(`/terminals?status=${filter}`);
  };

  const handleAlertView = (alert: CriticalAlert) => {
    navigate(`/terminals/${alert.screenId}`);
  };

  const handleAlertAction = (alertId: string, action: 'restart' | 'sync') => {
    console.log(`Action ${action} on alert ${alertId}`);
    // Handle action
  };

  const handleLocationClick = (locationId: string) => {
    navigate(`/terminals?location=${locationId}`);
  };

  const handlePlaybackEventClick = (screenId: string) => {
    navigate(`/terminals/${screenId}`);
  };

  const getTimeSince = (isoString: string) => {
    const seconds = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const getHealthColor = (status: NetworkHealthStatus) => {
    switch (status) {
      case 'healthy':
        return 'text-[#047857] bg-[#ECFDF5]';
      case 'degraded':
        return 'text-[#F59E0B] bg-[#FFFBEB]';
      case 'critical':
        return 'text-[#DC2626] bg-[#FEF2F2]';
    }
  };

  const getSeverityColor = (severity: AlertSeverity) => {
    switch (severity) {
      case 'critical':
        return 'border-l-[#DC2626] bg-[#FEF2F2]';
      case 'high':
        return 'border-l-[#F59E0B] bg-[#FFFBEB]';
      case 'medium':
        return 'border-l-[#3B82F6] bg-[#EFF6FF]';
    }
  };

  const getIssueTypeLabel = (type: IssueType) => {
    switch (type) {
      case 'offline':
        return 'OFFLINE';
      case 'heartbeat-lost':
        return 'HEARTBEAT LOST';
      case 'playback-failure':
        return 'PLAYBACK FAILURE';
      case 'sync-pending':
        return 'SYNC PENDING';
    }
  };

  const getPlaybackStatusColor = (status: PlaybackStatus) => {
    switch (status) {
      case 'active':
        return 'text-[#047857] bg-[#ECFDF5]';
      case 'paused':
        return 'text-[#F59E0B] bg-[#FFFBEB]';
      case 'failed':
        return 'text-[#DC2626] bg-[#FEF2F2]';
      case 'completed':
        return 'text-[#6B7280] bg-[#F9FAFB]';
    }
  };

  const getPlaybackStatusLabel = (status: PlaybackStatus) => {
    switch (status) {
      case 'active':
        return 'ACTIVE';
      case 'paused':
        return 'PAUSED';
      case 'failed':
        return 'FAILED';
      case 'completed':
        return 'COMPLETED';
    }
  };

  // Sort alerts
  const sortedAlerts = [...alerts]
    .filter((a) => !a.acknowledged)
    .sort((a, b) => {
      const severityOrder = { critical: 0, high: 1, medium: 2 };
      if (a.severity !== b.severity)
        return severityOrder[a.severity] - severityOrder[b.severity];
      return new Date(b.detectedAt).getTime() - new Date(a.detectedAt).getTime();
    });

  // Show only top 5 alerts, rest in "View All"
  const displayedAlerts = sortedAlerts.slice(0, 5);
  const hiddenAlertsCount = sortedAlerts.length - displayedAlerts.length;

  // Show only exception playback events unless expanded
  const exceptionPlaybackEvents = playbackEvents.filter((e) => e.status === 'failed' || e.status === 'paused');
  const displayedPlaybackEvents = showAllPlayback ? playbackEvents : exceptionPlaybackEvents;

  // Show only telemetry with thresholds crossed
  const criticalTelemetry = telemetry.filter(
    (t) => t.voltage < 80 || t.temperature > 65 || t.syncHealth !== 'healthy'
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F9FAFB]">
      {/* ===================================================================== */}
      {/* 2. GLOBAL CONTEXT BAR (FIXED) */}
      {/* ===================================================================== */}
      <div className="bg-white border-b border-[#E5E7EB] px-8 py-2 flex items-center justify-between flex-shrink-0 sticky top-0 z-20">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-[#111827]">
            <Building2 className="w-4 h-4 text-[#6B7280]" />
            <span className="font-medium">{mockLegalEntityContext.legalEntityName}</span>
            <span className="text-[#6B7280]">·</span>
            <span className="font-medium">{mockLegalEntityContext.orgUnitName}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-[#6B7280]">
            <Activity className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-pulse' : ''}`} />
            <span>Last updated: {getTimeSince(lastSync.toISOString())}</span>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-3 py-1.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-sm font-medium text-[#111827] hover:bg-white disabled:opacity-50 flex items-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* SCROLLABLE CONTENT */}
      {/* ===================================================================== */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-[1600px] mx-auto space-y-6">
          {/* ================================================================= */}
          {/* 3. HEALTH SUMMARY LAYER (TOP PRIORITY) */}
          {/* ================================================================= */}
          <div className="grid grid-cols-4 gap-4">
            {/* Total Screens */}
            <button
              onClick={() => handleMetricClick('all')}
              className="bg-white border-2 border-[#E5E7EB] rounded-lg p-6 text-left hover:border-[#D9480F] transition-colors"
            >
              <div className="text-xs font-medium text-[#6B7280] mb-2">TOTAL SCREENS</div>
              <div className="text-4xl font-semibold text-[#111827]">{metrics.totalScreens}</div>
            </button>

            {/* Online */}
            <button
              onClick={() => handleMetricClick('online')}
              className="bg-white border-2 border-[#047857] rounded-lg p-6 text-left hover:bg-[#ECFDF5] transition-colors"
            >
              <div className="text-xs font-medium text-[#6B7280] mb-2">ONLINE</div>
              <div className="text-4xl font-semibold text-[#047857]">{metrics.online}</div>
            </button>

            {/* Offline */}
            <button
              onClick={() => handleMetricClick('offline')}
              className="bg-white border-2 border-[#DC2626] rounded-lg p-6 text-left hover:bg-[#FEF2F2] transition-colors"
            >
              <div className="text-xs font-medium text-[#6B7280] mb-2">OFFLINE</div>
              <div className="text-4xl font-semibold text-[#DC2626]">{metrics.offline}</div>
            </button>

            {/* Degraded */}
            <button
              onClick={() => handleMetricClick('degraded')}
              className="bg-white border-2 border-[#F59E0B] rounded-lg p-6 text-left hover:bg-[#FFFBEB] transition-colors"
            >
              <div className="text-xs font-medium text-[#6B7280] mb-2">DEGRADED</div>
              <div className="text-4xl font-semibold text-[#F59E0B]">{metrics.degraded}</div>
            </button>
          </div>

          {/* ================================================================= */}
          {/* 4. CRITICAL ALERTS PANEL (ACTION-ORIENTED) */}
          {/* ================================================================= */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg">
            <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-[#111827] font-semibold">Critical Alerts</h2>
                {sortedAlerts.length > 0 && (
                  <span className="px-2 py-0.5 bg-[#DC2626] text-white text-xs font-medium rounded">
                    {sortedAlerts.length}
                  </span>
                )}
              </div>
              {hiddenAlertsCount > 0 && (
                <button
                  onClick={() => navigate('/terminals?filter=alerts')}
                  className="text-sm text-[#D9480F] hover:underline flex items-center gap-1"
                >
                  View All Alerts
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div className="divide-y divide-[#E5E7EB]">
              {displayedAlerts.length === 0 ? (
                <div className="px-6 py-8 text-center">
                  <CheckCircle2 className="w-10 h-10 text-[#047857] mx-auto mb-2" />
                  <div className="text-sm text-[#111827] font-medium">No Active Alerts</div>
                  <div className="text-xs text-[#6B7280] mt-1">All systems operating normally</div>
                </div>
              ) : (
                displayedAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`px-6 py-4 border-l-4 ${getSeverityColor(alert.severity)}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded ${
                              alert.severity === 'critical'
                                ? 'bg-[#DC2626] text-white'
                                : alert.severity === 'high'
                                ? 'bg-[#F59E0B] text-white'
                                : 'bg-[#3B82F6] text-white'
                            }`}
                          >
                            {getIssueTypeLabel(alert.issueType)}
                          </span>
                          <span className="text-xs text-[#6B7280]">
                            {getTimeSince(alert.detectedAt)}
                          </span>
                        </div>
                        <div className="font-medium text-[#111827] mb-1">{alert.screenName}</div>
                        <div className="text-sm text-[#6B7280]">{alert.location}</div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {alert.issueType === 'offline' && (
                          <button
                            onClick={() => handleAlertAction(alert.id, 'restart')}
                            className="px-3 py-1.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-medium text-[#111827] hover:bg-white flex items-center gap-1.5"
                            title="Restart Device"
                          >
                            <Power className="w-3.5 h-3.5" />
                            Restart
                          </button>
                        )}
                        {alert.issueType === 'sync-pending' && (
                          <button
                            onClick={() => handleAlertAction(alert.id, 'sync')}
                            className="px-3 py-1.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-medium text-[#111827] hover:bg-white flex items-center gap-1.5"
                            title="Sync Now"
                          >
                            <RefreshCcw className="w-3.5 h-3.5" />
                            Sync Now
                          </button>
                        )}
                        <button
                          onClick={() => handleAlertView(alert)}
                          className="px-3 py-1.5 bg-[#D9480F] text-white rounded text-xs font-medium hover:bg-[#C13D0C] flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ================================================================= */}
          {/* 5. KIOSK HEALTH OVERVIEW (LOCATION-BASED) */}
          {/* ================================================================= */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg">
            <div className="px-6 py-4 border-b border-[#E5E7EB]">
              <h2 className="text-[#111827] font-semibold">Location Health Clusters</h2>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              {locationClusters.map((cluster) => (
                <button
                  key={cluster.id}
                  onClick={() => handleLocationClick(cluster.id)}
                  className="border border-[#E5E7EB] rounded-lg p-4 text-left hover:border-[#D9480F] transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-medium text-[#111827] mb-1">{cluster.locationName}</div>
                      <div className="text-xs text-[#6B7280]">{cluster.region}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-semibold text-[#111827]">
                        {cluster.healthPercentage}%
                      </div>
                      <div className="text-xs text-[#6B7280]">Health</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div>
                        <span className="text-[#047857] font-medium">{cluster.online}</span>
                        <span className="text-[#6B7280] text-xs ml-1">online</span>
                      </div>
                      {cluster.degraded > 0 && (
                        <div>
                          <span className="text-[#F59E0B] font-medium">{cluster.degraded}</span>
                          <span className="text-[#6B7280] text-xs ml-1">degraded</span>
                        </div>
                      )}
                      {cluster.offline > 0 && (
                        <div>
                          <span className="text-[#DC2626] font-medium">{cluster.offline}</span>
                          <span className="text-[#6B7280] text-xs ml-1">offline</span>
                        </div>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#6B7280]" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* ================================================================= */}
          {/* 6. DEVICE TELEMETRY SNAPSHOT (ONLY WHEN THRESHOLDS CROSSED) */}
          {/* ================================================================= */}
          {criticalTelemetry.length > 0 && (
            <div className="bg-white border border-[#E5E7EB] rounded-lg">
              <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
                <h2 className="text-[#111827] font-semibold">Device Telemetry Alerts</h2>
              </div>
              <div className="divide-y divide-[#E5E7EB]">
                {criticalTelemetry.map((device) => (
                  <div key={device.screenId} className="px-6 py-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-medium text-[#111827]">{device.screenName}</div>
                        <div className="text-xs text-[#6B7280]">
                          Last report: {getTimeSince(device.lastReport)}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {/* Voltage */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-3.5 h-3.5 text-[#6B7280]" />
                          <span className="text-xs text-[#6B7280]">Voltage</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-[#F9FAFB] rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                device.voltage < 70
                                  ? 'bg-[#DC2626]'
                                  : device.voltage < 80
                                  ? 'bg-[#F59E0B]'
                                  : 'bg-[#047857]'
                              }`}
                              style={{ width: `${device.voltage}%` }}
                            />
                          </div>
                          <span
                            className={`text-sm font-medium ${
                              device.voltage < 80 ? 'text-[#DC2626]' : 'text-[#111827]'
                            }`}
                          >
                            {device.voltage}%
                          </span>
                        </div>
                      </div>

                      {/* Temperature */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Thermometer className="w-3.5 h-3.5 text-[#6B7280]" />
                          <span className="text-xs text-[#6B7280]">Temperature</span>
                        </div>
                        <div
                          className={`text-sm font-medium ${
                            device.temperature > 70
                              ? 'text-[#DC2626]'
                              : device.temperature > 65
                              ? 'text-[#F59E0B]'
                              : 'text-[#111827]'
                          }`}
                        >
                          {device.temperature}°C
                        </div>
                      </div>

                      {/* Sync Health */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <RefreshCcw className="w-3.5 h-3.5 text-[#6B7280]" />
                          <span className="text-xs text-[#6B7280]">Sync Health</span>
                        </div>
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded ${
                            device.syncHealth === 'critical'
                              ? 'bg-[#FEF2F2] text-[#DC2626]'
                              : device.syncHealth === 'warning'
                              ? 'bg-[#FFFBEB] text-[#F59E0B]'
                              : 'bg-[#ECFDF5] text-[#047857]'
                          }`}
                        >
                          {device.syncHealth.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* 7. PLAYBACK ACTIVITY MONITOR */}
          {/* ================================================================= */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg">
            <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-[#111827] font-semibold">Playback Activity Monitor</h2>
                {exceptionPlaybackEvents.length > 0 && (
                  <span className="px-2 py-0.5 bg-[#F59E0B] text-white text-xs font-medium rounded">
                    {exceptionPlaybackEvents.length} exceptions
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                {exceptionPlaybackEvents.length > 0 && (
                  <button
                    onClick={() => setShowAllPlayback(!showAllPlayback)}
                    className="text-sm text-[#6B7280] hover:text-[#111827]"
                  >
                    {showAllPlayback ? 'Show Exceptions Only' : 'Show All Events'}
                  </button>
                )}
                <button
                  onClick={() => navigate('/campaigns?view=pop-audit')}
                  className="text-sm text-[#D9480F] hover:underline flex items-center gap-1"
                >
                  Full PoP Audit
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="divide-y divide-[#E5E7EB]">
              {displayedPlaybackEvents.length === 0 ? (
                <div className="px-6 py-8 text-center">
                  <PlayCircle className="w-10 h-10 text-[#047857] mx-auto mb-2" />
                  <div className="text-sm text-[#111827] font-medium">All Playback Normal</div>
                  <div className="text-xs text-[#6B7280] mt-1">No exceptions detected</div>
                </div>
              ) : (
                displayedPlaybackEvents.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => handlePlaybackEventClick(event.screenId)}
                    className="w-full px-6 py-3 text-left hover:bg-[#F9FAFB] flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded ${getPlaybackStatusColor(
                            event.status
                          )}`}
                        >
                          {getPlaybackStatusLabel(event.status)}
                        </span>
                        <span className="font-medium text-[#111827]">{event.campaignName}</span>
                      </div>
                      <div className="text-sm text-[#6B7280]">
                        {event.screenName} · {event.timeWindow}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#6B7280]">
                        {getTimeSince(event.timestamp)}
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#6B7280]" />
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* ================================================================= */}
          {/* 8. GEO PERFORMANCE SUMMARY (OPTIONAL LAYER) */}
          {/* ================================================================= */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg">
            <div className="px-6 py-4 border-b border-[#E5E7EB]">
              <h2 className="text-[#111827] font-semibold">Regional Performance</h2>
            </div>
            <div className="p-6 grid grid-cols-3 gap-4">
              {regionPerformance.map((region) => (
                <div
                  key={region.id}
                  className="border border-[#E5E7EB] rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-medium text-[#111827]">{region.regionName}</div>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        region.health === 'healthy'
                          ? 'bg-[#047857]'
                          : region.health === 'degraded'
                          ? 'bg-[#F59E0B]'
                          : 'bg-[#DC2626]'
                      }`}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-xs text-[#6B7280] mb-1">Screens</div>
                      <div className="font-semibold text-[#111827]">{region.totalScreens}</div>
                    </div>
                    <div>
                      <div className="text-xs text-[#6B7280] mb-1">Campaigns</div>
                      <div className="font-semibold text-[#111827]">{region.activeCampaigns}</div>
                    </div>
                    <div>
                      <div className="text-xs text-[#6B7280] mb-1">Plays Today</div>
                      <div className="font-semibold text-[#111827]">
                        {region.playVolume.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
