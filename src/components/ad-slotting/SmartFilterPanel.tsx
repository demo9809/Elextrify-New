import { useState } from 'react';
import { X, Check, ChevronDown, ChevronUp, TrendingUp, MapPin, Users, Target, Sparkles, ShoppingBag, Plane, Train, Dumbbell, Store, Utensils, ShoppingCart, Globe, Activity, Coffee, Film, Laptop, Settings } from 'lucide-react';

interface SmartFilterPanelProps {
  onFiltersChange: (filters: any) => void;
  onClose: () => void;
}

// Smart Filter Categories
const VENUE_TYPES = [
  { id: 'mall', name: 'Shopping Malls', icon: ShoppingBag, count: 45 },
  { id: 'airport', name: 'Airports', icon: Plane, count: 12 },
  { id: 'transit', name: 'Transit Hubs', icon: Train, count: 28 },
  { id: 'gym', name: 'Gyms & Fitness', icon: Dumbbell, count: 18 },
  { id: 'retail', name: 'Retail Stores', icon: Store, count: 35 },
  { id: 'restaurant', name: 'Restaurants', icon: Utensils, count: 22 },
];

const LOCATION_TIERS = [
  { id: 'tier-1', name: 'Tier 1 Cities', description: 'Metro areas, highest reach', count: 78 },
  { id: 'tier-2', name: 'Tier 2 Cities', description: 'Major cities, good reach', count: 52 },
  { id: 'tier-3', name: 'Tier 3 Cities', description: 'Smaller cities, targeted', count: 30 },
];

const FOOT_TRAFFIC = [
  { id: 'very-high', name: 'Very High', description: '10K+ daily visitors', count: 25, color: 'text-[#DC2626]' },
  { id: 'high', name: 'High', description: '5K-10K daily visitors', count: 48, color: 'text-[#F59E0B]' },
  { id: 'medium', name: 'Medium', description: '2K-5K daily visitors', count: 62, color: 'text-[#3B82F6]' },
  { id: 'low', name: 'Low', description: 'Under 2K daily visitors', count: 25, color: 'text-[#6B7280]' },
];

const AUDIENCE_INTERESTS = [
  { id: 'shopping', name: 'Shopping', icon: ShoppingCart, count: 85 },
  { id: 'travel', name: 'Travel & Tourism', icon: Globe, count: 32 },
  { id: 'fitness', name: 'Health & Fitness', icon: Activity, count: 28 },
  { id: 'food', name: 'Food & Dining', icon: Coffee, count: 45 },
  { id: 'entertainment', name: 'Entertainment', icon: Film, count: 38 },
  { id: 'tech', name: 'Technology', icon: Laptop, count: 22 },
];

const SLOT_CONFIGURATIONS = [
  { id: 'all', name: 'All Configurations', appliedDevices: 160, masterSlot: null, subSlot: null },
  { id: 'mall-standard-loop', name: 'Mall Standard Loop', appliedDevices: 45, masterSlot: '120s', subSlot: '10s (12 slots)' },
  { id: 'airport-premium', name: 'Airport Premium', appliedDevices: 12, masterSlot: '60s', subSlot: '5s (12 slots)' },
  { id: 'transit-quick-rotation', name: 'Transit Quick Rotation', appliedDevices: 28, masterSlot: '120s', subSlot: '30s (4 slots)' },
  { id: 'gym-long-form', name: 'Gym Long Form', appliedDevices: 18, masterSlot: '120s', subSlot: '60s (2 slots)' },
  { id: 'retail-flex', name: 'Retail Flex', appliedDevices: 35, masterSlot: '60s', subSlot: '15s (4 slots)' },
  { id: 'restaurant-ambient', name: 'Restaurant Ambient', appliedDevices: 22, masterSlot: '180s', subSlot: '30s (6 slots)' },
];

export function SmartFilterPanel({ onFiltersChange, onClose }: SmartFilterPanelProps) {
  const [selectedVenueTypes, setSelectedVenueTypes] = useState<string[]>([]);
  const [selectedLocationTier, setSelectedLocationTier] = useState<string | null>(null);
  const [selectedFootTraffic, setSelectedFootTraffic] = useState<string[]>([]);
  const [selectedAudienceInterests, setSelectedAudienceInterests] = useState<string[]>([]);
  const [selectedSlotConfig, setSelectedSlotConfig] = useState<string | null>(null);

  // Collapsible sections state
  const [expandedSections, setExpandedSections] = useState({
    venueTypes: true,
    locationTier: false,
    footTraffic: false,
    audienceInterests: false,
    slotConfig: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleVenueTypeToggle = (id: string) => {
    const updated = selectedVenueTypes.includes(id)
      ? selectedVenueTypes.filter(v => v !== id)
      : [...selectedVenueTypes, id];
    setSelectedVenueTypes(updated);
  };

  const handleLocationTierChange = (id: string) => {
    const newValue = selectedLocationTier === id ? null : id;
    setSelectedLocationTier(newValue);
  };

  const handleFootTrafficToggle = (id: string) => {
    const updated = selectedFootTraffic.includes(id)
      ? selectedFootTraffic.filter(f => f !== id)
      : [...selectedFootTraffic, id];
    setSelectedFootTraffic(updated);
  };

  const handleAudienceInterestToggle = (id: string) => {
    const updated = selectedAudienceInterests.includes(id)
      ? selectedAudienceInterests.filter(a => a !== id)
      : [...selectedAudienceInterests, id];
    setSelectedAudienceInterests(updated);
  };

  const handleSlotConfigChange = (id: string) => {
    const newValue = selectedSlotConfig === id ? null : id;
    setSelectedSlotConfig(newValue);
  };

  const applyFilters = (partialUpdate: any) => {
    const allFilters = {
      venueTypes: selectedVenueTypes,
      locationTier: selectedLocationTier,
      footTraffic: selectedFootTraffic,
      audienceInterests: selectedAudienceInterests,
      slotConfig: selectedSlotConfig,
      ...partialUpdate,
    };
    onFiltersChange(allFilters);
  };

  const clearFilters = () => {
    setSelectedVenueTypes([]);
    setSelectedLocationTier(null);
    setSelectedFootTraffic([]);
    setSelectedAudienceInterests([]);
    setSelectedSlotConfig(null);
    onFiltersChange({});
  };

  // Calculate total active filters
  const activeFilterCount = 
    selectedVenueTypes.length +
    (selectedLocationTier ? 1 : 0) +
    selectedFootTraffic.length +
    selectedAudienceInterests.length +
    (selectedSlotConfig ? 1 : 0);

  // Calculate matching screens count (mock calculation)
  const calculateMatchingScreens = () => {
    if (activeFilterCount === 0) return 0; // Don't show count if no filters selected
    
    let baseCount = 160;
    if (selectedVenueTypes.length > 0) {
      baseCount = selectedVenueTypes.reduce((sum, id) => {
        const venue = VENUE_TYPES.find(v => v.id === id);
        return sum + (venue?.count || 0);
      }, 0);
    }
    if (selectedSlotConfig && selectedSlotConfig !== 'all') {
      const config = SLOT_CONFIGURATIONS.find(c => c.id === selectedSlotConfig);
      baseCount = Math.min(baseCount, config?.appliedDevices || baseCount);
    }
    return baseCount;
  };

  const matchingScreens = calculateMatchingScreens();

  return (
    <div className="w-[420px] h-full bg-white shadow-2xl flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-[#E5E7EB] px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-[#D9480F]" />
              <h2 className="text-lg font-semibold text-[#111827]">Smart Filters</h2>
            </div>
            <p className="text-sm text-[#6B7280]">
              Filter screens by audience, location & configuration
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F9FAFB] transition-colors text-[#6B7280] hover:text-[#111827]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Active Filter Count & Matching Screens */}
        {activeFilterCount > 0 && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between px-4 py-3 bg-[#FFF7ED] rounded-lg border border-[#FDBA74]">
              <div>
                <div className="text-sm font-medium text-[#D9480F]">
                  {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active
                </div>
                {matchingScreens > 0 && (
                  <div className="text-xs text-[#92400E] mt-0.5">
                    {matchingScreens} matching screen{matchingScreens !== 1 ? 's' : ''} found
                  </div>
                )}
              </div>
              <button
                onClick={clearFilters}
                className="text-sm text-[#D9480F] hover:underline font-medium"
              >
                Clear all
              </button>
            </div>

            {/* Load Screens Button */}
            {matchingScreens > 0 && (
              <button
                onClick={() => {
                  // Pass the current filters to parent and close panel
                  onFiltersChange({
                    venueTypes: selectedVenueTypes,
                    locationTier: selectedLocationTier.length > 0 ? selectedLocationTier : undefined,
                    footTraffic: selectedFootTraffic.length > 0 ? selectedFootTraffic : undefined,
                    audienceInterests: selectedAudienceInterests,
                    slotConfig: selectedSlotConfig !== 'all' ? selectedSlotConfig : undefined,
                  });
                  onClose();
                }}
                className="w-full h-11 bg-[#D9480F] text-white rounded-lg font-medium hover:bg-[#C13D0C] transition-colors flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Load {matchingScreens} Screen{matchingScreens !== 1 ? 's' : ''}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {/* Empty State - Show when no filters selected */}
        {activeFilterCount === 0 && (
          <div className="text-center py-8 px-4">
            <div className="w-16 h-16 bg-[#FFF7ED] rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-[#D9480F]" />
            </div>
            <h3 className="text-[#111827] font-medium mb-2">Apply Filters to Find Screens</h3>
            <p className="text-sm text-[#6B7280]">
              Select filters below to discover matching screens. Screens will only load after you apply filters.
            </p>
          </div>
        )}

        <div className="space-y-3">
          {/* Venue Types */}
          <FilterSection
            title="Venue Types"
            icon={MapPin}
            expanded={expandedSections.venueTypes}
            onToggle={() => toggleSection('venueTypes')}
            activeCount={selectedVenueTypes.length}
          >
            <div className="grid grid-cols-2 gap-2">
              {VENUE_TYPES.map(venue => (
                <button
                  key={venue.id}
                  onClick={() => handleVenueTypeToggle(venue.id)}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    selectedVenueTypes.includes(venue.id)
                      ? 'border-[#D9480F] bg-[#FFF7ED]'
                      : 'border-[#E5E7EB] bg-white hover:border-[#D9480F]/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <venue.icon className="text-xl" />
                    {selectedVenueTypes.includes(venue.id) && (
                      <Check className="w-4 h-4 text-[#D9480F]" />
                    )}
                  </div>
                  <div className="text-sm font-medium text-[#111827]">{venue.name}</div>
                  <div className="text-xs text-[#6B7280] mt-0.5">{venue.count} screens</div>
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Location Tier */}
          <FilterSection
            title="Location Tier"
            icon={MapPin}
            expanded={expandedSections.locationTier}
            onToggle={() => toggleSection('locationTier')}
            activeCount={selectedLocationTier ? 1 : 0}
          >
            <div className="space-y-2">
              {LOCATION_TIERS.map(tier => (
                <button
                  key={tier.id}
                  onClick={() => handleLocationTierChange(tier.id)}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    selectedLocationTier === tier.id
                      ? 'border-[#D9480F] bg-[#FFF7ED]'
                      : 'border-[#E5E7EB] bg-white hover:border-[#D9480F]/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-[#111827]">{tier.name}</span>
                    {selectedLocationTier === tier.id && (
                      <Check className="w-4 h-4 text-[#D9480F]" />
                    )}
                  </div>
                  <div className="text-xs text-[#6B7280]">{tier.description}</div>
                  <div className="text-xs text-[#6B7280] mt-1">{tier.count} screens</div>
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Foot Traffic */}
          <FilterSection
            title="Foot Traffic"
            icon={TrendingUp}
            expanded={expandedSections.footTraffic}
            onToggle={() => toggleSection('footTraffic')}
            activeCount={selectedFootTraffic.length}
          >
            <div className="space-y-2">
              {FOOT_TRAFFIC.map(traffic => (
                <button
                  key={traffic.id}
                  onClick={() => handleFootTrafficToggle(traffic.id)}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    selectedFootTraffic.includes(traffic.id)
                      ? 'border-[#D9480F] bg-[#FFF7ED]'
                      : 'border-[#E5E7EB] bg-white hover:border-[#D9480F]/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <TrendingUp className={`w-4 h-4 ${traffic.color}`} />
                      <span className="text-sm font-medium text-[#111827]">{traffic.name}</span>
                    </div>
                    {selectedFootTraffic.includes(traffic.id) && (
                      <Check className="w-4 h-4 text-[#D9480F]" />
                    )}
                  </div>
                  <div className="text-xs text-[#6B7280]">{traffic.description}</div>
                  <div className="text-xs text-[#6B7280] mt-1">{traffic.count} screens</div>
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Audience Interests */}
          <FilterSection
            title="Audience Interests"
            icon={Target}
            expanded={expandedSections.audienceInterests}
            onToggle={() => toggleSection('audienceInterests')}
            activeCount={selectedAudienceInterests.length}
          >
            <div className="grid grid-cols-2 gap-2">
              {AUDIENCE_INTERESTS.map(interest => (
                <button
                  key={interest.id}
                  onClick={() => handleAudienceInterestToggle(interest.id)}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    selectedAudienceInterests.includes(interest.id)
                      ? 'border-[#D9480F] bg-[#FFF7ED]'
                      : 'border-[#E5E7EB] bg-white hover:border-[#D9480F]/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <interest.icon className="text-xl" />
                    {selectedAudienceInterests.includes(interest.id) && (
                      <Check className="w-4 h-4 text-[#D9480F]" />
                    )}
                  </div>
                  <div className="text-sm font-medium text-[#111827]">{interest.name}</div>
                  <div className="text-xs text-[#6B7280] mt-0.5">{interest.count} screens</div>
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Slot Configuration */}
          <FilterSection
            title="Slot Configuration"
            icon={Users}
            expanded={expandedSections.slotConfig}
            onToggle={() => toggleSection('slotConfig')}
            activeCount={selectedSlotConfig ? 1 : 0}
          >
            <div className="space-y-2">
              {SLOT_CONFIGURATIONS.filter(c => c.id !== 'all').map(config => (
                <button
                  key={config.id}
                  onClick={() => handleSlotConfigChange(config.id)}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    selectedSlotConfig === config.id
                      ? 'border-[#D9480F] bg-[#FFF7ED]'
                      : 'border-[#E5E7EB] bg-white hover:border-[#D9480F]/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-[#111827]">{config.name}</span>
                    {selectedSlotConfig === config.id && (
                      <Check className="w-4 h-4 text-[#D9480F]" />
                    )}
                  </div>
                  <div className="text-xs text-[#6B7280]">
                    Master: {config.masterSlot} • Sub: {config.subSlot}
                  </div>
                  <div className="text-xs text-[#6B7280] mt-1">
                    {config.appliedDevices} screens
                  </div>
                </button>
              ))}
            </div>
          </FilterSection>
        </div>
      </div>

      {/* Footer - Sticky */}
      {activeFilterCount > 0 && matchingScreens > 0 && (
        <div className="flex-shrink-0 border-t border-[#E5E7EB] p-6 bg-white">
          <button
            onClick={() => {
              // Pass the current filters to parent and close panel
              onFiltersChange({
                venueTypes: selectedVenueTypes,
                locationTier: selectedLocationTier,
                footTraffic: selectedFootTraffic,
                audienceInterests: selectedAudienceInterests,
                slotConfig: selectedSlotConfig !== 'all' ? selectedSlotConfig : undefined,
              });
              onClose();
            }}
            className="w-full h-12 bg-[#D9480F] text-white rounded-lg font-medium hover:bg-[#C13D0C] transition-colors flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5" />
            Load {matchingScreens} Screen{matchingScreens !== 1 ? 's' : ''}
          </button>
        </div>
      )}
    </div>
  );
}

// Collapsible Filter Section Component
function FilterSection({ 
  title, 
  icon: Icon, 
  expanded, 
  onToggle, 
  activeCount, 
  children 
}: { 
  title: string; 
  icon: any; 
  expanded: boolean; 
  onToggle: () => void; 
  activeCount: number;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-[#F9FAFB] hover:bg-[#F3F4F6] transition-colors"
      >
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-[#6B7280]" />
          <span className="font-medium text-[#111827]">{title}</span>
          {activeCount > 0 && (
            <span className="px-2 py-0.5 bg-[#D9480F] text-white text-xs font-medium rounded-full">
              {activeCount}
            </span>
          )}
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-[#6B7280]" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#6B7280]" />
        )}
      </button>
      {expanded && (
        <div className="p-4 bg-white">
          {children}
        </div>
      )}
    </div>
  );
}