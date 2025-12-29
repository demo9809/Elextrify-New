import { useState, useMemo } from 'react';
import { 
  CheckCircle, 
  TrendingUp, 
  Users, 
  Eye, 
  Clock,
  AlertTriangle,
  Download,
  Filter,
  Calendar as CalendarIcon,
  BarChart3,
  Target,
  Zap
} from 'lucide-react';
import { PlaybackVerificationView } from './PlaybackVerificationView';
import { AudienceAnalyticsView } from './AudienceAnalyticsView';
import { PerformanceContextView } from './PerformanceContextView';

type ViewMode = 'overview' | 'verification' | 'audience' | 'context';

// Mock data structures
interface PoP {
  totalVerifiedHours: number;
  totalScheduledHours: number;
  verificationRate: number;
  totalImpressions: number;
  avgAttentionRate: number;
  engagementQuality: number; // 0-100 score
  billingDiscrepancy: number; // Hours not billable
}

interface RegionPerformance {
  region: string;
  verifiedHours: number;
  impressions: number;
  attentionRate: number;
  engagementScore: number;
}

const MOCK_POP_DATA: PoP = {
  totalVerifiedHours: 1248,
  totalScheduledHours: 1320,
  verificationRate: 94.5,
  totalImpressions: 342890,
  avgAttentionRate: 67.3,
  engagementQuality: 72,
  billingDiscrepancy: 72,
};

const MOCK_REGION_DATA: RegionPerformance[] = [
  { region: 'NYC Malls', verifiedHours: 456, impressions: 128450, attentionRate: 71.2, engagementScore: 76 },
  { region: 'LAX Airports', verifiedHours: 389, impressions: 98230, attentionRate: 68.5, engagementScore: 71 },
  { region: 'Chicago Transit', verifiedHours: 267, impressions: 76540, attentionRate: 63.8, engagementScore: 68 },
  { region: 'Miami Gyms', verifiedHours: 136, impressions: 39670, attentionRate: 58.4, engagementScore: 64 },
];

export function ProofOfPlayDashboard() {
  const [viewMode, setViewMode] = useState<ViewMode>('overview');
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('30d');

  const handleExport = (format: 'pdf' | 'csv') => {
    // Export functionality
    console.log(`Exporting as ${format}`);
  };

  if (viewMode === 'verification') {
    return <PlaybackVerificationView onBack={() => setViewMode('overview')} />;
  }

  if (viewMode === 'audience') {
    return <AudienceAnalyticsView onBack={() => setViewMode('overview')} />;
  }

  if (viewMode === 'context') {
    return <PerformanceContextView onBack={() => setViewMode('overview')} />;
  }

  return (
    <div className="h-full flex flex-col bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[#111827] mb-2">Proof of Play & Audience Analytics</h1>
            <p className="text-[#6B7280]">
              Playback verification, audience intelligence, and billing justification
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as any)}
              className="h-11 px-4 bg-white border border-[#E5E7EB] rounded-lg text-sm font-medium text-[#111827]"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            <button
              onClick={() => handleExport('pdf')}
              className="h-11 px-5 bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-[#F3F4F6] transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Export Report</span>
            </button>
          </div>
        </div>

        {/* Executive KPIs */}
        <div className="grid grid-cols-6 gap-4">
          <KPICard
            icon={CheckCircle}
            label="Verified Playback"
            value={`${MOCK_POP_DATA.verificationRate}%`}
            subtext={`${MOCK_POP_DATA.totalVerifiedHours}h of ${MOCK_POP_DATA.totalScheduledHours}h`}
            status="success"
          />
          <KPICard
            icon={Users}
            label="Total Impressions"
            value={MOCK_POP_DATA.totalImpressions.toLocaleString()}
            subtext="Verified views"
            status="info"
          />
          <KPICard
            icon={Eye}
            label="Attention Rate"
            value={`${MOCK_POP_DATA.avgAttentionRate}%`}
            subtext="Active viewing time"
            status="success"
          />
          <KPICard
            icon={Target}
            label="Engagement Quality"
            value={`${MOCK_POP_DATA.engagementQuality}/100`}
            subtext="Composite score"
            status="info"
          />
          <KPICard
            icon={AlertTriangle}
            label="Billing Discrepancy"
            value={`${MOCK_POP_DATA.billingDiscrepancy}h`}
            subtext="Non-billable hours"
            status="warning"
          />
          <KPICard
            icon={Zap}
            label="Billable Value"
            value={`$${((MOCK_POP_DATA.totalVerifiedHours * 95).toLocaleString())}`}
            subtext="Based on verified PoP"
            status="primary"
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-[#E5E7EB] px-8 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('overview')}
            className="px-4 h-9 bg-[#D9480F] text-white rounded-lg font-medium text-sm"
          >
            Overview
          </button>
          <button
            onClick={() => setViewMode('verification')}
            className="px-4 h-9 bg-[#F9FAFB] text-[#111827] rounded-lg hover:bg-[#F3F4F6] font-medium text-sm"
          >
            Playback Verification
          </button>
          <button
            onClick={() => setViewMode('audience')}
            className="px-4 h-9 bg-[#F9FAFB] text-[#111827] rounded-lg hover:bg-[#F3F4F6] font-medium text-sm"
          >
            Audience Analytics
          </button>
          <button
            onClick={() => setViewMode('context')}
            className="px-4 h-9 bg-[#F9FAFB] text-[#111827] rounded-lg hover:bg-[#F3F4F6] font-medium text-sm"
          >
            Performance Context
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Region Performance Comparison */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-[#111827]">Regional Performance</h2>
              <p className="text-sm text-[#6B7280]">Comparative analysis across deployment zones</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E5E7EB]">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-[#6B7280] uppercase">Region</th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-[#6B7280] uppercase">Verified Hours</th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-[#6B7280] uppercase">Impressions</th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-[#6B7280] uppercase">Attention Rate</th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-[#6B7280] uppercase">Engagement Score</th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-[#6B7280] uppercase">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_REGION_DATA.map((region, idx) => (
                    <tr key={idx} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors">
                      <td className="py-4 px-4">
                        <p className="text-sm font-medium text-[#111827]">{region.region}</p>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <p className="text-sm text-[#111827]">{region.verifiedHours}h</p>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <p className="text-sm text-[#111827]">{region.impressions.toLocaleString()}</p>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-20 h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#16A34A]"
                              style={{ width: `${region.attentionRate}%` }}
                            />
                          </div>
                          <p className="text-sm font-medium text-[#111827] w-12">{region.attentionRate}%</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <p className="text-sm font-semibold text-[#111827]">{region.engagementScore}/100</p>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          region.engagementScore >= 75
                            ? 'bg-[#D1FAE5] text-[#16A34A]'
                            : region.engagementScore >= 65
                            ? 'bg-[#FEF3C7] text-[#F59E0B]'
                            : 'bg-[#FEE2E2] text-[#DC2626]'
                        }`}>
                          {region.engagementScore >= 75 ? 'High' : region.engagementScore >= 65 ? 'Medium' : 'Low'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Key Insights Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Spend vs Attention */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
              <h3 className="text-sm font-semibold text-[#111827] mb-4">Spend vs Attention Delivered</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg">
                  <div>
                    <p className="text-xs text-[#6B7280] mb-1">Total Media Spend</p>
                    <p className="text-xl font-semibold text-[#111827]">$118,560</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#6B7280] mb-1">Cost per Impression</p>
                    <p className="text-xl font-semibold text-[#111827]">$0.35</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#FFF7ED] rounded-lg">
                  <div>
                    <p className="text-xs text-[#6B7280] mb-1">Attention Value Delivered</p>
                    <p className="text-xl font-semibold text-[#D9480F]">{MOCK_POP_DATA.avgAttentionRate}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#6B7280] mb-1">Effective CPM</p>
                    <p className="text-xl font-semibold text-[#D9480F]">$4.20</p>
                  </div>
                </div>
                <p className="text-xs text-[#6B7280]">
                  Clients paid for verified playback and received above-average attention rates, justifying premium pricing.
                </p>
              </div>
            </div>

            {/* Playback vs Engagement */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
              <h3 className="text-sm font-semibold text-[#111827] mb-4">Playback vs Engagement</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#6B7280]">Verified Playback Rate</p>
                  <p className="text-sm font-semibold text-[#111827]">{MOCK_POP_DATA.verificationRate}%</p>
                </div>
                <div className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#16A34A]"
                    style={{ width: `${MOCK_POP_DATA.verificationRate}%` }}
                  />
                </div>
                
                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-[#6B7280]">Audience Engagement Quality</p>
                  <p className="text-sm font-semibold text-[#111827]">{MOCK_POP_DATA.engagementQuality}/100</p>
                </div>
                <div className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#D9480F]"
                    style={{ width: `${MOCK_POP_DATA.engagementQuality}%` }}
                  />
                </div>

                <div className="mt-6 p-3 bg-[#DBEAFE] border border-[#93C5FD] rounded-lg">
                  <p className="text-xs text-[#1E40AF]">
                    Strong correlation: High playback verification supports high engagement metrics. No red flags detected.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Alert Flags */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
            <h3 className="text-sm font-semibold text-[#111827] mb-4">Performance Alerts</h3>
            <div className="space-y-3">
              <AlertItem
                type="warning"
                title="High Play, Low Attention Detected"
                description="Miami Gyms region: 136h verified playback but only 58.4% attention rate. Review creative quality."
                action="Review Analytics"
              />
              <AlertItem
                type="info"
                title="Billing Discrepancy Identified"
                description="72 hours of scheduled playback could not be verified due to hardware downtime. Excluded from billing."
                action="View Details"
              />
              <AlertItem
                type="success"
                title="Premium Performance Validated"
                description="NYC Malls: 71.2% attention rate exceeds benchmark. Client ROI justified."
                action="Download Report"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface KPICardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  subtext: string;
  status: 'success' | 'warning' | 'info' | 'primary';
}

function KPICard({ icon: Icon, label, value, subtext, status }: KPICardProps) {
  const getColors = () => {
    switch (status) {
      case 'success':
        return { bg: 'bg-[#D1FAE5]', text: 'text-[#16A34A]', border: 'border-[#16A34A]' };
      case 'warning':
        return { bg: 'bg-[#FEF3C7]', text: 'text-[#F59E0B]', border: 'border-[#F59E0B]' };
      case 'primary':
        return { bg: 'bg-[#FFF7ED]', text: 'text-[#D9480F]', border: 'border-[#D9480F]' };
      default:
        return { bg: 'bg-[#DBEAFE]', text: 'text-[#3B82F6]', border: 'border-[#3B82F6]' };
    }
  };

  const colors = getColors();

  return (
    <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4">
      <div className={`w-10 h-10 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center mb-3`}>
        <Icon className={`w-5 h-5 ${colors.text}`} />
      </div>
      <p className="text-xs text-[#6B7280] mb-1">{label}</p>
      <p className="text-xl font-semibold text-[#111827] mb-1">{value}</p>
      <p className="text-xs text-[#9CA3AF]">{subtext}</p>
    </div>
  );
}

interface AlertItemProps {
  type: 'success' | 'warning' | 'info';
  title: string;
  description: string;
  action: string;
}

function AlertItem({ type, title, description, action }: AlertItemProps) {
  const getColors = () => {
    switch (type) {
      case 'success':
        return { bg: 'bg-[#D1FAE5]', border: 'border-[#16A34A]', icon: 'text-[#16A34A]' };
      case 'warning':
        return { bg: 'bg-[#FEF3C7]', border: 'border-[#F59E0B]', icon: 'text-[#F59E0B]' };
      default:
        return { bg: 'bg-[#DBEAFE]', border: 'border-[#3B82F6]', icon: 'text-[#3B82F6]' };
    }
  };

  const colors = getColors();

  return (
    <div className={`p-4 ${colors.bg} border ${colors.border} rounded-lg flex items-start gap-3`}>
      <AlertTriangle className={`w-5 h-5 ${colors.icon} mt-0.5`} />
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-[#111827] mb-1">{title}</h4>
        <p className="text-sm text-[#6B7280] mb-3">{description}</p>
        <button className="text-sm font-medium text-[#D9480F] hover:underline">
          {action} →
        </button>
      </div>
    </div>
  );
}
