import { ReactNode, useState } from 'react';
import GlobalAlertBanner from '../GlobalAlertBanner';

interface MainLayoutProps {
  children: ReactNode;
  isSidebarCollapsed?: boolean;
  currentUserId?: string;
  userRole?: 'tenant_admin' | 'saas_admin';
}

/**
 * MainLayout - Layout wrapper that ensures proper stacking order:
 * 1. Top Navigation Bar (fixed)
 * 2. Global Alert Banner (in document flow, below top bar)
 * 3. Page Header
 * 4. Page Content
 */
export default function MainLayout({
  children,
  isSidebarCollapsed = false,
  currentUserId,
  userRole
}: MainLayoutProps) {
  const [bannerHeight, setBannerHeight] = useState(0);

  return (
    <>
      {/* Global Alert Banner - Part of document flow, directly below top bar */}
      <div className="sticky top-14 lg:top-16 z-30 bg-white">
        <GlobalAlertBanner
          isSidebarCollapsed={isSidebarCollapsed}
          currentUserId={currentUserId}
          userRole={userRole}
          onHeightChange={setBannerHeight}
        />
      </div>

      {/* Page Content - Naturally pushed down by banner when visible */}
      <div className="flex-1">
        {children}
      </div>
    </>
  );
}
