export type UnitType = 'legal-entity' | 'regional-office' | 'sub-agency' | 'department';
export type UnitStatus = 'active' | 'inactive';
export type AccessLevel = 'view' | 'manage' | 'admin';

export interface GSTData {
  isGSTRegistered: boolean;
  gstin: string;
  stateCode: string;
  stateName: string;
  gstRegistrationDate: string;
  compositionScheme: boolean;
  reverseChargeApplicable: boolean;
}

export interface BillingInformation {
  legalCompanyName: string;
  billingAddress: string;
  taxId: string;
  invoiceEmail: string;
  country: string;
  region: string;
  inheritedFrom?: string; // Parent unit ID if inherited
  gstData?: GSTData; // India-specific GST compliance data
}

export interface UserAssignment {
  userId: string;
  userName: string;
  userEmail: string;
  accessLevel: AccessLevel;
}

export interface OrganizationUnit {
  id: string;
  name: string;
  parentId: string | null; // null for root
  unitType: UnitType;
  status: UnitStatus;
  logo?: string;
  timezone: string;
  currency: string;
  
  // Legal & Billing (only for legal entities)
  billingInformation?: BillingInformation;
  
  // Resource counts
  totalCampaigns: number;
  totalMedia: number;
  totalPlaylists: number;
  totalKiosks: number;
  totalUsers: number;
  
  // User assignments
  userAssignments: UserAssignment[];
  
  // Metadata
  createdDate: string;
  lastModified: string;
  createdBy: string;
}

export const mockOrganizationUnits: OrganizationUnit[] = [
  // Root Organization
  {
    id: '1',
    name: 'Global Digital Signage Corp',
    parentId: null,
    unitType: 'legal-entity',
    status: 'active',
    timezone: 'America/New_York',
    currency: 'USD',
    billingInformation: {
      legalCompanyName: 'Global Digital Signage Corporation',
      billingAddress: '123 Main Street, New York, NY 10001, USA',
      taxId: 'US-12-3456789',
      invoiceEmail: 'billing@globalds.com',
      country: 'United States',
      region: 'New York',
    },
    totalCampaigns: 45,
    totalMedia: 320,
    totalPlaylists: 78,
    totalKiosks: 150,
    totalUsers: 25,
    userAssignments: [
      {
        userId: '1',
        userName: 'John Smith',
        userEmail: 'john.smith@globalds.com',
        accessLevel: 'admin',
      },
      {
        userId: '2',
        userName: 'Sarah Johnson',
        userEmail: 'sarah.johnson@globalds.com',
        accessLevel: 'admin',
      },
    ],
    createdDate: '2023-01-15T10:00:00Z',
    lastModified: '2024-12-10T14:30:00Z',
    createdBy: 'System',
  },
  
  // North America Region
  {
    id: '2',
    name: 'North America',
    parentId: '1',
    unitType: 'regional-office',
    status: 'active',
    timezone: 'America/New_York',
    currency: 'USD',
    totalCampaigns: 28,
    totalMedia: 180,
    totalPlaylists: 45,
    totalKiosks: 85,
    totalUsers: 15,
    userAssignments: [
      {
        userId: '3',
        userName: 'Michael Brown',
        userEmail: 'michael.brown@globalds.com',
        accessLevel: 'admin',
      },
    ],
    createdDate: '2023-02-01T10:00:00Z',
    lastModified: '2024-11-15T09:20:00Z',
    createdBy: 'John Smith',
  },
  
  // US East Coast Office
  {
    id: '3',
    name: 'US East Coast',
    parentId: '2',
    unitType: 'regional-office',
    status: 'active',
    timezone: 'America/New_York',
    currency: 'USD',
    totalCampaigns: 15,
    totalMedia: 95,
    totalPlaylists: 22,
    totalKiosks: 45,
    totalUsers: 8,
    userAssignments: [
      {
        userId: '4',
        userName: 'Emily Davis',
        userEmail: 'emily.davis@globalds.com',
        accessLevel: 'manage',
      },
    ],
    createdDate: '2023-03-15T10:00:00Z',
    lastModified: '2024-10-20T11:15:00Z',
    createdBy: 'Michael Brown',
  },
  
  // New York Department
  {
    id: '4',
    name: 'New York Metro',
    parentId: '3',
    unitType: 'department',
    status: 'active',
    timezone: 'America/New_York',
    currency: 'USD',
    totalCampaigns: 8,
    totalMedia: 45,
    totalPlaylists: 12,
    totalKiosks: 25,
    totalUsers: 5,
    userAssignments: [
      {
        userId: '5',
        userName: 'David Wilson',
        userEmail: 'david.wilson@globalds.com',
        accessLevel: 'manage',
      },
      {
        userId: '6',
        userName: 'Lisa Anderson',
        userEmail: 'lisa.anderson@globalds.com',
        accessLevel: 'view',
      },
    ],
    createdDate: '2023-04-10T10:00:00Z',
    lastModified: '2024-09-12T16:45:00Z',
    createdBy: 'Emily Davis',
  },
  
  // Boston Department
  {
    id: '5',
    name: 'Boston Area',
    parentId: '3',
    unitType: 'department',
    status: 'active',
    timezone: 'America/New_York',
    currency: 'USD',
    totalCampaigns: 7,
    totalMedia: 50,
    totalPlaylists: 10,
    totalKiosks: 20,
    totalUsers: 3,
    userAssignments: [
      {
        userId: '7',
        userName: 'Robert Martinez',
        userEmail: 'robert.martinez@globalds.com',
        accessLevel: 'manage',
      },
    ],
    createdDate: '2023-05-20T10:00:00Z',
    lastModified: '2024-08-05T10:30:00Z',
    createdBy: 'Emily Davis',
  },
  
  // US West Coast Office
  {
    id: '6',
    name: 'US West Coast',
    parentId: '2',
    unitType: 'regional-office',
    status: 'active',
    timezone: 'America/Los_Angeles',
    currency: 'USD',
    totalCampaigns: 13,
    totalMedia: 85,
    totalPlaylists: 23,
    totalKiosks: 40,
    totalUsers: 7,
    userAssignments: [
      {
        userId: '8',
        userName: 'Jennifer Taylor',
        userEmail: 'jennifer.taylor@globalds.com',
        accessLevel: 'manage',
      },
    ],
    createdDate: '2023-03-20T10:00:00Z',
    lastModified: '2024-11-01T14:20:00Z',
    createdBy: 'Michael Brown',
  },
  
  // Europe Region
  {
    id: '7',
    name: 'Europe',
    parentId: '1',
    unitType: 'legal-entity',
    status: 'active',
    timezone: 'Europe/London',
    currency: 'EUR',
    billingInformation: {
      legalCompanyName: 'Global Digital Signage Europe Ltd',
      billingAddress: '45 King Street, London, EC2V 8AS, UK',
      taxId: 'GB-987654321',
      invoiceEmail: 'billing.eu@globalds.com',
      country: 'United Kingdom',
      region: 'London',
    },
    totalCampaigns: 17,
    totalMedia: 140,
    totalPlaylists: 33,
    totalKiosks: 65,
    totalUsers: 10,
    userAssignments: [
      {
        userId: '9',
        userName: 'James Thompson',
        userEmail: 'james.thompson@globalds.com',
        accessLevel: 'admin',
      },
    ],
    createdDate: '2023-02-15T10:00:00Z',
    lastModified: '2024-10-18T12:40:00Z',
    createdBy: 'John Smith',
  },
  
  // UK Office
  {
    id: '8',
    name: 'United Kingdom',
    parentId: '7',
    unitType: 'regional-office',
    status: 'active',
    timezone: 'Europe/London',
    currency: 'GBP',
    totalCampaigns: 10,
    totalMedia: 75,
    totalPlaylists: 18,
    totalKiosks: 35,
    totalUsers: 6,
    userAssignments: [
      {
        userId: '10',
        userName: 'Emma White',
        userEmail: 'emma.white@globalds.com',
        accessLevel: 'manage',
      },
    ],
    createdDate: '2023-04-05T10:00:00Z',
    lastModified: '2024-09-25T15:10:00Z',
    createdBy: 'James Thompson',
  },
  
  // Germany Office
  {
    id: '9',
    name: 'Germany',
    parentId: '7',
    unitType: 'regional-office',
    status: 'active',
    timezone: 'Europe/Berlin',
    currency: 'EUR',
    totalCampaigns: 7,
    totalMedia: 65,
    totalPlaylists: 15,
    totalKiosks: 30,
    totalUsers: 4,
    userAssignments: [
      {
        userId: '11',
        userName: 'Hans Mueller',
        userEmail: 'hans.mueller@globalds.com',
        accessLevel: 'manage',
      },
    ],
    createdDate: '2023-05-10T10:00:00Z',
    lastModified: '2024-08-30T11:25:00Z',
    createdBy: 'James Thompson',
  },
  
  // Partner Agency (Sub-agency type)
  {
    id: '10',
    name: 'Creative Partners Agency',
    parentId: '1',
    unitType: 'sub-agency',
    status: 'active',
    timezone: 'America/New_York',
    currency: 'USD',
    totalCampaigns: 5,
    totalMedia: 35,
    totalPlaylists: 8,
    totalKiosks: 15,
    totalUsers: 3,
    userAssignments: [
      {
        userId: '12',
        userName: 'Alex Johnson',
        userEmail: 'alex@creativepartners.com',
        accessLevel: 'admin',
      },
    ],
    createdDate: '2023-06-01T10:00:00Z',
    lastModified: '2024-11-20T09:15:00Z',
    createdBy: 'John Smith',
  },
  
  // India Region (Legal Entity with GST)
  {
    id: '11',
    name: 'India Operations',
    parentId: '1',
    unitType: 'legal-entity',
    status: 'active',
    timezone: 'Asia/Kolkata',
    currency: 'INR',
    billingInformation: {
      legalCompanyName: 'Global Digital Signage India Private Limited',
      billingAddress: 'Tower A, Block 5, Cyber City, Sector 29, Gurgaon, Haryana - 122002, India',
      taxId: 'AABCG1234F',
      invoiceEmail: 'billing.india@globalds.com',
      country: 'India',
      region: 'Haryana',
      gstData: {
        isGSTRegistered: true,
        gstin: '06AABCG1234F1Z5',
        stateCode: '06',
        stateName: 'Haryana',
        gstRegistrationDate: '2023-01-15',
        compositionScheme: false,
        reverseChargeApplicable: false,
      },
    },
    totalCampaigns: 12,
    totalMedia: 95,
    totalPlaylists: 24,
    totalKiosks: 48,
    totalUsers: 8,
    userAssignments: [
      {
        userId: '13',
        userName: 'Rajesh Kumar',
        userEmail: 'rajesh.kumar@globalds.com',
        accessLevel: 'admin',
      },
      {
        userId: '14',
        userName: 'Priya Sharma',
        userEmail: 'priya.sharma@globalds.com',
        accessLevel: 'admin',
      },
    ],
    createdDate: '2023-01-15T10:00:00Z',
    lastModified: '2024-12-15T14:30:00Z',
    createdBy: 'John Smith',
  },
];

export const getUnitTypeLabel = (type: UnitType): string => {
  const labels = {
    'legal-entity': 'Legal Entity',
    'regional-office': 'Regional Office',
    'sub-agency': 'Sub-Agency',
    'department': 'Department',
  };
  return labels[type];
};

export const getUnitTypeColor = (type: UnitType): string => {
  const colors = {
    'legal-entity': 'bg-purple-50 text-purple-700 border-purple-200',
    'regional-office': 'bg-blue-50 text-blue-700 border-blue-200',
    'sub-agency': 'bg-orange-50 text-orange-700 border-orange-200',
    'department': 'bg-gray-50 text-gray-700 border-gray-200',
  };
  return colors[type];
};

export const getStatusLabel = (status: UnitStatus): string => {
  const labels = {
    active: 'Active',
    inactive: 'Inactive',
  };
  return labels[status];
};

export const getStatusColor = (status: UnitStatus): string => {
  const colors = {
    active: 'bg-green-50 text-green-700 border-green-200',
    inactive: 'bg-gray-50 text-gray-700 border-gray-200',
  };
  return colors[status];
};

export const getAccessLevelLabel = (level: AccessLevel): string => {
  const labels = {
    view: 'View Only',
    manage: 'Manage',
    admin: 'Administrator',
  };
  return labels[level];
};

export const getAccessLevelColor = (level: AccessLevel): string => {
  const colors = {
    view: 'bg-gray-50 text-gray-700 border-gray-200',
    manage: 'bg-blue-50 text-blue-700 border-blue-200',
    admin: 'bg-purple-50 text-purple-700 border-purple-200',
  };
  return colors[level];
};

// Build hierarchical tree structure
export const buildOrganizationTree = (units: OrganizationUnit[]): OrganizationUnit[] => {
  const unitMap = new Map<string, OrganizationUnit & { children?: OrganizationUnit[] }>();
  
  // Create map of all units
  units.forEach(unit => {
    unitMap.set(unit.id, { ...unit, children: [] });
  });
  
  // Build tree structure
  const tree: OrganizationUnit[] = [];
  unitMap.forEach(unit => {
    if (unit.parentId === null) {
      tree.push(unit);
    } else {
      const parent = unitMap.get(unit.parentId);
      if (parent && parent.children) {
        parent.children.push(unit);
      }
    }
  });
  
  return tree;
};

// Get breadcrumb path for a unit
export const getBreadcrumbPath = (unitId: string, units: OrganizationUnit[]): OrganizationUnit[] => {
  const path: OrganizationUnit[] = [];
  let currentId: string | null = unitId;
  
  while (currentId !== null) {
    const unit = units.find(u => u.id === currentId);
    if (!unit) break;
    path.unshift(unit);
    currentId = unit.parentId;
  }
  
  return path;
};

// Get all child units (recursive)
export const getAllChildUnits = (unitId: string, units: OrganizationUnit[]): OrganizationUnit[] => {
  const children: OrganizationUnit[] = [];
  const directChildren = units.filter(u => u.parentId === unitId);
  
  directChildren.forEach(child => {
    children.push(child);
    children.push(...getAllChildUnits(child.id, units));
  });
  
  return children;
};

// Check if moving a unit would create circular reference
export const wouldCreateCircularReference = (
  unitId: string,
  newParentId: string,
  units: OrganizationUnit[]
): boolean => {
  const childUnits = getAllChildUnits(unitId, units);
  return childUnits.some(child => child.id === newParentId);
};