import { X, Monitor, Check, CheckCircle } from 'lucide-react';
import { BookingPanel } from './BookingPanel';

interface Device {
  id: string;
  name: string;
  location: string;
  venueType: string;
  status: 'online' | 'offline' | 'syncing';
  slotConfigId: string;
}

interface TimeSlot {
  id: string;
  deviceId: string;
  deviceName: string;
  date: string;
  hour: number;
  startTime: string;
  endTime: string;
  duration: number;
  status: 'open' | 'occupied' | 'partially-occupied';
  pricingTier: 'peak' | 'non-peak';
  price: number;
  occupancy: number;
  bookings: any[];
}

interface MultiDeviceBookingPanelProps {
  devices: Device[];
  timeSlot: { hour: number; date: string };
  onClose: () => void;
  onBook: (booking: any) => void;
}

export function MultiDeviceBookingPanel({
  devices,
  timeSlot,
  onClose,
  onBook,
}: MultiDeviceBookingPanelProps) {
  const [selectedDeviceIds, setSelectedDeviceIds] = React.useState<Set<string>>(
    new Set(devices.map(d => d.id))
  );
  const [showBookingPanel, setShowBookingPanel] = React.useState(false);

  const toggleDevice = (deviceId: string) => {
    const newSelected = new Set(selectedDeviceIds);
    if (newSelected.has(deviceId)) {
      newSelected.delete(deviceId);
    } else {
      newSelected.add(deviceId);
    }
    setSelectedDeviceIds(newSelected);
  };

  const selectAll = () => {
    setSelectedDeviceIds(new Set(devices.map(d => d.id)));
  };

  const clearAll = () => {
    setSelectedDeviceIds(new Set());
  };

  const hour = timeSlot.hour;
  const mockSlot: TimeSlot = {
    id: `multi-${timeSlot.date}-${hour}`,
    deviceId: 'multiple',
    deviceName: `${selectedDeviceIds.size} devices`,
    date: timeSlot.date,
    hour,
    startTime: `${hour.toString().padStart(2, '0')}:00`,
    endTime: `${(hour + 1).toString().padStart(2, '0')}:00`,
    duration: 3600,
    status: 'open',
    pricingTier: (hour >= 8 && hour < 10) || (hour >= 17 && hour < 20) ? 'peak' : 'non-peak',
    price: (hour >= 8 && hour < 10) || (hour >= 17 && hour < 20) ? 50 : 25,
    occupancy: 0,
    bookings: [],
  };

  if (showBookingPanel) {
    return (
      <BookingPanel
        slot={mockSlot}
        onClose={() => setShowBookingPanel(false)}
        onBook={(booking) => {
          // Apply booking to all selected devices
          const multiBooking = {
            ...booking,
            deviceIds: Array.from(selectedDeviceIds),
          };
          onBook(multiBooking);
          setShowBookingPanel(false);
          onClose();
        }}
        multiDeviceCount={selectedDeviceIds.size}
      />
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 w-[680px] bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="border-b border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#111827]">Multi-Device Booking</h2>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center text-[#6B7280] hover:bg-[#F9FAFB] rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Time Slot Info */}
          <div className="bg-[#FFF7ED] border border-[#FDBA74] rounded-lg p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-[#D9480F] flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-[#111827]">
                  Booking for {mockSlot.startTime} - {mockSlot.endTime}
                </p>
                <p className="text-xs text-[#6B7280] mt-1">
                  Select devices, then proceed to configure the booking details
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Selection Controls */}
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#111827]">
                Select Devices ({selectedDeviceIds.size} of {devices.length})
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={selectAll}
                  className="text-sm text-[#D9480F] hover:underline font-medium"
                >
                  Select All
                </button>
                <span className="text-[#D1D5DB]">•</span>
                <button
                  onClick={clearAll}
                  className="text-sm text-[#6B7280] hover:underline font-medium"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Device List */}
            <div className="space-y-3">
              {devices.map(device => {
                const isSelected = selectedDeviceIds.has(device.id);
                
                return (
                  <button
                    key={device.id}
                    onClick={() => toggleDevice(device.id)}
                    className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                      isSelected
                        ? 'border-[#D9480F] bg-[#FFF7ED]'
                        : 'border-[#E5E7EB] hover:border-[#D9480F]/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Checkbox Icon */}
                      <div className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#D9480F] border-[#D9480F]'
                          : 'border-[#D1D5DB] bg-white'
                      }`}>
                        {isSelected && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                      </div>

                      {/* Device Icon */}
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        device.status === 'online' 
                          ? 'bg-[#D1FAE5]' 
                          : device.status === 'syncing'
                          ? 'bg-[#FEF3C7]'
                          : 'bg-[#FEE2E2]'
                      }`}>
                        <Monitor className={`w-5 h-5 ${
                          device.status === 'online' 
                            ? 'text-[#16A34A]' 
                            : device.status === 'syncing'
                            ? 'text-[#F59E0B]'
                            : 'text-[#DC2626]'
                        }`} />
                      </div>

                      {/* Device Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#111827] mb-1">{device.name}</p>
                        <p className="text-xs text-[#6B7280]">{device.location}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-medium ${
                            device.status === 'online'
                              ? 'bg-[#D1FAE5] text-[#16A34A]'
                              : device.status === 'syncing'
                              ? 'bg-[#FEF3C7] text-[#F59E0B]'
                              : 'bg-[#FEE2E2] text-[#DC2626]'
                          }`}>
                            {device.status}
                          </span>
                          <span className="text-xs text-[#9CA3AF]">{device.venueType}</span>
                        </div>
                      </div>

                      {/* Selected Badge */}
                      {isSelected && (
                        <div className="flex-shrink-0">
                          <CheckCircle className="w-5 h-5 text-[#D9480F]" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Summary */}
            {selectedDeviceIds.size > 0 && (
              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                <p className="text-sm font-medium text-[#111827] mb-2">Booking Summary</p>
                <div className="space-y-1 text-xs text-[#6B7280]">
                  <div className="flex items-center justify-between">
                    <span>Selected Devices:</span>
                    <span className="font-semibold text-[#111827]">{selectedDeviceIds.size}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Time Slot:</span>
                    <span className="font-semibold text-[#111827]">
                      {mockSlot.startTime} - {mockSlot.endTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Price per Device:</span>
                    <span className="font-semibold text-[#111827]">
                      ${mockSlot.price} {mockSlot.pricingTier === 'peak' ? '(Peak)' : '(Non-Peak)'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#E5E7EB] mt-2">
                    <span className="font-medium text-[#111827]">Estimated Total:</span>
                    <span className="text-base font-semibold text-[#D9480F]">
                      ${mockSlot.price * selectedDeviceIds.size}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#E5E7EB] p-6">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-[#F9FAFB] text-[#111827] rounded-lg hover:bg-[#F3F4F6] font-medium transition-colors"
            >
              Cancel
            </button>
            
            <div className="flex-1" />
            
            <button
              onClick={() => setShowBookingPanel(true)}
              disabled={selectedDeviceIds.size === 0}
              className="px-6 py-3 bg-[#D9480F] text-white rounded-lg hover:bg-[#C13C09] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Booking ({selectedDeviceIds.size} devices)
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// Add React import at the top
import React from 'react';
