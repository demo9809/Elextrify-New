import { X, Calendar, Clock, DollarSign, Zap, PlayCircle, Users, Eye, TrendingUp, AlertCircle } from 'lucide-react';
import { TimeSlot } from './SlotScheduler';

interface SlotDetailsPanelProps {
  slot: TimeSlot;
  onClose: () => void;
  onBook: () => void;
}

export function SlotDetailsPanel({ slot, onClose, onBook }: SlotDetailsPanelProps) {
  return (
    <div className="fixed inset-y-0 right-0 w-[480px] bg-white border-l border-[#E5E7EB] shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-[#E5E7EB]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[#111827]">Slot Details</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F9FAFB] transition-colors"
          >
            <X className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
            slot.status === 'booked'
              ? 'bg-[#D1FAE5] text-[#16A34A]'
              : slot.status === 'partially-booked'
              ? 'bg-[#FEF3C7] text-[#F59E0B]'
              : 'bg-[#F3F4F6] text-[#6B7280]'
          }`}>
            {slot.status === 'booked' ? '● Fully Booked' : slot.status === 'partially-booked' ? '● Partially Booked' : '● Available'}
          </span>
          {slot.pricingTier === 'peak' && (
            <span className="px-3 py-1.5 bg-[#FFF7ED] border border-[#FDBA74] text-[#D9480F] rounded-full text-sm font-medium">
              Peak Hours
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Slot Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-[#111827]">Slot Information</h3>
          
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4 space-y-3">
            <InfoRow
              icon={Calendar}
              label="Kiosk"
              value={slot.kioskName}
            />
            <InfoRow
              icon={Calendar}
              label="Date"
              value={new Date(slot.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })}
            />
            <InfoRow
              icon={Clock}
              label="Time Slot"
              value={`${slot.startTime} - ${slot.endTime}`}
            />
            <InfoRow
              icon={Zap}
              label="Duration"
              value="60 minutes (3,600 seconds)"
            />
            <InfoRow
              icon={DollarSign}
              label="Base Price"
              value={`$${slot.basePrice}`}
              valueClassName="font-semibold text-[#D9480F]"
            />
          </div>
        </div>

        {/* Capacity Utilization */}
        {slot.bookings.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#111827]">Capacity Utilization</h3>
            
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-[#6B7280]">Slot Occupancy</p>
                <p className="text-sm font-semibold text-[#111827]">
                  {(() => {
                    const totalBookedTime = slot.bookings.reduce((sum, b) => {
                      if (b.scheduleType === 'fixed' && b.exactStartTime && b.exactEndTime) {
                        const [startH, startM] = b.exactStartTime.split(':').map(Number);
                        const [endH, endM] = b.exactEndTime.split(':').map(Number);
                        return sum + ((endH * 60 + endM) - (startH * 60 + startM)) * 60;
                      }
                      return sum + (b.totalPlayTime || 0);
                    }, 0);
                    return Math.min(100, Math.round((totalBookedTime / slot.duration) * 100));
                  })()}%
                </p>
              </div>
              
              <div className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#D9480F] to-[#F97316] transition-all"
                  style={{
                    width: `${(() => {
                      const totalBookedTime = slot.bookings.reduce((sum, b) => {
                        if (b.scheduleType === 'fixed' && b.exactStartTime && b.exactEndTime) {
                          const [startH, startM] = b.exactStartTime.split(':').map(Number);
                          const [endH, endM] = b.exactEndTime.split(':').map(Number);
                          return sum + ((endH * 60 + endM) - (startH * 60 + startM)) * 60;
                        }
                        return sum + (b.totalPlayTime || 0);
                      }, 0);
                      return Math.min(100, Math.round((totalBookedTime / slot.duration) * 100));
                    })()}%`
                  }}
                />
              </div>

              <div className="mt-4 pt-4 border-t border-[#E5E7EB] grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Booked Time</p>
                  <p className="text-sm font-semibold text-[#111827]">
                    {(() => {
                      const totalBookedTime = slot.bookings.reduce((sum, b) => {
                        if (b.scheduleType === 'fixed' && b.exactStartTime && b.exactEndTime) {
                          const [startH, startM] = b.exactStartTime.split(':').map(Number);
                          const [endH, endM] = b.exactEndTime.split(':').map(Number);
                          return sum + ((endH * 60 + endM) - (startH * 60 + startM));
                        }
                        return sum + (b.totalPlayTime || 0) / 60;
                      }, 0);
                      return Math.round(totalBookedTime);
                    })()} min
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Available</p>
                  <p className="text-sm font-semibold text-[#111827]">
                    {(() => {
                      const totalBookedTime = slot.bookings.reduce((sum, b) => {
                        if (b.scheduleType === 'fixed' && b.exactStartTime && b.exactEndTime) {
                          const [startH, startM] = b.exactStartTime.split(':').map(Number);
                          const [endH, endM] = b.exactEndTime.split(':').map(Number);
                          return sum + ((endH * 60 + endM) - (startH * 60 + startM));
                        }
                        return sum + (b.totalPlayTime || 0) / 60;
                      }, 0);
                      return Math.max(0, 60 - Math.round(totalBookedTime));
                    })()} min
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Active Bookings */}
        {slot.bookings.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#111827]">
                Active Bookings ({slot.bookings.length})
              </h3>
            </div>

            <div className="space-y-3">
              {slot.bookings.map(booking => (
                <div
                  key={booking.id}
                  className="bg-white border border-[#E5E7EB] rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  {/* Booking Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-semibold text-[#111827]">{booking.clientName}</p>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          booking.status === 'scheduled'
                            ? 'bg-[#DBEAFE] text-[#3B82F6]'
                            : booking.status === 'playing'
                            ? 'bg-[#D1FAE5] text-[#16A34A]'
                            : 'bg-[#F3F4F6] text-[#6B7280]'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#6B7280]">{booking.mediaName}</p>
                    </div>
                  </div>

                  {/* Schedule Info */}
                  <div className="bg-[#F9FAFB] rounded-lg p-3 space-y-2">
                    {booking.scheduleType === 'fixed' ? (
                      <>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3 text-[#6B7280]" />
                          <p className="text-xs text-[#6B7280]">
                            Fixed Time: {booking.exactStartTime} - {booking.exactEndTime}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="w-3 h-3 text-[#6B7280]" />
                          <p className="text-xs text-[#6B7280]">
                            Duration: {booking.mediaDuration}s
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3 text-[#6B7280]" />
                          <p className="text-xs text-[#6B7280]">
                            Random Window: {booking.windowStart} - {booking.windowEnd}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="w-3 h-3 text-[#6B7280]" />
                          <p className="text-xs text-[#6B7280]">
                            Total Play Time: {Math.round((booking.totalPlayTime || 0) / 60)} minutes
                          </p>
                        </div>
                      </>
                    )}
                    <div className="flex items-center gap-2">
                      <Users className="w-3 h-3 text-[#6B7280]" />
                      <p className="text-xs text-[#6B7280]">
                        Priority: {booking.priority}/10
                      </p>
                    </div>
                  </div>

                  {/* PoP Data (if available) */}
                  {booking.actualPlayTime !== undefined && (
                    <div className="mt-3 pt-3 border-t border-[#E5E7EB]">
                      <p className="text-xs font-medium text-[#111827] mb-2">Proof of Play</p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center">
                          <p className="text-xs text-[#6B7280]">Played</p>
                          <p className="text-sm font-semibold text-[#111827]">{booking.actualPlayTime}s</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-[#6B7280]">Views</p>
                          <p className="text-sm font-semibold text-[#111827]">{booking.impressions || 0}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-[#6B7280]">Attention</p>
                          <p className="text-sm font-semibold text-[#111827]">{booking.attentiveness || 0}%</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-3 flex items-center gap-2">
                    <button className="flex-1 h-8 bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] text-xs font-medium rounded hover:bg-[#F3F4F6] transition-colors">
                      View Details
                    </button>
                    <button className="h-8 px-3 bg-[#DC2626] text-white text-xs font-medium rounded hover:bg-[#B91C1C] transition-colors flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Recall
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {slot.bookings.length === 0 && (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-[#F9FAFB] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-[#9CA3AF]" />
            </div>
            <h3 className="text-sm font-semibold text-[#111827] mb-2">No Bookings Yet</h3>
            <p className="text-sm text-[#6B7280] mb-6">
              This slot is available for booking
            </p>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      {slot.status !== 'booked' && (
        <div className="p-6 border-t border-[#E5E7EB]">
          <button
            onClick={onBook}
            className="w-full h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C13F0D] transition-colors flex items-center justify-center gap-2"
          >
            <PlayCircle className="w-5 h-5" />
            <span className="font-medium">Book This Slot</span>
          </button>
        </div>
      )}
    </div>
  );
}

interface InfoRowProps {
  icon: React.ElementType;
  label: string;
  value: string;
  valueClassName?: string;
}

function InfoRow({ icon: Icon, label, value, valueClassName }: InfoRowProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-[#6B7280]" />
        <p className="text-sm text-[#6B7280]">{label}</p>
      </div>
      <p className={`text-sm text-[#111827] ${valueClassName || ''}`}>{value}</p>
    </div>
  );
}
