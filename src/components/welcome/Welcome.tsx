import { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  User, 
  Monitor, 
  Building2, 
  Upload, 
  ListVideo, 
  Calendar,
  ArrowRight,
  Crown,
  Clock,
  LifeBuoy,
  BookOpen,
  MessageCircle,
  ExternalLink,
  Zap
} from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  icon: React.ElementType;
  action: string;
  route: string;
}

interface WelcomeProps {
  userFirstName?: string;
  planName?: string;
  trialDaysLeft?: number;
  onNavigate: (route: string) => void;
}

export function Welcome({ 
  userFirstName = 'User',
  planName = 'Professional',
  trialDaysLeft = 14,
  onNavigate
}: WelcomeProps) {
  // Mock initial state - in production, this would come from backend
  const [steps, setSteps] = useState<OnboardingStep[]>([
    {
      id: 'profile',
      title: 'Complete Profile',
      description: 'Add your business details and preferences',
      status: 'completed',
      icon: User,
      action: 'Go to Profile',
      route: '/settings/profile'
    },
    {
      id: 'kiosk',
      title: 'Add First Kiosk',
      description: 'Register and pair your first display device',
      status: 'completed',
      icon: Monitor,
      action: 'Register Kiosk',
      route: '/terminal'
    },
    {
      id: 'client',
      title: 'Create First Client',
      description: 'Set up a client to organize your campaigns',
      status: 'in-progress',
      icon: Building2,
      action: 'Create Client',
      route: '/clients'
    },
    {
      id: 'media',
      title: 'Upload Media',
      description: 'Add images or videos to your media library',
      status: 'pending',
      icon: Upload,
      action: 'Upload Media',
      route: '/media'
    },
    {
      id: 'playlist',
      title: 'Build Playlist',
      description: 'Create your first content playlist',
      status: 'pending',
      icon: ListVideo,
      action: 'Build Playlist',
      route: '/playlists'
    },
    {
      id: 'campaign',
      title: 'Schedule Campaign',
      description: 'Launch your first campaign to displays',
      status: 'pending',
      icon: Calendar,
      action: 'Schedule Campaign',
      route: '/campaigns'
    }
  ]);

  const completedSteps = steps.filter(s => s.status === 'completed').length;
  const totalSteps = steps.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  const handleStepClick = (route: string) => {
    onNavigate(route);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8">
      <div className="max-w-[1200px] mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[#111827] mb-2">Welcome back, {userFirstName}</h1>
          <p className="text-[#6B7280]">Complete the steps below to get your platform running</p>
        </div>

        {/* Plan Status Card */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FFF7ED] rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-[#D9480F]" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-[#111827]">{planName} Plan</h3>
                  {trialDaysLeft > 0 && (
                    <span className="px-2 py-1 bg-[#EFF6FF] text-[#3B82F6] rounded text-xs font-medium">
                      Trial
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#6B7280]">
                  {trialDaysLeft > 0 ? (
                    <>
                      <Clock className="w-4 h-4 inline mr-1.5" />
                      {trialDaysLeft} days remaining in your trial
                    </>
                  ) : (
                    'Active subscription'
                  )}
                </p>
              </div>
            </div>
            <button className="px-4 h-10 bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-[#F3F4F6] transition-colors text-sm font-medium">
              View Plan Details
            </button>
          </div>
        </div>

        {/* Onboarding Checklist */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E5E7EB]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[#111827] mb-1">Getting Started</h2>
                <p className="text-sm text-[#6B7280]">
                  {completedSteps} of {totalSteps} steps completed
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-2xl font-semibold text-[#111827]">{Math.round(progressPercentage)}%</p>
                  <p className="text-xs text-[#6B7280]">Complete</p>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4 h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#D9480F] transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Steps Grid */}
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              {steps.map((step, index) => (
                <OnboardingStepCard
                  key={step.id}
                  step={step}
                  stepNumber={index + 1}
                  onClick={() => handleStepClick(step.route)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Grid: Progress Summary + Support */}
        <div className="grid grid-cols-2 gap-6">
          {/* Progress Summary */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#EFF6FF] rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#3B82F6]" />
              </div>
              <div>
                <h3 className="text-[#111827]">Quick Stats</h3>
                <p className="text-xs text-[#6B7280]">Your platform overview</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-[#F3F4F6]">
                <span className="text-sm text-[#6B7280]">Active Kiosks</span>
                <span className="text-sm font-semibold text-[#111827]">
                  {steps.find(s => s.id === 'kiosk')?.status === 'completed' ? '1' : '0'}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-[#F3F4F6]">
                <span className="text-sm text-[#6B7280]">Total Clients</span>
                <span className="text-sm font-semibold text-[#111827]">
                  {steps.find(s => s.id === 'client')?.status === 'completed' ? '1' : '0'}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-[#F3F4F6]">
                <span className="text-sm text-[#6B7280]">Media Files</span>
                <span className="text-sm font-semibold text-[#111827]">
                  {steps.find(s => s.id === 'media')?.status === 'completed' ? '5' : '0'}
                </span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-[#6B7280]">Active Campaigns</span>
                <span className="text-sm font-semibold text-[#111827]">
                  {steps.find(s => s.id === 'campaign')?.status === 'completed' ? '1' : '0'}
                </span>
              </div>
            </div>
          </div>

          {/* Support & Resources */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#F0FDF4] rounded-lg flex items-center justify-center">
                <LifeBuoy className="w-5 h-5 text-[#16A34A]" />
              </div>
              <div>
                <h3 className="text-[#111827]">Support & Resources</h3>
                <p className="text-xs text-[#6B7280]">Get help when you need it</p>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[#F9FAFB] transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#F9FAFB] rounded-lg flex items-center justify-center group-hover:bg-white">
                    <BookOpen className="w-4 h-4 text-[#6B7280]" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-[#111827]">Documentation</p>
                    <p className="text-xs text-[#6B7280]">Browse guides and tutorials</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#9CA3AF]" />
              </button>

              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[#F9FAFB] transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#F9FAFB] rounded-lg flex items-center justify-center group-hover:bg-white">
                    <MessageCircle className="w-4 h-4 text-[#6B7280]" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-[#111827]">Live Chat</p>
                    <p className="text-xs text-[#6B7280]">Chat with our support team</p>
                  </div>
                </div>
                <div className="w-2 h-2 bg-[#16A34A] rounded-full"></div>
              </button>

              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[#F9FAFB] transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#F9FAFB] rounded-lg flex items-center justify-center group-hover:bg-white">
                    <LifeBuoy className="w-4 h-4 text-[#6B7280]" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-[#111827]">Contact Support</p>
                    <p className="text-xs text-[#6B7280]">Email us for assistance</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#9CA3AF]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface OnboardingStepCardProps {
  step: OnboardingStep;
  stepNumber: number;
  onClick: () => void;
}

function OnboardingStepCard({ step, stepNumber, onClick }: OnboardingStepCardProps) {
  const Icon = step.icon;
  
  const getStatusColor = () => {
    switch (step.status) {
      case 'completed':
        return {
          bg: 'bg-[#DCFCE7]',
          border: 'border-[#BBF7D0]',
          icon: 'text-[#16A34A]',
          iconBg: 'bg-[#16A34A]'
        };
      case 'in-progress':
        return {
          bg: 'bg-[#FFF7ED]',
          border: 'border-[#FED7AA]',
          icon: 'text-[#D9480F]',
          iconBg: 'bg-[#D9480F]'
        };
      default:
        return {
          bg: 'bg-white',
          border: 'border-[#E5E7EB]',
          icon: 'text-[#6B7280]',
          iconBg: 'bg-[#E5E7EB]'
        };
    }
  };

  const colors = getStatusColor();

  return (
    <button
      onClick={onClick}
      className={`${colors.bg} border ${colors.border} rounded-xl p-5 text-left hover:shadow-md transition-all group`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Status Indicator */}
          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
            step.status === 'completed' ? colors.iconBg : 
            step.status === 'in-progress' ? 'border-2 border-[#D9480F]' : 
            'border-2 border-[#E5E7EB]'
          }`}>
            {step.status === 'completed' ? (
              <CheckCircle2 className="w-4 h-4 text-white" />
            ) : (
              <span className={`text-xs font-semibold ${
                step.status === 'in-progress' ? 'text-[#D9480F]' : 'text-[#9CA3AF]'
              }`}>
                {stepNumber}
              </span>
            )}
          </div>
          
          {/* Icon */}
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            step.status === 'completed' ? 'bg-[#BBF7D0]' :
            step.status === 'in-progress' ? 'bg-[#FED7AA]' :
            'bg-[#F3F4F6]'
          }`}>
            <Icon className={`w-5 h-5 ${colors.icon}`} />
          </div>
        </div>

        {/* Arrow */}
        <ArrowRight className={`w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity ${colors.icon}`} />
      </div>

      <div>
        <h4 className="text-[#111827] mb-1">{step.title}</h4>
        <p className="text-sm text-[#6B7280] mb-4">{step.description}</p>
        
        {/* Action Label */}
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${
            step.status === 'completed' ? 'text-[#16A34A]' :
            step.status === 'in-progress' ? 'text-[#D9480F]' :
            'text-[#6B7280]'
          }`}>
            {step.status === 'completed' ? 'View Details' : step.action}
          </span>
        </div>
      </div>
    </button>
  );
}
