import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Play, 
  CheckCircle2, 
  Circle,
  ArrowRight,
  Monitor,
  Users,
  Image as ImageIcon,
  ListVideo,
  Calendar,
  Rocket,
  Book,
  MessageCircle,
  Video,
  Sparkles,
  TrendingUp,
  Zap,
  Clock
} from 'lucide-react';

interface TenantWelcomeDashboardProps {
  onNavigate: (path: string) => void;
}

export default function TenantWelcomeDashboard({ onNavigate }: TenantWelcomeDashboardProps) {
  const navigate = useNavigate();
  const { userRole } = useAuth();
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  // Only show trial banner for tenant users (not SaaS Admin)
  const showTrialBanner = userRole !== 'saas-admin' && userRole !== 'host-admin';

  const quickActions = [
    {
      id: 'kiosk',
      icon: Monitor,
      title: 'Add Your First Kiosk',
      description: 'Connect a display device',
      color: 'from-[#D9480F] to-[#F97316]',
      path: '/terminals',
      time: '2 min',
      popular: true
    },
    {
      id: 'client',
      icon: Users,
      title: 'Create a Client',
      description: 'Add your first customer',
      color: 'from-[#3B82F6] to-[#2563EB]',
      path: '/customers',
      time: '1 min'
    },
    {
      id: 'media',
      icon: ImageIcon,
      title: 'Upload Media',
      description: 'Add images & videos',
      color: 'from-[#8B5CF6] to-[#7C3AED]',
      path: '/media',
      time: '3 min'
    },
    {
      id: 'playlist',
      icon: ListVideo,
      title: 'Build a Playlist',
      description: 'Create content sequence',
      color: 'from-[#EC4899] to-[#DB2777]',
      path: '/playlists',
      time: '5 min'
    },
    {
      id: 'campaign',
      icon: Calendar,
      title: 'Launch Campaign',
      description: 'Schedule your content',
      color: 'from-[#10B981] to-[#059669]',
      path: '/campaigns',
      time: '4 min',
      popular: true
    }
  ];

  const learningResources = [
    {
      icon: Video,
      title: 'Platform Walkthrough',
      description: '5-minute video tour',
      duration: '5 min',
      type: 'video'
    },
    {
      icon: Book,
      title: 'Quick Start Guide',
      description: 'Step-by-step documentation',
      duration: '10 min read',
      type: 'docs'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat Support',
      description: 'Get help from our team',
      duration: 'Available now',
      type: 'support'
    }
  ];

  const stats = [
    { label: 'Kiosks', value: '0', icon: Monitor, target: 'Add your first' },
    { label: 'Campaigns', value: '0', icon: Rocket, target: 'Launch one' },
    { label: 'Playlists', value: '0', icon: ListVideo, target: 'Create one' }
  ];

  const progressPercentage = (completedSteps.length / quickActions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9FAFB] via-white to-[#FFF7ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
        {/* Hero Section */}
        <div className="relative mb-6 sm:mb-8 md:mb-12">
          {/* Background Decoration - Hide on mobile */}
          <div className="hidden lg:block absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-[#D9480F]/10 to-[#F97316]/5 rounded-full blur-3xl" />
          <div className="hidden lg:block absolute -bottom-10 -left-10 w-80 h-80 bg-gradient-to-br from-[#3B82F6]/10 to-[#8B5CF6]/5 rounded-full blur-3xl" />
          
          <div className="relative bg-white rounded-2xl md:rounded-3xl border border-[#E5E7EB] overflow-hidden">
            {/* Trial Banner - Only for Tenant Users */}
            {showTrialBanner && (
              <div className="bg-gradient-to-r from-[#FEF2F2] to-[#FFF7ED] border-b border-[#FEE2E2] px-4 sm:px-6 md:px-8 py-3 md:py-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#D9480F] to-[#F97316] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="text-xs sm:text-sm font-semibold text-[#111827]">You're on the Free Trial</p>
                        <span className="px-2 py-0.5 bg-[#D9480F] text-white text-xs font-medium rounded-full">
                          30 days remaining
                        </span>
                      </div>
                      <p className="text-xs text-[#6B7280]">
                        Trial Kiosk Limit: <span className="font-semibold text-[#111827]">0 of 1 Synced</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button 
                      onClick={() => navigate('/billing')}
                      className="flex-1 sm:flex-none px-4 sm:px-5 h-10 bg-[#D9480F] text-white rounded-lg hover:bg-[#C43F0D] transition-colors font-medium text-sm flex items-center justify-center gap-2"
                    >
                      <span className="hidden sm:inline">Upgrade Your Plan</span>
                      <span className="sm:hidden">Upgrade</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => navigate('/billing')}
                      className="flex-1 sm:flex-none px-4 sm:px-5 h-10 bg-white border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-[#F9FAFB] transition-colors font-medium text-sm"
                    >
                      <span className="hidden sm:inline">Compare Plans</span>
                      <span className="sm:hidden">Plans</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Hero Content */}
            <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                {/* Left Column */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FFF7ED] border border-[#FDBA74] rounded-full mb-6">
                    <Zap className="w-4 h-4 text-[#D9480F]" />
                    <span className="text-sm font-medium text-[#D9480F]">Get Started in Minutes</span>
                  </div>
                  
                  <h1 className="text-[#111827] mb-4">
                    Welcome to Your Digital Signage Platform
                  </h1>
                  <p className="text-[#6B7280] text-lg mb-8">
                    Transform how you display content across all your screens. Get your first campaign live in just a few clicks.
                  </p>

                  {/* Progress Section */}
                  <div className="bg-gradient-to-br from-[#F9FAFB] to-white rounded-2xl border border-[#E5E7EB] p-6 mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm font-semibold text-[#111827] mb-1">Your Progress</p>
                        <p className="text-xs text-[#6B7280]">
                          {completedSteps.length} of {quickActions.length} steps completed
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#D9480F]">{Math.round(progressPercentage)}%</p>
                        <p className="text-xs text-[#6B7280]">Complete</p>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="h-3 bg-[#E5E7EB] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#D9480F] to-[#F97316] rounded-full transition-all duration-500 ease-out relative"
                        style={{ width: `${progressPercentage}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    {stats.map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <div key={index} className="bg-gradient-to-br from-[#F9FAFB] to-white rounded-xl border border-[#E5E7EB] p-4 text-center">
                          <Icon className="w-6 h-6 text-[#6B7280] mx-auto mb-2" />
                          <p className="text-2xl font-bold text-[#111827] mb-1">{stat.value}</p>
                          <p className="text-xs text-[#6B7280] mb-1">{stat.label}</p>
                          <p className="text-xs text-[#D9480F] font-medium">{stat.target}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column - Quick Actions */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-[#111827] font-semibold mb-1">Quick Actions</h3>
                      <p className="text-sm text-[#6B7280]">Start with these essential steps</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {quickActions.map((action, index) => {
                      const Icon = action.icon;
                      const isCompleted = completedSteps.includes(action.id);
                      
                      return (
                        <button
                          key={action.id}
                          onClick={() => navigate(action.path)}
                          className="w-full group relative bg-white hover:bg-gradient-to-br hover:from-[#F9FAFB] hover:to-white border-2 border-[#E5E7EB] hover:border-[#D9480F] rounded-xl p-4 transition-all duration-200 text-left"
                        >
                          <div className="flex items-center gap-4">
                            {/* Icon */}
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center flex-shrink-0`}>
                              <Icon className="w-6 h-6 text-white" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-[#111827] group-hover:text-[#D9480F] transition-colors">
                                  {action.title}
                                </h4>
                                {action.popular && (
                                  <span className="px-2 py-0.5 bg-[#FFF7ED] text-[#D9480F] text-xs font-medium rounded">
                                    Popular
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-[#6B7280]">{action.description}</p>
                            </div>

                            {/* Time & Status */}
                            <div className="flex items-center gap-3 flex-shrink-0">
                              <div className="flex items-center gap-1 text-xs text-[#6B7280]">
                                <Clock className="w-3.5 h-3.5" />
                                {action.time}
                              </div>
                              {isCompleted ? (
                                <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                              ) : (
                                <Circle className="w-5 h-5 text-[#E5E7EB] group-hover:text-[#D9480F]" />
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Primary CTA */}
                  <button
                    onClick={() => navigate('/campaigns')}
                    className="w-full mt-6 h-14 bg-gradient-to-r from-[#D9480F] to-[#F97316] text-white rounded-xl hover:shadow-lg hover:shadow-[#D9480F]/20 transition-all duration-200 font-semibold flex items-center justify-center gap-2"
                  >
                    <Rocket className="w-5 h-5" />
                    Launch Your First Campaign
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Resources */}
        <div className="mb-8">
          <h3 className="text-[#111827] font-semibold mb-6">Learning Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {learningResources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <button
                  key={index}
                  className="bg-white border border-[#E5E7EB] rounded-xl p-6 hover:border-[#D9480F] hover:shadow-md transition-all text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#F9FAFB] to-white rounded-xl border border-[#E5E7EB] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-[#D9480F]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#111827] mb-1">{resource.title}</h4>
                      <p className="text-sm text-[#6B7280] mb-2">{resource.description}</p>
                      <p className="text-xs text-[#D9480F] font-medium">{resource.duration}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
