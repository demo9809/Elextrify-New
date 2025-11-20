import { useState, useEffect } from 'react';
import { Building2, Search, MapPin, Store, ShoppingBag, Plane, Dumbbell, Train, UtensilsCrossed, Filter, ChevronDown } from 'lucide-react';
import { CampaignData } from '../NewCampaignWizard';

interface Step1CampaignSetupProps {
  data: Partial<CampaignData>;
  onUpdate: (updates: Partial<CampaignData>) => void;
  onCreateClient: () => void;
}

// Mock clients
const MOCK_CLIENTS = [
  { id: 'c1', name: 'Acme Corporation', industry: 'Retail' },
  { id: 'c2', name: 'Brew Coffee Co.', industry: 'F&B' },
  { id: 'c3', name: 'FitLife Gym', industry: 'Fitness' },
  { id: 'c4', name: 'TechStart Inc.', industry: 'Technology' },
];

// Venue types with Lucide icons
const VENUE_TYPES = [
  { id: 'mall', name: 'Malls', icon: ShoppingBag },
  { id: 'airport', name: 'Airports', icon: Plane },
  { id: 'gym', name: 'Gyms', icon: Dumbbell },
  { id: 'transit', name: 'Transit', icon: Train },
  { id: 'retail', name: 'Retail', icon: Store },
  { id: 'restaurant', name: 'F&B', icon: UtensilsCrossed },
];

// Geographic data
const COUNTRIES = [
  { id: 'us', name: 'United States' },
  { id: 'ca', name: 'Canada' },
  { id: 'uk', name: 'United Kingdom' },
];

const STATES: Record<string, { id: string; name: string }[]> = {
  us: [
    { id: 'ny', name: 'New York' },
    { id: 'ca', name: 'California' },
    { id: 'tx', name: 'Texas' },
    { id: 'wa', name: 'Washington' },
  ],
  ca: [
    { id: 'on', name: 'Ontario' },
    { id: 'bc', name: 'British Columbia' },
  ],
  uk: [
    { id: 'ln', name: 'London' },
    { id: 'mc', name: 'Manchester' },
  ],
};

const CITIES: Record<string, { id: string; name: string }[]> = {
  ny: [
    { id: 'nyc', name: 'New York City' },
    { id: 'buf', name: 'Buffalo' },
  ],
  ca: [
    { id: 'la', name: 'Los Angeles' },
    { id: 'sf', name: 'San Francisco' },
  ],
  tx: [
    { id: 'hou', name: 'Houston' },
    { id: 'dal', name: 'Dallas' },
  ],
};

// Mock kiosks
const MOCK_KIOSKS = [
  { id: 'k1', name: 'Mall of America - Main Entrance', country: 'us', state: 'ny', city: 'nyc', venue: 'mall', status: 'online', impressions: '250K/mo' },
  { id: 'k2', name: 'JFK Airport - Terminal 4', country: 'us', state: 'ny', city: 'nyc', venue: 'airport', status: 'online', impressions: '500K/mo' },
  { id: 'k3', name: 'Downtown Fitness Center', country: 'us', state: 'ca', city: 'la', venue: 'gym', status: 'online', impressions: '150K/mo' },
  { id: 'k4', name: 'Central Station - Platform 2', country: 'us', state: 'ny', city: 'nyc', venue: 'transit', status: 'online', impressions: '400K/mo' },
  { id: 'k5', name: 'Westfield Shopping Center', country: 'us', state: 'ca', city: 'sf', venue: 'mall', status: 'online', impressions: '300K/mo' },
  { id: 'k6', name: 'LAX Airport - Arrivals Hall', country: 'us', state: 'ca', city: 'la', venue: 'airport', status: 'online', impressions: '600K/mo' },
  { id: 'k7', name: 'Times Square Retail Hub', country: 'us', state: 'ny', city: 'nyc', venue: 'retail', status: 'offline', impressions: '350K/mo' },
  { id: 'k8', name: 'Gold\'s Gym Downtown', country: 'us', state: 'tx', city: 'hou', venue: 'gym', status: 'online', impressions: '120K/mo' },
  { id: 'k9', name: 'Union Station Main Concourse', country: 'us', state: 'wa', city: 'nyc', venue: 'transit', status: 'online', impressions: '380K/mo' },
  { id: 'k10', name: 'The Grove Shopping Complex', country: 'us', state: 'ca', city: 'la', venue: 'mall', status: 'online', impressions: '280K/mo' },
];

export function Step1CampaignSetup({ data, onUpdate, onCreateClient }: Step1CampaignSetupProps) {
  const [kioskSearch, setKioskSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize with all kiosks selected by default (only once)
  useEffect(() => {
    if (!isInitialized && (!data.kioskIds || data.kioskIds.length === 0)) {
      const allKioskIds = MOCK_KIOSKS.map(k => k.id);
      onUpdate({ kioskIds: allKioskIds });
      setIsInitialized(true);
    }
  }, [isInitialized, data.kioskIds, onUpdate]);

  const handleVenueToggle = (venueId: string) => {
    const currentVenues = data.venueTypes || [];
    const newVenues = currentVenues.includes(venueId)
      ? currentVenues.filter(v => v !== venueId)
      : [...currentVenues, venueId];
    onUpdate({ venueTypes: newVenues });
  };

  const handleKioskToggle = (kioskId: string) => {
    const currentKiosks = data.kioskIds || [];
    const newKiosks = currentKiosks.includes(kioskId)
      ? currentKiosks.filter(k => k !== kioskId)
      : [...currentKiosks, kioskId];
    onUpdate({ kioskIds: newKiosks });
  };

  const handleSelectAllKiosks = () => {
    const filteredKiosks = getFilteredKiosks();
    const allFiltered = filteredKiosks.map(k => k.id);
    onUpdate({ kioskIds: allFiltered });
  };

  const handleDeselectAll = () => {
    onUpdate({ kioskIds: [] });
  };

  const clearFilters = () => {
    setSelectedCountry('');
    setSelectedState('');
    setSelectedCity('');
    onUpdate({ venueTypes: [] });
  };

  const getFilteredKiosks = () => {
    let filtered = MOCK_KIOSKS;

    // Filter by country
    if (selectedCountry) {
      filtered = filtered.filter(k => k.country === selectedCountry);
    }

    // Filter by state
    if (selectedState) {
      filtered = filtered.filter(k => k.state === selectedState);
    }

    // Filter by city
    if (selectedCity) {
      filtered = filtered.filter(k => k.city === selectedCity);
    }

    // Filter by venue types
    if (data.venueTypes && data.venueTypes.length > 0) {
      filtered = filtered.filter(k => data.venueTypes!.includes(k.venue));
    }

    // Filter by search
    if (kioskSearch) {
      const search = kioskSearch.toLowerCase();
      filtered = filtered.filter(
        k => k.name.toLowerCase().includes(search)
      );
    }

    return filtered;
  };

  const filteredKiosks = getFilteredKiosks();
  const selectedCount = (data.kioskIds || []).length;
  const availableStates = selectedCountry ? STATES[selectedCountry] || [] : [];
  const availableCities = selectedState ? CITIES[selectedState] || [] : [];
  const hasActiveFilters = selectedCountry || selectedState || selectedCity || (data.venueTypes && data.venueTypes.length > 0);

  return (
    <div className="h-full flex flex-col">
      {/* Campaign Details Bar - Fixed at top */}
      <div className="flex-shrink-0 bg-white border-b border-[#E5E7EB] px-8 py-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 gap-4">
            {/* Client Selection */}
            <div>
              <label className="block text-xs text-[#6B7280] mb-1.5">
                Client <span className="text-[#DC2626]">*</span>
              </label>
              <div className="flex gap-2">
                <select
                  value={data.clientId || ''}
                  onChange={(e) => {
                    const client = MOCK_CLIENTS.find(c => c.id === e.target.value);
                    onUpdate({ 
                      clientId: e.target.value, 
                      clientName: client?.name 
                    });
                  }}
                  className="flex-1 h-10 px-3 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
                >
                  <option value="">Select client...</option>
                  {MOCK_CLIENTS.map(client => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={onCreateClient}
                  className="px-3 h-10 border border-[#E5E7EB] rounded-lg text-sm text-[#D9480F] hover:bg-[#FFF7ED] transition-colors whitespace-nowrap"
                >
                  + New
                </button>
              </div>
            </div>

            {/* Campaign Name */}
            <div>
              <label className="block text-xs text-[#6B7280] mb-1.5">
                Campaign Name <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="text"
                value={data.campaignName || ''}
                onChange={(e) => onUpdate({ campaignName: e.target.value })}
                placeholder="e.g., Diwali 2025 Offer"
                className="w-full h-10 px-3 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area - Scrollable */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full px-8 py-6">
          <div className="max-w-6xl mx-auto h-full flex gap-6">
            {/* Filters Sidebar - Fixed width */}
            <div className="w-64 flex-shrink-0 space-y-4">
              <div className="bg-white rounded-lg border border-[#E5E7EB] p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm text-[#111827]">Filters</h4>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-[#6B7280] hover:text-[#111827]"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  {/* Geographic Filters */}
                  <div>
                    <label className="block text-xs text-[#6B7280] mb-1.5">Country</label>
                    <select
                      value={selectedCountry}
                      onChange={(e) => {
                        setSelectedCountry(e.target.value);
                        setSelectedState('');
                        setSelectedCity('');
                      }}
                      className="w-full h-9 px-2 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
                    >
                      <option value="">All</option>
                      {COUNTRIES.map(country => (
                        <option key={country.id} value={country.id}>{country.name}</option>
                      ))}
                    </select>
                  </div>

                  {selectedCountry && (
                    <div>
                      <label className="block text-xs text-[#6B7280] mb-1.5">State</label>
                      <select
                        value={selectedState}
                        onChange={(e) => {
                          setSelectedState(e.target.value);
                          setSelectedCity('');
                        }}
                        className="w-full h-9 px-2 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
                      >
                        <option value="">All</option>
                        {availableStates.map(state => (
                          <option key={state.id} value={state.id}>{state.name}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {selectedState && availableCities.length > 0 && (
                    <div>
                      <label className="block text-xs text-[#6B7280] mb-1.5">City</label>
                      <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="w-full h-9 px-2 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
                      >
                        <option value="">All</option>
                        {availableCities.map(city => (
                          <option key={city.id} value={city.id}>{city.name}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Venue Types */}
                  <div>
                    <label className="block text-xs text-[#6B7280] mb-1.5">Venue Types</label>
                    <div className="space-y-1.5">
                      {VENUE_TYPES.map(venue => {
                        const isSelected = (data.venueTypes || []).includes(venue.id);
                        const Icon = venue.icon;
                        return (
                          <button
                            key={venue.id}
                            onClick={() => handleVenueToggle(venue.id)}
                            className={`
                              w-full p-2 rounded-lg border transition-all text-left flex items-center gap-2
                              ${isSelected
                                ? 'border-[#D9480F] bg-[#FFF7ED] text-[#D9480F]'
                                : 'border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#D9480F]/30'
                              }
                            `}
                          >
                            <Icon className="w-3.5 h-3.5" />
                            <span className="text-xs">{venue.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Kiosk Selection - Flexible width with full height */}
            <div className="flex-1 flex flex-col min-w-0">
              <div className="bg-white rounded-lg border border-[#E5E7EB] flex flex-col h-full">
                {/* Header */}
                <div className="flex-shrink-0 p-4 border-b border-[#E5E7EB]">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-sm text-[#111827]">
                        Select Kiosks <span className="text-[#DC2626]">*</span>
                      </h3>
                      <p className="text-xs text-[#6B7280] mt-0.5">
                        {filteredKiosks.length} available • {selectedCount} selected
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleSelectAllKiosks}
                        disabled={filteredKiosks.length === 0}
                        className="text-xs text-[#D9480F] hover:text-[#C23D0D] disabled:text-[#9CA3AF] disabled:cursor-not-allowed"
                      >
                        Select All
                      </button>
                      <span className="text-[#E5E7EB]">|</span>
                      <button
                        onClick={handleDeselectAll}
                        disabled={selectedCount === 0}
                        className="text-xs text-[#6B7280] hover:text-[#111827] disabled:text-[#9CA3AF] disabled:cursor-not-allowed"
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF]" />
                    <input
                      type="text"
                      value={kioskSearch}
                      onChange={(e) => setKioskSearch(e.target.value)}
                      placeholder="Search kiosks..."
                      className="w-full h-9 pl-9 pr-3 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
                    />
                  </div>
                </div>

                {/* Kiosk List - Scrollable */}
                <div className="flex-1 overflow-y-auto bg-[rgba(255,29,29,0)]">
                  {filteredKiosks.length === 0 ? (
                    <div className="p-8 text-center text-[#6B7280]">
                      <Store className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No kiosks found</p>
                      <p className="text-xs mt-1">Try adjusting your filters</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-[#E5E7EB]">
                      {filteredKiosks.map((kiosk) => {
                        const isSelected = (data.kioskIds || []).includes(kiosk.id);
                        const venue = VENUE_TYPES.find(v => v.id === kiosk.venue);
                        const VenueIcon = venue?.icon || Store;
                        
                        return (
                          <label
                            key={kiosk.id}
                            className={`
                              flex items-center gap-3 p-3 cursor-pointer transition-colors
                              ${isSelected ? 'bg-[#FFF7ED]' : 'bg-white hover:bg-[#F9FAFB]'}
                            `}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleKioskToggle(kiosk.id)}
                              className="w-4 h-4 bg-white text-[#D9480F] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#D9480F] focus:ring-offset-0"
                            />
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-sm text-[#111827] truncate">{kiosk.name}</span>
                                {kiosk.status === 'online' ? (
                                  <span className="px-1.5 py-0.5 bg-[#DCFCE7] text-[#16A34A] text-[10px] rounded flex-shrink-0">
                                    Online
                                  </span>
                                ) : (
                                  <span className="px-1.5 py-0.5 bg-[#FEE2E2] text-[#DC2626] text-[10px] rounded flex-shrink-0">
                                    Offline
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                                <div className="flex items-center gap-1">
                                  <VenueIcon className="w-3 h-3" />
                                  {venue?.name}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {kiosk.impressions}
                                </div>
                              </div>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
