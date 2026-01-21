import { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Check, AlertCircle, Calendar } from 'lucide-react';
import { Machine } from '../../types/adSlotting';
import { getSlotConfigForMachine, getAvailabilityForMachine } from '../../data/mockAdSlotting';
import { toast } from 'sonner@2.0.3';

interface CreateBookingModalProps {
  machine: Machine;
  onClose: () => void;
}

type Step = 1 | 2 | 3;

const MOCK_CLIENTS = [
  { id: 'cl-001', name: 'Nike Sports' },
  { id: 'cl-002', name: 'Apple Inc.' },
  { id: 'cl-003', name: 'Coca-Cola' },
  { id: 'cl-004', name: 'Samsung Electronics' },
];

const MOCK_MEDIA = [
  { id: 'ma-001', name: 'Nike Spring Campaign', duration: '15s' },
  { id: 'ma-002', name: 'iPhone 16 Launch', duration: '10s' },
  { id: 'ma-003', name: 'Summer Refresh', duration: '10s' },
  { id: 'ma-004', name: 'Galaxy S25 Reveal', duration: '15s' },
];

const CAMPAIGN_DURATION_PRESETS = [
  { value: 30, label: '30 days' },
  { value: 90, label: '90 days' },
  { value: 365, label: '1 year' },
];

export default function CreateBookingModal({ machine, onClose }: CreateBookingModalProps) {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [selectedSlotTypes, setSelectedSlotTypes] = useState<('peak' | 'normal')[]>([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedMedia, setSelectedMedia] = useState('');
  const [durationType, setDurationType] = useState<'preset' | 'custom'>('preset');
  const [campaignDuration, setCampaignDuration] = useState(30);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const slotConfig = getSlotConfigForMachine(machine.id);
  const availability = getAvailabilityForMachine(machine.id);

  const getSlotTypeAvailability = (type: 'peak' | 'normal'): boolean => {
    if (!availability) return false;
    
    switch (type) {
      case 'peak':
        return availability.peakAvailability.status !== 'full';
      case 'normal':
        return availability.normalAvailability.status !== 'full';
      default:
        return false;
    }
  };

  const toggleSlotType = (type: 'peak' | 'normal') => {
    if (!getSlotTypeAvailability(type)) return;
    
    setSelectedSlotTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleNext = () => {
    if (currentStep === 1 && selectedSlotTypes.length === 0) {
      toast.error('Please select at least one inventory type');
      return;
    }

    if (currentStep === 2) {
      if (!selectedClient) {
        toast.error('Please select a client');
        return;
      }
      if (!selectedMedia) {
        toast.error('Please select a media asset');
        return;
      }
      if (durationType === 'custom') {
        if (!startDate || !endDate) {
          toast.error('Please select start and end dates');
          return;
        }
        if (new Date(endDate) <= new Date(startDate)) {
          toast.error('End date must be after start date');
          return;
        }
      }
    }

    if (currentStep < 3) {
      setCurrentStep((currentStep + 1) as Step);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
    }
  };

  const handleConfirmBooking = () => {
    toast.success('Booking created successfully');
    onClose();
  };

  const estimatedDailyPlays = slotConfig
    ? Math.floor((17 * 60 * 60) / slotConfig.loopDuration)
    : 0;

  const getSlotTypeLabel = (type: 'peak' | 'normal'): string => {
    switch (type) {
      case 'peak':
        return 'Peak Hours';
      case 'normal':
        return 'Normal Hours';
      default:
        return type;
    }
  };

  const calculateDuration = () => {
    if (durationType === 'preset') {
      return `${campaignDuration} days`;
    } else if (startDate && endDate) {
      const days = Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24));
      return `${days} days (${startDate} to ${endDate})`;
    }
    return 'Not set';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Dark overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Slide-in panel */}
      <div className="relative bg-white h-full w-full max-w-3xl shadow-2xl flex flex-col animate-slide-in-right overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
          <div>
            <h3 className="text-gray-900">Create Booking</h3>
            <p className="text-sm text-gray-600 mt-1">{machine.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      currentStep === step
                        ? 'bg-[#D9480F] text-white'
                        : currentStep > step
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {currentStep > step ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      step
                    )}
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      currentStep >= step ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {step === 1 && 'Inventory Type'}
                    {step === 2 && 'Booking Details'}
                    {step === 3 && 'Review'}
                  </div>
                </div>
                {step < 3 && (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step 1: Inventory Type */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="mb-4">
                <h4 className="text-gray-900 mb-2">Select Inventory Type(s)</h4>
                <p className="text-sm text-gray-600">
                  Choose when you want your ad to run. You can select both peak and normal hours.
                </p>
              </div>

              <div className="space-y-3">
                {(['peak', 'normal'] as const).map((type) => {
                  const isAvailable = getSlotTypeAvailability(type);
                  const isSelected = selectedSlotTypes.includes(type);
                  
                  return (
                    <button
                      key={type}
                      onClick={() => toggleSlotType(type)}
                      disabled={!isAvailable}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        isSelected
                          ? 'border-[#D9480F] bg-orange-50'
                          : isAvailable
                          ? 'border-gray-200 hover:border-gray-300'
                          : 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center ${
                            isSelected
                              ? 'border-[#D9480F] bg-[#D9480F]'
                              : 'border-gray-300'
                          }`}
                        >
                          {isSelected && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="font-medium text-gray-900">
                              {getSlotTypeLabel(type)}
                            </div>
                            {!isAvailable && (
                              <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                                Full
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">
                            {type === 'peak' && 'Run ads during high-traffic peak hours only'}
                            {type === 'normal' && 'Run ads during standard operating hours'}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-2 text-sm text-blue-900">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>
                    Selecting both Peak and Normal hours will run your ad throughout all operating hours with separate pricing.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Booking Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">
                  Client <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                >
                  <option value="">Select a client...</option>
                  {MOCK_CLIENTS.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Media Asset <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedMedia}
                  onChange={(e) => setSelectedMedia(e.target.value)}
                  className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                >
                  <option value="">Select a media asset...</option>
                  {MOCK_MEDIA.map((media) => (
                    <option key={media.id} value={media.id}>
                      {media.name} ({media.duration})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-3">
                  Campaign Duration <span className="text-red-500">*</span>
                </label>

                {/* Duration Type Selector */}
                <div className="flex gap-3 mb-4">
                  <button
                    onClick={() => setDurationType('preset')}
                    className={`flex-1 h-11 rounded-lg border-2 transition-all font-medium ${
                      durationType === 'preset'
                        ? 'border-[#D9480F] bg-orange-50 text-[#D9480F]'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    Quick Select
                  </button>
                  <button
                    onClick={() => setDurationType('custom')}
                    className={`flex-1 h-11 rounded-lg border-2 transition-all font-medium ${
                      durationType === 'custom'
                        ? 'border-[#D9480F] bg-orange-50 text-[#D9480F]'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Custom Dates
                  </button>
                </div>

                {/* Preset Duration Options */}
                {durationType === 'preset' && (
                  <div className="grid grid-cols-3 gap-3">
                    {CAMPAIGN_DURATION_PRESETS.map((duration) => (
                      <button
                        key={duration.value}
                        onClick={() => setCampaignDuration(duration.value)}
                        className={`h-11 rounded-lg border-2 transition-all font-medium ${
                          campaignDuration === duration.value
                            ? 'border-[#D9480F] bg-orange-50 text-[#D9480F]'
                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {duration.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Custom Date Range */}
                {durationType === 'custom' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        Start Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        End Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={startDate || new Date().toISOString().split('T')[0]}
                        className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                      />
                    </div>
                    {startDate && endDate && new Date(endDate) > new Date(startDate) && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="text-sm text-green-900">
                          Campaign duration: <span className="font-semibold">
                            {Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-2 text-sm text-blue-900">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>
                    System will validate slot eligibility and availability across the entire campaign duration
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Machine</div>
                  <div className="font-medium text-gray-900">{machine.name}</div>
                  <div className="text-sm text-gray-600">
                    {machine.location.city} • {machine.location.venue}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Slot Type(s)</div>
                  <div className="font-medium text-gray-900">
                    {selectedSlotTypes.map(type => getSlotTypeLabel(type)).join(' + ')}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Client</div>
                  <div className="font-medium text-gray-900">
                    {MOCK_CLIENTS.find((c) => c.id === selectedClient)?.name}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Media Asset</div>
                  <div className="font-medium text-gray-900">
                    {MOCK_MEDIA.find((m) => m.id === selectedMedia)?.name}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Campaign Duration</div>
                  <div className="font-medium text-gray-900">
                    {calculateDuration()}
                  </div>
                </div>

                {slotConfig && (
                  <>
                    <div className="pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-600 mb-1">Loop Structure Summary</div>
                      <div className="font-medium text-gray-900">
                        {slotConfig.loopDuration}s loop • {slotConfig.subSlotDuration}s slots •{' '}
                        {slotConfig.totalPositions} positions
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-600 mb-1">Estimated Daily Plays</div>
                      <div className="font-medium text-gray-900">
                        ~{estimatedDailyPlays} plays per day
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-600 mb-2">Price Breakdown</div>
                      <div className="space-y-2">
                        {selectedSlotTypes.includes('peak') && slotConfig.pricing.peakPrice && (
                          <div className="flex justify-between">
                            <span className="text-gray-700">Peak Rate</span>
                            <span className="font-semibold text-gray-900">
                              ${slotConfig.pricing.peakPrice}/{slotConfig.subSlotDuration}s
                            </span>
                          </div>
                        )}
                        {selectedSlotTypes.includes('normal') && slotConfig.pricing.normalPrice && (
                          <div className="flex justify-between">
                            <span className="text-gray-700">Normal Rate</span>
                            <span className="font-semibold text-gray-900">
                              ${slotConfig.pricing.normalPrice}/{slotConfig.subSlotDuration}s
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between flex-shrink-0">
          <button
            onClick={currentStep === 1 ? onClose : handleBack}
            className="px-6 h-11 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            {currentStep === 1 ? (
              'Cancel'
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </>
            )}
          </button>
          <button
            onClick={currentStep === 3 ? handleConfirmBooking : handleNext}
            className="px-6 h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors flex items-center gap-2"
          >
            <span>{currentStep === 3 ? 'Confirm Booking' : 'Next'}</span>
            {currentStep < 3 && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}