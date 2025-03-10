"use client";
import { useState, useRef, useCallback, KeyboardEvent, useEffect } from "react";
import { useLocation } from "@/Hooks/useLocation";
import formatLocationName from "@/Utils/formatLocation";
import icons from "@/constants/icons";
import Image from "next/image";

interface DesktopDashboardHeaderProps {
  location: string;
  setLocation: (location: string) => void;
}

const DesktopDashboardHeader = ({
  location,
  setLocation,
}: DesktopDashboardHeaderProps) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [suggestion, setSuggestion] = useState<string>("");
  const { loading, locationResult, setLocationQuery } = useLocation();

  const MAX_RESULTS_FOR_PREDICTION = 10;

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (!value) {
        setSuggestion("");
        setLocation("");
        return;
      }

      setLocation(value);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setLocationQuery(value);
      }, 600);
    },
    [setLocationQuery, setLocation]
  );

  // Update suggestion when location results change
  useEffect(() => {
    if (
      locationResult?.length > 0 &&
      locationResult?.length <= MAX_RESULTS_FOR_PREDICTION &&
      location &&
      location.trim() !== ""
    ) {
      const firstResult = locationResult[0];
      const formattedSuggestion = formatLocationName(firstResult.display_name);

      if (
        formattedSuggestion.toLowerCase().startsWith(location.toLowerCase())
      ) {
        setSuggestion(formattedSuggestion);
      } else {
        setSuggestion("");
      }
    } else {
      setSuggestion("");
    }
  }, [locationResult, location]);

  // Handle key events for autocomplete
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && suggestion && suggestion !== location) {
      e.preventDefault();
      acceptSuggestion();
    } else if (e.key === "Escape") {
      setSuggestion("");
    }
  };

  // Accept the current suggestion
  const acceptSuggestion = () => {
    if (suggestion && suggestion !== location) {
      setLocation(suggestion);
      setSuggestion("");
      inputRef.current?.focus();
    }
  };

  // Only show completion part of the suggestion
  const getCompletion = () => {
    if (
      !suggestion ||
      !location ||
      suggestion.toLowerCase() === location.toLowerCase()
    ) {
      return "";
    }

    if (suggestion.toLowerCase().startsWith(location.toLowerCase())) {
      return suggestion.slice(location.length);
    }

    return "";
  };

  const completion = getCompletion();

  // Determine if we should show the suggestion
  const shouldShowSuggestion =
    !loading &&
    locationResult &&
    locationResult.length > 0 &&
    locationResult.length <= MAX_RESULTS_FOR_PREDICTION &&
    !!completion;

  return (
    <div className="relative w-full flex items-center">
      <div className="relative w-full">
        <div className="flex items-center bg-transparent px-4 py-2 w-full">
          <div className="flex w-full border rounded-md px-2 py-1 relative">
            <Image
              src={icons.search}
              alt="Search"
              width={24}
              height={24}
              className="mr-2 object-scale-down"
            />

            <div className="relative w-full">
              <div className="relative w-full">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search for a location"
                  className="w-full outline-none py-2 bg-transparent text-white placeholder:text-wh"
                  onChange={handleSearch}
                  onKeyDown={handleKeyDown}
                  value={location}
                  autoComplete="off"
                />

                <div className="absolute top-0 left-0 w-full pointer-events-none flex py-2 truncate">
                  <span className="invisible whitespace-pre">{location}</span>
                  <span className="text-gray-400">{completion}</span>
                </div>
              </div>
            </div>

            {shouldShowSuggestion && (
              <button
                type="button"
                onClick={acceptSuggestion}
                className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-md px-2 py-1 self-center ml-2 transition-colors duration-150 flex items-center"
              >
                <span className="hidden sm:inline mr-1">Autocomplete</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-0 sm:ml-1"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopDashboardHeader;
