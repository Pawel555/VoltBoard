import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { StationList } from "./StationManager/List";
import { LuRadar } from "react-icons/lu";
import { useNearbyStations } from "../hooks/hooks";

export function NearbyStationsList() {
  const { t } = useTranslation();

  const { stations, isLoading } = useNearbyStations();
  return (
    <StationManagerWrapper>
      <TitleWrapper>
        <StyledLuRadar size={24} />
        <Title>{t("dashboard.nearbyStations")}</Title>
      </TitleWrapper>
      <StationList stations={stations || []} isLoading={isLoading} simpleList />
    </StationManagerWrapper>
  );
}

const StationManagerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 8px;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.accent};
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
  white-space: nowrap;
  gap: 8px;
  margin-bottom: 12px;
  margin-top: 12px;
`;

const StyledLuRadar = styled(LuRadar)`
  color: ${({ theme }) => theme.colors.accent};
`;
