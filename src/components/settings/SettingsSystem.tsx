import { useNavigate } from 'react-router';
import { 
  Lock, 
  Mail, 
  Code,
  Webhook,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';

export default function SettingsSystem() {
  const navigate = useNavigate();
  
  // TODO: Replace with actual user role from auth context
  const userRole = 'saas-admin'; // 'user' | 'tenant-admin' | 'host-admin' | 'saas-admin'
  
  // Check if user has permission to access system settings
  const canAccessSystem = userRole === 'saas-admin' || userRole === 'host-admin';
  
  if (!canAccessSystem) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto mt-16">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <Lock className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-red-900 font-medium mb-2">Access Denied</h3>
                <p className="text-red-700">
                  You don't have access to this settings area. System settings are only accessible to platform administrators.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const systemSettings = [
    {
      id: 'security',
      title: 'Security & Authentication',
      description: 'Configure MFA policies, session security, and global authentication settings',
      icon: Lock,
      route: '/settings/security',
      available: true,
    },
    {
      id: 'email',
      title: 'System Email Infrastructure',
      description: 'Configure email delivery provider and system email settings',
      icon: Mail,
      route: '/settings/email',
      available: true,
    },
    {
      id: 'api',
      title: 'API & Integrations',
      description: 'Manage API keys and programmatic access to the platform',
      icon: Code,
      route: '/settings/api',
      available: true,
    },
    {
      id: 'third-party',
      title: 'Third-Party Integrations',
      description: 'Connect payment gateways, accounting systems, and automation tools',
      icon: Webhook,
      route: '/settings/system/integrations',
      available: true,
    },
    {
      id: 'webhooks',
      title: 'Webhooks',
      description: 'Configure webhook endpoints for real-time event notifications',
      icon: Webhook,
      route: '/settings/system/webhooks',
      available: true,
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[#111827] mb-2">System Settings</h1>
        <p className="text-[#6B7280]">
          Advanced platform configuration
        </p>
      </div>

      {/* Warning Notice */}
      <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-900 font-medium mb-1">Caution: System-Level Settings</p>
            <p className="text-amber-700 text-sm">
              These settings affect the entire platform infrastructure. Changes here may impact all tenants and users.
              Only platform administrators should modify these configurations.
            </p>
          </div>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {systemSettings.map((setting) => {
          const Icon = setting.icon;
          
          return (
            <button
              key={setting.id}
              onClick={() => setting.available && navigate(setting.route)}
              disabled={!setting.available}
              className={`
                relative bg-white border border-[#E5E7EB] rounded-lg p-6 text-left transition-all
                ${setting.available 
                  ? 'hover:border-[#D9480F] hover:shadow-md cursor-pointer group' 
                  : 'opacity-60 cursor-not-allowed'
                }
              `}
            >
              {/* Coming Soon Badge */}
              {setting.comingSoon && (
                <div className="absolute top-4 right-4">
                  <span className="px-2 py-1 bg-[#F3F4F6] text-[#6B7280] text-xs rounded-md">
                    Coming Soon
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className={`
                w-12 h-12 rounded-lg flex items-center justify-center mb-4
                ${setting.available 
                  ? 'bg-[#FEF2F2] text-[#D9480F] group-hover:bg-[#D9480F] group-hover:text-white transition-colors' 
                  : 'bg-[#F9FAFB] text-[#9CA3AF]'
                }
              `}>
                <Icon className="w-6 h-6" />
              </div>

              {/* Content */}
              <div className="mb-4">
                <h3 className="text-[#111827] mb-2">
                  {setting.title}
                </h3>
                <p className="text-[#6B7280] leading-relaxed text-sm">
                  {setting.description}
                </p>
              </div>

              {/* Arrow */}
              {setting.available && (
                <div className="flex items-center text-[#D9480F] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium mr-2">Configure</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}