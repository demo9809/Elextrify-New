// Responsive breakpoints and utilities for DOOH SaaS Platform

export const BREAKPOINTS = {
  mobile: 375,
  mobileLarge: 767,
  tablet: 768,
  tabletLarge: 1024,
  desktop: 1025,
} as const;

export const MEDIA_QUERIES = {
  mobile: `(max-width: ${BREAKPOINTS.mobileLarge}px)`,
  tablet: `(min-width: ${BREAKPOINTS.tablet}px) and (max-width: ${BREAKPOINTS.tabletLarge}px)`,
  tabletAndBelow: `(max-width: ${BREAKPOINTS.tabletLarge}px)`,
  desktop: `(min-width: ${BREAKPOINTS.desktop}px)`,
} as const;

// Touch-friendly minimum sizes
export const TOUCH_TARGET = {
  minHeight: 44,
  minWidth: 44,
  padding: 12,
} as const;

// Responsive spacing scale
export const SPACING = {
  mobile: {
    page: 16,
    section: 16,
    card: 16,
    gap: 12,
  },
  tablet: {
    page: 24,
    section: 24,
    card: 20,
    gap: 16,
  },
  desktop: {
    page: 32,
    section: 32,
    card: 24,
    gap: 24,
  },
} as const;

// Grid columns by breakpoint
export const GRID_COLUMNS = {
  mobile: 1,
  tablet: 2,
  desktop: 3,
  desktopLarge: 4,
} as const;

// Hook to detect current breakpoint
export function useBreakpoint() {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  
  if (width <= BREAKPOINTS.mobileLarge) return 'mobile';
  if (width <= BREAKPOINTS.tabletLarge) return 'tablet';
  return 'desktop';
}

// Responsive helper classes
export const RESPONSIVE_CLASSES = {
  // Hide/show by breakpoint
  hideOnMobile: 'hidden md:block',
  hideOnTablet: 'md:hidden lg:block',
  hideOnDesktop: 'lg:hidden',
  showOnMobile: 'block md:hidden',
  showOnTablet: 'hidden md:block lg:hidden',
  
  // Grid responsive
  gridCols1: 'grid-cols-1',
  gridCols1Md2: 'grid-cols-1 md:grid-cols-2',
  gridCols1Md2Lg3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  gridCols1Md2Lg4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  gridCols1Md3Lg6: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-6',
  
  // Flex responsive
  flexCol: 'flex flex-col',
  flexColMdRow: 'flex flex-col md:flex-row',
  
  // Padding responsive
  p4Md6Lg8: 'p-4 md:p-6 lg:p-8',
  px4Md6: 'px-4 md:px-6',
  py4Md6: 'py-4 md:py-6',
  
  // Gap responsive
  gap3Md4Lg6: 'gap-3 md:gap-4 lg:gap-6',
  gap4Md6: 'gap-4 md:gap-6',
  
  // Text responsive
  textSmMdBase: 'text-sm md:text-base',
  textBaseMdLg: 'text-base md:text-lg',
} as const;

export default {
  BREAKPOINTS,
  MEDIA_QUERIES,
  TOUCH_TARGET,
  SPACING,
  GRID_COLUMNS,
  RESPONSIVE_CLASSES,
  useBreakpoint,
};
