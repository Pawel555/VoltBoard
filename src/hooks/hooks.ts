import { useQuery } from "@tanstack/react-query";
import { fetchStations } from "../api/stations/api";
import { getDistance, getLocation } from "../utils/storage";
import { INITIAL_DISTANCE, INITIAL_LOCATION } from "../constants/locations";
import { useEffect, useState } from "react";

export function useFavouriteStations(widgetResourceIds: (string | number)[]) {
  return useQuery({
    queryKey: ["stations", widgetResourceIds],
    queryFn: () =>
      fetchStations({
        compact: false,
        verbose: false,
        chargepointid: widgetResourceIds.join(","),
      }),
  });
}

export function useNearbyStations() {
  const userLocation = getLocation();
  const distance = getDistance() || INITIAL_DISTANCE;

  const center = {
    lat: userLocation?.latitude || INITIAL_LOCATION.lat,
    lng: userLocation?.longitude || INITIAL_LOCATION.lng,
  };

  const { data: stations, isLoading } = useQuery({
    queryKey: ["NearbyStations", center.lat, center.lng, distance],
    queryFn: () =>
      fetchStations({
        compact: false,
        verbose: true,
        longitude: center.lng,
        latitude: center.lat,
        distance: Number(distance) || INITIAL_DISTANCE,
        maxresults: 10,
        distanceunit: "km",
      }),
  });

  return { stations, isLoading, center };
}

export const useWindowWidth = (delay: number = 250): number => {
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const handleResize = () => {
      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        setWidth(window.innerWidth);
      }, delay);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [delay]);

  return width;
};
