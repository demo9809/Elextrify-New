import { useState } from 'react';
import { 
  Monitor, 
  Wifi, 
  WifiOff, 
  AlertTriangle, 
  Search, 
  Filter, 
  Plus,
  ChevronLeft,
  ChevronRight,
  Eye,
  Settings,
  MapPin,
  Clock,
  Activity,
  LayoutGrid,
  List,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Pagination } from '../shared/Pagination';

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
  isPaired: boolean;
  hasLocationProfile?: boolean; // New field for profile status
}

const MOCK_TERMINALS: Terminal[] = [
  {
    id: 'term-1',
    deviceId: 'KSK-NYC-001',
    name: 'Times Square Mall - Entrance',
    model: 'KioskPro X1',
    status: 'online',
    location: 'Times Square Mall',
    region: 'North America',
    group: 'NYC Premium',
    lastSeen: new Date().toISOString(),
    version: '2.4.1',
    cpu: 45,
    ram: 62,
    temperature: 42,
    isPaired: true,
    hasLocationProfile: true,
  },
  {
    id: 'term-2',
    deviceId: 'KSK-NYC-002',
    name: 'Central Park Station',
    model: 'KioskPro X1',
    status: 'online',
    location: 'Central Park Transit',
    region: 'North America',
    group: 'NYC Premium',
    lastSeen: new Date(Date.now() - 2 * 60000).toISOString(),
    version: '2.4.1',
    cpu: 38,
    ram: 55,
    temperature: 40,
    isPaired: true,
    hasLocationProfile: true,
  },
  {
    id: 'term-3',
    deviceId: 'KSK-LA-001',
    name: 'LAX Airport - Terminal 1',
    model: 'KioskPro S2',
    status: 'warning',
    location: 'LAX Airport',
    region: 'North America',
    group: 'LA Airports',
    lastSeen: new Date(Date.now() - 15 * 60000).toISOString(),
    version: '2.3.8',
    cpu: 78,
    ram: 85,
    temperature: 58,
    isPaired: true,
    hasLocationProfile: false,
  },
  {
    id: 'term-4',
    deviceId: 'KSK-CHI-001',
    name: 'Michigan Avenue Mall',
    model: 'KioskPro X1',
    status: 'offline',
    location: 'Michigan Avenue',
    region: 'North America',
    group: 'Chicago Retail',
    lastSeen: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
    version: '2.4.0',
    cpu: 0,
    ram: 0,
    temperature: 0,
    isPaired: true,
    hasLocationProfile: false,
  },
  {
    id: 'term-5',
    deviceId: 'KSK-MIA-001',
    name: 'Miami Beach Plaza',
    model: 'KioskPro X1',
    status: 'online',
    location: 'Miami Beach',
    region: 'North America',
    group: 'Florida Coastal',
    lastSeen: new Date(Date.now() - 1 * 60000).toISOString(),
    version: '2.4.1',
    cpu: 42,
    ram: 58,
    temperature: 44,
    isPaired: true,
    hasLocationProfile: true,
  },
  {
    id: 'term-6',
    deviceId: 'KSK-BOS-001',
    name: 'Boston Faneuil Hall',
    model: 'KioskPro S2',
    status: 'online',
    location: 'Faneuil Hall',
    region: 'North America',
    lastSeen: new Date(Date.now() - 30000).toISOString(),
    version: '2.4.1',
    cpu: 35,
    ram: 48,
    temperature: 38,
    isPaired: true,
    hasLocationProfile: false,
  },
  {
    id: 'term-7',
    deviceId: 'KSK-SEA-001',
    name: 'Seattle Pike Place',
    model: 'KioskPro X1',
    status: 'warning',
    location: 'Pike Place Market',
    region: 'North America',
    group: 'Seattle Downtown',
    lastSeen: new Date(Date.now() - 10 * 60000).toISOString(),
    version: '2.3.9',
    cpu: 72,
    ram: 81,
    temperature: 55,
    isPaired: true,
    hasLocationProfile: true,
  },
  {
    id: 'term-8',
    deviceId: 'KSK-SF-001',
    name: 'San Francisco Union Square',
    model: 'KioskPro X1',
    status: 'online',
    location: 'Union Square',
    region: 'North America',
    group: 'SF Metro',
    lastSeen: new Date(Date.now() - 45000).toISOString(),
    version: '2.4.1',
    cpu: 40,
    ram: 60,
    temperature: 41,
    isPaired: true,
    hasLocationProfile: false,
  },
];

interface TerminalDashboardProps {
  onViewDevice: (terminal: Terminal) => void;
  onRegisterDevice: () => void;
  onOpenLocationProfile: (terminal: Terminal) => void;
}

export function TerminalDashboard({ onViewDevice, onRegisterDevice, onOpenLocationProfile }: TerminalDashboardProps) {
  const [terminals] = useState<Terminal[]>(MOCK_TERMINALS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'online' | 'offline' | 'warning'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Calculate stats
  const stats = {
    total: terminals.length,
    online: terminals.filter(t => t.status === 'online').length,
    offline: terminals.filter(t => t.status === 'offline').length,
    warning: terminals.filter(t => t.status === 'warning').length,
  };

  // Get last sync time (most recent lastSeen)
  const lastSync = terminals.reduce((latest, t) => {
    const tDate = new Date(t.lastSeen);
    return tDate > latest ? tDate : latest;
  }, new Date(0));

  // Filter terminals
  const filteredTerminals = terminals.filter(terminal => {
    // Status filter
    if (statusFilter !== 'all' && terminal.status !== statusFilter) return false;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        terminal.deviceId.toLowerCase().includes(query) ||
        terminal.name.toLowerCase().includes(query) ||
        terminal.location?.toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTerminals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTerminals = filteredTerminals.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status: Terminal['status']) => {
    switch (status) {
      case 'online':
        return 'text-[#16A34A]';
      case 'offline':
        return 'text-[#DC2626]';
      case 'warning':
        return 'text-[#F59E0B]';
    }
  };

  const getStatusBadgeColor = (status: Terminal['status']) => {
    switch (status) {
      case 'online':
        return 'bg-[#DCFCE7] text-[#166534]';
      case 'offline':
        return 'bg-[#FEE2E2] text-[#991B1B]';
      case 'warning':
        return 'bg-[#FEF3C7] text-[#92400E]';
    }
  };

  const formatLastSeen = (isoDate: string) => {
    const date = new Date(isoDate);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="p-4 sm:p-6 md:p-8">
        {/* Header */}
        <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-[#111827] mb-2">Kiosk Management</h1>
            <p className="text-[#6B7280] text-sm md:text-base">
              Monitor and manage your digital signage devices
            </p>
          </div>
          <button
            onClick={onRegisterDevice}
            className="flex items-center justify-center gap-2 px-6 h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] transition-colors w-full sm:w-auto"
          >
            <Plus className="w-5 h-5" />
            <span>Register New Device</span>
          </button>
        </div>

        {/* Stats Cards - Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Total */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 md:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#F9FAFB] rounded-lg flex items-center justify-center">
                <Monitor className="w-4 h-4 sm:w-5 sm:h-5 text-[#6B7280]" />
              </div>
              <p className="text-xs sm:text-sm text-[#6B7280]">Total</p>
            </div>
            <p className="text-[#111827] text-2xl sm:text-3xl font-semibold">{stats.total}</p>
          </div>

          {/* Online */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 md:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#DCFCE7] rounded-lg flex items-center justify-center">
                <Wifi className="w-4 h-4 sm:w-5 sm:h-5 text-[#16A34A]" />
              </div>
              <p className="text-xs sm:text-sm text-[#6B7280]">Online</p>
            </div>
            <p className="text-[#16A34A] text-2xl sm:text-3xl font-semibold">{stats.online}</p>
          </div>

          {/* Offline */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 md:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#FEE2E2] rounded-lg flex items-center justify-center">
                <WifiOff className="w-4 h-4 sm:w-5 sm:h-5 text-[#DC2626]" />
              </div>
              <p className="text-xs sm:text-sm text-[#6B7280]">Offline</p>
            </div>
            <p className="text-[#DC2626] text-2xl sm:text-3xl font-semibold">{stats.offline}</p>
          </div>

          {/* Warning */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 md:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#FEF3C7] rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-[#F59E0B]" />
              </div>
              <p className="text-xs sm:text-sm text-[#6B7280]">Warning</p>
            </div>
            <p className="text-[#F59E0B] text-2xl sm:text-3xl font-semibold">{stats.warning}</p>
          </div>
        </div>

        {/* Terminals Table */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
          {/* Search and Filters - Responsive Stack */}
          <div className="px-4 sm:px-6 py-3 md:py-4 border-b border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 bg-white">
            {/* Search */}
            <div className="flex-1 w-full sm:max-w-[320px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <input
                  type="text"
                  placeholder="Search terminals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2 flex-1 sm:flex-none">
              <Filter className="w-4 h-4 text-[#6B7280]" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="flex-1 sm:flex-none h-10 px-3 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="warning">Warning</option>
              </select>
            </div>

            {/* View Mode Switcher - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-1 ml-auto">
              <button
                onClick={() => setViewMode('table')}
                className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
                  viewMode === 'table'
                    ? 'bg-[#D9480F] text-white'
                    : 'border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F9FAFB]'
                }`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-[#D9480F] text-white'
                    : 'border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F9FAFB]'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Table Header - Desktop only */}
          {viewMode === 'table' && (
            <div className="hidden md:block px-6 py-3 bg-[#F9FAFB] border-b border-[#E5E7EB]">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-1 text-xs text-[#6B7280]">Status</div>
                <div className="col-span-2 text-xs text-[#6B7280]">Device ID</div>
                <div className="col-span-3 text-xs text-[#6B7280]">Name & Location</div>
                <div className="col-span-2 text-xs text-[#6B7280]">Group</div>
                <div className="col-span-2 text-xs text-[#6B7280]">Last Seen</div>
                <div className="col-span-1 text-xs text-[#6B7280]">Version</div>
                <div className="col-span-1 text-xs text-[#6B7280] text-right">Actions</div>
              </div>
            </div>
          )}

          {/* Table Body / Mobile Cards */}
          {viewMode === 'table' ? (
            <div className="divide-y divide-[#E5E7EB]">
              {paginatedTerminals.length === 0 ? (
                <div className="px-4 sm:px-6 py-12 text-center">
                  <Monitor className="w-12 h-12 text-[#E5E7EB] mx-auto mb-3" />
                  <p className="text-[#6B7280] mb-2">No terminals found</p>
                  <p className="text-sm text-[#9CA3AF]">
                    {searchQuery || statusFilter !== 'all'
                      ? 'Try adjusting your search or filters'
                      : 'Register your first device to get started'}
                  </p>
                </div>
              ) : (
                paginatedTerminals.map(terminal => (
                  <div key={terminal.id}>
                    {/* Desktop Table Row */}
                    <div 
                      className="hidden md:block px-6 py-4 hover:bg-[#F9FAFB] transition-colors cursor-pointer"
                      onClick={() => onViewDevice(terminal)}
                    >
                      <div className="grid grid-cols-12 gap-4 items-center">
                        {/* Status */}
                        <div className="col-span-1">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              terminal.status === 'online' ? 'bg-[#16A34A]' :
                              terminal.status === 'offline' ? 'bg-[#DC2626]' :
                              'bg-[#F59E0B]'
                            } ${terminal.status === 'online' ? 'animate-pulse' : ''}`}></div>
                            <span className={`text-xs font-medium ${getStatusColor(terminal.status)}`}>
                              {terminal.status === 'online' ? 'Live' : 
                               terminal.status === 'offline' ? 'Off' : 
                               'Warn'}
                            </span>
                          </div>
                        </div>

                        {/* Device ID */}
                        <div className="col-span-2">
                          <p className="text-sm text-[#111827] font-medium font-mono mb-1">
                            {terminal.deviceId}
                          </p>
                          {!terminal.hasLocationProfile && (
                            <div className="flex items-center gap-1 text-xs text-[#F59E0B]">
                              <AlertCircle className="w-3 h-3" />
                              <span>Add location details</span>
                            </div>
                          )}
                        </div>

                        {/* Name & Location */}
                        <div className="col-span-3">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <p className="text-sm text-[#111827] font-medium">
                              {terminal.name}
                            </p>
                            {terminal.hasLocationProfile && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" title="Location Profile Complete" />
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-[#6B7280]">
                            <MapPin className="w-3 h-3" />
                            {terminal.location || 'No location'}
                          </div>
                        </div>

                        {/* Group */}
                        <div className="col-span-2">
                          {terminal.group ? (
                            <span className="inline-flex px-2 py-1 bg-[#F3F4F6] text-[#111827] rounded text-xs">
                              {terminal.group}
                            </span>
                          ) : (
                            <span className="text-xs text-[#9CA3AF]">Not grouped</span>
                          )}
                        </div>

                        {/* Last Seen */}
                        <div className="col-span-2">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#6B7280]" />
                            <span className="text-sm text-[#6B7280]">
                              {formatLastSeen(terminal.lastSeen)}
                            </span>
                          </div>
                        </div>

                        {/* Version */}
                        <div className="col-span-1">
                          <span className="text-xs text-[#6B7280] font-mono">
                            v{terminal.version}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="col-span-1 flex items-center justify-end gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onViewDevice(terminal);
                            }}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F0F9FF] text-[#6B7280] hover:text-[#D9480F] transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          
                          {/* Location Profile Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenLocationProfile(terminal);
                            }}
                            className={`w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F0F9FF] transition-colors ${
                              terminal.hasLocationProfile
                                ? 'text-[#16A34A] hover:text-[#D9480F]'
                                : 'text-[#F59E0B] hover:text-[#D9480F]'
                            }`}
                            title={terminal.hasLocationProfile ? 'Location Profile' : 'Create Location Profile'}
                          >
                            <MapPin className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Card */}
                    <div
                      className="md:hidden px-4 py-3 bg-white border border-[#E5E7EB] rounded-xl hover:border-[#D9480F] hover:shadow-lg transition-all cursor-pointer relative"
                      onClick={() => onViewDevice(terminal)}
                    >
                      {/* Status Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2.5 h-2.5 rounded-full ${
                            terminal.status === 'online' ? 'bg-[#16A34A]' :
                            terminal.status === 'offline' ? 'bg-[#DC2626]' :
                            'bg-[#F59E0B]'
                          } ${terminal.status === 'online' ? 'animate-pulse' : ''}`}></div>
                          <span className={`text-xs font-medium ${getStatusColor(terminal.status)}`}>
                            {terminal.status === 'online' ? 'Live' : 
                             terminal.status === 'offline' ? 'Offline' : 
                             'Warning'}
                          </span>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadgeColor(terminal.status)}`}>
                          {terminal.model}
                        </span>
                      </div>

                      {/* Device Icon and ID */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-[#F3F4F6] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Monitor className="w-6 h-6 text-[#6B7280]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[#111827] font-medium font-mono break-all">
                            {terminal.deviceId}
                          </p>
                          {!terminal.hasLocationProfile && (
                            <div className="flex items-center gap-1 text-xs text-[#F59E0B] mt-1">
                              <AlertCircle className="w-3 h-3 flex-shrink-0" />
                              <span>Add location details</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Name */}
                      <div className="flex items-center gap-1.5 mb-2">
                        <h3 className="text-[#111827] font-medium line-clamp-2">
                          {terminal.name}
                        </h3>
                        {terminal.hasLocationProfile && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] flex-shrink-0" title="Location Profile Complete" />
                        )}
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-1.5 text-sm text-[#6B7280] mb-3">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="line-clamp-1">{terminal.location || 'No location'}</span>
                      </div>

                      {/* Group */}
                      {terminal.group && (
                        <div className="mb-3">
                          <span className="inline-flex px-2 py-1 bg-[#F3F4F6] text-[#111827] rounded text-xs">
                            {terminal.group}
                          </span>
                        </div>
                      )}

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-3 mb-4 pt-4 border-t border-[#E5E7EB]">
                        <div>
                          <p className="text-xs text-[#9CA3AF] mb-1">CPU</p>
                          <p className={`text-sm font-medium ${
                            terminal.cpu > 70 ? 'text-[#F59E0B]' : 'text-[#111827]'
                          }`}>
                            {terminal.cpu}%
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-[#9CA3AF] mb-1">RAM</p>
                          <p className={`text-sm font-medium ${
                            terminal.ram > 80 ? 'text-[#F59E0B]' : 'text-[#111827]'
                          }`}>
                            {terminal.ram}%
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-[#9CA3AF] mb-1">Temp</p>
                          <p className={`text-sm font-medium ${
                            terminal.temperature > 50 ? 'text-[#F59E0B]' : 'text-[#111827]'
                          }`}>
                            {terminal.temperature}°C
                          </p>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between text-xs text-[#6B7280] pt-3 border-t border-[#E5E7EB]">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatLastSeen(terminal.lastSeen)}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono">v{terminal.version}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onViewDevice(terminal);
                            }}
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#F9FAFB] hover:bg-[#F0F9FF] text-[#6B7280] hover:text-[#D9480F] transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          
                          {/* Location Profile Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenLocationProfile(terminal);
                            }}
                            className={`w-7 h-7 flex items-center justify-center rounded-lg bg-[#F9FAFB] hover:bg-[#F0F9FF] transition-colors ${
                              terminal.hasLocationProfile
                                ? 'text-[#16A34A] hover:text-[#D9480F]'
                                : 'text-[#F59E0B] hover:text-[#D9480F]'
                            }`}
                            title={terminal.hasLocationProfile ? 'Location Profile' : 'Create Location Profile'}
                          >
                            <MapPin className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            /* Grid View */
            <div className="p-6">
              {paginatedTerminals.length === 0 ? (
                <div className="py-12 text-center">
                  <Monitor className="w-12 h-12 text-[#E5E7EB] mx-auto mb-3" />
                  <p className="text-[#6B7280] mb-2">No terminals found</p>
                  <p className="text-sm text-[#9CA3AF]">
                    {searchQuery || statusFilter !== 'all'
                      ? 'Try adjusting your search or filters'
                      : 'Register your first device to get started'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {paginatedTerminals.map(terminal => (
                    <div
                      key={terminal.id}
                      className="bg-white border border-[#E5E7EB] rounded-xl p-6 hover:border-[#D9480F] hover:shadow-lg transition-all cursor-pointer relative"
                      onClick={() => onViewDevice(terminal)}
                    >
                      {/* Status Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2.5 h-2.5 rounded-full ${
                            terminal.status === 'online' ? 'bg-[#16A34A]' :
                            terminal.status === 'offline' ? 'bg-[#DC2626]' :
                            'bg-[#F59E0B]'
                          } ${terminal.status === 'online' ? 'animate-pulse' : ''}`}></div>
                          <span className={`text-xs font-medium ${getStatusColor(terminal.status)}`}>
                            {terminal.status === 'online' ? 'Live' : 
                             terminal.status === 'offline' ? 'Offline' : 
                             'Warning'}
                          </span>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadgeColor(terminal.status)}`}>
                          {terminal.model}
                        </span>
                      </div>

                      {/* Device Icon and ID */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-[#F3F4F6] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Monitor className="w-6 h-6 text-[#6B7280]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[#111827] font-medium font-mono break-all">
                            {terminal.deviceId}
                          </p>
                          {!terminal.hasLocationProfile && (
                            <div className="flex items-center gap-1 text-xs text-[#F59E0B] mt-1">
                              <AlertCircle className="w-3 h-3 flex-shrink-0" />
                              <span>Add location details</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Name */}
                      <div className="flex items-center gap-1.5 mb-2">
                        <h3 className="text-[#111827] font-medium line-clamp-2">
                          {terminal.name}
                        </h3>
                        {terminal.hasLocationProfile && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] flex-shrink-0" title="Location Profile Complete" />
                        )}
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-1.5 text-sm text-[#6B7280] mb-3">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="line-clamp-1">{terminal.location || 'No location'}</span>
                      </div>

                      {/* Group */}
                      {terminal.group && (
                        <div className="mb-3">
                          <span className="inline-flex px-2 py-1 bg-[#F3F4F6] text-[#111827] rounded text-xs">
                            {terminal.group}
                          </span>
                        </div>
                      )}

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-3 mb-4 pt-4 border-t border-[#E5E7EB]">
                        <div>
                          <p className="text-xs text-[#9CA3AF] mb-1">CPU</p>
                          <p className={`text-sm font-medium ${
                            terminal.cpu > 70 ? 'text-[#F59E0B]' : 'text-[#111827]'
                          }`}>
                            {terminal.cpu}%
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-[#9CA3AF] mb-1">RAM</p>
                          <p className={`text-sm font-medium ${
                            terminal.ram > 80 ? 'text-[#F59E0B]' : 'text-[#111827]'
                          }`}>
                            {terminal.ram}%
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-[#9CA3AF] mb-1">Temp</p>
                          <p className={`text-sm font-medium ${
                            terminal.temperature > 50 ? 'text-[#F59E0B]' : 'text-[#111827]'
                          }`}>
                            {terminal.temperature}°C
                          </p>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between text-xs text-[#6B7280] pt-3 border-t border-[#E5E7EB]">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatLastSeen(terminal.lastSeen)}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono">v{terminal.version}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onViewDevice(terminal);
                            }}
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#F9FAFB] hover:bg-[#F0F9FF] text-[#6B7280] hover:text-[#D9480F] transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          
                          {/* Location Profile Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenLocationProfile(terminal);
                            }}
                            className={`w-7 h-7 flex items-center justify-center rounded-lg bg-[#F9FAFB] hover:bg-[#F0F9FF] transition-colors ${
                              terminal.hasLocationProfile
                                ? 'text-[#16A34A] hover:text-[#D9480F]'
                                : 'text-[#F59E0B] hover:text-[#D9480F]'
                            }`}
                            title={terminal.hasLocationProfile ? 'Location Profile' : 'Create Location Profile'}
                          >
                            <MapPin className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Pagination */}
          {filteredTerminals.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredTerminals.length}
              itemsPerPage={itemsPerPage}
              onPageChange={(page) => setCurrentPage(page)}
              onItemsPerPageChange={(newItemsPerPage) => {
                setItemsPerPage(newItemsPerPage);
                setCurrentPage(1); // Reset to first page when changing items per page
              }}
              startIndex={startIndex}
              endIndex={Math.min(startIndex + itemsPerPage, filteredTerminals.length)}
            />
          )}
        </div>
      </div>
    </div>
  );
}