import { X } from 'lucide-react';
import { useState } from 'react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onApply: (filters: FilterState) => void;
}

export interface FilterState {
  clients: string[];
  statuses: string[];
  dateRange: { start: string; end: string } | null;
  venueTypes: string[];
}

const CLIENTS = ['Acme Corporation', 'Brew Coffee Co.', 'FitLife Gym', 'TechStart Inc.'];
const STATUSES = ['Active', 'Scheduled', 'Paused', 'Completed', 'Draft'];
const VENUE_TYPES = ['Mall', 'Airport', 'Gym', 'Retail Store', 'Transit Hub', 'Restaurant'];

export function FilterModal({ isOpen, onClose, filters, onApply }: FilterModalProps) {
  if (!isOpen) return null;

  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: FilterState = {
      clients: [],
      statuses: [],
      dateRange: null,
      venueTypes: [],
    };
    setLocalFilters(resetFilters);
    onApply(resetFilters);
    onClose();
  };

  const toggleArrayItem = (array: string[], item: string) => {
    return array.includes(item)
      ? array.filter(i => i !== item)
      : [...array, item];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
          <h3 className="text-[#111827]">Filter Campaigns</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F9FAFB] text-[#6B7280] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Clients */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-3">
              Client
            </label>
            <div className="space-y-2">
              {CLIENTS.map(client => (
                <label key={client} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localFilters.clients.includes(client)}
                    onChange={() => setLocalFilters({
                      ...localFilters,
                      clients: toggleArrayItem(localFilters.clients, client)
                    })}
                    className="w-4 h-4 rounded border-[#E5E7EB] text-[#D9480F] focus:ring-[#D9480F] focus:ring-offset-0"
                  />
                  <span className="text-sm text-[#111827]">{client}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-3">
              Status
            </label>
            <div className="space-y-2">
              {STATUSES.map(status => (
                <label key={status} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localFilters.statuses.includes(status)}
                    onChange={() => setLocalFilters({
                      ...localFilters,
                      statuses: toggleArrayItem(localFilters.statuses, status)
                    })}
                    className="w-4 h-4 rounded border-[#E5E7EB] text-[#D9480F] focus:ring-[#D9480F] focus:ring-offset-0"
                  />
                  <span className="text-sm text-[#111827]">{status}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Venue Types */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-3">
              Venue Types
            </label>
            <div className="grid grid-cols-2 gap-2">
              {VENUE_TYPES.map(venue => (
                <label key={venue} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localFilters.venueTypes.includes(venue)}
                    onChange={() => setLocalFilters({
                      ...localFilters,
                      venueTypes: toggleArrayItem(localFilters.venueTypes, venue)
                    })}
                    className="w-4 h-4 rounded border-[#E5E7EB] text-[#D9480F] focus:ring-[#D9480F] focus:ring-offset-0"
                  />
                  <span className="text-sm text-[#111827]">{venue}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-3">
              Date Range
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#6B7280] mb-2">Start Date</label>
                <input
                  type="date"
                  value={localFilters.dateRange?.start || ''}
                  onChange={(e) => setLocalFilters({
                    ...localFilters,
                    dateRange: {
                      start: e.target.value,
                      end: localFilters.dateRange?.end || ''
                    }
                  })}
                  className="w-full h-10 px-3 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-[#6B7280] mb-2">End Date</label>
                <input
                  type="date"
                  value={localFilters.dateRange?.end || ''}
                  onChange={(e) => setLocalFilters({
                    ...localFilters,
                    dateRange: {
                      start: localFilters.dateRange?.start || '',
                      end: e.target.value
                    }
                  })}
                  className="w-full h-10 px-3 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#E5E7EB]">
          <button
            onClick={handleReset}
            className="px-4 h-10 text-sm text-[#6B7280] hover:text-[#111827] transition-colors"
          >
            Reset All
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-6 h-10 text-sm text-[#6B7280] border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-6 h-10 text-sm bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}