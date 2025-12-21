import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Lock, 
  Bell, 
  Globe,
  ChevronRight
} from 'lucide-react';

export default function SettingsAccount() {
  const navigate = useNavigate();

  const accountSettings = [
    {
      id: 'profile',
      title: 'Profile Settings',
      description: 'Update your name, email, avatar, and personal information',
      icon: User,
      route: '/settings/account/profile',
      available: true,
    },
    {
      id: 'password',
      title: 'Password & MFA',
      description: 'Change your password and configure multi-factor authentication',
      icon: Lock,
      route: '/settings/account/password-mfa',
      available: true,
    },
    {
      id: 'notifications',
      title: 'Notification Preferences',
      description: 'Control which notifications you receive via email and in-app',
      icon: Bell,
      route: '/settings/account/notifications',
      available: true,
    },
    {
      id: 'timezone',
      title: 'Language & Timezone',
      description: 'Set your personal language preference and timezone',
      icon: Globe,
      route: '/settings/account/language-timezone',
      available: true,
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[#111827] mb-2">Account Settings</h1>
        <p className="text-[#6B7280]">
          Personal preferences and account configuration
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {accountSettings.map((setting) => {
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