import { useState, useEffect } from 'react';
import { X, Plus, Trash, Clock, Info } from 'lucide-react';
import { MachineGroup } from '../../types/adSlotting';
import { toast } from 'sonner@2.0.3';

interface PeakWindow {
  id: string;
  start: string;
  end: string;
}

interface OperatingHoursModalProps {
  group: MachineGroup;
  onClose: () => void;
  onSave: (operatingStart: string, operatingEnd: string, peakWindows: PeakWindow[]) => void;
}

export default function OperatingHoursModal({ group, onClose, onSave }: OperatingHoursModalProps) {
  const [operatingStart, setOperatingStart] = useState('06:00');
  const [operatingEnd, setOperatingEnd] = useState('23:00');
  const [peakWindows, setPeakWindows] = useState<PeakWindow[]>([
    { id: '1', start: '09:00', end: '10:00' },
    { id: '2', start: '17:00', end: '19:00' },
  ]);

  const handleAddWindow = () => {
    const newId = (Math.max(...peakWindows.map(w => parseInt(w.id)), 0) + 1).toString();
    setPeakWindows([...peakWindows, { id: newId, start: '09:00', end: '17:00' }]);
  };

  const handleRemoveWindow = (id: string) => {
    if (peakWindows.length === 1) {
      toast.error('At least one peak window is required');
      return;
    }
    setPeakWindows(peakWindows.filter(w => w.id !== id));
  };

  const handleWindowChange = (id: string, field: 'start' | 'end', value: string) => {
    setPeakWindows(peakWindows.map(w => 
      w.id === id ? { ...w, [field]: value } : w
    ));
  };

  const handleSave = () => {
    // Validation
    if (!operatingStart || !operatingEnd) {
      toast.error('Please set operating hours');
      return;
    }

    // Check if end time is after start time
    const startMinutes = parseInt(operatingStart.split(':')[0]) * 60 + parseInt(operatingStart.split(':')[1]);
    const endMinutes = parseInt(operatingEnd.split(':')[0]) * 60 + parseInt(operatingEnd.split(':')[1]);
    
    if (endMinutes <= startMinutes) {
      toast.error('Operating stop time must be after start time');
      return;
    }

    // Validate peak windows
    for (const window of peakWindows) {
      if (!window.start || !window.end) {
        toast.error('Please fill in all peak window times');
        return;
      }

      const windowStartMinutes = parseInt(window.start.split(':')[0]) * 60 + parseInt(window.start.split(':')[1]);
      const windowEndMinutes = parseInt(window.end.split(':')[0]) * 60 + parseInt(window.end.split(':')[1]);

      if (windowEndMinutes <= windowStartMinutes) {
        toast.error('Peak window end time must be after start time');
        return;
      }
    }

    onSave(operatingStart, operatingEnd, peakWindows);
    toast.success('Operating hours and peak windows configured successfully');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Modal */}
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 flex-shrink-0">
          <h3 className="text-gray-900 mb-1">{group.name}</h3>
          <p className="text-sm text-gray-600">
            Configure operating hours and peak windows
          </p>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Operating Hours Section */}
          <div className="mb-8">
            <h4 className="text-gray-900 mb-4">Operating Hours</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2 text-sm">
                  Operating Start Time <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="time"
                    value={operatingStart}
                    onChange={(e) => setOperatingStart(e.target.value)}
                    className="w-full h-11 px-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  />
                  <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2 text-sm">
                  Operating Stop Time <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="time"
                    value={operatingEnd}
                    onChange={(e) => setOperatingEnd(e.target.value)}
                    className="w-full h-11 px-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  />
                  <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Peak Windows Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-gray-900">Peak Windows</h4>
              <button
                onClick={handleAddWindow}
                className="flex items-center gap-1 px-4 h-9 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Window</span>
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              Define time ranges with premium pricing
            </p>

            {/* Peak Windows List */}
            <div className="space-y-4">
              {peakWindows.map((window, index) => (
                <div 
                  key={window.id} 
                  className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  {/* Number Badge */}
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#D9480F] text-white text-sm font-medium flex-shrink-0 mt-7">
                    {index + 1}
                  </div>

                  {/* Time Inputs */}
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-700 mb-2 text-sm">
                        Start Time
                      </label>
                      <div className="relative">
                        <input
                          type="time"
                          value={window.start}
                          onChange={(e) => handleWindowChange(window.id, 'start', e.target.value)}
                          className="w-full h-10 px-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent text-sm"
                        />
                        <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2 text-sm">
                        End Time
                      </label>
                      <div className="relative">
                        <input
                          type="time"
                          value={window.end}
                          onChange={(e) => handleWindowChange(window.id, 'end', e.target.value)}
                          className="w-full h-10 px-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent text-sm"
                        />
                        <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleRemoveWindow(window.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0 mt-7"
                    disabled={peakWindows.length === 1}
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Info Box */}
            <div className="mt-4 flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">
                All time outside these ranges is treated as Normal Hours
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 h-11 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}