import { useState } from 'react';
import { X, Settings, Check } from 'lucide-react';

interface FilterPanelProps {
  onFiltersChange: (filters: any) => void;
  onClose: () => void;
}

const SLOT_CONFIGURATIONS = [
  { id: 'all', name: 'All Configurations', appliedDevices: 26, masterSlot: null, subSlot: null },
  { id: 'mall-standard-loop', name: 'Mall Standard Loop', appliedDevices: 8, masterSlot: '120s', subSlot: '10s (12 slots)' },
  { id: 'airport-premium', name: 'Airport Premium', appliedDevices: 3, masterSlot: '60s', subSlot: '5s (12 slots)' },
  { id: 'transit-quick-rotation', name: 'Transit Quick Rotation', appliedDevices: 5, masterSlot: '120s', subSlot: '30s (4 slots)' },
  { id: 'gym-long-form', name: 'Gym Long Form', appliedDevices: 4, masterSlot: '120s', subSlot: '60s (2 slots)' },
  { id: 'retail-flex', name: 'Retail Flex', appliedDevices: 6, masterSlot: '60s', subSlot: '15s (4 slots)' },
];

export function FilterPanel({ onFiltersChange, onClose }: FilterPanelProps) {
  const [selectedSlotConfig, setSelectedSlotConfig] = useState('all');

  const handleSlotConfigChange = (configId: string) => {
    setSelectedSlotConfig(configId);
    onFiltersChange({ slotConfig: configId });
  };

  const clearFilters = () => {
    setSelectedSlotConfig('all');
    onFiltersChange({ slotConfig: 'all' });
  };

  const activeFilterCount = selectedSlotConfig !== 'all' ? 1 : 0;

  return (
    <div className="w-[400px] h-full bg-white shadow-2xl flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-[#E5E7EB] px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#111827]">Filter Devices</h2>
            <p className="text-sm text-[#6B7280] mt-1">
              Filter by slot configuration
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F9FAFB] transition-colors text-[#6B7280] hover:text-[#111827]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Active Filter Count & Clear */}
        {activeFilterCount > 0 && (
          <div className="mt-4 flex items-center justify-between px-3 py-2 bg-[#FFF7ED] rounded-lg border border-[#FDBA74]">
            <span className="text-sm text-[#D9480F] font-medium">
              {activeFilterCount} filter active
            </span>
            <button
              onClick={clearFilters}
              className="text-sm text-[#D9480F] hover:underline font-medium"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Section Header */}
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">
            Slot Configuration
          </h3>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Filter devices by their hardware slot setup
          </p>
        </div>

        {/* Configuration Options */}
        <div className="space-y-3">
          {SLOT_CONFIGURATIONS.map(config => {
            const isSelected = selectedSlotConfig === config.id;
            const isAllOption = config.id === 'all';
            
            return (
              <button
                key={config.id}
                onClick={() => handleSlotConfigChange(config.id)}
                className={`w-full text-left rounded-xl border-2 transition-all group ${
                  isSelected
                    ? 'border-[#D9480F] bg-[#FFF7ED] shadow-sm'
                    : 'border-[#E5E7EB] bg-white hover:border-[#D9480F]/30 hover:bg-[#FAFAFA]'
                }`}
              >
                <div className="p-4">
                  {/* Top Row: Icon, Name, Checkmark */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#D9480F]'
                          : 'bg-[#F9FAFB] group-hover:bg-[#FFF7ED]'
                      }`}>
                        <Settings className={`w-5 h-5 ${
                          isSelected ? 'text-white' : 'text-[#6B7280] group-hover:text-[#D9480F]'
                        }`} />
                      </div>
                      <div>
                        <h4 className={`font-semibold ${
                          isSelected ? 'text-[#D9480F]' : 'text-[#111827]'
                        }`}>
                          {config.name}
                        </h4>
                      </div>
                    </div>
                    
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-[#D9480F] flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                    )}
                  </div>

                  {/* Details Row */}
                  <div className="flex items-center gap-4 pl-13">
                    {/* Device Count */}
                    <div className={`flex items-center gap-1.5 ${
                      isSelected ? 'text-[#D9480F]' : 'text-[#6B7280]'
                    }`}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="2"/>
                        <path d="M8 21h8" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M12 17v4" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <span className="text-sm font-medium">
                        {config.appliedDevices} device{config.appliedDevices !== 1 ? 's' : ''}
                      </span>
                    </div>

                    {/* Slot Details */}
                    {!isAllOption && (
                      <>
                        <span className={`text-sm ${
                          isSelected ? 'text-[#FDBA74]' : 'text-[#D1D5DB]'
                        }`}>
                          •
                        </span>
                        <span className={`text-sm ${
                          isSelected ? 'text-[#D9480F]' : 'text-[#6B7280]'
                        }`}>
                          {config.subSlot}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 bg-[#F9FAFB] border-t border-[#E5E7EB] px-6 py-4">
        <div className="flex items-center justify-between text-sm text-[#6B7280]">
          <span>
            Showing {SLOT_CONFIGURATIONS.find(c => c.id === selectedSlotConfig)?.appliedDevices || 0} devices
          </span>
          <button
            onClick={onClose}
            className="h-10 px-4 bg-[#D9480F] text-white rounded-lg hover:bg-[#C13F0D] transition-colors font-medium"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}