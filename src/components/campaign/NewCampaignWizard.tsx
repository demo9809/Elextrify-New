import { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { Step1CampaignSetup } from './steps/Step1CampaignSetup';
import { Step4Schedule } from './steps/Step4Schedule';
import { CreateClientPanel } from './panels/CreateClientPanel';

// Campaign data model
export interface CampaignData {
  // Step 1: Campaign Setup & Targeting
  clientId?: string;
  clientName?: string;
  campaignName: string;
  venueTypes: string[];
  kioskIds: string[];
  
  // Step 2: Schedule (content selected per slot)
  events?: any[];
}

interface NewCampaignWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CampaignData, isDraft: boolean) => void;
  editingCampaign?: CampaignData & { id: string }; // Pass campaign to edit
}

const STEPS = [
  { number: 1, label: 'Campaign & Targeting' },
  { number: 2, label: 'Schedule' },
];

export function NewCampaignWizard({ isOpen, onClose, onSave, editingCampaign }: NewCampaignWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showClientPanel, setShowClientPanel] = useState(false);
  
  const [campaignData, setCampaignData] = useState<CampaignData>({
    campaignName: '',
    venueTypes: [],
    kioskIds: [],
    events: [],
  });

  // Load editing campaign data when it changes
  useEffect(() => {
    if (editingCampaign) {
      setCampaignData({
        campaignName: editingCampaign.campaignName,
        clientId: editingCampaign.clientId,
        clientName: editingCampaign.clientName,
        venueTypes: editingCampaign.venueTypes || [],
        kioskIds: editingCampaign.kioskIds || [],
        events: editingCampaign.events || [],
      });
    }
  }, [editingCampaign]);

  const updateCampaignData = (updates: Partial<CampaignData>) => {
    setCampaignData(prev => ({ ...prev, ...updates }));
  };

  const handleUpdateData = (updates: Partial<CampaignData>) => {
    setCampaignData(prev => ({ ...prev, ...updates }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return campaignData.clientId && 
               campaignData.campaignName && 
               campaignData.kioskIds.length > 0;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (canProceed() && currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleLaunch = () => {
    onSave(campaignData, false);
    handleClose();
  };

  const handleSaveDraft = () => {
    onSave(campaignData, true);
    handleClose();
  };

  const handleClose = () => {
    setCurrentStep(1);
    setCampaignData({
      campaignName: '',
      venueTypes: [],
      kioskIds: [],
      events: [],
    });
    onClose();
  };

  const handleClientCreated = (clientId: string, clientName: string) => {
    updateCampaignData({ clientId, clientName });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Main Campaign Editor Panel */}
      <div className="fixed inset-0 z-50 flex items-center justify-end">
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black/50"
          onClick={handleClose}
        />
        
        {/* Panel */}
        <div className="relative bg-white h-full w-[80%] max-w-[1152px] flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-[#E5E7EB] bg-white">
            <div>
              <h2 className="text-[#111827] mb-1">
                {editingCampaign ? 'Edit Campaign' : 'New Campaign'}
              </h2>
              <p className="text-[#6B7280]">
                {currentStep === 1 
                  ? 'Set up your campaign and select target kiosks'
                  : 'Schedule your ads across time slots with custom content'
                }
              </p>
            </div>
            
            {/* Stepper in Header */}
            <div className="flex items-center gap-0 mx-8">
              {STEPS.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  {/* Step */}
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        step.number < currentStep
                          ? 'bg-[#16A34A] text-white'
                          : step.number === currentStep
                          ? 'bg-[#D9480F] text-white'
                          : 'bg-[#E5E7EB] text-[#9CA3AF]'
                      }`}
                    >
                      {step.number < currentStep ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-medium">{step.number}</span>
                      )}
                    </div>
                    <span
                      className={`text-sm whitespace-nowrap ${
                        step.number === currentStep
                          ? 'text-[#111827] font-medium'
                          : 'text-[#6B7280]'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>

                  {/* Connector Line */}
                  {index < STEPS.length - 1 && (
                    <div
                      className={`h-0.5 w-24 mx-4 transition-colors ${
                        step.number < currentStep ? 'bg-[#16A34A]' : 'bg-[#E5E7EB]'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            
            <button
              onClick={handleClose}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#F9FAFB] transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5 text-[#6B7280]" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto bg-[#F9FAFB]">
            {currentStep === 1 && (
              <Step1CampaignSetup
                data={campaignData}
                onUpdate={updateCampaignData}
                onCreateClient={() => setShowClientPanel(true)}
              />
            )}
            {currentStep === 2 && (
              <Step4Schedule 
                data={campaignData} 
                onUpdate={handleUpdateData}
                campaignId={editingCampaign?.id}
                isEditing={!!editingCampaign}
              />
            )}
          </div>

          {/* Footer */}
          <div className="px-8 py-4 border-t border-[#E5E7EB] flex items-center justify-between bg-white">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-6 h-11 rounded-lg border border-[#E5E7EB] transition-colors ${
                currentStep === 1
                  ? 'text-[#9CA3AF] cursor-not-allowed'
                  : 'text-[#111827] hover:bg-[#F9FAFB]'
              }`}
            >
              Back
            </button>

            <div className="flex items-center gap-3">
              {currentStep === 2 && (
                <button
                  onClick={handleSaveDraft}
                  className="px-6 h-11 rounded-lg border border-[#E5E7EB] text-[#111827] hover:bg-[#F9FAFB] transition-colors"
                >
                  Save as Draft
                </button>
              )}
              
              {currentStep < 2 ? (
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`px-6 h-11 rounded-lg transition-colors ${
                    canProceed()
                      ? 'bg-[#D9480F] text-white hover:bg-[#C23D0D]'
                      : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                  }`}
                >
                  Next: {STEPS[currentStep]?.label}
                </button>
              ) : (
                <button
                  onClick={handleLaunch}
                  className="px-6 h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] transition-colors"
                >
                  Launch Campaign
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Nested Client Panel */}
      {showClientPanel && (
        <CreateClientPanel
          isOpen={showClientPanel}
          onClose={() => setShowClientPanel(false)}
          onSave={handleClientCreated}
        />
      )}
    </>
  );
}