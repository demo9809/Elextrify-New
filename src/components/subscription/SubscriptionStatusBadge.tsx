import { AlertCircle, Clock } from 'lucide-react';
import {
  type SubscriptionInfo,
  getDaysUntilExpiry,
  getIndicatorColor,
} from '../../data/mockSubscription';

interface SubscriptionStatusBadgeProps {
  subscription: SubscriptionInfo;
  onClick: () => void;
}

export default function SubscriptionStatusBadge({
  subscription,
  onClick,
}: SubscriptionStatusBadgeProps) {
  const daysLeft = getDaysUntilExpiry(subscription.nextBillingDate);
  const colors = getIndicatorColor(subscription);

  const getIcon = () => {
    if (
      subscription.status === 'expired' ||
      subscription.status === 'payment_failed' ||
      subscription.status === 'suspended'
    ) {
      return <AlertCircle className="w-3 h-3" style={{ color: colors.text }} />;
    }
    return <Clock className="w-3 h-3" style={{ color: colors.text }} />;
  };

  return (
    <button
      onClick={onClick}
      className="relative p-1 hover:bg-[#F9FAFB] rounded-full transition-colors"
      aria-label="View subscription status"
      title="Subscription status"
    >
      {/* Indicator Badge - Small dot with icon */}
      <div
        className="flex items-center justify-center w-6 h-6 rounded-full border-2"
        style={{
          backgroundColor: colors.bg,
          borderColor: colors.border,
        }}
      >
        {getIcon()}
      </div>

      {/* Pulse animation for critical states */}
      {(subscription.status === 'expired' ||
        subscription.status === 'payment_failed' ||
        subscription.status === 'suspended') && (
        <span className="absolute top-0 right-0 flex h-2 w-2">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ backgroundColor: colors.border }}
          />
          <span
            className="relative inline-flex rounded-full h-2 w-2"
            style={{ backgroundColor: colors.text }}
          />
        </span>
      )}
    </button>
  );
}
