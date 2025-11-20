import { MapPin, Store, Monitor, Circle, CheckCircle2 } from 'lucide-react';
import { AdGroup } from '../NewCampaignWizard';

const COUNTRIES = ['United States', 'Canada', 'United Kingdom'];
const STATES = {
  'United States': ['California', 'New York', 'Texas', 'Florida'],
  'Canada': ['Ontario', 'Quebec', 'British Columbia'],
  'United Kingdom': ['England', 'Scotland', 'Wales'],
};
const CITIES = {
  'California': ['Los Angeles', 'San Francisco', 'San Diego'],
  'New York': ['New York City', 'Buffalo', 'Rochester'],
  'Ontario': ['Toronto', 'Ottawa', 'Mississauga'],
};

const VENUE_TYPES = [
  { id: 'mall', label: 'Shopping Malls', icon: Store },
  { id: 'transit', label: 'Transit Hubs', icon: MapPin },
  { id: 'airport', label: 'Airports', icon: MapPin },
  { id: 'gym', label: 'Gyms & Fitness', icon: Store },
  { id: 'restaurant', label: 'Restaurants', icon: Store },
  { id: 'retail', label: 'Retail Stores', icon: Store },
];

const MOCK_KIOSKS = [
  { id: 'k1', name: 'Mall of America - Main', location: 'Minneapolis, MN', venue: 'mall', online: true },
  { id: 'k2', name: 'LAX Terminal 3', location: 'Los Angeles, CA', venue: 'airport', online: true },
  { id: 'k3', name: 'Times Square Digital', location: 'New York, NY', venue: 'transit', online: false },
  { id: 'k4', name: 'FitLife Downtown', location: 'San Francisco, CA', venue: 'gym', online: true },
  { id: 'k5', name: 'Westfield Century City', location: 'Los Angeles, CA', venue: 'mall', online: true },
  { id: 'k6', name: 'SFO Terminal 2', location: 'San Francisco, CA', venue: 'airport', online: true },
  { id: 'k7', name: 'Grand Central Station', location: 'New York, NY', venue: 'transit', online: true },
  { id: 'k8', name: 'Starbucks Union Square', location: 'San Francisco, CA', venue: 'restaurant', online: true },
  { id: 'k9', name: 'Nike Store 5th Ave', location: 'New York, NY', venue: 'retail', online: true },
  { id: 'k10', name: 'FitLife Brooklyn', location: 'Brooklyn, NY', venue: 'gym', online: true },
  { id: 'k11', name: 'Beverly Center', location: 'Los Angeles, CA', venue: 'mall', online: false },
  { id: 'k12', name: 'JFK Terminal 4', location: 'New York, NY', venue: 'airport', online: true },
  { id: 'k13', name: 'Whole Foods Market', location: 'Los Angeles, CA', venue: 'restaurant', online: true },
  { id: 'k14', name: 'Target Downtown', location: 'San Diego, CA', venue: 'retail', online: true },
  { id: 'k15', name: 'Orange County Transit', location: 'Santa Ana, CA', venue: 'transit', online: true },
];

interface StepBTargetingProps {
  data: Partial<AdGroup>;
  onUpdate: (updates: Partial<AdGroup>) => void;
}

export function StepBTargeting({ data, onUpdate }: StepBTargetingProps) {
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

  const filteredKiosks = MOCK_KIOSKS.filter(kiosk => {
    if (data.venueTypes && data.venueTypes.length > 0 && !data.venueTypes.includes(kiosk.venue)) {
      return false;
    }
    return true;
  });

  const handleSelectAll = () => {
    onUpdate({ kioskIds: filteredKiosks.map(k => k.id) });
  };

  const handleClearAll = () => {
    onUpdate({ kioskIds: [] });
  };

  return (
    <div className="p-8">
      <div className="max-w-[900px]">
        {/* Section Title */}
        <div className="mb-8">
          <h3 className="text-[#111827] mb-2">Targeting</h3>
          <p className="text-[#6B7280]">
            Select where this ad group will play. Choose kiosks based on location and venue type.
          </p>
        </div>

        <div className="space-y-8">
          {/* Target Regions (Optional Filters) */}
          <div>
            <h4 className="text-sm text-[#111827] mb-4">Target Regions (Optional)</h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-[#6B7280] mb-2">Country</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] pointer-events-none" />
                  <select
                    value={data.targetCountry || ''}
                    onChange={(e) => onUpdate({ 
                      targetCountry: e.target.value,
                      targetState: '',
                      targetCity: '',
                    })}
                    className="w-full h-11 pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-md text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNiA2TDExIDEiIHN0cm9rZT0iIzZCNzI4MCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==')] bg-[center_right_1rem] bg-no-repeat"
                  >
                    <option value="">All Countries</option>
                    {COUNTRIES.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#6B7280] mb-2">State/Province</label>
                <select
                  value={data.targetState || ''}
                  onChange={(e) => onUpdate({ 
                    targetState: e.target.value,
                    targetCity: '',
                  })}
                  disabled={!data.targetCountry}
                  className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-md text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF] appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNiA2TDExIDEiIHN0cm9rZT0iIzZCNzI4MCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==')] bg-[center_right_1rem] bg-no-repeat"
                >
                  <option value="">All States</option>
                  {data.targetCountry && STATES[data.targetCountry as keyof typeof STATES]?.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#6B7280] mb-2">City</label>
                <select
                  value={data.targetCity || ''}
                  onChange={(e) => onUpdate({ targetCity: e.target.value })}
                  disabled={!data.targetState}
                  className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-md text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF] appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNiA2TDExIDEiIHN0cm9rZT0iIzZCNzI4MCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==')] bg-[center_right_1rem] bg-no-repeat"
                >
                  <option value="">All Cities</option>
                  {data.targetState && CITIES[data.targetState as keyof typeof CITIES]?.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Venue Types */}
          <div>
            <h4 className="text-sm text-[#111827] mb-4">Venue Types (Optional)</h4>
            <div className="grid grid-cols-3 gap-3">
              {VENUE_TYPES.map(venue => {
                const Icon = venue.icon;
                const isSelected = (data.venueTypes || []).includes(venue.id);
                
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

          {/* Select Kiosks */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm text-[#111827] mb-1">
                  Select Kiosks <span className="text-[#DC2626]">*</span>
                </h4>
                <p className="text-xs text-[#6B7280]">
                  {filteredKiosks.length} kiosks available
                  {(data.kioskIds && data.kioskIds.length > 0) && ` • ${data.kioskIds.length} selected`}
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
                <p className="text-sm text-[#6B7280]">
                  No kiosks match your filters
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
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#F9FAFB] transition-colors text-left"
                    >
                      {isSelected ? (
                        <CheckCircle2 className="w-5 h-5 text-[#D9480F] flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-[#E5E7EB] flex-shrink-0" />
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#111827]">{kiosk.name}</p>
                        <p className="text-xs text-[#6B7280]">{kiosk.location}</p>
                      </div>

                      <div className="flex items-center gap-2">
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

            {(!data.kioskIds || data.kioskIds.length === 0) && (
              <p className="text-xs text-[#DC2626] mt-2">
                Please select at least one kiosk to continue
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
