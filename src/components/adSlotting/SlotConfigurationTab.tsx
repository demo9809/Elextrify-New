import { useState } from 'react';
import { Plus, Edit, Trash2, AlertCircle, Monitor, Search, MapPin } from 'lucide-react';
import { mockSlotConfigurations, mockMachines } from '../../data/mockAdSlotting';
import { SlotConfiguration, Machine } from '../../types/adSlotting';
import SlotConfigurationModal from './SlotConfigurationModal';

export default function SlotConfigurationTab() {
  const [showModal, setShowModal] = useState(false);
  const [editingConfig, setEditingConfig] = useState<SlotConfiguration | null>(null);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(mockMachines[0] || null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleEdit = (config: SlotConfiguration) => {
    setEditingConfig(config);
    setShowModal(true);
  };

  const handleCreate = () => {
    if (!selectedMachine) return;
    setEditingConfig(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingConfig(null);
  };

  const getApplicabilityLabel = (applicability: string): string => {
    switch (applicability) {
      case 'peak':
        return 'Peak Hours Only';
      case 'normal':
        return 'Normal Hours Only';
      default:
        return applicability;
    }
  };

  const getApplicabilityColor = (applicability: string): string => {
    switch (applicability) {
      case 'peak':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'normal':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getMachineStatusColor = (status: string): string => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-700';
      case 'syncing':
        return 'bg-yellow-100 text-yellow-700';
      case 'offline':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Get configurations for selected machine
  const machineConfigurations = selectedMachine
    ? mockSlotConfigurations.filter((config) => config.machineId === selectedMachine.id)
    : [];

  // Filter machines based on search
  const filteredMachines = mockMachines.filter((machine) =>
    machine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    machine.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    machine.location.venue.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-180px)]">
      {/* Left Panel - Machine List */}
      <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <h3 className="text-gray-900 mb-1">Machines</h3>
          <p className="text-sm text-gray-600">
            Select a machine to configure slots
          </p>
        </div>

        {/* Search */}
        <div className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search machines..."
              className="w-full h-11 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            />
          </div>
        </div>

        {/* Machine List */}
        <div className="flex-1 overflow-y-auto">
          {filteredMachines.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredMachines.map((machine) => {
                const configCount = mockSlotConfigurations.filter(
                  (c) => c.machineId === machine.id
                ).length;
                const isSelected = selectedMachine?.id === machine.id;

                return (
                  <button
                    key={machine.id}
                    onClick={() => setSelectedMachine(machine)}
                    className={`w-full px-6 py-4 text-left transition-colors ${
                      isSelected
                        ? 'bg-orange-50 border-l-4 border-[#D9480F]'
                        : 'hover:bg-gray-50 border-l-4 border-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 mb-1 truncate">
                          {machine.name}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">
                            {machine.location.city} • {machine.location.venue}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getMachineStatusColor(
                              machine.status
                            )}`}
                          >
                            {machine.status.charAt(0).toUpperCase() + machine.status.slice(1)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {configCount} config{configCount !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                      <Monitor className={`w-5 h-5 flex-shrink-0 ${
                        isSelected ? 'text-[#D9480F]' : 'text-gray-400'
                      }`} />
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              No machines found
            </div>
          )}
        </div>

        {/* Machine Count */}
        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <div className="text-sm text-gray-600">
            Showing {filteredMachines.length} of {mockMachines.length} machines
          </div>
        </div>
      </div>

      {/* Right Panel - Slot Configurations */}
      <div className="flex-1 bg-gray-50 flex flex-col overflow-hidden">
        {selectedMachine ? (
          <>
            {/* Header */}
            <div className="px-8 py-6 bg-white border-b border-gray-200 flex-shrink-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-gray-900">{selectedMachine.name}</h2>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getMachineStatusColor(
                        selectedMachine.status
                      )}`}
                    >
                      {selectedMachine.status.charAt(0).toUpperCase() + selectedMachine.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {selectedMachine.location.city}, {selectedMachine.location.country}
                      </span>
                    </div>
                    <span>•</span>
                    <span>{selectedMachine.location.venue}</span>
                    <span>•</span>
                    <span>
                      Operating: {selectedMachine.operatingHours.start} – {selectedMachine.operatingHours.end}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleCreate}
                  className="flex items-center gap-2 px-4 h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors flex-shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Configuration</span>
                </button>
              </div>
            </div>

            {/* Configurations */}
            <div className="flex-1 overflow-y-auto p-8">
              {machineConfigurations.length > 0 ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {machineConfigurations.map((config) => (
                    <div
                      key={config.id}
                      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                    >
                      {/* Header */}
                      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-gray-900 mb-1">{config.name}</h3>
                            <div
                              className={`inline-flex items-center px-2 py-1 rounded-lg border text-xs font-medium ${getApplicabilityColor(
                                config.applicability
                              )}`}
                            >
                              {getApplicabilityLabel(config.applicability)}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEdit(config)}
                              className="p-2 text-gray-600 hover:text-[#D9480F] hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        {/* Slot Structure */}
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <div className="text-sm text-gray-600 mb-1">Loop Duration</div>
                            <div className="text-lg font-semibold text-gray-900">
                              {config.loopDuration}s
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600 mb-1">Sub-Slot</div>
                            <div className="text-lg font-semibold text-gray-900">
                              {config.subSlotDuration}s
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600 mb-1">Positions</div>
                            <div className="text-lg font-semibold text-gray-900">
                              {config.totalPositions}
                            </div>
                          </div>
                        </div>

                        {/* Visual Loop Breakdown */}
                        <div>
                          <div className="text-sm text-gray-600 mb-2">Loop Structure</div>
                          <div className="flex gap-1 overflow-x-auto pb-2">
                            {Array.from({ length: Math.min(config.totalPositions, 12) }).map((_, i) => (
                              <div
                                key={i}
                                className="flex-shrink-0 w-12 h-12 bg-gray-100 border border-gray-300 rounded flex items-center justify-center text-xs text-gray-600"
                              >
                                {config.subSlotDuration}s
                              </div>
                            ))}
                            {config.totalPositions > 12 && (
                              <div className="flex-shrink-0 w-12 h-12 bg-gray-50 border border-gray-200 rounded flex items-center justify-center text-xs text-gray-400">
                                +{config.totalPositions - 12}
                              </div>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Blank sub-slots automatically play internal filler content
                          </div>
                        </div>

                        {/* Pricing */}
                        <div className="pt-4 border-t border-gray-200">
                          <div className="text-sm text-gray-600 mb-2">Pricing</div>
                          <div className="grid grid-cols-2 gap-4">
                            {config.pricing.peakPrice !== undefined && (
                              <div>
                                <div className="text-xs text-gray-500 mb-1">Peak Price</div>
                                <div className="text-lg font-semibold text-gray-900">
                                  ${config.pricing.peakPrice}
                                  <span className="text-sm text-gray-600 font-normal">
                                    /{config.subSlotDuration}s
                                  </span>
                                </div>
                              </div>
                            )}
                            {config.pricing.normalPrice !== undefined && (
                              <div>
                                <div className="text-xs text-gray-500 mb-1">Normal Price</div>
                                <div className="text-lg font-semibold text-gray-900">
                                  ${config.pricing.normalPrice}
                                  <span className="text-sm text-gray-600 font-normal">
                                    /{config.subSlotDuration}s
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-gray-900 mb-2">No Slot Configurations</h3>
                  <p className="text-gray-600 mb-6">
                    This machine doesn't have any slot configurations yet. Create one to start managing ad inventory.
                  </p>
                  <button
                    onClick={handleCreate}
                    className="inline-flex items-center gap-2 px-4 h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create First Configuration</span>
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <Monitor className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-gray-900 mb-2">No Machine Selected</h3>
              <p className="text-gray-600">
                Select a machine from the left panel to view and manage its slot configurations.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedMachine && (
        <SlotConfigurationModal
          config={editingConfig}
          machineId={selectedMachine.id}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
