// Mock Data for Media Billing Module

export interface MediaInvoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  billingPeriod: {
    start: string;
    end: string;
  };
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  issueDate: string;
  legalEntityId: string;
  legalEntityName: string;
  legalEntityGST: string;
  clientGST?: string;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  discount?: {
    type: 'percentage' | 'fixed';
    value: number;
    reason: string;
  };
  tax?: {
    cgst: number;
    sgst: number;
    igst: number;
  };
  total: number;
}

export interface InvoiceLineItem {
  campaignId: string;
  campaignName: string;
  scheduledHours: number;
  actualPopHours: number;
  screens: number;
  regions: string[];
  peakSlots: number;
  nonPeakSlots: number;
  peakRate: number;
  nonPeakRate: number;
  lineTotal: number;
}

export interface CampaignPoP {
  campaignId: string;
  campaignName: string;
  clientId: string;
  scheduledStart: string;
  scheduledEnd: string;
  scheduledHours: number;
  actualPopHours: number;
  screens: number;
  regions: string[];
  peakSlots: number;
  nonPeakSlots: number;
  peakRate: number;
  nonPeakRate: number;
  status: 'active' | 'completed';
}

export const mockMediaInvoices: MediaInvoice[] = [
  {
    id: 'inv-001',
    invoiceNumber: 'INV-2025-001',
    clientId: 'client-1',
    clientName: 'Acme Corporation',
    billingPeriod: {
      start: '2025-01-01',
      end: '2025-01-31',
    },
    amount: 285000,
    status: 'paid',
    dueDate: '2025-02-15',
    issueDate: '2025-02-01',
    legalEntityId: 'legal-entity-1',
    legalEntityName: 'Elextrify India Pvt Ltd',
    legalEntityGST: '27AABCE1234F1Z5',
    clientGST: '29AABCT1234F1Z5',
    lineItems: [
      {
        campaignId: 'camp-001',
        campaignName: 'Diwali 2025 Offer',
        scheduledHours: 240,
        actualPopHours: 235,
        screens: 15,
        regions: ['Mumbai', 'Delhi', 'Bangalore'],
        peakSlots: 120,
        nonPeakSlots: 115,
        peakRate: 1200,
        nonPeakRate: 800,
        lineTotal: 236000,
      },
    ],
    subtotal: 236000,
    discount: {
      type: 'percentage',
      value: 10,
      reason: 'Long-term client discount',
    },
    tax: {
      cgst: 19170,
      sgst: 19170,
      igst: 0,
    },
    total: 285000,
  },
  {
    id: 'inv-002',
    invoiceNumber: 'INV-2025-002',
    clientId: 'client-2',
    clientName: 'TechStart Inc.',
    billingPeriod: {
      start: '2025-01-01',
      end: '2025-01-31',
    },
    amount: 156000,
    status: 'pending',
    dueDate: '2025-02-20',
    issueDate: '2025-02-05',
    legalEntityId: 'legal-entity-1',
    legalEntityName: 'Elextrify India Pvt Ltd',
    legalEntityGST: '27AABCE1234F1Z5',
    lineItems: [
      {
        campaignId: 'camp-002',
        campaignName: 'Product Launch 2025',
        scheduledHours: 160,
        actualPopHours: 158,
        screens: 8,
        regions: ['Mumbai', 'Pune'],
        peakSlots: 80,
        nonPeakSlots: 78,
        peakRate: 1000,
        nonPeakRate: 650,
        lineTotal: 130700,
      },
    ],
    subtotal: 130700,
    tax: {
      cgst: 11761.5,
      sgst: 11761.5,
      igst: 0,
    },
    total: 154223,
  },
  {
    id: 'inv-003',
    invoiceNumber: 'INV-2025-003',
    clientId: 'client-3',
    clientName: 'RetailHub',
    billingPeriod: {
      start: '2024-12-01',
      end: '2024-12-31',
    },
    amount: 98000,
    status: 'overdue',
    dueDate: '2025-01-15',
    issueDate: '2025-01-01',
    legalEntityId: 'legal-entity-1',
    legalEntityName: 'Elextrify India Pvt Ltd',
    legalEntityGST: '27AABCE1234F1Z5',
    clientGST: '27AABCH1234F1Z5',
    lineItems: [
      {
        campaignId: 'camp-003',
        campaignName: 'Holiday Sale Campaign',
        scheduledHours: 120,
        actualPopHours: 115,
        screens: 10,
        regions: ['Delhi', 'Noida'],
        peakSlots: 60,
        nonPeakSlots: 55,
        peakRate: 900,
        nonPeakRate: 600,
        lineTotal: 87000,
      },
    ],
    subtotal: 87000,
    tax: {
      cgst: 7830,
      sgst: 7830,
      igst: 0,
    },
    total: 102660,
  },
  {
    id: 'inv-004',
    invoiceNumber: 'INV-2025-004',
    clientId: 'client-1',
    clientName: 'Acme Corporation',
    billingPeriod: {
      start: '2025-02-01',
      end: '2025-02-28',
    },
    amount: 320000,
    status: 'pending',
    dueDate: '2025-03-15',
    issueDate: '2025-03-01',
    legalEntityId: 'legal-entity-1',
    legalEntityName: 'Elextrify India Pvt Ltd',
    legalEntityGST: '27AABCE1234F1Z5',
    clientGST: '29AABCT1234F1Z5',
    lineItems: [
      {
        campaignId: 'camp-004',
        campaignName: 'Spring Collection Launch',
        scheduledHours: 280,
        actualPopHours: 275,
        screens: 20,
        regions: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad'],
        peakSlots: 140,
        nonPeakSlots: 135,
        peakRate: 1200,
        nonPeakRate: 800,
        lineTotal: 276000,
      },
    ],
    subtotal: 276000,
    tax: {
      cgst: 24840,
      sgst: 24840,
      igst: 0,
    },
    total: 325680,
  },
  {
    id: 'inv-005',
    invoiceNumber: 'INV-2025-005',
    clientId: 'client-4',
    clientName: 'FitLife Gym',
    billingPeriod: {
      start: '2025-01-01',
      end: '2025-01-31',
    },
    amount: 67500,
    status: 'paid',
    dueDate: '2025-02-10',
    issueDate: '2025-02-01',
    legalEntityId: 'legal-entity-1',
    legalEntityName: 'Elextrify India Pvt Ltd',
    legalEntityGST: '27AABCE1234F1Z5',
    lineItems: [
      {
        campaignId: 'camp-005',
        campaignName: 'New Year Fitness Drive',
        scheduledHours: 100,
        actualPopHours: 98,
        screens: 6,
        regions: ['Mumbai', 'Pune'],
        peakSlots: 50,
        nonPeakSlots: 48,
        peakRate: 800,
        nonPeakRate: 550,
        lineTotal: 66400,
      },
    ],
    subtotal: 66400,
    tax: {
      cgst: 5976,
      sgst: 5976,
      igst: 0,
    },
    total: 78352,
  },
];

export const mockCampaignPoP: CampaignPoP[] = [
  {
    campaignId: 'camp-006',
    campaignName: 'Summer Sale 2025',
    clientId: 'client-1',
    scheduledStart: '2025-03-01',
    scheduledEnd: '2025-03-31',
    scheduledHours: 300,
    actualPopHours: 295,
    screens: 18,
    regions: ['Mumbai', 'Delhi', 'Bangalore'],
    peakSlots: 150,
    nonPeakSlots: 145,
    peakRate: 1200,
    nonPeakRate: 800,
    status: 'completed',
  },
  {
    campaignId: 'camp-007',
    campaignName: 'Brand Awareness Q1',
    clientId: 'client-2',
    scheduledStart: '2025-03-01',
    scheduledEnd: '2025-03-31',
    scheduledHours: 200,
    actualPopHours: 198,
    screens: 12,
    regions: ['Mumbai', 'Pune', 'Nashik'],
    peakSlots: 100,
    nonPeakSlots: 98,
    peakRate: 1000,
    nonPeakRate: 650,
    status: 'completed',
  },
  {
    campaignId: 'camp-008',
    campaignName: 'Product Demo Campaign',
    clientId: 'client-3',
    scheduledStart: '2025-03-15',
    scheduledEnd: '2025-04-15',
    scheduledHours: 240,
    actualPopHours: 0, // Still running
    screens: 15,
    regions: ['Delhi', 'Gurgaon', 'Noida'],
    peakSlots: 120,
    nonPeakSlots: 120,
    peakRate: 900,
    nonPeakRate: 600,
    status: 'active',
  },
];

export interface BillingKPI {
  totalRevenue: number;
  pendingAmount: number;
  overdueAmount: number;
  totalInvoices: number;
  paidInvoices: number;
  pendingInvoices: number;
  overdueInvoices: number;
}

export const mockBillingKPIs: BillingKPI = {
  totalRevenue: 926352,
  pendingAmount: 479903,
  overdueAmount: 102660,
  totalInvoices: 5,
  paidInvoices: 2,
  pendingInvoices: 2,
  overdueInvoices: 1,
};

export interface TopClient {
  clientId: string;
  clientName: string;
  totalRevenue: number;
  invoiceCount: number;
}

export const mockTopClients: TopClient[] = [
  {
    clientId: 'client-1',
    clientName: 'Acme Corporation',
    totalRevenue: 610680,
    invoiceCount: 2,
  },
  {
    clientId: 'client-2',
    clientName: 'TechStart Inc.',
    totalRevenue: 154223,
    invoiceCount: 1,
  },
  {
    clientId: 'client-3',
    clientName: 'RetailHub',
    totalRevenue: 102660,
    invoiceCount: 1,
  },
  {
    clientId: 'client-4',
    clientName: 'FitLife Gym',
    totalRevenue: 78352,
    invoiceCount: 1,
  },
];
