import { useState } from 'react';
import { X, AlertCircle, Save } from 'lucide-react';
import { Machine, SlotApplicability } from '../../types/adSlotting';

interface EditMachineConfigModalProps {
  machine: Machine;
  onClose: () => void;
  onSave: (config: any) => void;
}

export default function EditMachineConfigModal({
  machine,
  onClose,
  onSave,
}: EditMachineConfigModalProps) {
  const [peakLoopDuration, setPeakLoopDuration] = useState(60);
  const [peakSubslotDuration, setPeakSubslotDuration] = useState(10);
  const [normalLoopDuration, setNormalLoopDuration] = useState(60);
  const [normalSubslotDuration, setNormalSubslotDuration] = useState(10);
  const [peakPrice, setPeakPrice] = useState(500);
  const [normalPrice, setNormalPrice] = useState(300);

  const isOffline = machine.status === 'offline';

  const peakPositions = peakLoopDuration / peakSubslotDuration;
  const normalPositions = normalLoopDuration / normalSubslotDuration;

  const handleSave = () => {
    onSave({
      peak: {
        loopDuration: peakLoopDuration,
        subslotDuration: peakSubslotDuration,
        totalPositions: peakPositions,
        price: peakPrice,
      },
      normal: {
        loopDuration: normalLoopDuration,
        subslotDuration: normalSubslotDuration,
        totalPositions: normalPositions,
        price: normalPrice,
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-gray-900">Edit Configuration: {machine.name}</h2>
            <p className="text-sm text-gray-600 mt-1">
              Adjust loop architecture and pricing for this machine
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
          {isOffline && (
            <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-yellow-900">Machine is Offline</div>
                <div className="text-sm text-yellow-700 mt-1">
                  Configuration changes are disabled while the machine is offline. Changes will be
                  applied once the machine is back online.
                </div>
              </div>
            </div>
          )}

          <div className="space-y-8">
            {/* Peak Slots Configuration */}
            <div>
              <h3 className="text-gray-900 mb-4">Peak Slots Configuration</h3>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Loop Duration (seconds)
                    </label>
                    <input
                      type="number"
                      value={peakLoopDuration}
                      onChange={(e) => setPeakLoopDuration(Number(e.target.value))}
                      disabled={isOffline}
                      className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#D9480F] focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                      min={10}
                      step={10}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subslot Duration (seconds)
                    </label>
                    <select
                      value={peakSubslotDuration}
                      onChange={(e) => setPeakSubslotDuration(Number(e.target.value))}
                      disabled={isOffline}
                      className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#D9480F] focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                    >
                      <option value={5}>5 seconds</option>
                      <option value={10}>10 seconds</option>
                      <option value={15}>15 seconds</option>
                      <option value={30}>30 seconds</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price per Position
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={peakPrice}
                      onChange={(e) => setPeakPrice(Number(e.target.value))}
                      disabled={isOffline}
                      className="w-full h-10 pl-7 pr-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#D9480F] focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                      min={0}
                      step={50}
                    />
                  </div>
                </div>

                <div className="bg-white rounded-lg p-3 border border-orange-300">
                  <div className="text-sm font-medium text-gray-900 mb-1">Calculated Positions</div>
                  <div className="text-2xl font-semibold text-[#D9480F]">{peakPositions}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    {peakLoopDuration}s loop ÷ {peakSubslotDuration}s subslots = {peakPositions}{' '}
                    positions
                  </div>
                </div>
              </div>
            </div>

            {/* Normal Slots Configuration */}
            <div>
              <h3 className="text-gray-900 mb-4">Normal Slots Configuration</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Loop Duration (seconds)
                    </label>
                    <input
                      type="number"
                      value={normalLoopDuration}
                      onChange={(e) => setNormalLoopDuration(Number(e.target.value))}
                      disabled={isOffline}
                      className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#D9480F] focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                      min={10}
                      step={10}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subslot Duration (seconds)
                    </label>
                    <select
                      value={normalSubslotDuration}
                      onChange={(e) => setNormalSubslotDuration(Number(e.target.value))}
                      disabled={isOffline}
                      className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#D9480F] focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                    >
                      <option value={5}>5 seconds</option>
                      <option value={10}>10 seconds</option>
                      <option value={15}>15 seconds</option>
                      <option value={30}>30 seconds</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price per Position
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={normalPrice}
                      onChange={(e) => setNormalPrice(Number(e.target.value))}
                      disabled={isOffline}
                      className="w-full h-10 pl-7 pr-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#D9480F] focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                      min={0}
                      step={50}
                    />
                  </div>
                </div>

                <div className="bg-white rounded-lg p-3 border border-blue-300">
                  <div className="text-sm font-medium text-gray-900 mb-1">Calculated Positions</div>
                  <div className="text-2xl font-semibold text-blue-600">{normalPositions}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    {normalLoopDuration}s loop ÷ {normalSubslotDuration}s subslots = {normalPositions}{' '}
                    positions
                  </div>
                </div>
              </div>
            </div>

            {/* Warning about Active Bookings */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-amber-900">Important</div>
                <div className="text-sm text-amber-700 mt-1">
                  Changing loop or subslot duration will affect existing bookings. Active campaigns
                  may need to be remapped to new positions.
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
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isOffline}
            className="flex items-center gap-2 px-4 h-10 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </div>
    </div>
  );
}
