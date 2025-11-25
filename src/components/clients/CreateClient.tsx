import { useState } from 'react';
import { X, Save, Upload, Building2, User, Mail, Phone, FileText, Tag as TagIcon, Plus, AlertCircle } from 'lucide-react';

interface CreateClientProps {
  onClose: () => void;
  onSuccess: () => void;
  existingClient?: any;
}

export function CreateClient({ onClose, onSuccess, existingClient }: CreateClientProps) {
  const isEdit = !!existingClient;
  
  const [name, setName] = useState(existingClient?.name || '');
  const [industry, setIndustry] = useState(existingClient?.industry || '');
  const [contactPerson, setContactPerson] = useState(existingClient?.contactPerson || '');
  const [contactEmail, setContactEmail] = useState(existingClient?.contactEmail || '');
  const [contactPhone, setContactPhone] = useState(existingClient?.contactPhone || '');
  const [notes, setNotes] = useState(existingClient?.notes || '');
  const [status, setStatus] = useState(existingClient?.status || 'active');
  const [selectedTags, setSelectedTags] = useState<string[]>(existingClient?.tags || []);
  const [showTagInput, setShowTagInput] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const industries = [
    'Retail',
    'Food & Beverage',
    'Fitness & Wellness',
    'Technology',
    'Fashion & Apparel',
    'Healthcare',
    'Education',
    'Finance',
    'Entertainment',
    'Real Estate',
    'Automotive',
    'Travel & Hospitality'
  ];

  const allTags = ['Premium', 'Enterprise', 'Mid-Market', 'Small Business', 'Tech', 'Seasonal', 'VIP'];
  const availableTags = allTags.filter(tag => !selectedTags.includes(tag));

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Client name is required';
    }

    if (!industry) {
      newErrors.industry = 'Please select an industry';
    }

    if (!contactPerson.trim()) {
      newErrors.contactPerson = 'Contact person is required';
    }

    if (!contactEmail.trim()) {
      newErrors.contactEmail = 'Contact email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    console.log('Saving client:', {
      name,
      industry,
      contactPerson,
      contactEmail,
      contactPhone,
      notes,
      status,
      tags: selectedTags
    });

    onSuccess();
  };

  const handleAddTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setShowTagInput(false);
    setNewTag('');
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[640px] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-8 py-6 border-b border-[#E5E7EB] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#D9480F] to-[#C23D0D] rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[#111827]">
                {isEdit ? 'Edit Client' : 'Create New Client'}
              </h2>
              <p className="text-sm text-[#6B7280]">
                {isEdit ? 'Update client information' : 'Add a new client to your platform'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-[#F9FAFB] hover:bg-[#F3F4F6] rounded-lg flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {/* Client Name */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Client Name <span className="text-[#DC2626]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) {
                  setErrors({ ...errors, name: '' });
                }
              }}
              placeholder="e.g., Acme Corporation"
              className={`w-full h-11 px-4 bg-white border rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent ${
                errors.name ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-[#DC2626] flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Client Logo
            </label>
            <div className="border-2 border-dashed border-[#E5E7EB] rounded-lg p-6 text-center hover:border-[#D9480F] transition-colors">
              <Upload className="w-8 h-8 text-[#9CA3AF] mx-auto mb-2" />
              <p className="text-sm text-[#6B7280] mb-3">
                Drop logo here or click to browse
              </p>
              <label>
                <input type="file" accept="image/*" className="hidden" />
                <span className="h-9 px-4 bg-[#F9FAFB] text-[#111827] rounded-lg hover:bg-[#F3F4F6] transition-colors font-medium cursor-pointer inline-flex items-center gap-2 text-sm border border-[#E5E7EB]">
                  Choose File
                </span>
              </label>
              <p className="text-xs text-[#9CA3AF] mt-2">
                Recommended: 200x200px, PNG or JPG
              </p>
            </div>
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Industry <span className="text-[#DC2626]">*</span>
            </label>
            <select
              value={industry}
              onChange={(e) => {
                setIndustry(e.target.value);
                if (errors.industry) {
                  setErrors({ ...errors, industry: '' });
                }
              }}
              className={`w-full h-11 px-4 bg-white border rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent ${
                errors.industry ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
              }`}
            >
              <option value="">Select an industry</option>
              {industries.map(ind => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
            {errors.industry && (
              <p className="mt-1 text-xs text-[#DC2626] flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.industry}
              </p>
            )}
          </div>

          {/* Contact Person */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Main Contact Person <span className="text-[#DC2626]">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
              <input
                type="text"
                value={contactPerson}
                onChange={(e) => {
                  setContactPerson(e.target.value);
                  if (errors.contactPerson) {
                    setErrors({ ...errors, contactPerson: '' });
                  }
                }}
                placeholder="e.g., John Smith"
                className={`w-full h-11 pl-10 pr-4 bg-white border rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent ${
                  errors.contactPerson ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                }`}
              />
            </div>
            {errors.contactPerson && (
              <p className="mt-1 text-xs text-[#DC2626] flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.contactPerson}
              </p>
            )}
          </div>

          {/* Contact Email */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Contact Email <span className="text-[#DC2626]">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => {
                  setContactEmail(e.target.value);
                  if (errors.contactEmail) {
                    setErrors({ ...errors, contactEmail: '' });
                  }
                }}
                placeholder="e.g., john@acme.com"
                className={`w-full h-11 pl-10 pr-4 bg-white border rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent ${
                  errors.contactEmail ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                }`}
              />
            </div>
            {errors.contactEmail && (
              <p className="mt-1 text-xs text-[#DC2626] flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.contactEmail}
              </p>
            )}
          </div>

          {/* Contact Phone */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Contact Phone
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="e.g., +1 (555) 123-4567"
                className="w-full h-11 pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedTags.map(tag => (
                <span
                  key={tag}
                  className="px-3 h-8 bg-[#D9480F] text-white rounded-lg text-sm font-medium flex items-center gap-2"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:bg-white/20 rounded p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {showTagInput ? (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Type new tag..."
                    className="flex-1 h-9 px-3 bg-white border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newTag.trim()) {
                        handleAddTag(newTag.trim());
                      }
                    }}
                  />
                  <button
                    onClick={() => newTag.trim() && handleAddTag(newTag.trim())}
                    className="h-9 px-4 bg-[#D9480F] text-white rounded-lg hover:bg-[#C43F0D] text-sm font-medium"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setShowTagInput(false);
                      setNewTag('');
                    }}
                    className="h-9 px-4 bg-[#F9FAFB] text-[#6B7280] rounded-lg hover:bg-[#F3F4F6] text-sm font-medium"
                  >
                    Cancel
                  </button>
                </div>
                {availableTags.length > 0 && (
                  <div>
                    <p className="text-xs text-[#6B7280] mb-2">Or choose from existing:</p>
                    <div className="flex flex-wrap gap-2">
                      {availableTags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => handleAddTag(tag)}
                          className="px-3 h-7 bg-[#F9FAFB] text-[#6B7280] rounded text-sm hover:bg-[#D9480F] hover:text-white transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowTagInput(true)}
                className="w-full h-9 border-2 border-dashed border-[#E5E7EB] rounded-lg text-sm text-[#6B7280] hover:border-[#D9480F] hover:text-[#D9480F] transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Tag
              </button>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes about this client..."
              rows={4}
              className="w-full px-4 py-3 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent resize-none"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-3">
              Status
            </label>
            <div className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg">
              <div>
                <p className="text-sm font-medium text-[#111827] mb-1">
                  {status === 'active' ? 'Active' : 'Archived'}
                </p>
                <p className="text-xs text-[#6B7280]">
                  {status === 'active' 
                    ? 'Client can access campaigns and create content'
                    : 'Client data is read-only and inactive'
                  }
                </p>
              </div>
              <button
                onClick={() => setStatus(status === 'active' ? 'archived' : 'active')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  status === 'active' ? 'bg-[#10B981]' : 'bg-[#E5E7EB]'
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    status === 'active' ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-[#E5E7EB] flex items-center justify-between flex-shrink-0">
          <button
            onClick={onClose}
            className="h-11 px-6 bg-white border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-[#F9FAFB] transition-colors font-medium"
          >
            Cancel
          </button>
          <div className="flex items-center gap-3">
            {isEdit && (
              <button
                className="h-11 px-6 bg-white border border-[#DC2626] text-[#DC2626] rounded-lg hover:bg-[#FEF2F2] transition-colors font-medium"
              >
                Archive Client
              </button>
            )}
            <button
              onClick={handleSubmit}
              className="h-11 px-6 bg-[#D9480F] text-white rounded-lg hover:bg-[#C43F0D] transition-colors font-medium flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              {isEdit ? 'Save Changes' : 'Create Client'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
