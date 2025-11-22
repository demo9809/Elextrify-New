import { MapPin, Store, Monitor, Circle, CheckCircle2, Users, TrendingUp, Clock, Target, ChevronDown, ChevronUp, AlertCircle, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { AdGroup } from '../NewCampaignWizard';

const VENUE_TYPES = [
  { id: 'mall', label: 'Shopping Malls', icon: Store },
  { id: 'transit', label: 'Transit Hubs', icon: MapPin },
  { id: 'airport', label: 'Airports', icon: MapPin },
  { id: 'gym', label: 'Gyms & Fitness', icon: Store },
  { id: 'restaurant', label: 'Restaurants', icon: Store },
  { id: 'retail', label: 'Retail Stores', icon: Store },
];

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

// Enhanced mock kiosks with location profile data
const MOCK_KIOSKS = [
  { 
    id: 'k1', 
    name: 'Mall of America - Main', 
    location: 'Minneapolis, MN', 
    venue: 'mall', 
    online: true,
    hasProfile: true,
    demographics: { ageGroups: ['25-34', '35-44'], gender: 'Mixed', incomeLevel: 'Middle' },
    footTraffic: 'Very High',
    interests: ['Shopping', 'Fashion', 'Food & Dining'],
  },
  { 
    id: 'k2', 
    name: 'LAX Terminal 3', 
    location: 'Los Angeles, CA', 
    venue: 'airport', 
    online: true,
    hasProfile: true,
    demographics: { ageGroups: ['25-34', '35-44', '45-54'], gender: 'Mixed', incomeLevel: 'High' },
    footTraffic: 'Very High',
    interests: ['Travel', 'Business', 'Technology'],
  },
  { 
    id: 'k3', 
    name: 'Times Square Digital', 
    location: 'New York, NY', 
    venue: 'transit', 
    online: false,
    hasProfile: false,
  },
  { 
    id: 'k4', 
    name: 'FitLife Downtown', 
    location: 'San Francisco, CA', 
    venue: 'gym', 
    online: true,
    hasProfile: true,
    demographics: { ageGroups: ['25-34', '35-44'], gender: 'Mixed', incomeLevel: 'High' },
    footTraffic: 'High',
    interests: ['Fitness', 'Technology', 'Shopping'],
  },
  { 
    id: 'k5', 
    name: 'Westfield Century City', 
    location: 'Los Angeles, CA', 
    venue: 'mall', 
    online: true,
    hasProfile: true,
    demographics: { ageGroups: ['25-34', '35-44', '45-54'], gender: 'Female', incomeLevel: 'High' },
    footTraffic: 'Very High',
    interests: ['Shopping', 'Fashion', 'Entertainment'],
  },
  { 
    id: 'k6', 
    name: 'SFO Terminal 2', 
    location: 'San Francisco, CA', 
    venue: 'airport', 
    online: true,
    hasProfile: true,
    demographics: { ageGroups: ['25-34', '35-44'], gender: 'Mixed', incomeLevel: 'High' },
    footTraffic: 'Very High',
    interests: ['Travel', 'Business', 'Food & Dining'],
  },
  { 
    id: 'k7', 
    name: 'Grand Central Station', 
    location: 'New York, NY', 
    venue: 'transit', 
    online: true,
    hasProfile: true,
    demographics: { ageGroups: ['25-34', '35-44', '45-54'], gender: 'Mixed', incomeLevel: 'Middle' },
    footTraffic: 'Very High',
    interests: ['Business', 'Food & Dining', 'Technology'],
  },
  { 
    id: 'k8', 
    name: 'Starbucks Union Square', 
    location: 'San Francisco, CA', 
    venue: 'restaurant', 
    online: true,
    hasProfile: true,
    demographics: { ageGroups: ['18-24', '25-34'], gender: 'Mixed', incomeLevel: 'Middle' },
    footTraffic: 'High',
    interests: ['Food & Dining', 'Shopping', 'Technology'],
  },
  { 
    id: 'k9', 
    name: 'Nike Store 5th Ave', 
    location: 'New York, NY', 
    venue: 'retail', 
    online: true,
    hasProfile: true,
    demographics: { ageGroups: ['18-24', '25-34', '35-44'], gender: 'Mixed', incomeLevel: 'High' },
    footTraffic: 'Very High',
    interests: ['Shopping', 'Fashion', 'Fitness'],
  },
  { 
    id: 'k10', 
    name: 'FitLife Brooklyn', 
    location: 'Brooklyn, NY', 
    venue: 'gym', 
    online: true,
    hasProfile: false,
  },
  { 
    id: 'k11', 
    name: 'Beverly Center', 
    location: 'Los Angeles, CA', 
    venue: 'mall', 
    online: false,
    hasProfile: true,
    demographics: { ageGroups: ['25-34', '35-44'], gender: 'Mixed', incomeLevel: 'High' },
    footTraffic: 'High',
    interests: ['Shopping', 'Fashion', 'Entertainment'],
  },
  { 
    id: 'k12', 
    name: 'JFK Terminal 4', 
    location: 'New York, NY', 
    venue: 'airport', 
    online: true,
    hasProfile: true,
    demographics: { ageGroups: ['25-34', '35-44', '45-54'], gender: 'Mixed', incomeLevel: 'Mixed' },
    footTraffic: 'Very High',
    interests: ['Travel', 'Business', 'Food & Dining'],
  },
  { 
    id: 'k13', 
    name: 'Whole Foods Market', 
    location: 'Los Angeles, CA', 
    venue: 'restaurant', 
    online: true,
    hasProfile: true,
    demographics: { ageGroups: ['35-44', '45-54'], gender: 'Mixed', incomeLevel: 'High' },
    footTraffic: 'Medium',
    interests: ['Food & Dining', 'Shopping'],
  },
  { 
    id: 'k14', 
    name: 'Target Downtown', 
    location: 'San Diego, CA', 
    venue: 'retail', 
    online: true,
    hasProfile: true,
    demographics: { ageGroups: ['25-34', '35-44', '45-54'], gender: 'Mixed', incomeLevel: 'Middle' },
    footTraffic: 'High',
    interests: ['Shopping', 'Food & Dining'],
  },
  { 
    id: 'k15', 
    name: 'Orange County Transit', 
    location: 'Santa Ana, CA', 
    venue: 'transit', 
    online: true,
    hasProfile: false,
  },
];

interface StepBTargetingProps {
  data: Partial<AdGroup>;
  onUpdate: (updates: Partial<AdGroup>) => void;
}

export function StepBTargeting({ data, onUpdate }: StepBTargetingProps) {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [onlyProfiled, setOnlyProfiled] = useState(false);

  // Initialize targeting filters if not exists
  const targetingFilters = data.targetingFilters || {
    venueTypes: [],
    ageGroups: [],
    gender: [],
    incomeLevel: [],
    footTraffic: [],
    interests: [],
  };

  const handleVenueToggle = (venueId: string) => {
    const currentVenues = targetingFilters.venueTypes || [];
    const newVenues = currentVenues.includes(venueId)
      ? currentVenues.filter(v => v !== venueId)
      : [...currentVenues, venueId];
    onUpdate({ 
      targetingFilters: { ...targetingFilters, venueTypes: newVenues },
      venueTypes: newVenues, // Keep for backward compatibility
    });
  };

  const handleAgeGroupToggle = (age: string) => {
    const current = targetingFilters.ageGroups || [];
    const updated = current.includes(age)
      ? current.filter(a => a !== age)
      : [...current, age];
    onUpdate({ targetingFilters: { ...targetingFilters, ageGroups: updated } });
  };

  const handleGenderToggle = (gender: string) => {
    const current = targetingFilters.gender || [];
    const updated = current.includes(gender)
      ? current.filter(g => g !== gender)
      : [...current, gender];
    onUpdate({ targetingFilters: { ...targetingFilters, gender: updated } });
  };

  const handleIncomeToggle = (income: string) => {
    const current = targetingFilters.incomeLevel || [];
    const updated = current.includes(income)
      ? current.filter(i => i !== income)
      : [...current, income];
    onUpdate({ targetingFilters: { ...targetingFilters, incomeLevel: updated } });
  };

  const handleFootTrafficToggle = (traffic: string) => {
    const current = targetingFilters.footTraffic || [];
    const updated = current.includes(traffic)
      ? current.filter(t => t !== traffic)
      : [...current, traffic];
    onUpdate({ targetingFilters: { ...targetingFilters, footTraffic: updated } });
  };

  const handleInterestToggle = (interest: string) => {
    const current = targetingFilters.interests || [];
    const updated = current.includes(interest)
      ? current.filter(i => i !== interest)
      : [...current, interest];
    onUpdate({ targetingFilters: { ...targetingFilters, interests: updated } });
  };

  const handleKioskToggle = (kioskId: string) => {
    const currentKiosks = data.kioskIds || [];
    const newKiosks = currentKiosks.includes(kioskId)
      ? currentKiosks.filter(k => k !== kioskId)
      : [...currentKiosks, kioskId];
    onUpdate({ kioskIds: newKiosks });
  };

  // Enhanced filtering logic
  const filteredKiosks = MOCK_KIOSKS.filter(kiosk => {
    // Only show profiled kiosks if filter is active
    if (onlyProfiled && !kiosk.hasProfile) return false;

    // Venue type filter
    if (targetingFilters.venueTypes && targetingFilters.venueTypes.length > 0) {
      if (!targetingFilters.venueTypes.includes(kiosk.venue)) return false;
    }

    // If no profile data, can't filter by demographics
    if (!kiosk.hasProfile) return true;

    // Age group filter
    if (targetingFilters.ageGroups && targetingFilters.ageGroups.length > 0) {
      const hasMatchingAge = targetingFilters.ageGroups.some(age => 
        kiosk.demographics?.ageGroups.includes(age)
      );
      if (!hasMatchingAge) return false;
    }

    // Gender filter
    if (targetingFilters.gender && targetingFilters.gender.length > 0) {
      if (!targetingFilters.gender.includes(kiosk.demographics?.gender || '')) return false;
    }

    // Income filter
    if (targetingFilters.incomeLevel && targetingFilters.incomeLevel.length > 0) {
      if (!targetingFilters.incomeLevel.includes(kiosk.demographics?.incomeLevel || '')) return false;
    }

    // Foot traffic filter
    if (targetingFilters.footTraffic && targetingFilters.footTraffic.length > 0) {
      if (!targetingFilters.footTraffic.includes(kiosk.footTraffic || '')) return false;
    }

    // Interests filter
    if (targetingFilters.interests && targetingFilters.interests.length > 0) {
      const hasMatchingInterest = targetingFilters.interests.some(interest =>
        kiosk.interests?.includes(interest)
      );
      if (!hasMatchingInterest) return false;
    }

    return true;
  });

  const handleSelectAll = () => {
    onUpdate({ kioskIds: filteredKiosks.map(k => k.id) });
  };

  const handleClearAll = () => {
    onUpdate({ kioskIds: [] });
  };

  const profiledKiosksCount = MOCK_KIOSKS.filter(k => k.hasProfile).length;
  const selectedProfiledCount = (data.kioskIds || []).filter(id => 
    MOCK_KIOSKS.find(k => k.id === id)?.hasProfile
  ).length;

  return (
    <div className="p-8">
      <div className="max-w-[1000px]">
        {/* Section Title */}
        <div className="mb-8">
          <h3 className="text-[#111827] mb-2">Smart Targeting</h3>
          <p className="text-[#6B7280]">
            Target your ad group using location profiles. Filter by venue type, demographics, foot traffic, and audience interests.
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Status Banner */}
          <div className="flex items-center justify-between p-4 bg-[#F0F9FF] border border-[#BAE6FD] rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#0369A1]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#0C4A6E]">
                  {profiledKiosksCount} of {MOCK_KIOSKS.length} kiosks have complete location profiles
                </p>
                <p className="text-xs text-[#0369A1] mt-0.5">
                  Advanced targeting available for profiled locations
                </p>
              </div>
            </div>
            <button
              onClick={() => setOnlyProfiled(!onlyProfiled)}
              className={`px-4 h-9 rounded-lg text-sm transition-colors ${
                onlyProfiled
                  ? 'bg-[#0369A1] text-white'
                  : 'bg-white text-[#0369A1] hover:bg-[#E0F2FE]'
              }`}
            >
              {onlyProfiled ? 'Show All' : 'Profiled Only'}
            </button>
          </div>

          {/* Venue Types - Always Visible */}
          <div>
            <h4 className="text-sm text-[#111827] mb-4 flex items-center gap-2">
              <Store className="w-4 h-4 text-[#6B7280]" />
              Venue Types
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {VENUE_TYPES.map(venue => {
                const Icon = venue.icon;
                const isSelected = (targetingFilters.venueTypes || []).includes(venue.id);
                
                return (
                  <button
                    key={venue.id}
                    onClick={() => handleVenueToggle(venue.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      isSelected
                        ? 'border-[#D9480F] bg-[#FEF2F2]'
                        : 'border-[#E5E7EB] bg-white hover:border-[#D9480F]/30'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-2 ${
                      isSelected ? 'text-[#D9480F]' : 'text-[#6B7280]'
                    }`} />
                    <p className="text-sm text-[#111827]">{venue.label}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Advanced Filters Toggle */}
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="w-full flex items-center justify-between p-4 bg-white border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors"
          >
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-[#D9480F]" />
              <span className="text-sm font-medium text-[#111827]">Advanced Targeting Filters</span>
              <span className="text-xs text-[#6B7280]">(Demographics, Foot Traffic, Interests)</span>
            </div>
            {showAdvancedFilters ? (
              <ChevronUp className="w-5 h-5 text-[#6B7280]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#6B7280]" />
            )}
          </button>

          {/* Advanced Filters - Collapsible */}
          {showAdvancedFilters && (
            <div className="space-y-6 p-6 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
              {/* Demographics Section */}
              <div>
                <h4 className="text-sm text-[#111827] mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#6B7280]" />
                  Demographics
                </h4>
                <div className="space-y-4">
                  {/* Age Groups */}
                  <div>
                    <label className="block text-xs text-[#6B7280] mb-2">Age Groups</label>
                    <div className="flex flex-wrap gap-2">
                      {DEMOGRAPHICS.ageGroups.map(age => {
                        const isSelected = (targetingFilters.ageGroups || []).includes(age);
                        return (
                          <button
                            key={age}
                            onClick={() => handleAgeGroupToggle(age)}
                            className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
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
                    <label className="block text-xs text-[#6B7280] mb-2">Gender</label>
                    <div className="flex flex-wrap gap-2">
                      {DEMOGRAPHICS.gender.map(gender => {
                        const isSelected = (targetingFilters.gender || []).includes(gender);
                        return (
                          <button
                            key={gender}
                            onClick={() => handleGenderToggle(gender)}
                            className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
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
                    <label className="block text-xs text-[#6B7280] mb-2">Income Level</label>
                    <div className="flex flex-wrap gap-2">
                      {DEMOGRAPHICS.incomeLevel.map(income => {
                        const isSelected = (targetingFilters.incomeLevel || []).includes(income);
                        return (
                          <button
                            key={income}
                            onClick={() => handleIncomeToggle(income)}
                            className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
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
                </div>
              </div>

              {/* Foot Traffic */}
              <div>
                <h4 className="text-sm text-[#111827] mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#6B7280]" />
                  Foot Traffic Level
                </h4>
                <div className="flex flex-wrap gap-2">
                  {FOOT_TRAFFIC.map(traffic => {
                    const isSelected = (targetingFilters.footTraffic || []).includes(traffic);
                    return (
                      <button
                        key={traffic}
                        onClick={() => handleFootTrafficToggle(traffic)}
                        className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
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
                <h4 className="text-sm text-[#111827] mb-4 flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#6B7280]" />
                  Audience Interests
                </h4>
                <div className="flex flex-wrap gap-2">
                  {AUDIENCE_INTERESTS.map(interest => {
                    const isSelected = (targetingFilters.interests || []).includes(interest);
                    return (
                      <button
                        key={interest}
                        onClick={() => handleInterestToggle(interest)}
                        className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
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

          {/* Select Kiosks */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm text-[#111827] mb-1 flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-[#6B7280]" />
                  Select Kiosks <span className="text-[#DC2626]">*</span>
                </h4>
                <p className="text-xs text-[#6B7280]">
                  {filteredKiosks.length} kiosks available
                  {(data.kioskIds && data.kioskIds.length > 0) && (
                    <>
                      {' • '}
                      <span className="font-medium text-[#D9480F]">{data.kioskIds.length} selected</span>
                      {selectedProfiledCount > 0 && (
                        <> ({selectedProfiledCount} profiled)</>
                      )}
                    </>
                  )}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSelectAll}
                  className="px-3 py-1.5 text-xs text-[#0369A1] bg-[#F0F9FF] hover:bg-[#E0F2FE] rounded-md transition-colors"
                >
                  Select All
                </button>
                <button
                  onClick={handleClearAll}
                  className="px-3 py-1.5 text-xs text-[#6B7280] bg-[#F9FAFB] hover:bg-[#F3F4F6] rounded-md transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>

            {filteredKiosks.length === 0 ? (
              <div className="p-8 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-center">
                <Monitor className="w-8 h-8 text-[#E5E7EB] mx-auto mb-2" />
                <p className="text-sm text-[#111827] font-medium mb-1">
                  No kiosks match your filters
                </p>
                <p className="text-xs text-[#6B7280]">
                  Try adjusting your targeting criteria
                </p>
              </div>
            ) : (
              <div className="bg-white border border-[#E5E7EB] rounded-lg divide-y divide-[#E5E7EB] max-h-[400px] overflow-y-auto">
                {filteredKiosks.map(kiosk => {
                  const isSelected = (data.kioskIds || []).includes(kiosk.id);
                  
                  return (
                    <button
                      key={kiosk.id}
                      onClick={() => handleKioskToggle(kiosk.id)}
                      className="w-full px-4 py-3 flex items-start gap-3 hover:bg-[#F9FAFB] transition-colors text-left"
                    >
                      {isSelected ? (
                        <CheckCircle2 className="w-5 h-5 text-[#D9480F] flex-shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-5 h-5 text-[#E5E7EB] flex-shrink-0 mt-0.5" />
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm text-[#111827] font-medium">{kiosk.name}</p>
                          {kiosk.hasProfile && (
                            <span className="px-1.5 py-0.5 bg-[#DCFCE7] text-[#166534] text-xs rounded">
                              Profiled
                            </span>
                          )}
                          {!kiosk.hasProfile && (
                            <span className="px-1.5 py-0.5 bg-[#FEF3C7] text-[#92400E] text-xs rounded">
                              Basic
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#6B7280] mb-2">{kiosk.location}</p>
                        
                        {/* Profile Data Preview */}
                        {kiosk.hasProfile && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {kiosk.footTraffic && (
                              <span className="px-2 py-0.5 bg-[#F3F4F6] text-[#6B7280] text-xs rounded flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                {kiosk.footTraffic}
                              </span>
                            )}
                            {kiosk.demographics?.incomeLevel && (
                              <span className="px-2 py-0.5 bg-[#F3F4F6] text-[#6B7280] text-xs rounded">
                                {kiosk.demographics.incomeLevel} Income
                              </span>
                            )}
                            {kiosk.interests && kiosk.interests.length > 0 && (
                              <span className="px-2 py-0.5 bg-[#F3F4F6] text-[#6B7280] text-xs rounded">
                                {kiosk.interests[0]} +{kiosk.interests.length - 1}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`w-2 h-2 rounded-full ${
                          kiosk.online ? 'bg-[#16A34A]' : 'bg-[#DC2626]'
                        }`} />
                        <span className="text-xs text-[#6B7280]">
                          {kiosk.online ? 'Online' : 'Offline'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Validation Message */}
            {(!data.kioskIds || data.kioskIds.length === 0) && (
              <div className="flex items-center gap-2 mt-3 p-3 bg-[#FEF2F2] border border-[#FECACA] rounded-lg">
                <AlertCircle className="w-4 h-4 text-[#DC2626] flex-shrink-0" />
                <p className="text-xs text-[#DC2626]">
                  Please select at least one kiosk to continue
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
