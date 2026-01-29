import { useState, useMemo } from 'react';
import { 
  Bell, Search, Filter, Check, Trash2, Archive, MoreVertical,
  CreditCard, Target, Monitor, AlertCircle, Shield, ChevronDown,
  CheckSquare, Square, AlertTriangle, Info, X
} from 'lucide-react';
import { useNavigate } from 'react-router';
import {
  mockNotifications,
  getCategoryColor,
  getCategoryLabel,
  formatRelativeTime,
  getSeverityColor,
  getSeverityBgColor,
  getSeverityBorderColor,
  type Notification,
  type NotificationCategory,
  type NotificationSeverity,
} from '../../data/mockNotifications';
import { toast } from 'sonner';

type ViewType = 'all' | 'unread' | 'archived';
type SortType = 'unread' | 'severity' | 'timestamp';

export default function EnhancedNotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [currentView, setCurrentView] = useState<ViewType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<NotificationCategory | 'all'>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<NotificationSeverity | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortType>('unread');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const getCategoryIcon = (category: NotificationCategory) => {
    const iconProps = { className: 'w-5 h-5' };
    switch (category) {
      case 'billing': return <CreditCard {...iconProps} />;
      case 'campaigns': return <Target {...iconProps} />;
      case 'devices': return <Monitor {...iconProps} />;
      case 'security': return <Shield {...iconProps} />;
      case 'system': return <AlertCircle {...iconProps} />;
      default: return <AlertCircle {...iconProps} />;
    }
  };

  const getSeverityIcon = (severity: NotificationSeverity) => {
    const iconProps = { className: 'w-4 h-4' };
    switch (severity) {
      case 'critical': return <AlertCircle {...iconProps} />;
      case 'warning': return <AlertTriangle {...iconProps} />;
      default: return <Info {...iconProps} />;
    }
  };

  // Filter and sort notifications
  const filteredNotifications = useMemo(() => {
    let filtered = notifications.filter((notification) => {
      // Filter by view
      if (currentView === 'unread' && notification.isRead) return false;
      if (currentView === 'archived' && !notification.isArchived) return false;
      if (currentView === 'all' && (notification.isArchived || notification.isCleared)) return false;

      // Filter by search
      const matchesSearch =
        searchQuery === '' ||
        notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.description.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      // Filter by category
      if (selectedCategory !== 'all' && notification.category !== selectedCategory) return false;

      // Filter by severity
      if (selectedSeverity !== 'all' && notification.severity !== selectedSeverity) return false;

      return true;
    });

    // Sort notifications
    filtered.sort((a, b) => {
      if (sortBy === 'unread') {
        if (a.isRead === b.isRead) {
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        }
        return a.isRead ? 1 : -1;
      } else if (sortBy === 'severity') {
        const severityOrder = { critical: 0, warning: 1, info: 2 };
        const orderDiff = severityOrder[a.severity] - severityOrder[b.severity];
        if (orderDiff !== 0) return orderDiff;
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      } else {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      }
    });

    return filtered;
  }, [notifications, currentView, searchQuery, selectedCategory, selectedSeverity, sortBy]);

  // Pagination
  const paginatedNotifications = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredNotifications.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredNotifications, currentPage]);

  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);

  // Stats
  const stats = useMemo(() => {
    const all = notifications.filter(n => !n.isArchived && !n.isCleared).length;
    const unread = notifications.filter(n => !n.isRead && !n.isArchived && !n.isCleared).length;
    const archived = notifications.filter(n => n.isArchived).length;
    return { all, unread, archived };
  }, [notifications]);

  // Selection handlers
  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedNotifications.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedNotifications.map(n => n.id));
    }
  };

  // Action handlers
  const handleMarkAsRead = (ids: string[]) => {
    setNotifications(prev =>
      prev.map(n => ids.includes(n.id) ? { ...n, isRead: true } : n)
    );
    toast.success(`${ids.length} notification${ids.length > 1 ? 's' : ''} marked as read`);
    setSelectedIds([]);
  };

  const handleMarkAsUnread = (ids: string[]) => {
    setNotifications(prev =>
      prev.map(n => ids.includes(n.id) ? { ...n, isRead: false } : n)
    );
    toast.success(`${ids.length} notification${ids.length > 1 ? 's' : ''} marked as unread`);
    setSelectedIds([]);
  };

  const handleArchive = (ids: string[]) => {
    setNotifications(prev =>
      prev.map(n => ids.includes(n.id) ? { ...n, isArchived: true, isRead: true } : n)
    );
    toast.success(`${ids.length} notification${ids.length > 1 ? 's' : ''} archived`);
    setSelectedIds([]);
  };

  const handleUnarchive = (ids: string[]) => {
    setNotifications(prev =>
      prev.map(n => ids.includes(n.id) ? { ...n, isArchived: false } : n)
    );
    toast.success(`${ids.length} notification${ids.length > 1 ? 's' : ''} unarchived`);
    setSelectedIds([]);
  };

  const handleClear = (ids: string[]) => {
    setNotifications(prev =>
      prev.map(n => ids.includes(n.id) ? { ...n, isCleared: true } : n)
    );
    toast.success(`${ids.length} notification${ids.length > 1 ? 's' : ''} cleared`);
    setSelectedIds([]);
    setShowClearConfirm(false);
  };

  const handleMarkAllAsRead = () => {
    const unreadIds = filteredNotifications.filter(n => !n.isRead).map(n => n.id);
    if (unreadIds.length > 0) {
      handleMarkAsRead(unreadIds);
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (expandedId === notification.id) {
      setExpandedId(null);
    } else {
      setExpandedId(notification.id);
      if (!notification.isRead) {
        handleMarkAsRead([notification.id]);
      }
    }
  };

  const handleActionClick = (notification: Notification, e: React.MouseEvent) => {
    e.stopPropagation();
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-[#D9480F] flex items-center justify-center flex-shrink-0">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-[#111827]">Notifications</h1>
                <p className="text-sm text-[#6B7280] mt-1">
                  Manage your alerts and updates
                </p>
              </div>
            </div>

            {/* Global Actions */}
            <div className="flex items-center gap-2">
              {selectedIds.length > 0 ? (
                <>
                  <span className="text-sm text-[#6B7280] mr-2">
                    {selectedIds.length} selected
                  </span>
                  <button
                    onClick={() => setSelectedIds([])}
                    className="flex items-center gap-2 px-3 h-10 border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors text-sm font-medium text-[#111827]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setShowBulkActions(!showBulkActions)}
                      className="flex items-center gap-2 px-4 h-10 bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      Actions
                      <ChevronDown className={`w-4 h-4 transition-transform ${showBulkActions ? 'rotate-180' : ''}`} />
                    </button>
                    {showBulkActions && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-10">
                        <button
                          onClick={() => { handleMarkAsRead(selectedIds); setShowBulkActions(false); }}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-[#F9FAFB] transition-colors"
                        >
                          <Check className="w-4 h-4 inline mr-2" />
                          Mark as Read
                        </button>
                        <button
                          onClick={() => { handleMarkAsUnread(selectedIds); setShowBulkActions(false); }}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-[#F9FAFB] transition-colors"
                        >
                          <Check className="w-4 h-4 inline mr-2" />
                          Mark as Unread
                        </button>
                        {currentView !== 'archived' && (
                          <button
                            onClick={() => { handleArchive(selectedIds); setShowBulkActions(false); }}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-[#F9FAFB] transition-colors"
                          >
                            <Archive className="w-4 h-4 inline mr-2" />
                            Archive
                          </button>
                        )}
                        {currentView === 'archived' && (
                          <button
                            onClick={() => { handleUnarchive(selectedIds); setShowBulkActions(false); }}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-[#F9FAFB] transition-colors"
                          >
                            <Archive className="w-4 h-4 inline mr-2" />
                            Unarchive
                          </button>
                        )}
                        <button
                          onClick={() => { setShowClearConfirm(true); setShowBulkActions(false); }}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-[#F9FAFB] text-[#DC2626] transition-colors border-t border-[#E5E7EB]"
                        >
                          <Trash2 className="w-4 h-4 inline mr-2" />
                          Clear
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={handleMarkAllAsRead}
                    disabled={stats.unread === 0}
                    className="flex items-center gap-2 px-4 h-10 border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium text-[#111827]"
                  >
                    <Check className="w-4 h-4" />
                    <span className="hidden sm:inline">Mark all as read</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* View Tabs */}
          <div className="mt-6 flex items-center gap-1 border-b border-[#E5E7EB] -mb-px">
            <button
              onClick={() => { setCurrentView('all'); setCurrentPage(1); }}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                currentView === 'all'
                  ? 'border-[#D9480F] text-[#D9480F]'
                  : 'border-transparent text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              All
              <span className="ml-2 px-2 py-0.5 rounded-full bg-[#F9FAFB] text-xs">
                {stats.all}
              </span>
            </button>
            <button
              onClick={() => { setCurrentView('unread'); setCurrentPage(1); }}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                currentView === 'unread'
                  ? 'border-[#D9480F] text-[#D9480F]'
                  : 'border-transparent text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              Unread
              {stats.unread > 0 && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-[#D9480F] text-white text-xs">
                  {stats.unread}
                </span>
              )}
            </button>
            <button
              onClick={() => { setCurrentView('archived'); setCurrentPage(1); }}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                currentView === 'archived'
                  ? 'border-[#D9480F] text-[#D9480F]'
                  : 'border-transparent text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              Archived
              <span className="ml-2 px-2 py-0.5 rounded-full bg-[#F9FAFB] text-xs">
                {stats.archived}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 text-sm font-medium text-[#111827] mb-3"
          >
            <Filter className="w-4 h-4" />
            Filters & Sort
            <ChevronDown
              className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Filter Controls */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 ${
              showFilters ? 'block' : 'hidden lg:grid'
            }`}
          >
            {/* Search */}
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notifications..."
                className="w-full h-10 pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as NotificationCategory | 'all')}
                className="w-full h-10 px-3 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="billing">Billing</option>
                <option value="campaigns">Campaigns</option>
                <option value="devices">Devices</option>
                <option value="system">System</option>
                <option value="security">Security</option>
              </select>
            </div>

            {/* Severity Filter */}
            <div>
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value as NotificationSeverity | 'all')}
                className="w-full h-10 px-3 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              >
                <option value="all">All Severity</option>
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortType)}
                className="w-full h-10 px-3 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              >
                <option value="unread">Unread First</option>
                <option value="severity">By Severity</option>
                <option value="timestamp">By Date</option>
              </select>
            </div>
          </div>

          {/* Active Filters Summary */}
          {(searchQuery || selectedCategory !== 'all' || selectedSeverity !== 'all') && (
            <div className="mt-3 flex items-center gap-2 text-sm text-[#6B7280]">
              <span>
                Showing {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}
              </span>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedSeverity('all');
                }}
                className="text-[#D9480F] hover:text-[#C23D0D] font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-5xl mx-auto">
        {/* Select All */}
        {paginatedNotifications.length > 0 && (
          <div className="mb-4 flex items-center gap-3 px-4">
            <button
              onClick={toggleSelectAll}
              className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#111827] transition-colors"
            >
              {selectedIds.length === paginatedNotifications.length ? (
                <CheckSquare className="w-4 h-4" />
              ) : (
                <Square className="w-4 h-4" />
              )}
              <span>Select all on page</span>
            </button>
          </div>
        )}

        {filteredNotifications.length === 0 ? (
          <div className="bg-white border border-[#E5E7EB] rounded-lg py-12 text-center">
            <Bell className="w-12 h-12 text-[#9CA3AF] mx-auto mb-3" />
            <p className="text-[#6B7280]">No notifications found</p>
            <p className="text-sm text-[#9CA3AF] mt-1">
              {searchQuery || selectedCategory !== 'all' || selectedSeverity !== 'all'
                ? 'Try adjusting your filters'
                : currentView === 'archived'
                ? 'No archived notifications'
                : "You're all caught up!"}
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              {paginatedNotifications.map((notification) => {
                const isExpanded = expandedId === notification.id;
                const isSelected = selectedIds.includes(notification.id);

                return (
                  <div
                    key={notification.id}
                    className={`bg-white border rounded-lg transition-all ${
                      isSelected
                        ? 'border-[#D9480F] ring-2 ring-[#D9480F]/20'
                        : notification.isRead
                        ? 'border-[#E5E7EB]'
                        : 'border-[#D9480F]/30 bg-[#FEF2F2]/30'
                    }`}
                  >
                    <div className="flex gap-4 px-4 sm:px-6 py-4">
                      {/* Checkbox */}
                      <div className="flex-shrink-0 pt-0.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSelect(notification.id);
                          }}
                          className="text-[#6B7280] hover:text-[#111827] transition-colors"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-5 h-5 text-[#D9480F]" />
                          ) : (
                            <Square className="w-5 h-5" />
                          )}
                        </button>
                      </div>

                      {/* Icon */}
                      <div
                        className="flex-shrink-0 pt-0.5"
                        style={{ color: getCategoryColor(notification.category) }}
                      >
                        {getCategoryIcon(notification.category)}
                      </div>

                      {/* Content */}
                      <div
                        className="flex-1 min-w-0 cursor-pointer"
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3
                                className={`text-sm sm:text-base ${
                                  notification.isRead ? 'font-normal text-[#111827]' : 'font-semibold text-[#111827]'
                                }`}
                              >
                                {notification.title}
                              </h3>
                              {!notification.isRead && (
                                <div className="flex-shrink-0 w-2 h-2 bg-[#D9480F] rounded-full" />
                              )}
                            </div>
                            <p className={`text-sm ${notification.isRead ? 'text-[#6B7280]' : 'text-[#374151]'}`}>
                              {isExpanded
                                ? notification.fullDescription || notification.description
                                : notification.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          {/* Severity Badge */}
                          <span
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-md border font-medium"
                            style={{
                              color: getSeverityColor(notification.severity),
                              backgroundColor: getSeverityBgColor(notification.severity),
                              borderColor: getSeverityBorderColor(notification.severity),
                            }}
                          >
                            {getSeverityIcon(notification.severity)}
                            <span className="capitalize">{notification.severity}</span>
                          </span>

                          {/* Category Badge */}
                          <span
                            className="inline-flex items-center px-2 py-1 rounded-md border text-xs font-medium"
                            style={{
                              color: getCategoryColor(notification.category),
                              borderColor: getCategoryColor(notification.category) + '40',
                              backgroundColor: getCategoryColor(notification.category) + '10',
                            }}
                          >
                            {getCategoryLabel(notification.category)}
                          </span>

                          {notification.source && (
                            <span className="text-[#9CA3AF]">{notification.source}</span>
                          )}
                          <span className="text-[#9CA3AF]">{formatRelativeTime(notification.timestamp)}</span>
                        </div>

                        {/* Expanded Actions */}
                        {isExpanded && notification.actionUrl && (
                          <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
                            <button
                              onClick={(e) => handleActionClick(notification, e)}
                              className="inline-flex items-center gap-2 px-4 h-9 bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors text-sm font-medium"
                            >
                              View Details
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Single Action Menu */}
                      <div className="flex-shrink-0 relative group">
                        <button className="p-1 hover:bg-[#F9FAFB] rounded transition-colors">
                          <MoreVertical className="w-5 h-5 text-[#6B7280]" />
                        </button>
                        <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                          {!notification.isRead ? (
                            <button
                              onClick={() => handleMarkAsRead([notification.id])}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-[#F9FAFB] transition-colors"
                            >
                              <Check className="w-4 h-4 inline mr-2" />
                              Mark as read
                            </button>
                          ) : (
                            <button
                              onClick={() => handleMarkAsUnread([notification.id])}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-[#F9FAFB] transition-colors"
                            >
                              <Check className="w-4 h-4 inline mr-2" />
                              Mark as unread
                            </button>
                          )}
                          {!notification.isArchived ? (
                            <button
                              onClick={() => handleArchive([notification.id])}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-[#F9FAFB] transition-colors"
                            >
                              <Archive className="w-4 h-4 inline mr-2" />
                              Archive
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUnarchive([notification.id])}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-[#F9FAFB] transition-colors"
                            >
                              <Archive className="w-4 h-4 inline mr-2" />
                              Unarchive
                            </button>
                          )}
                          <button
                            onClick={() => handleClear([notification.id])}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-[#F9FAFB] text-[#DC2626] transition-colors border-t border-[#E5E7EB]"
                          >
                            <Trash2 className="w-4 h-4 inline mr-2" />
                            Clear
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm text-[#6B7280]">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredNotifications.length)} of {filteredNotifications.length}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-[#E5E7EB] rounded-lg text-sm font-medium text-[#111827] hover:bg-[#F9FAFB] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-[#6B7280]">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-[#E5E7EB] rounded-lg text-sm font-medium text-[#111827] hover:bg-[#F9FAFB] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#FEF2F2] flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-[#DC2626]" />
              </div>
              <h3 className="font-semibold text-[#111827]">Clear Notifications</h3>
            </div>
            <p className="text-sm text-[#6B7280] mb-6">
              Are you sure you want to clear {selectedIds.length} notification{selectedIds.length > 1 ? 's' : ''}? This action cannot be undone.
            </p>
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 border border-[#E5E7EB] rounded-lg text-sm font-medium text-[#111827] hover:bg-[#F9FAFB] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleClear(selectedIds)}
                className="px-4 py-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-lg text-sm font-medium transition-colors"
              >
                Clear Notifications
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}