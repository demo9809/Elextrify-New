import { useState } from 'react';
import { X, AlertCircle, Check, Monitor } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface SlotConfigurationModalProps {
  onClose: () => void;
  onSave: (config: any) => void;
  editingConfig?: any;
}

const ALLOWED_SUBSLOT_DURATIONS = [5, 10, 15, 30, 60];

export function SlotConfigurationModal({ onClose, onSave, editingConfig }: SlotConfigurationModalProps) {
  const [name, setName] = useState(editingConfig?.name || '');
  const [masterSlotDuration, setMasterSlotDuration] = useState(editingConfig?.masterSlotDuration || 120);
  const [subSlotDuration, setSubSlotDuration] = useState(editingConfig?.subSlotDuration || 10);
  const [peakPrice, setPeakPrice] = useState(editingConfig?.peakPrice || 15);
  const [nonPeakPrice, setNonPeakPrice] = useState(editingConfig?.nonPeakPrice || 8);
  const [selectedDevices, setSelectedDevices] = useState<string[]>(editingConfig?.deviceIds || []);

  const MOCK_DEVICES = [
    { id: 'd1', name: 'Mall Central - Screen A', location: 'NYC, NY' },
    { id: 'd2', name: 'Airport Terminal 1', location: 'LAX, CA' },
    { id: 'd3', name: 'Transit Hub Main', location: 'Chicago, IL' },
    { id: 'd4', name: 'Gym Entrance Screen', location: 'Miami, FL' },
    { id: 'd5', name: 'Retail Store Display', location: 'NYC, NY' },
  ];

  // Validation
  const isValidDivision = masterSlotDuration % subSlotDuration === 0;
  const subSlotCount = isValidDivision ? masterSlotDuration / subSlotDuration : 0;
  const isValidPricing = peakPrice > nonPeakPrice;
  const isValidForm = 
    name.trim() !== '' &&
    masterSlotDuration >= subSlotDuration &&
    isValidDivision &&
    isValidPricing &&
    selectedDevices.length > 0;

  const toggleDevice = (deviceId: string) => {
    setSelectedDevices(prev =>
      prev.includes(deviceId)
        ? prev.filter(id => id !== deviceId)
        : [...prev, deviceId]
    );
  };

  const handleSave = () => {
    if (!isValidForm) return;

    const config = {
      id: editingConfig?.id || `sc${Date.now()}`,
      name,
      masterSlotDuration,
      subSlotDuration,
      subSlotCount,
      peakPrice,
      nonPeakPrice,
      deviceIds: selectedDevices,
      deviceCount: selectedDevices.length,
      status: 'active' as const,
    };

    onSave(config);
    toast.success(`Slot configuration "${name}" ${editingConfig ? 'updated' : 'created'} successfully`);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl bg-white rounded-xl shadow-2xl z-50 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="border-b border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-[#111827]">
                {editingConfig ? 'Edit Slot Configuration' : 'New Slot Configuration'}
              </h2>
              <p className="text-sm text-[#6B7280] mt-1">
                Define master slot duration, sub-slot divisions, and pricing tiers
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center text-[#6B7280] hover:bg-[#F9FAFB] rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Configuration Name */}
          <div>
            <label className="block text-sm font-semibold text-[#111827] mb-2">
              Configuration Name <span className="text-[#DC2626]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Mall Standard Loop"
              className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-lg text-sm"
            />
          </div>

          {/* Master Slot Duration */}
          <div>
            <label className="block text-sm font-semibold text-[#111827] mb-2">
              Master Slot Duration (seconds) <span className="text-[#DC2626]">*</span>
            </label>
            <input
              type="number"
              value={masterSlotDuration}
              onChange={(e) => setMasterSlotDuration(parseInt(e.target.value) || 0)}
              min="5"
              step="5"
              className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-lg text-sm"
            />
            <p className="text-xs text-[#6B7280] mt-1">
              {Math.floor(masterSlotDuration / 60)}m {masterSlotDuration % 60}s total duration per cycle
            </p>
          </div>

          {/* Sub-Slot Duration */}
          <div>
            <label className="block text-sm font-semibold text-[#111827] mb-2">
              Sub-Slot Duration (seconds) <span className="text-[#DC2626]">*</span>
            </label>
            <div className="grid grid-cols-5 gap-2">
              {ALLOWED_SUBSLOT_DURATIONS.map(duration => (
                <button
                  key={duration}
                  onClick={() => setSubSlotDuration(duration)}
                  className={`h-11 rounded-lg border-2 font-medium transition-all ${
                    subSlotDuration === duration
                      ? 'bg-[#D9480F] border-[#D9480F] text-white'
                      : 'bg-white border-[#E5E7EB] text-[#111827] hover:border-[#D9480F]'
                  }`}
                >
                  {duration}s
                </button>
              ))}
            </div>
          </div>

          {/* Division Validation */}
          {!isValidDivision && masterSlotDuration > 0 && subSlotDuration > 0 && (
            <div className="flex items-start gap-2 p-3 bg-[#FEE2E2] border border-[#DC2626] rounded-lg">
              <AlertCircle className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[#DC2626]">Invalid Division</p>
                <p className="text-xs text-[#DC2626] mt-1">
                  Master slot duration ({masterSlotDuration}s) must be evenly divisible by sub-slot duration ({subSlotDuration}s)
                </p>
              </div>
            </div>
          )}

          {isValidDivision && subSlotCount > 0 && (
            <div className="flex items-start gap-2 p-3 bg-[#D1FAE5] border border-[#16A34A] rounded-lg">
              <Check className="w-5 h-5 text-[#16A34A] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[#16A34A]">Valid Configuration</p>
                <p className="text-xs text-[#16A34A] mt-1">
                  This creates {subSlotCount} sub-slots of {subSlotDuration}s each
                </p>
              </div>
            </div>
          )}

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#111827] mb-2">
                Peak Price (per sub-slot) <span className="text-[#DC2626]">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]">$</span>
                <input
                  type="number"
                  value={peakPrice}
                  onChange={(e) => setPeakPrice(parseFloat(e.target.value) || 0)}
                  min="0"
                  step="1"
                  className="w-full h-11 pl-8 pr-4 bg-white border border-[#E5E7EB] rounded-lg text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#111827] mb-2">
                Non-Peak Price (per sub-slot) <span className="text-[#DC2626]">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]">$</span>
                <input
                  type="number"
                  value={nonPeakPrice}
                  onChange={(e) => setNonPeakPrice(parseFloat(e.target.value) || 0)}
                  min="0"
                  step="1"
                  className="w-full h-11 pl-8 pr-4 bg-white border border-[#E5E7EB] rounded-lg text-sm"
                />
              </div>
            </div>
          </div>

          {!isValidPricing && peakPrice > 0 && nonPeakPrice > 0 && (
            <div className="flex items-start gap-2 p-3 bg-[#FEF3C7] border border-[#F59E0B] rounded-lg">
              <AlertCircle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[#F59E0B]">Pricing Warning</p>
                <p className="text-xs text-[#F59E0B] mt-1">
                  Peak price should be higher than non-peak price
                </p>
              </div>
            </div>
          )}

          {/* Device Selection */}
          <div>
            <label className="block text-sm font-semibold text-[#111827] mb-2">
              Apply to Devices <span className="text-[#DC2626]">*</span>
            </label>
            <p className="text-xs text-[#6B7280] mb-3">
              Select which devices will use this slot configuration
            </p>
            <div className="space-y-2">
              {MOCK_DEVICES.map(device => {
                const isSelected = selectedDevices.includes(device.id);
                return (
                  <button
                    key={device.id}
                    onClick={() => toggleDevice(device.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'bg-[#FFF7ED] border-[#D9480F]'
                        : 'bg-white border-[#E5E7EB] hover:border-[#D9480F]'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-[#D9480F]' : 'bg-[#F9FAFB]'
                    }`}>
                      <Monitor className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-[#6B7280]'}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-[#111827]">{device.name}</p>
                      <p className="text-xs text-[#6B7280]">{device.location}</p>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#D9480F] flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-[#6B7280] mt-2">
              {selectedDevices.length} device{selectedDevices.length !== 1 ? 's' : ''} selected
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#6B7280]">
              {isValidForm ? 'Ready to save' : 'Please complete all required fields'}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="h-11 px-5 bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-[#F3F4F6] transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!isValidForm}
                className="h-11 px-5 bg-[#D9480F] text-white rounded-lg hover:bg-[#C13F0D] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingConfig ? 'Update Configuration' : 'Create Configuration'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
