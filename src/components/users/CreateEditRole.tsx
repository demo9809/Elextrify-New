import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  ArrowLeft,
  Shield,
  Save,
  AlertCircle,
  Lock,
  Check,
  X
} from 'lucide-react';
import { mockRoles, PERMISSION_MODULES, PERMISSION_ACTIONS } from '../../data/mockUsers';
import { Role, PermissionSet } from '../../types/users';
import ModulePermissionEditor from './ModulePermissionEditor';
import PermissionSummaryPanel from './PermissionSummaryPanel';

export default function CreateEditRole() {
  const { roleId } = useParams<{ roleId: string }>();
  const navigate = useNavigate();
  const isEditing = roleId !== 'new';
  const existingRole = isEditing ? mockRoles.find(r => r.id === roleId) : null;

  const [name, setName] = useState(existingRole?.name || '');
  const [description, setDescription] = useState(existingRole?.description || '');
  const [permissions, setPermissions] = useState<PermissionSet>(
    existingRole?.permissions || {}
  );
  const [nameError, setNameError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const isSystemRole = existingRole?.isSystem || false;

  const handleNameChange = (value: string) => {
    setName(value);
    if (nameError) {
      setNameError('');
    }
  };

  const handleSave = () => {
    if (!name.trim()) {
      setNameError('Role name is required');
      return;
    }

    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Saving role:', { name, description, permissions });
      setIsSaving(false);
      navigate('/users/roles');
    }, 1000);
  };

  const handlePermissionChange = (updatedPermissions: PermissionSet) => {
    setPermissions(updatedPermissions);
  };

  const getTotalPermissions = (): number => {
    let count = 0;
    Object.values(permissions).forEach(perms => {
      count += Object.values(perms).filter(Boolean).length;
    });
    return count;
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-6">
        <button
          onClick={() => navigate('/users/roles')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Roles</span>
        </button>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-lg ${isSystemRole ? 'bg-blue-100' : 'bg-purple-100'} flex items-center justify-center`}>
              <Shield className={`w-6 h-6 ${isSystemRole ? 'text-blue-600' : 'text-purple-600'}`} />
            </div>
            <div>
              <h1 className="text-gray-900">
                {isEditing ? (isSystemRole ? 'View Role' : 'Edit Role') : 'Create Custom Role'}
              </h1>
              <p className="text-gray-600">
                {isSystemRole
                  ? 'System roles cannot be modified'
                  : 'Define permissions and access levels for this role'}
              </p>
            </div>
          </div>
          {!isSystemRole && (
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center justify-center gap-2 px-6 h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{isEditing ? 'Save Changes' : 'Create Role'}</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-4 sm:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* System Role Warning */}
          {isSystemRole && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
              <Lock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-blue-900 mb-1">System Role</div>
                <div className="text-blue-700">
                  This is a system-defined role that cannot be modified. You can view its permissions or duplicate it to create a custom version.
                </div>
              </div>
            </div>
          )}

          {/* Basic Information */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-gray-900">Basic Information</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">
                  Role Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g., Regional Manager"
                  disabled={isSystemRole}
                  className={`w-full h-11 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent ${
                    nameError ? 'border-red-500' : 'border-gray-300'
                  } ${isSystemRole ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                />
                {nameError && (
                  <div className="mt-2 flex items-center gap-2 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{nameError}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what this role is for and who should have it..."
                  rows={2}
                  disabled={isSystemRole}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent resize-none ${
                    isSystemRole ? 'bg-gray-50 cursor-not-allowed' : ''
                  }`}
                />
              </div>

              {!isSystemRole && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-gray-700">Total Permissions Granted</div>
                    <div className="text-gray-900">{getTotalPermissions()} permissions</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Permission Editor */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-gray-900 mb-1">Permissions</h3>
              <p className="text-gray-600">
                Configure module-specific permissions for this role
              </p>
            </div>
            <ModulePermissionEditor
              permissions={permissions}
              onChange={handlePermissionChange}
              disabled={isSystemRole}
            />
          </div>

          {/* Permission Summary */}
          <PermissionSummaryPanel permissions={permissions} />

          {/* Action Buttons (Mobile/Bottom) */}
          {!isSystemRole && (
            <div className="lg:hidden bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex gap-3">
                <button
                  onClick={() => navigate('/users/roles')}
                  disabled={isSaving}
                  className="flex-1 h-11 px-6 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 h-11 px-6 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>{isEditing ? 'Save Changes' : 'Create Role'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}