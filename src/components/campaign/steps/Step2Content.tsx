import { useState } from 'react';
import { Film, Image } from 'lucide-react';
import { CampaignData } from '../NewCampaignWizard';

interface Step2ContentProps {
  data: Partial<CampaignData>;
  onUpdate: (updates: Partial<CampaignData>) => void;
}

// Mock data
const MOCK_PLAYLISTS = [
  { id: 'pl1', name: 'Holiday Campaign 2025', itemCount: 5 },
  { id: 'pl2', name: 'Product Launch Mix', itemCount: 3 },
  { id: 'pl3', name: 'Brand Awareness Pack', itemCount: 8 },
  { id: 'pl4', name: 'Summer Sale Collection', itemCount: 6 },
];

const MOCK_MEDIA = [
  { id: 'm1', name: 'Summer_Sale_Hero.mp4', type: 'video', duration: '0:15' },
  { id: 'm2', name: 'Product_Showcase.jpg', type: 'image', duration: '0:05' },
  { id: 'm3', name: 'Brand_Logo_Animation.mp4', type: 'video', duration: '0:10' },
  { id: 'm4', name: 'Store_Opening_Banner.jpg', type: 'image', duration: '0:05' },
  { id: 'm5', name: 'Holiday_Special.mp4', type: 'video', duration: '0:30' },
];

type ContentType = 'playlist' | 'media';

export function Step2Content({ data, onUpdate }: Step2ContentProps) {
  const [contentType, setContentType] = useState<ContentType>(
    data.contentType || 'playlist'
  );

  const handleContentTypeChange = (type: ContentType) => {
    setContentType(type);
    onUpdate({
      contentType: type,
      playlistId: type === 'playlist' ? data.playlistId : undefined,
      mediaIds: type === 'media' ? data.mediaIds : undefined,
    });
  };

  const handlePlaylistSelect = (playlistId: string) => {
    const playlist = MOCK_PLAYLISTS.find(p => p.id === playlistId);
    onUpdate({
      playlistId,
      playlistName: playlist?.name,
    });
  };

  const handleMediaSelect = (mediaId: string) => {
    onUpdate({
      mediaIds: [mediaId], // Single selection for now
    });
  };

  return (
    <div className="p-8">
      <div className="max-w-[700px] mx-auto">
        {/* Section Title */}
        <div className="mb-8">
          <h3 className="text-[#111827] mb-2">Content Selection</h3>
          <p className="text-[#6B7280]">
            Choose whether to use a playlist or select individual media files.
          </p>
        </div>

        {/* Segmented Toggle */}
        <div className="mb-8">
          <div className="inline-flex bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-1">
            <button
              onClick={() => handleContentTypeChange('playlist')}
              className={`
                flex items-center gap-2 px-6 h-11 rounded-md transition-all
                ${contentType === 'playlist'
                  ? 'bg-white text-[#3B82F6] shadow-sm border border-[#3B82F6]'
                  : 'text-[#6B7280] hover:text-[#111827]'
                }
              `}
            >
              <Film className="w-4 h-4" />
              <span className="text-sm">Playlist</span>
            </button>
            <button
              onClick={() => handleContentTypeChange('media')}
              className={`
                flex items-center gap-2 px-6 h-11 rounded-md transition-all
                ${contentType === 'media'
                  ? 'bg-white text-[#3B82F6] shadow-sm border border-[#3B82F6]'
                  : 'text-[#6B7280] hover:text-[#111827]'
                }
              `}
            >
              <Image className="w-4 h-4" />
              <span className="text-sm">Media</span>
            </button>
          </div>
        </div>

        {/* Content Selection */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
          {contentType === 'playlist' ? (
            <div>
              <label className="block text-sm text-[#111827] mb-3">
                Select Playlist <span className="text-[#DC2626]">*</span>
              </label>
              <select
                value={data.playlistId || ''}
                onChange={(e) => handlePlaylistSelect(e.target.value)}
                className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-md text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              >
                <option value="">Choose a playlist</option>
                {MOCK_PLAYLISTS.map(playlist => (
                  <option key={playlist.id} value={playlist.id}>
                    {playlist.name} ({playlist.itemCount} items)
                  </option>
                ))}
              </select>
              
              {data.playlistId && (
                <div className="mt-4 p-4 bg-[#F0F9FF] border border-[#BAE6FD] rounded-lg">
                  <p className="text-xs text-[#0369A1]">
                    <strong>{MOCK_PLAYLISTS.find(p => p.id === data.playlistId)?.name}</strong> selected
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-sm text-[#111827] mb-3">
                Select Media <span className="text-[#DC2626]">*</span>
              </label>
              <select
                value={data.mediaIds?.[0] || ''}
                onChange={(e) => handleMediaSelect(e.target.value)}
                className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-md text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              >
                <option value="">Choose a media file</option>
                {MOCK_MEDIA.map(media => (
                  <option key={media.id} value={media.id}>
                    {media.name} ({media.duration})
                  </option>
                ))}
              </select>
              
              {data.mediaIds && data.mediaIds.length > 0 && (
                <div className="mt-4 p-4 bg-[#F0F9FF] border border-[#BAE6FD] rounded-lg">
                  <p className="text-xs text-[#0369A1]">
                    <strong>{MOCK_MEDIA.find(m => m.id === data.mediaIds?.[0])?.name}</strong> selected
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
