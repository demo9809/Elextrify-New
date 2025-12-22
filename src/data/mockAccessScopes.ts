// Mock Organization Units
export const mockOrganizationUnits = [
  {
    id: 'legal-entity-1',
    name: 'Elextrify India Pvt Ltd',
    type: 'legal-entity' as const,
    children: [
      {
        id: 'unit-north',
        name: 'North Region',
        type: 'operational-unit' as const,
        children: [
          {
            id: 'unit-delhi',
            name: 'Delhi Operations',
            type: 'operational-unit' as const,
          },
          {
            id: 'unit-punjab',
            name: 'Punjab Operations',
            type: 'operational-unit' as const,
          },
        ],
      },
      {
        id: 'unit-south',
        name: 'South Region',
        type: 'operational-unit' as const,
        children: [
          {
            id: 'unit-bangalore',
            name: 'Bangalore Operations',
            type: 'operational-unit' as const,
          },
          {
            id: 'unit-chennai',
            name: 'Chennai Operations',
            type: 'operational-unit' as const,
          },
        ],
      },
    ],
  },
  {
    id: 'legal-entity-2',
    name: 'Elextrify Global LLC',
    type: 'legal-entity' as const,
    children: [
      {
        id: 'unit-usa',
        name: 'USA Operations',
        type: 'operational-unit' as const,
      },
      {
        id: 'unit-uk',
        name: 'UK Operations',
        type: 'operational-unit' as const,
      },
    ],
  },
];

// Mock Clients
export const mockClients = [
  { id: 'client-1', name: 'Acme Corporation', status: 'active' as const },
  { id: 'client-2', name: 'TechStart Inc', status: 'active' as const },
  { id: 'client-3', name: 'RetailHub', status: 'active' as const },
  { id: 'client-4', name: 'HealthCare Plus', status: 'active' as const },
  { id: 'client-5', name: 'EduLearn', status: 'inactive' as const },
  { id: 'client-6', name: 'FoodDelight', status: 'active' as const },
  { id: 'client-7', name: 'Fashion Forward', status: 'active' as const },
  { id: 'client-8', name: 'Auto World', status: 'inactive' as const },
];

// Primary Legal Entity ID (default selection)
export const PRIMARY_LEGAL_ENTITY_ID = 'legal-entity-1';
