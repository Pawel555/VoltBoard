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
import { INITIAL_LOCATION } from "../../constants/locations";
import { MAX_NUMBER_OF_STATIONS } from "../../constants/managers";

export function StationManager({
  saveSelectedStations,
  widgetStations,
}: {
  saveSelectedStations: (stationsIds: (string | number)[]) => void;
  widgetStations: (number | string)[];
}) {
  const [stationsToAdd, setStationsToAdd] = useState<Station[]>([]);
  const [location, setLocation] = useState<Coordinates>(INITIAL_LOCATION);

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
        buttonText={t("stationsManager.searchButton")}
        searchTitle={t("stationsManager.searchTitle")}
        buttonIcon={<IoIosSearch />}
      />
      <SelectedStationCount>{`${t("stationsManager.selectedStations")}: ${selectedStationIds.length}/${MAX_NUMBER_OF_STATIONS}`}</SelectedStationCount>
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

const SelectedStationCount = styled.span`
  color: ${(props) => props.theme.colors.accent};
  text-align: left;
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
