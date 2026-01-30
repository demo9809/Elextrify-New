import { X, Eye, User, Calendar, Clock, FileImage, Video, Play, RefreshCw } from 'lucide-react';

interface AdDetailModalProps {
  subslot: {
    position: number;
    startTime: string;
    endTime: string;
    booking: {
      id: string;
      clientName: string;
      campaignName: string;
      creativeType: 'image' | 'video';
      thumbnailUrl?: string;
    };
  };
  onClose: () => void;
  onViewCampaign?: () => void;
  onReplaceCreative?: () => void;
}

export default function AdDetailModal({
  subslot,
  onClose,
  onViewCampaign,
  onReplaceCreative,
}: AdDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-gray-900">Subslot {subslot.position} Details</h2>
            <p className="text-sm text-gray-600 mt-1">
              {subslot.startTime} – {subslot.endTime}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            {/* Creative Preview */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Creative Preview</label>
              <div className="relative bg-gray-100 rounded-lg aspect-video overflow-hidden border border-gray-200">
                {subslot.booking.thumbnailUrl ? (
                  <img
                    src={subslot.booking.thumbnailUrl}
                    alt="Creative preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    {subslot.booking.creativeType === 'video' ? (
                      <Video className="w-16 h-16 text-gray-400" />
                    ) : (
                      <FileImage className="w-16 h-16 text-gray-400" />
                    )}
                  </div>
                )}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-black bg-opacity-70 text-white text-xs font-medium">
                    {subslot.booking.creativeType === 'video' ? (
                      <Video className="w-3 h-3" />
                    ) : (
                      <FileImage className="w-3 h-3" />
                    )}
                    {subslot.booking.creativeType.charAt(0).toUpperCase() +
                      subslot.booking.creativeType.slice(1)}
                  </span>
                  <button className="flex items-center gap-1 px-2 py-1 rounded bg-black bg-opacity-70 text-white text-xs font-medium hover:bg-opacity-90 transition-colors">
                    <Play className="w-3 h-3" />
                    Preview
                  </button>
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                <div className="flex items-center gap-2 text-sm text-gray-900">
                  <User className="w-4 h-4 text-gray-400" />
                  <span>{subslot.booking.clientName}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Campaign</label>
                <div className="flex items-center gap-2 text-sm text-gray-900">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{subslot.booking.campaignName}</span>
                </div>
              </div>
            </div>

            {/* Schedule Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Schedule</label>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Position in Loop</span>
                  <span className="font-medium text-gray-900">#{subslot.position}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Time Range</span>
                  <span className="font-medium text-gray-900">
                    {subslot.startTime} – {subslot.endTime}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium text-gray-900">10 seconds</span>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Performance</label>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="text-xs text-gray-600 mb-1">Impressions</div>
                  <div className="text-lg font-semibold text-gray-900">142.5K</div>
                  <div className="text-xs text-green-600 mt-1">+12.3%</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="text-xs text-gray-600 mb-1">Plays</div>
                  <div className="text-lg font-semibold text-gray-900">8,520</div>
                  <div className="text-xs text-green-600 mt-1">+8.5%</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="text-xs text-gray-600 mb-1">Uptime</div>
                  <div className="text-lg font-semibold text-gray-900">99.2%</div>
                  <div className="text-xs text-gray-500 mt-1">7d avg</div>
                </div>
              </div>
            </div>

            {/* Booking Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Booking Info</label>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Booking ID</span>
                  <span className="font-mono text-xs text-gray-900">{subslot.booking.id}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Campaign Dates</span>
                  <span className="font-medium text-gray-900">Jan 1 – Mar 31, 2025</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Status</span>
                  <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 h-10 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Close
          </button>
          <button
            onClick={onViewCampaign}
            className="flex items-center gap-2 px-4 h-10 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <Eye className="w-4 h-4" />
            View Campaign
          </button>
          <button
            onClick={onReplaceCreative}
            className="flex items-center gap-2 px-4 h-10 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors text-sm font-medium"
          >
            <RefreshCw className="w-4 h-4" />
            Replace Creative
          </button>
        </div>
      </div>
    </div>
  );
}
