import { useState } from 'react';
import { ShoppingBag, Plane, Train, Dumbbell, Coffee, Store, Search } from 'lucide-react';
import { CampaignData } from '../NewCampaignWizard';

interface Step3TargetingProps {
  data: Partial<CampaignData>;
  onUpdate: (updates: Partial<CampaignData>) => void;
}

// Venue type definitions
const VENUE_TYPES = [
  { id: 'malls', name: 'Shopping Malls', icon: ShoppingBag, kioskCount: 45 },
  { id: 'airports', name: 'Airports', icon: Plane, kioskCount: 28 },
  { id: 'transit', name: 'Transit Hubs', icon: Train, kioskCount: 32 },
  { id: 'gyms', name: 'Fitness Centers', icon: Dumbbell, kioskCount: 18 },
  { id: 'cafes', name: 'Cafés & Restaurants', icon: Coffee, kioskCount: 52 },
  { id: 'retail', name: 'Retail Stores', icon: Store, kioskCount: 38 },
];

// Mock kiosks
const MOCK_KIOSKS = [
  { id: 'k1', name: 'Westfield Mall - Main Entrance', venue: 'malls', status: 'online' },
  { id: 'k2', name: 'JFK Airport - Terminal 4', venue: 'airports', status: 'online' },
  { id: 'k3', name: 'Central Station - Platform A', venue: 'transit', status: 'online' },
  { id: 'k4', name: 'FitLife Downtown', venue: 'gyms', status: 'offline' },
  { id: 'k5', name: 'Coffee Corner - 5th Ave', venue: 'cafes', status: 'online' },
  { id: 'k6', name: 'Tech Store - SoHo', venue: 'retail', status: 'online' },
  { id: 'k7', name: 'Riverside Mall - Food Court', venue: 'malls', status: 'online' },
  { id: 'k8', name: 'LAX Airport - Terminal 1', venue: 'airports', status: 'online' },
];

export function Step3Targeting({ data, onUpdate }: Step3TargetingProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const selectedVenues = data.venueTypes || [];
  const selectedKiosks = data.kioskIds || [];

  const handleVenueToggle = (venueId: string) => {
    const newVenues = selectedVenues.includes(venueId)
      ? selectedVenues.filter(v => v !== venueId)
      : [...selectedVenues, venueId];
    
    onUpdate({ venueTypes: newVenues });
  };

  const handleKioskToggle = (kioskId: string) => {
    const newKiosks = selectedKiosks.includes(kioskId)
      ? selectedKiosks.filter(k => k !== kioskId)
      : [...selectedKiosks, kioskId];
    
    onUpdate({ kioskIds: newKiosks });
  };

  // Filter kiosks based on selected venues and search query
  const filteredKiosks = MOCK_KIOSKS.filter(kiosk => {
    const matchesVenue = selectedVenues.length === 0 || selectedVenues.includes(kiosk.venue);
    const matchesSearch = kiosk.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesVenue && matchesSearch;
  });

  return (
    <div className="p-8">
      <div className="max-w-[900px] mx-auto">
        {/* Section Title */}
        <div className="mb-8">
          <h3 className="text-[#111827] mb-2">Targeting</h3>
          <p className="text-[#6B7280]">
            Select venue types and specific kiosks where your campaign will run.
          </p>
        </div>

        {/* Venue Types Grid */}
        <div className="mb-8">
          <h4 className="text-sm text-[#111827] mb-4">
            Venue Types <span className="text-[#6B7280]">(Optional filter)</span>
          </h4>
          <div className="grid grid-cols-3 gap-4">
            {VENUE_TYPES.map(venue => {
              const Icon = venue.icon;
              const isSelected = selectedVenues.includes(venue.id);

              return (
                <button
                  key={venue.id}
                  onClick={() => handleVenueToggle(venue.id)}
                  className={`
                    p-4 rounded-lg border-2 transition-all text-left
                    ${isSelected
                      ? 'border-[#3B82F6] bg-[#EFF6FF]'
                      : 'border-[#E5E7EB] bg-white hover:border-[#3B82F6]/30'
                    }
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div className={`
                      p-2 rounded-lg
                      ${isSelected ? 'bg-[#3B82F6] text-white' : 'bg-[#F9FAFB] text-[#6B7280]'}
                    `}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className={`text-sm ${isSelected ? 'text-[#3B82F6]' : 'text-[#111827]'}`}>
                        {venue.name}
                      </div>
                      <div className="text-xs text-[#6B7280] mt-1">
                        {venue.kioskCount} kiosks
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Kiosk Selection */}
        <div>
          <h4 className="text-sm text-[#111827] mb-4">
            Select Kiosks <span className="text-[#DC2626]">*</span>
          </h4>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search kiosks by name..."
              className="w-full h-11 pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-md text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
            />
          </div>

          {/* Kiosk List */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg max-h-[400px] overflow-y-auto">
            {filteredKiosks.length === 0 ? (
              <div className="p-8 text-center text-[#6B7280]">
                No kiosks found. Try adjusting your filters.
              </div>
            ) : (
              <div className="divide-y divide-[#E5E7EB]">
                {filteredKiosks.map(kiosk => {
                  const isSelected = selectedKiosks.includes(kiosk.id);

                  return (
                    <label
                      key={kiosk.id}
                      className="flex items-center gap-3 p-4 hover:bg-[#F9FAFB] cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleKioskToggle(kiosk.id)}
                        className="w-4 h-4 text-[#3B82F6] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#3B82F6]"
                      />
                      <div className="flex-1">
                        <div className="text-sm text-[#111827]">{kiosk.name}</div>
                        <div className="text-xs text-[#6B7280] mt-1">
                          {VENUE_TYPES.find(v => v.id === kiosk.venue)?.name}
                        </div>
                      </div>
                      <div className={`
                        px-2 py-1 rounded text-xs
                        ${kiosk.status === 'online'
                          ? 'bg-[#D1FAE5] text-[#065F46]'
                          : 'bg-[#FEE2E2] text-[#991B1B]'
                        }
                      `}>
                        {kiosk.status}
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {selectedKiosks.length === 0 && (
            <p className="text-xs text-[#DC2626] mt-2">
              Please select at least one kiosk
            </p>
          )}

          {selectedKiosks.length > 0 && (
            <p className="text-xs text-[#6B7280] mt-2">
              {selectedKiosks.length} kiosk{selectedKiosks.length !== 1 ? 's' : ''} selected
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
