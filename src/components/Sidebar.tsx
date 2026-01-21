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
  BookOpen,
  ShieldCheck,
  CheckCircle,
  Palette,
  Grid3x3,
  Clock,
  PlaySquare,
  Sliders
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
  
  const [administrationExpanded, setAdministrationExpanded] = React.useState(false);
  const [billingExpanded, setBillingExpanded] = React.useState(false);
  const [hostAdminExpanded, setHostAdminExpanded] = React.useState(false);
  const [adSlottingExpanded, setAdSlottingExpanded] = React.useState(false);

  // Primary Daily-Use Items (Top Section)
  const primaryMenuItems = [
    { id: 'welcome', label: 'Welcome', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'media', label: 'Media', icon: Film },
    { id: 'playlists', label: 'Playlists', icon: List },
    { id: 'terminals', label: 'Kiosk Management', icon: Monitor },
  ];

  // Ad Slotting Sub-Items
  const adSlottingItems = [
    { id: 'ad-slotting-inventory', label: 'Inventory Overview' },
    { id: 'ad-slotting-slot-config', label: 'Slot Configuration' },
    { id: 'ad-slotting-machine-config', label: 'Machine Configuration' },
    { id: 'ad-slotting-ads-manager', label: 'Ads Manager' },
    { id: 'ad-slotting-live-control', label: 'Live Ad Control' },
    { id: 'ad-slotting-reports', label: 'Ad Reports' },
  ];

  // Media Billing (After First Divider)
  const mediaBillingItem = { id: 'media-billing', label: 'Media Billing', icon: Receipt };

  // Administration Items (Collapsible Section)
  const administrationItems = [
    { id: 'organization-units', label: 'Organization Units', icon: Layers },
    { id: 'settings-users', label: 'User Management', icon: Users },
    { id: 'settings-account', label: 'Account', icon: Settings },
    { id: 'settings-workspace', label: 'Workspace', icon: Building2 },
    { id: 'settings-system', label: 'System', icon: ShieldCheck },
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

  // Check if current page is in administration
  const isAdministrationActive = activePage === 'organization-units' || 
                                   activePage === 'settings-users' || 
                                   activePage === 'settings-account' || 
                                   activePage === 'settings-workspace' || 
                                   activePage === 'settings-system' ||
                                   activePage === 'users';
  
  // Check if current page is a billing admin page
  const isBillingAdminActive = activePage === 'admin-billing' || activePage.startsWith('admin-billing-');
  
  // Check if current page is a host admin page
  const isHostAdminActive = activePage === 'tenants' || activePage === 'editions';

  // Check if current page is an ad slotting page
  const isAdSlottingActive = activePage === 'ad-slotting' || activePage?.startsWith('ad-slotting-');

  // Determine if user can see System section
  const canViewSystemSettings = userRole === 'saas-admin' || userRole === 'host-admin';
  
  // Determine if user can see Workspace section
  const canViewWorkspaceSettings = userRole !== 'user';

  // Auto-expand administration if a settings page is active
  React.useEffect(() => {
    if (isAdministrationActive && !isCollapsed) {
      setAdministrationExpanded(true);
    }
  }, [isAdministrationActive, isCollapsed]);

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

  // Auto-expand ad slotting if an ad slotting page is active
  React.useEffect(() => {
    if (isAdSlottingActive && !isCollapsed) {
      setAdSlottingExpanded(true);
    }
  }, [isAdSlottingActive, isCollapsed]);

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

              {/* Ad Slotting & Scheduling (Collapsible Parent) */}
              <div className="relative group">
                <button
                  onClick={() => {
                    if (isCollapsed) {
                      onNavigate?.('ad-slotting-inventory');
                    } else {
                      setAdSlottingExpanded(!adSlottingExpanded);
                    }
                  }}
                  className={`
                    w-full flex items-center rounded-lg transition-colors text-left
                    ${isCollapsed ? 'justify-center px-0 py-3' : 'gap-3 px-4 py-2.5'}
                    ${isAdSlottingActive 
                      ? 'bg-[#FEF2F2] text-[#D9480F]' 
                      : 'text-[#6B7280] hover:bg-[#F9FAFB]'
                    }
                    ${isAdSlottingActive && !isCollapsed ? 'border-l-4 border-[#D9480F] -ml-[4px] pl-[20px]' : ''}
                  `}
                  title={isCollapsed ? 'Ad Slotting & Scheduling' : undefined}
                >
                  <Target className={`w-5 h-5 ${ 
                    isAdSlottingActive ? 'text-[#D9480F]' : 'text-[#6B7280]'
                  }`} />
                  {!isCollapsed && (
                    <>
                      <span className={`text-sm flex-1 ${isAdSlottingActive ? 'font-medium' : ''}`}>
                        Ad Slotting & Scheduling
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${
                        adSlottingExpanded ? 'rotate-180' : ''
                      } ${isAdSlottingActive ? 'text-[#D9480F]' : 'text-[#6B7280]'}`} />
                    </>
                  )}
                </button>

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#111827] text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 pointer-events-none">
                    Ad Slotting & Scheduling
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#111827]"></div>
                  </div>
                )}

                {/* Ad Slotting Submenu */}
                {adSlottingExpanded && !isCollapsed && (
                  <div className="mt-1 ml-4 pl-4 border-l-2 border-[#E5E7EB] space-y-1">
                    {adSlottingItems.map((subItem) => {
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

              {/* Divider 1 */}
              <MenuDivider />

              {/* Media Billing */}
              <MenuItem key={mediaBillingItem.id} item={mediaBillingItem} isActive={mediaBillingItem.id === activePage} />

              {/* Proof of Play */}
              <MenuItem 
                key="proof-of-play" 
                item={{ id: 'proof-of-play', label: 'Proof of Play', icon: CheckCircle }} 
                isActive={'proof-of-play' === activePage} 
              />

              {/* Divider 2 */}
              <MenuDivider />

              {/* UI Library */}
              <MenuItem 
                key="ui-library" 
                item={{ id: 'ui-library', label: 'UI Library', icon: Palette }} 
                isActive={'ui-library' === activePage} 
              />

              {/* Divider 3 */}
              <MenuDivider />

              {/* Administration */}
              <div className="relative group">
                <button
                  onClick={() => {
                    if (isCollapsed) {
                      onNavigate?.('settings');
                    } else {
                      setAdministrationExpanded(!administrationExpanded);
                    }
                  }}
                  className={`
                    w-full flex items-center rounded-lg transition-colors text-left
                    ${isCollapsed ? 'justify-center px-0 py-3' : 'gap-3 px-4 py-2.5'}
                    ${isAdministrationActive 
                      ? 'bg-[#FEF2F2] text-[#D9480F]' 
                      : 'text-[#6B7280] hover:bg-[#F9FAFB]'
                    }
                    ${isAdministrationActive && !isCollapsed ? 'border-l-4 border-[#D9480F] -ml-[4px] pl-[20px]' : ''}
                  `}
                  title={isCollapsed ? 'Administration' : undefined}
                >
                  <Settings className={`w-5 h-5 ${ 
                    isAdministrationActive ? 'text-[#D9480F]' : 'text-[#6B7280]'
                  }`} />
                  {!isCollapsed && (
                    <>
                      <span className={`text-sm flex-1 ${isAdministrationActive ? 'font-medium' : ''}`}>
                        Administration
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${
                        administrationExpanded ? 'rotate-180' : ''
                      } ${isAdministrationActive ? 'text-[#D9480F]' : 'text-[#6B7280]'}`} />
                    </>
                  )}
                </button>

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#111827] text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 pointer-events-none">
                    Administration
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#111827]"></div>
                  </div>
                )}

                {/* Administration Submenu */}
                {administrationExpanded && !isCollapsed && (
                  <div className="mt-1 ml-4 pl-4 border-l-2 border-[#E5E7EB] space-y-1">
                    {administrationItems
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
                      setAdministrationExpanded(!administrationExpanded);
                    }
                  }}
                  className={`
                    w-full flex items-center rounded-lg transition-colors text-left
                    ${isCollapsed ? 'justify-center px-0 py-3' : 'gap-3 px-4 py-2.5'}
                    ${isAdministrationActive 
                      ? 'bg-[#FEF2F2] text-[#D9480F]' 
                      : 'text-[#6B7280] hover:bg-[#F9FAFB]'
                    }
                    ${isAdministrationActive && !isCollapsed ? 'border-l-4 border-[#D9480F] -ml-[4px] pl-[20px]' : ''}
                  `}
                  title={isCollapsed ? 'Settings' : undefined}
                >
                  <Settings className={`w-5 h-5 ${ 
                    isAdministrationActive ? 'text-[#D9480F]' : 'text-[#6B7280]'
                  }`} />
                  {!isCollapsed && (
                    <>
                      <span className={`text-sm flex-1 ${isAdministrationActive ? 'font-medium' : ''}`}>
                        Settings
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${
                        administrationExpanded ? 'rotate-180' : ''
                      } ${isAdministrationActive ? 'text-[#D9480F]' : 'text-[#6B7280]'}`} />
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
                {administrationExpanded && !isCollapsed && (
                  <div className="mt-1 ml-4 pl-4 border-l-2 border-[#E5E7EB] space-y-1">
                    {administrationItems
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
    </div>
  );
}