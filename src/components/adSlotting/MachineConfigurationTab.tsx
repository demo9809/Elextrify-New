import { useState } from 'react';
import { Plus, Edit, Trash2, Clock, Info, Monitor, Search } from 'lucide-react';
import { mockMachines } from '../../data/mockAdSlotting';
import { Machine, PeakWindow } from '../../types/adSlotting';
import { toast } from 'sonner@2.0.3';

export default function MachineConfigurationTab() {
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [operatingStart, setOperatingStart] = useState('');
  const [operatingEnd, setOperatingEnd] = useState('');
  const [peakWindows, setPeakWindows] = useState<PeakWindow[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMachines = mockMachines.filter((machine) => {
    const query = searchQuery.toLowerCase();
    return (
      machine.name.toLowerCase().includes(query) ||
      machine.location.city.toLowerCase().includes(query) ||
      machine.location.venue.toLowerCase().includes(query)
    );
  });

  const handleEdit = (machine: Machine) => {
    setSelectedMachine(machine);
    setOperatingStart(machine.operatingHours.start);
    setOperatingEnd(machine.operatingHours.end);
    setPeakWindows([...machine.peakWindows]);
    setEditMode(true);
  };

  const handleAddPeakWindow = () => {
    const newWindow: PeakWindow = {
      id: `pw-${Date.now()}`,
      startTime: '09:00',
      endTime: '10:00',
    };
    setPeakWindows([...peakWindows, newWindow]);
  };

  const handleRemovePeakWindow = (id: string) => {
    setPeakWindows(peakWindows.filter((w) => w.id !== id));
  };

  const handleUpdatePeakWindow = (
    id: string,
    field: 'startTime' | 'endTime',
    value: string
  ) => {
    setPeakWindows(
      peakWindows.map((w) => (w.id === id ? { ...w, [field]: value } : w))
    );
  };

  const handleSave = () => {
    if (!operatingStart || !operatingEnd) {
      toast.error('Please set operating hours');
      return;
    }

    if (peakWindows.length === 0) {
      toast.error('Please add at least one peak window');
      return;
    }

    toast.success('Machine configuration updated');
    setEditMode(false);
    setSelectedMachine(null);
  };

  const handleCancel = () => {
    setEditMode(false);
    setSelectedMachine(null);
  };

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Machine List */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-gray-900">Machines</h3>
            <p className="text-sm text-gray-600 mt-1">Select a machine to configure</p>
          </div>
          <div className="divide-y divide-gray-200">
            <div className="p-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search machines..."
                className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              />
            </div>
            {filteredMachines.map((machine) => (
              <button
                key={machine.id}
                onClick={() => handleEdit(machine)}
                className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                  selectedMachine?.id === machine.id ? 'bg-orange-50' : ''
                }`}
              >
                <div className="font-medium text-gray-900 mb-1">{machine.name}</div>
                <div className="text-sm text-gray-600 mb-2">
                  {machine.location.city} • {machine.location.venue}
                </div>
                <div className="text-xs text-gray-500">
                  {machine.operatingHours.start} – {machine.operatingHours.end} •{' '}
                  {machine.peakWindows.length} peak windows
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Configuration Form */}
        <div className="lg:col-span-2">
          {editMode && selectedMachine ? (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-gray-900">{selectedMachine.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Configure operating hours and peak windows
                </p>
              </div>

              <div className="p-6 space-y-6">
                {/* Operating Hours */}
                <div>
                  <h4 className="text-gray-900 mb-4">Operating Hours</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Operating Start Time <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="time"
                        value={operatingStart}
                        onChange={(e) => setOperatingStart(e.target.value)}
                        className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Operating Stop Time <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="time"
                        value={operatingEnd}
                        onChange={(e) => setOperatingEnd(e.target.value)}
                        className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Peak Windows */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-gray-900">Peak Windows</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Define time ranges with premium pricing
                      </p>
                    </div>
                    <button
                      onClick={handleAddPeakWindow}
                      className="flex items-center gap-2 px-4 h-9 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Window</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {peakWindows.length > 0 ? (
                      peakWindows.map((window, index) => (
                        <div
                          key={window.id}
                          className="p-4 border border-gray-200 rounded-lg bg-gray-50"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#D9480F] text-white text-sm font-medium flex-shrink-0">
                              {index + 1}
                            </div>
                            <div className="flex-1 grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs text-gray-600 mb-1">
                                  Start Time
                                </label>
                                <input
                                  type="time"
                                  value={window.startTime}
                                  onChange={(e) =>
                                    handleUpdatePeakWindow(
                                      window.id,
                                      'startTime',
                                      e.target.value
                                    )
                                  }
                                  className="w-full h-9 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-gray-600 mb-1">
                                  End Time
                                </label>
                                <input
                                  type="time"
                                  value={window.endTime}
                                  onChange={(e) =>
                                    handleUpdatePeakWindow(
                                      window.id,
                                      'endTime',
                                      e.target.value
                                    )
                                  }
                                  className="w-full h-9 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent text-sm"
                                />
                              </div>
                            </div>
                            <button
                              onClick={() => handleRemovePeakWindow(window.id)}
                              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center border border-dashed border-gray-300 rounded-lg">
                        <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <div className="text-sm text-gray-600 mb-3">No peak windows defined</div>
                        <button
                          onClick={handleAddPeakWindow}
                          className="inline-flex items-center gap-2 px-4 h-9 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors text-sm"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add First Peak Window</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 flex items-start gap-2 text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>
                      All time outside these ranges is treated as Normal Hours
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={handleCancel}
                  className="px-6 h-11 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors"
                >
                  Save Configuration
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <Monitor className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-gray-900 mb-2">Select a Machine</h3>
              <p className="text-gray-600">
                Choose a machine from the list to configure its operating hours and peak windows
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}