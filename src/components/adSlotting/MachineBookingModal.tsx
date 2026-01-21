import { useState } from 'react';
import { X, AlertCircle, Calendar, Clock, DollarSign } from 'lucide-react';
import { Machine, SlotApplicability } from '../../types/adSlotting';
import { toast } from 'sonner@2.0.3';

interface MachineBookingModalProps {
  machine: Machine;
  preselectedSlotType?: SlotApplicability;
  preselectedPositions?: number[];
  availablePositions: number[];
  onClose: () => void;
  onBook: (booking: any) => void;
}

export default function MachineBookingModal({
  machine,
  preselectedSlotType = 'peak',
  preselectedPositions = [],
  availablePositions,
  onClose,
  onBook,
}: MachineBookingModalProps) {
  const [slotType, setSlotType] = useState<SlotApplicability>(preselectedSlotType);
  const [selectedPositions, setSelectedPositions] = useState<number[]>(preselectedPositions);
  const [clientName, setClientName] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const [startDate, setStartDate] = useState('2025-01-21');
  const [endDate, setEndDate] = useState('2025-03-31');

  const pricePerPosition = slotType === 'peak' ? 500 : 300;
  const totalCost = selectedPositions.length * pricePerPosition;

  const togglePosition = (position: number) => {
    if (!availablePositions.includes(position)) {
      toast.error('This position is already booked');
      return;
    }

    setSelectedPositions((prev) =>
      prev.includes(position) ? prev.filter((p) => p !== position) : [...prev, position]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedPositions.length === 0) {
      toast.error('Please select at least one position');
      return;
    }

    if (!clientName || !campaignName) {
      toast.error('Please fill in all required fields');
      return;
    }

    onBook({
      machineId: machine.id,
      slotType,
      positions: selectedPositions,
      clientName,
      campaignName,
      startDate,
      endDate,
      totalCost,
    });

    toast.success('Booking created successfully');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-gray-900">Book Ad: {machine.name}</h2>
            <p className="text-sm text-gray-600 mt-1">
              {machine.location.city} • {machine.location.venue}
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
        <form onSubmit={handleSubmit} className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            {/* Slot Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Slot Type</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setSlotType('peak')}
                  className={`flex-1 px-4 py-3 rounded-lg border-2 transition-colors text-left ${
                    slotType === 'peak'
                      ? 'border-[#D9480F] bg-[#FEF2F2]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-900">Peak Slots</div>
                  <div className="text-sm text-gray-600 mt-1">$500 per position</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {machine.peakWindows.map((w) => `${w.startTime}-${w.endTime}`).join(', ')}
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setSlotType('normal')}
                  className={`flex-1 px-4 py-3 rounded-lg border-2 transition-colors text-left ${
                    slotType === 'normal'
                      ? 'border-[#D9480F] bg-[#FEF2F2]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-900">Normal Slots</div>
                  <div className="text-sm text-gray-600 mt-1">$300 per position</div>
                  <div className="text-xs text-gray-500 mt-1">All other hours</div>
                </button>
              </div>
            </div>

            {/* Position Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Positions ({selectedPositions.length} selected)
              </label>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="grid grid-cols-8 gap-2">
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((position) => {
                    const isAvailable = availablePositions.includes(position);
                    const isSelected = selectedPositions.includes(position);

                    return (
                      <button
                        key={position}
                        type="button"
                        onClick={() => togglePosition(position)}
                        disabled={!isAvailable}
                        className={`aspect-square rounded-lg border-2 font-medium text-sm transition-colors ${
                          isSelected
                            ? 'border-[#D9480F] bg-[#D9480F] text-white'
                            : isAvailable
                            ? 'border-gray-300 bg-white text-gray-900 hover:border-gray-400'
                            : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {position}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-3 flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded border-2 border-[#D9480F] bg-[#D9480F]" />
                    <span className="text-gray-600">Selected</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded border-2 border-gray-300 bg-white" />
                    <span className="text-gray-600">Available</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded border-2 border-gray-200 bg-gray-100" />
                    <span className="text-gray-600">Booked</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Client & Campaign Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g., Nike Sports"
                  required
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Campaign Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="e.g., Summer Collection 2025"
                  required
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                />
              </div>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                />
              </div>
            </div>

            {/* Cost Summary */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">Booking Summary</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Positions</span>
                  <span className="font-medium text-gray-900">{selectedPositions.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Price per Position</span>
                  <span className="font-medium text-gray-900">${pricePerPosition}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium text-gray-900">70 days</span>
                </div>
                <div className="pt-2 mt-2 border-t border-gray-300 flex items-center justify-between">
                  <span className="text-base font-medium text-gray-900">Total Cost</span>
                  <span className="text-xl font-semibold text-[#D9480F]">${totalCost.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Info Message */}
            {selectedPositions.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  Your ad will play in position{selectedPositions.length > 1 ? 's' : ''}{' '}
                  {selectedPositions.join(', ')} during {slotType} hours on {machine.name}.
                </div>
              </div>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 h-10 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={selectedPositions.length === 0}
            className="flex items-center gap-2 px-4 h-10 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <DollarSign className="w-4 h-4" />
            <span>Confirm Booking</span>
          </button>
        </div>
      </div>
    </div>
  );
}
