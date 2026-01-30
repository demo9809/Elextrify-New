import { X, Video as VideoIcon, Play, User, Calendar, TrendingUp, Activity, Clock, CheckCircle2 } from 'lucide-react';

interface SlotPreviewModalProps {
  slot: {
    position: number;
    timeRange: string;
    client: string;
    campaign: string;
    mediaType: string;
    duration: string;
  };
  onClose: () => void;
  onViewCampaign?: () => void;
  onReplaceCreative?: () => void;
}

export default function SlotPreviewModal({ 
  slot, 
  onClose, 
  onViewCampaign,
  onReplaceCreative 
}: SlotPreviewModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 flex items-start justify-between flex-shrink-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Subslot {slot.position} Details</h2>
            <p className="text-sm text-gray-600 mt-1">{slot.timeRange}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Creative Preview */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Creative Preview
            </label>
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
              {/* Video placeholder */}
              <VideoIcon className="w-20 h-20 text-gray-400" />
              
              {/* Overlay buttons */}
              <div className="absolute inset-0 flex items-end justify-between p-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors">
                  <VideoIcon className="w-4 h-4" />
                  <span>Video</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors">
                  <Play className="w-4 h-4" />
                  <span>Preview</span>
                </button>
              </div>
            </div>
          </div>

          {/* Client and Campaign Info */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-base text-gray-900">{slot.client}</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Campaign</label>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-base text-gray-900">{slot.campaign}</span>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Schedule</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-900">Schedule</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Position in Loop</span>
                  <span className="text-sm font-semibold text-gray-900">#{slot.position}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Time Range</span>
                  <span className="text-sm font-semibold text-gray-900">{slot.timeRange}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Duration</span>
                  <span className="text-sm font-semibold text-gray-900">{slot.duration}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Performance</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Impressions</div>
                <div className="text-2xl font-semibold text-gray-900 mb-1">142.5K</div>
                <div className="text-xs font-medium text-green-600">+12.3%</div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Plays</div>
                <div className="text-2xl font-semibold text-gray-900 mb-1">8,520</div>
                <div className="text-xs font-medium text-green-600">+8.5%</div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Uptime</div>
                <div className="text-2xl font-semibold text-gray-900 mb-1">99.2%</div>
                <div className="text-xs text-gray-600">7d avg</div>
              </div>
            </div>
          </div>

          {/* Booking Info */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Booking Info</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-900">Booking Info</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Booking ID</span>
                  <span className="text-sm font-semibold text-gray-900">bk-001</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Campaign Dates</span>
                  <span className="text-sm font-semibold text-gray-900">Jan 1 – Mar 31, 2025</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 h-11 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-base font-normal"
          >
            Close
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={onViewCampaign}
              className="flex items-center gap-2 px-4 h-11 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-base font-normal"
            >
              <Calendar className="w-4 h-4" />
              <span>View Campaign</span>
            </button>
            <button
              onClick={onReplaceCreative}
              className="flex items-center gap-2 px-4 h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors text-base font-normal"
            >
              <VideoIcon className="w-4 h-4" />
              <span>Replace Creative</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}