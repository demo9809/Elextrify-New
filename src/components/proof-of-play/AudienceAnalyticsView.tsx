import { useState } from 'react';
import { ChevronLeft, Users, Eye, Clock, TrendingUp, Download, Search, BarChart3 } from 'lucide-react';

interface AudienceMetrics {
  id: string;
  campaignName: string;
  clientName: string;
  region: string;
  footfall: number; // Total people passing
  impressions: number; // People who looked
  avgAttentionSpan: number; // Seconds
  attentionRate: number; // Percentage
  peakAttentionTime: string; // Timestamp
  dropOffRate: number; // Percentage
  engagementScore: number; // 0-100
}

const MOCK_AUDIENCE_DATA: AudienceMetrics[] = [
  {
    id: 'a1',
    campaignName: 'Holiday Sale 2025',
    clientName: 'Acme Corporation',
    region: 'NYC Malls',
    footfall: 45280,
    impressions: 32450,
    avgAttentionSpan: 8.4,
    attentionRate: 71.7,
    peakAttentionTime: '00:03',
    dropOffRate: 23.5,
    engagementScore: 78,
  },
  {
    id: 'a2',
    campaignName: 'Morning Coffee Special',
    clientName: 'Brew Coffee Co.',
    region: 'LAX Airports',
    footfall: 38920,
    impressions: 26780,
    avgAttentionSpan: 6.2,
    attentionRate: 68.8,
    peakAttentionTime: '00:02',
    dropOffRate: 31.2,
    engagementScore: 71,
  },
  {
    id: 'a3',
    campaignName: 'Gym Membership Promo',
    clientName: 'FitLife Gym',
    region: 'Miami Gyms',
    footfall: 12340,
    impressions: 7205,
    avgAttentionSpan: 4.8,
    attentionRate: 58.4,
    peakAttentionTime: '00:01',
    dropOffRate: 41.6,
    engagementScore: 64,
  },
];

interface AudienceAnalyticsViewProps {
  onBack: () => void;
}

export function AudienceAnalyticsView({ onBack }: AudienceAnalyticsViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);

  const filteredData = MOCK_AUDIENCE_DATA.filter(record => {
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        record.campaignName.toLowerCase().includes(search) ||
        record.clientName.toLowerCase().includes(search) ||
        record.region.toLowerCase().includes(search)
      );
    }
    return true;
  });

  const totals = {
    footfall: MOCK_AUDIENCE_DATA.reduce((sum, r) => sum + r.footfall, 0),
    impressions: MOCK_AUDIENCE_DATA.reduce((sum, r) => sum + r.impressions, 0),
    avgAttention: (MOCK_AUDIENCE_DATA.reduce((sum, r) => sum + r.avgAttentionSpan, 0) / MOCK_AUDIENCE_DATA.length).toFixed(1),
    avgEngagement: Math.round(MOCK_AUDIENCE_DATA.reduce((sum, r) => sum + r.engagementScore, 0) / MOCK_AUDIENCE_DATA.length),
  };

  return (
    <div className="h-full flex flex-col bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-8 py-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#111827] mb-4"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back to Overview</span>
        </button>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-[#111827] mb-2">Audience Analytics</h1>
            <p className="text-[#6B7280]">
              ML-powered audience behavior and engagement intelligence
            </p>
          </div>
          <button className="h-11 px-5 bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-[#F3F4F6] transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export Analytics Report</span>
          </button>
        </div>

        {/* Aggregate Metrics */}
        <div className="grid grid-cols-4 gap-4">
          <MetricCard
            icon={Users}
            label="Total Footfall"
            value={totals.footfall.toLocaleString()}
            subtext="People within detection range"
            color="text-[#3B82F6]"
          />
          <MetricCard
            icon={Eye}
            label="Total Impressions"
            value={totals.impressions.toLocaleString()}
            subtext="Verified views"
            color="text-[#16A34A]"
          />
          <MetricCard
            icon={Clock}
            label="Avg Attention Span"
            value={`${totals.avgAttention}s`}
            subtext="Active viewing time"
            color="text-[#F59E0B]"
          />
          <MetricCard
            icon={TrendingUp}
            label="Avg Engagement"
            value={`${totals.avgEngagement}/100`}
            subtext="Composite score"
            color="text-[#D9480F]"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-[#E5E7EB] px-8 py-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search campaigns, clients, regions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-9 pl-10 pr-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="space-y-6">
          {/* Metrics Comparison Table */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
            <div className="p-6 border-b border-[#E5E7EB]">
              <h2 className="text-lg font-semibold text-[#111827]">Campaign Audience Performance</h2>
              <p className="text-sm text-[#6B7280] mt-1">
                Comparative analysis of audience behavior across campaigns
              </p>
            </div>

            <table className="w-full">
              <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-[#6B7280] uppercase">Campaign</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-[#6B7280] uppercase">Client</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-[#6B7280] uppercase">Footfall</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-[#6B7280] uppercase">Impressions</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-[#6B7280] uppercase">Attention Rate</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-[#6B7280] uppercase">Avg Attention</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-[#6B7280] uppercase">Engagement</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-[#6B7280] uppercase">Quality</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((record) => (
                  <tr 
                    key={record.id} 
                    className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors cursor-pointer"
                    onClick={() => setSelectedCampaign(record.id)}
                  >
                    <td className="py-4 px-4">
                      <p className="text-sm font-medium text-[#111827]">{record.campaignName}</p>
                      <p className="text-xs text-[#9CA3AF]">{record.region}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-[#6B7280]">{record.clientName}</p>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <p className="text-sm text-[#111827]">{record.footfall.toLocaleString()}</p>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <p className="text-sm font-medium text-[#111827]">{record.impressions.toLocaleString()}</p>
                      <p className="text-xs text-[#9CA3AF]">
                        {((record.impressions / record.footfall) * 100).toFixed(1)}% conversion
                      </p>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#16A34A]"
                            style={{ width: `${record.attentionRate}%` }}
                          />
                        </div>
                        <p className="text-sm font-medium text-[#111827] w-12">{record.attentionRate}%</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <p className="text-sm font-medium text-[#111827]">{record.avgAttentionSpan}s</p>
                      <p className="text-xs text-[#9CA3AF]">Peak: {record.peakAttentionTime}</p>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <p className="text-sm font-semibold text-[#111827]">{record.engagementScore}/100</p>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <QualityBadge score={record.engagementScore} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Behavioral Insights */}
          <div className="grid grid-cols-2 gap-6">
            {/* Attention Funnel */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
              <h3 className="text-sm font-semibold text-[#111827] mb-4">Attention Funnel</h3>
              <div className="space-y-4">
                <FunnelStage
                  label="Footfall (Passersby)"
                  value={totals.footfall}
                  percentage={100}
                  color="bg-[#DBEAFE]"
                />
                <FunnelStage
                  label="Impressions (Viewers)"
                  value={totals.impressions}
                  percentage={(totals.impressions / totals.footfall) * 100}
                  color="bg-[#93C5FD]"
                />
                <FunnelStage
                  label="Active Attention"
                  value={Math.round(totals.impressions * 0.67)}
                  percentage={67}
                  color="bg-[#3B82F6]"
                />
              </div>
              <p className="text-xs text-[#6B7280] mt-4">
                Conversion from passive passersby to active viewers demonstrates creative effectiveness
              </p>
            </div>

            {/* Engagement Breakdown */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
              <h3 className="text-sm font-semibold text-[#111827] mb-4">Engagement Quality Distribution</h3>
              <div className="space-y-3">
                <EngagementBar label="High Engagement (75-100)" value={33} color="bg-[#16A34A]" />
                <EngagementBar label="Medium Engagement (65-74)" value={34} color="bg-[#F59E0B]" />
                <EngagementBar label="Low Engagement (0-64)" value={33} color="bg-[#DC2626]" />
              </div>
              <p className="text-xs text-[#6B7280] mt-4">
                Majority of campaigns achieving medium to high engagement quality scores
              </p>
            </div>
          </div>

          {/* Key Insights */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
            <h3 className="text-sm font-semibold text-[#111827] mb-4">Key Behavioral Insights</h3>
            <div className="space-y-4">
              <InsightCard
                title="Peak Attention Timing"
                description="Most campaigns achieve peak viewer attention within the first 2-3 seconds. Creative hooks are effective."
                metric="Avg: 2.3s"
                status="success"
              />
              <InsightCard
                title="Drop-off Analysis"
                description="Miami Gyms region shows higher drop-off rate (41.6%) compared to NYC Malls (23.5%). Consider creative optimization."
                metric="18.1% variance"
                status="warning"
              />
              <InsightCard
                title="Attention vs Impressions"
                description="Strong correlation between impression volume and attention rates. Higher visibility environments deliver better engagement."
                metric="0.89 correlation"
                status="info"
              />
            </div>
          </div>

          {/* Methodology Disclaimer */}
          <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl">
            <h4 className="text-sm font-semibold text-[#111827] mb-2">Measurement Methodology</h4>
            <p className="text-sm text-[#6B7280] mb-3">
              Audience analytics are derived from proprietary ML models processing camera and environmental sensor data. 
              Metrics represent aggregated, validated insights and not raw sensor outputs.
            </p>
            <ul className="text-sm text-[#6B7280] space-y-1 list-disc list-inside">
              <li><strong>Footfall:</strong> Total unique individuals detected within 5-meter range of display</li>
              <li><strong>Impressions:</strong> Individuals with verified gaze direction toward screen for minimum 1 second</li>
              <li><strong>Attention Span:</strong> Continuous viewing duration, excluding brief glances</li>
              <li><strong>Engagement Score:</strong> Composite metric combining attention rate, duration, and behavioral indicators</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, subtext, color }: any) {
  return (
    <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4">
      <div className={`w-10 h-10 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center mb-3 ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-xs text-[#6B7280] mb-1">{label}</p>
      <p className="text-xl font-semibold text-[#111827] mb-1">{value}</p>
      <p className="text-xs text-[#9CA3AF]">{subtext}</p>
    </div>
  );
}

function QualityBadge({ score }: { score: number }) {
  const getConfig = () => {
    if (score >= 75) return { bg: 'bg-[#D1FAE5]', text: 'text-[#16A34A]', label: 'High' };
    if (score >= 65) return { bg: 'bg-[#FEF3C7]', text: 'text-[#F59E0B]', label: 'Medium' };
    return { bg: 'bg-[#FEE2E2]', text: 'text-[#DC2626]', label: 'Low' };
  };

  const config = getConfig();

  return (
    <span className={`inline-block px-3 py-1 ${config.bg} ${config.text} rounded-full text-xs font-medium`}>
      {config.label}
    </span>
  );
}

function FunnelStage({ label, value, percentage, color }: any) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-[#6B7280]">{label}</p>
        <p className="text-sm font-semibold text-[#111827]">{value.toLocaleString()}</p>
      </div>
      <div className="h-8 rounded-lg overflow-hidden border border-[#E5E7EB]">
        <div
          className={`h-full ${color} flex items-center justify-center`}
          style={{ width: `${percentage}%` }}
        >
          <span className="text-xs font-medium text-[#111827]">{percentage.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
}

function EngagementBar({ label, value, color }: any) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <p className="text-sm text-[#6B7280]">{label}</p>
        <p className="text-sm font-medium text-[#111827]">{value}%</p>
      </div>
      <div className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function InsightCard({ title, description, metric, status }: any) {
  const colors = {
    success: 'bg-[#D1FAE5] border-[#16A34A] text-[#16A34A]',
    warning: 'bg-[#FEF3C7] border-[#F59E0B] text-[#F59E0B]',
    info: 'bg-[#DBEAFE] border-[#3B82F6] text-[#3B82F6]',
  };

  return (
    <div className={`p-4 ${colors[status as keyof typeof colors]} border rounded-lg`}>
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm font-semibold text-[#111827]">{title}</h4>
        <span className="text-sm font-semibold">{metric}</span>
      </div>
      <p className="text-sm text-[#6B7280]">{description}</p>
    </div>
  );
}
