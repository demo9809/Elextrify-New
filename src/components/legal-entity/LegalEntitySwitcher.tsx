import { useState, useRef, useEffect } from 'react';
import { Building2, Check, ChevronDown, AlertCircle } from 'lucide-react';
import { useLegalEntity } from '../../contexts/LegalEntityContext';
import { getLegalEntities, formatGSTNumber } from '../../data/mockLegalEntities';

export default function LegalEntitySwitcher() {
  const { activeLegalEntity, setActiveLegalEntity } = useLegalEntity();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const legalEntities = getLegalEntities();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close dropdown on Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const handleSelectEntity = (entity: typeof legalEntities[0]) => {
    if (entity.id !== activeLegalEntity?.id) {
      setActiveLegalEntity(entity);
    }
    setIsOpen(false);
  };

  if (!activeLegalEntity) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Switcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors"
        aria-label="Switch Legal Entity"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-[#D9480F]/10 flex items-center justify-center flex-shrink-0">
            <Building2 className="w-4 h-4 text-[#D9480F]" />
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-sm font-medium text-[#111827]">
              {activeLegalEntity.displayName}
            </div>
            <div className="text-xs text-[#6B7280]">
              GST: {formatGSTNumber(activeLegalEntity.gstConfig.gstNumber).split('-').slice(0, 2).join('-')}...
            </div>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-[#6B7280] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-50 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-[#E5E7EB] bg-[#F9FAFB]">
            <h3 className="text-sm font-semibold text-[#111827]">Switch Legal Entity</h3>
            <p className="text-xs text-[#6B7280] mt-1">
              All billing and tax calculations will scope to the selected entity
            </p>
          </div>

          {/* Legal Entity List */}
          <div className="max-h-96 overflow-y-auto">
            {legalEntities.map((entity) => {
              const isActive = entity.id === activeLegalEntity?.id;
              const isInactive = entity.status === 'inactive';

              return (
                <button
                  key={entity.id}
                  onClick={() => handleSelectEntity(entity)}
                  disabled={isInactive}
                  className={`w-full px-4 py-3 text-left transition-colors flex items-start gap-3 ${
                    isActive
                      ? 'bg-[#D9480F]/5 border-l-4 border-[#D9480F]'
                      : isInactive
                      ? 'bg-[#F9FAFB] opacity-50 cursor-not-allowed'
                      : 'hover:bg-[#F9FAFB] border-l-4 border-transparent'
                  }`}
                >
                  {/* Icon/Checkmark */}
                  <div className="mt-0.5">
                    {isActive ? (
                      <div className="w-5 h-5 rounded-full bg-[#D9480F] flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-[#E5E7EB] flex items-center justify-center">
                        <Building2 className="w-3 h-3 text-[#6B7280]" />
                      </div>
                    )}
                  </div>

                  {/* Entity Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-sm font-medium ${isActive ? 'text-[#D9480F]' : 'text-[#111827]'}`}>
                        {entity.displayName}
                      </span>
                      {entity.isPrimary && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                          Primary
                        </span>
                      )}
                      {isInactive && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                          Inactive
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-[#6B7280] space-y-0.5">
                      <div className="flex items-center gap-1">
                        <span className="font-medium">GST:</span>
                        <span className="font-mono">{formatGSTNumber(entity.gstConfig.gstNumber)}</span>
                      </div>
                      <div className="truncate">
                        {entity.billingProfile.address.city}, {entity.billingProfile.address.state}
                      </div>
                    </div>
                  </div>

                  {/* Warning for inactive */}
                  {isInactive && (
                    <AlertCircle className="w-4 h-4 text-[#DC2626] flex-shrink-0 mt-1" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer Notice */}
          <div className="px-4 py-3 border-t border-[#E5E7EB] bg-[#F9FAFB]">
            <p className="text-xs text-[#6B7280]">
              <span className="font-medium">Note:</span> Switching entities does not require logout.
              All data is scoped to the active entity.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
