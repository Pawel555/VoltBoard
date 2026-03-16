import type { Station } from "../../types/stations";
import { Card, ListWrapper } from "./styles";
import { StationCard } from "./StationCard";

interface StationListProps {
  stations: Station[];
  isLoading: boolean;
}

export const StationList = ({ stations, isLoading }: StationListProps) => {
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
      {stations.map((station) => (
        <StationCard key={station.id} station={station} isLoading={false} />
      ))}
    </ListWrapper>
  );
};
