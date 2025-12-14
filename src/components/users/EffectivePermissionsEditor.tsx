import { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, RotateCcw, Eye, Info } from 'lucide-react';
import { User, Role, PermissionSet } from '../../types/users';
import { PERMISSION_MODULES, PERMISSION_ACTIONS } from '../../data/mockUsers';
import { toast } from 'sonner@2.0.3';

interface EffectivePermissionsEditorProps {
  user: User;
  role: Role;
  onSave: (permissionOverrides: PermissionSet) => void;
}

export default function EffectivePermissionsEditor({
  user,
  role,
  onSave,
}: EffectivePermissionsEditorProps) {
  const [permissionOverrides, setPermissionOverrides] = useState<PermissionSet>(
    user.permissionOverrides || {}
  );
  const [showRolePermissions, setShowRolePermissions] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Calculate effective permissions (role + overrides)
  const getEffectivePermission = (module: string, action: string): boolean => {
    // Check if there's an override first
    if (permissionOverrides[module]?.[action] !== undefined) {
      return permissionOverrides[module][action];
    }
    // Fall back to role permission
    return role.permissions[module]?.[action] || false;
  };

  // Check if a permission is overridden
  const isOverridden = (module: string, action: string): boolean => {
    if (permissionOverrides[module]?.[action] === undefined) {
      return false;
    }
    const roleValue = role.permissions[module]?.[action] || false;
    const overrideValue = permissionOverrides[module][action];
    return roleValue !== overrideValue;
  };

  // Toggle a permission
  const togglePermission = (module: string, action: string) => {
    const currentEffective = getEffectivePermission(module, action);
    const roleValue = role.permissions[module]?.[action] || false;
    
    setPermissionOverrides((prev) => {
      const newOverrides = { ...prev };
      
      if (!newOverrides[module]) {
        newOverrides[module] = {};
      }

      // If the new value equals the role value, remove the override
      if (!currentEffective === roleValue) {
        delete newOverrides[module][action];
        // Clean up empty module
        if (Object.keys(newOverrides[module]).length === 0) {
          delete newOverrides[module];
        }
      } else {
        // Set override
        newOverrides[module][action] = !currentEffective;
      }

      return newOverrides;
    });
    
    setHasChanges(true);
  };

  // Reset all overrides
  const handleResetToRole = () => {
    if (window.confirm('Are you sure you want to reset all permission overrides? This will restore permissions to match the assigned role.')) {
      setPermissionOverrides({});
      setHasChanges(true);
      toast.success('Permissions reset to role defaults');
    }
  };

  // Save changes
  const handleSave = () => {
    onSave(permissionOverrides);
    setHasChanges(false);
    toast.success('Permission overrides saved successfully');
  };

  // Count overrides
  const overrideCount = Object.values(permissionOverrides).reduce(
    (count, module) => count + Object.keys(module).length,
    0
  );

  // Check for divergence warning
  const totalPermissions = PERMISSION_MODULES.length * PERMISSION_ACTIONS.length;
  const divergencePercent = (overrideCount / totalPermissions) * 100;
  const showDivergenceWarning = divergencePercent > 30;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h3 className="text-gray-900 mb-1">Effective Permissions</h3>
            <p className="text-gray-600">
              Manage user-specific permission overrides on top of the assigned role
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowRolePermissions(!showRolePermissions)}
              className="flex items-center justify-center gap-2 px-4 h-11 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              <Eye className="w-4 h-4" />
              <span>{showRolePermissions ? 'Hide' : 'View'} Role Permissions</span>
            </button>
            <button
              onClick={handleResetToRole}
              disabled={overrideCount === 0}
              className="flex items-center justify-center gap-2 px-4 h-11 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset to Role</span>
            </button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-blue-900 mb-1">How Permission Overrides Work</p>
            <p className="text-blue-700">
              This user inherits permissions from the <strong>{role.name}</strong> role. 
              You can override any permission for this specific user without affecting the role itself or other users.
            </p>
          </div>
        </div>

        {/* Override Summary */}
        {overrideCount > 0 && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-yellow-900 mb-1">
                  {overrideCount} permission{overrideCount !== 1 ? 's' : ''} overridden
                </p>
                {showDivergenceWarning && (
                  <p className="text-yellow-700">
                    Warning: This user's permissions diverge significantly from their assigned role. 
                    Consider creating a custom role instead.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Role Permissions (Read-only view) */}
      {showRolePermissions && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h4 className="text-gray-900">Role Permissions: {role.name}</h4>
            <p className="text-gray-600">{role.description}</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-4">
              {PERMISSION_MODULES.map((module) => {
                const perms = role.permissions[module.id];
                if (!perms) return null;

                const enabledActions = Object.entries(perms)
                  .filter(([_, enabled]) => enabled)
                  .map(([action]) => action);

                return (
                  <div key={module.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="mb-3">
                      <h5 className="text-gray-900 mb-1">{module.name}</h5>
                      <p className="text-gray-600">{module.description}</p>
                    </div>
                    {enabledActions.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {enabledActions.map((action) => (
                          <span
                            key={action}
                            className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {action}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">No permissions granted</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Permission Matrix - Desktop */}
      <div className="hidden lg:block bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h4 className="text-gray-900">Permission Matrix</h4>
          <p className="text-gray-600">
            Click to toggle permissions. Overridden permissions are marked with a badge.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-gray-900">Module</th>
                {PERMISSION_ACTIONS.map((action) => (
                  <th key={action.id} className="px-4 py-3 text-center text-gray-900">
                    <div>{action.name}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {PERMISSION_MODULES.map((module) => (
                <tr key={module.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-gray-900">{module.name}</div>
                    <div className="text-gray-600">{module.description}</div>
                  </td>
                  {PERMISSION_ACTIONS.map((action) => {
                    const isEnabled = getEffectivePermission(module.id, action.id);
                    const overridden = isOverridden(module.id, action.id);
                    
                    return (
                      <td key={action.id} className="px-4 py-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <button
                            onClick={() => togglePermission(module.id, action.id)}
                            className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center transition-colors ${
                              isEnabled
                                ? 'bg-green-50 border-green-500 text-green-600 hover:bg-green-100'
                                : 'bg-gray-50 border-gray-300 text-gray-400 hover:bg-gray-100'
                            }`}
                          >
                            {isEnabled ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <XCircle className="w-5 h-5" />
                            )}
                          </button>
                          {overridden && (
                            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded">
                              Custom
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permission Cards - Mobile */}
      <div className="lg:hidden space-y-4">
        {PERMISSION_MODULES.map((module) => (
          <div key={module.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <h4 className="text-gray-900">{module.name}</h4>
              <p className="text-gray-600">{module.description}</p>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3">
                {PERMISSION_ACTIONS.map((action) => {
                  const isEnabled = getEffectivePermission(module.id, action.id);
                  const overridden = isOverridden(module.id, action.id);
                  
                  return (
                    <button
                      key={action.id}
                      onClick={() => togglePermission(module.id, action.id)}
                      className={`p-3 rounded-lg border-2 flex flex-col items-center gap-2 transition-colors ${
                        isEnabled
                          ? 'bg-green-50 border-green-500'
                          : 'bg-gray-50 border-gray-300'
                      }`}
                    >
                      {isEnabled ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-400" />
                      )}
                      <div className="text-center">
                        <div className={`text-sm ${isEnabled ? 'text-green-900' : 'text-gray-600'}`}>
                          {action.name}
                        </div>
                        {overridden && (
                          <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded">
                            Custom
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      {hasChanges && (
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 -mx-4 sm:-mx-8 flex justify-end gap-3">
          <button
            onClick={() => {
              setPermissionOverrides(user.permissionOverrides || {});
              setHasChanges(false);
            }}
            className="px-6 h-11 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
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
  );
}