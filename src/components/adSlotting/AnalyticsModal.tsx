import { useState } from 'react';
import { X, TrendingUp, Activity, Clock, BarChart3, FileDown } from 'lucide-react';

interface AnalyticsModalProps {
  groupName: string;
  location: string;
  onClose: () => void;
}

export default function AnalyticsModal({ groupName, location, onClose }: AnalyticsModalProps) {
  const [activeTab, setActiveTab] = useState<'peak' | 'normal' | 'all'>('peak');

  // Mock analytics data
  const statsData = {
    totalImpressions: 2400000,
    impressionsChange: '+12.5%',
    playCount: 145000,
    playCountChange: '+8.3%',
    uptime: '98.7%',
    uptimeDetail: '167h 45m this week',
    utilization: '87.5%',
    utilizationChange: '+5.2%',
  };

  const slotPerformanceData = [
    {
      position: 1,
      timeRange: '0:00 – 0:10',
      status: 'Booked',
      client: 'Nike Sports',
      impressions: 142560,
      plays: 8520,
      uptime: '99.2%',
    },
    {
      position: 2,
      timeRange: '0:10 – 0:20',
      status: 'Booked',
      client: 'Coca-Cola',
      impressions: 138240,
      plays: 8290,
      uptime: '98.5%',
    },
    {
      position: 3,
      timeRange: '0:20 – 0:30',
      status: 'Free',
      client: '—',
      impressions: null,
      plays: null,
      uptime: '—',
    },
    {
      position: 4,
      timeRange: '0:30 – 0:40',
      status: 'Booked',
      client: 'Samsung',
      impressions: 135890,
      plays: 8150,
      uptime: '97.8%',
    },
    {
      position: 5,
      timeRange: '0:40 – 0:50',
      status: 'Filler',
      client: 'House Ad',
      impressions: 128450,
      plays: 7705,
      uptime: '99.5%',
    },
    {
      position: 6,
      timeRange: '0:50 – 1:00',
      status: 'Filler',
      client: 'House Ad',
      impressions: 129120,
      plays: 7745,
      uptime: '99.6%',
    },
  ];

  const handleExportReport = () => {
    console.log('Exporting report...');
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 flex items-start justify-between flex-shrink-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Analytics: {groupName}</h2>
            <p className="text-sm text-gray-600 mt-1">{location}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('peak')}
              className={`px-4 py-2 rounded-lg text-base font-medium transition-colors ${
                activeTab === 'peak'
                  ? 'bg-[#D9480F] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Peak Slots
            </button>
            <button
              onClick={() => setActiveTab('normal')}
              className={`px-4 py-2 rounded-lg text-base font-medium transition-colors ${
                activeTab === 'normal'
                  ? 'bg-[#D9480F] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Normal Slots
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg text-base font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-[#D9480F] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Slots
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <TrendingUp className="w-4 h-4" />
                <span>Total Impressions</span>
              </div>
              <div className="text-2xl font-semibold text-gray-900 mb-1">
                {(statsData.totalImpressions / 1000000).toFixed(1)}M
              </div>
              <div className="text-xs text-green-600 font-medium">
                {statsData.impressionsChange} vs last week
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Activity className="w-4 h-4" />
                <span>Play Count</span>
              </div>
              <div className="text-2xl font-semibold text-gray-900 mb-1">
                {(statsData.playCount / 1000).toFixed(0)}K
              </div>
              <div className="text-xs text-green-600 font-medium">
                {statsData.playCountChange} vs last week
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Clock className="w-4 h-4" />
                <span>Uptime</span>
              </div>
              <div className="text-2xl font-semibold text-gray-900 mb-1">
                {statsData.uptime}
              </div>
              <div className="text-xs text-gray-600">
                {statsData.uptimeDetail}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <BarChart3 className="w-4 h-4" />
                <span>Utilization</span>
              </div>
              <div className="text-2xl font-semibold text-gray-900 mb-1">
                {statsData.utilization}
              </div>
              <div className="text-xs text-green-600 font-medium">
                {statsData.utilizationChange} vs last week
              </div>
            </div>
          </div>

          {/* Subslot Performance */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Subslot Performance ({activeTab === 'peak' ? 'Peak' : activeTab === 'normal' ? 'Normal' : 'All'})
            </h3>

            {/* Table */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Header */}
              <div className="bg-gray-50 border-b border-gray-200">
                <div className="grid grid-cols-7 gap-4 px-4 py-3">
                  <div className="text-sm font-medium text-gray-900">Position</div>
                  <div className="text-sm font-medium text-gray-900">Time Range</div>
                  <div className="text-sm font-medium text-gray-900">Status</div>
                  <div className="text-sm font-medium text-gray-900">Client</div>
                  <div className="text-sm font-medium text-gray-900 text-right">Impressions</div>
                  <div className="text-sm font-medium text-gray-900 text-right">Plays</div>
                  <div className="text-sm font-medium text-gray-900 text-right">Uptime</div>
                </div>
              </div>

              {/* Body */}
              <div className="divide-y divide-gray-200">
                {slotPerformanceData.map((slot) => (
                  <div
                    key={slot.position}
                    className="grid grid-cols-7 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-sm text-gray-900 font-medium">{slot.position}</div>
                    <div className="text-sm text-gray-600">{slot.timeRange}</div>
                    <div>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          slot.status === 'Booked'
                            ? 'bg-blue-100 text-blue-700'
                            : slot.status === 'Free'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {slot.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-900">{slot.client}</div>
                    <div className="text-sm text-gray-900 font-medium text-right">
                      {slot.impressions ? slot.impressions.toLocaleString() : '—'}
                    </div>
                    <div className="text-sm text-gray-900 font-medium text-right">
                      {slot.plays ? slot.plays.toLocaleString() : '—'}
                    </div>
                    <div className="text-sm text-gray-900 font-medium text-right">
                      {slot.uptime}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer note */}
            <p className="text-xs text-gray-600 mt-3">
              * Filler ads play when no client booking is active for that position
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 h-11 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-base font-normal"
          >
            Close
          </button>
          <button
            onClick={handleExportReport}
            className="flex items-center gap-2 px-4 h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors text-base font-normal"
          >
            <FileDown className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>
    </div>
  );
}