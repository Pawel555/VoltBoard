import styled from "styled-components";
import { StationList } from "./List";
import { fetchStations } from "../../api/stations/api";
import { useQuery } from "@tanstack/react-query";
import { StationSearch } from "./Search";

export function StationManager() {
  const { data: stations, isLoading } = useQuery({
    queryKey: ["listStations"],
    queryFn: () =>
      fetchStations({
        compact: false,
        verbose: false,
        countrycode: "PL",
      }),
  });

  return (
    <StationManagerWrapper>
      <StationSearch onSearch={() => {}}></StationSearch>
      <StationList stations={stations || []} isLoading={isLoading} />
    </StationManagerWrapper>
  );
}

const StationManagerWrapper = styled.div`
  display: flex;
  height: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  overflow: hidden;
  max-height: 70vh;
  flex-direction: column;
`;
