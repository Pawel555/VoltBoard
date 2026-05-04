import type { Station } from "../../types/stations";
import { Card, ListWrapper } from "./styles";
import { StationCard } from "./StationCard";
import { MAX_NUMBER_OF_STATIONS } from "../../constants/managers";

interface StationListProps {
  stations: Station[];
  isLoading: boolean;
  onStationClick?(station: Station): void;
  selectedStationIds?: (number | string)[];
}

export const StationList = ({
  stations,
  isLoading,
  onStationClick,
  selectedStationIds,
}: StationListProps) => {
  if (isLoading) {
    return (
      <ListWrapper>
        {[...Array(6)].map((_, i) => (
          <Card
            key={i}
            $isLoading={true}
            $minHeight={120}
            $minWidth={480}
            $disableHover
          />
        ))}
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      {stations.map((station) => {
        const stationSelected = selectedStationIds?.includes(station.id);
        const disableStationCard =
          !stationSelected &&
          selectedStationIds &&
          selectedStationIds.length >= MAX_NUMBER_OF_STATIONS;

        return (
          <StationCard
            key={station.id}
            station={station}
            isLoading={false}
            disableHover={disableStationCard}
            onClick={
              !disableStationCard
                ? () => onStationClick && onStationClick(station)
                : undefined
            }
            selected={
              onStationClick ? selectedStationIds?.includes(station.id) : false
            }
          />
        );
      })}
    </ListWrapper>
  );
};
