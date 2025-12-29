import { useNavigate } from 'react-router-dom';
import { ShieldOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function AccessRestricted() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-8 text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FEF2F2] mb-6">
            <ShieldOff className="w-8 h-8 text-[#D9480F]" />
          </div>

          {/* Message */}
          <h2 className="text-2xl font-semibold text-[#111827] mb-3">
            Access Restricted
          </h2>
          <p className="text-[#6B7280] mb-6">
            You don't have permission to access this page. This area is restricted to{' '}
            {user?.role === 'tenant-user' ? 'SaaS Admin users' : 'Tenant users'}.
          </p>

          {/* Current Context */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm text-[#6B7280] mb-6">
            <span>Your current context:</span>
            <span className="font-medium text-[#111827]">
              {user?.role === 'tenant-user' ? 'Tenant View' : 'SaaS Admin View'}
            </span>
          </div>

          {/* Actions */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 w-full px-6 py-2.5 bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}