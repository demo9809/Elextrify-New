import { useParams, useNavigate } from 'react-router';
import { useState } from 'react';
import {
  ArrowLeft,
  Play,
  Pause,
  StopCircle,
  Shuffle,
  RefreshCw,
  FileText,
  BarChart3,
  ExternalLink,
  AlertTriangle,
  Clock,
  Calendar,
  MapPin,
  Video,
  Image as ImageIcon,
  CheckCircle2,
  X,
  Check,
  Download,
  TrendingDown,
  AlertCircle,
  WifiOff,
  Zap,
  Network,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

type AdStatus = 'running' | 'scheduled' | 'paused' | 'completed' | 'conflict';
type MediaType = 'video' | 'image';
type SlotType = 'peak' | 'normal';

interface AdInstance {
  id: string;
  clientId: string;
  clientName: string;
  clientBadge?: string;
  creativeId: string;
  creativeName: string;
  creativeThumbnail?: string;
  mediaType: MediaType;
  duration: number;
  machineId: string;
  machineName: string;
  locationCity: string;
  locationVenue: string;
  slotType: SlotType;
  slotPositions: number[];
  timeWindowStart: string;
  timeWindowEnd: string;
  startDate: string;
  endDate: string;
  status: AdStatus;
  playCount: number;
  lastPlayed?: string;
  deliveryHealth: 'healthy' | 'warning' | 'critical';
  conflictReason?: string;
  durationMismatch?: boolean;
  machineOffline?: boolean;
  slotConflict?: boolean;
  beforeAd?: { clientName: string; creativeName: string };
  afterAd?: { clientName: string; creativeName: string };
}

// Mock data - in real app, fetch by ID
const mockAd: AdInstance = {
  id: 'ad-001',
  clientId: 'cl-001',
  clientName: 'Nike Sports',
  clientBadge: 'Premium',
  creativeId: 'cr-001',
  creativeName: 'Nike_Spring_30s.mp4',
  mediaType: 'video',
  duration: 30,
  machineId: 'mach-001',
  machineName: 'Mall_Kiosk_01',
  locationCity: 'New York',
  locationVenue: 'Central Mall',
  slotType: 'peak',
  slotPositions: [3, 4, 5],
  timeWindowStart: '09:00',
  timeWindowEnd: '12:00',
  startDate: '2025-01-15',
  endDate: '2025-03-31',
  status: 'running',
  playCount: 1247,
  lastPlayed: '2025-01-21T10:45:00',
  deliveryHealth: 'healthy',
  beforeAd: { clientName: 'Coca-Cola', creativeName: 'Summer Refresh' },
  afterAd: { clientName: 'Samsung', creativeName: 'Galaxy Launch' },
};

// Mock media library
interface MediaItem {
  id: string;
  name: string;
  type: MediaType;
  duration: number;
  thumbnail?: string;
}

const mockMediaLibrary: MediaItem[] = [
  { id: 'media-001', name: 'Nike_Spring_30s.mp4', type: 'video', duration: 30 },
  { id: 'media-002', name: 'Nike_Summer_30s.mp4', type: 'video', duration: 30 },
  { id: 'media-003', name: 'Nike_Fall_30s.mp4', type: 'video', duration: 30 },
  { id: 'media-004', name: 'Nike_Winter_30s.mp4', type: 'video', duration: 30 },
  { id: 'media-005', name: 'Nike_Product_20s.mp4', type: 'video', duration: 20 },
  { id: 'media-006', name: 'Nike_Brand_10s.mp4', type: 'video', duration: 10 },
];

// Proof of Play data types
interface PoPDayData {
  date: string;
  totalLoops: number;
  actualPlays: number;
  missedPlays: number;
  missedReasons: { reason: string; count: number }[];
  deliveryRate: number;
}

interface ProofOfPlayData {
  expectedPlaysPerDay: number;
  totalActualPlays: number;
  totalExpectedPlays: number;
  overallDeliveryRate: number;
  dailyBreakdown: PoPDayData[];
  dataAvailable: boolean;
  unavailableReason?: string;
}

// Mock Proof of Play data - realistic with hardware failures
const mockProofOfPlayData: ProofOfPlayData = {
  expectedPlaysPerDay: 180, // 3 hours × 60 mins = 180 mins, 1 play every 2 mins
  totalActualPlays: 1247,
  totalExpectedPlays: 1260, // 7 days of data
  overallDeliveryRate: 98.97,
  dataAvailable: true,
  dailyBreakdown: [
    {
      date: '2025-01-21',
      totalLoops: 90,
      actualPlays: 178,
      missedPlays: 2,
      missedReasons: [{ reason: 'Machine Offline', count: 2 }],
      deliveryRate: 98.89,
    },
    {
      date: '2025-01-20',
      totalLoops: 90,
      actualPlays: 180,
      missedPlays: 0,
      missedReasons: [],
      deliveryRate: 100.0,
    },
    {
      date: '2025-01-19',
      totalLoops: 90,
      actualPlays: 175,
      missedPlays: 5,
      missedReasons: [
        { reason: 'Power Loss', count: 3 },
        { reason: 'Network Issue', count: 2 },
      ],
      deliveryRate: 97.22,
    },
    {
      date: '2025-01-18',
      totalLoops: 90,
      actualPlays: 180,
      missedPlays: 0,
      missedReasons: [],
      deliveryRate: 100.0,
    },
    {
      date: '2025-01-17',
      totalLoops: 90,
      actualPlays: 178,
      missedPlays: 2,
      missedReasons: [{ reason: 'Machine Offline', count: 2 }],
      deliveryRate: 98.89,
    },
    {
      date: '2025-01-16',
      totalLoops: 90,
      actualPlays: 176,
      missedPlays: 4,
      missedReasons: [{ reason: 'Network Issue', count: 4 }],
      deliveryRate: 97.78,
    },
    {
      date: '2025-01-15',
      totalLoops: 90,
      actualPlays: 180,
      missedPlays: 0,
      missedReasons: [],
      deliveryRate: 100.0,
    },
  ],
};

// Proof of Play Drawer Component
function ProofOfPlayDrawer({
  ad,
  popData,
  onClose,
}: {
  ad: AdInstance;
  popData: ProofOfPlayData;
  onClose: () => void;
}) {
  const [exportFormat, setExportFormat] = useState<'csv' | 'pdf'>('csv');
  const [dateRangeStart, setDateRangeStart] = useState(ad.startDate);
  const [dateRangeEnd, setDateRangeEnd] = useState(ad.endDate);
  const [timelineView, setTimelineView] = useState<'recent' | 'custom'>('recent');

  const handleExport = (format: 'csv' | 'pdf') => {
    toast.success(`Exporting Proof of Play as ${format.toUpperCase()}...`);
    // In real app, trigger download
  };

  const getReasonIcon = (reason: string) => {
    if (reason.includes('Offline')) return <WifiOff className="w-3 h-3" />;
    if (reason.includes('Power')) return <Zap className="w-3 h-3" />;
    if (reason.includes('Network')) return <Network className="w-3 h-3" />;
    return <AlertCircle className="w-3 h-3" />;
  };

  // Show only last 7 days for timeline by default
  const recentDays = popData.dailyBreakdown.slice(0, 7);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/50" onClick={onClose}>
      <div
        className="bg-white h-full w-full sm:w-[900px] shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB] bg-white flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#111827]">Proof of Play & Export</h2>
              <div className="text-xs text-[#6B7280]">Instance-level playback verification</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#F9FAFB] rounded transition-colors"
          >
            <X className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {!popData.dataAvailable ? (
            <div className="text-center py-12">
              <AlertTriangle className="w-12 h-12 text-[#F59E0B] mx-auto mb-4" />
              <div className="text-lg font-semibold text-[#111827] mb-2">Proof of Play Data Unavailable</div>
              <div className="text-sm text-[#6B7280]">
                {popData.unavailableReason || 'Hardware telemetry data is not available for this ad instance'}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* A. Playback Summary */}
              <div>
                <div className="text-sm font-semibold text-[#111827] mb-4">Playback Summary</div>
                <div className="bg-[#F9FAFB] rounded-lg border border-[#E5E7EB] p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-[#6B7280] mb-1">Ad Name</div>
                      <div className="text-sm font-medium text-[#111827]">{ad.creativeName}</div>
                    </div>
                    <div>
                      <div className="text-xs text-[#6B7280] mb-1">Machine</div>
                      <div className="text-sm font-medium text-[#111827]">{ad.machineName}</div>
                    </div>
                    <div>
                      <div className="text-xs text-[#6B7280] mb-1">Slot Type</div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        ad.slotType === 'peak' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-[#6B7280]'
                      }`}>
                        {ad.slotType === 'peak' ? 'Peak' : 'Normal'}
                      </span>
                    </div>
                    <div>
                      <div className="text-xs text-[#6B7280] mb-1">Slot Positions</div>
                      <div className="text-sm font-mono font-medium text-[#111827]">
                        {ad.slotPositions.length === 1
                          ? `Position ${ad.slotPositions[0]}`
                          : `Positions ${ad.slotPositions[0]}–${ad.slotPositions[ad.slotPositions.length - 1]}`}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-xs text-[#6B7280] mb-1">Campaign Period</div>
                      <div className="text-sm font-medium text-[#111827]">
                        {ad.startDate} to {ad.endDate}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[#E5E7EB] pt-4 grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-[#6B7280] mb-1">Expected Plays/Day</div>
                      <div className="text-2xl font-bold text-[#111827]">{popData.expectedPlaysPerDay}</div>
                    </div>
                    <div>
                      <div className="text-xs text-[#6B7280] mb-1">Actual Plays Delivered</div>
                      <div className="text-2xl font-bold text-green-600">{popData.totalActualPlays.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-[#6B7280] mb-1">Delivery Percentage</div>
                      <div className="flex items-baseline gap-2">
                        <div className={`text-2xl font-bold ${
                          popData.overallDeliveryRate >= 95 ? 'text-green-600' :
                          popData.overallDeliveryRate >= 85 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {popData.overallDeliveryRate.toFixed(2)}%
                        </div>
                        {popData.overallDeliveryRate < 100 && (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* B. Playback Timeline - Simplified */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-semibold text-[#111827]">Recent Activity (Last 7 Days)</div>
                  <button
                    onClick={() => setTimelineView(timelineView === 'recent' ? 'custom' : 'recent')}
                    className="text-xs text-[#D9480F] hover:text-[#C13F0D] font-medium"
                  >
                    {timelineView === 'recent' ? 'View Custom Range' : 'View Recent'}
                  </button>
                </div>

                {timelineView === 'custom' ? (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="text-xs font-medium text-blue-900 mb-3">Select Custom Date Range</div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-blue-800 mb-1 block">From</label>
                        <input
                          type="date"
                          value={dateRangeStart}
                          onChange={(e) => setDateRangeStart(e.target.value)}
                          className="w-full h-9 px-3 border border-blue-300 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-blue-800 mb-1 block">To</label>
                        <input
                          type="date"
                          value={dateRangeEnd}
                          onChange={(e) => setDateRangeEnd(e.target.value)}
                          className="w-full h-9 px-3 border border-blue-300 rounded-lg text-sm"
                        />
                      </div>
                    </div>
                    <div className="text-xs text-blue-700 mt-2">
                      Use export controls below to download detailed data for this range
                    </div>
                  </div>
                ) : null}

                {/* Aggregate Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="text-xs text-green-700 mb-1">Total Loops</div>
                    <div className="text-2xl font-bold text-green-900">
                      {recentDays.reduce((sum, day) => sum + day.totalLoops, 0)}
                    </div>
                    <div className="text-xs text-green-600 mt-1">Last 7 days</div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="text-xs text-green-700 mb-1">Successful Plays</div>
                    <div className="text-2xl font-bold text-green-900">
                      {recentDays.reduce((sum, day) => sum + day.actualPlays, 0)}
                    </div>
                    <div className="text-xs text-green-600 mt-1">Last 7 days</div>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="text-xs text-red-700 mb-1">Missed Plays</div>
                    <div className="text-2xl font-bold text-red-900">
                      {recentDays.reduce((sum, day) => sum + day.missedPlays, 0)}
                    </div>
                    <div className="text-xs text-red-600 mt-1">Last 7 days</div>
                  </div>
                </div>

                {/* Failure Reasons Summary */}
                <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
                  <div className="text-xs font-medium text-[#111827] mb-3">Failure Breakdown (Last 7 Days)</div>
                  {(() => {
                    const reasonsMap = new Map<string, number>();
                    recentDays.forEach((day) => {
                      day.missedReasons.forEach((r) => {
                        reasonsMap.set(r.reason, (reasonsMap.get(r.reason) || 0) + r.count);
                      });
                    });
                    const totalMissed = Array.from(reasonsMap.values()).reduce((a, b) => a + b, 0);

                    return totalMissed === 0 ? (
                      <div className="flex items-center gap-2 text-sm text-green-700">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>No failures in the last 7 days</span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {Array.from(reasonsMap.entries()).map(([reason, count]) => (
                          <div key={reason} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getReasonIcon(reason)}
                              <span className="text-sm text-[#111827]">{reason}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-sm font-semibold text-[#111827]">{count}</div>
                              <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-red-500 h-2 rounded-full"
                                  style={{ width: `${(count / totalMissed) * 100}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* C. Export Controls */}
              <div>
                <div className="text-sm font-semibold text-[#111827] mb-4">Export Controls</div>
                <div className="bg-white rounded-lg border border-[#E5E7EB] p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-xs font-medium text-[#6B7280] mb-2 block">Export Start Date</label>
                      <input
                        type="date"
                        value={dateRangeStart}
                        onChange={(e) => setDateRangeStart(e.target.value)}
                        className="w-full h-10 px-3 border border-[#E5E7EB] rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-[#6B7280] mb-2 block">Export End Date</label>
                      <input
                        type="date"
                        value={dateRangeEnd}
                        onChange={(e) => setDateRangeEnd(e.target.value)}
                        className="w-full h-10 px-3 border border-[#E5E7EB] rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                    <div className="text-xs font-medium text-blue-900 mb-1">Export includes:</div>
                    <ul className="text-xs text-blue-800 space-y-0.5 ml-4 list-disc">
                      <li>Timestamp of each play attempt</li>
                      <li>Machine ID and name</li>
                      <li>Slot type and position</li>
                      <li>Play status (success/failure)</li>
                      <li>Failure reason if applicable</li>
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleExport('csv')}
                      className="flex-1 flex items-center justify-center gap-2 px-4 h-10 bg-white border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export CSV</span>
                    </button>
                    <button
                      onClick={() => handleExport('pdf')}
                      className="flex-1 flex items-center justify-center gap-2 px-4 h-10 bg-[#D9480F] text-white rounded-lg hover:bg-[#C13F0D] transition-colors font-medium"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export PDF</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Billing Note */}
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-green-900 mb-1">Billing Verification</div>
                    <div className="text-xs text-green-800">
                      This Proof of Play data serves as the authoritative source for billing. Only{' '}
                      <span className="font-semibold">{popData.totalActualPlays} actual plays</span> will be billed.
                      Hardware downtime and failures are automatically excluded.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer - Fixed */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-[#F9FAFB] border-t border-[#E5E7EB] flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 h-10 bg-white border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// Emergency Stop Modal
function EmergencyStopModal({
  ad,
  onClose,
  onConfirm,
}: {
  ad: AdInstance;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [confirming, setConfirming] = useState(false);

  const handleConfirm = () => {
    setConfirming(true);
    setTimeout(() => {
      onConfirm();
      setConfirming(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <StopCircle className="w-5 h-5 text-[#DC2626]" />
            </div>
            <h2 className="text-lg font-semibold text-[#111827]">Emergency Stop</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#F9FAFB] rounded transition-colors"
          >
            <X className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          <div className="mb-4">
            <div className="text-sm text-[#111827] mb-4">
              This will immediately stop the ad from playing on all assigned screens and remove it from the current loop cycle.
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-red-900 mb-1">Warning</div>
                  <div className="text-xs text-red-800">
                    This action cannot be undone. The ad will be stopped immediately and will need to be manually restarted.
                  </div>
                </div>
              </div>
            </div>

            {/* Ad Details Card */}
            <div className="bg-[#F9FAFB] rounded-lg p-4 border border-[#E5E7EB]">
              <div className="text-xs font-medium text-[#6B7280] uppercase mb-2">Ad Details</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6B7280]">Client:</span>
                  <span className="font-medium text-[#111827]">{ad.clientName}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6B7280]">Creative:</span>
                  <span className="font-medium text-[#111827]">{ad.creativeName}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6B7280]">Machine:</span>
                  <span className="font-medium text-[#111827]">{ad.machineName}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6B7280]">Status:</span>
                  <span className="font-medium text-[#111827] capitalize">{ad.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-[#F9FAFB] border-t border-[#E5E7EB]">
          <button
            onClick={onClose}
            disabled={confirming}
            className="px-4 h-10 bg-white border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={confirming}
            className="px-4 h-10 bg-[#DC2626] text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50"
          >
            {confirming ? 'Stopping...' : 'Emergency Stop'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Replace Media Modal
function ReplaceMediaModal({
  ad,
  onClose,
  onConfirm,
}: {
  ad: AdInstance;
  onClose: () => void;
  onConfirm: (newMediaId: string) => void;
}) {
  const [selectedMediaId, setSelectedMediaId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Filter media by compatible duration (exact match required)
  const compatibleMedia = mockMediaLibrary.filter(
    (media) => media.duration === ad.duration && media.id !== ad.creativeId
  );

  const selectedMedia = compatibleMedia.find((m) => m.id === selectedMediaId);

  const handleConfirm = () => {
    if (!selectedMediaId) return;
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      onConfirm(selectedMediaId);
      setSaving(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
              <Shuffle className="w-5 h-5 text-[#D9480F]" />
            </div>
            <h2 className="text-lg font-semibold text-[#111827]">Replace Media</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#F9FAFB] rounded transition-colors"
          >
            <X className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4 overflow-y-auto flex-1">
          {/* Current Media */}
          <div className="mb-6">
            <div className="text-xs font-medium text-[#6B7280] uppercase mb-3">Current Media</div>
            <div className="bg-[#F9FAFB] rounded-lg p-4 border-2 border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <div className="w-16 h-12 bg-gray-900 rounded flex items-center justify-center flex-shrink-0">
                  {ad.mediaType === 'video' ? (
                    <Video className="w-6 h-6 text-white" />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-[#111827]">{ad.creativeName}</div>
                  <div className="text-xs text-[#6B7280]">{ad.duration}s duration</div>
                </div>
              </div>
            </div>
          </div>

          {/* Available Media */}
          <div>
            <div className="text-xs font-medium text-[#6B7280] uppercase mb-3">
              Select Replacement ({compatibleMedia.length} compatible)
            </div>
            
            {compatibleMedia.length === 0 ? (
              <div className="text-center py-8 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                <AlertTriangle className="w-8 h-8 text-[#F59E0B] mx-auto mb-2" />
                <div className="text-sm font-medium text-[#111827] mb-1">No Compatible Media</div>
                <div className="text-xs text-[#6B7280]">
                  No media with exactly {ad.duration}s duration found
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {compatibleMedia.map((media) => (
                  <button
                    key={media.id}
                    onClick={() => setSelectedMediaId(media.id)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                      selectedMediaId === media.id
                        ? 'border-[#D9480F] bg-orange-50'
                        : 'border-[#E5E7EB] bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-12 bg-gray-900 rounded flex items-center justify-center flex-shrink-0">
                        {media.type === 'video' ? (
                          <Video className="w-6 h-6 text-white" />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-[#111827]">{media.name}</div>
                        <div className="text-xs text-[#6B7280]">{media.duration}s duration</div>
                      </div>
                      {selectedMediaId === media.id && (
                        <div className="flex-shrink-0">
                          <div className="w-5 h-5 rounded-full bg-[#D9480F] flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Validation Info */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-blue-800">
                <span className="font-medium">Instance-level replacement:</span> Only this ad instance will be updated. Scheduling, slots, and dates remain unchanged.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-[#F9FAFB] border-t border-[#E5E7EB]">
          <button
            onClick={onClose}
            disabled={saving}
            className="px-4 h-10 bg-white border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedMediaId || saving}
            className="px-4 h-10 bg-[#D9480F] text-white rounded-lg hover:bg-[#C13F0D] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Replacing...' : 'Confirm Replacement'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Reassign Slots Modal
function ReassignSlotsModal({
  ad,
  onClose,
  onConfirm,
}: {
  ad: AdInstance;
  onClose: () => void;
  onConfirm: (newSlots: number[]) => void;
}) {
  const [selectedSlots, setSelectedSlots] = useState<number[]>(ad.slotPositions);
  const [saving, setSaving] = useState(false);

  // Total 12 slots in 120s loop (12 × 10s)
  const totalSlots = 12;
  const requiredSlots = ad.slotPositions.length; // Based on duration

  // Mock occupied slots (in real app, fetch from API)
  const occupiedSlots = [1, 2, 6, 7, 8, 10]; // Example occupied positions

  const toggleSlot = (slotNum: number) => {
    if (occupiedSlots.includes(slotNum)) return; // Can't select occupied slots
    
    const isSelected = selectedSlots.includes(slotNum);
    
    if (isSelected) {
      setSelectedSlots(selectedSlots.filter((s) => s !== slotNum));
    } else {
      if (selectedSlots.length < requiredSlots) {
        setSelectedSlots([...selectedSlots, slotNum].sort((a, b) => a - b));
      }
    }
  };

  const canConfirm = selectedSlots.length === requiredSlots && 
                     JSON.stringify(selectedSlots) !== JSON.stringify(ad.slotPositions);

  const handleConfirm = () => {
    if (!canConfirm) return;
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      onConfirm(selectedSlots);
      setSaving(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-[#111827]">Reassign Slots</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#F9FAFB] rounded transition-colors"
          >
            <X className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          {/* Current Config */}
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-medium text-[#6B7280] uppercase mb-2">Machine</div>
              <div className="text-sm font-medium text-[#111827]">{ad.machineName}</div>
            </div>
            <div>
              <div className="text-xs font-medium text-[#6B7280] uppercase mb-2">Slot Type</div>
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                ad.slotType === 'peak'
                  ? 'bg-orange-100 text-orange-700'
                  : 'bg-gray-100 text-[#6B7280]'
              }`}>
                {ad.slotType === 'peak' ? 'Peak' : 'Normal'}
              </span>
            </div>
          </div>

          {/* Slot Selector */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-medium text-[#6B7280] uppercase">
                Select {requiredSlots} Consecutive or Separate Slots
              </div>
              <div className="text-xs text-[#6B7280]">
                Selected: {selectedSlots.length}/{requiredSlots}
              </div>
            </div>

            {/* Slot Grid */}
            <div className="grid grid-cols-12 gap-2">
              {Array.from({ length: totalSlots }, (_, i) => i + 1).map((slotNum) => {
                const isSelected = selectedSlots.includes(slotNum);
                const isOccupied = occupiedSlots.includes(slotNum);
                const isCurrent = ad.slotPositions.includes(slotNum);

                return (
                  <button
                    key={slotNum}
                    onClick={() => toggleSlot(slotNum)}
                    disabled={isOccupied}
                    className={`aspect-square rounded-lg text-xs font-mono font-semibold transition-all border-2 ${
                      isCurrent
                        ? 'bg-blue-100 border-blue-300 text-blue-700'
                        : isSelected
                        ? 'bg-[#D9480F] border-[#D9480F] text-white'
                        : isOccupied
                        ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white border-[#E5E7EB] text-[#111827] hover:border-[#D9480F]'
                    }`}
                  >
                    {slotNum}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center gap-6 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-blue-100 border-2 border-blue-300"></div>
                <span className="text-[#6B7280]">Current</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#D9480F]"></div>
                <span className="text-[#6B7280]">New Selection</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gray-100 border-2 border-gray-200"></div>
                <span className="text-[#6B7280]">Occupied</span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-blue-800">
                <div className="font-medium mb-1">Slot reassignment rules:</div>
                <ul className="space-y-1 ml-4 list-disc">
                  <li>Must select exactly {requiredSlots} slot(s) for {ad.duration}s duration</li>
                  <li>No cross {ad.slotType === 'peak' ? 'Peak ↔ Normal' : 'Normal ↔ Peak'} reassignment</li>
                  <li>Cannot overlap with occupied slots</li>
                  <li>Changes take effect in next loop cycle</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-[#F9FAFB] border-t border-[#E5E7EB]">
          <button
            onClick={onClose}
            disabled={saving}
            className="px-4 h-10 bg-white border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!canConfirm || saving}
            className="px-4 h-10 bg-[#D9480F] text-white rounded-lg hover:bg-[#C13F0D] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Reassigning...' : 'Confirm Reassignment'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SingleAdView() {
  const { adId } = useParams();
  const navigate = useNavigate();

  // In real app, fetch ad by ID
  const ad = mockAd;

  // State for modals
  const [showEmergencyStopModal, setShowEmergencyStopModal] = useState(false);
  const [showReplaceMediaModal, setShowReplaceMediaModal] = useState(false);
  const [showReassignSlotsModal, setShowReassignSlotsModal] = useState(false);
  const [showProofOfPlayDrawer, setShowProofOfPlayDrawer] = useState(false);

  const handlePauseResume = () => {
    const action = ad.status === 'paused' ? 'resumed' : 'paused';
    toast.success(`Ad ${action} successfully`);
  };

  const handleEmergencyStop = () => {
    setShowEmergencyStopModal(true);
  };

  const confirmEmergencyStop = () => {
    toast.success('Ad stopped immediately');
    setShowEmergencyStopModal(false);
    navigate('/ad-slotting/ads-manager');
  };

  const handleReplaceMedia = () => {
    setShowReplaceMediaModal(true);
  };

  const confirmReplaceMedia = (newMediaId: string) => {
    const newMedia = mockMediaLibrary.find((m) => m.id === newMediaId);
    if (newMedia) {
      toast.success(`Media replaced with ${newMedia.name}`);
    }
    setShowReplaceMediaModal(false);
  };

  const handleReassignSlots = () => {
    setShowReassignSlotsModal(true);
  };

  const confirmReassignSlots = (newSlots: number[]) => {
    const slotsText = newSlots.length === 1 
      ? `Position ${newSlots[0]}` 
      : `Positions ${newSlots[0]}–${newSlots[newSlots.length - 1]}`;
    toast.success(`Slots reassigned to ${slotsText}`);
    setShowReassignSlotsModal(false);
  };

  const handleJumpToMachine = () => {
    navigate(`/ad-slotting/machines/${ad.machineId}`);
  };

  const getStatusColor = (status: AdStatus) => {
    switch (status) {
      case 'running': return 'text-green-700 bg-green-50 border-green-200';
      case 'scheduled': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'paused': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'completed': return 'text-gray-700 bg-gray-50 border-gray-200';
      case 'conflict': return 'text-red-700 bg-red-50 border-red-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const formatLastPlayed = (timestamp?: string) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return `${Math.floor(diffMins / 1440)}d ago`;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/ad-slotting/ads-manager')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-gray-900">{ad.clientName}</h1>
                {ad.clientBadge && (
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-700">
                    {ad.clientBadge}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="font-medium">{ad.creativeName}</span>
                <span>•</span>
                <span>{ad.duration}s</span>
                <span>•</span>
                <span>{ad.machineName}</span>
                <span>•</span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                  ad.slotType === 'peak' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {ad.slotType === 'peak' ? 'Peak' : 'Normal'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border ${getStatusColor(ad.status)}`}>
              {ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}
            </span>
            {ad.status === 'running' && (
              <button
                onClick={handleEmergencyStop}
                className="flex items-center gap-2 px-4 h-10 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                <StopCircle className="w-4 h-4" />
                <span>Emergency Stop</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - Media Preview */}
            <div className="col-span-2 space-y-6">
              {/* Media Preview */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="text-sm font-medium text-gray-700 mb-4">Media Preview</div>
                <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                  {ad.mediaType === 'video' ? (
                    <div className="text-center">
                      <Video className="w-16 h-16 text-white mb-4 mx-auto" />
                      <div className="text-white text-sm">Video Preview</div>
                      <div className="text-gray-400 text-xs mt-1">{ad.creativeName}</div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <ImageIcon className="w-16 h-16 text-white mb-4 mx-auto" />
                      <div className="text-white text-sm">Image Preview</div>
                      <div className="text-gray-400 text-xs mt-1">{ad.creativeName}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Details Section */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="text-sm font-medium text-gray-700 mb-4">Ad Details</div>
                
                <div className="grid grid-cols-2 gap-6">
                  {/* Left */}
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs font-medium text-gray-500 uppercase mb-2">Location</div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm text-gray-900">{ad.locationCity}</div>
                          <div className="text-xs text-gray-600">{ad.locationVenue}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-medium text-gray-500 uppercase mb-2">Slot Positions</div>
                      <div className="text-sm font-mono text-gray-900">
                        {ad.slotPositions.length === 1
                          ? `Position ${ad.slotPositions[0]}`
                          : `Positions ${ad.slotPositions[0]}–${ad.slotPositions[ad.slotPositions.length - 1]}`}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {ad.slotPositions.length} × 10s subslots in 120s loop
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-medium text-gray-500 uppercase mb-2">Time Window</div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-mono text-gray-900">
                          {ad.timeWindowStart}–{ad.timeWindowEnd}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-medium text-gray-500 uppercase mb-2">Campaign Period</div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div className="text-sm text-gray-900">
                          {ad.startDate} to {ad.endDate}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right - Loop Visualization */}
                  <div>
                    <div className="text-xs font-medium text-gray-500 uppercase mb-2">Loop Visualization</div>
                    {ad.beforeAd && ad.afterAd ? (
                      <div className="space-y-2">
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                          <div className="text-xs text-gray-500 mb-1">Before</div>
                          <div className="text-sm font-medium text-gray-900">{ad.beforeAd.clientName}</div>
                          <div className="text-xs text-gray-600 truncate">{ad.beforeAd.creativeName}</div>
                        </div>
                        <div className="bg-[#D9480F] bg-opacity-10 rounded-lg p-3 border-2 border-[#D9480F]">
                          <div className="text-xs text-[#D9480F] mb-1">Your Ad</div>
                          <div className="text-sm font-medium text-[rgb(255,255,255)]">{ad.clientName}</div>
                          <div className="text-xs text-[rgb(255,225,219)] truncate">{ad.creativeName}</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                          <div className="text-xs text-gray-500 mb-1">After</div>
                          <div className="text-sm font-medium text-gray-900">{ad.afterAd.clientName}</div>
                          <div className="text-xs text-gray-600 truncate">{ad.afterAd.creativeName}</div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">Loop context not available</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Actions & Health */}
            <div className="space-y-6">
              {/* Primary Actions */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="text-sm font-medium text-gray-700 mb-4">Primary Actions</div>
                <div className="space-y-3">
                  <button
                    onClick={handlePauseResume}
                    disabled={ad.status === 'conflict' || ad.status === 'completed'}
                    className="w-full flex items-center justify-center gap-2 px-4 h-10 bg-[#D9480F] text-white rounded-lg hover:bg-[#C13F0D] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {ad.status === 'paused' ? (
                      <>
                        <Play className="w-4 h-4" />
                        <span>Resume Ad</span>
                      </>
                    ) : (
                      <>
                        <Pause className="w-4 h-4" />
                        <span>Pause Ad</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleReplaceMedia}
                    className="w-full flex items-center justify-center gap-2 px-4 h-10 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    <Shuffle className="w-4 h-4" />
                    <span>Replace Media</span>
                  </button>
                  <button
                    onClick={handleReassignSlots}
                    className="w-full flex items-center justify-center gap-2 px-4 h-10 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Reassign Slots</span>
                  </button>
                </div>
              </div>

              {/* Secondary Actions */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="text-sm font-medium text-gray-700 mb-4">Secondary Actions</div>
                <div className="space-y-2">
                  <button
                    onClick={() => setShowProofOfPlayDrawer(true)}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View Proof of Play & Export</span>
                  </button>
                  <button
                    onClick={handleJumpToMachine}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Jump to Machine View</span>
                  </button>
                </div>
              </div>

              {/* Health & Performance */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="text-sm font-medium text-gray-700 mb-4">Health & Performance</div>
                
                {/* Health Indicator */}
                <div className="mb-4 p-3 rounded-lg border-2 ${
                  ad.deliveryHealth === 'healthy' ? 'bg-green-50 border-green-200' :
                  ad.deliveryHealth === 'warning' ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200'
                }">
                  <div className="flex items-center gap-2 mb-1">
                    {ad.deliveryHealth === 'healthy' ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertTriangle className={`w-5 h-5 ${
                        ad.deliveryHealth === 'warning' ? 'text-yellow-600' : 'text-red-600'
                      }`} />
                    )}
                    <span className={`text-sm font-medium ${
                      ad.deliveryHealth === 'healthy' ? 'text-green-900' :
                      ad.deliveryHealth === 'warning' ? 'text-yellow-900' : 'text-red-900'
                    }`}>
                      {ad.deliveryHealth === 'healthy' ? 'Healthy' :
                       ad.deliveryHealth === 'warning' ? 'Warning' : 'Critical'}
                    </span>
                  </div>
                  <div className={`text-xs ${
                    ad.deliveryHealth === 'healthy' ? 'text-green-700' :
                    ad.deliveryHealth === 'warning' ? 'text-yellow-700' : 'text-red-700'
                  }`}>
                    {ad.deliveryHealth === 'healthy' 
                      ? 'Ad is playing normally with no issues detected'
                      : ad.deliveryHealth === 'warning'
                      ? 'Minor issues detected. Monitor closely.'
                      : 'Critical issues detected. Immediate action required.'}
                  </div>
                </div>

                {/* Conflict Details */}
                {ad.conflictReason && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-medium text-red-900 mb-1">Conflict Detected</div>
                        <div className="text-xs text-red-800">{ad.conflictReason}</div>
                        {ad.durationMismatch && (
                          <div className="text-xs text-red-700 mt-2">
                            → Re-upload media aligned to 10s increments
                          </div>
                        )}
                        {ad.slotConflict && (
                          <div className="text-xs text-red-700 mt-2">
                            → Reassign to different positions
                          </div>
                        )}
                        {ad.machineOffline && (
                          <div className="text-xs text-red-700 mt-2">
                            → Contact hardware team for machine restart
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Performance Stats */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Plays</span>
                    <span className="text-sm font-semibold text-gray-900">{ad.playCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Last Played</span>
                    <span className="text-sm font-semibold text-gray-900">{formatLastPlayed(ad.lastPlayed)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Delivery Health</span>
                    <span className={`text-sm font-semibold capitalize ${
                      ad.deliveryHealth === 'healthy' ? 'text-green-600' :
                      ad.deliveryHealth === 'warning' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {ad.deliveryHealth}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Stop Modal */}
      {showEmergencyStopModal && (
        <EmergencyStopModal
          ad={ad}
          onClose={() => setShowEmergencyStopModal(false)}
          onConfirm={confirmEmergencyStop}
        />
      )}

      {/* Replace Media Modal */}
      {showReplaceMediaModal && (
        <ReplaceMediaModal
          ad={ad}
          onClose={() => setShowReplaceMediaModal(false)}
          onConfirm={confirmReplaceMedia}
        />
      )}

      {/* Reassign Slots Modal */}
      {showReassignSlotsModal && (
        <ReassignSlotsModal
          ad={ad}
          onClose={() => setShowReassignSlotsModal(false)}
          onConfirm={confirmReassignSlots}
        />
      )}

      {/* Proof of Play Drawer */}
      {showProofOfPlayDrawer && (
        <ProofOfPlayDrawer
          ad={ad}
          popData={mockProofOfPlayData}
          onClose={() => setShowProofOfPlayDrawer(false)}
        />
      )}
    </div>
  );
}