import { useState, useEffect } from "react";

interface useLocationReturnType {
  loading: boolean;
  locationResult: any;
  setLocationQuery: (location: string) => void;
}

export function useLocation(): useLocationReturnType {
  const [loading, setLoading] = useState(false);
  const [locationResult, setLocationResult] = useState<any>(null);
  const [locationQuery, setLocationQuery] = useState<string>("");
  const fetchLocation = async () => {
    try {
      setLoading(true);
      const apiurl = `https://nominatim.openstreetmap.org/search?q=${locationQuery}&format=json`;
      const res = await fetch(apiurl);
      const data = await res.json();
      setLocationResult(data);
    } catch (err) {
      console.error("Failed to fetch location:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!locationQuery) return;
    fetchLocation();
  }, [locationQuery]);

  return { loading, locationResult, setLocationQuery };
}
