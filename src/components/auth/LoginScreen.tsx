import { useState } from 'react';
import { useAuth, UserRole } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router';
import { Shield, Users, ArrowRight } from 'lucide-react';

export function LoginScreen() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = async (role: UserRole) => {
    setIsLoading(true);
    try {
      // Simple prototype login - just set the role
      const mockEmail = role === 'tenant-user' ? 'user@tenant.com' : 'admin@host.com';
      await login(mockEmail, 'password', role);
      
      // Redirect to home after successful login
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF2F2] to-[#FFF7ED] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo & Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#D9480F] mb-6">
            <div className="w-10 h-10 rounded-lg bg-white/20 border-2 border-white"></div>
          </div>
          <h1 className="text-4xl font-semibold text-[#111827] mb-3">DOOH Platform</h1>
          <p className="text-lg text-[#6B7280]">Digital Out-of-Home Management System</p>
          <p className="text-sm text-[#9CA3AF] mt-2">Prototype - Select your role to continue</p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Tenant User Card */}
          <button
            onClick={() => handleRoleSelect('tenant-user')}
            disabled={isLoading}
            className="bg-white rounded-2xl shadow-lg border-2 border-[#E5E7EB] p-8 hover:border-[#D9480F] hover:shadow-xl transition-all text-left group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex flex-col items-center text-center gap-4">
              {/* Icon */}
              <div className="w-16 h-16 rounded-xl bg-[#F9FAFB] flex items-center justify-center group-hover:bg-[#FEF2F2] transition-colors">
                <Users className="w-8 h-8 text-[#D9480F]" />
              </div>

              {/* Title */}
              <div>
                <h3 className="text-xl font-semibold text-[#111827] mb-2">Tenant User</h3>
                <p className="text-sm text-[#6B7280]">Campaign Manager View</p>
              </div>

              {/* Description */}
              <div className="text-sm text-[#6B7280] space-y-1">
                <p>• Manage campaigns & playlists</p>
                <p>• Configure digital kiosks</p>
                <p>• Upload & organize media</p>
                <p>• View billing & usage</p>
              </div>

              {/* CTA */}
              <div className="flex items-center gap-2 text-[#D9480F] font-medium mt-2">
                <span>Continue as Tenant</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </button>

          {/* SaaS Admin Card */}
          <button
            onClick={() => handleRoleSelect('saas-admin')}
            disabled={isLoading}
            className="bg-white rounded-2xl shadow-lg border-2 border-[#E5E7EB] p-8 hover:border-[#D9480F] hover:shadow-xl transition-all text-left group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex flex-col items-center text-center gap-4">
              {/* Icon */}
              <div className="w-16 h-16 rounded-xl bg-[#F9FAFB] flex items-center justify-center group-hover:bg-[#FEF2F2] transition-colors">
                <Shield className="w-8 h-8 text-[#D9480F]" />
              </div>

              {/* Title */}
              <div>
                <h3 className="text-xl font-semibold text-[#111827] mb-2">SaaS Admin</h3>
                <p className="text-sm text-[#6B7280]">Platform Host View</p>
              </div>

              {/* Description */}
              <div className="text-sm text-[#6B7280] space-y-1">
                <p>• Manage all tenants</p>
                <p>• Configure packages & billing</p>
                <p>• Organization unit control</p>
                <p>• System-wide settings</p>
              </div>

              {/* CTA */}
              <div className="flex items-center gap-2 text-[#D9480F] font-medium mt-2">
                <span>Continue as Admin</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </button>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#9CA3AF]">
            This is a prototype demonstration. No authentication required.
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-[#6B7280] mt-8">
          © 2025 DOOH Platform. All rights reserved.
        </p>
      </div>
    </div>
  );
}