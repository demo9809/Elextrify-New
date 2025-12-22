import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Languages, 
  Settings as SettingsIcon, 
  CreditCard, 
  Webhook, 
  Mail,
  ChevronRight,
  Lock
} from 'lucide-react';

export default function SettingsHub() {
  const navigate = useNavigate();

  const settingsSections = [
    {
      id: 'users',
      title: 'Users & Permissions',
      description: 'Manage team members, roles, and access control',
      icon: Shield,
      route: '/users',
      available: true,
    },
    {
      id: 'security',
      title: 'Security & Authentication',
      description: 'Configure MFA policies, session security, and authentication settings',
      icon: Lock,
      route: '/settings/security',
      available: true,
    },
    {
      id: 'language',
      title: 'Language Settings',
      description: 'Configure UI language, region, and date/time formatting',
      icon: Languages,
      route: '/settings/language',
      available: true,
    },
    {
      id: 'general',
      title: 'General Configurations',
      description: 'Platform name, timezone, scheduling defaults, and asset settings',
      icon: SettingsIcon,
      route: '/settings/general',
      available: true,
    },
    {
      id: 'billing',
      title: 'Billing & Subscription',
      description: 'Manage your subscription, payment methods, and invoices',
      icon: CreditCard,
      route: '/billing',
      available: true,
    },
    {
      id: 'integrations',
      title: 'Integrations / Webhooks',
      description: 'Configure third-party integrations and webhook endpoints',
      icon: Webhook,
      route: '/settings/integrations',
      available: false,
      comingSoon: true,
    },
    {
      id: 'email',
      title: 'System Email Infrastructure',
      description: 'Configure email delivery provider and system email settings',
      icon: Mail,
      route: '/settings/email',
      available: true,
      adminOnly: true,
    },
    {
      id: 'api',
      title: 'API & Integrations',
      description: 'Manage API keys and programmatic access to the platform',
      icon: Webhook,
      route: '/settings/api',
      available: true,
      adminOnly: true,
    },
    {
      id: 'notifications',
      title: 'Email / Notification Settings',
      description: 'SMTP configuration, email templates, and notification preferences',
      icon: Mail,
      route: '/settings/notifications',
      available: false,
      comingSoon: true,
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[#111827] mb-2">Settings</h1>
        <p className="text-[#6B7280]">
          Manage your platform configuration, team access, and preferences
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          
          return (
            <button
              key={section.id}
              onClick={() => section.available && navigate(section.route)}
              disabled={!section.available}
              className={`
                relative bg-white border border-[#E5E7EB] rounded-lg p-6 text-left transition-all
                ${section.available 
                  ? 'hover:border-[#D9480F] hover:shadow-md cursor-pointer group' 
                  : 'opacity-60 cursor-not-allowed'
                }
              `}
            >
              {/* Coming Soon Badge */}
              {section.comingSoon && (
                <div className="absolute top-4 right-4">
                  <span className="px-2 py-1 bg-[#F3F4F6] text-[#6B7280] text-xs rounded-md">
                    Coming Soon
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className={`
                w-12 h-12 rounded-lg flex items-center justify-center mb-4
                ${section.available 
                  ? 'bg-[#FEF2F2] text-[#D9480F] group-hover:bg-[#D9480F] group-hover:text-white transition-colors' 
                  : 'bg-[#F9FAFB] text-[#9CA3AF]'
                }
              `}>
                <Icon className="w-6 h-6" />
              </div>

              {/* Content */}
              <div className="mb-4">
                <h3 className="text-[#111827] mb-2 flex items-center gap-2">
                  {section.title}
                  {!section.available && <Lock className="w-4 h-4 text-[#9CA3AF]" />}
                </h3>
                <p className="text-[#6B7280] leading-relaxed">
                  {section.description}
                </p>
              </div>

              {/* Arrow */}
              {section.available && (
                <div className="flex items-center text-[#D9480F] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium mr-2">Configure</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Admin Notice */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-blue-900 font-medium mb-1">Admin Access Required</p>
            <p className="text-blue-700 text-sm">
              These settings are only accessible to users with Admin or Owner roles. 
              Regular users will not see this section in the navigation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}