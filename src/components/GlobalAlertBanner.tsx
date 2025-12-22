import { useState } from 'react';
import { X, AlertTriangle, Info, AlertCircle, ChevronRight } from 'lucide-react';
import { mockGlobalAlerts, type GlobalAlert } from '../data/mockNotifications';

interface GlobalAlertBannerProps {
  currentUserId?: string;
  userRole?: 'tenant_admin' | 'saas_admin';
}

export default function GlobalAlertBanner({ 
  currentUserId = 'user_1',
  userRole = 'tenant_admin' 
}: GlobalAlertBannerProps) {
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);

  // Filter alerts based on visibility and dismissal
  const visibleAlerts = mockGlobalAlerts.filter((alert) => {
    // Check if alert is visible
    if (!alert.isVisible) return false;

    // Check role visibility
    if (alert.roleVisibility !== 'all' && alert.roleVisibility !== userRole) {
      return false;
    }

    // Check if valid
    const now = new Date();
    const validFrom = new Date(alert.validFrom);
    if (validFrom > now) return false;

    if (alert.validUntil) {
      const validUntil = new Date(alert.validUntil);
      if (validUntil < now) return false;
    }

    // Check if dismissed
    if (dismissedAlerts.includes(alert.id)) return false;
    if (alert.dismissedBy.includes(currentUserId)) return false;

    return true;
  });

  const handleDismiss = (alertId: string) => {
    setDismissedAlerts([...dismissedAlerts, alertId]);
    // In real implementation, would persist this to backend
    console.log('Alert dismissed:', alertId);
  };

  if (visibleAlerts.length === 0) return null;

  // Show only the first alert (highest priority)
  const alert = visibleAlerts[0];

  const getIcon = () => {
    switch (alert.severity) {
      case 'critical':
        return <AlertCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getBannerClasses = () => {
    const baseClasses = 'border-b flex items-center justify-between px-6 py-3';
    
    switch (alert.severity) {
      case 'critical':
        return `${baseClasses} bg-[#FEF2F2] border-[#FECACA] text-[#DC2626]`;
      case 'warning':
        return `${baseClasses} bg-[#FEF3C7] border-[#FDE68A] text-[#92400E]`;
      default:
        return `${baseClasses} bg-[#EFF6FF] border-[#DBEAFE] text-[#1E40AF]`;
    }
  };

  return (
    <div className={getBannerClasses()}>
      <div className="flex items-center gap-3 flex-1">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <p className="text-sm font-medium flex-1">
          {alert.message}
        </p>
        {alert.ctaText && alert.ctaUrl && (
          <a
            href={alert.ctaUrl}
            className="flex items-center gap-1 text-sm font-semibold hover:underline whitespace-nowrap"
          >
            {alert.ctaText}
            <ChevronRight className="w-4 h-4" />
          </a>
        )}
      </div>
      {alert.isDismissible && (
        <button
          onClick={() => handleDismiss(alert.id)}
          className="ml-4 p-1 hover:bg-black/5 rounded transition-colors flex-shrink-0"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}