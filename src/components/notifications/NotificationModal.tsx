import { useState, useEffect, useRef } from 'react';
import { X, CreditCard, Target, Monitor, AlertCircle, Shield, ExternalLink, Check } from 'lucide-react';
import { useNavigate } from 'react-router';
import {
  mockNotifications,
  getUnreadCount,
  getCategoryColor,
  formatRelativeTime,
  type Notification,
  type NotificationCategory,
} from '../../data/mockNotifications';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationModal({ isOpen, onClose }: NotificationModalProps) {
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const unreadCount = getUnreadCount(notifications);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const getCategoryIcon = (category: NotificationCategory) => {
    const iconProps = {
      className: 'w-5 h-5',
      style: { color: getCategoryColor(category) },
    };

    switch (category) {
      case 'billing':
        return <CreditCard {...iconProps} />;
      case 'campaigns':
        return <Target {...iconProps} />;
      case 'devices':
        return <Monitor {...iconProps} />;
      case 'security':
        return <Shield {...iconProps} />;
      case 'system':
        return <AlertCircle {...iconProps} />;
      default:
        return <AlertCircle {...iconProps} />;
    }
  };

  const handleMarkAsRead = (notificationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n))
    );
    
    // Navigate if action URL exists
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
      onClose();
    }
  };

  const handleViewAll = () => {
    navigate('/notifications');
    onClose();
  };

  if (!isOpen) return null;

  // Show only latest 10 notifications in modal
  const recentNotifications = notifications.slice(0, 10);

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20 lg:bg-transparent" onClick={onClose} />

      {/* Modal - Full screen on mobile, dropdown on desktop */}
      <div
        ref={modalRef}
        className="absolute inset-0 sm:inset-auto sm:top-16 sm:right-4 lg:right-6 sm:w-[420px] bg-white sm:border border-[#E5E7EB] sm:rounded-lg shadow-xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-[#E5E7EB] flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-[#111827]">Notifications</h3>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 bg-[#D9480F] text-white text-xs font-medium rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-sm text-[#D9480F] hover:text-[#C23D0D] font-medium"
              >
                Mark all as read
              </button>
            )}
            <button
              onClick={handleViewAll}
              className="text-sm text-[#D9480F] hover:text-[#C23D0D] font-medium"
            >
              View All
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-[#F9FAFB] rounded transition-colors ml-2"
            >
              <X className="w-5 h-5 text-[#6B7280]" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-[480px] overflow-y-auto">
          {recentNotifications.length === 0 ? (
            <div className="py-12 text-center">
              <AlertCircle className="w-12 h-12 text-[#9CA3AF] mx-auto mb-3" />
              <p className="text-[#6B7280]">No notifications</p>
              <p className="text-sm text-[#9CA3AF] mt-1">You're all caught up!</p>
            </div>
          ) : (
            <div className="divide-y divide-[#E5E7EB]">
              {recentNotifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  onMouseEnter={() => setHoveredId(notification.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`w-full px-4 py-3 text-left transition-colors relative cursor-pointer ${
                    notification.isRead
                      ? 'bg-white hover:bg-[#F9FAFB]'
                      : 'bg-[#FEF2F2] hover:bg-[#FEE2E2]'
                  }`}
                >
                  <div className="flex gap-3">
                    {/* Icon */}
                    <div className="flex-shrink-0 mt-0.5">
                      {getCategoryIcon(notification.category)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p
                          className={`text-sm font-medium ${
                            notification.isRead ? 'text-[#111827]' : 'text-[#111827]'
                          }`}
                        >
                          {notification.title}
                        </p>
                        {!notification.isRead && (
                          <div className="flex-shrink-0 w-2 h-2 bg-[#D9480F] rounded-full mt-1.5" />
                        )}
                      </div>
                      <p className="text-sm text-[#6B7280] line-clamp-2 mb-2">
                        {notification.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-[#9CA3AF]">
                          {formatRelativeTime(notification.timestamp)}
                        </p>
                        {hoveredId === notification.id && !notification.isRead && (
                          <button
                            onClick={(e) => handleMarkAsRead(notification.id, e)}
                            className="flex items-center gap-1 text-xs text-[#D9480F] hover:text-[#C23D0D] font-medium"
                          >
                            <Check className="w-3 h-3" />
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {recentNotifications.length > 0 && (
          <div className="px-4 py-3 border-t border-[#E5E7EB] bg-[#F9FAFB]">
            <button
              onClick={handleViewAll}
              className="w-full flex items-center justify-center gap-2 text-sm text-[#D9480F] hover:text-[#C23D0D] font-medium"
            >
              View all notifications
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}