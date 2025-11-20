import { useState } from 'react';
import { X, Upload, Image as ImageIcon, Video, Eye, CheckCircle2, Circle } from 'lucide-react';

interface MediaSelectorPanelProps {
  isOpen: boolean;
  onClose: () => void;
  clientId: string;
  clientName: string;
  onSelect: (mediaIds: string[]) => void;
}

// Mock media library filtered by client
const MOCK_MEDIA = [
  { id: 'm1', name: 'Product Shot 1.jpg', type: 'image', clientId: 'client-1', size: '1920x1080' },
  { id: 'm2', name: 'Holiday Video.mp4', type: 'video', clientId: 'client-1', size: '1920x1080' },
  { id: 'm3', name: 'Brand Logo.png', type: 'image', clientId: 'client-1', size: '1920x1080' },
  { id: 'm4', name: 'Summer Sale.jpg', type: 'image', clientId: 'client-2', size: '1920x1080' },
  { id: 'm5', name: 'Coffee Promo.mp4', type: 'video', clientId: 'client-2', size: '1920x1080' },
];

export function MediaSelectorPanel({ isOpen, onClose, clientId, clientName, onSelect }: MediaSelectorPanelProps) {
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState<string | null>(null);

  // Filter media by client
  const clientMedia = MOCK_MEDIA.filter(m => m.clientId === clientId);

  const handleToggleMedia = (mediaId: string) => {
    setSelectedMedia(prev =>
      prev.includes(mediaId)
        ? prev.filter(id => id !== mediaId)
        : [...prev, mediaId]
    );
  };

  const handleUpload = () => {
    // Simulate file upload
    const newId = `m${Date.now()}`;
    setSelectedMedia([...selectedMedia, newId]);
    alert('Media uploaded successfully! (simulated)');
  };

  const handleDone = () => {
    onSelect(selectedMedia);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[60] flex items-center justify-end">
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
        />
        
        {/* Panel - 80% width */}
        <div className="relative w-[80%] max-w-[1152px] h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-[#E5E7EB]">
            <div>
              <h3 className="text-[#111827] mb-1">Select Media</h3>
              <p className="text-sm text-[#6B7280]">
                Choose media files for <span className="text-[#D9480F]">{clientName}</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleUpload}
                className="flex items-center gap-2 px-6 h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] transition-colors"
              >
                <Upload className="w-4 h-4" />
                Upload New Media
              </button>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#F9FAFB] transition-colors"
              >
                <X className="w-5 h-5 text-[#6B7280]" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8">
            {clientMedia.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 bg-[#F9FAFB] rounded-full flex items-center justify-center mb-4">
                  <ImageIcon className="w-10 h-10 text-[#E5E7EB]" />
                </div>
                <h4 className="text-[#111827] mb-2">No media files yet</h4>
                <p className="text-sm text-[#6B7280] mb-6 max-w-md">
                  Upload your first media file for {clientName} to get started.
                </p>
                <button
                  onClick={handleUpload}
                  className="px-6 h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] transition-colors"
                >
                  Upload First Media
                </button>
              </div>
            ) : (
              <>
                {/* Selection Counter */}
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-sm text-[#6B7280]">
                    {selectedMedia.length} of {clientMedia.length} selected
                  </p>
                  {selectedMedia.length > 0 && (
                    <button
                      onClick={() => setSelectedMedia([])}
                      className="text-sm text-[#D9480F] hover:text-[#C23D0D] transition-colors"
                    >
                      Clear Selection
                    </button>
                  )}
                </div>

                {/* Media Grid */}
                <div className="grid grid-cols-4 gap-6">
                  {clientMedia.map(media => {
                    const isSelected = selectedMedia.includes(media.id);
                    
                    return (
                      <div
                        key={media.id}
                        className={`relative bg-white rounded-lg border-2 overflow-hidden group transition-all ${
                          isSelected
                            ? 'border-[#D9480F] shadow-lg'
                            : 'border-[#E5E7EB] hover:border-[#D9480F]/30'
                        }`}
                      >
                        {/* Checkbox */}
                        <button
                          onClick={() => handleToggleMedia(media.id)}
                          className="absolute top-3 left-3 z-10"
                        >
                          {isSelected ? (
                            <CheckCircle2 className="w-6 h-6 text-[#D9480F] bg-white rounded-full" />
                          ) : (
                            <Circle className="w-6 h-6 text-white bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </button>

                        {/* Preview Button */}
                        <button
                          onClick={() => setShowPreview(media.id)}
                          className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Eye className="w-4 h-4 text-white" />
                        </button>

                        {/* Thumbnail */}
                        <button
                          onClick={() => handleToggleMedia(media.id)}
                          className="w-full aspect-video bg-gradient-to-br from-[#F9FAFB] to-[#E5E7EB] flex items-center justify-center"
                        >
                          {media.type === 'image' ? (
                            <ImageIcon className="w-12 h-12 text-[#9CA3AF]" />
                          ) : (
                            <Video className="w-12 h-12 text-[#9CA3AF]" />
                          )}
                        </button>

                        {/* Info */}
                        <div className="p-3">
                          <p className="text-sm text-[#111827] truncate">{media.name}</p>
                          <p className="text-xs text-[#6B7280] mt-1">
                            {media.type === 'image' ? 'Image' : 'Video'} • {media.size}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-8 py-6 border-t border-[#E5E7EB] flex items-center justify-between bg-white">
            <p className="text-sm text-[#6B7280]">
              {selectedMedia.length} media file{selectedMedia.length !== 1 ? 's' : ''} selected
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-6 h-11 rounded-lg border border-[#E5E7EB] text-[#111827] hover:bg-[#F9FAFB] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDone}
                disabled={selectedMedia.length === 0}
                className={`px-6 h-11 rounded-lg transition-colors ${
                  selectedMedia.length > 0
                    ? 'bg-[#D9480F] text-white hover:bg-[#C23D0D]'
                    : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                }`}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-8">
          <div 
            className="absolute inset-0 bg-black/80"
            onClick={() => setShowPreview(null)}
          />
          <div className="relative bg-white rounded-xl p-6 max-w-4xl w-full">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-[#111827]">Media Preview</h4>
              <button
                onClick={() => setShowPreview(null)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F9FAFB] transition-colors"
              >
                <X className="w-5 h-5 text-[#6B7280]" />
              </button>
            </div>
            <div className="aspect-video bg-gradient-to-br from-[#F9FAFB] to-[#E5E7EB] rounded-lg flex items-center justify-center">
              <p className="text-[#6B7280]">Preview content would appear here</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
