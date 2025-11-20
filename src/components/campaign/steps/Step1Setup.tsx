import { CampaignData } from '../NewCampaignWizard';

interface Step1SetupProps {
  data: Partial<CampaignData>;
  onUpdate: (updates: Partial<CampaignData>) => void;
  onCreateClient?: () => void;
}

// Mock clients data
const MOCK_CLIENTS = [
  { id: '1', name: 'Acme Corporation' },
  { id: '2', name: 'Brew Coffee Co.' },
  { id: '3', name: 'FitLife Gym' },
  { id: '4', name: 'TechStart Inc.' },
  { id: '5', name: 'Urban Retail Group' },
];

export function Step1Setup({ data, onUpdate, onCreateClient }: Step1SetupProps) {
  return (
    <div className="p-8">
      <div className="max-w-[600px] mx-auto">
        {/* Section Title */}
        <div className="mb-8">
          <h3 className="text-[#111827] mb-2">Campaign Setup</h3>
          <p className="text-[#6B7280]">
            Let's start by setting up the basic details for your campaign.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
          <div className="space-y-6">
            {/* Campaign Name */}
            <div>
              <label className="block text-sm text-[#111827] mb-2">
                Campaign Name <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="text"
                value={data.campaignName || ''}
                onChange={(e) => onUpdate({ campaignName: e.target.value })}
                placeholder="e.g., Summer Sale 2025"
                className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-md text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>

            {/* Brand/Client */}
            <div>
              <label className="block text-sm text-[#111827] mb-2">
                Brand / Client <span className="text-[#DC2626]">*</span>
              </label>
              <select
                value={data.clientId || ''}
                onChange={(e) => {
                  const selectedClient = MOCK_CLIENTS.find(c => c.id === e.target.value);
                  onUpdate({
                    clientId: e.target.value,
                    clientName: selectedClient?.name
                  });
                }}
                className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-md text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              >
                <option value="">Select a brand or client</option>
                {MOCK_CLIENTS.map(client => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
              {onCreateClient && (
                <button
                  onClick={onCreateClient}
                  className="mt-2 text-sm text-[#3B82F6] hover:underline"
                >
                  Create New Client
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}