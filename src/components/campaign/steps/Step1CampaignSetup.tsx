import { useState, useEffect } from 'react';
import { Building2, Search, MapPin, Store, ShoppingBag, Plane, Dumbbell, Train, UtensilsCrossed, Filter, ChevronDown, ChevronUp, Users, TrendingUp, Target, Sparkles } from 'lucide-react';
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

// Smart Targeting Options (from Location Profile)
const DEMOGRAPHICS = {
  ageGroups: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
  gender: ['Male', 'Female', 'Mixed'],
  incomeLevel: ['Low', 'Middle', 'High', 'Mixed'],
};

const FOOT_TRAFFIC = ['Very Low', 'Low', 'Medium', 'High', 'Very High'];

const AUDIENCE_INTERESTS = [
  'Shopping', 'Fitness', 'Travel', 'Food & Dining', 
  'Technology', 'Fashion', 'Entertainment', 'Business'
];

// Mock kiosks with location profile data
const MOCK_KIOSKS = [
  { 
    id: 'k1', 
    name: 'Mall of America - Main Entrance', 
    country: 'us', 
    state: 'ny', 
    city: 'nyc', 
    venue: 'mall', 
    status: 'online', 
    impressions: '250K/mo',
    hasProfile: true,
    demographics: { ageGroups: ['25-34', '35-44'], gender: 'Mixed', incomeLevel: 'Middle' },
    footTraffic: 'Very High',
    interests: ['Shopping', 'Fashion', 'Food & Dining'],
  },
  { 
    id: 'k2', 
    name: 'JFK Airport - Terminal 4', 
    country: 'us', 
    state: 'ny', 
    city: 'nyc', 
    venue: 'airport', 
    status: 'online', 
    impressions: '500K/mo',
    hasProfile: true,
    demographics: { ageGroups: ['25-34', '35-44', '45-54'], gender: 'Mixed', incomeLevel: 'High' },
    footTraffic: 'Very High',
    interests: ['Travel', 'Business', 'Technology'],
  },
  { 
    id: 'k3', 
    name: 'Downtown Fitness Center', 
    country: 'us', 
    state: 'ca', 
    city: 'la', 
    venue: 'gym', 
    status: 'online', 
    impressions: '150K/mo',
    hasProfile: true,
    demographics: { ageGroups: ['25-34', '35-44'], gender: 'Mixed', incomeLevel: 'High' },
    footTraffic: 'High',
    interests: ['Fitness', 'Technology', 'Shopping'],
  },
  { 
    id: 'k4', 
    name: 'Central Station - Platform 2', 
    country: 'us', 
    state: 'ny', 
    city: 'nyc', 
    venue: 'transit', 
    status: 'online', 
    impressions: '400K/mo',
    hasProfile: true,
    demographics: { ageGroups: ['25-34', '35-44', '45-54'], gender: 'Mixed', incomeLevel: 'Middle' },
    footTraffic: 'Very High',
    interests: ['Business', 'Food & Dining', 'Technology'],
  },
  { 
    id: 'k5', 
    name: 'Westfield Shopping Center', 
    country: 'us', 
    state: 'ca', 
    city: 'sf', 
    venue: 'mall', 
    status: 'online', 
    impressions: '300K/mo',
    hasProfile: true,
    demographics: { ageGroups: ['25-34', '35-44', '45-54'], gender: 'Female', incomeLevel: 'High' },
    footTraffic: 'Very High',
    interests: ['Shopping', 'Fashion', 'Entertainment'],
  },
  { 
    id: 'k6', 
    name: 'LAX Airport - Arrivals Hall', 
    country: 'us', 
    state: 'ca', 
    city: 'la', 
    venue: 'airport', 
    status: 'online', 
    impressions: '600K/mo',
    hasProfile: true,
    demographics: { ageGroups: ['25-34', '35-44'], gender: 'Mixed', incomeLevel: 'High' },
    footTraffic: 'Very High',
    interests: ['Travel', 'Business', 'Food & Dining'],
  },
  { 
    id: 'k7', 
    name: 'Times Square Retail Hub', 
    country: 'us', 
    state: 'ny', 
    city: 'nyc', 
    venue: 'retail', 
    status: 'offline', 
    impressions: '350K/mo',
    hasProfile: false,
  },
  { 
    id: 'k8', 
    name: 'Gold\'s Gym Downtown', 
    country: 'us', 
    state: 'tx', 
    city: 'hou', 
    venue: 'gym', 
    status: 'online', 
    impressions: '120K/mo',
    hasProfile: false,
  },
  { 
    id: 'k9', 
    name: 'Union Station Main Concourse', 
    country: 'us', 
    state: 'wa', 
    city: 'nyc', 
    venue: 'transit', 
    status: 'online', 
    impressions: '380K/mo',
    hasProfile: true,
    demographics: { ageGroups: ['18-24', '25-34'], gender: 'Mixed', incomeLevel: 'Middle' },
    footTraffic: 'High',
    interests: ['Business', 'Technology', 'Food & Dining'],
  },
  { 
    id: 'k10', 
    name: 'The Grove Shopping Complex', 
    country: 'us', 
    state: 'ca', 
    city: 'la', 
    venue: 'mall', 
    status: 'online', 
    impressions: '280K/mo',
    hasProfile: true,
    demographics: { ageGroups: ['25-34', '35-44'], gender: 'Mixed', incomeLevel: 'Middle' },
    footTraffic: 'Very High',
    interests: ['Shopping', 'Fashion', 'Food & Dining'],
  },
];

export function Step1CampaignSetup({ data, onUpdate, onCreateClient }: Step1CampaignSetupProps) {
  const [kioskSearch, setKioskSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [onlyProfiled, setOnlyProfiled] = useState(false);

  // Smart targeting filters
  const [selectedAgeGroups, setSelectedAgeGroups] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [selectedIncome, setSelectedIncome] = useState<string[]>([]);
  const [selectedFootTraffic, setSelectedFootTraffic] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

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
    setSelectedAgeGroups([]);
    setSelectedGender([]);
    setSelectedIncome([]);
    setSelectedFootTraffic([]);
    setSelectedInterests([]);
    setOnlyProfiled(false);
  };

  const toggleArrayItem = (array: string[], item: string, setter: (arr: string[]) => void) => {
    if (array.includes(item)) {
      setter(array.filter(i => i !== item));
    } else {
      setter([...array, item]);
    }
  };

  const getFilteredKiosks = () => {
    let filtered = MOCK_KIOSKS;

    // Only show profiled kiosks filter
    if (onlyProfiled) {
      filtered = filtered.filter(k => k.hasProfile);
    }

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

    // Advanced filters (only for kiosks with profiles)
    if (selectedAgeGroups.length > 0) {
      filtered = filtered.filter(k => 
        k.hasProfile && selectedAgeGroups.some(age => k.demographics?.ageGroups.includes(age))
      );
    }

    if (selectedGender.length > 0) {
      filtered = filtered.filter(k => 
        k.hasProfile && selectedGender.includes(k.demographics?.gender || '')
      );
    }

    if (selectedIncome.length > 0) {
      filtered = filtered.filter(k => 
        k.hasProfile && selectedIncome.includes(k.demographics?.incomeLevel || '')
      );
    }

    if (selectedFootTraffic.length > 0) {
      filtered = filtered.filter(k => 
        k.hasProfile && selectedFootTraffic.includes(k.footTraffic || '')
      );
    }

    if (selectedInterests.length > 0) {
      filtered = filtered.filter(k => 
        k.hasProfile && selectedInterests.some(interest => k.interests?.includes(interest))
      );
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
  const hasActiveFilters = selectedCountry || selectedState || selectedCity || 
    (data.venueTypes && data.venueTypes.length > 0) ||
    selectedAgeGroups.length > 0 || selectedGender.length > 0 || 
    selectedIncome.length > 0 || selectedFootTraffic.length > 0 || 
    selectedInterests.length > 0 || onlyProfiled;

  const profiledKiosksCount = MOCK_KIOSKS.filter(k => k.hasProfile).length;
  const selectedProfiledCount = (data.kioskIds || []).filter(id => 
    MOCK_KIOSKS.find(k => k.id === id)?.hasProfile
  ).length;

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
            {/* Filters Sidebar - Scrollable */}
            <div className="w-72 flex-shrink-0 flex flex-col">
              <div className="bg-white rounded-lg border border-[#E5E7EB] p-4 overflow-y-auto flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm text-[#111827] font-medium">Smart Filters</h4>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-[#D9480F] hover:text-[#C23D0D]"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Profile Status Banner */}
                <div className="mb-4 p-3 bg-[#F0F9FF] border border-[#BAE6FD] rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-[#0369A1]" />
                    <p className="text-xs font-medium text-[#0C4A6E]">
                      {profiledKiosksCount} Profiled Kiosks
                    </p>
                  </div>
                  <button
                    onClick={() => setOnlyProfiled(!onlyProfiled)}
                    className={`w-full px-3 h-7 rounded-md text-xs transition-colors ${
                      onlyProfiled
                        ? 'bg-[#0369A1] text-white'
                        : 'bg-white text-[#0369A1] hover:bg-[#E0F2FE]'
                    }`}
                  >
                    {onlyProfiled ? 'Show All' : 'Profiled Only'}
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Geographic Filters */}
                  <div>
                    <label className="block text-xs font-medium text-[#111827] mb-2">Location</label>
                    <div className="space-y-2">
                      <select
                        value={selectedCountry}
                        onChange={(e) => {
                          setSelectedCountry(e.target.value);
                          setSelectedState('');
                          setSelectedCity('');
                        }}
                        className="w-full h-8 px-2 bg-white border border-[#E5E7EB] rounded-md text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
                      >
                        <option value="">All Countries</option>
                        {COUNTRIES.map(country => (
                          <option key={country.id} value={country.id}>{country.name}</option>
                        ))}
                      </select>

                      {selectedCountry && (
                        <select
                          value={selectedState}
                          onChange={(e) => {
                            setSelectedState(e.target.value);
                            setSelectedCity('');
                          }}
                          className="w-full h-8 px-2 bg-white border border-[#E5E7EB] rounded-md text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
                        >
                          <option value="">All States</option>
                          {availableStates.map(state => (
                            <option key={state.id} value={state.id}>{state.name}</option>
                          ))}
                        </select>
                      )}

                      {selectedState && availableCities.length > 0 && (
                        <select
                          value={selectedCity}
                          onChange={(e) => setSelectedCity(e.target.value)}
                          className="w-full h-8 px-2 bg-white border border-[#E5E7EB] rounded-md text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
                        >
                          <option value="">All Cities</option>
                          {availableCities.map(city => (
                            <option key={city.id} value={city.id}>{city.name}</option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>

                  {/* Venue Types */}
                  <div>
                    <label className="block text-xs font-medium text-[#111827] mb-2">Venue Types</label>
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

                  {/* Advanced Targeting Toggle */}
                  <button
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className="w-full flex items-center justify-between p-2 bg-[#F9FAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Target className="w-3.5 h-3.5 text-[#D9480F]" />
                      <span className="text-xs font-medium text-[#111827]">Advanced Targeting</span>
                    </div>
                    {showAdvancedFilters ? (
                      <ChevronUp className="w-4 h-4 text-[#6B7280]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#6B7280]" />
                    )}
                  </button>

                  {/* Advanced Filters - Collapsible */}
                  {showAdvancedFilters && (
                    <div className="space-y-4 p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
                      {/* Age Groups */}
                      <div>
                        <label className="block text-xs font-medium text-[#111827] mb-2 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5" />
                          Age Groups
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {DEMOGRAPHICS.ageGroups.map(age => {
                            const isSelected = selectedAgeGroups.includes(age);
                            return (
                              <button
                                key={age}
                                onClick={() => toggleArrayItem(selectedAgeGroups, age, setSelectedAgeGroups)}
                                className={`px-2 py-1 text-[10px] rounded transition-colors ${
                                  isSelected
                                    ? 'bg-[#D9480F] text-white'
                                    : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:border-[#D9480F]'
                                }`}
                              >
                                {age}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Gender */}
                      <div>
                        <label className="block text-xs font-medium text-[#111827] mb-2">Gender</label>
                        <div className="flex flex-wrap gap-1.5">
                          {DEMOGRAPHICS.gender.map(gender => {
                            const isSelected = selectedGender.includes(gender);
                            return (
                              <button
                                key={gender}
                                onClick={() => toggleArrayItem(selectedGender, gender, setSelectedGender)}
                                className={`px-2 py-1 text-[10px] rounded transition-colors ${
                                  isSelected
                                    ? 'bg-[#D9480F] text-white'
                                    : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:border-[#D9480F]'
                                }`}
                              >
                                {gender}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Income Level */}
                      <div>
                        <label className="block text-xs font-medium text-[#111827] mb-2">Income Level</label>
                        <div className="flex flex-wrap gap-1.5">
                          {DEMOGRAPHICS.incomeLevel.map(income => {
                            const isSelected = selectedIncome.includes(income);
                            return (
                              <button
                                key={income}
                                onClick={() => toggleArrayItem(selectedIncome, income, setSelectedIncome)}
                                className={`px-2 py-1 text-[10px] rounded transition-colors ${
                                  isSelected
                                    ? 'bg-[#D9480F] text-white'
                                    : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:border-[#D9480F]'
                                }`}
                              >
                                {income}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Foot Traffic */}
                      <div>
                        <label className="block text-xs font-medium text-[#111827] mb-2 flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5" />
                          Foot Traffic
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {FOOT_TRAFFIC.map(traffic => {
                            const isSelected = selectedFootTraffic.includes(traffic);
                            return (
                              <button
                                key={traffic}
                                onClick={() => toggleArrayItem(selectedFootTraffic, traffic, setSelectedFootTraffic)}
                                className={`px-2 py-1 text-[10px] rounded transition-colors ${
                                  isSelected
                                    ? 'bg-[#D9480F] text-white'
                                    : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:border-[#D9480F]'
                                }`}
                              >
                                {traffic}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Audience Interests */}
                      <div>
                        <label className="block text-xs font-medium text-[#111827] mb-2">Interests</label>
                        <div className="flex flex-wrap gap-1.5">
                          {AUDIENCE_INTERESTS.map(interest => {
                            const isSelected = selectedInterests.includes(interest);
                            return (
                              <button
                                key={interest}
                                onClick={() => toggleArrayItem(selectedInterests, interest, setSelectedInterests)}
                                className={`px-2 py-1 text-[10px] rounded transition-colors ${
                                  isSelected
                                    ? 'bg-[#D9480F] text-white'
                                    : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:border-[#D9480F]'
                                }`}
                              >
                                {interest}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
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
                      <h3 className="text-sm text-[#111827] font-medium">
                        Select Kiosks <span className="text-[#DC2626]">*</span>
                      </h3>
                      <p className="text-xs text-[#6B7280] mt-0.5">
                        {filteredKiosks.length} available • <span className="font-medium text-[#D9480F]">{selectedCount} selected</span>
                        {selectedProfiledCount > 0 && ` • ${selectedProfiledCount} profiled`}
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
                      <p className="text-sm font-medium mb-1">No kiosks found</p>
                      <p className="text-xs">Try adjusting your filters</p>
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
                              flex items-start gap-3 p-3 cursor-pointer transition-colors
                              ${isSelected ? 'bg-[#FFF7ED]' : 'bg-white hover:bg-[#F9FAFB]'}
                            `}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleKioskToggle(kiosk.id)}
                              className="w-4 h-4 bg-white text-[#D9480F] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#D9480F] focus:ring-offset-0 mt-0.5"
                            />
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-sm text-[#111827] truncate">{kiosk.name}</span>
                                {kiosk.hasProfile ? (
                                  <span className="px-1.5 py-0.5 bg-[#DCFCE7] text-[#166534] text-[10px] rounded flex-shrink-0">
                                    Profiled
                                  </span>
                                ) : (
                                  <span className="px-1.5 py-0.5 bg-[#FEF3C7] text-[#92400E] text-[10px] rounded flex-shrink-0">
                                    Basic
                                  </span>
                                )}
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
                              <div className="flex items-center gap-3 text-xs text-[#6B7280] mb-1">
                                <div className="flex items-center gap-1">
                                  <VenueIcon className="w-3 h-3" />
                                  {venue?.name}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {kiosk.impressions}
                                </div>
                              </div>
                              
                              {/* Profile Data Preview */}
                              {kiosk.hasProfile && (
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                  {kiosk.footTraffic && (
                                    <span className="px-1.5 py-0.5 bg-[#F3F4F6] text-[#6B7280] text-[10px] rounded flex items-center gap-1">
                                      <TrendingUp className="w-2.5 h-2.5" />
                                      {kiosk.footTraffic}
                                    </span>
                                  )}
                                  {kiosk.demographics?.incomeLevel && (
                                    <span className="px-1.5 py-0.5 bg-[#F3F4F6] text-[#6B7280] text-[10px] rounded">
                                      {kiosk.demographics.incomeLevel} Income
                                    </span>
                                  )}
                                  {kiosk.interests && kiosk.interests.length > 0 && (
                                    <span className="px-1.5 py-0.5 bg-[#F3F4F6] text-[#6B7280] text-[10px] rounded">
                                      {kiosk.interests[0]} +{kiosk.interests.length - 1}
                                    </span>
                                  )}
                                </div>
                              )}
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
