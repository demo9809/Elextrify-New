import { useState } from 'react';
import { ChevronLeft, AlertTriangle, TrendingUp, TrendingDown, Download } from 'lucide-react';

interface PerformanceContext {
  campaignName: string;
  clientName: string;
  totalSpend: number;
  verifiedHours: number;
  impressions: number;
  attentionRate: number;
  cpm: number; // Cost per thousand impressions
  cpa: number; // Cost per attention (verified attention hour)
  roi: 'positive' | 'neutral' | 'negative';
  flags: string[];
  recommendation: string;
}

const MOCK_CONTEXT_DATA: PerformanceContext[] = [
  {
    campaignName: 'Holiday Sale 2025',
    clientName: 'Acme Corporation',
    totalSpend: 43200,
    verifiedHours: 456,
    impressions: 128450,
    attentionRate: 71.2,
    cpm: 4.2,
    cpa: 94.7,
    roi: 'positive',
    flags: [],
    recommendation: 'Excellent performance. High attention rate justifies premium pricing. Consider extending campaign duration.',
  },
  {
    campaignName: 'Morning Coffee Special',
    clientName: 'Brew Coffee Co.',
    totalSpend: 29250,
    verifiedHours: 389,
    impressions: 98230,
    attentionRate: 68.5,
    cpm: 3.8,
    cpa: 75.2,
    roi: 'positive',
    flags: [],
    recommendation: 'Good performance with efficient CPM. Attention rate meets expectations for airport environment.',
  },
  {
    campaignName: 'Gym Membership Promo',
    clientName: 'FitLife Gym',
    totalSpend: 10200,
    verifiedHours: 136,
    impressions: 39670,
    attentionRate: 58.4,
    cpm: 5.1,
    cpa: 75.0,
    roi: 'neutral',
    flags: ['High play, low attention', 'Below-average engagement'],
    recommendation: 'Consider creative optimization. Low attention rate suggests content may not resonate with gym environment audience.',
  },
];

interface PerformanceContextViewProps {
  onBack: () => void;
}

export function PerformanceContextView({ onBack }: PerformanceContextViewProps) {
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

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#111827] mb-2">Performance Context</h1>
            <p className="text-[#6B7280]">
              Spend-to-value analysis and ROI justification for client reporting
            </p>
          </div>
          <button className="h-11 px-5 bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-[#F3F4F6] transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export Client Report</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="space-y-6 max-w-6xl mx-auto">
          {/* Performance Cards */}
          {MOCK_CONTEXT_DATA.map((context, idx) => (
            <div key={idx} className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
              {/* Header */}
              <div className="bg-[#F9FAFB] border-b border-[#E5E7EB] p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-[#111827] mb-1">{context.campaignName}</h3>
                    <p className="text-sm text-[#6B7280]">{context.clientName}</p>
                  </div>
                  <ROIBadge roi={context.roi} />
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="p-6 border-b border-[#E5E7EB]">
                <div className="grid grid-cols-4 gap-6">
                  <MetricBox
                    label="Total Spend"
                    value={`$${context.totalSpend.toLocaleString()}`}
                    subtext="Billed amount"
                  />
                  <MetricBox
                    label="Verified Delivery"
                    value={`${context.verifiedHours}h`}
                    subtext="Hardware-confirmed playback"
                  />
                  <MetricBox
                    label="Impressions"
                    value={context.impressions.toLocaleString()}
                    subtext="Verified views"
                  />
                  <MetricBox
                    label="Attention Rate"
                    value={`${context.attentionRate}%`}
                    subtext="Active viewing percentage"
                  />
                </div>
              </div>

              {/* Cost Analysis */}
              <div className="p-6 border-b border-[#E5E7EB]">
                <h4 className="text-sm font-semibold text-[#111827] mb-4">Cost Efficiency Analysis</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg">
                      <div>
                        <p className="text-xs text-[#6B7280] mb-1">CPM (Cost Per Thousand Impressions)</p>
                        <p className="text-2xl font-semibold text-[#111827]">${context.cpm}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        context.cpm < 4.5 ? 'bg-[#D1FAE5] text-[#16A34A]' : 'bg-[#FEF3C7] text-[#F59E0B]'
                      }`}>
                        {context.cpm < 4.5 ? 'Efficient' : 'Standard'}
                      </div>
                    </div>
                    <p className="text-xs text-[#6B7280]">
                      Industry benchmark for premium DOOH: $4.00-$6.00
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg">
                      <div>
                        <p className="text-xs text-[#6B7280] mb-1">CPA (Cost Per Attention Hour)</p>
                        <p className="text-2xl font-semibold text-[#111827]">${context.cpa}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        context.cpa < 100 ? 'bg-[#D1FAE5] text-[#16A34A]' : 'bg-[#FEF3C7] text-[#F59E0B]'
                      }`}>
                        {context.cpa < 100 ? 'High Value' : 'Standard'}
                      </div>
                    </div>
                    <p className="text-xs text-[#6B7280]">
                      Proprietary metric: Total spend / (Verified hours × Attention rate)
                    </p>
                  </div>
                </div>
              </div>

              {/* Flags & Recommendations */}
              <div className="p-6">
                {context.flags.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-[#111827] mb-3">Performance Flags</h4>
                    <div className="space-y-2">
                      {context.flags.map((flag, i) => (
                        <div key={i} className="flex items-center gap-2 p-3 bg-[#FEF3C7] border border-[#F59E0B] rounded-lg">
                          <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
                          <p className="text-sm text-[#111827]">{flag}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-4 bg-[#DBEAFE] border border-[#93C5FD] rounded-lg">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-[#3B82F6] mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-[#111827] mb-1">Recommendation</p>
                      <p className="text-sm text-[#6B7280]">{context.recommendation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Summary Insights */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
            <h3 className="text-lg font-semibold text-[#111827] mb-4">Portfolio Summary</h3>
            
            <div className="grid grid-cols-3 gap-6 mb-6">
              <SummaryCard
                label="Total Portfolio Spend"
                value="$82,650"
                trend="up"
                trendValue="+12.5%"
              />
              <SummaryCard
                label="Avg CPM Across Campaigns"
                value="$4.37"
                trend="down"
                trendValue="-3.2%"
              />
              <SummaryCard
                label="Avg Attention Rate"
                value="66.0%"
                trend="up"
                trendValue="+5.8%"
              />
            </div>

            <div className="p-4 bg-[#D1FAE5] border border-[#16A34A] rounded-lg">
              <p className="text-sm text-[#111827]">
                <strong>Portfolio Health:</strong> Overall positive ROI across campaigns. 
                2 out of 3 campaigns exceeding industry benchmarks for attention rate. 
                One campaign flagged for creative optimization. Total billable value delivered: $82,650 with 94.5% playback verification rate.
              </p>
            </div>
          </div>

          {/* Client-Ready Export Preview */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
            <h3 className="text-lg font-semibold text-[#111827] mb-4">Client Report Preview</h3>
            <div className="space-y-4">
              <ReportSection
                title="Executive Summary"
                content="Your campaigns delivered 266,350 verified impressions across 981 hours of verified playback. Average attention rate of 66% exceeds industry standard by 18%. All billing aligned with actual hardware-verified delivery."
              />
              <ReportSection
                title="Value Delivered"
                content="Premium attention quality: 66% of viewers actively engaged with content. This translates to effective brand exposure significantly above passive billboard advertising. ROI justified through ML-verified audience behavior data."
              />
              <ReportSection
                title="Optimization Opportunities"
                content="Gym environment campaign shows potential for creative refresh. Consider A/B testing alternate messaging for lower-engagement venue types. High-performing mall campaigns can be scaled."
              />
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl">
            <p className="text-xs text-[#6B7280]">
              <strong>Report Methodology:</strong> All metrics derived from hardware-verified playback logs and ML-processed audience analytics. 
              CPM and CPA calculations based on verified delivery only. Attention rates measured using proprietary computer vision models. 
              Benchmark comparisons reference 2024 DOOH industry averages. This report serves as billing justification and performance documentation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ROIBadge({ roi }: { roi: 'positive' | 'neutral' | 'negative' }) {
  const configs = {
    positive: { bg: 'bg-[#D1FAE5]', text: 'text-[#16A34A]', label: 'Positive ROI', icon: TrendingUp },
    neutral: { bg: 'bg-[#FEF3C7]', text: 'text-[#F59E0B]', label: 'Neutral ROI', icon: TrendingUp },
    negative: { bg: 'bg-[#FEE2E2]', text: 'text-[#DC2626]', label: 'Needs Review', icon: TrendingDown },
  };

  const config = configs[roi];
  const Icon = config.icon;

  return (
    <div className={`flex items-center gap-2 px-4 py-2 ${config.bg} rounded-lg`}>
      <Icon className={`w-4 h-4 ${config.text}`} />
      <span className={`text-sm font-semibold ${config.text}`}>{config.label}</span>
    </div>
  );
}

function MetricBox({ label, value, subtext }: any) {
  return (
    <div>
      <p className="text-xs text-[#6B7280] mb-2">{label}</p>
      <p className="text-2xl font-semibold text-[#111827] mb-1">{value}</p>
      <p className="text-xs text-[#9CA3AF]">{subtext}</p>
    </div>
  );
}

function SummaryCard({ label, value, trend, trendValue }: any) {
  return (
    <div className="p-4 bg-[#F9FAFB] rounded-lg">
      <p className="text-xs text-[#6B7280] mb-2">{label}</p>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-semibold text-[#111827]">{value}</p>
        <div className={`flex items-center gap-1 text-xs font-medium ${
          trend === 'up' ? 'text-[#16A34A]' : 'text-[#DC2626]'
        }`}>
          {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {trendValue}
        </div>
      </div>
    </div>
  );
}

function ReportSection({ title, content }: { title: string; content: string }) {
  return (
    <div className="p-4 bg-[#F9FAFB] rounded-lg">
      <h4 className="text-sm font-semibold text-[#111827] mb-2">{title}</h4>
      <p className="text-sm text-[#6B7280]">{content}</p>
    </div>
  );
}
