import { HelpCircle, Mail, MessageCircle, Phone, BookOpen, ExternalLink } from 'lucide-react';

export default function HelpSupport() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-[#D9480F] flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-[#111827]">Help & Support</h1>
              <p className="text-sm text-[#6B7280] mt-1">
                Get assistance with your DOOH platform
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-5xl mx-auto">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button className="p-6 bg-white border border-[#E5E7EB] rounded-lg hover:border-[#D9480F] transition-colors text-left group">
            <div className="w-12 h-12 rounded-lg bg-[#FEF2F2] flex items-center justify-center mb-4 group-hover:bg-[#D9480F] transition-colors">
              <Mail className="w-6 h-6 text-[#D9480F] group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-semibold text-[#111827] mb-2">Email Support</h3>
            <p className="text-sm text-[#6B7280] mb-3">
              Send us an email and we'll respond within 24 hours
            </p>
            <span className="text-sm text-[#D9480F] font-medium">support@doohplatform.com</span>
          </button>

          <button className="p-6 bg-white border border-[#E5E7EB] rounded-lg hover:border-[#D9480F] transition-colors text-left group">
            <div className="w-12 h-12 rounded-lg bg-[#FEF2F2] flex items-center justify-center mb-4 group-hover:bg-[#D9480F] transition-colors">
              <MessageCircle className="w-6 h-6 text-[#D9480F] group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-semibold text-[#111827] mb-2">Live Chat</h3>
            <p className="text-sm text-[#6B7280] mb-3">
              Chat with our support team in real-time
            </p>
            <span className="text-sm text-[#D9480F] font-medium">Start chat →</span>
          </button>

          <button className="p-6 bg-white border border-[#E5E7EB] rounded-lg hover:border-[#D9480F] transition-colors text-left group">
            <div className="w-12 h-12 rounded-lg bg-[#FEF2F2] flex items-center justify-center mb-4 group-hover:bg-[#D9480F] transition-colors">
              <Phone className="w-6 h-6 text-[#D9480F] group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-semibold text-[#111827] mb-2">Phone Support</h3>
            <p className="text-sm text-[#6B7280] mb-3">
              Call us during business hours (9 AM - 6 PM IST)
            </p>
            <span className="text-sm text-[#D9480F] font-medium">+91 123 456 7890</span>
          </button>
        </div>

        {/* Resources */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
          <h2 className="font-semibold text-[#111827] mb-4">Helpful Resources</h2>
          
          <div className="space-y-4">
            <a
              href="#"
              className="flex items-center justify-between p-4 border border-[#E5E7EB] rounded-lg hover:border-[#D9480F] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-[#6B7280] group-hover:text-[#D9480F] transition-colors" />
                <div>
                  <p className="font-medium text-[#111827]">Documentation</p>
                  <p className="text-sm text-[#6B7280]">Complete guides and API references</p>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#D9480F] transition-colors" />
            </a>

            <a
              href="#"
              className="flex items-center justify-between p-4 border border-[#E5E7EB] rounded-lg hover:border-[#D9480F] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-[#6B7280] group-hover:text-[#D9480F] transition-colors" />
                <div>
                  <p className="font-medium text-[#111827]">Community Forum</p>
                  <p className="text-sm text-[#6B7280]">Connect with other users</p>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#D9480F] transition-colors" />
            </a>

            <a
              href="#"
              className="flex items-center justify-between p-4 border border-[#E5E7EB] rounded-lg hover:border-[#D9480F] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-[#6B7280] group-hover:text-[#D9480F] transition-colors" />
                <div>
                  <p className="font-medium text-[#111827]">FAQs</p>
                  <p className="text-sm text-[#6B7280]">Frequently asked questions</p>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#D9480F] transition-colors" />
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-6 p-6 bg-white border border-[#E5E7EB] rounded-lg">
          <h3 className="font-semibold text-[#111827] mb-4">Support Hours</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-[#6B7280] mb-1">Email & Chat Support</p>
              <p className="text-[#111827] font-medium">24/7</p>
            </div>
            <div>
              <p className="text-[#6B7280] mb-1">Phone Support</p>
              <p className="text-[#111827] font-medium">Monday - Friday, 9 AM - 6 PM IST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
