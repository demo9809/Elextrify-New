import { useState, useEffect } from 'react';
import { X, AlertCircle, Info } from 'lucide-react';
import { SlotConfiguration, SlotApplicability } from '../../types/adSlotting';
import { mockMachines } from '../../data/mockAdSlotting';
import { toast } from 'sonner@2.0.3';

interface SlotConfigurationModalProps {
  config: SlotConfiguration | null;
  machineId?: string;
  groupId?: string;
  groupName?: string;
  onClose: () => void;
}

const PRESET_DURATIONS = [5, 10, 15, 30];
const SUGGESTED_LOOP_DURATIONS = [120, 180, 240];

export default function SlotConfigurationModal({
  config,
  machineId: propMachineId,
  groupId,
  groupName,
  onClose,
}: SlotConfigurationModalProps) {
  const [name, setName] = useState(config?.name || '');
  const [machineId, setMachineId] = useState(config?.machineId || propMachineId || '');
  const [applicability, setApplicability] = useState<SlotApplicability>(
    config?.applicability || 'peak'
  );
  const [loopDuration, setLoopDuration] = useState(config?.loopDuration || 120);
  const [subSlotDuration, setSubSlotDuration] = useState(config?.subSlotDuration || 10);
  const [peakPrice, setPeakPrice] = useState(config?.pricing.peakPrice || 0);
  const [normalPrice, setNormalPrice] = useState(config?.pricing.normalPrice || 0);

  const totalPositions = Math.floor(loopDuration / subSlotDuration);

  const handleSave = () => {
    if (!name.trim()) {
      toast.error('Please enter a configuration name');
      return;
    }

    if (!machineId && !groupId) {
      toast.error('No group selected');
      return;
    }

    if (applicability === 'peak' && !peakPrice) {
      toast.error('Please enter peak price');
      return;
    }

    if (applicability === 'normal' && !normalPrice) {
      toast.error('Please enter normal price');
      return;
    }

    toast.success(
      config ? 'Slot configuration updated' : 'Slot configuration created'
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Very light overlay */}
      <div 
        className="absolute inset-0 bg-gray-900 bg-opacity-5" 
        onClick={onClose}
      />
      
      {/* Slide-in panel */}
      <div className="relative bg-white h-full w-full max-w-3xl shadow-2xl flex flex-col animate-slide-in-right overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
          <div>
            <h3 className="text-gray-900">
              {config ? 'Edit Slot Configuration' : 'Create Slot Configuration'}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {groupName ? `For ${groupName}` : 'Define how ad inventory is structured and priced'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Group Scope Notice */}
        {groupId && groupName && (
          <div className="px-6 pt-4 pb-0">
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                This configuration will apply to all devices in <strong>{groupName}</strong>.
              </p>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Section 1: Slot Applicability */}
            <div>
              <label className="block text-gray-900 mb-3">
                Slot Applies To <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                <button
                  onClick={() => setApplicability('peak')}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    applicability === 'peak'
                      ? 'border-[#D9480F] bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        applicability === 'peak'
                          ? 'border-[#D9480F]'
                          : 'border-gray-300'
                      }`}
                    >
                      {applicability === 'peak' && (
                        <div className="w-3 h-3 rounded-full bg-[#D9480F]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 mb-1">Peak Hours Only</div>
                      <div className="text-sm text-gray-600">
                        Slot is only available during designated peak windows
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setApplicability('normal')}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    applicability === 'normal'
                      ? 'border-[#D9480F] bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        applicability === 'normal'
                          ? 'border-[#D9480F]'
                          : 'border-gray-300'
                      }`}
                    >
                      {applicability === 'normal' && (
                        <div className="w-3 h-3 rounded-full bg-[#D9480F]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 mb-1">Normal Hours Only</div>
                      <div className="text-sm text-gray-600">
                        Slot is only available during non-peak operating hours
                      </div>
                    </div>
                  </div>
                </button>
              </div>
              <div className="mt-2 flex items-start gap-2 text-sm text-gray-600">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>This configuration controls when this slot is eligible for booking</span>
              </div>
            </div>

            {/* Section 2: Configuration Details */}
            <div className="pt-6 border-t border-gray-200">
              <h4 className="text-gray-900 mb-4">Configuration Details</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">
                    Configuration Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Standard Peak Loop"
                    className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  />
                </div>

                {/* <div>
                  <label className="block text-gray-700 mb-2">
                    Select Machine <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={machineId}
                    onChange={(e) => setMachineId(e.target.value)}
                    className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  >
                    <option value="">Select a machine...</option>
                    {mockMachines.map((machine) => (
                      <option key={machine.id} value={machine.id}>
                        {machine.name} ({machine.location.city})
                      </option>
                    ))}
                  </select>
                  <div className="mt-2 flex items-start gap-2 text-sm text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>Changing slot structure requires no active bookings on this machine</span>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Section 3: Slot Structure */}
            <div className="pt-6 border-t border-gray-200">
              <h4 className="text-gray-900 mb-4">Slot Structure</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Loop Duration (seconds)</label>
                  <input
                    type="number"
                    value={loopDuration}
                    onChange={(e) => setLoopDuration(Number(e.target.value))}
                    min="30"
                    max="600"
                    className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  />
                  <div className="mt-2 flex gap-2">
                    {SUGGESTED_LOOP_DURATIONS.map((duration) => (
                      <button
                        key={duration}
                        onClick={() => setLoopDuration(duration)}
                        className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                          loopDuration === duration
                            ? 'bg-[#D9480F] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {duration}s
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Sub-Slot Duration (seconds)</label>
                  <div className="grid grid-cols-4 gap-2">
                    {PRESET_DURATIONS.map((duration) => (
                      <button
                        key={duration}
                        onClick={() => setSubSlotDuration(duration)}
                        className={`h-11 rounded-lg border-2 transition-all font-medium ${
                          subSlotDuration === duration
                            ? 'border-[#D9480F] bg-orange-50 text-[#D9480F]'
                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {duration}s
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Total Positions</span>
                  <span className="text-lg font-semibold text-gray-900">
                    {totalPositions} positions per loop
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  Blank sub-slots automatically play internal filler content
                </div>
              </div>

              {/* Visual Breakdown */}
              <div className="mt-4">
                <div className="text-sm text-gray-600 mb-2">Loop Structure Preview</div>
                <div className="flex gap-1 overflow-x-auto pb-2">
                  {Array.from({ length: Math.min(totalPositions, 20) }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-shrink-0 w-12 h-12 bg-gray-100 border border-gray-300 rounded flex items-center justify-center text-xs text-gray-600"
                    >
                      {subSlotDuration}s
                    </div>
                  ))}
                  {totalPositions > 20 && (
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-xs text-gray-500">
                      +{totalPositions - 20}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Section 4: Pricing */}
            <div className="pt-6 border-t border-gray-200">
              <h4 className="text-gray-900 mb-4">Pricing</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {applicability === 'peak' && (
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Peak Price <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                        $
                      </span>
                      <input
                        type="number"
                        value={peakPrice}
                        onChange={(e) => setPeakPrice(Number(e.target.value))}
                        min="0"
                        step="1"
                        placeholder="0"
                        className="w-full h-11 pl-8 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                      />
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      Price per {subSlotDuration}s position per loop
                    </div>
                  </div>
                )}

                {applicability === 'normal' && (
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Normal Price <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                        $
                      </span>
                      <input
                        type="number"
                        value={normalPrice}
                        onChange={(e) => setNormalPrice(Number(e.target.value))}
                        min="0"
                        step="1"
                        placeholder="0"
                        className="w-full h-11 pl-8 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                      />
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      Price per {subSlotDuration}s position per loop
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-6 h-11 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors"
          >
            {config ? 'Update Configuration' : 'Create Configuration'}
          </button>
        </div>
      </div>
    </div>
  );
}