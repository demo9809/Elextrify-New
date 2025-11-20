import { useState } from 'react';
import { ListVideo, Film, Eye, Edit } from 'lucide-react';
import { AdGroup } from '../NewCampaignWizard';
import { MediaSelectorPanel } from '../panels/MediaSelectorPanel';
import { PlaylistBuilderPanel } from '../panels/PlaylistBuilderPanel';

interface StepAContentProps {
  data: Partial<AdGroup>;
  onUpdate: (updates: Partial<AdGroup>) => void;
  clientId: string;
  clientName: string;
}

const MOCK_PLAYLISTS = [
  { id: 'pl-1', name: 'Holiday Campaign 2025', clientId: 'client-1', itemCount: 5 },
  { id: 'pl-2', name: 'Product Launch', clientId: 'client-1', itemCount: 3 },
  { id: 'pl-3', name: 'Summer Sale Mix', clientId: 'client-2', itemCount: 8 },
  { id: 'pl-4', name: 'Brand Awareness', clientId: 'client-3', itemCount: 4 },
];

export function StepAContent({ data, onUpdate, clientId, clientName }: StepAContentProps) {
  const [showMediaSelector, setShowMediaSelector] = useState(false);
  const [showPlaylistBuilder, setShowPlaylistBuilder] = useState(false);
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);

  const clientPlaylists = MOCK_PLAYLISTS.filter(pl => pl.clientId === clientId);

  const handleContentTypeChange = (type: 'playlist' | 'media') => {
    onUpdate({
      contentType: type,
      playlistId: undefined,
      playlistName: undefined,
      mediaIds: undefined,
    });
  };

  const handlePlaylistSelect = (playlistId: string) => {
    const playlist = MOCK_PLAYLISTS.find(pl => pl.id === playlistId);
    onUpdate({
      playlistId,
      playlistName: playlist?.name || '',
    });
  };

  const handleMediaSelected = (mediaIds: string[]) => {
    onUpdate({ mediaIds });
    setShowMediaSelector(false);
  };

  const handlePlaylistCreated = (playlistId: string, playlistName: string) => {
    onUpdate({
      contentType: 'playlist',
      playlistId,
      playlistName,
    });
    setShowPlaylistBuilder(false);
    setIsCreatingPlaylist(false);
  };

  const handleCreatePlaylist = () => {
    setIsCreatingPlaylist(true);
    setShowPlaylistBuilder(true);
  };

  const handleEditPlaylist = () => {
    setIsCreatingPlaylist(false);
    setShowPlaylistBuilder(true);
  };

  return (
    <>
      <div className="p-8">
        <div className="max-w-[700px]">
          {/* Section Title */}
          <div className="mb-8">
            <h3 className="text-[#111827] mb-2">Select Content</h3>
            <p className="text-[#6B7280]">
              Choose what will be displayed in this ad group. Content is filtered from {clientName}.
            </p>
          </div>

          <div className="space-y-4">
            {/* Option 1: Playlist */}
            <div
              className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                data.contentType === 'playlist'
                  ? 'border-[#D9480F] bg-[#FEF2F2]'
                  : 'border-[#E5E7EB] hover:border-[#D9480F]/30 bg-white'
              }`}
              onClick={() => handleContentTypeChange('playlist')}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  data.contentType === 'playlist' ? 'bg-[#D9480F]' : 'bg-[#F9FAFB]'
                }`}>
                  <ListVideo className={`w-6 h-6 ${
                    data.contentType === 'playlist' ? 'text-white' : 'text-[#6B7280]'
                  }`} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-[#111827]">Use a Playlist</h4>
                    <input
                      type="radio"
                      checked={data.contentType === 'playlist'}
                      onChange={() => handleContentTypeChange('playlist')}
                      className="ml-auto"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <p className="text-sm text-[#6B7280] mb-4">
                    Select from your existing playlists or create a new one
                  </p>

                  {data.contentType === 'playlist' && (
                    <div className="space-y-3">
                      <select
                        value={data.playlistId || ''}
                        onChange={(e) => handlePlaylistSelect(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-md text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNiA2TDExIDEiIHN0cm9rZT0iIzZCNzI4MCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==')] bg-[center_right_1rem] bg-no-repeat"
                      >
                        <option value="">Select a playlist...</option>
                        {clientPlaylists.map(pl => (
                          <option key={pl.id} value={pl.id}>
                            {pl.name} ({pl.itemCount} items)
                          </option>
                        ))}
                      </select>

                      {data.playlistId && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              alert('View playlist items modal would open here');
                            }}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-[#0369A1] hover:bg-[#F0F9FF] rounded-md transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            View Items ({clientPlaylists.find(pl => pl.id === data.playlistId)?.itemCount || 0})
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditPlaylist();
                            }}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-[#0369A1] hover:bg-[#F0F9FF] rounded-md transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                            Edit Playlist
                          </button>
                        </div>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCreatePlaylist();
                        }}
                        className="w-full h-11 px-4 bg-white border-2 border-dashed border-[#E5E7EB] rounded-md text-[#6B7280] hover:border-[#D9480F] hover:text-[#D9480F] transition-colors text-sm"
                      >
                        + Create New Playlist
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Option 2: Direct Media */}
            <div
              className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                data.contentType === 'media'
                  ? 'border-[#D9480F] bg-[#FEF2F2]'
                  : 'border-[#E5E7EB] hover:border-[#D9480F]/30 bg-white'
              }`}
              onClick={() => handleContentTypeChange('media')}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  data.contentType === 'media' ? 'bg-[#D9480F]' : 'bg-[#F9FAFB]'
                }`}>
                  <Film className={`w-6 h-6 ${
                    data.contentType === 'media' ? 'text-white' : 'text-[#6B7280]'
                  }`} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-[#111827]">Use Direct Media</h4>
                    <input
                      type="radio"
                      checked={data.contentType === 'media'}
                      onChange={() => handleContentTypeChange('media')}
                      className="ml-auto"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <p className="text-sm text-[#6B7280] mb-4">
                    Select individual media files from your library
                  </p>

                  {data.contentType === 'media' && (
                    <div className="space-y-3">
                      {data.mediaIds && data.mediaIds.length > 0 ? (
                        <div className="p-4 bg-white border border-[#E5E7EB] rounded-lg">
                          <p className="text-sm text-[#111827] mb-2">
                            {data.mediaIds.length} media file{data.mediaIds.length !== 1 ? 's' : ''} selected
                          </p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowMediaSelector(true);
                            }}
                            className="text-sm text-[#D9480F] hover:text-[#C23D0D]"
                          >
                            Change Selection
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowMediaSelector(true);
                          }}
                          className="w-full h-11 px-4 bg-[#D9480F] text-white rounded-md hover:bg-[#C23D0D] transition-colors"
                        >
                          Select Media
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Validation Message */}
          {!data.contentType && (
            <p className="text-xs text-[#DC2626] mt-4">
              Please select a content type to continue
            </p>
          )}
          {data.contentType === 'playlist' && !data.playlistId && (
            <p className="text-xs text-[#DC2626] mt-4">
              Please select or create a playlist to continue
            </p>
          )}
          {data.contentType === 'media' && (!data.mediaIds || data.mediaIds.length === 0) && (
            <p className="text-xs text-[#DC2626] mt-4">
              Please select at least one media file to continue
            </p>
          )}
        </div>
      </div>

      {/* Nested Panels */}
      {showMediaSelector && (
        <MediaSelectorPanel
          isOpen={showMediaSelector}
          onClose={() => setShowMediaSelector(false)}
          onSave={handleMediaSelected}
          clientId={clientId}
          selectedMediaIds={data.mediaIds || []}
        />
      )}

      {showPlaylistBuilder && (
        <PlaylistBuilderPanel
          isOpen={showPlaylistBuilder}
          onClose={() => {
            setShowPlaylistBuilder(false);
            setIsCreatingPlaylist(false);
          }}
          onSave={handlePlaylistCreated}
          clientId={clientId}
          playlistId={isCreatingPlaylist ? undefined : data.playlistId}
        />
      )}
    </>
  );
}
