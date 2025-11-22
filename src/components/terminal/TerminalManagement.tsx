import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { TerminalDashboard } from './TerminalDashboard';
import { DeviceRegistration } from './DeviceRegistration';
import { DeviceDetails } from './DeviceDetails';
import { LocationManagement } from './LocationManagement';
import { ClientManagement } from './ClientManagement';
import { KioskLocationProfile } from './KioskLocationProfile';
import { KioskLocationProfileView } from './KioskLocationProfileView';

type Screen = 
  | { type: 'dashboard' }
  | { type: 'registration' }
  | { type: 'device-details'; terminal: any };

export function TerminalManagement() {
  const [currentScreen, setCurrentScreen] = useState<Screen>({ type: 'dashboard' });
  const [locationProfileKiosk, setLocationProfileKiosk] = useState<any | null>(null);
  const [locationProfileMode, setLocationProfileMode] = useState<'create' | 'edit'>('edit');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Mock count of unverified devices (in real app, this would come from API)
  const unverifiedDeviceCount = 3;

  // Mock location profiles for devices that have them
  const mockLocationProfiles: Record<string, any> = {
    'term-1': {
      country: 'United States',
      state: 'New York',
      city: 'New York City',
      postalCode: '10036',
      venueCategory: 'Mall',
      venueSubtype: 'Atrium',
      floor: 'Ground Floor',
      microLocation: 'Main Entrance',
      crowdTypes: ['Shoppers', 'Tourists', 'Families'],
      locationTags: ['Entrance', 'High Footfall', 'Retail Zone'],
      deviceGroup: 'NYC Premium',
      atmosphereNotes: 'High-traffic area with excellent visibility. Peak hours are 10 AM - 9 PM on weekends.',
      customTags: 'Premium Location, High Value',
      lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60000).toISOString(),
      updatedBy: 'Sarah Khan'
    },
    'term-2': {
      country: 'United States',
      state: 'New York',
      city: 'New York City',
      postalCode: '10019',
      venueCategory: 'Metro Station',
      venueSubtype: 'Concourse',
      floor: 'Ground Floor',
      microLocation: 'Platform 2',
      crowdTypes: ['Commuters', 'Professionals'],
      locationTags: ['Transit Point', 'High Footfall', 'Common Area'],
      deviceGroup: 'NYC Premium',
      atmosphereNotes: 'Busy transit hub with consistent foot traffic throughout the day.',
      customTags: 'Transit Hub, Commuter Heavy',
      lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60000).toISOString(),
      updatedBy: 'Mike Chen'
    },
    'term-5': {
      country: 'United States',
      state: 'Florida',
      city: 'Miami Beach',
      postalCode: '33139',
      venueCategory: 'Retail Store',
      venueSubtype: 'Entrance',
      floor: 'Ground Floor',
      microLocation: 'Main Entrance',
      crowdTypes: ['Shoppers', 'Tourists', 'Local Residents'],
      locationTags: ['Entrance', 'Retail Zone', 'High Footfall'],
      deviceGroup: 'Florida Coastal',
      atmosphereNotes: 'Tourist-heavy area with seasonal variations. Peak season Nov-Mar.',
      customTags: 'Beach Area, Seasonal',
      lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60000).toISOString(),
      updatedBy: 'Sarah Khan'
    },
    'term-7': {
      country: 'United States',
      state: 'Washington',
      city: 'Seattle',
      postalCode: '98101',
      venueCategory: 'Other',
      venueSubtype: 'Main Area',
      floor: 'Ground Floor',
      microLocation: 'Central Market Area',
      crowdTypes: ['Tourists', 'Local Residents', 'Shoppers'],
      locationTags: ['Common Area', 'High Footfall', 'Entrance'],
      deviceGroup: 'Seattle Downtown',
      atmosphereNotes: 'Historic public market with diverse visitor demographics.',
      customTags: 'Tourist Destination, Local Favorite',
      lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60000).toISOString(),
      updatedBy: 'Alex Turner'
    }
  };

  // Mock terminal data with additional fields for device details
  const mockTerminalWithDetails = (terminal: any) => ({
    ...terminal,
    storage: Math.floor(Math.random() * 30 + 50), // 50-80%
    connectionQuality: Math.floor(Math.random() * 20 + 80), // 80-100%
    lastMidnightSync: new Date(Date.now() - 6 * 60 * 60000).toISOString(), // 6 hours ago
    osVersion: 'Android 12',
    firmwareVersion: '4.2.1',
    serialNumber: `SN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    uptime: Math.floor(Math.random() * 200 + 50), // 50-250 hours
    
    // IoT-specific metrics
    networkSpeed: Math.floor(Math.random() * 60 + 40), // 40-100 Mbps
    displayBrightness: Math.floor(Math.random() * 30 + 70), // 70-100%
    powerStatus: ['ac', 'ac', 'ac', 'battery', 'ups'][Math.floor(Math.random() * 5)] as 'ac' | 'battery' | 'ups',
    batteryLevel: Math.floor(Math.random() * 100), // 0-100%
    screenOnTime: Math.random() * 8 + 8, // 8-16 hours
    contentSyncStatus: ['synced', 'syncing', 'pending'][Math.floor(Math.random() * 3)] as 'synced' | 'syncing' | 'pending',
    gpuUsage: Math.floor(Math.random() * 40 + 30), // 30-70%
    audioLevel: Math.floor(Math.random() * 30 + 70), // 70-100%
    ambientLight: Math.floor(Math.random() * 600 + 200), // 200-800 lux
    displayHealth: Math.floor(Math.random() * 15 + 85), // 85-100%
  });

  // Handler to open location profile
  const handleOpenLocationProfile = (terminal: any, mode: 'create' | 'edit' = 'edit') => {
    const hasProfile = !!mockLocationProfiles[terminal.id];
    setLocationProfileKiosk(terminal);
    setLocationProfileMode(mode);
    // Only open in edit mode if no profile exists or if mode is explicitly 'create'
    setIsEditingProfile(!hasProfile || mode === 'create');
  };

  // Handler to switch to edit mode
  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  // Handler to save location profile
  const handleSaveLocationProfile = (profile: any) => {
    console.log('Saving location profile:', profile);
    // In real app, save to API
    const message = locationProfileMode === 'create' 
      ? 'Location profile created successfully'
      : 'Location profile updated successfully';
    toast.success(message);
    setLocationProfileKiosk(null);
    setIsEditingProfile(false);
  };

  // Handler to close location profile
  const handleCloseLocationProfile = () => {
    setLocationProfileKiosk(null);
    setIsEditingProfile(false);
  };

  // Get active tab type (map device-details to dashboard)
  const getActiveTab = () => {
    if (currentScreen.type === 'device-details') return 'dashboard';
    return currentScreen.type;
  };

  const activeTab = getActiveTab();

  const renderScreen = () => {
    switch (currentScreen.type) {
      case 'dashboard':
        return (
          <TerminalDashboard
            onViewDevice={(terminal) => setCurrentScreen({ 
              type: 'device-details', 
              terminal: mockTerminalWithDetails(terminal)
            })}
            onNavigateToRegistration={() => setCurrentScreen({ type: 'registration' })}
            onOpenLocationProfile={(terminal) => handleOpenLocationProfile(terminal, 'edit')}
          />
        );
      
      case 'registration':
        return (
          <DeviceRegistration
            onBack={() => setCurrentScreen({ type: 'dashboard' })}
            onDevicePaired={(device) => {
              // Auto-open location profile after pairing
              handleOpenLocationProfile(device, 'create');
            }}
          />
        );
      
      case 'device-details':
        return (
          <DeviceDetails
            terminal={currentScreen.terminal}
            onBack={() => setCurrentScreen({ type: 'dashboard' })}
            onOpenLocationProfile={(terminal) => handleOpenLocationProfile(terminal, currentScreen.terminal.locationProfile ? 'edit' : 'create')}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {/* Tab Navigation - Hide when viewing device details */}
      {currentScreen.type !== 'device-details' && (
        <div className="bg-white border-b border-[#E5E7EB] sticky top-16 z-10">
          <div className="px-8">
            <div className="flex items-center gap-1">
              {/* Dashboard Tab */}
              <button
                onClick={() => setCurrentScreen({ type: 'dashboard' })}
                className={`relative px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'dashboard'
                    ? 'text-[#D9480F]'
                    : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB]'
                }`}
              >
                Device Overview
                {activeTab === 'dashboard' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D9480F]"></div>
                )}
              </button>

              {/* Device Registration Tab with Badge */}
              <button
                onClick={() => setCurrentScreen({ type: 'registration' })}
                className={`relative px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'registration'
                    ? 'text-[#D9480F]'
                    : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB]'
                }`}
              >
                <span className="flex items-center gap-2">
                  Device Registration
                  {unverifiedDeviceCount > 0 && (
                    <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-[#D9480F] text-white text-xs font-semibold rounded-full">
                      {unverifiedDeviceCount}
                    </span>
                  )}
                </span>
                {activeTab === 'registration' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D9480F]"></div>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {renderScreen()}

      {/* Location Profile Modal - Show View or Edit based on state */}
      {locationProfileKiosk && (
        <>
          {!isEditingProfile && mockLocationProfiles[locationProfileKiosk.id] ? (
            // Show read-only view if profile exists and not editing
            <KioskLocationProfileView
              kioskId={locationProfileKiosk.id}
              kioskName={locationProfileKiosk.name}
              deviceId={locationProfileKiosk.deviceId}
              profile={mockLocationProfiles[locationProfileKiosk.id]}
              lastUpdated={mockLocationProfiles[locationProfileKiosk.id].lastUpdated}
              updatedBy={mockLocationProfiles[locationProfileKiosk.id].updatedBy}
              onEdit={handleEditProfile}
              onClose={handleCloseLocationProfile}
            />
          ) : (
            // Show edit form if no profile exists or user clicked edit
            <KioskLocationProfile
              kioskId={locationProfileKiosk.id}
              kioskName={locationProfileKiosk.name}
              deviceId={locationProfileKiosk.deviceId}
              existingProfile={mockLocationProfiles[locationProfileKiosk.id]}
              lastUpdated={mockLocationProfiles[locationProfileKiosk.id]?.lastUpdated}
              updatedBy={mockLocationProfiles[locationProfileKiosk.id]?.updatedBy}
              mode={locationProfileMode}
              onSave={handleSaveLocationProfile}
              onCancel={handleCloseLocationProfile}
            />
          )}
        </>
      )}
    </div>
  );
}