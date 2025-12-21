import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, User, Mail, Building2, Phone, Save } from 'lucide-react';

export default function ProfileSettings() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: 'Sarah',
    lastName: 'Khan',
    email: 'sarah.khan@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Corporation',
    jobTitle: 'Marketing Director',
    bio: 'Digital marketing professional with 10+ years of experience in campaign management and brand strategy.',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header with Back Button */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/settings/account')}
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#111827] mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Account Settings</span>
        </button>
        
        <div>
          <h1 className="text-[#111827] mb-2">Profile Settings</h1>
          <p className="text-[#6B7280]">
            Update your personal information and profile details
          </p>
        </div>
      </div>

      {/* Profile Form */}
      <div className="max-w-3xl">
        <form onSubmit={handleSubmit}>
          {/* Avatar Section */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 mb-6">
            <h2 className="text-[#111827] mb-4">Profile Photo</h2>
            
            <div className="flex items-center gap-6">
              {/* Current Avatar */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D9480F] to-[#C23D0D] flex items-center justify-center flex-shrink-0">
                <span className="text-3xl font-semibold text-white">SK</span>
              </div>
              
              {/* Upload Button */}
              <div>
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-[#F9FAFB] transition-colors mb-2"
                >
                  <Upload className="w-4 h-4" />
                  <span className="text-sm font-medium">Upload new photo</span>
                </button>
                <p className="text-xs text-[#6B7280]">
                  JPG, PNG or GIF. Max size 2MB.
                </p>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 mb-6">
            <h2 className="text-[#111827] mb-4">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Company
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Job Title */}
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-[#111827] mb-2">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
                className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent resize-none"
                placeholder="Tell us a bit about yourself..."
              />
              <p className="text-xs text-[#6B7280] mt-2">
                Brief description for your profile. URLs are hyperlinked.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/settings/account')}
              className="px-6 py-2.5 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
