import { useState } from 'react';
import { X, AlertCircle, Check, Info } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface SlotConfigurationModalProps {
  onClose: () => void;
  onSave: (config: any) => void;
  editingConfig?: any;
  groupId: string;
  groupName: string;
}

const ALLOWED_SUBSLOT_DURATIONS = [5, 10, 15, 30, 60];

export function SlotConfigurationModal({ onClose, onSave, editingConfig, groupId, groupName }: SlotConfigurationModalProps) {
  const [name, setName] = useState(editingConfig?.name || '');
  const [masterSlotDuration, setMasterSlotDuration] = useState(editingConfig?.masterSlotDuration || 120);
  const [subSlotDuration, setSubSlotDuration] = useState(editingConfig?.subSlotDuration || 10);
  const [peakPrice, setPeakPrice] = useState(editingConfig?.peakPrice || 15);
  const [nonPeakPrice, setNonPeakPrice] = useState(editingConfig?.nonPeakPrice || 8);
  const [configType, setConfigType] = useState<'peak' | 'normal'>(editingConfig?.type || 'normal');

  // Validation
  const isValidDivision = masterSlotDuration % subSlotDuration === 0;
  const subSlotCount = isValidDivision ? masterSlotDuration / subSlotDuration : 0;
  const isValidPricing = peakPrice > nonPeakPrice;
  const isValidForm = 
    name.trim() !== '' &&
    masterSlotDuration >= subSlotDuration &&
    isValidDivision &&
    isValidPricing;

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
      groupId,
      status: 'active' as const,
      type: configType,
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
                Configure slot architecture for <span className="font-medium text-[#111827]">{groupName}</span>
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
          {/* Group Scope Notice */}
          <div className="flex items-start gap-3 p-4 bg-orange-50 border border-[#D9480F] rounded-lg">
            <Info className="w-5 h-5 text-[#D9480F] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-[#111827] mb-1">Group-Level Configuration</p>
              <p className="text-sm text-[#6B7280]">
                This configuration will apply to all devices in the selected group. All devices will share the same slot structure, loop logic, and pricing.
              </p>
            </div>
          </div>

          {/* Configuration Name */}
          <div>
            <label className="block text-sm font-semibold text-[#111827] mb-2">
              Configuration Name <span className="text-[#DC2626]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Peak Hours Loop"
              className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-lg text-sm"
            />
          </div>

          {/* Configuration Type */}
          <div>
            <label className="block text-sm font-semibold text-[#111827] mb-2">
              Configuration Type <span className="text-[#DC2626]">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setConfigType('peak')}
                className={`h-16 rounded-lg border-2 transition-all ${
                  configType === 'peak'
                    ? 'bg-orange-50 border-[#D9480F]'
                    : 'bg-white border-[#E5E7EB] hover:border-[#D9480F]'
                }`}
              >
                <div className="text-sm font-medium text-[#111827]">Group Peak Hours</div>
                <div className="text-xs text-[#6B7280] mt-1">High traffic periods</div>
              </button>
              <button
                onClick={() => setConfigType('normal')}
                className={`h-16 rounded-lg border-2 transition-all ${
                  configType === 'normal'
                    ? 'bg-blue-50 border-[#3B82F6]'
                    : 'bg-white border-[#E5E7EB] hover:border-[#3B82F6]'
                }`}
              >
                <div className="text-sm font-medium text-[#111827]">Group Normal Hours</div>
                <div className="text-xs text-[#6B7280] mt-1">Standard operating hours</div>
              </button>
            </div>
          </div>

          {/* Loop Duration (Master Slot) */}
          <div>
            <label className="block text-sm font-semibold text-[#111827] mb-2">
              Loop Duration (seconds) <span className="text-[#DC2626]">*</span>
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
              {Math.floor(masterSlotDuration / 60)}m {masterSlotDuration % 60}s - How long before the loop repeats
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
            <p className="text-xs text-[#6B7280] mt-1">
              Duration of each bookable position in the loop
            </p>
          </div>

          {/* Division Validation */}
          {!isValidDivision && masterSlotDuration > 0 && subSlotDuration > 0 && (
            <div className="flex items-start gap-2 p-3 bg-[#FEE2E2] border border-[#DC2626] rounded-lg">
              <AlertCircle className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[#DC2626]">Invalid Division</p>
                <p className="text-xs text-[#DC2626] mt-1">
                  Loop duration ({masterSlotDuration}s) must be evenly divisible by sub-slot duration ({subSlotDuration}s)
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
                  This creates {subSlotCount} bookable positions of {subSlotDuration}s each
                </p>
              </div>
            </div>
          )}

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#111827] mb-2">
                Peak Price (per position) <span className="text-[#DC2626]">*</span>
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
                Normal Price (per position) <span className="text-[#DC2626]">*</span>
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
                  Peak price should be higher than normal price
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#6B7280]">
              {isValidForm 
                ? `Configuration will apply to all devices in ${groupName}` 
                : 'Please complete all required fields'}
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
