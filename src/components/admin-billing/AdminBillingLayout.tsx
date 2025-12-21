import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  AlertCircle,
  TrendingUp,
  Percent,
  Globe,
  Activity,
} from 'lucide-react';

interface AdminBillingLayoutProps {
  children: ReactNode;
}

const billingMenuItems = [
  {
    id: 'overview',
    label: 'Billing Overview',
    icon: LayoutDashboard,
    path: '/admin/billing',
  },
  {
    id: 'subscriptions',
    label: 'Subscriptions',
    icon: Users,
    path: '/admin/billing/subscriptions',
  },
  {
    id: 'invoices',
    label: 'Invoices',
    icon: FileText,
    path: '/admin/billing/invoices',
  },
  {
    id: 'payments',
    label: 'Payments & Failures',
    icon: AlertCircle,
    path: '/admin/billing/payments',
  },
  {
    id: 'revenue',
    label: 'Revenue Analytics',
    icon: TrendingUp,
    path: '/admin/billing/revenue',
  },
  {
    id: 'discounts',
    label: 'Discounts & Credits',
    icon: Percent,
    path: '/admin/billing/discounts',
  },
  {
    id: 'tax',
    label: 'Tax & Compliance',
    icon: Globe,
    path: '/admin/billing/tax',
  },
  {
    id: 'audit',
    label: 'Audit Log',
    icon: Activity,
    path: '/admin/billing/audit',
  },
];

export default function AdminBillingLayout({ children }: AdminBillingLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/admin/billing') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Submenu Navigation */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto">
            {billingMenuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors whitespace-nowrap ${
                    active
                      ? 'border-[#D9480F] text-[#D9480F]'
                      : 'border-transparent text-[#6B7280] hover:text-[#111827] hover:border-[#E5E7EB]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      {children}
    </div>
  );
}
