import { useParams, useNavigate } from 'react-router';
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

export default function SingleAdView() {
  const { adId } = useParams();
  const navigate = useNavigate();

  // In real app, fetch ad by ID
  const ad = mockAd;

  const handlePauseResume = () => {
    const action = ad.status === 'paused' ? 'resumed' : 'paused';
    toast.success(`Ad ${action} successfully`);
  };

  const handleEmergencyStop = () => {
    if (window.confirm(`Emergency stop for ${ad.creativeName} on ${ad.machineName}?\n\nThis will immediately halt playback.`)) {
      toast.success('Ad stopped immediately');
      navigate('/ad-slotting/ads-manager');
    }
  };

  const handleReplaceMedia = () => {
    toast.info('Replace Media flow coming soon');
  };

  const handleReassignSlots = () => {
    toast.info('Reassign Slots flow coming soon');
  };

  const handleViewProofOfPlay = () => {
    toast.info('View Proof of Play');
  };

  const handleOpenReports = () => {
    toast.info('Open Ad Reports');
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
                    onClick={handleViewProofOfPlay}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View Proof of Play</span>
                  </button>
                  <button
                    onClick={handleOpenReports}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span>Open Ad Reports</span>
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
    </div>
  );
}