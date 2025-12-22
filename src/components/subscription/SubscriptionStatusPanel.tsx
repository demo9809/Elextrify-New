import { useEffect, useRef } from 'react';
import { X, CreditCard, Calendar, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  type SubscriptionInfo,
  getStatusMessage,
  getDaysUntilExpiry,
} from '../../data/mockSubscription';

interface SubscriptionStatusPanelProps {
  subscription: SubscriptionInfo;
  isOpen: boolean;
  onClose: () => void;
  anchorRef?: React.RefObject<HTMLElement>;
}

export default function SubscriptionStatusPanel({
  subscription,
  isOpen,
  onClose,
  anchorRef,
}: SubscriptionStatusPanelProps) {
  const navigate = useNavigate();
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        anchorRef?.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, anchorRef]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const daysLeft = getDaysUntilExpiry(subscription.nextBillingDate);
  const statusMessage = getStatusMessage(subscription);

  const getStatusIcon = () => {
    if (subscription.status === 'expired' || subscription.status === 'suspended') {
      return <AlertCircle className="w-5 h-5 text-[#DC2626]" />;
    }
    if (subscription.status === 'payment_failed') {
      return <AlertCircle className="w-5 h-5 text-[#DC2626]" />;
    }
    if (daysLeft <= 7) {
      return <Clock className="w-5 h-5 text-[#F59E0B]" />;
    }
    return <CheckCircle className="w-5 h-5 text-[#16A34A]" />;
  };

  const handleViewBilling = () => {
    navigate('/billing');
    onClose();
  };

  const handleRenewPlan = () => {
    navigate('/billing?action=renew');
    onClose();
  };

  return (
    <div
      ref={panelRef}
      className="absolute right-0 top-full mt-2 w-80 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <h3 className="font-semibold text-[#111827]">Subscription Status</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-[#F9FAFB] rounded transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-[#6B7280]" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Plan Info */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-[#6B7280]">Current Plan</span>
            <span className="text-sm font-semibold text-[#111827]">
              {subscription.planName}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#6B7280]">Amount</span>
            <span className="text-sm font-semibold text-[#111827]">
              ${subscription.amount.toFixed(2)} / month
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#E5E7EB]" />

        {/* Renewal Info */}
        <div>
          <div className="flex items-start gap-2 mb-2">
            <Calendar className="w-4 h-4 text-[#6B7280] mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-[#6B7280]">
                {subscription.status === 'expired' ? 'Expired on' : 'Next billing date'}
              </p>
              <p className="text-sm font-medium text-[#111827] mt-0.5">
                {new Date(subscription.nextBillingDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>

          {/* Payment Method */}
          {subscription.paymentMethod && (
            <div className="flex items-start gap-2">
              <CreditCard className="w-4 h-4 text-[#6B7280] mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-[#6B7280]">Payment method</p>
                <p className="text-sm font-medium text-[#111827] mt-0.5">
                  {subscription.paymentMethod.brand} •••• {subscription.paymentMethod.last4}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Status Message */}
        <div
          className={`p-3 rounded-lg ${
            subscription.status === 'expired' ||
            subscription.status === 'payment_failed' ||
            subscription.status === 'suspended'
              ? 'bg-[#FEF2F2] border border-[#FCA5A5]'
              : daysLeft <= 7
              ? 'bg-[#FEF3C7] border border-[#FCD34D]'
              : 'bg-[#F0FDF4] border border-[#BBF7D0]'
          }`}
        >
          <p
            className={`text-sm font-medium ${
              subscription.status === 'expired' ||
              subscription.status === 'payment_failed' ||
              subscription.status === 'suspended'
                ? 'text-[#DC2626]'
                : daysLeft <= 7
                ? 'text-[#D97706]'
                : 'text-[#16A34A]'
            }`}
          >
            {statusMessage}
          </p>
          {subscription.metadata?.failureReason && (
            <p className="text-xs text-[#DC2626] mt-1">
              Reason: {subscription.metadata.failureReason}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 pb-4 space-y-2">
        <button
          onClick={handleViewBilling}
          className="w-full h-10 bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors text-sm font-medium"
        >
          View Billing
        </button>
        {(subscription.status === 'expired' ||
          subscription.status === 'payment_failed' ||
          !subscription.autoRenew) && (
          <button
            onClick={handleRenewPlan}
            className="w-full h-10 border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#111827] rounded-lg transition-colors text-sm font-medium"
          >
            Renew Plan
          </button>
        )}
      </div>
    </div>
  );
}