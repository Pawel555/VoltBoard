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

export function MapManager({ addMap }: { addMap: () => void }) {
  //TODO: Handle location detection and save distance and location in local storage
  const [userLocation, setUserLocation] = useState<Coordinates>();
  const [distance, setDistance] = useState("50");
  const { t } = useTranslation();

  return (
    <>
      <AddMapSubtitle>{t("mapManager.chooseLocation")}</AddMapSubtitle>

      <LocationSearch
        onSearch={(location) => setUserLocation(location)}
        buttonText={t("mapManager.myLocation")}
        buttonIcon={<LuMapPin />}
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
