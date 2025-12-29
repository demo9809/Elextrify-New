import { useState } from 'react';
import { ChevronLeft, CheckCircle, XCircle, Clock, AlertTriangle, Search, Filter, Download } from 'lucide-react';

interface PlaybackRecord {
  id: string;
  campaignName: string;
  clientName: string;
  kioskName: string;
  scheduledStart: string;
  scheduledEnd: string;
  actualStart: string | null;
  actualEnd: string | null;
  duration: number; // minutes
  status: 'verified' | 'partial' | 'failed' | 'pending';
  discrepancy: number; // minutes
  billable: boolean;
  reason?: string;
}

const MOCK_PLAYBACK_RECORDS: PlaybackRecord[] = [
  {
    id: 'pb1',
    campaignName: 'Holiday Sale 2025',
    clientName: 'Acme Corporation',
    kioskName: 'Mall Central - Screen A',
    scheduledStart: '2025-01-20 09:00',
    scheduledEnd: '2025-01-20 12:00',
    actualStart: '2025-01-20 09:00',
    actualEnd: '2025-01-20 12:00',
    duration: 180,
    status: 'verified',
    discrepancy: 0,
    billable: true,
  },
  {
    id: 'pb2',
    campaignName: 'Morning Coffee Special',
    clientName: 'Brew Coffee Co.',
    kioskName: 'Airport Terminal 1',
    scheduledStart: '2025-01-20 07:00',
    scheduledEnd: '2025-01-20 10:00',
    actualStart: '2025-01-20 07:15',
    actualEnd: '2025-01-20 10:00',
    duration: 165,
    status: 'partial',
    discrepancy: 15,
    billable: true,
    reason: 'Hardware startup delay',
  },
  {
    id: 'pb3',
    campaignName: 'Gym Membership Promo',
    clientName: 'FitLife Gym',
    kioskName: 'Retail Store Display',
    scheduledStart: '2025-01-20 14:00',
    scheduledEnd: '2025-01-20 17:00',
    actualStart: null,
    actualEnd: null,
    duration: 0,
    status: 'failed',
    discrepancy: 180,
    billable: false,
    reason: 'Kiosk offline - power failure',
  },
  {
    id: 'pb4',
    campaignName: 'Product Launch',
    clientName: 'TechStart Inc.',
    kioskName: 'Transit Hub Main',
    scheduledStart: '2025-01-21 09:00',
    scheduledEnd: '2025-01-21 11:00',
    actualStart: null,
    actualEnd: null,
    duration: 0,
    status: 'pending',
    discrepancy: 0,
    billable: false,
    reason: 'Awaiting hardware report',
  },
];

interface PlaybackVerificationViewProps {
  onBack: () => void;
}

export function PlaybackVerificationView({ onBack }: PlaybackVerificationViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'verified' | 'partial' | 'failed' | 'pending'>('all');

  const filteredRecords = MOCK_PLAYBACK_RECORDS.filter(record => {
    if (statusFilter !== 'all' && record.status !== statusFilter) return false;
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        record.campaignName.toLowerCase().includes(search) ||
        record.clientName.toLowerCase().includes(search) ||
        record.kioskName.toLowerCase().includes(search)
      );
    }
    return true;
  });

  const stats = {
    total: MOCK_PLAYBACK_RECORDS.length,
    verified: MOCK_PLAYBACK_RECORDS.filter(r => r.status === 'verified').length,
    partial: MOCK_PLAYBACK_RECORDS.filter(r => r.status === 'partial').length,
    failed: MOCK_PLAYBACK_RECORDS.filter(r => r.status === 'failed').length,
    billable: MOCK_PLAYBACK_RECORDS.filter(r => r.billable).reduce((sum, r) => sum + r.duration, 0),
    nonBillable: MOCK_PLAYBACK_RECORDS.filter(r => !r.billable).reduce((sum, r) => sum + (r.duration > 0 ? r.duration : r.discrepancy), 0),
  };

  return (
    <div className="h-full flex flex-col bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-8 py-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#111827] mb-4"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back to Overview</span>
        </button>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-[#111827] mb-2">Playback Verification</h1>
            <p className="text-[#6B7280]">
              Hardware-verified playback records for billing validation
            </p>
          </div>
          <button className="h-11 px-5 bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-[#F3F4F6] transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export Verification Report</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-4">
          <StatBox label="Total Records" value={stats.total} />
          <StatBox label="Verified" value={stats.verified} status="success" />
          <StatBox label="Partial" value={stats.partial} status="warning" />
          <StatBox label="Failed" value={stats.failed} status="error" />
          <StatBox label="Billable Hours" value={`${Math.floor(stats.billable / 60)}h ${stats.billable % 60}m`} status="primary" />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-[#E5E7EB] px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
              <input
                type="text"
                placeholder="Search campaigns, clients, kiosks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 pl-10 pr-4 w-96 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="h-9 px-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm"
            >
              <option value="all">All Status</option>
              <option value="verified">Verified Only</option>
              <option value="partial">Partial Playback</option>
              <option value="failed">Failed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Verification Table */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
              <tr>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#6B7280] uppercase">Campaign</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#6B7280] uppercase">Client</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#6B7280] uppercase">Kiosk</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#6B7280] uppercase">Scheduled</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#6B7280] uppercase">Actual</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-[#6B7280] uppercase">Duration</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-[#6B7280] uppercase">Status</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-[#6B7280] uppercase">Billable</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors">
                  <td className="py-4 px-4">
                    <p className="text-sm font-medium text-[#111827]">{record.campaignName}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-[#6B7280]">{record.clientName}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-[#6B7280]">{record.kioskName}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-[#111827]">{record.scheduledStart}</p>
                    <p className="text-xs text-[#9CA3AF]">to {record.scheduledEnd.split(' ')[1]}</p>
                  </td>
                  <td className="py-4 px-4">
                    {record.actualStart ? (
                      <>
                        <p className="text-sm text-[#111827]">{record.actualStart}</p>
                        <p className="text-xs text-[#9CA3AF]">to {record.actualEnd?.split(' ')[1]}</p>
                      </>
                    ) : (
                      <p className="text-sm text-[#9CA3AF]">No playback recorded</p>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <p className="text-sm font-medium text-[#111827]">{record.duration} min</p>
                    {record.discrepancy > 0 && (
                      <p className="text-xs text-[#DC2626]">-{record.discrepancy} min</p>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <StatusBadge status={record.status} />
                    {record.reason && (
                      <p className="text-xs text-[#9CA3AF] mt-1">{record.reason}</p>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {record.billable ? (
                      <CheckCircle className="w-5 h-5 text-[#16A34A] mx-auto" />
                    ) : (
                      <XCircle className="w-5 h-5 text-[#DC2626] mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Methodology Note */}
        <div className="mt-6 p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl">
          <h4 className="text-sm font-semibold text-[#111827] mb-2">Verification Methodology</h4>
          <p className="text-sm text-[#6B7280]">
            Playback verification is performed by cross-referencing scheduled campaign data with hardware-reported playback logs from IoT-enabled kiosks. 
            Records marked as "Verified" indicate exact match between schedule and execution. "Partial" indicates minor discrepancies due to startup delays or connectivity issues. 
            "Failed" records are excluded from billing calculations. All data is timestamped and immutable for audit purposes.
          </p>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, status }: { label: string; value: string | number; status?: 'success' | 'warning' | 'error' | 'primary' }) {
  const getColors = () => {
    switch (status) {
      case 'success':
        return 'text-[#16A34A]';
      case 'warning':
        return 'text-[#F59E0B]';
      case 'error':
        return 'text-[#DC2626]';
      case 'primary':
        return 'text-[#D9480F]';
      default:
        return 'text-[#111827]';
    }
  };

  return (
    <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4">
      <p className="text-xs text-[#6B7280] mb-2">{label}</p>
      <p className={`text-2xl font-semibold ${getColors()}`}>{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: 'verified' | 'partial' | 'failed' | 'pending' }) {
  const configs = {
    verified: { bg: 'bg-[#D1FAE5]', text: 'text-[#16A34A]', label: 'Verified', icon: CheckCircle },
    partial: { bg: 'bg-[#FEF3C7]', text: 'text-[#F59E0B]', label: 'Partial', icon: Clock },
    failed: { bg: 'bg-[#FEE2E2]', text: 'text-[#DC2626]', label: 'Failed', icon: XCircle },
    pending: { bg: 'bg-[#F3F4F6]', text: 'text-[#6B7280]', label: 'Pending', icon: Clock },
  };

  const config = configs[status];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 ${config.bg} ${config.text} rounded-full text-xs font-medium`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}
