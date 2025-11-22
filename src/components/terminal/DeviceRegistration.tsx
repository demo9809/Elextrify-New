import { useState, useEffect } from 'react';
import { Monitor, Clock, CheckCircle, X, Copy, Check } from 'lucide-react';

interface UnverifiedDevice {
  id: string;
  deviceId: string;
  model: string;
  readinessState: 'ready' | 'pending' | 'error';
  discoveredAt: string;
  ipAddress: string;
  macAddress: string;
}

const MOCK_UNVERIFIED_DEVICES: UnverifiedDevice[] = [
  {
    id: 'unv-1',
    deviceId: 'KSK-ATL-005',
    model: 'KioskPro X1',
    readinessState: 'ready',
    discoveredAt: new Date(Date.now() - 5 * 60000).toISOString(),
    ipAddress: '192.168.1.105',
    macAddress: 'A4:83:E7:2D:5F:89',
  },
  {
    id: 'unv-2',
    deviceId: 'KSK-DEN-003',
    model: 'KioskPro S2',
    readinessState: 'ready',
    discoveredAt: new Date(Date.now() - 15 * 60000).toISOString(),
    ipAddress: '192.168.1.203',
    macAddress: 'B2:94:F8:3E:6A:12',
  },
  {
    id: 'unv-3',
    deviceId: 'KSK-PHX-002',
    model: 'KioskPro X1',
    readinessState: 'ready',
    discoveredAt: new Date(Date.now() - 30 * 60000).toISOString(),
    ipAddress: '192.168.1.142',
    macAddress: 'C3:15:A9:4F:7B:23',
  },
];

interface DeviceRegistrationProps {
  onBack: () => void;
  onDevicePaired?: (device: any) => void;
}

export function DeviceRegistration({ onBack, onDevicePaired }: DeviceRegistrationProps) {
  const [devices, setDevices] = useState<UnverifiedDevice[]>(MOCK_UNVERIFIED_DEVICES);
  const [pairingDevice, setPairingDevice] = useState<UnverifiedDevice | null>(null);

  const formatDiscoveredAt = (isoDate: string) => {
    const date = new Date(isoDate);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    
    return date.toLocaleDateString();
  };

  const getReadinessColor = (state: UnverifiedDevice['readinessState']) => {
    switch (state) {
      case 'ready':
        return 'bg-[#DCFCE7] text-[#166534]';
      case 'pending':
        return 'bg-[#FEF3C7] text-[#92400E]';
      case 'error':
        return 'bg-[#FEE2E2] text-[#991B1B]';
    }
  };

  const handleStartPairing = (device: UnverifiedDevice) => {
    setPairingDevice(device);
  };

  const handlePairingSuccess = () => {
    if (pairingDevice) {
      setDevices(devices.filter(d => d.id !== pairingDevice.id));
      setPairingDevice(null);
      // In real app, would show success toast
      if (onDevicePaired) {
        onDevicePaired(pairingDevice);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[#111827] mb-2">Device Registration</h1>
          <p className="text-[#6B7280]">
            Pair unverified devices that have pinged the API
          </p>
        </div>

        {/* Unverified Devices */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#E5E7EB]">
            <h3 className="text-[#111827]">Unverified Devices ({devices.length})</h3>
          </div>

          {devices.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <CheckCircle className="w-12 h-12 text-[#16A34A] mx-auto mb-3" />
              <p className="text-[#111827] font-medium mb-2">All devices are paired</p>
              <p className="text-sm text-[#9CA3AF]">
                New devices will appear here when they ping the API
              </p>
            </div>
          ) : (
            <>
              {/* Table Header */}
              <div className="px-6 py-3 bg-[#F9FAFB] border-b border-[#E5E7EB]">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-3 text-xs text-[#6B7280]">Device ID</div>
                  <div className="col-span-2 text-xs text-[#6B7280]">Model</div>
                  <div className="col-span-2 text-xs text-[#6B7280]">Network Info</div>
                  <div className="col-span-2 text-xs text-[#6B7280]">Readiness</div>
                  <div className="col-span-2 text-xs text-[#6B7280]">Discovered</div>
                  <div className="col-span-1 text-xs text-[#6B7280] text-right">Action</div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-[#E5E7EB]">
                {devices.map(device => (
                  <div key={device.id} className="px-6 py-4 hover:bg-[#F9FAFB] transition-colors">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Device ID */}
                      <div className="col-span-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#F3F4F6] rounded-lg flex items-center justify-center">
                            <Monitor className="w-5 h-5 text-[#6B7280]" />
                          </div>
                          <div>
                            <p className="text-sm text-[#111827] font-medium font-mono">
                              {device.deviceId}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Model */}
                      <div className="col-span-2">
                        <p className="text-sm text-[#6B7280]">{device.model}</p>
                      </div>

                      {/* Network Info */}
                      <div className="col-span-2">
                        <p className="text-xs text-[#6B7280] font-mono mb-0.5">
                          IP: {device.ipAddress}
                        </p>
                        <p className="text-xs text-[#9CA3AF] font-mono">
                          MAC: {device.macAddress}
                        </p>
                      </div>

                      {/* Readiness */}
                      <div className="col-span-2">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getReadinessColor(device.readinessState)}`}>
                          {device.readinessState.charAt(0).toUpperCase() + device.readinessState.slice(1)}
                        </span>
                      </div>

                      {/* Discovered */}
                      <div className="col-span-2">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#6B7280]" />
                          <span className="text-sm text-[#6B7280]">
                            {formatDiscoveredAt(device.discoveredAt)}
                          </span>
                        </div>
                      </div>

                      {/* Action */}
                      <div className="col-span-1 flex justify-end">
                        <button
                          onClick={() => handleStartPairing(device)}
                          disabled={device.readinessState !== 'ready'}
                          className="px-4 h-9 bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] disabled:bg-[#E5E7EB] disabled:text-[#9CA3AF] disabled:cursor-not-allowed transition-colors text-sm"
                        >
                          Pair
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Pairing Modal */}
      {pairingDevice && (
        <PairingModal
          device={pairingDevice}
          onClose={() => setPairingDevice(null)}
          onSuccess={handlePairingSuccess}
        />
      )}
    </div>
  );
}

interface PairingModalProps {
  device: UnverifiedDevice;
  onClose: () => void;
  onSuccess: () => void;
}

function PairingModal({ device, onClose, onSuccess }: PairingModalProps) {
  const [passcode] = useState(generatePasscode());
  const [verificationStatus, setVerificationStatus] = useState<'waiting' | 'verified' | 'failed'>('waiting');
  const [countdown, setCountdown] = useState(300); // 5 minutes
  const [copied, setCopied] = useState(false);

  // Generate random 6-digit passcode
  function generatePasscode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Simulate API polling for verification
  useEffect(() => {
    const pollInterval = setInterval(() => {
      // Simulate random verification after 3-8 seconds
      const randomDelay = 3000 + Math.random() * 5000;
      
      setTimeout(() => {
        const success = Math.random() > 0.2; // 80% success rate
        setVerificationStatus(success ? 'verified' : 'failed');
        
        if (success) {
          setTimeout(() => {
            onSuccess();
          }, 2000);
        }
      }, randomDelay);
    }, 10000);

    return () => clearInterval(pollInterval);
  }, [onSuccess]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          setVerificationStatus('failed');
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyPasscode = () => {
    // Fallback method for copying text without Clipboard API
    const textArea = document.createElement('textarea');
    textArea.value = passcode;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      textArea.remove();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      textArea.remove();
      // Show alert as fallback
      alert(`Copy this code: ${passcode}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={verificationStatus === 'waiting' ? onClose : undefined} />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-[480px] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
          <h3 className="text-[#111827]">
            {verificationStatus === 'waiting' && 'Pair Device'}
            {verificationStatus === 'verified' && 'Device Paired Successfully'}
            {verificationStatus === 'failed' && 'Pairing Failed'}
          </h3>
          {verificationStatus === 'waiting' && (
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F9FAFB] text-[#6B7280] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {verificationStatus === 'waiting' && (
            <>
              <div className="mb-6">
                <p className="text-sm text-[#6B7280] mb-4">
                  Enter this passcode on the physical kiosk to complete pairing:
                </p>
                
                {/* Passcode Display */}
                <div className="bg-[#F9FAFB] border-2 border-[#E5E7EB] rounded-xl p-6 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-[#6B7280]">Pairing Code</p>
                    <button
                      onClick={handleCopyPasscode}
                      className="flex items-center gap-1.5 text-xs text-[#D9480F] hover:text-[#C23D0D] transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[#111827] text-5xl font-bold font-mono tracking-wider text-center">
                    {passcode}
                  </p>
                </div>

                {/* Device Info */}
                <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-[#6B7280] mb-1">Device ID</p>
                      <p className="text-sm text-[#111827] font-mono">{device.deviceId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#6B7280] mb-1">Model</p>
                      <p className="text-sm text-[#111827]">{device.model}</p>
                    </div>
                  </div>
                </div>

                {/* Timer */}
                <div className="flex items-center justify-center gap-2 text-sm text-[#6B7280]">
                  <Clock className="w-4 h-4" />
                  <span>Code expires in {formatTime(countdown)}</span>
                </div>
              </div>

              {/* Waiting Indicator */}
              <div className="flex items-center justify-center gap-3 py-4 bg-[#EFF6FF] rounded-lg">
                <div className="w-2 h-2 bg-[#3B82F6] rounded-full animate-pulse"></div>
                <p className="text-sm text-[#3B82F6]">Waiting for device verification...</p>
              </div>
            </>
          )}

          {verificationStatus === 'verified' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#DCFCE7] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-[#16A34A]" />
              </div>
              <p className="text-[#111827] font-medium mb-2">
                Device {device.deviceId} paired successfully!
              </p>
              <p className="text-sm text-[#6B7280]">
                You can now configure this device in Kiosk Management
              </p>
            </div>
          )}

          {verificationStatus === 'failed' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#FEE2E2] rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-[#DC2626]" />
              </div>
              <p className="text-[#111827] font-medium mb-2">Pairing failed</p>
              <p className="text-sm text-[#6B7280] mb-6">
                The passcode may have expired or been entered incorrectly
              </p>
              <button
                onClick={onClose}
                className="px-6 h-10 bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}