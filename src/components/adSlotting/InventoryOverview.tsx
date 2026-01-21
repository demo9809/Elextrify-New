import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Plus, Eye, Search, Download, Filter, X, ChevronDown, MapPin, TrendingUp, Users, ShoppingBag, Plane, Bus, Dumbbell, Store, UtensilsCrossed, Clock } from 'lucide-react';
import {
  mockMachines,
  getAvailabilityForMachine,
  getMachineStatusColor,
  getAvailabilityColor,
} from '../../data/mockAdSlotting';
import { Machine, AvailabilityStatus, MachineStatus } from '../../types/adSlotting';
import CreateBookingModal from './CreateBookingModal';

export default function InventoryOverview() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState<MachineStatus | 'all'>('all');
  const [selectedVenues, setSelectedVenues] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [availabilityFilter, setAvailabilityFilter] = useState<AvailabilityStatus | 'all'>('all');
  
  // Collapsible sections state
  const [venueTypesExpanded, setVenueTypesExpanded] = useState(true);
  const [locationExpanded, setLocationExpanded] = useState(false);
  const [availabilityExpanded, setAvailabilityExpanded] = useState(false);

  // Extract unique cities and venues for filters
  const uniqueCities = Array.from(new Set(mockMachines.map(m => m.location.city))).sort();
  const uniqueVenues = Array.from(new Set(mockMachines.map(m => m.location.venue))).sort();
  
  // Venue type configuration with icons and counts
  const venueTypes = [
    { 
      id: 'Shopping Mall', 
      label: 'Shopping Malls', 
      icon: ShoppingBag,
      count: mockMachines.filter(m => m.location.venue === 'Shopping Mall').length 
    },
    { 
      id: 'Airport', 
      label: 'Airports', 
      icon: Plane,
      count: mockMachines.filter(m => m.location.venue === 'Airport').length 
    },
    { 
      id: 'Transit Hub', 
      label: 'Transit Hubs', 
      icon: Bus,
      count: mockMachines.filter(m => m.location.venue === 'Transit Hub').length 
    },
    { 
      id: 'Gym', 
      label: 'Gyms & Fitness', 
      icon: Dumbbell,
      count: mockMachines.filter(m => m.location.venue === 'Gym').length 
    },
    { 
      id: 'Retail Store', 
      label: 'Retail Stores', 
      icon: Store,
      count: mockMachines.filter(m => m.location.venue === 'Retail Store').length 
    },
    { 
      id: 'Restaurant', 
      label: 'Restaurants', 
      icon: UtensilsCrossed,
      count: mockMachines.filter(m => m.location.venue === 'Restaurant').length 
    },
  ];

  const toggleVenue = (venueId: string) => {
    setSelectedVenues(prev => 
      prev.includes(venueId) 
        ? prev.filter(v => v !== venueId)
        : [...prev, venueId]
    );
  };

  const toggleCity = (city: string) => {
    setSelectedCities(prev => 
      prev.includes(city) 
        ? prev.filter(c => c !== city)
        : [...prev, city]
    );
  };

  const filteredMachines = mockMachines.filter((machine) => {
    const query = searchQuery.toLowerCase();
    const statusMatch = statusFilter === 'all' || machine.status === statusFilter;
    const cityMatch = selectedCities.length === 0 || selectedCities.includes(machine.location.city);
    const venueMatch = selectedVenues.length === 0 || selectedVenues.includes(machine.location.venue);
    const availabilityMatch = availabilityFilter === 'all' || (getAvailabilityForMachine(machine.id) && getAvailabilityForMachine(machine.id)!.peakAvailability.status === availabilityFilter);
    return (
      machine.name.toLowerCase().includes(query) ||
      machine.location.city.toLowerCase().includes(query) ||
      machine.location.venue.toLowerCase().includes(query)
    ) && statusMatch && cityMatch && venueMatch && availabilityMatch;
  });

  const getAvailabilityLabel = (status: AvailabilityStatus): string => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'limited':
        return 'Limited';
      case 'full':
        return 'Full';
      default:
        return 'Unknown';
    }
  };

  const handleCreateBooking = (machine: Machine) => {
    setSelectedMachine(machine);
    setShowBookingModal(true);
  };

  const handleViewDetails = (machine: Machine) => {
    setSelectedMachine(machine);
    navigate(`/ad-slotting/machines/${machine.id}`);
  };

  const handleClearFilters = () => {
    setStatusFilter('all');
    setSelectedCities([]);
    setSelectedVenues([]);
    setAvailabilityFilter('all');
  };

  const activeFilterCount = [
    statusFilter !== 'all',
    selectedCities.length > 0,
    selectedVenues.length > 0,
    availabilityFilter !== 'all'
  ].filter(Boolean).length;

  return (
    <div className="p-8">
      {/* Summary Stats */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">Total Machines</div>
          <div className="text-2xl font-semibold text-gray-900">{mockMachines.length}</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">Online</div>
          <div className="text-2xl font-semibold text-green-600">
            {mockMachines.filter((m) => m.status === 'online').length}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">Syncing</div>
          <div className="text-2xl font-semibold text-yellow-600">
            {mockMachines.filter((m) => m.status === 'syncing').length}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">Offline</div>
          <div className="text-2xl font-semibold text-red-600">
            {mockMachines.filter((m) => m.status === 'offline').length}
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search machines, locations..."
              className="w-full h-11 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 h-11 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">
            <Download className="w-4 h-4" />
            <span>Export Inventory</span>
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 h-11 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Filters Right Sidebar */}
      {showFilters && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowFilters(false)}
          />
          
          {/* Sidebar */}
          <div className="fixed right-0 top-0 h-full w-[480px] bg-white shadow-2xl z-50 flex flex-col">
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-200 flex items-start justify-between flex-shrink-0">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Filter className="w-5 h-5 text-[#D9480F]" />
                  <h2 className="text-gray-900 font-semibold">Smart Filters</h2>
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

            {/* Info Banner */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex-shrink-0">
              <div className="text-sm font-medium text-gray-900 mb-1">
                Apply Filters to Find Machines
              </div>
              <div className="text-xs text-gray-600">
                Select filters below to discover matching machines. Machines will update as you apply filters.
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Venue Types Section */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setVenueTypesExpanded(!venueTypesExpanded)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">Venue Types</span>
                  </div>
                  <ChevronDown 
                    className={`w-4 h-4 text-gray-600 transition-transform ${
                      venueTypesExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {venueTypesExpanded && (
                  <div className="p-4 grid grid-cols-2 gap-3">
                    {venueTypes.map((venue) => {
                      const Icon = venue.icon;
                      const isSelected = selectedVenues.includes(venue.id);
                      
                      return (
                        <button
                          key={venue.id}
                          onClick={() => toggleVenue(venue.id)}
                          className={`p-4 rounded-lg border-2 transition-all text-left ${
                            isSelected 
                              ? 'border-[#D9480F] bg-[#FEF2F2]' 
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <Icon className={`w-6 h-6 mb-2 ${
                            isSelected ? 'text-[#D9480F]' : 'text-gray-600'
                          }`} />
                          <div className={`text-sm font-medium mb-1 ${
                            isSelected ? 'text-[#D9480F]' : 'text-gray-900'
                          }`}>
                            {venue.label}
                          </div>
                          <div className="text-xs text-gray-600">
                            {venue.count} machines
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Location Tier Section */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setLocationExpanded(!locationExpanded)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">Location Tier</span>
                  </div>
                  <ChevronDown 
                    className={`w-4 h-4 text-gray-600 transition-transform ${
                      locationExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {locationExpanded && (
                  <div className="p-4 space-y-3">
                    <div>
                      <div className="text-xs font-medium text-gray-700 mb-2">Cities</div>
                      <div className="flex flex-wrap gap-2">
                        {uniqueCities.map(city => {
                          const isSelected = selectedCities.includes(city);
                          const count = mockMachines.filter(m => m.location.city === city).length;
                          
                          return (
                            <button
                              key={city}
                              onClick={() => toggleCity(city)}
                              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                isSelected 
                                  ? 'bg-[#D9480F] text-white' 
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {city} ({count})
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Availability Section */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setAvailabilityExpanded(!availabilityExpanded)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">Availability</span>
                  </div>
                  <ChevronDown 
                    className={`w-4 h-4 text-gray-600 transition-transform ${
                      availabilityExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {availabilityExpanded && (
                  <div className="p-4 space-y-2">
                    {(['available', 'limited', 'full'] as AvailabilityStatus[]).map((status) => {
                      const isSelected = availabilityFilter === status;
                      
                      return (
                        <button
                          key={status}
                          onClick={() => setAvailabilityFilter(isSelected ? 'all' : status)}
                          className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium text-left transition-colors ${
                            isSelected 
                              ? 'bg-[#D9480F] text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {getAvailabilityLabel(status)}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Machine Status Section */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-4 py-3 bg-gray-50">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">Machine Status</span>
                  </div>
                </div>
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
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 border-t border-gray-200 flex gap-3 flex-shrink-0">
              <button
                onClick={handleClearFilters}
                className="flex-1 px-4 h-11 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="flex-1 px-4 h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors font-medium"
              >
                Apply Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </button>
            </div>
          </div>
        </>
      )}

      {/* Inventory Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="grid grid-cols-12 gap-4 px-6 py-4">
            <div className="col-span-3 text-sm font-medium text-gray-900">Machine & Location</div>
            <div className="col-span-1 text-sm font-medium text-gray-900 text-center">Status</div>
            <div className="col-span-3 text-sm font-medium text-gray-900">Peak Slots</div>
            <div className="col-span-3 text-sm font-medium text-gray-900">Normal Slots</div>
            <div className="col-span-2 text-sm font-medium text-gray-900">Actions</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {filteredMachines.length > 0 ? (
            filteredMachines.map((machine) => {
              const availability = getAvailabilityForMachine(machine.id);

              return (
                <div
                  key={machine.id}
                  className="grid grid-cols-12 gap-4 px-6 py-5 hover:bg-gray-50 transition-colors items-center"
                >
                  {/* Machine & Location */}
                  <div className="col-span-3">
                    <div className="font-medium text-gray-900 mb-1">{machine.name}</div>
                    <div className="text-sm text-gray-600">
                      {machine.location.city} • {machine.location.venue}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="col-span-1 flex justify-center">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getMachineStatusColor(
                        machine.status
                      )}`}
                    >
                      {machine.status.charAt(0).toUpperCase() + machine.status.slice(1)}
                    </span>
                  </div>

                  {/* Peak Slots */}
                  <div className="col-span-3">
                    {availability ? (
                      <div className="space-y-2">
                        {/* Numeric count */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-900">
                            {availability.peakAvailability.total - availability.peakAvailability.occupied}/{availability.peakAvailability.total} free
                          </span>
                          <span className="text-xs text-gray-600">
                            {availability.peakAvailability.occupied} booked
                          </span>
                        </div>
                        
                        {/* Visual bar */}
                        <div className="flex gap-0.5">
                          {Array.from({ length: availability.peakAvailability.total }).map((_, index) => {
                            const isOccupied = index < availability.peakAvailability.occupied;
                            return (
                              <div
                                key={index}
                                className={`h-6 flex-1 rounded-sm transition-colors ${
                                  isOccupied 
                                    ? 'bg-gray-300' 
                                    : 'bg-green-500'
                                }`}
                                title={isOccupied ? 'Occupied' : 'Free'}
                              />
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">No data</span>
                    )}
                  </div>

                  {/* Normal Slots */}
                  <div className="col-span-3">
                    {availability ? (
                      <div className="space-y-2">
                        {/* Numeric count */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-900">
                            {availability.normalAvailability.total - availability.normalAvailability.occupied}/{availability.normalAvailability.total} free
                          </span>
                          <span className="text-xs text-gray-600">
                            {availability.normalAvailability.occupied} booked
                          </span>
                        </div>
                        
                        {/* Visual bar */}
                        <div className="flex gap-0.5">
                          {Array.from({ length: availability.normalAvailability.total }).map((_, index) => {
                            const isOccupied = index < availability.normalAvailability.occupied;
                            return (
                              <div
                                key={index}
                                className={`h-6 flex-1 rounded-sm transition-colors ${
                                  isOccupied 
                                    ? 'bg-gray-300' 
                                    : 'bg-green-500'
                                }`}
                                title={isOccupied ? 'Occupied' : 'Free'}
                              />
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">No data</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="col-span-2 flex items-center gap-2">
                    <button
                      onClick={() => handleCreateBooking(machine)}
                      disabled={machine.status === 'offline'}
                      className="flex items-center gap-2 px-3 h-9 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium flex-1 justify-center"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Book</span>
                    </button>
                    <button
                      onClick={() => handleViewDetails(machine)}
                      className="flex items-center gap-1 px-3 h-9 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="px-6 py-12 text-center">
              <div className="text-gray-500">No machines found</div>
              <div className="text-sm text-gray-400 mt-1">
                Try adjusting your search criteria
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Booking Modal */}
      {showBookingModal && selectedMachine && (
        <CreateBookingModal
          machine={selectedMachine}
          onClose={() => {
            setShowBookingModal(false);
            setSelectedMachine(null);
          }}
        />
      )}
    </div>
  );
}