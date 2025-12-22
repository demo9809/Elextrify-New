/**
 * Z-Index Layer System
 * 
 * This file defines the z-index hierarchy for the entire application.
 * Always use these constants to maintain a consistent layering system.
 */

export const Z_INDEX = {
  // Base layers
  BASE: 0,
  CONTENT: 0,
  
  // Navigation layers
  SIDEBAR: 20,
  TOP_HEADER: 30,
  
  // Informational layers (non-blocking)
  STICKY_BANNER: 40,
  
  // Interactive layers (must be above informational)
  DROPDOWN_MENU: 50,
  POPOVER: 50,
  NOTIFICATION_PANEL: 50,
  USER_MENU: 50,
  SUBSCRIPTION_PANEL: 50,
  
  // Modal layers (highest priority)
  MODAL_BACKDROP: 60,
  MODAL: 70,
  TOAST: 80,
} as const;

/**
 * Usage Examples:
 * 
 * Sticky Banner:
 * className="z-40" or style={{ zIndex: Z_INDEX.STICKY_BANNER }}
 * 
 * User Dropdown:
 * className="z-50" or style={{ zIndex: Z_INDEX.USER_MENU }}
 * 
 * Modal:
 * className="z-70" or style={{ zIndex: Z_INDEX.MODAL }}
 */

export default Z_INDEX;
