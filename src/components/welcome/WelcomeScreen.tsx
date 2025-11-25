import { useState } from 'react';
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

interface WelcomeScreenProps {
  onNavigate: (path: string) => void;
}

export function WelcomeScreen({ onNavigate }: WelcomeScreenProps) {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const quickActions = [
    {
      id: 'kiosk',
      icon: Monitor,
      title: 'Add Your First Kiosk',
      description: 'Connect a display device',
      color: 'from-[#D9480F] to-[#F97316]',
      path: '/kiosks',
      time: '2 min',
      popular: true
    },
    {
      id: 'client',
      icon: Users,
      title: 'Create a Client',
      description: 'Add your first customer',
      color: 'from-[#3B82F6] to-[#2563EB]',
      path: '/clients',
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
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Hero Section */}
        <div className="relative mb-12">
          {/* Background Decoration */}
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-[#D9480F]/10 to-[#F97316]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-gradient-to-br from-[#3B82F6]/10 to-[#8B5CF6]/5 rounded-full blur-3xl" />
          
          <div className="relative bg-white rounded-3xl shadow-xl border border-[#E5E7EB] overflow-hidden">
            {/* Trial Banner */}
            <div className="bg-gradient-to-r from-[#FEF2F2] to-[#FFF7ED] border-b border-[#FEE2E2] px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D9480F] to-[#F97316] rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-[#111827]">You're on the Free Trial</p>
                      <span className="px-2 py-0.5 bg-[#D9480F] text-white text-xs font-medium rounded-full">
                        30 days remaining
                      </span>
                    </div>
                    <p className="text-xs text-[#6B7280]">
                      Trial Kiosk Limit: <span className="font-semibold text-[#111827]">0 of 1 Synced</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="px-5 h-10 bg-[#D9480F] text-white rounded-lg hover:bg-[#C43F0D] transition-colors font-medium text-sm flex items-center gap-2">
                    Upgrade Your Plan
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button className="px-5 h-10 bg-white border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-[#F9FAFB] transition-colors font-medium text-sm">
                    Compare Plans
                  </button>
                </div>
              </div>
            </div>

            {/* Hero Content */}
            <div className="px-8 py-12">
              <div className="grid grid-cols-2 gap-12">
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
                    {stats.map((stat, index) => (
                      <div key={index} className="bg-white border border-[#E5E7EB] rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <stat.icon className="w-4 h-4 text-[#6B7280]" />
                          <p className="text-xs text-[#6B7280]">{stat.label}</p>
                        </div>
                        <p className="text-2xl font-bold text-[#111827] mb-1">{stat.value}</p>
                        <p className="text-xs text-[#9CA3AF]">{stat.target}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column - Illustration/Feature Highlight */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-[#F9FAFB] to-white rounded-2xl border-2 border-dashed border-[#E5E7EB] p-8 h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-[#D9480F]/10 to-[#F97316]/5 rounded-3xl flex items-center justify-center mx-auto mb-6 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#D9480F] to-[#F97316] rounded-3xl opacity-10 animate-pulse" />
                        <Rocket className="w-16 h-16 text-[#D9480F] relative z-10" />
                      </div>
                      <h3 className="text-xl font-semibold text-[#111827] mb-3">
                        Launch Your First Campaign
                      </h3>
                      <p className="text-sm text-[#6B7280] mb-6 max-w-xs mx-auto">
                        Follow the quick actions below to get your content live on screens in minutes
                      </p>
                      <div className="flex items-center justify-center gap-2 text-xs text-[#9CA3AF]">
                        <Clock className="w-4 h-4" />
                        <span>~15 minutes to complete</span>
                      </div>
                    </div>
                  </div>

                  {/* Floating Achievement Badge */}
                  {progressPercentage === 100 && (
                    <div className="absolute -top-4 -right-4 bg-gradient-to-br from-[#10B981] to-[#059669] text-white rounded-2xl px-4 py-3 shadow-lg animate-bounce">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-semibold text-sm">All Set!</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-[#111827] mb-2">Quick Start Actions</h2>
              <p className="text-sm text-[#6B7280]">Complete these steps to launch your first campaign</p>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {quickActions.map((action, index) => {
              const isCompleted = completedSteps.includes(action.id);
              const Icon = action.icon;
              
              return (
                <button
                  key={action.id}
                  onClick={() => {
                    if (!isCompleted) {
                      setCompletedSteps([...completedSteps, action.id]);
                    }
                    onNavigate(action.path);
                  }}
                  className="group relative bg-white border-2 border-[#E5E7EB] rounded-2xl p-6 hover:border-[#D9480F] hover:shadow-xl transition-all duration-300 text-left overflow-hidden"
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                  
                  {/* Popular Badge */}
                  {action.popular && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-[#D9480F] text-white text-xs font-medium rounded-full flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Popular
                    </div>
                  )}

                  {/* Completion Badge */}
                  {isCompleted && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-[#10B981] rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                  )}

                  {/* Step Number */}
                  <div className="w-8 h-8 bg-[#F9FAFB] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#FFF7ED] transition-colors">
                    <span className="text-sm font-bold text-[#6B7280] group-hover:text-[#D9480F]">
                      {index + 1}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="font-semibold text-[#111827] mb-2 group-hover:text-[#D9480F] transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-xs text-[#6B7280] mb-4">
                    {action.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{action.time}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#D9480F] opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                  </div>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Learning Resources */}
        <div className="grid grid-cols-3 gap-6">
          {learningResources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <button
                key={index}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:border-[#D9480F] hover:shadow-lg transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#F9FAFB] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFF7ED] transition-colors">
                    <Icon className="w-6 h-6 text-[#6B7280] group-hover:text-[#D9480F] transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#111827] mb-1 group-hover:text-[#D9480F] transition-colors">
                      {resource.title}
                    </h4>
                    <p className="text-xs text-[#6B7280] mb-2">
                      {resource.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#9CA3AF]">{resource.duration}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#D9480F] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
