import { useState } from 'react';
import { X, Clock, Film } from 'lucide-react';

interface ScheduleEvent {
  id: string;
  day: number;
  startHour: number;
  endHour: number;
  title: string;
  repeat: 'once' | 'daily' | 'weekly';
}

interface NewEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: ScheduleEvent) => void;
  initialDay: number;
  initialHour: number;
}

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function NewEventModal({ isOpen, onClose, onSave, initialDay, initialHour }: NewEventModalProps) {
  const [startHour, setStartHour] = useState(initialHour);
  const [endHour, setEndHour] = useState(initialHour + 3);
  const [repeat, setRepeat] = useState<'once' | 'daily' | 'weekly'>('weekly');

  if (!isOpen) return null;

  const formatHour = (hour: number): string => {
    if (hour === 0) return '12:00 AM';
    if (hour === 12) return '12:00 PM';
    if (hour < 12) return `${hour}:00 AM`;
    return `${hour - 12}:00 PM`;
  };

  const handleSave = () => {
    const newEvent: ScheduleEvent = {
      id: Date.now().toString(),
      day: initialDay,
      startHour,
      endHour,
      title: `${DAYS_OF_WEEK[initialDay]} Campaign`,
      repeat,
    };
    onSave(newEvent);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
          <h3 className="text-[#111827]">New Event</h3>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[#F9FAFB] text-[#6B7280] hover:text-[#111827]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Content Preview */}
          <div>
            <label className="block text-sm text-[#111827] mb-3">Content Preview</label>
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4 flex items-center gap-3">
              <div className="w-16 h-16 bg-[#E5E7EB] rounded flex items-center justify-center">
                <Film className="w-6 h-6 text-[#6B7280]" />
              </div>
              <div>
                <div className="text-sm text-[#111827]">Selected Playlist/Media</div>
                <div className="text-xs text-[#6B7280] mt-1">Will be displayed during this time slot</div>
              </div>
            </div>
          </div>

          {/* Day */}
          <div>
            <label className="block text-sm text-[#111827] mb-2">Day</label>
            <div className="px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm text-[#111827]">
              {DAYS_OF_WEEK[initialDay]}
            </div>
          </div>

          {/* Time Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#111827] mb-2">Start Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] pointer-events-none" />
                <select
                  value={startHour}
                  onChange={(e) => setStartHour(Number(e.target.value))}
                  className="w-full h-11 pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-md text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                >
                  {Array.from({ length: 24 }, (_, i) => i).map(hour => (
                    <option key={hour} value={hour}>{formatHour(hour)}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#111827] mb-2">End Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] pointer-events-none" />
                <select
                  value={endHour}
                  onChange={(e) => setEndHour(Number(e.target.value))}
                  className="w-full h-11 pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-md text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                >
                  {Array.from({ length: 24 }, (_, i) => i + 1).map(hour => (
                    <option key={hour} value={hour}>{formatHour(hour)}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Repeat Frequency */}
          <div>
            <label className="block text-sm text-[#111827] mb-2">Repeat</label>
            <select
              value={repeat}
              onChange={(e) => setRepeat(e.target.value as 'once' | 'daily' | 'weekly')}
              className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-md text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
            >
              <option value="once">Once</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
            <p className="text-xs text-[#6B7280] mt-2">
              {repeat === 'daily' && 'This event will repeat every day'}
              {repeat === 'weekly' && `This event will repeat every ${DAYS_OF_WEEK[initialDay]}`}
              {repeat === 'once' && 'This event will run only once'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-[#E5E7EB]">
          <button
            onClick={onClose}
            className="px-4 h-11 rounded-md bg-white border border-[#E5E7EB] text-[#111827] hover:bg-[#F9FAFB] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 h-11 rounded-md bg-[#3B82F6] text-white hover:bg-[#2563EB] transition-colors"
          >
            Add Event
          </button>
        </div>
      </div>
    </div>
  );
}
