import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft,
  Shield,
  Plus,
  Users,
  Edit,
  Trash2,
  Copy,
  Lock,
  MoreVertical,
  Search
} from 'lucide-react';
import { mockRoles } from '../../data/mockUsers';
import { Role } from '../../types/users';

export default function RolesManagement() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const systemRoles = filteredRoles.filter(r => r.isSystem);
  const customRoles = filteredRoles.filter(r => !r.isSystem);

  const handleCreateRole = () => {
    navigate('/users/roles/new');
  };

  const handleEditRole = (roleId: string) => {
    navigate(`/users/roles/${roleId}/edit`);
  };

  const handleDuplicateRole = (roleId: string) => {
    const roleToDuplicate = roles.find(r => r.id === roleId);
    if (roleToDuplicate) {
      const newRole: Role = {
        ...roleToDuplicate,
        id: `role-${Date.now()}`,
        name: `${roleToDuplicate.name} (Copy)`,
        isSystem: false,
        userCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setRoles([...roles, newRole]);
    }
  };

  const handleDeleteRole = (roleId: string) => {
    if (confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter(r => r.id !== roleId));
    }
  };

  const getPermissionCount = (role: Role): number => {
    let count = 0;
    Object.values(role.permissions).forEach(perms => {
      count += Object.values(perms).filter(Boolean).length;
    });
    return count;
  };

  const RoleCard = ({ role }: { role: Role }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg ${role.isSystem ? 'bg-blue-100' : 'bg-purple-100'} flex items-center justify-center`}>
            <Shield className={`w-6 h-6 ${role.isSystem ? 'text-blue-600' : 'text-purple-600'}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-gray-900">{role.name}</h3>
              {role.isSystem && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs">
                  <Lock className="w-3 h-3" />
                  System
                </span>
              )}
            </div>
            <p className="text-gray-600 mt-1">{role.description}</p>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setActiveDropdown(activeDropdown === role.id ? null : role.id)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </button>
          {activeDropdown === role.id && (
            <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
              <button
                onClick={() => handleEditRole(role.id)}
                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                {role.isSystem ? 'View Details' : 'Edit Role'}
              </button>
              <button
                onClick={() => handleDuplicateRole(role.id)}
                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Duplicate Role
              </button>
              {!role.isSystem && (
                <button
                  onClick={() => handleDeleteRole(role.id)}
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Role
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-400" />
          <div>
            <div className="text-gray-600">Users</div>
            <div className="text-gray-900">{role.userCount}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-gray-400" />
          <div>
            <div className="text-gray-600">Permissions</div>
            <div className="text-gray-900">{getPermissionCount(role)}</div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <button
          onClick={() => handleEditRole(role.id)}
          className="w-full h-9 px-4 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  );

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
          <div>
            <h1 className="text-gray-900 mb-2">Roles & Permissions</h1>
            <p className="text-gray-600">
              Define and manage user roles with custom permission sets
            </p>
          </div>
          <button
            onClick={handleCreateRole}
            className="flex items-center justify-center gap-2 px-6 h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Custom Role</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search roles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-4 sm:px-8 py-6">
        <div className="space-y-8">
          {/* System Roles */}
          {systemRoles.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Lock className="w-5 h-5 text-gray-600" />
                <h2 className="text-gray-900">System Roles</h2>
                <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-sm">
                  {systemRoles.length}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {systemRoles.map((role) => (
                  <RoleCard key={role.id} role={role} />
                ))}
              </div>
            </div>
          )}

          {/* Custom Roles */}
          {customRoles.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-gray-600" />
                <h2 className="text-gray-900">Custom Roles</h2>
                <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-sm">
                  {customRoles.length}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {customRoles.map((role) => (
                  <RoleCard key={role.id} role={role} />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredRoles.length === 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-gray-900 mb-2">No roles found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery
                  ? 'Try adjusting your search'
                  : 'Get started by creating your first custom role'}
              </p>
              {!searchQuery && (
                <button
                  onClick={handleCreateRole}
                  className="inline-flex items-center gap-2 px-6 h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Create Custom Role
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}