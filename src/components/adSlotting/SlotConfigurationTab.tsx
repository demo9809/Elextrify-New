import { useState } from 'react';
import { Plus, Edit, Trash2, AlertCircle, Monitor, Search, MapPin, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { mockSlotConfigurations, mockMachines, mockMachineGroups } from '../../data/mockAdSlotting';
import { SlotConfiguration, MachineGroup } from '../../types/adSlotting';
import SlotConfigurationModal from './SlotConfigurationModal';

export default function SlotConfigurationTab() {
  const [showModal, setShowModal] = useState(false);
  const [editingConfig, setEditingConfig] = useState<SlotConfiguration | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<MachineGroup | null>(mockMachineGroups[0] || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDevices, setShowDevices] = useState(false);

  const handleEdit = (config: SlotConfiguration) => {
    setEditingConfig(config);
    setShowModal(true);
  };

  const handleCreate = () => {
    if (!selectedGroup) return;
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
        return 'Group Peak Hours';
      case 'normal':
        return 'Group Normal Hours';
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

  const getGroupStatusColor = (status: string): string => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-700';
      case 'partially-offline':
        return 'bg-yellow-100 text-yellow-700';
      case 'offline':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
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

  // Get group status based on machines
  const getGroupStatus = (group: MachineGroup): string => {
    const groupMachines = mockMachines.filter(m => group.machineIds.includes(m.id));
    const onlineCount = groupMachines.filter(m => m.status === 'online').length;
    const totalCount = groupMachines.length;
    
    if (onlineCount === totalCount) return 'online';
    if (onlineCount === 0) return 'offline';
    return 'partially-offline';
  };

  // Get location summary for a group
  const getLocationSummary = (group: MachineGroup): string => {
    const groupMachines = mockMachines.filter(m => group.machineIds.includes(m.id));
    const cities = [...new Set(groupMachines.map(m => m.location.city))];
    return cities.join(', ');
  };

  // Get operating hours for a group (from first machine)
  const getGroupOperatingHours = (group: MachineGroup): string => {
    const firstMachine = mockMachines.find(m => group.machineIds.includes(m.id));
    return firstMachine 
      ? `${firstMachine.operatingHours.start} – ${firstMachine.operatingHours.end}`
      : 'N/A';
  };

  // Get configurations for selected group (using first machine ID as proxy)
  const groupConfigurations = selectedGroup
    ? mockSlotConfigurations.filter((config) => 
        selectedGroup.machineIds.includes(config.machineId)
      )
    : [];

  // Get machines in selected group
  const groupMachines = selectedGroup
    ? mockMachines.filter(m => selectedGroup.machineIds.includes(m.id))
    : [];

  // Filter groups based on search
  const filteredGroups = mockMachineGroups.filter((group) => {
    const groupMachines = mockMachines.filter(m => group.machineIds.includes(m.id));
    const searchLower = searchQuery.toLowerCase();
    
    return (
      group.name.toLowerCase().includes(searchLower) ||
      group.description?.toLowerCase().includes(searchLower) ||
      groupMachines.some(m => 
        m.name.toLowerCase().includes(searchLower) ||
        m.location.city.toLowerCase().includes(searchLower) ||
        m.location.venue.toLowerCase().includes(searchLower)
      )
    );
  });

  return (
    <div className="flex h-[calc(100vh-180px)]">
      {/* Left Panel - Group List */}
      <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <h3 className="text-gray-900 mb-1">Groups</h3>
          <p className="text-sm text-gray-600">
            Select a group to configure shared slot architecture
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
              placeholder="Search groups..."
              className="w-full h-11 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            />
          </div>
        </div>

        {/* Group List */}
        <div className="flex-1 overflow-y-auto">
          {filteredGroups.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredGroups.map((group) => {
                const configCount = mockSlotConfigurations.filter(
                  (c) => group.machineIds.includes(c.machineId)
                ).length;
                const isSelected = selectedGroup?.id === group.id;
                const groupStatus = getGroupStatus(group);
                const locationSummary = getLocationSummary(group);

                return (
                  <button
                    key={group.id}
                    onClick={() => setSelectedGroup(group)}
                    className={`w-full px-6 py-4 text-left transition-colors ${
                      isSelected
                        ? 'bg-orange-50 border-l-4 border-[#D9480F]'
                        : 'hover:bg-gray-50 border-l-4 border-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 mb-1 truncate">
                          {group.name}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{locationSummary}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-3 h-3 text-gray-400 flex-shrink-0" />
                          <span className="text-xs text-gray-500">
                            {group.machineIds.length} kiosk{group.machineIds.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getGroupStatusColor(
                              groupStatus
                            )}`}
                          >
                            {groupStatus === 'online' && 'Online'}
                            {groupStatus === 'partially-offline' && 'Partially Offline'}
                            {groupStatus === 'offline' && 'Offline'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {configCount} config{configCount !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              No groups found
            </div>
          )}
        </div>

        {/* Group Count */}
        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <div className="text-sm text-gray-600">
            Showing {filteredGroups.length} of {mockMachineGroups.length} groups
          </div>
        </div>
      </div>

      {/* Right Panel - Slot Configurations */}
      <div className="flex-1 bg-gray-50 flex flex-col overflow-hidden">
        {selectedGroup ? (
          <>
            {/* Header */}
            <div className="px-8 py-6 bg-white border-b border-gray-200 flex-shrink-0">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-gray-900">{selectedGroup.name}</h2>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getGroupStatusColor(
                        getGroupStatus(selectedGroup)
                      )}`}
                    >
                      {getGroupStatus(selectedGroup) === 'online' && 'Online'}
                      {getGroupStatus(selectedGroup) === 'partially-offline' && 'Partially Offline'}
                      {getGroupStatus(selectedGroup) === 'offline' && 'Offline'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{getLocationSummary(selectedGroup)}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{selectedGroup.machineIds.length} kiosks</span>
                    </div>
                    <span>•</span>
                    <span>Operating: {getGroupOperatingHours(selectedGroup)}</span>
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
              
              {/* Warning Box */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800 font-medium">
                  Slot configuration applies to all devices in this group.
                </p>
              </div>
            </div>

            {/* Configurations */}
            <div className="flex-1 overflow-y-auto p-8">
              {groupConfigurations.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
                    {groupConfigurations.map((config) => (
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
                          {/* Group scope subtext */}
                          <p className="text-xs text-gray-500 mt-2">
                            Applied across all devices in this group
                          </p>
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

                  {/* Devices Section - Collapsible */}
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <button
                      onClick={() => setShowDevices(!showDevices)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-gray-400" />
                        <h3 className="text-gray-900">Devices In This Group</h3>
                        <span className="text-sm text-gray-500">
                          ({groupMachines.length} kiosks)
                        </span>
                      </div>
                      {showDevices ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    
                    {showDevices && (
                      <div className="border-t border-gray-200">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Device Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Location
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Last Sync
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {groupMachines.map((machine) => (
                                <tr key={machine.id} className="hover:bg-gray-50">
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                      <Monitor className="w-4 h-4 text-gray-400" />
                                      <span className="text-sm font-medium text-gray-900">
                                        {machine.name}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {machine.location.city}, {machine.location.venue}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getMachineStatusColor(
                                        machine.status
                                      )}`}
                                    >
                                      {machine.status.charAt(0).toUpperCase() + machine.status.slice(1)}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    2 mins ago
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-gray-900 mb-2">No Slot Configurations</h3>
                  <p className="text-gray-600 mb-6">
                    This group doesn't have any slot configurations yet. Create one to start managing ad inventory.
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
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-gray-900 mb-2">No Group Selected</h3>
              <p className="text-gray-600">
                Select a group from the left panel to view and manage its slot configurations.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedGroup && (
        <SlotConfigurationModal
          config={editingConfig}
          machineId={selectedGroup.machineIds[0]} // Use first machine ID as proxy
          groupId={selectedGroup.id}
          groupName={selectedGroup.name}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}