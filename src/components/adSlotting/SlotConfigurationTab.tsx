import { useState } from 'react';
import { Plus, Edit, Trash2, AlertCircle, Monitor, Search, MapPin, Users, ChevronDown, ChevronUp, Settings, Clock } from 'lucide-react';
import { mockSlotConfigurations, mockMachines, mockMachineGroups } from '../../data/mockAdSlotting';
import { SlotConfiguration, MachineGroup } from '../../types/adSlotting';
import SlotConfigurationModal from './SlotConfigurationModal';
import OperatingHoursModal from './OperatingHoursModal';
import { toast } from 'sonner@2.0.3';

export default function SlotConfigurationTab() {
  const [showModal, setShowModal] = useState(false);
  const [editingConfig, setEditingConfig] = useState<SlotConfiguration | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<MachineGroup | null>(mockMachineGroups[0] || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDevices, setShowDevices] = useState(false);
  const [showOperatingHoursModal, setShowOperatingHoursModal] = useState(false);
  
  // Track which groups have configured operating hours
  // Pre-populate some groups for client demo
  const [groupsWithOperatingHours, setGroupsWithOperatingHours] = useState<Set<string>>(
    new Set([
      'grp-001', // Mall Group - Times Square
      'grp-003', // Transit Hub Group - Chicago
    ])
  );

  const handleEdit = (config: SlotConfiguration) => {
    setEditingConfig(config);
    setShowModal(true);
  };

  const handleCreate = () => {
    if (!selectedGroup) return;
    
    // Check if operating hours are configured
    if (!groupsWithOperatingHours.has(selectedGroup.id)) {
      toast.error('Please configure operating hours first before adding slot configurations');
      return;
    }
    
    setEditingConfig(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingConfig(null);
  };

  const handleConfigureOperatingHours = () => {
    if (!selectedGroup) return;
    setShowOperatingHoursModal(true);
  };

  const handleSaveOperatingHours = (
    operatingStart: string,
    operatingEnd: string,
    peakWindows: Array<{ id: string; start: string; end: string }>
  ) => {
    // In a real app, this would save to backend
    console.log('Saving operating hours:', { operatingStart, operatingEnd, peakWindows });
    
    // Mark this group as having configured operating hours
    if (selectedGroup) {
      setGroupsWithOperatingHours(new Set([...groupsWithOperatingHours, selectedGroup.id]));
    }
    
    setShowOperatingHoursModal(false);
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
    if (!group.machineIds || group.machineIds.length === 0) return 'offline';
    const groupMachines = mockMachines.filter(m => group.machineIds.includes(m.id));
    const onlineCount = groupMachines.filter(m => m.status === 'online').length;
    const totalCount = groupMachines.length;
    
    if (onlineCount === totalCount) return 'online';
    if (onlineCount === 0) return 'offline';
    return 'partially-offline';
  };

  // Get location summary for a group
  const getLocationSummary = (group: MachineGroup): string => {
    if (!group.machineIds || group.machineIds.length === 0) return 'N/A';
    const groupMachines = mockMachines.filter(m => group.machineIds.includes(m.id));
    const cities = [...new Set(groupMachines.map(m => m.location.city))];
    return cities.length > 0 ? cities.join(', ') : 'N/A';
  };

  // Get operating hours for a group (from first machine)
  const getGroupOperatingHours = (group: MachineGroup): string => {
    if (!group.machineIds || group.machineIds.length === 0) return 'N/A';
    const firstMachine = mockMachines.find(m => group.machineIds.includes(m.id));
    return firstMachine 
      ? `${firstMachine.operatingHours.start} – ${firstMachine.operatingHours.end}`
      : 'N/A';
  };

  // Get configurations for selected group (using first machine ID as proxy)
  const groupConfigurations = selectedGroup && selectedGroup.machineIds && selectedGroup.machineIds.length > 0
    ? mockSlotConfigurations.filter((config) => 
        selectedGroup.machineIds.includes(config.machineId)
      )
    : [];

  // Get machines in selected group
  const groupMachines = selectedGroup && selectedGroup.machineIds && selectedGroup.machineIds.length > 0
    ? mockMachines.filter(m => selectedGroup.machineIds.includes(m.id))
    : [];

  // Filter groups based on search
  const filteredGroups = mockMachineGroups.filter((group) => {
    if (!group.machineIds) return false;
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

  // Helper function to get slot configuration count for a group
  const getGroupConfigCount = (group: MachineGroup): number => {
    if (!group.machineIds || group.machineIds.length === 0) return 0;
    return mockSlotConfigurations.filter(config => 
      group.machineIds.includes(config.machineId)
    ).length;
  };

  // Check if selected group has operating hours configured
  const hasOperatingHours = selectedGroup ? groupsWithOperatingHours.has(selectedGroup.id) : false;

  return (
    <div className="flex gap-6 h-full">
      {/* Left Panel: Group List */}
      <div className="w-[400px] flex-shrink-0 bg-white border border-gray-200 rounded-lg p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Groups</h3>
          <p className="text-sm text-gray-600">Select a group to configure shared slot architecture</p>
        </div>

        {/* Search */}
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 h-11 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
          />
        </div>

        {/* Group List */}
        <div className="space-y-2 max-h-[calc(100vh-340px)] overflow-y-auto">
          {filteredGroups.map((group) => {
            const configCount = getGroupConfigCount(group);
            const groupMachinesForCard = mockMachines.filter(m => group.machineIds?.includes(m.id));
            const groupStatus = getGroupStatus(group);
            const locationSummary = getLocationSummary(group);
            const machineCount = group.machineIds?.length || 0;
            
            return (
              <button
                key={group.id}
                onClick={() => setSelectedGroup(group)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  selectedGroup?.id === group.id
                    ? 'border-[#D9480F] bg-orange-50 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 text-sm">{group.name}</h4>
                  {groupStatus === 'online' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
                      Online
                    </span>
                  )}
                  {groupStatus === 'partially-offline' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-600" />
                      Partially Offline
                    </span>
                  )}
                  {groupStatus === 'offline' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                      Offline
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{locationSummary}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>{machineCount} kiosk{machineCount !== 1 ? 's' : ''}</span>
                  </div>
                </div>
                {configCount > 0 && (
                  <div className="text-xs text-gray-500">
                    {configCount} config{configCount !== 1 ? 's' : ''}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-4 text-sm text-gray-500">
          Showing {filteredGroups.length} of {mockMachineGroups.length} groups
        </div>
      </div>

      {/* Right Panel: Group Details & Slot Configurations */}
      <div className="flex-1 bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col">
        {selectedGroup ? (
          <>
            {/* Group Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{selectedGroup.name}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      <span>{getLocationSummary(selectedGroup)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      <span>{selectedGroup.machineIds?.length || 0} kiosks</span>
                    </div>
                    {hasOperatingHours && (
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>Operating: 06:00 – 23:00</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Operating Hours Settings Button */}
                  <button
                    onClick={() => setShowOperatingHoursModal(true)}
                    className="inline-flex items-center gap-2 px-4 h-11 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                  {/* Add Slots Button - Disabled if no operating hours */}
                  <button
                    onClick={() => {
                      setEditingConfig(null);
                      setShowModal(true);
                    }}
                    disabled={!hasOperatingHours}
                    className={`inline-flex items-center gap-2 px-4 h-11 rounded-lg text-sm font-semibold transition-all ${
                      hasOperatingHours
                        ? 'bg-[#D9480F] text-white hover:bg-[#B8380C] shadow-sm'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    title={!hasOperatingHours ? 'Configure operating hours first' : 'Add new slot configuration'}
                  >
                    <Plus className="w-4 h-4" />
                    Add Slots
                  </button>
                </div>
              </div>

              {getGroupStatus(selectedGroup) === 'partially-offline' && (
                <div className="mt-3 inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-600" />
                  Partially Offline
                </div>
              )}
            </div>

            {/* Configurations */}
            <div className="flex-1 overflow-y-auto p-8">
              {/* Only show configurations if operating hours are configured */}
              {!groupsWithOperatingHours.has(selectedGroup.id) ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                  <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-gray-900 mb-2">Configure Operating Hours First</h3>
                  <p className="text-gray-600 mb-6">
                    Set up operating hours and peak windows before creating slot configurations.
                  </p>
                  <button
                    onClick={handleConfigureOperatingHours}
                    className="inline-flex items-center gap-2 px-4 h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Configure Operating Hours</span>
                  </button>
                </div>
              ) : groupConfigurations.length > 0 ? (
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

      {/* Operating Hours Modal */}
      {showOperatingHoursModal && selectedGroup && (
        <OperatingHoursModal
          group={selectedGroup}
          onClose={() => setShowOperatingHoursModal(false)}
          onSave={handleSaveOperatingHours}
        />
      )}
    </div>
  );
}