# Z-Index Layer Hierarchy

This document defines the complete z-index layering system for the DOOH SaaS platform to ensure proper visual stacking and prevent UI overlapping issues.

## 🎯 Core Principle

**Interactive elements (dropdowns, menus) must always render above informational elements (banners, alerts).**

---

## 📊 Complete Z-Index Stack

```
┌─────────────────────────────────────────────────────────────┐
│  Layer 8: Toast Notifications                    z-80      │ ← Highest
├─────────────────────────────────────────────────────────────┤
│  Layer 7: Modals & Dialogs                       z-70      │
├─────────────────────────────────────────────────────────────┤
│  Layer 6: Modal Backdrops                        z-60      │
├─────────────────────────────────────────────────────────────┤
│  Layer 5: Interactive Dropdowns                  z-50      │
│  • User Menu Dropdown                                      │
│  • Notification Panel                                      │
│  • Subscription Status Panel                              │
│  • Mobile Navigation Menu                                  │
│  • All Popovers & Quick Actions                           │
├─────────────────────────────────────────────────────────────┤
│  Layer 4: Sticky Global Alert Banner             z-40      │ ← Informational
├─────────────────────────────────────────────────────────────┤
│  Layer 3: Fixed Navigation (Top Header)          z-30      │
├─────────────────────────────────────────────────────────────┤
│  Layer 2: Sidebar Navigation                     z-20      │
├─────────────────────────────────────────────────────────────┤
│  Layer 1: Page Content                           z-0       │ ← Lowest
└─────────────────────────────────────────────────────────────┘
```

---

## 🔍 Detailed Layer Specifications

### Layer 1: Base Content (z-0)
**Purpose:** Default page content  
**Elements:**
- Page containers
- Content sections
- Tables
- Cards
- Forms

**Implementation:**
```tsx
<div className="z-0">
  {/* Page content */}
</div>
```

---

### Layer 2: Sidebar Navigation (z-20)
**Purpose:** Fixed left navigation panel  
**Elements:**
- Desktop sidebar
- Sidebar tooltips (hover states use z-50)

**Implementation:**
```tsx
<div className="fixed left-0 top-0 z-20">
  {/* Sidebar content */}
</div>
```

**File:** `/components/Sidebar.tsx`

---

### Layer 3: Top Header (z-30)
**Purpose:** Fixed top navigation bar  
**Elements:**
- Desktop top header
- Search bar
- Action buttons

**Implementation:**
```tsx
<div className="fixed top-0 left-0 right-0 z-30">
  {/* Header content */}
</div>
```

**File:** `/components/TopHeader.tsx`

---

### Layer 4: Sticky Global Alert Banner (z-40)
**Purpose:** System-wide informational alerts  
**Elements:**
- Global alert banner
- Critical announcements
- System status messages

**Behavior:**
- Sticky positioned below header
- Non-blocking (informational only)
- Does NOT interfere with dropdowns

**Implementation:**
```tsx
<div className="sticky top-14 lg:top-16 z-40">
  <GlobalAlertBanner />
</div>
```

**File:** `/components/GlobalAlertBanner.tsx`

**Visual Position:**
```
┌──────────────────────────────────┐
│  Top Header (z-30)               │ ← Fixed at top
├──────────────────────────────────┤
│  Alert Banner (z-40)             │ ← Sticks below header
├──────────────────────────────────┤
│  Content (scrollable)            │
│                                  │
└──────────────────────────────────┘
```

---

### Layer 5: Interactive Dropdowns (z-50)
**Purpose:** User-triggered interactive menus  
**Elements:**
- User avatar dropdown menu
- Notification panel
- Subscription status panel
- Mobile navigation slide-out
- All popovers and tooltips
- Quick action menus

**Behavior:**
- Opens above ALL informational layers
- Always accessible, regardless of banner visibility
- Closes on outside click or ESC key

**Implementation:**

**User Menu Dropdown:**
```tsx
// In TopHeader.tsx
<div className="absolute right-0 top-12 w-64 bg-white border z-50">
  {/* Dropdown content */}
</div>
```

**Notification Panel:**
```tsx
// In NotificationModal.tsx
<div className="fixed inset-0 z-50">
  <div className="absolute bg-white border rounded-lg">
    {/* Notification list */}
  </div>
</div>
```

**Subscription Panel:**
```tsx
// In SubscriptionStatusPanel.tsx
<div className="absolute right-0 top-full mt-2 w-80 bg-white border z-50">
  {/* Subscription details */}
</div>
```

**Mobile Navigation:**
```tsx
// In MobileNav.tsx
<div className="fixed top-0 left-0 right-0 h-14 bg-white z-50">
  {/* Mobile header */}
</div>
```

**Files:**
- `/components/TopHeader.tsx` (user menu)
- `/components/notifications/NotificationModal.tsx`
- `/components/subscription/SubscriptionStatusPanel.tsx`
- `/components/MobileNav.tsx`

---

### Layer 6: Modal Backdrops (z-60)
**Purpose:** Dark overlay behind modals  
**Elements:**
- Modal backdrops
- Overlay backgrounds

**Implementation:**
```tsx
<div className="fixed inset-0 bg-black/50 z-60">
  {/* Backdrop */}
</div>
```

---

### Layer 7: Modals & Dialogs (z-70)
**Purpose:** Full-screen or centered modal dialogs  
**Elements:**
- Confirmation dialogs
- Forms in modals
- Detail views

**Implementation:**
```tsx
<div className="fixed inset-0 z-70 flex items-center justify-center">
  <div className="bg-white rounded-lg shadow-xl">
    {/* Modal content */}
  </div>
</div>
```

**File:** `/components/LogoutModal.tsx` (example)

---

### Layer 8: Toast Notifications (z-80)
**Purpose:** Temporary feedback messages  
**Elements:**
- Success toasts
- Error messages
- Info alerts

**Implementation:**
```tsx
// Using sonner library
<Toaster position="top-right" className="z-80" />
```

---

## 🚨 Critical Rules

### ✅ DO:
1. **Always use the defined z-index values** from `/styles/z-index-layers.ts`
2. **Interactive elements MUST be z-50 or higher** (above banner at z-40)
3. **Test dropdown functionality** when adding new sticky/fixed elements
4. **Ensure click-outside handlers** work properly for dropdowns
5. **Use relative positioning** on parent containers when needed

### ❌ DON'T:
1. **Never use arbitrary z-index values** like z-99, z-100, etc.
2. **Never place interactive menus below z-40** (they'll be blocked by banner)
3. **Never use z-index without positioning** (absolute, fixed, relative, sticky)
4. **Never stack too many layers** (keep hierarchy clean)
5. **Never block critical UI** with informational banners

---

## 🔧 Testing Checklist

When adding new UI elements, verify:

- [ ] User avatar dropdown opens unobstructed
- [ ] Notification panel is fully clickable
- [ ] Subscription status panel displays correctly
- [ ] Mobile navigation slides out properly
- [ ] Global alert banner doesn't block interactions
- [ ] Modals display above all other elements
- [ ] Click-outside to close works correctly
- [ ] ESC key closes panels as expected
- [ ] No z-index conflicts on scroll
- [ ] Tooltips appear above everything

---

## 📱 Responsive Behavior

### Mobile (< 1024px)
```
Top: Mobile Header (z-50)
↓    Alert Banner (z-40, sticky at top-14)
↓    Content (scrollable)
```

**Mobile Menu:**
- Backdrop: z-40
- Slide-out panel: z-50

### Desktop (≥ 1024px)
```
Left: Sidebar (z-20)
Top:  Desktop Header (z-30)
↓     Alert Banner (z-40, sticky at lg:top-16)
↓     Content (scrollable)
```

**Dropdowns:**
- All at z-50 (above banner)

---

## 🎨 Visual Example

**When User Clicks Avatar with Banner Visible:**

```
┌──────────────────────────────────────────┐
│  Header [Search] 🔔 ⚙️ 👤          z-30 │
├──────────────────────────────────────────┤
│  ⚠️ System maintenance Jan 25...  z-40  │ ← Banner (sticky)
├──────────────────────────────────────────┤
│  Content                                 │
│  ┌─────────────────────────┐            │
│  │ 👤 Profile Settings    │ z-50       │ ← Dropdown (above banner!)
│  │ 💳 Billing & Plan      │            │
│  │ ━━━━━━━━━━━━━━━━━━━━━ │            │
│  │ 🚪 Logout              │            │
│  └─────────────────────────┘            │
└──────────────────────────────────────────┘
```

**Key: Dropdown at z-50 renders ABOVE banner at z-40** ✅

---

## 📝 Code Reference

**TypeScript Constants:**
```typescript
// /styles/z-index-layers.ts
export const Z_INDEX = {
  BASE: 0,
  SIDEBAR: 20,
  TOP_HEADER: 30,
  STICKY_BANNER: 40,
  DROPDOWN_MENU: 50,
  MODAL_BACKDROP: 60,
  MODAL: 70,
  TOAST: 80,
} as const;
```

**Usage Example:**
```tsx
import { Z_INDEX } from '../styles/z-index-layers';

<div style={{ zIndex: Z_INDEX.DROPDOWN_MENU }}>
  {/* Dropdown content */}
</div>

// Or with Tailwind:
<div className="z-50"> {/* Equivalent to Z_INDEX.DROPDOWN_MENU */}
  {/* Dropdown content */}
</div>
```

---

## 🛠️ Troubleshooting

**Issue: Dropdown blocked by banner**
- **Cause:** Dropdown has z-index ≤ 40
- **Fix:** Set dropdown to z-50 or use `Z_INDEX.DROPDOWN_MENU`

**Issue: Modal behind header**
- **Cause:** Modal has z-index ≤ 30
- **Fix:** Set modal to z-70 or use `Z_INDEX.MODAL`

**Issue: Click-outside not working**
- **Cause:** Backdrop has wrong z-index or missing
- **Fix:** Add backdrop at z-40 for dropdowns, z-60 for modals

**Issue: Tooltip not visible**
- **Cause:** Parent container has lower z-index
- **Fix:** Use z-50 for tooltip, ensure parent has position: relative

---

## ✨ Summary

**Layering Priority (Lowest to Highest):**
1. Content (z-0)
2. Sidebar (z-20)
3. Header (z-30)
4. **Banner (z-40)** ← Informational barrier
5. **Dropdowns (z-50)** ← Interactive elements (above barrier!)
6. Modal Backdrop (z-60)
7. Modals (z-70)
8. Toasts (z-80)

**Golden Rule:**  
> Interactive elements (z-50+) ALWAYS render above informational elements (z-40).

This ensures users can access Profile Settings, Billing, Logout, and all other actions **regardless of banner visibility**! 🎯✨
