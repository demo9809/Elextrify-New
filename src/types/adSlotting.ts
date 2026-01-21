export type MachineStatus = 'online' | 'offline' | 'syncing';

export type SlotApplicability = 'peak' | 'normal';

export type AvailabilityStatus = 'available' | 'limited' | 'full';

export interface PeakWindow {
  id: string;
  startTime: string; // "09:00"
  endTime: string; // "10:00"
}

export interface Machine {
  id: string;
  name: string;
  location: {
    city: string;
    venue: string;
  };
  status: MachineStatus;
  operatingHours: {
    start: string; // "06:00"
    end: string; // "23:00"
  };
  peakWindows: PeakWindow[];
}

export interface SlotConfiguration {
  id: string;
  name: string;
  machineId: string;
  applicability: SlotApplicability;
  loopDuration: number; // seconds
  subSlotDuration: number; // seconds
  totalPositions: number; // calculated
  pricing: {
    peakPrice?: number;
    normalPrice?: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  machineId: string;
  slotConfigurationId: string;
  clientId: string;
  clientName: string;
  mediaAssetId: string;
  mediaAssetName: string;
  startDate: string;
  endDate: string;
  slotTypes: ('peak' | 'normal')[]; // Changed from single slotType to array
  positionsBooked: number;
  totalCost: number;
  status: 'active' | 'scheduled' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface InventoryAvailability {
  machineId: string;
  peakAvailability: {
    status: AvailabilityStatus;
    occupied: number;
    total: number;
  };
  normalAvailability: {
    status: AvailabilityStatus;
    occupied: number;
    total: number;
  };
}