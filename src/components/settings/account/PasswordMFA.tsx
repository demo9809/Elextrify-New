import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, Key, Shield, Smartphone, Save, Copy, Check } from 'lucide-react';

export default function PasswordMFA() {
  const navigate = useNavigate();
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [backupCodesCopied, setBackupCodesCopied] = useState(false);
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert('Password updated successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleEnableMFA = () => {
    setShowQRCode(true);
  };

  const handleCopyBackupCodes = () => {
    const codes = backupCodes.join('\n');
    navigator.clipboard.writeText(codes);
    setBackupCodesCopied(true);
    setTimeout(() => setBackupCodesCopied(false), 2000);
  };

  const backupCodes = [
    'A1B2-C3D4-E5F6',
    'G7H8-I9J0-K1L2',
    'M3N4-O5P6-Q7R8',
    'S9T0-U1V2-W3X4',
    'Y5Z6-A7B8-C9D0',
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
          <h1 className="text-[#111827] mb-2">Password & MFA</h1>
          <p className="text-[#6B7280]">
            Manage your password and multi-factor authentication settings
          </p>
        </div>
      </div>

      <div className="max-w-3xl">
        {/* Change Password Section */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#FEF2F2] flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#D9480F]" />
            </div>
            <div>
              <h2 className="text-[#111827]">Change Password</h2>
              <p className="text-sm text-[#6B7280]">Update your password regularly to keep your account secure</p>
            </div>
          </div>

          <form onSubmit={handlePasswordSubmit}>
            <div className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                    placeholder="Enter current password"
                  />
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                    placeholder="Enter new password"
                  />
                </div>
                <p className="text-xs text-[#6B7280] mt-2">
                  Must be at least 8 characters with uppercase, lowercase, and numbers
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })}
                className="px-4 py-2 text-[#6B7280] hover:text-[#111827] transition-colors"
              >
                Clear
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Update Password</span>
              </button>
            </div>
          </form>
        </div>

        {/* Multi-Factor Authentication Section */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FEF2F2] flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#D9480F]" />
              </div>
              <div>
                <h2 className="text-[#111827]">Multi-Factor Authentication (MFA)</h2>
                <p className="text-sm text-[#6B7280]">Add an extra layer of security to your account</p>
              </div>
            </div>
            
            {/* MFA Toggle */}
            <button
              onClick={() => {
                if (!mfaEnabled) {
                  handleEnableMFA();
                } else {
                  setMfaEnabled(false);
                  setShowQRCode(false);
                }
              }}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                mfaEnabled ? 'bg-[#16A34A]' : 'bg-[#E5E7EB]'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  mfaEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {showQRCode && !mfaEnabled && (
            <div className="border-t border-[#E5E7EB] pt-6 mt-6">
              <div className="max-w-md">
                <h3 className="text-[#111827] mb-3">Scan QR Code</h3>
                <p className="text-sm text-[#6B7280] mb-4">
                  Use an authenticator app like Google Authenticator or Authy to scan this QR code
                </p>

                {/* QR Code Placeholder */}
                <div className="w-48 h-48 bg-[#F9FAFB] border-2 border-dashed border-[#E5E7EB] rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <Smartphone className="w-12 h-12 text-[#9CA3AF] mx-auto mb-2" />
                    <p className="text-xs text-[#6B7280]">QR Code</p>
                  </div>
                </div>

                {/* Manual Entry Key */}
                <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4 mb-4">
                  <p className="text-xs text-[#6B7280] mb-1">Can't scan? Enter this key manually:</p>
                  <code className="text-sm text-[#111827] font-mono">JBSW Y3DP EBKG K43U MV3X IZ3F</code>
                </div>

                {/* Backup Codes */}
                <div className="bg-[#FFF7ED] border border-[#FED7AA] rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-2 mb-3">
                    <Key className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-[#92400E] mb-1">Backup Recovery Codes</h4>
                      <p className="text-xs text-[#92400E]">Save these codes in a safe place. Each can be used once if you lose access to your device.</p>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-[#FED7AA] rounded-lg p-3 mb-3">
                    <div className="font-mono text-xs text-[#111827] space-y-1">
                      {backupCodes.map((code, index) => (
                        <div key={index}>{code}</div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleCopyBackupCodes}
                    className="flex items-center gap-2 w-full px-4 py-2 bg-white border border-[#F59E0B] text-[#F59E0B] rounded-lg hover:bg-[#FFFBEB] transition-colors text-sm font-medium"
                  >
                    {backupCodesCopied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Backup Codes</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Verify Button */}
                <button
                  onClick={() => {
                    setMfaEnabled(true);
                    setShowQRCode(false);
                    alert('MFA enabled successfully!');
                  }}
                  className="w-full px-6 py-2.5 bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] transition-colors font-medium"
                >
                  Verify and Enable MFA
                </button>
              </div>
            </div>
          )}

          {mfaEnabled && (
            <div className="border-t border-[#E5E7EB] pt-6 mt-6">
              <div className="flex items-center gap-3 p-4 bg-[#F0FDF4] border border-[#86EFAC] rounded-lg">
                <Check className="w-5 h-5 text-[#16A34A]" />
                <div>
                  <p className="text-sm font-medium text-[#15803D]">MFA is enabled</p>
                  <p className="text-xs text-[#16A34A]">Your account has an extra layer of security</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
