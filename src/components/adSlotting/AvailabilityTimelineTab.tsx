import { useState } from 'react';
import { Calendar, ChevronRight, AlertCircle, CheckCircle2, ChevronDown, ChevronUp, Maximize2, Minimize2 } from 'lucide-react';
import { addDays, format as formatDate, eachDayOfInterval, startOfDay } from 'date-fns';

interface TimelineSlot {
  position: number;
  timeRange: string;
  type: 'peak' | 'normal';
  price: number;
}

interface DayAvailability {
  date: Date;
  status: 'free' | 'booked' | 'partial';
  client?: string;
  campaign?: string;
  campaignStart?: Date;
  campaignEnd?: Date;
}

interface SlotTimeline {
  slot: TimelineSlot;
  days: DayAvailability[];
  isContinuous: boolean;
}

interface Props {
  totalPeakSlots: number;
  totalNormalSlots: number;
  hasPeakWindows: boolean;
}

export default function AvailabilityTimelineTab({ totalPeakSlots, totalNormalSlots, hasPeakWindows }: Props) {
  const [timelineRange, setTimelineRange] = useState<'7days' | '30days' | 'custom'>('7days');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [densityMode, setDensityMode] = useState<'compact' | 'detailed'>('compact');
  const [expandedGroup, setExpandedGroup] = useState<'peak' | 'normal' | 'both'>('peak');
  const [hoveredCell, setHoveredCell] = useState<{ slotPos: number; dayIndex: number } | null>(null);
  const [showCustomRange, setShowCustomRange] = useState(false);

  // Calculate date range
  const getDays = (): Date[] => {
    const today = startOfDay(new Date());
    
    if (timelineRange === '7days') {
      return eachDayOfInterval({
        start: today,
        end: addDays(today, 6),
      });
    } else if (timelineRange === '30days') {
      return eachDayOfInterval({
        start: today,
        end: addDays(today, 29),
      });
    } else if (timelineRange === 'custom' && customStartDate && customEndDate) {
      return eachDayOfInterval({
        start: new Date(customStartDate),
        end: new Date(customEndDate),
      });
    }
    
    return eachDayOfInterval({
      start: today,
      end: addDays(today, 6),
    });
  };

  const days = getDays();

  // Generate mock timeline data
  const generateTimelineData = (): SlotTimeline[] => {
    const timelines: SlotTimeline[] = [];
    
    // Generate peak slots
    if (hasPeakWindows && (expandedGroup === 'peak' || expandedGroup === 'both')) {
      for (let i = 1; i <= totalPeakSlots; i++) {
        const dayAvailabilities: DayAvailability[] = days.map((date, dayIndex) => {
          const isBooked = (i <= 6 && dayIndex < 4) || (i === 2 && dayIndex >= 4);
          
          if (isBooked) {
            return {
              date,
              status: 'booked' as const,
              client: i <= 6 ? 'Nike Sports' : 'Coca-Cola',
              campaign: i <= 6 ? 'Nike Spring Campaign' : 'Summer Refresh',
              campaignStart: addDays(new Date(), -5),
              campaignEnd: addDays(new Date(), 20),
            };
          }
          
          return {
            date,
            status: 'free' as const,
          };
        });
        
        const isContinuous = dayAvailabilities.every(d => d.status === 'free');
        
        timelines.push({
          slot: {
            position: i,
            timeRange: `0:${String((i - 1) * 10).padStart(2, '0')} – 0:${String(i * 10).padStart(2, '0')}`,
            type: 'peak',
            price: 500,
          },
          days: dayAvailabilities,
          isContinuous,
        });
      }
    }
    
    // Generate normal slots
    if (expandedGroup === 'normal' || expandedGroup === 'both') {
      for (let i = 1; i <= totalNormalSlots; i++) {
        const dayAvailabilities: DayAvailability[] = days.map((date, dayIndex) => {
          const isBooked = (i === 2 || i === 6) && dayIndex % 3 === 0;
          
          if (isBooked) {
            return {
              date,
              status: 'booked' as const,
              client: 'Coca-Cola',
              campaign: 'Summer Refresh',
              campaignStart: addDays(new Date(), -3),
              campaignEnd: addDays(new Date(), 15),
            };
          }
          
          return {
            date,
            status: 'free' as const,
          };
        });
        
        const isContinuous = dayAvailabilities.every(d => d.status === 'free');
        
        timelines.push({
          slot: {
            position: i,
            timeRange: `0:${String((i - 1) * 10).padStart(2, '0')} – 0:${String(i * 10).padStart(2, '0')}`,
            type: 'normal',
            price: 300,
          },
          days: dayAvailabilities,
          isContinuous,
        });
      }
    }
    
    return timelines;
  };

  const allTimelineData = generateTimelineData();
  
  // No filtering needed - expansion buttons control what's shown
  const filteredTimelines = allTimelineData;

  // Calculate forecast summary
  const continuousSlotsCount = allTimelineData.filter(t => t.isContinuous).length;
  const firstConflictDay = allTimelineData
    .flatMap(t => t.days.map((d, idx) => ({ day: d, idx, slot: t.slot })))
    .find(item => item.day.status === 'booked');
  
  const worstDayAvailability = days.map((day, dayIdx) => {
    const freeCount = allTimelineData.filter(t => t.days[dayIdx]?.status === 'free').length;
    return { day, freeCount };
  }).sort((a, b) => a.freeCount - b.freeCount)[0];

  const verdictType = continuousSlotsCount >= allTimelineData.length * 0.8 ? 'safe' : 
                       continuousSlotsCount >= allTimelineData.length * 0.4 ? 'partial' : 'not-suitable';

  return (
    <div className="space-y-4">
      {/* COMPACT DECISION BAR - Single Row, No Cards */}
      <div className="flex items-center justify-between gap-6 px-6 py-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center gap-8">
          {/* Continuous Slots */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Continuous:</span>
            <span className="text-lg font-semibold text-gray-900">
              {continuousSlotsCount}/{allTimelineData.length}
            </span>
          </div>

          {/* Worst Day */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Worst Day:</span>
            <span className="text-base font-medium text-gray-900">
              {worstDayAvailability?.freeCount || 0} free
            </span>
          </div>

          {/* First Conflict */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">First Conflict:</span>
            <span className="text-base font-medium text-gray-900">
              {firstConflictDay ? formatDate(firstConflictDay.day.date, 'MMM dd') : 'None'}
            </span>
          </div>

          {/* Verdict */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Verdict:</span>
            <span className={`text-base font-semibold ${
              verdictType === 'safe' ? 'text-green-700' :
              verdictType === 'partial' ? 'text-amber-700' :
              'text-red-700'
            }`}>
              {verdictType === 'safe' ? '✓ Safe' :
               verdictType === 'partial' ? '△ Partial' :
               '✗ Unsuitable'}
            </span>
          </div>
        </div>

        {/* Density Toggle */}
        <button
          onClick={() => setDensityMode(densityMode === 'compact' ? 'detailed' : 'compact')}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          title={densityMode === 'compact' ? 'Switch to detailed view' : 'Switch to compact view'}
        >
          {densityMode === 'compact' ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
          <span>{densityMode === 'compact' ? 'Detailed' : 'Compact'}</span>
        </button>
      </div>

      {/* INLINE CONTROL STRIP - All in One Line */}
      <div className="flex items-center justify-between gap-4">
        {/* Left: Date Range + Slot Type Filters */}
        <div className="flex items-center gap-2">
          {/* Date Range Selector */}
          <button
            onClick={() => { setTimelineRange('7days'); setShowCustomRange(false); }}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              timelineRange === '7days' && !showCustomRange
                ? 'bg-[#D9480F] text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
            }`}
          >
            7d
          </button>
          <button
            onClick={() => { setTimelineRange('30days'); setShowCustomRange(false); }}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              timelineRange === '30days' && !showCustomRange
                ? 'bg-[#D9480F] text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
            }`}
          >
            30d
          </button>
          <button
            onClick={() => setShowCustomRange(!showCustomRange)}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              showCustomRange
                ? 'bg-[#D9480F] text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
          </button>

          {/* Peak and Normal Slot Expansion Buttons */}
          {hasPeakWindows && (
            <>
              <button
                onClick={() => setExpandedGroup(expandedGroup === 'peak' ? 'both' : 'peak')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  expandedGroup === 'peak' || expandedGroup === 'both'
                    ? 'bg-amber-50 text-amber-700 border border-amber-300'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                }`}
              >
                {expandedGroup === 'peak' || expandedGroup === 'both' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                <span>Peak Slots ({totalPeakSlots})</span>
              </button>
              <button
                onClick={() => setExpandedGroup(expandedGroup === 'normal' ? 'both' : 'normal')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  expandedGroup === 'normal' || expandedGroup === 'both'
                    ? 'bg-blue-50 text-blue-700 border border-blue-300'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                }`}
              >
                {expandedGroup === 'normal' || expandedGroup === 'both' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                <span>Normal Slots ({totalNormalSlots})</span>
              </button>
            </>
          )}
        </div>

        {/* Right: Jump to Conflict */}
        {firstConflictDay && (
          <button
            onClick={() => {
              const element = document.querySelector(`[data-slot-pos="${firstConflictDay.slot.position}"]`);
              element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-[#D9480F] border border-[#D9480F] rounded-lg hover:bg-red-50 transition-colors"
          >
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Jump to Conflict</span>
          </button>
        )}
      </div>

      {/* Custom Date Range Input (Collapsible) */}
      {showCustomRange && (
        <div className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-lg">
          <input
            type="date"
            value={customStartDate}
            onChange={(e) => setCustomStartDate(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
          />
          <span className="text-sm text-gray-600">to</span>
          <input
            type="date"
            value={customEndDate}
            onChange={(e) => setCustomEndDate(e.target.value)}
            min={customStartDate}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
          />
        </div>
      )}

      {/* COMPACT TIMELINE GRID with Frozen Axes */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full">
              {/* Sticky Header */}
              <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-20">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-900 bg-gray-50 sticky left-0 z-30 border-r border-gray-200 w-32">
                    Slot
                  </th>
                  {days.map((day, idx) => (
                    <th
                      key={idx}
                      className="px-2 py-2 text-center text-xs font-medium text-gray-900 min-w-[60px]"
                    >
                      <div className="font-semibold">{formatDate(day, 'EEE')}</div>
                      <div className="text-gray-600 font-normal">{formatDate(day, 'M/d')}</div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Body */}
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredTimelines.map((timeline, slotIdx) => (
                  <tr
                    key={`${timeline.slot.type}-${timeline.slot.position}`}
                    data-slot-pos={timeline.slot.position}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Sticky Slot Label */}
                    <td className={`px-3 bg-white sticky left-0 z-10 border-r border-gray-200 ${
                      densityMode === 'compact' ? 'py-1' : 'py-2'
                    }`}>
                      <div className="flex items-center gap-2">
                        <div className={`flex items-center justify-center rounded-full text-xs font-semibold ${
                          densityMode === 'compact' ? 'w-6 h-6' : 'w-7 h-7'
                        } ${
                          timeline.slot.type === 'peak'
                            ? 'bg-amber-100 text-amber-700 border border-amber-300'
                            : 'bg-blue-100 text-blue-700 border border-blue-300'
                        }`}>
                          {timeline.slot.position}
                        </div>
                        {densityMode === 'detailed' && (
                          <div className="text-xs text-gray-600">
                            {timeline.slot.timeRange}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Timeline Cells */}
                    {timeline.days.map((dayAvail, dayIdx) => (
                      <td
                        key={dayIdx}
                        className={`px-1 text-center relative group ${
                          densityMode === 'compact' ? 'py-1' : 'py-1.5'
                        }`}
                        onMouseEnter={() => setHoveredCell({ slotPos: timeline.slot.position, dayIndex: dayIdx })}
                        onMouseLeave={() => setHoveredCell(null)}
                      >
                        <div className={`rounded flex items-center justify-center transition-all ${
                          densityMode === 'compact' ? 'h-8' : 'h-10'
                        } ${
                          dayAvail.status === 'free'
                            ? 'bg-green-50 border border-green-200'
                            : 'bg-red-50 border border-red-200'
                        }`}>
                          {dayAvail.status === 'free' ? (
                            <CheckCircle2 className={`text-green-600 ${densityMode === 'compact' ? 'w-4 h-4' : 'w-5 h-5'}`} />
                          ) : (
                            <div className={`rounded-full bg-red-500 ${densityMode === 'compact' ? 'w-2 h-2' : 'w-2.5 h-2.5'}`}></div>
                          )}
                        </div>

                        {/* Tooltip */}
                        {hoveredCell?.slotPos === timeline.slot.position && hoveredCell?.dayIndex === dayIdx && (
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-40 w-56 bg-gray-900 text-white text-xs rounded-lg shadow-lg p-3 pointer-events-none">
                            <div className="font-semibold mb-2">{formatDate(dayAvail.date, 'EEEE, MMM dd')}</div>
                            <div className="space-y-1">
                              {dayAvail.status === 'booked' && (
                                <>
                                  <div><span className="text-gray-400">Client:</span> {dayAvail.client}</div>
                                  <div><span className="text-gray-400">Campaign:</span> {dayAvail.campaign}</div>
                                  <div className="pt-1 border-t border-gray-700 text-gray-400 text-xs">
                                    Slot {timeline.slot.position} • {timeline.slot.type} • ${timeline.slot.price}
                                  </div>
                                </>
                              )}
                              {dayAvail.status === 'free' && (
                                <>
                                  <div className="text-green-400">Available</div>
                                  <div className="text-gray-400 text-xs">
                                    {timeline.slot.type} • ${timeline.slot.price}
                                  </div>
                                </>
                              )}
                            </div>
                            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Inline Legend - Single Row, Icon Only */}
      <div className="flex items-center gap-6 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-green-50 border border-green-200 rounded flex items-center justify-center">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
          </div>
          <span>Free</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-red-50 border border-red-200 rounded flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
          </div>
          <span>Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-amber-100 border border-amber-300 rounded flex items-center justify-center text-xs font-semibold text-amber-700">
            P
          </div>
          <span>Peak Slot</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-blue-100 border border-blue-300 rounded flex items-center justify-center text-xs font-semibold text-blue-700">
            N
          </div>
          <span>Normal Slot</span>
        </div>
      </div>

      {/* Booking Protection - Minimal */}
      {verdictType !== 'safe' && (
        <div className="flex items-start gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            {verdictType === 'partial' 
              ? 'Some slots unavailable in selected range. Return to "Slots (Today)" tab to book available positions.'
              : 'Limited availability. Campaign may experience delivery gaps.'}
          </div>
        </div>
      )}
    </div>
  );
}
