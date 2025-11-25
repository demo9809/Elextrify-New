import { 
  LayoutDashboard, 
  Users, 
  Target, 
  Film, 
  List, 
  BarChart3, 
  CreditCard, 
  FileText, 
  Settings, 
  LogOut,
  ChevronDown,
  Monitor,
  Home,
  MoreVertical,
  User,
  HelpCircle,
  PanelLeftClose,
  PanelLeft
} from 'lucide-react';
import React from 'react';

interface SidebarProps {
  activePage?: string;
  onNavigate?: (pageId: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function Sidebar({ activePage = 'welcome', onNavigate, isCollapsed = false, onToggleCollapse }: SidebarProps) {
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  const menuItems = [
    { id: 'welcome', label: 'Welcome', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, hasDropdown: true, disabled: true },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'campaigns', label: 'Campaigns', icon: Target, active: true },
    { id: 'terminals', label: 'Kiosk Management', icon: Monitor },
    { id: 'media', label: 'Media', icon: Film },
    { id: 'playlists', label: 'Playlists', icon: List },
    { id: 'analytics', label: 'Proof-of-Play Analytics', icon: BarChart3, disabled: true },
    { id: 'billing', label: 'Budget & Billing', icon: CreditCard, disabled: true },
    { id: 'reports', label: 'Reports & Insights', icon: FileText, disabled: true },
    { id: 'settings', label: 'Account & Settings', icon: Settings, disabled: true },
  ];

  return (
    <div 
      className={`bg-white border-r border-[#E5E7EB] h-screen flex flex-col fixed left-0 top-0 z-30 transition-all duration-300 ${
        isCollapsed ? 'w-[72px]' : 'w-[240px]'
      }`}
    >
      {/* Header */}
      <div className="border-b border-[#E5E7EB] h-16 flex items-center px-4 justify-between">
        {!isCollapsed && (
          <div>
            <h2 className="text-[#111827] font-semibold mb-0.5">Elextrify</h2>
            <p className="text-xs text-[#6B7280]">Media Buyer</p>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className={`w-8 h-8 flex items-center justify-center text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB] rounded-lg transition-colors ${
            isCollapsed ? 'mx-auto' : ''
          }`}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <PanelLeft className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Welcome Section */}
        {!isCollapsed && (
          <div className="mb-4 px-3 py-2">
            <p className="text-xs text-[#6B7280]">👋  Welcome</p>
          </div>
        )}

        {/* Menu Items */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activePage;
            
            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => !item.disabled && onNavigate?.(item.id)}
                  disabled={item.disabled}
                  className={`
                    w-full flex items-center rounded-lg transition-colors text-left
                    ${isCollapsed ? 'justify-center px-0 py-3' : 'gap-3 px-4 py-2.5'}
                    ${item.disabled 
                      ? 'text-[#D1D5DB] cursor-not-allowed opacity-50' 
                      : isActive 
                        ? 'bg-[#FEF2F2] text-[#D9480F]' 
                        : 'text-[#6B7280] hover:bg-[#F9FAFB]'
                    }
                    ${isActive && !isCollapsed ? 'border-l-4 border-[#D9480F] -ml-[4px] pl-[20px]' : ''}
                  `}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className={`w-5 h-5 ${isCollapsed ? '' : ''} ${ 
                    item.disabled 
                      ? 'text-[#D1D5DB]' 
                      : isActive 
                        ? 'text-[#D9480F]' 
                        : 'text-[#6B7280]'
                  }`} />
                  {!isCollapsed && (
                    <>
                      <span className={`text-sm ${isActive ? 'font-medium' : ''}`}>
                        {item.label}
                      </span>
                      {item.hasDropdown && (
                        <ChevronDown className={`w-4 h-4 ml-auto ${item.disabled ? 'text-[#D1D5DB]' : 'text-[#6B7280]'}`} />
                      )}
                    </>
                  )}
                </button>
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#111827] text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 pointer-events-none">
                    {item.label}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#111827]"></div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* User Section */}
      <div className="border-t border-[#E5E7EB] p-4 relative">
        {isCollapsed ? (
          /* Collapsed User Avatar */
          <div className="relative group">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-10 h-10 mx-auto rounded-full bg-gradient-to-br from-[#D9480F] to-[#C23D0D] flex items-center justify-center hover:ring-2 hover:ring-[#D9480F] hover:ring-offset-2 transition-all"
            >
              <span className="text-sm font-semibold text-white">SK</span>
            </button>
            
            {/* Tooltip */}
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#111827] text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 pointer-events-none">
              Sarah Khan
              <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#111827]"></div>
            </div>
          </div>
        ) : (
          /* Expanded User Section */
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#F9FAFB] transition-colors group"
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D9480F] to-[#C23D0D] flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-semibold text-white">SK</span>
            </div>
            
            {/* User Info */}
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-medium text-[#111827] truncate">Sarah Khan</p>
              <p className="text-xs text-[#6B7280] truncate">Agency Pro Plan</p>
            </div>
            
            {/* More Icon */}
            <MoreVertical className="w-4 h-4 text-[#9CA3AF] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
          </button>
        )}

        {/* User Menu Dropdown */}
        {showUserMenu && (
          <>
            {/* Backdrop to close menu */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setShowUserMenu(false)}
            />
            
            {/* Dropdown Menu */}
            <div className={`absolute bottom-full mb-2 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-50 py-1 ${
              isCollapsed ? 'left-full ml-2 w-48' : 'left-4 right-4'
            }`}>
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  onNavigate?.('settings');
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#111827] hover:bg-[#F9FAFB] transition-colors"
              >
                <User className="w-4 h-4 text-[#6B7280]" />
                <span>Profile Settings</span>
              </button>
              
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  onNavigate?.('billing');
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#111827] hover:bg-[#F9FAFB] transition-colors"
              >
                <CreditCard className="w-4 h-4 text-[#6B7280]" />
                <span>Billing & Plan</span>
              </button>
              
              <button
                onClick={() => setShowUserMenu(false)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#111827] hover:bg-[#F9FAFB] transition-colors"
              >
                <HelpCircle className="w-4 h-4 text-[#6B7280]" />
                <span>Help & Support</span>
              </button>
              
              <div className="border-t border-[#E5E7EB] my-1" />
              
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  console.log('Signing out...');
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#DC2626] hover:bg-[#FEF2F2] transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
