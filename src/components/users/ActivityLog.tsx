import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft,
  FileText,
  Search,
  Filter,
  Download,
  Calendar,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
  User
} from 'lucide-react';
import { mockActivityLog } from '../../data/mockUsers';
import { ActivityLogEntry } from '../../types/users';

type StatusFilter = 'all' | 'success' | 'failed' | 'warning';
type ModuleFilter = 'all' | string;

export default function ActivityLog() {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<ActivityLogEntry[]>(mockActivityLog);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [moduleFilter, setModuleFilter] = useState<ModuleFilter>('all');
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'all'>('all');

  const modules = Array.from(new Set(mockActivityLog.map(log => log.module)));

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = 
      activity.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.details.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || activity.status === statusFilter;
    const matchesModule = moduleFilter === 'all' || activity.module === moduleFilter;

    let matchesDate = true;
    if (dateRange !== 'all') {
      const activityDate = new Date(activity.timestamp);
      const now = new Date();
      const dayMs = 24 * 60 * 60 * 1000;
      
      if (dateRange === 'today') {
        matchesDate = now.getTime() - activityDate.getTime() < dayMs;
      } else if (dateRange === 'week') {
        matchesDate = now.getTime() - activityDate.getTime() < 7 * dayMs;
      } else if (dateRange === 'month') {
        matchesDate = now.getTime() - activityDate.getTime() < 30 * dayMs;
      }
    }

    return matchesSearch && matchesStatus && matchesModule && matchesDate;
  });

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100';
      case 'failed':
        return 'bg-red-100';
      case 'warning':
        return 'bg-yellow-100';
      default:
        return 'bg-gray-100';
    }
  };

  const handleExport = () => {
    console.log('Exporting activity log...');
    // Implement export functionality
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
          <div>
            <h1 className="text-gray-900 mb-2">Activity Log</h1>
            <p className="text-gray-600">
              Track user actions, access attempts, and system events
            </p>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center justify-center gap-2 px-6 h-11 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Log</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4">
        <div className="flex flex-col gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search activities by user, action, or details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            />
          </div>

          {/* Filter Row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent bg-white"
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
              <option value="warning">Warning</option>
            </select>

            <select
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
              className="h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent bg-white"
            >
              <option value="all">All Modules</option>
              {modules.map(module => (
                <option key={module} value={module}>{module}</option>
              ))}
            </select>

            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as any)}
              className="h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent bg-white"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="text-gray-600">
            Showing {filteredActivities.length} of {activities.length} activities
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-4 sm:px-8 py-6">
        {/* Desktop Table */}
        <div className="hidden lg:block bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600">Status</th>
                <th className="px-6 py-3 text-left text-gray-600">User</th>
                <th className="px-6 py-3 text-left text-gray-600">Action</th>
                <th className="px-6 py-3 text-left text-gray-600">Module</th>
                <th className="px-6 py-3 text-left text-gray-600">Details</th>
                <th className="px-6 py-3 text-left text-gray-600">Timestamp</th>
                <th className="px-6 py-3 text-left text-gray-600">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredActivities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(activity.status)}`}>
                      {getStatusIcon(activity.status)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {activity.userAvatar ? (
                        <img
                          src={activity.userAvatar}
                          alt={activity.userName}
                          className="w-8 h-8 rounded-full bg-gray-200"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="w-4 h-4 text-gray-400" />
                        </div>
                      )}
                      <span className="text-gray-900">{activity.userName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{activity.action}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
                      {activity.module}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 max-w-md truncate">
                    {activity.details}
                  </td>
                  <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                    {formatDateTime(activity.timestamp)}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {activity.ipAddress || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getStatusColor(activity.status)}`}>
                  {getStatusIcon(activity.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {activity.userAvatar ? (
                      <img
                        src={activity.userAvatar}
                        alt={activity.userName}
                        className="w-6 h-6 rounded-full bg-gray-200"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="w-3 h-3 text-gray-400" />
                      </div>
                    )}
                    <span className="text-gray-900">{activity.userName}</span>
                  </div>
                  <div className="text-gray-900 mb-1">{activity.action}</div>
                  <div className="text-gray-600 mb-3">{activity.details}</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
                      {activity.module}
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
                      <Calendar className="w-3 h-3" />
                      {formatDateTime(activity.timestamp)}
                    </span>
                    {activity.ipAddress && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
                        <MapPin className="w-3 h-3" />
                        {activity.ipAddress}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredActivities.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">No activities found</h3>
            <p className="text-gray-600">
              {searchQuery || statusFilter !== 'all' || moduleFilter !== 'all' || dateRange !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Activity will appear here as users interact with the system'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}