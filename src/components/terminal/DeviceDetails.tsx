import { useState } from 'react';
import { 
  ArrowLeft,
  Cpu,
  HardDrive,
  Thermometer,
  Wifi,
  Activity,
  RefreshCw,
  Power,
  Download,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
  Database,
  PlayCircle,
  PauseCircle,
  Wrench,
  Shield,
  XCircle,
  Eye,
  Monitor,
  Sun,
  Battery,
  Zap,
  Radio,
  Volume2,
  Video,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { ConfirmModal } from './ConfirmModal';
import { toast } from 'sonner';

interface Terminal {
  id: string;
  deviceId: string;
  name: string;
  model: string;
  status: 'online' | 'offline' | 'warning';
  location?: string;
  region?: string;
  group?: string;
  lastSeen: string;
  version: string;
  cpu: number;
  ram: number;
  temperature: number;
  storage: number;
  connectionQuality: number;
  lastMidnightSync: string;
  osVersion: string;
  firmwareVersion: string;
  serialNumber: string;
  uptime: number;
  locationProfile?: any; // Location profile data
  hasLocationProfile?: boolean; // Location profile status
  
  // Additional IoT metrics
  networkSpeed?: number; // in Mbps
  displayBrightness?: number; // percentage
  powerStatus?: 'ac' | 'battery' | 'ups';
  batteryLevel?: number; // percentage
  screenOnTime?: number; // hours today
  contentSyncStatus?: 'synced' | 'syncing' | 'pending';
  gpuUsage?: number; // percentage
  audioLevel?: number; // percentage
  ambientLight?: number; // lux
  displayHealth?: number; // percentage (pixel health)
}

interface DeviceDetailsProps {
  terminal: Terminal;
  onBack: () => void;
  onOpenLocationProfile: (terminal: Terminal) => void;
}

export function DeviceDetails({ terminal, onBack, onOpenLocationProfile }: DeviceDetailsProps) {
  const [isRestarting, setIsRestarting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  
  // Operational state
  const [isEnabled, setIsEnabled] = useState(true);
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [isContentPaused, setIsContentPaused] = useState(false);

  // Modal states
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    variant?: 'danger' | 'warning' | 'info';
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const formatLastSeen = (isoDate: string) => {
    const date = new Date(isoDate);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    return date.toLocaleDateString();
  };

  const formatUptime = (hours: number) => {
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return `${days}d ${remainingHours}h`;
  };

  const getMetricColor = (value: number, type: 'cpu' | 'ram' | 'temperature' | 'storage' | 'connection') => {
    if (type === 'connection') {
      if (value >= 80) return 'text-[#16A34A]';
      if (value >= 50) return 'text-[#F59E0B]';
      return 'text-[#DC2626]';
    }
    
    if (type === 'temperature') {
      if (value >= 60) return 'text-[#DC2626]';
      if (value >= 50) return 'text-[#F59E0B]';
      return 'text-[#16A34A]';
    }
    
    if (value >= 85) return 'text-[#DC2626]';
    if (value >= 70) return 'text-[#F59E0B]';
    return 'text-[#16A34A]';
  };

  const getMetricBgColor = (value: number, type: 'cpu' | 'ram' | 'temperature' | 'storage' | 'connection') => {
    if (type === 'connection') {
      if (value >= 80) return 'bg-[#16A34A]';
      if (value >= 50) return 'bg-[#F59E0B]';
      return 'bg-[#DC2626]';
    }
    
    if (type === 'temperature') {
      if (value >= 60) return 'bg-[#DC2626]';
      if (value >= 50) return 'bg-[#F59E0B]';
      return 'bg-[#16A34A]';
    }
    
    if (value >= 85) return 'bg-[#DC2626]';
    if (value >= 70) return 'bg-[#F59E0B]';
    return 'bg-[#16A34A]';
  };

  const handleRestartDevice = async () => {
    setConfirmModal({
      isOpen: true,
      title: 'Restart Device',
      message: 'Are you sure you want to restart this device? It will be offline for a few minutes.',
      confirmText: 'Restart',
      variant: 'danger',
      onConfirm: async () => {
        setIsRestarting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsRestarting(false);
        toast.success('Device restart command sent successfully');
      }
    });
  };

  const handleRefreshData = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
    toast.success('Device data refreshed successfully');
  };

  const handleUpdateSoftware = async () => {
    setConfirmModal({
      isOpen: true,
      title: 'Update Software',
      message: 'Update device software to the latest version? This may take several minutes.',
      confirmText: 'Update',
      variant: 'warning',
      onConfirm: async () => {
        setIsUpdating(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 3000));
        setIsUpdating(false);
        toast.success('Software update initiated successfully');
      }
    });
  };

  const handleClearCache = async () => {
    setConfirmModal({
      isOpen: true,
      title: 'Clear Cache',
      message: 'Clear device cache? This will free up storage space.',
      confirmText: 'Clear',
      variant: 'info',
      onConfirm: async () => {
        setIsClearing(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsClearing(false);
        toast.success('Cache cleared successfully');
      }
    });
  };

  const handleToggleEnabled = async () => {
    const action = isEnabled ? 'disable' : 'enable';
    setConfirmModal({
      isOpen: true,
      title: isEnabled ? 'Disable Kiosk' : 'Enable Kiosk',
      message: `Are you sure you want to ${action} this kiosk? ${isEnabled ? 'Content playback will stop and campaigns won\'t run.' : 'The kiosk will resume normal operations.'}`,
      confirmText: action.charAt(0).toUpperCase() + action.slice(1),
      variant: isEnabled ? 'warning' : 'info',
      onConfirm: async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const wasEnabled = isEnabled;
        setIsEnabled(!isEnabled);
        toast.success(`Kiosk ${wasEnabled ? 'disabled' : 'enabled'} successfully`);
      }
    });
  };

  const handleToggleMaintenanceMode = async () => {
    const action = isMaintenanceMode ? 'exit' : 'enter';
    setConfirmModal({
      isOpen: true,
      title: isMaintenanceMode ? 'Exit Maintenance Mode' : 'Enter Maintenance Mode',
      message: `${action === 'enter' ? 'Enable' : 'Disable'} maintenance mode? ${action === 'enter' ? 'A maintenance message will be displayed on the screen.' : 'Normal content playback will resume.'}`,
      confirmText: action === 'enter' ? 'Enable' : 'Disable',
      variant: 'warning',
      onConfirm: async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const wasInMaintenance = isMaintenanceMode;
        setIsMaintenanceMode(!isMaintenanceMode);
        toast.success(`Maintenance mode ${wasInMaintenance ? 'disabled' : 'enabled'} successfully`);
      }
    });
  };

  const handleToggleContentPlayback = async () => {
    const action = isContentPaused ? 'resume' : 'pause';
    setConfirmModal({
      isOpen: true,
      title: isContentPaused ? 'Resume Content Playback' : 'Pause Content Playback',
      message: `${action === 'pause' ? 'Pause' : 'Resume'} content playback? ${action === 'pause' ? 'Current content will freeze on screen.' : 'Content playback will resume from current state.'}`,
      confirmText: action.charAt(0).toUpperCase() + action.slice(1),
      variant: 'info',
      onConfirm: async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const wasPaused = isContentPaused;
        setIsContentPaused(!isContentPaused);
        toast.success(`Content playback ${wasPaused ? 'resumed' : 'paused'} successfully`);
      }
    });
  };

  const handleRemotePreview = () => {
    toast.info('Remote screen preview feature coming soon');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Back Navigation Bar - Replaces tabs when viewing device details */}
      <div className="bg-white border-b border-[#E5E7EB] sticky top-16 z-10">
        <div className="px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#D9480F] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Device Overview
          </button>
        </div>
      </div>

      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-[#111827]">{terminal.name}</h1>
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${
                    terminal.status === 'online' ? 'bg-[#16A34A] animate-pulse' :
                    terminal.status === 'offline' ? 'bg-[#DC2626]' :
                    'bg-[#F59E0B]'
                  }`}></div>
                  <span className={`text-sm font-medium ${
                    terminal.status === 'online' ? 'text-[#16A34A]' :
                    terminal.status === 'offline' ? 'text-[#DC2626]' :
                    'text-[#F59E0B]'
                  }`}>
                    {terminal.status.charAt(0).toUpperCase() + terminal.status.slice(1)}
                  </span>
                </div>
              </div>
              <p className="text-[#6B7280] font-mono">{terminal.deviceId}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Health Metrics */}
          <div className="col-span-2 space-y-6">
            {/* Health Dashboard */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
              <h3 className="text-[#111827] mb-6">System Health</h3>
              
              <div className="grid grid-cols-2 gap-6">
                {/* CPU Usage */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-[#6B7280]" />
                      <span className="text-sm text-[#6B7280]">CPU Usage</span>
                    </div>
                    <span className={`text-sm font-semibold ${getMetricColor(terminal.cpu, 'cpu')}`}>
                      {terminal.cpu}%
                    </span>
                  </div>
                  <div className="h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getMetricBgColor(terminal.cpu, 'cpu')} transition-all duration-500`}
                      style={{ width: `${terminal.cpu}%` }}
                    ></div>
                  </div>
                </div>

                {/* RAM Usage */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-[#6B7280]" />
                      <span className="text-sm text-[#6B7280]">RAM Usage</span>
                    </div>
                    <span className={`text-sm font-semibold ${getMetricColor(terminal.ram, 'ram')}`}>
                      {terminal.ram}%
                    </span>
                  </div>
                  <div className="h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getMetricBgColor(terminal.ram, 'ram')} transition-all duration-500`}
                      style={{ width: `${terminal.ram}%` }}
                    ></div>
                  </div>
                </div>

                {/* Storage */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-4 h-4 text-[#6B7280]" />
                      <span className="text-sm text-[#6B7280]">Storage</span>
                    </div>
                    <span className={`text-sm font-semibold ${getMetricColor(terminal.storage, 'storage')}`}>
                      {terminal.storage}%
                    </span>
                  </div>
                  <div className="h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getMetricBgColor(terminal.storage, 'storage')} transition-all duration-500`}
                      style={{ width: `${terminal.storage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Temperature */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-[#6B7280]" />
                      <span className="text-sm text-[#6B7280]">Temperature</span>
                    </div>
                    <span className={`text-sm font-semibold ${getMetricColor(terminal.temperature, 'temperature')}`}>
                      {terminal.temperature}°C
                    </span>
                  </div>
                  <div className="h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getMetricBgColor(terminal.temperature, 'temperature')} transition-all duration-500`}
                      style={{ width: `${Math.min(terminal.temperature * 1.5, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Connection Quality */}
                <div className="col-span-2">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Wifi className="w-4 h-4 text-[#6B7280]" />
                      <span className="text-sm text-[#6B7280]">Connection Quality</span>
                    </div>
                    <span className={`text-sm font-semibold ${getMetricColor(terminal.connectionQuality, 'connection')}`}>
                      {terminal.connectionQuality}%
                    </span>
                  </div>
                  <div className="h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getMetricBgColor(terminal.connectionQuality, 'connection')} transition-all duration-500`}
                      style={{ width: `${terminal.connectionQuality}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Display & IoT Health */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
              <h3 className="text-[#111827] mb-6">Display & IoT Health</h3>
              
              <div className="grid grid-cols-2 gap-6">
                {/* GPU Usage */}
                {terminal.gpuUsage !== undefined && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4 text-[#6B7280]" />
                        <span className="text-sm text-[#6B7280]">GPU Usage</span>
                      </div>
                      <span className={`text-sm font-semibold ${getMetricColor(terminal.gpuUsage, 'cpu')}`}>
                        {terminal.gpuUsage}%
                      </span>
                    </div>
                    <div className="h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getMetricBgColor(terminal.gpuUsage, 'cpu')} transition-all duration-500`}
                        style={{ width: `${terminal.gpuUsage}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Display Health */}
                {terminal.displayHealth !== undefined && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Monitor className="w-4 h-4 text-[#6B7280]" />
                        <span className="text-sm text-[#6B7280]">Display Health</span>
                      </div>
                      <span className={`text-sm font-semibold ${
                        terminal.displayHealth >= 95 ? 'text-[#16A34A]' :
                        terminal.displayHealth >= 85 ? 'text-[#F59E0B]' :
                        'text-[#DC2626]'
                      }`}>
                        {terminal.displayHealth}%
                      </span>
                    </div>
                    <div className="h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          terminal.displayHealth >= 95 ? 'bg-[#16A34A]' :
                          terminal.displayHealth >= 85 ? 'bg-[#F59E0B]' :
                          'bg-[#DC2626]'
                        } transition-all duration-500`}
                        style={{ width: `${terminal.displayHealth}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Display Brightness */}
                {terminal.displayBrightness !== undefined && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Sun className="w-4 h-4 text-[#6B7280]" />
                        <span className="text-sm text-[#6B7280]">Display Brightness</span>
                      </div>
                      <span className="text-sm font-semibold text-[#111827]">
                        {terminal.displayBrightness}%
                      </span>
                    </div>
                    <div className="h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#3B82F6] transition-all duration-500"
                        style={{ width: `${terminal.displayBrightness}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Audio Level */}
                {terminal.audioLevel !== undefined && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Volume2 className="w-4 h-4 text-[#6B7280]" />
                        <span className="text-sm text-[#6B7280]">Audio Level</span>
                      </div>
                      <span className="text-sm font-semibold text-[#111827]">
                        {terminal.audioLevel}%
                      </span>
                    </div>
                    <div className="h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#16A34A] transition-all duration-500"
                        style={{ width: `${terminal.audioLevel}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Network Speed */}
                {terminal.networkSpeed !== undefined && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Radio className="w-4 h-4 text-[#6B7280]" />
                        <span className="text-sm text-[#6B7280]">Network Speed</span>
                      </div>
                      <span className={`text-sm font-semibold ${
                        terminal.networkSpeed >= 50 ? 'text-[#16A34A]' :
                        terminal.networkSpeed >= 20 ? 'text-[#F59E0B]' :
                        'text-[#DC2626]'
                      }`}>
                        {terminal.networkSpeed} Mbps
                      </span>
                    </div>
                    <div className="h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          terminal.networkSpeed >= 50 ? 'bg-[#16A34A]' :
                          terminal.networkSpeed >= 20 ? 'bg-[#F59E0B]' :
                          'bg-[#DC2626]'
                        } transition-all duration-500`}
                        style={{ width: `${Math.min((terminal.networkSpeed / 100) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Ambient Light */}
                {terminal.ambientLight !== undefined && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Sun className="w-4 h-4 text-[#6B7280]" />
                        <span className="text-sm text-[#6B7280]">Ambient Light</span>
                      </div>
                      <span className="text-sm font-semibold text-[#111827]">
                        {terminal.ambientLight} lux
                      </span>
                    </div>
                    <div className="h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#F59E0B] transition-all duration-500"
                        style={{ width: `${Math.min((terminal.ambientLight / 1000) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Power Status & Battery (if applicable) */}
                {terminal.powerStatus && (
                  <div className="col-span-2">
                    <div className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          terminal.powerStatus === 'ac' ? 'bg-[#DCFCE7]' :
                          terminal.powerStatus === 'battery' ? 'bg-[#FEF3C7]' :
                          'bg-[#EFF6FF]'
                        }`}>
                          {terminal.powerStatus === 'battery' ? (
                            <Battery className={`w-5 h-5 ${
                              terminal.batteryLevel && terminal.batteryLevel > 20 ? 'text-[#16A34A]' : 'text-[#DC2626]'
                            }`} />
                          ) : (
                            <Zap className="w-5 h-5 text-[#16A34A]" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-[#111827] font-medium mb-0.5">Power Status</p>
                          <p className="text-xs text-[#6B7280]">
                            {terminal.powerStatus === 'ac' ? 'AC Power' :
                             terminal.powerStatus === 'battery' ? `Battery (${terminal.batteryLevel}%)` :
                             'UPS Backup'}
                          </p>
                        </div>
                      </div>
                      {terminal.powerStatus === 'ac' && (
                        <CheckCircle className="w-5 h-5 text-[#16A34A]" />
                      )}
                      {terminal.powerStatus === 'battery' && terminal.batteryLevel && terminal.batteryLevel <= 20 && (
                        <AlertCircle className="w-5 h-5 text-[#DC2626]" />
                      )}
                    </div>
                  </div>
                )}

                {/* Screen On Time Today */}
                {terminal.screenOnTime !== undefined && (
                  <div className="col-span-2">
                    <div className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                          <Clock className="w-5 h-5 text-[#3B82F6]" />
                        </div>
                        <div>
                          <p className="text-sm text-[#111827] font-medium mb-0.5">Screen On Time</p>
                          <p className="text-xs text-[#6B7280]">
                            {terminal.screenOnTime.toFixed(1)} hours today
                          </p>
                        </div>
                      </div>
                      <CheckCircle className="w-5 h-5 text-[#16A34A]" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Configuration Info */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
              <h3 className="text-[#111827] mb-6">Device Configuration</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Model</p>
                  <p className="text-sm text-[#111827] font-medium">{terminal.model}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Serial Number</p>
                  <p className="text-sm text-[#111827] font-mono">{terminal.serialNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Software Version</p>
                  <p className="text-sm text-[#111827] font-mono">v{terminal.version}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">OS Version</p>
                  <p className="text-sm text-[#111827] font-mono">{terminal.osVersion}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Firmware</p>
                  <p className="text-sm text-[#111827] font-mono">{terminal.firmwareVersion}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Uptime</p>
                  <p className="text-sm text-[#111827]">{formatUptime(terminal.uptime)}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Region</p>
                  <p className="text-sm text-[#111827]">{terminal.region || 'Not assigned'}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Group</p>
                  <p className="text-sm text-[#111827]">{terminal.group || 'Not assigned'}</p>
                </div>
              </div>
            </div>

            {/* Data Sync Info */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
              <h3 className="text-[#111827] mb-6">Data Synchronization</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                      <Database className="w-5 h-5 text-[#3B82F6]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#111827] font-medium mb-0.5">Last Midnight Sync</p>
                      <p className="text-xs text-[#6B7280]">
                        {new Date(terminal.lastMidnightSync).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-[#16A34A]" />
                </div>

                <div className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[#3B82F6]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#111827] font-medium mb-0.5">Last Heartbeat</p>
                      <p className="text-xs text-[#6B7280]">
                        {formatLastSeen(terminal.lastSeen)}
                      </p>
                    </div>
                  </div>
                  {terminal.status === 'online' && (
                    <div className="w-2 h-2 bg-[#16A34A] rounded-full animate-pulse"></div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Maintenance Panel */}
          <div className="col-span-1">
            {/* Operational Status Card */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 mb-6">
              <h3 className="text-[#111827] mb-4">Operational Status</h3>
              
              <div className="space-y-3">
                {/* Kiosk Status */}
                <div className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isEnabled ? 'bg-[#DCFCE7]' : 'bg-[#FEE2E2]'
                    }`}>
                      <Shield className={`w-4 h-4 ${
                        isEnabled ? 'text-[#16A34A]' : 'text-[#DC2626]'
                      }`} />
                    </div>
                    <div>
                      <p className="text-xs text-[#6B7280]">Kiosk</p>
                      <p className={`text-sm font-medium ${
                        isEnabled ? 'text-[#16A34A]' : 'text-[#DC2626]'
                      }`}>
                        {isEnabled ? 'Enabled' : 'Disabled'}
                      </p>
                    </div>
                  </div>
                  {isEnabled && <CheckCircle className="w-4 h-4 text-[#16A34A]" />}
                  {!isEnabled && <XCircle className="w-4 h-4 text-[#DC2626]" />}
                </div>

                {/* Maintenance Mode */}
                {isMaintenanceMode && (
                  <div className="flex items-center justify-between p-3 bg-[#FEF3C7] border border-[#FDE68A] rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#FEF9C3] rounded-lg flex items-center justify-center">
                        <Wrench className="w-4 h-4 text-[#F59E0B]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#92400E]">Mode</p>
                        <p className="text-sm font-medium text-[#F59E0B]">Maintenance</p>
                      </div>
                    </div>
                    <AlertCircle className="w-4 h-4 text-[#F59E0B]" />
                  </div>
                )}

                {/* Content Playback */}
                {isContentPaused && (
                  <div className="flex items-center justify-between p-3 bg-[#EFF6FF] border border-[#DBEAFE] rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#DBEAFE] rounded-lg flex items-center justify-center">
                        <PauseCircle className="w-4 h-4 text-[#3B82F6]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#1E40AF]">Content</p>
                        <p className="text-sm font-medium text-[#3B82F6]">Paused</p>
                      </div>
                    </div>
                    <AlertCircle className="w-4 h-4 text-[#3B82F6]" />
                  </div>
                )}
              </div>
            </div>

            {/* Maintenance Actions */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 mb-6">
              <h3 className="text-[#111827] mb-6">Controls & Maintenance</h3>
              
              <div className="space-y-3">
                {/* Restart Device */}
                <button
                  onClick={handleRestartDevice}
                  disabled={isRestarting || terminal.status === 'offline'}
                  className="w-full flex items-center gap-3 px-4 h-11 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] hover:bg-[#F9FAFB] disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF] disabled:cursor-not-allowed transition-colors"
                >
                  <Power className="w-4 h-4" />
                  {isRestarting ? 'Restarting...' : 'Restart Device'}
                </button>

                {/* Refresh Data */}
                <button
                  onClick={handleRefreshData}
                  disabled={isRefreshing || terminal.status === 'offline'}
                  className="w-full flex items-center gap-3 px-4 h-11 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] hover:bg-[#F9FAFB] disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF] disabled:cursor-not-allowed transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
                </button>

                {/* Update Software */}
                <button
                  onClick={handleUpdateSoftware}
                  disabled={isUpdating || terminal.status === 'offline'}
                  className="w-full flex items-center gap-3 px-4 h-11 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] hover:bg-[#F9FAFB] disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF] disabled:cursor-not-allowed transition-colors"
                >
                  <Download className="w-4 h-4" />
                  {isUpdating ? 'Updating...' : 'Update Software'}
                </button>

                {/* Clear Cache */}
                <button
                  onClick={handleClearCache}
                  disabled={isClearing || terminal.status === 'offline'}
                  className="w-full flex items-center gap-3 px-4 h-11 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] hover:bg-[#F9FAFB] disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF] disabled:cursor-not-allowed transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  {isClearing ? 'Clearing...' : 'Clear Cache'}
                </button>

                {/* Toggle Enabled */}
                <button
                  onClick={handleToggleEnabled}
                  disabled={terminal.status === 'offline'}
                  className="w-full flex items-center gap-3 px-4 h-11 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] hover:bg-[#F9FAFB] disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF] disabled:cursor-not-allowed transition-colors"
                >
                  {isEnabled ? (
                    <PauseCircle className="w-4 h-4" />
                  ) : (
                    <PlayCircle className="w-4 h-4" />
                  )}
                  {isEnabled ? 'Disable Kiosk' : 'Enable Kiosk'}
                </button>

                {/* Toggle Maintenance Mode */}
                <button
                  onClick={handleToggleMaintenanceMode}
                  disabled={terminal.status === 'offline'}
                  className="w-full flex items-center gap-3 px-4 h-11 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] hover:bg-[#F9FAFB] disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF] disabled:cursor-not-allowed transition-colors"
                >
                  {isMaintenanceMode ? (
                    <XCircle className="w-4 h-4" />
                  ) : (
                    <Wrench className="w-4 h-4" />
                  )}
                  {isMaintenanceMode ? 'Exit Maintenance Mode' : 'Enter Maintenance Mode'}
                </button>

                {/* Toggle Content Playback */}
                <button
                  onClick={handleToggleContentPlayback}
                  disabled={terminal.status === 'offline'}
                  className="w-full flex items-center gap-3 px-4 h-11 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] hover:bg-[#F9FAFB] disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF] disabled:cursor-not-allowed transition-colors"
                >
                  {isContentPaused ? (
                    <PlayCircle className="w-4 h-4" />
                  ) : (
                    <PauseCircle className="w-4 h-4" />
                  )}
                  {isContentPaused ? 'Resume Content Playback' : 'Pause Content Playback'}
                </button>

                {/* Remote Preview */}
                <button
                  onClick={handleRemotePreview}
                  disabled={terminal.status === 'offline'}
                  className="w-full flex items-center gap-3 px-4 h-11 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] hover:bg-[#F9FAFB] disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF] disabled:cursor-not-allowed transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  Remote Screen Preview
                </button>

                {terminal.status === 'offline' && (
                  <div className="mt-4 p-3 bg-[#FEF3C7] border border-[#FDE68A] rounded-lg">
                    <div className="flex gap-2">
                      <AlertCircle className="w-4 h-4 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-[#92400E]">
                        Device is offline. Maintenance actions are unavailable.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Location Profile Status Card */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[#111827]">Location Profile</h3>
                <button
                  onClick={() => onOpenLocationProfile(terminal)}
                  className={`flex items-center gap-2 px-4 h-9 rounded-lg text-sm transition-colors ${
                    terminal.hasLocationProfile
                      ? 'bg-[#DCFCE7] text-[#166534] hover:bg-[#BBF7D0]'
                      : 'bg-[#FEF3C7] text-[#92400E] hover:bg-[#FDE68A]'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  {terminal.hasLocationProfile ? 'View / Edit' : 'Create Profile'}
                </button>
              </div>

              {terminal.hasLocationProfile ? (
                <div className="space-y-4">
                  {/* Status Badge */}
                  <div className="flex items-center gap-2 p-3 bg-[#DCFCE7] rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                    <div>
                      <p className="text-sm font-medium text-[#166534]">Profile Complete</p>
                      <p className="text-xs text-[#166534]/70 mt-0.5">Location details are fully configured</p>
                    </div>
                  </div>

                  {/* Quick Details */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-[#6B7280] mb-1">Location</p>
                      <p className="text-sm text-[#111827]">{terminal.location || 'Not specified'}</p>
                    </div>
                    
                    {terminal.region && (
                      <div>
                        <p className="text-xs text-[#6B7280] mb-1">Region</p>
                        <p className="text-sm text-[#111827]">{terminal.region}</p>
                      </div>
                    )}
                    
                    {terminal.group && (
                      <div>
                        <p className="text-xs text-[#6B7280] mb-1">Device Group</p>
                        <span className="inline-flex px-2 py-1 bg-[#F3F4F6] text-[#111827] rounded text-xs">
                          {terminal.group}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Last Updated */}
                  <div className="pt-3 border-t border-[#E5E7EB]">
                    <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Last updated: 2 days ago by Sarah Khan</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Warning Badge */}
                  <div className="flex items-center gap-2 p-3 bg-[#FEF3C7] rounded-lg">
                    <AlertCircle className="w-5 h-5 text-[#F59E0B]" />
                    <div>
                      <p className="text-sm font-medium text-[#92400E]">Profile Needed</p>
                      <p className="text-xs text-[#92400E]/70 mt-0.5">Complete location profiling for better targeting</p>
                    </div>
                  </div>

                  {/* Info Text */}
                  <div className="text-sm text-[#6B7280] space-y-2">
                    <p>Location profiles help you:</p>
                    <ul className="space-y-1 ml-4">
                      <li className="flex items-start gap-2">
                        <span className="text-[#D9480F] mt-0.5">•</span>
                        <span>Target campaigns by venue type and location</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D9480F] mt-0.5">•</span>
                        <span>Group devices for efficient management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D9480F] mt-0.5">•</span>
                        <span>Analyze performance by demographics</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        variant={confirmModal.variant}
        onConfirm={() => {
          confirmModal.onConfirm();
          setConfirmModal({ isOpen: false, title: '', message: '', onConfirm: () => {} });
        }}
        onClose={() => setConfirmModal({ isOpen: false, title: '', message: '', onConfirm: () => {} })}
      />
    </div>
  );
}