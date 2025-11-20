import { useState } from 'react';
import { Plus, Calendar, Film, Target, Clock, Edit, Copy, Trash2 } from 'lucide-react';
import { CampaignData, AdGroup } from '../NewCampaignWizard';
import { AdGroupEditorPanel } from '../panels/AdGroupEditorPanel';

interface Step2AdGroupsProps {
  data: CampaignData;
  onUpdate: (updates: Partial<CampaignData>) => void;
}

const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function Step2AdGroups({ data, onUpdate }: Step2AdGroupsProps) {
  const [showEditor, setShowEditor] = useState(false);
  const [editingAdGroup, setEditingAdGroup] = useState<AdGroup | null>(null);

  const handleAddAdGroup = () => {
    setEditingAdGroup(null);
    setShowEditor(true);
  };

  const handleEditAdGroup = (adGroup: AdGroup) => {
    setEditingAdGroup(adGroup);
    setShowEditor(true);
  };

  const handleDuplicateAdGroup = (adGroup: AdGroup) => {
    const duplicated: AdGroup = {
      ...adGroup,
      id: `adgroup-${Date.now()}`,
      name: `${adGroup.name} (Copy)`,
    };
    setEditingAdGroup(duplicated);
    setShowEditor(true);
  };

  const handleDeleteAdGroup = (adGroupId: string) => {
    if (confirm('Are you sure you want to delete this ad group?')) {
      onUpdate({
        adGroups: data.adGroups.filter(ag => ag.id !== adGroupId)
      });
    }
  };

  const handleSaveAdGroup = (adGroup: AdGroup) => {
    if (editingAdGroup && data.adGroups.find(ag => ag.id === adGroup.id)) {
      // Update existing
      onUpdate({
        adGroups: data.adGroups.map(ag => ag.id === adGroup.id ? adGroup : ag)
      });
    } else {
      // Add new
      onUpdate({
        adGroups: [...data.adGroups, adGroup]
      });
    }
    setShowEditor(false);
    setEditingAdGroup(null);
  };

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
    <>
      <div className="p-8">
        <div className="max-w-[900px]">
          {/* Section Title */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-[#111827] mb-2">Ad Groups</h3>
                <p className="text-[#6B7280]">
                  Each ad group defines the content, targeting, and schedule for a specific ad.
                  {data.clientName && ` All ad groups will use content from ${data.clientName}.`}
                </p>
              </div>
              {data.adGroups.length > 0 && (
                <button
                  onClick={handleAddAdGroup}
                  className="flex items-center gap-2 px-4 h-10 bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add New Ad Group
                </button>
              )}
            </div>
          </div>

          {/* Ad Groups List */}
          {data.adGroups.length === 0 ? (
            /* Empty State */
            <div className="p-12 bg-white border-2 border-dashed border-[#E5E7EB] rounded-xl text-center">
              <div className="w-16 h-16 bg-[#F0F9FF] rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-[#D9480F]" />
              </div>
              <h4 className="text-[#111827] mb-2">Your campaign needs at least one Ad Group</h4>
              <p className="text-sm text-[#6B7280] mb-6 max-w-md mx-auto">
                An ad group defines the content, targeting, and schedule. For example, create one ad group for "Sunday Schedule" and another for "Weekday Schedule".
              </p>
              <button
                onClick={handleAddAdGroup}
                className="px-6 h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] transition-colors"
              >
                Add Your First Ad Group
              </button>
            </div>
          ) : (
            /* Filled State - Ad Group Cards */
            <div className="space-y-4">
              {data.adGroups.map((adGroup, index) => (
                <div
                  key={adGroup.id}
                  className="bg-white border border-[#E5E7EB] rounded-xl p-6 hover:border-[#D9480F]/30 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    {/* Number Badge */}
                    <div className="w-10 h-10 bg-[#D9480F] text-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">{index + 1}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="text-[#111827]">{adGroup.name}</h4>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditAdGroup(adGroup)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F0F9FF] text-[#6B7280] hover:text-[#D9480F] transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDuplicateAdGroup(adGroup)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F0F9FF] text-[#6B7280] hover:text-[#D9480F] transition-colors"
                            title="Duplicate"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteAdGroup(adGroup.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#FEE2E2] text-[#6B7280] hover:text-[#DC2626] transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Summary Grid */}
                      <div className="grid grid-cols-1 gap-3">
                        {/* Content */}
                        <div className="flex items-start gap-3">
                          <Film className="w-4 h-4 text-[#6B7280] mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-[#6B7280] mb-0.5">Content</p>
                            <p className="text-sm text-[#111827]">
                              {adGroup.contentType === 'playlist' 
                                ? `${adGroup.playlistName}` 
                                : `${adGroup.mediaIds?.length || 0} media file${adGroup.mediaIds?.length !== 1 ? 's' : ''}`
                              }
                            </p>
                          </div>
                        </div>

                        {/* Targeting */}
                        <div className="flex items-start gap-3">
                          <Target className="w-4 h-4 text-[#6B7280] mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-[#6B7280] mb-0.5">Targeting</p>
                            <p className="text-sm text-[#111827]">
                              {adGroup.kioskIds.length} kiosk{adGroup.kioskIds.length !== 1 ? 's' : ''}
                              {adGroup.venueTypes.length > 0 && ` (${adGroup.venueTypes.join(', ')})`}
                            </p>
                          </div>
                        </div>

                        {/* Schedule */}
                        <div className="flex items-start gap-3">
                          <Clock className="w-4 h-4 text-[#6B7280] mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-[#6B7280] mb-0.5">Schedule</p>
                            <p className="text-sm text-[#111827]">
                              {formatDays(adGroup.daysOfWeek)}, {formatTime(adGroup.startTime)} - {formatTime(adGroup.endTime)}
                            </p>
                            <p className="text-xs text-[#6B7280] mt-0.5">
                              {formatDate(adGroup.startDate)} - {formatDate(adGroup.endDate)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Helper Info */}
          {data.adGroups.length > 0 && (
            <div className="mt-6 p-4 bg-[#F0F9FF] border border-[#BAE6FD] rounded-lg flex items-start gap-3">
              <Calendar className="w-5 h-5 text-[#0369A1] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-[#0369A1] mb-1">
                  <strong>Multiple schedules solved!</strong>
                </p>
                <p className="text-xs text-[#0369A1]/80">
                  You have {data.adGroups.length} ad group{data.adGroups.length !== 1 ? 's' : ''}. Each can run different content at different times. Add more ad groups if you need additional schedule variations.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Nested Ad Group Editor Panel */}
      {showEditor && (
        <AdGroupEditorPanel
          isOpen={showEditor}
          onClose={() => {
            setShowEditor(false);
            setEditingAdGroup(null);
          }}
          onSave={handleSaveAdGroup}
          clientId={data.clientId!}
          clientName={data.clientName!}
          existingAdGroup={editingAdGroup || undefined}
        />
      )}
    </>
  );
}
