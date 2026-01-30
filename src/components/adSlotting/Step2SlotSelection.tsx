import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

interface SubSlot {
  position: number;
  startTime: string;
  endTime: string;
  duration: number;
  status: 'free' | 'booked' | 'filler';
  price: number;
  booking?: {
    clientName: string;
    mediaName: string;
  };
}

interface SlotGridProps {
  title: string;
  pricePerSlot: number;
  subSlots: SubSlot[];
  selectedSlots: number[];
  hoveredSlot: number | null;
  requiredSlotCount: number;
  selectionError: string | null;
  validSlotGroups: number[][];
  onSlotClick: (position: number) => void;
  onSlotHover: (position: number | null) => void;
  canStartSelection: (position: number, subSlots: SubSlot[]) => boolean;
  getPreviewSelection: (startPosition: number, subSlots: SubSlot[]) => number[];
}

export function SlotGrid({
  title,
  pricePerSlot,
  subSlots,
  selectedSlots,
  hoveredSlot,
  requiredSlotCount,
  selectionError,
  validSlotGroups,
  onSlotClick,
  onSlotHover,
  canStartSelection,
  getPreviewSelection,
}: SlotGridProps) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <div className="text-sm text-gray-600">${pricePerSlot} per slot/day</div>
      </div>

      {/* Selection Summary */}
      {selectedSlots.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-green-900">
                  Selected: #{selectedSlots[0]} - #{selectedSlots[selectedSlots.length - 1]}
                </div>
                <div className="text-xs text-green-700 mt-0.5">
                  {selectedSlots.length} slots • {subSlots.find((s) => s.position === selectedSlots[0])?.startTime} –{' '}
                  {subSlots.find((s) => s.position === selectedSlots[selectedSlots.length - 1])?.endTime}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-green-900">
                ${(selectedSlots.length * pricePerSlot).toLocaleString()}/day
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {selectionError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-medium text-red-900 mb-0.5">Invalid Selection</div>
            <div className="text-xs text-red-800">{selectionError}</div>
          </div>
        </div>
      )}

      {/* Slot Grid */}
      {validSlotGroups.length > 0 ? (
        <div className="grid grid-cols-8 gap-2">
          {subSlots.map((slot) => {
            const isSelected = selectedSlots.includes(slot.position);
            const isHoveredPreview =
              hoveredSlot !== null && getPreviewSelection(hoveredSlot, subSlots).includes(slot.position);
            const canStart = canStartSelection(slot.position, subSlots);
            const isBooked = slot.status === 'booked';
            const isFiller = slot.status === 'filler';
            const isFree = slot.status === 'free';
            const isClickable = isFree;

            return (
              <button
                key={slot.position}
                onClick={() => isClickable && onSlotClick(slot.position)}
                onMouseEnter={() => isFree && onSlotHover(slot.position)}
                onMouseLeave={() => onSlotHover(null)}
                disabled={!isClickable}
                className={`relative p-2 rounded-lg text-left transition-all ${
                  isSelected
                    ? 'border-2 border-[#D9480F] bg-[#D9480F] text-white shadow-lg'
                    : isHoveredPreview
                    ? 'border-2 border-[#D9480F] border-dashed bg-[#FEF2F2] text-[#D9480F]'
                    : canStart
                    ? 'border-2 border-green-300 bg-green-50 text-green-900 hover:border-green-400 cursor-pointer'
                    : isBooked
                    ? 'border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed'
                    : isFiller
                    ? 'border border-yellow-300 bg-yellow-50 text-yellow-700 cursor-not-allowed'
                    : 'border border-gray-200 bg-white text-gray-400 cursor-not-allowed'
                }`}
                title={
                  isBooked
                    ? `Booked by ${slot.booking?.clientName}`
                    : isFiller
                    ? 'Filler slot'
                    : canStart
                    ? 'Click to select this starting position'
                    : isFree
                    ? 'Cannot start a valid sequence from here'
                    : ''
                }
              >
                <div className={`text-xs font-semibold mb-0.5 ${isSelected ? 'text-white' : ''}`}>
                  #{slot.position}
                </div>

                <div className={`text-xs opacity-90 ${isSelected ? 'text-white' : ''}`}>{slot.startTime}</div>

                {isBooked && <div className="text-xs font-medium truncate mt-1">{slot.booking?.clientName}</div>}
                {isFiller && <div className="text-xs font-medium mt-0.5">Filler</div>}
                {canStart && !isSelected && !isHoveredPreview && (
                  <div className="text-xs font-medium text-green-700 mt-0.5">✓ Valid</div>
                )}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <div className="text-sm font-medium text-gray-900 mb-1">No Available Slots</div>
          <div className="text-xs text-gray-600">
            No {requiredSlotCount} consecutive free slots available in {title.toLowerCase()}.
          </div>
        </div>
      )}
    </div>
  );
}
