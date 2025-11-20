# DOOH SaaS Platform – Campaign Editor (v8) with Ad Groups

## Project Overview
A robust, scalable "Campaign Editor" that allows users to manage a single campaign containing multiple, distinct "Ad Groups". This design replaces the simple wizard model and correctly handles the real-world scenario of running different content (Playlists) on different schedules within one campaign.

---

## The New Core Logic: Campaign > Ad Groups

### Campaign
The top-level container that defines:
- **Client**: Who the campaign is for (e.g., "Acme Corporation")
- **Campaign Name**: What the campaign is called (e.g., "Diwali 2025")
- **Objective**: Campaign goal (Brand Awareness, etc.)
- **Tags**: Internal organization labels

### Ad Group
The actual ad unit. A Campaign can have **many Ad Groups**. Each Ad Group has its own:
- **Ad Group Name**: Descriptive name (e.g., "Sunday Schedule")
- **Content**: What plays (Playlist or Direct Media)
- **Targeting**: Where it plays (Kiosks)
- **Schedule**: When it plays (Days, Times, Dates)

**Real-World Example:**
- **Campaign**: "Diwali 2025 Offer" for Client "Retail ABC"
  - **Ad Group 1**: "Sunday Schedule" → Playlist A → All Kiosks → Sundays 9 AM-6 PM
  - **Ad Group 2**: "Weekday Schedule" → Playlist B → All Kiosks → Mon-Fri 9 AM-12 PM

This structure is the **only way** to run different content at different times in one campaign.

---

## The Campaign Editor Shell

### Trigger
User clicks **"New Campaign"** button from Campaign Scheduler page.

### Action
An 80% slide-in panel (the "Campaign Editor") appears. This is a persistent shell for the new draft campaign.

### Shell UI
- **Top Bar**: Campaign title (e.g., "New Campaign"), Save & Close button
- **Navigation**: Horizontal stepper showing progress
  - [Step 1: Campaign Setup] → [Step 2: Ad Groups] → [Step 3: Review & Launch]
- **Content Area**: Current step content
- **Footer**: Back, Next/Save buttons

---

## Container, Sizing, & Visuals

| Property | Value | Notes |
|----------|-------|-------|
| Container Type | Slide-in panel (drawer) | Animates from right side |
| Panel Width | 80% of viewport width | Provides ample space for complex forms |
| Max Width | 1152px | (80% of 1440px) |
| Animation | Slide from right | Smooth entrance/exit |
| Overlay | rgba(0,0,0,0.5) | Dims background |
| Icon Library | Lucide React | Professional line-art icons, no emojis |

---

## The 3-Step Campaign Editor Flow

### Step 1: Campaign Setup
**Purpose:** Define the overall campaign container.

**UI:** A simple vertical form.

**Fields:**
1. **Select a Client/Customer** (CRITICAL FIRST STEP)
   - Searchable dropdown of all existing Clients
   - **Required** - Locks the Client for the whole campaign
   - Shortcut: **"Create New Client"** button
     - Opens nested 480px slide-in panel for client creation
     - On save: Client is auto-selected, panel closes

2. **Campaign Name**
   - Text input (required)
   - Placeholder: "e.g., Diwali 2025 Offer"
   - Optional: "Auto-generate" button

3. **Campaign Objective**
   - Dropdown (required)
   - Options: "Brand Awareness", "Traffic (Proxied)", "Conversions", "Engagement"

4. **Labels / Tags**
   - Multi-select tag input
   - For internal filtering and organization
   - Optional

**CTA:** **Next: Ad Groups** button (saves and moves to Step 2)

**Validation:**
- Client must be selected
- Campaign name must not be empty
- Campaign objective must be selected

---

### Step 2: Ad Groups (THE SOLUTION)
**Purpose:** Manage the one or more "Ad Groups" inside this campaign.

**UI:** This step is a "Manager View" that shows a list of Ad Group cards.

#### Title Section
- **Heading**: "Ad Groups"
- **Subheading**: "Each Ad Group defines the content, targeting, and schedule for a specific ad."
- **Primary CTA**: **"+ Add New Ad Group"** button (#D9480F)

#### Initial State (Empty)
When no Ad Groups exist:
- Empty state illustration/icon
- Message: "Your campaign needs at least one Ad Group. An Ad Group defines the content, targeting, and schedule."
- **CTA**: "Add Your First Ad Group" button

#### Filled State (With Ad Groups)
Shows a vertical list of Ad Group cards. Each card displays:

**Ad Group Card UI:**
```
┌─────────────────────────────────────────────────────┐
│ [1] Sunday Schedule               [Edit] [Duplicate] [Delete] │
├─────────────────────────────────────────────────────┤
│ 📹 Content: "Sunday Playlist" (5 items)            │
│ 🎯 Targeting: 15 Kiosks (Malls, Airports)          │
│ 📅 Schedule: Sundays, 9:00 AM - 6:00 PM            │
│              Jan 1, 2025 - Mar 31, 2025            │
└─────────────────────────────────────────────────────┘
```

**Card Components:**
- Number badge (1, 2, 3...)
- Ad Group Name (bold)
- Content summary (icon + playlist/media info)
- Targeting summary (icon + kiosk count + venue types)
- Schedule summary (icon + days, times, dates)
- **Actions**: Edit, Duplicate, Delete buttons

**Footer:**
- **Next: Review & Launch** button (only enabled if at least 1 Ad Group exists)

---

### The "Ad Group Editor" Flow (Nested Panel)

When user clicks **"+ Add New Ad Group"** or **"Edit"** on existing Ad Group:

**Action:** Opens a **nested 80% slide-in panel** (the "Ad Group Editor") over the main Campaign Editor.

**This panel contains the old v7 wizard steps, re-purposed for a single Ad Group:**

#### Ad Group Editor Panel Structure
- **Top Bar**: "New Ad Group" or "Edit: [Ad Group Name]", Close button
- **Horizontal Stepper**: Step A, B, C
- **Content Area**: Current step
- **Footer**: Back, Next/Save buttons

#### Step A: Content
**Purpose:** Select what will be displayed in this Ad Group.

**UI:** Two options (large radio cards):

**Option 1: Use a Playlist**
- Select Playlist dropdown (filtered by Campaign's Client)
- Once selected, show:
  - **"View Items (5)"** link (opens read-only modal)
  - **"Edit Playlist"** button (opens Playlist Builder in nested panel)
- **Shortcut**: "Create New Playlist" button
  - Opens Playlist Builder panel
  - Pre-associates with Campaign's Client

**Option 2: Use Direct Media**
- **"Select Media"** button
- Opens nested Media Selector panel with:
  - Thumbnail grid (filtered by Campaign's Client)
  - Multi-select checkboxes
  - Preview icon on each item
  - **"Upload New Media"** button at top
  - "Done" button to close and return

**Validation:**
- Must select either a playlist OR at least one media item

#### Step B: Targeting
**Purpose:** Select where this Ad Group will play.

**Fields:**
1. **Target Regions** (Optional filters)
   - Country dropdown
   - State dropdown (filtered by country)
   - City dropdown (filtered by state)

2. **Venue Types** (Optional filters)
   - 2-3 column grid of cards
   - Options: Malls, Transit Hubs, Airports, Gyms, Restaurants, Retail Stores
   - Multi-select with visual indication

3. **Select Specific Kiosks** (Required)
   - Searchable list with checkboxes
   - Shows: Kiosk name, ID, online status
   - Dynamically filtered by region and venue selections
   - Must select at least one kiosk

**Validation:**
- At least one kiosk must be selected

#### Step C: Schedule
**Purpose:** Set when this Ad Group will play.

**Fields:**
1. **Ad Group Date Range** (Required)
   - Start Date (date picker)
   - End Date (date picker)
   - Must be in future, end after start

2. **Days of Week** (Required)
   - Quick select buttons: "All Days", "Weekdays (Mon-Fri)", "Weekends"
   - Individual day toggles: Sun, Mon, Tue, Wed, Thu, Fri, Sat
   - Visual indication of selected days
   - Must select at least one day

3. **Time Range** (Required)
   - Start Time (time picker, e.g., "09:00 AM")
   - End Time (time picker, e.g., "06:00 PM")
   - End time must be after start time

4. **Helper Text**
   - "The schedule runs on the screens' local time zone."

**Validation:**
- All fields required
- Valid date/time ranges

#### Final Action
User clicks **"Save Ad Group"** button.

**Result:**
- Ad Group Editor panel closes
- User returns to **Step 2: Ad Groups** in main Campaign Editor
- New/updated Ad Group card appears in the list

---

### Step 3: Review & Launch
**Purpose:** Final summary before launching the campaign.

**UI:** Clean, read-only summary with collapsible sections.

#### Campaign Summary Section
**Card with:**
- Campaign Name
- Client Name
- Objective
- Tags (if any)

#### Ad Groups Summary Section
**Heading:** "Ad Groups (2)"

For each Ad Group, show an expanded card:
```
┌─────────────────────────────────────────────────────┐
│ [1] Sunday Schedule                                  │
├─────────────────────────────────────────────────────┤
│ Content:                                            │
│   Playlist: "Sunday Playlist" (5 items)            │
│                                                     │
│ Targeting:                                          │
│   15 Kiosks in Malls, Airports                     │
│   Regions: New York, Los Angeles                   │
│                                                     │
│ Schedule:                                           │
│   Days: Sundays                                     │
│   Time: 9:00 AM - 6:00 PM                          │
│   Dates: Jan 1, 2025 - Mar 31, 2025               │
└─────────────────────────────────────────────────────┘
```

#### Footer Actions
Fixed footer with:
- **Back** button (secondary) - Returns to Step 2
- **Save as Draft** button (secondary) - Saves without launching
- **Launch Campaign** button (primary, #D9480F) - Makes campaign live

---

## Nested Panels Specification

### Client Creation Panel
- **Width**: 480px
- **Slides in**: Over Campaign Editor (right to left)
- **Fields**: 
  - Client/Customer Name (required)
  - Industry (dropdown)
  - Contact Email
  - Contact Phone
- **Buttons**: Cancel, Save Client
- **On Save**: Client auto-selected in Step 1, panel closes

### Ad Group Editor Panel
- **Width**: 80% of viewport (same as Campaign Editor)
- **Slides in**: Over Campaign Editor
- **Contains**: 3-step wizard (Content, Targeting, Schedule)
- **Z-index**: Higher than Campaign Editor
- **On Save**: Ad Group added/updated, panel closes

### Playlist Builder Panel
- **Width**: 80% of viewport
- **Slides in**: Over Ad Group Editor (triple-nested!)
- **Contains**: Full playlist creation interface
- **On Save**: Playlist auto-selected in Content step, panel closes

### Media Selector Panel
- **Width**: 80% of viewport
- **Slides in**: Over Ad Group Editor
- **Contains**: 
  - Grid of media thumbnails (filtered by Campaign's Client)
  - Upload button at top
  - Multi-select with checkboxes
  - Preview on hover/click
- **On Done**: Selected media returned to Content step, panel closes

---

## Visual Design System

### Colors
- **Primary**: #D9480F (CTAs, active states)
- **Secondary**: #64748B (secondary buttons)
- **Background**: #F9FAFB
- **Surface**: #FFFFFF (cards, panels)
- **Border**: #E5E7EB
- **Text Primary**: #111827
- **Text Secondary**: #6B7280
- **Success**: #16A34A
- **Error**: #DC2626
- **Warning**: #F59E0B
- **Info**: #3B82F6

### Typography
- **Font**: Inter
- **H2**: 32px / 600 weight (Panel titles)
- **H3**: 24px / 600 weight (Section headings)
- **H4**: 18px / 600 weight (Card titles)
- **Body**: 16px / 400 weight
- **Labels**: 14px / 500 weight
- **Small**: 14px / 400 weight
- **Button**: 16px / 600 weight

### Spacing
- **Base Grid**: 8px
- **Section Padding**: 32px
- **Component Gap**: 24px
- **Input Gap**: 16px
- **Card Padding**: 24px

### Components
- **Button Height**: 44px
- **Input Height**: 44px
- **Border Radius**: 8px (buttons, cards), 6px (inputs)
- **Panel Padding**: 32px

---

## Stepper Component Specification

**Location:** Top of wizard panel  
**Layout:** Horizontal, centered  
**Height:** 72px

**Campaign Editor Stepper (3 steps):**
1. Campaign Setup
2. Ad Groups
3. Review & Launch

**Ad Group Editor Stepper (3 steps):**
A. Content
B. Targeting
C. Schedule

**Each Step:**
- Circle indicator: 32px diameter
- Letter/Number inside circle
- Label below circle
- Line connecting to next step

**States:**
- **Completed**: Green circle (#16A34A), white checkmark icon
- **Current**: Primary color circle (#D9480F), white number/letter
- **Upcoming**: Gray circle (#E5E7EB), gray number/letter (#9CA3AF)

---

## Data Models

### Campaign
```typescript
interface Campaign {
  id: string;
  clientId: string;
  clientName: string;
  campaignName: string;
  objective: 'brand-awareness' | 'traffic-proxied' | 'conversions' | 'engagement';
  tags: string[];
  adGroups: AdGroup[];
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed';
  createdAt: string;
  updatedAt: string;
}
```

### AdGroup
```typescript
interface AdGroup {
  id: string;
  name: string;
  
  // Content
  contentType: 'playlist' | 'media';
  playlistId?: string;
  playlistName?: string;
  mediaIds?: string[];
  
  // Targeting
  targetCountry?: string;
  targetState?: string;
  targetCity?: string;
  venueTypes: string[];
  kioskIds: string[];
  
  // Schedule
  startDate: string;
  endDate: string;
  daysOfWeek: number[]; // 0-6 (Sunday-Saturday)
  startTime: string; // "09:00"
  endTime: string; // "18:00"
}
```

---

## Mock Data Requirements

### Sample Clients
- Acme Corporation (Retail)
- Brew Coffee Co. (F&B)
- FitLife Gym (Fitness)
- TechStart Inc. (Technology)

### Sample Playlists (per client)
- "Holiday Campaign 2025" (5 items)
- "Product Launch" (3 items)
- "Brand Awareness Mix" (8 items)

### Sample Media (per client)
- 3-5 images (1920x1080)
- 2-3 videos (MP4, :15-:30 duration)

### Sample Kiosks
- 15-20 kiosks across:
  - Regions: USA (NY, CA, TX), Canada (ON, BC), UK (London)
  - Venue Types: Mall, Airport, Gym, Retail Store, Transit Hub
  - Status: Online (80%), Offline (20%)

### Sample Campaigns with Ad Groups
**Campaign 1**: "Diwali 2025 Offer" (Client: Acme Corporation)
- Ad Group 1: "Sunday Schedule" → Playlist A → 15 Kiosks → Sundays 9-6
- Ad Group 2: "Weekday Schedule" → Playlist B → 15 Kiosks → Mon-Fri 9-12

---

## Navigation Flow

```
Campaign Scheduler Page
  ↓
[New Campaign] clicked
  ↓
Campaign Editor Panel Opens (80%)
  ↓
Step 1: Campaign Setup
  → [Create New Client] → Client Panel (480px)
  ↓
Step 2: Ad Groups
  ↓
  [+ Add New Ad Group] clicked
    ↓
    Ad Group Editor Panel Opens (80%, nested)
      ↓
      Step A: Content
        → [Create Playlist] → Playlist Builder (80%, triple-nested)
        → [Select Media] → Media Selector (80%, triple-nested)
      ↓
      Step B: Targeting
      ↓
      Step C: Schedule
      ↓
      [Save Ad Group]
    ↓
    Back to Step 2: Ad Groups (card appears)
  ↓
  [Edit Ad Group] → Opens Ad Group Editor with existing data
  [Duplicate Ad Group] → Opens Ad Group Editor with copied data
  [Delete Ad Group] → Confirmation dialog
  ↓
Step 3: Review & Launch
  → [Launch Campaign] → Success message, panel closes
  → [Save as Draft] → Draft saved, panel closes
```

---

## Validation Rules

### Step 1: Campaign Setup
- ✓ Client must be selected (required)
- ✓ Campaign name must not be empty (required)
- ✓ Campaign objective must be selected (required)

### Step 2: Ad Groups
- ✓ At least one Ad Group must exist to proceed (required)

### Ad Group - Step A: Content
- ✓ Either playlist OR at least one media item (required)

### Ad Group - Step B: Targeting
- ✓ At least one kiosk must be selected (required)

### Ad Group - Step C: Schedule
- ✓ Start date must be in future (validation)
- ✓ End date must be after start date (validation)
- ✓ At least one day must be selected (required)
- ✓ Start time required (required)
- ✓ End time required and after start time (validation)

---

## Business Rules

### Client-First Workflow
- Campaign must have a Client selected before proceeding
- All media, playlists filtered by Campaign's Client
- Cannot change Client after Ad Groups are created

### Media Upload Rules
- Media must be uploaded against a specific Client
- Direct media upload (without Client) not allowed
- Users must create at least one Client before uploading media

### Ad Group Management
- Minimum 1 Ad Group required to launch campaign
- No maximum limit on Ad Groups
- Ad Groups can be added/edited/deleted until campaign launches
- Duplicate creates exact copy with "(Copy)" appended to name

### Schedule Overlaps
- Ad Groups can have overlapping schedules (handled by platform)
- No validation/warning for overlaps in v8
- Future: Priority/conflict detection

---

## Empty States

### Step 2: No Ad Groups
```
┌─────────────────────────────────────┐
│          [Calendar Icon]             │
│                                     │
│    Your campaign needs at least     │
│         one Ad Group                │
│                                     │
│  An Ad Group defines the content,   │
│  targeting, and schedule.           │
│                                     │
│    [Add Your First Ad Group]        │
└─────────────────────────────────────┘
```

### Ad Group Editor - No Playlist Selected
```
[Film Icon]
No playlist selected
Choose from your existing playlists or create a new one
[Select Playlist ▼]  [Create New Playlist]
```

### Ad Group Editor - No Media Selected
```
[Image Icon]
No media selected
Browse your media library and select files
[Select Media]
```

### Ad Group Editor - No Kiosks Selected
```
[Monitor Icon]
No kiosks selected
Select at least one kiosk to target
(List appears here after filtering)
```

---

## Success States

### Ad Group Saved
- Toast notification: "Ad Group '[Name]' saved successfully"
- Panel closes, returns to Step 2
- New card appears in list

### Campaign Launched
- Toast notification: "Campaign '[Name]' launched successfully!"
- Panel closes
- Campaign appears in Scheduler table with "Active" status

### Draft Saved
- Toast notification: "Campaign saved as draft"
- Panel closes
- Campaign appears in Scheduler table with "Draft" status

---

## Error States

### Validation Errors
- Red border on invalid fields
- Error message below field
- Cannot proceed until fixed

### Network Errors
- Toast notification: "Failed to save. Please try again."
- Data preserved in form
- Retry button available

---

## Keyboard & Accessibility

- **Tab**: Navigate through fields
- **Enter**: Submit forms, proceed to next step
- **Esc**: Close panels/modals
- **Arrow Keys**: Navigate stepper (optional enhancement)

---

## Performance Considerations

- Lazy load media thumbnails in selector
- Paginate kiosk list if > 50 items
- Debounce search inputs (300ms)
- Optimistic UI updates for fast feedback

---

## Future Enhancements (Out of Scope for v8)

- [ ] Bulk Ad Group creation
- [ ] Ad Group templates
- [ ] Schedule conflict detection
- [ ] Priority/weight for overlapping Ad Groups
- [ ] Calendar view for schedule visualization
- [ ] Clone entire campaign
- [ ] Campaign budget tracking
- [ ] Performance analytics per Ad Group

---

**Note:** Some base shadcn/ui components may have default styling (gap, typography). Explicitly set all styling from these guidelines in generated React code to override defaults.
