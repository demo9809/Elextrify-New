import { useState } from "react";
import {
  Clock,
  Plus,
  Calendar as CalendarIcon,
  Zap,
  Info,
  Play,
  Users,
  ImageIcon,
  Pause,
  ChevronDown,
  ChevronUp,
  Edit2,
  Trash2,
} from "lucide-react";
import { CampaignData } from "../NewCampaignWizard";
import { SlotDetailModal } from "../modals/SlotDetailModal";

interface Step4ScheduleProps {
  data: Partial<CampaignData>;
  onUpdate: (updates: Partial<CampaignData>) => void;
  campaignId?: string; // Add campaign ID to track which ads belong to this campaign
  isEditing?: boolean; // Flag to show we're editing an existing campaign
}

const DAYS_OF_WEEK = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];
const HOURS = Array.from({ length: 24 }, (_, i) => i);
const PEAK_HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17]; // 9 AM - 6 PM
const SLOT_CAPACITY_SECONDS = 3600; // 1 hour = 3600 seconds

interface AdInSlot {
  id: string;
  brandName: string;
  adName: string;
  contentType: "playlist" | "media";
  contentName: string;
  adDuration: number; // Single play duration in seconds
  playsPerHour: number; // How many times it plays per hour
  totalSecondsPerHour: number; // adDuration × playsPerHour
  isOwnAd: boolean;
  sequence: number;
  paused?: boolean; // Add pause state
}

interface TimeSlot {
  day: number;
  hour: number;
  ads: AdInSlot[];
}

// Mock data - simulating existing ads from other brands
const MOCK_EXISTING_ADS: TimeSlot[] = [
  {
    day: 1,
    hour: 9,
    ads: [
      {
        id: "a1",
        brandName: "Nike",
        adName: "Summer Sale 2025",
        contentType: "playlist",
        contentName: "Nike Summer Campaign",
        adDuration: 15,
        playsPerHour: 12,
        totalSecondsPerHour: 180,
        isOwnAd: false,
        sequence: 1,
      },
      {
        id: "a2",
        brandName: "Adidas",
        adName: "New Collection",
        contentType: "media",
        contentName: "Adidas_Hero.mp4",
        adDuration: 30,
        playsPerHour: 8,
        totalSecondsPerHour: 240,
        isOwnAd: false,
        sequence: 2,
      },
    ],
  },
  {
    day: 1,
    hour: 10,
    ads: [
      {
        id: "a4",
        brandName: "Coca-Cola",
        adName: "Refresh Your Day",
        contentType: "media",
        contentName: "CocaCola_30s.mp4",
        adDuration: 10,
        playsPerHour: 15,
        totalSecondsPerHour: 150,
        isOwnAd: false,
        sequence: 1,
      },
    ],
  },
  {
    day: 3,
    hour: 14,
    ads: [
      {
        id: "a6",
        brandName: "Samsung",
        adName: "Galaxy Launch",
        contentType: "playlist",
        contentName: "Samsung Tech Showcase",
        adDuration: 45,
        playsPerHour: 6,
        totalSecondsPerHour: 270,
        isOwnAd: false,
        sequence: 1,
      },
      {
        id: "a7",
        brandName: "Apple",
        adName: "iPhone Promo",
        contentType: "media",
        contentName: "iPhone_Ad.mp4",
        adDuration: 30,
        playsPerHour: 10,
        totalSecondsPerHour: 300,
        isOwnAd: false,
        sequence: 2,
      },
    ],
  },
];

// Mock data for EDITING existing campaign - these are the ads already scheduled in this campaign
const MOCK_CAMPAIGN_ADS: TimeSlot[] = [
  {
    day: 1,
    hour: 9,
    ads: [
      {
        id: "a3",
        brandName: "Your Brand",
        adName: "Holiday Campaign",
        contentType: "playlist",
        contentName: "Holiday Campaign 2025",
        adDuration: 30,
        playsPerHour: 10,
        totalSecondsPerHour: 300,
        isOwnAd: true,
        sequence: 3,
      },
    ],
  },
  {
    day: 1,
    hour: 10,
    ads: [
      {
        id: "a5",
        brandName: "Your Brand",
        adName: "Holiday Campaign",
        contentType: "playlist",
        contentName: "Holiday Campaign 2025",
        adDuration: 30,
        playsPerHour: 10,
        totalSecondsPerHour: 300,
        isOwnAd: true,
        sequence: 2,
      },
    ],
  },
  {
    day: 2,
    hour: 14,
    ads: [
      {
        id: "a8",
        brandName: "Your Brand",
        adName: "Product Launch",
        contentType: "playlist",
        contentName: "Product Launch Mix",
        adDuration: 45,
        playsPerHour: 8,
        totalSecondsPerHour: 360,
        isOwnAd: true,
        sequence: 1,
        paused: true,
      },
    ],
  },
  {
    day: 4,
    hour: 10,
    ads: [
      {
        id: "a9",
        brandName: "Your Brand",
        adName: "Holiday Campaign",
        contentType: "playlist",
        contentName: "Holiday Campaign 2025",
        adDuration: 30,
        playsPerHour: 10,
        totalSecondsPerHour: 300,
        isOwnAd: true,
        sequence: 1,
      },
    ],
  },
  {
    day: 5,
    hour: 15,
    ads: [
      {
        id: "a10",
        brandName: "Your Brand",
        adName: "Product Launch",
        contentType: "playlist",
        contentName: "Product Launch Mix",
        adDuration: 45,
        playsPerHour: 8,
        totalSecondsPerHour: 360,
        isOwnAd: true,
        sequence: 1,
      },
    ],
  },
];

export function Step4Schedule({
  data,
  onUpdate,
  campaignId,
  isEditing,
}: Step4ScheduleProps) {
  // Initialize with different data based on create vs edit mode
  const getInitialTimeSlots = (): TimeSlot[] => {
    if (isEditing) {
      // Edit mode: merge existing ads from other brands + this campaign's ads
      const merged = [...MOCK_EXISTING_ADS];

      // Add campaign ads to the appropriate slots
      MOCK_CAMPAIGN_ADS.forEach((campaignSlot) => {
        const existingSlotIndex = merged.findIndex(
          (s) =>
            s.day === campaignSlot.day &&
            s.hour === campaignSlot.hour,
        );

        if (existingSlotIndex >= 0) {
          // Slot exists, add campaign ads to it
          merged[existingSlotIndex].ads.push(
            ...campaignSlot.ads,
          );
        } else {
          // Create new slot with campaign ads
          merged.push(campaignSlot);
        }
      });

      return merged;
    } else {
      // Create mode: only show other brands' ads, no campaign ads yet
      return [...MOCK_EXISTING_ADS];
    }
  };

  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(
    getInitialTimeSlots(),
  );
  const [selectedDay, setSelectedDay] = useState<number>(1);

  // Multi-selection state
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState<{
    day: number;
    hour: number;
  } | null>(null);
  const [selectedSlots, setSelectedSlots] = useState<
    Set<string>
  >(new Set());
  const [showSlotModal, setShowSlotModal] = useState(false);

  // Campaign ads summary collapse state
  const [
    isCampaignSummaryExpanded,
    setIsCampaignSummaryExpanded,
  ] = useState(false);

  const formatHour = (hour: number): string => {
    if (hour === 0) return "12 AM";
    if (hour === 12) return "12 PM";
    if (hour < 12) return `${hour} AM`;
    return `${hour - 12} PM`;
  };

  const formatDuration = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return remainingSeconds > 0
      ? `${minutes}m ${remainingSeconds}s`
      : `${minutes}m`;
  };

  const getSlotKey = (day: number, hour: number): string => {
    return `${day}-${hour}`;
  };

  // Check if slot is in peak hours
  const isPeakHour = (hour: number): boolean => {
    return PEAK_HOURS.includes(hour);
  };

  // Get slot data for a specific day/hour
  const getSlot = (
    day: number,
    hour: number,
  ): TimeSlot | undefined => {
    return timeSlots.find(
      (slot) => slot.day === day && slot.hour === hour,
    );
  };

  // Calculate used capacity in a slot (in seconds)
  const getUsedCapacity = (
    day: number,
    hour: number,
  ): number => {
    const slot = getSlot(day, hour);
    if (!slot) return 0;
    return slot.ads.reduce(
      (total, ad) => total + ad.totalSecondsPerHour,
      0,
    );
  };

  // Calculate available capacity in a slot (in seconds)
  const getAvailableCapacity = (
    day: number,
    hour: number,
  ): number => {
    return SLOT_CAPACITY_SECONDS - getUsedCapacity(day, hour);
  };

  // Calculate fill percentage (0-100)
  const getFillPercentage = (
    day: number,
    hour: number,
  ): number => {
    const used = getUsedCapacity(day, hour);
    return Math.round((used / SLOT_CAPACITY_SECONDS) * 100);
  };

  // Check if slot has any ads
  const hasAds = (day: number, hour: number): boolean => {
    const slot = getSlot(day, hour);
    return slot !== undefined && slot.ads.length > 0;
  };

  // Mouse selection handlers
  const handleMouseDown = (day: number, hour: number) => {
    setIsSelecting(true);
    setSelectionStart({ day, hour });
    setSelectedSlots(new Set([getSlotKey(day, hour)]));
  };

  const handleMouseEnter = (day: number, hour: number) => {
    if (!isSelecting || !selectionStart) return;

    // Calculate the rectangular selection area
    const minDay = Math.min(selectionStart.day, day);
    const maxDay = Math.max(selectionStart.day, day);
    const minHour = Math.min(selectionStart.hour, hour);
    const maxHour = Math.max(selectionStart.hour, hour);

    const newSelection = new Set<string>();
    for (let d = minDay; d <= maxDay; d++) {
      for (let h = minHour; h <= maxHour; h++) {
        newSelection.add(getSlotKey(d, h));
      }
    }

    setSelectedSlots(newSelection);
  };

  const handleMouseUp = () => {
    if (isSelecting && selectedSlots.size > 0) {
      // Open modal with multiple slots selected
      setShowSlotModal(true);
    }

    setIsSelecting(false);
    setSelectionStart(null);
  };

  // Add new ad to slots
  const handleAddAdToSlots = (
    selectedSlotKeys: Set<string>,
    ad: AdInSlot,
  ) => {
    const updatedSlots = [...timeSlots];

    selectedSlotKeys.forEach((slotKey) => {
      const [dayStr, hourStr] = slotKey.split("-");
      const day = parseInt(dayStr);
      const hour = parseInt(hourStr);

      const existingSlotIndex = updatedSlots.findIndex(
        (s) => s.day === day && s.hour === hour,
      );

      // Create new ad with unique ID for each slot
      const slotAd = {
        ...ad,
        id: `${ad.id}-${day}-${hour}`, // Unique ID per slot
      };

      if (existingSlotIndex >= 0) {
        // Slot exists, add ad to it
        updatedSlots[existingSlotIndex].ads.push(slotAd);
      } else {
        // Create new slot
        updatedSlots.push({ day, hour, ads: [slotAd] });
      }
    });

    setTimeSlots(updatedSlots);
  };

  // Delete user's own ad
  const handleDeleteAd = (
    day: number,
    hour: number,
    adId: string,
  ) => {
    const slotIndex = timeSlots.findIndex(
      (s) => s.day === day && s.hour === hour,
    );
    if (slotIndex < 0) return;

    const updatedSlots = [...timeSlots];
    updatedSlots[slotIndex].ads = updatedSlots[
      slotIndex
    ].ads.filter((ad) => ad.id !== adId);

    // Remove slot if no ads left
    if (updatedSlots[slotIndex].ads.length === 0) {
      updatedSlots.splice(slotIndex, 1);
    }

    setTimeSlots(updatedSlots);
  };

  // Toggle pause state for individual ad/playlist
  const handleTogglePauseAd = (
    day: number,
    hour: number,
    adId: string,
  ) => {
    const slotIndex = timeSlots.findIndex(
      (s) => s.day === day && s.hour === hour,
    );
    if (slotIndex < 0) return;

    const updatedSlots = [...timeSlots];
    const adIndex = updatedSlots[slotIndex].ads.findIndex(
      (ad) => ad.id === adId,
    );

    if (adIndex >= 0) {
      updatedSlots[slotIndex].ads[adIndex].paused =
        !updatedSlots[slotIndex].ads[adIndex].paused;
      setTimeSlots(updatedSlots);
    }
  };

  // Get events for selected day
  const slotsForSelectedDay = timeSlots.filter(
    (slot) => slot.day === selectedDay,
  );

  // Get all own ads across all slots (for editing campaign view)
  const getAllOwnAds = () => {
    const ownAds: Array<{
      day: number;
      hour: number;
      ad: AdInSlot;
    }> = [];
    timeSlots.forEach((slot) => {
      slot.ads.forEach((ad) => {
        if (ad.isOwnAd) {
          ownAds.push({ day: slot.day, hour: slot.hour, ad });
        }
      });
    });
    return ownAds;
  };

  const campaignAds = getAllOwnAds();
  const activeCampaignAds = campaignAds.filter(
    ({ ad }) => !ad.paused,
  );
  const pausedCampaignAds = campaignAds.filter(
    ({ ad }) => ad.paused,
  );

  // Check if a slot has this campaign's ads
  const slotHasCampaignAd = (
    day: number,
    hour: number,
  ): boolean => {
    const slot = getSlot(day, hour);
    if (!slot) return false;
    return slot.ads.some((ad) => ad.isOwnAd);
  };

  // Calculate stats
  const totalSlots = 7 * 24;
  const slotsWithAds = timeSlots.length;
  const fullyBookedSlots = timeSlots.filter((slot) => {
    const used = slot.ads.reduce(
      (sum, ad) => sum + ad.totalSecondsPerHour,
      0,
    );
    return used >= SLOT_CAPACITY_SECONDS;
  }).length;
  const partiallyFilledSlots = slotsWithAds - fullyBookedSlots;
  const emptySlots = totalSlots - slotsWithAds;

  return (
    <div
      className="p-8"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="max-w-full">
        {/* Section Title */}
        <div className="mb-6">
          <h3 className="text-[#111827] mb-2">
            Schedule & Ad Rotation
          </h3>
          <p className="text-[#6B7280]">
            Click and drag to select multiple time slots. Each
            slot holds multiple ads that rotate throughout the
            hour.
          </p>
        </div>

        {/* Stats and Legend */}
        <div className="mb-6">
          <div className="grid grid-cols-5 gap-4">
            {/* Empty Slots */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#6B7280]">
                  Empty Slots
                </span>
                <div className="w-3 h-3 bg-white border-2 border-[#E5E7EB] rounded"></div>
              </div>
              <div className="text-2xl text-[#111827]">
                {emptySlots}
              </div>
            </div>

            {/* Partially Filled */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#6B7280]">
                  Partially Filled
                </span>
                <div className="w-3 h-3 bg-[#FCD34D] rounded"></div>
              </div>
              <div className="text-2xl text-[#111827]">
                {partiallyFilledSlots}
              </div>
            </div>

            {/* Fully Booked */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#6B7280]">
                  Fully Booked
                </span>
                <div className="w-3 h-3 bg-[#DC2626] rounded"></div>
              </div>
              <div className="text-2xl text-[#111827]">
                {fullyBookedSlots}
              </div>
            </div>

            {/* Peak Hours */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#6B7280]">
                  Peak Hours
                </span>
                <Zap className="w-3 h-3 text-[#F59E0B]" />
              </div>
              <div className="text-sm text-[#111827]">
                9 AM - 6 PM
              </div>
            </div>

            {/* Info */}
            <div className="bg-[#F0F9FF] border border-[#BAE6FD] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-3 h-3 text-[#0369A1]" />
                <span className="text-xs text-[#0369A1]">
                  Multi-Slot Selection
                </span>
              </div>
              <div className="text-xs text-[#0369A1]">
                Drag to select slots
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Calendar Grid */}
          <div className="flex-1">
            <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
              {/* Grid Container */}
              <div className="overflow-x-auto">
                <div
                  className="inline-grid select-none"
                  style={{
                    gridTemplateColumns:
                      "80px repeat(7, 100px)",
                  }}
                >
                  {/* Header Row - Days */}
                  <div className="bg-[#F9FAFB] border-b border-[#E5E7EB] p-3 sticky left-0 z-10">
                    <Clock className="w-4 h-4 text-[#6B7280]" />
                  </div>
                  {DAYS_OF_WEEK.map((day, index) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(index)}
                      className={`
                        bg-[#F9FAFB] border-b border-l border-[#E5E7EB] p-3 text-center transition-colors
                        ${selectedDay === index ? "bg-[#EFF6FF] text-[#3B82F6]" : "text-[#111827] hover:bg-[#F3F4F6]"}
                      `}
                    >
                      <div className="text-sm">{day}</div>
                    </button>
                  ))}

                  {/* Time Rows */}
                  {HOURS.map((hour) => (
                    <div key={hour} className="contents">
                      {/* Hour Label */}
                      <div className="bg-[#F9FAFB] border-b border-[#E5E7EB] p-3 sticky left-0 z-10 flex items-center justify-end">
                        <div className="flex items-center gap-1.5">
                          {isPeakHour(hour) && (
                            <Zap className="w-3 h-3 text-[#F59E0B]" />
                          )}
                          <span className="text-xs text-[#6B7280]">
                            {formatHour(hour)}
                          </span>
                        </div>
                      </div>

                      {/* Day Cells */}
                      {DAYS_OF_WEEK.map((_, dayIndex) => {
                        const isPeak = isPeakHour(hour);
                        const fillPercentage =
                          getFillPercentage(dayIndex, hour);
                        const slot = getSlot(dayIndex, hour);
                        const available = getAvailableCapacity(
                          dayIndex,
                          hour,
                        );
                        const hasAdsInSlot = hasAds(
                          dayIndex,
                          hour,
                        );
                        const slotKey = getSlotKey(
                          dayIndex,
                          hour,
                        );
                        const isSelected =
                          selectedSlots.has(slotKey);
                        const hasCampaignAd = slotHasCampaignAd(
                          dayIndex,
                          hour,
                        );

                        // Determine background color based on fill percentage
                        let bgColor = "bg-white";
                        if (isSelected) {
                          bgColor = "bg-[#DBEAFE]";
                        } else if (fillPercentage >= 100) {
                          bgColor = "bg-[#FEE2E2]"; // Fully booked - red tint
                        } else if (fillPercentage >= 50) {
                          bgColor = "bg-[#FEF3C7]"; // Partially filled - yellow
                        } else if (fillPercentage > 0) {
                          bgColor = "bg-[#E0F2FE]"; // Lightly filled - light blue
                        } else if (isPeak) {
                          bgColor = "bg-[#FFFBEB]"; // Empty peak slot - light yellow
                        }

                        return (
                          <div
                            key={slotKey}
                            onMouseDown={() =>
                              handleMouseDown(dayIndex, hour)
                            }
                            onMouseEnter={() =>
                              handleMouseEnter(dayIndex, hour)
                            }
                            className={`
                              h-14 border-b border-l border-[#E5E7EB] transition-all relative cursor-pointer
                              ${bgColor} hover:ring-2 hover:ring-[#3B82F6] hover:ring-inset
                              ${isSelected ? "ring-2 ring-[#3B82F6] ring-inset" : ""}
                            `}
                            title={`${formatHour(hour)} - ${fillPercentage}% filled${hasCampaignAd ? " • This Campaign" : ""}`}
                          >
                            {/* Campaign indicator dot - Top right corner */}
                            {hasCampaignAd && (
                              <div className="absolute top-1 right-1 z-10">
                                <div className="w-2 h-2 bg-[#16A34A] rounded-full border border-white shadow-sm"></div>
                              </div>
                            )}

                            {/* Slot content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-1">
                              {hasAdsInSlot && (
                                <>
                                  {/* Fill percentage bar */}
                                  <div className="w-full bg-[#E5E7EB] rounded-full h-1.5 mb-1 overflow-hidden">
                                    <div
                                      className={`h-full transition-all ${
                                        fillPercentage >= 100
                                          ? "bg-[#DC2626]"
                                          : fillPercentage >= 75
                                            ? "bg-[#F59E0B]"
                                            : "bg-[#3B82F6]"
                                      }`}
                                      style={{
                                        width: `${Math.min(fillPercentage, 100)}%`,
                                      }}
                                    />
                                  </div>

                                  {/* Brand count and fill % */}
                                  <div className="flex items-center gap-1">
                                    <Users className="w-3 h-3 text-[#6B7280]" />
                                    <span className="text-xs text-[#111827]">
                                      {slot?.ads.length}
                                    </span>
                                  </div>
                                  <div className="text-xs text-[#6B7280]">
                                    {fillPercentage}%
                                  </div>

                                  {fillPercentage < 100 && (
                                    <div className="text-[10px] text-[#16A34A] mt-0.5">
                                      +
                                      {formatDuration(
                                        available,
                                      )}
                                    </div>
                                  )}
                                </>
                              )}

                              {!hasAdsInSlot && (
                                <>
                                  <Plus className="w-5 h-5 text-[#9CA3AF] mb-1" />
                                  <span className="text-[10px] text-[#6B7280]">
                                    Available
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Selection indicator */}
            {selectedSlots.size > 0 && (
              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm text-[#3B82F6]">
                  {selectedSlots.size} slot
                  {selectedSlots.size !== 1 ? "s" : ""} selected
                </div>
                {!showSlotModal && (
                  <button
                    onClick={() => setShowSlotModal(true)}
                    className="px-4 py-2 bg-[#D9480F] text-white rounded-md hover:bg-[#C1410E] transition-colors text-sm"
                  >
                    Schedule Ad for Selected Slots
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Sidebar - Day Summary */}
          <div className="w-80 space-y-4">
            {/* All Slots Summary */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 h-[600px] flex flex-col">
              <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <h4 className="text-sm text-[#111827]">
                  {DAYS_OF_WEEK[selectedDay]} Slots
                </h4>
                <span className="text-xs text-[#6B7280]">
                  {slotsForSelectedDay.length} active
                </span>
              </div>

              {slotsForSelectedDay.length === 0 ? (
                <div className="text-center py-8 text-[#6B7280] flex-1 flex flex-col items-center justify-center">
                  <CalendarIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No ads scheduled</p>
                  <p className="text-xs mt-1">
                    Drag to select time slots
                  </p>
                </div>
              ) : (
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {slotsForSelectedDay.map((slot) => {
                    const fillPct = getFillPercentage(
                      slot.day,
                      slot.hour,
                    );
                    const available = getAvailableCapacity(
                      slot.day,
                      slot.hour,
                    );
                    const hasOwnAd = slot.ads.some(
                      (ad) => ad.isOwnAd,
                    );

                    return (
                      <button
                        key={`${slot.day}-${slot.hour}`}
                        onClick={() => {
                          setSelectedSlots(
                            new Set([
                              getSlotKey(slot.day, slot.hour),
                            ]),
                          );
                          setShowSlotModal(true);
                        }}
                        className={`
                          w-full text-left p-3 rounded-lg border transition-all
                          ${
                            hasOwnAd
                              ? "bg-[#F0FDF4] border-[#16A34A] hover:shadow-md"
                              : "bg-[#F9FAFB] border-[#E5E7EB] hover:bg-white"
                          }
                        `}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#6B7280]" />
                            <span className="text-sm text-[#111827]">
                              {formatHour(slot.hour)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {hasOwnAd && (
                              <span className="px-1.5 py-0.5 bg-[#16A34A] text-white rounded text-[10px]">
                                THIS CAMPAIGN
                              </span>
                            )}
                            {isPeakHour(slot.hour) && (
                              <Zap className="w-3 h-3 text-[#F59E0B]" />
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-3 h-3 text-[#6B7280]" />
                          <span className="text-xs text-[#6B7280]">
                            {slot.ads.length} brand
                            {slot.ads.length !== 1 ? "s" : ""}
                          </span>
                        </div>

                        <div className="w-full bg-[#E5E7EB] rounded-full h-2 mb-1 overflow-hidden">
                          <div
                            className={`h-full ${
                              fillPct >= 100
                                ? "bg-[#DC2626]"
                                : fillPct >= 75
                                  ? "bg-[#F59E0B]"
                                  : "bg-[#3B82F6]"
                            }`}
                            style={{
                              width: `${Math.min(fillPct, 100)}%`,
                            }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#6B7280]">
                            {fillPct}% filled
                          </span>
                          {available > 0 && (
                            <span className="text-[#16A34A]">
                              +{formatDuration(available)}{" "}
                              available
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Slot Detail Modal */}
      {showSlotModal && selectedSlots.size > 0 && (
        <SlotDetailModal
          isOpen={showSlotModal}
          onClose={() => {
            setShowSlotModal(false);
            setSelectedSlots(new Set());
          }}
          selectedSlots={selectedSlots}
          getSlot={getSlot}
          getAvailableCapacity={getAvailableCapacity}
          onAddAd={handleAddAdToSlots}
          onDeleteAd={handleDeleteAd}
          onTogglePauseAd={handleTogglePauseAd}
        />
      )}
    </div>
  );
}