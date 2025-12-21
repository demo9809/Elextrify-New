import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Clock, Users, AlertCircle, CheckCircle, Lock, Key, ArrowLeft } from 'lucide-react';
import { MFASettings, UserRole } from '../../types/users';
import { toast } from 'sonner@2.0.3';

export default function SecuritySettings() {
  const navigate = useNavigate();
  const [mfaSettings, setMFASettings] = useState<MFASettings>({
    enabled: true,
    enforceForAllUsers: false,
    enforceForRoles: ['owner', 'admin'],
    sessionTimeout: 480, // 8 hours in minutes
    allowOptional: true,
    gracePeriod: 30, // days
  });

  const [hasChanges, setHasChanges] = useState(false);

  const roles: { value: UserRole; label: string }[] = [
    { value: 'owner', label: 'Owner' },
    { value: 'admin', label: 'Admin' },
    { value: 'manager', label: 'Manager' },
    { value: 'media-operator', label: 'Media Operator' },
    { value: 'viewer', label: 'Viewer' },
  ];

  const handleToggleEnforceAll = () => {
    setMFASettings((prev) => ({
      ...prev,
      enforceForAllUsers: !prev.enforceForAllUsers,
      // If enforcing for all, clear role-specific enforcement
      enforceForRoles: !prev.enforceForAllUsers ? [] : prev.enforceForRoles,
    }));
    setHasChanges(true);
  };

  const handleToggleRoleEnforcement = (role: UserRole) => {
    setMFASettings((prev) => {
      const isEnforced = prev.enforceForRoles.includes(role);
      return {
        ...prev,
        enforceForRoles: isEnforced
          ? prev.enforceForRoles.filter((r) => r !== role)
          : [...prev.enforceForRoles, role],
      };
    });
    setHasChanges(true);
  };

  const handleSessionTimeoutChange = (minutes: number) => {
    setMFASettings((prev) => ({
      ...prev,
      sessionTimeout: minutes,
    }));
    setHasChanges(true);
  };

  const handleGracePeriodChange = (days: number) => {
    setMFASettings((prev) => ({
      ...prev,
      gracePeriod: days,
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Mock save
    toast.success('Security settings saved successfully');
    setHasChanges(false);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all security settings to defaults?')) {
      setMFASettings({
        enabled: true,
        enforceForAllUsers: false,
        enforceForRoles: ['owner', 'admin'],
        sessionTimeout: 480,
        allowOptional: true,
        gracePeriod: 30,
      });
      setHasChanges(false);
      toast.success('Settings reset to defaults');
    }
  };

  const formatSessionTimeout = (minutes: number): string => {
    const hours = minutes / 60;
    if (hours < 1) return `${minutes} minutes`;
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header with Back Button */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/settings/workspace')}
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#111827] mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Workspace Settings</span>
        </button>
        
        <div>
          <h1 className="text-[#111827] mb-2">Security & Authentication</h1>
          <p className="text-[#6B7280]">
            Configure multi-factor authentication policies and session security for your organization
          </p>
        </div>
      </div>

      <div className="max-w-4xl space-y-6">
        {/* MFA Global Policy */}
        <div className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E5E7EB]">
            <h3 className="text-[#111827]">Multi-Factor Authentication Policy</h3>
            <p className="text-[#6B7280]">Control MFA requirements across your organization</p>
          </div>

          <div className="p-6 space-y-6">
            {/* MFA Enabled Toggle */}
            <div className="flex items-start justify-between gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-5 h-5 text-gray-700" />
                  <h4 className="text-gray-900">Enable MFA</h4>
                </div>
                <p className="text-gray-600">
                  Allow users to enable multi-factor authentication for their accounts
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                <input
                  type="checkbox"
                  checked={mfaSettings.enabled}
                  onChange={() => {
                    setMFASettings((prev) => ({ ...prev, enabled: !prev.enabled }));
                    setHasChanges(true);
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#D9480F] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D9480F]"></div>
              </label>
            </div>

            {mfaSettings.enabled && (
              <>
                {/* Enforce for All Users */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="flex items-start justify-between gap-4 p-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Lock className="w-5 h-5 text-gray-700" />
                        <h4 className="text-gray-900">Enforce MFA for All Users</h4>
                      </div>
                      <p className="text-gray-600">
                        Require all users to enable MFA. This overrides role-specific settings.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={mfaSettings.enforceForAllUsers}
                        onChange={handleToggleEnforceAll}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#D9480F] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D9480F]"></div>
                    </label>
                  </div>

                  {mfaSettings.enforceForAllUsers && (
                    <div className="px-4 pb-4">
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <p className="text-yellow-700 text-sm">
                          All users will be required to set up MFA on their next login. Ensure this is communicated to your team.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Enforce for Specific Roles */}
                {!mfaSettings.enforceForAllUsers && (
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-gray-700" />
                        <h4 className="text-gray-900">Enforce MFA for Specific Roles</h4>
                      </div>
                      <p className="text-gray-600 mt-1">
                        Select which roles must have MFA enabled
                      </p>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {roles.map((role) => {
                          const isEnforced = mfaSettings.enforceForRoles.includes(role.value);
                          return (
                            <button
                              key={role.value}
                              onClick={() => handleToggleRoleEnforcement(role.value)}
                              className={`flex items-center gap-3 p-3 border-2 rounded-lg transition-colors ${
                                isEnforced
                                  ? 'border-[#D9480F] bg-orange-50'
                                  : 'border-gray-200 bg-white hover:bg-gray-50'
                              }`}
                            >
                              <div
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                                  isEnforced ? 'border-[#D9480F] bg-[#D9480F]' : 'border-gray-300'
                                }`}
                              >
                                {isEnforced && <CheckCircle className="w-4 h-4 text-white" />}
                              </div>
                              <span className={isEnforced ? 'text-gray-900' : 'text-gray-700'}>
                                {role.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Grace Period */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-4 mb-4">
                    <Clock className="w-5 h-5 text-gray-700 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="text-gray-900 mb-1">MFA Enforcement Grace Period</h4>
                      <p className="text-gray-600 mb-4">
                        Number of days users have to set up MFA before their access is restricted
                      </p>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="0"
                          max="90"
                          step="5"
                          value={mfaSettings.gracePeriod}
                          onChange={(e) => handleGracePeriodChange(parseInt(e.target.value))}
                          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#D9480F]"
                        />
                        <div className="flex items-center gap-2 min-w-[100px]">
                          <input
                            type="number"
                            min="0"
                            max="90"
                            value={mfaSettings.gracePeriod}
                            onChange={(e) => handleGracePeriodChange(parseInt(e.target.value))}
                            className="w-16 px-3 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                          />
                          <span className="text-gray-600">days</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Session Security */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-gray-900">Session Security</h3>
            <p className="text-gray-600">Control session timeout and security policies</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Session Timeout */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-gray-700 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-1">Session Timeout</h4>
                  <p className="text-gray-600 mb-4">
                    Automatically log out users after a period of inactivity
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    {[60, 120, 240, 480].map((minutes) => (
                      <button
                        key={minutes}
                        onClick={() => handleSessionTimeoutChange(minutes)}
                        className={`px-4 py-2 border-2 rounded-lg transition-colors ${
                          mfaSettings.sessionTimeout === minutes
                            ? 'border-[#D9480F] bg-orange-50 text-gray-900'
                            : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {formatSessionTimeout(minutes)}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="15"
                      max="1440"
                      step="15"
                      value={mfaSettings.sessionTimeout}
                      onChange={(e) => handleSessionTimeoutChange(parseInt(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#D9480F]"
                    />
                    <div className="flex items-center gap-2 min-w-[120px]">
                      <input
                        type="number"
                        min="15"
                        max="1440"
                        step="15"
                        value={mfaSettings.sessionTimeout}
                        onChange={(e) => handleSessionTimeoutChange(parseInt(e.target.value))}
                        className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                      />
                      <span className="text-gray-600">min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Banner */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-900 mb-1">Session Security Best Practices</p>
                <p className="text-blue-700">
                  For sensitive roles (Owner, Admin), we recommend enforcing MFA and setting a session timeout of 4 hours or less.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Save Actions */}
        {hasChanges && (
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 -mx-4 sm:-mx-8 flex justify-end gap-3">
            <button
              onClick={handleReset}
              className="px-6 h-11 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Reset to Defaults
            </button>
            <button
              onClick={handleSave}
              className="px-6 h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}