import { useState, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Building2, 
  Layers, 
  Users, 
  Tag,
  Save,
  AlertCircle,
  Check
} from 'lucide-react';

// Taxonomy Data
const COUNTRIES = [
  'United States', 'Canada', 'United Kingdom', 'India', 'Australia', 
  'Germany', 'France', 'Singapore', 'UAE', 'Japan'
];

const STATES_BY_COUNTRY: Record<string, string[]> = {
  'United States': ['New York', 'California', 'Texas', 'Florida', 'Illinois'],
  'India': ['Maharashtra', 'Karnataka', 'Delhi', 'Tamil Nadu', 'Gujarat'],
  'Canada': ['Ontario', 'Quebec', 'British Columbia', 'Alberta'],
  'United Kingdom': ['England', 'Scotland', 'Wales', 'Northern Ireland'],
};

const CITIES_BY_STATE: Record<string, string[]> = {
  'New York': ['New York City', 'Buffalo', 'Rochester', 'Albany'],
  'California': ['Los Angeles', 'San Francisco', 'San Diego', 'San Jose'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
  'Karnataka': ['Bangalore', 'Mysore', 'Mangalore', 'Hubli'],
  'Ontario': ['Toronto', 'Ottawa', 'Mississauga', 'Hamilton'],
};

const VENUE_CATEGORIES = [
  'Airport',
  'Metro Station',
  'Railway Station',
  'Mall',
  'Bus Terminal',
  'Hospital',
  'Retail Store',
  'Corporate Park',
  'University',
  'Quick Service Restaurant',
  'Food Court',
  'Cinema Complex',
  'Public Park',
  'Stadium',
  'Hotel',
  'Convention Center',
  'Other'
];

const VENUE_SUBTYPES: Record<string, string[]> = {
  'Airport': ['Arrival Hall', 'Departure Hall', 'Security Check', 'Boarding Gate', 'Baggage Claim', 'Duty Free Area'],
  'Metro Station': ['Platform 1', 'Platform 2', 'Platform 3', 'Concourse', 'Ticket Counter', 'Entry Gate', 'Exit Gate'],
  'Railway Station': ['Platform 1', 'Platform 2', 'Platform 3', 'Waiting Hall', 'Foot Over Bridge', 'Ticket Counter', 'Entrance'],
  'Mall': ['Atrium', 'Food Court', 'Ground Floor', 'First Floor', 'Parking Level', 'Common Area', 'Anchor Store'],
  'Bus Terminal': ['Waiting Area', 'Ticket Counter', 'Platform 1', 'Platform 2', 'Entrance', 'Exit'],
  'Hospital': ['Reception', 'Waiting Area', 'Corridor', 'Cafeteria', 'Pharmacy', 'Emergency Wing'],
  'Retail Store': ['Entrance', 'Checkout Area', 'Main Floor', 'Customer Service', 'Parking'],
  'Corporate Park': ['Lobby', 'Reception', 'Cafeteria', 'Common Area', 'Parking'],
  'University': ['Library', 'Cafeteria', 'Main Building', 'Student Center', 'Entrance', 'Common Area'],
  'Quick Service Restaurant': ['Counter', 'Waiting Area', 'Dining Area', 'Entrance'],
  'Food Court': ['Central Seating', 'Counter Area', 'Entrance', 'Restroom Area'],
  'Cinema Complex': ['Lobby', 'Concession Stand', 'Hallway', 'Entrance', 'Screen 1', 'Screen 2'],
  'Public Park': ['Main Entrance', 'Central Area', 'Walking Path', 'Playground Area'],
  'Stadium': ['Entrance', 'Concourse', 'Concession Area', 'Gate 1', 'Gate 2'],
  'Hotel': ['Lobby', 'Reception', 'Restaurant', 'Conference Room', 'Parking'],
  'Convention Center': ['Hall A', 'Hall B', 'Main Lobby', 'Registration Area', 'Cafeteria'],
  'Other': ['Main Area', 'Secondary Area', 'Entrance', 'Common Space']
};

const FLOOR_OPTIONS = [
  'Basement 3', 'Basement 2', 'Basement 1', 'Ground Floor',
  'Floor 1', 'Floor 2', 'Floor 3', 'Floor 4', 'Floor 5',
  'Floor 6', 'Floor 7', 'Floor 8', 'Floor 9', 'Floor 10+'
];

const CROWD_TYPES = [
  'Shoppers', 'Students', 'Professionals', 'Tourists', 
  'Families', 'Commuters', 'Business Travelers', 'Local Residents'
];

const LOCATION_TAGS = [
  'Entrance', 'Lobby', 'Food Court', 'Waiting Area', 
  'Checkout Zone', 'Common Area', 'High Footfall', 
  'Quiet Zone', 'Transit Point', 'Retail Zone'
];

interface LocationProfile {
  // Basic Geolocation
  country: string;
  state: string;
  city: string;
  postalCode: string;
  
  // Venue Classification
  venueCategory: string;
  venueSubtype: string;
  
  // Floor and Micro Location
  floor: string;
  microLocation: string;
  
  // Audience and Context
  crowdTypes: string[];
  locationTags: string[];
  deviceGroup: string;
  
  // Environment Details
  atmosphereNotes: string;
  customTags: string;
}

interface KioskLocationProfileProps {
  kioskId: string;
  kioskName: string;
  deviceId: string;
  existingProfile?: LocationProfile | null;
  onSave: (profile: LocationProfile) => void;
  onCancel: () => void;
  mode: 'create' | 'edit';
  lastUpdated?: string; // ISO timestamp of last update
  updatedBy?: string; // Name of person who last updated
}

export function KioskLocationProfile({
  kioskId,
  kioskName,
  deviceId,
  existingProfile,
  onSave,
  onCancel,
  mode,
  lastUpdated,
  updatedBy
}: KioskLocationProfileProps) {
  // Form State
  const [country, setCountry] = useState(existingProfile?.country || '');
  const [state, setState] = useState(existingProfile?.state || '');
  const [city, setCity] = useState(existingProfile?.city || '');
  const [postalCode, setPostalCode] = useState(existingProfile?.postalCode || '');
  
  const [venueCategory, setVenueCategory] = useState(existingProfile?.venueCategory || '');
  const [venueSubtype, setVenueSubtype] = useState(existingProfile?.venueSubtype || '');
  
  const [floor, setFloor] = useState(existingProfile?.floor || '');
  const [microLocation, setMicroLocation] = useState(existingProfile?.microLocation || '');
  
  const [crowdTypes, setCrowdTypes] = useState<string[]>(existingProfile?.crowdTypes || []);
  const [locationTags, setLocationTags] = useState<string[]>(existingProfile?.locationTags || []);
  const [deviceGroup, setDeviceGroup] = useState(existingProfile?.deviceGroup || '');
  
  const [atmosphereNotes, setAtmosphereNotes] = useState(existingProfile?.atmosphereNotes || '');
  const [customTags, setCustomTags] = useState(existingProfile?.customTags || '');

  // UI State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  // Filtered dropdowns
  const availableStates = country ? STATES_BY_COUNTRY[country] || [] : [];
  const availableCities = state ? CITIES_BY_STATE[state] || [] : [];
  const availableSubtypes = venueCategory ? VENUE_SUBTYPES[venueCategory] || [] : [];

  // Reset dependent fields when parent changes
  useEffect(() => {
    if (!availableStates.includes(state)) {
      setState('');
      setCity('');
    }
  }, [country]);

  useEffect(() => {
    if (!availableCities.includes(city)) {
      setCity('');
    }
  }, [state]);

  useEffect(() => {
    if (!availableSubtypes.includes(venueSubtype)) {
      setVenueSubtype('');
    }
  }, [venueCategory]);

  // Validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!country) newErrors.country = 'Country is required';
    if (!state) newErrors.state = 'State is required';
    if (!city) newErrors.city = 'City is required';
    if (!postalCode) newErrors.postalCode = 'Postal code is required';
    if (!venueCategory) newErrors.venueCategory = 'Venue category is required';
    if (!venueSubtype) newErrors.venueSubtype = 'Venue subtype is required';
    if (!floor) newErrors.floor = 'Floor is required';
    if (crowdTypes.length === 0) newErrors.crowdTypes = 'Select at least one crowd type';
    if (locationTags.length === 0) newErrors.locationTags = 'Select at least one location tag';

    // Postal code validation (basic numeric check)
    if (postalCode && !/^\d{4,10}$/.test(postalCode)) {
      newErrors.postalCode = 'Invalid postal code format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const profile: LocationProfile = {
      country,
      state,
      city,
      postalCode,
      venueCategory,
      venueSubtype,
      floor,
      microLocation,
      crowdTypes,
      locationTags,
      deviceGroup,
      atmosphereNotes,
      customTags
    };

    onSave(profile);
    setIsSaving(false);
  };

  const toggleChip = (value: string, list: string[], setter: (list: string[]) => void) => {
    if (list.includes(value)) {
      setter(list.filter(v => v !== value));
    } else {
      setter([...list, value]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-[1400px] h-[90vh] bg-white rounded-2xl shadow-2xl flex overflow-hidden">
        {/* Main Form Section */}
        <div className="flex-1 overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-[#E5E7EB] px-8 py-6 z-10">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-[#111827]">
                    {mode === 'create' ? 'Kiosk Location Profile' : 'Edit Location Profile'}
                  </h2>
                  {mode === 'edit' && (
                    <span className="px-3 py-1 bg-[#F0FDF4] text-[#16A34A] rounded-full text-xs font-medium flex items-center gap-1.5">
                      <Check className="w-3 h-3" />
                      Profile Complete
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm text-[#6B7280]">
                  <span className="font-medium text-[#111827]">{deviceId}</span>
                  <span>•</span>
                  <span>{kioskName}</span>
                </div>
                {mode === 'edit' && lastUpdated && (
                  <p className="text-xs text-[#9CA3AF] mt-2">
                    Last updated: {new Date(lastUpdated).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                    {updatedBy && ` by ${updatedBy}`}
                  </p>
                )}
              </div>
              <button
                onClick={onCancel}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#F9FAFB] text-[#6B7280] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="px-8 py-6 space-y-8">
            {/* Basic Geolocation */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#EFF6FF] rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#3B82F6]" />
                </div>
                <div>
                  <h3 className="text-[#111827]">Basic Geolocation</h3>
                  <p className="text-sm text-[#6B7280]">Geographical location details</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Country <span className="text-[#DC2626]">*</span>
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className={`w-full h-11 px-4 bg-white border rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent ${
                      errors.country ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                    }`}
                  >
                    <option value="">Select country</option>
                    {COUNTRIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {errors.country && (
                    <p className="text-xs text-[#DC2626] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.country}
                    </p>
                  )}
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    State / Province <span className="text-[#DC2626]">*</span>
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    disabled={!country}
                    className={`w-full h-11 px-4 bg-white border rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent disabled:bg-[#F9FAFB] disabled:cursor-not-allowed ${
                      errors.state ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                    }`}
                  >
                    <option value="">Select state</option>
                    {availableStates.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="text-xs text-[#DC2626] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.state}
                    </p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    City <span className="text-[#DC2626]">*</span>
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    disabled={!state}
                    className={`w-full h-11 px-4 bg-white border rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent disabled:bg-[#F9FAFB] disabled:cursor-not-allowed ${
                      errors.city ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                    }`}
                  >
                    <option value="">Select city</option>
                    {availableCities.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {errors.city && (
                    <p className="text-xs text-[#DC2626] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.city}
                    </p>
                  )}
                </div>

                {/* Postal Code */}
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Postal Code / Pincode <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="e.g., 400001"
                    maxLength={10}
                    className={`w-full h-11 px-4 bg-white border rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent ${
                      errors.postalCode ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                    }`}
                  />
                  {errors.postalCode && (
                    <p className="text-xs text-[#DC2626] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.postalCode}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Venue Classification */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#F0FDF4] rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[#16A34A]" />
                </div>
                <div>
                  <h3 className="text-[#111827]">Venue Classification</h3>
                  <p className="text-sm text-[#6B7280]">Type and subtype of the venue</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Venue Category */}
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Venue Category <span className="text-[#DC2626]">*</span>
                  </label>
                  <select
                    value={venueCategory}
                    onChange={(e) => setVenueCategory(e.target.value)}
                    className={`w-full h-11 px-4 bg-white border rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent ${
                      errors.venueCategory ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                    }`}
                  >
                    <option value="">Select category</option>
                    {VENUE_CATEGORIES.map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                  {errors.venueCategory && (
                    <p className="text-xs text-[#DC2626] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.venueCategory}
                    </p>
                  )}
                </div>

                {/* Venue Subtype */}
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Venue Subtype <span className="text-[#DC2626]">*</span>
                  </label>
                  <select
                    value={venueSubtype}
                    onChange={(e) => setVenueSubtype(e.target.value)}
                    disabled={!venueCategory}
                    className={`w-full h-11 px-4 bg-white border rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent disabled:bg-[#F9FAFB] disabled:cursor-not-allowed ${
                      errors.venueSubtype ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                    }`}
                  >
                    <option value="">Select subtype</option>
                    {availableSubtypes.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.venueSubtype && (
                    <p className="text-xs text-[#DC2626] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.venueSubtype}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Floor and Micro Location */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#FEF3C7] rounded-lg flex items-center justify-center">
                  <Layers className="w-5 h-5 text-[#F59E0B]" />
                </div>
                <div>
                  <h3 className="text-[#111827]">Floor & Micro Location</h3>
                  <p className="text-sm text-[#6B7280]">Precise positioning within the venue</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Floor */}
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Floor / Level <span className="text-[#DC2626]">*</span>
                  </label>
                  <select
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                    className={`w-full h-11 px-4 bg-white border rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent ${
                      errors.floor ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                    }`}
                  >
                    <option value="">Select floor</option>
                    {FLOOR_OPTIONS.map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                  {errors.floor && (
                    <p className="text-xs text-[#DC2626] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.floor}
                    </p>
                  )}
                </div>

                {/* Micro Location */}
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Micro Location
                    <span className="text-[#9CA3AF] font-normal ml-1">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={microLocation}
                    onChange={(e) => setMicroLocation(e.target.value)}
                    placeholder="e.g., Near Entrance, Escalator Area"
                    className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  />
                  <p className="text-xs text-[#6B7280] mt-1">
                    High precision placement description
                  </p>
                </div>
              </div>
            </section>

            {/* Audience and Context */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#FEE2E2] rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#DC2626]" />
                </div>
                <div>
                  <h3 className="text-[#111827]">Audience & Contextual Filters</h3>
                  <p className="text-sm text-[#6B7280]">Target demographics and location characteristics</p>
                </div>
              </div>

              {/* Crowd Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#111827] mb-3">
                  Crowd Type <span className="text-[#DC2626]">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {CROWD_TYPES.map(type => (
                    <button
                      key={type}
                      onClick={() => toggleChip(type, crowdTypes, setCrowdTypes)}
                      className={`px-4 h-9 rounded-full text-sm font-medium transition-all ${
                        crowdTypes.includes(type)
                          ? 'bg-[#D9480F] text-white'
                          : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                {errors.crowdTypes && (
                  <p className="text-xs text-[#DC2626] mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.crowdTypes}
                  </p>
                )}
              </div>

              {/* Location Tags */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#111827] mb-3">
                  Location Tags <span className="text-[#DC2626]">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {LOCATION_TAGS.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleChip(tag, locationTags, setLocationTags)}
                      className={`px-4 h-9 rounded-full text-sm font-medium transition-all ${
                        locationTags.includes(tag)
                          ? 'bg-[#D9480F] text-white'
                          : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                {errors.locationTags && (
                  <p className="text-xs text-[#DC2626] mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.locationTags}
                  </p>
                )}
              </div>

              {/* Device Group */}
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Device Group
                  <span className="text-[#9CA3AF] font-normal ml-1">(Optional)</span>
                </label>
                <select
                  value={deviceGroup}
                  onChange={(e) => setDeviceGroup(e.target.value)}
                  className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                >
                  <option value="">No group assigned</option>
                  <option value="NYC Premium">NYC Premium</option>
                  <option value="LA Airports">LA Airports</option>
                  <option value="Chicago Retail">Chicago Retail</option>
                  <option value="Florida Coastal">Florida Coastal</option>
                  <option value="Seattle Downtown">Seattle Downtown</option>
                </select>
              </div>
            </section>

            {/* Environment Details */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#F5F3FF] rounded-lg flex items-center justify-center">
                  <Tag className="w-5 h-5 text-[#9333EA]" />
                </div>
                <div>
                  <h3 className="text-[#111827]">Environment Details</h3>
                  <p className="text-sm text-[#6B7280]">Additional contextual information</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Atmosphere Notes */}
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Atmosphere Notes
                    <span className="text-[#9CA3AF] font-normal ml-1">(Optional)</span>
                  </label>
                  <textarea
                    value={atmosphereNotes}
                    onChange={(e) => setAtmosphereNotes(e.target.value)}
                    placeholder="e.g., Bright lighting, moderate noise level, high footfall during weekends"
                    rows={3}
                    className="w-full px-4 py-3 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent resize-none"
                  />
                  <p className="text-xs text-[#6B7280] mt-1">
                    Lighting conditions, noise level, foot traffic density
                  </p>
                </div>

                {/* Custom Tags */}
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Custom Tags
                    <span className="text-[#9CA3AF] font-normal ml-1">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={customTags}
                    onChange={(e) => setCustomTags(e.target.value)}
                    placeholder="e.g., premium-zone, high-value, seasonal"
                    className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  />
                  <p className="text-xs text-[#6B7280] mt-1">
                    Comma-separated custom tags for internal use
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Footer Actions */}
          <div className="sticky bottom-0 bg-white border-t border-[#E5E7EB] px-8 py-4 flex items-center justify-end gap-3">
            <button
              onClick={onCancel}
              disabled={isSaving}
              className="px-6 h-11 bg-white border border-[#E5E7EB] rounded-lg text-sm font-medium text-[#6B7280] hover:bg-[#F9FAFB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 h-11 bg-[#D9480F] text-white rounded-lg text-sm font-medium hover:bg-[#C23D0D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {mode === 'create' ? 'Saving...' : 'Updating...'}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {mode === 'create' ? 'Save Profile' : 'Update Profile'}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="w-[400px] bg-[#F9FAFB] border-l border-[#E5E7EB] overflow-y-auto">
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-[#111827] mb-2">Profile Summary</h3>
              <p className="text-sm text-[#6B7280]">
                Preview of the location profile
              </p>
            </div>

            <div className="space-y-4">
              {/* Geolocation Summary */}
              {(country || state || city) && (
                <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-[#3B82F6]" />
                    <p className="text-sm font-medium text-[#111827]">Location</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    {country && (
                      <div className="flex justify-between">
                        <span className="text-[#6B7280]">Country:</span>
                        <span className="text-[#111827] font-medium">{country}</span>
                      </div>
                    )}
                    {state && (
                      <div className="flex justify-between">
                        <span className="text-[#6B7280]">State:</span>
                        <span className="text-[#111827] font-medium">{state}</span>
                      </div>
                    )}
                    {city && (
                      <div className="flex justify-between">
                        <span className="text-[#6B7280]">City:</span>
                        <span className="text-[#111827] font-medium">{city}</span>
                      </div>
                    )}
                    {postalCode && (
                      <div className="flex justify-between">
                        <span className="text-[#6B7280]">Postal Code:</span>
                        <span className="text-[#111827] font-medium font-mono">{postalCode}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Venue Summary */}
              {(venueCategory || venueSubtype) && (
                <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-4 h-4 text-[#16A34A]" />
                    <p className="text-sm font-medium text-[#111827]">Venue</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    {venueCategory && (
                      <div className="flex justify-between">
                        <span className="text-[#6B7280]">Category:</span>
                        <span className="text-[#111827] font-medium">{venueCategory}</span>
                      </div>
                    )}
                    {venueSubtype && (
                      <div className="flex justify-between">
                        <span className="text-[#6B7280]">Subtype:</span>
                        <span className="text-[#111827] font-medium">{venueSubtype}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Floor Summary */}
              {(floor || microLocation) && (
                <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Layers className="w-4 h-4 text-[#F59E0B]" />
                    <p className="text-sm font-medium text-[#111827]">Position</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    {floor && (
                      <div className="flex justify-between">
                        <span className="text-[#6B7280]">Floor:</span>
                        <span className="text-[#111827] font-medium">{floor}</span>
                      </div>
                    )}
                    {microLocation && (
                      <div>
                        <span className="text-[#6B7280] block mb-1">Micro Location:</span>
                        <span className="text-[#111827] font-medium">{microLocation}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Audience Summary */}
              {(crowdTypes.length > 0 || locationTags.length > 0) && (
                <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-4 h-4 text-[#DC2626]" />
                    <p className="text-sm font-medium text-[#111827]">Audience & Tags</p>
                  </div>
                  <div className="space-y-3 text-sm">
                    {crowdTypes.length > 0 && (
                      <div>
                        <span className="text-[#6B7280] block mb-2">Crowd Types:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {crowdTypes.map(type => (
                            <span
                              key={type}
                              className="px-2 py-1 bg-[#EFF6FF] text-[#3B82F6] rounded text-xs font-medium"
                            >
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {locationTags.length > 0 && (
                      <div>
                        <span className="text-[#6B7280] block mb-2">Location Tags:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {locationTags.map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-[#F0FDF4] text-[#16A34A] rounded text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {deviceGroup && (
                      <div>
                        <span className="text-[#6B7280] block mb-1">Device Group:</span>
                        <span className="px-2 py-1 bg-[#F3F4F6] text-[#111827] rounded text-xs font-medium">
                          {deviceGroup}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Completion Status */}
              <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
                <p className="text-sm font-medium text-[#111827] mb-3">Completion Status</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    {country && state && city && postalCode ? (
                      <Check className="w-4 h-4 text-[#16A34A]" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-[#E5E7EB]" />
                    )}
                    <span className={country && state && city && postalCode ? 'text-[#16A34A]' : 'text-[#6B7280]'}>
                      Geolocation
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {venueCategory && venueSubtype ? (
                      <Check className="w-4 h-4 text-[#16A34A]" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-[#E5E7EB]" />
                    )}
                    <span className={venueCategory && venueSubtype ? 'text-[#16A34A]' : 'text-[#6B7280]'}>
                      Venue Classification
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {floor ? (
                      <Check className="w-4 h-4 text-[#16A34A]" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-[#E5E7EB]" />
                    )}
                    <span className={floor ? 'text-[#16A34A]' : 'text-[#6B7280]'}>
                      Floor & Position
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {crowdTypes.length > 0 && locationTags.length > 0 ? (
                      <Check className="w-4 h-4 text-[#16A34A]" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-[#E5E7EB]" />
                    )}
                    <span className={crowdTypes.length > 0 && locationTags.length > 0 ? 'text-[#16A34A]' : 'text-[#6B7280]'}>
                      Audience & Tags
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}