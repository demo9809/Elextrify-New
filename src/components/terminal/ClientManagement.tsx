import { useState } from 'react';
import { Plus, Search, Edit, Trash2, X, Building2 } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  industry: string;
  contactEmail: string;
  contactPhone: string;
  createdAt: string;
  activePrograms: number;
}

const MOCK_CLIENTS: Client[] = [
  {
    id: 'client-1',
    name: 'Acme Corporation',
    industry: 'Retail',
    contactEmail: 'contact@acme.com',
    contactPhone: '+1 (555) 123-4567',
    createdAt: '2025-01-15',
    activePrograms: 2,
  },
  {
    id: 'client-2',
    name: 'Brew Coffee Co.',
    industry: 'F&B',
    contactEmail: 'hello@brewcoffee.com',
    contactPhone: '+1 (555) 234-5678',
    createdAt: '2025-02-20',
    activePrograms: 1,
  },
  {
    id: 'client-3',
    name: 'FitLife Gym',
    industry: 'Fitness',
    contactEmail: 'info@fitlife.com',
    contactPhone: '+1 (555) 345-6789',
    createdAt: '2025-03-10',
    activePrograms: 1,
  },
  {
    id: 'client-4',
    name: 'TechStart Inc.',
    industry: 'Technology',
    contactEmail: 'support@techstart.com',
    contactPhone: '+1 (555) 456-7890',
    createdAt: '2025-04-05',
    activePrograms: 0,
  },
];

interface ClientManagementProps {
  onBack: () => void;
}

export function ClientManagement({ onBack }: ClientManagementProps) {
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const handleCreateClient = () => {
    setEditingClient(null);
    setShowModal(true);
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setShowModal(true);
  };

  const handleDeleteClient = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    if (client && client.activePrograms > 0) {
      alert(`Cannot delete client with ${client.activePrograms} active campaign(s)`);
      return;
    }
    if (confirm('Delete this client?')) {
      setClients(clients.filter(c => c.id !== clientId));
    }
  };

  const handleSaveClient = (clientData: Partial<Client>) => {
    if (editingClient) {
      // Update existing client
      setClients(clients.map(c => 
        c.id === editingClient.id 
          ? { ...c, ...clientData }
          : c
      ));
    } else {
      // Create new client
      const newClient: Client = {
        id: `client-${Date.now()}`,
        ...clientData as Client,
        createdAt: new Date().toISOString(),
        activePrograms: 0,
      };
      setClients([newClient, ...clients]);
    }
    setShowModal(false);
    setEditingClient(null);
  };

  const filteredClients = clients.filter(client => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      client.name.toLowerCase().includes(query) ||
      client.industry.toLowerCase().includes(query) ||
      client.contactEmail.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-[#111827] mb-2">Client Management</h1>
              <p className="text-[#6B7280]">
                Manage advertiser clients and their information
              </p>
            </div>
            <button
              onClick={handleCreateClient}
              className="flex items-center gap-2 px-6 h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Client
            </button>
          </div>
        </div>

        {/* Clients Table */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
          {/* Search */}
          <div className="px-6 py-4 border-b border-[#E5E7EB]">
            <div className="relative max-w-[320px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              />
            </div>
          </div>

          {/* Table Header */}
          <div className="px-6 py-3 bg-[#F9FAFB] border-b border-[#E5E7EB]">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3 text-xs text-[#6B7280]">Client Name</div>
              <div className="col-span-2 text-xs text-[#6B7280]">Industry</div>
              <div className="col-span-3 text-xs text-[#6B7280]">Contact Email</div>
              <div className="col-span-2 text-xs text-[#6B7280]">Phone</div>
              <div className="col-span-1 text-xs text-[#6B7280]">Campaigns</div>
              <div className="col-span-1 text-xs text-[#6B7280] text-right">Actions</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-[#E5E7EB]">
            {filteredClients.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <Building2 className="w-12 h-12 text-[#E5E7EB] mx-auto mb-3" />
                <p className="text-[#6B7280] mb-2">No clients found</p>
                <p className="text-sm text-[#9CA3AF]">
                  {searchQuery
                    ? 'Try adjusting your search'
                    : 'Add your first client to get started'}
                </p>
              </div>
            ) : (
              filteredClients.map(client => (
                <div key={client.id} className="px-6 py-4 hover:bg-[#F9FAFB] transition-colors">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Client Name */}
                    <div className="col-span-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#F3F4F6] rounded-lg flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-[#6B7280]" />
                        </div>
                        <p className="text-sm text-[#111827] font-medium">
                          {client.name}
                        </p>
                      </div>
                    </div>

                    {/* Industry */}
                    <div className="col-span-2">
                      <span className="inline-flex px-2 py-1 bg-[#F3F4F6] text-[#111827] rounded text-xs">
                        {client.industry}
                      </span>
                    </div>

                    {/* Contact Email */}
                    <div className="col-span-3">
                      <p className="text-sm text-[#6B7280]">{client.contactEmail}</p>
                    </div>

                    {/* Phone */}
                    <div className="col-span-2">
                      <p className="text-sm text-[#6B7280]">{client.contactPhone}</p>
                    </div>

                    {/* Active Campaigns */}
                    <div className="col-span-1">
                      <p className="text-sm text-[#111827]">
                        {client.activePrograms}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleEditClient(client)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F0F9FF] text-[#6B7280] hover:text-[#D9480F] transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClient(client.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#FEE2E2] text-[#6B7280] hover:text-[#DC2626] transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Client Modal */}
      {showModal && (
        <ClientModal
          client={editingClient}
          onClose={() => {
            setShowModal(false);
            setEditingClient(null);
          }}
          onSave={handleSaveClient}
        />
      )}
    </div>
  );
}

interface ClientModalProps {
  client: Client | null;
  onClose: () => void;
  onSave: (data: Partial<Client>) => void;
}

function ClientModal({ client, onClose, onSave }: ClientModalProps) {
  const [name, setName] = useState(client?.name || '');
  const [industry, setIndustry] = useState(client?.industry || '');
  const [contactEmail, setContactEmail] = useState(client?.contactEmail || '');
  const [contactPhone, setContactPhone] = useState(client?.contactPhone || '');

  const handleSubmit = () => {
    if (!name.trim() || !industry.trim() || !contactEmail.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    onSave({
      name: name.trim(),
      industry: industry.trim(),
      contactEmail: contactEmail.trim(),
      contactPhone: contactPhone.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-[560px]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
          <h3 className="text-[#111827]">
            {client ? 'Edit Client' : 'Add New Client'}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F9FAFB] text-[#6B7280] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Client Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 px-3 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              placeholder="e.g., Acme Corporation"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Industry *
            </label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full h-10 px-3 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            >
              <option value="">Select industry</option>
              <option value="Retail">Retail</option>
              <option value="F&B">Food & Beverage</option>
              <option value="Fitness">Fitness & Wellness</option>
              <option value="Technology">Technology</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Finance">Finance</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Contact Email *
            </label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full h-10 px-3 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              placeholder="contact@company.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Contact Phone
            </label>
            <input
              type="tel"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="w-full h-10 px-3 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E5E7EB] flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 h-10 text-sm text-[#6B7280] border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 h-10 text-sm bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] transition-colors"
          >
            {client ? 'Save Changes' : 'Add Client'}
          </button>
        </div>
      </div>
    </div>
  );
}