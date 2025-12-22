import React, { useState, useMemo } from 'react';
import { 
  X, 
  Mail, 
  Shield, 
  Building2, 
  Users, 
  CheckCircle2, 
  AlertCircle,
  Search,
  ChevronRight,
  ChevronDown,
  Filter,
  Check
} from 'lucide-react';

// Types
interface OrganizationUnit {
  id: string;
  name: string;
  type: 'legal-entity' | 'operational-unit';
  children?: OrganizationUnit[];
}

interface Client {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  region?: string;
  tags?: string[];
}

interface Role {
  id: string;
  label: string;
  description: string;
  requiresClientScoping: boolean;
  requiresOrgUnitScoping: boolean;
  canAccessMultipleUnits: boolean;
}

interface InviteUserWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (inviteData: any) => void;
  organizationUnits: OrganizationUnit[];
  clients: Client[];
  primaryLegalEntityId: string;
}

// Role Definitions
const ROLES: Role[] = [
  {
    id: 'viewer',
    label: 'Viewer',
    description: 'Read-only access to campaigns and reports. Cannot make changes.',
    requiresClientScoping: true,
    requiresOrgUnitScoping: true,
    canAccessMultipleUnits: false,
  },
  {
    id: 'campaign-manager',
    label: 'Campaign Manager',
    description: 'Create and manage campaigns. Upload media for assigned clients.',
    requiresClientScoping: true,
    requiresOrgUnitScoping: true,
    canAccessMultipleUnits: true,
  },
  {
    id: 'operator',
    label: 'Operator',
    description: 'Manage kiosks, monitor playback, and generate operational reports.',
    requiresClientScoping: false,
    requiresOrgUnitScoping: true,
    canAccessMultipleUnits: true,
  },
  {
    id: 'admin',
    label: 'Admin',
    description: 'Full administrative access. Manage users, billing, and system settings.',
    requiresClientScoping: false,
    requiresOrgUnitScoping: false,
    canAccessMultipleUnits: true,
  },
];

export default function InviteUserWizard({
  isOpen,
  onClose,
  onInvite,
  organizationUnits,
  clients,
  primaryLegalEntityId,
}: InviteUserWizardProps) {
  // Wizard State
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form State
  const [email, setEmail] = useState('');
  const [invitationNote, setInvitationNote] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [orgUnitScope, setOrgUnitScope] = useState<'all' | 'selected'>('all');
  const [selectedOrgUnits, setSelectedOrgUnits] = useState<string[]>([primaryLegalEntityId]);
  const [clientScope, setClientScope] = useState<'all' | 'selected'>('all');
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  
  // Validation State
  const [emailError, setEmailError] = useState('');
  
  // UI State
  const [orgUnitSearch, setOrgUnitSearch] = useState('');
  const [clientSearch, setClientSearch] = useState('');
  const [clientStatusFilter, setClientStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set([organizationUnits[0]?.id]));

  // Reset wizard
  const resetWizard = () => {
    setCurrentStep(1);
    setEmail('');
    setInvitationNote('');
    setSelectedRole(null);
    setOrgUnitScope('all');
    setSelectedOrgUnits([primaryLegalEntityId]);
    setClientScope('all');
    setSelectedClients([]);
    setEmailError('');
    setOrgUnitSearch('');
    setClientSearch('');
    setClientStatusFilter('all');
    setExpandedUnits(new Set([organizationUnits[0]?.id]));
  };

  // Close handler
  const handleClose = () => {
    resetWizard();
    onClose();
  };

  // Email Validation (pure function - doesn't set state)
  const isEmailValid = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return false;
    if (!emailRegex.test(value)) return false;
    return true;
  };

  // Validate and set error (for blur and submit)
  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError('Email address is required');
    } else if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  // Step Navigation (pure - no state changes)
  const canProceedFromStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return isEmailValid(email);
      case 2:
        return selectedRole !== null;
      case 3:
        if (!selectedRole?.requiresOrgUnitScoping) return true;
        return orgUnitScope === 'all' || selectedOrgUnits.length > 0;
      case 4:
        if (!selectedRole?.requiresClientScoping) return true;
        return clientScope === 'all' || selectedClients.length > 0;
      default:
        return true;
    }
  };

  const handleNext = () => {
    // Validate current step before proceeding
    if (currentStep === 1) {
      validateEmail(email);
    }
    
    if (canProceedFromStep(currentStep)) {
      // Skip steps that aren't required
      let nextStep = currentStep + 1;
      
      // Skip org unit step if not required
      if (nextStep === 3 && !selectedRole?.requiresOrgUnitScoping) {
        nextStep = 4;
      }
      
      // Skip client step if not required
      if (nextStep === 4 && !selectedRole?.requiresClientScoping) {
        nextStep = 5;
      }
      
      setCurrentStep(nextStep);
    }
  };

  const handleBack = () => {
    let prevStep = currentStep - 1;
    
    // Skip client step if coming back and not required
    if (prevStep === 4 && !selectedRole?.requiresClientScoping) {
      prevStep = 3;
    }
    
    // Skip org unit step if coming back and not required
    if (prevStep === 3 && !selectedRole?.requiresOrgUnitScoping) {
      prevStep = 2;
    }
    
    setCurrentStep(prevStep);
  };

  const handleSubmit = () => {
    const inviteData = {
      email,
      invitationNote,
      role: selectedRole!.id,
      organizationUnits: selectedRole?.requiresOrgUnitScoping 
        ? (orgUnitScope === 'all' ? 'all' : selectedOrgUnits)
        : 'all',
      clientAccess: selectedRole?.requiresClientScoping
        ? {
            type: clientScope,
            clientIds: clientScope === 'selected' ? selectedClients : [],
          }
        : { type: 'all', clientIds: [] },
    };

    onInvite(inviteData);
    handleClose();
  };

  // Org Unit Tree Helpers
  const toggleUnitExpansion = (unitId: string) => {
    const newExpanded = new Set(expandedUnits);
    if (newExpanded.has(unitId)) {
      newExpanded.delete(unitId);
    } else {
      newExpanded.add(unitId);
    }
    setExpandedUnits(newExpanded);
  };

  const toggleOrgUnit = (unitId: string) => {
    if (!selectedRole?.canAccessMultipleUnits) {
      setSelectedOrgUnits([unitId]);
    } else {
      setSelectedOrgUnits(prev =>
        prev.includes(unitId) ? prev.filter(id => id !== unitId) : [...prev, unitId]
      );
    }
  };

  const renderOrgUnitTree = (units: OrganizationUnit[], level = 0): JSX.Element[] => {
    return units
      .filter(unit => 
        !orgUnitSearch || 
        unit.name.toLowerCase().includes(orgUnitSearch.toLowerCase())
      )
      .map(unit => {
        const hasChildren = unit.children && unit.children.length > 0;
        const isExpanded = expandedUnits.has(unit.id);
        const isSelected = selectedOrgUnits.includes(unit.id);

        return (
          <div key={unit.id}>
            <div
              className="flex items-center gap-2 p-2 hover:bg-[#F9FAFB] rounded-lg cursor-pointer transition-colors"
              style={{ paddingLeft: `${level * 24 + 8}px` }}
            >
              {hasChildren && (
                <button
                  onClick={() => toggleUnitExpansion(unit.id)}
                  className="w-5 h-5 flex items-center justify-center hover:bg-[#E5E7EB] rounded"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-[#6B7280]" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[#6B7280]" />
                  )}
                </button>
              )}
              {!hasChildren && <div className="w-5" />}
              
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleOrgUnit(unit.id)}
                className="w-4 h-4 text-[#D9480F] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#D9480F]/20"
              />
              
              <div className="flex-1 flex items-center gap-2">
                <span className="text-sm text-[#111827]">{unit.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  unit.type === 'legal-entity'
                    ? 'bg-[#FEF2F2] text-[#D9480F]'
                    : 'bg-[#F3F4F6] text-[#6B7280]'
                }`}>
                  {unit.type === 'legal-entity' ? 'Legal Entity' : 'Unit'}
                </span>
              </div>
            </div>
            
            {hasChildren && isExpanded && renderOrgUnitTree(unit.children!, level + 1)}
          </div>
        );
      });
  };

  // Filtered Clients
  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      const matchesSearch = !clientSearch || 
        client.name.toLowerCase().includes(clientSearch.toLowerCase());
      const matchesStatus = clientStatusFilter === 'all' || 
        client.status === clientStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [clients, clientSearch, clientStatusFilter]);

  // Bulk Select Clients
  const handleSelectAllClients = () => {
    if (selectedClients.length === filteredClients.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(filteredClients.map(c => c.id));
    }
  };

  const toggleClient = (clientId: string) => {
    setSelectedClients(prev =>
      prev.includes(clientId) ? prev.filter(id => id !== clientId) : [...prev, clientId]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="border-b border-[#E5E7EB] px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-[#111827] mb-1">Invite User</h2>
            <p className="text-sm text-[#6B7280]">
              Step {currentStep} of 5: {
                currentStep === 1 ? 'User Identity' :
                currentStep === 2 ? 'Role Selection' :
                currentStep === 3 ? 'Organization Unit Scope' :
                currentStep === 4 ? 'Client Access Scope' :
                'Review & Confirm'
              }
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Stepper */}
        <div className="border-b border-[#E5E7EB] px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    step < currentStep
                      ? 'bg-[#16A34A] text-white'
                      : step === currentStep
                      ? 'bg-[#D9480F] text-white'
                      : 'bg-[#E5E7EB] text-[#9CA3AF]'
                  }`}>
                    {step < currentStep ? <Check className="w-4 h-4" /> : step}
                  </div>
                  <div className={`text-xs mt-1 ${
                    step === currentStep ? 'text-[#D9480F]' : 'text-[#6B7280]'
                  }`}>
                    {step === 1 ? 'Identity' :
                     step === 2 ? 'Role' :
                     step === 3 ? 'Units' :
                     step === 4 ? 'Clients' :
                     'Review'}
                  </div>
                </div>
                {step < 5 && (
                  <div className={`h-0.5 flex-1 mx-2 ${
                    step < currentStep ? 'bg-[#16A34A]' : 'bg-[#E5E7EB]'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Step 1: User Identity */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#FEF2F2] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-[#D9480F]" />
                </div>
                <h3 className="text-[#111827] mb-2">Who are you inviting?</h3>
                <p className="text-sm text-[#6B7280]">
                  Enter the email address of the person you'd like to invite to your organization.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">
                  Email Address <span className="text-[#DC2626]">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => validateEmail(email)}
                  placeholder="colleague@company.com"
                  className={`w-full h-12 px-4 border rounded-lg text-[#111827] placeholder:text-[#9CA3AF] transition-colors ${
                    emailError
                      ? 'border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20'
                      : 'border-[#E5E7EB] focus:ring-2 focus:ring-[#D9480F]/20 focus:border-[#D9480F]'
                  } outline-none`}
                  autoFocus
                />
                {emailError && (
                  <div className="flex items-center gap-1.5 mt-2 text-sm text-[#DC2626]">
                    <AlertCircle className="w-4 h-4" />
                    <span>{emailError}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">
                  Invitation Note <span className="text-[#6B7280]">(Optional)</span>
                </label>
                <textarea
                  value={invitationNote}
                  onChange={(e) => setInvitationNote(e.target.value)}
                  placeholder="Add a personal message that will be included in the invitation email..."
                  rows={4}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg text-[#111827] placeholder:text-[#9CA3AF] focus:ring-2 focus:ring-[#D9480F]/20 focus:border-[#D9480F] outline-none resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 2: Role Selection */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#FEF2F2] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-[#D9480F]" />
                </div>
                <h3 className="text-[#111827] mb-2">What role should they have?</h3>
                <p className="text-sm text-[#6B7280]">
                  Select the role that best matches their responsibilities.
                </p>
              </div>

              <div className="space-y-3">
                {ROLES.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role)}
                    className={`w-full text-left p-4 border rounded-lg transition-all ${
                      selectedRole?.id === role.id
                        ? 'border-[#D9480F] bg-[#FEF2F2] ring-2 ring-[#D9480F]/20'
                        : 'border-[#E5E7EB] hover:border-[#D9480F]/50 hover:bg-[#F9FAFB]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-[#111827]">{role.label}</span>
                          {selectedRole?.id === role.id && (
                            <CheckCircle2 className="w-5 h-5 text-[#D9480F]" />
                          )}
                        </div>
                        <p className="text-sm text-[#6B7280]">{role.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Organization Unit Scope */}
          {currentStep === 3 && selectedRole?.requiresOrgUnitScoping && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#FEF2F2] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-[#D9480F]" />
                </div>
                <h3 className="text-[#111827] mb-2">Which organization units?</h3>
                <p className="text-sm text-[#6B7280]">
                  Define which legal entities and operational units they can access.
                </p>
              </div>

              {/* Scope Options */}
              <div className="space-y-3">
                <label className="flex items-start gap-3 p-4 border border-[#E5E7EB] rounded-lg cursor-pointer hover:bg-[#F9FAFB] transition-colors">
                  <input
                    type="radio"
                    name="orgUnitScope"
                    checked={orgUnitScope === 'all'}
                    onChange={() => setOrgUnitScope('all')}
                    className="mt-0.5 w-4 h-4 text-[#D9480F] border-[#E5E7EB] focus:ring-2 focus:ring-[#D9480F]/20"
                  />
                  <div>
                    <div className="font-medium text-[#111827] mb-1">All Organization Units</div>
                    <div className="text-sm text-[#6B7280]">User can access all current and future units</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 border border-[#E5E7EB] rounded-lg cursor-pointer hover:bg-[#F9FAFB] transition-colors">
                  <input
                    type="radio"
                    name="orgUnitScope"
                    checked={orgUnitScope === 'selected'}
                    onChange={() => setOrgUnitScope('selected')}
                    className="mt-0.5 w-4 h-4 text-[#D9480F] border-[#E5E7EB] focus:ring-2 focus:ring-[#D9480F]/20"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-[#111827] mb-1">Selected Organization Units Only</div>
                    <div className="text-sm text-[#6B7280] mb-3">Choose specific units for restricted access</div>
                    
                    {orgUnitScope === 'selected' && (
                      <div className="space-y-3">
                        {/* Search */}
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                          <input
                            type="text"
                            value={orgUnitSearch}
                            onChange={(e) => setOrgUnitSearch(e.target.value)}
                            placeholder="Search units..."
                            className="w-full h-10 pl-10 pr-4 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:ring-2 focus:ring-[#D9480F]/20 focus:border-[#D9480F] outline-none"
                          />
                        </div>

                        {/* Tree */}
                        <div className="border border-[#E5E7EB] rounded-lg p-3 max-h-64 overflow-y-auto bg-white">
                          {renderOrgUnitTree(organizationUnits)}
                        </div>

                        <p className="text-xs text-[#6B7280]">
                          {!selectedRole.canAccessMultipleUnits && 'This role is limited to a single unit.'}
                          {selectedOrgUnits.length > 0 && ` ${selectedOrgUnits.length} unit(s) selected`}
                        </p>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Step 4: Client Access Scope */}
          {currentStep === 4 && selectedRole?.requiresClientScoping && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#FEF2F2] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-[#D9480F]" />
                </div>
                <h3 className="text-[#111827] mb-2">Which clients can they access?</h3>
                <p className="text-sm text-[#6B7280]">
                  Control visibility to client accounts and their campaigns.
                </p>
              </div>

              {/* Scope Options */}
              <div className="space-y-3">
                <label className="flex items-start gap-3 p-4 border border-[#E5E7EB] rounded-lg cursor-pointer hover:bg-[#F9FAFB] transition-colors">
                  <input
                    type="radio"
                    name="clientScope"
                    checked={clientScope === 'all'}
                    onChange={() => setClientScope('all')}
                    className="mt-0.5 w-4 h-4 text-[#D9480F] border-[#E5E7EB] focus:ring-2 focus:ring-[#D9480F]/20"
                  />
                  <div>
                    <div className="font-medium text-[#111827] mb-1">All Clients</div>
                    <div className="text-sm text-[#6B7280]">Recommended for most users. Includes future clients automatically.</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 border border-[#E5E7EB] rounded-lg cursor-pointer hover:bg-[#F9FAFB] transition-colors">
                  <input
                    type="radio"
                    name="clientScope"
                    checked={clientScope === 'selected'}
                    onChange={() => setClientScope('selected')}
                    className="mt-0.5 w-4 h-4 text-[#D9480F] border-[#E5E7EB] focus:ring-2 focus:ring-[#D9480F]/20"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-[#111827] mb-1">Selected Clients Only</div>
                    <div className="text-sm text-[#6B7280] mb-3">Restrict access to specific client accounts</div>
                    
                    {clientScope === 'selected' && (
                      <div className="space-y-3">
                        {/* Search & Filter Bar */}
                        <div className="flex gap-3">
                          <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                            <input
                              type="text"
                              value={clientSearch}
                              onChange={(e) => setClientSearch(e.target.value)}
                              placeholder="Search clients..."
                              className="w-full h-10 pl-10 pr-4 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:ring-2 focus:ring-[#D9480F]/20 focus:border-[#D9480F] outline-none"
                            />
                          </div>
                          <select
                            value={clientStatusFilter}
                            onChange={(e) => setClientStatusFilter(e.target.value as any)}
                            className="h-10 px-3 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:ring-2 focus:ring-[#D9480F]/20 focus:border-[#D9480F] outline-none bg-white"
                          >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>

                        {/* Client Table */}
                        <div className="border border-[#E5E7EB] rounded-lg overflow-hidden bg-white">
                          {/* Header */}
                          <div className="bg-[#F9FAFB] border-b border-[#E5E7EB] px-4 py-3 flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={filteredClients.length > 0 && selectedClients.length === filteredClients.length}
                              onChange={handleSelectAllClients}
                              className="w-4 h-4 text-[#D9480F] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#D9480F]/20"
                            />
                            <span className="text-sm font-medium text-[#6B7280]">
                              {selectedClients.length} of {filteredClients.length} selected
                            </span>
                          </div>

                          {/* Client List */}
                          <div className="max-h-64 overflow-y-auto">
                            {filteredClients.map((client) => (
                              <label
                                key={client.id}
                                className="flex items-center gap-3 px-4 py-3 border-b border-[#E5E7EB] last:border-0 hover:bg-[#F9FAFB] cursor-pointer transition-colors"
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedClients.includes(client.id)}
                                  onChange={() => toggleClient(client.id)}
                                  className="w-4 h-4 text-[#D9480F] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#D9480F]/20"
                                />
                                <div className="flex-1 flex items-center justify-between">
                                  <span className="text-sm text-[#111827]">{client.name}</span>
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    client.status === 'active'
                                      ? 'bg-[#ECFDF5] text-[#047857]'
                                      : 'bg-[#F3F4F6] text-[#6B7280]'
                                  }`}>
                                    {client.status}
                                  </span>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>

                        {filteredClients.length === 0 && (
                          <div className="text-center py-8 text-sm text-[#6B7280]">
                            No clients found matching your search
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Step 5: Review & Confirm */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#FEF2F2] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-[#D9480F]" />
                </div>
                <h3 className="text-[#111827] mb-2">Review invitation details</h3>
                <p className="text-sm text-[#6B7280]">
                  Verify the access scope before sending the invitation.
                </p>
              </div>

              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-6 space-y-4">
                {/* Email */}
                <div>
                  <div className="text-xs font-medium text-[#6B7280] mb-1">Email Address</div>
                  <div className="text-[#111827]">{email}</div>
                </div>

                {/* Role */}
                <div>
                  <div className="text-xs font-medium text-[#6B7280] mb-1">Role</div>
                  <div className="text-[#111827] font-medium">{selectedRole?.label}</div>
                  <div className="text-sm text-[#6B7280] mt-0.5">{selectedRole?.description}</div>
                </div>

                {/* Organization Units */}
                {selectedRole?.requiresOrgUnitScoping && (
                  <div>
                    <div className="text-xs font-medium text-[#6B7280] mb-1">Organization Units</div>
                    {orgUnitScope === 'all' ? (
                      <div className="text-[#111827]">All Organization Units</div>
                    ) : (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedOrgUnits.map((unitId) => {
                          const findUnit = (units: OrganizationUnit[]): OrganizationUnit | undefined => {
                            for (const unit of units) {
                              if (unit.id === unitId) return unit;
                              if (unit.children) {
                                const found = findUnit(unit.children);
                                if (found) return found;
                              }
                            }
                          };
                          const unit = findUnit(organizationUnits);
                          return (
                            <span
                              key={unitId}
                              className="text-xs px-2 py-1 bg-white border border-[#E5E7EB] text-[#111827] rounded"
                            >
                              {unit?.name}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Client Access */}
                {selectedRole?.requiresClientScoping && (
                  <div>
                    <div className="text-xs font-medium text-[#6B7280] mb-1">Client Access</div>
                    {clientScope === 'all' ? (
                      <div className="text-[#111827]">All Clients</div>
                    ) : (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedClients.map((clientId) => {
                          const client = clients.find(c => c.id === clientId);
                          return (
                            <span
                              key={clientId}
                              className="text-xs px-2 py-1 bg-white border border-[#E5E7EB] text-[#111827] rounded"
                            >
                              {client?.name}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Invitation Note */}
                {invitationNote && (
                  <div>
                    <div className="text-xs font-medium text-[#6B7280] mb-1">Personal Message</div>
                    <div className="text-sm text-[#111827] italic">"{invitationNote}"</div>
                  </div>
                )}
              </div>

              {/* Validation Warnings */}
              {selectedRole?.requiresClientScoping && clientScope === 'selected' && selectedClients.length === 0 && (
                <div className="flex items-start gap-2 p-4 bg-[#FEF2F2] border border-[#DC2626] rounded-lg">
                  <AlertCircle className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-[#DC2626]">No clients selected</div>
                    <div className="text-sm text-[#DC2626] mt-1">
                      This user won't be able to access any client data. Please select at least one client or choose "All Clients".
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#E5E7EB] px-6 py-4 flex items-center justify-between flex-shrink-0">
          <button
            onClick={currentStep === 1 ? handleClose : handleBack}
            className="h-11 px-6 border border-[#E5E7EB] text-[#374151] rounded-lg hover:bg-[#F9FAFB] transition-colors"
          >
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </button>
          
          {currentStep < 5 ? (
            <button
              onClick={handleNext}
              disabled={!canProceedFromStep(currentStep)}
              className="h-11 px-6 bg-[#D9480F] text-white rounded-lg hover:bg-[#C13D0C] transition-colors disabled:bg-[#E5E7EB] disabled:text-[#9CA3AF] disabled:cursor-not-allowed"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={
                (selectedRole?.requiresClientScoping && clientScope === 'selected' && selectedClients.length === 0) ||
                (selectedRole?.requiresOrgUnitScoping && orgUnitScope === 'selected' && selectedOrgUnits.length === 0)
              }
              className="h-11 px-6 bg-[#D9480F] text-white rounded-lg hover:bg-[#C13D0C] transition-colors disabled:bg-[#E5E7EB] disabled:text-[#9CA3AF] disabled:cursor-not-allowed"
            >
              Send Invitation
            </button>
          )}
        </div>
      </div>
    </div>
  );
}