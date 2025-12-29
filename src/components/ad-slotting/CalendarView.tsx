import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Monitor, Info } from 'lucide-react';

interface CalendarSlot {
  date: string;
  deviceId: string;
  deviceName: string;
  openSlots: number;
  totalSlots: number;
  occupancyRate: number;
  peakRevenue: number;
  nonPeakRevenue: number;
}

interface CalendarViewProps {
  viewType: 'week' | 'month';
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  onSlotClick: (date: string, deviceId: string) => void;
}

export function CalendarView({ viewType, selectedDate, setSelectedDate, onSlotClick }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(selectedDate);

  const MOCK_DEVICES = [
    { id: 'd1', name: 'Mall Central - Screen A', location: 'NYC, NY' },
    { id: 'd2', name: 'Airport Terminal 1', location: 'LAX, CA' },
    { id: 'd3', name: 'Transit Hub Main', location: 'Chicago, IL' },
    { id: 'd4', name: 'Gym Entrance Screen', location: 'Miami, FL' },
    { id: 'd5', name: 'Retail Store Display', location: 'NYC, NY' },
  ];

  // Generate calendar dates
  const calendarDates = useMemo(() => {
    const dates: Date[] = [];
    const start = new Date(currentDate);
    
    if (viewType === 'week') {
      // Get start of week (Sunday)
      const day = start.getDay();
      start.setDate(start.getDate() - day);
      
      for (let i = 0; i < 7; i++) {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        dates.push(date);
      }
    } else {
      // Month view
      start.setDate(1);
      const month = start.getMonth();
      
      // Add days from previous month to fill first week
      const firstDay = start.getDay();
      for (let i = firstDay - 1; i >= 0; i--) {
        const date = new Date(start);
        date.setDate(date.getDate() - i - 1);
        dates.push(date);
      }
      
      // Add all days of current month
      while (start.getMonth() === month) {
        dates.push(new Date(start));
        start.setDate(start.getDate() + 1);
      }
      
      // Add days from next month to fill last week
      while (dates.length % 7 !== 0) {
        dates.push(new Date(start));
        start.setDate(start.getDate() + 1);
      }
    }
    
    return dates;
  }, [currentDate, viewType]);

  // Generate mock slot data
  const slotData = useMemo(() => {
    const data: CalendarSlot[] = [];
    
    calendarDates.forEach(date => {
      MOCK_DEVICES.forEach(device => {
        const totalSlots = 16; // 6 AM to 10 PM = 16 hours
        const openSlots = Math.floor(Math.random() * totalSlots);
        const occupancyRate = Math.round(((totalSlots - openSlots) / totalSlots) * 100);
        
        data.push({
          date: date.toISOString().split('T')[0],
          deviceId: device.id,
          deviceName: device.name,
          openSlots,
          totalSlots,
          occupancyRate,
          peakRevenue: Math.floor(Math.random() * 500) + 200,
          nonPeakRevenue: Math.floor(Math.random() * 300) + 100,
        });
      });
    });
    
    return data;
  }, [calendarDates]);

  const navigate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (viewType === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const getOccupancyColor = (rate: number) => {
    if (rate >= 80) return 'bg-[#FEE2E2] border-[#DC2626]'; // High occupancy (red)
    if (rate >= 50) return 'bg-[#FEF3C7] border-[#F59E0B]'; // Medium (yellow)
    return 'bg-[#D1FAE5] border-[#16A34A]'; // Low occupancy (green - available)
  };

  const getOccupancyLabel = (rate: number) => {
    if (rate >= 80) return 'Busy';
    if (rate >= 50) return 'Moderate';
    return 'Available';
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#F9FAFB] rounded-lg p-1">
              <button
                onClick={() => navigate('prev')}
                className="h-9 w-9 flex items-center justify-center rounded hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-[#6B7280]" />
              </button>
              <div className="px-4 py-2 min-w-[200px] text-center">
                <p className="text-sm font-semibold text-[#111827]">
                  {viewType === 'week' 
                    ? `Week of ${calendarDates[0]?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                    : currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                  }
                </p>
              </div>
              <button
                onClick={() => navigate('next')}
                className="h-9 w-9 flex items-center justify-center rounded hover:bg-white transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-[#6B7280]" />
              </button>
            </div>
            <button
              onClick={goToToday}
              className="h-9 px-4 bg-[#F9FAFB] text-[#111827] rounded-lg hover:bg-[#F3F4F6] text-sm font-medium"
            >
              Today
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 overflow-auto p-6">
        <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
          {/* Day Headers */}
          <div className="grid grid-cols-7 border-b border-[#E5E7EB] bg-[#F9FAFB]">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-3 text-center">
                <p className="text-xs font-semibold text-[#6B7280] uppercase">{day}</p>
              </div>
            ))}
          </div>

          {/* Calendar Cells */}
          <div className="grid grid-cols-7">
            {calendarDates.map((date, index) => {
              const dateStr = date.toISOString().split('T')[0];
              const deviceSlots = slotData.filter(s => s.date === dateStr);
              const avgOccupancy = deviceSlots.length > 0
                ? Math.round(deviceSlots.reduce((sum, s) => sum + s.occupancyRate, 0) / deviceSlots.length)
                : 0;
              const totalOpenSlots = deviceSlots.reduce((sum, s) => sum + s.openSlots, 0);

              return (
                <div
                  key={index}
                  className={`min-h-[140px] border-r border-b border-[#E5E7EB] p-3 ${
                    viewType === 'month' && !isCurrentMonth(date)
                      ? 'bg-[#FAFAFA]'
                      : 'bg-white hover:bg-[#F9FAFB]'
                  }`}
                >
                  {/* Date */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-sm font-semibold ${
                      isToday(date)
                        ? 'w-7 h-7 flex items-center justify-center rounded-full bg-[#D9480F] text-white'
                        : viewType === 'month' && !isCurrentMonth(date)
                        ? 'text-[#9CA3AF]'
                        : 'text-[#111827]'
                    }`}>
                      {date.getDate()}
                    </span>
                    {totalOpenSlots > 0 && (
                      <span className="text-[10px] font-medium text-[#16A34A] bg-[#D1FAE5] px-1.5 py-0.5 rounded">
                        {totalOpenSlots} open
                      </span>
                    )}
                  </div>

                  {/* Device Slots */}
                  <div className="space-y-1.5">
                    {deviceSlots.slice(0, 3).map((slot) => (
                      <button
                        key={`${slot.deviceId}-${slot.date}`}
                        onClick={() => onSlotClick(slot.date, slot.deviceId)}
                        className={`w-full p-2 rounded border-2 transition-all hover:shadow-md ${
                          getOccupancyColor(slot.occupancyRate)
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <Monitor className="w-3 h-3 text-[#6B7280] flex-shrink-0" />
                          <p className="text-[10px] font-medium text-[#111827] truncate flex-1 text-left">
                            {slot.deviceName.split('-')[0].trim()}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] text-[#6B7280]">
                            {slot.openSlots}/{slot.totalSlots} slots
                          </span>
                          <span className={`text-[9px] font-medium ${
                            slot.occupancyRate >= 80 
                              ? 'text-[#DC2626]'
                              : slot.occupancyRate >= 50
                              ? 'text-[#F59E0B]'
                              : 'text-[#16A34A]'
                          }`}>
                            {getOccupancyLabel(slot.occupancyRate)}
                          </span>
                        </div>
                      </button>
                    ))}
                    {deviceSlots.length > 3 && (
                      <button
                        onClick={() => onSlotClick(dateStr, '')}
                        className="w-full text-[10px] text-[#D9480F] hover:underline font-medium"
                      >
                        +{deviceSlots.length - 3} more devices
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center justify-center gap-6 p-4 bg-white border border-[#E5E7EB] rounded-xl">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded border-2 bg-[#D1FAE5] border-[#16A34A]" />
            <span className="text-sm text-[#6B7280]">Available (&lt;50%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded border-2 bg-[#FEF3C7] border-[#F59E0B]" />
            <span className="text-sm text-[#6B7280]">Moderate (50-79%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded border-2 bg-[#FEE2E2] border-[#DC2626]" />
            <span className="text-sm text-[#6B7280]">Busy (80%+)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#D9480F] flex items-center justify-center">
              <span className="text-xs font-semibold text-white">15</span>
            </div>
            <span className="text-sm text-[#6B7280]">Today</span>
          </div>
        </div>
      </div>
    </div>
  );
}