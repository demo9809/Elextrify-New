import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  ArrowLeft,
  Users,
  Mail,
  Phone,
  Briefcase,
  Shield,
  Calendar,
  Clock,
  MapPin,
  Edit,
  Ban,
  CheckCircle,
  XCircle,
  AlertCircle,
  Monitor,
  FileText,
  Key
} from 'lucide-react';
import { mockUsers, mockActivityLog, getRoleLabel, getStatusLabel, getStatusColor, getRoleColor, mockRoles, PERMISSION_MODULES } from '../../data/mockUsers';
import { User, ActivityLogEntry, PermissionSet } from '../../types/users';
import EffectivePermissionsEditor from './EffectivePermissionsEditor';
import RoleAssignmentTab from './RoleAssignmentTab';
import MFAManagementSection from './MFAManagementSection';

type TabType = 'profile' | 'permissions' | 'effective-permissions' | 'clients' | 'activity';

export default function UserDetails() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [status, setStatus] = useState<string>('active');
  const [currentUser, setCurrentUser] = useState<User | undefined>(
    mockUsers.find(u => u.id === userId)
  );

  const userActivities = mockActivityLog.filter(log => log.userId === userId);
  const userRole = mockRoles.find(r => r.name.toLowerCase().replace(' ', '-') === currentUser?.role);

  const handleUserUpdate = (updates: Partial<User>) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, ...updates });
    }
  };

  const handlePermissionOverrideSave = (permissionOverrides: PermissionSet) => {
    handleUserUpdate({ permissionOverrides });
  };

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-50 p-8">
        <Users className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-gray-900 mb-2">User Not Found</h2>
        <p className="text-gray-600 mb-6">The user you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/users')}
          className="flex items-center gap-2 px-6 h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Users
        </button>
      </div>
    );
  }

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'profile', label: 'Profile', icon: <Users className="w-4 h-4" /> },
    { id: 'permissions', label: 'Access Permissions', icon: <Key className="w-4 h-4" /> },
    { id: 'effective-permissions', label: 'Effective Permissions', icon: <Monitor className="w-4 h-4" /> },
    { id: 'clients', label: 'Assigned Clients', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'activity', label: 'Activity Log', icon: <FileText className="w-4 h-4" /> },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-6">
        <button
          onClick={() => navigate('/users')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Users</span>
        </button>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* User Info */}
          <div className="flex items-center gap-4">
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-200"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-200 flex items-center justify-center">
                <Users className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-gray-900">{currentUser.name}</h1>
                {currentUser.mfaEnabled && (
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-700">
                    <Shield className="w-3 h-3" />
                    <span className="text-sm">MFA</span>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-gray-600">{currentUser.email}</span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getRoleColor(currentUser.role)}`}>
                  {getRoleLabel(currentUser.role)}
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getStatusColor(currentUser.status)}`}>
                  {getStatusLabel(currentUser.status)}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent bg-white"
            >
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="disabled">Disabled</option>
            </select>
            <button className="flex items-center justify-center gap-2 px-4 h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors">
              <Edit className="w-4 h-4" />
              <span>Edit User</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-8 overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 sm:px-6 h-12 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#D9480F] text-[#D9480F]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-4 sm:px-8 py-6">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="max-w-4xl space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-gray-900">Personal Information</h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-gray-600 mb-1">Email Address</div>
                    <div className="text-gray-900">{currentUser.email}</div>
                  </div>
                </div>
                {currentUser.phoneNumber && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-gray-600 mb-1">Phone Number</div>
                      <div className="text-gray-900">{currentUser.phoneNumber}</div>
                    </div>
                  </div>
                )}
                {currentUser.jobTitle && (
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-gray-600 mb-1">Job Title</div>
                      <div className="text-gray-900">{currentUser.jobTitle}</div>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-gray-600 mb-1">Member Since</div>
                    <div className="text-gray-900">{formatDate(currentUser.createdAt)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-gray-900">Security</h3>
              </div>
              <div className="p-6 space-y-4">
                <MFAManagementSection user={currentUser} onUpdate={handleUserUpdate} />
                {currentUser.lastLogin && (
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-gray-900 mb-1">Last Login</div>
                      <div className="text-gray-600">{formatDateTime(currentUser.lastLogin)}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-gray-900">Account Status</h3>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  {currentUser.status === 'active' ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  ) : currentUser.status === 'pending' ? (
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="text-gray-900 mb-1">
                      {currentUser.status === 'active' && 'Account is Active'}
                      {currentUser.status === 'pending' && 'Invitation Pending'}
                      {currentUser.status === 'disabled' && 'Account is Disabled'}
                    </div>
                    <div className="text-gray-600">
                      {currentUser.status === 'active' && 'User has full access to assigned resources'}
                      {currentUser.status === 'pending' && 'User has not yet accepted their invitation'}
                      {currentUser.status === 'disabled' && 'User cannot access the platform'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Permissions Tab */}
        {activeTab === 'permissions' && userRole && (
          <RoleAssignmentTab
            user={currentUser}
            currentRole={userRole}
            onRoleChange={(roleId) => {
              const newRole = mockRoles.find(r => r.id === roleId);
              if (newRole) {
                handleUserUpdate({ role: newRole.name.toLowerCase().replace(' ', '-') as any });
              }
            }}
          />
        )}

        {/* Effective Permissions Tab */}
        {activeTab === 'effective-permissions' && userRole && (
          <div className="max-w-4xl space-y-6">
            <EffectivePermissionsEditor
              user={currentUser}
              role={userRole}
              onSave={handlePermissionOverrideSave}
            />
          </div>
        )}

        {/* Clients Tab */}
        {activeTab === 'clients' && (
          <div className="max-w-4xl">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-gray-900">Assigned Clients</h3>
                <p className="text-gray-600">Clients this user has access to</p>
              </div>
              <div className="p-6">
                {currentUser.assignedClients && currentUser.assignedClients.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentUser.assignedClients.map((clientId, index) => (
                      <div
                        key={clientId}
                        className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <Briefcase className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="text-gray-900">Client {index + 1}</div>
                          <div className="text-gray-600">ID: {clientId}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No clients assigned</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="max-w-4xl">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-gray-900">Activity Log</h3>
                <p className="text-gray-600">Recent actions performed by this user</p>
              </div>
              <div className="divide-y divide-gray-200">
                {userActivities.length > 0 ? (
                  userActivities.map((activity) => (
                    <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          activity.status === 'success' ? 'bg-green-100' :
                          activity.status === 'failed' ? 'bg-red-100' :
                          'bg-yellow-100'
                        }`}>
                          {activity.status === 'success' ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : activity.status === 'failed' ? (
                            <XCircle className="w-4 h-4 text-red-600" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-yellow-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-1">
                            <div className="text-gray-900">{activity.action}</div>
                            <div className="text-gray-500 whitespace-nowrap">
                              {formatDateTime(activity.timestamp)}
                            </div>
                          </div>
                          <div className="text-gray-600 mb-2">{activity.details}</div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="inline-flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              {activity.module}
                            </span>
                            {activity.ipAddress && (
                              <span className="inline-flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {activity.ipAddress}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No activity recorded</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}