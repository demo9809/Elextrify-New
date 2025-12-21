import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Lock,
  Languages, 
  Settings as SettingsIcon, 
  Layers,
  FileText,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

export default function SettingsWorkspace() {
  const navigate = useNavigate();
  
  // TODO: Replace with actual user role from auth context
  const userRole = 'tenant-admin'; // 'user' | 'tenant-admin' | 'host-admin' | 'saas-admin'
  
  // Check if user has permission to access workspace settings
  const canAccessWorkspace = userRole !== 'user';
  
  if (!canAccessWorkspace) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto mt-16">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-amber-900 font-medium mb-2">Access Restricted</h3>
                <p className="text-amber-700">
                  You don't have access to this settings area. Workspace settings are only accessible to administrators.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const workspaceSettings = [
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
      title: 'Workspace Language & Region',
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
      id: 'org-units',
      title: 'Organization Units',
      description: 'Configure business structure, GST compliance, and billing addresses',
      icon: Layers,
      route: '/organization-units',
      available: true,
    },
    {
      id: 'legal',
      title: 'Legal, Billing & Tax Information',
      description: 'Manage workspace legal entity, tax details, and billing configuration',
      icon: FileText,
      route: '/settings/workspace/legal',
      available: false,
      comingSoon: true,
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[#111827] mb-2">Workspace Settings</h1>
        <p className="text-[#6B7280]">
          Settings that affect your entire workspace
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {workspaceSettings.map((setting) => {
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
                  <span className="text-sm font-medium mr-2">Manage</span>
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