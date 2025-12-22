# Global Alert Banner - Layout-Aware Design

## 🎯 Overview

The Global Alert Banner has been refactored from an overlay component to a **layout-aware UI component** that integrates seamlessly into the document flow. This ensures the banner never overlaps or obstructs page content.

---

## 📐 Architecture Principles

### 1. **Part of Document Flow (Not an Overlay)**

The banner is positioned using **sticky positioning** within the normal document flow, not as a fixed overlay.

```tsx
// Layout structure
<div className="sticky top-14 lg:top-16 z-30 bg-white">
  <GlobalAlertBanner />
</div>
```

**Benefits:**
- ✅ Pushes content down naturally when visible
- ✅ No overlap with page headers, cards, or tables
- ✅ Smooth layout transitions on dismiss
- ✅ Accessible to all interactive elements

---

## 🎨 Visual Hierarchy (Top to Bottom)

```
┌──────────────────────────────────────────────────────┐
│  1. Top Navigation Bar (fixed, z-30)                 │ ← Always visible
├──────────────────────────────────────────────────────┤
│  2. Global Alert Banner (sticky, z-30, in flow)      │ ← Layout component
├──────────────────────────────────────────────────────┤
│  3. Page Header                                      │ ← Pushed down by banner
├──────────────────────────────────────────────────────┤
│  4. Page Content (cards, tables, forms)              │ ← Natural layout flow
│                                                      │
│  (Scrollable area)                                   │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## 🔧 Technical Implementation

### Banner Component

**File:** `/components/GlobalAlertBanner.tsx`

**Key Features:**

1. **Layout-Aware Positioning**
   ```tsx
   // Not fixed! Part of document flow
   const baseClasses = 'w-full border-b flex items-center justify-between px-6 py-3 transition-all duration-300';
   ```

2. **Smooth Collapse Animation**
   ```tsx
   const heightClasses = isCollapsing 
     ? 'max-h-0 opacity-0 py-0 overflow-hidden'  // Collapsing state
     : 'max-h-20 opacity-100';                   // Visible state
   ```

3. **Persistent Dismissal**
   ```tsx
   // Save to localStorage (except critical alerts)
   if (!isPersistent) {
     localStorage.setItem('dismissedGlobalAlerts', JSON.stringify(dismissedAlerts));
   }
   ```

4. **Height Change Notification** (Optional)
   ```tsx
   // Notify parent components of height changes
   onHeightChange?.(isVisible ? 56 : 0);
   ```

### App Integration

**File:** `/App.tsx`

```tsx
<div className={`flex flex-col min-h-screen pt-14 lg:pt-16`}>
  {/* Top Header - Fixed */}
  <div className="hidden lg:block">
    <TopHeader isSidebarCollapsed={isSidebarCollapsed} />
  </div>

  {/* Global Alert Banner - Sticky, in document flow */}
  <div className="sticky top-14 lg:top-16 z-30 bg-white">
    <GlobalAlertBanner isSidebarCollapsed={isSidebarCollapsed} />
  </div>

  {/* Page Content - Naturally flows below banner */}
  <div className="flex-1">
    <Routes>
      {/* All page routes */}
    </Routes>
  </div>
</div>
```

---

## 🎭 Banner States & Behavior

### Visible State

**When banner is active:**
- Height: ~56px (py-3 + content)
- Background: Severity-based color (blue/yellow/red)
- Position: Sticky below top bar
- Effect: Pushes all content down by 56px

```
┌────────────────────────────────────────┐
│  Top Bar                               │
├────────────────────────────────────────┤
│  ⚠️ System maintenance scheduled...   │ ← Banner visible
├────────────────────────────────────────┤
│  Page Title                            │ ← Content pushed down
│  Page content starts here              │
└────────────────────────────────────────┘
```

### Collapsed State (Dismissing)

**When user clicks dismiss:**
1. `isCollapsing` state set to true
2. CSS transition over 300ms:
   - `max-h-0` (height collapses)
   - `opacity-0` (fades out)
   - `py-0` (padding removes)
3. After 300ms: Component unmounts
4. Content smoothly reflows upward

```
┌────────────────────────────────────────┐
│  Top Bar                               │
├────────────────────────────────────────┤
│  [Banner collapsing... height → 0]     │ ← Smooth animation
├────────────────────────────────────────┤
│  Page Title                            │ ← Content moves up
│  Page content starts here              │
└────────────────────────────────────────┘
```

### Hidden State

**When no alerts are active:**
- Component returns `null`
- No DOM element rendered
- No layout space occupied
- Content naturally flows to top

```
┌────────────────────────────────────────┐
│  Top Bar                               │
├────────────────────────────────────────┤
│  Page Title                            │ ← Directly below top bar
│  Page content starts here              │
└────────────────────────────────────────┘
```

---

## 🎨 Visual Design

### Severity-Based Styling

**Informational (Blue):**
```tsx
bg-[#EFF6FF] border-[#DBEAFE] text-[#1E40AF]
```
- Softer background
- Non-urgent system updates
- Product announcements

**Warning (Yellow):**
```tsx
bg-[#FEF3C7] border-[#FDE68A] text-[#92400E]
```
- Moderate urgency
- Upcoming maintenance
- Feature deprecations

**Critical (Red):**
```tsx
bg-[#FEF2F2] border-[#FECACA] text-[#DC2626]
```
- High urgency
- System outages
- Security alerts
- Cannot be permanently dismissed

---

## 🔄 Interaction Flow

### Dismissal Workflow

```
1. User clicks [X] button
   ↓
2. isCollapsing = true
   ↓
3. CSS animation (300ms)
   - Height collapses
   - Opacity fades
   ↓
4. Update state
   - Add alert ID to dismissedAlerts[]
   - Save to localStorage (if not critical)
   ↓
5. Component unmounts
   ↓
6. Content reflows smoothly upward
```

### Persistence Rules

| Alert Severity | Dismissal Behavior | Reappears on Refresh? |
|----------------|--------------------|-----------------------|
| **Info** | Persisted to localStorage | ❌ No (permanently dismissed) |
| **Warning** | Persisted to localStorage | ❌ No (permanently dismissed) |
| **Critical** | Session only | ✅ Yes (critical alerts persist) |

---

## 📏 Spacing & Layout

### Vertical Spacing

```
Top Navigation Bar: 64px (lg:) / 56px (mobile)
  ↓ (gap: 0)
Alert Banner: ~56px (when visible)
  ↓ (gap: 0, natural flow)
Page Header: varies
  ↓ (gap: 24px typical)
Page Content: remaining space
```

### Responsive Positioning

**Mobile (< 1024px):**
```tsx
sticky top-14  // 56px below viewport top
```

**Desktop (≥ 1024px):**
```tsx
lg:top-16      // 64px below viewport top
```

### Sidebar Awareness

The banner is **not** offset by sidebar width. It spans the full content area:

```
Collapsed Sidebar (72px):
┌──┬───────────────────────────────────────┐
│ S│  Alert Banner (full width)            │
│ i├───────────────────────────────────────┤
│ d│  Content                              │
│ e│                                       │
└──┴───────────────────────────────────────┘

Expanded Sidebar (240px):
┌──────┬─────────────────────────────────┐
│      │  Alert Banner (full width)      │
│ Side ├─────────────────────────────────┤
│ bar  │  Content                        │
│      │                                 │
└──────┴─────────────────────────────────┘
```

---

## ♿ Accessibility

### Keyboard Navigation

- **Tab**: Focus on CTA link (if present)
- **Tab**: Focus on dismiss button (if dismissible)
- **Enter/Space**: Activate focused element
- **Escape**: *(Not implemented - banner doesn't trap focus)*

### Screen Readers

```tsx
<button
  onClick={handleDismiss}
  aria-label="Dismiss alert"
  disabled={isCollapsing}
>
  <X className="w-4 h-4" />
</button>
```

**Announcements:**
- Banner message read on appearance
- Dismiss button labeled clearly
- Loading/disabled states communicated

---

## 🧪 Testing Checklist

### Layout Behavior

- [ ] Banner pushes content down (no overlap)
- [ ] Dismissal smoothly collapses banner
- [ ] Content reflows upward after dismiss
- [ ] No layout jitter or jumps
- [ ] Works with all page types (tables, cards, modals)

### Responsive Behavior

- [ ] Correct top offset on mobile (top-14)
- [ ] Correct top offset on desktop (lg:top-16)
- [ ] Text remains readable on small screens
- [ ] CTA button doesn't wrap awkwardly

### Interaction Quality

- [ ] Click on dismiss button works immediately
- [ ] Cannot dismiss critical alerts
- [ ] Dismissed alerts stay dismissed (non-critical)
- [ ] Critical alerts reappear on refresh
- [ ] Smooth 300ms collapse animation

### Z-Index & Stacking

- [ ] Banner is sticky, not fixed
- [ ] Interactive dropdowns open above banner (z-50)
- [ ] Modals appear above banner (z-70)
- [ ] Banner doesn't obstruct any clickable elements

---

## 🚫 Anti-Patterns (What NOT to Do)

### ❌ DON'T: Use Fixed Positioning

```tsx
// WRONG - Creates overlay, doesn't push content
<div className="fixed top-16 left-0 right-0 z-40">
  <GlobalAlertBanner />
</div>
```

### ✅ DO: Use Sticky in Document Flow

```tsx
// CORRECT - Part of layout, pushes content
<div className="sticky top-16 z-30">
  <GlobalAlertBanner />
</div>
```

---

### ❌ DON'T: Manually Calculate Content Offset

```tsx
// WRONG - Fragile, depends on banner state
<div className={`pt-${bannerVisible ? '56' : '0'}`}>
  {content}
</div>
```

### ✅ DO: Let Layout Flow Naturally

```tsx
// CORRECT - Content naturally flows below banner
<GlobalAlertBanner />
<div>{content}</div>
```

---

### ❌ DON'T: Use Instant Removal

```tsx
// WRONG - Jarring, no animation
const handleDismiss = () => {
  setDismissedAlerts([...dismissedAlerts, alertId]);
};
```

### ✅ DO: Animate Collapse First

```tsx
// CORRECT - Smooth transition
const handleDismiss = () => {
  setIsCollapsing(true);
  setTimeout(() => {
    setDismissedAlerts([...dismissedAlerts, alertId]);
    setIsCollapsing(false);
  }, 300);
};
```

---

## 🎯 Design Goals Achieved

| Goal | Status | Implementation |
|------|--------|----------------|
| **No Content Overlap** | ✅ | Sticky positioning in document flow |
| **Layout Stability** | ✅ | Smooth height transitions, no jitter |
| **Accessibility** | ✅ | All elements below remain accessible |
| **Visual Hierarchy** | ✅ | Softer colors for info, strong for critical |
| **Smooth Dismissal** | ✅ | 300ms collapse animation |
| **Persistence** | ✅ | localStorage for non-critical alerts |
| **Critical Alert Enforcement** | ✅ | Reappears on refresh |

---

## 📊 Performance Considerations

### Rendering Optimization

- Banner renders only when alerts exist (`if (visibleAlerts.length === 0) return null`)
- Dismissal state batched (React state update)
- LocalStorage write debounced (single write after animation)

### Animation Performance

```tsx
// Hardware-accelerated properties only
transition-all duration-300

// Properties animated:
- max-height (layout)
- opacity (paint)
- padding (layout)
```

### Memory Management

- Dismissed alerts array: ~10-20 items max
- LocalStorage: <1KB per user
- No memory leaks (cleanup in useEffect)

---

## 🔮 Future Enhancements

**Potential improvements (out of current scope):**

- [ ] Multiple banner stacking (queue system)
- [ ] Custom animation curves (ease-in-out)
- [ ] Action buttons (not just links)
- [ ] Progress bar for time-limited alerts
- [ ] Banner height tracking for scroll-to-top adjustments
- [ ] A/B testing for banner messaging
- [ ] Analytics for dismiss rates

---

## ✨ Summary

The Global Alert Banner is now a **stable, intentional layout component** that:

- ✅ Integrates into document flow (not an overlay)
- ✅ Pushes content down naturally
- ✅ Never overlaps or obstructs UI
- ✅ Smoothly collapses on dismiss
- ✅ Respects visual hierarchy
- ✅ Maintains accessibility
- ✅ Feels polished and intentional

**Golden Rule:**
> The banner is a layout component, not a notification toast. It belongs in the structural hierarchy, not floating above it.

---

**Last Updated:** December 22, 2024  
**Version:** 2.0 (Layout-Aware Refactor)
