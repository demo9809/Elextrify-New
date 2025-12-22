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
  ChevronDown,
  Monitor,
  Home,
  HelpCircle,
  PanelLeftClose,
  PanelLeft,
  Shield,
  Building2,
  Package,
  Layers,
  Receipt,
  TrendingUp,
  AlertCircle,
  Percent,
  Activity,
  BookOpen
} from 'lucide-react';
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  activePage?: string;
  onNavigate?: (pageId: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function Sidebar({ activePage = 'welcome', onNavigate, isCollapsed = false, onToggleCollapse }: SidebarProps) {
  const { user } = useAuth();
  const userRole = user?.role || 'tenant-user';
  
  const [settingsExpanded, setSettingsExpanded] = React.useState(false);
  const [billingExpanded, setBillingExpanded] = React.useState(false);
  const [hostAdminExpanded, setHostAdminExpanded] = React.useState(false);

  // Primary Daily-Use Items (Top Section)
  const primaryMenuItems = [
    { id: 'welcome', label: 'Welcome', icon: Home },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'campaigns', label: 'Campaigns', icon: Target },
    { id: 'media', label: 'Media', icon: Film },
    { id: 'playlists', label: 'Playlists', icon: List },
    { id: 'terminals', label: 'Kiosk Management', icon: Monitor },
  ];

  // Structure Items (After First Divider)
  const structureItems = [
    { id: 'organization-units', label: 'Organization Units', icon: Layers },
  ];

  // Billing Items (After Second Divider)
  const billingItems = [
    { id: 'media-billing', label: 'Media Billing', icon: Receipt },
  ];

  // SaaS Admin Menu Items
  const adminMenuItems = [
    { id: 'welcome', label: 'Dashboard', icon: Home },
  ];

  const hostAdminItems = [
    { id: 'tenants', label: 'Tenant Management', icon: Building2 },
    { id: 'editions', label: 'Edition Management', icon: Package },
  ];

  const billingAdminItems = [
    { id: 'admin-billing-overview', label: 'Billing Overview', icon: LayoutDashboard, route: '/admin/billing' },
    { id: 'admin-billing-subscriptions', label: 'Subscriptions', icon: Users, route: '/admin/billing/subscriptions' },
    { id: 'admin-billing-invoices', label: 'Invoices', icon: FileText, route: '/admin/billing/invoices' },
    { id: 'admin-billing-payments', label: 'Payments & Failures', icon: AlertCircle, route: '/admin/billing/payments' },
    { id: 'admin-billing-revenue', label: 'Revenue Analytics', icon: TrendingUp, route: '/admin/billing/revenue' },
    { id: 'admin-billing-discounts', label: 'Discounts & Credits', icon: Percent, route: '/admin/billing/discounts' },
    { id: 'admin-billing-audit', label: 'Audit Log', icon: Activity, route: '/admin/billing/audit' },
  ];

  // Settings Items - Simplified to 3 top-level items
  const settingsItems = [
    { id: 'settings-account', label: 'Account', route: '/settings/account' },
    { id: 'settings-workspace', label: 'Workspace', route: '/settings/workspace' },
    { id: 'settings-system', label: 'System', route: '/settings/system' },
  ];

  // Check if current page is a settings page
  const isSettingsActive = activePage === 'settings' || activePage.startsWith('settings-');
  
  // Check if current page is a billing admin page
  const isBillingAdminActive = activePage === 'admin-billing' || activePage.startsWith('admin-billing-');
  
  // Check if current page is a host admin page
  const isHostAdminActive = activePage === 'tenants' || activePage === 'editions';

  // Determine if user can see System section
  const canViewSystemSettings = userRole === 'saas-admin' || userRole === 'host-admin';
  
  // Determine if user can see Workspace section
  const canViewWorkspaceSettings = userRole !== 'user';

  // Auto-expand settings if a settings page is active
  React.useEffect(() => {
    if (isSettingsActive && !isCollapsed) {
      setSettingsExpanded(true);
    }
  }, [isSettingsActive, isCollapsed]);

  // Auto-expand billing if a billing admin page is active
  React.useEffect(() => {
    if (isBillingAdminActive && !isCollapsed) {
      setBillingExpanded(true);
    }
  }, [isBillingAdminActive, isCollapsed]);

  // Auto-expand host admin if a host admin page is active
  React.useEffect(() => {
    if (isHostAdminActive && !isCollapsed) {
      setHostAdminExpanded(true);
    }
  }, [isHostAdminActive, isCollapsed]);

  // Reusable Menu Item Component
  const MenuItem = ({ item, isActive }: { item: any; isActive: boolean }) => {
    const Icon = item.icon;
    
    return (
      <div className="relative group">
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
          {Icon && <Icon className={`w-5 h-5 flex-shrink-0 ${ 
            item.disabled 
              ? 'text-[#D1D5DB]' 
              : isActive 
                ? 'text-[#D9480F]' 
                : 'text-[#6B7280]'
          }`} />}
          {!isCollapsed && (
            <>
              <span className={`text-sm ${isActive ? 'font-medium' : ''}`}>
                {item.label}
              </span>
              {item.badge && (
                <span className="ml-2 px-2 py-0.5 bg-[#FEE2E2] text-[#D9480F] text-xs font-medium rounded-full">
                  {item.badge}
                </span>
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
  };

  // Subtle Visual Divider Component
  const MenuDivider = () => (
    <div className={`${isCollapsed ? 'my-3 mx-3' : 'my-4 mx-4'}`}>
      <div className="border-t border-[#E5E7EB]" />
    </div>
  );

  return (
    <div 
      className={`bg-white border-r border-[#E5E7EB] h-screen flex flex-col fixed left-0 top-0 z-20 transition-all duration-300 ${
        isCollapsed ? 'w-[72px]' : 'w-[240px]'
      }`}
    >
      {/* Header */}
      <div className="border-b border-[#E5E7EB] h-16 flex items-center px-4 justify-between flex-shrink-0">
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

      {/* Navigation - Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-1">
          {/* TENANT USER NAVIGATION */}
          {userRole === 'tenant-user' && (
            <>
              {/* Primary Daily-Use Items */}
              {primaryMenuItems.map((item) => (
                <MenuItem key={item.id} item={item} isActive={item.id === activePage} />
              ))}

              {/* Divider 1 */}
              <MenuDivider />

              {/* Organization Units */}
              {structureItems.map((item) => (
                <MenuItem key={item.id} item={item} isActive={item.id === activePage} />
              ))}

              {/* Divider 2 */}
              <MenuDivider />

              {/* Media Billing */}
              {billingItems.map((item) => (
                <MenuItem key={item.id} item={item} isActive={item.id === activePage} />
              ))}

              {/* Divider 3 */}
              <MenuDivider />

              {/* Settings */}
              <div className="relative group">
                <button
                  onClick={() => {
                    if (isCollapsed) {
                      onNavigate?.('settings');
                    } else {
                      setSettingsExpanded(!settingsExpanded);
                    }
                  }}
                  className={`
                    w-full flex items-center rounded-lg transition-colors text-left
                    ${isCollapsed ? 'justify-center px-0 py-3' : 'gap-3 px-4 py-2.5'}
                    ${isSettingsActive 
                      ? 'bg-[#FEF2F2] text-[#D9480F]' 
                      : 'text-[#6B7280] hover:bg-[#F9FAFB]'
                    }
                    ${isSettingsActive && !isCollapsed ? 'border-l-4 border-[#D9480F] -ml-[4px] pl-[20px]' : ''}
                  `}
                  title={isCollapsed ? 'Settings' : undefined}
                >
                  <Settings className={`w-5 h-5 ${ 
                    isSettingsActive ? 'text-[#D9480F]' : 'text-[#6B7280]'
                  }`} />
                  {!isCollapsed && (
                    <>
                      <span className={`text-sm flex-1 ${isSettingsActive ? 'font-medium' : ''}`}>
                        Settings
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${
                        settingsExpanded ? 'rotate-180' : ''
                      } ${isSettingsActive ? 'text-[#D9480F]' : 'text-[#6B7280]'}`} />
                    </>
                  )}
                </button>

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#111827] text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 pointer-events-none">
                    Settings
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#111827]"></div>
                  </div>
                )}

                {/* Settings Submenu */}
                {settingsExpanded && !isCollapsed && (
                  <div className="mt-1 ml-4 pl-4 border-l-2 border-[#E5E7EB] space-y-1">
                    {settingsItems
                      .filter(item => item.id !== 'settings-system' || canViewSystemSettings)
                      .filter(item => item.id !== 'settings-workspace' || canViewWorkspaceSettings)
                      .map((subItem) => {
                        const isSubActive = activePage === subItem.id;
                        
                        return (
                          <button
                            key={subItem.id}
                            onClick={() => onNavigate?.(subItem.id)}
                            className={`
                              w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left text-sm transition-colors
                              ${isSubActive 
                                ? 'bg-[#FEF2F2] text-[#D9480F] font-medium' 
                                : 'text-[#6B7280] hover:bg-[#F9FAFB]'
                              }
                            `}
                          >
                            {subItem.label}
                          </button>
                        );
                      })}
                  </div>
                )}
              </div>
            </>
          )}

          {/* SAAS ADMIN NAVIGATION */}
          {userRole === 'saas-admin' && (
            <>
              {/* Dashboard */}
              {adminMenuItems.map((item) => (
                <MenuItem key={item.id} item={item} isActive={item.id === activePage} />
              ))}

              {/* Host Admin Menu Item with Submenu */}
              <div className="relative group">
                <button
                  onClick={() => {
                    if (isCollapsed) {
                      onNavigate?.('tenants');
                    } else {
                      setHostAdminExpanded(!hostAdminExpanded);
                    }
                  }}
                  className={`
                    w-full flex items-center rounded-lg transition-colors text-left
                    ${isCollapsed ? 'justify-center px-0 py-3' : 'gap-3 px-4 py-2.5'}
                    ${isHostAdminActive 
                      ? 'bg-[#FEF2F2] text-[#D9480F]' 
                      : 'text-[#6B7280] hover:bg-[#F9FAFB]'
                    }
                    ${isHostAdminActive && !isCollapsed ? 'border-l-4 border-[#D9480F] -ml-[4px] pl-[20px]' : ''}
                  `}
                  title={isCollapsed ? 'Host Admin' : undefined}
                >
                  <Shield className={`w-5 h-5 ${ 
                    isHostAdminActive ? 'text-[#D9480F]' : 'text-[#6B7280]'
                  }`} />
                  {!isCollapsed && (
                    <>
                      <span className={`text-sm flex-1 ${isHostAdminActive ? 'font-medium' : ''}`}>
                        Host Admin
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${
                        hostAdminExpanded ? 'rotate-180' : ''
                      } ${isHostAdminActive ? 'text-[#D9480F]' : 'text-[#6B7280]'}`} />
                    </>
                  )}
                </button>

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#111827] text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 pointer-events-none">
                    Host Admin
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#111827]"></div>
                  </div>
                )}

                {/* Submenu - only show when expanded and not collapsed */}
                {hostAdminExpanded && !isCollapsed && (
                  <div className="mt-1 ml-4 pl-4 border-l-2 border-[#E5E7EB] space-y-1">
                    {hostAdminItems.map((subItem) => {
                      const isSubActive = activePage === subItem.id;
                      
                      return (
                        <button
                          key={subItem.id}
                          onClick={() => !subItem.disabled && onNavigate?.(subItem.id)}
                          disabled={subItem.disabled}
                          className={`
                            w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left text-sm transition-colors
                            ${subItem.disabled 
                              ? 'text-[#D1D5DB] cursor-not-allowed opacity-50' 
                              : isSubActive 
                                ? 'bg-[#FEF2F2] text-[#D9480F] font-medium' 
                                : 'text-[#6B7280] hover:bg-[#F9FAFB]'
                            }
                          `}
                        >
                          {subItem.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Settings Menu Item with Submenu */}
              <div className="relative group">
                <button
                  onClick={() => {
                    if (isCollapsed) {
                      onNavigate?.('settings');
                    } else {
                      setSettingsExpanded(!settingsExpanded);
                    }
                  }}
                  className={`
                    w-full flex items-center rounded-lg transition-colors text-left
                    ${isCollapsed ? 'justify-center px-0 py-3' : 'gap-3 px-4 py-2.5'}
                    ${isSettingsActive 
                      ? 'bg-[#FEF2F2] text-[#D9480F]' 
                      : 'text-[#6B7280] hover:bg-[#F9FAFB]'
                    }
                    ${isSettingsActive && !isCollapsed ? 'border-l-4 border-[#D9480F] -ml-[4px] pl-[20px]' : ''}
                  `}
                  title={isCollapsed ? 'Settings' : undefined}
                >
                  <Settings className={`w-5 h-5 ${ 
                    isSettingsActive ? 'text-[#D9480F]' : 'text-[#6B7280]'
                  }`} />
                  {!isCollapsed && (
                    <>
                      <span className={`text-sm flex-1 ${isSettingsActive ? 'font-medium' : ''}`}>
                        Settings
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${
                        settingsExpanded ? 'rotate-180' : ''
                      } ${isSettingsActive ? 'text-[#D9480F]' : 'text-[#6B7280]'}`} />
                    </>
                  )}
                </button>

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#111827] text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 pointer-events-none">
                    Settings
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#111827]"></div>
                  </div>
                )}

                {/* Simple Submenu - only show when expanded and not collapsed */}
                {settingsExpanded && !isCollapsed && (
                  <div className="mt-1 ml-4 pl-4 border-l-2 border-[#E5E7EB] space-y-1">
                    {settingsItems
                      .filter(item => item.id !== 'settings-system' || canViewSystemSettings)
                      .filter(item => item.id !== 'settings-workspace' || canViewWorkspaceSettings)
                      .map((subItem) => {
                        const isSubActive = activePage === subItem.id;
                        
                        return (
                          <button
                            key={subItem.id}
                            onClick={() => onNavigate?.(subItem.id)}
                            className={`
                              w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left text-sm transition-colors
                              ${isSubActive 
                                ? 'bg-[#FEF2F2] text-[#D9480F] font-medium' 
                                : 'text-[#6B7280] hover:bg-[#F9FAFB]'
                              }
                            `}
                          >
                            {subItem.label}
                          </button>
                        );
                      })}
                  </div>
                )}
              </div>

              {/* Billing Admin Menu Item with Submenu */}
              <div className="relative group">
                <button
                  onClick={() => {
                    if (isCollapsed) {
                      onNavigate?.('admin-billing');
                    } else {
                      setBillingExpanded(!billingExpanded);
                    }
                  }}
                  className={`
                    w-full flex items-center rounded-lg transition-colors text-left
                    ${isCollapsed ? 'justify-center px-0 py-3' : 'gap-3 px-4 py-2.5'}
                    ${isBillingAdminActive 
                      ? 'bg-[#FEF2F2] text-[#D9480F]' 
                      : 'text-[#6B7280] hover:bg-[#F9FAFB]'
                    }
                    ${isBillingAdminActive && !isCollapsed ? 'border-l-4 border-[#D9480F] -ml-[4px] pl-[20px]' : ''}
                  `}
                  title={isCollapsed ? 'Billing Admin' : undefined}
                >
                  <CreditCard className={`w-5 h-5 ${ 
                    isBillingAdminActive ? 'text-[#D9480F]' : 'text-[#6B7280]'
                  }`} />
                  {!isCollapsed && (
                    <>
                      <span className={`text-sm flex-1 ${isBillingAdminActive ? 'font-medium' : ''}`}>
                        Billing Admin
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${
                        billingExpanded ? 'rotate-180' : ''
                      } ${isBillingAdminActive ? 'text-[#D9480F]' : 'text-[#6B7280]'}`} />
                    </>
                  )}
                </button>

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#111827] text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 pointer-events-none">
                    Billing Admin
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#111827]"></div>
                  </div>
                )}

                {/* Submenu - only show when expanded and not collapsed */}
                {billingExpanded && !isCollapsed && (
                  <div className="mt-1 ml-4 pl-4 border-l-2 border-[#E5E7EB] space-y-1">
                    {billingAdminItems.map((subItem) => {
                      const isSubActive = activePage === subItem.id;
                      
                      return (
                        <button
                          key={subItem.id}
                          onClick={() => !subItem.disabled && onNavigate?.(subItem.id)}
                          disabled={subItem.disabled}
                          className={`
                            w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left text-sm transition-colors
                            ${subItem.disabled 
                              ? 'text-[#D1D5DB] cursor-not-allowed opacity-50' 
                              : isSubActive 
                                ? 'bg-[#FEF2F2] text-[#D9480F] font-medium' 
                                : 'text-[#6B7280] hover:bg-[#F9FAFB]'
                            }
                          `}
                        >
                          {subItem.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )}
        </nav>
      </div>

      {/* Fixed Footer - Support Section with Version */}
      <div className="border-t border-[#E5E7EB] flex-shrink-0">
        <div className="mx-4 my-4 px-4 py-5 bg-[#FAFAFA] rounded-2xl shadow-sm">
          {/* Support Header */}
          {!isCollapsed && (
            <div className="flex items-center gap-2.5 mb-4 px-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D9480F] opacity-40"></div>
              <p className="text-[11px] text-[#374151] uppercase tracking-[0.1em] font-semibold">
                Support
              </p>
            </div>
          )}
          
          {/* Support Links */}
          <div className="space-y-1.5">
            {/* Help & Support */}
            <div className="relative group">
              <button
                onClick={() => onNavigate?.('help-support')}
                className={`
                  w-full flex items-center rounded-xl transition-all duration-200 text-left
                  ${isCollapsed ? 'justify-center px-0 py-3' : 'gap-3 px-3.5 py-3'}
                  ${activePage === 'help-support' 
                    ? 'bg-white shadow-sm text-[#D9480F]' 
                    : 'text-[#374151] hover:bg-white hover:shadow-sm hover:text-[#111827]'
                  }
                `}
                title={isCollapsed ? 'Help & Support' : undefined}
              >
                <HelpCircle className={`w-[18px] h-[18px] flex-shrink-0 transition-colors ${
                  activePage === 'help-support' ? 'text-[#D9480F]' : 'text-[#6B7280] group-hover:text-[#D9480F]'
                }`} />
                {!isCollapsed && (
                  <span className="text-[13px] font-medium flex-1">
                    Help & Support
                  </span>
                )}
              </button>
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#111827] text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 pointer-events-none">
                  Help & Support
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#111827]"></div>
                </div>
              )}
            </div>

            {/* Documentation */}
            <div className="relative group">
              <button
                onClick={() => onNavigate?.('documentation')}
                className={`
                  w-full flex items-center rounded-xl transition-all duration-200 text-left
                  ${isCollapsed ? 'justify-center px-0 py-3' : 'gap-3 px-3.5 py-3'}
                  ${activePage === 'documentation' 
                    ? 'bg-white shadow-sm text-[#D9480F]' 
                    : 'text-[#374151] hover:bg-white hover:shadow-sm hover:text-[#111827]'
                  }
                `}
                title={isCollapsed ? 'Documentation' : undefined}
              >
                <BookOpen className={`w-[18px] h-[18px] flex-shrink-0 transition-colors ${
                  activePage === 'documentation' ? 'text-[#D9480F]' : 'text-[#6B7280] group-hover:text-[#D9480F]'
                }`} />
                {!isCollapsed && (
                  <span className="text-[13px] font-medium flex-1">
                    Documentation
                  </span>
                )}
              </button>
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#111827] text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 pointer-events-none">
                  Documentation
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#111827]"></div>
                </div>
              )}
            </div>
          </div>

          {/* Version Information */}
          {!isCollapsed && (
            <div className="mt-5 px-3.5">
              <div className="text-[11px] font-medium text-[#9CA3AF] leading-relaxed space-y-0.5">
                <div>Version 1.8.2</div>
                <div className="text-[10px] text-[#C4C4C4] font-normal">Build 2025.01.18</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}