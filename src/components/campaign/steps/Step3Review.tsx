import { Building2, Tag, Film, Target, Calendar, Clock, MapPin } from 'lucide-react';
import { CampaignData } from '../NewCampaignWizard';

interface Step3ReviewProps {
  data: CampaignData;
}

const OBJECTIVES_LABELS: Record<string, string> = {
  'brand-awareness': 'Brand Awareness',
  'traffic-proxied': 'Traffic (Proxied)',
  'conversions': 'Conversions',
  'engagement': 'Engagement',
};

const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function Step3Review({ data }: Step3ReviewProps) {
  const formatDays = (days: number[]) => {
    if (days.length === 7) return 'Every day';
    if (days.length === 5 && days.every(d => d >= 1 && d <= 5)) return 'Weekdays';
    if (days.length === 2 && days.includes(0) && days.includes(6)) return 'Weekends';
    
    const sortedDays = [...days].sort((a, b) => a - b);
    return sortedDays.map(d => DAYS_SHORT[d]).join(', ');
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="p-8">
      <div className="max-w-[900px]">
        {/* Section Title */}
        <div className="mb-8">
          <h3 className="text-[#111827] mb-2">Review & Launch</h3>
          <p className="text-[#6B7280]">
            Review your campaign details before launching. Your campaign has {data.adGroups.length} ad group{data.adGroups.length !== 1 ? 's' : ''}.
          </p>
        </div>

        <div className="space-y-6">
          {/* Campaign Summary */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 bg-[#F0F9FF] rounded-lg flex items-center justify-center flex-shrink-0">
                <Tag className="w-5 h-5 text-[#0369A1]" />
              </div>
              <div className="flex-1">
                <h4 className="text-[#111827] mb-4">Campaign</h4>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-sm text-[#6B7280] w-32 flex-shrink-0">Campaign Name:</span>
                    <span className="text-sm text-[#111827]">{data.campaignName || '—'}</span>
                  </div>

                  <div className="flex items-start">
                    <span className="text-sm text-[#6B7280] w-32 flex-shrink-0">Client:</span>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#D9480F]" />
                      <span className="text-sm text-[#111827]">{data.clientName || '—'}</span>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span className="text-sm text-[#6B7280] w-32 flex-shrink-0">Objective:</span>
                    <span className="text-sm text-[#111827]">
                      {OBJECTIVES_LABELS[data.objective] || '—'}
                    </span>
                  </div>

                  {data.tags.length > 0 && (
                    <div className="flex items-start">
                      <span className="text-sm text-[#6B7280] w-32 flex-shrink-0">Tags:</span>
                      <div className="flex flex-wrap gap-2">
                        {data.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-[#F0F9FF] text-[#0369A1] rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Ad Groups Summary */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
            <h4 className="text-[#111827] mb-4">
              Ad Groups ({data.adGroups.length})
            </h4>

            {data.adGroups.length === 0 ? (
              <p className="text-sm text-[#6B7280]">No ad groups added</p>
            ) : (
              <div className="space-y-4">
                {data.adGroups.map((adGroup, index) => (
                  <div
                    key={adGroup.id}
                    className="p-5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-8 h-8 bg-[#D9480F] text-white rounded-lg flex items-center justify-center flex-shrink-0 text-sm">
                        {index + 1}
                      </div>
                      <h5 className="text-[#111827] flex-1">{adGroup.name}</h5>
                    </div>

                    <div className="grid grid-cols-1 gap-4 ml-11">
                      {/* Content */}
                      <div>
                        <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-1">
                          <Film className="w-4 h-4" />
                          <span>Content</span>
                        </div>
                        <p className="text-sm text-[#111827] pl-6">
                          {adGroup.contentType === 'playlist' 
                            ? `Playlist: ${adGroup.playlistName}` 
                            : `${adGroup.mediaIds?.length || 0} media file${adGroup.mediaIds?.length !== 1 ? 's' : ''}`
                          }
                        </p>
                      </div>

                      {/* Targeting */}
                      <div>
                        <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-1">
                          <Target className="w-4 h-4" />
                          <span>Targeting</span>
                        </div>
                        <div className="pl-6 space-y-1">
                          <p className="text-sm text-[#111827]">
                            {adGroup.kioskIds.length} kiosk{adGroup.kioskIds.length !== 1 ? 's' : ''}
                          </p>
                          {adGroup.venueTypes.length > 0 && (
                            <p className="text-xs text-[#6B7280]">
                              Venue types: {adGroup.venueTypes.join(', ')}
                            </p>
                          )}
                          {(adGroup.targetCountry || adGroup.targetState || adGroup.targetCity) && (
                            <div className="flex items-center gap-1 text-xs text-[#6B7280]">
                              <MapPin className="w-3 h-3" />
                              <span>
                                {[adGroup.targetCity, adGroup.targetState, adGroup.targetCountry]
                                  .filter(Boolean)
                                  .join(', ')}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Schedule */}
                      <div>
                        <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-1">
                          <Calendar className="w-4 h-4" />
                          <span>Schedule</span>
                        </div>
                        <div className="pl-6 space-y-1">
                          <p className="text-sm text-[#111827]">
                            {formatDays(adGroup.daysOfWeek)}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-[#6B7280]">
                            <Clock className="w-3 h-3" />
                            <span>
                              {formatTime(adGroup.startTime)} - {formatTime(adGroup.endTime)}
                            </span>
                          </div>
                          <p className="text-xs text-[#6B7280]">
                            {formatDate(adGroup.startDate)} - {formatDate(adGroup.endDate)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Launch Confirmation */}
          <div className="p-4 bg-[#F0F9FF] border border-[#BAE6FD] rounded-lg">
            <p className="text-sm text-[#0369A1]">
              ✓ Your campaign "{data.campaignName}" is ready to launch with {data.adGroups.length} ad group{data.adGroups.length !== 1 ? 's' : ''}. Each ad group has its own content, targeting, and schedule. Click "Launch Campaign" to make it live.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
