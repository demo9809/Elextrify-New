import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner@2.0.3';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { TopHeader } from './components/TopHeader';
import { GlobalFooter } from './components/GlobalFooter';
import { LoginScreen } from './components/auth/LoginScreen';
import { AccessRestricted } from './components/auth/AccessRestricted';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LegalEntityProvider } from './contexts/LegalEntityContext';
import { WelcomeScreen } from './components/welcome/WelcomeScreen';
import DashboardContainer from './components/operational-dashboard/DashboardContainer';
import { CampaignHub } from './components/campaigns/CampaignHub';
import { AdSlottingHub } from './components/ad-slotting/AdSlottingHub';
import { TerminalManagement } from './components/terminal/TerminalManagement';
import { PlaylistManager } from './components/playlists/PlaylistManager';
import { MediaManager } from './components/media/MediaManager';
import { ClientManager } from './components/clients/ClientManager';
import { ProofOfPlayDashboard } from './components/proof-of-play/ProofOfPlayDashboard';
import TenantManagement from './components/tenants/TenantManagement';
import TenantDetails from './components/tenants/TenantDetails';
import TenantOrganizationUnitsReadOnly from './components/tenants/TenantOrganizationUnitsReadOnly';
import EditionManagement from './components/editions/EditionManagement';
import CreateEditEdition from './components/editions/CreateEditEdition';
import EditionDetails from './components/editions/EditionDetails';
import OrganizationUnitManagement from './components/organization-units/OrganizationUnitManagement';
import CreateEditOrganizationUnit from './components/organization-units/CreateEditOrganizationUnit';
import OrganizationUnitDetails from './components/organization-units/OrganizationUnitDetails';
import UserAccessManagement from './components/organization-units/UserAccessManagement';
import TenantBilling from './components/billing/TenantBilling';
import MediaBilling from './components/media-billing/MediaBilling';
import AdminBillingDashboard from './components/admin-billing/AdminBillingDashboard';
import AdminSubscriptions from './components/admin-billing/AdminSubscriptions';
import AdminInvoices from './components/admin-billing/AdminInvoices';
import AdminPaymentsFailures from './components/admin-billing/AdminPaymentsFailures';
import AdminRevenueAnalytics from './components/admin-billing/AdminRevenueAnalytics';
import AdminDiscountsCredits from './components/admin-billing/AdminDiscountsCredits';
import AdminAuditLog from './components/admin-billing/AdminAuditLog';
import AdminTenantBillingDetail from './components/admin-billing/AdminTenantBillingDetail';
import UserManagement from './components/users/UserManagement';
import UserDetails from './components/users/UserDetails';
import RolesManagement from './components/users/RolesManagement';
import CreateEditRole from './components/users/CreateEditRole';
import ActivityLog from './components/users/ActivityLog';
import SettingsHub from './components/settings/SettingsHub';
import SettingsAccount from './components/settings/SettingsAccount';
import SettingsWorkspace from './components/settings/SettingsWorkspace';
import SettingsSystem from './components/settings/SettingsSystem';
import LanguageSettings from './components/settings/LanguageSettings';
import GeneralSettings from './components/settings/GeneralSettings';
import IntegrationsSettings from './components/settings/IntegrationsSettings';
import NotificationSettings from './components/settings/NotificationSettings';
import SecuritySettings from './components/settings/SecuritySettings';
import EmailConfiguration from './components/settings/EmailConfiguration';
import ApiIntegration from './components/settings/ApiIntegration';
import ThirdPartyIntegrations from './components/settings/IntegrationsSettings';
import RazorpayConfig from './components/settings/integrations/RazorpayConfig';
import ZohoBooksConfig from './components/settings/integrations/ZohoBooksConfig';
import WebhooksConfig from './components/settings/integrations/WebhooksConfig';
import ProfileSettings from './components/settings/account/ProfileSettings';
import PasswordMFA from './components/settings/account/PasswordMFA';
import NotificationPreferences from './components/settings/account/NotificationPreferences';
import LanguageTimezone from './components/settings/account/LanguageTimezone';
import HelpSupport from './components/pages/HelpSupport';
import Documentation from './components/pages/Documentation';
import EnhancedNotificationsPage from './components/notifications/EnhancedNotificationsPage';
import GlobalAlertBanner from './components/GlobalAlertBanner';

type Page = 'welcome' | 'dashboard' | 'campaigns' | 'ad-slotting' | 'terminals' | 'playlists' | 'media' | 'customers' | 'proof-of-play' | 'tenants' | 'editions' | 'organization-units' | 'billing' | 'media-billing' | 'admin-billing' | 'admin-billing-overview' | 'admin-billing-subscriptions' | 'admin-billing-invoices' | 'admin-billing-payments' | 'admin-billing-revenue' | 'admin-billing-discounts' | 'admin-billing-audit' | 'settings' | 'settings-account' | 'settings-workspace' | 'settings-system' | 'settings-users' | 'settings-language' | 'settings-general' | 'settings-billing' | 'settings-integrations' | 'settings-notifications' | 'settings-security' | 'settings-email' | 'settings-api' | 'help-support' | 'documentation' | 'notifications';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { isAuthenticated } = useAuth();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Determine current page from route
  const getCurrentPage = (): Page => {
    const path = location.pathname;
    if (path === '/dashboard') return 'dashboard';
    if (path.includes('/ad-slotting')) return 'ad-slotting';
    if (path.includes('/campaigns')) return 'campaigns';
    if (path.includes('/tenants')) return 'tenants';
    if (path.includes('/terminals') || path.includes('/kiosks')) return 'terminals';
    if (path.includes('/playlists')) return 'playlists';
    if (path.includes('/media-billing')) return 'media-billing';
    if (path.includes('/media')) return 'media';
    if (path.includes('/customers') || path.includes('/clients')) return 'customers';
    if (path.includes('/proof-of-play')) return 'proof-of-play';
    if (path.includes('/editions')) return 'editions';
    if (path.includes('/organization-units')) return 'organization-units';
    if (path === '/admin/billing') return 'admin-billing-overview';
    if (path.includes('/admin/billing/subscriptions')) return 'admin-billing-subscriptions';
    if (path.includes('/admin/billing/invoices')) return 'admin-billing-invoices';
    if (path.includes('/admin/billing/payments')) return 'admin-billing-payments';
    if (path.includes('/admin/billing/revenue')) return 'admin-billing-revenue';
    if (path.includes('/admin/billing/discounts')) return 'admin-billing-discounts';
    if (path.includes('/admin/billing/audit')) return 'admin-billing-audit';
    if (path.includes('/admin/billing')) return 'admin-billing';
    if (path.includes('/billing')) return 'billing';
    // Handle nested routes FIRST - before other settings checks
    if (path.includes('/settings/system/integrations')) return 'settings-system';
    if (path.includes('/settings/account/')) return 'settings-account'; // All account sub-pages
    if (path === '/settings/account') return 'settings-account';
    // Workspace sub-pages should show Workspace as active
    if (path.includes('/settings/security')) return 'settings-workspace';
    if (path.includes('/settings/language')) return 'settings-workspace';
    if (path.includes('/settings/general')) return 'settings-workspace';
    if (path === '/settings/workspace') return 'settings-workspace';
    if (path === '/settings/system') return 'settings-system';
    if (path.includes('/settings/email')) return 'settings-email';
    if (path.includes('/settings/api')) return 'settings-api';
    if (path.includes('/settings/billing')) return 'settings-billing';
    if (path.includes('/settings/integrations')) return 'settings-integrations';
    if (path.includes('/settings/notifications')) return 'settings-notifications';
    if (path.includes('/settings')) return 'settings';
    if (path.includes('/users')) return 'settings-users';
    if (path.includes('/help-support')) return 'help-support';
    if (path.includes('/documentation')) return 'documentation';
    if (path.includes('/notifications')) return 'notifications';
    return 'welcome';
  };

  const currentPage = getCurrentPage();

  const handleNavigate = (page: string) => {
    // Map page names to routes
    const routeMap: { [key: string]: string } = {
      welcome: '/',
      dashboard: '/dashboard',
      campaigns: '/campaigns',
      'ad-slotting': '/ad-slotting',
      terminals: '/terminals',
      playlists: '/playlists',
      media: '/media',
      customers: '/customers',
      'proof-of-play': '/proof-of-play',
      tenants: '/tenants',
      editions: '/editions',
      'organization-units': '/organization-units',
      'admin-billing': '/admin/billing',
      'admin-billing-overview': '/admin/billing',
      'admin-billing-subscriptions': '/admin/billing/subscriptions',
      'admin-billing-invoices': '/admin/billing/invoices',
      'admin-billing-payments': '/admin/billing/payments',
      'admin-billing-revenue': '/admin/billing/revenue',
      'admin-billing-discounts': '/admin/billing/discounts',
      'admin-billing-audit': '/admin/billing/audit',
      billing: '/billing',
      'media-billing': '/media-billing',
      users: '/users',
      settings: '/settings',
      'settings-users': '/users',
      'settings-account': '/settings/account',
      'settings-workspace': '/settings/workspace',
      'settings-system': '/settings/system',
      'settings-language': '/settings/language',
      'settings-general': '/settings/general',
      'settings-billing': '/billing',
      'settings-integrations': '/settings/integrations',
      'settings-notifications': '/settings/notifications',
      'settings-security': '/settings/security',
      'settings-email': '/settings/email',
      'settings-api': '/settings/api',
      'help-support': '/help-support',
      'documentation': '/documentation',
      'notifications': '/notifications',
    };
    navigate(routeMap[page] || '/');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Desktop/Tablet Sidebar */}
      <div className="hidden lg:block">
        <Sidebar 
          activePage={currentPage} 
          onNavigate={handleNavigate}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      {/* Mobile Navigation */}
      <MobileNav 
        activePage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main Content */}
      <div 
        className={`flex flex-col min-h-screen transition-all duration-300 pt-14 lg:pt-16 ${
          isSidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-[240px]'
        }`}
      >
        {/* Desktop Header - hidden on mobile */}
        <div className="hidden lg:block">
          <TopHeader 
            isSidebarCollapsed={isSidebarCollapsed} 
            onNavigate={handleNavigate}
          />
        </div>

        {/* Global Alert Banner - Sticky layout component below header */}
        <div className="sticky top-14 lg:top-16 z-30 bg-white">
          <GlobalAlertBanner 
            isSidebarCollapsed={isSidebarCollapsed}
          />
        </div>

        {/* Page Content - Naturally pushed down by banner when visible */}
        <div className="flex-1 pb-12">
          <Routes>
            <Route path="/" element={<WelcomeScreen onNavigate={(route) => navigate(route)} />} />
            <Route path="/dashboard" element={<DashboardContainer />} />
            <Route path="/campaigns" element={<CampaignHub />} />
            <Route path="/ad-slotting" element={<AdSlottingHub />} />
            <Route path="/terminals" element={<TerminalManagement />} />
            <Route path="/playlists" element={<PlaylistManager />} />
            <Route path="/media" element={<MediaManager />} />
            <Route path="/customers" element={<ClientManager />} />
            <Route path="/clients" element={<ClientManager />} />
            <Route path="/proof-of-play" element={<ProofOfPlayDashboard />} />
            <Route path="/tenants" element={<TenantManagement />} />
            <Route path="/tenants/:tenantId" element={<TenantDetails />} />
            <Route path="/tenants/:tenantId/organization-units" element={<TenantOrganizationUnitsReadOnly />} />
            <Route path="/editions" element={<EditionManagement />} />
            <Route path="/editions/new" element={<CreateEditEdition />} />
            <Route path="/editions/:editionId/edit" element={<CreateEditEdition />} />
            <Route path="/editions/:editionId" element={<EditionDetails />} />
            <Route path="/organization-units" element={<OrganizationUnitManagement />} />
            <Route path="/organization-units/new" element={<CreateEditOrganizationUnit />} />
            <Route path="/organization-units/:unitId/edit" element={<CreateEditOrganizationUnit />} />
            <Route path="/organization-units/:unitId" element={<OrganizationUnitDetails />} />
            <Route path="/organization-units/:unitId/access" element={<UserAccessManagement />} />
            <Route path="/billing" element={<TenantBilling />} />
            <Route path="/media-billing" element={<MediaBilling />} />
            <Route path="/admin/billing" element={<AdminBillingDashboard />} />
            <Route path="/admin/billing/subscriptions" element={<AdminSubscriptions />} />
            <Route path="/admin/billing/invoices" element={<AdminInvoices />} />
            <Route path="/admin/billing/payments" element={<AdminPaymentsFailures />} />
            <Route path="/admin/billing/revenue" element={<AdminRevenueAnalytics />} />
            <Route path="/admin/billing/discounts" element={<AdminDiscountsCredits />} />
            <Route path="/admin/billing/audit" element={<AdminAuditLog />} />
            <Route path="/admin/billing/:tenantId" element={<AdminTenantBillingDetail />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/users/:userId" element={<UserDetails />} />
            <Route path="/users/roles" element={<RolesManagement />} />
            <Route path="/users/roles/new" element={<CreateEditRole />} />
            <Route path="/users/roles/:roleId/edit" element={<CreateEditRole />} />
            <Route path="/users/activity" element={<ActivityLog />} />
            <Route path="/settings" element={<SettingsHub />} />
            <Route path="/settings/account" element={<SettingsAccount />} />
            <Route path="/settings/workspace" element={<SettingsWorkspace />} />
            <Route path="/settings/system" element={<SettingsSystem />} />
            <Route path="/settings/language" element={<LanguageSettings />} />
            <Route path="/settings/general" element={<GeneralSettings />} />
            <Route path="/settings/billing" element={<Navigate to="/billing" replace />} />
            <Route path="/settings/integrations" element={<IntegrationsSettings />} />
            <Route path="/settings/notifications" element={<NotificationSettings />} />
            <Route path="/settings/security" element={<SecuritySettings />} />
            <Route path="/settings/email" element={<EmailConfiguration />} />
            <Route path="/settings/api" element={<ApiIntegration />} />
            <Route path="/settings/system/integrations" element={<ThirdPartyIntegrations />} />
            <Route path="/settings/system/integrations/razorpay" element={<RazorpayConfig />} />
            <Route path="/settings/system/integrations/zoho-books" element={<ZohoBooksConfig />} />
            <Route path="/settings/system/integrations/webhooks" element={<WebhooksConfig />} />
            <Route path="/settings/account/profile" element={<ProfileSettings />} />
            <Route path="/settings/account/password-mfa" element={<PasswordMFA />} />
            <Route path="/settings/account/notifications" element={<NotificationPreferences />} />
            <Route path="/settings/account/language-timezone" element={<LanguageTimezone />} />
            <Route path="/help-support" element={<HelpSupport />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/notifications" element={<EnhancedNotificationsPage />} />
          </Routes>
        </div>

        {/* Desktop Footer - hidden on mobile */}
        <div className="hidden lg:block">
          <GlobalFooter 
            onNavigate={handleNavigate}
            isSidebarCollapsed={isSidebarCollapsed}
          />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <LegalEntityProvider>
        <BrowserRouter>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/access-restricted" element={<AccessRestricted />} />
            <Route path="*" element={<AppContent />} />
          </Routes>
        </BrowserRouter>
      </LegalEntityProvider>
    </AuthProvider>
  );
}

export default App;