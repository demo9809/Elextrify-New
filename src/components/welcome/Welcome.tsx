import { useState } from 'react';
import { 
  Monitor, 
  Building2, 
  Upload, 
  ListVideo, 
  Calendar,
  Zap,
  PlayCircle,
  BookOpen,
  MessageCircle,
  Clock
} from 'lucide-react';

interface WelcomeProps {
  onNavigate: (route: string) => void;
}

export function Welcome({ onNavigate }: WelcomeProps) {
  const [progress] = useState(0); // 0 of 5 steps completed
  const [kiosks] = useState(0);
  const [campaigns] = useState(0);
  const [playlists] = useState(0);
  const trialDaysLeft = 30;

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8">
      <div className="max-w-[1200px] mx-auto space-y-6">
        
        {/* Trial Banner */}
        <div className="bg-[#FFF4ED] border border-[#FDBA74] rounded-lg px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#D9480F] rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[#111827] font-semibold">You're on the Free Trial</span>
                <span className="px-2 py-0.5 bg-[#D9480F] text-white text-xs rounded-full">
                  {trialDaysLeft} days remaining
                </span>
              </div>
              <p className="text-sm text-[#6B7280]">Trial Kiosk Limit: 0 of 5 kpaired</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate('/billing')}
              className="px-6 h-10 bg-[#D9480F] text-white rounded-lg hover:bg-[#C13F0D] transition-colors font-medium"
            >
              Upgrade Your Plan
            </button>
            <button className="px-6 h-10 bg-white border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-[#F9FAFB] transition-colors font-medium">
              Compare Plans
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Left Column - Main Welcome */}
          <div className="col-span-8 space-y-6">
            
            {/* Get Started Section */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-[#FFF4ED] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-[#D9480F]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-[#111827]">Get Started in Minutes</h2>
                  </div>
                  <p className="text-[#6B7280] mb-6">
                    Welcome to Your Digital Signage Platform
                  </p>
                  <p className="text-[#6B7280]">
                    Transform how you display content across all your screens. Get your first campaign live in just a few clicks.
                  </p>
                </div>
              </div>

              {/* Progress Section */}
              <div className="border-t border-[#E5E7EB] pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[#111827] mb-1">Your Progress</h3>
                    <p className="text-sm text-[#6B7280]">0 of 5 steps completed</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-semibold text-[#D9480F]">{progress}%</p>
                    <p className="text-sm text-[#6B7280]">Complete</p>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4 text-center">
                    <Monitor className="w-5 h-5 text-[#6B7280] mx-auto mb-2" />
                    <div className="text-2xl font-semibold text-[#111827] mb-1">{kiosks}</div>
                    <div className="text-sm text-[#6B7280]">Kiosks</div>
                    <button 
                      onClick={() => onNavigate('/terminals')}
                      className="text-xs text-[#D9480F] hover:underline mt-1"
                    >
                      Add your first
                    </button>
                  </div>

                  <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4 text-center">
                    <Calendar className="w-5 h-5 text-[#6B7280] mx-auto mb-2" />
                    <div className="text-2xl font-semibold text-[#111827] mb-1">{campaigns}</div>
                    <div className="text-sm text-[#6B7280]">Campaigns</div>
                    <button 
                      onClick={() => onNavigate('/campaigns')}
                      className="text-xs text-[#D9480F] hover:underline mt-1"
                    >
                      Launch one
                    </button>
                  </div>

                  <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4 text-center">
                    <ListVideo className="w-5 h-5 text-[#6B7280] mx-auto mb-2" />
                    <div className="text-2xl font-semibold text-[#111827] mb-1">{playlists}</div>
                    <div className="text-sm text-[#6B7280]">Playlists</div>
                    <button 
                      onClick={() => onNavigate('/playlists')}
                      className="text-xs text-[#D9480F] hover:underline mt-1"
                    >
                      Create one
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Start Actions */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-8">
              <div className="mb-6">
                <h2 className="text-[#111827] mb-2">Quick Start Actions</h2>
                <p className="text-sm text-[#6B7280]">Complete these steps to launch your first campaign</p>
              </div>

              <div className="grid grid-cols-5 gap-4">
                {/* Step 1 */}
                <ActionCard
                  number={1}
                  title="Add Your First Kiosk"
                  description="Connect a display device"
                  time="2 min"
                  icon={Monitor}
                  iconBg="bg-[#FFF4ED]"
                  iconColor="text-[#D9480F]"
                  badge="Popular"
                  onClick={() => onNavigate('/terminals')}
                />

                {/* Step 2 */}
                <ActionCard
                  number={2}
                  title="Create a Client"
                  description="Add your first Customer"
                  time="1 min"
                  icon={Building2}
                  iconBg="bg-[#DBEAFE]"
                  iconColor="text-[#3B82F6]"
                  onClick={() => onNavigate('/customers')}
                />

                {/* Step 3 */}
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

                {/* Step 4 */}
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

                {/* Step 5 */}
                <ActionCard
                  number={5}
                  title="Launch Campaign"
                  description="Schedule your content"
                  time="4 min"
                  icon={Calendar}
                  iconBg="bg-[#D1FAE5]"
                  iconColor="text-[#16A34A]"
                  badge="Popular"
                  onClick={() => onNavigate('/campaigns')}
                />
              </div>
            </div>

            {/* Learning Resources */}
            <div className="grid grid-cols-3 gap-4">
              <button className="bg-white border border-[#E5E7EB] rounded-xl p-6 text-left hover:shadow-md transition-all group">
                <PlayCircle className="w-6 h-6 text-[#6B7280] mb-3" />
                <h3 className="text-[#111827] mb-1">Platform Walkthrough</h3>
                <p className="text-sm text-[#6B7280] mb-3">5 minute video tour</p>
                <p className="text-xs text-[#9CA3AF]">5 min</p>
              </button>

              <button className="bg-white border border-[#E5E7EB] rounded-xl p-6 text-left hover:shadow-md transition-all group">
                <BookOpen className="w-6 h-6 text-[#6B7280] mb-3" />
                <h3 className="text-[#111827] mb-1">Quick Start Guide</h3>
                <p className="text-sm text-[#6B7280] mb-3">Step-by-step documentation</p>
                <p className="text-xs text-[#9CA3AF]">10 min read</p>
              </button>

              <button className="bg-white border border-[#E5E7EB] rounded-xl p-6 text-left hover:shadow-md transition-all group">
                <MessageCircle className="w-6 h-6 text-[#6B7280] mb-3" />
                <h3 className="text-[#111827] mb-1">Live Chat Support</h3>
                <p className="text-sm text-[#6B7280] mb-3">Get help from our team</p>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-[#16A34A] rounded-full"></div>
                  <p className="text-xs text-[#16A34A]">Available now</p>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column - Launch Campaign CTA */}
          <div className="col-span-4">
            <div className="bg-gradient-to-br from-[#FFF4ED] to-[#FFEDD5] border border-[#FDBA74] rounded-xl p-8 sticky top-24">
              <div className="w-16 h-16 bg-[#FFF7ED] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-[#D9480F]" />
              </div>
              
              <h2 className="text-center text-[#111827] mb-3">Launch Your First Campaign</h2>
              <p className="text-center text-sm text-[#6B7280] mb-6">
                Follow the quick actions below to get your content live on screens in minutes
              </p>

              <div className="flex items-center justify-center gap-2 mb-6">
                <Clock className="w-4 h-4 text-[#D9480F]" />
                <span className="text-sm text-[#6B7280]">~15 minutes to complete</span>
              </div>

              <button 
                onClick={() => onNavigate('/campaigns')}
                className="w-full h-12 bg-[#D9480F] text-white rounded-lg hover:bg-[#C13F0D] transition-colors font-medium mb-4"
              >
                Start Now
              </button>

              <p className="text-xs text-center text-[#9CA3AF]">
                No credit card required during trial
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
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
  badge?: string;
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
  badge,
  onClick 
}: ActionCardProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white border border-[#E5E7EB] rounded-xl p-5 text-left hover:shadow-lg transition-all group relative"
    >
      {badge && (
        <div className="absolute -top-2 -right-2 px-2 py-1 bg-[#D9480F] text-white text-xs rounded-full font-medium">
          {badge}
        </div>
      )}
      
      <div className="text-xs font-semibold text-[#9CA3AF] mb-3">{number}</div>
      
      <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center mb-4`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>

      <h3 className="text-sm font-semibold text-[#111827] mb-2">{title}</h3>
      <p className="text-xs text-[#6B7280] mb-3">{description}</p>
      
      <div className="flex items-center gap-1 text-xs text-[#9CA3AF]">
        <Clock className="w-3 h-3" />
        <span>{time}</span>
      </div>
    </button>
  );
}
