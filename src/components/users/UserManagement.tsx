import { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  Search, 
  UserPlus, 
  Shield, 
  FileText, 
  Mail, 
  Edit, 
  Ban, 
  Users, 
  MoreVertical, 
  Trash2 
} from 'lucide-react';
import { mockUsers, getRoleLabel, getStatusLabel, getStatusColor, getRoleColor } from '../../data/mockUsers';
import InviteUserWizard from './InviteUserWizard';
import { mockOrganizationUnits, mockClients, PRIMARY_LEGAL_ENTITY_ID } from '../../data/mockAccessScopes';
import { toast } from 'sonner@2.0.3';

// Import types
type UserRole = 'owner' | 'admin' | 'manager' | 'media-operator' | 'viewer';
type UserStatus = 'active' | 'pending' | 'disabled';
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastLogin?: string;
  avatar?: string;
  mfaEnabled: boolean;
}

export default function UserManagement() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [showInvitePanel, setShowInvitePanel] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const toggleUserSelection = (userId: string) => {
    const newSelection = new Set(selectedUsers);
    if (newSelection.has(userId)) {
      newSelection.delete(userId);
    } else {
      newSelection.add(userId);
    }
    setSelectedUsers(newSelection);
  };

  const toggleSelectAll = () => {
    if (selectedUsers.size === filteredUsers.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(filteredUsers.map(u => u.id)));
    }
  };

  const handleUserClick = (userId: string) => {
    navigate(`/users/${userId}`);
  };

  const handleInvite = (inviteData: any) => {
    console.log('Invite Data:', inviteData);
    toast.success(`Invitation sent to ${inviteData.email}`, {
      description: `User will have ${inviteData.role} access to ${inviteData.organizationUnits.length} organization unit(s)`,
    });
  };

  const formatLastLogin = (dateString?: string) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-gray-900 mb-2">Users & Permissions</h1>
            <p className="text-gray-600">
              Manage user accounts, roles, and access permissions
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('/users/roles')}
              className="flex items-center justify-center gap-2 px-4 h-11 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Shield className="w-4 h-4" />
              <span>Manage Roles</span>
            </button>
            <button
              onClick={() => navigate('/users/activity')}
              className="flex items-center justify-center gap-2 px-4 h-11 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Activity Log</span>
            </button>
            <button
              onClick={() => setShowInvitePanel(true)}
              className="flex items-center justify-center gap-2 px-6 h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span>Invite User</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as UserRole | 'all')}
              className="h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent bg-white"
            >
              <option value="all">All Roles</option>
              <option value="owner">Owner</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="media-operator">Media Operator</option>
              <option value="viewer">Viewer</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as UserStatus | 'all')}
              className="h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent bg-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.size > 0 && (
          <div className="mt-4 flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <span className="text-blue-900">
              {selectedUsers.size} user{selectedUsers.size !== 1 ? 's' : ''} selected
            </span>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 h-9 bg-white border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors">
                <Mail className="w-4 h-4" />
                <span>Resend Invite</span>
              </button>
              <button className="flex items-center gap-2 px-4 h-9 bg-white border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors">
                <Edit className="w-4 h-4" />
                <span>Change Role</span>
              </button>
              <button className="flex items-center gap-2 px-4 h-9 bg-white border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors">
                <Ban className="w-4 h-4" />
                <span>Disable</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-8 py-6">
        {/* Desktop Table */}
        <div className="hidden lg:block bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="w-12 px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.size === filteredUsers.length && filteredUsers.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 text-[#D9480F] focus:ring-[#D9480F]"
                  />
                </th>
                <th className="px-6 py-3 text-left text-gray-600">User</th>
                <th className="px-6 py-3 text-left text-gray-600">Role</th>
                <th className="px-6 py-3 text-left text-gray-600">Status</th>
                <th className="px-6 py-3 text-left text-gray-600">Last Login</th>
                <th className="px-6 py-3 text-left text-gray-600">MFA</th>
                <th className="w-12 px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr 
                  key={user.id} 
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleUserClick(user.id)}
                >
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedUsers.has(user.id)}
                      onChange={() => toggleUserSelection(user.id)}
                      className="w-4 h-4 rounded border-gray-300 text-[#D9480F] focus:ring-[#D9480F]"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {user.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="w-10 h-10 rounded-full bg-gray-200"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <Users className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <div className="text-gray-900">{user.name}</div>
                        <div className="text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full ${getRoleColor(user.role)}`}>
                      {getRoleLabel(user.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full ${getStatusColor(user.status)}`}>
                      {getStatusLabel(user.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {formatLastLogin(user.lastLogin)}
                  </td>
                  <td className="px-6 py-4">
                    {user.mfaEnabled ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-700">
                        <Shield className="w-3 h-3" />
                        Enabled
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    <div className="relative">
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === user.id ? null : user.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                      {activeDropdown === user.id && (
                        <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                          <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                            <Edit className="w-4 h-4" />
                            Edit User
                          </button>
                          <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Resend Invite
                          </button>
                          <button className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2">
                            <Trash2 className="w-4 h-4" />
                            Remove User
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => handleUserClick(user.id)}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={selectedUsers.has(user.id)}
                  onChange={() => toggleUserSelection(user.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-[#D9480F] focus:ring-[#D9480F]"
                />
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-12 h-12 rounded-full bg-gray-200"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <Users className="w-6 h-6 text-gray-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-900 truncate">{user.name}</h3>
                      <p className="text-gray-600 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDropdown(activeDropdown === user.id ? null : user.id);
                      }}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                    >
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getRoleColor(user.role)}`}>
                      {getRoleLabel(user.role)}
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getStatusColor(user.status)}`}>
                      {getStatusLabel(user.status)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-600">
                      Last login: {formatLastLogin(user.lastLogin)}
                    </div>
                    {user.mfaEnabled && (
                      <div className="flex items-center gap-1 text-green-600">
                        <Shield className="w-3 h-3" />
                        <span>MFA</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || statusFilter !== 'all' || roleFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Get started by inviting your first user'}
            </p>
            {!searchQuery && statusFilter === 'all' && roleFilter === 'all' && (
              <button
                onClick={() => setShowInvitePanel(true)}
                className="inline-flex items-center gap-2 px-6 h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                Invite User
              </button>
            )}
          </div>
        )}
      </div>

      {/* Invite User Panel */}
      {showInvitePanel && (
        <InviteUserWizard
          isOpen={showInvitePanel}
          onClose={() => setShowInvitePanel(false)}
          onInvite={handleInvite}
          organizationUnits={mockOrganizationUnits}
          clients={mockClients}
          primaryLegalEntityId={PRIMARY_LEGAL_ENTITY_ID}
        />
      )}
    </div>
  );
}