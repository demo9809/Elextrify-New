import { 
  X, 
  MapPin, 
  Building2, 
  Layers, 
  Users, 
  Tag,
  Edit,
  Check
} from 'lucide-react';

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

interface KioskLocationProfileViewProps {
  kioskId: string;
  kioskName: string;
  deviceId: string;
  profile: LocationProfile;
  lastUpdated?: string;
  updatedBy?: string;
  onEdit: () => void;
  onClose: () => void;
}

export function KioskLocationProfileView({
  kioskId,
  kioskName,
  deviceId,
  profile,
  lastUpdated,
  updatedBy,
  onEdit,
  onClose
}: KioskLocationProfileViewProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-[1200px] h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-[#E5E7EB] px-8 py-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-[#111827]">Location Profile</h2>
                <span className="px-3 py-1 bg-[#F0FDF4] text-[#16A34A] rounded-full text-xs font-medium flex items-center gap-1.5">
                  <Check className="w-3 h-3" />
                  Complete
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#6B7280]">
                <span className="font-medium text-[#111827]">{deviceId}</span>
                <span>•</span>
                <span>{kioskName}</span>
              </div>
              {lastUpdated && (
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
            <div className="flex items-center gap-2">
              <button
                onClick={onEdit}
                className="px-4 h-10 bg-[#D9480F] text-white rounded-lg text-sm font-medium hover:bg-[#C23D0D] transition-colors flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Update Profile
              </button>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#F9FAFB] text-[#6B7280] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Basic Geolocation */}
            <section className="bg-white border border-[#E5E7EB] rounded-xl p-6">
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
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">Country</p>
                  <p className="text-[#111827] font-medium">{profile.country}</p>
                </div>
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">State / Province</p>
                  <p className="text-[#111827] font-medium">{profile.state}</p>
                </div>
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">City</p>
                  <p className="text-[#111827] font-medium">{profile.city}</p>
                </div>
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">Postal Code</p>
                  <p className="text-[#111827] font-medium font-mono">{profile.postalCode}</p>
                </div>
              </div>
            </section>

            {/* Venue Classification */}
            <section className="bg-white border border-[#E5E7EB] rounded-xl p-6">
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
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">Venue Category</p>
                  <p className="text-[#111827] font-medium">{profile.venueCategory}</p>
                </div>
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">Venue Subtype</p>
                  <p className="text-[#111827] font-medium">{profile.venueSubtype}</p>
                </div>
              </div>
            </section>

            {/* Floor and Micro Location */}
            <section className="bg-white border border-[#E5E7EB] rounded-xl p-6">
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
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">Floor / Level</p>
                  <p className="text-[#111827] font-medium">{profile.floor}</p>
                </div>
                {profile.microLocation && (
                  <div>
                    <p className="text-sm text-[#6B7280] mb-1">Micro Location</p>
                    <p className="text-[#111827] font-medium">{profile.microLocation}</p>
                  </div>
                )}
              </div>
            </section>

            {/* Audience and Context */}
            <section className="bg-white border border-[#E5E7EB] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#FEE2E2] rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#DC2626]" />
                </div>
                <div>
                  <h3 className="text-[#111827]">Audience & Contextual Filters</h3>
                  <p className="text-sm text-[#6B7280]">Target demographics and location characteristics</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-sm text-[#6B7280] mb-3">Crowd Types</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.crowdTypes.map(type => (
                      <span
                        key={type}
                        className="px-3 py-1.5 bg-[#EFF6FF] text-[#3B82F6] rounded-full text-sm font-medium"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-[#6B7280] mb-3">Location Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.locationTags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-[#F0FDF4] text-[#16A34A] rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {profile.deviceGroup && (
                  <div>
                    <p className="text-sm text-[#6B7280] mb-1">Device Group</p>
                    <span className="inline-block px-3 py-1.5 bg-[#F3F4F6] text-[#111827] rounded-lg text-sm font-medium">
                      {profile.deviceGroup}
                    </span>
                  </div>
                )}
              </div>
            </section>

            {/* Environment Details */}
            {(profile.atmosphereNotes || profile.customTags) && (
              <section className="bg-white border border-[#E5E7EB] rounded-xl p-6">
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
                  {profile.atmosphereNotes && (
                    <div>
                      <p className="text-sm text-[#6B7280] mb-2">Atmosphere Notes</p>
                      <p className="text-[#111827] leading-relaxed">{profile.atmosphereNotes}</p>
                    </div>
                  )}

                  {profile.customTags && (
                    <div>
                      <p className="text-sm text-[#6B7280] mb-2">Custom Tags</p>
                      <div className="flex flex-wrap gap-2">
                        {profile.customTags.split(',').map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-[#F3F4F6] text-[#6B7280] rounded-lg text-sm"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-[#E5E7EB] px-8 py-4 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-6 h-11 bg-white border border-[#E5E7EB] rounded-lg text-sm font-medium text-[#6B7280] hover:bg-[#F9FAFB] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
