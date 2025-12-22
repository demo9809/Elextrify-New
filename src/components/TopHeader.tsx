import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, HelpCircle, Settings, LogOut, User, CreditCard } from 'lucide-react';
import NotificationModal from './notifications/NotificationModal';
import { mockNotifications, getUnreadCount } from '../data/mockNotifications';
import { useAuth } from '../contexts/AuthContext';
import { LogoutModal } from './LogoutModal';
import SubscriptionStatusBadge from './subscription/SubscriptionStatusBadge';
import SubscriptionStatusPanel from './subscription/SubscriptionStatusPanel';
import { mockSubscription, shouldShowIndicator } from '../data/mockSubscription';

interface TopHeaderProps {
  isSidebarCollapsed?: boolean;
  onNavigate?: (pageId: string) => void;
}

export function TopHeader({ isSidebarCollapsed = false, onNavigate }: TopHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showSubscriptionPanel, setShowSubscriptionPanel] = useState(false);
  const unreadCount = getUnreadCount(mockNotifications);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const subscriptionStatusRef = useRef<HTMLDivElement>(null);

  // Only show subscription indicator for Tenant Admins
  const canViewSubscription = user?.role === 'tenant-user';
  const showSubscriptionIndicator = canViewSubscription && shouldShowIndicator(mockSubscription);

  const handleLogout = () => {
    setShowUserMenu(false);
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    logout();
  };

  const handleProfileSettings = () => {
    setShowUserMenu(false);
    if (onNavigate) {
      onNavigate('settings-account');
    } else {
      navigate('/settings/account');
    }
  };

  const handleBillingPlan = () => {
    setShowUserMenu(false);
    if (onNavigate) {
      onNavigate('billing');
    } else {
      navigate('/billing');
    }
  };

  return (
    <>
      <div className={`bg-white border-b border-[#E5E7EB] h-16 flex items-center px-6 gap-4 fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:left-[72px]' : 'lg:left-[240px]'
      }`}>
        {/* Context Badge - Non-dismissable */}
        <div className="hidden lg:flex items-center">
          <div className={`px-3 py-1.5 rounded-lg border-2 flex items-center gap-2 ${
            user?.role === 'tenant-user' 
              ? 'bg-blue-50 border-blue-200' 
              : 'bg-purple-50 border-purple-200'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              user?.role === 'tenant-user' ? 'bg-blue-500' : 'bg-purple-500'
            }`} />
            <span className={`text-xs font-semibold ${
              user?.role === 'tenant-user' ? 'text-blue-700' : 'text-purple-700'
            }`}>
              {user?.role === 'tenant-user' ? 'Tenant View' : 'SaaS Admin View'}
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-[560px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search campaigns, creatives, reports..."
              className="w-full h-10 pl-10 pr-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            />
          </div>
        </div>

        {/* Spacer to push icons to the right */}
        <div className="flex-1"></div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#F9FAFB] transition-colors"
          >
            <Bell className="w-5 h-5 text-[#6B7280]" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-[#D9480F] text-white text-[10px] font-semibold rounded-full">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </button>

          {/* Help */}
          <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#F9FAFB] transition-colors">
            <HelpCircle className="w-5 h-5 text-[#6B7280]" />
          </button>

          {/* Settings */}
          <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#F9FAFB] transition-colors">
            <Settings className="w-5 h-5 text-[#6B7280]" />
          </button>

          {/* Subscription Status - Only for Tenant Admins */}
          {showSubscriptionIndicator && (
            <div className="relative" ref={subscriptionStatusRef}>
              <SubscriptionStatusBadge
                subscription={mockSubscription}
                onClick={() => setShowSubscriptionPanel(!showSubscriptionPanel)}
              />
              <SubscriptionStatusPanel
                subscription={mockSubscription}
                isOpen={showSubscriptionPanel}
                onClose={() => setShowSubscriptionPanel(false)}
                anchorRef={subscriptionStatusRef}
              />
            </div>
          )}

          {/* User Menu */}
          <div className="relative">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 pl-3 pr-4 h-10 rounded-lg hover:bg-[#F9FAFB] transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D9480F] to-[#C23D0D] flex items-center justify-center">
                <span className="text-sm font-semibold text-white">
                  {user?.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </span>
              </div>
              <span className="text-sm font-medium text-[#111827] hidden xl:block">
                {user?.name}
              </span>
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 top-12 w-64 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-50 overflow-hidden">
                  {/* User Info */}
                  <div className="p-4 border-b border-[#E5E7EB]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D9480F] to-[#C23D0D] flex items-center justify-center">
                        <span className="text-sm font-semibold text-white">
                          {user?.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-[#111827] truncate">
                          {user?.name}
                        </div>
                        <div className="text-xs text-[#6B7280] truncate">
                          {user?.email}
                        </div>
                      </div>
                    </div>
                    <div className={`inline-flex items-center gap-2 px-2 py-1 rounded text-xs font-medium ${
                      user?.role === 'tenant-user'
                        ? 'bg-blue-50 text-blue-700'
                        : 'bg-purple-50 text-purple-700'
                    }`}>
                      {user?.role === 'tenant-user' ? 'Tenant User' : 'SaaS Admin'}
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <button 
                      onClick={handleProfileSettings}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[#111827] hover:bg-[#F9FAFB] rounded-lg transition-colors"
                    >
                      <User className="w-4 h-4 text-[#6B7280]" />
                      <span>Profile Settings</span>
                    </button>
                    
                    {/* Billing & Plan - Only for Tenant Users */}
                    {user?.role === 'tenant-user' && (
                      <button 
                        onClick={handleBillingPlan}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[#111827] hover:bg-[#F9FAFB] rounded-lg transition-colors"
                      >
                        <CreditCard className="w-4 h-4 text-[#6B7280]" />
                        <span>Billing & Plan</span>
                      </button>
                    )}
                    
                    <div className="border-t border-[#E5E7EB] my-1" />
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[#DC2626] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Notification Modal */}
      <NotificationModal 
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
        userName={user?.name}
      />
    </>
  );
}