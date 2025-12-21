import React from 'react';
import { 
  Home,
  Users,
  Target,
  Monitor,
  Film,
  List,
  Menu,
  X,
  Settings,
  ChevronDown,
  Building2,
  Package,
  Layers,
  CreditCard,
  Receipt
} from 'lucide-react';

interface MobileNavProps {
  activePage?: string;
  onNavigate?: (pageId: string) => void;
}

export function MobileNav({ activePage = 'welcome', onNavigate }: MobileNavProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [settingsExpanded, setSettingsExpanded] = React.useState(false);

  const menuItems = [
    { id: 'welcome', label: 'Welcome', icon: Home },
    { id: 'tenants', label: 'Tenants', icon: Building2 },
    { id: 'editions', label: 'Editions', icon: Package },
    { id: 'organization-units', label: 'Org Units', icon: Layers },
    { id: 'admin-billing', label: 'Admin Billing', icon: Receipt },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'campaigns', label: 'Campaigns', icon: Target },
    { id: 'terminals', label: 'Kiosks', icon: Monitor },
    { id: 'media', label: 'Media', icon: Film },
    { id: 'playlists', label: 'Playlists', icon: List },
  ];

  const settingsItems = [
    { id: 'settings-users', label: 'Users & Permissions' },
    { id: 'settings-language', label: 'Language Settings' },
    { id: 'settings-general', label: 'General Configurations' },
    { id: 'settings-billing', label: 'Billing & Subscription', disabled: true },
    { id: 'settings-integrations', label: 'Integrations / Webhooks', disabled: true },
    { id: 'settings-notifications', label: 'Email / Notifications', disabled: true },
  ];

  const isSettingsActive = activePage === 'settings' || activePage?.startsWith('settings-');

  const handleNavigate = (id: string) => {
    onNavigate?.(id);
    setIsMenuOpen(false);
    setSettingsExpanded(false);
  };

  return (
    <>
      {/* Mobile Top Header */}
      <div className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-[#E5E7EB] z-40 lg:hidden flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 flex items-center justify-center text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB] rounded-lg transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div>
            <h2 className="text-base font-semibold text-[#111827]">Elextrify</h2>
          </div>
        </div>
        
        {/* User Avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D9480F] to-[#C23D0D] flex items-center justify-center">
          <span className="text-sm font-semibold text-white">SK</span>
        </div>
      </div>

      {/* Slide-out Menu */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-50 lg:hidden transform transition-transform duration-300 flex flex-col">
            {/* Header */}
            <div className="h-14 border-b border-[#E5E7EB] px-4 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-[#111827]">Menu</h2>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-9 h-9 flex items-center justify-center text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB] rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto p-4">
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.id === activePage;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                        isActive
                          ? 'bg-[#FEF2F2] text-[#D9480F]'
                          : 'text-[#6B7280] hover:bg-[#F9FAFB]'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-[#D9480F]' : 'text-[#6B7280]'}`} />
                      <span className={`text-base ${isActive ? 'font-medium' : ''}`}>
                        {item.label}
                      </span>
                    </button>
                  );
                })}

                {/* Settings Section */}
                <div className="pt-2">
                  <button
                    onClick={() => setSettingsExpanded(!settingsExpanded)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                      isSettingsActive
                        ? 'bg-[#FEF2F2] text-[#D9480F]'
                        : 'text-[#6B7280] hover:bg-[#F9FAFB]'
                    }`}
                  >
                    <Settings className={`w-5 h-5 ${isSettingsActive ? 'text-[#D9480F]' : 'text-[#6B7280]'}`} />
                    <span className={`text-base flex-1 ${isSettingsActive ? 'font-medium' : ''}`}>
                      Settings
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${
                      settingsExpanded ? 'rotate-180' : ''
                    } ${isSettingsActive ? 'text-[#D9480F]' : 'text-[#6B7280]'}`} />
                  </button>

                  {/* Settings Submenu */}
                  {settingsExpanded && (
                    <div className="mt-1 ml-8 space-y-1">
                      {settingsItems.map((item) => {
                        const isActive = item.id === activePage;
                        
                        return (
                          <button
                            key={item.id}
                            onClick={() => !item.disabled && handleNavigate(item.id)}
                            disabled={item.disabled}
                            className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-sm ${
                              item.disabled
                                ? 'text-[#D1D5DB] cursor-not-allowed opacity-50'
                                : isActive
                                  ? 'bg-[#FEF2F2] text-[#D9480F] font-medium'
                                  : 'text-[#6B7280] hover:bg-[#F9FAFB]'
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </nav>
            </div>

            {/* User Section */}
            <div className="border-t border-[#E5E7EB] p-4">
              <div className="flex items-center gap-3 px-3 py-2.5 bg-[#F9FAFB] rounded-lg">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D9480F] to-[#C23D0D] flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-white">SK</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#111827] truncate">Sarah Khan</p>
                  <p className="text-xs text-[#6B7280] truncate">Agency Pro Plan</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Bottom Navigation (Alternative - can be used instead of hamburger) */}
      {/* <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-[#E5E7EB] z-40 md:hidden">
        <div className="flex items-center justify-around h-full px-2">
          {menuItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activePage;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate?.(item.id)}
                className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive ? 'text-[#D9480F]' : 'text-[#6B7280]'
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'text-[#D9480F]' : 'text-[#6B7280]'}`} />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div> */}
    </>
  );
}