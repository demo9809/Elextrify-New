import {
  Machine,
  SlotConfiguration,
  Booking,
  InventoryAvailability,
  MachineStatus,
  AvailabilityStatus,
} from '../types/adSlotting';

export const mockMachines: Machine[] = [
  {
    id: 'mch-001',
    name: 'Times Square Billboard A',
    location: {
      city: 'New York',
      venue: 'Times Square Mall',
    },
    status: 'online',
    operatingHours: {
      start: '06:00',
      end: '23:00',
    },
    peakWindows: [
      { id: 'pw-001', startTime: '09:00', endTime: '10:00' },
      { id: 'pw-002', startTime: '17:00', endTime: '19:00' },
    ],
  },
  {
    id: 'mch-002',
    name: 'LAX Terminal 3 Screen',
    location: {
      city: 'Los Angeles',
      venue: 'LAX Airport - Terminal 3',
    },
    status: 'online',
    operatingHours: {
      start: '05:00',
      end: '24:00',
    },
    peakWindows: [
      { id: 'pw-003', startTime: '07:00', endTime: '09:00' },
      { id: 'pw-004', startTime: '16:00', endTime: '20:00' },
    ],
  },
  {
    id: 'mch-003',
    name: 'Union Station Display',
    location: {
      city: 'Chicago',
      venue: 'Union Station',
    },
    status: 'syncing',
    operatingHours: {
      start: '06:00',
      end: '22:00',
    },
    peakWindows: [
      { id: 'pw-005', startTime: '08:00', endTime: '10:00' },
      { id: 'pw-006', startTime: '17:00', endTime: '19:00' },
    ],
  },
  {
    id: 'mch-004',
    name: 'Downtown Mall Kiosk 1',
    location: {
      city: 'San Francisco',
      venue: 'Downtown Shopping Center',
    },
    status: 'online',
    operatingHours: {
      start: '10:00',
      end: '22:00',
    },
    peakWindows: [
      { id: 'pw-007', startTime: '12:00', endTime: '14:00' },
      { id: 'pw-008', startTime: '18:00', endTime: '20:00' },
    ],
  },
  {
    id: 'mch-005',
    name: 'Central Park Screen',
    location: {
      city: 'New York',
      venue: 'Central Park Entrance',
    },
    status: 'offline',
    operatingHours: {
      start: '07:00',
      end: '21:00',
    },
    peakWindows: [
      { id: 'pw-009', startTime: '10:00', endTime: '12:00' },
      { id: 'pw-010', startTime: '15:00', endTime: '18:00' },
    ],
  },
  {
    id: 'mch-006',
    name: 'Miami Beach Boardwalk',
    location: {
      city: 'Miami',
      venue: 'South Beach Boardwalk',
    },
    status: 'online',
    operatingHours: {
      start: '08:00',
      end: '23:00',
    },
    peakWindows: [
      { id: 'pw-011', startTime: '11:00', endTime: '13:00' },
      { id: 'pw-012', startTime: '19:00', endTime: '22:00' },
    ],
  },
  {
    id: 'mch-007',
    name: 'Seattle Transit Hub',
    location: {
      city: 'Seattle',
      venue: 'Downtown Transit Center',
    },
    status: 'online',
    operatingHours: {
      start: '05:00',
      end: '23:00',
    },
    peakWindows: [
      { id: 'pw-013', startTime: '07:00', endTime: '09:00' },
      { id: 'pw-014', startTime: '16:00', endTime: '18:00' },
    ],
  },
  {
    id: 'mch-008',
    name: 'Vegas Strip Display A',
    location: {
      city: 'Las Vegas',
      venue: 'Las Vegas Strip',
    },
    status: 'online',
    operatingHours: {
      start: '00:00',
      end: '24:00',
    },
    peakWindows: [
      { id: 'pw-015', startTime: '20:00', endTime: '24:00' },
    ],
  },
];

export const mockSlotConfigurations: SlotConfiguration[] = [
  {
    id: 'sc-001',
    name: 'Standard Peak Loop',
    machineId: 'mch-001',
    applicability: 'peak',
    loopDuration: 60,
    subSlotDuration: 10,
    totalPositions: 6,
    pricing: {
      peakPrice: 500,
    },
    createdAt: '2025-01-01T10:00:00Z',
    updatedAt: '2025-01-01T10:00:00Z',
  },
  {
    id: 'sc-001-normal',
    name: 'Standard Normal Loop',
    machineId: 'mch-001',
    applicability: 'normal',
    loopDuration: 60,
    subSlotDuration: 10,
    totalPositions: 6,
    pricing: {
      normalPrice: 300,
    },
    createdAt: '2025-01-01T10:00:00Z',
    updatedAt: '2025-01-01T10:00:00Z',
  },
  {
    id: 'sc-002',
    name: 'Airport Peak Hours',
    machineId: 'mch-002',
    applicability: 'peak',
    loopDuration: 180,
    subSlotDuration: 15,
    totalPositions: 12,
    pricing: {
      peakPrice: 200,
    },
    createdAt: '2025-01-02T10:00:00Z',
    updatedAt: '2025-01-02T10:00:00Z',
  },
  {
    id: 'sc-003',
    name: 'Budget Normal Hours',
    machineId: 'mch-003',
    applicability: 'normal',
    loopDuration: 240,
    subSlotDuration: 10,
    totalPositions: 24,
    pricing: {
      normalPrice: 50,
    },
    createdAt: '2025-01-03T10:00:00Z',
    updatedAt: '2025-01-03T10:00:00Z',
  },
  {
    id: 'sc-004',
    name: 'Mall Peak Premium',
    machineId: 'mch-004',
    applicability: 'peak',
    loopDuration: 120,
    subSlotDuration: 15,
    totalPositions: 8,
    pricing: {
      peakPrice: 180,
    },
    createdAt: '2025-01-04T10:00:00Z',
    updatedAt: '2025-01-04T10:00:00Z',
  },
];

export const mockBookings: Booking[] = [
  {
    id: 'bk-001',
    machineId: 'mch-001',
    slotConfigurationId: 'sc-001',
    clientId: 'cl-001',
    clientName: 'Nike Sports',
    mediaAssetId: 'ma-001',
    mediaAssetName: 'Nike Spring Campaign',
    startDate: '2025-01-15',
    endDate: '2025-02-15',
    slotTypes: ['peak'],
    positionsBooked: 3,
    totalCost: 13500,
    status: 'active',
    createdAt: '2025-01-10T10:00:00Z',
  },
  {
    id: 'bk-002',
    machineId: 'mch-002',
    slotConfigurationId: 'sc-002',
    clientId: 'cl-002',
    clientName: 'Apple Inc.',
    mediaAssetId: 'ma-002',
    mediaAssetName: 'iPhone 16 Launch',
    startDate: '2025-01-20',
    endDate: '2025-04-20',
    slotTypes: ['peak', 'normal'],
    positionsBooked: 5,
    totalCost: 45000,
    status: 'active',
    createdAt: '2025-01-12T10:00:00Z',
  },
  {
    id: 'bk-003',
    machineId: 'mch-001',
    slotConfigurationId: 'sc-001',
    clientId: 'cl-003',
    clientName: 'Coca-Cola',
    mediaAssetId: 'ma-003',
    mediaAssetName: 'Summer Refresh',
    startDate: '2025-02-01',
    endDate: '2025-03-01',
    slotTypes: ['peak'],
    positionsBooked: 8,
    totalCost: 36000,
    status: 'scheduled',
    createdAt: '2025-01-14T10:00:00Z',
  },
];

export const mockInventoryAvailability: InventoryAvailability[] = [
  {
    machineId: 'mch-001',
    peakAvailability: {
      status: 'full',
      occupied: 11,
      total: 12,
    },
    normalAvailability: {
      status: 'available',
      occupied: 2,
      total: 12,
    },
  },
  {
    machineId: 'mch-002',
    peakAvailability: {
      status: 'limited',
      occupied: 7,
      total: 12,
    },
    normalAvailability: {
      status: 'limited',
      occupied: 6,
      total: 12,
    },
  },
  {
    machineId: 'mch-003',
    peakAvailability: {
      status: 'available',
      occupied: 0,
      total: 24,
    },
    normalAvailability: {
      status: 'available',
      occupied: 5,
      total: 24,
    },
  },
  {
    machineId: 'mch-004',
    peakAvailability: {
      status: 'available',
      occupied: 2,
      total: 8,
    },
    normalAvailability: {
      status: 'available',
      occupied: 1,
      total: 8,
    },
  },
  {
    machineId: 'mch-005',
    peakAvailability: {
      status: 'available',
      occupied: 0,
      total: 10,
    },
    normalAvailability: {
      status: 'available',
      occupied: 0,
      total: 10,
    },
  },
  {
    machineId: 'mch-006',
    peakAvailability: {
      status: 'limited',
      occupied: 8,
      total: 12,
    },
    normalAvailability: {
      status: 'available',
      occupied: 3,
      total: 12,
    },
  },
  {
    machineId: 'mch-007',
    peakAvailability: {
      status: 'available',
      occupied: 4,
      total: 15,
    },
    normalAvailability: {
      status: 'limited',
      occupied: 10,
      total: 15,
    },
  },
  {
    machineId: 'mch-008',
    peakAvailability: {
      status: 'full',
      occupied: 20,
      total: 20,
    },
    normalAvailability: {
      status: 'available',
      occupied: 0,
      total: 0,
    },
  },
];

export const getAvailabilityForMachine = (machineId: string): InventoryAvailability | undefined => {
  return mockInventoryAvailability.find(a => a.machineId === machineId);
};

export const getSlotConfigForMachine = (machineId: string): SlotConfiguration | undefined => {
  return mockSlotConfigurations.find(sc => sc.machineId === machineId);
};

export const getBookingsForMachine = (machineId: string): Booking[] => {
  return mockBookings.filter(b => b.machineId === machineId);
};

export const getMachineStatusColor = (status: MachineStatus): string => {
  switch (status) {
    case 'online':
      return 'bg-green-100 text-green-700';
    case 'offline':
      return 'bg-red-100 text-red-700';
    case 'syncing':
      return 'bg-yellow-100 text-yellow-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export const getAvailabilityColor = (status: AvailabilityStatus): string => {
  switch (status) {
    case 'available':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'limited':
      return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'full':
      return 'bg-red-100 text-red-700 border-red-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};