import { Search, Bell, HelpCircle, Settings } from 'lucide-react';

export function TopHeader() {
  return (
    <div className="bg-white border-b border-[#E5E7EB] h-16 flex items-center px-6 gap-4 sticky top-0 z-20">
      {/* Search Bar */}
      <div className="flex-1 max-w-[560px]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search campaigns, creatives, reports..."
            className="w-full h-10 pl-10 pr-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
          />
        </div>
      </div>

      {/* Spacer to push icons to the right */}
      <div className="flex-1"></div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#F9FAFB] transition-colors">
          <Bell className="w-5 h-5 text-[#6B7280]" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#D9480F] rounded-full"></span>
        </button>

        {/* Help */}
        <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#F9FAFB] transition-colors">
          <HelpCircle className="w-5 h-5 text-[#6B7280]" />
        </button>

        {/* Settings */}
        <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#F9FAFB] transition-colors">
          <Settings className="w-5 h-5 text-[#6B7280]" />
        </button>
      </div>
    </div>
  );
}