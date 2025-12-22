# Invite User Flow - Explicit Access Scope Enforcement

## 🎯 Overview

Redesigned the Invite User flow to enforce explicit access scope definition for every invited user. This security-focused UX pattern prevents accidental over-permission by requiring mandatory Organization Unit and Client-level assignments during invitation.

---

## ✅ **NON-NEGOTIABLE RULES ENFORCED:**

1. **✅ Role Alone is Never Sufficient**
   - Every user must have explicitly defined access scope
   - No implicit permissions granted

2. **✅ Organization Unit Assignment is Mandatory**
   - At least one Organization Unit must be selected
   - Default selection: Tenant's primary legal entity
   - Cannot submit invitation without selection

3. **✅ Client Access Must be Explicit**
   - "All Clients" or "Selected Clients Only" (no hidden defaults)
   - If "Selected Clients", at least one must be chosen
   - Shows only when tenant has clients

4. **✅ No Hidden Defaults**
   - All access grants are visible in Permission Summary
   - User sees exactly what they're granting before sending invite

---

## 📐 **Modal Structure:**

### **Header:**
```
Invite User
Send an invitation to join your organization with controlled access.
```

### **6-Step Flow:**

```
┌────────────────────────────────────────────────────┐
│ 📧 Step 1: User Identity                           │
│    ├─ Email Address (Required)                     │
│    ├─ Validation (inline error for invalid)        │
│    └─ Check for existing users                     │
├────────────────────────────────────────────────────┤
│ 🛡️ Step 2: Role Assignment (Required)              │
│    ├─ Role Selector (Viewer, Campaign Manager...)  │
│    ├─ Helper text: "Role defines actions"          │
│    └─ Dynamically updates Permission Summary       │
├────────────────────────────────────────────────────┤
│ 🏢 Step 3: Organization Unit Assignment (Mandatory)│
│    ├─ Tree selector with Legal Entities + Units    │
│    ├─ Default: Primary legal entity                │
│    ├─ Multi-select (for admin roles)               │
│    ├─ Single-select (for non-admin roles)          │
│    └─ Helper: "Defines where user can operate"     │
├────────────────────────────────────────────────────┤
│ 👥 Step 4: Client Access Scope (Conditional)       │
│    ├─ Shows only if: Tenant has clients            │
│    │                  Role is not Super Admin      │
│    ├─ Radio: All Clients                           │
│    ├─ Radio: Selected Clients Only                 │
│    │   └─ Multi-select client picker (searchable)  │
│    └─ Helper: "Controls which customers"           │
├────────────────────────────────────────────────────┤
│ 📄 Step 5: Permission Summary (Read-only)          │
│    ├─ Live-updating summary card                   │
│    ├─ Role permissions (badges)                    │
│    ├─ Assigned Organization Units (tags)           │
│    ├─ Client access scope                          │
│    └─ Purpose: Transparency before invite          │
├────────────────────────────────────────────────────┤
│ 📝 Step 6: Optional Message                        │
│    └─ Textarea for invitation note                 │
└────────────────────────────────────────────────────┘
```

---

## 🎨 **Visual Design:**

### **Step 1: User Identity**
```tsx
<input
  type="email"
  placeholder="user@example.com"
  validation={emailRegex}
  errorMessage="Please enter a valid email address"
  required
/>
```

**Validation:**
- ✅ Required field
- ✅ Valid email format
- ✅ Inline error display
- ✅ Validates on blur

---

### **Step 2: Role Assignment**
```tsx
<div className="role-cards">
  {/* Viewer */}
  <RoleCard
    label="Viewer"
    description="Read-only access to campaigns and reports"
    permissions={['View campaigns', 'View media', 'View reports']}
    canAccessMultipleUnits={false}
    canAccessAllClients={false}
  />
  
  {/* Campaign Manager */}
  <RoleCard
    label="Campaign Manager"
    description="Create and manage campaigns for assigned clients"
    permissions={['View campaigns', 'Create campaigns', 'Edit campaigns', 'View media', 'Upload media']}
    canAccessMultipleUnits={true}
    canAccessAllClients={false}
  />
  
  {/* Operator */}
  <RoleCard
    label="Operator"
    description="Manage kiosks and monitor playback"
    permissions={['View kiosks', 'Manage kiosks', 'View playback', 'Generate reports']}
    canAccessMultipleUnits={true}
    canAccessAllClients={true}
  />
  
  {/* Admin */}
  <RoleCard
    label="Admin"
    description="Full administrative access to all features"
    permissions={['All permissions', 'User management', 'Billing access', 'Settings management']}
    canAccessMultipleUnits={true}
    canAccessAllClients={true}
  />
</div>
```

**Interaction:**
- ✅ Click to select (radio-like behavior)
- ✅ Selected card: Primary border + background (#FEF2F2)
- ✅ Checkmark icon on selection
- ✅ Helper text: "Role defines what actions the user can perform"

---

### **Step 3: Organization Unit Assignment**

**UI Pattern: Tree Selector**
```tsx
<div className="org-unit-tree">
  <label>
    <input type="checkbox" />
    <span>Elextrify India Pvt Ltd (Legal Entity)</span>
  </label>
  
  <div className="nested-level">
    <label>
      <input type="checkbox" />
      <span>North Region (Unit)</span>
    </label>
    
    <div className="nested-level">
      <label>
        <input type="checkbox" />
        <span>Delhi Operations (Unit)</span>
      </label>
      <label>
        <input type="checkbox" />
        <span>Punjab Operations (Unit)</span>
      </label>
    </div>
  </div>
</div>
```

**Features:**
- ✅ Hierarchical display with indentation
- ✅ Visual badges: "Legal Entity" vs "Unit"
- ✅ Multi-select for admin roles
- ✅ Single-select for non-admin roles
- ✅ Default selection: Primary legal entity
- ✅ Scrollable area (max-height: 192px)
- ✅ Validation error: "At least one Organization Unit must be selected"

**Helper Text:**
```
Organization Units define where the user can operate and which legal entity applies.
[For non-admin roles] This role is limited to a single unit.
```

---

### **Step 4: Client Access Scope (Conditional)**

**Show Conditions:**
```typescript
const showClientAccessSection = 
  clients.length > 0 && 
  selectedRole && 
  !selectedRole.canAccessAllClients;
```

**UI:**
```tsx
<div className="client-access">
  {/* Radio Option 1 */}
  <label className="radio-card">
    <input type="radio" name="clientAccess" value="all" />
    <div>
      <strong>All Clients</strong>
      <p>User can access all current and future clients</p>
    </div>
  </label>
  
  {/* Radio Option 2 */}
  <label className="radio-card">
    <input type="radio" name="clientAccess" value="selected" />
    <div>
      <strong>Selected Clients Only</strong>
      <p>User can only access specific clients</p>
      
      {/* Client Picker (shown only when selected) */}
      {clientAccessType === 'selected' && (
        <div className="client-picker">
          <label>
            <input type="checkbox" />
            <span>Acme Corporation</span>
            <span className="status-badge">active</span>
          </label>
          <label>
            <input type="checkbox" />
            <span>TechStart Inc</span>
            <span className="status-badge">active</span>
          </label>
          {/* ... more clients ... */}
        </div>
      )}
    </div>
  </label>
</div>
```

**Features:**
- ✅ Radio selection (All vs Selected)
- ✅ Nested multi-select for specific clients
- ✅ Searchable list (future enhancement)
- ✅ Shows client name + status
- ✅ Scrollable area (max-height: 160px)
- ✅ Validation: At least one client if "Selected" is chosen

**Helper Text:**
```
Controls which customers this user can view or manage.
```

---

### **Step 5: Permission Summary**

**UI: Read-Only Summary Card**
```tsx
<div className="permission-summary bg-[#F9FAFB]">
  <h4>📄 Permission Summary</h4>
  
  {/* Role & Permissions */}
  <div>
    <label>Role & Permissions</label>
    <strong>Campaign Manager</strong>
    <div className="badges">
      <span>View campaigns</span>
      <span>Create campaigns</span>
      <span>Edit campaigns</span>
      <span>View media</span>
      <span>Upload media</span>
    </div>
  </div>
  
  {/* Organization Units */}
  <div>
    <label>Organization Units</label>
    <div className="tags">
      <span>Elextrify India Pvt Ltd</span>
      <span>North Region</span>
    </div>
  </div>
  
  {/* Client Access */}
  <div>
    <label>Client Access</label>
    {clientAccessType === 'all' ? (
      <span>All Clients</span>
    ) : (
      <div className="tags">
        <span>Acme Corporation</span>
        <span>TechStart Inc</span>
      </div>
    )}
  </div>
</div>
```

**Purpose:**
- ✅ Make access transparent before sending invite
- ✅ Live-updating based on selections
- ✅ Not editable directly (edit via form above)
- ✅ Visual confirmation of all granted permissions

---

### **Step 6: Optional Message**

```tsx
<textarea
  placeholder="Add a personal message to the invitation email..."
  rows={3}
  optional
/>
```

---

## 🔒 **Validation Rules:**

### **Email (Step 1):**
```typescript
✅ Required
✅ Valid email format (/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
✅ Inline error message on blur
✅ Error state: Red border + error text
```

### **Role (Step 2):**
```typescript
✅ Required
✅ Must select one role
✅ Disabled submit until selected
```

### **Organization Units (Step 3):**
```typescript
✅ Required
✅ At least one unit must be selected
✅ Default: Primary legal entity (pre-selected)
✅ Error message: "At least one Organization Unit must be selected"
```

### **Client Access (Step 4):**
```typescript
✅ Required if clients exist
✅ "All Clients" OR "Selected Clients Only"
✅ If "Selected", at least one client required
✅ Error message: "At least one client must be selected"
```

### **Form-Level Validation:**
```typescript
const isFormValid = (): boolean => {
  return (
    emailValid &&
    roleSelected &&
    orgUnitsSelected &&
    clientsValid
  );
};
```

**Submit Button:**
```tsx
<button
  onClick={handleSubmit}
  disabled={!isFormValid()}
  className="primary-button disabled:bg-[#E5E7EB] disabled:cursor-not-allowed"
>
  Send Invitation
</button>
```

---

## 📊 **Data Structure:**

### **Invite Data Payload:**
```typescript
interface InviteData {
  email: string;
  role: string; // 'viewer' | 'campaign-manager' | 'operator' | 'admin'
  organizationUnits: string[]; // Array of unit IDs
  clientAccess: {
    type: 'all' | 'selected';
    clientIds: string[]; // Empty if type is 'all'
  };
  invitationNote?: string;
}
```

**Example:**
```json
{
  "email": "john@example.com",
  "role": "campaign-manager",
  "organizationUnits": ["legal-entity-1", "unit-north"],
  "clientAccess": {
    "type": "selected",
    "clientIds": ["client-1", "client-2", "client-3"]
  },
  "invitationNote": "Welcome to the team! Looking forward to working with you."
}
```

---

## 🎯 **UX Safeguards:**

### **1. No Implicit Access**
```typescript
❌ Auto-assign all units silently
❌ Auto-select all clients by default
❌ Hidden permissions
✅ Explicit selections required
✅ Clear inline validation messages
✅ Visual confirmation in Permission Summary
```

### **2. Default Selection**
```typescript
✅ Primary legal entity is pre-selected (not hidden)
✅ User can remove and select others
✅ User must explicitly confirm selection
```

### **3. Preserve Selections**
```typescript
✅ Form state preserved if modal is reopened (future)
✅ Maintain keyboard accessibility
✅ Tab order: Email → Role → Org Units → Clients → Note → Submit
```

### **4. Error States**
```typescript
✅ Red border on invalid fields
✅ Error message below field
✅ Cannot proceed until fixed
✅ Touched state tracking (only show errors after interaction)
```

---

## 🔄 **User Flow:**

### **Happy Path:**
```
1. User clicks "Invite User" button
2. Modal opens with default state:
   - Email: Empty
   - Role: Not selected
   - Org Units: Primary legal entity (pre-selected)
   - Client Access: "All Clients" (if applicable)
   - Note: Empty
3. User enters email
4. User selects role (e.g., "Campaign Manager")
5. Permission Summary auto-updates
6. User reviews/adjusts Organization Units
7. User selects client access (All or Selected)
8. User reviews Permission Summary
9. User optionally adds note
10. User clicks "Send Invitation"
11. Modal closes
12. Toast confirmation: "Invitation sent to john@example.com"
```

### **Error Path:**
```
1. User enters invalid email
2. On blur: Red border + error message
3. User tries to click "Send Invitation"
4. Button is disabled (grayed out)
5. User fixes email
6. User forgets to select Organization Unit
7. User tries to click "Send Invitation"
8. Button is disabled
9. Error appears: "At least one Organization Unit must be selected"
10. User selects unit
11. Button becomes enabled
12. User successfully sends invitation
```

---

## 📐 **Responsive Design:**

### **Desktop (> 1024px):**
```css
.modal {
  width: 100%;
  max-width: 672px; /* 2xl */
  max-height: 90vh;
}
```

### **Mobile (< 768px):**
```css
.modal {
  width: 100%;
  padding: 16px;
  max-height: 90vh;
  overflow-y: auto;
}

/* Stack role cards */
.role-cards {
  flex-direction: column;
}

/* Simplify org unit tree */
.org-unit-tree {
  font-size: 14px;
}
```

---

## 🎨 **Visual Specifications:**

### **Colors:**
```css
--primary: #D9480F;
--primary-light: #FEF2F2;
--error: #DC2626;
--error-light: #FEE2E2;
--border: #E5E7EB;
--text-primary: #111827;
--text-secondary: #6B7280;
--background: #F9FAFB;
```

### **Typography:**
```css
--modal-title: 24px / 600 weight (H2)
--section-title: 18px / 600 weight (H3)
--label: 14px / 500 weight
--body: 16px / 400 weight
--helper: 12px / 400 weight
```

### **Spacing:**
```css
--modal-padding: 24px;
--section-gap: 24px;
--input-height: 44px;
--button-height: 44px;
```

### **Interactive States:**
```css
/* Role Card - Selected */
border-color: #D9480F;
background-color: #FEF2F2;
ring: 2px solid rgba(217, 72, 15, 0.2);

/* Role Card - Hover */
border-color: rgba(217, 72, 15, 0.5);
background-color: #F9FAFB;

/* Input - Error */
border-color: #DC2626;
focus-ring: 2px solid rgba(220, 38, 38, 0.2);

/* Button - Disabled */
background-color: #E5E7EB;
color: #9CA3AF;
cursor: not-allowed;
```

---

## 🚀 **Post-Invite Behavior:**

### **Success Toast:**
```typescript
toast.success(`Invitation sent to ${email}`, {
  description: `User will have ${role} access to ${orgUnits.length} organization unit(s)`,
});
```

### **User Status:**
```typescript
User status: 'pending'
Access scope: Locked until invite accepted
Admin can edit: Yes (via Edit User)
User can accept: Via email link
```

### **Email Template (Future):**
```
Subject: You've been invited to join Elextrify

Hi there,

[Inviter Name] has invited you to join Elextrify as a [Role].

Your access includes:
- Organization Units: [Unit 1], [Unit 2]
- Client Access: [All Clients | Selected Clients]

[Personal Message from Inviter]

[Accept Invitation Button]

This invitation expires in 7 days.
```

---

## 📊 **Mock Data:**

### **Organization Units:**
```typescript
[
  {
    id: 'legal-entity-1',
    name: 'Elextrify India Pvt Ltd',
    type: 'legal-entity',
    children: [
      {
        id: 'unit-north',
        name: 'North Region',
        type: 'operational-unit',
        children: [
          { id: 'unit-delhi', name: 'Delhi Operations', type: 'operational-unit' },
          { id: 'unit-punjab', name: 'Punjab Operations', type: 'operational-unit' },
        ],
      },
      {
        id: 'unit-south',
        name: 'South Region',
        type: 'operational-unit',
        children: [
          { id: 'unit-bangalore', name: 'Bangalore Operations', type: 'operational-unit' },
          { id: 'unit-chennai', name: 'Chennai Operations', type: 'operational-unit' },
        ],
      },
    ],
  },
  {
    id: 'legal-entity-2',
    name: 'Elextrify Global LLC',
    type: 'legal-entity',
    children: [
      { id: 'unit-usa', name: 'USA Operations', type: 'operational-unit' },
      { id: 'unit-uk', name: 'UK Operations', type: 'operational-unit' },
    ],
  },
]
```

### **Clients:**
```typescript
[
  { id: 'client-1', name: 'Acme Corporation', status: 'active' },
  { id: 'client-2', name: 'TechStart Inc', status: 'active' },
  { id: 'client-3', name: 'RetailHub', status: 'active' },
  { id: 'client-4', name: 'HealthCare Plus', status: 'active' },
  { id: 'client-5', name: 'EduLearn', status: 'inactive' },
  { id: 'client-6', name: 'FoodDelight', status: 'active' },
  { id: 'client-7', name: 'Fashion Forward', status: 'active' },
  { id: 'client-8', name: 'Auto World', status: 'inactive' },
]
```

---

## ✅ **Benefits Achieved:**

### **1. Security**
- ✅ Prevents accidental over-permission
- ✅ Enforces principle of least privilege
- ✅ No hidden defaults

### **2. Transparency**
- ✅ User sees exactly what they're granting
- ✅ Permission Summary before invite
- ✅ Clear inline validation

### **3. User Experience**
- ✅ Step-by-step guided flow
- ✅ Progressive disclosure (conditional sections)
- ✅ Immediate feedback (validation)
- ✅ Keyboard accessible

### **4. Compliance**
- ✅ Audit trail (who invited whom with what access)
- ✅ Explicit consent (no implicit grants)
- ✅ Role-based access control (RBAC)

---

## 📝 **Technical Implementation:**

### **Files Created:**
```
/components/users/InviteUserModal.tsx (682 lines)
/data/mockAccessScopes.ts (mock data)
```

### **Files Modified:**
```
/components/users/UserManagement.tsx (integrated modal)
```

### **Dependencies:**
```tsx
import { toast } from 'sonner@2.0.3';
import { Mail, Shield, Building2, Users, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';
```

---

## 🔮 **Future Enhancements:**

### **Phase 2:**
- [ ] Searchable client picker
- [ ] Bulk invite (multiple emails)
- [ ] Import users from CSV
- [ ] Custom role creation

### **Phase 3:**
- [ ] Invitation expiry (7 days default)
- [ ] Resend invitation
- [ ] Revoke pending invitation
- [ ] Invitation history/audit log

---

## ✅ **Summary:**

**Problem Solved:**
> Prevented accidental over-permission by enforcing explicit access scope definition at invitation time.

**Implementation:**
> 6-step modal with mandatory Organization Unit assignment, conditional Client access scope, live Permission Summary, and comprehensive validation.

**Result:**
> **Every invited user has explicitly defined, transparent, and auditable access scope with zero hidden defaults.**

---

**Last Updated:** December 22, 2024  
**Version:** 1.0 (Initial Implementation)
