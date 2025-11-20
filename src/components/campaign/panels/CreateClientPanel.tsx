import { useState } from 'react';
import { X, Building2 } from 'lucide-react';

interface CreateClientPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (clientId: string, clientName: string) => void;
}

const INDUSTRIES = [
  'Retail',
  'F&B',
  'Fitness',
  'Technology',
  'Healthcare',
  'Entertainment',
  'Real Estate',
  'Education',
  'Other',
];

export function CreateClientPanel({ isOpen, onClose, onSave }: CreateClientPanelProps) {
  const [clientName, setClientName] = useState('');
  const [industry, setIndustry] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const handleSave = () => {
    if (!clientName || !industry) return;
    
    // Generate a mock client ID
    const clientId = `client-${Date.now()}`;
    onSave(clientId, clientName);
    
    // Reset form
    setClientName('');
    setIndustry('');
    setContactName('');
    setContactEmail('');
    setContactPhone('');
  };

  const canSave = clientName.trim() && industry;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-end">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Panel - 480px width */}
      <div className="relative w-[480px] h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FEF2F2] rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-[#D9480F]" />
            </div>
            <div>
              <h3 className="text-[#111827]">Create New Client</h3>
              <p className="text-sm text-[#6B7280]">Add a new client to your account</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F9FAFB] transition-colors"
          >
            <X className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Client Name */}
            <div>
              <label className="block text-sm text-[#111827] mb-2">
                Client Name <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g., Acme Corporation"
                className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-md text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              />
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm text-[#111827] mb-2">
                Industry <span className="text-[#DC2626]">*</span>
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-md text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              >
                <option value="">Select an industry...</option>
                {INDUSTRIES.map(ind => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>

            {/* Contact Information */}
            <div className="pt-6 border-t border-[#E5E7EB]">
              <h4 className="text-sm text-[#111827] mb-4">Contact Information (Optional)</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-[#6B7280] mb-2">
                    Contact Name
                  </label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g., John Doe"
                    className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-md text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#6B7280] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-md text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#6B7280] mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-md text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E5E7EB] flex items-center justify-end gap-3 bg-white">
          <button
            onClick={onClose}
            className="px-6 h-11 rounded-lg border border-[#E5E7EB] text-[#111827] hover:bg-[#F9FAFB] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!canSave}
            className={`px-6 h-11 rounded-lg transition-colors ${
              canSave
                ? 'bg-[#D9480F] text-white hover:bg-[#C23D0D]'
                : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
            }`}
          >
            Save Client
          </button>
        </div>
      </div>
    </div>
  );
}
