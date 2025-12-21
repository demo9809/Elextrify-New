import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, Clock, Calendar, Save } from 'lucide-react';

export default function LanguageTimezone() {
  const navigate = useNavigate();
  
  const [settings, setSettings] = useState({
    language: 'en-US',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
  });

  const languages = [
    { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
    { code: 'en-GB', name: 'English (UK)', flag: '🇬🇧' },
    { code: 'es-ES', name: 'Español', flag: '🇪🇸' },
    { code: 'fr-FR', name: 'Français', flag: '🇫🇷' },
    { code: 'de-DE', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'pt-BR', name: 'Português (BR)', flag: '🇧🇷' },
    { code: 'ja-JP', name: '日本語', flag: '🇯🇵' },
    { code: 'zh-CN', name: '中文 (简体)', flag: '🇨🇳' },
    { code: 'hi-IN', name: 'हिन्दी', flag: '🇮🇳' },
  ];

  const timezones = [
    { value: 'Pacific/Honolulu', label: '(GMT-10:00) Hawaii' },
    { value: 'America/Los_Angeles', label: '(GMT-08:00) Pacific Time' },
    { value: 'America/Denver', label: '(GMT-07:00) Mountain Time' },
    { value: 'America/Chicago', label: '(GMT-06:00) Central Time' },
    { value: 'America/New_York', label: '(GMT-05:00) Eastern Time' },
    { value: 'Europe/London', label: '(GMT+00:00) London' },
    { value: 'Europe/Paris', label: '(GMT+01:00) Paris' },
    { value: 'Europe/Berlin', label: '(GMT+01:00) Berlin' },
    { value: 'Asia/Dubai', label: '(GMT+04:00) Dubai' },
    { value: 'Asia/Kolkata', label: '(GMT+05:30) India' },
    { value: 'Asia/Singapore', label: '(GMT+08:00) Singapore' },
    { value: 'Asia/Tokyo', label: '(GMT+09:00) Tokyo' },
    { value: 'Australia/Sydney', label: '(GMT+10:00) Sydney' },
  ];

  const dateFormats = [
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY', example: '12/31/2025' },
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY', example: '31/12/2025' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD', example: '2025-12-31' },
    { value: 'DD.MM.YYYY', label: 'DD.MM.YYYY', example: '31.12.2025' },
  ];

  const timeFormats = [
    { value: '12h', label: '12-hour (AM/PM)', example: '2:30 PM' },
    { value: '24h', label: '24-hour', example: '14:30' },
  ];

  const handleSave = () => {
    alert('Language and timezone preferences saved successfully!');
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
          <h1 className="text-[#111827] mb-2">Language & Timezone</h1>
          <p className="text-[#6B7280]">
            Set your language preference, timezone, and date/time formats
          </p>
        </div>
      </div>

      <div className="max-w-3xl">
        {/* Language Section */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#FEF2F2] flex items-center justify-center">
              <Globe className="w-5 h-5 text-[#D9480F]" />
            </div>
            <div>
              <h2 className="text-[#111827]">Language</h2>
              <p className="text-sm text-[#6B7280]">Select your preferred language for the interface</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSettings({ ...settings, language: lang.code })}
                className={`flex items-center gap-3 p-4 border-2 rounded-lg transition-all text-left ${
                  settings.language === lang.code
                    ? 'border-[#D9480F] bg-[#FEF2F2]'
                    : 'border-[#E5E7EB] hover:border-[#D9480F] hover:bg-[#F9FAFB]'
                }`}
              >
                <span className="text-2xl">{lang.flag}</span>
                <span className="text-sm font-medium text-[#111827]">{lang.name}</span>
                {settings.language === lang.code && (
                  <div className="ml-auto w-5 h-5 rounded-full bg-[#D9480F] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Timezone Section */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#FEF2F2] flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#D9480F]" />
            </div>
            <div>
              <h2 className="text-[#111827]">Timezone</h2>
              <p className="text-sm text-[#6B7280]">Set your local timezone for accurate scheduling</p>
            </div>
          </div>

          <select
            value={settings.timezone}
            onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
            className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
          >
            {timezones.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>

          <div className="mt-4 p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
            <div className="flex items-center gap-2 text-sm text-[#6B7280]">
              <Clock className="w-4 h-4" />
              <span>Current time in selected timezone:</span>
              <span className="font-medium text-[#111827]">
                {new Date().toLocaleTimeString('en-US', {
                  timeZone: settings.timezone,
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Date & Time Format Section */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#FEF2F2] flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#D9480F]" />
            </div>
            <div>
              <h2 className="text-[#111827]">Date & Time Format</h2>
              <p className="text-sm text-[#6B7280]">Choose how dates and times are displayed</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Date Format */}
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-3">
                Date Format
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dateFormats.map((format) => (
                  <button
                    key={format.value}
                    onClick={() => setSettings({ ...settings, dateFormat: format.value })}
                    className={`flex items-center justify-between p-4 border-2 rounded-lg transition-all ${
                      settings.dateFormat === format.value
                        ? 'border-[#D9480F] bg-[#FEF2F2]'
                        : 'border-[#E5E7EB] hover:border-[#D9480F] hover:bg-[#F9FAFB]'
                    }`}
                  >
                    <div className="text-left">
                      <div className="text-sm font-medium text-[#111827]">{format.label}</div>
                      <div className="text-xs text-[#6B7280]">{format.example}</div>
                    </div>
                    {settings.dateFormat === format.value && (
                      <div className="w-5 h-5 rounded-full bg-[#D9480F] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Format */}
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-3">
                Time Format
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {timeFormats.map((format) => (
                  <button
                    key={format.value}
                    onClick={() => setSettings({ ...settings, timeFormat: format.value })}
                    className={`flex items-center justify-between p-4 border-2 rounded-lg transition-all ${
                      settings.timeFormat === format.value
                        ? 'border-[#D9480F] bg-[#FEF2F2]'
                        : 'border-[#E5E7EB] hover:border-[#D9480F] hover:bg-[#F9FAFB]'
                    }`}
                  >
                    <div className="text-left">
                      <div className="text-sm font-medium text-[#111827]">{format.label}</div>
                      <div className="text-xs text-[#6B7280]">{format.example}</div>
                    </div>
                    {settings.timeFormat === format.value && (
                      <div className="w-5 h-5 rounded-full bg-[#D9480F] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => navigate('/settings/account')}
            className="px-6 py-2.5 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}
