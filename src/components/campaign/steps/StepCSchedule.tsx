import { useState } from 'react';
import { Calendar, Clock, Info, Zap } from 'lucide-react';
import { AdGroup } from '../NewCampaignWizard';

interface StepCScheduleProps {
  data: Partial<AdGroup>;
  onUpdate: (updates: Partial<AdGroup>) => void;
}

const DAYS_OF_WEEK = [
  { value: 0, label: 'Sunday', short: 'Sun' },
  { value: 1, label: 'Monday', short: 'Mon' },
  { value: 2, label: 'Tuesday', short: 'Tue' },
  { value: 3, label: 'Wednesday', short: 'Wed' },
  { value: 4, label: 'Thursday', short: 'Thu' },
  { value: 5, label: 'Friday', short: 'Fri' },
  { value: 6, label: 'Saturday', short: 'Sat' },
];

const HOURS = Array.from({ length: 24 }, (_, i) => i);

// Peak hours are 9am-6pm (9-17)
const PEAK_HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17];

// Time slot data structure: Map<"dayIndex-hour", boolean>
interface TimeSlots {
  [key: string]: boolean;
}

export function StepCSchedule({ data, onUpdate }: StepCScheduleProps) {
  const today = new Date().toISOString().split('T')[0];

  // Convert existing data to time slots format
  const getInitialTimeSlots = (): TimeSlots => {
    const slots: TimeSlots = {};
    
    if (data.daysOfWeek && data.startTime && data.endTime) {
      const startHour = parseInt(data.startTime.split(':')[0]);
      const endHour = parseInt(data.endTime.split(':')[0]);
      
      data.daysOfWeek.forEach(day => {
        for (let hour = startHour; hour < endHour; hour++) {
          slots[`${day}-${hour}`] = true;
        }
      });
    }
    
    return slots;
  };

  const [timeSlots, setTimeSlots] = useState<TimeSlots>(getInitialTimeSlots());

  // Toggle a specific time slot
  const handleSlotClick = (dayIndex: number, hour: number) => {
    const key = `${dayIndex}-${hour}`;
    const newSlots = { ...timeSlots };
    
    if (newSlots[key]) {
      delete newSlots[key];
    } else {
      newSlots[key] = true;
    }
    
    setTimeSlots(newSlots);
    updateAdGroupFromSlots(newSlots);
  };

  // Convert time slots back to AdGroup format
  const updateAdGroupFromSlots = (slots: TimeSlots) => {
    // Extract unique days and hours
    const selectedDays = new Set<number>();
    const selectedHours = new Set<number>();
    
    Object.keys(slots).forEach(key => {
      const [day, hour] = key.split('-').map(Number);
      selectedDays.add(day);
      selectedHours.add(hour);
    });
    
    if (selectedDays.size === 0) {
      onUpdate({
        daysOfWeek: [],
        startTime: '09:00',
        endTime: '18:00',
      });
      return;
    }
    
    // Find min/max hours for time range
    const hours = Array.from(selectedHours).sort((a, b) => a - b);
    const minHour = hours[0];
    const maxHour = hours[hours.length - 1] + 1; // +1 because endTime is exclusive
    
    onUpdate({
      daysOfWeek: Array.from(selectedDays).sort((a, b) => a - b),
      startTime: `${String(minHour).padStart(2, '0')}:00`,
      endTime: `${String(maxHour).padStart(2, '0')}:00`,
    });
  };

  // Format hour for display
  const formatHour = (hour: number): string => {
    if (hour === 0) return '12 AM';
    if (hour === 12) return '12 PM';
    if (hour < 12) return `${hour} AM`;
    return `${hour - 12} PM`;
  };

  // Check if a slot is selected
  const isSlotSelected = (dayIndex: number, hour: number): boolean => {
    return timeSlots[`${dayIndex}-${hour}`] || false;
  };

  // Check if hour is peak
  const isPeakHour = (hour: number): boolean => {
    return PEAK_HOURS.includes(hour);
  };

  // Count selected slots
  const selectedSlotCount = Object.keys(timeSlots).length;

  return (
    <div className="p-8">
      <div className="max-w-full">
        {/* Section Title */}
        <div className="mb-8">
          <h3 className="text-[#111827] mb-2">Schedule Timeline</h3>
          <p className="text-[#6B7280]">
            Click on time slots to schedule when this ad group will play. Peak hours (9 AM - 6 PM) are highlighted.
          </p>
        </div>

        <div className="space-y-6">
          {/* Date Range */}
          <div>
            <h4 className="text-sm text-[#111827] mb-4">
              Campaign Date Range <span className="text-[#DC2626]">*</span>
            </h4>
            <div className="grid grid-cols-2 gap-4 max-w-[500px]">
              <div>
                <label className="block text-xs text-[#6B7280] mb-2">Start Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] pointer-events-none" />
                  <input
                    type="date"
                    value={data.startDate || ''}
                    onChange={(e) => onUpdate({ startDate: e.target.value })}
                    min={today}
                    className="w-full h-11 pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-md text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#6B7280] mb-2">End Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] pointer-events-none" />
                  <input
                    type="date"
                    value={data.endDate || ''}
                    onChange={(e) => onUpdate({ endDate: e.target.value })}
                    min={data.startDate || today}
                    className="w-full h-11 pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-md text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm text-[#111827]">
                Weekly Schedule <span className="text-[#DC2626]">*</span>
              </h4>
              <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                <div className="flex items-center gap-2">
                  <Zap className="w-3 h-3 text-[#F59E0B]" />
                  <span>Peak Hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#D9480F] rounded"></div>
                  <span>Selected ({selectedSlotCount} slots)</span>
                </div>
              </div>
            </div>

            {/* Timeline Grid Container */}
            <div className="border border-[#E5E7EB] rounded-lg overflow-hidden bg-white">
              {/* Grid wrapper with horizontal scroll */}
              <div className="overflow-x-auto">
                <div className="inline-grid" style={{ gridTemplateColumns: '60px repeat(7, 80px)' }}>
                  {/* Header Row - Days */}
                  <div className="bg-[#F9FAFB] border-b border-[#E5E7EB] p-2 sticky left-0 z-10"></div>
                  {DAYS_OF_WEEK.map(day => (
                    <div
                      key={day.value}
                      className="bg-[#F9FAFB] border-b border-l border-[#E5E7EB] p-2 text-center"
                    >
                      <div className="text-xs text-[#111827]">{day.short}</div>
                    </div>
                  ))}

                  {/* Time Rows */}
                  {HOURS.map(hour => (
                    <div key={hour} className="contents">
                      {/* Hour Label */}
                      <div className="bg-[#F9FAFB] border-b border-[#E5E7EB] p-2 sticky left-0 z-10 flex items-center justify-end pr-2">
                        <div className="text-xs text-[#6B7280] flex items-center gap-1">
                          {isPeakHour(hour) && (
                            <Zap className="w-3 h-3 text-[#F59E0B]" />
                          )}
                          {formatHour(hour)}
                        </div>
                      </div>

                      {/* Day Cells */}
                      {DAYS_OF_WEEK.map(day => {
                        const isSelected = isSlotSelected(day.value, hour);
                        const isPeak = isPeakHour(hour);

                        return (
                          <button
                            key={`${day.value}-${hour}`}
                            onClick={() => handleSlotClick(day.value, hour)}
                            className={`
                              h-10 border-b border-l border-[#E5E7EB] transition-all
                              ${isSelected 
                                ? 'bg-[#D9480F] hover:bg-[#C13F0D]' 
                                : isPeak
                                  ? 'bg-[#FEF3C7] hover:bg-[#FDE68A]'
                                  : 'bg-white hover:bg-[#F9FAFB]'
                              }
                            `}
                            title={`${day.label} ${formatHour(hour)}${isPeak ? ' (Peak)' : ''}`}
                          >
                            <span className="sr-only">
                              {isSelected ? 'Selected' : 'Not selected'} - {day.label} {formatHour(hour)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {selectedSlotCount === 0 && (
              <p className="text-xs text-[#DC2626] mt-2">
                Please select at least one time slot
              </p>
            )}
          </div>

          {/* Ad Group Name */}
          <div className="max-w-[500px]">
            <h4 className="text-sm text-[#111827] mb-2">
              Ad Group Name <span className="text-[#DC2626]">*</span>
            </h4>
            <p className="text-xs text-[#6B7280] mb-3">
              Give this ad group a descriptive name (e.g., "Sunday Schedule", "Weekday Morning Ads")
            </p>
            <input
              type="text"
              value={data.name || ''}
              onChange={(e) => onUpdate({ name: e.target.value })}
              placeholder="e.g., Weekend Schedule"
              className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-md text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            />
          </div>
        </div>

        {/* Helper Info */}
        <div className="mt-6 p-4 bg-[#F0F9FF] border border-[#BAE6FD] rounded-lg flex items-start gap-3 max-w-[700px]">
          <Info className="w-5 h-5 text-[#0369A1] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-[#0369A1]">
              The schedule runs on the screens' local time zone. Peak hours (9 AM - 6 PM) are highlighted in yellow. Click any cell to add it to your schedule.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
