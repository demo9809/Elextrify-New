import { X, TrendingUp, Play, Clock, Activity } from 'lucide-react';
import { Machine, SlotApplicability } from '../../types/adSlotting';

interface MachineAnalyticsModalProps {
  machine: Machine;
  onClose: () => void;
}

export default function MachineAnalyticsModal({ machine, onClose }: MachineAnalyticsModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-gray-900">Analytics: {machine.name}</h2>
            <p className="text-sm text-gray-600 mt-1">
              {machine.location.city} • {machine.location.venue}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            {/* Slot Type Toggle */}
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-[#D9480F] text-white rounded-lg text-sm font-medium">
                Peak Slots
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
                Normal Slots
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
                All Slots
              </button>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Play className="w-4 h-4" />
                  <span>Total Impressions</span>
                </div>
                <div className="text-2xl font-semibold text-gray-900">2.4M</div>
                <div className="text-xs text-green-600 mt-1">+12.5% vs last week</div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Activity className="w-4 h-4" />
                  <span>Play Count</span>
                </div>
                <div className="text-2xl font-semibold text-gray-900">145K</div>
                <div className="text-xs text-green-600 mt-1">+8.3% vs last week</div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Clock className="w-4 h-4" />
                  <span>Uptime</span>
                </div>
                <div className="text-2xl font-semibold text-gray-900">98.7%</div>
                <div className="text-xs text-gray-500 mt-1">167h 45m this week</div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Utilization</span>
                </div>
                <div className="text-2xl font-semibold text-gray-900">87.5%</div>
                <div className="text-xs text-green-600 mt-1">+5.2% vs last week</div>
              </div>
            </div>

            {/* Subslot Performance Table */}
            <div>
              <h3 className="text-gray-900 mb-3">Subslot Performance (Peak)</h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Position</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Time Range</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Client</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-600">Impressions</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-600">Plays</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-600">Uptime</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">1</td>
                      <td className="px-4 py-3 text-sm text-gray-600">0:00 – 0:10</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                          Booked
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">Nike Sports</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">142,560</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">8,520</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">99.2%</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">2</td>
                      <td className="px-4 py-3 text-sm text-gray-600">0:10 – 0:20</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                          Booked
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">Coca-Cola</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">138,240</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">8,290</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">98.5%</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">3</td>
                      <td className="px-4 py-3 text-sm text-gray-600">0:20 – 0:30</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                          Free
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-400">—</td>
                      <td className="px-4 py-3 text-sm text-gray-400 text-right">—</td>
                      <td className="px-4 py-3 text-sm text-gray-400 text-right">—</td>
                      <td className="px-4 py-3 text-sm text-gray-400 text-right">—</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">4</td>
                      <td className="px-4 py-3 text-sm text-gray-600">0:30 – 0:40</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                          Booked
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">Samsung</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">135,890</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">8,150</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">97.8%</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">5</td>
                      <td className="px-4 py-3 text-sm text-gray-600">0:40 – 0:50</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-700">
                          Filler
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">House Ad</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">128,450</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">7,705</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">99.5%</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">6</td>
                      <td className="px-4 py-3 text-sm text-gray-600">0:50 – 1:00</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-700">
                          Filler
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">House Ad</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">129,120</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">7,745</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">99.6%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                * Filler ads play when no client booking is active for that position
              </div>
            </div>

            {/* Time-based Performance Chart */}
            <div>
              <h3 className="text-gray-900 mb-3">Hourly Performance (Last 7 Days)</h3>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-end justify-between h-48 gap-2">
                  {Array.from({ length: 24 }).map((_, i) => {
                    const height = Math.random() * 100 + 20;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full bg-[#D9480F] rounded-t hover:bg-[#C03F0E] transition-colors cursor-pointer"
                          style={{ height: `${height}%` }}
                          title={`${i}:00 - ${(i + 1) % 24}:00\n${Math.floor(height * 1000)} impressions`}
                        />
                        {i % 3 === 0 && (
                          <span className="text-xs text-gray-500">{i}h</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 h-10 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Close
          </button>
          <button className="px-4 h-10 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors text-sm font-medium">
            Export Report
          </button>
        </div>
      </div>
    </div>
  );
}
