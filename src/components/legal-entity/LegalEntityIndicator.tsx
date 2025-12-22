import { Building2 } from 'lucide-react';
import { useLegalEntity } from '../../contexts/LegalEntityContext';

interface LegalEntityIndicatorProps {
  variant?: 'full' | 'compact' | 'minimal';
  showGST?: boolean;
}

export default function LegalEntityIndicator({ 
  variant = 'full',
  showGST = true 
}: LegalEntityIndicatorProps) {
  const { activeLegalEntity } = useLegalEntity();

  if (!activeLegalEntity) {
    return null;
  }

  if (variant === 'minimal') {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
        <Building2 className="w-4 h-4 text-[#D9480F]" />
        <span className="text-sm font-medium text-[#111827]">
          {activeLegalEntity.displayName}
        </span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded bg-[#D9480F]/10 flex items-center justify-center">
          <Building2 className="w-4 h-4 text-[#D9480F]" />
        </div>
        <div>
          <div className="text-sm font-medium text-[#111827]">
            {activeLegalEntity.displayName}
          </div>
          {showGST && (
            <div className="text-xs text-[#6B7280]">
              GST: {activeLegalEntity.gstConfig.gstNumber.slice(0, 9)}...
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="w-10 h-10 rounded-lg bg-[#D9480F] flex items-center justify-center flex-shrink-0">
        <Building2 className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-semibold text-[#111827]">{activeLegalEntity.displayName}</h4>
          {activeLegalEntity.isPrimary && (
            <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded">
              Primary
            </span>
          )}
        </div>
        <div className="text-sm text-[#6B7280] space-y-1">
          <div>
            <span className="font-medium">Legal Name:</span> {activeLegalEntity.billingProfile.legalName}
          </div>
          {showGST && (
            <div>
              <span className="font-medium">GST Number:</span>{' '}
              <span className="font-mono">{activeLegalEntity.gstConfig.gstNumber}</span>
            </div>
          )}
          <div>
            <span className="font-medium">Location:</span> {activeLegalEntity.billingProfile.address.city},{' '}
            {activeLegalEntity.billingProfile.address.state}
          </div>
        </div>
      </div>
    </div>
  );
}
