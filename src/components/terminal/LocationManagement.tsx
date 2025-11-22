import { useState } from 'react';
import { 
  Plus,
  Edit,
  Trash2,
  X,
  MapPin,
  Building,
  Folder,
  ChevronRight,
  Monitor
} from 'lucide-react';

interface Region {
  id: string;
  name: string;
  description?: string;
}

interface Location {
  id: string;
  regionId: string;
  name: string;
  address?: string;
}

interface Group {
  id: string;
  locationId: string;
  name: string;
  description?: string;
  deviceCount: number;
}

const MOCK_REGIONS: Region[] = [
  { id: 'reg-1', name: 'North America', description: 'USA and Canada' },
  { id: 'reg-2', name: 'Europe', description: 'EU regions' },
];

const MOCK_LOCATIONS: Location[] = [
  { id: 'loc-1', regionId: 'reg-1', name: 'Times Square Mall', address: 'New York, NY' },
  { id: 'loc-2', regionId: 'reg-1', name: 'Central Park Transit', address: 'New York, NY' },
  { id: 'loc-3', regionId: 'reg-1', name: 'LAX Airport', address: 'Los Angeles, CA' },
];

const MOCK_GROUPS: Group[] = [
  { id: 'grp-1', locationId: 'loc-1', name: 'NYC Premium', description: 'High traffic areas', deviceCount: 2 },
  { id: 'grp-2', locationId: 'loc-3', name: 'LA Airports', description: 'Airport terminals', deviceCount: 1 },
];

interface LocationManagementProps {
  onBack: () => void;
}

type ModalType = 'region' | 'location' | 'group' | null;
type ActionType = 'create' | 'edit';

export function LocationManagement({ onBack }: LocationManagementProps) {
  const [regions, setRegions] = useState<Region[]>(MOCK_REGIONS);
  const [locations, setLocations] = useState<Location[]>(MOCK_LOCATIONS);
  const [groups, setGroups] = useState<Group[]>(MOCK_GROUPS);
  
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  
  const [modalType, setModalType] = useState<ModalType>(null);
  const [actionType, setActionType] = useState<ActionType>('create');
  const [editingItem, setEditingItem] = useState<any>(null);

  const handleOpenModal = (type: ModalType, action: ActionType, item?: any) => {
    setModalType(type);
    setActionType(action);
    setEditingItem(item || null);
  };

  const handleCloseModal = () => {
    setModalType(null);
    setEditingItem(null);
  };

  const handleDeleteRegion = (regionId: string) => {
    const hasLocations = locations.some(l => l.regionId === regionId);
    if (hasLocations) {
      alert('Cannot delete region with existing locations');
      return;
    }
    if (confirm('Delete this region?')) {
      setRegions(regions.filter(r => r.id !== regionId));
    }
  };

  const handleDeleteLocation = (locationId: string) => {
    const hasGroups = groups.some(g => g.locationId === locationId);
    if (hasGroups) {
      alert('Cannot delete location with existing groups');
      return;
    }
    if (confirm('Delete this location?')) {
      setLocations(locations.filter(l => l.id !== locationId));
    }
  };

  const handleDeleteGroup = (groupId: string) => {
    const group = groups.find(g => g.id === groupId);
    if (group && group.deviceCount > 0) {
      if (!confirm(`This group has ${group.deviceCount} device(s). Delete anyway?`)) return;
    }
    setGroups(groups.filter(g => g.id !== groupId));
  };

  const selectedRegionLocations = selectedRegion 
    ? locations.filter(l => l.regionId === selectedRegion)
    : [];

  const selectedLocationGroups = selectedLocation
    ? groups.filter(g => g.locationId === selectedLocation)
    : [];

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[#111827] mb-2">Location & Grouping Management</h1>
          <p className="text-[#6B7280]">
            Organize terminals using a three-level hierarchy: Region → Location → Group
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Regions */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#6B7280]" />
                <h3 className="text-[#111827]">Regions</h3>
              </div>
              <button
                onClick={() => handleOpenModal('region', 'create')}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#D9480F] text-white hover:bg-[#C23D0D] transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="divide-y divide-[#E5E7EB] max-h-[600px] overflow-y-auto">
              {regions.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <MapPin className="w-8 h-8 text-[#E5E7EB] mx-auto mb-2" />
                  <p className="text-sm text-[#9CA3AF]">No regions yet</p>
                </div>
              ) : (
                regions.map(region => (
                  <div
                    key={region.id}
                    className={`px-6 py-4 cursor-pointer transition-colors ${
                      selectedRegion === region.id
                        ? 'bg-[#FEF2F2] border-l-4 border-[#D9480F]'
                        : 'hover:bg-[#F9FAFB]'
                    }`}
                    onClick={() => {
                      setSelectedRegion(region.id);
                      setSelectedLocation(null);
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#111827] font-medium mb-0.5 truncate">
                          {region.name}
                        </p>
                        {region.description && (
                          <p className="text-xs text-[#6B7280] truncate">
                            {region.description}
                          </p>
                        )}
                        <p className="text-xs text-[#9CA3AF] mt-1">
                          {locations.filter(l => l.regionId === region.id).length} location(s)
                        </p>
                      </div>
                      <div className="flex items-center gap-1 ml-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenModal('region', 'edit', region);
                          }}
                          className="w-7 h-7 flex items-center justify-center rounded hover:bg-white text-[#6B7280] hover:text-[#D9480F] transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteRegion(region.id);
                          }}
                          className="w-7 h-7 flex items-center justify-center rounded hover:bg-white text-[#6B7280] hover:text-[#DC2626] transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Locations */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-[#6B7280]" />
                <h3 className="text-[#111827]">Locations</h3>
              </div>
              <button
                onClick={() => handleOpenModal('location', 'create')}
                disabled={!selectedRegion}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#D9480F] text-white hover:bg-[#C23D0D] disabled:bg-[#E5E7EB] disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="divide-y divide-[#E5E7EB] max-h-[600px] overflow-y-auto">
              {!selectedRegion ? (
                <div className="px-6 py-12 text-center">
                  <Building className="w-8 h-8 text-[#E5E7EB] mx-auto mb-2" />
                  <p className="text-sm text-[#9CA3AF]">Select a region first</p>
                </div>
              ) : selectedRegionLocations.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <Building className="w-8 h-8 text-[#E5E7EB] mx-auto mb-2" />
                  <p className="text-sm text-[#9CA3AF]">No locations in this region</p>
                </div>
              ) : (
                selectedRegionLocations.map(location => (
                  <div
                    key={location.id}
                    className={`px-6 py-4 cursor-pointer transition-colors ${
                      selectedLocation === location.id
                        ? 'bg-[#FEF2F2] border-l-4 border-[#D9480F]'
                        : 'hover:bg-[#F9FAFB]'
                    }`}
                    onClick={() => setSelectedLocation(location.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#111827] font-medium mb-0.5 truncate">
                          {location.name}
                        </p>
                        {location.address && (
                          <p className="text-xs text-[#6B7280] truncate">
                            {location.address}
                          </p>
                        )}
                        <p className="text-xs text-[#9CA3AF] mt-1">
                          {groups.filter(g => g.locationId === location.id).length} group(s)
                        </p>
                      </div>
                      <div className="flex items-center gap-1 ml-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenModal('location', 'edit', location);
                          }}
                          className="w-7 h-7 flex items-center justify-center rounded hover:bg-white text-[#6B7280] hover:text-[#D9480F] transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteLocation(location.id);
                          }}
                          className="w-7 h-7 flex items-center justify-center rounded hover:bg-white text-[#6B7280] hover:text-[#DC2626] transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Groups */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-[#6B7280]" />
                <h3 className="text-[#111827]">Groups</h3>
              </div>
              <button
                onClick={() => handleOpenModal('group', 'create')}
                disabled={!selectedLocation}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#D9480F] text-white hover:bg-[#C23D0D] disabled:bg-[#E5E7EB] disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="divide-y divide-[#E5E7EB] max-h-[600px] overflow-y-auto">
              {!selectedLocation ? (
                <div className="px-6 py-12 text-center">
                  <Folder className="w-8 h-8 text-[#E5E7EB] mx-auto mb-2" />
                  <p className="text-sm text-[#9CA3AF]">Select a location first</p>
                </div>
              ) : selectedLocationGroups.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <Folder className="w-8 h-8 text-[#E5E7EB] mx-auto mb-2" />
                  <p className="text-sm text-[#9CA3AF]">No groups in this location</p>
                </div>
              ) : (
                selectedLocationGroups.map(group => (
                  <div
                    key={group.id}
                    className="px-6 py-4 hover:bg-[#F9FAFB] transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#111827] font-medium mb-0.5 truncate">
                          {group.name}
                        </p>
                        {group.description && (
                          <p className="text-xs text-[#6B7280] truncate mb-1">
                            {group.description}
                          </p>
                        )}
                        <div className="flex items-center gap-1 text-xs text-[#9CA3AF]">
                          <Monitor className="w-3 h-3" />
                          <span>{group.deviceCount} device(s)</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 ml-2">
                        <button
                          onClick={() => handleOpenModal('group', 'edit', group)}
                          className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#F3F4F6] text-[#6B7280] hover:text-[#D9480F] transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteGroup(group.id)}
                          className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#FEE2E2] text-[#6B7280] hover:text-[#DC2626] transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Hierarchy Visualization */}
        {selectedRegion && (
          <div className="mt-8 bg-white border border-[#E5E7EB] rounded-xl p-6">
            <h3 className="text-[#111827] mb-4">Hierarchy Path</h3>
            <div className="flex items-center gap-2 text-sm">
              <span className="px-3 py-1.5 bg-[#F3F4F6] text-[#111827] rounded-lg">
                {regions.find(r => r.id === selectedRegion)?.name}
              </span>
              {selectedLocation && (
                <>
                  <ChevronRight className="w-4 h-4 text-[#9CA3AF]" />
                  <span className="px-3 py-1.5 bg-[#F3F4F6] text-[#111827] rounded-lg">
                    {locations.find(l => l.id === selectedLocation)?.name}
                  </span>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {modalType === 'region' && (
        <RegionModal
          action={actionType}
          region={editingItem}
          onClose={handleCloseModal}
          onSave={(data) => {
            if (actionType === 'create') {
              setRegions([...regions, { id: `reg-${Date.now()}`, ...data }]);
            } else {
              setRegions(regions.map(r => r.id === editingItem.id ? { ...r, ...data } : r));
            }
            handleCloseModal();
          }}
        />
      )}

      {modalType === 'location' && (
        <LocationModal
          action={actionType}
          location={editingItem}
          regionId={selectedRegion!}
          onClose={handleCloseModal}
          onSave={(data) => {
            if (actionType === 'create') {
              setLocations([...locations, { id: `loc-${Date.now()}`, regionId: selectedRegion!, ...data }]);
            } else {
              setLocations(locations.map(l => l.id === editingItem.id ? { ...l, ...data } : l));
            }
            handleCloseModal();
          }}
        />
      )}

      {modalType === 'group' && (
        <GroupModal
          action={actionType}
          group={editingItem}
          locationId={selectedLocation!}
          onClose={handleCloseModal}
          onSave={(data) => {
            if (actionType === 'create') {
              setGroups([...groups, { id: `grp-${Date.now()}`, locationId: selectedLocation!, deviceCount: 0, ...data }]);
            } else {
              setGroups(groups.map(g => g.id === editingItem.id ? { ...g, ...data } : g));
            }
            handleCloseModal();
          }}
        />
      )}
    </div>
  );
}

// Region Modal Component
function RegionModal({ action, region, onClose, onSave }: any) {
  const [name, setName] = useState(region?.name || '');
  const [description, setDescription] = useState(region?.description || '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-[480px]">
        <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
          <h3 className="text-[#111827]">{action === 'create' ? 'Create' : 'Edit'} Region</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F9FAFB]">
            <X className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">Region Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 px-3 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
              placeholder="e.g., North America"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-10 px-3 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
              placeholder="Optional description"
            />
          </div>
        </div>
        <div className="px-6 py-4 border-t border-[#E5E7EB] flex justify-end gap-3">
          <button onClick={onClose} className="px-4 h-10 border border-[#E5E7EB] rounded-lg text-sm text-[#6B7280] hover:bg-[#F9FAFB]">
            Cancel
          </button>
          <button
            onClick={() => onSave({ name, description })}
            disabled={!name.trim()}
            className="px-4 h-10 bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] disabled:bg-[#E5E7EB] disabled:text-[#9CA3AF]"
          >
            {action === 'create' ? 'Create' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Location Modal Component
function LocationModal({ action, location, regionId, onClose, onSave }: any) {
  const [name, setName] = useState(location?.name || '');
  const [address, setAddress] = useState(location?.address || '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-[480px]">
        <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
          <h3 className="text-[#111827]">{action === 'create' ? 'Create' : 'Edit'} Location</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F9FAFB]">
            <X className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">Location Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 px-3 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
              placeholder="e.g., Times Square Mall"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full h-10 px-3 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
              placeholder="Optional address"
            />
          </div>
        </div>
        <div className="px-6 py-4 border-t border-[#E5E7EB] flex justify-end gap-3">
          <button onClick={onClose} className="px-4 h-10 border border-[#E5E7EB] rounded-lg text-sm text-[#6B7280] hover:bg-[#F9FAFB]">
            Cancel
          </button>
          <button
            onClick={() => onSave({ name, address })}
            disabled={!name.trim()}
            className="px-4 h-10 bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] disabled:bg-[#E5E7EB] disabled:text-[#9CA3AF]"
          >
            {action === 'create' ? 'Create' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Group Modal Component
function GroupModal({ action, group, locationId, onClose, onSave }: any) {
  const [name, setName] = useState(group?.name || '');
  const [description, setDescription] = useState(group?.description || '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-[480px]">
        <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
          <h3 className="text-[#111827]">{action === 'create' ? 'Create' : 'Edit'} Group</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F9FAFB]">
            <X className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">Group Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 px-3 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
              placeholder="e.g., NYC Premium"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-10 px-3 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
              placeholder="Optional description"
            />
          </div>
        </div>
        <div className="px-6 py-4 border-t border-[#E5E7EB] flex justify-end gap-3">
          <button onClick={onClose} className="px-4 h-10 border border-[#E5E7EB] rounded-lg text-sm text-[#6B7280] hover:bg-[#F9FAFB]">
            Cancel
          </button>
          <button
            onClick={() => onSave({ name, description })}
            disabled={!name.trim()}
            className="px-4 h-10 bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] disabled:bg-[#E5E7EB] disabled:text-[#9CA3AF]"
          >
            {action === 'create' ? 'Create' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}