import React from 'react';
import { HelpCircle, BookOpen } from 'lucide-react';

interface GlobalFooterProps {
  onNavigate?: (pageId: string) => void;
  isSidebarCollapsed?: boolean;
}

export function GlobalFooter({ onNavigate, isSidebarCollapsed = false }: GlobalFooterProps) {
  const handleLinkClick = (pageId: string) => {
    onNavigate?.(pageId);
  };

  return (
    <div 
      className={`fixed bottom-0 right-0 h-8 bg-white border-t border-[#E5E7EB] flex items-center px-4 z-10 transition-all duration-300 ${
        isSidebarCollapsed ? 'left-[72px]' : 'left-[240px]'
      }`}
    >
      {/* Left Section - Version Info */}
      <div className="flex items-center gap-1.5 text-[10px] text-[#9CA3AF]">
        <span>Version 1.8.2</span>
        <span className="text-[#E5E7EB]">·</span>
        <span>Build 2025.01.18</span>
      </div>

      {/* Center Section - Support Links */}
      <div className="flex-1 flex items-center justify-center gap-4">
        <button
          onClick={() => handleLinkClick('help-support')}
          className="flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#D9480F] transition-colors"
        >
          <HelpCircle className="w-3 h-3" />
          <span>Help & Support</span>
        </button>
        <button
          onClick={() => handleLinkClick('documentation')}
          className="flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#D9480F] transition-colors"
        >
          <BookOpen className="w-3 h-3" />
          <span>Documentation</span>
        </button>
      </div>

      {/* Right Section - Legal Links */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => handleLinkClick('terms')}
          className="text-xs text-[#6B7280] hover:text-[#D9480F] transition-colors"
        >
          Terms & Conditions
        </button>
        <button
          onClick={() => handleLinkClick('privacy')}
          className="text-xs text-[#6B7280] hover:text-[#D9480F] transition-colors"
        >
          Privacy Policy
        </button>
        <button
          onClick={() => handleLinkClick('gdpr')}
          className="text-xs text-[#6B7280] hover:text-[#D9480F] transition-colors"
        >
          GDPR / Data Consent
        </button>
      </div>
    </div>
  );
}