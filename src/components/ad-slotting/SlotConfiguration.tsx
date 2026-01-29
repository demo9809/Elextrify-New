import { useState } from 'react';
import { Plus, Clock, Edit, Trash2, Copy, Check, X, DollarSign, ChevronDown, ChevronUp, Monitor, MapPin, Users, Wifi } from 'lucide-react';
import { SlotConfigurationModal } from './SlotConfigurationModal';
import { toast } from 'sonner';
import { mockMachineGroups, mockMachines } from '../../data/mockAdSlotting';

interface SlotConfig {
  id: string;
  name: string;
  masterSlotDuration: number; // seconds
  subSlotDuration: number; // seconds
  subSlotCount: number;
  peakPrice: number;
  nonPeakPrice: number;
  groupId: string; // Changed from deviceIds to groupId
  status: 'active' | 'draft';
  type: 'peak' | 'normal'; // Peak hours or normal hours
}

const MOCK_SLOT_CONFIGS: SlotConfig[] = [
  {
    id: 'sc1',
    name: 'Peak Hours Loop',
    masterSlotDuration: 120,
    subSlotDuration: 10,
    subSlotCount: 12,
    peakPrice: 15,
    nonPeakPrice: 8,
    groupId: 'grp-1',
    status: 'active',
    type: 'peak',
  },
  {
    id: 'sc2',
    name: 'Normal Hours Loop',
    masterSlotDuration: 120,
    subSlotDuration: 10,
    subSlotCount: 12,
    peakPrice: 15,
    nonPeakPrice: 8,
    groupId: 'grp-1',
    status: 'active',
    type: 'normal',
  },
  {
    id: 'sc3',
    name: 'Premium Peak Loop',
    masterSlotDuration: 60,
    subSlotDuration: 5,
    subSlotCount: 12,
    peakPrice: 25,
    nonPeakPrice: 15,
    groupId: 'grp-2',
    status: 'active',
    type: 'peak',
  },
];

export function SlotConfiguration() {
  const [configs, setConfigs] = useState<SlotConfig[]>(MOCK_SLOT_CONFIGS);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>('grp-1');
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedDevices, setExpandedDevices] = useState(false);

  const selectedGroup = mockMachineGroups.find(g => g.id === selectedGroupId);
  const groupConfigs = configs.filter(c => c.groupId === selectedGroupId);
  const groupDevices = selectedGroupId 
    ? mockMachines.filter(m => selectedGroup?.machineIds.includes(m.id))
    : [];

  const handleSave = (config: SlotConfig) => {
    if (editingId) {
      setConfigs(prev => prev.map(c => c.id === editingId ? config : c));
    } else {
      setConfigs(prev => [...prev, config]);
    }
    setIsCreating(false);
    setEditingId(null);
  };

  const handleDuplicate = (config: SlotConfig) => {
    const duplicated = {
      ...config,
      id: `sc${Date.now()}`,
      name: `${config.name} (Copy)`,
      status: 'draft' as const,
    };
    setConfigs(prev => [...prev, duplicated]);
    toast.success(`Configuration duplicated as "${duplicated.name}"`);
  };

  const handleDelete = (configId: string) => {
    const config = configs.find(c => c.id === configId);
    if (confirm(`Delete configuration "${config?.name}"? This cannot be undone.`)) {
      setConfigs(prev => prev.filter(c => c.id !== configId));
      toast.success('Configuration deleted');
    }
  };

  const getGroupStats = (groupId: string) => {
    const group = mockMachineGroups.find(g => g.id === groupId);
    if (!group) return { total: 0, online: 0, configCount: 0 };
    
    const devices = mockMachines.filter(m => group.machineIds.includes(m.id));
    const online = devices.filter(d => d.status === 'online').length;
    const configCount = configs.filter(c => c.groupId === groupId).length;
    
    return { total: devices.length, online, configCount };
  };

  const getGroupStatus = (groupId: string) => {
    const stats = getGroupStats(groupId);
    if (stats.online === stats.total) return 'online';
    if (stats.online === 0) return 'offline';
    return 'partial';
  };

  const getGroupLocation = (groupId: string) => {
    const group = mockMachineGroups.find(g => g.id === groupId);
    if (!group) return '';
    
    const devices = mockMachines.filter(m => group.machineIds.includes(m.id));
    const cities = [...new Set(devices.map(d => d.location.city))];
    const venues = [...new Set(devices.map(d => d.location.venue))];
    
    if (cities.length === 1 && venues.length === 1) {
      return `${cities[0]} • ${venues[0]}`;
    } else if (cities.length === 1) {
      return `${cities[0]} • ${venues.length} venues`;
    }
    return `${cities.length} cities`;
  };

  const editingConfig = editingId ? configs.find(c => c.id === editingId) : null;

  return (
    <div className="h-full flex bg-[#F9FAFB]">
      {/* Left Panel: Groups */}
      <div className="w-80 bg-white border-r border-[#E5E7EB] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E5E7EB]">
          <h2 className="text-base font-semibold text-[#111827] mb-1">Groups</h2>
          <p className="text-sm text-[#6B7280]">
            Select a group to configure shared slot architecture
          </p>
        </div>

        {/* Group List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {mockMachineGroups.map((group) => {
            const stats = getGroupStats(group.id);
            const status = getGroupStatus(group.id);
            const location = getGroupLocation(group.id);
            const isSelected = selectedGroupId === group.id;

            return (
              <button
                key={group.id}
                onClick={() => setSelectedGroupId(group.id)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  isSelected
                    ? 'border-[#D9480F] bg-orange-50'
                    : 'border-[#E5E7EB] bg-white hover:border-[#D9480F]/30'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-semibold text-[#111827]">{group.name}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    status === 'online'
                      ? 'bg-[#D1FAE5] text-[#16A34A]'
                      : status === 'offline'
                      ? 'bg-[#FEE2E2] text-[#DC2626]'
                      : 'bg-[#FEF3C7] text-[#F59E0B]'
                  }`}>
                    {status === 'online' ? 'Online' : status === 'offline' ? 'Offline' : 'Partial'}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                    <MapPin className="w-3 h-3" />
                    <span>{location}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                    <Monitor className="w-3 h-3" />
                    <span>{stats.total} kiosks</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                    <Clock className="w-3 h-3" />
                    <span>{stats.configCount} configs</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Panel: Configurations */}
      <div className="flex-1 flex flex-col">
        {selectedGroupId && selectedGroup ? (
          <>
            {/* Header */}
            <div className="bg-white border-b border-[#E5E7EB] px-8 py-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-semibold text-[#111827] mb-2">{selectedGroup.name}</h1>
                  <div className="flex items-center gap-4 text-sm text-[#6B7280] mb-3">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      <span>{getGroupLocation(selectedGroupId)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Monitor className="w-4 h-4" />
                      <span>{getGroupStats(selectedGroupId).total} devices</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>06:00 AM – 11:00 PM</span>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-[#D9480F] bg-orange-50 px-3 py-2 rounded-lg inline-block">
                    ⚠️ Slot configuration applies to all devices in this group
                  </p>
                </div>
                <button
                  onClick={() => setIsCreating(true)}
                  className="h-11 px-5 bg-[#D9480F] text-white rounded-lg hover:bg-[#C13F0D] transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">Add Configuration</span>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8">
              <div className="max-w-6xl mx-auto space-y-6">
                {/* Configuration Cards */}
                {groupConfigs.length > 0 ? (
                  groupConfigs.map((config) => (
                    <div key={config.id} className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
                      {/* Header */}
                      <div className="border-b border-[#E5E7EB] p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-[#111827]">{config.name}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                config.type === 'peak'
                                  ? 'bg-orange-100 text-[#D9480F]'
                                  : 'bg-blue-100 text-[#3B82F6]'
                              }`}>
                                {config.type === 'peak' ? 'Group Peak Hours' : 'Group Normal Hours'}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                config.status === 'active'
                                  ? 'bg-[#D1FAE5] text-[#16A34A]'
                                  : 'bg-[#F3F4F6] text-[#6B7280]'
                              }`}>
                                {config.status === 'active' ? 'Active' : 'Draft'}
                              </span>
                            </div>
                            <p className="text-sm text-[#6B7280]">
                              Applied across all devices in this group
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleDuplicate(config)}
                              className="w-9 h-9 flex items-center justify-center text-[#6B7280] hover:bg-[#F9FAFB] rounded-lg transition-colors"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingId(config.id)}
                              className="w-9 h-9 flex items-center justify-center text-[#6B7280] hover:bg-[#F9FAFB] rounded-lg transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(config.id)}
                              className="w-9 h-9 flex items-center justify-center text-[#DC2626] hover:bg-[#FEE2E2] rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Configuration Details */}
                      <div className="p-6">
                        <div className="grid grid-cols-4 gap-6">
                          {/* Master Slot */}
                          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <Clock className="w-4 h-4 text-[#6B7280]" />
                              <p className="text-xs font-semibold text-[#6B7280] uppercase">Loop Duration</p>
                            </div>
                            <p className="text-2xl font-semibold text-[#111827] mb-1">
                              {config.masterSlotDuration}s
                            </p>
                            <p className="text-xs text-[#9CA3AF]">
                              {Math.floor(config.masterSlotDuration / 60)}m {config.masterSlotDuration % 60}s loop
                            </p>
                          </div>

                          {/* Sub-Slot */}
                          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <Clock className="w-4 h-4 text-[#6B7280]" />
                              <p className="text-xs font-semibold text-[#6B7280] uppercase">Sub-Slot</p>
                            </div>
                            <p className="text-2xl font-semibold text-[#111827] mb-1">
                              {config.subSlotDuration}s
                            </p>
                            <p className="text-xs text-[#9CA3AF]">
                              {config.subSlotCount} positions
                            </p>
                          </div>

                          {/* Peak Pricing */}
                          <div className="bg-[#FFF7ED] border border-[#D9480F] rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <DollarSign className="w-4 h-4 text-[#D9480F]" />
                              <p className="text-xs font-semibold text-[#D9480F] uppercase">Peak Price</p>
                            </div>
                            <p className="text-2xl font-semibold text-[#D9480F] mb-1">
                              ${config.peakPrice}
                            </p>
                            <p className="text-xs text-[#9CA3AF]">
                              per position
                            </p>
                          </div>

                          {/* Non-Peak Pricing */}
                          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <DollarSign className="w-4 h-4 text-[#6B7280]" />
                              <p className="text-xs font-semibold text-[#6B7280] uppercase">Normal Price</p>
                            </div>
                            <p className="text-2xl font-semibold text-[#111827] mb-1">
                              ${config.nonPeakPrice}
                            </p>
                            <p className="text-xs text-[#9CA3AF]">
                              per position
                            </p>
                          </div>
                        </div>

                        {/* Visual Slot Division */}
                        <div className="mt-6">
                          <p className="text-xs font-semibold text-[#6B7280] uppercase mb-3">Loop Structure</p>
                          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                            <div className="flex gap-1">
                              {Array.from({ length: Math.min(config.subSlotCount, 24) }).map((_, idx) => (
                                <div
                                  key={idx}
                                  className="flex-1 h-12 bg-[#D1FAE5] border border-[#16A34A] rounded flex items-center justify-center"
                                >
                                  <span className="text-xs font-medium text-[#16A34A]">{idx + 1}</span>
                                </div>
                              ))}
                              {config.subSlotCount > 24 && (
                                <div className="flex items-center justify-center px-3 text-xs text-[#6B7280]">
                                  +{config.subSlotCount - 24} more
                                </div>
                              )}
                            </div>
                            <div className="mt-2 text-xs text-[#6B7280]">
                              Loop repeats every {config.masterSlotDuration}s with {config.subSlotCount} positions of {config.subSlotDuration}s each
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white border border-[#E5E7EB] rounded-xl p-12 text-center">
                    <Clock className="w-12 h-12 text-[#9CA3AF] mx-auto mb-4" />
                    <h3 className="text-base font-semibold text-[#111827] mb-2">No Configurations Yet</h3>
                    <p className="text-sm text-[#6B7280] mb-6">
                      Add your first slot configuration for this group
                    </p>
                    <button
                      onClick={() => setIsCreating(true)}
                      className="h-11 px-5 bg-[#D9480F] text-white rounded-lg hover:bg-[#C13F0D] transition-colors inline-flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span className="text-sm font-medium">Add Configuration</span>
                    </button>
                  </div>
                )}

                {/* Devices in Group (Informational) */}
                {groupDevices.length > 0 && (
                  <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedDevices(!expandedDevices)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#F9FAFB] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-[#6B7280]" />
                        <h3 className="text-sm font-semibold text-[#111827]">
                          Devices In This Group ({groupDevices.length})
                        </h3>
                      </div>
                      {expandedDevices ? (
                        <ChevronUp className="w-5 h-5 text-[#6B7280]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#6B7280]" />
                      )}
                    </button>

                    {expandedDevices && (
                      <div className="border-t border-[#E5E7EB]">
                        <table className="w-full">
                          <thead className="bg-[#F9FAFB]">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase">Device Name</th>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase">Location</th>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase">Status</th>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase">Last Sync</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#E5E7EB]">
                            {groupDevices.map((device) => (
                              <tr key={device.id}>
                                <td className="px-6 py-4 text-sm font-medium text-[#111827]">{device.name}</td>
                                <td className="px-6 py-4 text-sm text-[#6B7280]">
                                  {device.location.city}, {device.location.venue}
                                </td>
                                <td className="px-6 py-4">
                                  <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                                    device.status === 'online'
                                      ? 'bg-[#D1FAE5] text-[#16A34A]'
                                      : device.status === 'offline'
                                      ? 'bg-[#FEE2E2] text-[#DC2626]'
                                      : 'bg-[#FEF3C7] text-[#F59E0B]'
                                  }`}>
                                    <Wifi className="w-3 h-3" />
                                    {device.status === 'online' ? 'Online' : device.status === 'offline' ? 'Offline' : 'Syncing'}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-[#6B7280]">2 mins ago</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* Validation Rules */}
                <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-[#111827] mb-4">Configuration Rules</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#16A34A] mt-0.5" />
                      <p className="text-sm text-[#6B7280]">
                        <strong>Loop Duration</strong> must be evenly divisible by Sub-Slot Duration
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#16A34A] mt-0.5" />
                      <p className="text-sm text-[#6B7280]">
                        <strong>Minimum Sub-Slot Duration:</strong> 5 seconds
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#16A34A] mt-0.5" />
                      <p className="text-sm text-[#6B7280]">
                        <strong>Allowed Increments:</strong> 5s, 10s, 15s, 30s, 60s
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#16A34A] mt-0.5" />
                      <p className="text-sm text-[#6B7280]">
                        <strong>Group Scope:</strong> All configurations apply to every device in the selected group
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Users className="w-16 h-16 text-[#9CA3AF] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#111827] mb-2">Select a Group</h3>
              <p className="text-sm text-[#6B7280]">
                Choose a group from the left to view and manage its slot configurations
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Slot Configuration Modal */}
      {(isCreating || editingId) && selectedGroupId && (
        <SlotConfigurationModal
          onClose={() => {
            setIsCreating(false);
            setEditingId(null);
          }}
          onSave={handleSave}
          editingConfig={editingConfig}
          groupId={selectedGroupId}
          groupName={selectedGroup?.name || ''}
        />
      )}
    </div>
  );
}
