import { useState, useEffect } from 'react';
import { X, AlertTriangle, Info, AlertCircle, ChevronRight } from 'lucide-react';
import { mockGlobalAlerts, type GlobalAlert } from '../data/mockNotifications';

interface GlobalAlertBannerProps {
  currentUserId?: string;
  userRole?: 'tenant_admin' | 'saas_admin';
  isSidebarCollapsed?: boolean;
  onHeightChange?: (height: number) => void;
}

export default function GlobalAlertBanner({ 
  currentUserId = 'user_1',
  userRole = 'tenant_admin',
  isSidebarCollapsed = false,
  onHeightChange
}: GlobalAlertBannerProps) {
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const [currentAlertId, setCurrentAlertId] = useState<string | null>(null);

  // Load dismissed alerts from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('dismissedGlobalAlerts');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setDismissedAlerts(parsed);
      } catch (e) {
        console.error('Failed to parse dismissed alerts:', e);
      }
    }
  }, []);

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

  const handleDismiss = (alertId: string, isPersistent: boolean) => {
    setIsCollapsing(true);
    
    // Animate out over 300ms, then update state
    setTimeout(() => {
      const newDismissedAlerts = [...dismissedAlerts, alertId];
      setDismissedAlerts(newDismissedAlerts);
      
      // Persist to localStorage (critical alerts reappear on refresh)
      if (!isPersistent) {
        localStorage.setItem('dismissedGlobalAlerts', JSON.stringify(newDismissedAlerts));
      }
      
      setIsCollapsing(false);
      setCurrentAlertId(null);
      
      // Notify parent of height change
      if (onHeightChange) {
        onHeightChange(0);
      }
      
      // In real implementation, would persist this to backend
      console.log('Alert dismissed:', alertId);
    }, 300);
  };

  // Track current alert and notify parent of height changes
  useEffect(() => {
    const alert = visibleAlerts[0];
    if (alert && alert.id !== currentAlertId) {
      setCurrentAlertId(alert.id);
      setIsCollapsing(false);
      
      // Notify parent that banner is now visible (approximate height: 56px)
      if (onHeightChange) {
        onHeightChange(56);
      }
    } else if (!alert && currentAlertId) {
      setCurrentAlertId(null);
      if (onHeightChange) {
        onHeightChange(0);
      }
    }
  }, [visibleAlerts, currentAlertId, onHeightChange]);

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
    // Layout-aware: not fixed, but part of document flow
    // Adjusted sidebar-aware left margin to match page content
    const baseClasses = 'w-full border-b flex items-center justify-between px-6 py-3 transition-all duration-300';
    
    // Smooth collapse animation
    const heightClasses = isCollapsing 
      ? 'max-h-0 opacity-0 py-0 overflow-hidden' 
      : 'max-h-20 opacity-100';
    
    switch (alert.severity) {
      case 'critical':
        return `${baseClasses} ${heightClasses} bg-[#FEF2F2] border-[#FECACA] text-[#DC2626]`;
      case 'warning':
        return `${baseClasses} ${heightClasses} bg-[#FEF3C7] border-[#FDE68A] text-[#92400E]`;
      default:
        return `${baseClasses} ${heightClasses} bg-[#EFF6FF] border-[#DBEAFE] text-[#1E40AF]`;
    }
  };

  const isPersistent = alert.severity === 'critical';

  return (
    <div className={getBannerClasses()}>
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <p className="text-sm font-medium flex-1 min-w-0">
          {alert.message}
        </p>
        {alert.ctaText && alert.ctaUrl && (
          <a
            href={alert.ctaUrl}
            className="flex items-center gap-1 text-sm font-semibold hover:underline whitespace-nowrap flex-shrink-0"
          >
            {alert.ctaText}
            <ChevronRight className="w-4 h-4" />
          </a>
        )}
      </div>
      {alert.isDismissible && (
        <button
          onClick={() => handleDismiss(alert.id, isPersistent)}
          className="ml-4 p-1 hover:bg-black/5 rounded transition-colors flex-shrink-0"
          aria-label="Dismiss alert"
          disabled={isCollapsing}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
