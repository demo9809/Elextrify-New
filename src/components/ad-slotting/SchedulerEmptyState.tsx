import { SlidersHorizontal, Sparkles, Filter, TrendingUp, MapPin, Target, Users, Settings } from 'lucide-react';

interface SchedulerEmptyStateProps {
  onOpenFilters: () => void;
}

export function SchedulerEmptyState({ onOpenFilters }: SchedulerEmptyStateProps) {
  return (
    <div className="flex-1 flex items-center justify-center bg-[#F9FAFB] p-8">
      <div className="max-w-xl text-center">
        {/* Icon */}
        <div className="w-20 h-20 bg-gradient-to-br from-[#FFF7ED] to-[#FED7AA] rounded-full flex items-center justify-center mx-auto mb-6">
          <Filter className="w-10 h-10 text-[#D9480F]" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-[#111827] mb-2">
          Apply Filters to Load Screens
        </h2>

        {/* Description */}
        <p className="text-sm text-[#6B7280] mb-6 max-w-md mx-auto">
          No screens are loaded yet. Use Smart Filters to narrow down your inventory by venue type, location, foot traffic, audience interests, or slot configuration.
        </p>

        {/* Primary CTA */}
        <button
          onClick={onOpenFilters}
          className="h-11 px-6 bg-[#D9480F] text-white rounded-lg font-medium hover:bg-[#C13D0C] transition-colors inline-flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Open Smart Filters</span>
        </button>

        {/* Info Cards - Simplified */}
        <div className="grid grid-cols-3 gap-3 mt-8">
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="w-8 h-8 bg-[#EFF6FF] rounded-lg flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-4 h-4 text-[#3B82F6]" />
            </div>
            <h3 className="text-xs font-medium text-[#111827] mb-1">Performance First</h3>
            <p className="text-xs text-[#6B7280]">
              Only loads screens you need, keeping the app fast and responsive
            </p>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="w-8 h-8 bg-[#FFF7ED] rounded-lg flex items-center justify-center mx-auto mb-2">
              <Filter className="w-4 h-4 text-[#D9480F]" />
            </div>
            <h3 className="text-xs font-medium text-[#111827] mb-1">Smart Filtering</h3>
            <p className="text-xs text-[#6B7280]">
              Multiple filter categories to find exactly the screens you want
            </p>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="w-8 h-8 bg-[#ECFDF5] rounded-lg flex items-center justify-center mx-auto mb-2">
              <Sparkles className="w-4 h-4 text-[#16A34A]" />
            </div>
            <h3 className="text-xs font-medium text-[#111827] mb-1">Real-time Counts</h3>
            <p className="text-xs text-[#6B7280]">
              See matching screen counts update as you apply filters
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}