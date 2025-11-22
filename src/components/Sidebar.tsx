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
  LogOut,
  ChevronDown,
  Monitor,
  DollarSign
} from 'lucide-react';

interface SidebarProps {
  activePage?: string;
  onNavigate?: (pageId: string) => void;
}

export function Sidebar({ activePage = 'campaigns', onNavigate }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, hasDropdown: true, disabled: true },
    { id: 'customers', label: 'Customers', icon: Users, disabled: true },
    { id: 'campaigns', label: 'Campaigns', icon: Target, active: true },
    { id: 'terminals', label: 'Kiosk Management', icon: Monitor },
    { id: 'media', label: 'Media', icon: Film, disabled: true },
    { id: 'playlists', label: 'Playlists', icon: List, disabled: true },
    { id: 'analytics', label: 'Proof-of-Play Analytics', icon: BarChart3, disabled: true },
    { id: 'billing', label: 'Budget & Billing', icon: CreditCard, disabled: true },
    { id: 'reports', label: 'Reports & Insights', icon: FileText, disabled: true },
    { id: 'settings', label: 'Account & Settings', icon: Settings, disabled: true },
  ];

  return (
    <div className="bg-white border-r border-[#E5E7EB] h-screen w-[240px] flex flex-col fixed left-0 top-0 z-30">
      {/* Header */}
      <div className="border-b border-[#E5E7EB] px-6 h-16 flex items-center">
        <div className="flex items-center justify-between w-full">
          <div>
            <h2 className="text-[#111827] font-semibold mb-0.5">CLEXTRIFY</h2>
            <p className="text-xs text-[#6B7280]\">Media Buyer</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Welcome Section */}
        <div className="mb-4 px-3 py-2">
          <p className="text-xs text-[#6B7280]">👋  Welcome</p>
        </div>

        {/* Menu Items */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activePage;
            
            return (
              <button
                key={item.id}
                onClick={() => !item.disabled && onNavigate?.(item.id)}
                disabled={item.disabled}
                className={`
                  w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-left
                  ${item.disabled 
                    ? 'text-[#D1D5DB] cursor-not-allowed opacity-50' 
                    : isActive 
                      ? 'bg-[#FEF2F2] text-[#D9480F] border-l-4 border-[#D9480F] -ml-[4px] pl-[20px]' 
                      : 'text-[#6B7280] hover:bg-[#F9FAFB]'
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${
                  item.disabled 
                    ? 'text-[#D1D5DB]' 
                    : isActive 
                      ? 'text-[#D9480F]' 
                      : 'text-[#6B7280]'
                }`} />
                <span className={`text-sm ${isActive ? 'font-medium' : ''}`}>
                  {item.label}
                </span>
                {item.hasDropdown && (
                  <ChevronDown className={`w-4 h-4 ml-auto ${item.disabled ? 'text-[#D1D5DB]' : 'text-[#6B7280]'}`} />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Section */}
      <div className="border-t border-[#E5E7EB] p-4">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-3 px-2 py-2 rounded-lg">
          <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#007aff] to-[#0051d5] flex items-center justify-center">
            <span className="text-sm font-semibold text-white">RK</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#111827] truncate">Sarah Khan</p>
            <p className="text-xs text-[#6B7280] truncate">Digital Agency Pro</p>
          </div>
        </div>

        {/* Sign Out */}
        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#DC2626] hover:bg-[#FEF2F2] rounded-lg transition-colors">
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}