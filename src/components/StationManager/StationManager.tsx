import styled from "styled-components";
import { StationList } from "./List";
import { fetchStations } from "../../api/stations/api";
import { useQuery } from "@tanstack/react-query";
import { IconButton } from "../IconButton";
import { IoIosAdd, IoIosSearch } from "react-icons/io";
import { useMemo, useState } from "react";
import type { Station } from "../../types/stations";
import { useTranslation } from "react-i18next";
import type { Coordinates } from "../../types/common";
import { LocationSearch } from "../LocationSearch";

export function StationManager({
  saveSelectedStations,
  widgetStations,
}: {
  saveSelectedStations: (stationsIds: (string | number)[]) => void;
  widgetStations: (number | string)[];
}) {
  const [stationsToAdd, setStationsToAdd] = useState<Station[]>([]);
  const [location, setLocation] = useState<Coordinates>({
    lat: 50,
    lng: 19,
  });

  const { t } = useTranslation();
  const { data: stations, isLoading } = useQuery({
    queryKey: ["listStations", location.lat, location.lng],
    queryFn: () =>
      fetchStations({
        compact: false,
        verbose: false,
        longitude: location.lng,
        latitude: location.lat,
      }),
  });

  const selectedStationIds = useMemo(() => {
    return Array.from(
      new Set([
        ...stationsToAdd.map((station) => station.id),
        ...widgetStations,
      ]),
    );
  }, [stationsToAdd, widgetStations]);

  const handleToggleStation = (station: Station) => {
    setStationsToAdd((prevStations) =>
      prevStations.map((station) => station.id).includes(station.id)
        ? prevStations.filter((s) => s.id !== station.id)
        : [...prevStations, station],
    );
  };

  return (
    <StationManagerWrapper>
      <LocationSearch
        onSearch={(location) => setLocation(location)}
        buttonText={t("dashboard.searchButton")}
        searchTitle={t("dashboard.searchTitle")}
        buttonIcon={<IoIosSearch />}
      />
      <StationList
        stations={stations || []}
        selectedStationIds={selectedStationIds}
        isLoading={isLoading}
        onStationClick={handleToggleStation}
      />
      <StyledButton
        value={selectedStationIds.length > 0}
        text={t("dashboard.addButton")}
        onClick={() => {
          const newSelectedStationIds = selectedStationIds.filter(
            (stationId) => !widgetStations.includes(stationId),
          );
          saveSelectedStations(newSelectedStationIds);
        }}
        icon={<IoIosAdd />}
        useActiveStyle
        disabled={stationsToAdd.length === 0}
      />
    </StationManagerWrapper>
  );
}

const StyledButton = styled(IconButton)`
  margin-top: 20px;
`;

const StationManagerWrapper = styled.div`
  display: flex;
  height: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  overflow: hidden;
  max-height: 70vh;
  flex-direction: column;
`;
