import { X, AlertTriangle, StopCircle, Calendar, Clock, Monitor, Film, User, BarChart3, CheckCircle, PlayCircle } from 'lucide-react';
import { useState } from 'react';

interface Booking {
  id: string;
  clientName: string;
  clientId: string;
  contentType: 'media' | 'playlist' | 'unknown';
  contentName: string;
  mediaCount?: number;
  deviceName: string;
  deviceId: string;
  date: string;
  timeSlot: string;
  playbackMode: 'fixed' | 'stack' | 'unknown';
  stackDuration?: number;
  dateRange: { start: string; end: string };
  occupancy: number;
  status: 'active' | 'scheduled' | 'completed' | 'stopped' | 'unknown';
  
  // Proof of Play data
  pop?: {
    actualPlayTime: number; // seconds
    scheduledPlayTime: number; // seconds
    impressions: number;
    attentiveness: number; // percentage
    walkins: number;
  };
}

interface BookingDetailsPanelProps {
  booking: Booking;
  onClose: () => void;
  onEmergencyStop: (bookingId: string) => void;
}

export function BookingDetailsPanel({ booking, onClose, onEmergencyStop }: BookingDetailsPanelProps) {
  const [showStopConfirm, setShowStopConfirm] = useState(false);

  const handleEmergencyStop = () => {
    onEmergencyStop(booking.id);
    setShowStopConfirm(false);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 w-[600px] bg-white z-50 shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="border-b border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-[#111827] mb-1">Booking Details</h2>
              <p className="text-sm text-[#6B7280]">ID: {booking.id}</p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center text-[#6B7280] hover:bg-[#F9FAFB] rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-[#D1FAE5] text-[#16A34A]">
            {booking.status === 'active' ? (
              <>
                <PlayCircle className="w-4 h-4" />
                <span>Currently Running</span>
              </>
            ) : booking.status === 'scheduled' ? (
              <>
                <Clock className="w-4 h-4" />
                <span>Scheduled</span>
              </>
            ) : booking.status === 'completed' ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Completed</span>
              </>
            ) : (
              <>
                <StopCircle className="w-4 h-4" />
                <span>Stopped</span>
              </>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Client Information */}
          <div>
            <h3 className="text-sm font-semibold text-[#111827] mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-[#6B7280]" />
              Client Information
            </h3>
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
              <p className="text-sm font-medium text-[#111827]">{booking.clientName}</p>
              <p className="text-xs text-[#6B7280] mt-1">ID: {booking.clientId}</p>
            </div>
          </div>

          {/* Content Details */}
          <div>
            <h3 className="text-sm font-semibold text-[#111827] mb-3 flex items-center gap-2">
              <Film className="w-4 h-4 text-[#6B7280]" />
              Content
            </h3>
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-[#111827]">{booking.contentName}</p>
                  <p className="text-xs text-[#6B7280] mt-1">
                    {booking.contentType === 'playlist' ? (
                      <>{booking.mediaCount} media items</>
                    ) : (
                      <>Direct Media</>
                    )}
                  </p>
                </div>
                <span className="px-2 py-1 bg-[#EDE9FE] text-[#8B5CF6] text-xs font-medium rounded">
                  {booking.contentType === 'playlist' ? 'Playlist' : 'Media'}
                </span>
              </div>
            </div>
          </div>

          {/* Device & Schedule */}
          <div>
            <h3 className="text-sm font-semibold text-[#111827] mb-3 flex items-center gap-2">
              <Monitor className="w-4 h-4 text-[#6B7280]" />
              Device & Schedule
            </h3>
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4 space-y-3">
              <div>
                <p className="text-xs text-[#6B7280] mb-1">Device</p>
                <p className="text-sm font-medium text-[#111827]">{booking.deviceName}</p>
              </div>
              <div className="border-t border-[#E5E7EB] pt-3">
                <p className="text-xs text-[#6B7280] mb-1">Time Slot</p>
                <p className="text-sm font-medium text-[#111827]">{booking.timeSlot}</p>
              </div>
              <div className="border-t border-[#E5E7EB] pt-3">
                <p className="text-xs text-[#6B7280] mb-1">Date Range</p>
                <p className="text-sm font-medium text-[#111827]">
                  {booking.dateRange.start} to {booking.dateRange.end}
                </p>
              </div>
              <div className="border-t border-[#E5E7EB] pt-3">
                <p className="text-xs text-[#6B7280] mb-1">Playback Mode</p>
                <p className="text-sm font-medium text-[#111827]">
                  {booking.playbackMode === 'fixed' ? (
                    'Fixed Target (Entire slot duration)'
                  ) : (
                    `Stack/Random (${booking.stackDuration}s total)`
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Proof of Play (if available) */}
          {booking.pop && (
            <div>
              <h3 className="text-sm font-semibold text-[#111827] mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#6B7280]" />
                Proof of Play & Analytics
              </h3>
              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4 space-y-4">
                {/* Play Time */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-[#6B7280]">Actual vs Scheduled Play Time</p>
                    <p className="text-sm font-semibold text-[#111827]">
                      {booking.pop.actualPlayTime}s / {booking.pop.scheduledPlayTime}s
                    </p>
                  </div>
                  <div className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#16A34A]"
                      style={{ 
                        width: `${Math.min((booking.pop.actualPlayTime / booking.pop.scheduledPlayTime) * 100, 100)}%` 
                      }}
                    />
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#E5E7EB]">
                  <div className="text-center">
                    <p className="text-xs text-[#6B7280] mb-1">Impressions</p>
                    <p className="text-lg font-semibold text-[#111827]">
                      {booking.pop.impressions.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-[#6B7280] mb-1">Attentiveness</p>
                    <p className="text-lg font-semibold text-[#111827]">{booking.pop.attentiveness}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-[#6B7280] mb-1">Walk-ins</p>
                    <p className="text-lg font-semibold text-[#111827]">
                      {booking.pop.walkins.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E5E7EB]">
                  <p className="text-xs text-[#6B7280]">
                    Data collected via IoT sensors and ML-based audience detection
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Danger Zone - Emergency Stop */}
          {(booking.status === 'active' || booking.status === 'scheduled') && (
            <div>
              <h3 className="text-sm font-semibold text-[#DC2626] mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Danger Zone
              </h3>
              <div className="bg-[#FEE2E2] border-2 border-[#DC2626] rounded-lg p-4">
                <div className="flex items-start gap-3 mb-4">
                  <AlertTriangle className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-[#111827] mb-1">Emergency Stop / Recall</p>
                    <p className="text-xs text-[#6B7280]">
                      Immediately stop this ad from playing on all devices. This action pushes an instant 
                      command to the hardware to cease playback. Use this for regulatory compliance, 
                      content issues, or emergency situations.
                    </p>
                  </div>
                </div>
                
                {!showStopConfirm ? (
                  <button
                    onClick={() => setShowStopConfirm(true)}
                    className="w-full h-11 bg-[#DC2626] text-white rounded-lg hover:bg-[#B91C1C] font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <StopCircle className="w-5 h-5" />
                    Emergency Stop Ad
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-[#FEF2F2] border border-[#DC2626] rounded-lg p-3">
                      <p className="text-sm font-semibold text-[#DC2626] mb-1">⚠️ Confirm Emergency Stop</p>
                      <p className="text-xs text-[#6B7280]">
                        This will immediately stop the ad on all devices. This action cannot be undone.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowStopConfirm(false)}
                        className="flex-1 h-10 bg-white border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-[#F9FAFB] font-medium transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleEmergencyStop}
                        className="flex-1 h-10 bg-[#DC2626] text-white rounded-lg hover:bg-[#B91C1C] font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <StopCircle className="w-4 h-4" />
                        Yes, Stop Now
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Stopped Status Info */}
          {booking.status === 'stopped' && (
            <div className="bg-[#FEE2E2] border border-[#DC2626] rounded-lg p-4">
              <div className="flex items-start gap-3">
                <StopCircle className="w-5 h-5 text-[#DC2626] flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-[#111827] mb-1">Ad Stopped</p>
                  <p className="text-xs text-[#6B7280]">
                    This ad was emergency stopped and is no longer running on any devices.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#E5E7EB] p-6">
          <button
            onClick={onClose}
            className="w-full h-11 bg-[#F9FAFB] text-[#111827] rounded-lg hover:bg-[#F3F4F6] font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}