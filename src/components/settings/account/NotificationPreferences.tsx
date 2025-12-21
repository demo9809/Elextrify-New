import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Mail, Smartphone, Save } from 'lucide-react';

export default function NotificationPreferences() {
  const navigate = useNavigate();
  
  const [emailNotifications, setEmailNotifications] = useState({
    campaignUpdates: true,
    systemAlerts: true,
    billingNotices: true,
    performanceReports: false,
    productUpdates: true,
    securityAlerts: true,
  });

  const [inAppNotifications, setInAppNotifications] = useState({
    campaignUpdates: true,
    systemAlerts: true,
    billingNotices: true,
    performanceReports: true,
    productUpdates: false,
    securityAlerts: true,
  });

  const [pushNotifications, setPushNotifications] = useState({
    campaignUpdates: false,
    systemAlerts: true,
    billingNotices: false,
    performanceReports: false,
    productUpdates: false,
    securityAlerts: true,
  });

  const handleSave = () => {
    alert('Notification preferences saved successfully!');
  };

  const notificationTypes = [
    {
      id: 'campaignUpdates',
      title: 'Campaign Updates',
      description: 'Notifications about campaign status changes and performance',
    },
    {
      id: 'systemAlerts',
      title: 'System Alerts',
      description: 'Important alerts about system maintenance and issues',
    },
    {
      id: 'billingNotices',
      title: 'Billing Notices',
      description: 'Invoices, payment confirmations, and subscription changes',
    },
    {
      id: 'performanceReports',
      title: 'Performance Reports',
      description: 'Weekly and monthly performance summaries',
    },
    {
      id: 'productUpdates',
      title: 'Product Updates',
      description: 'New features, improvements, and platform updates',
    },
    {
      id: 'securityAlerts',
      title: 'Security Alerts',
      description: 'Login attempts, password changes, and security events',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header with Back Button */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/settings/account')}
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#111827] mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Account Settings</span>
        </button>
        
        <div>
          <h1 className="text-[#111827] mb-2">Notification Preferences</h1>
          <p className="text-[#6B7280]">
            Choose how you want to receive notifications
          </p>
        </div>
      </div>

      <div className="max-w-5xl">
        {/* Notification Preferences Table */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-6 bg-[#F9FAFB] border-b border-[#E5E7EB]">
            <div className="col-span-6">
              <h3 className="text-sm font-medium text-[#111827]">Notification Type</h3>
            </div>
            <div className="col-span-2 text-center">
              <div className="flex flex-col items-center gap-1">
                <Mail className="w-5 h-5 text-[#6B7280]" />
                <span className="text-sm font-medium text-[#111827]">Email</span>
              </div>
            </div>
            <div className="col-span-2 text-center">
              <div className="flex flex-col items-center gap-1">
                <Bell className="w-5 h-5 text-[#6B7280]" />
                <span className="text-sm font-medium text-[#111827]">In-App</span>
              </div>
            </div>
            <div className="col-span-2 text-center">
              <div className="flex flex-col items-center gap-1">
                <Smartphone className="w-5 h-5 text-[#6B7280]" />
                <span className="text-sm font-medium text-[#111827]">Push</span>
              </div>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-[#E5E7EB]">
            {notificationTypes.map((type) => (
              <div key={type.id} className="grid grid-cols-12 gap-4 p-6 hover:bg-[#F9FAFB] transition-colors">
                <div className="col-span-6">
                  <h4 className="text-sm font-medium text-[#111827] mb-1">{type.title}</h4>
                  <p className="text-xs text-[#6B7280]">{type.description}</p>
                </div>
                
                {/* Email Toggle */}
                <div className="col-span-2 flex items-center justify-center">
                  <button
                    onClick={() =>
                      setEmailNotifications({
                        ...emailNotifications,
                        [type.id]: !emailNotifications[type.id as keyof typeof emailNotifications],
                      })
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      emailNotifications[type.id as keyof typeof emailNotifications]
                        ? 'bg-[#D9480F]'
                        : 'bg-[#E5E7EB]'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        emailNotifications[type.id as keyof typeof emailNotifications]
                          ? 'translate-x-6'
                          : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* In-App Toggle */}
                <div className="col-span-2 flex items-center justify-center">
                  <button
                    onClick={() =>
                      setInAppNotifications({
                        ...inAppNotifications,
                        [type.id]: !inAppNotifications[type.id as keyof typeof inAppNotifications],
                      })
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      inAppNotifications[type.id as keyof typeof inAppNotifications]
                        ? 'bg-[#D9480F]'
                        : 'bg-[#E5E7EB]'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        inAppNotifications[type.id as keyof typeof inAppNotifications]
                          ? 'translate-x-6'
                          : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Push Toggle */}
                <div className="col-span-2 flex items-center justify-center">
                  <button
                    onClick={() =>
                      setPushNotifications({
                        ...pushNotifications,
                        [type.id]: !pushNotifications[type.id as keyof typeof pushNotifications],
                      })
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      pushNotifications[type.id as keyof typeof pushNotifications]
                        ? 'bg-[#D9480F]'
                        : 'bg-[#E5E7EB]'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        pushNotifications[type.id as keyof typeof pushNotifications]
                          ? 'translate-x-6'
                          : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 bg-white border border-[#E5E7EB] rounded-lg p-6">
          <h3 className="text-[#111827] mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                setEmailNotifications({
                  campaignUpdates: true,
                  systemAlerts: true,
                  billingNotices: true,
                  performanceReports: true,
                  productUpdates: true,
                  securityAlerts: true,
                });
              }}
              className="px-4 py-2 border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-[#F9FAFB] transition-colors text-sm"
            >
              Enable All Email
            </button>
            <button
              onClick={() => {
                setEmailNotifications({
                  campaignUpdates: false,
                  systemAlerts: false,
                  billingNotices: false,
                  performanceReports: false,
                  productUpdates: false,
                  securityAlerts: true,
                });
              }}
              className="px-4 py-2 border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-[#F9FAFB] transition-colors text-sm"
            >
              Disable All Email (except Security)
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={() => navigate('/settings/account')}
            className="px-6 py-2.5 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </div>
    </div>
  );
}
