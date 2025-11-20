import { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { AdGroup } from '../NewCampaignWizard';
import { StepAContent } from '../steps/StepAContent';
import { StepBTargeting } from '../steps/StepBTargeting';
import { StepCSchedule } from '../steps/StepCSchedule';

interface AdGroupEditorPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (adGroup: AdGroup) => void;
  clientId: string;
  clientName: string;
  existingAdGroup?: AdGroup;
}

const SUB_STEPS = [
  { letter: 'A', label: 'Content' },
  { letter: 'B', label: 'Targeting' },
  { letter: 'C', label: 'Schedule' },
];

export function AdGroupEditorPanel({ 
  isOpen, 
  onClose, 
  onSave, 
  clientId, 
  clientName,
  existingAdGroup 
}: AdGroupEditorPanelProps) {
  const [currentSubStep, setCurrentSubStep] = useState(1);
  const [adGroupData, setAdGroupData] = useState<Partial<AdGroup>>({
    name: '',
    venueTypes: [],
    kioskIds: [],
    daysOfWeek: [],
    startTime: '09:00',
    endTime: '18:00',
    startDate: '',
    endDate: '',
  });

  // Populate with existing data if editing
  useEffect(() => {
    if (existingAdGroup) {
      setAdGroupData(existingAdGroup);
    }
  }, [existingAdGroup]);

  const updateAdGroupData = (updates: Partial<AdGroup>) => {
    setAdGroupData(prev => ({ ...prev, ...updates }));
  };

  const canProceed = () => {
    switch (currentSubStep) {
      case 1: // Content
        return (adGroupData.contentType === 'playlist' && adGroupData.playlistId) ||
               (adGroupData.contentType === 'media' && adGroupData.mediaIds && adGroupData.mediaIds.length > 0);
      case 2: // Targeting
        return adGroupData.kioskIds && adGroupData.kioskIds.length > 0;
      case 3: // Schedule
        return adGroupData.name && 
               adGroupData.startDate && 
               adGroupData.endDate && 
               adGroupData.daysOfWeek && 
               adGroupData.daysOfWeek.length > 0 && 
               adGroupData.startTime && 
               adGroupData.endTime;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (canProceed() && currentSubStep < 3) {
      setCurrentSubStep(currentSubStep + 1);
    }
  };

  const handleBack = () => {
    if (currentSubStep > 1) {
      setCurrentSubStep(currentSubStep - 1);
    }
  };

  const handleSave = () => {
    if (!canProceed()) return;

    const finalAdGroup: AdGroup = {
      id: existingAdGroup?.id || `adgroup-${Date.now()}`,
      name: adGroupData.name!,
      contentType: adGroupData.contentType!,
      playlistId: adGroupData.playlistId,
      playlistName: adGroupData.playlistName,
      mediaIds: adGroupData.mediaIds,
      targetCountry: adGroupData.targetCountry,
      targetState: adGroupData.targetState,
      targetCity: adGroupData.targetCity,
      venueTypes: adGroupData.venueTypes || [],
      kioskIds: adGroupData.kioskIds || [],
      startDate: adGroupData.startDate!,
      endDate: adGroupData.endDate!,
      daysOfWeek: adGroupData.daysOfWeek || [],
      startTime: adGroupData.startTime!,
      endTime: adGroupData.endTime!,
    };

    onSave(finalAdGroup);
    handleClose();
  };

  const handleClose = () => {
    setCurrentSubStep(1);
    setAdGroupData({
      name: '',
      venueTypes: [],
      kioskIds: [],
      daysOfWeek: [],
      startTime: '09:00',
      endTime: '18:00',
      startDate: '',
      endDate: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-end">
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
              {existingAdGroup ? 'Edit Ad Group' : 'New Ad Group'}
            </h2>
            <p className="text-[#6B7280]">
              Content from {clientName}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#F9FAFB] transition-colors"
          >
            <X className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>

        {/* Sub-Stepper */}
        <div className="px-8 py-6 border-b border-[#E5E7EB] bg-white">
          <div className="flex items-center justify-center gap-0">
            {SUB_STEPS.map((step, index) => (
              <div key={step.letter} className="flex items-center">
                {/* Step */}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      index + 1 < currentSubStep
                        ? 'bg-[#16A34A] text-white'
                        : index + 1 === currentSubStep
                        ? 'bg-[#D9480F] text-white'
                        : 'bg-[#E5E7EB] text-[#9CA3AF]'
                    }`}
                  >
                    {index + 1 < currentSubStep ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <span className="text-sm">{step.letter}</span>
                    )}
                  </div>
                  <span
                    className={`text-sm ${
                      index + 1 === currentSubStep
                        ? 'text-[#111827]'
                        : 'text-[#6B7280]'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Connector Line */}
                {index < SUB_STEPS.length - 1 && (
                  <div
                    className={`h-0.5 w-24 mx-4 transition-colors ${
                      index + 1 < currentSubStep ? 'bg-[#16A34A]' : 'bg-[#E5E7EB]'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-[#F9FAFB]">
          {currentSubStep === 1 && (
            <StepAContent
              data={adGroupData}
              onUpdate={updateAdGroupData}
              clientId={clientId}
              clientName={clientName}
            />
          )}
          {currentSubStep === 2 && (
            <StepBTargeting
              data={adGroupData}
              onUpdate={updateAdGroupData}
            />
          )}
          {currentSubStep === 3 && (
            <StepCSchedule
              data={adGroupData}
              onUpdate={updateAdGroupData}
            />
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t border-[#E5E7EB] flex items-center justify-between bg-white">
          <button
            onClick={handleBack}
            disabled={currentSubStep === 1}
            className={`px-6 h-11 rounded-lg border border-[#E5E7EB] transition-colors ${
              currentSubStep === 1
                ? 'text-[#9CA3AF] cursor-not-allowed'
                : 'text-[#111827] hover:bg-[#F9FAFB]'
            }`}
          >
            Back
          </button>

          <div className="flex items-center gap-3">
            {currentSubStep < 3 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`px-6 h-11 rounded-lg transition-colors ${
                  canProceed()
                    ? 'bg-[#D9480F] text-white hover:bg-[#C23D0D]'
                    : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                }`}
              >
                Next: {SUB_STEPS[currentSubStep]?.label}
              </button>
            ) : (
              <button
                onClick={handleSave}
                disabled={!canProceed()}
                className={`px-6 h-11 rounded-lg transition-colors ${
                  canProceed()
                    ? 'bg-[#D9480F] text-white hover:bg-[#C23D0D]'
                    : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                }`}
              >
                Save Ad Group
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
