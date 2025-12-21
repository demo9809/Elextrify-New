import { BookOpen, Search, ExternalLink, Code, Layers, Zap, Shield, FileText } from 'lucide-react';

export default function Documentation() {
  const sections = [
    {
      title: 'Getting Started',
      icon: Zap,
      description: 'Quick start guides and onboarding tutorials',
      links: [
        'Platform Overview',
        'Creating Your First Campaign',
        'Setting Up Kiosks',
        'Managing Media Library',
      ],
    },
    {
      title: 'Campaign Management',
      icon: Layers,
      description: 'Learn how to create and manage campaigns',
      links: [
        'Campaign Setup Guide',
        'Ad Group Configuration',
        'Targeting & Scheduling',
        'Campaign Analytics',
      ],
    },
    {
      title: 'API Reference',
      icon: Code,
      description: 'Complete API documentation for developers',
      links: [
        'Authentication',
        'Campaign API',
        'Media API',
        'Reporting API',
      ],
    },
    {
      title: 'Security & Compliance',
      icon: Shield,
      description: 'Security best practices and compliance',
      links: [
        'User Permissions',
        'Data Privacy',
        'GST Compliance (India)',
        'Audit Logs',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-[#D9480F] flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-[#111827]">Documentation</h1>
              <p className="text-sm text-[#6B7280] mt-1">
                Comprehensive guides and references for the DOOH platform
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full h-12 pl-11 pr-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        {/* Quick Links Banner */}
        <div className="mb-8 p-6 bg-gradient-to-r from-[#D9480F] to-[#C23D0D] rounded-lg text-white">
          <h2 className="font-semibold mb-2">New to the platform?</h2>
          <p className="text-sm mb-4 opacity-90">
            Start with our quick start guide to get up and running in minutes
          </p>
          <button className="px-4 h-10 bg-white text-[#D9480F] rounded-lg hover:bg-gray-50 transition-colors font-medium">
            View Quick Start Guide
          </button>
        </div>

        {/* Documentation Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div key={index} className="bg-white border border-[#E5E7EB] rounded-lg p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#FEF2F2] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-[#D9480F]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#111827] mb-1">{section.title}</h3>
                    <p className="text-sm text-[#6B7280]">{section.description}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href="#"
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-[#F9FAFB] transition-colors group"
                    >
                      <span className="text-sm text-[#111827]">{link}</span>
                      <ExternalLink className="w-4 h-4 text-[#9CA3AF] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Resources */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
          <h2 className="font-semibold text-[#111827] mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#D9480F]" />
            Additional Resources
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="#"
              className="p-4 border border-[#E5E7EB] rounded-lg hover:border-[#D9480F] transition-colors"
            >
              <h4 className="font-medium text-[#111827] mb-1">Video Tutorials</h4>
              <p className="text-sm text-[#6B7280]">Step-by-step video guides</p>
            </a>

            <a
              href="#"
              className="p-4 border border-[#E5E7EB] rounded-lg hover:border-[#D9480F] transition-colors"
            >
              <h4 className="font-medium text-[#111827] mb-1">Release Notes</h4>
              <p className="text-sm text-[#6B7280]">Latest features and updates</p>
            </a>

            <a
              href="#"
              className="p-4 border border-[#E5E7EB] rounded-lg hover:border-[#D9480F] transition-colors"
            >
              <h4 className="font-medium text-[#111827] mb-1">Best Practices</h4>
              <p className="text-sm text-[#6B7280]">Tips for optimal usage</p>
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 p-4 bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg">
          <p className="text-sm text-[#1E40AF]">
            <span className="font-medium">Need help?</span> Can't find what you're looking for? 
            <a href="#" className="ml-1 text-[#D9480F] hover:underline font-medium">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
