import type { Station } from "../../types/stations";
import { Card, ListWrapper } from "./styles";
import { StationCard } from "./StationCard";
import { MAX_NUMBER_OF_STATIONS } from "../../constants/managers";

interface StationListProps {
  stations: Station[];
  isLoading: boolean;
  onStationClick?(station: Station): void;
  selectedStationIds?: (number | string)[];
  simpleList?: boolean;
}

export const StationList = ({
  stations,
  isLoading,
  onStationClick,
  selectedStationIds,
  simpleList,
}: StationListProps) => {
  if (isLoading) {
    const placeholderCount = simpleList ? 10 : 6;

    return (
      <ListWrapper $simpleList={simpleList}>
        {[...Array(placeholderCount)].map((_, i) => (
          <Card
            key={i}
            $isLoading={true}
            $minHeight={simpleList ? 35 : 120}
            $minWidth={simpleList ? 340 : 480}
            $disableHover
            $smallPadding
          />
        ))}
      </ListWrapper>
    );
  }

  return (
    <ListWrapper $simpleList={simpleList}>
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
            disableHover={disableStationCard || simpleList}
            onClick={
              !disableStationCard
                ? () => onStationClick && onStationClick(station)
                : undefined
            }
            selected={
              onStationClick ? selectedStationIds?.includes(station.id) : false
            }
            simpleView={simpleList}
          />
        );
      })}
    </ListWrapper>
  );
};
