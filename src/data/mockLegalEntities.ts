/**
 * Legal Entity Data Model
 * 
 * Represents Legal Entity-type Organization Units with GST compliance
 * Aligned with Indian GST and ERP-style operational models
 */

export type OrganizationUnitType = 'legal-entity' | 'operational-unit';

export interface GSTConfiguration {
  gstNumber: string;
  panNumber: string;
  tradeName?: string;
  registrationType: 'regular' | 'composition' | 'casual' | 'sez';
  registrationDate: string;
  stateCode: string; // 2-digit state code from GST number
  jurisdictionType: 'intra-state' | 'inter-state';
}

export interface BillingProfile {
  legalName: string;
  tradeName?: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  contactEmail: string;
  contactPhone: string;
  bankDetails?: {
    accountName: string;
    accountNumber: string;
    ifscCode: string;
    bankName: string;
    branch: string;
  };
}

export interface LegalEntity {
  id: string;
  type: 'legal-entity';
  name: string;
  displayName: string;
  gstConfig: GSTConfiguration;
  billingProfile: BillingProfile;
  status: 'active' | 'inactive' | 'suspended';
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OperationalUnit {
  id: string;
  type: 'operational-unit';
  name: string;
  displayName: string;
  parentLegalEntityId: string; // Must belong to a Legal Entity
  description?: string;
  region?: string;
  office?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export type OrganizationUnit = LegalEntity | OperationalUnit;

// Mock Legal Entities
export const mockLegalEntities: LegalEntity[] = [
  {
    id: 'le_001',
    type: 'legal-entity',
    name: 'TechCorp Digital India Pvt Ltd',
    displayName: 'TechCorp Digital India',
    gstConfig: {
      gstNumber: '27AABCT1234H1Z5',
      panNumber: 'AABCT1234H',
      tradeName: 'TechCorp Digital',
      registrationType: 'regular',
      registrationDate: '2020-04-01',
      stateCode: '27', // Maharashtra
      jurisdictionType: 'inter-state',
    },
    billingProfile: {
      legalName: 'TechCorp Digital India Private Limited',
      tradeName: 'TechCorp Digital',
      address: {
        line1: 'Unit 402, Pinnacle Business Park',
        line2: 'Bandra Kurla Complex',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400051',
        country: 'India',
      },
      contactEmail: 'billing@techcorpdigital.in',
      contactPhone: '+91-22-4567-8901',
      bankDetails: {
        accountName: 'TechCorp Digital India Pvt Ltd',
        accountNumber: '00123456789012',
        ifscCode: 'HDFC0000123',
        bankName: 'HDFC Bank',
        branch: 'BKC Mumbai',
      },
    },
    status: 'active',
    isPrimary: true,
    createdAt: '2020-04-01T00:00:00Z',
    updatedAt: '2024-12-15T10:30:00Z',
  },
  {
    id: 'le_002',
    type: 'legal-entity',
    name: 'TechCorp South Operations Pvt Ltd',
    displayName: 'TechCorp South',
    gstConfig: {
      gstNumber: '33AABCT5678K1Z9',
      panNumber: 'AABCT5678K',
      tradeName: 'TechCorp South',
      registrationType: 'regular',
      registrationDate: '2021-07-15',
      stateCode: '33', // Tamil Nadu
      jurisdictionType: 'inter-state',
    },
    billingProfile: {
      legalName: 'TechCorp South Operations Private Limited',
      tradeName: 'TechCorp South',
      address: {
        line1: 'Tower B, IT Park',
        line2: 'Rajiv Gandhi Salai, Taramani',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600113',
        country: 'India',
      },
      contactEmail: 'billing.south@techcorp.in',
      contactPhone: '+91-44-2345-6789',
      bankDetails: {
        accountName: 'TechCorp South Operations Pvt Ltd',
        accountNumber: '98765432109876',
        ifscCode: 'ICIC0001234',
        bankName: 'ICICI Bank',
        branch: 'Taramani Chennai',
      },
    },
    status: 'active',
    isPrimary: false,
    createdAt: '2021-07-15T00:00:00Z',
    updatedAt: '2024-12-10T14:20:00Z',
  },
  {
    id: 'le_003',
    type: 'legal-entity',
    name: 'TechCorp North LLP',
    displayName: 'TechCorp North',
    gstConfig: {
      gstNumber: '07AABCT9012M1Z3',
      panNumber: 'AABCT9012M',
      tradeName: 'TechCorp North',
      registrationType: 'regular',
      registrationDate: '2022-01-10',
      stateCode: '07', // Delhi
      jurisdictionType: 'inter-state',
    },
    billingProfile: {
      legalName: 'TechCorp North Limited Liability Partnership',
      tradeName: 'TechCorp North',
      address: {
        line1: 'Plot 15, Sector 18',
        line2: 'Udyog Vihar Phase IV',
        city: 'Gurugram',
        state: 'Haryana',
        pincode: '122015',
        country: 'India',
      },
      contactEmail: 'billing.north@techcorp.in',
      contactPhone: '+91-124-456-7890',
    },
    status: 'active',
    isPrimary: false,
    createdAt: '2022-01-10T00:00:00Z',
    updatedAt: '2024-11-28T09:15:00Z',
  },
  {
    id: 'le_004',
    type: 'legal-entity',
    name: 'TechCorp West Division Pvt Ltd',
    displayName: 'TechCorp West',
    gstConfig: {
      gstNumber: '24AABCT3456P1Z7',
      panNumber: 'AABCT3456P',
      tradeName: 'TechCorp West',
      registrationType: 'regular',
      registrationDate: '2023-03-20',
      stateCode: '24', // Gujarat
      jurisdictionType: 'inter-state',
    },
    billingProfile: {
      legalName: 'TechCorp West Division Private Limited',
      tradeName: 'TechCorp West',
      address: {
        line1: 'Commerce House II, Beside Vodafone House',
        line2: 'Prahladnagar',
        city: 'Ahmedabad',
        state: 'Gujarat',
        pincode: '380015',
        country: 'India',
      },
      contactEmail: 'billing.west@techcorp.in',
      contactPhone: '+91-79-4012-3456',
    },
    status: 'inactive',
    isPrimary: false,
    createdAt: '2023-03-20T00:00:00Z',
    updatedAt: '2024-10-05T16:40:00Z',
  },
];

// Mock Operational Units
export const mockOperationalUnits: OperationalUnit[] = [
  {
    id: 'ou_001',
    type: 'operational-unit',
    name: 'Mumbai Region',
    displayName: 'Mumbai Region',
    parentLegalEntityId: 'le_001',
    description: 'Mumbai metropolitan area operations',
    region: 'West',
    office: 'BKC HQ',
    status: 'active',
    createdAt: '2020-04-15T00:00:00Z',
    updatedAt: '2024-12-01T10:00:00Z',
  },
  {
    id: 'ou_002',
    type: 'operational-unit',
    name: 'Pune Office',
    displayName: 'Pune Office',
    parentLegalEntityId: 'le_001',
    description: 'Pune city operations',
    region: 'West',
    office: 'Pune Tech Park',
    status: 'active',
    createdAt: '2020-06-01T00:00:00Z',
    updatedAt: '2024-11-20T14:30:00Z',
  },
  {
    id: 'ou_003',
    type: 'operational-unit',
    name: 'Chennai Metro',
    displayName: 'Chennai Metro',
    parentLegalEntityId: 'le_002',
    description: 'Chennai metropolitan operations',
    region: 'South',
    office: 'Taramani IT Park',
    status: 'active',
    createdAt: '2021-08-01T00:00:00Z',
    updatedAt: '2024-12-05T09:45:00Z',
  },
  {
    id: 'ou_004',
    type: 'operational-unit',
    name: 'Bangalore Branch',
    displayName: 'Bangalore Branch',
    parentLegalEntityId: 'le_002',
    description: 'Bangalore city operations',
    region: 'South',
    office: 'Whitefield Tech Hub',
    status: 'active',
    createdAt: '2021-09-15T00:00:00Z',
    updatedAt: '2024-11-28T11:20:00Z',
  },
];

// Combined organization units
export const mockOrganizationUnits: OrganizationUnit[] = [
  ...mockLegalEntities,
  ...mockOperationalUnits,
];

// Helper functions
export const getLegalEntities = (): LegalEntity[] => {
  return mockLegalEntities.filter(entity => entity.status === 'active');
};

export const getOperationalUnitsByLegalEntity = (legalEntityId: string): OperationalUnit[] => {
  return mockOperationalUnits.filter(
    unit => unit.parentLegalEntityId === legalEntityId && unit.status === 'active'
  );
};

export const getPrimaryLegalEntity = (): LegalEntity | undefined => {
  return mockLegalEntities.find(entity => entity.isPrimary && entity.status === 'active');
};

export const getLegalEntityById = (id: string): LegalEntity | undefined => {
  return mockLegalEntities.find(entity => entity.id === id);
};

export const getOrganizationUnitById = (id: string): OrganizationUnit | undefined => {
  return mockOrganizationUnits.find(unit => unit.id === id);
};

export const formatGSTNumber = (gstNumber: string): string => {
  // Format: 27AABCT1234H1Z5 → 27-AABCT-1234H-1Z5
  if (gstNumber.length !== 15) return gstNumber;
  return `${gstNumber.slice(0, 2)}-${gstNumber.slice(2, 7)}-${gstNumber.slice(7, 12)}-${gstNumber.slice(12)}`;
};

export const getStateName = (stateCode: string): string => {
  const stateMap: Record<string, string> = {
    '07': 'Delhi',
    '24': 'Gujarat',
    '27': 'Maharashtra',
    '33': 'Tamil Nadu',
    '29': 'Karnataka',
    '32': 'Kerala',
    // Add more as needed
  };
  return stateMap[stateCode] || 'Unknown';
};
