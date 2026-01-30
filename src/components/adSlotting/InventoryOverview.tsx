import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { 
  Search, 
  Filter, 
  X, 
  Eye,
  Calendar as CalendarIcon,
  MapPin,
  ShoppingBag,
  Plane,
  Bus,
  Dumbbell,
  Store,
  Utensils,
  MapPinIcon,
  TrendingUp,
  Users,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  mockMachines,
  mockMachineGroups,
  getAvailabilityForMachine,
} from '../../data/mockAdSlotting';
import { MachineGroup, MachineStatus } from '../../types/adSlotting';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { format } from 'date-fns';

export default function InventoryOverview() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState<MachineStatus | 'all'>('all');
  const [selectedVenueTypes, setSelectedVenueTypes] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState<string[]>(['venue-types']);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const venueTypeOptions = [
    { id: 'mall', label: 'Shopping Malls', icon: ShoppingBag, count: 0 },
    { id: 'airport', label: 'Airports', icon: Plane, count: 0 },
    { id: 'transit', label: 'Transit Hubs', icon: Bus, count: 0 },
    { id: 'gym', label: 'Gyms & Fitness', icon: Dumbbell, count: 0 },
    { id: 'retail', label: 'Retail Stores', icon: Store, count: 0 },
    { id: 'restaurant', label: 'Restaurants', icon: Utensils, count: 0 },
  ];

  const toggleVenueType = (venueId: string) => {
    setSelectedVenueTypes(prev =>
      prev.includes(venueId)
        ? prev.filter(id => id !== venueId)
        : [...prev, venueId]
    );
  };

  // Get machines for a group
  const getMachinesForGroup = (group: MachineGroup) => {
    return mockMachines.filter(m => group.machineIds.includes(m.id));
  };

  // Get group-level aggregated availability
  const getGroupAvailability = (group: MachineGroup) => {
    const machines = getMachinesForGroup(group);
    
    // For group-based booking, all devices share the same slot configuration
    // We use the first machine's availability as representative of the group
    if (machines.length === 0) return null;
    
    return getAvailabilityForMachine(machines[0].id);
  };

  // Get operating window for group (assumes all devices share same window)
  const getGroupOperatingWindow = (group: MachineGroup) => {
    const machines = getMachinesForGroup(group);
    if (machines.length === 0) return null;
    
    return machines[0].operatingHours;
  };

  // Check if group has peak windows configured
  const groupHasPeakSlots = (group: MachineGroup): boolean => {
    const machines = getMachinesForGroup(group);
    return machines.length > 0 && machines[0].peakWindows && machines[0].peakWindows.length > 0;
  };

  // Get location summary for group
  const getLocationSummary = (group: MachineGroup) => {
    const machines = getMachinesForGroup(group);
    const cities = [...new Set(machines.map(m => m.location.city))];
    const venues = [...new Set(machines.map(m => m.location.venue))];
    
    if (cities.length === 1 && venues.length === 1) {
      return `${cities[0]} • ${venues[0]}`;
    } else if (cities.length === 1) {
      return `${cities[0]} • ${venues.length} venues`;
    } else {
      return `${cities.length} cities • ${machines.length} locations`;
    }
  };

  // Apply filters
  const filteredGroups = useMemo(() => {
    return mockMachineGroups.filter(group => {
      const groupMachines = getMachinesForGroup(group);
      
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const groupNameMatch = group.name.toLowerCase().includes(query);
        const machineMatch = groupMachines.some(m => 
          m.name.toLowerCase().includes(query) ||
          m.location.city.toLowerCase().includes(query) ||
          m.location.venue.toLowerCase().includes(query)
        );
        if (!groupNameMatch && !machineMatch) return false;
      }

      // Status filter - group is included if any machine matches
      if (statusFilter !== 'all') {
        const hasMatchingStatus = groupMachines.some(m => m.status === statusFilter);
        if (!hasMatchingStatus) return false;
      }

      // Venue type filter
      if (selectedVenueTypes.length > 0) {
        const hasMatchingVenueType = groupMachines.some(m => 
          selectedVenueTypes.includes(m.location.venueType)
        );
        if (!hasMatchingVenueType) return false;
      }

      return true;
    });
  }, [searchQuery, statusFilter, selectedVenueTypes]);

  // Check if ANY group has peak slots (to determine if we show the column)
  const anyGroupHasPeakSlots = filteredGroups.some(groupHasPeakSlots);

  const handleViewGroupDetails = (group: MachineGroup) => {
    navigate(`/ad-slotting/groups/${group.id}`);
  };

  const handleClearFilters = () => {
    setStatusFilter('all');
    setSearchQuery('');
    setSelectedVenueTypes([]);
  };

  const activeFilterCount = [
    statusFilter !== 'all',
    searchQuery.length > 0,
    selectedVenueTypes.length > 0,
  ].filter(Boolean).length;

  // Get device count and online status for group
  const getGroupDeviceStats = (group: MachineGroup) => {
    const machines = getMachinesForGroup(group);
    const onlineCount = machines.filter(m => m.status === 'online').length;
    return { total: machines.length, online: onlineCount };
  };

  // Render slot blocks (group-level)
  const renderSlotBlocks = (occupied: number, total: number, maxBlocks: number = 12) => {
    const blocksToShow = Math.min(total, maxBlocks);
    const occupiedRatio = occupied / total;
    const occupiedBlocks = Math.floor(occupiedRatio * blocksToShow);

    return (
      <div className="flex gap-0.5 flex-wrap" style={{ maxWidth: '200px' }}>
        {Array.from({ length: blocksToShow }).map((_, index) => {
          const isOccupied = index < occupiedBlocks;
          return (
            <div
              key={index}
              className={`h-6 rounded-sm transition-colors ${
                isOccupied 
                  ? 'bg-gray-400' 
                  : 'bg-green-500'
              }`}
              style={{ 
                width: `calc(${100 / blocksToShow}% - 2px)`,
                minWidth: '14px'
              }}
              title={isOccupied ? 'Booked' : 'Available'}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="p-8">
      {/* Top Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Group name or Kiosk name..."
              className="w-full h-11 pl-10 pr-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            />
          </div>

          {/* Date Selector */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center justify-center gap-2 px-4 h-11 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">
                <CalendarIcon className="w-4 h-4" />
                <span className="text-base font-normal">{format(selectedDate, 'MMM dd, yyyy')}</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* Filters Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center justify-center gap-2 px-4 h-11 rounded-lg transition-colors whitespace-nowrap ${
              activeFilterCount > 0
                ? 'bg-[#D9480F] text-white hover:bg-[#C03F0E]'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="text-base font-normal">Filters</span>
            {activeFilterCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-white text-[#D9480F] text-xs font-semibold rounded">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Filters Sidebar */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-end" onClick={() => setShowFilters(false)}>
          {/* Sidebar Panel */}
          <div 
            className="h-full w-full sm:w-[480px] bg-white shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-200 flex items-start justify-between flex-shrink-0">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Filter className="w-5 h-5 text-[#D9480F]" />
                  <h2 className="text-base font-semibold text-gray-900">Smart Filters</h2>
                </div>
                <p className="text-sm text-gray-600">
                  Filter machines by venue type, location & availability
                </p>
              </div>
              <button
                onClick={() => setShowFilters(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Apply Filters Info Box */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Apply Filters to Find Machines</h3>
              <p className="text-xs text-gray-600">
                Select filters below to discover matching machines. Machines will update as you apply filters.
              </p>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {/* Venue Types Section */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('venue-types')}
                  className="w-full px-4 py-3 bg-gray-50 flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-4 h-4 text-gray-700" />
                    <span className="text-sm font-medium text-gray-900">Venue Types</span>
                  </div>
                  {expandedSections.includes('venue-types') ? (
                    <ChevronUp className="w-4 h-4 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  )}
                </button>
                
                {expandedSections.includes('venue-types') && (
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-3">
                      {venueTypeOptions.map((venue) => {
                        const isSelected = selectedVenueTypes.includes(venue.id);
                        const count = mockMachines.filter(m => m.location.venueType === venue.id).length;
                        
                        return (
                          <button
                            key={venue.id}
                            onClick={() => toggleVenueType(venue.id)}
                            className={`p-4 rounded-lg border-2 transition-all text-left ${ 
                              isSelected 
                                ? 'border-[#D9480F] bg-orange-50' 
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <venue.icon className={`w-8 h-8 mb-2 ${
                              isSelected ? 'text-[#D9480F]' : 'text-gray-700'
                            }`} />
                            <div className={`text-sm font-medium mb-1 ${
                              isSelected ? 'text-gray-900' : 'text-gray-900'
                            }`}>
                              {venue.label}
                            </div>
                            <div className="text-xs text-gray-600">{count} machines</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Location Tier Section */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('location-tier')}
                  className="w-full px-4 py-3 bg-gray-50 flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-700" />
                    <span className="text-sm font-medium text-gray-900">Location Tier</span>
                  </div>
                  {expandedSections.includes('location-tier') ? (
                    <ChevronUp className="w-4 h-4 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  )}
                </button>
                
                {expandedSections.includes('location-tier') && (
                  <div className="p-4">
                    <p className="text-xs text-gray-600">Location tier filters coming soon...</p>
                  </div>
                )}
              </div>

              {/* Availability Section */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('availability')}
                  className="w-full px-4 py-3 bg-gray-50 flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-gray-700" />
                    <span className="text-sm font-medium text-gray-900">Availability</span>
                  </div>
                  {expandedSections.includes('availability') ? (
                    <ChevronUp className="w-4 h-4 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  )}
                </button>
                
                {expandedSections.includes('availability') && (
                  <div className="p-4">
                    <p className="text-xs text-gray-600">Availability filters coming soon...</p>
                  </div>
                )}
              </div>

              {/* Machine Status Section */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('machine-status')}
                  className="w-full px-4 py-3 bg-gray-50 flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-700" />
                    <span className="text-sm font-medium text-gray-900">Machine Status</span>
                  </div>
                  {expandedSections.includes('machine-status') ? (
                    <ChevronUp className="w-4 h-4 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  )}
                </button>
                
                {expandedSections.includes('machine-status') && (
                  <div className="p-4 space-y-2">
                    {(['online', 'syncing', 'offline'] as MachineStatus[]).map((status) => {
                      const isSelected = statusFilter === status;
                      const count = mockMachines.filter(m => m.status === status).length;
                      
                      return (
                        <button
                          key={status}
                          onClick={() => setStatusFilter(isSelected ? 'all' : status)}
                          className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium text-left transition-colors ${
                            isSelected 
                              ? 'bg-[#D9480F] text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 border-t border-gray-200 flex gap-3 flex-shrink-0">
              <button
                onClick={handleClearFilters}
                className="flex-1 px-4 h-11 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-base font-medium"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="flex-1 px-4 h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors text-base font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Table Header - Sticky */}
        <div className="sticky top-0 z-10 border-b border-gray-200 bg-gray-50">
          <div className="hidden lg:grid lg:grid-cols-11 gap-4 px-6 py-4">
            <div className="col-span-3 text-sm font-medium text-gray-900">Group Name</div>
            <div className="col-span-1 text-sm font-medium text-gray-900 text-center">Devices</div>
            <div className="col-span-1 text-sm font-medium text-gray-900">Operating Window</div>
            {anyGroupHasPeakSlots && (
              <div className="col-span-2 text-sm font-medium text-gray-900">Peak Slots</div>
            )}
            <div className={`${anyGroupHasPeakSlots ? 'col-span-3' : 'col-span-5'} text-sm font-medium text-gray-900`}>
              Normal Slots
            </div>
            <div className="col-span-1 text-sm font-medium text-gray-900 text-center">Actions</div>
          </div>
        </div>

        {/* Table Body - Group Rows Only */}
        <div className="divide-y divide-gray-200">
          {filteredGroups.length > 0 ? (
            filteredGroups.map((group) => {
              const availability = getGroupAvailability(group);
              const operatingWindow = getGroupOperatingWindow(group);
              const hasPeakSlots = groupHasPeakSlots(group);
              const locationSummary = getLocationSummary(group);
              const deviceStats = getGroupDeviceStats(group);

              return (
                <div
                  key={group.id}
                  onClick={() => handleViewGroupDetails(group)}
                  className="grid grid-cols-1 lg:grid-cols-11 gap-4 px-6 py-5 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  {/* Mobile Layout */}
                  <div className="lg:hidden space-y-3">
                    <div>
                      <div className="font-semibold text-gray-900 text-base mb-1">{group.name}</div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-3 h-3" />
                        <span>{locationSummary}</span>
                      </div>
                      {group.description && (
                        <div className="text-sm text-gray-600 mt-1">{group.description}</div>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Devices: </span>
                        <span className="font-medium text-gray-900">{deviceStats.online}/{deviceStats.total} online</span>
                      </div>
                      {operatingWindow && (
                        <div>
                          <span className="text-gray-600">Hours: </span>
                          <span className="font-medium text-gray-900">
                            {operatingWindow.start} – {operatingWindow.end}
                          </span>
                        </div>
                      )}
                    </div>

                    {hasPeakSlots && availability && (
                      <div>
                        <div className="text-xs font-medium text-gray-700 mb-1">Peak Slots (Group-Level)</div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-semibold text-gray-900">
                            {availability.peakAvailability.total - availability.peakAvailability.occupied}/{availability.peakAvailability.total} free
                          </span>
                          <span className="text-xs text-gray-600">
                            {availability.peakAvailability.occupied} booked
                          </span>
                        </div>
                        {renderSlotBlocks(availability.peakAvailability.occupied, availability.peakAvailability.total)}
                      </div>
                    )}

                    {availability && (
                      <div>
                        <div className="text-xs font-medium text-gray-700 mb-1">Normal Slots (Group-Level)</div>
                        <div className="flex items-center">
                          <span className="text-sm font-semibold text-gray-900">
                            {availability.normalAvailability.total - availability.normalAvailability.occupied}/{availability.normalAvailability.total} free
                          </span>
                        </div>
                        {renderSlotBlocks(availability.normalAvailability.occupied, availability.normalAvailability.total)}
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewGroupDetails(group);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden lg:contents">
                    {/* Group Name with Description/Location */}
                    <div className="col-span-3">
                      <div className="font-semibold text-gray-900 text-base mb-1">{group.name}</div>
                      <div className="text-sm text-gray-600">{group.description || locationSummary}</div>
                    </div>

                    {/* Devices Count */}
                    <div className="col-span-1 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-base font-semibold text-gray-900">{deviceStats.total}</div>
                        <div className="text-xs text-gray-600">{deviceStats.online} online</div>
                      </div>
                    </div>

                    {/* Operating Window */}
                    <div className="col-span-1 flex items-center">
                      {operatingWindow ? (
                        <span className="text-sm text-gray-900">
                          {operatingWindow.start} – {operatingWindow.end}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500">—</span>
                      )}
                    </div>

                    {/* Peak Slots */}
                    {anyGroupHasPeakSlots && (
                      <div className="col-span-2">
                        {hasPeakSlots && availability ? (
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <span className="text-sm font-semibold text-gray-900">
                                {availability.peakAvailability.total - availability.peakAvailability.occupied}/{availability.peakAvailability.total} free
                              </span>
                            </div>
                            {renderSlotBlocks(availability.peakAvailability.occupied, availability.peakAvailability.total)}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">Not configured</span>
                        )}
                      </div>
                    )}

                    {/* Normal Slots */}
                    <div className={`${anyGroupHasPeakSlots ? 'col-span-3' : 'col-span-5'}`}>
                      {availability ? (
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <span className="text-sm font-semibold text-gray-900">
                              {availability.normalAvailability.total - availability.normalAvailability.occupied}/{availability.normalAvailability.total} free
                            </span>
                          </div>
                          {renderSlotBlocks(availability.normalAvailability.occupied, availability.normalAvailability.total)}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">No data</span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 flex items-center justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewGroupDetails(group);
                        }}
                        className="flex items-center justify-center w-9 h-9 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        title="View Group Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="px-6 py-12 text-center">
              <div className="text-base text-gray-500">No groups found</div>
              <div className="text-sm text-gray-400 mt-1">
                Try adjusting your search criteria
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}