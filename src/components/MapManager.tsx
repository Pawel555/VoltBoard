import { LocationSearch } from "./LocationSearch";
import { useState } from "react";
import type { Coordinates } from "../types/common";
import { LuMapPin } from "react-icons/lu";
import { IconButton } from "./IconButton";
import { IoIosAdd } from "react-icons/io";
import { useTranslation } from "react-i18next";
import {
  AddMapButtonWrapper,
  AddMapSubtitle,
  DistanceInputWrapper,
} from "./styles";
import { useQuery } from "@tanstack/react-query";

interface LocationData {
  locationString: string;
  latitude: number;
  longitude: number;
}

export function MapManager({ addMap }: { addMap: () => void }) {
  //TODO:  Save distance and location in local storage
  const [userLocation, setUserLocation] = useState<Coordinates>();
  const [locationString, setLocationString] = useState<string>();
  const [distance, setDistance] = useState("50");
  const { t } = useTranslation();

  const fetchLocation = async (): Promise<LocationData> => {
    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 5000,
        });
      });

      return {
        locationString: `${t("mapManager.coordinates")}: ${pos.coords.latitude.toFixed(2)}, ${pos.coords.longitude.toFixed(2)}`,
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
      <AddMapSubtitle>{t("mapManager.chooseLocation")}</AddMapSubtitle>
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
          isFetching ? t("mapManager.detecting") : t("mapManager.myLocation")
        }
        buttonIcon={<LuMapPin />}
        locationString={locationString}
      />

      <DistanceInputWrapper>
        <label>{t("mapManager.distanceLabel", { distance })}</label>
        <input
          type="range"
          min={0}
          max={100}
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
      </DistanceInputWrapper>
      <AddMapButtonWrapper>
        <IconButton
          value={true}
          text={t("dashboard.addButton")}
          onClick={addMap}
          icon={<IoIosAdd />}
          useActiveStyle
        />
      </AddMapButtonWrapper>
    </>
  );
}
