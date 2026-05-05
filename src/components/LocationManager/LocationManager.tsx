import { LocationSearch } from "../LocationSearch";
import { useState } from "react";
import { LuMapPin } from "react-icons/lu";
import { IoIosAdd } from "react-icons/io";
import { useTranslation } from "react-i18next";
import {
  AddButtonWrapper,
  AddLocationSubtitle,
  DistanceInputWrapper,
} from "./styles";
import { useQuery } from "@tanstack/react-query";
import { IconButton } from "../IconButton";
import type { Coordinates, LocationData } from "../../types/common";
import { INITIAL_LOCATION } from "../../constants/locations";
import { getDistance, getLocation } from "../../utils/storage";

export function LocationManager({
  addWidget,
  subtitle,
}: {
  addWidget: (distance: string, location: LocationData) => void;
  subtitle: string;
}) {
  const storedLocation = getLocation();
  const storedDistance = getDistance();

  const [userLocation, setUserLocation] = useState<Coordinates>();
  const [locationString, setLocationString] = useState<string>();
  const [distance, setDistance] = useState(storedDistance || "50");
  const { t } = useTranslation();

  const fetchLocation = async (): Promise<LocationData> => {
    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 5000,
        });
      });

      return {
        locationString: `${t("locationManager.coordinates")}: ${pos.coords.latitude.toFixed(2)}, ${pos.coords.longitude.toFixed(2)}`,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      };
    } catch (error) {
      console.warn(
        "Unable to download precise location, I'm trying by IP...",
        error,
      );

      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();

      return {
        locationString: `${data.city},${data.region}, ${data.country_name}`,
        latitude: data.latitude,
        longitude: data.longitude,
      };
    }
  };

  const { refetch, isFetching } = useQuery({
    queryKey: ["locationData"],
    queryFn: fetchLocation,
    enabled: false,
  });

  return (
    <>
      <AddLocationSubtitle>{subtitle}</AddLocationSubtitle>
      <LocationSearch
        onSearch={async () => {
          const { data } = await refetch();
          if (data) {
            setLocationString(data.locationString);
            setUserLocation({
              lat: data.latitude,
              lng: data.longitude,
            });
          }
        }}
        buttonText={
          isFetching
            ? t("locationManager.detecting")
            : t("locationManager.myLocation")
        }
        buttonIcon={<LuMapPin />}
        locationString={locationString}
      />

      <DistanceInputWrapper>
        <label>{t("locationManager.distanceLabel", { distance })}</label>
        <input
          type="range"
          min={0}
          max={100}
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
      </DistanceInputWrapper>
      <AddButtonWrapper>
        <IconButton
          value={true}
          text={t("dashboard.addButton")}
          onClick={() => {
            addWidget(distance, {
              locationString: locationString || "",
              latitude: userLocation?.lat || INITIAL_LOCATION.lat,
              longitude: userLocation?.lng || INITIAL_LOCATION.lng,
            });
          }}
          icon={<IoIosAdd />}
          useActiveStyle
        />
      </AddButtonWrapper>
    </>
  );
}
