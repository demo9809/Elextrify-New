import { useState } from 'react';
import {
  Monitor,
  Calendar,
  ListVideo,
  Building2,
  Upload,
  Zap,
  PlayCircle,
  BookOpen,
  MessageCircle,
  Clock,
} from 'lucide-react';

interface WelcomeProps {
  onNavigate: (route: string) => void;
}

export function Welcome({ onNavigate }: WelcomeProps) {
  const [progress] = useState(0); // 0 of 5 steps completed
  const trialDaysLeft = 30;

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8">
      <div className="max-w-[1100px] mx-auto">
        
        {/* Main Card Container */}
        <div className="bg-white border border-[#E5E7EB] rounded-3xl overflow-hidden relative">
          
          {/* Decorative Background Blurs */}
          <div className="absolute top-[-80px] left-[796px] w-[384px] h-[384px] rounded-full bg-gradient-to-br from-[rgba(217,72,15,0.1)] to-[rgba(249,115,22,0.05)] blur-[100px] pointer-events-none" />
          <div className="absolute top-[353px] left-[-40px] w-[320px] h-[320px] rounded-full bg-gradient-to-br from-[rgba(59,130,246,0.1)] to-[rgba(139,92,246,0.05)] blur-[100px] pointer-events-none" />
          
          {/* Trial Banner */}
          <div className="bg-gradient-to-b from-[#FEF2F2] to-[#FFF7ED] border-b border-[#FEE2E2] px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-b from-[#D9480F] to-[#F97316] rounded-2xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-[#111827]">You're on the Free Trial</span>
                    <span className="px-2 py-0.5 bg-[#D9480F] text-white text-xs font-medium rounded-full">
                      {trialDaysLeft} days remaining
                    </span>
                  </div>
                  <p className="text-xs text-[#6B7280]">Trial Kiosk Limit: <span className="font-semibold text-[#111827]">0 of 1 Synced</span></p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => onNavigate('/billing')}
                  className="px-5 h-10 bg-[#D9480F] text-white text-sm font-medium rounded-xl hover:bg-[#C13F0D] transition-colors flex items-center gap-2"
                >
                  Upgrade Your Plan
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                    <path d="M3.33333 8H12.6667M12.6667 8L8 3.33333M12.6667 8L8 12.6667" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button 
                  onClick={() => onNavigate('/billing')}
                  className="px-5 h-10 bg-white border border-[#E5E7EB] text-sm font-medium text-[#111827] rounded-xl hover:bg-[#F9FAFB] transition-colors"
                >
                  Compare Plans
                </button>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-[1fr_320px] gap-12 p-8">
            
            {/* Left Column */}
            <div className="space-y-8">
              
              {/* Get Started Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFF7ED] border border-[#FDBA74] rounded-full">
                <Zap className="w-4 h-4 text-[#D9480F]" />
                <span className="text-sm font-medium text-[#D9480F]">Get Started in Minutes</span>
              </div>

              {/* Welcome Message */}
              <div>
                <h1 className="text-[#111827] mb-4">Welcome to Your Digital Signage Platform</h1>
                <p className="text-lg text-[#6B7280] leading-7">
                  Transform how you display content across all your screens. Get your first campaign live in just a few clicks.
                </p>
              </div>

              {/* Progress Card */}
              <div className="bg-gradient-to-b from-[#F9FAFB] to-white border border-[#E5E7EB] rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-[#111827] mb-1">Your Progress</h3>
                    <p className="text-xs text-[#6B7280]">0 of 5 steps completed</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#D9480F]">{progress}%</p>
                    <p className="text-xs text-[#6B7280]">Complete</p>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="h-3 bg-[#E5E7EB] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#D9480F] to-[#F97316] transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4">
                <StatCard
                  icon={Monitor}
                  label="Kiosks"
                  value="0"
                  action="Add your first"
                  onClick={() => onNavigate('/terminals')}
                />
                <StatCard
                  icon={Calendar}
                  label="Campaigns"
                  value="0"
                  action="Launch one"
                  onClick={() => onNavigate('/ad-slotting/inventory')}
                />
                <StatCard
                  icon={ListVideo}
                  label="Playlists"
                  value="0"
                  action="Create one"
                  onClick={() => onNavigate('/playlists')}
                />
              </div>
            </div>

            {/* Right Column - CTA Card */}
            <div className="bg-gradient-to-b from-[#F9FAFB] to-white border-2 border-[#E5E7EB] rounded-2xl p-8 flex flex-col items-center text-center h-fit m-[0px] px-[32px] py-[70px]">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[rgba(217,72,15,0.1)] to-[rgba(249,115,22,0.05)] flex items-center justify-center mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-[#D9480F] to-[#F97316] opacity-10 rounded-3xl" />
                <Calendar className="w-16 h-16 text-[#D9480F] relative z-10" />
              </div>
              
              <h2 className="text-xl font-semibold text-[#111827] mb-3">Launch Your First Campaign</h2>
              <p className="text-sm text-[#6B7280] mb-6 leading-5">
                Follow the quick actions below to get your content live on screens in minutes
              </p>
              
              <div className="flex items-center gap-2 text-xs text-[#9CA3AF] mb-6">
                <Clock className="w-4 h-4" />
                <span>~15 minutes to complete</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Start Actions */}
        <div className="mt-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-[#111827] mb-2">Quick Start Actions</h2>
            <p className="text-[#6B7280]">Complete these steps to launch your first campaign</p>
          </div>

          <div className="grid grid-cols-5 gap-4">
            <ActionCard
              number={1}
              title="Add Your First Kiosk"
              description="Connect a display device"
              time="2 min"
              icon={Monitor}
              iconBg="bg-[#FFF4ED]"
              iconColor="text-[#D9480F]"
              popular
              onClick={() => onNavigate('/terminals')}
            />
            <ActionCard
              number={2}
              title="Create a Client"
              description="Add your first customer"
              time="1 min"
              icon={Building2}
              iconBg="bg-[#DBEAFE]"
              iconColor="text-[#3B82F6]"
              onClick={() => onNavigate('/customers')}
            />
            <ActionCard
              number={3}
              title="Upload Media"
              description="Add images & videos"
              time="3 min"
              icon={Upload}
              iconBg="bg-[#F3E8FF]"
              iconColor="text-[#9333EA]"
              onClick={() => onNavigate('/media')}
            />
            <ActionCard
              number={4}
              title="Build a Playlist"
              description="Create content sequence"
              time="5 min"
              icon={ListVideo}
              iconBg="bg-[#FCE7F3]"
              iconColor="text-[#EC4899]"
              onClick={() => onNavigate('/playlists')}
            />
            <ActionCard
              number={5}
              title="Launch Campaign"
              description="Schedule your content"
              time="4 min"
              icon={Calendar}
              iconBg="bg-[#D1FAE5]"
              iconColor="text-[#16A34A]"
              popular
              onClick={() => onNavigate('/ad-slotting/inventory')}
            />
          </div>
        </div>

        {/* Learning Resources */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          <ResourceCard
            icon={PlayCircle}
            title="Platform Walkthrough"
            description="5-minute video tour"
            time="5 min"
          />
          <ResourceCard
            icon={BookOpen}
            title="Quick Start Guide"
            description="Step-by-step documentation"
            time="10 min read"
          />
          <ResourceCard
            icon={MessageCircle}
            title="Live Chat Support"
            description="Get help from our team"
            status="Available now"
          />
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  action: string;
  onClick: () => void;
}

function StatCard({ icon: Icon, label, value, action, onClick }: StatCardProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white border border-[#E5E7EB] rounded-2xl p-4 text-left hover:shadow-lg transition-all group"
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-[#6B7280]" />
        <span className="text-xs text-[#6B7280]">{label}</span>
      </div>
      <div className="text-2xl font-bold text-[#111827] mb-2">{value}</div>
      <div className="text-xs text-[#9CA3AF]">{action}</div>
    </button>
  );
}

interface ActionCardProps {
  number: number;
  title: string;
  description: string;
  time: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  popular?: boolean;
  onClick: () => void;
}

function ActionCard({
  number,
  title,
  description,
  time,
  icon: Icon,
  iconBg,
  iconColor,
  popular,
  onClick
}: ActionCardProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white border border-[#E5E7EB] rounded-2xl p-6 text-left hover:shadow-lg transition-all group relative"
    >
      {popular && (
        <div className="absolute -top-2 -right-2 px-3 py-1 bg-[#D9480F] text-white text-xs font-medium rounded-full">
          Popular
        </div>
      )}
      
      <div className="text-xs font-semibold text-[#9CA3AF] mb-4">{number}</div>
      
      <div className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center mb-4`}>
        <Icon className={`w-7 h-7 ${iconColor}`} />
      </div>

      <h3 className="text-sm font-semibold text-[#111827] mb-2">{title}</h3>
      <p className="text-xs text-[#6B7280] mb-4">{description}</p>
      
      <div className="flex items-center gap-1 text-xs text-[#9CA3AF]">
        <Clock className="w-3 h-3" />
        <span>{time}</span>
      </div>
    </button>
  );
}

interface ResourceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  time?: string;
  status?: string;
}

function ResourceCard({ icon: Icon, title, description, time, status }: ResourceCardProps) {
  return (
    <button className="bg-gradient-to-b from-[#FFFBEB] to-[#FEF3C7] border border-[#FDE68A] rounded-2xl p-6 text-left hover:shadow-lg transition-all group">
      <Icon className="w-8 h-8 text-[#6B7280] mb-4" />
      <h3 className="text-[#111827] font-semibold mb-2">{title}</h3>
      <p className="text-sm text-[#6B7280] mb-3">{description}</p>
      {time && <p className="text-xs text-[#9CA3AF]">{time}</p>}
      {status && (
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-[#16A34A] rounded-full"></div>
          <p className="text-xs text-[#16A34A]">{status}</p>
        </div>
      )}
    </button>
  );
}