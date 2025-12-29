import { useState } from 'react';
import { Plus, Clock, Edit, Trash2, Copy, Check, X, DollarSign } from 'lucide-react';
import { SlotConfigurationModal } from './SlotConfigurationModal';
import { toast } from 'sonner';

interface SlotConfig {
  id: string;
  name: string;
  masterSlotDuration: number; // seconds
  subSlotDuration: number; // seconds
  subSlotCount: number;
  peakPrice: number;
  nonPeakPrice: number;
  deviceIds: string[];
  deviceCount: number;
  status: 'active' | 'draft';
}

const MOCK_SLOT_CONFIGS: SlotConfig[] = [
  {
    id: 'sc1',
    name: 'Mall Standard Loop',
    masterSlotDuration: 120,
    subSlotDuration: 10,
    subSlotCount: 12,
    peakPrice: 15,
    nonPeakPrice: 8,
    deviceIds: ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8'],
    deviceCount: 8,
    status: 'active',
  },
  {
    id: 'sc2',
    name: 'Airport Premium Block',
    masterSlotDuration: 3600,
    subSlotDuration: 30,
    subSlotCount: 120,
    peakPrice: 50,
    nonPeakPrice: 25,
    deviceIds: ['d9', 'd10', 'd11'],
    deviceCount: 3,
    status: 'active',
  },
  {
    id: 'sc3',
    name: 'Gym Quick Rotation',
    masterSlotDuration: 60,
    subSlotDuration: 15,
    subSlotCount: 4,
    peakPrice: 10,
    nonPeakPrice: 5,
    deviceIds: ['d12', 'd13', 'd14', 'd15', 'd16'],
    deviceCount: 5,
    status: 'draft',
  },
];

export function SlotConfiguration() {
  const [configs, setConfigs] = useState<SlotConfig[]>(MOCK_SLOT_CONFIGS);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSave = (config: SlotConfig) => {
    if (editingId) {
      setConfigs(prev => prev.map(c => c.id === editingId ? config : c));
    } else {
      setConfigs(prev => [...prev, config]);
    }
    setIsCreating(false);
    setEditingId(null);
  };

  const handleDuplicate = (config: SlotConfig) => {
    const duplicated = {
      ...config,
      id: `sc${Date.now()}`,
      name: `${config.name} (Copy)`,
      status: 'draft' as const,
    };
    setConfigs(prev => [...prev, duplicated]);
    toast.success(`Configuration duplicated as "${duplicated.name}"`);
  };

  const handleDelete = (configId: string) => {
    const config = configs.find(c => c.id === configId);
    if (confirm(`Delete configuration "${config?.name}"? This cannot be undone.`)) {
      setConfigs(prev => prev.filter(c => c.id !== configId));
      toast.success('Configuration deleted');
    }
  };

  const editingConfig = editingId ? configs.find(c => c.id === editingId) : null;

  return (
    <div className="h-full flex flex-col bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#111827] mb-2">Slot Configuration</h1>
            <p className="text-[#6B7280]">
              Define master slot durations, sub-slot divisions, and pricing tiers for hardware inventory
            </p>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="h-11 px-5 bg-[#D9480F] text-white rounded-lg hover:bg-[#C13F0D] transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">New Slot Configuration</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Configuration Cards */}
          {configs.map((config) => (
            <div key={config.id} className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
              {/* Header */}
              <div className="border-b border-[#E5E7EB] p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-[#111827]">{config.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        config.status === 'active'
                          ? 'bg-[#D1FAE5] text-[#16A34A]'
                          : 'bg-[#F3F4F6] text-[#6B7280]'
                      }`}>
                        {config.status === 'active' ? 'Active' : 'Draft'}
                      </span>
                    </div>
                    <p className="text-sm text-[#6B7280]">
                      Applied to {config.deviceCount} devices
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDuplicate(config)}
                      className="w-9 h-9 flex items-center justify-center text-[#6B7280] hover:bg-[#F9FAFB] rounded-lg transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditingId(config.id)}
                      className="w-9 h-9 flex items-center justify-center text-[#6B7280] hover:bg-[#F9FAFB] rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(config.id)}
                      className="w-9 h-9 flex items-center justify-center text-[#DC2626] hover:bg-[#FEE2E2] rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Configuration Details */}
              <div className="p-6">
                <div className="grid grid-cols-4 gap-6">
                  {/* Master Slot */}
                  <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-4 h-4 text-[#6B7280]" />
                      <p className="text-xs font-semibold text-[#6B7280] uppercase">Master Slot</p>
                    </div>
                    <p className="text-2xl font-semibold text-[#111827] mb-1">
                      {config.masterSlotDuration}s
                    </p>
                    <p className="text-xs text-[#9CA3AF]">
                      {Math.floor(config.masterSlotDuration / 60)}m {config.masterSlotDuration % 60}s duration
                    </p>
                  </div>

                  {/* Sub-Slot */}
                  <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-4 h-4 text-[#6B7280]" />
                      <p className="text-xs font-semibold text-[#6B7280] uppercase">Sub-Slot</p>
                    </div>
                    <p className="text-2xl font-semibold text-[#111827] mb-1">
                      {config.subSlotDuration}s
                    </p>
                    <p className="text-xs text-[#9CA3AF]">
                      {config.subSlotCount} slots per cycle
                    </p>
                  </div>

                  {/* Peak Pricing */}
                  <div className="bg-[#FFF7ED] border border-[#D9480F] rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <DollarSign className="w-4 h-4 text-[#D9480F]" />
                      <p className="text-xs font-semibold text-[#D9480F] uppercase">Peak Price</p>
                    </div>
                    <p className="text-2xl font-semibold text-[#D9480F] mb-1">
                      ${config.peakPrice}
                    </p>
                    <p className="text-xs text-[#9CA3AF]">
                      per sub-slot
                    </p>
                  </div>

                  {/* Non-Peak Pricing */}
                  <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <DollarSign className="w-4 h-4 text-[#6B7280]" />
                      <p className="text-xs font-semibold text-[#6B7280] uppercase">Non-Peak Price</p>
                    </div>
                    <p className="text-2xl font-semibold text-[#111827] mb-1">
                      ${config.nonPeakPrice}
                    </p>
                    <p className="text-xs text-[#9CA3AF]">
                      per sub-slot
                    </p>
                  </div>
                </div>

                {/* Visual Slot Division */}
                <div className="mt-6">
                  <p className="text-xs font-semibold text-[#6B7280] uppercase mb-3">Visual Breakdown</p>
                  <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                    <div className="flex gap-1">
                      {Array.from({ length: Math.min(config.subSlotCount, 24) }).map((_, idx) => (
                        <div
                          key={idx}
                          className="flex-1 h-12 bg-[#D1FAE5] border border-[#16A34A] rounded flex items-center justify-center"
                        >
                          <span className="text-xs font-medium text-[#16A34A]">{config.subSlotDuration}s</span>
                        </div>
                      ))}
                      {config.subSlotCount > 24 && (
                        <div className="flex items-center justify-center px-3 text-xs text-[#6B7280]">
                          +{config.subSlotCount - 24} more
                        </div>
                      )}
                    </div>
                    <div className="mt-2 text-xs text-[#6B7280]">
                      Each master slot ({config.masterSlotDuration}s) divides into {config.subSlotCount} sub-slots of {config.subSlotDuration}s each
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Validation Rules */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
            <h3 className="text-sm font-semibold text-[#111827] mb-4">Slot Configuration Rules</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#16A34A] mt-0.5" />
                <p className="text-sm text-[#6B7280]">
                  <strong>Master Slot Duration</strong> must be evenly divisible by Sub-Slot Duration
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#16A34A] mt-0.5" />
                <p className="text-sm text-[#6B7280]">
                  <strong>Minimum Sub-Slot Duration:</strong> 5 seconds
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#16A34A] mt-0.5" />
                <p className="text-sm text-[#6B7280]">
                  <strong>Allowed Increments:</strong> 5s, 10s, 15s, 30s, 60s
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#16A34A] mt-0.5" />
                <p className="text-sm text-[#6B7280]">
                  <strong>Pricing:</strong> Peak price must be higher than non-peak price
                </p>
              </div>
              <div className="flex items-start gap-2">
                <X className="w-4 h-4 text-[#DC2626] mt-0.5" />
                <p className="text-sm text-[#6B7280]">
                  <strong>Invalid:</strong> 75s master slot with 10s sub-slots (not evenly divisible)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slot Configuration Modal */}
      {(isCreating || editingId) && (
        <SlotConfigurationModal
          onClose={() => {
            setIsCreating(false);
            setEditingId(null);
          }}
          onSave={handleSave}
          editingConfig={editingConfig}
        />
      )}
    </div>
  );
}