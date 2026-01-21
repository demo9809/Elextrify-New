import React, { useState } from 'react';
import {
  Download,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  XCircle,
  Filter,
  Save,
  FileText,
  X,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

type DeliveryStatus = 'delivered' | 'partial' | 'missed' | 'conflict';
type SlotType = 'peak' | 'normal';
type GroupBy = 'ad' | 'machine' | 'client';

interface AdDeployment {
  id: string;
  clientName: string;
  creativeName: string;
  machineName: string;
  machineId: string;
  locationCity: string;
  locationVenue: string;
  slotType: SlotType;
  bookedSlots: number;
  deliveredSlots: number;
  missedSlots: number;
  deliveryPercentage: number;
  status: DeliveryStatus;
  failureReason?: string;
  dateRange: string;
  dailyBreakdown?: {
    date: string;
    peak: { booked: number; delivered: number; missed: number };
    normal: { booked: number; delivered: number; missed: number };
    machineUptime: number;
    notes?: string;
  }[];
}

// Mock data
const mockDeployments: AdDeployment[] = [
  {
    id: 'dep-001',
    clientName: 'Nike Sports',
    creativeName: 'Nike_Spring_30s.mp4',
    machineName: 'Mall_Kiosk_01',
    machineId: 'mach-001',
    locationCity: 'New York',
    locationVenue: 'Central Mall',
    slotType: 'peak',
    bookedSlots: 180,
    deliveredSlots: 178,
    missedSlots: 2,
    deliveryPercentage: 98.89,
    status: 'delivered',
    failureReason: '—',
    dateRange: '2025-01-15 to 2025-01-21',
    dailyBreakdown: [
      {
        date: '2025-01-21',
        peak: { booked: 30, delivered: 30, missed: 0 },
        normal: { booked: 0, delivered: 0, missed: 0 },
        machineUptime: 100,
      },
      {
        date: '2025-01-20',
        peak: { booked: 30, delivered: 28, missed: 2 },
        normal: { booked: 0, delivered: 0, missed: 0 },
        machineUptime: 98.5,
        notes: 'Brief network interruption at 14:30',
      },
    ],
  },
  {
    id: 'dep-002',
    clientName: 'Coca-Cola',
    creativeName: 'Summer_Refresh_15s.mp4',
    machineName: 'Airport_Screen_12',
    machineId: 'mach-012',
    locationCity: 'Los Angeles',
    locationVenue: 'LAX Terminal 2',
    slotType: 'normal',
    bookedSlots: 240,
    deliveredSlots: 215,
    missedSlots: 25,
    deliveryPercentage: 89.58,
    status: 'partial',
    failureReason: 'Power outage (09:00-10:30)',
    dateRange: '2025-01-15 to 2025-01-21',
    dailyBreakdown: [
      {
        date: '2025-01-21',
        peak: { booked: 0, delivered: 0, missed: 0 },
        normal: { booked: 40, delivered: 35, missed: 5 },
        machineUptime: 95.0,
        notes: 'Power outage from 09:00-10:30',
      },
    ],
  },
  {
    id: 'dep-003',
    clientName: 'Samsung',
    creativeName: 'Galaxy_Launch_30s.mp4',
    machineName: 'Mall_Kiosk_01',
    machineId: 'mach-001',
    locationCity: 'New York',
    locationVenue: 'Central Mall',
    slotType: 'peak',
    bookedSlots: 90,
    deliveredSlots: 0,
    missedSlots: 90,
    deliveryPercentage: 0,
    status: 'conflict',
    failureReason: 'Slot overlap with existing booking',
    dateRange: '2025-01-15 to 2025-01-21',
    dailyBreakdown: [
      {
        date: '2025-01-21',
        peak: { booked: 15, delivered: 0, missed: 15 },
        normal: { booked: 0, delivered: 0, missed: 0 },
        machineUptime: 100,
        notes: 'Slot conflict with existing booking',
      },
    ],
  },
  {
    id: 'dep-004',
    clientName: 'Adidas',
    creativeName: 'Autumn_Collection_20s.mp4',
    machineName: 'Transit_Hub_05',
    machineId: 'mach-005',
    locationCity: 'Chicago',
    locationVenue: 'Union Station',
    slotType: 'normal',
    bookedSlots: 150,
    deliveredSlots: 150,
    missedSlots: 0,
    deliveryPercentage: 100,
    status: 'delivered',
    failureReason: '—',
    dateRange: '2025-01-15 to 2025-01-21',
  },
  {
    id: 'dep-005',
    clientName: 'Apple',
    creativeName: 'iPhone_15_30s.mp4',
    machineName: 'Mall_Kiosk_03',
    machineId: 'mach-003',
    locationCity: 'San Francisco',
    locationVenue: 'Bay Area Mall',
    slotType: 'peak',
    bookedSlots: 200,
    deliveredSlots: 45,
    missedSlots: 155,
    deliveryPercentage: 22.5,
    status: 'missed',
    failureReason: 'Hardware failure (screen offline)',
    dateRange: '2025-01-15 to 2025-01-21',
    dailyBreakdown: [
      {
        date: '2025-01-21',
        peak: { booked: 30, delivered: 8, missed: 22 },
        normal: { booked: 0, delivered: 0, missed: 0 },
        machineUptime: 25,
        notes: 'Machine offline - hardware failure',
      },
    ],
  },
];

export default function AdReports() {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState({
    dateRange: 'last-7-days',
    customStartDate: '',
    customEndDate: '',
    client: 'all',
    creative: 'all',
    machine: 'all',
    location: 'all',
    slotType: 'all',
    status: 'all',
  });
  const [groupBy, setGroupBy] = useState<GroupBy>('ad');
  const [showFilters, setShowFilters] = useState(true);

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    toast.success(`Exporting report as ${format.toUpperCase()}...`, {
      description: 'Export includes current filters and grouping',
    });
  };

  const clearFilters = () => {
    setFilters({
      dateRange: 'last-7-days',
      customStartDate: '',
      customEndDate: '',
      client: 'all',
      creative: 'all',
      machine: 'all',
      location: 'all',
      slotType: 'all',
      status: 'all',
    });
    toast.success('Filters cleared');
  };

  const getStatusIcon = (status: DeliveryStatus) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'partial':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'missed':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'conflict':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
    }
  };

  const getStatusLabel = (status: DeliveryStatus) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'partial':
        return 'Partially Delivered';
      case 'missed':
        return 'Missed';
      case 'conflict':
        return 'Conflict';
    }
  };

  const getStatusColor = (status: DeliveryStatus) => {
    switch (status) {
      case 'delivered':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'partial':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'missed':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'conflict':
        return 'text-red-700 bg-red-50 border-red-200';
    }
  };

  // Calculate summary metrics
  const totalAdInstances = mockDeployments.length;
  const totalSlotsBooked = mockDeployments.reduce((sum, d) => sum + d.bookedSlots, 0);
  const totalSlotsDelivered = mockDeployments.reduce((sum, d) => sum + d.deliveredSlots, 0);
  const totalSlotsMissed = mockDeployments.reduce((sum, d) => sum + d.missedSlots, 0);
  const uniqueMachines = new Set(mockDeployments.map((d) => d.machineId)).size;

  // Slot utilization data (mock)
  const peakSlotsBooked = 470;
  const peakSlotsDelivered = 403;
  const peakSlotsMissed = 67;

  const normalSlotsBooked = 390;
  const normalSlotsDelivered = 365;
  const normalSlotsMissed = 25;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5 flex-shrink-0">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-gray-900 mb-1">Ad Reports</h1>
            <div className="text-sm text-gray-600">
              Deployment and slot utilization reporting (non-PoP)
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => toast.info('Saved Views feature coming soon')}
              className="flex items-center gap-2 px-4 h-10 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Saved Views</span>
            </button>
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => handleExport('csv')}
                className="flex items-center gap-2 px-4 h-10 bg-white text-gray-700 hover:bg-gray-50 transition-colors border-r border-gray-300"
              >
                <FileText className="w-4 h-4" />
                <span>CSV</span>
              </button>
              <button
                onClick={() => handleExport('pdf')}
                className="flex items-center gap-2 px-4 h-10 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white border-b border-gray-200 flex-shrink-0">
        <div className="px-6 py-3 flex items-center justify-between border-b border-gray-100">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            {showFilters ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </button>
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear all filters</span>
          </button>
        </div>

        {showFilters && (
          <div className="px-6 py-4">
            <div className="grid grid-cols-8 gap-3 mb-3">
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Date Range</label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                  className="w-full h-9 px-3 border border-gray-300 rounded-lg text-sm bg-white"
                >
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="last-7-days">Last 7 Days</option>
                  <option value="last-30-days">Last 30 Days</option>
                  <option value="this-month">This Month</option>
                  <option value="last-month">Last Month</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Client</label>
                <select
                  value={filters.client}
                  onChange={(e) => setFilters({ ...filters, client: e.target.value })}
                  className="w-full h-9 px-3 border border-gray-300 rounded-lg text-sm bg-white"
                >
                  <option value="all">All Clients</option>
                  <option value="nike">Nike Sports</option>
                  <option value="coca-cola">Coca-Cola</option>
                  <option value="samsung">Samsung</option>
                  <option value="adidas">Adidas</option>
                  <option value="apple">Apple</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Ad Creative</label>
                <select
                  value={filters.creative}
                  onChange={(e) => setFilters({ ...filters, creative: e.target.value })}
                  className="w-full h-9 px-3 border border-gray-300 rounded-lg text-sm bg-white"
                >
                  <option value="all">All Creatives</option>
                  <option value="cr-001">Nike_Spring_30s</option>
                  <option value="cr-002">Summer_Refresh_15s</option>
                  <option value="cr-003">Galaxy_Launch_30s</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Machine</label>
                <select
                  value={filters.machine}
                  onChange={(e) => setFilters({ ...filters, machine: e.target.value })}
                  className="w-full h-9 px-3 border border-gray-300 rounded-lg text-sm bg-white"
                >
                  <option value="all">All Machines</option>
                  <option value="mach-001">Mall_Kiosk_01</option>
                  <option value="mach-012">Airport_Screen_12</option>
                  <option value="mach-003">Mall_Kiosk_03</option>
                  <option value="mach-005">Transit_Hub_05</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Location</label>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="w-full h-9 px-3 border border-gray-300 rounded-lg text-sm bg-white"
                >
                  <option value="all">All Locations</option>
                  <option value="new-york">New York</option>
                  <option value="los-angeles">Los Angeles</option>
                  <option value="chicago">Chicago</option>
                  <option value="san-francisco">San Francisco</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Slot Type</label>
                <select
                  value={filters.slotType}
                  onChange={(e) => setFilters({ ...filters, slotType: e.target.value })}
                  className="w-full h-9 px-3 border border-gray-300 rounded-lg text-sm bg-white"
                >
                  <option value="all">All Types</option>
                  <option value="peak">Peak</option>
                  <option value="normal">Normal</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Delivery Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="w-full h-9 px-3 border border-gray-300 rounded-lg text-sm bg-white"
                >
                  <option value="all">All Statuses</option>
                  <option value="delivered">Delivered</option>
                  <option value="partial">Partial</option>
                  <option value="missed">Missed</option>
                  <option value="conflict">Conflict</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Group By</label>
                <select
                  value={groupBy}
                  onChange={(e) => setGroupBy(e.target.value as GroupBy)}
                  className="w-full h-9 px-3 border border-gray-300 rounded-lg text-sm bg-white font-medium"
                >
                  <option value="ad">Ad</option>
                  <option value="machine">Machine</option>
                  <option value="client">Client</option>
                </select>
              </div>
            </div>

            {filters.dateRange === 'custom' && (
              <div className="grid grid-cols-8 gap-3">
                <div className="col-span-2">
                  <label className="text-xs text-gray-600 mb-1 block">Start Date</label>
                  <input
                    type="date"
                    value={filters.customStartDate}
                    onChange={(e) => setFilters({ ...filters, customStartDate: e.target.value })}
                    className="w-full h-9 px-3 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs text-gray-600 mb-1 block">End Date</label>
                  <input
                    type="date"
                    value={filters.customEndDate}
                    onChange={(e) => setFilters({ ...filters, customEndDate: e.target.value })}
                    className="w-full h-9 px-3 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-[1600px] mx-auto p-6 space-y-6">
          {/* Delivery Health KPIs */}
          <div>
            <div className="text-xs font-medium text-gray-600 uppercase mb-3">Delivery Health</div>
            <div className="grid grid-cols-5 gap-4">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="text-xs text-gray-600 mb-1">Total Ad Instances</div>
                <div className="text-2xl font-bold text-gray-900">{totalAdInstances}</div>
                <div className="text-xs text-gray-500 mt-1">across all machines</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="text-xs text-gray-600 mb-1">Total Slots Booked</div>
                <div className="text-2xl font-bold text-gray-900">{totalSlotsBooked.toLocaleString()}</div>
                <div className="text-xs text-gray-500 mt-1">scheduled for delivery</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="text-xs text-gray-600 mb-1">Slots Delivered</div>
                <div className="text-2xl font-bold text-green-600">{totalSlotsDelivered.toLocaleString()}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {((totalSlotsDelivered / totalSlotsBooked) * 100).toFixed(1)}% delivery rate
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="text-xs text-gray-600 mb-1">Slots Missed or Partial</div>
                <div className="text-2xl font-bold text-red-600">{totalSlotsMissed.toLocaleString()}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {((totalSlotsMissed / totalSlotsBooked) * 100).toFixed(1)}% failure rate
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="text-xs text-gray-600 mb-1">Machines Affected</div>
                <div className="text-2xl font-bold text-gray-900">{uniqueMachines}</div>
                <div className="text-xs text-gray-500 mt-1">unique hardware units</div>
              </div>
            </div>
          </div>

          {/* Slot Utilization Overview */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-xs font-medium text-gray-600 uppercase mb-4">
              Slot Utilization: Booked vs Delivered vs Missed
            </div>

            <div className="space-y-6">
              {/* Peak Slots */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">Peak Slots</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-700">
                      Peak
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {peakSlotsBooked} booked · {peakSlotsDelivered} delivered · {peakSlotsMissed} missed
                  </div>
                </div>
                <div className="relative h-10 bg-gray-100 rounded-lg overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-green-500 flex items-center justify-center text-xs font-medium text-white"
                    style={{ width: `${(peakSlotsDelivered / peakSlotsBooked) * 100}%` }}
                  >
                    {peakSlotsDelivered > 50 && `${peakSlotsDelivered} delivered`}
                  </div>
                  <div
                    className="absolute inset-y-0 bg-red-500 flex items-center justify-center text-xs font-medium text-white"
                    style={{
                      left: `${(peakSlotsDelivered / peakSlotsBooked) * 100}%`,
                      width: `${(peakSlotsMissed / peakSlotsBooked) * 100}%`,
                    }}
                  >
                    {peakSlotsMissed > 20 && `${peakSlotsMissed} missed`}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
                  <span>Delivery Rate: {((peakSlotsDelivered / peakSlotsBooked) * 100).toFixed(1)}%</span>
                  <span>Failure Rate: {((peakSlotsMissed / peakSlotsBooked) * 100).toFixed(1)}%</span>
                </div>
              </div>

              {/* Normal Slots */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">Normal Slots</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                      Normal
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {normalSlotsBooked} booked · {normalSlotsDelivered} delivered · {normalSlotsMissed} missed
                  </div>
                </div>
                <div className="relative h-10 bg-gray-100 rounded-lg overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-green-500 flex items-center justify-center text-xs font-medium text-white"
                    style={{ width: `${(normalSlotsDelivered / normalSlotsBooked) * 100}%` }}
                  >
                    {normalSlotsDelivered > 50 && `${normalSlotsDelivered} delivered`}
                  </div>
                  <div
                    className="absolute inset-y-0 bg-red-500 flex items-center justify-center text-xs font-medium text-white"
                    style={{
                      left: `${(normalSlotsDelivered / normalSlotsBooked) * 100}%`,
                      width: `${(normalSlotsMissed / normalSlotsBooked) * 100}%`,
                    }}
                  >
                    {normalSlotsMissed > 10 && `${normalSlotsMissed} missed`}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
                  <span>Delivery Rate: {((normalSlotsDelivered / normalSlotsBooked) * 100).toFixed(1)}%</span>
                  <span>Failure Rate: {((normalSlotsMissed / normalSlotsBooked) * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Deployment Report Table */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    Deployment Report (Grouped by: {groupBy === 'ad' ? 'Ad' : groupBy === 'machine' ? 'Machine' : 'Client'})
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {mockDeployments.length} deployment{mockDeployments.length !== 1 ? 's' : ''} · Last updated: Jan 21, 2025 at 10:45 AM EST
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase w-8"></th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Client</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Creative</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Machine</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Location</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Slot Type</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">Booked</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">Delivered</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">Missed</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">Delivery %</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Failure Reason</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockDeployments.map((deployment) => (
                    <React.Fragment key={deployment.id}>
                      {/* Main Row */}
                      <tr
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => toggleRow(deployment.id)}
                      >
                        <td className="px-4 py-3">
                          <button className="p-1 hover:bg-gray-100 rounded">
                            {expandedRows.has(deployment.id) ? (
                              <ChevronDown className="w-4 h-4 text-gray-600" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-gray-600" />
                            )}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm font-medium text-gray-900">{deployment.clientName}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-gray-900">{deployment.creativeName}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm font-mono text-gray-900">{deployment.machineName}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-gray-900">{deployment.locationCity}</div>
                          <div className="text-xs text-gray-600">{deployment.locationVenue}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              deployment.slotType === 'peak'
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {deployment.slotType === 'peak' ? 'Peak' : 'Normal'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="text-sm font-medium text-gray-900">{deployment.bookedSlots}</div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="text-sm font-medium text-green-600">{deployment.deliveredSlots}</div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="text-sm font-medium text-red-600">{deployment.missedSlots}</div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div
                            className={`text-sm font-semibold ${
                              deployment.deliveryPercentage >= 95
                                ? 'text-green-600'
                                : deployment.deliveryPercentage >= 80
                                ? 'text-yellow-600'
                                : 'text-red-600'
                            }`}
                          >
                            {deployment.deliveryPercentage.toFixed(1)}%
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-gray-900">{deployment.failureReason}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium border ${getStatusColor(
                              deployment.status
                            )}`}
                          >
                            {getStatusIcon(deployment.status)}
                            {getStatusLabel(deployment.status)}
                          </span>
                        </td>
                      </tr>

                      {/* Expanded Row - Daily Breakdown */}
                      {expandedRows.has(deployment.id) && deployment.dailyBreakdown && (
                        <tr className="bg-gray-50">
                          <td colSpan={12} className="px-4 py-4">
                            <div className="pl-8">
                              <div className="text-xs font-medium text-gray-700 uppercase mb-3">
                                Daily Breakdown: {deployment.dateRange}
                              </div>
                              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                <table className="w-full">
                                  <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600">Date</th>
                                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-600">
                                        Peak (B/D/M)
                                      </th>
                                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-600">
                                        Normal (B/D/M)
                                      </th>
                                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-600">
                                        Machine Uptime
                                      </th>
                                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600">Notes</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-200">
                                    {deployment.dailyBreakdown.map((day) => (
                                      <tr key={day.date} className="text-xs">
                                        <td className="px-3 py-2 font-mono text-gray-900">{day.date}</td>
                                        <td className="px-3 py-2 text-center font-mono text-gray-900">
                                          {day.peak.booked} / {day.peak.delivered} / {day.peak.missed}
                                        </td>
                                        <td className="px-3 py-2 text-center font-mono text-gray-900">
                                          {day.normal.booked} / {day.normal.delivered} / {day.normal.missed}
                                        </td>
                                        <td className="px-3 py-2 text-center">
                                          <span
                                            className={`font-semibold ${
                                              day.machineUptime >= 98
                                                ? 'text-green-600'
                                                : day.machineUptime >= 90
                                                ? 'text-yellow-600'
                                                : 'text-red-600'
                                            }`}
                                          >
                                            {day.machineUptime.toFixed(1)}%
                                          </span>
                                        </td>
                                        <td className="px-3 py-2 text-gray-600">{day.notes || '—'}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
