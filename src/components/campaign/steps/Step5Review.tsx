import { Building2, Film, MapPin, Calendar, Tag, Target, Clock } from 'lucide-react';
import { CampaignData } from '../NewCampaignWizard';

interface Step5ReviewProps {
  data: CampaignData;
}

const OBJECTIVES_LABELS: Record<string, string> = {
  'brand-awareness': 'Brand Awareness',
  'traffic-proxied': 'Traffic (Proxied)',
  'conversions': 'Conversions',
  'engagement': 'Engagement',
};

const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function Step5Review({ data }: Step5ReviewProps) {
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

  return (
    <div className="p-8">
      <div className="max-w-[800px]">
        {/* Section Title */}
        <div className="mb-8">
          <h3 className="text-[#111827] mb-2">Review & Launch</h3>
          <p className="text-[#6B7280]">
            Review your campaign details before launching. Make sure everything looks correct.
          </p>
        </div>

        <div className="space-y-6">
          {/* Campaign Details */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 bg-[#F0F9FF] rounded-lg flex items-center justify-center flex-shrink-0">
                <Tag className="w-5 h-5 text-[#0369A1]" />
              </div>
              <div className="flex-1">
                <h4 className="text-[#111827] mb-4">Campaign Details</h4>
                
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

          {/* Targeting */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#F0FDF4] rounded-lg flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 text-[#16A34A]" />
              </div>
              <div className="flex-1">
                <h4 className="text-[#111827] mb-4">Targeting</h4>
                
                <div className="space-y-3">
                  {(data.targetCountry || data.targetState || data.targetCity) && (
                    <div className="flex items-start">
                      <span className="text-sm text-[#6B7280] w-32 flex-shrink-0">Region:</span>
                      <div className="flex items-center gap-1 text-sm text-[#111827]">
                        <MapPin className="w-4 h-4 text-[#6B7280]" />
                        <span>
                          {[data.targetCity, data.targetState, data.targetCountry]
                            .filter(Boolean)
                            .join(', ') || 'All Regions'}
                        </span>
                      </div>
                    </div>
                  )}

                  {data.venueTypes.length > 0 && (
                    <div className="flex items-start">
                      <span className="text-sm text-[#6B7280] w-32 flex-shrink-0">Venue Types:</span>
                      <span className="text-sm text-[#111827]">
                        {data.venueTypes.length} type{data.venueTypes.length !== 1 ? 's' : ''} selected
                      </span>
                    </div>
                  )}

                  <div className="flex items-start">
                    <span className="text-sm text-[#6B7280] w-32 flex-shrink-0">Kiosks:</span>
                    <span className="text-sm text-[#111827]">
                      {data.selectedKiosks.length} kiosk{data.selectedKiosks.length !== 1 ? 's' : ''} selected
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule - NEW: Show all schedule blocks */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#FEF3E7] rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-[#D97706]" />
              </div>
              <div className="flex-1">
                <h4 className="text-[#111827] mb-4">Schedule</h4>
                
                <div className="space-y-4">
                  {/* Campaign Duration */}
                  <div className="pb-4 border-b border-[#E5E7EB]">
                    <div className="flex items-start mb-2">
                      <span className="text-sm text-[#6B7280] w-32 flex-shrink-0">Duration:</span>
                      <span className="text-sm text-[#111827]">
                        {data.campaignStartDate && data.campaignEndDate
                          ? `${new Date(data.campaignStartDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })} - ${new Date(data.campaignEndDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}`
                          : '—'}
                      </span>
                    </div>
                  </div>

                  {/* Schedule Blocks */}
                  <div>
                    <div className="flex items-start mb-3">
                      <span className="text-sm text-[#6B7280] w-32 flex-shrink-0">Schedule Blocks:</span>
                      <span className="text-sm text-[#111827]">
                        {data.scheduleBlocks.length} block{data.scheduleBlocks.length !== 1 ? 's' : ''}
                      </span>
                    </div>

                    {data.scheduleBlocks.length > 0 && (
                      <div className="space-y-3">
                        {data.scheduleBlocks.map((block, index) => (
                          <div
                            key={block.id}
                            className="ml-32 p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg"
                          >
                            <div className="flex items-start gap-3 mb-2">
                              <div className="w-6 h-6 bg-[#D9480F] text-white rounded flex items-center justify-center flex-shrink-0 text-xs">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <h5 className="text-sm text-[#111827] mb-1">{block.name}</h5>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                                    <Film className="w-3 h-3" />
                                    <span>
                                      {block.contentType === 'playlist' 
                                        ? `Playlist: ${block.playlistName}` 
                                        : `${block.mediaIds?.length || 0} media files`
                                      }
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                                    <Calendar className="w-3 h-3" />
                                    <span>{formatDays(block.daysOfWeek)}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                                    <Clock className="w-3 h-3" />
                                    <span>
                                      {formatTime(block.startTime)} - {formatTime(block.endTime)}
                                    </span>
                                  </div>
                                  {(block.effectiveFrom || block.effectiveTo) && (
                                    <div className="text-xs text-[#9CA3AF]">
                                      Effective: {block.effectiveFrom ? new Date(block.effectiveFrom).toLocaleDateString() : 'Start'} 
                                      {' → '}
                                      {block.effectiveTo ? new Date(block.effectiveTo).toLocaleDateString() : 'End'}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Launch Confirmation */}
          <div className="p-4 bg-[#F0F9FF] border border-[#BAE6FD] rounded-lg">
            <p className="text-sm text-[#0369A1]">
              ✓ Your campaign is ready to launch with {data.scheduleBlocks.length} schedule block{data.scheduleBlocks.length !== 1 ? 's' : ''}. Click "Launch Campaign" below to make it live on {data.selectedKiosks.length} kiosk{data.selectedKiosks.length !== 1 ? 's' : ''}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
